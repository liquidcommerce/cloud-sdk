import { afterEach, describe, expect, it, vi } from 'vitest';
import { AuthenticatedService } from '../src/core/authenticated.service';
import { CatalogHelperService } from '../src/core/catalog-helper.service';
import { LocationHelperService } from '../src/core/location-helper.service';
import { LIQUID_COMMERCE_ENV } from '../src/enums';
import type { ICatalogParams } from '../src/interfaces';
import { CatalogService } from '../src/services/catalog.service';

const createService = () =>
  new CatalogService(
    new AuthenticatedService({
      apiKey: 'liquid-api-key',
      baseURL: 'https://cloud.example/',
      env: LIQUID_COMMERCE_ENV.PROD,
    }),
    new CatalogHelperService(new LocationHelperService())
  );

const successfulResponse = (body: unknown) =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });

const createFetch = () =>
  vi
    .fn<typeof globalThis.fetch>()
    .mockResolvedValueOnce(
      successfulResponse({
        data: {
          token: 'access-token',
          exp: Date.now() + 60_000,
        },
      })
    )
    .mockResolvedValueOnce(successfulResponse({ products: [] }));

const searchParams = {
  search: 'whiskey',
  page: 1,
  perPage: 20,
} satisfies ICatalogParams;

describe('CatalogService', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('keeps an existing catalog search request byte-identical', async () => {
    const fetch = createFetch();
    vi.stubGlobal('fetch', fetch);

    await createService().search(searchParams);

    expect(fetch).toHaveBeenNthCalledWith(
      2,
      'https://cloud.example/api/catalog/search',
      expect.objectContaining({
        method: 'POST',
        body: '{"search":"whiskey","page":1,"perPage":20}',
      })
    );
  });

  it('omits deliveryFirst when it is false', async () => {
    const fetch = createFetch();
    vi.stubGlobal('fetch', fetch);

    await createService().search({ ...searchParams, deliveryFirst: false });

    expect(fetch).toHaveBeenNthCalledWith(
      2,
      'https://cloud.example/api/catalog/search',
      expect.objectContaining({
        method: 'POST',
        body: '{"search":"whiskey","page":1,"perPage":20}',
      })
    );
  });

  it('serializes deliveryFirst when it is true', async () => {
    const fetch = createFetch();
    vi.stubGlobal('fetch', fetch);

    await createService().search({ ...searchParams, deliveryFirst: true });

    expect(fetch).toHaveBeenNthCalledWith(
      2,
      'https://cloud.example/api/catalog/search',
      expect.objectContaining({
        method: 'POST',
        body: '{"search":"whiskey","page":1,"perPage":20,"deliveryFirst":true}',
      })
    );
  });

	 it.each(['false', 1])('rejects a non-boolean deliveryFirst value (%s)', async (value) => {
	   const fetch = vi.fn<typeof globalThis.fetch>();
	   vi.stubGlobal('fetch', fetch);
	   vi.spyOn(console, 'error').mockImplementation(() => undefined);

	   await expect(
	     createService().search({
	       ...searchParams,
	       deliveryFirst: value as unknown as boolean,
	     })
	   ).rejects.toThrow('deliveryFirst must be a boolean');
	   expect(fetch).not.toHaveBeenCalled();
	 });
});
