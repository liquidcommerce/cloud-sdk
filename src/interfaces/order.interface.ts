import type {
  ENUM_CUSTOMER_PLACEMENT,
  ENUM_ORDER_FULFILLMENT_TYPE,
  ENUM_ORDER_PACKAGE_STATUS,
  ENUM_ORDER_STATUS,
  ENUM_ORDER_SYSTEM,
} from 'enums';

export interface IAddressCoordinates {
  latitude: number | null;
  longitude: number | null;
}

export interface IOrderAddress {
  one: string;
  two: string | null;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface IOrderFullAddress extends IOrderAddress {
  firstName: string | null;
  lastName: string | null;
  email: string;
  phone: string | null;
  company: string | null;
}

export interface IOrderFulfillmentTimeline {
  status: ENUM_ORDER_STATUS;
  timestamp: string; // new Date().toISOString()
}

export interface IOrderFulfillmentPackage {
  id: string;
  carrier: string | null;
  trackingNumber: string | null;
  trackingUrl: string | null;
  status: ENUM_ORDER_PACKAGE_STATUS;
  dateShipped: string | null; // new Date().toISOString()
}

export interface IOrderFulfillment {
  id: string;
  type: ENUM_ORDER_FULFILLMENT_TYPE;
  status: ENUM_ORDER_STATUS;
  scheduledFor: string | null; // new Date().toISOString()
  updatedAt: string; // new Date().toISOString()
  itemIds: string[];
  packages: IOrderFulfillmentPackage[];
  timeline: IOrderFulfillmentTimeline[];
}

export interface IOrderRetailerAddress extends IOrderAddress {
  coordinates: IAddressCoordinates;
}

export interface IOrderRetailer {
  id: string;
  legacyId: string | null;
  name: string;
  system: ENUM_ORDER_SYSTEM;
  timezone: string;
  address: IOrderRetailerAddress;
  amounts: IOrderAmounts;
  fulfillments: IOrderFulfillment[];
}

export interface IOrderItemProductAttributes {
  pack: boolean;
  packDescription: string | null;
  abv: string | null;
  container: string | null;
  containerType: string | null;
}

export interface IOrderItemProduct {
  name: string;
  brand: string;
  upc: string;
  sku: string;
  mskus: string[];
  category: string | null;
  size: string | null;
  volume: string | null;
  uom: string | null;
  proof: string | null;
  attributes: IOrderItemProductAttributes;
}

export interface IOrderItemPricing {
  price: number;
  unitPrice: number;
  quantity: number;
  tax: number;
  bottleDeposits: number;
}

export interface IOrderItemEngraving {
  hasEngraving: boolean;
  fee: number;
  location: string | null;
  lines: string[];
}

export interface IOrderItemGiftCard {
  sender: string | null;
  message: string | null;
  recipients: string[];
  sendDate: string | null; // new Date().toISOString()
}

export interface IOrderItemAttributes {
  engraving: IOrderItemEngraving;
  giftCard: IOrderItemGiftCard;
}

export interface IOrderItem {
  id: string;
  fulfillmentId: string | null;
  retailerId: string;
  variantId: string;
  liquidId: string | null;
  legacyGrouping: string | null;
  legacyPid: string | null;
  customerPlacement: ENUM_CUSTOMER_PLACEMENT;
  product: IOrderItemProduct;
  image: string | null;
  pricing: IOrderItemPricing;
  attributes: IOrderItemAttributes;
  isPresale: boolean;
  estimatedShipBy: string | null;
}

export interface IOrderCustomer {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  phone: string | null;
  birthdate: string | null; // YYYY-MM-DD
}

export interface IOrderGiftRecipient {
  name: string | null;
  email: string | null;
  phone: string | null;
}

export interface IOrderMarketingPreferences {
  email: boolean;
  sms: boolean;
}

export interface IOrderOptions {
  isGift: boolean;
  giftMessage: string | null;
  giftRecipient: IOrderGiftRecipient;
  hasVerifiedAge: boolean;
  allowsSubstitution: boolean;
  billingSameAsShipping: boolean;
  deliveryInstructions: string | null;
  marketingPreferences: IOrderMarketingPreferences;
}

export interface IOrderTaxDetails {
  products: number;
  shipping: number;
  delivery: number;
  bag: number;
  bottleDeposits: number;
  retailDelivery: number;
}

export interface IOrderDiscountDetails {
  products: number;
  shipping: number;
  delivery: number;
  engraving: number;
  service: number;
}

export interface IOrderAmounts {
  subtotal: number;
  shipping: number;
  platform: number;
  tax: number;
  engraving: number;
  service: number;
  delivery: number;
  discounts: number;
  giftCards: number;
  tip: number;
  total: number;
  taxDetails: IOrderTaxDetails;
  discountDetails: IOrderDiscountDetails;
}

export interface IOrderAddresses {
  shipping: IOrderFullAddress;
  billing: IOrderFullAddress;
}

export interface IOrderPaymentMethod {
  type: string | null;
  card: string | null;
  last4: string | null;
  holder: string | null;
  code: string | null;
}

export interface IOrder {
  referenceId: string | null;
  legacyOrderNumber: string | null;
  isHybrid: boolean;
  partnerId: string;
  createdAt: string; // new Date().toISOString()
  updatedAt: string; // new Date().toISOString()
  customer: IOrderCustomer;
  addresses: IOrderAddresses;
  options: IOrderOptions;
  amounts: IOrderAmounts;
  paymentMethods: IOrderPaymentMethod[];
  retailers: IOrderRetailer[];
  items: IOrderItem[];
}
