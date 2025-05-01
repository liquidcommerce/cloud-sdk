import type { AuthenticatedService } from '../core';
import type { IApiResponseBase } from '../types';

export class WebhookService {
  private client: AuthenticatedService;

  constructor(client: AuthenticatedService) {
    this.client = client;
  }

  /**
   * This method sends a test request to the webhook endpoint to verify if it is working correctly.
   *
   * @param {string} endpoint - The webhook endpoint to test. If not provided, it will use the default endpoint configured in the system.
   *
   * @returns {Promise<boolean>} A promise that resolves whether the test succeeded or not.
   * @throws {Error} If the test request fails.
   */
  public async test(endpoint?: string): Promise<boolean> {
    try {
      const response = await this.client.post<IApiResponseBase>(`/webhook/test`, {
        endpoint,
      });

      return response.statusCode === 200;
    } catch (error) {
      console.error('Error testing webhook:', error);
      throw error;
    }
  }
}
