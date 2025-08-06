import type {
  Stripe,
  StripeElements,
  StripeElementsOptions,
  StripeElementsOptionsClientSecret,
  StripePaymentElement,
  StripePaymentElementOptions,
} from '@stripe/stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import type {
  IConfirmSessionParams,
  ILiquidPaymentConfig,
  ILiquidPaymentElementOptions,
  ILiquidPaymentError,
  ILiquidPaymentToken,
  IPaymentElementEventMap,
  IPaymentProvider,
} from '../interfaces';
import type { IApiResponseWithData } from '../types';
import type { AuthenticatedService } from './authenticated.service';

type ExtendedStripeElementsOptions = StripeElementsOptionsClientSecret & {
  paymentMethodCreation?: 'manual' | 'automatic';
};

/**
 * Represents a service for handling payment processing using the Stripe API.
 * Implements the IPaymentProvider interface.
 */
export class PaymentProviderService implements IPaymentProvider {
  private stripe: Stripe | null = null;

  private elements: StripeElements | null = null;

  private paymentElement: StripePaymentElement | null = null;

  private readonly events = ['ready', 'change', 'loaderror', 'loaderstart'];

  private readonly eventsErrorMsg =
    'The only Payment Element events allowed (change, ready, loaderstart, loadererror)';

  private clientSecret: string | null = null;

  constructor(private client: AuthenticatedService) {}

  /**
   * Mounts the Stripe payment element to the specified container element on the page.
   *
   * @param {ILiquidPaymentConfig} config - The configuration object for the payment element.
   *
   * @throws {Error} If the container element with the specified ID is not found.
   * @throws {Error} If there is an error loading or initializing the Stripe API.
   *
   * @return {Promise<void>} A promise that resolves when the payment element is successfully mounted.
   */
  public async mount(config: ILiquidPaymentConfig): Promise<void> {
    const container = document.getElementById(config.elementId);
    if (!container) {
      throw new Error(`Element with id "${config.elementId}" not found`);
    }

    try {
      this.stripe = await loadStripe(config.key);
    } catch {
      throw new Error('Failed to initialize Stripe');
    }

    if (!this.stripe) {
      throw new Error('Failed to initialize Stripe');
    }

    this.clientSecret = config.clientSecret;

    try {
      const { setupIntent } = await this.stripe.retrieveSetupIntent(this.clientSecret);

      if (setupIntent?.status === 'succeeded') {
        throw new Error(
          `The client secret (${this.clientSecret}) has already been used previously. Generate a new one through a use session.`
        );
      }
    } catch (e) {
      throw e;
    }

    const stripeElementsOptions: ExtendedStripeElementsOptions = {
      clientSecret: config.clientSecret,
      appearance: this.mapAppearance(config.appearance),
      paymentMethodCreation: 'manual',
    };

    this.elements = this.stripe.elements(stripeElementsOptions);

    const paymentElementOptions: StripePaymentElementOptions = this.mapElementOptions(
      config.elementOptions
    );
    this.paymentElement = this.elements.create('payment', paymentElementOptions);

    this.paymentElement.mount(`#${config.elementId}`);
  }

