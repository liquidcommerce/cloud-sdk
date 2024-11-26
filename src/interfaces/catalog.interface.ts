import type {
  ENUM_AVAILABILITY_VALUE,
  ENUM_BINARY_FILTER,
  ENUM_ENGRAVING,
  ENUM_FILTER_KEYS,
  ENUM_MODALITIES,
  ENUM_NAVIGATION_ORDER_DIRECTION_TYPE,
  ENUM_ORDER_BY,
} from '../enums';
import type { LiquidTaxonomy } from '../types';
import type { ILocBase } from './address.interface';
import type { IRetailer } from './retailer.interface';

/**
 * ICategoryFilter represents a filter specifically for categories.
 */
export interface ICategoryFilter {
  key: ENUM_FILTER_KEYS.CATEGORIES | 'categories';

  values: LiquidTaxonomy[];
}

/**
 * The IPriceFilter interface is used to define a structure for filtering
 * items based on their price range.
 */
export interface IPriceFilter {
  key: ENUM_FILTER_KEYS.PRICE | 'price';

  values: { min?: number | string; max?: number | string };
}

/**
 * Interface representing a filter based on availability.
 *
 * @interface IAvailabilityFilter
 */
export interface IAvailabilityFilter {
  key: ENUM_FILTER_KEYS.AVAILABILITY | 'availability';

  values: ENUM_AVAILABILITY_VALUE | keyof typeof ENUM_AVAILABILITY_VALUE;
}

/**
 * Interface representing a Fulfillment Filter used in search or sorting operations.
 */
export interface IFulfillmentFilter {
  key: ENUM_FILTER_KEYS.FULFILLMENT | 'fulfillment';

  values: [ENUM_MODALITIES];
}

/**
 * Interface representing an engraving filter.
 *
 * This interface is used to define the properties for filtering items
 * based on engraving criteria.
 *
 * Properties:
 *
 * - key: Indicates that the filter criteria is related to engraving.
 *        It can either be the ENUM_FILTER_KEYS.ENGRAVING enum value or the string 'engraving'.
 *
 * - values: Specifies the possible engraving values to filter by.
 *           It can either be from the ENUM_ENGRAVING enum or a key from the ENUM_ENGRAVING enum.
 */
export interface IEngravingFilter {
  key: ENUM_FILTER_KEYS.ENGRAVING | 'engraving';

  values:
    | ENUM_BINARY_FILTER
    | keyof typeof ENUM_BINARY_FILTER
    | ENUM_ENGRAVING
    | keyof typeof ENUM_ENGRAVING;
}

/**
 * The IPresaleFilter interface defines the structure for filtering presale items in a given context.
 * It includes properties for specifying the filter key and the filter values.
 *
 * @property {ENUM_FILTER_KEYS.PRESALE | 'presale'} key - The key indicating the type of filter, specific to presale.
 * @property {ENUM_BINARY_FILTER | keyof typeof ENUM_BINARY_FILTER} values - The values associated with the presale filter, which can be enumerable binary filter values.
 */
export interface IPresaleFilter {
  key: ENUM_FILTER_KEYS.PRESALE | 'presale';

  values: ENUM_BINARY_FILTER | keyof typeof ENUM_BINARY_FILTER;
}

/**
 * Represents a filter interface for defining key-value pairs used in filtering operations.
 *
 * @type {IFilter} IFilter
 */
export interface IFilter {
  key: Omit<
    ENUM_FILTER_KEYS,
    | ENUM_FILTER_KEYS.CATEGORIES
    | ENUM_FILTER_KEYS.PRICE
    | ENUM_FILTER_KEYS.AVAILABILITY
    | ENUM_FILTER_KEYS.ENGRAVING
    | ENUM_FILTER_KEYS.FULFILLMENT
  >;

  values: string | string[] | number | number[];
}

/**
 * Interface representing the parameters used for catalog search and navigation.
 */
export interface ICatalogParams extends ILocBase {
  search?: string;

  pageToken?: string;

  entity?: string;

  page?: number;

  perPage?: number;

  visitorId?: string;

  orderBy?: ENUM_ORDER_BY;

  orderDirection?: ENUM_NAVIGATION_ORDER_DIRECTION_TYPE;

