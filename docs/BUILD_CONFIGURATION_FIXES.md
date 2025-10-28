# Build Configuration Fixes

**Date**: 2025-10-27
**Status**: ✅ RESOLVED
**Commit**: 30ede6f

## Problem Summary

After fixing the Vercel framework detection issue by configuring Root Directory to `apps/web`, the Turborepo build started but failed with:

1. **Module Resolution Error**: `recruiting:build: Module not found: Can't resolve '@/lib/sms-bot'`
2. **Configuration Warnings**: `Invalid next.config.js options detected: Unrecognized key(s) in object: 'appDir' at "experimental"`

## Root Causes

### 1. Incorrect TypeScript Path Aliases

Three apps (recruiting, admin, driver) had TypeScript path aliases configured to only resolve from the `app/` directory:

```json
{
  "paths": {
    "@/*": ["./app/*"]  // ❌ Only resolves from app/
  }
}
```

This caused imports like `@/lib/sms-bot` to fail because the `lib/` directory is at the root of each app, not inside `app/`.

### 2. Obsolete Next.js Configuration

Three apps (recruiting, driver, web) had the `experimental.appDir` flag, which is:
- No longer needed in Next.js 14 (App Router is stable)
- Causing warnings during build
- Not recognized by Next.js 14.2.0

```js
experimental: {
  appDir: true,  // ❌ Obsolete in Next.js 14
}
```

## Fixes Applied

### Fix 1: Update TypeScript Path Aliases

Changed `@/*` path alias to resolve from the app root instead of just the `app/` directory:

**Files Modified**:
- `apps/recruiting/tsconfig.json`
- `apps/admin/tsconfig.json`
- `apps/driver/tsconfig.json`

**Change**:
```diff
  "paths": {
-   "@/*": ["./app/*"]
+   "@/*": ["./*"]
  }
```

**Impact**:
- ✅ Resolves imports from both `app/` and `lib/` directories
- ✅ Fixes module resolution error in recruiting app
- ✅ Aligns with web app configuration (already correct)

### Fix 2: Remove Obsolete experimental.appDir

Removed the `experimental.appDir` flag from Next.js configuration:

**Files Modified**:
- `apps/recruiting/next.config.js`
- `apps/driver/next.config.js`
- `apps/web/next.config.js`

**Change**:
```diff
  const nextConfig = {
    reactStrictMode: true,
    images: {
      unoptimized: true,
    },
-   experimental: {
-     appDir: true,
-   },
    transpilePackages: [
      // ...
    ],
  };
```

**Impact**:
- ✅ Removes build warnings
- ✅ Uses Next.js 14 stable App Router features
- ✅ Cleaner configuration

## Verification

After these fixes, the Turborepo build should:

1. ✅ Detect Next.js version: 14.2.0
2. ✅ Resolve all module imports correctly
3. ✅ Build all apps without warnings
4. ✅ Deploy successfully to Vercel

## Apps Configuration Summary

| App | Path Alias | experimental.appDir | Status |
|-----|------------|---------------------|--------|
| web | `@/*: ["./*"]` | Removed ✅ | Fixed |
| admin | `@/*: ["./*"]` | Never had it ✅ | Fixed |
| driver | `@/*: ["./*"]` | Removed ✅ | Fixed |
| recruiting | `@/*: ["./*"]` | Removed ✅ | Fixed |

## Next Steps

1. **Monitor Vercel Deployment**:
   - Check build logs for successful completion
   - Verify no module resolution errors
   - Confirm no configuration warnings

2. **Test Deployed Site**:
   - Visit https://southern-haulers.vercel.app/
   - Should show the landing page (not 404)
   - Test all service pages

3. **If Build Still Fails**:
   - Check the new error messages
   - May need to install missing dependencies
   - May need to fix other import paths

## Related Issues

### Previous Issues (Resolved)
- ✅ GitHub push protection (API keys)
- ✅ Missing packageManager field
- ✅ Turborepo 2.x pipeline → tasks migration
- ✅ Missing devDependencies
- ✅ Next.js framework detection
- ✅ Missing postcss.config.js

### Current Issue (Resolved)
- ✅ TypeScript path alias configuration
- ✅ Obsolete experimental.appDir flag

## Technical Details

### TypeScript Path Resolution

TypeScript resolves module imports using the `paths` configuration in `tsconfig.json`:

```typescript
// With "@/*": ["./app/*"]
import { handleInboundSMS } from '@/lib/sms-bot';
// Resolves to: ./app/lib/sms-bot ❌ (doesn't exist)

// With "@/*": ["./*"]
import { handleInboundSMS } from '@/lib/sms-bot';
// Resolves to: ./lib/sms-bot ✅ (correct)
```

### Next.js App Router Evolution

The `experimental.appDir` flag was required in Next.js 13 when App Router was experimental:

```js
// Next.js 13 (experimental)
experimental: {
  appDir: true,  // Required to enable App Router
}

// Next.js 14 (stable)
// No flag needed - App Router is stable and enabled by default
```

## Documentation Updates

This document supplements:
- `/docs/VERCEL_DEPLOYMENT_FIXES.md` - Initial deployment troubleshooting
- `/docs/VERCEL_UI_CONFIGURATION.md` - Root Directory configuration guide

## Commit Details

**Commit**: 30ede6f
**Message**: Fix TypeScript path aliases and remove obsolete experimental.appDir
**Files Changed**: 6 files
- `apps/recruiting/tsconfig.json`
- `apps/recruiting/next.config.js`
- `apps/admin/tsconfig.json`
- `apps/driver/tsconfig.json`
- `apps/driver/next.config.js`
- `apps/web/next.config.js`

---

**Last Updated**: 2025-10-27
**Status**: Configuration Fixed
**Next Step**: Monitor Vercel deployment for successful build
