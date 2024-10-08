import { CART_PARAM_ERROR_ENUM } from '../enums';
import type { ICartUpdateItem, ICartUpdateParams } from '../interfaces';
import type { LocationHelperService } from './location-helper.service';

/**
 * CartHelperService is a class that provides methods
 * for validating and normalizing parameters for updating a cart.
 */
export class CartHelperService {
  constructor(private locationHelperService: LocationHelperService) {}

  /**
   * Validates and normalizes the parameters for updating a cart.
   *
   * @param {ICartUpdateParams} params - The parameters for updating a cart.
   * @return {ICartUpdateParams} - The validated and normalized parameters.
   */
  public validateAndNormalizeParams(params: ICartUpdateParams): ICartUpdateParams {
    const normalizedParams = { ...params };

    normalizedParams.id = this.validateId(normalizedParams.id);
    normalizedParams.items = this.validateAndNormalizeItems(normalizedParams.items);
    this.locationHelperService.validateAndNormalizeLocation(normalizedParams.loc);
    normalizedParams.refresh = Boolean(normalizedParams.refresh);

    return normalizedParams;
  }

  /**
   * Validates an ID.
   *
   * @param {string} id - The ID to be validated.
   * @return {string} - The validated ID.
   */
  public validateId(id?: string): string {
    if (!id || typeof id !== 'string' || id.trim().length === 0) {
      return '';
    }

    return id.trim();
  }

  /**
   * Validates and normalizes an array of cart update items.
   *
   * @param {ICartUpdateItem[]} items - The array of cart update items to be validated and normalized.
   * @throws {Error} CART_PARAM_ERROR_ENUM.INVALID_ITEMS_TYPE - If the items parameter is not an array or is empty.
   * @throws {Error} CART_PARAM_ERROR_ENUM.INVALID_ITEMS_MAX - If the items parameter has more than 25 items.
   * @return {ICartUpdateItem[]} - The validated and normalized array of cart update items.
   */
  private validateAndNormalizeItems(items: ICartUpdateItem[]): ICartUpdateItem[] {
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error(CART_PARAM_ERROR_ENUM.INVALID_ITEMS_TYPE);
    }

    if (items.length > 25) {
      throw new Error(CART_PARAM_ERROR_ENUM.INVALID_ITEMS_MAX);
    }

    return items.map((item) => this.validateAndNormalizeItem(item));
  }

  /**
   * Validates and normalizes an item in the cart.
   *
   * @param item - The item to be validated and normalized.
   * @throws {Error} - If the part number or fulfillment ID is invalid.
   * @returns The validated and normalized item.
   */
  private validateAndNormalizeItem(item: ICartUpdateItem): ICartUpdateItem {
    const normalizedItem = { ...item };

    if (!this.validatePartNumber(normalizedItem.partNumber)) {
      throw new Error(CART_PARAM_ERROR_ENUM.INVALID_PART_NUMBER);
    }

    if (
      !normalizedItem.fulfillmentId ||
      typeof normalizedItem.fulfillmentId !== 'string' ||
      normalizedItem.fulfillmentId.trim().length === 0
    ) {
      throw new Error(CART_PARAM_ERROR_ENUM.INVALID_FULFILLMENT_ID);
    }

    normalizedItem.quantity = Math.max(0, Math.floor(normalizedItem.quantity));

    if (normalizedItem.engravingLines) {
      normalizedItem.engravingLines = normalizedItem.engravingLines
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
    }

    return normalizedItem;
  }

  /**
   * Validates a given part number.
   *
   * @param {string} partNumber - The part number to be validated.
   * @return {boolean} - Returns true if the part number is valid, false otherwise.
   */
  private validatePartNumber(partNumber: string): boolean {
    if (!partNumber || typeof partNumber !== 'string') {
      return false;
    }

    const parts = partNumber.split('_');
    return parts.length === 2 && parts[0].length === 14 && parts[1].length > 0;
  }
}
