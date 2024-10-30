import type { IAddress, ICheckoutCompleteParams, ICheckoutCustomer, ICheckoutPrepareParams, ICheckoutRecipient, } from '../interfaces';
import type { LocationHelperService } from './location-helper.service';

/**
 * CheckoutHelperService is a helper class that provides methods
 * for validating and normalizing checkout parameters.
 */
export class CheckoutHelperService {
  constructor(private locationHelperService: LocationHelperService) {}

  /**
   * Validates and normalizes prepare parameters.
   *
   * @param {ICheckoutPrepareParams} params - The prepare parameters to be validated and normalized.
   *
   * @return {ICheckoutPrepareParams} - The normalized prepare parameters.
   *
   * @throws {Error} - Invalid cartId if cartId is missing or not a string.
   */
  public validateAndNormalizePrepareParams(params: ICheckoutPrepareParams): ICheckoutPrepareParams {
    const normalizedParams = { ...params };

    // Validate cartId
    if (!normalizedParams.cartId || typeof normalizedParams.cartId !== 'string') {
      throw new Error('Invalid cartId');
    }

    // Validate Customer
    this.validateCustomer(normalizedParams.customer);

    // Validate Customer
    this.validateCustomer(normalizedParams.recipient);

    // Validate billingAddress if provided
    if (normalizedParams.billingAddress) {
      this.validateAddress(normalizedParams.billingAddress as IAddress);
    }

    normalizedParams.hasAgeVerify = Boolean(
      normalizedParams?.hasAgeVerify ??
        // @ts-expect-error - Due to recipient removal, this.validateCustomer is not used here.
        normalizedParams?.customer?.hasAgeVerify ??
        normalizedParams?.recipient?.hasAgeVerify ??
        false
    );

    // Validate boolean fields
    normalizedParams.hasSubstitutionPolicy = Boolean(normalizedParams.hasSubstitutionPolicy);
    normalizedParams.isGift = Boolean(normalizedParams.isGift);
    normalizedParams.billingSameAsShipping = Boolean(normalizedParams.billingSameAsShipping);

    // Validate giftOptions if isGift is true
    if (normalizedParams.isGift) {
      this.validateGiftOptions(normalizedParams.giftOptions);
    }

    // Validate marketingPreferences
    this.validateMarketingPreferences(normalizedParams.marketingPreferences);

    // Validate deliveryTips if provided
    if (normalizedParams.deliveryTips) {
      this.validateDeliveryTips(normalizedParams.deliveryTips);
    }

    if (normalizedParams.refresh) {
      normalizedParams.refresh = Boolean(normalizedParams.refresh);
    }

    return normalizedParams;
  }

  /**
   * Validates and normalizes the complete checkout parameters.
   *
   * @param {ICheckoutCompleteParams} params - The complete checkout parameters.
   *
   * @throws {Error} If the token is missing or not a string.
   * @throws {Error} If the payment token is missing or not a string.
   *
   * @return {ICheckoutCompleteParams} The validated and normalized complete checkout parameters.
   */
  public validateAndNormalizeCompleteParams(
    params: ICheckoutCompleteParams
  ): ICheckoutCompleteParams {
    const normalizedParams = { ...params };

    // Validate token
    if (!normalizedParams.token || typeof normalizedParams.token !== 'string') {
      throw new Error('Invalid token');
    }

    // Validate payment
    if (!normalizedParams?.payment || typeof normalizedParams.payment !== 'string') {
      throw new Error('Invalid payment token');
    }

    // Validate refresh (optional)
    if (normalizedParams.refresh !== undefined) {
      normalizedParams.refresh = Boolean(normalizedParams.refresh);
    }

    return normalizedParams;
  }

  /**
   * Validates the recipient or customer information for a checkout.
   *
   * @param customer - The recipient or customer information to validate.
   *                   Can be an object of type ICheckoutRecipient or ICheckoutCustomer,
   *                   or a string (presumably a customer ID).
   *
   * @throws {Error} Throws an error if any of the customer's information (firstName, lastName, phone, email) is present but not a string.
   *
   * @remarks
   * If the customer is an object, it validates the firstName, lastName, phone, and email properties.
   * If hasAgeVerify is present, it converts it to a boolean value.
   */
  private validateCustomer(customer?: ICheckoutRecipient | ICheckoutCustomer | string): void {
    if (customer && typeof customer === 'object') {
      const { firstName, lastName, phone, email } = customer;
      if (firstName && typeof firstName !== 'string')
        throw new Error('Invalid customer first name');
      if (lastName && typeof lastName !== 'string') throw new Error('Invalid customer last name');
      if (phone && typeof phone !== 'string') throw new Error('Invalid customer phone');
      if (email && typeof email !== 'string') throw new Error('Invalid customer email');

      if ('hasAgeVerify' in customer) {
        customer.hasAgeVerify = Boolean(customer.hasAgeVerify);
      }
    }
  }

