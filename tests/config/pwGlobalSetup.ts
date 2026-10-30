import type { FullConfig } from "@playwright/test";
import authService from '../services/authentication/service';

 async function globalSetup(config: FullConfig) {
  console.log("Start Playwright global setup");
  const authResponse = await authService.auth();
  if (authResponse.status === 200) {
    process.env.authToken = authResponse.body.data.token;
    console.log("Auth token successfully saved");
  } else {
    console.error(`Login request failed: ${authResponse.status} ${authResponse.statusText}`);
  }
  // Add here any steps that you want to perform before tests start
  console.log("End Playwright global setup");
 }

export default globalSetup;
