import type { AuthenticatedService } from '../core';
import type { IOrder } from '../interfaces';
import type { IApiResponseWithData } from '../types';

export class OrderService {
  private client: AuthenticatedService;

  constructor(client: AuthenticatedService) {
    this.client = client;
  }

  /**
   * Fetches an order by its identifier.
   *
   * @param {string} identifier - The identifier of the order to fetch.
   * @returns {Promise<IApiResponseWithData<IOrder>>} A promise that resolves to the order data.
   * @throws {Error} If the fetch request fails.
   */
  public async fetchOrder(identifier: string): Promise<IApiResponseWithData<IOrder>> {
    try {
      return await this.client.get<IApiResponseWithData<IOrder>>(`/orders/${identifier}`);
    } catch (error) {
      console.error('Failed to fetch order:', error);
      throw error;
    }
  }

  // TODO: getOrders paginate
}
