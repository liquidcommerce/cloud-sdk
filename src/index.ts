import { LIQUID_COMMERCE_ENV, LiquidCommerce, LiquidCommerceClient } from './liquid-commerce-client';

export { LIQUID_COMMERCE_ENV, LiquidCommerce, LiquidCommerceClient };
export * from './liquid-commerce-client';

// Inject the SDK into the window object if in a browser environment
if (typeof window !== 'undefined') {
  (window as any).LiquidCommerce = LiquidCommerce;
  (window as any).LiquidCommerceClient = LiquidCommerceClient;
  (window as any).LIQUID_COMMERCE_ENV = LIQUID_COMMERCE_ENV;
}

// Export as default for ES modules
export default LiquidCommerce;

// For CommonJS compatibility
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Object.assign(LiquidCommerce, {
    LiquidCommerce,
    LiquidCommerceClient,
    LIQUID_COMMERCE_ENV,
  });
}