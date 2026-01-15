export interface ITrackingPackageDetails {
  aftershipTrackingUrl: string | null;
  carrierTrackingUrl: string | null;
  estimatedDeliveryDatetime: string | null;
}

export interface ITrackingPackageUpdate {
  updateDatetime: string | null;
  events: any[];
  createdAt: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  message: string;
  subtag: string | null;
  subtagMessage: string | null;
  tag: string | null;
}

export interface ITrackingPackageItem {
  name: string;
  orderItemId: string;
  quantity: number;
  variantId: string | null;
  upc: string | null;
  imageUrl: string | null;
  value: number | null;
  currency: string | null;
}

export interface ITrackingPackage {
  id: string | null;
  retailerOrderId: string | null;
  isLegacy: boolean;
  status: string;
  trackingNumber: string | null;
  carrier: string | null;
  trackingDetails: ITrackingPackageDetails;
  trackingUpdates: ITrackingPackageUpdate[];
  items: ITrackingPackageItem[];
}

export interface ITracking {
  legacyOrderNumber: string | null;
  referenceId: string | null;
  packages: ITrackingPackage[];
}
