import {
  ENUM_BEER,
  ENUM_MERCHANDISE,
  ENUM_MISCELLANEOUS,
  ENUM_NON_ALCOHOLIC,
  ENUM_SPIRITS,
  ENUM_WINE,
} from './taxonomy';

export enum LIQUID_COMMERCE_ENV {
  LOC = 'loc',
  STAGE = 'stage',
  PROD = 'prod',
  DEV = 'dev',
  BETA = 'beta',
}

export enum ENUM_MODALITIES {
  ON_DEMAND = 'onDemand',
  SHIPPING = 'shipping',
  BOPIS = 'bopis',
}

export enum DAYS_OF_WEEK {
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
  SUNDAY = 'sunday',
}

export enum STATES_CODE {
  AL = 'AL',
  AK = 'AK',
  AR = 'AR',
  AZ = 'AZ',
  CA = 'CA',
  CO = 'CO',
  CT = 'CT',
  DE = 'DE',
  DC = 'DC',
  FL = 'FL',
  GA = 'GA',
  HI = 'HI',
  ID = 'ID',
  IL = 'IL',
  IN = 'IN',
  IA = 'IA',
  KS = 'KS',
  KY = 'KY',
  LA = 'LA',
  ME = 'ME',
  MD = 'MD',
  MA = 'MA',
  MI = 'MI',
  MN = 'MN',
  MS = 'MS',
  MO = 'MO',
  MT = 'MT',
  NE = 'NE',
  NV = 'NV',
  NH = 'NH',
  NJ = 'NJ',
  NM = 'NM',
  NY = 'NY',
  NC = 'NC',
  ND = 'ND',
  OH = 'OH',
  OK = 'OK',
  OR = 'OR',
  PA = 'PA',
  RI = 'RI',
  SC = 'SC',
  SD = 'SD',
  TN = 'TN',
  TX = 'TX',
  UT = 'UT',
  VT = 'VT',
  VA = 'VA',
  WA = 'WA',
  WV = 'WV',
  WI = 'WI',
  WY = 'WY',
}

export enum STATES_NAME {
  ALABAMA = 'AL',
  ALASKA = 'AK',
  ARKANSAS = 'AR',
  ARIZONA = 'AZ',
  CALIFORNIA = 'CA',
  COLORADO = 'CO',
  CONNECTICUT = 'CT',
  DELAWARE = 'DE',
  DISTRICT_OF_COLUMBIA = 'DC',
  FLORIDA = 'FL',
  GEORGIA = 'GA',
  HAWAII = 'HI',
  IDAHO = 'ID',
  ILLINOIS = 'IL',
  INDIANA = 'IN',
  IOWA = 'IA',
  KANSAS = 'KS',
  KENTUCKY = 'KY',
  LOUISIANA = 'LA',
  MAINE = 'ME',
  MARYLAND = 'MD',
  MASSACHUSETTS = 'MA',
  MICHIGAN = 'MI',
  MINNESOTA = 'MN',
  MISSISSIPPI = 'MS',
  MISSOURI = 'MO',
  MONTANA = 'MT',
  NEBRASKA = 'NE',
  NEVADA = 'NV',
  NEW_HAMPSHIRE = 'NH',
  NEW_JERSEY = 'NJ',
  NEW_MEXICO = 'NM',
  NEW_YORK = 'NY',
  NORTH_CAROLINA = 'NC',
  NORTH_DAKOTA = 'ND',
  OHIO = 'OH',
  OKLAHOMA = 'OK',
  OREGON = 'OR',
  PENNSYLVANIA = 'PA',
  RHODE_ISLAND = 'RI',
  SOUTH_CAROLINA = 'SC',
  SOUTH_DAKOTA = 'SD',
  TENNESSEE = 'TN',
  TEXAS = 'TX',
  UTAH = 'UT',
  VERMONT = 'VT',
  VIRGINIA = 'VA',
  WASHINGTON = 'WA',
  WEST_VIRGINIA = 'WV',
  WISCONSIN = 'WI',
  WYOMING = 'WY',
}

/*
 *
 * @deprecated - use ENUM_BINARY_FILTER
 *
 * */
export enum ENUM_ENGRAVING {
  YES = 'YES',
  NO = 'NO',
}

export enum ENUM_BINARY_FILTER {
  YES = 'YES',
  NO = 'NO',
}

