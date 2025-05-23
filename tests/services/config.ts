const baseURL = {
  dev: "https://dev.api.liquidcommerce.cloud/",
  staging: "https://staging.api.liquidcommerce.cloud/",
  prod: "",
}[process.env.ENVIRONMENT?.toLowerCase() || "dev"];
const config = {
  defaultHeaders: () => {
    return {
      'Authorization': `Bearer ${process.env.authToken}`,
      "Content-Type": "application/json",
    };
  },
  authHeaders: () => {
    return {
      'X-LIQUID-API-KEY': process.env.X_LIQUID_API_KEY,
      "Content-Type": "application/json",
    };
  },
  endpoints: {
    auth: {
      accessToken: `${baseURL}api/authentication`,
    },
    users: {
      createUser: `${baseURL}/users/session`,
      getUserById: (id:string) =>  `${baseURL}users/fetch/${id}`,
      deleteUserById: (id:string) =>  `${baseURL}users/purge/${id}`,
      addAddress: `${baseURL}users/addresses/add`,
      deleteAddressById: (id:string) =>  `${baseURL}/users/addresses/purge/${id}`,
    },
    address: {
      autocomplete: `${baseURL}/address/autocomplete`,
      getAddressDetails: `${baseURL}/address/details`,
    }
  },
};

export default config;
