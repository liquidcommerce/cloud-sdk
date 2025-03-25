import type {
  ENUM_PARTNER_CUSTOMER_PLACEMENT,
  ENUM_PARTNER_ORDER_FULFILLMENT_TYPE,
  ENUM_PARTNER_ORDER_PACKAGE_STATUS,
  ENUM_PARTNER_ORDER_STATUS,
} from 'enums';

export interface IOrderAddress {
  one: string;
  two: string | null;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface IOrderBillingAddress extends IOrderAddress {
  firstName: string | null;
  lastName: string | null;
  email: string;
  phone: string | null;
  company: string | null;
}

export interface IOrderCoordinates {
  latitude: number | null;
  longitude: number | null;
}

// new / legacy
export type IOrderSystem = 'LiquidCommerce OMS' | 'ReserveBar OMS';

export interface IOrderPackageTimeline {
  status: ENUM_PARTNER_ORDER_PACKAGE_STATUS;
  timestamp: string;
}

export interface IOrderFulfillmentPackage {
  id: string | number;
  carrier: string | null;
  trackingNumber: string | null;
  trackingUrl: string | null;
  status: ENUM_PARTNER_ORDER_PACKAGE_STATUS;
  dateShipped: string | null; // new Date().toISOString()
  timeline: IOrderPackageTimeline[];
}

export interface IOrderFulfillment {
  id: string;
  type: ENUM_PARTNER_ORDER_FULFILLMENT_TYPE;
  status: ENUM_PARTNER_ORDER_STATUS;
  scheduledFor: string | null; // new Date().toISOString()
  updatedAt: string; // new Date().toISOString()
  itemIds: string[];
  packages: IOrderFulfillmentPackage[];
}

export interface IOrderRetailer {
  id: string | number;
  legacyId: string | number | null;

  name: string;

  system: IOrderSystem;

  address: IOrderAddress & {
    coordinates: IOrderCoordinates;
  };

  amounts: IOrderAmounts;

  fulfillments: IOrderFulfillment[];
}

export interface IOrderItem {
  id: string | number;
  fulfillmentId: string | null;
  retailerId: string | number;
  variantId: string | number;
  liquidId: string | null;
  legacyGrouping: string | null;
  legacyPid: string | null;

  customerPlacement: ENUM_PARTNER_CUSTOMER_PLACEMENT;

  product: {
    name: string;
    brand: string;
    upc: string;
    category: string;
    size: string;
    volume: string;
    uom: string;
    attributes: {
      pack: boolean;
      packDescription: string;
      abv: string;
      container: string;
      containerType: string;
    };
  };

  image: string | null;

  pricing: {
    price: number;
    unitPrice: number;
    quantity: number;
    tax: number;
    bottleDeposits: number;
  };

  attributes: {
    engraving: {
      hasEngraving: boolean;
      fee: number;
      location: string;
      lines: string[];
    };
    giftCard: {
      sender: string;
      message: string;
      recipients: string[];
      sendDate: string; // new Date().toISOString()
    };
  };

  isPresale: boolean;
  estimatedShipBy: string | null;
}

export interface IOrderCustomer {
  id: string | number;
  firstName: string | null;
  lastName: string | null;
  email: string;
  phone: string | null;
  birthdate: string | null; // YYYY-MM-DD
}

export interface IOrderOptions {
  isGift: boolean;
  giftMessage: string | null;
  giftRecipient: {
    name: string | null;
    email: string | null;
    phone: string | null;
  };

  hasVerifiedAge: boolean;

  allowsSubstitution: boolean;

  billingSameAsShipping: boolean;

  deliveryInstructions: string | null;

  marketingPreferences: {
    email: boolean;
    sms: boolean;
  };
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
  taxDetails: {
    products: number;
    shipping: number;
    delivery: number;
    bag: number;
    bottleDeposits: number;
    retailDelivery: number;
  };
  discountDetails: {
    products: number;
    shipping: number;
    delivery: number;
    engraving: number;
    service: number;
  };
}

export interface IOrderPartner {
  id: string | number | null;
  legacyId: string | number | null;
}

export interface IOrder {
  referenceId: string | null;
  legacyOrderNumber: string | null;

  isHybrid: boolean;

  partner: IOrderPartner;

  createdAt: string; // new Date().toISOString()
  updatedAt: string; // new Date().toISOString()

  customer: IOrderCustomer;

  addresses: {
    shipping: IOrderAddress;
    billing: IOrderBillingAddress;
  };

  options: IOrderOptions;

  amounts: IOrderAmounts;

  retailers: IOrderRetailer[];

  items: IOrderItem[];
}
