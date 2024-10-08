import type { IApiResponseWithData, IApiResponseWithoutData, ILiquidCommerceConfig } from '../types';
import type { IAddressAutocompleteParams, IAddressAutocompleteResult, IAddressDetailsParams, IAddressDetailsResult } from './address.interface';
import type { ICart, ICartUpdateParams } from './cart.interface';
import type { IAvailabilityParams, IAvailabilityResponse } from './catalog.service.interface';
import type { ICatalog, ICatalogParams } from './catalog.service.interface';
import type { ICheckoutCompleteParams, ICheckoutCompleteResponse, ICheckoutPrepareParams, ICheckoutPrepareResponse } from './checkout.interface';
import type { ILiquidPaymentConfig, ILiquidPaymentToken, IPaymentElementEventMap } from './payment.interface';
import type { IPurgeResponse, IUser, IUserAddress, IUserAddressParams, IUserPayment, IUserPaymentAddParams, IUserPaymentUpdateParams, IUserSessionParams } from './user.interface';

/**
 * Interface representing the LiquidCommerce client.
 * Provides access to methods related to addresses, catalogs, carts, and initialization.
 *
 * @interface
 */
export interface ILiquidCommerceClient {
  /**
   * Initializes the client by authenticating with the LiquidCommerce API.
   * Should be called before making any API requests.
   *
   * @return {Promise<void>} - Resolves when the client is successfully initialized.
   * @throws {Error} - Throws an error if initialization fails.
   */
  init(): Promise<void>;

  /**
   * Provides methods for performing address autocompletion and retrieving address details.
   * See {@link IAddressMethod} for more details on the available methods.
   */
  address: IAddressMethod;

  /**
   * Provides methods for checking item availability and performing catalog searches.
   * See {@link ICatalogMethod} for more details on the available methods.
   */
  catalog: ICatalogMethod;

  /**
   * Provides methods for retrieving and updating cart data.
   * See {@link ICartMethod} for more details on the available methods.
   */
  cart: ICartMethod;

  /**
   * Represents a payment method for processing a payment.
   * @type {IPaymentMethod} - The interface representing the payment method.
   */
  payment: IPaymentMethod;

  /**
   * Represents a method of checking out items in a shopping system.
   *
   * @type {ICheckoutMethod} - The interface representing the checkout method.
   */
  checkout: ICheckoutMethod;
}

/**
 * Type for the LiquidCommerceClient constructor.
 * Used to define the expected constructor signature.
 *
 * @type {new (apiKey: string, config: ILiquidCommerceConfig) => ILiquidCommerceClient} ILiquidCommerceClientConstructor
 */
export type ILiquidCommerceClientConstructor = new (apiKey: string, config: ILiquidCommerceConfig) => ILiquidCommerceClient;

/**
 * Interface for methods related to address operations, including autocompletion and address details retrieval.
 *
 * @interface
 */
export interface IAddressMethod {
  /**
   * Performs address autocompletion based on the provided parameters.
   *
   * @param {Omit<IAddressAutocompleteParams, 'key'>} params - The parameters for the autocomplete request, excluding the API key.
   * @returns {Promise<IApiResponseWithData<IAddressAutocompleteResult[]>>} - A promise that resolves to an API response containing a list of autocomplete results.
   *
   * @example
   * const liquidCommerce = await LiquidCommerce(apiKey, config);
   *
   * try {
   *   const autocompleteResults = await liquidCommerce.address.autocomplete({
   *     input: '123 Main',
   *     refresh: false
   *   });
   *
   *   console.log('Autocomplete results:', autocompleteResults.data);
   *   // This will log an array of IAddressAutocompleteResult objects
   * } catch (error) {
   *   console.error('Address autocomplete failed:', error);
   * }
   * const liquidClient = await LiquidCommerce('your-api-key', {
   *   env: LIQUID_COMMERCE_ENV.STAGE,
   *   googlePlacesApiKey: 'your-google-places-api-key',
   * });
   *
   * @throws {Error} - Throws an error if the autocompletion request fails or if authentication is unsuccessful.
   *
   * @see {@link IAddressAutocompleteParams} for the structure of the autocomplete request parameters.
   * @see {@link IAddressAutocompleteResult} for the structure of the autocomplete result data.
   */
  autocomplete: (params: Omit<IAddressAutocompleteParams, 'key'>) => Promise<IApiResponseWithData<IAddressAutocompleteResult[]>>;

