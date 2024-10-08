import { LIQUID_COMMERCE_ENV } from '../enums/enums';

export const DEFAULT_BASE_URLS = {
  [LIQUID_COMMERCE_ENV.LOC]: process.env.ENV_LOC ?? '',
  [LIQUID_COMMERCE_ENV.DEV]: process.env.ENV_DEV ?? '',
  [LIQUID_COMMERCE_ENV.STAGE]: process.env.ENV_STAGE ?? '',
  [LIQUID_COMMERCE_ENV.PROD]: process.env.ENV_PROD ?? '',
};
