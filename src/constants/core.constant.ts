import { LIQUID_COMMERCE_ENV } from '../enums';

export const DEFAULT_BASE_URLS = {
  [LIQUID_COMMERCE_ENV.DEV]: 'https://dev.cloud.liquidcommerce.co/api',
  [LIQUID_COMMERCE_ENV.STAGE]: 'https://staging.cloud.liquidcommerce.co/api',
  // [LIQUID_COMMERCE_ENV.PROD]: 'https://cloud.liquidcommerce.co/api',
};