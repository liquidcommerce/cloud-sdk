import type {
  IConfirmationTokenClientParams,
  IConfirmationTokenResponse,
  ILiquidPaymentElementOptions,
  IPaymentElementEventMap,
} from './payment.interface';
import type { IUserSession } from './user.interface';

export interface IPaymentElementConfig {
  session: IUserSession;

  elementId: string;

  appearance?: {
    theme?: 'stipe' | 'night' | 'flat';
  };

  elementOptions?: ILiquidPaymentElementOptions;
}

/**
 * Defines the public interface for the Liquid Commerce Payment Element.
 * This element provides a secure UI component for collecting payment information
 * through an integrated payment provider.
 *
 * @interface ILiquidCommercePaymentElement
 */
export interface ILiquidCommercePaymentElement {
  /**
   * Mounts the payment UI component to the specified DOM element.
   *
   * @param {IPaymentElementConfig} config - Configuration for mounting the element,
   * including the DOM element ID, appearance options, and session credentials.
   * @returns {Promise<void>} A promise that resolves when the element is successfully mounted.
   * @throws {Error} If the DOM element is not found, if the payment provider SDK fails to load,
   * or if the component cannot be properly initialized.
   */
  mount(config: IPaymentElementConfig): Promise<void>;

  /**
   * Creates a secure confirmation token using the payment data collected by the UI component.
   * This token can be used to complete the payment setup process on the server side.
   *
   * @param {IConfirmationTokenClientParams} [params] - Optional parameters for token creation,
   * such as the return URL for redirect-based payment methods.
   * @returns {Promise<IConfirmationTokenResponse>} A promise that resolves with
   * an object containing the confirmation token ID on success, or an error object describing
   * the failure reason (validation errors, network issues, etc.).
   */
  createConfirmationToken(
    params?: IConfirmationTokenClientParams
  ): Promise<IConfirmationTokenResponse>;

  /**
   * Subscribes to events emitted by the payment UI component for real-time updates
   * on user interactions and component state changes.
   *
   * @template K
   * @param {K} eventType - The type of event to subscribe to. Supported events include:
   * 'ready' (component fully loaded), 'change' (input changes), 'focus', 'blur',
   * 'loaderror' (loading failures), and 'loaderstart' (loading initiated).
   * @param {(event: IPaymentElementEventMap[K]) => void} handler - The callback function
   * to execute when the specified event occurs. Receives event-specific data.
   * @returns {void}
   */
  subscribe<K extends keyof IPaymentElementEventMap>(
    eventType: K,
    handler: (event: IPaymentElementEventMap[K]) => void
  ): void;

  /**
   * Unsubscribes from events emitted by the payment UI component.
   *
   * @template K
   * @param {K} eventType - The type of event to unsubscribe from.
   * @param {(event: IPaymentElementEventMap[K]) => void} [handler] - The specific handler
   * function to remove. If not provided, all handlers for the specified event type will be removed.
   * @returns {void}
   */
  unsubscribe<K extends keyof IPaymentElementEventMap>(
    eventType: K,
    handler?: (event: IPaymentElementEventMap[K]) => void
  ): void;

  /**
   * Unmounts the payment UI component from the DOM, removing its visual elements
   * while preserving the internal state. The component can be remounted later.
   * @returns {void}
   */
  unmount(): void;

  /**
   * Destroys the payment UI component, releasing all associated resources and clearing
   * internal state. This is a permanent action - the component cannot be remounted
   * after destruction and a new instance must be created if needed.
   * @returns {void}
   */
  destroy(): void;

  /**
   * Collapses the payment UI component to a minimized state if this feature is supported
   * by the current configuration and payment provider.
   * @returns {void}
   */
  collapse(): void;
}

/**
 * @private
 * Defines the constructor signature for the PaymentElementImpl class.
 * Used internally by the singleton manager to instantiate the payment element.
 */
export type PaymentElementImplConstructor = new (
  options: IPaymentElementConfig
) => ILiquidCommercePaymentElement;
