# Apply Database Migration
**Date**: 2025-10-23
**Migration**: `20251023000001_initial_schema.sql`
**Status**: Ready to apply

## What's Included

This migration creates **13 tables** with complete RLS security:

### Core Tables (4)
1. ✅ **organizations** - Multi-tenant root with feature flags
2. ✅ **users** - Auth + RBAC (6 roles: admin, dispatcher, driver, customer, compliance, sales)
3. ✅ **drivers** - Driver management + compliance tracking
4. ✅ **vehicles** - Fleet management (trucks, trailers, chassis)

### TMS Core (3)
5. ✅ **shipments** - Main TMS entity with PostGIS locations
6. ✅ **shipment_status_history** - Event sourcing with auto-update trigger
7. ✅ **quotes** - CPQ with versioning and approval workflow

### Billing & Compliance (3)
8. ✅ **invoices** - Billing with status tracking
9. ✅ **leasing_artifacts** - Truth-in-Leasing (IMMUTABLE)
10. ✅ **audit_logs** - Security audit trail (admin-only access)

### Operations (3)
11. ✅ **exceptions** - TMF/demurrage risk tracking
12. ✅ **webhooks_received** - Integration audit (PortPro, Meta, Twilio)
13. ✅ **document_embeddings** - pgvector for RAG (AI agents)

## Features Included

### Extensions
- ✅ `uuid-ossp` - UUID generation
- ✅ `postgis` - Geospatial (terminal gates, routing)
- ✅ `vector` - pgvector for RAG

### Security (RLS)
- ✅ All tables have Row Level Security enabled
- ✅ Org-level data isolation
- ✅ Admin-only access for audit logs
- ✅ Context functions for middleware

### Performance
- ✅ 40+ indexes for query optimization
- ✅ Geospatial indexes (GIST) on locations
- ✅ Vector index (ivfflat) for similarity search
- ✅ Composite indexes for common queries

### Compliance
- ✅ Immutable leasing artifacts (cannot update/delete)
- ✅ Audit log for all sensitive operations
- ✅ TWIC/Clearinghouse tracking
- ✅ Truth-in-Leasing ready

### Automation
- ✅ Auto-update `updated_at` on all tables
- ✅ Auto-update `shipments.status` from history
- ✅ Helper functions for RLS context
- ✅ Vector similarity search function

## How to Apply Migration

### Option 1: Supabase Dashboard (Recommended)

1. **Go to SQL Editor**
   ```
   https://supabase.com/dashboard/project/mbbvmtspkotbamorqkml/sql
   ```

2. **Copy Migration SQL**
   - Open: `supabase/migrations/20251023000001_initial_schema.sql`
   - Copy entire contents (Ctrl+A, Ctrl+C)

3. **Paste and Execute**
   - Paste in SQL Editor
   - Click **Run** button
   - Wait for execution (~10-15 seconds)

4. **Verify Success**
   - Check for "Success" message
   - No errors should appear

### Option 2: Supabase CLI

```bash
# Install CLI (if not installed)
npm install -g supabase

# Login to Supabase
supabase login

# Link project
supabase link --project-ref mbbvmtspkotbamorqkml

# Apply migration
supabase db push
```

### Option 3: Direct PostgreSQL

```bash
# Connect to database
psql postgresql://postgres:password@db.mbbvmtspkotbamorqkml.supabase.co:5432/postgres

# Execute migration
\i supabase/migrations/20251023000001_initial_schema.sql

# Verify tables
\dt
```

## Verification Checklist

After running the migration, verify:

### 1. Extensions Enabled
```sql
SELECT extname, extversion
FROM pg_extension
WHERE extname IN ('uuid-ossp', 'postgis', 'vector');
```

Expected output:
```
   extname   | extversion
-------------+------------
 uuid-ossp   | 1.1
 postgis     | 3.x
 vector      | 0.5.x
```

### 2. Tables Created
```sql
SELECT tablename
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;
```

Expected output: 13 tables
```
audit_logs
document_embeddings
drivers
exceptions
invoices
leasing_artifacts
organizations
quotes
shipment_status_history
shipments
users
vehicles
webhooks_received
```

### 3. RLS Enabled
```sql
SELECT
  tablename,
  row_security
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;
```