  /**
   * Validates the given address object.
   * @param {IAddress} address - The address object to validate.
   * @throws {Error} If the address is invalid or any required field is missing or not a string.
   * @returns {void}
   */
  private validateAddress(address?: IAddress): void {
    if (address !== undefined && typeof address !== 'object') {
      throw new Error('Invalid address: must be an object if provided');
    }

    if (address) {
      const fields: Array<keyof IAddress> = ['id', 'one', 'two', 'city', 'state', 'zip', 'country'];
      fields.forEach((field) => {
        if (field in address && typeof address[field] !== 'string') {
          throw new Error(`Invalid address ${field}: must be a string if provided`);
        }
      });

      // Use LocationHelperService to validate state if address is provided
      this.locationHelperService.validateAndNormalizeLocation({ address });
    }
  }

  /**
   * Validates the giftOptions parameter.
   *
   * @param {ICheckoutPrepareParams['giftOptions']} giftOptions - The giftOptions to be validated.
   *
   * @throws {Error} If the giftOptions parameter is not provided or is not an object.
   * @throws {Error} If the gift message is provided but is not a string.
   * @throws {Error} If the gift recipient's name, phone, or email is provided but is not a string.
   *
   * @returns {void}
   */
  private validateGiftOptions(giftOptions?: ICheckoutPrepareParams['giftOptions']): void {
    if (giftOptions !== undefined && typeof giftOptions !== 'object') {
      throw new Error('Invalid giftOptions: must be an object if provided');
    }

    if (giftOptions) {
      if ('message' in giftOptions && typeof giftOptions.message !== 'string') {
        throw new Error('Invalid gift message: must be a string if provided');
      }

      if ('recipient' in giftOptions) {
        if (typeof giftOptions.recipient !== 'object') {
          throw new Error('Invalid gift recipient: must be an object if provided');
        }

        const { name, phone, email } = giftOptions.recipient;
        if ('name' in giftOptions.recipient && typeof name !== 'string') {
          throw new Error('Invalid gift recipient name: must be a string if provided');
        }

        if ('phone' in giftOptions.recipient && typeof phone !== 'string') {
          throw new Error('Invalid gift recipient phone: must be a string if provided');
        }

        if ('email' in giftOptions.recipient && typeof email !== 'string') {
          throw new Error('Invalid gift recipient email: must be a string if provided');
        }
      }
    }
  }

  /**
   * Validates the given marketing preferences.
   *
   * @param {ICheckoutPrepareParams['marketingPreferences']} preferences - The marketing preferences to validate.
   *
   * @throws {Error} The error thrown if the marketing preferences are invalid.
   */
  private validateMarketingPreferences(
    preferences?: ICheckoutPrepareParams['marketingPreferences']
  ): void {
    if (preferences !== undefined && typeof preferences !== 'object') {
      throw new Error('Invalid marketingPreferences: must be an object if provided');
    }

    if (preferences) {
      if ('canEmail' in preferences) {
        preferences.canEmail = Boolean(preferences.canEmail);
      }

      if ('canSms' in preferences) {
        preferences.canSms = Boolean(preferences.canSms);
      }
    }
  }

  /**
   * Validates the delivery tips array.
   *
   * @param {ICheckoutPrepareParams['deliveryTips']} tips - An array of delivery tips to validate.
   * @throws {Error} If the deliveryTips parameter is not an array.
   * @throws {Error} If the fulfillmentId property of any delivery tip is invalid.
   * @throws {Error} If the tip amount of any delivery tip is invalid.
   * @return {void}
   */
  private validateDeliveryTips(tips: ICheckoutPrepareParams['deliveryTips']): void {
    if (!Array.isArray(tips)) {
      throw new Error('Invalid deliveryTips');
    }

    tips.forEach((tip) => {
      if (!tip.fulfillmentId || typeof tip.fulfillmentId !== 'string') {
        throw new Error('Invalid fulfillmentId in deliveryTip');
      }

      if (typeof tip.tip !== 'number' || tip.tip < 0) {
        throw new Error('Invalid tip amount in deliveryTip');
      }
    });
  }
}
