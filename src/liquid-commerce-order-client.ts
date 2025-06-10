import { DEFAULT_BASE_URLS } from './constants/core.constant';
import type { OrderAuthenticatedService } from './core';
import { OrderSingletonManager } from './core';
import { LIQUID_COMMERCE_ENV } from './enums';
import type { ILiquidCommerceOrderClient, IOrder, IOrderMethod } from './interfaces';
import type { OrderService } from './services';
import type { IApiResponseWithData, ILiquidCommerceOrderConfig } from './types';

/**
 * The LiquidCommerceOrderClient class is a client for interacting with the LiquidCommerce Cloud Order APIs.
 * This client encapsulates the logic for working with various services, including orders.
 *
 * The client handles authentication, service initialization, and ensures secure interaction with the
 * LiquidCommerce Cloud Order API by managing token expiration and re-authentication automatically.
 *
 * @class
 * @implements {ILiquidCommerceOrderClient}
 */
class LiquidCommerceOrderClient implements ILiquidCommerceOrderClient {
  private readonly orderAuthenticatedClient: OrderAuthenticatedService;

  private orderService: OrderService;

  private config: ILiquidCommerceOrderConfig;

  private singletonManager: OrderSingletonManager;

  /**
   * Creates an instance of LiquidCommerceOrderClient.
   *
   * @constructor
   * @param {ILiquidCommerceOrderConfig} config - Configuration options including userID, password, environment settings, base URLs, and other preferences.
   */
  constructor(config: ILiquidCommerceOrderConfig) {
    this.config = config;
    this.singletonManager = OrderSingletonManager.getInstance();
    const baseURL = this.determineBaseURL(config);

    this.orderAuthenticatedClient = this.singletonManager.getAuthenticatedClient({
      userID: config.userID,
      password: config.password,
      baseURL,
    });

    this.orderService = this.singletonManager.getOrderService(this.orderAuthenticatedClient);
  }

  /**
   * Determines the appropriate base URL for the API based on the environment.
   *
   * @private
   * @param {ILiquidCommerceOrderConfig} config - Configuration options.
   * @return {string} - The base URL for the selected environment.
   */
  private determineBaseURL(config: ILiquidCommerceOrderConfig): string {
    const env = config.env || LIQUID_COMMERCE_ENV.STAGE;
    return DEFAULT_BASE_URLS[env];
  }

  /**
   * Initializes the client by authenticating with the LiquidCommerce Order API.
   * This method should be called before making any API requests.
   *
   * @public
   * @return {Promise<void>} - Resolves when initialization is successful.
   * @throws {Error} - Throws an error if authentication fails.
   */
  public async init(): Promise<void> {
    try {
      await this.orderAuthenticatedClient.authenticate();
    } catch (error) {
      console.error('Failed to initialize OrderAuthenticatedClient:', error);
      throw new Error('Order Authentication failed during initialization');
    }
  }

  /**
   * Ensures that the order client is authenticated before making API requests.
   * If the authentication token is expired, it will attempt to re-authenticate.
   *
   * @private
   * @return {Promise<void>} - Resolves when the order client is authenticated.
   * @throws {Error} - Throws an error if re-authentication fails.
   */
  private async ensureOrderAuthenticated(): Promise<void> {
    if (this.orderAuthenticatedClient.isTokenExpired()) {
      await this.orderAuthenticatedClient.authenticate();
    }
  }

  /**
   * Order object that provides methods for order-related operations.
   *
   * @interface IOrderMethod order
   *
   * @property {function(identifier: string): Promise<IApiResponseWithData<IOrder>>} fetch -
   *    Method to fetch an order by its identifier.
   *
   * @see {@link IApiResponseWithData} for the structure of the promise returned by the fetch method.
   * @see {@link IOrder} for the structure of the order data returned.
   */
  public order: IOrderMethod = {
    fetch: async (identifier: string): Promise<IApiResponseWithData<IOrder>> => {
      await this.ensureOrderAuthenticated();
      return this.orderService.fetch(identifier);
    },
  };
}

/**
 * Factory function to create and initialize a LiquidCommerceOrderClient instance.
 *
 * @param {ILiquidCommerceOrderConfig} config - The configuration object containing options such as environment settings, base URLs, and other preferences.
 * @return {Promise<LiquidCommerceOrderClient>} - A promise that resolves to a fully initialized LiquidCommerceOrderClient instance.
 *
 * @example
 * // Example usage:
 * const orderLiquidClient = await LiquidCommerceOrders({
 *   userID: 'yourUserID',
 *   password: 'yourPassword',
 *   env: LIQUID_COMMERCE_ENV.STAGE,
 * });
 *
 * @throws {Error} - Throws an error if the client initialization fails.
 */
export async function LiquidCommerceOrders(
  config: ILiquidCommerceOrderConfig
): Promise<ILiquidCommerceOrderClient> {
  const singletonManager = OrderSingletonManager.getInstance();
  singletonManager.setLiquidCommerceOrderClientConstructor(LiquidCommerceOrderClient);
  return await singletonManager.getClient<ILiquidCommerceOrderClient>(config);
}
