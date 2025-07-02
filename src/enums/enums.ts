export enum LIQUID_COMMERCE_ENV {
  LOC = 'loc',
  STAGE = 'stage',
  PROD = 'prod',
  DEV = 'dev',
}

export enum ENUM_MODALITIES {
  ON_DEMAND = 'onDemand',
  SHIPPING = 'shipping',
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
  REQUEST_DEFAULT_COMPLETE_ERROR = 'There was an error completing your checkout, confirm through the (prepare) method and try again.',
  REQUEST_CHECKOUT_COMPLETE_UPDATE_ERROR = 'Unable to update your checkout status.',
  REQUEST_CHECKOUT_COMPLETE_SAVE_ERROR = 'Unable to save your completed checkout.',
  REQUEST_CHECKOUT_HAS_COMPLETE_ERROR = 'This checkout has already been processed, create a new cart to process a new checkout.',
  REQUEST_NO_CART_ITEM_ERROR = 'No items found in your cart.',
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
}

export enum ENUM_ORDER_STATUS {
  CREATED = 'created',
  PROCESSING = 'processing',
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
