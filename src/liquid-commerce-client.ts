import { DEFAULT_BASE_URLS } from './constants/core.constant';
import type { AuthenticatedService } from './core';
import { SingletonManager } from './core';
import { LIQUID_COMMERCE_ENV } from './enums';
import type { ICart, ICartUpdateParams } from './interfaces/cart.interface';
import type { ICatalog, ICatalogParams } from './interfaces/catalog.service.interface';
import type { ICheckoutCompleteParams, ICheckoutCompleteResponse, ICheckoutPrepareParams, ICheckoutPrepareResponse } from './interfaces/checkout.interface';
import type { IAddressMethod, ICartMethod, ICatalogMethod, ICheckoutMethod, ILiquidCommerceClient, IPaymentMethod, IUserMethod } from './interfaces/liquid-commerce-client.interface';
import type { ILiquidPaymentConfig, ILiquidPaymentToken, IPaymentElementEventMap } from './interfaces/payment.interface';
import type { IPurgeResponse, IUser, IUserAddress, IUserAddressParams, IUserSessionParams } from './interfaces/user.interface';
import type { AddressService, IAddressAutocompleteParams, IAddressAutocompleteResult, IAddressDetailsParams, IAddressDetailsResult } from './services/address.service';
import type { CartService } from './services/cart.service';
import type { CatalogService, IAvailabilityParams, IAvailabilityResponse } from './services/catalog.service';
import type { CheckoutService } from './services/checkout.service';
import type { PaymentService } from './services/payment.service';
import type { UserService } from './services/user.service';
import type { IApiResponseWithData, IApiResponseWithoutData, ILiquidCommerceConfig } from './types';

/**
 * The LiquidCommerceClient class is a client for interacting with the LiquidCommerce Cloud APIs.
 * This client encapsulates the logic for working with various services, including addresses, catalog products,
 * carts, users, payments, checkouts, and orders.
 *
 * The client handles authentication, service initialization, and ensures secure interaction with the
 * LiquidCommerce Cloud API by managing token expiration and re-authentication automatically.
 *
 * @class
 * @implements {ILiquidCommerceClient}
 */
class LiquidCommerceClient implements ILiquidCommerceClient {
  private readonly authenticatedClient: AuthenticatedService;

  private addressService: AddressService;

  private catalogService: CatalogService;

  private cartService: CartService;

  private userService: UserService;

  private paymentService: PaymentService;

  private checkoutService: CheckoutService;

  private config: ILiquidCommerceConfig;

  private singletonManager: SingletonManager;

  /**
   * Creates an instance of LiquidCommerceClient.
   *
   * @constructor
   * @param {string} apiKey - The API key used for authenticating with the LiquidCommerce Cloud API.
   * @param {ILiquidCommerceConfig} config - Configuration options including environment settings, base URLs, and other preferences.
   */
  constructor(apiKey: string, config: ILiquidCommerceConfig) {
    this.config = config;
    this.singletonManager = SingletonManager.getInstance();
    const baseURL = this.determineBaseURL(config);
    this.authenticatedClient = this.singletonManager.getAuthenticatedClient({ apiKey, baseURL });
    this.addressService = this.singletonManager.getAddressService(this.authenticatedClient);
    this.catalogService = this.singletonManager.getCatalogService(this.authenticatedClient);
    this.cartService = this.singletonManager.getCartService(this.authenticatedClient);
    this.userService = this.singletonManager.getUserService(this.authenticatedClient);
    this.paymentService = this.singletonManager.getPaymentService();
    this.checkoutService = this.singletonManager.getCheckoutService(this.authenticatedClient);
  }

