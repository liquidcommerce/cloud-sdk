import type { ENUM_DELIVERY_AVAILABILITY_STATUS } from '../enums';

/**
 * A delivery window a shopper can pick for an on-demand fulfillment.
 *
 * All times are ISO-8601 UTC strings.
 *
 * @interface
 */
export interface DeliverySlot {
  /** `<fulfillmentOptionId>:<window start in Unix seconds>`, for example `4136780-2:1791478800`. */
  id: string;

  start: string;

  /** End of the window. */
  end: string;

  /**
   * Last moment to place the order for this window (window start minus the delivery
   * expectation). Show it as "Order by".
   */
  cutoff: string;
}

/**
 * Delivery scheduling availability for one fulfillment.
 *
 * @interface
 */
export interface DeliveryAvailability {
  /** Compare with `ENUM_DELIVERY_AVAILABILITY_STATUS` or its string value. */
  status: ENUM_DELIVERY_AVAILABILITY_STATUS | `${ENUM_DELIVERY_AVAILABILITY_STATUS}`;

  /** The fulfillment can deliver as soon as possible right now. */
  canDeliverNow: boolean;

  /** At least one delivery window exists. */
  canSchedule: boolean;

  /** IANA time zone of the retailer, for example `America/New_York`. */
  timezone: string;

  /** The first available window. */
  nextSlot: DeliverySlot | null;

  /** When Cloud built this availability (ISO-8601 UTC). */
  checkedAt: string;

  reason: string | null;
}

/**
 * Delivery scheduling data of a checkout fulfillment.
 *
 * @interface
 */
export interface CheckoutDeliveryScheduling {
  availability: DeliveryAvailability;

  /**
   * The full window list. Filled only for the fulfillment named in
   * `ICheckoutPrepareParams.deliverySlotsFulfillmentId`; empty otherwise.
   */
  slots: DeliverySlot[];

  /** The accepted `DeliverySlot.id`, or `null` for no window (ASAP). */
  selectedSlotId: string | null;

  /**
   * The window the shopper picked for this fulfillment, with its real `end` and `cutoff`
   * (release time), or `null` when none is picked.
   */
  selectedSlot: DeliverySlot | null;
}

/**
 * A delivery window selection sent with checkout prepare.
 *
 * @interface
 */
export interface CheckoutDeliverySelection {
  fulfillmentId: string;

  /** A `DeliverySlot.id`, or `null` for no window (ASAP). */
  slotId: string | null;
}
