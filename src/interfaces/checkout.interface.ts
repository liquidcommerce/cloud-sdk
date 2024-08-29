import type { ICoreParams } from '../types';
import type { ILoc } from './address.interface';
import type { ICartAttributesAmounts, ICartItem, ICartRetailer } from './cart.interface';

/**
 * Represents a recipient of a checkout process.
 *
 * An instance of the ICheckoutRecipient interface contains
 * information about the recipient, including their
 * first name, last name, email address, phone number, birthdate,
 * and an optional flag indicating if age verification is required.
 *
 * The ICheckoutRecipient interface is intended to be used in checkout
 * processes where the recipient's information is required.
 *
 * @interface
 * @public
 */
export interface ICheckoutRecipient {
  firstName: string;

  lastName: string;

  email: string;

  phone: string;

  birthDate: string;

  hasAgeVerify?: boolean;
}

/**
 * Represents the recipient information for gift options during checkout.
 */
export interface ICheckoutGiftOptionsRecipient {
  name: string;

  email: string;

  phone: string;
}

/**
 * Interface representing the gift options for a checkout process.
 */
export interface ICheckoutGiftOptions {
  message: string;

  recipient: ICheckoutGiftOptionsRecipient;
}

/**
 * Represents the marketing preferences for a checkout.
 *
 * @interface ICheckoutMarketingPreferences
 * @property {boolean} canEmail - Indicates whether the user allows email marketing.
 * @property {boolean} canSms - Indicates whether the user allows SMS marketing.
 */
export interface ICheckoutMarketingPreferences {
  canEmail: boolean;

  canSms: boolean;
}

/**
 * Represents the delivery tip for a checkout.
 *
 * @interface ICheckoutDeliveryTip
 * @property {string} fulfillmentId - The ID of the fulfillment.
 * @property {number} tip - The amount of the tip.
 */
export interface ICheckoutDeliveryTip {
  fulfillmentId: string;

  tip: number;
}

/**
 * This interface defines the parameters required for preparing a checkout.
 * It extends the ICoreParams interface.
 *
 * @interface ICheckoutPrepareParams
 * @extends {ICoreParams}
 */
export interface ICheckoutPrepareParams extends ICoreParams {
  cartId: string;

  recipient: ICheckoutRecipient;

  billingAddress?: ILoc;

  hasSubstitutionPolicy: boolean;

  isGift: boolean;

  billingSameAsShipping: boolean;

  giftOptions: ICheckoutGiftOptions;

  marketingPreferences: ICheckoutMarketingPreferences;

  deliveryTips?: ICheckoutDeliveryTip[];
}

/**
 * Represents a response object for preparing a checkout process.
 *
 * @interface ICheckoutPrepareResponse
 */
export interface ICheckoutPrepareResponse {
  token: string;

  hasAgeVerify: boolean;

  marketingPreferences: ICheckoutMarketingPreferences;

  hasSubstitutionPolicy: boolean;

  isGift: boolean;

  createdAt: string;

  updatedAt: string;

  billingSameAsShipping: boolean;

  giftOptions: ICheckoutGiftOptions;

  shippingAddress: ILoc;

  billingAddress: ILoc;

  items: ICartItem[];

  amounts: ICartAttributesAmounts;

  retailers: ICartRetailer[];

  cartId: string;
}

/**
 * Represents the parameters required for completing a checkout process.
 * @interface
 * @extends ICoreParams
 */
export interface ICheckoutCompleteParams extends ICoreParams {
  token: string;

  payment: string;
}

/**
 * Interface representing the response object after completing the checkout process.
 * @interface
 */
export interface ICheckoutCompleteResponse {
  order: string;
}
