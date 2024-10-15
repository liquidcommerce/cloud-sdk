import type { ENUM_ADDRESS_TYPE } from '../enums';
import type { ICoreParams } from '../types';

export interface IUserSession {
  key: string | null;

  secret: string | null;

  createdAt: Date;
}

export interface IUserAddressBase {
  placesId: string;

  one: string;

  two: string;

  city: string;

  state: string;

  zip: string;

  country: string;

  lat: number;

  long: number;
}

export interface IUserAddress extends IUserAddressBase {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  isDefault?: boolean;
}

export interface ISavedCard {
  brand: string | null;

  country: string | null;

  expMonth: number | null;

  expYear: number | null;

  last4: string | null;

  funding: string | null;
}

export interface IUserPayment {
  id: string;

  type: string;

  isDefault: boolean;

  card?: ISavedCard;

  createdAt: Date;
}

export interface IUser {
  id: string;

  email: string;

  firstName: string | null;

  lastName: string | null;

  phone: string | null;

  company: string | null;

  profileImage: string | null;

  birthDate: string | null;

  createdAt: Date;

  updatedAt: Date;

  addresses: IUserAddress[];

  savedPayments: IUserPayment[];

  session: IUserSession;
}

export type BaseUser = Omit<IUser, 'session'>;

export interface IUserSessionParams extends ICoreParams {
  id?: string;

  email?: string;

  firstName?: string | null;

  lastName?: string | null;

  phone?: string | null;

  company?: string | null;

  profileImage?: string | null;

  birthDate?: string | null;
}

export interface IPurgeResponse {
  deleted: boolean;

  message: string;
}

export interface IUserAddressParams extends ICoreParams {
  customerId: string;

  placesId?: string;

  one?: string;

  two?: string;

  city?: string;

  state?: string;

  zip?: string;

  country?: string;

  lat?: number;

  long?: number;

  type: ENUM_ADDRESS_TYPE;

  isDefault?: boolean;
}

export interface IUserPaymentParams extends ICoreParams {
  customerId: string;

  paymentMethodId: string;
}

export interface IUserPaymentAddParams extends IUserPaymentParams {
  isDefault?: boolean;
}

export interface IUserPaymentUpdateParams extends IUserPaymentParams {
  isDefault: boolean;
}
