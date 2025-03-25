import type { AuthenticatedService } from '../core';
import type { IOrder } from '../interfaces';
import type { IApiResponseWithData } from '../types';

export class OrderService {
  private client: AuthenticatedService;

  constructor(client: AuthenticatedService) {
    this.client = client;
  }

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
