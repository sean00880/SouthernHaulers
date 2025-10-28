# Vercel UI Configuration Guide

**Date**: 2025-10-27
**Issue**: Next.js version detection failing in monorepo structure
**Solution**: Configure Root Directory via Vercel UI

## Problem

Vercel's build commands in `vercel.json` were preventing proper Next.js version detection. The error was:

```
Warning: Could not identify Next.js version, ensure it is defined as a project dependency.
Error: No Next.js version detected.
```

Even though Next.js 14.2.0 is properly defined in `apps/web/package.json`, Vercel couldn't detect it due to custom install commands.

## Solution: Configure via Vercel UI

Instead of using `vercel.json` to define build commands, configure the project settings directly in Vercel's dashboard.

### Step-by-Step Instructions

1. **Go to Vercel Dashboard**
   - Navigate to https://vercel.com/dashboard
   - Select the `southern-haulers` project

2. **Open Project Settings**
   - Click on **Settings** tab at the top

3. **Configure Root Directory**
   - Scroll to **Root Directory** section
   - Click **Edit**
   - Enter: `apps/web`
   - Click **Save**

4. **Verify Framework Detection**
   - Vercel should now automatically detect:
     - **Framework Preset**: Next.js
     - **Build Command**: `npm run build` (or `next build`)
     - **Output Directory**: `.next`
     - **Install Command**: `npm install`

5. **Deploy Settings (Optional)**
   - Scroll to **Build & Development Settings**
   - Verify or set:
     - **Framework Preset**: Next.js
     - **Node.js Version**: 20.x (recommended)

6. **Trigger Redeploy**
   - Go back to **Deployments** tab
   - Click **Redeploy** on the latest deployment
   - Or make a small commit to trigger automatic deployment

### Expected Result

After configuring the Root Directory to `apps/web`, Vercel will:

1. ✅ Change working directory to `apps/web/` before running commands
2. ✅ Find `package.json` with Next.js 14.2.0 in dependencies
3. ✅ Successfully detect Next.js framework
4. ✅ Run `npm install` (installs all deps including Next.js)
5. ✅ Run `npm run build` (executes `next build`)
6. ✅ Deploy the `.next/` output directory
7. ✅ Serve your app at https://southern-haulers.vercel.app/

## Alternative: Environment Variables (If Needed)

If you need to set environment variables:

1. Go to **Settings** → **Environment Variables**
2. Add any required variables for your app
3. Click **Save**

Currently, your app doesn't require environment variables for the landing page, but you may need them for:
- `NEXT_PUBLIC_SITE_URL`
- Database connections (when implemented)
- Third-party API keys (when implemented)

## Why This Approach?

**Pros of UI Configuration:**
- Vercel's framework detection works correctly
- No conflicts with custom commands
- Easier to modify without code changes
- Better integration with Vercel's build system

**Cons of vercel.json Approach:**
- Custom commands can interfere with framework detection
- Harder to debug when things go wrong
- Less flexible for monorepo structures

## Current vercel.json

We've simplified `vercel.json` to just:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json"
}
```

This minimal config allows Vercel to use its default detection with the Root Directory setting from the UI.

## Verification Steps

After configuring and redeploying:

1. **Check Build Logs**
   - Should see "Detected Next.js version: 14.2.0"
   - Build should complete successfully

2. **Test Deployed Site**
   - Visit https://southern-haulers.vercel.app/
   - Should show landing page (not 404)
   - Test service pages:
     - `/services/drayage`
     - `/services/agricultural`
     - `/services/warehousing`
     - `/services/refrigerated`
     - `/about/safety`

3. **Check Performance**
   - Run Lighthouse audit
   - Verify Core Web Vitals
   - Check structured data in Google Rich Results Test

## Troubleshooting

### Still Getting 404?

If you still see a 404 after configuring Root Directory:

1. **Verify the Root Directory setting saved correctly**
   - Go to Settings → General → Root Directory
   - Should show `apps/web`

2. **Check build logs for errors**
   - Look for any error messages during build
   - Verify "Detected Next.js" message appears

3. **Try clearing Vercel cache**
   - Go to Deployments
   - Click ⋮ (three dots) on latest deployment
   - Select "Clear Cache and Redeploy"

### Build Still Failing?

If the build fails with the Root Directory set:

1. **Check package.json paths**
   - Verify `apps/web/package.json` exists
   - Verify Next.js is in dependencies

2. **Check for missing files**
   - Verify `apps/web/next.config.js` exists
   - Verify `apps/web/postcss.config.js` exists
   - Verify `apps/web/tailwind.config.js` exists

3. **Check Node.js version**
   - Try setting Node.js version to 20.x in project settings
   - Some dependencies may require specific Node versions

## Support

If you continue to experience issues after following this guide:

1. Share the latest Vercel build logs
2. Verify the Root Directory setting is saved
3. Check if there are any error messages in the Vercel dashboard

## Related Documentation

- `/docs/VERCEL_DEPLOYMENT_FIXES.md` - Previous deployment fixes
- `/docs/LANDING_PAGE_IMPLEMENTATION_SUMMARY.md` - Landing page details
- Vercel Docs: https://vercel.com/docs/projects/overview#root-directory

---

**Last Updated**: 2025-10-27
**Status**: Configuration Pending
**Next Step**: Configure Root Directory in Vercel UI to `apps/web`
