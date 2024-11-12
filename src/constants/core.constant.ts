import { LIQUID_COMMERCE_ENV } from '../enums';

/**
 * A dictionary object containing the default base URLs for different Liquid Commerce environments.
 *
 * The keys are environment constants defined in the `LIQUID_COMMERCE_ENV` object,
 * such as `LOC`, `DEV`, `STAGE`, and `PROD`.
 * The values are URLs read from the respective environment variables: `ENV_LOC`, `ENV_DEV`, `ENV_STAGE`, and `ENV_PROD`.
 * If the environment variables are not set, the values default to an empty string.
 */
export const DEFAULT_BASE_URLS = {
  [LIQUID_COMMERCE_ENV.LOC]: process.env.ENV_LOC ?? '',
  [LIQUID_COMMERCE_ENV.DEV]: process.env.ENV_DEV ?? '',
  [LIQUID_COMMERCE_ENV.STAGE]: process.env.ENV_STAGE ?? '',
  [LIQUID_COMMERCE_ENV.PROD]: process.env.ENV_PROD ?? '',
};
