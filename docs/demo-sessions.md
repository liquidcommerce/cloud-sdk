# Authorized AccelPay demo

```ts
const client = await LiquidCommerce(apiKey, {
  env: LIQUID_COMMERCE_ENV.STAGE,
  googlePlacesApiKey: "...",
  accelpayDemo: {
    partnerAppToken: existingPartnerAppToken,
    cartScopeId: crypto.randomUUID(),
  },
});
```

Omit accelpayDemo for ordinary partner behavior. The demo option sends the existing app credential and cart scope on authentication, refresh and every SDK request. Cloud validates current app authorization with Platform Services. Client initialization checks Cloud readiness and the existing AccelPay mapping. Errors never retry without the override.

Use a fresh cart scope when switching modes and clear prior cart/shopper/payment state. Recreate the client with the latest app credential after normal app authentication refresh, keeping cartScopeId for the same cart. Cache identity includes both credential and scope. The SDK does not issue or renew a separate demo credential.

Deploy backend support first. The partner app can pin this exact Git commit before npm publication. Git installs run prepare to build bundles using the canonical public environment URLs, with explicit ENV_* build values retaining precedence.
