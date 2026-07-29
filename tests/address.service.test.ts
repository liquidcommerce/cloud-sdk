import { afterEach, describe, expect, it, vi } from 'vitest';
import { AuthenticatedService } from '../src/core/authenticated.service';
import { LIQUID_COMMERCE_ENV } from '../src/enums';
import { AddressService } from '../src/services/address.service';

const createClient = () =>
  new AuthenticatedService({
    apiKey: 'liquid-api-key',
    baseURL: 'https://cloud.example/',
    env: LIQUID_COMMERCE_ENV.PROD,
  });

const successfulResponse = (body: unknown) =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });

describe('AddressService', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('forwards the Places session token in autocomplete requests', async () => {
    const fetch = vi
      .fn<typeof globalThis.fetch>()
      .mockResolvedValueOnce(
        successfulResponse({
          data: {
            token: 'access-token',
            exp: Date.now() + 60_000,
          },
        })
      )
      .mockResolvedValueOnce(successfulResponse({ data: [] }));
    vi.stubGlobal('fetch', fetch);
    const service = new AddressService(createClient());

    await service.autocomplete(
      {
        input: '123 Main',
        sessionToken: 'places-session-token',
      },
      'google-places-api-key'
    );

    expect(fetch).toHaveBeenNthCalledWith(
      2,
      'https://cloud.example/api/address/autocomplete',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          input: '123 Main',
          sessionToken: 'places-session-token',
          key: 'google-places-api-key',
        }),
      })
    );
  });

  it('forwards the Places session token in details requests', async () => {
    const fetch = vi
      .fn<typeof globalThis.fetch>()
      .mockResolvedValueOnce(
        successfulResponse({
          data: {
            token: 'access-token',
            exp: Date.now() + 60_000,
          },
        })
      )
      .mockResolvedValueOnce(successfulResponse({ data: {} }));
    vi.stubGlobal('fetch', fetch);
    const service = new AddressService(createClient());

    await service.details(
      {
        id: 'google-place-id',
        sessionToken: 'places-session-token',
      },
      'google-places-api-key'
    );

    expect(fetch).toHaveBeenNthCalledWith(
      2,
      'https://cloud.example/api/address/details',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          id: 'google-place-id',
          sessionToken: 'places-session-token',
          key: 'google-places-api-key',
        }),
      })
    );
  });
});
