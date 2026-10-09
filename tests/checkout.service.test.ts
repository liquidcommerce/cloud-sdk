import { afterEach, describe, expect, it, vi } from 'vitest';
import { AuthenticatedService } from '../src/core/authenticated.service';
import { CheckoutHelperService } from '../src/core/checkout-helper.service';
import { LocationHelperService } from '../src/core/location-helper.service';
import {
  ENUM_CHECKOUT_DELIVERY_ERROR_CODE,
  ENUM_CHECKOUT_STATUS_CODE_ERROR,
  ENUM_CHECKOUT_STATUS_CODE_MESSAGE,
  LIQUID_COMMERCE_ENV,
} from '../src/enums';
import type { ICheckoutPrepareParams } from '../src/interfaces';
import { CheckoutService } from '../src/services/checkout.service';

const createService = () =>
  new CheckoutService(
    new AuthenticatedService({
      apiKey: 'liquid-api-key',
      baseURL: 'https://cloud.example/',
      env: LIQUID_COMMERCE_ENV.PROD,
    }),
    new CheckoutHelperService(new LocationHelperService())
  );

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

const authResponse = () =>
  jsonResponse({ data: { token: 'access-token', exp: Date.now() + 60_000 } });

const stubFetch = (response: Response) => {
  const fetch = vi
    .fn<typeof globalThis.fetch>()
    .mockResolvedValueOnce(authResponse())
    .mockResolvedValueOnce(response);
  vi.stubGlobal('fetch', fetch);
  return fetch;
};

const sentBody = (fetch: ReturnType<typeof stubFetch>) =>
  JSON.parse(String(fetch.mock.calls[1]?.[1]?.body));

describe('CheckoutService delivery scheduling', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('sends deliverySelections and deliverySlotsFulfillmentId to prepare unchanged', async () => {
    const fetch = stubFetch(jsonResponse({ data: {} }));

    await createService().prepare({
      cartId: 'cart-1',
      deliverySlotsFulfillmentId: 'fulfillment-1',
      deliverySelections: [
        { fulfillmentId: 'fulfillment-1', slotId: '4136780-2:1791478800' },
        { fulfillmentId: 'fulfillment-2', slotId: null },
      ],
    });

    expect(fetch.mock.calls[1]?.[0]).toBe('https://cloud.example/api/checkout/prepare');
    expect(sentBody(fetch)).toMatchObject({
      cartId: 'cart-1',
      deliverySlotsFulfillmentId: 'fulfillment-1',
      deliverySelections: [
        { fulfillmentId: 'fulfillment-1', slotId: '4136780-2:1791478800' },
        { fulfillmentId: 'fulfillment-2', slotId: null },
      ],
    });
  });

  it.each([
    ['not an array', { deliverySelections: 'x' }, 'Invalid deliverySelections'],
    [
      'a missing fulfillmentId',
      { deliverySelections: [{ slotId: 'a:1' }] },
      'Invalid fulfillmentId in deliverySelection',
    ],
    [
      'an empty slotId',
      { deliverySelections: [{ fulfillmentId: 'f', slotId: '' }] },
      'Invalid slotId in deliverySelection',
    ],
    ['an empty deliverySlotsFulfillmentId', { deliverySlotsFulfillmentId: '' }, 'Invalid deliverySlotsFulfillmentId'],
    [
      'more than 50 deliverySelections',
      {
        deliverySelections: Array.from({ length: 51 }, (_, index) => ({
          fulfillmentId: `f-${index}`,
          slotId: null,
        })),
      },
      'Invalid deliverySelections',
    ],
    [
      'a duplicate fulfillmentId',
      {
        deliverySelections: [
          { fulfillmentId: 'f', slotId: null },
          { fulfillmentId: 'f', slotId: 'f:1' },
        ],
      },
      'Duplicate fulfillmentId in deliverySelections',
    ],
    [
      'a fulfillmentId longer than 255 characters',
      { deliverySelections: [{ fulfillmentId: 'f'.repeat(256), slotId: null }] },
      'Invalid fulfillmentId in deliverySelection',
    ],
    [
      'a slotId longer than 255 characters',
      { deliverySelections: [{ fulfillmentId: 'f', slotId: 's'.repeat(256) }] },
      'Invalid slotId in deliverySelection',
    ],
    [
      'a deliverySlotsFulfillmentId longer than 255 characters',
      { deliverySlotsFulfillmentId: 'f'.repeat(256) },
      'Invalid deliverySlotsFulfillmentId',
    ],
  ])('rejects %s before the request', async (_name, extra, message) => {
    const fetch = stubFetch(jsonResponse({ data: {} }));
    vi.spyOn(console, 'error').mockImplementation(() => undefined);

    await expect(
      createService().prepare({ cartId: 'cart-1', ...extra } as unknown as ICheckoutPrepareParams)
    ).rejects.toThrow(message);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('accepts 50 deliverySelections with ids of 255 characters', async () => {
    const fetch = stubFetch(jsonResponse({ data: {} }));
    const deliverySelections = Array.from({ length: 50 }, (_, index) => ({
      fulfillmentId: String(index).padEnd(255, 'f'),
      slotId: 's'.repeat(255),
    }));

    await createService().prepare({ cartId: 'cart-1', deliverySelections });

    expect(sentBody(fetch).deliverySelections).toHaveLength(50);
  });

  it('keeps the delivery error code of a failed complete', async () => {
    stubFetch(
      jsonResponse(
        {
          statusCode: ENUM_CHECKOUT_STATUS_CODE_ERROR.REQUEST_DELIVERY_SELECTION_ERROR,
          message: ENUM_CHECKOUT_STATUS_CODE_MESSAGE.REQUEST_DELIVERY_SELECTION_ERROR,
          errors: [
            {
              field: 'deliverySelections',
              code: ENUM_CHECKOUT_DELIVERY_ERROR_CODE.DELIVERY_WINDOW_EXPIRED,
              message: 'The delivery window has expired.',
            },
          ],
        },
        400
      )
    );
    vi.spyOn(console, 'error').mockImplementation(() => undefined);

    await expect(
      createService().complete({ token: 'checkout-token', payment: 'payment-1' })
    ).rejects.toEqual({
      status: 400,
      statusCode: 5515,
      message:
        'The selected delivery time is not available. Please choose another delivery time.',
      errors: [
        {
          field: 'deliverySelections',
          code: 'delivery_window_expired',
          message: 'The delivery window has expired.',
        },
      ],
    });
  });
});
