import type { CART_EVENT_ENUM } from '../enums';
import type { ILoc, ILocBase } from './address.interface';
import type { IProduct, IProductPresale } from './catalog.interface';
import type { IRetailer } from './retailer.interface';

/**
 * Represents the engraving information for a cart item.
 *
 * @interface ICartItemEngraving
 * @property {boolean} isEngravable - Indicates whether the item is engravable or not.
 * @property {boolean} hasEngraving - Indicates whether the item has engraving or not.
 * @property {number} fee - The fee associated with engraving the item.
 * @property {number} maxCharsPerLine - The maximum number of characters allowed per line for the engraving.
 * @property {number} maxLines - The maximum number of lines allowed for the engraving.
 * @property {string} location - The location or area where the engraving should be placed on the item.
 * @property {string[]} lines - The content of each line of the engraving.
 */
export interface ICartItemEngraving {
  isEngravable: boolean;

  hasEngraving: boolean;

  fee: number;

  maxCharsPerLine: number;

  maxLines: number;

  location: string;

  lines: string[];
}

/**
 * Represents an item in a gift cart.
 *
 * @interface ICartItemGiftCart
 * @property {string} sender - The sender of the gift.
 * @property {string} message - The message attached to the gift.
 * @property {string[]} recipients - The list of recipients of the gift.
 * @property {string} sendDate - The date when the gift should be sent.
 */
export interface ICartItemGiftCart {
  sender: string;

  message: string;

  recipients: string[];

  sendDate: string;
}

/**
 * Represents the attributes of a cart item.
 * @interface
 */
export interface ICartItemAttributes {
  engraving: ICartItemEngraving;

  presale: IProductPresale;

  giftCard: ICartItemGiftCart;
}

/**
 * Interface representing a cart item.
 * @interface
 */
export interface ICartItem extends Partial<Omit<IProduct, 'attributes'>> {
  id: string;

  retailerId: string;

  fulfillmentId: string;

  variantId: string;

  liquidId: string;

  salsifyGrouping?: string;

  salsifyPid?: string;

  partNumber: string;

  upc: string;

  sku: string;

  name: string;

  brand: string;

  size: string;

  volume: string;

  uom: string;

  abv: string;

  proof: string;

  catPath: string;

  pack: boolean;

  packDesc: string;

  container: string;

  containerType: string;

  quantity: number;

  maxQuantity: number;

  unitPrice: number;

  price: number;

  scheduledFor: string | Date;

  availableAt: string | Date;

  images: string[];

  mainImage: string;

  attributes: ICartItemAttributes;
}

/**
 * Represents the attributes of a promo code in a cart.
 * @interface
 */
export interface ICartAttributesPromoCode {
  value: string;

  discount?: number;

  freeDelivery: boolean;

  freeServiceFee: boolean;

  freeShipping: boolean;
}

/**
 * Represents the attributes, amounts, and fees associated with a cart.
 */
export interface ICartAttributesAmountsFees {
  shipping: number;

  onDemand: number;
}

/**
 * Interface representing the attributes, amounts, and discounts for a cart.
 * @interface
 */
export interface ICartAttributesAmountsDiscounts {
  shipping: number;

  onDemand: number;

  engraving: number;

  service: number;

  products: number;
}

/**
 * Represents the attribute amounts of a cart.
 */
export interface ICartAttributesAmounts {
  fees: ICartAttributesAmountsFees;

  discounts: ICartAttributesAmountsDiscounts;
}

/**
 * Represents the attributes of a cart.
 * @interface
 */
export interface ICartAttributes {
  promoCode: ICartAttributesPromoCode;

  amounts: ICartAttributesAmounts;
}

/**
 * Represents a retailer with additional properties related to a cart.
 *
 * @interface ICartRetailer
 * @extends IRetailer
 */
export interface ICartRetailer extends IRetailer {
  platformFee: number;

  engravingFee: number;

  deliveryFee: number;

  shippingFee: number;

  subtotal: number;

  total: number;
}

/**
 * Represents an event related to a shopping cart.
 */
export interface ICartEvent {
  type: CART_EVENT_ENUM;

  message: string;

  items?: Array<Partial<ICartItem>>;
}

/**
 * Interface representing a shopping cart.
 */
export interface ICart {
  id: string;

  quantity: number;

  platformFee: number;

  deliveryFee: number;

  engravingFee: number;

  shippingFee: number;

  discounts: number;

  giftCardTotal: number;

  subtotal: number;

  total: number;

  isPresaleLocked: boolean;

  presaleExpiresAt: string | null;

  createdAt: string | Date;

  updatedAt: string | Date;

  items: ICartItem[];

  loc: ILoc;

  retailers: ICartRetailer[];

  attributes: ICartAttributes;

  events: ICartEvent[];
}

/**
 * Interface representing an item to be updated in the shopping cart.
 */
export interface ICartUpdateItem {
  id?: string;

  partNumber: string;

  sku?: string;

  quantity: number;

  fulfillmentId: string;

  engravingLines?: string[];

  scheduledFor?: string | Date;
}

/**
 * Represents the parameters for updating a cart.
 * @interface
 */
export interface ICartUpdateParams extends ILocBase {
  id: string;

  items: ICartUpdateItem[];

  promoCode?: string;
}
