import type { IRequestOptions } from "../../data/interfaces/response";
import sendRequest from "../sendRequest";
import config from "../config";

class AuthService {
  //! Auth requests
  async auth(opts?: IRequestOptions) {
    const options = {
      method: "get",
      endpoint: config.endpoints.auth.accessToken,
      headers: config.authHeaders(),
      ...opts,
    };
    console.log(JSON.stringify(options));
    return sendRequest(options);
  }
}
const authService = new AuthService();
export default authService;