  /**
   * Generate a payment token for a liquid payment.
   *
   * This method generates a payment token using the Stripe API. The payment token represents the payment
   * information provided by the user. The method first checks if the Stripe instance and the Stripe Elements
   * instance have been initialized. If not, it returns an error indicating that the payment form has not been
   * initialized.
   *
   * Next, the method submits the payment form using the `submit()` method of the Stripe Elements instance.
   * If there is an error during the submission, it returns a validation error indicating the error message
   * and code.
   *
   * After successful submission, the method creates a payment method using the `createPaymentMethod()`
   * method of the Stripe instance, passing the Stripe Elements instance as a parameter. If there is
   * an error during the creation of the payment method, it returns the appropriate error containing
   * the error message, code, and parameter (if applicable).
   *
   * If the payment method is successfully created, the method returns the payment information in the form
   * of an object containing the payment method's ID, type, and card details (if available), as well as the
   * creation timestamp. The card details include the card brand, country, expiration month, expiration year,
   * last 4 digits, and funding source.
   *
   * If none of the above conditions are met, it returns an error indicating that the payment token generation
   * has failed.
   *
   * @returns A Promise that resolves to either a LiquidPaymentToken object or a LiquidPaymentError object.
   *
   * The LiquidPaymentToken object has the following properties:
   * - id (string): The ID of the payment method.
   * - type (string): The type of the payment method.
   * - card (object): An optional object containing the card details.
   *    - brand (string): The brand of the card.
   *    - country (string): The country of the card.
   *    - expMonth (number): The expiration month of the card.
   *    - expYear (number): The expiration year of the card.
   *    - last4 (string): The last 4 digits of the card.
   *    - funding (string): The funding source of the card.
   * - created (number): The timestamp indicating when the payment method was created.
   *
   * The LiquidPaymentError object has the following properties:
   * - type (string): The type of the error (either 'client_error', 'validation_error', api_error, or 'confirm_error').
   * - message (string): The error message.
   * - code (string): The error code (if applicable).
   * - param (string): The error parameter (if applicable).
   */
  public async generateToken(): Promise<ILiquidPaymentToken | ILiquidPaymentError> {
    if (!this.stripe || !this.elements || !this.clientSecret) {
      return {
        type: 'client_error',
        message: 'Payment form has not been initialized',
      };
    }

    // Submit the form first
    const { error: submitError } = await this.elements.submit();
    if (submitError) {
      return {
        type: 'validation_error',
        message: submitError.message,
        code: submitError.code,
      };
    }

    // Then create the payment method
    const { error, paymentMethod } = await this.stripe.createPaymentMethod({
      elements: this.elements,
    });

    if (error) {
      return {
        type: error.type === 'validation_error' ? 'validation_error' : 'api_error',
        message: error.message,
        code: error.code,
        param: error.param,
      };
    }

    const { setupIntent } = await this.stripe.retrieveSetupIntent(this.clientSecret);

    if (!setupIntent) {
      return {
        type: 'confirm_error',
        message: "There's been an error during your session confirmation",
        code: '7190',
      };
    }

    const { data } = await this.confirmSession({
      paymentMethodId: paymentMethod?.id ?? '',
      sessionSecret: setupIntent?.id ?? '',
    });

    if (!data) {
      return {
        type: 'confirm_error',
        message: "There's been an error during your session confirmation",
        code: '7191',
      };
    }

    if (paymentMethod) {
      return {
        id: paymentMethod.id,
        type: paymentMethod.type,
        card: paymentMethod?.card
          ? {
              brand: paymentMethod.card?.brand ?? '',
              country: paymentMethod.card.country ?? '',
              expMonth: paymentMethod.card.exp_month ?? 0,
              expYear: paymentMethod.card.exp_year ?? 0,
              last4: paymentMethod.card.last4 ?? '',
              funding: paymentMethod.card.funding ?? '',
            }
          : undefined,
        created: paymentMethod?.created ?? 0,
      };
    }

    return {
      type: 'client_error',
      message: 'Failed to generate payment token',
    };
  }

  /**
   * Confirms the user session by providing session secret and payment method ID.
   *
   * @param {Object} params - The parameters required for confirming the session.
   * @param {string} params.sessionSecret - The secret key associated with the session.
   * @param {string} params.paymentMethodId - The ID of the payment method used in the session.
   * @return {Promise<IApiResponseWithData<boolean>>} - Returns a promise that resolves to the API response with data indicating the confirmation status.
   */
  public async confirmSession({
    sessionSecret,
    paymentMethodId,
  }: IConfirmSessionParams): Promise<IApiResponseWithData<{ data: boolean }>> {
    try {
      if (!sessionSecret || !paymentMethodId) {
        throw new Error('customerId, sessionSecret, paymentMethodId are required');
      }

      return await this.client.post<IApiResponseWithData<{ data: boolean }>>(
        '/users/payments/confirm',
        {
          sessionSecret,
          paymentMethodId,
        }
      );
    } catch (error) {
      console.error('User session confirmation request failed:', error);
      throw error;
    }
  }

