import type { ILiquidCommercePaymentClientConstructor } from '../interfaces';
import { PaymentService } from '../services';
import type { ILiquidCommercePaymentConfig } from '../types';
import { PaymentAuthenticatedService } from './payment-authenticated.service';
import { PaymentProviderService } from './payment-provider.service';

type ServiceFactory<T> =
  | {
      getInstance: (...args: any[]) => T;
    }
  | (new (...args: any[]) => T);

/**
 * The PaymentSingletonManager class is responsible for managing singleton instances of various payment services.
 * It provides methods for retrieving or creating instances of these services based on unique keys.
 */
export class PaymentSingletonManager {
  private static instance: PaymentSingletonManager | null = null;

  private services: Map<string, any> = new Map();

  private liquidCommercePaymentClientConstructor: ILiquidCommercePaymentClientConstructor | null =
    null;

  public static getInstance(): PaymentSingletonManager {
    if (!PaymentSingletonManager.instance) {
      PaymentSingletonManager.instance = new PaymentSingletonManager();
    }

    return PaymentSingletonManager.instance;
  }

  /**
   * Sets the constructor for the Liquid Commerce Payment Client.
   *
   * @param {ILiquidCommercePaymentClientConstructor} constructor - The constructor function for the Liquid Commerce Payment Client.
   *
   * @return {void}
   */
  public setLiquidCommercePaymentClientConstructor(
    constructor: ILiquidCommercePaymentClientConstructor
  ): void {
    this.liquidCommercePaymentClientConstructor = constructor;
  }

  /**
   * Retrieves or creates an instance of the LiquidCommercePaymentClient.
   *
   * @param {string} apiKey - The API key for authentication.
   * @param {ILiquidCommercePaymentConfig} config - The configuration object.
   * @returns {Promise<ILiquidCommercePaymentClient>} - A promise that resolves to an instance of ILiquidCommercePaymentClient.
   * @throws {Error} - If the LiquidCommercePaymentClient constructor is not set.
   */
  public async getClient<T>(apiKey: string, config: ILiquidCommercePaymentConfig): Promise<T> {
    const key = `LiquidCommercePaymentClient_${apiKey}_${JSON.stringify(config)}`;
    if (!this.services.has(key)) {
      if (!this.liquidCommercePaymentClientConstructor) {
        throw new Error('LiquidCommercePaymentClient constructor not set');
      }

      const client = new this.liquidCommercePaymentClientConstructor(apiKey, config);
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
   * Returns an payment authenticated client for the given configuration.
   *
   * @param config - The configuration object containing the user ID, password, and base URL.
   * @param config.userID - The user ID for authentication.
   * @param config.password - The password for authentication.
   * @param config.baseURL - The base URL for API requests.
   *
   * @return The payment authenticated service object.
   */
  public getAuthenticatedClient(config: {
    userID: string;
    password: string;
    baseURL: string;
  }): PaymentAuthenticatedService {
    return this.getOrCreateService(
      `PaymentAuthenticatedClient_${JSON.stringify(config)}`,
      PaymentAuthenticatedService,
      config
    );
  }

  /**
   * Returns the instance of the `PaymentProviderService` class.
   * Now accepts PaymentAuthenticatedService as a parameter to properly initialize the service.
   *
   * @param {PaymentAuthenticatedService} authenticatedClient - The authenticated client instance
   * @return {PaymentProviderService} The instance of the `PaymentProviderService` class.
   */
  public getPaymentProviderService(
    authenticatedClient: PaymentAuthenticatedService
  ): PaymentProviderService {
    return this.getOrCreateService(
      `PaymentProviderService_${authenticatedClient.getUniqueKey()}`,
      PaymentProviderService,
      authenticatedClient
    );
  }

  /**
   * Retrieves the payment service by calling the getOrCreateService method.
   * Modified to accept and pass through the PaymentAuthenticatedService.
   *
   * @param {PaymentAuthenticatedService} authenticatedClient - The authenticated client instance
   * @return {PaymentService} The payment service object.
   */
  public getPaymentService(authenticatedClient: PaymentAuthenticatedService): PaymentService {
    return this.getOrCreateService(
      `PaymentService_${authenticatedClient.getUniqueKey()}`,
      PaymentService,
      this.getPaymentProviderService(authenticatedClient)
    );
  }
}
