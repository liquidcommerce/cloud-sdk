import type { AuthenticatedService } from '../core';
import type {
  IPurgeResponse,
  IUser,
  IUserAddress,
  IUserAddressParams,
  IUserPayment,
  IUserPaymentAddParams,
  IUserPaymentUpdateParams,
  IUserSessionParams
} from '../interfaces/user.interface';
import type { IApiResponseWithData } from '../types';

/**
 * A class representing a user service.
 */
export class UserService {
  private readonly servicePath = '/users';

  constructor(private client: AuthenticatedService) {}

  /**
   * Creates or updates a user session.
   *
   * @param {IUserSessionParams} params - The parameters for creating or updating a user session.
   * @returns {Promise<IApiResponseWithData<IUser>>} A promise that resolves to the user data.
   * @throws {Error} If the session creation/update request fails or if neither id nor email is provided.
   */
  public async createOrUpdateSession(params: IUserSessionParams): Promise<IApiResponseWithData<IUser>> {
    try {
      if (!params?.id && !params?.email) {
        throw new Error('Either id or email must be provided');
      }

      return await this.client.post<IApiResponseWithData<IUser>>(`${this.servicePath}/session`, params);
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

      return await this.client.delete<IApiResponseWithData<IPurgeResponse>>(`${this.servicePath}/purge/${identifier}`);
    } catch (error) {
      console.error('User purge request failed:', error);
      throw error;
    }
  }

  public async addAddress(params: IUserAddressParams): Promise<IApiResponseWithData<IUserAddress>> {
    try {
      if (!params.customerId || !params.one || !params.city || !params.state || !params.zip || !params.type) {
        throw new Error('Missing required parameters to add address');
      }

      return await this.client.post<IApiResponseWithData<IUserAddress>>(`${this.servicePath}/addresses/add`, params);
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
  public async updateAddress(params: IUserAddressParams): Promise<IApiResponseWithData<IUserAddress>> {
    try {
      if (!params.customerId || !params.one || !params.city || !params.state || !params.zip || !params.type) {
        throw new Error('Missing required parameters for address update');
      }

      return await this.client.post<IApiResponseWithData<IUserAddress>>(`${this.servicePath}/addresses/update`, params);
    } catch (error) {
      console.error('User address update request failed:', error);
      throw error;
    }
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

      return await this.client.delete<IApiResponseWithData<IPurgeResponse>>(`${this.servicePath}/addresses/purge/${addressId}`);
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
  public async addPayment(params: IUserPaymentAddParams): Promise<IApiResponseWithData<IUserPayment>> {
    try {
      if (!params.customerId || !params.paymentMethodId) {
        throw new Error('Missing required parameters to add payment');
      }

      if (params?.isDefault === undefined) {
        delete params?.isDefault;
      }

      return await this.client.post<IApiResponseWithData<IUserPayment>>(`${this.servicePath}/payments/add`, params);
    } catch (error) {
      console.error('User add payment request failed:', error);
      throw error;
    }
  }

  /**
   * Updates whether the default payment method for a user.
   *
   * @param {IUserPaymentParams} params - The payment parameters required to update payment. Must include `customerId`,
   *  `paymentMethodId`, and a boolean `isDefault`.
   * @returns {Promise<IApiResponseWithData<IUserPayment>>} - A promise that resolves to the API response containing
   *  the updated payment information.
   * @throws {Error} - Throws an error if required parameters are missing or the request fails.
   */
  public async updatePayment(params: IUserPaymentUpdateParams): Promise<IApiResponseWithData<IUserPayment>> {
    try {
      if (!params.customerId || !params.paymentMethodId || params?.isDefault === undefined || typeof params?.isDefault !== 'boolean') {
        throw new Error('Missing required parameters to add payment');
      }

      return await this.client.post<IApiResponseWithData<IUserPayment>>(`${this.servicePath}/payments/update`, params);
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
  public async purgePayment(customerId: string, paymentId: string): Promise<IApiResponseWithData<IPurgeResponse>> {
    try {
      if (!customerId || !paymentId) {
        throw new Error('Missing required parameters for payment purge');
      }

      return await this.client.delete<IApiResponseWithData<IPurgeResponse>>(`${this.servicePath}/payments/purge/${customerId}/${paymentId}`);
    } catch (error) {
      console.error('Address purge request failed:', error);
      throw error;
    }
  }
}
