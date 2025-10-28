# Testing Supabase MCP Server
**Date**: 2025-10-23
**Project**: Southern Haulers TMS

## Current Status

❌ **MCP Server Not Loaded** - The Supabase MCP tools are not currently available.

## Why This Happens

The MCP server configuration was just updated with new credentials. Claude Code needs to be restarted for the new MCP server to initialize.

## How to Restart MCP Servers

### Option 1: Restart Claude Code (Recommended)
1. Close this Claude Code window
2. Reopen Claude Code
3. MCP servers will auto-initialize with new config

### Option 2: Reload Window (VS Code)
1. Press `Ctrl+Shift+P` (Windows) or `Cmd+Shift+P` (Mac)
2. Type "Developer: Reload Window"
3. Press Enter
4. MCP servers should reload

### Option 3: Manual MCP Restart
1. Check if there's a restart MCP option in Claude Code settings
2. Look for "Reload MCP Servers" command

## Expected MCP Tools After Restart

Once the Supabase MCP server loads, these tools should be available:

### Supabase MCP Tools
```
✅ list_edge_functions       - List Edge Functions
✅ deploy_edge_function      - Deploy Edge Function
✅ get_anon_key              - Get anonymous key
✅ generate_typescript_types - Generate TypeScript types
✅ search_docs               - Search Supabase docs
✅ get_project_url           - Get project URL
✅ get_advisors              - Get performance advisors
✅ get_logs                  - Get logs
✅ execute_sql               - Execute SQL queries
✅ apply_migration           - Apply database migration
✅ list_migrations           - List migrations
✅ list_extensions           - List Postgres extensions
✅ rebase_branch             - Rebase branch
✅ list_tables               - List database tables
✅ reset_branch              - Reset branch
✅ merge_branch              - Merge branch
✅ delete_branch             - Delete branch
✅ list_branches             - List branches
✅ create_branch             - Create database branch
```

### Postgres MCP Tools
```
✅ query          - Execute SELECT queries
✅ execute        - Execute SQL statements
✅ list_tables    - List all tables
✅ describe_table - Describe table schema
✅ insert         - Insert rows
✅ update         - Update rows
✅ delete         - Delete rows
```

### Redis MCP Tools
```
✅ get      - Get value by key
✅ set      - Set key-value pair
✅ del      - Delete key
✅ exists   - Check if key exists
✅ keys     - List keys by pattern
✅ mget     - Get multiple values
✅ mset     - Set multiple key-value pairs
✅ expire   - Set key expiration
✅ ttl      - Get time to live
✅ flushdb  - Flush database
✅ info     - Get Redis info
✅ ping     - Ping Redis server
```

## Test Script (After Restart)

Once MCP is loaded, run these tests via Claude Code:

### Test 1: Verify Supabase Connection
```
Get project URL and anon key to verify credentials
```

### Test 2: List Database Tables
```
List all tables in the database (should be empty initially)
```

### Test 3: List Postgres Extensions
```
Check if PostGIS and pgvector are enabled
```

### Test 4: Execute Simple SQL
```sql
SELECT version();
```

### Test 5: Check Database Branches
```
List available database branches
```

## Current MCP Configuration

Your `.claude/mcp.json` is configured correctly:

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

## Troubleshooting

### If MCP Still Not Loading

1. **Check NPM/Node Version**
   ```bash
   node --version  # Should be 18+
   npm --version   # Should be 9+
   ```

2. **Check Network Access**
   - Ensure firewall allows connections to Supabase
   - Test connection: `ping mbbvmtspkotbamorqkml.supabase.co`

3. **Check Database Password**
   - Default password is "password"
   - If changed, update in mcp.json

4. **View MCP Logs**
   - Look for Claude Code logs showing MCP initialization
   - Check for error messages

5. **Verify Supabase Project**
   - Visit: https://supabase.com/dashboard/project/mbbvmtspkotbamorqkml
   - Ensure project is active and not paused

### Common Errors

**Error: "Connection refused"**
- Database might be paused (free tier)
- Check Supabase dashboard

**Error: "Authentication failed"**
- Verify SUPABASE_ACCESS_TOKEN is correct
- Check if service role key is still valid

**Error: "Module not found"**
- Run: `npm install -g @supabase/mcp-server-supabase`
- Or wait for npx to download on first use

## Next Steps After MCP Loads

1. ✅ List current database tables
2. ✅ Check enabled extensions
3. ✅ Enable PostGIS extension
4. ✅ Enable pgvector extension
5. ✅ Create first migration
6. ✅ Apply migration
7. ✅ Verify RLS policies

## Manual Testing (Alternative)

If MCP still doesn't work, you can test Supabase directly:

### Via Supabase CLI
```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link project
supabase link --project-ref mbbvmtspkotbamorqkml

# Run SQL
supabase db execute "SELECT version();"
```

### Via Supabase Dashboard
1. Go to: https://supabase.com/dashboard/project/mbbvmtspkotbamorqkml
2. Navigate to **SQL Editor**
3. Run test queries

### Via Direct PostgreSQL Connection
```bash
# Using psql
psql postgresql://postgres:password@db.mbbvmtspkotbamorqkml.supabase.co:5432/postgres

# Run query
SELECT version();
```

## Success Criteria

✅ MCP server loads without errors
✅ Can list database tables
✅ Can execute SQL queries
✅ Can list extensions
✅ PostGIS and pgvector visible (or can be enabled)

---

**Status**: ⏳ Awaiting MCP server restart
**Action Required**: Restart Claude Code or reload window
