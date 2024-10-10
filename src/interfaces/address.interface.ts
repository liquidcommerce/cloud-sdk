import type { ICoreParams } from '../types';

export interface IAddress {
  id?: string;

  one: string;

  two: string;

  city: string;

  state: string;

  zip: string;

  country?: string;
}

export interface ICoords {
  lat: number;
  long: number;
}

export interface ILoc {
  address?: IAddress;
  coords?: ICoords;
}

export interface ILocBase extends ICoreParams {
  loc?: ILoc;
}

export interface IAddressAutocompleteParams extends ICoreParams {
  input: string;
}

export interface IAddressAutocompleteResult {
  id: string;

  description: string;
}

export interface IAddressDetailsParams extends ICoreParams {
  id: string;
}

export interface IAddressDetailsResult {
  formattedAddress: string;

  coords: ICoords;
}
