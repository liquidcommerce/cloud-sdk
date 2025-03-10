import type { ICoreParams } from '../types';

/**
 * Interface representing an address.
 *
 * This interface can be used to represent any physical address, such as
 * a home or business location.
 *
 * Properties:
 * - id: An optional unique identifier for the address.
 * - one: The first line of the address, often containing street details.
 * - two: The second line of the address, often containing apartment or suite details.
 * - city: The city in which the address is located.
 * - state: The state or region in which the address is located.
 * - zip: The postal or ZIP code associated with the address.
 * - country: An optional field for the country in which the address is located.
 */
export interface IAddress {
  id?: string;

  one: string;

  two: string;

  city: string;

  state: string;

  zip: string;

  country?: string;
}

/**
 * Interface representing geographic coordinates.
 *
 * Properties:
 * - `lat`: Latitude of the geographic location. Range is -90 to 90.
 * - `long`: Longitude of the geographic location. Range is -180 to 180.
 */
export interface ICoords {
  lat: number;
  long: number;
}

/**
 * ILoc interface represents a location that can optionally include an address and coordinates.
 *
 * @typedef {Object} ILoc
 * @property {IAddress} [address] - Optional property representing the physical address of the location.
 * @property {ICoords} [coords] - Optional property representing the geographical coordinates of the location.
 */
export interface ILoc {
  address?: IAddress;
  coords?: ICoords;
}

/**
 * Represents a base interface for location-based data that extends core parameters.
 *
 * @interface
 * @extends {ICoreParams}
 *
 * @property {ILoc} [loc] - Optional location data.
 */
export interface ILocBase extends ICoreParams {
  loc?: ILoc;
}

/**
 * IAddressAutocompleteParams represents the parameters required for the address autocomplete feature.
 * This interface extends the ICoreParams interface.
 *
 * @interface
 * @extends ICoreParams
 *
 * @property {string} input - The user's input string for address lookup.
 */
export interface IAddressAutocompleteParams extends ICoreParams {
  input: string;
}

/**
 * Interface representing the result of an address autocomplete operation.
 *
 * @interface
 * @property {string} id - The unique identifier for the address result.
 * @property {string} description - The descriptive text of the address result.
 */
export interface IAddressAutocompleteResult {
  id: string;

  description: string;
}

/**
 * Interface representing the parameters for address details.
 * This interface extends the ICoreParams interface to include core parameter properties.
 *
 * Extends:
 *  - ICoreParams
 *
 * Properties:
 *  - id: Represents the unique identifier for the address details.
 */
export interface IAddressDetailsParams extends ICoreParams {
  id: string;
}

/**
 * Interface representing the result of address details.
 *
 * @interface IAddressDetailsResult
 *
 * @property {string} formattedAddress - The formatted address as a string.
 * @property {ICoords} coords - The coordinates associated with the address.
 * @property {Omit<IAddress, 'id'>} addressComponents - The address components.
 */
export interface IAddressDetailsResult {
  formattedAddress: string;

  coords: ICoords;

  address: Omit<IAddress, 'id'>;
}
