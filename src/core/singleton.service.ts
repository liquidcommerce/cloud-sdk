import type { LIQUID_COMMERCE_ENV } from '../enums';
import type {
  ILiquidCommerceClientConstructor,
  ILiquidCommercePaymentElement,
  IPaymentElementConfig,
  PaymentElementImplConstructor,
} from '../interfaces';
import {
  AddressService,
  CartService,
  CatalogService,
  CheckoutService,
  PaymentService,
  TrackingService,
  UserService,
  WebhookService,
} from '../services';
import type { ILiquidCommerceConfig } from '../types';
import { AuthenticatedService } from './authenticated.service';
import { CartHelperService } from './cart-helper.service';
import { CatalogHelperService } from './catalog-helper.service';
import { CheckoutHelperService } from './checkout-helper.service';
import { LocationHelperService } from './location-helper.service';
import { PaymentProviderService } from './payment-provider.service';
import { PaymentSessionHelperService } from './payment-session-helper.service';

type ServiceFactory<T> =
  | {
      getInstance: (...args: any[]) => T;
    }
  | (new (...args: any[]) => T);

/**
 * The SingletonManager class is responsible for managing singleton instances of various services.
 * It provides methods for retrieving or creating instances of these services based on unique keys.
 */
export class SingletonManager {
  private static instance: SingletonManager | null = null;

  private services: Map<string, any> = new Map();

  private liquidCommerceClientConstructor: ILiquidCommerceClientConstructor | null = null;

  private paymentElementConstructor: PaymentElementImplConstructor | null = null;

  public static getInstance(): SingletonManager {
    if (!SingletonManager.instance) {
      SingletonManager.instance = new SingletonManager();
    }

    return SingletonManager.instance;
  }

  /**
   * Sets the constructor for the Liquid Commerce Client.
   *
   * @param {ILiquidCommerceClientConstructor} constructor - The constructor function for the Liquid Commerce Client.
   *
   * @return {void}
   */
  public setLiquidCommerceClientConstructor(constructor: ILiquidCommerceClientConstructor): void {
    this.liquidCommerceClientConstructor = constructor;
  }

  public setPaymentElementConstructor(constructor: PaymentElementImplConstructor): void {
    this.paymentElementConstructor = constructor;
  }

  /**
   * Retrieves or creates an instance of the LiquidCommerceClient.
   *
   * @param {string} apiKey - The API key for authentication.
   * @param {ILiquidCommerceConfig} config - The configuration object.
   * @returns {Promise<ILiquidCommerceClient>} - A promise that resolves to an instance of ILiquidCommerceClient.
   * @throws {Error} - If the LiquidCommerceClient constructor is not set.
   */
  public async getClient<T>(apiKey: string, config: ILiquidCommerceConfig): Promise<T> {
    const key = `LiquidCommerceClient_${apiKey}_${JSON.stringify(config)}`;
    if (!this.services.has(key)) {
      if (!this.liquidCommerceClientConstructor) {
        throw new Error('LiquidCommerceClient constructor not set');
      }

      const client = new this.liquidCommerceClientConstructor(apiKey, config);
      await client.init();
      this.services.set(key, client);
    }

    return this.services.get(key) as T;
  }

