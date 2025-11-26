import type {
  Appearance,
  CreateConfirmationToken,
  Stripe,
  StripeElements,
  StripeElementsOptionsClientSecret,
  StripePaymentElement,
  StripePaymentElementOptions,
} from '@stripe/stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { PaymentSessionHelperService, SingletonManager } from './core';
import type {
  IConfirmationTokenClientParams,
  IConfirmationTokenResponse,
  ILiquidCommercePaymentElement,
  IPaymentElementConfig,
  IPaymentElementEventMap,
  PaymentElementImplConstructor,
} from './interfaces';

/**
 * Payment element implementation for secure payment processing.
 * Handles mounting UI components, token generation, and lifecycle management.
 * Designed for browser environments only.
 *
 * @class
 * @implements {ILiquidCommercePaymentElement}
 * @private
 */
class PaymentElementImpl implements ILiquidCommercePaymentElement {
  private provider: Stripe | null = null;

  private componentSet: StripeElements | null = null;

  private uiComponent: StripePaymentElement | null = null;

  private readonly paymentSessionHelperService: PaymentSessionHelperService;

  private k: string;

  private readonly s: string;

  private isProviderLoading = false;

  private providerLoadPromise: Promise<Stripe | null> | null = null;

  private readonly allowedEvents = ['ready', 'change', 'focus', 'blur', 'loaderror', 'loaderstart'];

  /**
   * Initializes the payment element with required credentials.
   *
   * @constructor
   * @param {IPaymentElementConfig} options - Configuration including authentication keys.
   * @throws {Error} If required credentials are missing.
   */
  constructor(options: IPaymentElementConfig) {
    if (!options?.session.key || !options?.session?.secret) {
      throw new Error('Authentication credentials are required.');
    }

    this.k = options.session.key;
    this.s = options.session?.secret;
    this.paymentSessionHelperService = new PaymentSessionHelperService();
  }

  /**
   * Ensures payment provider SDK is loaded and ready.
   *
   * @private
   * @returns {Promise<Stripe | null>} Provider instance or null.
   * @throws {Error} If provider fails to initialize.
   */
  private async ensureProviderReady(): Promise<Stripe | null> {
    if (this.provider) return this.provider;
    if (this.isProviderLoading && this.providerLoadPromise) return this.providerLoadPromise;

    this.isProviderLoading = true;
    this.providerLoadPromise = loadStripe(this.k)
      .then((instance) => {
        this.isProviderLoading = false;
        if (!instance) {
          throw new Error('Failed to initialize payment provider');
        }

        this.provider = instance;
        return this.provider;
      })
      .catch((error) => {
        this.isProviderLoading = false;
        this.providerLoadPromise = null;
        throw error;
      });

    return this.providerLoadPromise;
  }

  /**
   * Renders the payment UI in the specified container.
   */
  async mount(config: IPaymentElementConfig): Promise<void> {
    if (typeof document === 'undefined') {
      throw new Error('Payment UI requires a browser environment.');
    }

    const container = document.getElementById(config.elementId);
    if (!container) {
      throw new Error(`Container element "${config.elementId}" not found.`);
    }

    try {
      const providerInstance = await this.ensureProviderReady();

      if (!providerInstance) {
        throw new Error('Provider initialization failed');
      }

      const appearance = (config?.appearance ?? {
        theme: 'stripe',
      }) as Appearance;

      const componentOptions: StripeElementsOptionsClientSecret = {
        clientSecret: this.s,
        appearance,
      };
      this.componentSet = providerInstance.elements(componentOptions);

      const uiOptions: StripePaymentElementOptions = {
        layout: config.elementOptions?.layout || 'tabs',
        ...(config.elementOptions || {}),
        defaultValues: {
          billingDetails: {
            name: 'Guest',
            address: {
              country: 'US',
            },
          },
        },
        fields: {
          billingDetails: {
            address: {
              postalCode: 'auto',
              country: 'never',
            },
          },
        },
        terms: {
          applePay: 'never',
          auBecsDebit: 'never',
          bancontact: 'never',
          card: 'never',
          cashapp: 'never',
          googlePay: 'never',
          ideal: 'never',
          paypal: 'never',
          sepaDebit: 'never',
          sofort: 'never',
          usBankAccount: 'never',
        },
      };
      this.uiComponent = this.componentSet.create('payment', uiOptions);
      this.uiComponent.mount(container);
    } catch (error: any) {
      this.logger.error('UI initialization failed:', error);
      throw new Error(`Failed to initialize payment UI: ${error?.message}`);
    }
  }

