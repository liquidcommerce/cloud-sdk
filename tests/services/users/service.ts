import type { IRequestOptions } from "../../data/interfaces/response";
import sendRequest from "../sendRequest";
import config from "../config";
import { requestData } from "./requestData";

class UsersService {
  async createUser(opts?: IRequestOptions) {
    const options = {
      method: "post",
      endpoint: config.endpoints.users.createUser,
      headers: config.defaultHeaders(),
      body: requestData.createUser(),
      ...opts,
    };
    console.log(JSON.stringify(options));
    return sendRequest(options);
  }
}
const usersService = new UsersService();
export default usersService;
