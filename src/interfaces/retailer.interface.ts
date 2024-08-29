import type { DAYS_OF_WEEK, ENUM_MODALITIES } from '../enums';
import type { IAddress } from './address.interface';

export interface IRetailerTimes {
  startsAt: string;
  endsAt: string;
}

export interface IRetailerHoursConfig {
  active: boolean;
  times: IRetailerTimes[];
}

export type RetailerHours = { [day in DAYS_OF_WEEK]: IRetailerHoursConfig };

export interface IRetailerExpectation {
  detail: string;

  short: string;
}

export interface IRetailerFreeDelivery {
  min: number;

  active: boolean;
}

export interface IFeeShippingConfig {
  maxQuantity: number;

  fee: number;

  active: boolean;
}

export interface IRetailerFeeShipping {
  individual: IFeeShippingConfig;

  pack: IFeeShippingConfig;

  free: IRetailerFreeDelivery;
}

export interface IRetailerFeeDelivery {
  min: number;

  fee: number;

  free: IRetailerFreeDelivery;
}

export type IRetailerFees = IRetailerFeeShipping | IRetailerFeeDelivery;

export interface IRetailerFulfillments {
  id: string;

  type: ENUM_MODALITIES;

  deliveryFee?: number;

  shippingFee?: number;

  engravingFee?: number;

  subtotal?: number;

  timezone?: string;

  fees: IRetailerFees;

  expectation: IRetailerExpectation;

  hours: RetailerHours;

  breaks: IRetailerTimes[];

  items: string[];
}

export interface IRetailer {
  name: string;

  id: string;

  platformFee?: number;

  deliveryFee?: number;

  shippingFee?: number;

  engravingFee?: number;

  subtotal?: number;

  total?: number;

  address?: IAddress;

  fulfillments: IRetailerFulfillments[];
}