  /**
   * Retrieves address details based on the provided parameters.
   *
   * @param {Omit<IAddressDetailsParams, 'key'>} params - The parameters for the address details request, excluding the API key.
   * @returns {Promise<IApiResponseWithData<IAddressDetailsResult>>} - A promise that resolves to an API response containing address details.
   *
   * @example
   * const liquidCommerce = await LiquidCommerce(apiKey, config);
   *
   * try {
   *   const addressDetails = await liquidCommerce.address.details({
   *     id: 'ChIJd8BlQ2BZwokRjMKtTjMezRw',
   *     refresh: true
   *   });
   *
   *   console.log('Address details:', addressDetails.data);
   *   // This will log an IAddressDetailsResult object
   * } catch (error) {
   *   console.error('Address details retrieval failed:', error);
   * }
   *
   * @throws {Error} - Throws an error if the address details request fails or if authentication is unsuccessful.
   *
   * @see {@link IAddressDetailsParams} for the structure of the details request parameters.
   * @see {@link IAddressDetailsResult} for the structure of the address details result data.
   */
  details: (params: Omit<IAddressDetailsParams, 'key'>) => Promise<IApiResponseWithData<IAddressDetailsResult>>;
}

/**
 * Interface for methods related to catalog operations, including item availability checks and catalog searches.
 *
 * @interface
 */
export interface ICatalogMethod {
  /**
   * Checks the availability of a specific item in the catalog.
   *
   * @param {IAvailabilityParams} params - The parameters for the availability request.
   * @return {Promise<IApiResponseWithoutData<IAvailabilityResponse>>} - A promise that resolves to an API response object containing availability information.
   *
   * @example
   * const liquidCommerce = await LiquidCommerce(apiKey, config);
   *
   * try {
   *   const availabilityResponse = await liquidCommerce.catalog.availability({
   *     upcs: ['123456789012', '210987654321'],
   *     loc: {
   *       address: {
   *         one: '123 Main St',
   *         city: 'New York',
   *         state: 'NY',
   *         zip: '10001'
   *       }
   *     },
   *     shouldShowOffHours: true,
   *     refresh: false
   *   });
   *
   *   console.log('Availability results:', availabilityResponse);
   *   // This will log an IAvailabilityResponse object
   * } catch (error) {
   *   console.error('Availability check failed:', error);
   * }
   *
   * @throws {Error} - Throws an error if the availability request fails.
   *
   * @see {@link IAvailabilityParams} for the structure of the availability request parameters.
   * @see {@link IAvailabilityResponse} for the structure of the availability response.
   */
  availability: (params: IAvailabilityParams) => Promise<IApiResponseWithoutData<IAvailabilityResponse>>;

  /**
   * Searches the catalog based on the provided parameters.
   *
   * @param {ICatalogParams} params - The search parameters.
   * @return {Promise<IApiResponseWithoutData<ICatalog>>} - A promise that resolves to an API response object containing catalog search results.
   *
   * @example
   * const liquidCommerce = await LiquidCommerce(apiKey, config);
   *
   * try {
   *   const searchResults = await liquidCommerce.catalog.search({
   *     search: 'whiskey',
   *     pageToken: '',
   *     page: 1,
   *     perPage: 20,
   *     orderBy: ENUM_ORDER_BY.PRICE,
   *     orderDirection: ENUM_NAVIGATION_ORDER_DIRECTION_TYPE.ASC,
   *     filters: [
   *       { key: ENUM_FILTER_KEYS.CATEGORIES, values: [ENUM_SPIRITS.WHISKEY] },
   *       { key: ENUM_FILTER_KEYS.PRICE, values: { min: 20, max: 100 } }
   *     ],
   *     loc: {
   *       address: {
   *         one: '123 Main St',
   *         city: 'New York',
   *         state: 'NY',
   *         zip: '10001'
   *       }
   *     }
   *   });
   *
   *   console.log('Search results:', searchResults);
   *   // This will log an ICatalog object
   * } catch (error) {
   *   console.error('Catalog search failed:', error);
   * }
   *
   * @throws {Error} - Throws an error if the search request fails or if the parameters are invalid.
   *
   * @see {@link ICatalogParams} for the structure of the search request parameters.
   * @see {@link ICatalog} for the structure of the catalog data returned.
   */
  search: (params: ICatalogParams) => Promise<IApiResponseWithoutData<ICatalog>>;
}

