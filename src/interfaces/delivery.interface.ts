export interface IDeliverySlot {
  id: string;
  start: string;
  end: string;
  cutoff: string;
}

export interface IDeliveryAvailability {
  status: 'available' | 'unavailable' | 'unknown' | 'address_required';
  canDeliverNow: boolean;
  canSchedule: boolean;
  timezone: string;
  nextSlot: IDeliverySlot | null;
  checkedAt: string;
  reason: string | null;
}

export interface ICheckoutDeliveryScheduling {
  availability: IDeliveryAvailability;
  slots: IDeliverySlot[];
  selectedSlotId: string | null;
}

export interface ICheckoutDeliverySelection {
  fulfillmentId: string;
  slotId: string | null; // null is unset for a closed store, or ASAP when authoritative availability permits it.
}
