import type { StripePaymentElementChangeEvent } from '@stripe/stripe-js';
import type { StripeError } from '@stripe/stripe-js/dist/stripe-js/stripe';

export interface ILiquidPaymentElementOptions {
  layout?: 'tabs' | 'accordion' | 'auto';
}

export interface ILiquidPaymentConfig {
  clientSecret: string;

  key: string;

  elementId: string;

  appearance?: {
    theme?: 'default' | 'night' | 'flat';
  };

  elementOptions?: ILiquidPaymentElementOptions;
}

export interface IConfirmSessionParams {
  sessionSecret: string;

  paymentMethodId: string;
}

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

export interface ILiquidPaymentError {
  type: 'validation_error' | 'api_error' | 'client_error' | 'confirm_error';

  message: string;

  code?: string;

  param?: string;
}

export interface IPaymentElementEventMap {
  change: StripePaymentElementChangeEvent;

  ready: StripePaymentElementChangeEvent;

  loaderror: { elementType: 'payment'; error: StripeError };

  loaderstart: { elementType: 'payment' };
}

/**
 * Interface for the payment provider.
 * @interface
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
