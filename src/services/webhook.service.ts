import type { AuthenticatedService } from '../core';
import type { IApiResponseBase } from '../types';

export class WebhookService {
  private client: AuthenticatedService;

  constructor(client: AuthenticatedService) {
    this.client = client;
  }

  /**
   * Test the webhook.
   *
   * @returns {Promise<boolean>} A promise that resolves whether the test succeeded or not.
   * @throws {Error} If the test request fails.
   */
  public async test(): Promise<boolean> {
    try {
      const response = await this.client.get<IApiResponseBase>(`/webhook/test`);

      return response.statusCode === 200;
    } catch (error) {
      console.error('Error testing webhook:', error);
      throw error;
    }
  }
}
