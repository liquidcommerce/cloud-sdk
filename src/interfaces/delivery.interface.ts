import type { ENUM_DELIVERY_AVAILABILITY_STATUS } from '../enums';

/**
 * A delivery window a shopper can pick for an on-demand fulfillment.
 *
 * All times are ISO-8601 UTC strings.
 *
 * @interface
 */
export interface IDeliverySlot {
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
export interface IDeliveryAvailability {
  /**
   * `'available'` when `canDeliverNow` or `canSchedule` is true, otherwise `'unavailable'`.
   * Compare with `ENUM_DELIVERY_AVAILABILITY_STATUS` or its string value.
   */
  status: ENUM_DELIVERY_AVAILABILITY_STATUS | `${ENUM_DELIVERY_AVAILABILITY_STATUS}`;

  /** The fulfillment can deliver as soon as possible right now. */
  canDeliverNow: boolean;

  /**
   * The fulfillment can take a delivery window. In checkout, at least one window exists. On
   * catalog and cart fulfillments of a store that is closed now, it comes from the store's
   * scheduled delivery setting, and checkout gives the windows.
   */
  canSchedule: boolean;

  /** IANA time zone of the retailer, for example `America/New_York`, or `null` when unknown. */
  timezone: string | null;

  /**
   * The first available window, or `null`. On catalog and cart fulfillments of a store that is
   * closed now and can schedule, it is `null`: show "Schedule delivery" without a time, and get
   * the windows in checkout (`deliverySlotsFulfillmentId`).
   */
  nextSlot: IDeliverySlot | null;

  /** When Cloud built this availability (ISO-8601 UTC). */
  checkedAt: string;
}

/**
 * Delivery scheduling data of a checkout fulfillment.
 *
 * @interface
 */
export interface ICheckoutDeliveryScheduling {
  availability: IDeliveryAvailability;

  /**
   * The full window list. Filled only for the fulfillment named in
   * `ICheckoutPrepareParams.deliverySlotsFulfillmentId`; empty otherwise. It is a snapshot at the
   * time of the response: do not cache it, and request it again each time the window picker opens.
   */
  slots: IDeliverySlot[];

  /**
   * The accepted `IDeliverySlot.id`, or `null` for no window (ASAP). This is the source of truth
   * for whether a window is held.
   */
  selectedSlotId: string | null;

  /**
   * Display detail of the accepted window, with its real `end` and `cutoff` (release time).
   * It can be `null` while `selectedSlotId` is set, when Cloud could not read the window; then
   * find the window by `selectedSlotId` in `slots` or `availability.nextSlot`, and do not show
   * ASAP. If it is not there, prepare with `deliverySlotsFulfillmentId` set to this fulfillment to
   * load the list.
   */
  selectedSlot: IDeliverySlot | null;
}

/**
 * A delivery window selection sent with checkout prepare.
 *
 * @interface
 */
export interface ICheckoutDeliverySelection {
  fulfillmentId: string;

  /** A `IDeliverySlot.id`, or `null` for no window (ASAP). */
  slotId: string | null;
}