  /**
   * Retrieves or creates an instance of the LiquidCommercePaymentElement.
   *
   * @param {IPaymentElementConfig} options - The configuration options for the payment element.
   * @returns {ILiquidCommercePaymentElement} - An instance of ILiquidCommercePaymentElement.
   * @throws {Error} - If the PaymentElement constructor is not set.
   */
  public getPaymentElement(options: IPaymentElementConfig): ILiquidCommercePaymentElement {
    const key = `PaymentElement_${options.session?.key}_${options?.session?.secret}`;
    if (!this.services.has(key)) {
      if (!this.paymentElementConstructor) {
        throw new Error('PaymentElement constructor not set');
      }

      const element = new this.paymentElementConstructor(options);
      this.services.set(key, element);
    }

    return this.services.get(key) as ILiquidCommercePaymentElement;
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
   * Returns an authenticated client for the given configuration.
   *
   * @param config - The configuration object containing the API key and base URL.
   * @param config.apiKey - The API key for authentication.
   * @param config.baseURL - The base URL for API requests.
   *
   * @return The authenticated service object.
   */
  public getAuthenticatedClient(config: {
    apiKey: string;
    baseURL: string;
    env: LIQUID_COMMERCE_ENV;
  }): AuthenticatedService {
    return this.getOrCreateService(
      `AuthenticatedClient_${JSON.stringify(config)}`,
      AuthenticatedService,
      config
    );
  }

  /**
   * Retrieves the instance of the LocationHelperService.
   * If the service does not yet exist, it will be created.
   *
   * @return {LocationHelperService} The LocationHelperService instance.
   */
  public getLocationHelperService(): LocationHelperService {
    return this.getOrCreateService('LocationHelperService', LocationHelperService);
  }

  /**
   * Gets the AddressService instance associated with the provided AuthenticatedService.
   *
   * @param authenticatedClient - The authenticated client used to retrieve the AddressService instance.
   * @return The AddressService instance associated with the authenticated client.
   */
  public getAddressService(authenticatedClient: AuthenticatedService): AddressService {
    return this.getOrCreateService(
      `AddressService_${authenticatedClient.getUniqueKey()}`,
      AddressService,
      authenticatedClient
    );
  }

  /**
   * Retrieves the CatalogHelperService instance.
   *
   * @return {CatalogHelperService} The CatalogHelperService instance.
   */
  public getCatalogHelperService(): CatalogHelperService {
    return this.getOrCreateService(
      'CatalogHelperService',
      CatalogHelperService,
      this.getLocationHelperService()
    );
  }

  /**
   * Retrieves the CatalogService for the provided authenticated client.
   *
   * @param authenticatedClient The authenticated client.
   *
   * @return The CatalogService instance created or retrieved.
   */
  public getCatalogService(authenticatedClient: AuthenticatedService): CatalogService {
    return this.getOrCreateService(
      `CatalogService_${authenticatedClient.getUniqueKey()}`,
      CatalogService,
      authenticatedClient,
      this.getCatalogHelperService()
    );
  }

  /**
   * Retrieves the CartHelperService instance.
   *
   * @return {CartHelperService} The CartHelperService instance.
   */
  public getCartHelperService(): CartHelperService {
    return this.getOrCreateService(
      'CartHelperService',
      CartHelperService,
      this.getLocationHelperService()
    );
  }

  public getPaymentSessionHelperService(): PaymentSessionHelperService {
    return this.getOrCreateService('PaymentSessionHelperService', PaymentSessionHelperService);
  }

  /**
   * Retrieves the CartService instance associated with the given authenticated client.
   *
   * @param authenticatedClient - The authenticated client for which to retrieve the CartService.
   * @return The CartService instance associated with the authenticated client.
   */
  public getCartService(authenticatedClient: AuthenticatedService): CartService {
    return this.getOrCreateService(
      `CartService_${authenticatedClient.getUniqueKey()}`,
      CartService,
      authenticatedClient,
      this.getCartHelperService()
    );
  }

  /**
   * Retrieves the UserService for the provided authenticated client.
   *
   * @param authenticatedClient - The authenticated client for which to retrieve the UserService.
   * @return The UserService instance.
   */
  public getUserService(authenticatedClient: AuthenticatedService): UserService {
    return this.getOrCreateService(
      `UserService_${authenticatedClient.getUniqueKey()}`,
      UserService,
      authenticatedClient,
      this.getPaymentSessionHelperService()
    );
  }

  /**
   * Returns the instance of the `PaymentProviderService` class.
   * Now accepts AuthenticatedService as a parameter to properly initialize the service.
   *
   * @param {AuthenticatedService} authenticatedClient - The authenticated client instance
   * @return {PaymentProviderService} The instance of the `PaymentProviderService` class.
   */
  public getPaymentProviderService(
    authenticatedClient: AuthenticatedService
  ): PaymentProviderService {
    return this.getOrCreateService(
      `PaymentProviderService_${authenticatedClient.getUniqueKey()}`,
      PaymentProviderService,
      authenticatedClient
    );
  }

  /**
   * Retrieves the payment service by calling the getOrCreateService method.
   * Modified to accept and pass through the AuthenticatedService.
   *
   * @param {AuthenticatedService} authenticatedClient - The authenticated client instance
   * @return {PaymentService} The payment service object.
   */
  public getPaymentService(authenticatedClient: AuthenticatedService): PaymentService {
    return this.getOrCreateService(
      `PaymentService_${authenticatedClient.getUniqueKey()}`,
      PaymentService,
      this.getPaymentProviderService(authenticatedClient)
    );
  }

  /**
   * Retrieves the CheckoutHelperService instance.
   *
   * @return {CheckoutHelperService} The CheckoutHelperService instance.
   */
  public getCheckoutHelperService(): CheckoutHelperService {
    return this.getOrCreateService(
      'CheckoutHelperService',
      CheckoutHelperService,
      this.getLocationHelperService()
    );
  }

  /**
   * Retrieves the CheckoutService instance for the provided authenticated client.
   *
   * @param authenticatedClient - The authenticated client object.
   * @return The CheckoutService instance.
   */
  public getCheckoutService(authenticatedClient: AuthenticatedService): CheckoutService {
    return this.getOrCreateService(
      `CheckoutService_${authenticatedClient.getUniqueKey()}`,
      CheckoutService,
      authenticatedClient,
      this.getCheckoutHelperService()
    );
  }

  /**
   * Retrieves the WebhookService instance for the provided authenticated client.
   *
   * @param authenticatedClient - The authenticated client object.
   * @return The WebhookService instance.
   */
  public getWebhookService(authenticatedClient: AuthenticatedService): WebhookService {
    return this.getOrCreateService(
      `WebhookService_${authenticatedClient.getUniqueKey()}`,
      WebhookService,
      authenticatedClient
    );
  }

  public getTrackingService(authenticatedClient: AuthenticatedService): TrackingService {
    return this.getOrCreateService(
      `TrackingService_${authenticatedClient.getUniqueKey()}`,
      TrackingService,
      authenticatedClient
    );
  }
}
