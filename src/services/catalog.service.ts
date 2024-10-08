import type { AuthenticatedService, CatalogHelperService } from '../core';
import type { IAvailabilityParams, IAvailabilityResponse, ICatalog, ICatalogParams } from '../interfaces/catalog.service.interface';
import type { IApiResponseWithoutData } from '../types';

/**
 * The CatalogService class provides methods for interacting with the catalog API.
 */
export class CatalogService {
  private readonly servicePath = '/catalog/';

  constructor(
    private client: AuthenticatedService,
    private catalogHelperService: CatalogHelperService,
  ) {}

  /**
   * Makes an asynchronous request to check the availability of a specific item in the catalog.
   * @param {IAvailabilityParams} params - The parameters for the availability request.
   * @return {Promise<IApiResponseWithoutData<IAvailabilityResponse>>} - A Promise that resolves to an API response object without data, containing availability information.
   * @throws {Error} - If the availability request fails, an error is thrown.
   */
  public async availability(params: IAvailabilityParams): Promise<IApiResponseWithoutData<IAvailabilityResponse>> {
    try {
      const validatedParams = this.catalogHelperService.validateAndNormalizeParams(params);

      return await this.client.post<IApiResponseWithoutData<IAvailabilityResponse>>(`${this.servicePath}availability`, validatedParams);
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

      return await this.client.post<IApiResponseWithoutData<ICatalog>>(`${this.servicePath}search`, validatedParams);
    } catch (error) {
      console.error('Catalog search request failed:', error);
      throw error;
    }
  }
}