/**
 * Interface for methods related to cart operations, including retrieving and updating cart data.
 *
 * @interface
 */
export interface ICartMethod {
  /**
   * Retrieves a cart by its ID, or returns a new cart if no ID is provided.
   *
   * @param {string} [id] - The ID of the cart to retrieve. If not provided, a new cart is returned.
   * @return {Promise<IApiResponseWithoutData<ICart>>} - A promise that resolves to an API response containing the cart data.
   *
   * @example
   * const liquidCommerce = await LiquidCommerce(apiKey, config);
   *
   * try {
   *   // Get an existing cart
   *   const existingCart = await liquidCommerce.cart.get('existing_cart_id');
   *   console.log('Existing cart:', existingCart);
   *
   *   // Get a new cart
   *   const newCart = await liquidCommerce.cart.get();
   *   console.log('New cart:', newCart);
   *
   *   // Both will log an ICart object
   * } catch (error) {
   *   console.error('Cart retrieval failed:', error);
   * }
   *
   * @throws {Error} - Throws an error if the cart retrieval request fails or if authentication is unsuccessful.
   *
   * @see {@link ICart} for the structure of the cart data returned.
   */
  get: (id?: string) => Promise<IApiResponseWithoutData<ICart>>;

  /**
   * Updates the cart with the provided parameters.
   *
   * @param {ICartUpdateParams} params - The parameters required for updating the cart.
   * @return {Promise<IApiResponseWithoutData<ICart>>} - A promise that resolves to an API response containing the updated cart data.
   *
   * @example
   * const liquidCommerce = await LiquidCommerce(apiKey, config);
   *
   * try {
   *   const updatedCart = await liquidCommerce.cart.update({
   *     id: 'existing_cart_id',
   *     items: [
   *       {
   *         id: 'item_id_1',
   *         partNumber: '123456789012_retailer_id',
   *         quantity: 2,
   *         engravingLines: ['Happy Birthday', 'John!'],
   *         fulfillmentId: 'fulfillment_id_1'
   *       },
   *       {
   *         id: 'item_id_2',
   *         partNumber: '210987654321_retailer_id',
   *         quantity: 1,
   *         fulfillmentId: 'fulfillment_id_2'
   *       }
   *     ],
   *     loc: {
   *       address: {
   *         one: '123 Main St',
   *         city: 'New York',
   *         state: 'NY',
   *         zip: '10001'
   *       }
   *     },
   *     refresh: true
   *   });
   *
   *   console.log('Updated cart:', updatedCart);
   *   // This will log an ICart object
   * } catch (error) {
   *   console.error('Cart update failed:', error);
   * }
   *
   * @throws {Error} - Throws an error if the cart update request fails or if authentication is unsuccessful.
   *
   * @see {@link ICartUpdateParams} for the structure of the update request parameters.
   * @see {@link ICart} for the structure of the cart data returned.
   */
  update: (params: ICartUpdateParams) => Promise<IApiResponseWithoutData<ICart>>;
}

export interface IUserMethod {
  /**
   * Represents a session object used for user authentication and authorization.
   *
   * @param {IUserSessionParams} params - The parameters for creating a session.
   * @returns {Promise<IApiResponseWithData<IUser>>} A Promise that resolves to the API response with user data.
   *
   * @example
   * const liquidCommerce = await LiquidCommerce(apiKey, config);
   *
   * try {
   *   const userSession = await liquidCommerce.user.session({
   *     email: "user@example.com",
   *     firstName: "John"
   *   });
   *
   *   console.log('User session:', userSession?.data);
   * } catch (error) {
   *   console.error('Failed to create/update user session:', error);
   * }
   *
   * @throws {Error} - Throws an error if the sessions request fails or if authentication is unsuccessful.
   *
   * @see {@link IUserSessionParams} for the structure of the session request parameters.
   * @see {@link IUser} for the structure of the user data returned.
   */
  session: (params: IUserSessionParams) => Promise<IApiResponseWithData<IUser>>;

