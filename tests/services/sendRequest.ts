import type { IRequestOptions, IResponse } from "../data/interfaces/response";

function logRequest(options: IRequestOptions) {
  console.log(`
    REQUEST: ${options.method} ${options.endpoint}\n
    ${options.body ? "BODY: " + JSON.stringify(options.body, null, 2) : ""}\n
    ${options.headers ? "HEADERS: " + JSON.stringify(options.headers, null, 2) : ""}
  `);
}

function logResponse(response: IResponse) {
  console.log(`
    RESPONSE: ${response.status} ${response.statusText}\n
    BODY: ${JSON.stringify(response.body, null, 2)}\n
    HEADERS: ${JSON.stringify(response.headers, null, 2)}
  `);
}

async function getResponseBody(response: Response) {
  try {
    return await response.clone().json();
  } catch {
    return await response.clone().text();
  }
}

export default async function sendRequest(options: IRequestOptions, expectedError = false): Promise<IResponse> {
  if (process.env.DEBUG) logRequest(options);
  const { endpoint, ...opts } = options;
  const apiResponse = await fetch(endpoint as string, opts);
  const response: IResponse = {
    status: apiResponse.status,
    statusText: apiResponse.statusText,
    headers: apiResponse.headers,
    body: await getResponseBody(apiResponse),
  };
  if (apiResponse.status > 400 && !expectedError && !process.env.DEBUG) logResponse(response);
  if (process.env.DEBUG) logResponse(response);
  return response;
}