export enum ENUM_FILTER_KEYS {
  BRANDS = 'brands',
  FLAVOR = 'flavor',
  FULFILLMENT = 'fulfillment',
  TAGS = 'tags',
  REGION = 'region',
  VARIETY = 'variety',
  ENGRAVING = 'engraving',
  PRICE = 'price',
  PRESALE = 'presale',
  AVAILABILITY = 'availability',
  CATEGORIES = 'categories',
  SIZES = 'sizes',
  COLORS = 'colors',
  APPELLATION = 'appellation',
  COUNTRY = 'country',
  VINTAGE = 'vintage',
  MATERIALS = 'materials',
  COLLECTION_TAGS = 'collectionTags',
}

export enum ENUM_NAVIGATION_ORDER_DIRECTION_TYPE {
  ASC = 'asc',
  DESC = 'desc',
}

export enum ENUM_ORDER_BY {
  PRICE = 'price',
}

export enum ENUM_AVAILABILITY_VALUE {
  UNSPECIFIED = 'AVAILABILITY_UNSPECIFIED',
  IN_STOCK = 'IN_STOCK',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
  PREORDER = 'PREORDER',
  BACKORDER = 'BACKORDER',
}

/**
 * Status of `DeliveryAvailability` for one fulfillment. Cloud sends only `AVAILABLE` today; the
 * other values are reserved for a later release, so treat any value other than `AVAILABLE` as
 * "no delivery windows to show".
 */
export enum ENUM_DELIVERY_AVAILABILITY_STATUS {
  /** Windows were computed; check `canDeliverNow` and `canSchedule`. */
  AVAILABLE = 'available',
  /** The fulfillment cannot deliver now and has no window. */
  UNAVAILABLE = 'unavailable',
  /** Cloud could not compute the windows. Try again later. */
  UNKNOWN = 'unknown',
  /** A delivery address is necessary before the windows can be computed. */
  ADDRESS_REQUIRED = 'address_required',
}

export enum CART_PARAM_ERROR_ENUM {
  INVALID_ITEMS_TYPE = 'Items must be a non-empty array',
  INVALID_ITEMS_MAX = 'You can only send up to 25 items at a time!',
  INVALID_PART_NUMBER = 'The partnerNumber provided is invalid',
  INVALID_FULFILLMENT_ID = 'The fulfillmentId provided is invalid',
}

export enum CART_EVENT_ENUM {
  OOS = 'OutOfStock',
  ITEMS_NOT_ADDED = 'ItemsNotAdded',
  ITEMS_REQUESTED_NOT_ADDED = 'ItemsRequestedNotAdded',
  ITEM_NOT_ENGRAVED = 'ItemEngravingError',
  ITEM_ENGRAVING_FONT_REPLACED = 'ItemEngravingFontReplaced',
  ADDRESS_CHANGE = 'AddressChange',
  LOCATION_AVAILABILITY = 'LocationAvailability',
  PARTNER_PRODUCT_CONFIGS = 'PartnerProductConfigs',
  REMOVED_EXISTING_ITEMS = 'RemovedExistingCartItems',
  RETAILER_MIN = 'RetailerMinNotMet',
  NO_ITEMS_IN_CART = 'NoItemsInCart',
  INVALID_ID = 'InvalidId',
  NO_ID = 'NoId',
  CART_CHECKOUT_PROCESSED = 'CartCheckoutProcessed',
  NEW_CART = 'NewCart',
  DEFAULT = 'CartError',
  ITEM_QTY_CHANGE = 'ItemQuantityChange',
  ITEM_ID_NOT_FOUND = 'ItemIdNotFound',
  ITEMS_REMOVED = 'ItemsRemoved',
  RETAILER_FULFILLMENT_INVALID = 'RetailerFulfillmentInvalid',
  RETAILER_ONDEMAND_HOURS_NOT_AVAILABLE = 'RetailerOnDemandHoursNotAvailable',
  MAX_QUANTITY_PER_ORDER_EXCEEDED = 'MaxQuantityPerOrderExceeded',

