import type { ENUM_DELIVERY_AVAILABILITY_STATUS } from '../enums';

/**
 * A delivery window a shopper can pick for an on-demand fulfillment.
 *
 * All times are ISO-8601 UTC strings.
 *
 * @interface
 */
export interface DeliverySlot {
  /** Opaque. Pass it back unchanged; do not parse it. */
  id: string;

  start: string;

  /** End of the window. */
  end: string;

  /**
   * Last moment to place the order for this window: ManaShop's release time, which is the window
   * start minus the delivery expectation and any release buffer. Show it as "Order by".
   */
  cutoff: string;
}

/**
 * Delivery scheduling availability for one fulfillment.
 *
 * @interface
 */
export interface DeliveryAvailability {
  /**
   * `'available'` when `canDeliverNow` or `canSchedule` is true, otherwise `'unavailable'`.
   * Compare with `ENUM_DELIVERY_AVAILABILITY_STATUS` or its string value.
   */
  status: ENUM_DELIVERY_AVAILABILITY_STATUS | `${ENUM_DELIVERY_AVAILABILITY_STATUS}`;

  /** The fulfillment can deliver as soon as possible right now. */
  canDeliverNow: boolean;

  /** At least one delivery window exists. */
  canSchedule: boolean;

  /** IANA time zone of the retailer, for example `America/New_York`, or `null` when unknown. */
  timezone: string | null;

  /** The first available window. */
  nextSlot: DeliverySlot | null;

  /** When Cloud built this availability (ISO-8601 UTC). */
  checkedAt: string;
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
   * `ICheckoutPrepareParams.deliverySlotsFulfillmentId`; empty otherwise. It is a snapshot at the
   * time of the response: do not cache it, and request it again each time the window picker opens.
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
