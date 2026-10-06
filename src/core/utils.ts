export type FetchFunction = typeof fetch;

export interface IHttpClientOptions {
  method: string;

  headers: Record<string, string>;

  body?: string;
}

export type HttpClient = (url: string, options: IHttpClientOptions) => Promise<ICustomResponse>;

export interface IRequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';

  headers?: Record<string, string>;

  body?: any;
}

export interface ICustomResponse {
  ok: boolean;

  status: number;

  statusText: string;

  headers: Record<string, string>;

  json: () => Promise<any>;

  text: () => Promise<string>;
}

/**
 * Returns a HttpClient function that wraps the provided fetch function.
 *
 * @param {FetchFunction} fetchFunc - The fetch function to be wrapped.
 *
 * @return {HttpClient} - The HttpClient function that makes network requests using the provided fetch function.
 */
export function fetchAdapter(fetchFunc: FetchFunction): HttpClient {
  return async (url: string, options: IHttpClientOptions): Promise<ICustomResponse> => {
    const response = await fetchFunc(url, options as RequestInit);
    let headers: Record<string, string>;

    if (typeof response.headers?.entries === 'function') {
      headers = Object.fromEntries(response.headers.entries());
    } else {
      // Fallback for environments without Headers.entries()
      headers = {};
      response.headers.forEach((value, key) => {
        headers[key] = value;
      });
    }

    return {
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      headers,
      json: () => response.json(),
      text: () => response.text(),
    };
  };
}

/**
 * Sends an HTTP request using XMLHttpRequest and returns a Promise that resolves to a custom response object.
 *
 * @param {string} url - The URL to send the request to.
 * @param {IHttpClientOptions} options - The options for the HTTP request.
 * @returns {Promise<ICustomResponse>} - A Promise that resolves to a custom response object.
 * @throws {TypeError} - If the network request fails.
 */
export const xhrFetch: HttpClient = (
  url: string,
  options: IHttpClientOptions
): Promise<ICustomResponse> =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(options.method || 'GET', url);

    Object.entries(options.headers).forEach(([key, value]) => {
      xhr.setRequestHeader(key, value);
    });

    xhr.onload = () => {
      resolve({
        ok: xhr.status >= 200 && xhr.status < 300,
        status: xhr.status,
        statusText: xhr.statusText,
        headers: xhr
          .getAllResponseHeaders()
          .split('\r\n')
          .reduce(
            (acc, current) => {
              const [name, value] = current.split(': ');
              if (name) acc[name] = value;
              return acc;
            },
            {} as Record<string, string>
          ),
        json: () => Promise.resolve(JSON.parse(xhr.responseText)),
        text: () => Promise.resolve(xhr.responseText),
      });
    };

    xhr.onerror = () => {
      reject(new TypeError('Network request failed'));
    };

    xhr.send(options.body);
  });

/**
 * Returns the appropriate implementation of the `HttpClient` interface for making HTTP requests.
 *
 * If the `fetch` function is available, it will be used to create a new `HttpClient` instance by calling the `fetchAdapter` method.
 * If the `fetch` function is not available but the `global.fetch` function is defined, the `global.fetch` function will be used.
 * If neither the `fetch` function nor the `global.fetch` function is available, but the `window.fetch` function is defined, the `window.fetch` function will be used.
 * If none of the above conditions are met, the `xhrFetch` property will be returned.
 *
 * @return The appropriate implementation of the `HttpClient` interface.
 */
export function getFetchImplementation(): HttpClient {
  if (typeof fetch !== 'undefined') {
    return fetchAdapter(fetch);
  }
  if (typeof global !== 'undefined' && global.fetch) {
    return fetchAdapter(global.fetch);
  }
  if (typeof window !== 'undefined' && window.fetch) {
    return fetchAdapter(window.fetch);
  }

  return xhrFetch;
}

function firstText(...values: unknown[]): string {
  for (const value of values) {
    if (typeof value === 'string' && value.trim() !== '') {
      return value;
    }
  }

  return '';
}

/**
 * Builds the object thrown for a non-2xx response. Partners show `message` to shoppers, but not
 * every upstream error puts its text there (Vault uses `error`, a rate limit sends a bare string),
 * so fall back to those before the status. A `message` that is present is kept as sent, arrays
 * included, so partners already reading it see no change.
 */
export function toRequestError(body: unknown, status: number): Record<string, any> {
  const data: Record<string, any> =
    body !== null && typeof body === 'object' ? (body as Record<string, any>) : {};

  return {
    ...data,
    status,
    message:
      data.message ||
      firstText(typeof body === 'string' ? body : '', data.error, data.errors?.[0]?.message) ||
      `HTTP error! status: ${status}`,
  };
}
