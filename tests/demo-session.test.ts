vi.hoisted(() => { process.env.ENV_STAGE = 'https://cloud.example/'; });
import { afterEach, describe, expect, it, vi } from 'vitest';
import { LiquidCommerce } from '../src/liquid-commerce-client';
import { AuthenticatedService } from '../src/core/authenticated.service';
import { SingletonManager } from '../src/core/singleton.service';
import { LIQUID_COMMERCE_ENV } from '../src/enums';
const config = { apiKey: 'demo-api-key', baseURL: 'https://cloud.example/', env: LIQUID_COMMERCE_ENV.STAGE };
const response = (data: unknown) => new Response(JSON.stringify(data), { status: 200 });

describe('demo session transport', () => {
  afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });
  it('sends the existing app token and cart scope on authentication, requests, and reauthentication', async () => {
    const fetch = vi.fn().mockImplementation(async () => response({ data: { token: 'access', exp: 0 } }));
    vi.stubGlobal('fetch', fetch);
    const service = new AuthenticatedService({ ...config, accelpayDemo: { partnerAppToken: 'signed-demo', cartScopeId: '76ec082e-8c75-4c18-ae80-66e2d887c8a9' } });
    await service.get('/catalog/search');
    await service.get('/catalog/search');
    expect(fetch).toHaveBeenCalledTimes(4);
    for (const [, options] of fetch.mock.calls) { expect(options.headers['X-LIQUID-PARTNER-APP-TOKEN']).toBe('signed-demo'); expect(options.headers['X-LIQUID-DEMO-CART-ID']).toBe('76ec082e-8c75-4c18-ae80-66e2d887c8a9'); }
  });
  it('does not add an override for ordinary clients', async () => {
    const fetch = vi.fn().mockImplementation(async () => response({ data: { token: 'access', exp: Date.now() + 60000 } }));
    vi.stubGlobal('fetch', fetch);
    await new AuthenticatedService(config).get('/catalog/search');
    for (const [, options] of fetch.mock.calls) expect(options.headers).not.toHaveProperty('X-LIQUID-PARTNER-APP-TOKEN');
  });
  it('isolates downstream services for the same API key in different sessions', () => {
    const manager = SingletonManager.getInstance();
    const normal = manager.getAuthenticatedClient(config);
    const first = manager.getAuthenticatedClient({ ...config, accelpayDemo: { partnerAppToken: 'first', cartScopeId: '76ec082e-8c75-4c18-ae80-66e2d887c8a9' } });
    const second = manager.getAuthenticatedClient({ ...config, accelpayDemo: { partnerAppToken: 'first', cartScopeId: '86ec082e-8c75-4c18-ae80-66e2d887c8a9' } });
    expect(manager.getCartService(first)).not.toBe(manager.getCartService(normal));
    expect(manager.getCartService(first)).not.toBe(manager.getCartService(second));
    const refreshed = manager.getAuthenticatedClient({ ...config, accelpayDemo: { partnerAppToken: 'refreshed', cartScopeId: '76ec082e-8c75-4c18-ae80-66e2d887c8a9' } });
    expect(manager.getCartService(first)).not.toBe(manager.getCartService(refreshed));
    expect(manager.getCartService(first)).toBe(manager.getCartService(first));
  });
});


describe('demo initialization preflight', () => {
  afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });
  it('checks Cloud readiness before returning the demo client', async () => {
    const fetch = vi.fn().mockImplementation(async (url: string) => response(url.endsWith('/authentication')
      ? { data: { token: 'access', exp: Date.now() + 60000 } }
      : { data: { engine: 'accelpay', sessionId: 'session' } }));
    vi.stubGlobal('fetch', fetch);
    await LiquidCommerce('preflight-key', { googlePlacesApiKey: '', env: LIQUID_COMMERCE_ENV.STAGE, accelpayDemo: { partnerAppToken: 'preflight-session', cartScopeId: '76ec082e-8c75-4c18-ae80-66e2d887c8a9' } });
    expect(fetch.mock.calls[1][0]).toContain('/cart/demo-session');
  });
  it('rejects a backend that does not confirm the override', async () => {
    const fetch = vi.fn().mockImplementation(async () => response({ data: { token: 'access', exp: Date.now() + 60000 } }));
    vi.stubGlobal('fetch', fetch);
    await expect(LiquidCommerce('old-backend-key', { googlePlacesApiKey: '', env: LIQUID_COMMERCE_ENV.STAGE, accelpayDemo: { partnerAppToken: 'old-backend-session', cartScopeId: '76ec082e-8c75-4c18-ae80-66e2d887c8a9' } })).rejects.toThrow('did not confirm');
  });
});
