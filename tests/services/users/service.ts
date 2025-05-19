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
    return sendRequest(options);
  }

  async getUserById(userId:string, opts?: IRequestOptions) {
    const options = {
      method: "get",
      endpoint: config.endpoints.users.getUserById(userId),
      headers: config.defaultHeaders(),
      ...opts,
    };
    return sendRequest(options);
  }

  async deleteUserById(userId:string, opts?: IRequestOptions) {
    const options = {
      method: "delete",
      endpoint: config.endpoints.users.deleteUserById(userId),
      headers: config.defaultHeaders(),
      ...opts,
    };
    return sendRequest(options);
  }
}
const usersService = new UsersService();
export default usersService;
