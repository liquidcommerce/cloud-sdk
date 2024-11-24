import {
  ENUM_AVAILABILITY_VALUE,
  ENUM_BEER,
  ENUM_BINARY_FILTER,
  ENUM_FILTER_KEYS,
  ENUM_FOOD,
  ENUM_MERCHANDISE,
  ENUM_MISCELLANEOUS,
  ENUM_MODALITIES,
  ENUM_NAVIGATION_ORDER_DIRECTION_TYPE,
  ENUM_NON_ALCOHOLIC,
  ENUM_ORDER_BY,
  ENUM_READY_TO_DRINK,
  ENUM_SPIRITS,
  ENUM_WINE,
} from '../enums';
import type { IAvailabilityParams, ICatalogParams } from '../interfaces';
import type { LiquidTaxonomy } from '../types';
import type { LocationHelperService } from './location-helper.service';

/**
 * The `CatalogHelperService` class provides utility methods for validating and normalizing
 * input parameters for availability and catalog search.
 */
export class CatalogHelperService {
  private readonly taxonomyValues: Set<LiquidTaxonomy>;

  constructor(private locationServiceHelper: LocationHelperService) {
    this.taxonomyValues = new Set([
      ...Object.values(ENUM_BEER),
      ...Object.values(ENUM_FOOD),
      ...Object.values(ENUM_MERCHANDISE),
      ...Object.values(ENUM_NON_ALCOHOLIC),
      ...Object.values(ENUM_READY_TO_DRINK),
      ...Object.values(ENUM_SPIRITS),
      ...Object.values(ENUM_WINE),
      ...Object.values(ENUM_MISCELLANEOUS),
    ]);
  }

  /**
   * Validates and normalizes the input parameters for availability.
   *
   * @param {IAvailabilityParams} params - The availability parameters to be validated and normalized.
   * @returns {IAvailabilityParams} - The validated and normalized availability parameters.
   */
  public validateAndNormalizeParams(params: IAvailabilityParams): IAvailabilityParams {
    const normalizedParams = { ...params };

    const upcs = normalizedParams?.upcs ?? [];
    const grouping = normalizedParams?.grouping ?? [];
    const ids = normalizedParams?.ids ?? [];

    if ([upcs, grouping, ids].every((each) => this.validateIdsExist(each))) {
      throw new Error('Product identifiers must be a non-empty array of strings');
    }

    if (upcs.length > 0) {
      this.validateIds(normalizedParams?.upcs ?? []);

      normalizedParams.upcs = upcs;
    }

    if (grouping.length > 0) {
      this.validateIds(normalizedParams?.grouping ?? []);

      normalizedParams.grouping = grouping;
    }

    if (ids.length > 0) {
      this.validateIds(normalizedParams?.ids ?? []);

      normalizedParams.ids = ids;
    }

    this.validateIds(
      normalizedParams?.upcs ?? normalizedParams?.grouping ?? normalizedParams?.ids ?? []
    );
    this.locationServiceHelper.validateAndNormalizeLocation(normalizedParams.loc);

    return normalizedParams;
  }

  /**
   * Validates and normalizes the search parameters for catalog search.
   *
   * @param {ICatalogParams} params - The search parameters to be validated and normalized.
   * @returns {ICatalogParams} - The validated and normalized search parameters.
   */
  public validateAndNormalizeSearchParams(
    params: ICatalogParams
  ): ICatalogParams & { error?: string } {
    const errors: string[] = [];
    const normalizedParams = { ...params };

    this.validateOrderBy(normalizedParams.orderBy, errors);
    this.validateOrderDirection(normalizedParams.orderDirection, errors);
    this.validateFilters(normalizedParams.filters, errors);
    this.validatePagination(normalizedParams.page, normalizedParams.perPage, errors);
    this.locationServiceHelper.validateAndNormalizeLocation(normalizedParams.loc);

    if (errors.length > 0) {
      return {
        ...normalizedParams,
        error: errors.join('. '),
      };
    }

    return normalizedParams;
  }

  /**
   * Validates an array of UPCs.
   *
   * @param {string[]} ids - The array of ids to validate.
   * @throws {Error} If upcs is not an array or is an empty array.
   * @throws {Error} If any UPC in the array is not a non-empty string.
   */
  private validateIds(ids: string[]): void {
    if (!ids.every((id) => typeof id === 'string' && id.trim().length > 0)) {
      throw new Error('All product identifiers must be non-empty strings');
    }
  }

