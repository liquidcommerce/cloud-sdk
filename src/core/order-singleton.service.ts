import type { ILiquidCommerceOrderClientConstructor } from '../interfaces';
import { OrderService } from '../services';
import type { ILiquidCommerceOrderConfig } from '../types';
import { OrderAuthenticatedService } from './order-authenticated.service';

type ServiceFactory<T> =
  | {
      getInstance: (...args: any[]) => T;
    }
  | (new (...args: any[]) => T);

/**
 * The OrderSingletonManager class is responsible for managing singleton instances of various order services.
 * It provides methods for retrieving or creating instances of these services based on unique keys.
 */
export class OrderSingletonManager {
  private static instance: OrderSingletonManager | null = null;

  private services: Map<string, any> = new Map();

  private liquidCommerceOrderClientConstructor: ILiquidCommerceOrderClientConstructor | null = null;

  public static getInstance(): OrderSingletonManager {
    if (!OrderSingletonManager.instance) {
      OrderSingletonManager.instance = new OrderSingletonManager();
    }

    return OrderSingletonManager.instance;
  }

  /**
   * Sets the constructor for the Liquid Commerce Order Client.
   *
   * @param {ILiquidCommerceOrderClientConstructor} constructor - The constructor function for the Liquid Commerce Order Client.
   *
   * @return {void}
   */
  public setLiquidCommerceOrderClientConstructor(
    constructor: ILiquidCommerceOrderClientConstructor
  ): void {
    this.liquidCommerceOrderClientConstructor = constructor;
  }

  /**
   * Retrieves or creates an instance of the LiquidCommerceOrderClient.
   *
   * @param {ILiquidCommerceOrderConfig} config - The configuration object.
   * @returns {Promise<ILiquidCommerceOrderClient>} - A promise that resolves to an instance of ILiquidCommerceOrderClient.
   * @throws {Error} - If the LiquidCommerceOrderClient constructor is not set.
   */
  public async getClient<T>(config: ILiquidCommerceOrderConfig): Promise<T> {
    const key = `LiquidCommerceOrderClient_${JSON.stringify(config)}`;
    if (!this.services.has(key)) {
      if (!this.liquidCommerceOrderClientConstructor) {
        throw new Error('LiquidCommerceOrderClient constructor not set');
      }

      const client = new this.liquidCommerceOrderClientConstructor(config);
      await client.init();
      this.services.set(key, client);
    }

    return this.services.get(key) as T;
  }

  /**
   * Returns an instance of a service based on the given key and ServiceClass.
   * If the service does not exist, it creates a new instance using the ServiceClass and optional arguments.
   *
   * @param {string} key - The key to identify the service.
   * @param {ServiceFactory<T>} ServiceClass - The class or factory function for the service.
   * @param {...any[]} args - Optional arguments to be passed to the constructor or factory function.
   * @return {T} - The instance of the service.
   */
  private getOrCreateService<T>(key: string, ServiceClass: ServiceFactory<T>, ...args: any[]): T {
    if (!this.services.has(key)) {
      const service =
        'getInstance' in ServiceClass
          ? ServiceClass.getInstance(...args)
          : new ServiceClass(...args);
      this.services.set(key, service);
    }

    return this.services.get(key) as T;
  }

  /**
   * Returns an order authenticated client for the given configuration.
   *
   * @param config - The configuration object containing the user ID, password, and base URL.
   * @param config.userID - The user ID for authentication.
   * @param config.password - The password for authentication.
   * @param config.baseURL - The base URL for API requests.
   *
   * @return The order authenticated service object.
   */
  public getAuthenticatedClient(config: {
    userID: string;
    password: string;
    baseURL: string;
  }): OrderAuthenticatedService {
    return this.getOrCreateService(
      `OrderAuthenticatedClient_${JSON.stringify(config)}`,
      OrderAuthenticatedService,
      config
    );
  }

  /**
   * Retrieves the OrderService instance for the provided authenticated client.
   *
   * @param orderAuthenticatedClient - The authenticated client object.
   * @return The OrderService instance.
   */
  public getOrderService(orderAuthenticatedClient: OrderAuthenticatedService): OrderService {
    return this.getOrCreateService(
      `OrderService_${orderAuthenticatedClient.getUniqueKey()}`,
      OrderService,
      orderAuthenticatedClient
    );
  }
}