  /**
   * Purges a user's data from the system.
   *
   * @param {string} identifier - The user's ID or email.
   * @returns {Promise<IApiResponseWithData<IPurgeResponse>>} A promise that resolves to the purge response.
   *
   * @example
   * const liquidCommerce = await LiquidCommerce(apiKey, config);
   *
   * try {
   *   // Purge by user ID
   *   const purgeResponse1 = await liquidCommerce.user.purge('c1fbd454-a540-4f42-86e9-f87a98bf1812');
   *   console.log('User purge response:', purgeResponse1.data);
   *
   *   // Purge by email
   *   const purgeResponse2 = await liquidCommerce.user.purge('user@example.com');
   *   console.log('User purge response:', purgeResponse2.data);
   * } catch (error) {
   *   console.error('Failed to purge user data:', error);
   * }
   *
   * @throws {Error} - Throws an error if the sessions request fails or if authentication is unsuccessful.
   *
   * @see {@link IPurgeResponse} for the structure of the user data returned.
   */
  purge: (identifier: string) => Promise<IApiResponseWithData<IPurgeResponse>>;

  /**
   * Adds a new address for a user.
   *
   * @param {IUserAddressParams} params - The parameters for adding a new address.
   * @returns {Promise<IApiResponseWithData<IUserAddress>>} A promise that resolves to the API response with the added address data.
   *
   * @example
   * const liquidCommerce = await LiquidCommerce(apiKey, config);
   *
   * try {
   *   const newAddress = await liquidCommerce.user.addAddress({
   *     customerId: 'c1fbd454-a540-4f42-86e9-f87a98bf1812',
   *     one: '100 Madison St',
   *     city: 'New York',
   *     state: 'NY',
   *     zip: '10004',
   *     type: 'shipping',
   *     isDefault: true
   *   });
   *
   *   console.log('Added address:', newAddress?.data);
   * } catch (error) {
   *   console.error('Failed to add address:', error);
   * }
   *
   * @throws {Error} - Throws an error if the add address request fails or if authentication is unsuccessful.
   *
   * @see {@link IUserAddressParams} for the structure of the add address request parameters.
   * @see {@link IUserAddress} for the structure of the user's address data returned.
   */
  addAddress: (params: IUserAddressParams) => Promise<IApiResponseWithData<IUserAddress>>;

  /**
   * Updates or creates a new address for a user.
   *
   * @param {IUserAddressParams} params - The parameters for updating or creating an address.
   * @returns {Promise<IApiResponseWithData<IUserAddress>>} A promise that resolves to the updated or created address.
   *
   * @example
   * const liquidCommerce = await LiquidCommerce(apiKey, config);
   *
   * try {
   *   const addressResponse = await liquidCommerce.user.updateAddress({
   *     customerId: 'c1fbd454-a540-4f42-86e9-f87a98bf1812',
   *     one: '100 Madison St',
   *     two: 'Apt 1707',
   *     city: 'New York',
   *     state: 'NY',
   *     zip: '10004',
   *     type: 'shipping',
   *     isDefault: true
   *   });
   *
   *   console.log('Updated/Created address:', addressResponse?.data);
   * } catch (error) {
   *   console.error('Failed to update/create address:', error);
   * }
   *
   * @throws {Error} - Throws an error if the sessions request fails or if authentication is unsuccessful.
   *
   * @see {@link IUserAddressParams} for the structure of the address update request parameters.
   * @see {@link IUserAddress} for the structure of the user's address data returned.
   */
  updateAddress: (params: IUserAddressParams) => Promise<IApiResponseWithData<IUserAddress>>;

