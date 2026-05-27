import type { IRequestOptions } from "../../data/interfaces/response";
import sendRequest from "../sendRequest";
import config from "../config";
import { requestData } from "./requestData";

class CatalogService {
  async search(opts?: IRequestOptions) {
    const options = {
      method: "post",
      endpoint: config.endpoints.catalog.search,
      headers: config.defaultHeaders(),
      body: requestData.searchItem(),
      ...opts,
    };
    return sendRequest(options);
  }

  async availability(opts?: IRequestOptions) {
    const options = {
      method: "post",
      endpoint: config.endpoints.catalog.availability,
      headers: config.defaultHeaders(),
      body: requestData.availabilityItem(),
      ...opts,
    };
    return sendRequest(options);
  }


}
const catalogService = new CatalogService();
export default catalogService;
