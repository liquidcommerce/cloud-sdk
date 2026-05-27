import type { Environment } from "./types";

const environment: Environment = (process.env.ENVIRONMENT?.toLowerCase() as Environment) || "dev";

export const links = {
  baseUrl: {
    dev: "https://dev.api.liquidcommerce.cloud/",
    staging: "https://staging.api.liquidcommerce.cloud/",
    prod: "???",
  }[environment],
};
