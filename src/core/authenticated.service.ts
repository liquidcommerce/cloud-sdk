import type { IApiResponseWithData, IAuth } from '../types';

interface IAuthConfig {
  apiKey: string;

  baseURL: string;
}

interface IRequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';

  headers?: Record<string, string>;

  body?: any;
}

interface ICustomResponse {
  ok: boolean;

  status: number;

  statusText: string;

  headers: Record<string, string>;

  json: () => Promise<any>;

  text: () => Promise<string>;
}

interface IHttpClientOptions {
  method: string;

  headers: Record<string, string>;

  body?: string;
}

type HttpClient = (url: string, options: IHttpClientOptions) => Promise<ICustomResponse>;

type FetchFunction = typeof fetch;

/**
 * Represents an authenticated service for making HTTP requests.
 */
export class AuthenticatedService {
  private static instance: AuthenticatedService | null = null;

  private readonly apiKey: string;

  private readonly baseURL: string;

  private accessToken: string | null = null;

  private tokenExpiration: number | null = null;

  private isAuthenticating = false;

  private readonly httpClient: HttpClient;

  private constructor(config: IAuthConfig) {
    this.apiKey = config.apiKey;
    this.baseURL = config.baseURL;
    this.httpClient = this.getFetchImplementation();
  }

  /**
   * Returns an instance of AuthenticatedClient. This method follows the singleton pattern,
   * meaning that it ensures only one instance of AuthenticatedClient is created.
   *
   * @param {IAuthConfig} config - The configuration object used to initialize the AuthenticatedClient instance.
   * @return {AuthenticatedService} An instance of AuthenticatedClient.
   */
  public static getInstance(config: IAuthConfig): AuthenticatedService {
    if (!AuthenticatedService.instance) {
      AuthenticatedService.instance = new AuthenticatedService(config);
    }

    return AuthenticatedService.instance;
  }

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
  private getFetchImplementation(): HttpClient {
    if (typeof fetch !== 'undefined') {
      return this.fetchAdapter(fetch);
    } else if (typeof global !== 'undefined' && global.fetch) {
      return this.fetchAdapter(global.fetch);
    } else if (typeof window !== 'undefined' && window.fetch) {
      return this.fetchAdapter(window.fetch);
    }

    return this.xhrFetch;
  }

  /**
   * Returns a HttpClient function that wraps the provided fetch function.
   *
   * @param {FetchFunction} fetchFunc - The fetch function to be wrapped.
   *
   * @return {HttpClient} - The HttpClient function that makes network requests using the provided fetch function.
   */
  private fetchAdapter(fetchFunc: FetchFunction): HttpClient {
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
   * Retrieves a unique key based on the apiKey and baseURL properties.
   * The unique key is generated by concatenating the apiKey and baseURL with an underscore.
   *
   * @return {string} The unique key generated by concatenating the apiKey and baseURL.
   */
  public getUniqueKey(): string {
    return `${this.apiKey}_${this.baseURL}`;
  }

  /**
   * Sends an HTTP request using XMLHttpRequest and returns a Promise that resolves to a custom response object.
   *
   * @param {string} url - The URL to send the request to.
   * @param {IHttpClientOptions} options - The options for the HTTP request.
   * @returns {Promise<ICustomResponse>} - A Promise that resolves to a custom response object.
   * @throws {TypeError} - If the network request fails.
   */
  private xhrFetch: HttpClient = (
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
   * Authenticates the user with the LiquidCommerce API.
   *
   * This method sends a POST request to the /api/authentication endpoint,
   * and stores the received access token and token expiration time.
   *
   * @returns A Promise that resolves to void.
   * @throws An Error if the authentication fails.
   * @async
   */
  public async authenticate(): Promise<void> {
    if (this.isAuthenticating) {
      // If already authenticating, wait for it to complete
      await new Promise((resolve) => {
        const checkAuth = () => {
          if (!this.isAuthenticating) {
            resolve(undefined);
          } else {
            setTimeout(checkAuth, 100);
          }
        };

        checkAuth();
      });
      return;
    }

    this.isAuthenticating = true;
    try {
      const response = await this.requestWithoutAuth<IApiResponseWithData<IAuth>>(
        '/authentication',
        { method: 'GET' }
      );
      this.accessToken = response?.data?.token;
      this.tokenExpiration = Date.now() + response?.data?.exp * 1000;
    } catch (error) {
      console.error('Authentication failed:', error);
      throw new Error('Failed to authenticate with LiquidCommerce API');
    } finally {
      this.isAuthenticating = false;
    }
  }

  private async requestWithoutAuth<T>(path: string, options: IRequestOptions): Promise<T> {
    const url = new URL(`api${path}`, this.baseURL);
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-LIQUID-API-KEY': this.apiKey,
      ...options.headers,
    };

    const fetchOptions: IHttpClientOptions = {
      method: options.method,
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    };

    const response = await this.httpClient(url.toString(), fetchOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Checks if the token is expired.
   *
   * @returns {boolean} Returns true if the token is expired, otherwise returns false.
   */
  isTokenExpired(): boolean {
    return this.tokenExpiration ? Date.now() >= this.tokenExpiration : true;
  }

  /**
   * Sends an HTTP request to the specified path with the provided options and returns a Promise that resolves to the response data.
   *
   * @param path - The path to send the request to.
   * @param options - The options for the request, including method, headers, and body.
   * @returns A Promise that resolves to the response data.
   * @throws {Error} If the response is not successful (status is not ok).
   */
  private async request<T>(path: string, options: IRequestOptions): Promise<T> {
    if (!this.accessToken || this.isTokenExpired()) {
      await this.authenticate();
    }

    const url = new URL(`api${path}`, this.baseURL);
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-LIQUID-API-KEY': this.apiKey,
      Authorization: `Bearer ${this.accessToken}`,
      ...options.headers,
    };

    const fetchOptions: IHttpClientOptions = {
      method: options.method,
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    };

    const response = await this.httpClient(url.toString(), fetchOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Sends a GET request to the specified path with optional headers.
   *
   * @param {string} path - The path to send the request to.
   * @param {Record<string, string>} [headers] - Optional headers to include in the request.
   * @return {Promise<T>} - A promise that resolves to the response data.
   */
  public async get<T = any>(path: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(path, { method: 'GET', headers });
  }

  /**
   * Sends a POST request to the specified path with optional body and headers.
   *
   * @param {string} path - The path to send the POST request to.
   * @param {any} [body] - The optional body of the request.
   * @param {Record<string, string>} [headers] - The optional headers of the request.
   *
   * @return {Promise<T>} - A Promise that resolves to the response of the request.
   *
   * @throws {Error} - If an error occurs while making the request.
   */
  public async post<T = any>(
    path: string,
    body?: any,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.request<T>(path, { method: 'POST', body, headers });
  }

  /**
   * Sends a PUT request to the specified path with optional request body and headers.
   *
   * @param {string} path - The path where the PUT request will be sent.
   * @param {any} [body] - The optional body of the request.
   * @param {Record<string, string>} [headers] - The optional headers of the request.
   * @return {Promise<T>} A Promise that resolves with the response data.
   */
  public async put<T = any>(
    path: string,
    body?: any,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.request<T>(path, { method: 'PUT', body, headers });
  }

  /**
   * Deletes a resource from the server using the HTTP DELETE method.
   *
   * @param path - The path of the resource to delete.
   * @param headers - Optional headers to include in the request.
   * @returns A promise that resolves to the deleted resource.
   */
  public async delete<T = any>(path: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(path, { method: 'DELETE', headers });
  }
}