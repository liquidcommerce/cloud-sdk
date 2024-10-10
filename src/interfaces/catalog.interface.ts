import type {
  ENUM_AVAILABILITY_VALUE,
  ENUM_ENGRAVING,
  ENUM_FILTER_KEYS,
  ENUM_MODALITIES,
  ENUM_NAVIGATION_ORDER_DIRECTION_TYPE,
  ENUM_ORDER_BY,
} from '../enums';
import type { LiquidTaxonomy } from '../types';
import type { ILocBase } from './address.interface';
import type { IRetailer } from './retailer.interface';

export interface ICategoryFilter {
  key: ENUM_FILTER_KEYS.CATEGORIES | 'categories';

  values: LiquidTaxonomy[];
}

export interface IPriceFilter {
  key: ENUM_FILTER_KEYS.PRICE | 'price';

  values: { min?: number | string; max?: number | string };
}

export interface IAvailabilityFilter {
  key: ENUM_FILTER_KEYS.AVAILABILITY | 'availability';

  values: ENUM_AVAILABILITY_VALUE | keyof typeof ENUM_AVAILABILITY_VALUE;
}

export interface IFulfillmentFilter {
  key: ENUM_FILTER_KEYS.FULFILLMENT | 'fulfillment';

  values: [ENUM_MODALITIES];
}

export interface IEngravingFilter {
  key: ENUM_FILTER_KEYS.ENGRAVING | 'engraving';

  values: ENUM_ENGRAVING | keyof typeof ENUM_ENGRAVING;
}

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
    | IFilter
  >;
}

export interface ICatalog {
  retailers?: IRetailer[] | Array<Record<string, any>>;

  products?: IProduct[] | Array<Record<string, any>>;

  navigation?: INavigationSchema;
}

export interface IFilterValue {
  value: LiquidTaxonomy | ENUM_AVAILABILITY_VALUE | string;

  count: number;
}

export interface IFilterSchema {
  bucket: ENUM_FILTER_KEYS;

  values: IFilterValue[];
}

export interface ICursorSchema {
  nextPageToken: string;

  previousPageToken: string;
}

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

export interface IAvailabilityParams extends ILocBase {
  upcs?: string[];

  grouping?: string[];

  ids?: string[];

  shouldShowOffHours?: boolean;
}

export interface IAvailabilityResponse {
  products: IProduct[];

  retailers: IRetailer[];
}

export interface IAttributesImage {
  backOfBottle: string;

  frontOfBottle: string;

  lifestyle: string[];
}

export interface IAttributesAward {
  image: string;

  statement: string;

  title: string;
}

export interface IAttributesRecipeIngredient {
  name: string;

  amount: string;
}

export interface IAttributesRecipe {
  image: string;

  ingredients: IAttributesRecipeIngredient[];

  steps: string[];

  title: string;
}

export interface IAttributesVideo {
  link: string;

  image: string;

  title: string;
}

export interface IAttributesTastingNote {
  statement: string;

  image: string;

  title: string;
}

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

export interface IProductFulfillmentTypes {
  shipping: string;

  onDemand: string;
}

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

export interface IProductSizeEngraving {
  status: boolean;

  validated?: boolean;

  maxLines: number;

  maxCharsPerLine: number;

  fee: number;

  location: string;
}

export interface IProductSizeAttributes {
  engraving?: IProductSizeEngraving;
}

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

  pack?: boolean;

  packDesc?: string;

  container?: string;

  containerType?: string;

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
