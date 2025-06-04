import type { AuthenticatedService, PaymentSessionHelperService } from '../core';
import type { LIQUID_COMMERCE_ENV } from '../enums';
import type {
  BaseUser,
  IPurgeResponse,
  IUser,
  IUserAddress,
  IUserAddressParams,
  IUserPayment,
  IUserPaymentAddParams,
  IUserPaymentParams,
  IUserPaymentSession,
  IUserSession,
  IUserSessionParams,
} from '../interfaces';
import type { IApiResponseWithData } from '../types';

/**
 * A class representing a user service.
 */
export class UserService {
  private readonly servicePath = '/users';

  private readonly env: LIQUID_COMMERCE_ENV;

  constructor(
    private client: AuthenticatedService,
    private paymentSessionHelperService: PaymentSessionHelperService
  ) {
    this.env = client.env;
  }

  /**
   * Creates or updates a user session.
   *
   * @param {IUserSessionParams} params - The parameters for creating or updating a user session.
   * @returns {Promise<IApiResponseWithData<IUser>>} A promise that resolves to the user data.
   * @throws {Error} If the session creation/update request fails or if neither id nor email is provided.
   */
  public async createOrUpdateSession(
    params: IUserSessionParams
  ): Promise<IApiResponseWithData<IUser>> {
    try {
      if (!params?.id && !params?.email) {
        throw new Error('Either id or email must be provided');
      }

      return await this.client.post<IApiResponseWithData<IUser>>(
        `${this.servicePath}/session`,
        params
      );
    } catch (error) {
      console.error('User session creation/update request failed:', error);
      throw error;
    }
  }

  /**
   * Creates a payment session for a user.
   *
   * @param {IUserPaymentSession} params - The parameters required to create the payment session.
   * @return {Promise<IApiResponseWithData<IUserSession>>} A promise that resolves to the API
   *  response containing the user session data.
   */
  public async createPaymentSession(
    params: IUserPaymentSession
  ): Promise<IApiResponseWithData<IUserSession>> {
    try {
      const response = await this.client.post<IApiResponseWithData<any>>(
        `${this.servicePath}/payment-session`,
        params
      );

      const data = this.paymentSessionHelperService.rcd(response?.data, this.env);

      return {
        ...response,
        data,
      };
    } catch (error) {
      console.error('User session creation/update request failed:', error);
      throw error;
    }
  }

  /**
   * Fetches user data from the API using the provided identifier.
   *
   * @param {string} identifier - The unique identifier for the user.
   * @return {Promise<IApiResponseWithData<BaseUser>>} The API response containing
   *  user data omitting the session field.
   */
  public async fetchUser(identifier: string): Promise<IApiResponseWithData<BaseUser>> {
    try {
      if (!identifier) {
        throw new Error('Id is required');
      }

      return await this.client.get<IApiResponseWithData<BaseUser>>(
        `${this.servicePath}/fetch/${identifier}`
      );
    } catch (error) {
      console.error('User session creation/update request failed:', error);
      throw error;
    }
  }

  /**
   * Purges a user's data from the system.
   *
   * @param {string} identifier - The user's ID or email.
   * @returns {Promise<IApiResponseWithData<IPurgeResponse>>} A promise that resolves to the purge response.
   * @throws {Error} If the purge request fails or if the identifier is not provided.
   */
  public async purge(identifier: string): Promise<IApiResponseWithData<IPurgeResponse>> {
    try {
      if (!identifier) {
        throw new Error('User identifier (ID or email) must be provided');
      }

      return await this.client.delete<IApiResponseWithData<IPurgeResponse>>(
        `${this.servicePath}/purge/${identifier}`
      );
    } catch (error) {
      console.error('User purge request failed:', error);
      throw error;
    }
  }

