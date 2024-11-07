import type { ICoreParams } from '../types';
import type { IAddress } from './address.interface';
import type { ICartItemAttributes } from './cart.interface';
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
 * Contains recipient's information such as name, contact details, and
 * an optional flag for age verification.
 *
 * @interface
 * @public
 * @deprecated Use ICheckoutCustomer interface instead.
 * ICheckoutRecipient will be removed in a future version.
 */
export interface ICheckoutRecipient {
  firstName?: string;

  lastName?: string;

  email?: string;

  phone?: string;

  birthDate?: string;

  hasAgeVerify?: boolean;
}

/**
 * Represents a traditional billing address structure.
 *
 * @interface
 * @public
 * @deprecated Use ICheckoutBillingAddress instead for better integration with customer data.
 */
export interface IBillingAddress {
  firstName?: string;

  lastName?: string;

  email?: string;

  phone?: string;

  one?: string;

  two?: string;

  city?: string;

  state?: string;

  zip?: string;

  country?: string;
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
export type ICheckoutBillingAddress = ICheckoutBaseAddress & ICheckoutCustomer;

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
 * Represents the delivery tip for a checkout.
 *
 * @interface
 */
export interface ICheckoutDeliveryTip {
  fulfillmentId: string;

  tip: number;
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

  /**
   * @deprecated Use customer property instead. Recipient will be removed in a future version.
   */
  recipient?: ICheckoutRecipient;

  hasAgeVerify?: boolean;

  shippingAddressTwo?: string;

  /**
   * Billing address information supporting both new and legacy formats.
   * Recommended to use ICheckoutBillingAddress format for new implementations.
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

  payment?: string;
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

  taxToken?: string;

  address?: IAddress;

  minibarSupplierId?: number[];

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

  image: string;

  brand: string;

  partNumber: string;

  upc: string;

  price: number;

  unitPrice: number;

  quantity: number;

  tax: number;

  unitTax: number;

  bottleDeposits: number;

  attributes: ICartItemAttributes;
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

  partnerName?: string;

  partnerLogo?: string;

  partnerPim?: string;

  partnerBusinessId?: string;

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
   * Recommended to use ICheckoutBillingAddress format for new implementations.
   */
  billingAddress: ICheckoutBillingAddress | IBillingAddress;

  amounts: ICheckoutTotalAmounts;

  items: ICheckoutItem[];

  retailers: ICheckoutRetailer[];

  payment?: string;
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
    number: string;
  };
}
