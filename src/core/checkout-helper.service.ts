import type { STATES_CODE, STATES_NAME } from '../enums';
import type {
  ICheckoutBillingAddress,
  ICheckoutCompleteParams,
  ICheckoutCustomer,
  ICheckoutPrepareParams,
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
    let normalizedParams = { ...params };

    // Validate cartId
    if (!normalizedParams?.cartId || typeof normalizedParams?.cartId !== 'string') {
      throw new Error('Invalid cartId');
    }

    // Validate Customer
    this.validateCustomer(normalizedParams.customer);

    // Validate billingAddress if provided
    if (normalizedParams?.billingAddress) {
      this.validateBillingAddress(normalizedParams.billingAddress);
    }

    normalizedParams.hasAgeVerify = Boolean(
      normalizedParams?.hasAgeVerify ??
        // @ts-expect-error - Due to recipient removal, this.validateCustomer is not used here.
        normalizedParams?.customer?.hasAgeVerify ??
        false
    );

    // Validate boolean fields
    normalizedParams.hasSubstitutionPolicy = Boolean(normalizedParams?.hasSubstitutionPolicy);
    normalizedParams.acceptedAccountCreation = Boolean(normalizedParams?.acceptedAccountCreation);
    normalizedParams.isGift = Boolean(normalizedParams?.isGift);
    normalizedParams.billingSameAsShipping = Boolean(normalizedParams?.billingSameAsShipping);

    if (
      normalizedParams &&
      normalizedParams?.billingAddress &&
      normalizedParams?.billingAddress?.phone !== ''
    ) {
      normalizedParams = {
        ...normalizedParams,
        billingAddress: {
          ...(normalizedParams?.billingAddress ?? {}),
          phone: this.formatPhoneNumber(normalizedParams.billingAddress?.phone) ?? '',
        },
      };
    }

    if (
      normalizedParams &&
      normalizedParams?.customer &&
      (normalizedParams?.customer as ICheckoutCustomer)?.phone !== ''
    ) {
      normalizedParams = {
        ...normalizedParams,
        customer: {
          ...((normalizedParams?.customer as ICheckoutCustomer) ?? {}),
          phone:
            this.formatPhoneNumber((normalizedParams?.customer as ICheckoutCustomer)?.phone) ?? '',
        },
      };
    }

    // Validate giftOptions if isGift is true
    if (normalizedParams?.isGift) {
      this.validateGiftOptions(normalizedParams.giftOptions);

      if (
        normalizedParams &&
        normalizedParams?.giftOptions &&
        normalizedParams?.giftOptions?.recipient?.phone !== ''
      ) {
        normalizedParams = {
          ...normalizedParams,
          giftOptions: {
            ...(normalizedParams?.giftOptions ?? {}),
            recipient: {
              ...(normalizedParams?.giftOptions?.recipient ?? {}),
              phone: this.formatPhoneNumber(normalizedParams.giftOptions?.recipient?.phone) ?? '',
            },
          },
        };
      }
    }

    // Validate marketingPreferences
    this.validateMarketingPreferences(normalizedParams?.marketingPreferences);

    // Validate giftCards if provided
    if (normalizedParams?.giftCards) {
      normalizedParams.giftCards = this.validateGiftCards(normalizedParams?.giftCards ?? []);
    }

    // Validate deliveryTips if provided
    if (normalizedParams?.deliveryTips) {
      this.validateDeliveryTips(normalizedParams.deliveryTips);
    }

    if (normalizedParams?.refresh) {
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
    if (!normalizedParams.token || typeof normalizedParams?.token !== 'string') {
      throw new Error('Invalid token');
    }

    // Validate payment
    if (!normalizedParams?.payment || typeof normalizedParams?.payment !== 'string') {
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
   *                   Can be an object of type ICheckoutCustomer,
   *                   or a string (presumably a customer ID).
   *
   * @throws {Error} Throws an error if any of the customer's information (firstName, lastName, phone, email) is present but not a string.
   *
   * @remarks
   * If the customer is an object, it validates the firstName, lastName, phone, and email properties.
   * If hasAgeVerify is present, it converts it to a boolean value.
   */
  private validateCustomer(customer?: ICheckoutCustomer | string): void {
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
   * @param {ICheckoutBillingAddress} address - The address object to validate.
   * @throws {Error} If the address is invalid or any required field is missing or not a string.
   * @returns {void}
   */
  private validateBillingAddress(address?: ICheckoutBillingAddress): ICheckoutBillingAddress {
    // If no address provided, return empty object
    if (!address) {
      return {};
    }

    // Validate that address is an object if provided
    if (typeof address !== 'object' || address === null) {
      throw new Error('Invalid address: must be an object if provided');
    }

    // Clone address for normalization
    const normalizedAddress = { ...address };

    // Validate types for any provided fields
    const stringFields: Array<keyof ICheckoutBillingAddress> = [
      'one',
      'two',
      'city',
      'state',
      'zip',
      'country',
      'firstName',
      'lastName',
      'email',
      'phone',
      'company',
    ];

    // Only validate fields that are present
    stringFields.forEach((field) => {
      if (field in normalizedAddress) {
        if (typeof normalizedAddress[field] !== 'string') {
          throw new Error(`Invalid billing address ${field}: must be a string if provided`);
        }
      }
    });

    // Normalize state if provided
    if ('state' in normalizedAddress && normalizedAddress.state) {
      normalizedAddress.state = this.locationHelperService.normalizeState(
        normalizedAddress.state as STATES_CODE | STATES_NAME
      );
    }

    return normalizedAddress;
  }

  /**
   * Validates and normalizes an array of gift cards. Ensures the provided input is an array of strings.
   * Throws an error if the input is invalid.
   *
   * @param {string[]} [giftCards] - Optional array of gift card strings to validate.
   * @return {string[]} A normalized array of gift card strings.
   */
  private validateGiftCards(giftCards?: string[]): string[] {
    if (!giftCards || giftCards.length === 0) {
      return [];
    }

    // Validate that address is an object if provided
    if (!Array.isArray(giftCards)) {
      throw new Error('Invalid gift cards: must be a string array if provided');
    }

    const normalizedGiftCards = [...giftCards];

    // Only validate fields that are present
    normalizedGiftCards.forEach((gc) => {
      if (typeof gc !== 'string') {
        throw new Error(`Invalid gift cards: must be a string array if provided`);
      }
    });

    return normalizedGiftCards;
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

      if (
        'message' in giftOptions &&
        typeof giftOptions.message === 'string' &&
        giftOptions.message.length > 500
      ) {
        throw new Error('Invalid gift message: message must not exceed 500 characters');
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
   * Formats a given phone number into a standard (XXX) XXX-XXXX format for US numbers.
   * Keeps the original format for international numbers starting with a + sign.
   *
   * @param {string|null|undefined} value - The phone number to format. Can be a string, null, or undefined.
   * @return {string|null} The formatted phone number in (XXX) XXX-XXXX format, the original international
   *  format, or null if input is null or undefined.
   */
  private formatPhoneNumber(value: string | null | undefined): string | null {
    if (!value) return null;

    // First, clean the number of any formatting
    const cleaned = value.replace(/[\s().\-_]/g, ''); // Remove spaces, parentheses, dots, hyphens
    const justDigits = cleaned.replace(/[^\d+]/g, ''); // Keep only digits and + symbol

    // Handle various US formats
    if (justDigits.startsWith('+1')) {
      const number = justDigits.substring(2);
      if (number.length === 10) {
        return `(${number.substring(0, 3)}) ${number.substring(3, 6)}-${number.substring(6)}`;
      }
    }

    // Handle 11-digit format starting with 1
    if (justDigits.length === 11 && justDigits.startsWith('1')) {
      const number = justDigits.substring(1);
      return `(${number.substring(0, 3)}) ${number.substring(3, 6)}-${number.substring(6)}`;
    }

    // Handle 10-digit format
    if (justDigits.length === 10) {
      return `(${justDigits.substring(0, 3)}) ${justDigits.substring(3, 6)}-${justDigits.substring(6)}`;
    }

    // Handle international format (non-US)
    if (justDigits.startsWith('+')) {
      return justDigits;
    }

    return value;
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
