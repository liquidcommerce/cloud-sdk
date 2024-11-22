import type { ENUM_ADDRESS_TYPE } from '../enums';
import type { ICoreParams } from '../types';

/**
 * Represents a user session with key and secret used for authentication.
 */
export interface IUserSession {
  key: string | null;

  secret: string | null;

  createdAt: Date;
}

/**
 * Represents the basic structure of a user's address.
 *
 * @interface IUserAddressBase
 *
 * @property {string} placesId - The unique identifier for the place.
 * @property {string} one - The primary street address or neighborhood.
 * @property {string} two - The secondary address information, such as apartment or suite number.
 * @property {string} city - The name of the city.
 * @property {string} state - The name of the state or region.
 * @property {string} zip - The postal code.
 * @property {string} country - The name of the country.
 * @property {number} lat - The latitude coordinate of the address.
 * @property {number} long - The longitude coordinate of the address.
 */
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

/**
 * IUserAddress interface represents a user's address details.
 * It extends the IUserAddressBase interface, adding additional properties for
 * unique identification, timestamps, and default status.
 *
 * @interface IUserAddress
 * @extends {IUserAddressBase}
 *
 * @property {string} id - Unique identifier for the user's address.
 * @property {Date} createdAt - Timestamp indicating when the address was created.
 * @property {Date} updatedAt - Timestamp indicating the last update to the address.
 * @property {boolean} [isDefault] - Optional flag indicating if this is the default address.
 */
export interface IUserAddress extends IUserAddressBase {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  isDefault?: boolean;
}

/**
 * Interface representing a saved card.
 *
 * @interface ISavedCard
 */
export interface ISavedCard {
  brand: string | null;

  country: string | null;

  expMonth: number | null;

  expYear: number | null;

  last4: string | null;

  funding: string | null;
}

/**
 * Represents a user's payment method.
 *
 * @interface IUserPayment
 * @property {string} id - The unique identifier for the payment method.
 * @property {string} type - The type of the payment method (e.g., credit card, PayPal).
 * @property {boolean} isDefault - Indicates whether this payment method is the default one.
 * @property {ISavedCard} [card] - The saved card details if the payment method is a card.
 * @property {Date} createdAt - The date when the payment method was added.
 */
export interface IUserPayment {
  id: string;

  type: string;

  isDefault: boolean;

  card?: ISavedCard;

  createdAt: Date;
}

/**
 * The IUser interface defines the structure for user objects within the application.
 */
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

/**
 * Represents a basic user excluding the session information.
 *
 * This type is useful when user session details are not required
 * or need to be omitted for certain operations, such as basic
 * user management tasks.
 *
 * It extends the IUser interface but removes the 'session' property.
 *
 * Typically used in contexts where minimal user information is
 * sufficient, focusing on non-session related attributes.
 */
export type BaseUser = Omit<IUser, 'session'>;

/**
 * Interface representing the parameters for a user session.
 */
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

/**
 * Interface representing the response from a purge operation.
 */
export interface IPurgeResponse {
  deleted: boolean;

  message: string;
}

/**
 * Interface representing the parameters required for user address operations.
 * Extends the core parameters from ICoreParams.
 */
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

/**
 * Interface representing the parameters required for user payment operations.
 *
 * This interface extends the core parameters interface (`ICoreParams`) and includes
 * specific properties necessary for processing a user payment.
 *
 * Properties:
 * - `customerId`: A string representing the unique identifier of the customer making the payment.
 * - `paymentMethodId`: A string representing the unique identifier of the payment method to be used.
 */
export interface IUserPaymentParams extends ICoreParams {
  customerId: string;

  paymentMethodId: string;
}

/**
 * Interface representing the parameters required to add a user payment.
 *
 * Extends the IUserPaymentParams interface to inherit the basic payment parameters.
 *
 * @property isDefault - Optional boolean indicating if the payment method should be set as default.
 */
export interface IUserPaymentAddParams extends IUserPaymentParams {
  isDefault?: boolean;
}

/**
 *
 * @deprecated - Use IUserPaymentParams
 *
 * @interface IUserPaymentParams
 */
export interface IUserPaymentUpdateParams extends IUserPaymentParams {
  isDefault: boolean;
}
