import type { ICoreParams } from '../types';

export interface IAddress{
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
  loc: ILoc;
}