Expected: `row_security = true` for all tables

### 4. Indexes Created
```sql
SELECT
  schemaname,
  tablename,
  indexname
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;
```

Expected: 40+ indexes

### 5. Test RLS Context
```sql
-- Set context
SELECT set_request_context(
  'de8f8c8f-6c8f-4c8f-8c8f-8c8f8c8f8c8f'::uuid,
  'ae8f8c8f-6c8f-4c8f-8c8f-8c8f8c8f8c8f'::uuid
);

-- Verify
SELECT current_setting('app.org_id', true);
SELECT current_setting('app.user_id', true);
```

### 6. Test Vector Search
```sql
-- This should work (returns function)
SELECT proname
FROM pg_proc
WHERE proname = 'search_documents';
```

## Troubleshooting

### Error: "extension does not exist"
**Solution**: Enable extensions manually first
```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "vector";
```

Then re-run migration.

### Error: "permission denied"
**Solution**: You might not be using service role key
- Verify you're connected with admin credentials
- Check Supabase dashboard → Settings → Database → Connection string

### Error: "table already exists"
**Solution**: Migration already ran
- Check existing tables: `\dt` or via dashboard
- Skip migration or drop tables first (⚠️ dangerous)

### Error: "vector dimension mismatch"
**Solution**: OpenAI ada-002 uses 1536 dimensions
- If using different model, update `vector(1536)` to match

## Post-Migration Setup

### 1. Create First Organization
```sql
INSERT INTO organizations (name, slug, features)
VALUES (
  'Southern Haulers',
  'southern-haulers',
  '{"portpro_enabled": false, "agents_enabled": false}'::jsonb
)
RETURNING id;
```

### 2. Create Admin User
```sql
-- Replace ORG_ID with result from step 1
INSERT INTO users (org_id, email, role, first_name, last_name)
VALUES (
  'YOUR_ORG_ID'::uuid,
  'admin@southernhaulers.net',
  'admin',
  'Admin',
  'User'
)
RETURNING id;
```

### 3. Test Data Isolation (RLS)
```sql
-- Set context to org 1
SELECT set_request_context('YOUR_ORG_ID'::uuid, 'YOUR_USER_ID'::uuid);

-- Query should only return data for this org
SELECT * FROM shipments;
SELECT * FROM drivers;
```

## Next Steps

After migration is applied:

1. ✅ Verify all tables created
2. ✅ Test RLS policies
3. ✅ Create seed data (orgs, users)
4. ✅ Build Supabase client package (`packages/db`)
5. ✅ Implement API routes
6. ✅ Create UI components

## Rollback (Emergency Only)

If you need to rollback:

```sql
-- ⚠️ WARNING: This deletes ALL data
DROP TABLE IF EXISTS document_embeddings CASCADE;
DROP TABLE IF EXISTS webhooks_received CASCADE;
DROP TABLE IF EXISTS exceptions CASCADE;
DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS leasing_artifacts CASCADE;
DROP TABLE IF EXISTS invoices CASCADE;
DROP TABLE IF EXISTS quotes CASCADE;
DROP TABLE IF EXISTS shipment_status_history CASCADE;
DROP TABLE IF EXISTS shipments CASCADE;
DROP TABLE IF EXISTS vehicles CASCADE;
DROP TABLE IF EXISTS drivers CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS organizations CASCADE;

DROP FUNCTION IF EXISTS search_documents CASCADE;
DROP FUNCTION IF EXISTS set_request_context CASCADE;
DROP FUNCTION IF EXISTS update_shipment_status_fn CASCADE;
DROP FUNCTION IF EXISTS prevent_modification CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column CASCADE;
```

## Support

If you encounter issues:
1. Check Supabase dashboard logs
2. Review error messages carefully
3. Consult Supabase docs: https://supabase.com/docs
4. PostGIS docs: https://postgis.net
5. pgvector docs: https://github.com/pgvector/pgvector

---

**Migration Created**: 2025-10-23
**Total Tables**: 13
**Total Indexes**: 40+
**Extensions**: 3 (uuid-ossp, postgis, vector)
**RLS Policies**: 13 (all tables protected)
**Status**: ✅ Ready to Apply
