import type { ENUM_ADDRESS_TYPE } from '../enums';
import type { ICoreParams } from '../types';

export interface IUserSession {
  key: string | null;

  secret: string | null;

  createdAt: Date;
}

export interface IUserAddress {
  id: string;

  one: string;

  two?: string | null;

  city: string;

  state: string;

  zip: string;

  country: string;

  createdAt: Date;

  updatedAt: Date;

  isDefault?: boolean;
}

export interface IUser {
  id: string;

  email: string;

  firstName: string | null;

  lastName: string | null;

  phone: string | null;

  birthDate: string | null;

  createdAt: Date;

  updatedAt: Date;

  addresses: IUserAddress[];

  session: IUserSession;
}

export interface IUserSessionParams extends ICoreParams {
  id?: string;

  email?: string;

  firstName?: string | null;

  lastName?: string | null;

  phone?: string | null;

  birthDate?: string | null;
}

export interface IPurgeResponse {
  deleted: boolean;

  message: string;
}


export interface IUserAddressParams extends ICoreParams {
  customerId: string;

  one: string;

  two?: string | null;

  city: string;

  state: string;

  zip: string;

  isDefault?: boolean;

  type: ENUM_ADDRESS_TYPE;
}