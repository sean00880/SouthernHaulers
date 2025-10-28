
# Southern Haulers Deployment Guide

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Installation](#installation)
4. [Development](#development)
5. [Building for Production](#building-for-production)
6. [Deployment Platforms](#deployment-platforms)
7. [Environment Variables](#environment-variables)
8. [Database Migrations](#database-migrations)
9. [CDN and Asset Optimization](#cdn-and-asset-optimization)
10. [Monitoring and Analytics](#monitoring-and-analytics)
11. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying Southern Haulers, ensure you have:

- **Node.js**: v18+ or v20+ (LTS recommended)
- **pnpm**: v8+ (package manager)
- **Git**: For version control
- **Supabase Account**: For database and authentication
- **Vercel/Netlify Account**: For hosting (recommended)
- **Domain**: Custom domain (optional but recommended)

---

## Environment Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/SouthernHaulers.git
cd SouthernHaulers
```

### 2. Install Dependencies

```bash
# Install pnpm if not already installed
npm install -g pnpm

# Install project dependencies
pnpm install
```

### 3. Environment Variables

Create a `.env.local` file in `apps/web/`:

```bash
# apps/web/.env.local

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Analytics (Optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_HOTJAR_ID=your_hotjar_id

# Contact Form
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=dispatch@southern-haulers.com

# Quote System
QUOTE_NOTIFICATION_EMAIL=quotes@southern-haulers.com

# Tracking System
TRACKING_API_KEY=your_tracking_api_key
```

---

## Installation

### Development Dependencies

```bash
# Install all dependencies
pnpm install

# Install Tailark components (if needed)
pnpm dlx shadcn@latest add button input card navigation-menu

# Install additional packages
pnpm add framer-motion @tanstack/react-query
```

---

## Development

### Running the Development Server

```bash
# Navigate to web app
cd apps/web

# Start development server
pnpm dev
```

The application will be available at `http://localhost:3000`.

### Development Commands

```bash
# Run development server
pnpm dev

# Run type checking
pnpm type-check

# Run linting
pnpm lint

# Run tests
pnpm test

# Format code
pnpm format
```

---

## Building for Production

### 1. Run Production Build

```bash
# Build the application
pnpm build

# Test production build locally
pnpm start
```

### 2. Optimize Images

Before building, ensure all images are optimized:

```bash
# Install sharp for image optimization
pnpm add sharp

# The build process will automatically optimize images
```

### 3. Analyze Bundle Size

```bash
# Install bundle analyzer
pnpm add -D @next/bundle-analyzer

# Analyze bundle
pnpm analyze
```

---

## Deployment Platforms

### Vercel (Recommended)

Vercel provides the best experience for Next.js applications.

#### Automatic Deployment

1. **Connect Repository**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your Git repository

2. **Configure Build Settings**:
   - Framework Preset: Next.js
   - Build Command: `pnpm build`
   - Output Directory: `.next`
   - Install Command: `pnpm install`

3. **Environment Variables**:
   - Add all variables from `.env.local`
   - Mark sensitive variables as encrypted

4. **Deploy**:
   - Click "Deploy"
   - Vercel will automatically build and deploy

#### Manual Deployment

```bash
# Install Vercel CLI
pnpm add -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

#### Custom Domain Setup

```bash
# Add domain via Vercel CLI
vercel domains add southern-haulers.com

# Or via Vercel Dashboard:
# 1. Go to Project Settings > Domains
# 2. Add your custom domain
# 3. Configure DNS records
```

### Netlify

#### Netlify Configuration

Create `netlify.toml` in project root:

```toml
[build]
  command = "pnpm build"
  publish = "apps/web/.next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

#### Deploy to Netlify

```bash
# Install Netlify CLI
pnpm add -g netlify-cli

# Login
netlify login

# Initialize site
netlify init

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

### Self-Hosted (Docker)

#### Dockerfile

```dockerfile
# apps/web/Dockerfile

FROM node:20-alpine AS base
RUN npm install -g pnpm

FROM base AS dependencies
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS build
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN pnpm build

FROM base AS deploy
WORKDIR /app
ENV NODE_ENV production
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

#### Build and Run Docker Container

```bash
# Build image
docker build -t southern-haulers:latest -f apps/web/Dockerfile .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=your_url \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key \
  southern-haulers:latest
```

---

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | `https://abc123.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | `eyJhbGc...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | `eyJhbGc...` |
| `NEXT_PUBLIC_APP_URL` | Application URL | `https://southern-haulers.com` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics ID | - |
| `NEXT_PUBLIC_HOTJAR_ID` | Hotjar tracking ID | - |
| `RESEND_API_KEY` | Email service API key | - |
| `CONTACT_EMAIL` | Contact form recipient | - |

---

## Database Migrations

### Supabase Migrations

```bash
# Install Supabase CLI
pnpm add -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push

# Generate TypeScript types
supabase gen types typescript --linked > apps/web/src/types/database.ts
```

---

## CDN and Asset Optimization

### Image Optimization

Next.js automatically optimizes images. For additional optimization:

1. **Use Next.js Image Component**:
   ```typescript
   import Image from 'next/image';
   
   <Image
     src="/images/hero.jpg"
     alt="Hero"
     width={1920}
     height={1080}
     priority
   />
   ```

2. **Configure Image Domains**:
   ```typescript
   // next.config.js
   module.exports = {
     images: {
       domains: ['images.unsplash.com', 'images.pexels.com'],
       formats: ['image/webp', 'image/avif'],
     },
   };
   ```

### Static Asset CDN

For Vercel:
- All static assets automatically served via Vercel Edge Network
- Global CDN with 100+ locations

For self-hosted:
- Use Cloudflare CDN
- Configure caching headers in `next.config.js`

---

## Monitoring and Analytics

### Google Analytics

```typescript
// app/layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
    </html>
  )
}
```

### Error Monitoring (Sentry)

```bash
# Install Sentry
pnpm add @sentry/nextjs

# Initialize Sentry
npx @sentry/wizard@latest -i nextjs
```

### Performance Monitoring

Use built-in Next.js analytics:

```typescript
// app/layout.tsx
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
      <SpeedInsights />
      <Analytics />
    </html>
  )
}
```

---

## Troubleshooting

### Build Failures

**Issue**: Build fails with "Module not found" error

**Solution**:
```bash
# Clear cache and reinstall
rm -rf node_modules .next
pnpm install
pnpm build
```

### Image Optimization Errors

**Issue**: Images not loading or optimization fails

**Solution**:
1. Ensure `sharp` is installed: `pnpm add sharp`
2. Check image domains in `next.config.js`
3. Verify image paths are correct

### Environment Variables Not Working

**Issue**: Environment variables undefined in production

**Solution**:
1. Ensure variables are prefixed with `NEXT_PUBLIC_` for client-side access
2. Restart development server after adding new variables
3. Verify variables are set in deployment platform

### Supabase Connection Issues

**Issue**: Cannot connect to Supabase

**Solution**:
1. Verify Supabase URL and keys are correct
2. Check Supabase project is not paused
3. Ensure RLS policies are correctly configured

### Performance Issues

**Issue**: Slow page loads

**Solution**:
1. Run bundle analyzer: `pnpm analyze`
2. Implement code splitting for large components
3. Lazy load below-the-fold content
4. Optimize images (use WebP format)
5. Enable caching headers

---

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test contact form submissions
- [ ] Test quote calculator functionality
- [ ] Verify live container tracking works
- [ ] Check all dynamic routes (services, locations, ports)
- [ ] Test navigation menu on mobile
- [ ] Verify dark mode toggle works
- [ ] Check SEO meta tags on all pages
- [ ] Submit sitemap to Google Search Console
- [ ] Configure analytics tracking
- [ ] Set up error monitoring
- [ ] Test performance with Lighthouse
- [ ] Verify SSL certificate is active
- [ ] Set up automated backups
- [ ] Configure monitoring alerts

---

## Support and Maintenance

### Regular Maintenance Tasks

- **Weekly**: Review error logs and fix critical issues
- **Monthly**: Update dependencies and security patches
- **Quarterly**: Review and optimize performance
- **Annually**: Update content and refresh images

### Updating Dependencies

```bash
# Check for updates
pnpm outdated

# Update all dependencies
pnpm update

# Update specific package
pnpm update next

# Update to latest major versions
pnpm update --latest
```

### Backup Strategy

1. **Database**: Supabase automatic backups (daily)
2. **Code**: Git repository with branch protection
3. **Environment Variables**: Secure storage in deployment platform
4. **Assets**: Backup images to cloud storage

---

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Deployment Docs](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [ShadCN UI Components](https://ui.shadcn.com)

---

*Last Updated: October 28, 2025*
*Deployment Guide Version: 1.0*
*Maintained By: Southern Haulers Development Team*

