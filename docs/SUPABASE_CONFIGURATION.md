# Supabase Configuration - Southern Haulers TMS
**Date**: 2025-10-23
**Status**: ✅ Configured

## Project Details

**URL**: https://mbbvmtspkotbamorqkml.supabase.co
**Project Reference**: mbbvmtspkotbamorqkml
**Region**: (Check Supabase dashboard)

## API Keys

### Publishable (Anon) Key
```
sb_publishable_cPgfQQZ7mSn2kc_5kKwqUQ_26P3kmS0
```
**Usage**: Client-side operations with RLS enforcement

### Secret (Service Role) Key
```
sb_secret_kbozMX-f9akjXet3WS2VIA_QI0yanAh
```
**Usage**: Server-side operations, bypasses RLS (use with caution)

## Environment Configuration

### Production (.env.local)
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://mbbvmtspkotbamorqkml.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_cPgfQQZ7mSn2kc_5kKwqUQ_26P3kmS0
SUPABASE_URL=https://mbbvmtspkotbamorqkml.supabase.co
SUPABASE_ANON_KEY=sb_publishable_cPgfQQZ7mSn2kc_5kKwqUQ_26P3kmS0
SUPABASE_SERVICE_ROLE_KEY=sb_secret_kbozMX-f9akjXet3WS2VIA_QI0yanAh

# Database
DATABASE_URL=postgresql://postgres:password@db.mbbvmtspkotbamorqkml.supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:password@db.mbbvmtspkotbamorqkml.supabase.co:5432/postgres
POSTGIS_ENABLED=true
PGVECTOR_ENABLED=true
```

## MCP Configuration

### Claude Code MCP (.claude/mcp.json)
```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server-supabase@latest"],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "sb_secret_kbozMX-f9akjXet3WS2VIA_QI0yanAh",
        "SUPABASE_URL": "https://mbbvmtspkotbamorqkml.supabase.co",
        "SUPABASE_PROJECT_REF": "mbbvmtspkotbamorqkml"
      }
    },
    "postgres": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-postgres",
        "postgresql://postgres:password@db.mbbvmtspkotbamorqkml.supabase.co:5432/postgres"
      ]
    }
  }
}
```

## Required Extensions

### 1. PostGIS (Geospatial)
```sql
CREATE EXTENSION IF NOT EXISTS postgis;
```
**Usage**: Terminal gates, geofencing, proximity routing

### 2. pgvector (Vector Search)
```sql
CREATE EXTENSION IF NOT EXISTS vector;
```
**Usage**: RAG for AI agents, document embeddings

### 3. uuid-ossp (UUID Generation)
```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```
**Usage**: Primary keys with uuid_generate_v4()

## Enable Extensions via Supabase Dashboard

1. Go to https://supabase.com/dashboard/project/mbbvmtspkotbamorqkml
2. Navigate to **Database** → **Extensions**
3. Search and enable:
   - ✅ postgis
   - ✅ pgvector
   - ✅ uuid-ossp
   - ✅ pg_stat_statements (monitoring)
   - ✅ pg_trgm (fuzzy text search)

## Database Password

⚠️ **Default password**: The connection string uses `password` as placeholder.

**To update**:
1. Go to Supabase Dashboard → Settings → Database
2. Reset database password
3. Update in `.env.local`:
   ```bash
   DATABASE_URL=postgresql://postgres:YOUR_NEW_PASSWORD@db.mbbvmtspkotbamorqkml.supabase.co:5432/postgres
   ```

## Client Initialization

### TypeScript
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### With Service Role (Server-Side Only)
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})
```

## RLS (Row Level Security)

All tables will have RLS enabled with org-level isolation:

```sql
-- Example RLS policy for shipments table
CREATE POLICY "Users can only see their org's shipments"
  ON shipments
  FOR SELECT
  USING (org_id = current_setting('app.org_id')::uuid);
```

**Middleware Pattern**:
```typescript
// Set org context in middleware
export async function middleware(request: NextRequest) {
  const session = await getSession(request)

  if (session) {
    // Set org_id for RLS
    await supabase.rpc('set_config', {
      name: 'app.org_id',
      value: session.orgId
    })
  }
}
```

## Next Steps

1. ✅ Environment variables configured
2. ✅ MCP configuration updated
3. ⏳ Enable extensions (PostGIS, pgvector)
4. ⏳ Create database migrations
5. ⏳ Implement RLS policies
6. ⏳ Set up Supabase Auth (if using)

## Security Checklist

- ✅ Publishable key safe for client-side
- ✅ Service role key stored server-side only
- ⚠️ Update default database password
- ⏳ Enable RLS on all tables
- ⏳ Audit RLS policies for data leaks
- ⏳ Set up database backups
- ⏳ Configure PITR (Point-in-Time Recovery)

## Support

- **Supabase Dashboard**: https://supabase.com/dashboard/project/mbbvmtspkotbamorqkml
- **Supabase Docs**: https://supabase.com/docs
- **PostGIS Docs**: https://postgis.net/documentation/
- **pgvector Docs**: https://github.com/pgvector/pgvector

---
**Configuration Status**: ✅ Complete
**Last Updated**: 2025-10-23
**By**: Claude Code