  /**
   * Adds a new address for a user.
   *
   * @param {IUserAddressParams} params - The parameters containing the user's address details.
   * @return {Promise<IApiResponseWithData<IUserAddress>>} - A promise that resolves with the API response containing the added user address.
   * @throws {Error} If the addAddress request fails or if the required parameters are not provided.
   */
  public async addAddress(params: IUserAddressParams): Promise<IApiResponseWithData<IUserAddress>> {
    try {
      this.validateAddressParams(params);

      return await this.client.post<IApiResponseWithData<IUserAddress>>(
        `${this.servicePath}/addresses/add`,
        params
      );
    } catch (error) {
      console.error('User address add request failed:', error);
      throw error;
    }
  }

  /**
   * Updates or creates a new address for a user.
   *
   * @param {IUserAddressParams} params - The parameters for updating or creating an address.
   * @returns {Promise<IApiResponseWithData<IUserAddress>>} A promise that resolves to the updated or created address.
   * @throws {Error} If the address update request fails or if required parameters are missing.
   */
  public async updateAddress(
    params: IUserAddressParams
  ): Promise<IApiResponseWithData<IUserAddress>> {
    try {
      const validatedParams = this.validateAddressParams(params);

      return await this.client.post<IApiResponseWithData<IUserAddress>>(
        `${this.servicePath}/addresses/update`,
        validatedParams
      );
    } catch (error) {
      console.error('User address update request failed:', error);
      throw error;
    }
  }

  /**
   * Validates the parameters required for updating a user address.
   *
   * @param {IUserAddressParams} params - The parameters to be validated for the address update. This should include
   * at least the user ID and one of the following: address object, latitude and longitude, or a Google places ID.
   * @return {IUserAddressParams} Throws an error if the required parameters are not provided.
   */
  private validateAddressParams(params: IUserAddressParams): IUserAddressParams {
    const hasNoUser = this.hasUser(params);
    const hasNoAddressObj = this.hasUserAddressObj(params);
    const hasNoAddressCoords = this.hasUserAddressCoords(params);
    const hasNoAddressPlacesId = this.hasUserAddressPlacesId(params);

    if (hasNoUser) {
      throw new Error('Missing required parameter customerId for address update.');
    }

    if (hasNoAddressObj && hasNoAddressCoords && hasNoAddressPlacesId) {
      throw new Error(
        'Missing required parameters for address update, you need at least, an address object or lat and long, or a google placesId'
      );
    }

    if (!hasNoAddressCoords) {
      params.lat = Number(params?.lat);
      params.long = Number(params?.long);
    }

    return params;
  }

  /**
   * Checks if the given user address parameters contain valid customer ID and user ID.
   *
   * @param {IUserAddressParams} params - The user address parameters object containing customerId and userId.
   * @return {boolean} - Returns true if the customerId or userId is missing or not a string, otherwise returns false.
   */
  private hasUser(params: IUserAddressParams): boolean {
    return !params?.customerId || typeof params?.customerId !== 'string';
  }

  /**
   * Checks if the given user address object has a valid address.
   *
   * @param {IUserAddressParams} params - The user address parameters object containing address details.
   *
   * @return {boolean} Returns true if the user address object is valid; otherwise, returns false.
   */
  private hasUserAddressObj(params: IUserAddressParams): boolean {
    return (
      !params?.one ||
      typeof params?.one !== 'string' ||
      !params?.city ||
      typeof params?.city !== 'string' ||
      !params?.state ||
      typeof params?.state !== 'string' ||
      !params?.zip ||
      typeof params?.zip !== 'string' ||
      !params?.type ||
      typeof params?.type !== 'string'
    );
  }

  /**
   * Checks if the user address coordinates (latitude and longitude) are not present or not of type 'number'.
   *
   * @param {IUserAddressParams} params - The user address parameters containing latitude and longitude.
   * @return {boolean} Returns true if latitude or longitude are not provided or are not numbers, otherwise returns false.
   */
  private hasUserAddressCoords(params: IUserAddressParams): boolean {
    return (
      (!params?.lat && !params?.long) ||
      (typeof Number(params?.lat) !== 'number' && typeof Number(params?.long) !== 'number')
    );
  }

