import type { IApiResponseWithData, ILiquidCommerceOrderConfig } from '../types';
import type { IOrder } from './order.interface';

/**
 * Interface representing the LiquidCommerce order client.
 * Provides access to methods related to orders and initialization.
 *
 * @interface
 */
export interface ILiquidCommerceOrderClient {
  /**
   * Initializes the client by authenticating with the LiquidCommerce Order API.
   * Should be called before making any API requests.
   *
   * @return {Promise<void>} - Resolves when the client is successfully initialized.
   * @throws {Error} - Throws an error if initialization fails.
   */
  init(): Promise<void>;

  /**
   * Provides methods for order-related operations.
   *
   * @property {IOrderMethod} order - Object containing methods for order operations.
   */
  order: IOrderMethod;
}

/**
 * Type for the LiquidCommerceOrderClient constructor.
 * Used to define the expected constructor signature.
 *
 * @type {new (onfig: ILiquidCommerceOrderConfig) => ILiquidCommerceOrderClient} ILiquidCommerceOrderClientConstructor
 */
export type ILiquidCommerceOrderClientConstructor = new (
  config: ILiquidCommerceOrderConfig
) => ILiquidCommerceOrderClient;

export interface IOrderMethod {
  /**
   * Retrieves the order details based on the provided order ID.
   *
   * @param {string} identifier - The ID of the order to retrieve.
   * @returns {Promise<IApiResponseWithData<IOrder>>} A promise that resolves to the API response with the order data.
   *
   * @example
   * const orderLiquidCommerce = await OrderLiquidCommerce(apiKey, config);
   *
   * try {
   *   const orderDetails = await orderLiquidCommerce.order.fetch('order_id_123');
   *   console.log('Order details:', orderDetails.data);
   * } catch (error) {
   *   console.error('Failed to retrieve order details:', error);
   * }
   *
   * @throws {Error} Throws an error if the order retrieval request fails or if authentication is unsuccessful.
   *
   * @see {@link IOrder} for the structure of the order data returned.
   */
  fetch: (identifier: string) => Promise<IApiResponseWithData<IOrder>>;
}
