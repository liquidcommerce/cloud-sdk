import type { OrderAuthenticatedService } from '../core';
import type { IOrder, IOrdersList, IOrdersListParams } from '../interfaces';
import type { IApiResponseWithData } from '../types';

export class OrderService {
  private client: OrderAuthenticatedService;

  constructor(client: OrderAuthenticatedService) {
    this.client = client;
  }

  /**
   * Fetches an order by its identifier.
   *
   * @param {string} identifier - The identifier of the order to fetch.
   * @returns {Promise<IApiResponseWithData<IOrder>>} A promise that resolves to the order data.
   * @throws {Error} If the fetch request fails.
   */
  public async fetch(identifier: string): Promise<IApiResponseWithData<IOrder>> {
    try {
      return await this.client.get<IApiResponseWithData<IOrder>>(`/orders/${identifier}`);
    } catch (error) {
      console.error('Failed to fetch order:', error);
      throw error;
    }
  }

  /**
   * Lists orders within a specified date range.
   *
   * @param {IOrdersListParams} params - The parameters for listing orders.
   * @returns {Promise<IApiResponseWithData<IOrdersList>>} A promise that resolves to the paginated order list.
   * @throws {Error} If the list request fails.
   */
  public async list(params: IOrdersListParams): Promise<IApiResponseWithData<IOrdersList>> {
    try {
      const queryParams = new URLSearchParams();

      if (!params.startDate || !params.endDate) {
        throw new Error('startDate and endDate are required parameters');
      }

      queryParams.append('startDate', params.startDate);
      queryParams.append('endDate', params.endDate);

      if (typeof params.page === 'number') {
        queryParams.append('page', params.page.toString());
      }

      if (typeof params.limit === 'number') {
        queryParams.append('limit', params.limit.toString());
      }

      if (typeof params.customerEmail === 'string') {
        queryParams.append('customerEmail', params.customerEmail);
      }

      return await this.client.get<IApiResponseWithData<IOrdersList>>(
        `/orders?${queryParams.toString()}`
      );
    } catch (error) {
      console.error('Failed to list orders:', error);
      throw error;
    }
  }
}