  // Coupon validation events
  COUPON_PROCESSING_ERROR = 'CouponProcessingError',
  COUPON_NOT_FOUND = 'CouponNotFound',
  COUPON_EXPIRED = 'CouponExpired',
  NO_APPLICABLE_DISCOUNT = 'NoApplicableDiscount',
  COUPON_NOT_STARTED = 'CouponNotStarted',
  MINIMUM_ORDER_VALUE_NOT_MET = 'MinimumOrderValueNotMet',
  MINIMUM_ORDER_UNITS_NOT_MET = 'MinimumOrderUnitsNotMet',
  MINIMUM_DISTINCT_ITEMS_NOT_MET = 'MinimumDistinctItemsNotMet',
  QUOTA_EXCEEDED = 'QuotaExceeded',
  USER_LIMIT_EXCEEDED = 'UserLimitExceeded',
  NOT_FIRST_PURCHASE = 'NotFirstPurchase',
  INVALID_COUPON = 'InvalidCoupon',
  INVALID_MEMBERSHIP = 'InvalidMembership',
  INVALID_DOMAIN = 'InvalidDomain',
  INVALID_REQUIREMENTS = 'InvalidRequirements',
  INVALID_ORGANIZATION = 'InvalidOrganization',
  PRODUCT_NOT_ELIGIBLE = 'ProductNotEligible',
  NOT_ENOUGH_PREVIOUS_ORDERS = 'NotEnoughPreviousOrders',

  //Presale validation events
  PRESALE_ITEMS_NOT_ALLOWED = 'PresaleItemsNotAllowed',
  PRESALE_LIMIT_EXCEEDED = 'PresaleLimitExceeded',
  PRESALE_NOT_STARTED = 'PresaleNotStarted',
  PRESALE_EXPIRED = 'PresaleExpired',
  PRESALE_MIXED_CART = 'PresaleMixedCart',

  // Retailer restriction events
  RETAILER_DOES_NOT_ALLOW_PROMOS = 'RetailerDoesNotAllowPromos',
  RETAILERS_DO_NOT_ALLOW_PROMOS = 'RetailersDoNotAllowPromos',

  // BOPIS (buy online pickup in store) events
  BOPIS_CONTACT_REQUIRED = 'BopisContactRequired',
  BOPIS_PARENT_FULFILLMENT_REQUIRED = 'BopisParentFulfillmentRequired',
  BOPIS_INVALID_PARENT_FULFILLMENT = 'BopisInvalidParentFulfillment',
  BOPIS_PARENT_RETAILER_MISMATCH = 'BopisParentRetailerMismatch',
  BOPIS_NOT_APPLICABLE = 'BopisNotApplicable',
  BOPIS_NOT_ALLOWED = 'BopisNotAllowed',
  BOPIS_PRODUCT_NOT_OPTED_IN = 'BopisProductNotOptedIn',
  BOPIS_NOT_AVAILABLE = 'BopisNotAvailable',
  BOPIS_SCHEDULE_IN_PAST = 'BopisScheduleInPast',
  BOPIS_SCHEDULE_OUTSIDE_HOURS = 'BopisScheduleOutsideHours',
  BOPIS_FALLBACK = 'BopisFallback',
}

export enum ENUM_ADDRESS_TYPE {
  SHIPPING = 'shipping',
  BILLING = 'billing',
}