  /**
   * Checks whether the user address parameters contain a valid placesId.
   *
   * @param {IUserAddressParams} params - The user address parameters containing placesId.
   * @return {boolean} Returns true if placesId is missing or not a string, false otherwise.
   */
  private hasUserAddressPlacesId(params: IUserAddressParams): boolean {
    return !params?.placesId || typeof params?.placesId !== 'string';
  }

  /**
   * Purges an address for a user.
   *
   * @param {string} addressId - The ID of the address to purge.
   * @returns {Promise<IApiResponseWithData<IPurgeResponse>>} A promise that resolves to the purge response.
   * @throws {Error} If the address purge request fails or if the address ID is not provided.
   */
  public async purgeAddress(addressId: string): Promise<IApiResponseWithData<IPurgeResponse>> {
    try {
      if (!addressId) {
        throw new Error('Address ID must be provided');
      }

      return await this.client.delete<IApiResponseWithData<IPurgeResponse>>(
        `${this.servicePath}/addresses/purge/${addressId}`
      );
    } catch (error) {
      console.error('Address purge request failed:', error);
      throw error;
    }
  }

  /**
   * Adds a new payment method for a user.
   *
   * @param {IUserPaymentParams} params - The parameters required to add a payment method.
   * @param {string} params.customerId - The ID of the customer.
   * @param {string} params.paymentMethodId - The ID of the payment method.
   * @param {boolean} params.isDefault - Indicates whether the new payment method should be marked as default.
   * @return {Promise<IApiResponseWithData<IUserPayment>>} - A promise that resolves to the response containing user payment information.
   * @throws {Error} - Throws an error if required parameters are missing or if the request fails.
   */
  public async addPayment(
    params: IUserPaymentAddParams
  ): Promise<IApiResponseWithData<IUserPayment>> {
    try {
      if (!params.customerId || !params.paymentMethodId) {
        throw new Error('Missing required parameters to add payment');
      }

      if (params?.isDefault === undefined) {
        delete params?.isDefault;
      }

      return await this.client.post<IApiResponseWithData<IUserPayment>>(
        `${this.servicePath}/payments/add`,
        params
      );
    } catch (error) {
      console.error('User add payment request failed:', error);
      throw error;
    }
  }

  /**
   * Updates whether default payment method for a user.
   *
   * @param {IUserPaymentParams} params - The payment parameters required to update payment. Must include `customerId`,
   *  `paymentMethodId`.
   * @returns {Promise<IApiResponseWithData<boolean>>} - A promise that resolves to the API response containing
   *  the updated payment information.
   * @throws {Error} - Throws an error if required parameters are missing or the request fails.
   */
  public async updatePayment(params: IUserPaymentParams): Promise<IApiResponseWithData<boolean>> {
    try {
      if (!params.customerId || !params.paymentMethodId) {
        throw new Error('Missing required parameters to add payment');
      }

      const { customerId, paymentMethodId } = params;

      return await this.client.get<IApiResponseWithData<boolean>>(
        `${this.servicePath}/payments/updateDefault/${customerId}/${paymentMethodId}`
      );
    } catch (error) {
      console.error('User add payment request failed:', error);
      throw error;
    }
  }

  /**
   * Purges a payment record for a specified customer.
   *
   * @param {string} customerId - The ID of the customer whose payment record is to be purged.
   * @param {string} paymentId - The ID of the payment record to be purged.
   * @return {Promise<IApiResponseWithData<IPurgeResponse>>} A promise that resolves to the response of the purge request.
   */
  public async purgePayment(
    customerId: string,
    paymentId: string
  ): Promise<IApiResponseWithData<IPurgeResponse>> {
    try {
      if (!customerId || !paymentId) {
        throw new Error('Missing required parameters for payment purge');
      }

      return await this.client.delete<IApiResponseWithData<IPurgeResponse>>(
        `${this.servicePath}/payments/purge/${customerId}/${paymentId}`
      );
    } catch (error) {
      console.error('Address purge request failed:', error);
      throw error;
    }
  }
}