  /**
   *
   */
  private validateIdsExist(ids: string[]): boolean {
    return !Array.isArray(ids) || ids.length === 0;
  }

  /**
   * Validates the orderBy parameter and adds any validation errors to the errors array.
   *
   * @param orderBy - The orderBy value to validate.
   * @param errors - The array to store any validation errors.
   *
   * @return void
   */
  private validateOrderBy(orderBy: ENUM_ORDER_BY | undefined, errors: string[]): void {
    if (orderBy && !Object.values(ENUM_ORDER_BY).includes(orderBy)) {
      errors.push(`Invalid orderBy value: ${orderBy}`);
    }
  }

  /**
   * Validates the order direction.
   *
   * @param {ENUM_NAVIGATION_ORDER_DIRECTION_TYPE | undefined} orderDirection - The order direction to be validated.
   * @param {string[]} errors - An array to store error messages.
   *
   * @return {void} This method does not return any value.
   */
  private validateOrderDirection(
    orderDirection: ENUM_NAVIGATION_ORDER_DIRECTION_TYPE | undefined,
    errors: string[]
  ): void {
    if (
      orderDirection &&
      !Object.values(ENUM_NAVIGATION_ORDER_DIRECTION_TYPE).includes(orderDirection)
    ) {
      errors.push(`Invalid orderDirection value: ${orderDirection}`);
    }
  }

  /**
   * Validates the filters for the catalog.
   *
   * @param filters - The filters to be validated.
   * @param errors - An array to store any validation errors.
   * @returns void
   */
  private validateFilters(filters: ICatalogParams['filters'] | undefined, errors: string[]): void {
    if (!filters) return;

    if (filters.length > 10) {
      errors.push('Maximum of 10 filters allowed');
    }

    filters.forEach((filter) => {
      if (!Object.values(ENUM_FILTER_KEYS).includes(filter.key as ENUM_FILTER_KEYS)) {
        errors.push(`Invalid filter key: ${filter.key}`);
      }

      switch (filter.key) {
        case ENUM_FILTER_KEYS.AVAILABILITY:
          this.validateAvailabilityFilter(filter.values as ENUM_AVAILABILITY_VALUE, errors);
          break;
        case ENUM_FILTER_KEYS.FULFILLMENT:
          this.validateFulfillmentFilter(filter.values as ENUM_MODALITIES[], errors);
          break;
        case ENUM_FILTER_KEYS.ENGRAVING:
          this.validateBinaryFilter(filter.values as ENUM_BINARY_FILTER, errors);
          break;
        case ENUM_FILTER_KEYS.PRESALE:
          this.validateBinaryFilter(filter.values as ENUM_BINARY_FILTER, errors);
          break;
        case ENUM_FILTER_KEYS.CATEGORIES:
          this.validateCategoriesFilter(filter.values as LiquidTaxonomy[], errors);
          break;
        case ENUM_FILTER_KEYS.BRANDS:
          this.validateArrayFilter(filter.values, 75, 'brands', errors);
          break;
        case ENUM_FILTER_KEYS.FLAVOR:
          this.validateArrayFilter(filter.values, 25, 'flavor', errors);
          break;
        case ENUM_FILTER_KEYS.REGION:
          this.validateArrayFilter(filter.values, 25, 'region', errors);
          break;
        case ENUM_FILTER_KEYS.VARIETY:
          this.validateArrayFilter(filter.values, 25, 'variety', errors);
          break;
        case ENUM_FILTER_KEYS.SIZES:
          this.validateArrayFilter(filter.values, 25, 'sizes', errors);
          break;
        case ENUM_FILTER_KEYS.APPELLATION:
          this.validateArrayFilter(filter.values, 25, 'appellation', errors);
          break;
        case ENUM_FILTER_KEYS.COUNTRY:
          this.validateArrayFilter(filter.values, 25, 'country', errors);
          break;
        case ENUM_FILTER_KEYS.VINTAGE:
          this.validateArrayFilter(filter.values, 25, 'vintage', errors);
          break;
        case ENUM_FILTER_KEYS.MATERIALS:
          this.validateArrayFilter(filter.values, 25, 'materials', errors);
          break;
        case ENUM_FILTER_KEYS.COLORS:
          this.validateArrayFilter(filter.values, 25, 'colors', errors);
          break;
        case ENUM_FILTER_KEYS.TAGS:
          this.validateArrayFilter(filter.values, 25, 'tags', errors);
          break;
        // Add more cases for other filter types as needed
      }
    });
  }

