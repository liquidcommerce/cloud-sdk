import type { ICoreParams } from '../types';
import type { IAddress } from './address.interface';
import type { ICartItem, ICartRetailer } from './cart.interface';

/**
 * Represents a customer in a checkout process.
 *
 * An instance of the ICheckoutCustomer interface contains
 * information about the customer, including their
 * identification, contact details, personal information,
 * and timestamps for profile management.
 *
 * The ICheckoutCustomer interface is intended to be used in checkout
 * processes where the customer's information is required.
 *
 * @interface
 * @public
 */
export interface ICheckoutCustomer {
  id?: string;

  email?: string;

  firstName?: string;

  lastName?: string;

  company?: string;

  profileImage?: string;

  phone?: string;

  birthDate?: string;

  hasAgeVerify?: boolean;

  createdAt?: Date;

  updatedAt?: Date;
}

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
 * @deprecated Use ICheckoutCustomer interface instead.
 * ICheckoutRecipient will be removed in a future version.
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
 * Represents a traditional billing address structure.
 *
 * @interface
 * @public
 * @deprecated Use ICheckoutBillingAddress instead which provides better integration with customer data.
 */
export interface IBillingAddress {
  firstName: string;

  lastName: string;

  email: string;

  phone: string;

  one: string;

  two?: string;

  city: string;

  state: string;

  zip: string;

  country?: string;
}

export type ICheckoutBillingAddress = IAddress & ICheckoutCustomer;

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

  customer?: ICheckoutCustomer | string;

  /**
   * @deprecated Use customer property instead. Recipient will be removed in a future version.
   */
  recipient?: ICheckoutRecipient;

  /**
   * Billing address information supporting both new and legacy formats.
   * It's recommended to use ICheckoutBillingAddress format for new implementations.
   */
  billingAddress?: ICheckoutBillingAddress | IBillingAddress;

  hasSubstitutionPolicy?: boolean;

  isGift?: boolean;

  billingSameAsShipping?: boolean;

  giftOptions?: ICheckoutGiftOptions;

  marketingPreferences?: ICheckoutMarketingPreferences;

  deliveryTips?: ICheckoutDeliveryTip[];

  acceptedAccountCreation?: boolean;

  scheduledDelivery?: string;
}

/**
 * Interface representing the total amounts and discounts for a checkout process.
 *
 * @interface ICheckoutTotalAmountsDiscounts
 *
 * @property {number} [products] - The total amount for all products in the checkout.
 * @property {number} [delivery] - The total amount for delivery charges.
 * @property {number} [shipping] - The total amount for shipping charges.
 * @property {number} [engraving] - The total amount for engraving services.
 * @property {number} [service] - The total amount for any additional service charges.
 */
export interface ICheckoutTotalAmountsDiscounts {
  products?: number;

  delivery?: number;

  shipping?: number;

  engraving?: number;

  service?: number;
}

/**
 * Interface representing various tax-related amounts in a checkout total.
 *
 * @interface ICheckoutTotalAmountsTaxes
 *
 * @property {number} [bag] - Tax amount related to bags.
 *
 * @property {number} [bottleDeposits] - Tax amount for bottle deposits.
 *
 * @property {number} [retailDelivery] - Tax amount for retail delivery charges.
 *
 * @property {number} [products] - Tax amount applied to products.
 *
 * @property {number} [delivery] - Tax amount for delivery charges.
 *
 * @property {number} [shipping] - Tax amount associated with shipping.
 */
export interface ICheckoutTotalAmountsTaxes {
  bag?: number;

  bottleDeposits?: number;

  retailDelivery?: number;

  products?: number;

  delivery?: number;

  shipping?: number;
}

/**
 * Interface representing the details of the total amounts in the checkout process.
 *
 * @property {ICheckoutTotalAmountsTaxes} [taxes] - Optional property representing taxes applied to the checkout total amounts.
 * @property {ICheckoutTotalAmountsDiscounts} [discounts] - Optional property representing discounts applied to the checkout total amounts.
 */
export interface ICheckoutTotalAmountsDetails {
  taxes?: ICheckoutTotalAmountsTaxes;

  discounts?: ICheckoutTotalAmountsDiscounts;
}

/**
 * Interface representing the total amounts in a checkout process.
 * This includes various fees, discounts, and the final total.
 */
export interface ICheckoutTotalAmounts {
  subtotal?: number;

  engraving?: number;

  service?: number;

  shipping?: number;

  delivery?: number;

  platform?: number;

  discounts?: number;

  giftCards?: number;

  tax?: number;

  tip?: number;

  total?: number;

  details?: ICheckoutTotalAmountsDetails;
}

/**
 * Represents a response object for preparing a checkout process.
 *
 * @interface ICheckoutPrepareResponse
 */
export interface ICheckoutPrepareResponse {
  token: string;

  customer: ICheckoutCustomer

  hasAgeVerify: boolean;

  marketingPreferences: ICheckoutMarketingPreferences;

  hasSubstitutionPolicy: boolean;

  acceptedAccountCreation?: boolean;

  isGift: boolean;

  createdAt: string;

  updatedAt: string;

  billingSameAsShipping: boolean;

  giftOptions: ICheckoutGiftOptions;

  shippingAddress: IAddress;

  /**
   * Billing address information supporting both new and legacy formats.
   * It's recommended to use ICheckoutBillingAddress format for new implementations.
   */
  billingAddress?: ICheckoutBillingAddress | IBillingAddress;

  items: ICartItem[];

  amounts: ICheckoutTotalAmounts;

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
