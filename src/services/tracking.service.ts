import type { AuthenticatedService } from '../core';
import type { ITracking } from '../interfaces';
import type { IApiResponseWithData } from '../types';

export class TrackingService {
  private client: AuthenticatedService;

  constructor(client: AuthenticatedService) {
    this.client = client;
  }

  public async get(identifier: string): Promise<IApiResponseWithData<ITracking>> {
    try {
      return await this.client.get<IApiResponseWithData<ITracking>>(`/tracking/${identifier}`);
    } catch (error) {
      console.error('Failed to fetch tracking:', error);
      throw error;
    }
  }
}
