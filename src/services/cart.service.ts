import type { AuthenticatedService, CartHelperService } from '../core';
import type { ICart, ICartUpdateParams } from '../interfaces/cart.interface';
import type { IApiResponseWithoutData } from '../types';

/**
 * The CartService class is responsible for fetching and updating cart data from the server.
 *
 * @class CartService
 */
export class CartService {
  private readonly servicePath = '/cart/update';

  constructor(
    private client: AuthenticatedService,
    private cartHelperService: CartHelperService,
  ) {}

  /**
   * Retrieves the cart with the specified ID or a new cart from the server.
   *
   * @param {string} id - The ID of the cart to retrieve.
   * @param {boolean} refresh - A flag that if true return a refreshed access token.
   * @return {Promise<IApiResponseWithoutData<ICart>>} A Promise that resolves to the cart object.
   * @throws {Error} If the request to update the cart fails.
   */
  public async get(id?: string, refresh?: boolean): Promise<IApiResponseWithoutData<ICart>> {
    try {
      let validatedId: boolean | string = this.cartHelperService.validateId(id);

      validatedId = validatedId === '' ? false : validatedId;

      if (validatedId) {
        const params: { id?: string; refresh?: boolean } = { id: validatedId };

        if (typeof refresh === 'boolean') {
          params.refresh = refresh;
        }

        return await this.client.post<IApiResponseWithoutData<ICart>>(this.servicePath, params);
      }

      return await this.client.post<IApiResponseWithoutData<ICart>>(this.servicePath);
    } catch (error) {
      console.error('Cart update request failed:', error);
      throw error;
    }
  }

  /**
   * Updates the cart with the provided parameters.
   *
   * @param {ICartUpdateParams} params - The parameters for updating the cart.
   * @returns {Promise<IApiResponseWithoutData<ICart>>} A promise that resolves to the updated cart data.
   * @throws {Error} If the cart update request fails.
   */
  public async update(params: ICartUpdateParams): Promise<IApiResponseWithoutData<ICart>> {
    try {
      const validatedParams = this.cartHelperService.validateAndNormalizeParams(params);
      return await this.client.post<IApiResponseWithoutData<ICart>>(this.servicePath, validatedParams);
    } catch (error) {
      console.error('Cart update request failed:', error);
      throw error;
    }
  }
}
