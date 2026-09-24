# Authorized Cloud SDK demo sessions

Pass an optional `demoSessionToken` to `LiquidCommerce(apiKey, config)`. Obtain it from the authenticated Platform Services demo-session endpoint; do not manufacture a boolean override. The SDK sends it on authentication and every Cloud request. Initialization verifies Cloud readiness at `GET /api/cart/demo-session`, including the partner AccelPay brand mapping. Failed validation rejects initialization.

Clients and downstream service caches are isolated by the complete token. Renew with Platform Services before expiry, retaining session identity, and construct a client with the renewed token. Never retry an expired demo request without its token. New demo sessions require new carts and payment sessions.

Omitting the option preserves normal configuration behavior. Deploy Cloud support before using this option. This selects the real checkout engine and does not simulate orders or payments.

The prepare script builds distributable files when installing this SDK from a pinned Git commit, allowing coordinated consumers to validate an unreleased SDK. Prefer the corresponding published version once released.
