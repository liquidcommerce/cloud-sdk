import type { ENUM_BEER, ENUM_FOOD, ENUM_MERCHANDISE, ENUM_NON_ALCOHOLIC, ENUM_READY_TO_DRINK, ENUM_SPIRITS, ENUM_WINE, LIQUID_COMMERCE_ENV } from './enums';

export interface ICoreParams {
  refresh?: boolean;
}

/*
 *
 * If { refresh: true }, will return a refreshed access token
 *
 * */
export interface IAuthResponse {
  auth?: IAuthResponse;
}

export interface IResponseMetadata {
  languages: string[];
  timestamp: number;
  timezone: string;
  requestId: string;
  path: string;
  version: string;
}

export interface IApiResponseBase extends IAuthResponse {
  statusCode: number;
  message: string;
  metadata: IResponseMetadata;
}

export type IApiResponseWithData<T> = IApiResponseBase & {
  data: T;
};

export type IApiResponseWithoutData<T> = IApiResponseBase & {
  [K in keyof T]: T[K];
};

export type IApiResponse<T> = IApiResponseWithData<T> | IApiResponseWithoutData<T>;

// Type guard to check if the response has a data property
export function isApiResponseWithData<T>(response: IApiResponse<T>): response is IApiResponseWithData<T> {
  return 'data' in response;
}

export interface ILiquidCommerceConfig {
  googlePlacesApiKey: string;

  env: LIQUID_COMMERCE_ENV;

  baseUrl?: {
    stage?: string;
    // prod?: string;
  };
}

export type LiquidTaxonomy = ENUM_BEER | ENUM_FOOD | ENUM_MERCHANDISE | ENUM_NON_ALCOHOLIC | ENUM_READY_TO_DRINK | ENUM_SPIRITS | ENUM_WINE;

export * from './interfaces/index';
