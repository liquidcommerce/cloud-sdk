import { afterEach, describe, expect, it, vi } from 'vitest';
import { AuthenticatedService } from '../src/core/authenticated.service';
import { OrderAuthenticatedService } from '../src/core/order-authenticated.service';
import { LIQUID_COMMERCE_ENV } from '../src/enums';

const jsonResponse = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

const authResponse = () =>
  jsonResponse({ data: { token: 'access-token', exp: Date.now() + 60_000 } }, 200);

// Body the payment service returned for a declined card in production.
const paymentDecline = {
  statusCode: 8116,
  error: 'The account provided is invalid',
  timestamp: '2026-10-01T22:45:05.851Z',
  errors: [
    {
      statusCode: 8116,
      message: 'The account provided is invalid',
      timestamp: '2026-10-01T22:45:05.851Z',
    },
  ],
};

const failedPost = async (response: Response) => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce(authResponse()).mockResolvedValueOnce(response));
  const client = new AuthenticatedService({
    apiKey: 'liquid-api-key',
    baseURL: 'https://cloud.example/',
    env: LIQUID_COMMERCE_ENV.PROD,
  });

  return client.post('/checkout/complete', { token: 't', payment: 'pm' }).catch((error) => error);
};

describe('request errors', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('keeps a message the API sent, unchanged', async () => {
    const error = await failedPost(
      jsonResponse({ statusCode: 5489, message: 'The checkout token provided is invalid.' }, 400)
    );

    expect(error).toEqual({
      statusCode: 5489,
      message: 'The checkout token provided is invalid.',
      status: 400,
    });
  });

  it('keeps an array message as sent', async () => {
    const error = await failedPost(jsonResponse({ statusCode: 400, message: ['a', 'b'] }, 400));

    expect(error.message).toEqual(['a', 'b']);
  });

  it('reads a payment decline that carries its text under error', async () => {
    const error = await failedPost(jsonResponse(paymentDecline, 400));

    expect(error).toMatchObject({
      statusCode: 8116,
      error: 'The account provided is invalid',
      status: 400,
      message: 'The account provided is invalid',
    });
  });

  it('falls back to the first errors entry', async () => {
    const error = await failedPost(
      jsonResponse({ statusCode: 8103, errors: [{ message: 'Payment was declined' }] }, 400)
    );

    expect(error.message).toBe('Payment was declined');
  });

  it('uses a bare string body as the message without spreading it', async () => {
    const error = await failedPost(jsonResponse('ThrottlerException: Too Many Requests', 429));

    expect(error).toEqual({ status: 429, message: 'ThrottlerException: Too Many Requests' });
  });

  it('falls back to the HTTP status when the body has no text', async () => {
    const error = await failedPost(jsonResponse({ statusCode: 500 }, 500));

    expect(error.message).toBe('HTTP error! status: 500');
  });

  it('applies the same rules to the order API client', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValueOnce(authResponse())
        .mockResolvedValueOnce(jsonResponse(paymentDecline, 400))
    );
    const client = new OrderAuthenticatedService({
      userID: 'user',
      password: 'password',
      baseURL: 'https://cloud.example/',
    });

    const error = await client.get('/orders/1').catch((e) => e);

    expect(error.message).toBe('The account provided is invalid');
  });
});
