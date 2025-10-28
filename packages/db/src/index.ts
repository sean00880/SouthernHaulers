// Placeholder database client for Southern Haulers
// In a real implementation this module would configure and export Supabase/PostgreSQL clients
// along with helper functions for row level security and migrations.

export interface ConnectionOptions {
  url: string;
  apiKey?: string;
}

export function createClient(options: ConnectionOptions) {
  throw new Error('Database client not implemented. Please provide a real implementation that connects to Supabase or Postgres.');
}