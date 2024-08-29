import type { ENUM_AVAILABILITY_VALUE, ENUM_FILTER_KEYS, ENUM_NAVIGATION_ORDER_DIRECTION_TYPE, ENUM_ORDER_BY } from '../enums';
import type { LiquidTaxonomy } from '../types';
import type { ILocBase } from './address.interface';
import type { IProduct } from './catalog.interface';
import type { IRetailer } from './retailer.interface';

interface ICategoryFilter {
  key: ENUM_FILTER_KEYS.CATEGORIES | 'categories';

  values: LiquidTaxonomy[];
}

interface IPriceFilter {
  key: ENUM_FILTER_KEYS.PRICE | 'price';

  values: { min?: number | string; max?: number | string };
}

interface IAvailabilityFilter {
  key: ENUM_FILTER_KEYS.AVAILABILITY | 'availability';

  values: ENUM_AVAILABILITY_VALUE | keyof typeof ENUM_AVAILABILITY_VALUE;
}

interface IFilter {
  key: Omit<ENUM_FILTER_KEYS, ENUM_FILTER_KEYS.CATEGORIES | ENUM_FILTER_KEYS.PRICE | ENUM_FILTER_KEYS.AVAILABILITY>;

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

  filters?: Array<ICategoryFilter | IPriceFilter | IAvailabilityFilter | IFilter>;
}

export interface ICatalog {
  retailers?: IRetailer[] | Array<Record<string, any>>;

  products?: IProduct[] | Array<Record<string, any>>;

  navigation?: INavigationSchema;
}

interface IFilterValue {
  value: LiquidTaxonomy | ENUM_AVAILABILITY_VALUE | string;

  count: number;
}

interface IFilterSchema {
  bucket: ENUM_FILTER_KEYS;

  values: IFilterValue[];
}

interface ICursorSchema {
  nextPageToken: string;

  previousPageToken: string;
}

interface INavigationSchema {
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
