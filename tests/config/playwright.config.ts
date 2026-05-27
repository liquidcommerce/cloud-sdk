import { defineConfig, devices, ReporterDescription } from '@playwright/test';
import dotenv from "dotenv";
import path from "path";

dotenv.config()

/* Reporter to use. See https://playwright.dev/docs/test-reporters */
const reporter: ReporterDescription[] = [
  [
    "html",
    {
      outputFolder: "../playwright-report",
      open: "on-failure",
    },
  ],
  ["line"],
];
if (process.env.TR_ENABLED === "true") reporter.push(["./testRailReporter.ts"]);
if (process.env.SLACK_NOTIFICATIONS_ENABLED === "true") reporter.push(["./slackNotify.config.ts"]);

export default defineConfig({
  testDir: '../spec',
  globalSetup: path.resolve("./config/pwGlobalSetup.ts"),
  globalTeardown: path.resolve("./config/pwGlobalTeardown.ts"),
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter,
  use: {
    trace: 'on-first-retry',
  },
  outputDir: "../test-results",
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