  filters?: Array<
    | ICategoryFilter
    | IPriceFilter
    | IAvailabilityFilter
    | IFulfillmentFilter
    | IEngravingFilter
    | IPresaleFilter
    | IFilter
  >;
}

/**
 * ICatalog interface represents a structured collection of retailers, products, and navigation schema.
 */
export interface ICatalog {
  retailers?: IRetailer[] | Array<Record<string, any>>;

  products?: IProduct[] | Array<Record<string, any>>;

  navigation?: INavigationSchema;
}

/**
 * IFilterValue interface represents a filterable value typically used in context
 * with searching or sorting functionalities within an application.
 * It is designed to hold a specific value and its associated count.
 */
export interface IFilterValue {
  value: LiquidTaxonomy | ENUM_AVAILABILITY_VALUE | ENUM_BINARY_FILTER | string;

  count: number;
}

/**
 * FacetFilterKeys represents the possible keys that can be used to filter items in a faceted search.
 * It encompasses a variety of attributes that can be used to refine search results, such as brands,
 * flavor, region, price, availability, and more.
 * Each key corresponds to an enumerated value in ENUM_FILTER_KEYS.
 */
export type FacetFilterKeys =
  | ENUM_FILTER_KEYS.BRANDS
  | ENUM_FILTER_KEYS.FLAVOR
  | ENUM_FILTER_KEYS.REGION
  | ENUM_FILTER_KEYS.VARIETY
  | ENUM_FILTER_KEYS.ENGRAVING
  | ENUM_FILTER_KEYS.PRESALE
  | ENUM_FILTER_KEYS.PRICE
  | ENUM_FILTER_KEYS.AVAILABILITY
  | ENUM_FILTER_KEYS.CATEGORIES
  | ENUM_FILTER_KEYS.SIZES
  | ENUM_FILTER_KEYS.COLORS
  | ENUM_FILTER_KEYS.APPELLATION
  | ENUM_FILTER_KEYS.COUNTRY
  | ENUM_FILTER_KEYS.VINTAGE
  | ENUM_FILTER_KEYS.MATERIALS
  | ENUM_FILTER_KEYS.TAGS;

/**
 * IFilterSchema represents the structure for filtering datasets based on specific criteria.
 */
export interface IFilterSchema {
  bucket: FacetFilterKeys;

  values: IFilterValue[];
}

/**
 * ICursorSchema represents a schema interface that includes pagination tokens.
 * This interface defines the structure for handling cursor-based pagination.
 */
export interface ICursorSchema {
  nextPageToken: string;

  previousPageToken: string;
}

/**
 * Interface representing the schema for navigation data.
 */
export interface INavigationSchema {
  id: string;

  correctedQuery: string;

  attributionToken: string;

  currentPage: number;

  totalPages: number;

  totalCount: number;

  availableOrderBy: ENUM_ORDER_BY[];

  availableOrderDirection: ENUM_NAVIGATION_ORDER_DIRECTION_TYPE[];

  cursor: ICursorSchema;

  filters: IFilterSchema[];
}

/**
 * Represents parameters for availability inquiries.
 */
export interface IAvailabilityParams extends ILocBase {
  upcs?: string[];

  grouping?: string[];

  ids?: string[];

  shouldShowOffHours?: boolean;
}

/**
 * Interface representing the availability response.
 */
export interface IAvailabilityResponse {
  products: IProduct[];

  retailers: IRetailer[];
}

/**
 * Interface representing attributes related to images of a product.
 */
export interface IAttributesImage {
  backOfBottle: string;

  frontOfBottle: string;

  lifestyle: string[];
}

/**
 * The IAttributesAward interface represents the structure of an award's attributes.
 */
export interface IAttributesAward {
  image: string;

  statement: string;

  title: string;
}

/**
 * Interface representing attributes of a recipe ingredient.
 */
export interface IAttributesRecipeIngredient {
  name: string;

  amount: string;
}

/**
 * Interface for defining the attributes of a recipe.
 */
export interface IAttributesRecipe {
  image: string;

  ingredients: IAttributesRecipeIngredient[];

  steps: string[];

  title: string;
}

/**
 * Interface representing the attributes of a video.
 *
 * This interface includes properties for storing the video's link, image, and title.
 */
