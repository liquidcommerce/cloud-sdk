import type { ILiquidCommercePaymentConfig } from '../types';
import type {
  ILiquidPaymentConfig,
  ILiquidPaymentToken,
  IPaymentElementEventMap,
} from './payment.interface';

/**
 * Interface representing the LiquidCommerce client.
 * Provides access to methods related to addresses, catalogs, carts, and initialization.
 *
 * @interface
 */
export interface ILiquidCommercePaymentClient {
  /**
   * Initializes the client by authenticating with the LiquidCommerce API.
   * Should be called before making any API requests.
   *
   * @return {Promise<void>} - Resolves when the client is successfully initialized.
   * @throws {Error} - Throws an error if initialization fails.
   */
  init(): Promise<void>;

  /**
   * Provides methods for processing payments.
   * See {@link IPaymentMethod} for more details on the available methods.
   */
  payment: IPaymentMethod;
}

/**
 * Type for the LiquidCommerceClient constructor.
 * Used to define the expected constructor signature.
 *
 * @type {new (apiKey: string, config: ILiquidCommercePaymentConfig) => ILiquidCommerceClient} ILiquidCommerceClientConstructor
 */
export type ILiquidCommercePaymentClientConstructor = new (
  apiKey: string,
  config: ILiquidCommercePaymentConfig
) => ILiquidCommercePaymentClient;

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
  subscribe<K extends keyof IPaymentElementEventMap>(
    eventType: K,
    handler: (event: IPaymentElementEventMap[K]) => void
  ): void;

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
  unsubscribe<K extends keyof IPaymentElementEventMap>(
    eventType: K,
    handler?: (event: IPaymentElementEventMap[K]) => void
  ): void;

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
