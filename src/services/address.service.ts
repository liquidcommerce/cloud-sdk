import type { AuthenticatedService } from '../core';
import type { IAddressAutocompleteParams, IAddressAutocompleteResult, IAddressDetailsParams, IAddressDetailsResult, IApiResponseWithData } from '../types';

type AddressServiceResponse<T> = IApiResponseWithData<T>;

/**
 * Represents a service for interacting with address-related functionality.
 */
export class AddressService {
  private client: AuthenticatedService;

  constructor(client: AuthenticatedService) {
    this.client = client;
  }

  /**
   * Performs autocomplete on an address using the Google Places API.
   * @param {IAddressAutocompleteParams} params - The parameters for the autocomplete request.
   * @param {string} googlePlacesApiKey - The API key for accessing the Google Places API.
   * @return {Promise<AddressServiceResponse<IAddressAutocompleteResult[]>>} - A Promise that resolves to the autocomplete response.
   * @throws {Error} - If the autocomplete request fails.
   */
  public async autocomplete(params: IAddressAutocompleteParams, googlePlacesApiKey: string): Promise<AddressServiceResponse<IAddressAutocompleteResult[]>> {
    try {
      return await this.client.post<AddressServiceResponse<IAddressAutocompleteResult[]>>('/address/autocomplete', {
        ...params,
        key: googlePlacesApiKey,
      });
    } catch (error) {
      console.error('Address autocomplete request failed:', error);
      throw error;
    }
  }

  /**
   * Retrieves detailed information about an address using Google Places API.
   *
   * @async
   * @param {IAddressDetailsParams} params - The parameters for retrieving address details.
   * @param {string} googlePlacesApiKey - The API key for accessing Google Places API.
   * @return {Promise<AddressServiceResponse<IAddressDetailsResult>>} A promise that resolves to the response containing the detailed information about an address.
   * @throws {Error} if the request to retrieve address details fails.
   */
  public async details(params: IAddressDetailsParams, googlePlacesApiKey: string): Promise<AddressServiceResponse<IAddressDetailsResult>> {
    try {
      return await this.client.post<AddressServiceResponse<IAddressDetailsResult>>('/address/details', {
        ...params,
        key: googlePlacesApiKey,
      });
    } catch (error) {
      console.error('Address details request failed:', error);
      throw error;
    }
  }
}
