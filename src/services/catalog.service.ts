import type { AuthenticatedService, CatalogHelperService } from '../core';
import type {
  IAvailabilityParams,
  IAvailabilityResponse,
  ICatalog,
  ICatalogAutocompleteParams,
  ICatalogParams,
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
      const term = typeof params?.term === 'string' ? params.term.trim() : '';
      if (term.length === 0) {
        throw new Error('term must be a non-empty string');
      }

      const body: ICatalogAutocompleteParams = { term };
      if (params.limit !== undefined) {
        if (
          !Number.isInteger(params.limit) ||
          params.limit < AUTOCOMPLETE_LIMIT_MIN ||
          params.limit > AUTOCOMPLETE_LIMIT_MAX
        ) {
          throw new Error(
            `limit must be an integer between ${AUTOCOMPLETE_LIMIT_MIN} and ${AUTOCOMPLETE_LIMIT_MAX}`
          );
        }
        body.limit = params.limit;
      }

      return await this.client.post<IApiResponseWithData<ICatalogSuggestion[]>>(
        `${this.servicePath}autocomplete`,
        body
      );
    } catch (error) {
      console.error('Catalog autocomplete request failed:', error);
      throw error;
    }
  }
}