export enum ENUM_CHECKOUT_STATUS_CODE_ERROR {
  REQUEST_DEFAULT_ERROR = 5480,
  REQUEST_LOCATION_OOS_ERROR = 5481,
  REQUEST_LOCATION_MISMATCH_ERROR = 5482,
  REQUEST_BIRTHDATE_ERROR = 5483,
  REQUEST_CART_NOT_AVAILABLE_ERROR = 5484,
  REQUEST_CART_ID_ERROR = 5485,
  REQUEST_CART_ITEM_ERROR = 5486,
  REQUEST_VALIDATION_ERROR = 5487,
  REQUEST_TAX_ERROR = 5488,
  REQUEST_COMPLETE_TOKEN = 5489,
  REQUEST_DEFAULT_COMPLETE_ERROR = 5490,
  REQUEST_CHECKOUT_COMPLETE_UPDATE_ERROR = 5491,
  REQUEST_CHECKOUT_COMPLETE_SAVE_ERROR = 5492,
  REQUEST_CHECKOUT_HAS_COMPLETE_ERROR = 5493,
  REQUEST_NO_CART_ITEM_ERROR = 5494,
  REQUEST_NO_CUSTOMER_FOUND_ERROR = 5495,
  REQUEST_PAYMENT_ATTACHED_ERROR = 5496,
  REQUEST_SHIPPING_ADDRESS_ERROR = 5497,
  REQUEST_BILLING_ADDRESS_ERROR = 5498,
  REQUEST_PAYMENT_NOT_FOUND_ERROR = 5499,
  REQUEST_CART_UPDATED_ERROR = 5501,
  REQUEST_ADDRESS_DEFAULT_ERROR = 5502,
  REQUEST_TIPS_ERROR = 5503,
  REQUEST_COMPLETE_CUSTOMER_MISSING_FIELDS = 5504,
  REQUEST_RETAILER_HOURS_ERROR = 5505,
  REQUEST_ITEM_QUANTITY_CHANGE_ERROR = 5506,
  REQUEST_MAX_QUANTITY_PER_ORDER_ERROR = 5507,
  REQUEST_PRESALE_NOT_STARTED_ERROR = 5508,
  REQUEST_CART_MIN_RETAILER_NOT_MET_ERROR = 5509,
  REQUEST_CHECKOUT_PROCESSING_LOCK_NOT_ACQUIRED_ERROR = 5510,
  REQUEST_BOPIS_PRODUCT_NOT_OPTED_IN_ERROR = 5511,
  REQUEST_PAYMENT_PLATFORM_MISMATCH_ERROR = 5512,
  REQUEST_PAYMENT_VERIFICATION_ERROR = 5513,
  REQUEST_EXPRESS_AUTHORIZATION_MISMATCH_ERROR = 5514,
  REQUEST_DELIVERY_SELECTION_ERROR = 5515,
}

export enum ENUM_CHECKOUT_STATUS_CODE_MESSAGE {
  REQUEST_DEFAULT_ERROR = "There's been an error with your checkout request.",
  REQUEST_LOCATION_OOS_ERROR = 'The requested items are out of stock at this location.',
  REQUEST_LOCATION_MISMATCH_ERROR = "The selected location doesn't match your cart items.",
  REQUEST_BIRTHDATE_ERROR = 'Please verify your birthdate and try again.',
  REQUEST_CART_NOT_AVAILABLE_ERROR = 'This cart is no longer available.',
  REQUEST_CART_ID_ERROR = 'The cartId requested is invalid, check and try again.',
  REQUEST_CART_ITEM_ERROR = "There's an issue with one or more items in your cart.",
  REQUEST_VALIDATION_ERROR = "There's been an error with your request parameters, check and try again.",
  REQUEST_TAX_ERROR = 'There was an error calculating tax for your order.',
  REQUEST_COMPLETE_TOKEN = 'The checkout token provided is invalid, check and try again.',
  REQUEST_DEFAULT_COMPLETE_ERROR = 'There was an error completing your checkout, please try again later.',
  REQUEST_CHECKOUT_COMPLETE_UPDATE_ERROR = 'Unable to update your checkout status.',
  REQUEST_CHECKOUT_COMPLETE_SAVE_ERROR = 'Unable to save your completed checkout.',
  REQUEST_CHECKOUT_HAS_COMPLETE_ERROR = 'This checkout has already been processed, create a new cart to process a new checkout.',
  REQUEST_NO_CART_ITEM_ERROR = 'Item(s) in your cart are no longer available.',
  REQUEST_NO_CUSTOMER_FOUND_ERROR = 'The customer account was not found.',
  REQUEST_PAYMENT_ATTACHED_ERROR = 'The payment attached to the checkout is not a valid payment method for this customer.',
  REQUEST_SHIPPING_ADDRESS_ERROR = 'The address in your cart has changed, check and try again.',
  REQUEST_BILLING_ADDRESS_ERROR = 'The billing address in your checkout is not valid, check and try again.',
  REQUEST_PAYMENT_NOT_FOUND_ERROR = 'The payment method provided was not found.',
  REQUEST_CART_UPDATED_ERROR = 'The cart requested was updated during your checkout.',
  REQUEST_ADDRESS_DEFAULT_ERROR = "There's been an error with your address configurations in cart and/or billing address, check and try again.",
  REQUEST_TIPS_ERROR = "There's been an error applying your tips to the checkout.",
  REQUEST_COMPLETE_CUSTOMER_MISSING_FIELDS = 'Customer profile information is incomplete. Please provide all required details.',
  REQUEST_RETAILER_HOURS_ERROR = 'The retailer is currently closed or on-demand hours are not available.',
  REQUEST_ITEM_QUANTITY_CHANGE_ERROR = 'Some items in your cart exceed available stock quantities. Please adjust your cart and try again.',
  REQUEST_MAX_QUANTITY_PER_ORDER_ERROR = 'You have exceeded the maximum quantity allowed per order for one or more items in your cart.',
  REQUEST_PRESALE_NOT_STARTED_ERROR = 'The presale for this item has not started yet. Please check back later.',
  REQUEST_CART_MIN_RETAILER_NOT_MET_ERROR = 'Some items in your cart do not meet the minimum retailer requirements per order quantity. Please adjust your cart and try again.',
  REQUEST_CHECKOUT_PROCESSING_LOCK_NOT_ACQUIRED_ERROR = 'This checkout is currently being processed, please try again later.',
  REQUEST_BOPIS_PRODUCT_NOT_OPTED_IN_ERROR = 'One or more items in your cart are no longer eligible for in-store pickup (BOPIS) and were removed. Please review your cart and try again.',
  REQUEST_PAYMENT_PLATFORM_MISMATCH_ERROR = 'This payment method is not available for this checkout. Please re-enter your card details.',
  REQUEST_PAYMENT_VERIFICATION_ERROR = "We couldn't verify your payment information. Please check your card details and billing address, then try again.",
  REQUEST_EXPRESS_AUTHORIZATION_MISMATCH_ERROR = 'Your order changed since you approved it with your wallet. Please approve the payment again.',
  REQUEST_DELIVERY_SELECTION_ERROR = 'The selected delivery time is not available. Please choose another delivery time.',
}

