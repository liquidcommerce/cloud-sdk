import type { PaymentProviderService } from '../core';
import type {
  ILiquidPaymentConfig,
  ILiquidPaymentError,
  ILiquidPaymentToken,
  IPaymentElementEventMap,
} from '../interfaces';

/**
 * The PaymentService class provides methods for interacting with payment functionality.
 */
export class PaymentService {
  constructor(private paymentProvider: PaymentProviderService) {}

  /**
   * Injects a payment element using the provided configuration.
   *
   * @param config - The configuration object to be used for injecting the payment element.
   * @returns A Promise that resolves when the payment element has been successfully injected.
   * @throws If a failure occurs while injecting the payment element.
   */
  public async mount(config: ILiquidPaymentConfig): Promise<void> {
    try {
      await this.paymentProvider.mount(config);
    } catch (error) {
      console.error('Failed to inject payment element:', error);
      throw error;
    }
  }

  /**
   * Generates a payment token.
   *
   * @return {Promise<ILiquidPaymentToken | ILiquidPaymentError>} - A promise that resolves to either a payment token or an error.
   */
  public async generateToken(): Promise<ILiquidPaymentToken | ILiquidPaymentError> {
    return this.paymentProvider.generateToken();
  }

  /**
   * Subscribes a handler function to a specific event type in the payment element.
   *
   * @param eventType - The type of event to subscribe to. Must be one of the keys in IPaymentElementEventMap.
   * @param handler - The handler function to be called when the specified event occurs.
   * @return void
   */
  public subscribe<K extends keyof IPaymentElementEventMap>(
    eventType: K,
    handler: (event: IPaymentElementEventMap[K]) => void
  ): void {
    this.paymentProvider.subscribe(eventType, handler);
  }

  /**
   * Unsubscribes a handler function from a specific event type for the payment element.
   *
   * @param eventType - The event type to unsubscribe from.
   * @param handler - Optional. The handler function to unsubscribe. If provided, only the specific handler will be unsubscribed. If not provided, all handlers for the event type will be unsubscribed.
   * @return void
   */
  public unsubscribe<K extends keyof IPaymentElementEventMap>(
    eventType: K,
    handler?: (event: IPaymentElementEventMap[K]) => void
  ): void {
    this.paymentProvider.unsubscribe(eventType, handler);
  }

  /**
   * Collapses the payment element if it has been initialized.
   * Throws an error if the payment element has not been initialized.
   *
   * @return {void}
   * @throws {Error} Will throw an error if the payment element has not been initialized.
   */
  public collapse = (): void => this.paymentProvider.collapse();

  /**
   * Unmounts the payment element from the DOM.
   * Throws an error if the payment element has not been initialized.
   *
   * @return {void}
   * @throws {Error} Will throw an error if the payment element has not been initialized.
   */
  public unmount = (): void => this.paymentProvider.unmount();

  /**
   * Destroys the payment element if it has been initialized.
   *
   * @return {void} No return value.
   * @throws {Error} Will throw an error if the payment element has not been initialized.
   */
  public destroy = (): void => this.paymentProvider.destroy();
}
