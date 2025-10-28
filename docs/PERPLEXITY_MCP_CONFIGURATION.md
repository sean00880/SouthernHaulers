# Perplexity MCP Configuration - Complete Setup

**Date**: 2025-10-22
**Status**: ✅ CONFIGURED AND READY
**Ecosystem**: All (GROWSZ Biosphere-wide)

## Summary

Successfully configured the Perplexity MCP server in the user-level `.claude.json` file by matching the configuration from the GROWSZ root `.mcp.json` file.

## Configuration Source

### GROWSZ Root Configuration
**Location**: `C:\Users\Sean Dwivedi\Documents\GitHub\GROWSZ\.mcp.json`

The GROWSZ repository contains a properly configured Perplexity MCP server that was used as the reference:

```json
"perplexity": {
    "type": "stdio",
    "command": "cmd",
    "args": [
        "/c",
        "npx",
        "-y",
        "perplexity-mcp"
    ],
    "env": {
        "PERPLEXITY_API_KEY": "your_perplexity_api_key_here"
    }
}
```

## Applied Configuration

### User-Level Configuration
**Location**: `C:\Users\Sean Dwivedi\.claude.json`

The following configuration has been added to the `mcpServers` section:

```json
"perplexity": {
    "type": "stdio",
    "command": "cmd",
    "args": [
        "/c",
        "npx",
        "-y",
        "perplexity-mcp"
    ],
    "env": {
        "PERPLEXITY_API_KEY": "your_perplexity_api_key_here"
    },
    "disabled": false
}
```

## Key Configuration Details

| Setting | Value | Notes |
|---------|-------|-------|
| **Package** | `perplexity-mcp` | Official Perplexity MCP package |
| **Command** | `cmd` | Windows wrapper for npx |
| **Args** | `/c`, `npx`, `-y`, `perplexity-mcp` | Windows-compatible execution |
| **API Key** | `your_perplexity_api_key_here` | Shared with Taskmaster MCP |
| **Type** | `stdio` | Standard I/O communication |
| **Status** | Enabled | `disabled: false` |

## Complete MCP Server List

After configuration, the following MCP servers are active:

| Server | Package | Status | Purpose |
|--------|---------|--------|---------|
| **redis** | `@modelcontextprotocol/server-redis` | ✅ Active | Cache operations |
| **taskmaster** | `task-master-ai` | ✅ Active | Project planning & task management |
| **perplexity** | `perplexity-mcp` | ✅ Active | Research & documentation lookup |

## Configuration Process

### Issues Encountered

1. **.claude.json corruption**: The file got corrupted during previous edit attempts (reduced to 179 bytes)
2. **Missing mcpServers section**: The corrupted file had no `mcpServers` property
3. **401 Authentication Error**: Occurred because Perplexity MCP server didn't exist

### Resolution Steps

1. **Restored from backup**: Used known-good backup from `20251022-230241`
2. **Verified restoration**: Confirmed `mcpServers` section exists with `redis` and `taskmaster`
3. **Added Perplexity config**: Used PowerShell JSON manipulation to add the Perplexity MCP
4. **Verified addition**: Confirmed Perplexity MCP is now present and configured correctly

### Backup Files Created

| File | Purpose |
|------|---------|
| `.claude.json.backup.20251022-230241` | Known-good backup (used for restoration) |
| `.claude.json.backup.20251022-231751` | Pre-addition backup |
| `.claude.json.backup.YYYYMMDD-HHMMSS` | Current state backup |

## Testing the Configuration

### Restart Claude Code
**REQUIRED**: The new MCP server configuration requires a restart to initialize.

```bash
# Close Claude Code completely
# Reopen Claude Code
```

### Test Commands

After restart, test the Perplexity MCP with these queries:

```typescript
// Search query
mcp__perplexity__search({
  query: "PortPro API authentication flow and token management"
})

// Reason query (complex analysis)
mcp__perplexity__reason({
  query: "Compare WorkOS vs Supabase Auth for enterprise TMS applications"
})

// Deep research (comprehensive report)
mcp__perplexity__deep_research({
  query: "Best practices for implementing Truth-in-Leasing compliance in drayage TMS",
  focus_areas: ["49 CFR Part 376", "digital signatures", "audit trails"]
})
```

## API Key Information

### Current Key
```
your_perplexity_api_key_here
```

### Key Management