  /**
   * Determines the appropriate base URL for the API based on the environment.
   *
   * @private
   * @param {ILiquidCommerceConfig} config - Configuration options.
   * @return {string} - The base URL for the selected environment.
   */
  private determineBaseURL(config: ILiquidCommerceConfig): string {
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
   * Address object that provides methods for performing address autocompletion and retrieving address details.
   *
   * @interface IAddressMethod address
   *
   * @property {function(Omit<IAddressAutocompleteParams, 'key'>): Promise<IApiResponseWithData<IAddressAutocompleteResult[]>>} autocomplete -
   *    Method for performing address autocompletion based on the provided parameters.
   *
   * @property {function(Omit<IAddressDetailsParams, 'key'>): Promise<IApiResponseWithData<IAddressDetailsResult>>} details -
   *    Method for retrieving address details based on the provided parameters.
   */
  public address: IAddressMethod = {
    autocomplete: async (params: Omit<IAddressAutocompleteParams, 'key'>): Promise<IApiResponseWithData<IAddressAutocompleteResult[]>> => {
      await this.ensureAuthenticated();
      return this.addressService.autocomplete(params, this.config.googlePlacesApiKey);
    },
    details: async (params: Omit<IAddressDetailsParams, 'key'>): Promise<IApiResponseWithData<IAddressDetailsResult>> => {
      await this.ensureAuthenticated();
      return this.addressService.details(params, this.config.googlePlacesApiKey);
    },
  };

  /**
   * Catalog object that provides methods for availability and search operations.
   *
   * @interface ICatalogMethod catalog
   *
   * @property {function(params: IAvailabilityParams): Promise<IApiResponseWithoutData<IAvailabilityResponse>>} availability -
   *    Method to check the availability of a specific item in the catalog.
   *
   * @property {function(params: ICatalogParams): Promise<IApiResponseWithoutData<ICatalog>>} search -
   *    Method to perform a search in the catalog based on the provided parameters.
   *
   * @see {@link IApiResponseWithoutData} for the structure of the promise returned by both methods.
   */
  public catalog: ICatalogMethod = {
    availability: async (params: IAvailabilityParams): Promise<IApiResponseWithoutData<IAvailabilityResponse>> => {
      await this.ensureAuthenticated();
      return this.catalogService.availability(params);
    },
    search: async (params: ICatalogParams): Promise<IApiResponseWithoutData<ICatalog>> => {
      await this.ensureAuthenticated();
      return this.catalogService.search(params);
    },
  };

  /**
   * Represents a cart object with methods for updating and retrieving cart data.
   *
   * @interface ICartMethod cart
   *
   * @property {function(id: string): Promise<IApiResponseWithoutData<ICart>>} get -
   *    Retrieves the cart by its ID, or returns a new cart if no ID is provided.
   * @property {function(params: ICartUpdateParams): Promise<IApiResponseWithoutData<ICart>>} update -
   *    Method to update the cart with the provided parameters.
   *
   * @see {@link ICartUpdateParams} for the structure of the parameters required to update the cart.
   * @see {@link IApiResponseWithoutData} for the structure of the promise returned by both methods.
   * @see {@link ICart} for the structure of the cart data returned.
   */
  public cart: ICartMethod = {
    get: async (id?: string, refresh?: boolean): Promise<IApiResponseWithoutData<ICart>> => {
      await this.ensureAuthenticated();
      return this.cartService.get(id, refresh);
    },
    update: async (params: ICartUpdateParams): Promise<IApiResponseWithoutData<ICart>> => {
      await this.ensureAuthenticated();
      return this.cartService.update(params);
    },
  };

  /**
   * User object that provides methods for user-related operations.
   *
   * @interface IUserMethod user
   *
   * @property {function(params: IUserSessionParams): Promise<IApiResponseWithData<IUser>>} session -
   *    Method for creating or updating a user session.
   * @property {function(identifier: string): Promise<IApiResponseWithData<IPurgeResponse>>} purge -
   *    Method for purging a user's data from the system.
   * @property {function(params: IUserAddressParams): Promise<IApiResponseWithData<IUserAddress>>} updateAddress -
   *    Method for updating or creating a user's address.
   * @property {function(addressId: string): Promise<IApiResponseWithData<IPurgeResponse>>} purgeAddress -
   *    Method for purging a user's address.
   *
   * @see {@link IUserSessionParams} for the structure of the session request parameters.
   * @see {@link IUserAddressParams} for the structure of the address update request parameters.
   * @see {@link IUser} for the structure of the user data returned.
   * @see {@link IUserAddress} for the structure of the user's address data returned.
   * @see {@link IPurgeResponse} for the structure of the user data returned.
   *
   * */
  public user: IUserMethod = {
    session: async (params: IUserSessionParams): Promise<IApiResponseWithData<IUser>> => {
      await this.ensureAuthenticated();
      return this.userService.createOrUpdateSession(params);
    },
    purge: async (identifier: string): Promise<IApiResponseWithData<IPurgeResponse>> => {
      await this.ensureAuthenticated();
      return this.userService.purge(identifier);
    },
    updateAddress: async (params: IUserAddressParams): Promise<IApiResponseWithData<IUserAddress>> => {
      await this.ensureAuthenticated();
      return this.userService.updateAddress(params);
    },
    purgeAddress: async (addressId: string): Promise<IApiResponseWithData<IPurgeResponse>> => {
      await this.ensureAuthenticated();
      return this.userService.purgeAddress(addressId);
    },
  };

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
    subscribe: <K extends keyof IPaymentElementEventMap>(eventType: K, handler: (event: IPaymentElementEventMap[K]) => void): void => {
      this.paymentService.subscribe(eventType, handler);
    },
    unsubscribe: <K extends keyof IPaymentElementEventMap>(eventType: K, handler?: (event: IPaymentElementEventMap[K]) => void): void => {
      this.paymentService.unsubscribe(eventType, handler);
    },
  };