  /**
   * Generates a secure token for payment confirmation.
   */
  async createConfirmationToken(
    params?: IConfirmationTokenClientParams
  ): Promise<IConfirmationTokenResponse> {
    if (!this.provider || !this.componentSet || !this.uiComponent) {
      return {
        type: 'client_error',
        message: 'Payment component not initialized. Call mount() first.',
      };
    }

    try {
      const { error: submitError } = await this.componentSet.submit();
      if (submitError) {
        return {
          type: 'validation_error',
          message: submitError.message || 'Form validation failed',
          code: submitError.code,
        };
      }

      const tokenParams: CreateConfirmationToken = {
        elements: this.componentSet,
        params: {
          return_url: params?.returnUrl ?? window.location.href,
          payment_method_data: {
            allow_redisplay: 'always',
            billing_details: {
              name: 'Guest',
              address: {
                country: 'US',
              },
            },
          },
          shipping: {
            name: 'Guest',
            address: {
              country: 'US',
              city: null,
              line1: null,
              line2: null,
              postal_code: null,
              state: null,
            },
          },
        },
      };

      const { error, confirmationToken } = await this.provider.createConfirmationToken(tokenParams);

      if (error) {
        return {
          type: error.type === 'validation_error' ? 'validation_error' : 'api_error',
          message: error.message || 'Token generation failed',
          code: error.code,
        };
      }

      if (!confirmationToken || !confirmationToken.id) {
        return {
          type: 'api_error',
          message: 'Token generation incomplete.',
        };
      }

      const token = this.paymentSessionHelperService.ocd(confirmationToken.id, this.s);

      return { token };
    } catch (error: any) {
      this.logger.error('Token generation error:', error);
      return {
        type: 'client_error',
        message: `Unexpected error: ${error?.message}`,
      };
    }
  }

  private get logger() {
    return {
      log: (...args: any[]) => console.log('[LC Payment]', ...args),
      error: (...args: any[]) => console.error('[LC Payment]', ...args),
    };
  }

  /**
   * Registers event handlers for UI interactions.
   *
   * @template K
   * @param {K} eventType - Event to monitor.
   * @param {(event: IPaymentElementEventMap[K]) => void} handler - Event handler function.
   * @returns {void}
   */
  subscribe<K extends keyof IPaymentElementEventMap>(
    eventType: K,
    handler: (event: IPaymentElementEventMap[K]) => void
  ): void {
    if (!this.uiComponent) {
      this.logger.error('Cannot subscribe: Component not initialized.');
      return;
    }

    if (!this.allowedEvents.includes(eventType)) {
      this.logger.error(
        `Event "${eventType}" not supported. Available: ${this.allowedEvents.join(', ')}`
      );
      return;
    }

    this.uiComponent.on(eventType as any, handler as any);
  }

  /**
   * Removes event handlers.
   *
   * @template K
   * @param {K} eventType - Event type to unsubscribe from.
   * @param {(event: IPaymentElementEventMap[K]) => void} [handler] - Specific handler to remove.
   * @returns {void}
   */
  unsubscribe<K extends keyof IPaymentElementEventMap>(
    eventType: K,
    handler?: (event: IPaymentElementEventMap[K]) => void
  ): void {
    if (!this.uiComponent) {
      this.logger.error('Cannot unsubscribe: Component not initialized.');
      return;
    }

    if (!this.allowedEvents.includes(eventType)) {
      this.logger.error(`Event "${eventType}" not supported.`);
      return;
    }

    this.uiComponent.off(eventType as any, handler as any);
  }

  /**
   * Removes the UI component from the DOM.
   * @returns {void}
   */
  unmount(): void {
    if (this.uiComponent) {
      this.uiComponent.unmount();
      this.logger.log('Component unmounted.');
    }
  }

  /**
   * Releases all resources and cleans up the component.
   * @returns {void}
   */
  destroy(): void {
    if (this.uiComponent) {
      this.uiComponent.destroy();
      this.uiComponent = null;
      this.componentSet = null;
      this.logger.log('Component destroyed.');
    }
  }

  /**
   * Minimizes the UI component if supported.
   * @returns {void}
   */
  collapse(): void {
    if (this.uiComponent && typeof this.uiComponent.collapse === 'function') {
      this.uiComponent.collapse();
    } else {
      this.logger.error('Cannot collapse: Component not initialized or action not supported.');
    }
  }
}

/**
 * Factory function to create a singleton payment element instance.
 * Ensures consistent state management across the application.
 *
 * @param {IPaymentElementConfig} options - Configuration for the payment element.
 * @returns {ILiquidCommercePaymentElement} Payment element instance.
 * @throws {Error} If singleton manager is not properly configured.
 */
export function LiquidCommercePaymentElement(
  options: IPaymentElementConfig
): ILiquidCommercePaymentElement {
  const manager = SingletonManager.getInstance() as any;

  if (
    typeof manager.setPaymentElementConstructor !== 'function' ||
    typeof manager.getPaymentElement !== 'function'
  ) {
    console.error(
      'SingletonManager missing required payment element methods. ' +
        'Falling back to direct instantiation.'
    );
    if (!manager.__paymentElementInstance) {
      manager.__paymentElementInstance = new PaymentElementImpl(options);
    }

    return manager.__paymentElementInstance;
  }

  manager.setPaymentElementConstructor(PaymentElementImpl as PaymentElementImplConstructor);
  return manager.getPaymentElement(options);
}
