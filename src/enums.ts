export enum LIQUID_COMMERCE_ENV {
  STAGE = 'stage',
  // PROD = 'prod',
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

export enum ENUM_BEER {
  ALE = 'BEER > ALE',
  LAGER = 'BEER > LAGER',
  MAIN = 'BEER',
  NON_ALCOHOLIC = 'BEER > NON-ALCOHOLIC',
  OTHER_BEER = 'BEER > OTHER BEER',
}

export enum ENUM_FOOD {
  BASE = 'FOOD',
  PANTRY_OTHER = 'FOOD > PANTRY > OTHER',
}

export enum ENUM_MERCHANDISE {
  BASE = 'MERCHANDISE',
  GLASSWARE = 'MERCHANDISE > GLASSWARE',
  HUMIDOR = 'MERCHANDISE > HUMIDOR',
}

export enum ENUM_MISCELLANEOUS {
  BASE = 'MISCELLANEOUS',
  GIFT_CARD = 'MISCELLANEOUS > GIFT CARDS',
  PROMOTIONAL = 'MISCELLANEOUS > PROMOTIONAL',
  MEMBERSHIP = 'MISCELLANEOUS > MEMBERSHIP',
}

export enum ENUM_NON_ALCOHOLIC {
  BASE = 'NON ALCOHOLIC',
  BITTERS = 'NON ALCOHOLIC > BITTERS',
  COCKTAIL_MIX = 'NON ALCOHOLIC > COCKTAIL MIX',
  COFFEE = 'NON ALCOHOLIC > COFFEE',
  ENERGY_DRINKS = 'NON ALCOHOLIC > ENERGY DRINKS',
  JUICE = 'NON ALCOHOLIC > JUICE',
  SODA = 'NON ALCOHOLIC > SODA',
  SPECIALTY_ITEM = 'NON ALCOHOLIC > SPECIALTY ITEM',
  SPIRITS = 'NON ALCOHOLIC > SPIRITS',
  TEA = 'NON ALCOHOLIC > TEA',
  WATER = 'NON ALCOHOLIC > WATER',
  WINE = 'NON ALCOHOLIC > WINE',
}

export enum ENUM_READY_TO_DRINK {
  BASE = 'READY TO DRINK',
  HARD_CIDER = 'READY TO DRINK > HARD CIDER',
  HARD_CIDER_PERRY_PEAR_CIDER = 'READY TO DRINK > HARD CIDER > PERRY (PEAR CIDER)',
  HARD_TEA = 'READY TO DRINK > HARD TEA',
  MALT_BASED = 'READY TO DRINK > MALT BASED',
  SPIRITS_BASED_RTDS = 'READY TO DRINK > SPIRITS-BASED RTDS',
  SPIRITS_BASED_RTDS_RUM_COCKTAILS = 'READY TO DRINK > SPIRITS-BASED RTDS > RUM COCKTAILS',
  SPIRITS_BASED_RTDS_TEQUILA_COCKTAILS = 'READY TO DRINK > SPIRITS-BASED RTDS > TEQUILA COCKTAILS',
  SPIRITS_BASED_RTDS_VODKA_COCKTAILS = 'READY TO DRINK > SPIRITS-BASED RTDS > VODKA COCKTAILS',
  SPIRITS_BASED_RTDS_WHISKEY_COCKTAILS = 'READY TO DRINK > SPIRITS-BASED RTDS > WHISKEY COCKTAILS',
  WINE_COCKTAILS = 'READY TO DRINK > WINE COCKTAILS',
}

export enum ENUM_SPIRITS {
  BASE = 'SPIRITS',
  BAIJIU = 'SPIRITS > BAIJIU',
  BITTERS = 'SPIRITS > BITTERS',
  BRANDY = 'SPIRITS > BRANDY',
  CACHACA = 'SPIRITS > CACHACA',
  GIN = 'SPIRITS > GIN',
  LAGER = 'SPIRITS > LAGER',
  LIQUEUR = 'SPIRITS > LIQUEUR',
  MEZCAL = 'SPIRITS > MEZCAL',
  OTHER_SPIRITS = 'SPIRITS > OTHER SPIRITS',
  RUM = 'SPIRITS > RUM',
  RUM_AGED_RUM = 'SPIRITS > RUM > AGED RUM',
  RUM_DARK_RUM = 'SPIRITS > RUM > DARK RUM',
  RUM_FLAVORED_RUM = 'SPIRITS > RUM > FLAVORED RUM',
  RUM_GOLD_RUM = 'SPIRITS > RUM > GOLD RUM',
  RUM_OTHER = 'SPIRITS > RUM > OTHER',
  RUM_SPICED = 'SPIRITS > RUM > SPICED',
  RUM_WHITE_RUM = 'SPIRITS > RUM > WHITE RUM',
  SOJU = 'SPIRITS > SOJU',
  TEQUILA = 'SPIRITS > TEQUILA',
  VODKA = 'SPIRITS > VODKA',
  VODKA_FLAVORED_VODKA = 'SPIRITS > VODKA > FLAVORED VODKA',
  WHISKEY = 'SPIRITS > WHISKEY',
  WHISKEY_AMERICAN_WHISKEY = 'SPIRITS > WHISKEY > AMERICAN WHISKEY',
  WHISKEY_BOURBON = 'SPIRITS > WHISKEY > BOURBON',
  WHISKEY_CANADIAN_WHISKEY = 'SPIRITS > WHISKEY > CANADIAN WHISKEY',
  WHISKEY_IRISH_WHISKEY = 'SPIRITS > WHISKEY > IRISH WHISKEY',
  WHISKEY_SCOTCH = 'SPIRITS > WHISKEY > SCOTCH',
}

export enum ENUM_WINE {
  BASE = 'WINE',
  CHAMPAGNE_SPARKLING = 'WINE > CHAMPAGNE & SPARKLING',
  CHAMPAGNE_SPARKLING_SPARKLING_WINE = 'WINE > CHAMPAGNE & SPARKLING > SPARKLING WINE',
  COOKING = 'WINE > COOKING',
  DESSERT_FORTIFIED_WINE = 'WINE > DESSERT & FORTIFIED WINE',
  DESSERT_FORTIFIED_WINE_SHERRY = 'WINE > DESSERT & FORTIFIED WINE > SHERRY',
  RED_WINE = 'WINE > RED WINE',
  ROSE_WINE = 'WINE > ROSE WINE',
  SAKE = 'WINE > SAKE',
  WHITE_WINE = 'WINE > WHITE WINE',
}

export enum ENUM_FILTER_KEYS {
  BRANDS = 'brands',
  FLAVOR = 'flavor',
  REGION = 'region',
  VARIETY = 'variety',
  PRICE = 'price',
  AVAILABILITY = 'availability',
  CATEGORIES = 'categories',
  SIZES = 'sizes',
  COLORS = 'colors',
  APPELLATION = 'appellation',
  COUNTRY = 'country',
  VINTAGE = 'vintage',
  MATERIALS = 'materials',
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
  ITEM_NOT_ENGRAVED = 'ItemEngravingError',
  ADDRESS_CHANGE = 'AddressChange',
  RETAILER_MIN = 'RetailerMinNotMet',
  NO_ITEMS_IN_CART = 'NoItemsInCart',
  INVALID_ID = 'InvalidId',
  NO_ID = 'NoId',
  CART_CHECKOUT_PROCESSED = 'CartCheckoutProcessed',
  NEW_CART = 'NewCart',
  DEFAULT = 'CartError',
  ITEM_QTY_CHANGE = 'ItemQuantityChange',
}

export enum ENUM_ADDRESS_TYPE {
  SHIPPING = 'shipping',
  BILLING = 'billing',
}