  /**
   * Subscribes to a specific event on the payment element.
   *
   * @param eventType - The type of event to subscribe to.
   * @param handler - The function to be called when the event is triggered.
   * @throws {Error} - If the payment element has not been initialized.
   * @return {void}
   */
  public subscribe<K extends keyof IPaymentElementEventMap>(
    eventType: K,
    handler: (event: IPaymentElementEventMap[K]) => void
  ): void {
    if (!this.paymentElement) {
      throw new Error('Payment Element has not been initialized');
    }

    if (!this.events.includes(eventType)) {
      throw new Error(this.eventsErrorMsg);
    }

    this.paymentElement.on(eventType as any, handler as any);
  }

  /**
   * Unsubscribes an event handler from a specific event type in the payment element.
   *
   * @param eventType - The type of event to unsubscribe from.
   * @param handler - (Optional) The event handler function to unsubscribe.
   * @throws {Error} - Thrown if the payment element has not been initialized.
   * @return {void}
   */
  public unsubscribe<K extends keyof IPaymentElementEventMap>(
    eventType: K,
    handler?: (event: IPaymentElementEventMap[K]) => void
  ): void {
    if (!this.paymentElement) {
      throw new Error('Payment Element has not been initialized');
    }

    if (!this.events.includes(eventType)) {
      throw new Error(this.eventsErrorMsg);
    }

    this.paymentElement.off(eventType as any, handler as any);
  }

  /**
   * Maps the appearance options from the provided LiquidPaymentConfig object
   * to the corresponding StripeElementsOptions object.
   *
   * @param appearance - The appearance options from the LiquidPaymentConfig object.
   * @returns The appearance options for the StripeElementsOptions object.
   */
  private mapAppearance(
    appearance?: ILiquidPaymentConfig['appearance']
  ): StripeElementsOptions['appearance'] {
    if (!appearance) return undefined;

    return {
      theme: appearance.theme === 'night' ? 'night' : 'stripe',
      // Pass through the variables if they exist
      ...(appearance.variables || {}),
      // Map other appearance options as needed
    };
  }

  /**
   * Maps the given options to Stripe payment element options.
   *
   * @param {ILiquidPaymentElementOptions} options - The options to be mapped.
   * @return {StripePaymentElementOptions} - The mapped Stripe payment element options.
   */
  private mapElementOptions(options?: ILiquidPaymentElementOptions): StripePaymentElementOptions {
    return {
      layout: options?.layout,
      wallets: { applePay: 'auto', googlePay: 'auto' },
    };
  }

  /**
   * Unmounts the payment element from the DOM.
   * Throws an error if the payment element has not been initialized.
   *
   * @return {void}
   */
  public unmount(): void {
    if (!this.paymentElement) {
      throw new Error('Payment Element has not been initialized');
    }

    this.paymentElement.unmount();
  }

  /**
   * Collapses the payment element if it has been initialized.
   * Throws an error if the payment element has not been initialized.
   *
   * @return {void}
   */
  public collapse(): void {
    if (!this.paymentElement) {
      throw new Error('Payment Element has not been initialized');
    }

    this.paymentElement.collapse();
  }

  /**
   * Destroys the payment element if it has been initialized.
   *
   * @return {void} No return value.
   * @throws {Error} Will throw an error if the payment element has not been initialized.
   */
  public destroy(): void {
    if (!this.paymentElement) {
      throw new Error('Payment Element has not been initialized');
    }

    this.paymentElement.destroy();
  }
}
