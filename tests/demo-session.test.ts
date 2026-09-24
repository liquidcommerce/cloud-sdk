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
  it('sends the signed override on authentication, requests, and reauthentication', async () => {
    const fetch = vi.fn().mockImplementation(async () => response({ data: { token: 'access', exp: 0 } }));
    vi.stubGlobal('fetch', fetch);
    const service = new AuthenticatedService({ ...config, demoSessionToken: 'signed-demo' });
    await service.get('/catalog/search');
    await service.get('/catalog/search');
    expect(fetch).toHaveBeenCalledTimes(4);
    for (const [, options] of fetch.mock.calls) expect(options.headers['X-LIQUID-DEMO-SESSION']).toBe('signed-demo');
  });
  it('does not add an override for ordinary clients', async () => {
    const fetch = vi.fn().mockImplementation(async () => response({ data: { token: 'access', exp: Date.now() + 60000 } }));
    vi.stubGlobal('fetch', fetch);
    await new AuthenticatedService(config).get('/catalog/search');
    for (const [, options] of fetch.mock.calls) expect(options.headers).not.toHaveProperty('X-LIQUID-DEMO-SESSION');
  });
  it('isolates downstream services for the same API key in different sessions', () => {
    const manager = SingletonManager.getInstance();
    const normal = manager.getAuthenticatedClient(config);
    const first = manager.getAuthenticatedClient({ ...config, demoSessionToken: 'first' });
    const second = manager.getAuthenticatedClient({ ...config, demoSessionToken: 'second' });
    expect(manager.getCartService(first)).not.toBe(manager.getCartService(normal));
    expect(manager.getCartService(first)).not.toBe(manager.getCartService(second));
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
    await LiquidCommerce('preflight-key', { googlePlacesApiKey: '', env: LIQUID_COMMERCE_ENV.STAGE, demoSessionToken: 'preflight-session' });
    expect(fetch.mock.calls[1][0]).toContain('/cart/demo-session');
  });
  it('rejects a backend that does not confirm the override', async () => {
    const fetch = vi.fn().mockImplementation(async () => response({ data: { token: 'access', exp: Date.now() + 60000 } }));
    vi.stubGlobal('fetch', fetch);
    await expect(LiquidCommerce('old-backend-key', { googlePlacesApiKey: '', env: LIQUID_COMMERCE_ENV.STAGE, demoSessionToken: 'old-backend-session' })).rejects.toThrow('did not confirm');
  });
});
