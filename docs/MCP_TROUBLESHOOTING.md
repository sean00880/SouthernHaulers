# MCP Server Troubleshooting
**Date**: 2025-10-23
**Issue**: Supabase MCP server not loading

## Current Status

From `/mcp list` output:
```
✔ connected: github, perplexity
◯ connecting: context7, firecrawl, redis
❌ missing: supabase, postgres
```

## File Location Check

Claude Code looks for MCP config in this order:
1. **User config**: `C:\Users\Sean Dwivedi\.claude.json` (global)
2. **Project config**: `.mcp.json` in project root (✅ we created this)
3. **Local config**: `C:\Users\Sean Dwivedi\.claude.json` with project scope

## Solution: Add to User Config

The most reliable approach is to add Supabase MCP to your **user-level** config:

### Step 1: Open User Config
```
File location: C:\Users\Sean Dwivedi\.claude.json
```

### Step 2: Add Supabase MCP Section

Edit the `mcpServers` section to include:

```json
{
  "mcpServers": {
    "supabase-southernhaulers": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server-supabase@latest"],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "sb_secret_kbozMX-f9akjXet3WS2VIA_QI0yanAh",
        "SUPABASE_URL": "https://mbbvmtspkotbamorqkml.supabase.co",
        "SUPABASE_PROJECT_REF": "mbbvmtspkotbamorqkml"
      }
    },
    "postgres-southernhaulers": {
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

**Note**: I added `-southernhaulers` suffix to avoid conflicts with other projects.

### Step 3: Reload MCP
```
Type: /mcp reload
```

## Alternative: Manual Connection Test

If MCP still doesn't work, we can proceed without it using direct Supabase access:

### Option 1: Supabase CLI
```bash
npm install -g supabase
supabase login
supabase link --project-ref mbbvmtspkotbamorqkml
```

### Option 2: Direct SQL via Node
```bash
cd apps/web
node -e "
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  'https://mbbvmtspkotbamorqkml.supabase.co',
  'sb_secret_kbozMX-f9akjXet3WS2VIA_QI0yanAh',
  { auth: { persistSession: false } }
);
supabase.rpc('version').then(console.log);
"
```

### Option 3: Supabase Dashboard
1. Go to: https://supabase.com/dashboard/project/mbbvmtspkotbamorqkml
2. Navigate to **SQL Editor**
3. Run queries directly

## What We Can Do Without MCP

Even without MCP tools, we can proceed with development:

### 1. Create Migration Files Locally
```bash
mkdir -p supabase/migrations
# Create SQL files manually
```

### 2. Apply Migrations via Dashboard
- Copy SQL from migration files
- Run in Supabase SQL Editor

### 3. Use Supabase Client Directly
```typescript
// packages/db/src/client.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
```

## Next Steps

Choose one path:

### Path A: Fix MCP (Recommended for Development Velocity)
1. Add to user config (`C:\Users\Sean Dwivedi\.claude.json`)
2. Reload MCP
3. Use MCP tools for rapid iteration

### Path B: Proceed Without MCP (Works, but slower)
1. Create migrations manually
2. Apply via Supabase Dashboard
3. Test with Supabase client
4. Continue development

## Status

**Current Decision**: Let's proceed with **Path B** and continue building while MCP setup is resolved in parallel.

We can still accomplish:
- ✅ Create database schema files
- ✅ Write migration SQL
- ✅ Apply migrations via dashboard
- ✅ Build packages (db, auth, ui)
- ✅ Create API routes
- ✅ Implement features

**MCP is a nice-to-have, not a blocker.**

---

**Ready to continue?** Let me know if you want to:
1. Try fixing MCP config (I can guide you)
2. Proceed with development without MCP (I'll create migrations manually)