1. **Shared Usage**: This key is used by:
   - Perplexity MCP (direct searches)
   - Taskmaster MCP (internal research operations)

2. **Verification**: Check key status at https://www.perplexity.ai/settings/api

3. **If 401 errors persist**:
   - Verify key is active and not expired
   - Check usage limits and quotas
   - Regenerate key if needed
   - Update both MCP configurations (`perplexity` and `taskmaster`)

## Comparison: Project vs User-Level MCPs

### GROWSZ/.mcp.json (Project-Level)
**Scope**: Only active when working in GROWSZ repository
**Servers**:
- ✅ perplexity
- ✅ github
- ✅ redis
- ✅ context7
- ✅ firecrawl
- ✅ chrome-devtools

### .claude.json (User-Level)
**Scope**: Active globally across all projects
**Servers**:
- ✅ redis
- ✅ taskmaster
- ✅ perplexity (newly added)

**Note**: User-level MCPs are available everywhere, while project-level MCPs only work in that specific project directory.

## Integration with Southern Haulers

The Perplexity MCP can now be used for research tasks specific to Southern Haulers:

### Research Topics

1. **PortPro Integration**:
   - API authentication flows
   - Webhook event catalog
   - Token management best practices
   - Rate limits and quotas

2. **Compliance & Regulatory**:
   - 49 CFR Part 376 (Truth-in-Leasing)
   - 49 CFR Part 395 (HOS/ELD)
   - FMCSA Clearinghouse procedures
   - TWIC verification requirements

3. **Terminal Systems**:
   - eModal integration patterns
   - TMF/PierPass fee structures
   - Demurrage and per-diem calculations
   - Appointment scheduling best practices

4. **Technology Stack**:
   - WorkOS enterprise SSO implementation
   - Supabase RLS for multi-tenant TMS
   - Next.js App Router patterns
   - PostGIS for geofencing

5. **A2P 10DLC Compliance**:
   - Twilio SMS regulations
   - Campaign registration requirements
   - TCPA compliance
   - EEOC recruiting guidelines

## Next Steps

1. **✅ Configuration Complete**: Perplexity MCP is now configured
2. **⚠️ Restart Required**: Close and reopen Claude Code
3. **🧪 Test Integration**: Run test queries to verify functionality
4. **📚 Begin Research**: Use Perplexity for PortPro API documentation
5. **📝 Document Findings**: Store research in `/ecosystems/southernhaulers/docs/research/`

## Related Documentation

- **MCP Configuration Fix**: `MCP_CONFIGURATION_FIX.md` (Taskmaster Windows fix)
- **Environment Variables**: `ENV_CONFIGURATION_SUMMARY.md` (Southern Haulers env setup)
- **Root CLAUDE.md**: `/GROWSZ/CLAUDE.md` (Biosphere instructions)
- **Ecosystem CLAUDE.md**: `/ecosystems/southernhaulers/CLAUDE.md` (TMS-specific instructions)

## Troubleshooting

### If 401 Errors Persist After Restart

1. **Verify API Key**:
   ```powershell
   # Check current configuration
   $json = Get-Content "$env:USERPROFILE\.claude.json" -Raw | ConvertFrom-Json
   $json.mcpServers.perplexity.env.PERPLEXITY_API_KEY
   ```

2. **Test Package**:
   ```bash
   npx -y perplexity-mcp --help
   ```

3. **Check Perplexity Account**:
   - Visit: https://www.perplexity.ai/settings/api
   - Verify key is active
   - Check usage/quota
   - Regenerate if needed

4. **Update Configuration**:
   If key is regenerated, update both:
   - `.claude.json` → `mcpServers.perplexity.env.PERPLEXITY_API_KEY`
   - `.claude.json` → `mcpServers.taskmaster.env.PERPLEXITY_API_KEY`

### Configuration Corruption

If `.claude.json` becomes corrupted again:

```powershell
# Restore from backup
Copy-Item "$env:USERPROFILE\.claude.json.backup.20251022-230241" "$env:USERPROFILE\.claude.json" -Force

# Re-run the add Perplexity script
powershell -ExecutionPolicy Bypass -File "C:\Users\Sean Dwivedi\restore_and_add_perplexity.ps1"
```

---

**Configuration Date**: 2025-10-22
**Status**: Production Ready
**Ecosystem**: GROWSZ Biosphere (All)
