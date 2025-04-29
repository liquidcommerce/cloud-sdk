import { DEFAULT_BASE_URLS } from './constants/core.constant';
import type { AuthenticatedService } from './core';
import { SingletonManager } from './core';
import { PaymentSingletonManager } from './core/payment-singleton.service';
import { LIQUID_COMMERCE_ENV } from './enums';
import type {
  ILiquidCommercePaymentClient,
  ILiquidPaymentConfig,
  ILiquidPaymentToken,
  IPaymentElementEventMap,
  IPaymentMethod,
} from './interfaces';
import type { PaymentService } from './services';
import type { ILiquidCommercePaymentConfig } from './types';

/**
 * The LiquidCommerceClient class is a client for interacting with the LiquidCommerce Cloud  APIs.
 * This client encapsulates the logic for working with various services, including addresses, catalog products,
 * carts, users, payments, checkouts, and orders.
 *
 * The client handles authentication, service initialization, and ensures secure interaction with the
 * LiquidCommerce Cloud API by managing token expiration and re-authentication automatically.
 *
 * @class
 * @implements {ILiquidCommercePaymentClient}
 */
class LiquidCommercePaymentClient implements ILiquidCommercePaymentClient {
  private readonly authenticatedClient: AuthenticatedService;

  private paymentService: PaymentService;

  private config: ILiquidCommercePaymentConfig;

  private singletonManager: SingletonManager;

  /**
   * Creates an instance of LiquidCommerceClient.
   *
   * @constructor
   * @param {string} apiKey - The API key used for authenticating with the LiquidCommerce Cloud API.
   * @param {ILiquidCommercePaymentConfig} config - Configuration options including environment settings, base URLs, and other preferences.
   */
  constructor(apiKey: string, config: ILiquidCommercePaymentConfig) {
    this.config = config;
    this.singletonManager = SingletonManager.getInstance();
    const baseURL = this.determineBaseURL(config);

    this.authenticatedClient = this.singletonManager.getAuthenticatedClient({ apiKey, baseURL });

    this.paymentService = this.singletonManager.getPaymentService(this.authenticatedClient);
  }

  /**
   * Determines the appropriate base URL for the API based on the environment.
   *
   * @private
   * @param {ILiquidCommercePaymentConfig} config - Configuration options.
   * @return {string} - The base URL for the selected environment.
   */
  private determineBaseURL(config: ILiquidCommercePaymentConfig): string {
    const env = config.env || LIQUID_COMMERCE_ENV.STAGE;
    return DEFAULT_BASE_URLS[env];
  }

  /**
   * Initializes the client by authenticating with the LiquidCommerce API.
   * This method should be called before making any API requests.
   *
   * @public
   * @return {Promise<void>} - Resolves when initialization is successful.
   * @throws {Error} - Throws an error if authentication fails.
   */
  public async init(): Promise<void> {
    try {
      await this.authenticatedClient.authenticate();
    } catch (error) {
      console.error('Failed to initialize LiquidCommerceClient:', error);
      throw new Error('Authentication failed during initialization');
    }
  }

  /**
   * Ensures that the client is authenticated before making API requests.
   * If the authentication token is expired, it will attempt to re-authenticate.
   *
   * @private
   * @return {Promise<void>} - Resolves when the client is authenticated.
   * @throws {Error} - Throws an error if re-authentication fails.
   */
  private async ensureAuthenticated(): Promise<void> {
    if (this.authenticatedClient.isTokenExpired()) {
      await this.authenticatedClient.authenticate();
    }
  }

  /**
   * Payment object that provides methods for payment-related operations.
   *
   * @interface IPaymentMethod payment
   *
   * @property {function(config: ILiquidPaymentConfig): Promise<void>} mount -
   *    Method for mounting the payment element into the DOM.
   *
   * @property {function(): Promise<ILiquidPaymentToken>} generateToken -
   *    Method for generating a payment token for the current payment information.
   *
   * @property {function(eventType: K, handler: function): void} subscribe -
   *    Method for subscribing to payment element events.
   *
   * @property {function(eventType: K, handler?: function): void} unsubscribe -
   *    Method for unsubscribing from payment element events.
   *
   * @property {function(): void} collapse -
   *    Method for collapsing the payment element if it's expanded.
   *
   * @property {function(): void} unmount -
   *    Method for removing the payment element from the DOM.
   *
   * @property {function(): void} destroy -
   *    Method for completely removing the payment element and cleaning up associated resources.
   *
   * @see {@link ILiquidPaymentConfig} Represents the configuration for Liquid payment.
   * @see {@link ILiquidPaymentToken} Represents a payment token for liquid payments.
   * @see {@link ILiquidPaymentError} Represents an error that occurs during a liquid payment.
   * @see {@link ILiquidPaymentElementOptions} The options for the payment element.
   * @see {@link IPaymentElementEventMap} The map of payment element event types to their corresponding event objects.
   */
  public payment: IPaymentMethod = {
    mount: async (config: ILiquidPaymentConfig): Promise<void> => {
      await this.ensureAuthenticated();
      return this.paymentService.mount(config);
    },
    generateToken: async (): Promise<ILiquidPaymentToken> => {
      await this.ensureAuthenticated();
      return this.paymentService.generateToken();
    },
    subscribe: <K extends keyof IPaymentElementEventMap>(
      eventType: K,
      handler: (event: IPaymentElementEventMap[K]) => void
    ): void => {
      this.paymentService.subscribe(eventType, handler);
    },
    unsubscribe: <K extends keyof IPaymentElementEventMap>(
      eventType: K,
      handler?: (event: IPaymentElementEventMap[K]) => void
    ): void => {
      this.paymentService.unsubscribe(eventType, handler);
    },
    collapse: (): void => {
      this.paymentService.collapse();
    },
    unmount: (): void => {
      this.paymentService.unmount();
    },
    destroy: (): void => {
      this.paymentService.destroy();
    },
  };
}

/**
 * Factory function to create and initialize a LiquidCommercePaymentClient instance.
 *
 * @param {string} apiKey - The API key used for authenticating with the Liquid Commerce Cloud API.
 * @param {ILiquidCommercePaymentConfig} config - The configuration object containing options such as environment settings, base URLs, and other preferences.
 * @return {Promise<LiquidCommercePaymentClient>} - A promise that resolves to a fully initialized LiquidCommerceClient instance.
 *
 * @example
 * // Example usage:
 * const liquidClient = await LiquidCommerce('your-api-key', {
 *   env: LIQUID_COMMERCE_ENV.STAGE,
 *   googlePlacesApiKey: 'your-google-places-api-key',
 * });
 *
 * @throws {Error} - Throws an error if the client initialization fails.
 */
export async function PaymentLiquidCommerce(
  apiKey: string,
  config: ILiquidCommercePaymentConfig
): Promise<ILiquidCommercePaymentClient> {
  const singletonManager = PaymentSingletonManager.getInstance();
  singletonManager.setLiquidCommercePaymentClientConstructor(LiquidCommercePaymentClient);
  return await singletonManager.getClient<ILiquidCommercePaymentClient>(apiKey, config);
}
