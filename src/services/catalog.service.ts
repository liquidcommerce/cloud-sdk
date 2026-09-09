import type { AuthenticatedService, CatalogHelperService } from '../core';
import type {
  IAvailabilityParams,
  IAvailabilityResponse,
  ICatalog,
  ICatalogAutocompleteParams,
  ICatalogParams,
  ICatalogProductItem,
  ICatalogProductsPage,
  ICatalogProductsParams,
  ICatalogSuggestion,
} from '../interfaces';
import type { IApiResponseWithData, IApiResponseWithoutData } from '../types';

const AUTOCOMPLETE_LIMIT_MIN = 1;
const AUTOCOMPLETE_LIMIT_MAX = 25;

/**
 * The CatalogService class provides methods for interacting with the catalog API.
 */
export class CatalogService {
  private readonly servicePath = '/catalog/';

  constructor(
    private client: AuthenticatedService,
    private catalogHelperService: CatalogHelperService
  ) {}

  /**
   * Makes an asynchronous request to check the availability of a specific item in the catalog.
   * @param {IAvailabilityParams} params - The parameters for the availability request.
   * @return {Promise<IApiResponseWithoutData<IAvailabilityResponse>>} - A Promise that resolves to an API response object without data, containing availability information.
   * @throws {Error} - If the availability request fails, an error is thrown.
   */
  public async availability(
    params: IAvailabilityParams
  ): Promise<IApiResponseWithoutData<IAvailabilityResponse>> {
    try {
      const validatedParams = this.catalogHelperService.validateAndNormalizeParams(params);

      return await this.client.post<IApiResponseWithoutData<IAvailabilityResponse>>(
        `${this.servicePath}availability`,
        validatedParams
      );
    } catch (error) {
      console.error('Catalog availability request failed:', error);
      throw error;
    }
  }

  /**
   * Performs a search in the catalog based on the provided parameters.
   *
   * @param {ICatalogParams} params - The search parameters.
   * @return {Promise<IApiResponseWithoutData<ICatalog>>} - A promise that resolves to the catalog search response.
   * @throws {Error} - If the search parameters are invalid or if the search request fails.
   */
  public async search(params: ICatalogParams): Promise<IApiResponseWithoutData<ICatalog>> {
    try {
      const validatedParams = this.catalogHelperService.validateAndNormalizeSearchParams(params);

      if (validatedParams?.error) {
        throw new Error(validatedParams?.error);
      }

      return await this.client.post<IApiResponseWithoutData<ICatalog>>(
        `${this.servicePath}search`,
        validatedParams
      );
    } catch (error) {
      console.error('Catalog search request failed:', error);
      throw error;
    }
  }

  /**
   * Returns search-as-you-type product suggestions for a partial term.
   *
   * Unlike `search`, this hits the dedicated prefix endpoint: no facets, scoring
   * chain, spell correction, or hydration run, so it is cheap enough to call on
   * every keystroke. Suggestions identify and link a product only; they carry no
   * availability or price.
   *
   * @param {ICatalogAutocompleteParams} params - The typed term and optional limit.
   * @return {Promise<IApiResponseWithData<ICatalogSuggestion[]>>} - A promise that resolves to the ordered suggestions.
   * @throws {Error} - If the term is empty or the limit is out of range, or if the request fails.
   */
  public async autocomplete(
    params: ICatalogAutocompleteParams
  ): Promise<IApiResponseWithData<ICatalogSuggestion[]>> {
    try {
      // Only leading whitespace is dropped: a trailing space is meaningful to
      // the backend (it marks the last token complete rather than a prefix).
      const term = typeof params?.term === 'string' ? params.term.replace(/^\s+/, '') : '';
      if (term.trim().length === 0) {
        throw new Error('term must be a non-empty string');
      }

      if (
        params.limit !== undefined &&
        (!Number.isInteger(params.limit) ||
          params.limit < AUTOCOMPLETE_LIMIT_MIN ||
          params.limit > AUTOCOMPLETE_LIMIT_MAX)
      ) {
        throw new Error(
          `limit must be an integer between ${AUTOCOMPLETE_LIMIT_MIN} and ${AUTOCOMPLETE_LIMIT_MAX}`
        );
      }
      const body: ICatalogAutocompleteParams =
        params.limit === undefined ? { term } : { term, limit: params.limit };

      return await this.client.post<IApiResponseWithData<ICatalogSuggestion[]>>(
        `${this.servicePath}autocomplete`,
        body
      );
    } catch (error) {
      console.error('Catalog autocomplete request failed:', error);
      throw error;
    }
  }

