/**
 * A one-hour delivery window a shopper can pick for an on-demand fulfillment.
 *
 * All times are ISO-8601 UTC strings.
 *
 * @interface
 */
export interface DeliverySlot {
  /** `<fulfillmentOptionId>:<window start in Unix seconds>`, for example `4136780-2:1791478800`. */
  id: string;

  /** Window start. */
  start: string;

  /** Window end (start + 1 hour). */
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
  status: 'available' | 'unavailable' | 'unknown' | 'address_required';

  /** The fulfillment can deliver as soon as possible right now. */
  canDeliverNow: boolean;

  /** At least one delivery window exists. */
  canSchedule: boolean;

  /** IANA time zone of the retailer, for example `America/New_York`. */
  timezone: string;

  /** The first window, or `null` when there is none. */
  nextSlot: DeliverySlot | null;

  /** ISO-8601 UTC time at which Cloud built this availability. */
  checkedAt: string;

  reason: string | null;
}

/**
 * Delivery scheduling data of a checkout fulfillment. Present only on fulfillments that
 * support scheduled delivery.
 *
 * @interface
 */
export interface CheckoutDeliveryScheduling {
  availability: DeliveryAvailability;

  /**
   * The full window list. Filled only for the fulfillment named in
   * `ICheckoutPrepareParams.deliverySlotsFor`; empty otherwise.
   */
  slots: DeliverySlot[];

  /** The accepted window (`DeliverySlot.id`), or `null` for no window (ASAP). */
  selectedSlotId: string | null;
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
