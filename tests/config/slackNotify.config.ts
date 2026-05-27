import type { FullResult, Reporter, TestCase, TestResult } from "@playwright/test/reporter";
import SlackNotify from "slack-notify";
import type { IBrowserStatus } from "../data/interfaces/browserStatus";

const slackWebhookURL = `https://hooks.slack.com/services/${process.env.SLACK_WEBHOOK}`;
const slack = SlackNotify(slackWebhookURL);

class SlackReporter implements Reporter {
  colors = {
    passed: "#00FF00",
    skipped: "#00FFFF",
    failed: "#FF0000",
  };

  browserStatuses: Record<string, IBrowserStatus> = {};

  onTestEnd(test: TestCase, result: TestResult) {
    const browserName = test.parent?.project()?.name;

    if (browserName) {
      if (!this.browserStatuses[browserName]) {
        this.browserStatuses[browserName] = { total: 0, passed: 0, skipped: 0, failed: 0, timedOut: 0, interrupted: 0 };
      }

      const browserStatus = this.browserStatuses[browserName];
      const status = result.status as keyof IBrowserStatus;
      if (result.retry > 0) {
        browserStatus[test.results[0].status] -= 1;
        browserStatus[status] += 1;
      } else {
        browserStatus.total += 1;
        browserStatus[status] += 1;
      }
    }
  }

  async onEnd(result: FullResult) {
    const testRailRun = process.env.TEST_RAIL_RUN ? JSON.parse(process.env.TEST_RAIL_RUN) : { name: "", url: "" };
    const attachments: any[] = Object.entries(this.browserStatuses).map(([browserName, status]) => ({
      fallback: `Results for ${browserName}`,
      color: this.colors[result.status as keyof typeof this.colors],
      title: `Results for : ${browserName}`,
      text: `📊 Total: ${status.total}    ✅ Passed: ${status.passed}    ⚠️ Skipped: ${status.skipped}    ❌ Failed: ${status.failed + status.timedOut}`,
    }));

    if (process.env.BUILD_URL) {
      attachments.push({
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "Link to Github build",
            },
            accessory: {
              type: "button",
              text: {
                type: "plain_text",
                text: "Open",
                emoji: true,
              },
              url: process.env.BUILD_URL,
            },
          },
        ],
      });
    }

    if (testRailRun.url) {
      attachments.push({
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "Link to Testrail run results",
            },
            accessory: {
              type: "button",
              text: {
                type: "plain_text",
                text: "Open",
                emoji: true,
              },
              url: testRailRun.url,
            },
          },
        ],
      });
    }

    await slack.send({
      channel: "#reservebar-taf",
      text: `<!channel>\n Test run for Cloud SDK has been finished.\nStarted by: ${process.env.REF || "local"}`,
      attachments,
    });
  }
}
export default SlackReporter;