  /**
   * Lists one page of every product in the authenticated partner's catalog, for
   * building the product-page half of a storefront sitemap.
   *
   * There is no partner argument: cloud derives the partner from the API key, so
   * a caller can only ever enumerate its own catalog.
   *
   * The enumeration is availability-blind by design. It lists products whose page
   * exists, not products purchasable at the moment of the call, so a page count
   * below the partner's assignment count is expected: products whose barcode does
   * not resolve are dropped rather than published as dead URLs, and `counts` says
   * how many and why.
   *
   * Terminate on `nextCursor`, never on an empty `items` array — see
   * {@link iterateProducts}, which handles the paging correctly.
   *
   * @param {ICatalogProductsParams} params - Optional page size and cursor.
   * @return {Promise<IApiResponseWithData<ICatalogProductsPage>>} - A promise that resolves to one page of products.
   * @throws {Error} - If `pageSize` is not a positive integer, or if the request fails.
   */
  public async listProducts(
    params: ICatalogProductsParams = {}
  ): Promise<IApiResponseWithData<ICatalogProductsPage>> {
    try {
      // Cloud rejects a fractional pageSize outright, so fail here rather than
      // spend a round trip on it. An oversized value is deliberately left alone:
      // it is clamped to the server-side maximum, not rejected.
      if (params.pageSize !== undefined) {
        if (!Number.isInteger(params.pageSize) || params.pageSize < 1) {
          throw new Error('pageSize must be a positive integer');
        }
      }

      const queryParams = new URLSearchParams();

      if (params.pageSize !== undefined) {
        queryParams.append('pageSize', params.pageSize.toString());
      }

      if (typeof params.cursor === 'string' && params.cursor.length > 0) {
        queryParams.append('cursor', params.cursor);
      }

      const query = queryParams.toString();

      return await this.client.get<IApiResponseWithData<ICatalogProductsPage>>(
        `${this.servicePath}products${query ? `?${query}` : ''}`
      );
    } catch (error) {
      console.error('Catalog products request failed:', error);
      throw error;
    }
  }

  /**
   * Walks the partner's entire catalog, yielding one product at a time and
   * fetching each page as it is needed.
   *
   * Prefer this over hand-rolling the loop around {@link listProducts}: it
   * terminates on `nextCursor` rather than on an empty page. Products are
   * filtered out after a page is read from the index, so a full page can
   * legitimately yield nothing and still have successors — a loop that stops
   * there truncates the enumeration silently, and a short sitemap looks exactly
   * like a working one.
   *
   * @param {Omit<ICatalogProductsParams, 'cursor'>} params - Optional page size; the cursor is managed internally.
   * @return {AsyncGenerator<ICatalogProductItem>} - Each product in the partner's catalog.
   * @throws {Error} - If any page request fails.
   *
   * @example
   * for await (const product of client.catalog.iterateProducts()) {
   *   console.log(product.grouping, product.upc);
   * }
   */
  public async *iterateProducts(
    params: Omit<ICatalogProductsParams, 'cursor'> = {}
  ): AsyncGenerator<ICatalogProductItem> {
    let cursor: string | undefined;

    do {
      const page = await this.listProducts({ ...params, cursor });
      const data = page?.data;

      yield* data?.items ?? [];

      // Terminate only when the cursor is gone. An empty `items` is not the end.
      cursor = data?.nextCursor;
    } while (cursor !== undefined && cursor !== null);
  }
}
