import type { ENUM_MODALITIES } from '../enums';

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
  upc: string;

  size: string;

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
  name: string;

  brand: string;

  catPath: string;

  category: string;

  classification: string;

  type: string;

  size?: string;

  modalities?: ENUM_MODALITIES;

  subType: string;

  region: string;

  country: string;

  material: string;

  abv: string;

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

  images: string[];

  sizes: IProductSize[];
}
