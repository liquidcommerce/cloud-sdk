import { LIQUID_COMMERCE_ENV, LiquidCommerce, OrderLiquidCommerce } from './index';

if (typeof window !== 'undefined') {
  // Attach to the global window object if available
  (window as any).LiquidCommerce = LiquidCommerce;
  (window as any).OrderLiquidCommerce = OrderLiquidCommerce;
  (window as any).LIQUID_COMMERCE_ENV = LIQUID_COMMERCE_ENV;
}

export { LIQUID_COMMERCE_ENV, LiquidCommerce, OrderLiquidCommerce };
