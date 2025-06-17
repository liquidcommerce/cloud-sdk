import {
  LIQUID_COMMERCE_ENV,
  LiquidCommerce,
  LiquidCommerceOrders,
  LiquidCommercePaymentElement,
} from './index';

if (typeof window !== 'undefined') {
  // Attach to the global window object if available
  (window as any).LiquidCommerce = LiquidCommerce;
  (window as any).LiquidCommerceOrders = LiquidCommerceOrders;
  (window as any).LiquidCommercePaymentElement = LiquidCommercePaymentElement;
  (window as any).LIQUID_COMMERCE_ENV = LIQUID_COMMERCE_ENV;
}

export { LIQUID_COMMERCE_ENV, LiquidCommerce, LiquidCommerceOrders, LiquidCommercePaymentElement };
