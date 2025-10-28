// PortPro API client
// This module provides basic typed wrappers around the PortPro API. All requests are performed using the
// native fetch API. In a production setting you should add robust error handling, rate limiting and
// retry logic.

export interface PortProOptions {
  baseUrl: string;
  accessToken: string;
}

export class PortProClient {
  private baseUrl: string;
  private accessToken: string;

  constructor(options: PortProOptions) {
    this.baseUrl = options.baseUrl.endsWith('/') ? options.baseUrl.slice(0, -1) : options.baseUrl;
    this.accessToken = options.accessToken;
  }

  private async request<T>(endpoint: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
        ...(init?.headers || {}),
      },
    });
    if (!res.ok) {
      throw new Error(`PortPro API request failed: ${res.status} ${res.statusText}`);
    }
    return res.json() as Promise<T>;
  }

  // Example: list loads created within a date range
  async listLoads(params: { from?: string; to?: string } = {}) {
    const search = new URLSearchParams();
    if (params.from) search.append('from', params.from);
    if (params.to) search.append('to', params.to);
    return this.request<any[]>(`/loads?${search.toString()}`);
  }

  // Example: get a single load by ID
  async getLoad(id: string) {
    return this.request<any>(`/loads/${id}`);
  }
}