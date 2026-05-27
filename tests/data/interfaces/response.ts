export interface IResponse {
  status: number;
  statusText: string;
  headers: Headers;
  body: { [key: string]: any };
}

export interface IRequestOptions extends RequestInit {
  endpoint?: string;
  headers?: any;
  body?: any;
}