  /**
   * Purges an address for a user.
   *
   * @param {string} addressId - The ID of the address to purge.
   * @returns {Promise<IApiResponseWithData<IPurgeResponse>>} A promise that resolves to the purge response.
   *
   * @example
   * const liquidCommerce = await LiquidCommerce(apiKey, config);
   *
   * try {
   *   const addressPurgeResponse = await liquidCommerce.user.purgeAddress('26af8958-0deb-44ec-b9fd-ca150b198e45');
   *
   *   console.log('Address purge response:', addressPurgeResponse?.data);
   * } catch (error) {
   *   console.error('Failed to purge address:', error);
   * }
   *
   * @throws {Error} - Throws an error if the sessions request fails or if authentication is unsuccessful.
   *
   * @see {@link IPurgeResponse} for the structure of the user's purged data state.
   */
  purgeAddress: (addressId: string) => Promise<IApiResponseWithData<IPurgeResponse>>;

  /**
   * Adds a new payment method for a user.
   *
   * @param {IUserPaymentAddParams} params - The parameters for adding a new payment method.
   * @returns {Promise<IApiResponseWithData<IUserPayment>>} A promise that resolves to the API response with the added payment method data.
   *
   * @example
   * const liquidCommerce = await LiquidCommerce(apiKey, config);
   *
   * try {
   *   const newPayment = await liquidCommerce.user.addPayment({
   *     customerId: 'c1fbd454-a540-4f42-86e9-f87a98bf1812',
   *     paymentMethodId: 'pm_1234567890abcdef',
   *     isDefault: true
   *   });
   *
   *   console.log('Added payment method:', newPayment?.data);
   * } catch (error) {
   *   console.error('Failed to add payment method:', error);
   * }
   *
   * @throws {Error} - Throws an error if the add payment request fails or if authentication is unsuccessful.
   *
   * @see {@link IUserPaymentParams} for the structure of the add payment request parameters.
   * @see {@link IUserPayment} for the structure of the user's payment method data returned.
   */
  addPayment: (params: IUserPaymentAddParams) => Promise<IApiResponseWithData<IUserPayment>>;

  /**
   * Updates a payment method for a user.
   *
   * @param {IUserPaymentUpdateParams} params - The parameters for updating a payment method.
   * @returns {Promise<IApiResponseWithData<IUserPayment>>} A promise that resolves to the API response with the updated payment method data.
   *
   * @example
   * const liquidCommerce = await LiquidCommerce(apiKey, config);
   *
   * try {
   *   const updatedPayment = await liquidCommerce.user.updatePayment({
   *     customerId: 'c1fbd454-a540-4f42-86e9-f87a98bf1812',
   *     paymentMethodId: 'pm_1234567890abcdef',
   *     isDefault: true
   *   });
   *
   *   console.log('Updated payment method:', updatedPayment?.data);
   * } catch (error) {
   *   console.error('Failed to update payment method:', error);
   * }
   *
   * @throws {Error} - Throws an error if the update payment request fails or if authentication is unsuccessful.
   *
   * @see {@link IUserPaymentUpdateParams} for the structure of the update payment request parameters.
   * @see {@link IUserPayment} for the structure of the user's payment method data returned.
   */
  updatePayment: (params: IUserPaymentUpdateParams) => Promise<IApiResponseWithData<IUserPayment>>;

  /**
   * Purges a payment method for a user.
   *
   * @param {string} customerId - The ID of the customer.
   * @param {string} paymentId - The ID of the payment method to purge.
   * @returns {Promise<IApiResponseWithData<IPurgeResponse>>} A promise that resolves to the purge response.
   *
   * @example
   * const liquidCommerce = await LiquidCommerce(apiKey, config);
   *
   * try {
   *   const paymentPurgeResponse = await liquidCommerce.user.purgePayment(
   *     'c1fbd454-a540-4f42-86e9-f87a98bf1812',
   *     'pm_1234567890abcdef'
   *   );
   *
   *   console.log('Payment method purge response:', paymentPurgeResponse?.data);
   * } catch (error) {
   *   console.error('Failed to purge payment method:', error);
   * }
   *
   * @throws {Error} - Throws an error if the purge payment request fails or if authentication is unsuccessful.
   *
   * @see {@link IPurgeResponse} for the structure of the purge response data.
   */
  purgePayment: (customerId: string, paymentId: string) => Promise<IApiResponseWithData<IPurgeResponse>>;
}