  /**
   * Validates the availability filter value.
   *
   * @param {ENUM_AVAILABILITY_VALUE} value - The value to be validated.
   * @param {string[]} errors - The array to store any validation errors.
   *
   * @return {void}
   */
  private validateAvailabilityFilter(value: ENUM_AVAILABILITY_VALUE, errors: string[]): void {
    if (!Object.values(ENUM_AVAILABILITY_VALUE).includes(value)) {
      errors.push(`Invalid availability value: ${value}`);
    }
  }

  /**
   * Validates the provided fulfillment filter against the ENUM_MODALITIES.
   * If the value does not match any value in ENUM_MODALITIES, an error message is appended to the errors array.
   *
   * @param {ENUM_MODALITIES[]} values - The value to be validated against the ENUM_MODALITIES.
   * @param {string[]} errors - The array where error messages will be stored if the validation fails.
   * @return {void} This method does not return a value.
   */
  private validateFulfillmentFilter(values: ENUM_MODALITIES[], errors: string[]): void {
    if (!Array.isArray(values)) {
      errors.push(`Fulfillment filter must be an array`);
      return;
    }

    const validModalities = Object.values(ENUM_MODALITIES);

    values.forEach((value) => {
      if (!validModalities.includes(value)) {
        errors.push(`Invalid fulfillment value: ${value}`);
      }
    });
  }

  /**
   * Validates the given binary filter value against the ENUM_BINARY_FILTER.
   * If the value is not valid, it adds an appropriate error message to the errors array.
   *
   * @param {ENUM_BINARY_FILTER} value - The binary filter value to validate.
   * @param {string[]} errors - The array to push error messages into if validation fails.
   * @return {void}
   */
  private validateBinaryFilter(value: ENUM_BINARY_FILTER, errors: string[]): void {
    if (!Object.values(ENUM_BINARY_FILTER).includes(value)) {
      errors.push(`Invalid availability value: ${value}`);
    }
  }

  /**
   * Validates the given array filter.
   *
   * @param values - The array to be validated.
   * @param maxLength - The maximum number of values allowed in the array filter.
   * @param filterName - The name of the filter being validated.
   * @param errors - An array to store any validation errors.
   *
   * @return - This method does not return anything.
   *
   * @remarks
   * This method checks if the given values parameter is an array. If it is not, an error message is added
   * to the errors array indicating that the filter must be an array.
   *
   * If the array has a length that exceeds the maxLength parameter, an error message is added to the errors
   * array indicating that the filter can have a maximum of maxLength values.
   */
  private validateArrayFilter(
    values: any,
    maxLength: number,
    filterName: string,
    errors: string[]
  ): void {
    if (!Array.isArray(values)) {
      errors.push(`${filterName} filter must be an array`);
    } else if (values.length > maxLength) {
      errors.push(`${filterName} filter can have a maximum of ${maxLength} values`);
    }
  }

  /**
   * Validates the categories filter values.
   *
   * @param {LiquidTaxonomy[]} values - The array of category values to validate.
   * @param {string[]} errors - An array to store any validation errors.
   *
   * @return {void} - This method does not return a value.
   */
  private validateCategoriesFilter(values: LiquidTaxonomy[], errors: string[]): void {
    if (!Array.isArray(values)) {
      errors.push('Categories filter must be an array');
    } else if (!values.every((value) => this.taxonomyValues.has(value))) {
      errors.push('Invalid category value(s) in categories filter');
    }
  }

  /**
   * Validates the pagination options.
   *
   * @param {number | undefined} page - The current page number.
   * @param {number | undefined} perPage - The number of items per page.
   * @param {string[]} errors - An array to store any validation errors.
   *
   * @return {void}
   *
   * @description
   * This method validates the provided pagination options and adds any validation errors to the `errors` array.
   * The `page` argument must be a non-negative number, and the `perPage` argument must be a positive number.
   * If either argument fails validation, an error message is pushed to the `errors` array.
   */
  private validatePagination(
    page: number | undefined,
    perPage: number | undefined,
    errors: string[]
  ): void {
    if (page !== undefined && (typeof page !== 'number' || page < 0)) {
      errors.push('Page must be a non-negative number');
    }

    if (perPage !== undefined && (typeof perPage !== 'number' || perPage <= 0)) {
      errors.push('PerPage must be a positive number');
    }
  }
}
