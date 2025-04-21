import type { AuthenticatedService } from '../core';
import type { IApiResponseBase } from '../types';

export class WebhookService {
  private client: AuthenticatedService;

  constructor(client: AuthenticatedService) {
    this.client = client;
  }

  /**
   * Test the webhook.
   * @returns {Promise<boolean>} A promise that resolves whether the test succeded or not.
   * @throws {Error} If request fails.
   */
  public async test(): Promise<boolean> {
    try {
      const response = await this.client.get<IApiResponseBase>(`/webhook/test`);
      if (response.statusCode === 200) {
        return true;
      }

      return false;
    } catch (error) {
      console.error('Failed to test Webhook:', error);
      throw error;
    }
  }
}