export interface IPaymentMethod {
  /**
   * Mounts the payment element into the DOM.
   *
   * @param {ILiquidPaymentConfig} config - Configuration for the payment element.
   * @returns {Promise<void>} A promise that resolves when the element is mounted.
   *
   * @example
   * const liquidCommerce = await LiquidCommerce(apiKey, config);
   *
   * try {
   *   await liquidCommerce.payment.mount({
   *     clientSecret: 'client_secret_from_server',
   *     elementId: 'payment-element-container',
   *     appearance: { theme: 'night' },
   *     elementOptions: { layout: 'tabs' }
   *   });
   *   console.log('Payment element mounted');
   * } catch (error) {
   *   console.error('Failed to mount payment element:', error);
   * }
   *
   * @throws {Error} - Throws an error if injection fails.
   */
  mount(config: ILiquidPaymentConfig): Promise<void>;

  /**
   * Generates a payment token for the current payment information.
   *
   * @returns {Promise<ILiquidPaymentToken>} A promise that resolves to the payment token or an error.
   *
   * @example
   * const liquidCommerce = await LiquidCommerce(apiKey, config);
   *
   * try {
   *   const token = await liquidCommerce.payment.generateToken();
   *   if ('error' in token) {
   *     console.error('Failed to generate payment token:', token.error.message);
   *   } else {
   *     console.log('Generated payment token:', token);
   *   }
   * } catch (error) {
   *   console.error('An unexpected error occurred:', error);
   * }
   *
   * @throws {Error} - Throws an error if token generation fails.
   */
  generateToken(): Promise<ILiquidPaymentToken>;

  /**
   * Subscribes to a specific event type on the payment element.
   *
   * @param {K} eventType - The type of event to subscribe to.
   * @param {function} handler - The function to be called when the event occurs.
   * @returns {void}
   *
   * @example
   * const liquidCommerce = await LiquidCommerce(apiKey, config);
   *
   * try {
   *   liquidCommerce.payment.subscribe('change', (event) => {
   *     console.log('Payment element changed:', event);
   *   });
   *
   *   liquidCommerce.payment.subscribe('ready', () => {
   *     console.log('Payment element is ready');
   *   });
   * } catch (error) {
   *   console.error('Failed to subscribe to payment element event:', error);
   * }
   *
   * @throws {Error} - Throws an error if the payment element has not been initialized.
   */
  subscribe<K extends keyof IPaymentElementEventMap>(eventType: K, handler: (event: IPaymentElementEventMap[K]) => void): void;

  /**
   * Unsubscribes from a specific event type on the payment element.
   *
   * @param {K} eventType - The type of event to unsubscribe from.
   * @param {function} [handler] - The function to be removed. If not provided, all handlers for the event type will be removed.
   * @returns {void}
   *
   * @example
   * const liquidCommerce = await LiquidCommerce(apiKey, config);
   *
   * const changeHandler = (event) => {
   *   console.log('Payment element changed:', event);
   * };
   *
   * try {
   *   // Subscribe to the event
   *   liquidCommerce.payment.subscribe('change', changeHandler);
   *
   *   // Later, unsubscribe from the event
   *   liquidCommerce.payment.unsubscribe('change', changeHandler);
   *
   *   // Or, remove all handlers for the 'change' event
   *   liquidCommerce.payment.unsubscribe('change');
   * } catch (error) {
   *   console.error('Failed to unsubscribe from payment element event:', error);
   * }
   *
   * @throws {Error} - Throws an error if the payment element has not been initialized.
   */
  unsubscribe<K extends keyof IPaymentElementEventMap>(eventType: K, handler?: (event: IPaymentElementEventMap[K]) => void): void;

  /**
   * Collapses the payment element if it has been initialized.
   *
   * @returns {void}
   *
   * @example
   * const liquidCommerce = await LiquidCommerce(apiKey, config);
   *
   * try {
   *   liquidCommerce.payment.collapse();
   *   console.log('Payment element collapsed');
   * } catch (error) {
   *   console.error('Failed to collapse payment element:', error);
   * }
   *
   * @throws {Error} - Throws an error if the payment element has not been initialized.
   */
  collapse(): void;

