import { STATES_CODE, STATES_NAME } from '../enums';
import type { ILoc } from '../interfaces';

/**
 * The LocationHelperService class provides methods to validate and normalize location objects.
 */
export class LocationHelperService {
  /**
   * Validates and normalizes a location object.
   * @param {ILoc} loc - The location object to validate and normalize.
   * @throws {Error} - If the loc argument is not a valid object or if
   * it doesn't contain either coords or address.
   */
  validateAndNormalizeLocation(loc?: ILoc): void {
    if (!loc) {
      return;
    }

    if (typeof loc !== 'object') {
      throw new Error('Location must be a valid object');
    }

    const { coords, address } = loc;

    if (coords) {
      this.validateCoordinates(coords);
    } else if (address) {
      this.validateAndNormalizeAddress(address);
    }
  }

  /**
   * Validates coordinates to ensure they are within valid range.
   *
   * @param coords - The object containing the latitude and longitude values to be validated.
   * @param coords.lat - The latitude value to be validated.
   * @param coords.long - The longitude value to be validated.
   *
   * @throws {Error} - Throws an error if the coordinates are not valid numbers or are out of range.
   *
   * @return {void}
   */
  private validateCoordinates(coords: { lat: number; long: number }): void {
    if (typeof coords.lat !== 'number' || typeof coords.long !== 'number') {
      throw new Error('Coordinates must be valid numbers');
    }

    if (coords.lat < -90 || coords.lat > 90 || coords.long < -180 || coords.long > 180) {
      throw new Error('Coordinates are out of valid range');
    }
  }

  /**
   * Validates and normalizes an address object.
   *
   * @param {any} address - The address object to validate and normalize.
   *
   * @throws {Error} If the state is missing or not a string.
   * @throws {Error} If the city is missing or not a string.
   * @throws {Error} If the ZIP code is missing or not a string.
   *
   * @return {void}
   */
  private validateAndNormalizeAddress(address: any): void {
    if (!address?.state || typeof address?.state !== 'string') {
      throw new Error('State is required and must be a string');
    }

    address.state = this.normalizeState(address.state);

    // Validate other address fields as necessary
    if (!address.city || typeof address.city !== 'string') {
      throw new Error('City is required and must be a string');
    }

    if (!address.zip || typeof address.zip !== 'string') {
      throw new Error('ZIP code is required and must be a string');
    }
  }

  /**
   * Normalize the state value to its corresponding code or name.
   * The state can be either a state code or state name.
   *
   * @param {STATES_CODE | STATES_NAME} state - The state value to normalize.
   * @return {string} - The normalized state value, which is the corresponding code or name.
   *
   * @throws {Error} - If the state value is invalid.
   */
  normalizeState(state: STATES_CODE | STATES_NAME): string {
    const upperState = state.toUpperCase() as keyof typeof STATES_CODE;
    if (STATES_CODE[upperState]) {
      return STATES_CODE[upperState];
    }

    const stateName = state.toUpperCase() as keyof typeof STATES_NAME;
    if (STATES_NAME[stateName]) {
      return STATES_NAME[stateName];
    }

    throw new Error(`Invalid state: ${state}`);
  }
}
