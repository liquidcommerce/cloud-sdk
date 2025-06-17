import type { StripePaymentElementChangeEvent } from '@stripe/stripe-js';
import type { StripeError } from '@stripe/stripe-js/dist/stripe-js/stripe';

/**
 * Represents the options to configure the layout for a liquid payment element.
 *
 * @interface
 * @property {'tabs' | 'accordion' | 'auto'} [layout] - Determines the layout style.
 *    - 'tabs': Layout will use tabbed navigation.
 *    - 'accordion': Layout will use accordion-style sections.
 *    - 'auto': Layout style will be chosen automatically based on context.
 */
export interface ILiquidPaymentElementOptions {
  layout?: 'tabs' | 'accordion' | 'auto';
}

/**
 * The configuration interface for Liquid Payment.
 *
 * @interface ILiquidPaymentConfig
 *
 * @property {string} clientSecret - The secret key for the client.
 *
 * @property {string} key - The API key provided for access.
 *
 * @property {string} elementId - The ID of the HTML element where the payment form will be rendered.
 *
 * @property {Object} [appearance] - Optional configuration for styling the payment element.
 *
 * @property {'default' | 'night' | 'flat'} [appearance.theme] - An optional theme for the payment form appearance.
 *
 * @property {ILiquidPaymentElementOptions} [elementOptions] - Additional options for configuring the payment element.
 */
export interface ILiquidPaymentConfig {
  clientSecret: string;

  key: string;

  elementId: string;

  appearance?: {
    theme?: 'stripe' | 'night' | 'flat';
  };

  elementOptions?: ILiquidPaymentElementOptions;
}

/**
 * Interface representing the parameters required to confirm a session.
 *
 * Properties:
 * - sessionSecret: A string representing the secret key for the session.
 * - paymentMethodId: A string ID corresponding to the payment method to be used.
 */
export interface IConfirmSessionParams {
  sessionSecret: string;

  paymentMethodId: string;
}

/**
 * Interface for representing a liquid payment token.
 *
 * An `ILiquidPaymentToken` contains relevant information about
 * a payment token, which can be associated with various payment methods
 * such as credit cards.
 *
 * Properties:
 * @property {string} [id] - The unique identifier for the payment token.
 * @property {string} [type] - The type/category of the payment token.
 * @property {object} [card] - Information about the card associated with the payment token.
 * @property {string|null} [card.brand] - The brand of the card (e.g., Visa, MasterCard).
 * @property {string|null} [card.country] - The country where the card was issued.
 * @property {number|null} [card.expMonth] - The expiration month of the card.
 * @property {number|null} [card.expYear] - The expiration year of the card.
 * @property {string|null} [card.last4] - The last four digits of the card number.
 * @property {string|null} [card.funding] - The funding type of the card (e.g., credit, debit).
 * @property {number} [created] - The timestamp (Unix epoch) indicating when the token was created.
 * @property {object} [error] - Information about any error that occurred while generating the token.
 * @property {string} [error.message] - The error message.
 * @property {string} [error.code] - A code representing the specific error that occurred.
 */
export interface ILiquidPaymentToken {
  id?: string;

  type?: string;

  card?: {
    brand: string | null;
    country: string | null;
    expMonth: number | null;
    expYear: number | null;
    last4: string | null;
    funding: string | null;
  };

  created?: number;

  error?: {
    message: string;
    code?: string;
  };
}

/**
 * This interface represents an error encountered during a liquid payment process.
 *
 * Properties:
 *
 * - type: A string indicating the type of error. Possible values are:
 *   - 'validation_error': Indicates a validation error.
 *   - 'api_error': Indicates an error related to the API.
 *   - 'client_error': Indicates an error on the client side.
 *   - 'confirm_error': Indicates an error during confirmation.
 *
 * - message: A string providing a descriptive message about the error.
 *
 * - code: An optional string that can provide a specific error code.
 *
 * - param: An optional string indicating the parameter that caused the error, if applicable.
 */
export interface ILiquidPaymentError {
  type: 'validation_error' | 'api_error' | 'client_error' | 'confirm_error';

  message: string;

  code?: string;

  param?: string;
}

/**
 * Represents the event map for payment elements and defines the types of events
 * that can occur within the payment process.
 */
export interface IPaymentElementEventMap {
  change: StripePaymentElementChangeEvent;

  ready: StripePaymentElementChangeEvent;

  loaderror: { elementType: 'payment'; error: StripeError };

  loaderstart: { elementType: 'payment' };
}

/**
 * Parameters for creating a Stripe Confirmation Token using the UI helper.
 */
export interface IConfirmationTokenClientParams {
  returnUrl?: string;
}

export interface IConfirmationTokenPayload {
  token: string;
}

export type IConfirmationTokenResponse = IConfirmationTokenPayload | ILiquidPaymentError;

/**
 * Interface representing a payment provider that integrates with a Liquid payment gateway.
 */
export interface IPaymentProvider {
  /**
   * Mounts the payment configuration for the Liquid payment gateway.
   *
   * @param {ILiquidPaymentConfig} config - The configuration object for the Liquid payment gateway.
   *
   * @return {Promise<void>} A promise that resolves when the payment configuration is successfully mounted.
   */
  mount(config: ILiquidPaymentConfig): Promise<void>;

  /**
   * Generates a Liquid Payment Token.
   *
   * This method returns a Promise that resolves either with a LiquidPaymentToken object or an error object of type ILiquidPaymentError.
   *
   * @returns {Promise<ILiquidPaymentToken | ILiquidPaymentError>} - A Promise that resolves with a LiquidPaymentToken or an error object of type ILiquidPaymentError.
   */
  generateToken(): Promise<ILiquidPaymentToken | ILiquidPaymentError>;

  /**
   * Subscribes a handler function to a specific event type in the IPaymentElementEventMap.
   *
   * @param eventType - The type of the event to subscribe to. Must be one of the keys in the IPaymentElementEventMap.
   * @param handler - The handler function to be called when the specified event occurs. The function receives the event object as its argument.
   *
   * @return void
   */
  subscribe<K extends keyof IPaymentElementEventMap>(
    eventType: K,
    handler: (event: IPaymentElementEventMap[K]) => void
  ): void;

  /**
   * Unsubscribes the specified event handler from the specified event type.
   *
   * @param eventType - The type of event to unsubscribe from.
   * @param handler - (optional) The event handler function to unsubscribe. If not specified, all event handlers for the specified event type will be unsubscribed.
   *
   * @return void
   */
  unsubscribe<K extends keyof IPaymentElementEventMap>(
    eventType: K,
    handler?: (event: IPaymentElementEventMap[K]) => void
  ): void;
}
