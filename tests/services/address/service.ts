import type { IRequestOptions } from "../../data/interfaces/response";
import sendRequest from "../sendRequest";
import config from "../config";
import { requestData } from "./requestData";

class AddressService {
  async autocomplete(opts?: IRequestOptions) {
    const options = {
      method: "post",
      endpoint: config.endpoints.address.autocomplete,
      headers: config.defaultHeaders(),
      body: requestData.autocomplete(),
      ...opts,
    };
    return sendRequest(options);
  }

  async getAddressDetails(opts?: IRequestOptions) {
    const options = {
      method: "post",
      endpoint: config.endpoints.address.getAddressDetails,
      headers: config.defaultHeaders(),
      body: requestData.getAddressDetails(),
      ...opts,
    };
    return sendRequest(options);
  }

}
const addressService = new AddressService();
export default addressService;
