import type { CHECKOUT_EVENT_ENUM } from '../enums';
import type { ICoreParams } from '../types';
import type { IAddress } from './address.interface';
import type { ICartAttributesPromoCode, ICartItemAttributes } from './cart.interface';
import type { IRetailerExpectation } from './retailer.interface';

/**
 * Represents a customer in a checkout process.
 *
 * Contains information about the customer, including identification,
 * contact details, personal information, and timestamps for profile management.
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

  phone?: string;

  profileImage?: string;

  birthDate?: string;

  createdAt?: Date;

  updatedAt?: Date;
}

/**
 * Represents the base address information for a checkout process.
 *
 * @interface
 */
interface ICheckoutBaseAddress {
  id?: string;

  one?: string;

  two?: string;

  city?: string;

  state?: string;

  zip?: string;

  country?: string;
}

/**
 * Represents the billing address in a checkout process.
 *
 * Combines base address information with customer details.
 *
 * @type
 */
export type ICheckoutBillingAddress = ICheckoutBaseAddress &
  Omit<
    ICheckoutCustomer,
    'birthDate' | 'id' | 'createdAt' | 'hasAgeVerify' | 'updatedAt' | 'profileImage'
  >;

/**
 * Represents the recipient information for gift options during checkout.
 *
 * @interface
 */
export interface ICheckoutGiftOptionsRecipient {
  name?: string;

  email?: string;

  phone?: string;
}

/**
 * Represents the gift options for a checkout process.
 *
 * @interface
 */
export interface ICheckoutGiftOptions {
  message?: string;

  recipient?: ICheckoutGiftOptionsRecipient;
}

/**
 * Represents the marketing preferences for a checkout.
 *
 * @interface
 */
export interface ICheckoutMarketingPreferences {
  canEmail?: boolean;

  canSms?: boolean;
}

/**
 * Represents the delivery tip for a checkout's specific fulfillment method.
 *
 * @interface
 */
export interface ICheckoutDeliveryTip {
  fulfillmentId: string;

  tip: number;
}

/**
 * Represents the delivery instructions for a checkout's specific fulfillment method.
 *
 * @interface
 */
export interface ICheckoutDeliveryInstructions {
  fulfillmentId: string;

  instructions: string;
}

/**
 * Defines the parameters required for preparing a checkout.
 *
 * Extends the ICoreParams interface.
 *
 * @interface
 */
export interface ICheckoutPrepareParams extends ICoreParams {
  cartId: string;

  customer?: ICheckoutCustomer | string;

  hasAgeVerify?: boolean;

  shippingAddressTwo?: string;

  /**
   * Billing address information supporting both new and legacy formats.
   */
  billingAddress?: ICheckoutBillingAddress;

  hasSubstitutionPolicy?: boolean;

  isGift?: boolean;

  billingSameAsShipping?: boolean;

  giftOptions?: ICheckoutGiftOptions;

  marketingPreferences?: ICheckoutMarketingPreferences;

  deliveryTips?: ICheckoutDeliveryTip[];

  deliveryInstructions?: ICheckoutDeliveryInstructions[];

  acceptedAccountCreation?: boolean;

  scheduledDelivery?: string;

  payment?: string;

  promoCode?: string;

  giftCards?: string[];
}

/**
 * Represents total amounts and discounts for a checkout process.
 *
 * @interface
 */
export interface ICheckoutTotalAmountsDiscounts {
  products: number;

  delivery: number;

  shipping: number;

  engraving: number;

  service: number;
}

/**
 * Represents various tax-related amounts in a checkout total.
 *
 * @interface
 */
export interface ICheckoutTotalAmountsTaxes {
  bag: number;

  bottleDeposits: number;

  retailDelivery: number;

  products: number;

  delivery: number;

  shipping: number;
}

/**
 * Represents the details of the total amounts in the checkout process.
 *
 * @interface
 */
export interface ICheckoutTotalAmountsDetails {
  taxes: ICheckoutTotalAmountsTaxes;

  discounts: ICheckoutTotalAmountsDiscounts;
}

/**
 * Represents the total amounts in a checkout process, including fees, discounts, and the final total.
 *
 * @interface
 */
export interface ICheckoutTotalAmounts {
  subtotal: number;

  engraving: number;

  service: number;

  shipping: number;

  delivery: number;

  platform: number;

  discounts: number;

  giftCards: number;

  tax: number;