  /**
   * Checkout object that provides methods for checkout-related operations.
   *
   * @interface ICheckoutMethod checkout
   *
   * @property {function(params: ICheckoutPrepareParams): Promise<IApiResponseWithoutData<ICheckoutPrepareResponse>>} prepare -
   *    Method to prepare a checkout based on the provided parameters.
   * @property {function(params: ICheckoutCompleteParams): Promise<IApiResponseWithoutData<ICheckoutCompleteResponse>>} complete -
   *   Method completes a checkout process with the provided token and payment information.
   *
   * @see {@link ICheckoutPrepareParams} for the structure of the prepare request parameters.
   * @see {@link IApiResponseWithoutData} for the structure of the promise returned by the prepare method.
   * @see {@link ICheckoutPrepareResponse} for the structure of the prepared checkout data returned.
   * @see {@link ICheckoutCompleteParams} for the structure of the complete request parameters.
   * @see {@link ICheckoutCompleteResponse} for the structure of the complete checkout data returned.
   */
  public checkout: ICheckoutMethod = {
    prepare: async (params: ICheckoutPrepareParams): Promise<IApiResponseWithoutData<ICheckoutPrepareResponse>> => {
      await this.ensureAuthenticated();
      return this.checkoutService.prepare(params);
    },
    complete: async (params: ICheckoutCompleteParams): Promise<IApiResponseWithoutData<ICheckoutCompleteResponse>> => {
      await this.ensureAuthenticated();
      return this.checkoutService.complete(params);
    },
  };
}

/**
 * Factory function to create and initialize a LiquidCommerceClient instance.
 *
 * @param {string} apiKey - The API key used for authenticating with the Liquid Commerce Cloud API.
 * @param {ILiquidCommerceConfig} config - The configuration object containing options such as environment settings, base URLs, and other preferences.
 * @return {Promise<LiquidCommerceClient>} - A promise that resolves to a fully initialized LiquidCommerceClient instance.
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
export async function LiquidCommerce(apiKey: string, config: ILiquidCommerceConfig): Promise<LiquidCommerceClient> {
  const singletonManager = SingletonManager.getInstance();
  singletonManager.setLiquidCommerceClientConstructor(LiquidCommerceClient);
  const client = await singletonManager.getLiquidCommerceClient(apiKey, config);
  return client as LiquidCommerceClient;
}

export { LIQUID_COMMERCE_ENV };

export type {
  IAddressAutocompleteParams,
  IAddressAutocompleteResult,
  IAddressDetailsParams,
  IAddressDetailsResult,
  IAddressMethod,
  IApiResponseWithData,
  IApiResponseWithoutData,
  IAvailabilityParams,
  IAvailabilityResponse,
  ICart,
  ICartMethod,
  ICartUpdateParams,
  ICatalog,
  ICatalogMethod,
  ICatalogParams,
  ICheckoutCompleteParams,
  ICheckoutCompleteResponse,
  ICheckoutMethod,
  ICheckoutPrepareParams,
  ICheckoutPrepareResponse,
  ILiquidCommerceClient,
  ILiquidCommerceConfig,
  ILiquidPaymentConfig,
  ILiquidPaymentToken,
  IPaymentElementEventMap,
  IPaymentMethod,
  IPurgeResponse,
  IUser,
  IUserAddress,
  IUserAddressParams,
  IUserMethod,
  IUserSessionParams,
};