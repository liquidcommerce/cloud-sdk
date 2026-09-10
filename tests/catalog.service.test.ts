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

/** The token handshake every authenticated call makes before its own request. */
const authResponse = () =>
  successfulResponse({ data: { token: 'access-token', exp: Date.now() + 60_000 } });

/**
 * One page of the partner product enumeration. `counts` defaults to a page where
 * nothing was dropped; pass it explicitly to model dropped products.
 */
const productPage = (
  items: Array<{ grouping: string; upc: string }>,
  nextCursor?: string,
  counts?: Record<string, number>
) => ({
  data: {
    items,
    ...(nextCursor === undefined ? {} : { nextCursor }),
    counts: counts ?? {
      inScope: items.length,
      emitted: items.length,
      droppedNoUpc: 0,
      droppedUnresolvable: 0,
    },
  },
});

const createFetch = () =>
  vi
    .fn<typeof globalThis.fetch>()
    .mockResolvedValueOnce(authResponse())
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

  describe('autocomplete', () => {
    const createAutocompleteFetch = () =>
      vi
        .fn<typeof globalThis.fetch>()
        .mockResolvedValueOnce(authResponse())
        .mockResolvedValueOnce(
          successfulResponse({
            statusCode: 200,
            data: [
              { itemType: 'catalog', grouping: 'group-1', name: "Hendrick's Oasium Gin" },
            ],
          })
        );

    it('POSTs the term to catalog/autocomplete, dropping only leading whitespace, and returns the suggestions', async () => {
      const fetch = createAutocompleteFetch();
      vi.stubGlobal('fetch', fetch);

      // The trailing space is kept: the backend reads it as "last token complete".
      const response = await createService().autocomplete({ term: '  hendricks oasi ' });

      expect(fetch).toHaveBeenNthCalledWith(
        2,
        'https://cloud.example/api/catalog/autocomplete',
        expect.objectContaining({
          method: 'POST',
          body: '{"term":"hendricks oasi "}',
        })
      );
      expect(response.data).toEqual([
        { itemType: 'catalog', grouping: 'group-1', name: "Hendrick's Oasium Gin" },
      ]);
    });

    it('serializes an explicit limit', async () => {
      const fetch = createAutocompleteFetch();
      vi.stubGlobal('fetch', fetch);

      await createService().autocomplete({ term: 'veuve', limit: 8 });

      expect(fetch).toHaveBeenNthCalledWith(
        2,
        'https://cloud.example/api/catalog/autocomplete',
        expect.objectContaining({ method: 'POST', body: '{"term":"veuve","limit":8}' })
      );
    });

    it.each(['', '   '])('rejects an empty term (%j) without a request', async (term) => {
      const fetch = vi.fn<typeof globalThis.fetch>();
      vi.stubGlobal('fetch', fetch);
      vi.spyOn(console, 'error').mockImplementation(() => undefined);

      await expect(createService().autocomplete({ term })).rejects.toThrow(
        'term must be a non-empty string'
      );
      expect(fetch).not.toHaveBeenCalled();
    });

    it.each([0, 26, 2.5])('rejects an out-of-range limit (%s) without a request', async (limit) => {
      const fetch = vi.fn<typeof globalThis.fetch>();
      vi.stubGlobal('fetch', fetch);
      vi.spyOn(console, 'error').mockImplementation(() => undefined);

      await expect(createService().autocomplete({ term: 'veuve', limit })).rejects.toThrow(
        'limit must be an integer between 1 and 25'
      );
      expect(fetch).not.toHaveBeenCalled();
    });
  });

  describe('listProducts', () => {
    it('GETs the products route with no query when given no params', async () => {
      const fetch = vi
        .fn<typeof globalThis.fetch>()
        .mockResolvedValueOnce(authResponse())
        .mockResolvedValueOnce(successfulResponse(productPage([])));
      vi.stubGlobal('fetch', fetch);

      await createService().listProducts();

      expect(fetch).toHaveBeenNthCalledWith(
        2,
        'https://cloud.example/api/catalog/products',
        expect.objectContaining({ method: 'GET' })
      );
    });

    it('forwards pageSize and cursor as query parameters', async () => {
      const fetch = vi
        .fn<typeof globalThis.fetch>()
        .mockResolvedValueOnce(authResponse())
        .mockResolvedValueOnce(successfulResponse(productPage([])));
      vi.stubGlobal('fetch', fetch);

      await createService().listProducts({ pageSize: 2000, cursor: 'a b/c' });

      const [url] = fetch.mock.calls[1] as [string, RequestInit];
      expect(url).toBe('https://cloud.example/api/catalog/products?pageSize=2000&cursor=a+b%2Fc');
    });

    it('returns items, nextCursor and counts unchanged', async () => {
      const counts = {
        inScope: 1000,
        emitted: 962,
        droppedNoUpc: 0,
        droppedUnresolvable: 38,
      };
      const fetch = vi
        .fn<typeof globalThis.fetch>()
        .mockResolvedValueOnce(authResponse())
        .mockResolvedValueOnce(
          successfulResponse(
            productPage([{ grouping: '665f1a2b3c4d5e6f7a8b9c0d', upc: '00087229178758' }], 'cur-2', counts)
          )
        );
      vi.stubGlobal('fetch', fetch);

      const response = await createService().listProducts();

      // The zero-padded UPC must survive verbatim: the PDP lookup normalizes on
      // its own side, so re-padding or trimming here breaks it.
      expect(response.data.items).toEqual([
        { grouping: '665f1a2b3c4d5e6f7a8b9c0d', upc: '00087229178758' },
      ]);
      expect(response.data.nextCursor).toBe('cur-2');
      expect(response.data.counts).toEqual(counts);
    });

    it.each([2.5, -0.5])(
      'rejects a non-integer pageSize (%s) without a request',
      async (pageSize) => {
        const fetch = vi.fn<typeof globalThis.fetch>();
        vi.stubGlobal('fetch', fetch);
        vi.spyOn(console, 'error').mockImplementation(() => undefined);

        await expect(createService().listProducts({ pageSize })).rejects.toThrow(
          'pageSize must be an integer'
        );
        expect(fetch).not.toHaveBeenCalled();
      }
    );

    // The platform adjusts every out-of-range integer instead of rejecting it,
    // so the SDK must not be stricter than the endpoint it wraps: an oversized
    // value is capped upstream and a non-positive one falls back to the default.
    it.each([
      [999_999, 'pageSize=999999'],
      [0, 'pageSize=0'],
      [-1, 'pageSize=-1'],
    ])('forwards an out-of-range integer pageSize (%s) for the server to adjust', async (
      pageSize,
      expectedQuery
    ) => {
      const fetch = vi
        .fn<typeof globalThis.fetch>()
        .mockResolvedValueOnce(authResponse())
        .mockResolvedValueOnce(successfulResponse(productPage([])));
      vi.stubGlobal('fetch', fetch);

      await createService().listProducts({ pageSize });

      const [url] = fetch.mock.calls[1] as [string, RequestInit];
      expect(url).toBe(`https://cloud.example/api/catalog/products?${expectedQuery}`);
    });
  });

  describe('iterateProducts', () => {
    const product = (upc: string) => ({ grouping: `g-${upc}`, upc });

    it('walks every page and stops when nextCursor is absent', async () => {
      const fetch = vi
        .fn<typeof globalThis.fetch>()
        .mockResolvedValueOnce(authResponse())
        .mockResolvedValueOnce(successfulResponse(productPage([product('001')], 'cur-2')))
        .mockResolvedValueOnce(successfulResponse(productPage([product('002')])));
      vi.stubGlobal('fetch', fetch);

      const seen = [];
      for await (const item of createService().iterateProducts()) {
        seen.push(item.upc);
      }

      expect(seen).toEqual(['001', '002']);
      const [secondUrl] = fetch.mock.calls[2] as [string, RequestInit];
      expect(secondUrl).toBe('https://cloud.example/api/catalog/products?cursor=cur-2');
    });

    it('does not stop on an empty page that still has a nextCursor', async () => {
      // Products are filtered out after a page is read, so a page can be empty
      // and still have successors. Terminating here would silently truncate the
      // enumeration, and a short sitemap looks just like a working one.
      const fetch = vi
        .fn<typeof globalThis.fetch>()
        .mockResolvedValueOnce(authResponse())
        .mockResolvedValueOnce(successfulResponse(productPage([], 'cur-2')))
        .mockResolvedValueOnce(successfulResponse(productPage([], 'cur-3')))
        .mockResolvedValueOnce(successfulResponse(productPage([product('003')])));
      vi.stubGlobal('fetch', fetch);

      const seen = [];
      for await (const item of createService().iterateProducts()) {
        seen.push(item.upc);
      }

      expect(seen).toEqual(['003']);
      // Auth call plus three pages: the two empty pages did not end the walk.
      expect(fetch).toHaveBeenCalledTimes(4);
    });

    it('forwards pageSize on every page request', async () => {
      const fetch = vi
        .fn<typeof globalThis.fetch>()
        .mockResolvedValueOnce(authResponse())
        .mockResolvedValueOnce(successfulResponse(productPage([product('001')], 'cur-2')))
        .mockResolvedValueOnce(successfulResponse(productPage([product('002')])));
      vi.stubGlobal('fetch', fetch);

      for await (const _ of createService().iterateProducts({ pageSize: 500 })) {
        // drained for its requests
      }

      const [firstUrl] = fetch.mock.calls[1] as [string, RequestInit];
      const [secondUrl] = fetch.mock.calls[2] as [string, RequestInit];
      expect(firstUrl).toBe('https://cloud.example/api/catalog/products?pageSize=500');
      expect(secondUrl).toBe(
        'https://cloud.example/api/catalog/products?pageSize=500&cursor=cur-2'
      );
    });

    it('stops on an empty-string nextCursor instead of re-requesting the first page', async () => {
      // `listProducts` drops an empty cursor from the query, so treating `''` as
      // "keep going" would ask for page 1 forever and re-yield it every time.
      const fetch = vi
        .fn<typeof globalThis.fetch>()
        .mockResolvedValueOnce(authResponse())
        .mockResolvedValue(successfulResponse(productPage([product('001')], '')));
      vi.stubGlobal('fetch', fetch);

      const seen: string[] = [];
      for await (const item of createService().iterateProducts()) {
        seen.push(item.upc);
      }

      expect(seen).toEqual(['001']);
      // Auth call plus exactly one page: the empty cursor ended the walk.
      expect(fetch).toHaveBeenCalledTimes(2);
    });
  });
});