  tip: number;

  total: number;

  details: ICheckoutTotalAmountsDetails;
}

/**
 * Represents a fulfillment in the checkout process.
 *
 * Extends ICheckoutTotalAmounts.
 *
 * @interface
 */
export interface ICheckoutFulfillment extends ICheckoutTotalAmounts {
  id: string;

  deliveryInstructions: string;

  scheduledFor?: string | Date;

  type: 'shipping' | 'onDemand';

  expectation: IRetailerExpectation;

  items: string[];
}

/**
 * Represents a retailer in the checkout process.
 *
 * Extends ICheckoutTotalAmounts.
 *
 * @interface
 */
export interface ICheckoutRetailer extends ICheckoutTotalAmounts {
  id: string;

  name: string;

  address?: IAddress;

  fulfillments: ICheckoutFulfillment[];
}

/**
 * Represents an item in the checkout process.
 *
 * Contains detailed information about a product in the cart, including identifiers,
 * product details, pricing, quantity, and additional attributes.
 *
 * @interface
 */
export interface ICheckoutItem {
  variantId: string;

  cartItemId: string;

  liquidId: string;

  retailerId: string;

  fulfillmentId: string;

  salsifyPid?: string;

  salsifyGrouping?: string;

  name: string;

  catPath: string;

  volume: string;

  uom: string;

  proof: string;

  abv: string;

  containerType: string;

  container: string;

  size: string;

  pack: boolean;

  packDesc: string;

  mainImage: string;

  brand: string;

  partNumber: string;

  upc: string;

  sku: string;

  price: number;

  unitPrice: number;

  quantity: number;

  tax: number;

  unitTax: number;

  bottleDeposits: number;

  attributes: ICartItemAttributes;
}

/**
 * Interface representing a gift card utilized during checkout.
 *
 * This interface defines the structure for a gift card,
 * including its code, the amount applied during the transaction,
 * and any remaining balance on the card.
 *
 * Properties:
 * - `code`: The unique code of the gift card used for identification.
 * - `applied`: The amount deducted from the gift card during the current transaction.
 * - `balance`: The remaining balance on the gift card after the applied amount is deducted.
 */
export interface ICheckoutGiftCard {
  code: string;

  applied: number;

  balance: number;
}

/**
 * Interface representing events related to the checkout process.
 * This interface defines the structure for any event emitted or handled
 * during the checkout workflow, including the type of event and its corresponding message.
 *
 * @interface ICheckoutEvents
 * @property {CHECKOUT_EVENT_ENUM} type - The type of the checkout event.
 * @property {string} message - A message providing additional context or details about the event.
 * @property {Array<Partial<ICheckoutItem>>} [items] - An optional array of items associated with the event, providing details about the products involved in the checkout process.
 */
export interface ICheckoutEvents {
  type: CHECKOUT_EVENT_ENUM;

  message: string;

  items?: Array<Partial<ICheckoutItem>>;
}

/**
 * Represents a response object for preparing a checkout process.
 *
 * @interface
 */
export interface ICheckoutPrepareResponse {
  token: string;

  cartId: string;

  customer: ICheckoutCustomer;

  hasAgeVerify: boolean;

  hasSubstitutionPolicy: boolean;

  isGift: boolean;

  createdAt: string;

  updatedAt: string;

  billingSameAsShipping: boolean;

  acceptedAccountCreation?: boolean;

  giftOptions: ICheckoutGiftOptions;

  marketingPreferences: ICheckoutMarketingPreferences;

  shippingAddress: IAddress;

  /**
   * Billing address information supporting both new and legacy formats.
   */
  billingAddress: ICheckoutBillingAddress;

  amounts: ICheckoutTotalAmounts;

  items: ICheckoutItem[];

  retailers: ICheckoutRetailer[];

  payment?: string;

  giftCards: ICheckoutGiftCard[];

  events: ICheckoutEvents[];

  promoCode: ICartAttributesPromoCode;
}

/**
 * Represents the parameters required for completing a checkout process.
 *
 * Extends ICoreParams.
 *
 * @interface
 */
export interface ICheckoutCompleteParams extends ICoreParams {
  token: string;

  payment: string;
}

/**
 * Represents the response object after completing the checkout process.
 *
 * @interface
 */
export interface ICheckoutCompleteResponse {
  order: {
    legacyOrderNumber: string;

    referenceId: string;
  };
}