/**
 * Payment errors a checkout completion can return. The payment service owns these codes and
 * messages; they arrive in `statusCode` and `message` alongside the checkout codes above.
 */
export enum ENUM_PAYMENT_STATUS_CODE_ERROR {
  PAYMENT_METHOD_INVALID = 8100,
  PAYMENT_METHOD_NOT_ON_FILE = 8101,
  PAYMENT_METHOD_EXPIRED = 8102,
  PAYMENT_DECLINED = 8103,
  PAYMENT_AUTHENTICATION_REQUIRED = 8104,
  PAYMENT_CARD_ERROR = 8105,
  PAYMENT_INSUFFICIENT_FUNDS = 8106,
  PAYMENT_CURRENCY_MISMATCH = 8107,
  PAYMENT_AMOUNT_TOO_LARGE = 8108,
  PAYMENT_AMOUNT_TOO_SMALL = 8109,
  PAYMENT_INVALID_CVC = 8110,
  PAYMENT_INVALID_EXPIRY = 8111,
  PAYMENT_CARD_DECLINED = 8112,
  PAYMENT_CARD_RESTRICTED = 8113,
  PAYMENT_PROCESSING_ERROR = 8114,
  PAYMENT_CUSTOMER_MAX_PAYMENT_ATTEMPTS = 8115,
  PAYMENT_INVALID_ACCOUNT = 8116,
  PAYMENT_RISK_LEVEL_HIGH = 8117,
  PAYMENT_STRIPE_ACCOUNT_ERROR = 8118,
  PAYMENT_STRIPE_API_ERROR = 8119,
  PAYMENT_STRIPE_RATE_LIMIT = 8120,
  PAYMENT_METHOD_UNSUPPORTED = 8121,
  PAYMENT_METHOD_NOT_FOUND = 40003,
}

export enum ENUM_PAYMENT_STATUS_CODE_MESSAGE {
  PAYMENT_METHOD_INVALID = 'Invalid payment method provided',
  PAYMENT_METHOD_NOT_ON_FILE = 'Payment method not found',
  PAYMENT_METHOD_EXPIRED = 'Payment method has expired',
  PAYMENT_DECLINED = 'Payment was declined',
  PAYMENT_AUTHENTICATION_REQUIRED = 'Payment requires authentication',
  PAYMENT_CARD_ERROR = 'There was an error processing the card',
  PAYMENT_INSUFFICIENT_FUNDS = 'Insufficient funds in the account',
  PAYMENT_CURRENCY_MISMATCH = 'Currency mismatch in the payment',
  PAYMENT_AMOUNT_TOO_LARGE = 'Payment amount exceeds the maximum allowed',
  PAYMENT_AMOUNT_TOO_SMALL = 'Payment amount is below the minimum allowed',
  PAYMENT_INVALID_CVC = 'Invalid card CVC provided',
  PAYMENT_INVALID_EXPIRY = 'Invalid card expiry date',
  PAYMENT_CARD_DECLINED = 'The card was declined',
  PAYMENT_CARD_RESTRICTED = 'The card has restrictions preventing this payment',
  PAYMENT_PROCESSING_ERROR = 'An error occurred while processing the payment',
  PAYMENT_CUSTOMER_MAX_PAYMENT_ATTEMPTS = 'Maximum payment attempts reached for this customer',
  PAYMENT_INVALID_ACCOUNT = 'The account provided is invalid',
  PAYMENT_RISK_LEVEL_HIGH = 'The payment was flagged as high risk',
  PAYMENT_STRIPE_ACCOUNT_ERROR = 'There was an error with the Stripe account',
  PAYMENT_STRIPE_API_ERROR = 'An error occurred with the Stripe API',
  PAYMENT_STRIPE_RATE_LIMIT = 'Stripe rate limit exceeded',
  PAYMENT_METHOD_UNSUPPORTED = 'The payment method is not supported for this transaction',
  PAYMENT_METHOD_NOT_FOUND = 'Payment method not found',
}

