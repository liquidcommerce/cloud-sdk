import type { DAYS_OF_WEEK, ENUM_MODALITIES } from '../enums';
import type { IAddress } from './address.interface';

/**
 * The IRetailerTimes interface represents the working hours of a retailer.
 *
 * @property {string} startsAt - The time at which the retailer begins its operations.
 * @property {string} endsAt - The time at which the retailer ends its operations.
 */
export interface IRetailerTimes {
  startsAt: string;
  endsAt: string;
}

/**
 * Interface representing the configuration of retailer hours.
 *
 * @interface IRetailerHoursConfig
 * @property {boolean} active - Indicates if the retailer is currently active.
 * @property {IRetailerTimes[]} times - An array of time configurations for the retailer.
 */
export interface IRetailerHoursConfig {
  active: boolean;
  times: IRetailerTimes[];
}

/**
 * Represents the operating hours configuration for a retailer, mapped by days of the week.
 * Each day of the week has an associated configuration that details the opening and closing times.
 *
 * @type {Object} RetailerHours
 * @property {IRetailerHoursConfig} MONDAY - Configuration for Monday
 * @property {IRetailerHoursConfig} TUESDAY - Configuration for Tuesday
 * @property {IRetailerHoursConfig} WEDNESDAY - Configuration for Wednesday
 * @property {IRetailerHoursConfig} THURSDAY - Configuration for Thursday
 * @property {IRetailerHoursConfig} FRIDAY - Configuration for Friday
 * @property {IRetailerHoursConfig} SATURDAY - Configuration for Saturday
 * @property {IRetailerHoursConfig} SUNDAY - Configuration for Sunday
 */
export type RetailerHours = { [day in DAYS_OF_WEEK]: IRetailerHoursConfig };

/**
 * Interface representing the expectations of a retailer.
 *
 * @interface IRetailerExpectation
 *
 * @property {string} detail - A detailed description of the expectation.
 * @property {string} short - A brief, summarized version of the expectation.
 */
export interface IRetailerExpectation {
  detail: string;

  short: string;
}

/**
 * The IRetailerFreeDelivery interface represents a structure for the free delivery
 * policy of a retailer. This includes the minimum purchase amount required for
 * free delivery and the status of the free delivery offer.
 *
 * @property min - The minimum amount in the retailer's currency required to qualify
 *                 for free delivery.
 *
 * @property active - A boolean indicating whether the free delivery offer is currently
 *                    active or not.
 */
export interface IRetailerFreeDelivery {
  min: number;

  active: boolean;
}

/**
 * Interface representing the configuration for fee-based shipping.
 *
 * @property {number} maxQuantity - The maximum quantity of items eligible for the shipping fee.
 * @property {number} fee - The fee amount for shipping.
 * @property {number} min - The min item total required to checkout.
 * @property {boolean} active - Indicates whether the fee-based shipping configuration is active.
 */
export interface IFeeShippingConfig {
  maxQuantity: number;

  fee: number;

  min: number;

  active: boolean;
}

/**
 * Interface representing the shipping fee configurations for a retailer.
 *
 * @interface IRetailerFeeShipping
 * @property {IFeeShippingConfig} individual - Configuration for individual item shipping fee.
 * @property {IFeeShippingConfig} pack - Configuration for pack item shipping fee.
 * @property {IRetailerFreeDelivery} free - Configuration for free delivery options.
 */
export interface IRetailerFeeShipping {
  individual: IFeeShippingConfig;

  pack: IFeeShippingConfig;

  free: IRetailerFreeDelivery;
}

/**
 * Interface representing the delivery fee structure for a retailer.
 *
 * @interface IRetailerFeeDelivery
 *
 * @property {number} min - The minimum amount for delivery fee calculation.
 * @property {number} fee - The standard delivery fee charged by the retailer.
 * @property {IRetailerFreeDelivery} free - The criteria for free delivery.
 */
export interface IRetailerFeeDelivery {
  min: number;

  fee: number;

  free: IRetailerFreeDelivery;
}

/**
 * Represents the possible types of retailer fees.
 *
 * @typedef {Object} IRetailerFees
 * @property {IRetailerFeeShipping} shipping - The shipping fee details.
 * @property {IRetailerFeeDelivery} delivery - The delivery fee details.
 */
export type IRetailerFees = IRetailerFeeShipping | IRetailerFeeDelivery;

/**
 * Interface representing the fulfillment details of a retailer.
 *
 * @interface IRetailerFulfillments
 *
 * @property {string} id - The unique identifier for the fulfillment.
 *
 * @property {ENUM_MODALITIES} type - The modality type of the fulfillment.
 *
 * @property {number} [deliveryFee] - Optional delivery fee for the fulfillment.
 *
 * @property {number} [shippingFee] - Optional shipping fee for the fulfillment.
 *
 * @property {number} [engravingFee] - Optional engraving fee for the fulfillment.
 *
 * @property {number} [subtotal] - Optional subtotal amount for the fulfillment.
 *
 * @property {string} [timezone] - Optional timezone associated with the fulfillment.
 *
 * @property {IRetailerFees} fees - The various fees associated with the fulfillment.
 *
 * @property {IRetailerExpectation} expectation - The expectations set for the fulfillment process.
 *
 * @property {RetailerHours} hours - The working hours applicable to the fulfillment.
 *
 * @property {IRetailerTimes[]} breaks - The breaks within the working hours.
 *
 * @property {string[]} items - List of item identifiers included in the fulfillment.
 */
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

/**
 * Interface representing a retailer with various attributes related to transactions and logistics.
 *
 * @interface
 *
 * @property {string} name - The name of the retailer.
 * @property {string} id - The unique identifier for the retailer.
 * @property {number} [platformFee] - Optional platform fee associated with the retailer.
 * @property {number} [deliveryFee] - Optional delivery fee charged by the retailer.
 * @property {number} [shippingFee] - Optional shipping fee charged by the retailer.
 * @property {number} [engravingFee] - Optional engraving fee for customization services.
 * @property {number} [subtotal] - Optional subtotal amount before fees and taxes.
 * @property {number} [total] - Optional total amount including fees and taxes.
 * @property {IAddress} [address] - Optional address information for the retailer.
 * @property {IRetailerFulfillments[]} fulfillments - List of fulfillment details related to retailer orders.
 */
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