export interface IAttributesVideo {
  link: string;

  image: string;

  title: string;
}

/**
 * Interface representing the attributes of a tasting note.
 */
export interface IAttributesTastingNote {
  statement: string;

  image: string;

  title: string;
}

/**
 * Interface representing personalization attributes for an item.
 */
export interface IAttributesPersonalization {
  type: string;

  engravingMaxLines: number;

  engravingMaxCharsPerLine: number;

  location: string[];

  width: number;

  height: number;

  image: string;

  fee: number;

  availableFrom: Date;

  availableTo: Date;
}

/**
 * IAttributes interface represents the attributes of a product, including its origin,
 * ownership type, tags, images, awards, recipes, videos, tasting notes, and personalizations.
 */
export interface IAttributes {
  brandOrigin: string;

  originStatement: string;

  ownershipType: string[];

  tags: string[];

  images: IAttributesImage;

  awards: IAttributesAward[];

  recipes: IAttributesRecipe[];

  video: IAttributesVideo[];

  tastingNotes: IAttributesTastingNote[];

  personalizations: IAttributesPersonalization[];
}

/**
 * Interface representing the types of product fulfillment options.
 *
 * Properties:
 * - shipping: A string representing the shipping fulfillment type.
 * - onDemand: A string representing the on-demand fulfillment type.
 */
export interface IProductFulfillmentTypes {
  shipping: string;

  onDemand: string;
}

/**
 * Represents a product variant in the system.
 *
 * This interface holds details about a specific variation of a product, including its
 * part number, retailer ID, pricing information, and fulfillment options.
 */
export interface IProductVariant {
  partNumber: string;

  retailerId: string;

  price: number;

  modalities?: ENUM_MODALITIES;

  salePrice: number;

  isEngravable: boolean;

  stock: number;

  fulfillments: string[];

  fulfillmentTypes: IProductFulfillmentTypes;
}

/**
 * Represents the engraving details for a product size.
 */
export interface IProductSizeEngraving {
  status: boolean;

  validated?: boolean;

  maxLines: number;

  maxCharsPerLine: number;

  fee: number;

  location: string;
}

/**
 * Interface representing a product presale.
 *
 * @interface IProductPresale
 *
 * @property {Date | null} canPurchaseOn - The date when the product can be added to the cart.
 *                                      If null, the canPurchaseOn date is not set.
 *
 * @property {Date | null} estimatedShipBy - The date when the product is expected to ship.
 *                                      If null, the estimatedShipBy date is not set.
 *
 * @property {boolean} isActive - Indicates whether the presale is currently active.
 *
 * @property {string} language - The language associated with the product presale.
 */
export interface IProductPresale {
  canPurchaseOn: Date | null;

  estimatedShipBy: Date | null;

  isActive: boolean;

  language: string;
}

/**
 * Interface representing attributes related to the size of a product.
 *
 * @property {IProductSizeEngraving} [engraving] - Optional engraving details for the product size.
 */
export interface IProductSizeAttributes {
  salsifyPid?: string;

  salsifyGrouping?: string;

  presale: IProductPresale;

  engraving: IProductSizeEngraving;
}

/**
 * Represents the size details of a product in an inventory system.
 *
 * @interface IProductSize
 */
export interface IProductSize {
  id: string;

  salsifyPid?: string;

  upc: string;

  size: string;

  volume: string;

  uom: string;

  image: string;

  pack: boolean;

  packDesc: string;

  container: string;

  containerType: string;

  attributes: IProductSizeAttributes;

  modalities?: ENUM_MODALITIES;

  variants: IProductVariant[];
}

/**
 * Represents a product with various attributes and details.
 */
export interface IProduct {
  id?: string;

  name: string;

  brand: string;

  catPath: string;

  category: string;

  classification: string;

  type: string;

  salsifyGrouping?: string;

  subType: string;

  region: string;

  country: string;

  material: string;

  abv: string;

  proof: string;

  age: string;

  color: string;

  flavor: string;

  variety: string;

  appellation: string;

  vintage: string;

  description: string;

  htmlDescription: string;

  tastingNotes: string;

  images: string[] | Array<Record<string, any>>;

  sizes: IProductSize[];

  attributes?: Partial<IAttributes>;
}