/** A coupon that stopped qualifying fails completion with HTTP 422; `message` gives the reason. */
export enum ENUM_DISCOUNT_STATUS_CODE_ERROR {
  REQUEST_COUPON_REJECTED_AT_COMPLETE_ERROR = 5600,
}

/**
 * Delivery window errors from checkout prepare and complete. They fail with HTTP 400 (statusCode
 * 5515) and arrive in `errors[].code`, with `field: 'deliverySelections'` (or
 * `'deliverySlotsFulfillmentId'` for an invalid `deliverySlotsFulfillmentId`); `message` gives the
 * text. Elements services adds `DELIVERY_SELECTION_NOT_ACCEPTED` with HTTP 409.
 */
export enum ENUM_CHECKOUT_DELIVERY_ERROR_CODE {
  /** The order-by time of the selected window has passed. Pick a new window. */
  DELIVERY_WINDOW_EXPIRED = 'delivery_window_expired',
  /** The selected window is not offered now. */
  DELIVERY_WINDOW_UNAVAILABLE = 'delivery_window_unavailable',
  /**
   * Cart-wide: this checkout cannot take a delivery window at all (scheduled delivery is turned
   * off, or the cart has a preorder item). Hide the window picker for the whole checkout and
   * send `slotId: null` (ASAP) for every fulfillment.
   */
  DELIVERY_WINDOWS_UNSUPPORTED = 'delivery_windows_unsupported',
  /**
   * Per fulfillment, from the retailer: the retailer has not turned on scheduled delivery for
   * this fulfillment option. Hide the window picker for that fulfillment only and send
   * `slotId: null` for it.
   */
  DELIVERY_SCHEDULING_NOT_ENABLED = 'delivery_scheduling_not_enabled',
  /** A delivery window needs a cart with one fulfillment group. */
  MULTIPLE_FULFILLMENT_GROUPS = 'multiple_fulfillment_groups',
  /** The window belongs to a fulfillment option that is not in this checkout. */
  UNKNOWN_FULFILLMENT_OPTION = 'unknown_fulfillment_option',
  /** The slot id is malformed or does not match the fulfillment. */
  DELIVERY_SELECTION_INVALID = 'delivery_selection_invalid',
  /**
   * Per fulfillment, from the fulfillment type: the fulfillment can never take a window (it is
   * not on-demand, or the checkout does not support delivery windows). A window was sent for a
   * fulfillment without `deliveryScheduling`; send `slotId: null` for it or leave it out.
   * Elements services also returns it with HTTP 409 when such a fulfillment gets a window.
   */
  DELIVERY_SCHEDULING_UNSUPPORTED = 'delivery_scheduling_unsupported',
  /**
   * Returned by Elements services, not by Cloud, with HTTP 409: Cloud did not echo the requested
   * window in `deliveryScheduling.selectedSlotId`. Clear that selection and let the shopper pick
   * a window again.
   */
  DELIVERY_SELECTION_NOT_ACCEPTED = 'delivery_selection_not_accepted',
}