  /**
   * Unmounts the payment element from the DOM.
   *
   * @returns {void}
   *
   * @example
   * const liquidCommerce = await LiquidCommerce(apiKey, config);
   *
   * try {
   *   liquidCommerce.payment.unmount();
   *   console.log('Payment element unmounted');
   * } catch (error) {
   *   console.error('Failed to unmount payment element:', error);
   * }
   *
   * @throws {Error} - Throws an error if the payment element has not been initialized.
   */
  unmount(): void;

  /**
   * Destroys the payment element if it has been initialized.
   *
   * @returns {void}
   *
   * @example
   * const liquidCommerce = await LiquidCommerce(apiKey, config);
   *
   * try {
   *   liquidCommerce.payment.destroy();
   *   console.log('Payment element destroyed');
   * } catch (error) {
   *   console.error('Failed to destroy payment element:', error);
   * }
   *
   * @throws {Error} - Throws an error if the payment element has not been initialized.
   */
  destroy(): void;
}

export interface ICheckoutMethod {
  /**
   * Prepares a checkout based on the provided parameters.
   *
   * @param {ICheckoutPrepareParams} params - The parameters for preparing the checkout.
   * @returns {Promise<IApiResponseWithoutData<ICheckoutPrepareResponse>>} A promise that resolves to an API response containing the prepared checkout data.
   *
   * @example
   * const liquidCommerce = await LiquidCommerce(apiKey, config);
   *
   * try {
   *   const preparedCheckout = await liquidCommerce.checkout.prepare({
   *   cartId: "65df5c***********512f", // create a new cart and add the cart id
   *   recipient: {
   *     firstName: "Jack",
   *     lastName: "Smith",
   *     email: "sample.jack@gmail.com",
   *     phone: "2129983315",
   *     birthDate: "11-22-1998",
   *     hasAgeVerify: false
   *   },
   *   billingAddress: {
   *     firstName: "Jenna",
   *     lastName: "Smith",
   *     email: "sample.jenna@gmail.com",
   *     phone: "2129983315",
   *     one: "251 Mercer St",
   *     two: "",
   *     city: "New York",
   *     state: "NY",
   *     zip: "10012"
   *   },
   *   hasSubstitutionPolicy: true,
   *   isGift: false,
   *   billingSameAsShipping: false,
   *   giftOptions: {
   *     message: "",
   *     recipient: {
   *       name: "",
   *       phone: "",
   *       email: ""
   *     }
   *   },
   *   marketingPreferences: {
   *     canEmail: true,
   *     canSms: true
   *   },
   *   deliveryTips: [
   *     {
   *       fulfillmentId: "6570c3e********1910c105",
   *       tip: 2500
   *     }
   *   ],
   * });
   *
   *   console.log('Prepared checkout:', preparedCheckout);
   * } catch (error) {
   *   console.error('Checkout preparation failed:', error);
   * }
   *
   * @throws {Error} Throws an error if the checkout preparation request fails or if authentication is unsuccessful.
   *
   * @see {@link ICheckoutPrepareParams} for the structure of the prepare request parameters.
   * @see {@link ICheckoutPrepareResponse} for the structure of the prepared checkout data returned.
   */
  prepare: (params: ICheckoutPrepareParams) => Promise<IApiResponseWithoutData<ICheckoutPrepareResponse>>;

  /**
   * Completes a checkout process with the provided token and payment information.
   *
   * @param {ICheckoutCompleteParams} params - The parameters for completing the checkout.
   * @returns {Promise<IApiResponseWithoutData<ICheckoutCompleteResponse>>} A promise that resolves to the completed checkout data.
   *
   * @example
   * const liquidCommerce = await LiquidCommerce(apiKey, config);
   *
   * try {
   *   const completedCheckout = await liquidCommerce.checkout.complete({
   *     token: 'checkout_token_123',
   *     payment: 'payment_id_456'
   *   });
   *   console.log('Completed checkout:', completedCheckout);
   * } catch (error) {
   *   console.error('Checkout completion failed:', error);
   * }
   *
   * @throws {Error} If the checkout completion request fails.
   *
   * @see {@link ICheckoutCompleteParams} for the structure of the complete request parameters.
   * @see {@link ICheckoutCompleteResponse} for the structure of the complete checkout data returned.
   *
   */
  complete: (params: ICheckoutCompleteParams) => Promise<IApiResponseWithoutData<ICheckoutCompleteResponse>>;
}
