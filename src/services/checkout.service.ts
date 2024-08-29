import type { AuthenticatedService, CheckoutHelperService } from '../core';
import type {
  ICheckoutCompleteParams,
  ICheckoutCompleteResponse,
  ICheckoutPrepareParams,
  ICheckoutPrepareResponse
} from '../interfaces/checkout.interface';
import type { IApiResponseWithoutData } from '../types';

/**
 * A service for managing the checkout process.
 */
export class CheckoutService {
  private readonly servicePath = '/checkout';

  constructor(
    private client: AuthenticatedService,
    private checkoutHelperService: CheckoutHelperService
  ) {}

  /**
   * Prepares a checkout based on the provided parameters.
   *
   * @param {ICheckoutPrepareParams} params - The parameters for preparing the checkout.
   * @returns {Promise<IApiResponseWithoutData<ICheckoutPrepareResponse>>} A promise that resolves to the prepared checkout data.
   * @throws {Error} If the checkout preparation request fails.
   */
  public async prepare(params: ICheckoutPrepareParams): Promise<IApiResponseWithoutData<ICheckoutPrepareResponse>> {
    try {
      const validatedParams = this.checkoutHelperService.validateAndNormalizePrepareParams(params);
      return await this.client.post<IApiResponseWithoutData<ICheckoutPrepareResponse>>(`${this.servicePath}/prepare`, validatedParams);
    } catch (error) {
      console.error('Checkout prepare request failed:', error);
      throw error;
    }
  }

  /**
   * Completes the checkout process.
   *
   * @param params - The parameters required to complete the checkout.
   * @returns A promise that resolves to the API response without data for the completed checkout.
   * @throws Throws an error if the checkout complete request fails.
   */
  public async complete(params: ICheckoutCompleteParams): Promise<IApiResponseWithoutData<ICheckoutCompleteResponse>> {
    try {
      const validatedParams = this.checkoutHelperService.validateAndNormalizeCompleteParams(params);
      return await this.client.post<IApiResponseWithoutData<ICheckoutCompleteResponse>>(`${this.servicePath}/complete`, validatedParams);
    } catch (error) {
      console.error('Checkout complete request failed:', error);
      throw error;
    }
  }
}