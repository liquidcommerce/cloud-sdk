import type {
  IAddress,
  ICheckoutCompleteParams,
  ICheckoutPrepareParams,
  ICheckoutRecipient,
} from '../interfaces';
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

    // Validate recipient
    this.validateRecipient(normalizedParams.recipient);

    // Validate billingAddress if provided
    if (normalizedParams.billingAddress) {
      this.validateAddress(normalizedParams.billingAddress as IAddress);
    }

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

    normalizedParams.refresh = Boolean(normalizedParams.refresh);

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
    if (!normalizedParams.payment || typeof normalizedParams.payment !== 'string') {
      throw new Error('Invalid payment token');
    }

    // Validate refresh (optional)
    if (normalizedParams.refresh !== undefined) {
      normalizedParams.refresh = Boolean(normalizedParams.refresh);
    }

    return normalizedParams;
  }

  /**
   * Validates the recipient object.
   *
   * @param {ICheckoutPrepareParams['recipient']} recipient - The recipient object to be validated.
   * @throws {Error} If the recipient object is invalid.
   * @returns {void}
   */
  private validateRecipient(recipient: ICheckoutPrepareParams['recipient']): void {
    if (!recipient || typeof recipient !== 'object') {
      throw new Error('Invalid recipient');
    }

    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'birthDate'];
    requiredFields.forEach((field) => {
      if (
        !recipient[field as keyof ICheckoutRecipient] ||
        typeof recipient[field as keyof ICheckoutRecipient] !== 'string'
      ) {
        throw new Error(`Invalid recipient ${field}`);
      }
    });

    recipient.hasAgeVerify = Boolean(recipient.hasAgeVerify);
  }

  /**
   * Validates the given address object.
   * @param {IAddress} address - The address object to validate.
   * @throws {Error} If the address is invalid or any required field is missing or not a string.
   * @returns {void}
   */
  private validateAddress(address: IAddress): void {
    if (!address || typeof address !== 'object') {
      throw new Error('Invalid address');
    }

    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'one',
      'city',
      'state',
      'zip',
    ];
    requiredFields.forEach((field) => {
      if (
        !address[field as keyof IAddress] ||
        typeof address[field as keyof IAddress] !== 'string'
      ) {
        throw new Error(`Invalid address ${field}`);
      }
    });

    // Use LocationHelperService to validate state
    this.locationHelperService.validateAndNormalizeLocation({ address });
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
  private validateGiftOptions(giftOptions: ICheckoutPrepareParams['giftOptions']): void {
    if (!giftOptions || typeof giftOptions !== 'object') {
      throw new Error('Invalid giftOptions');
    }

    if (giftOptions.message && typeof giftOptions.message !== 'string') {
      throw new Error('Invalid gift message');
    }

    if (giftOptions.recipient) {
      const { name, phone, email } = giftOptions.recipient;
      if (name && typeof name !== 'string') throw new Error('Invalid gift recipient name');
      if (phone && typeof phone !== 'string') throw new Error('Invalid gift recipient phone');
      if (email && typeof email !== 'string') throw new Error('Invalid gift recipient email');
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
    preferences: ICheckoutPrepareParams['marketingPreferences']
  ): void {
    if (!preferences || typeof preferences !== 'object') {
      throw new Error('Invalid marketingPreferences');
    }

    preferences.canEmail = Boolean(preferences.canEmail);
    preferences.canSms = Boolean(preferences.canSms);
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
