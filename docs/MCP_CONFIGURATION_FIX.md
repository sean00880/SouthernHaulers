# MCP Server Configuration Fix - Windows Compatibility

**Date**: 2025-10-22
**Issue**: Taskmaster MCP Server failing to start on Windows
**Status**: ✅ RESOLVED

## Problem

The Taskmaster MCP Server was configured for Unix/Linux/Mac but not Windows:

```json
"taskmaster": {
  "command": "npx",
  "args": ["-y", "--package=task-master-ai", "task-master-ai"]
}
```

**Error**: `Windows requires 'cmd /c' wrapper to execute npx`

## Solution

Windows requires the `cmd /c` wrapper to execute npx commands through MCP servers:

```json
"taskmaster": {
  "command": "cmd",
  "args": ["/c", "npx", "-y", "--package=task-master-ai", "task-master-ai"],
  "env": {
    "PERPLEXITY_API_KEY": "pplx-***"
  }
}
```

## Applied Fix

The configuration in `C:\Users\Sean Dwivedi\.claude.json` has been updated using string replacement to avoid JSON corruption issues with large config files.

### Files Created

- `fix_taskmaster.ps1` - Automated fix script
- `verify.ps1` - Verification script
- `restore_and_fix.ps1` - Safe restore + fix using regex replacement
- `.claude.json.backup.20251022-230241` - Backup of original configuration

## Verification

```powershell
# Check current configuration
$json = Get-Content "C:\Users\Sean Dwivedi\.claude.json" -Raw | ConvertFrom-Json
Write-Host "Command: $($json.mcpServers.taskmaster.command)"
Write-Host "Args: $($json.mcpServers.taskmaster.args -join ', ')"
```

**Expected Output**:
```
Command: cmd
Args: /c, npx, -y, --package=task-master-ai, task-master-ai
```

## Next Steps

1. **Restart Claude Code** to apply the configuration changes
2. The Taskmaster MCP server should now connect successfully
3. Monitor for any connection issues

## Perplexity MCP Issue

**Separate Issue**: The Perplexity MCP returns a 401 authentication error.

**Root Cause**: The task-master-ai package uses Perplexity API internally via the `PERPLEXITY_API_KEY` environment variable. The 401 error suggests:

1. The API key may be expired or invalid
2. The API key may not have the required permissions
3. Rate limits may have been exceeded

**Recommendation**:
- Verify the Perplexity API key at https://www.perplexity.ai/settings/api
- Check API key permissions and rate limits
- Consider regenerating the API key if issues persist

**Note**: Taskmaster has its own Perplexity integration, so a separate Perplexity MCP server is not required for basic research functionality.

## Windows MCP Configuration Pattern

For **all** MCP servers using npx on Windows, use this pattern:

```json
{
  "server-name": {
    "command": "cmd",
    "args": ["/c", "npx", "-y", "@scope/package-name"],
    "env": { /* environment variables */ }
  }
}
```

## Related Issues

- **Redis MCP**: Already correctly configured with `cmd /c` wrapper
- **Other MCPs**: Supabase, GitHub, Chrome DevTools, etc. should also follow this pattern on Windows

## References

- [Claude Code MCP Documentation](https://docs.claude.com/en/docs/claude-code/mcp)
- [Task-Master-AI on npm](https://www.npmjs.com/package/task-master-ai)
- [Model Context Protocol (MCP) Specification](https://spec.modelcontextprotocol.io/)
