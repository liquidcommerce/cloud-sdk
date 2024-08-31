import { LIQUID_COMMERCE_ENV, LiquidCommerce } from './index';

if (typeof window !== 'undefined') {
  // Attach to the global window object if available
  (window as any).LiquidCommerce = LiquidCommerce;
  (window as any).LIQUID_COMMERCE_ENV = LIQUID_COMMERCE_ENV;
}

export { LIQUID_COMMERCE_ENV, LiquidCommerce };
