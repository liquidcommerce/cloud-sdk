import { afterEach, expect, expectTypeOf, it, vi } from 'vitest';
import { LiquidCommerce, LIQUID_COMMERCE_ENV } from '../src';
import type { ICatalogMethod, ILiquidCommerceClient } from '../src';

// Distribution builds inject these URLs; source tests use a non-network fixture.
vi.mock('../src/constants/core.constant', () => ({
  DEFAULT_BASE_URLS: { stage: 'https://cloud.example/' },
}));

// Freeze the pre-home-feed method set so new required members fail typechecking.
type LegacyCatalog = Pick<
  ICatalogMethod,
  'availability' | 'search' | 'autocomplete' | 'listProducts' | 'iterateProducts'
>;
type LegacyClient = Omit<ILiquidCommerceClient, 'catalog'> & { catalog: LegacyCatalog };

afterEach(() => vi.unstubAllGlobals());

it('accepts an existing custom catalog implementation without home-feed methods', () => {
  const customCatalog: ICatalogMethod = {
    availability: vi.fn<LegacyCatalog['availability']>(),
    search: vi.fn<LegacyCatalog['search']>(),
    autocomplete: vi.fn<LegacyCatalog['autocomplete']>(),
    listProducts: vi.fn<LegacyCatalog['listProducts']>(),
    iterateProducts: vi.fn<LegacyCatalog['iterateProducts']>(),
  };
  expect(customCatalog.homeFeed).toBeUndefined();
  expect(customCatalog.createLocationContext).toBeUndefined();
  expectTypeOf<LegacyCatalog>().toExtend<ICatalogMethod>();
});

it('preserves full custom-client and factory assignability', () => {
  expectTypeOf<LegacyClient>().toExtend<ILiquidCommerceClient>();
  expectTypeOf<
    (...args: Parameters<typeof LiquidCommerce>) => Promise<LegacyClient>
  >().toExtend<typeof LiquidCommerce>();
});

it('still supplies both opt-in methods on the real SDK client', async () => {
  const feed = { statusCode: 200, rails: [], retailers: [] };
  const context = {
    statusCode: 200,
    locationContext: 'opaque.reference',
    expiresAt: '2026-10-01T00:00:00.000Z',
  };
  const response = (body: unknown) =>
    new Response(JSON.stringify(body), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  const fetch = vi
    .fn<typeof globalThis.fetch>()
    .mockResolvedValueOnce(response({ data: { token: 'access-token', exp: Date.now() + 60_000 } }))
    .mockResolvedValueOnce(response(feed))
    .mockResolvedValueOnce(response(context));
  vi.stubGlobal('fetch', fetch);

  const client = await LiquidCommerce('catalog-compatibility-test', {
    env: LIQUID_COMMERCE_ENV.STAGE,
    googlePlacesApiKey: 'test-google-key',
  });
  if (!client.catalog.homeFeed || !client.catalog.createLocationContext) {
    throw new Error('SDK client is missing home-feed capabilities');
  }
  expect(await client.catalog.homeFeed({ rails: [{ railId: 'a' }] })).toEqual(feed);
  expect(
    await client.catalog.createLocationContext({ loc: { coords: { lat: 40.7, long: -74 } } })
  ).toEqual(context);
  expect(fetch).toHaveBeenCalledTimes(3);
  expect(fetch).toHaveBeenNthCalledWith(
    2,
    'https://cloud.example/api/catalog/home-feed',
    expect.objectContaining({ method: 'POST', body: '{"rails":[{"railId":"a"}]}' })
  );
  expect(fetch).toHaveBeenNthCalledWith(
    3,
    'https://cloud.example/api/catalog/location-context',
    expect.objectContaining({ method: 'POST', body: '{"loc":{"coords":{"lat":40.7,"long":-74}}}' })
  );
});