export enum CHECKOUT_EVENT_ENUM {
  ERROR_PROCESSING_GIFT_CARDS = 'ErrorProcessingGiftCards',
  INVALID_GIFT_CARD_CODE = 'InvalidGiftCardCodes',
  INVALID_GIFT_CARD_PARTNER = 'InvalidGiftCardPartner',
  INACTIVE_GIFT_CARD = 'InactiveGiftCard',
  GIFT_CARD_ALREADY_IN_USE = 'GiftCardAlreadyInUse',
  GIFT_CARD_EXPIRED = 'GiftCardExpired',
  GIFT_CARD_BALANCE_DEPLETED = 'GiftCardBalanceDepleted',
  RETAILER_ONDEMAND_HOURS_NOT_AVAILABLE = 'RetailerOnDemandHoursNotAvailable',
  ITEM_QTY_CHANGE = 'ItemQuantityChange',
  MAX_QUANTITY_PER_ORDER_EXCEEDED = 'MaxQuantityPerOrderExceeded',

  // Coupon/discount related events
  COUPON_PROCESSING_ERROR = 'CouponProcessingError',
  COUPON_NOT_FOUND = 'CouponNotFound',
  COUPON_EXPIRED = 'CouponExpired',
  NO_APPLICABLE_DISCOUNT = 'NoApplicableDiscount',
  COUPON_NOT_STARTED = 'CouponNotStarted',
  MINIMUM_ORDER_VALUE_NOT_MET = 'MinimumOrderValueNotMet',
  MINIMUM_ORDER_UNITS_NOT_MET = 'MinimumOrderUnitsNotMet',
  MINIMUM_DISTINCT_ITEMS_NOT_MET = 'MinimumDistinctItemsNotMet',
  QUOTA_EXCEEDED = 'QuotaExceeded',
  USER_LIMIT_EXCEEDED = 'UserLimitExceeded',
  NOT_FIRST_PURCHASE = 'NotFirstPurchase',
  INVALID_COUPON = 'InvalidCoupon',
  INVALID_MEMBERSHIP = 'InvalidMembership',
  INVALID_DOMAIN = 'InvalidDomain',
  INVALID_REQUIREMENTS = 'InvalidRequirements',
  INVALID_ORGANIZATION = 'InvalidOrganization',
  PRESALE_ITEMS_NOT_ALLOWED = 'PresaleItemsNotAllowed',
  PRODUCT_NOT_ELIGIBLE = 'ProductNotEligible',
  NOT_ENOUGH_PREVIOUS_ORDERS = 'NotEnoughPreviousOrders',

  // Retailer restriction events
  RETAILER_DOES_NOT_ALLOW_PROMOS = 'RetailerDoesNotAllowPromos',
  RETAILERS_DO_NOT_ALLOW_PROMOS = 'RetailersDoNotAllowPromos',
  RETAILER_DOES_NOT_ALLOW_GIFT_CARDS = 'RetailerDoesNotAllowGiftCards',
  RETAILERS_DO_NOT_ALLOW_GIFT_CARDS = 'RetailersDoNotAllowGiftCards',
}

export enum ENUM_ORDER_STATUS {
  CREATED = 'created',
  PROCESSING = 'processing',
  IN_TRANSIT = 'inTransit',
  CANCELED = 'canceled',
  DELIVERED = 'delivered',
  TEST = 'test',
}

export enum ENUM_ORDER_SYSTEM {
  LIQUIDCOMMERCE = 'LiquidCommerce OMS',
  RESERVEBAR = 'ReserveBar OMS',
}

export enum ENUM_ORDER_PACKAGE_STATUS {
  PENDING = 'pending',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELED = 'canceled',
  RETURNED = 'returned',
  EXCEPTION = 'exception',
}

export enum ENUM_ORDER_FULFILLMENT_TYPE {
  SHIPPING = 'shipping',
  ON_DEMAND = 'onDemand',
  DIGITAL = 'digital',
  BOPIS = 'bopis',
}

export enum ENUM_CUSTOMER_PLACEMENT {
  STANDARD = 'standard',
  PRE_SALE = 'pre_sale',
  BACK_ORDER = 'back_order',
}

export enum SHIPPING_CATEGORY_TYPE {
  SPIRITS = ENUM_SPIRITS.BASE,
  WINE = ENUM_WINE.BASE,
  BEER = ENUM_BEER.BASE,
  NON_ALCOHOLIC = ENUM_NON_ALCOHOLIC.BASE,
  MISCELLANEOUS = ENUM_MISCELLANEOUS.BASE,
  MERCHANDISE = ENUM_MERCHANDISE.BASE,
  OTHER = 'OTHER',
}
