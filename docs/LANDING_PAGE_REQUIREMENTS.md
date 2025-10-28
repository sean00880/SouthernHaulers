# Southern Haulers Landing Page Requirements

> **Last Updated**: 2025-10-27
> **Status**: In Development
> **Ref**: CLAUDE.md North Star - Scale to $1B+/month via programmatic SEO & agentic ops

## Executive Summary

Transform Southern Haulers landing page into a high-converting, SEO-optimized growth engine that:
- Converts at ≥2× industry baseline for drayage/trucking
- Generates programmatic SEO surfaces for state/city targeting
- Integrates Harris Brokerage 3PL partnership
- Demonstrates SOTA UX with WCAG 2.1 AA compliance
- Achieves Core Web Vitals: LCP ≤2.5s, CLS ≤0.1, INP ≤200ms

## Business Context

**Company Structure:**
- **Southern Haulers**: Asset-based trucking company (drayage, agricultural, warehousing)
- **Harris Brokerage**: 3PL sister company that tenders loads to Southern Haulers
- **TMS**: Migrating from Port TMS to Port Pro (January 2025)

**Geographic Coverage:**
- Primary: South Georgia (Tifton area)
- Ports: Savannah (GA), Charleston (SC), Jacksonville (FL)
- Lanes: Agricultural Southeast + port drayage corridors

## Current State Analysis

### Existing Strengths
- ✅ Modern SOTA design (Next.js App Router, Tailwind, Radix UI, shadcn)
- ✅ Interactive components (AnimatedCounter, PortCoverageMap, QuoteCalculator, TrackingDemo, TerminalStatus)
- ✅ Comprehensive landing page sections
- ✅ Strong compliance messaging (FMCSA, TWIC, Truth-in-Leasing, 49 CFR 376)
- ✅ One detailed service page (`/services/drayage`)

### Identified Gaps
- ❌ Missing service pages for existing links
- ❌ No Harris Brokerage 3PL integration mention
- ❌ Limited service depth for programmatic SEO
- ❌ No JSON-LD structured data for LocalBusiness schema
- ❌ No programmatic state/city pages yet

## Service Catalog

### Core Services (Priority 1)

#### 1. Container Drayage ✅
**Status**: Page exists (`/services/drayage`)
- Port-to-door and door-to-port
- Multi-port coverage (Savannah, Charleston, Jacksonville)
- Automated eModal appointment scheduling
- Live GPS tracking
- 300+ container storage capacity

#### 2. Agricultural Hauling
**Status**: Needs page (`/services/agricultural`)
- Bulk agricultural transport (peanuts, pecans, cotton, feed, fertilizer)
- Specialized commodity handling equipment
- USDA compliance and food-grade standards
- Hopper bottom, dump trailers, curtain-side vans
- Seasonal capacity surge management

**Key Differentiators:**
- Regional expertise in Southeast agricultural corridors
- Farm-to-facility and facility-to-port lanes
- Understanding of harvest season timing

#### 3. Warehousing & Transloading
**Status**: Needs page (`/services/warehousing`)
- 300+ container storage capacity
- On-site transloading and cross-docking
- Container devanning and palletization
- LTL consolidation services
- Short-term and long-term storage
- TMF/per-diem cost avoidance

**Key Differentiators:**
- Co-located with South Georgia agricultural hub
- Direct port access for drayage-to-warehouse pipelines
- Flexible storage pricing (daily, weekly, monthly)

#### 4. Refrigerated Transport
**Status**: Needs page (`/services/refrigerated`)
- Temperature-controlled drayage (reefer containers)
- Perishable agricultural products (produce, meats, dairy)
- Continuous temperature monitoring
- FSMA compliance and cold chain documentation
- Genset-equipped chassis for extended holds

**Key Differentiators:**
- Agricultural cold chain expertise
- Port-to-warehouse-to-distribution reefer services
- Temperature event logging and alerts

#### 5. Safety & Compliance
**Status**: Needs page (`/about/safety`)
- FMCSA compliance (DOT, MC authority)
- TWIC certification for all port drivers
- Truth-in-Leasing agreements (49 CFR Part 376)
- HOS/ELD compliance summaries
- FMCSA Clearinghouse consent procedures
- Comprehensive cargo and liability insurance
- Driver qualification files and annual reviews

### Expanded Services (Priority 2 - Optional)

#### 6. Flatbed & Heavy Haul
**Status**: Future consideration
- Oversized agricultural equipment transport
- Construction materials and steel hauling
- Permit coordination for wide/heavy loads

#### 7. Expedited Freight
**Status**: Future consideration
- Time-critical shipments
- Team driver operations
- Guaranteed delivery windows

#### 8. LTL & FTL Shipping (via Harris Brokerage)
**Status**: Future consideration
- Full truckload and less-than-truckload brokerage
- Carrier network via Harris Brokerage partnership
- Nationwide coverage beyond Southern Haulers footprint

#### 9. White Glove Delivery
**Status**: Future consideration
- High-value cargo handling
- Inside delivery and installation
- Specialized equipment and insurance

## Landing Page Enhancement Strategy

### Hero Section Improvements
- **Current**: Good hero with animated gradient, stats badges, dual CTAs
- **Enhancement**: Add Harris Brokerage partnership badge/mention
- **Enhancement**: Add "Powered by PortPro TMS" badge (post-migration)
- **Enhancement**: Consider video background or port terminal imagery

### Service Cards Enhancement
- **Current**: 6 service cards with hover effects and "Learn more" links
- **Enhancement**: Ensure all links resolve to proper pages (Priority 1 task)
- **Enhancement**: Add service icons from Lucide React
- **Enhancement**: Add "Popular" or "Featured" badges to top services

### Harris Brokerage Integration
- **New Section**: "Integrated 3PL Services via Harris Brokerage"
- **Content**:
  - "Southern Haulers is the asset-based carrier arm of Harris Brokerage, a full-service 3PL"
  - "Seamless tender/dispatch between brokerage and carrier operations"
  - "Access to nationwide carrier network for out-of-footprint lanes"
- **CTA**: "Contact Harris Brokerage for 3PL services"

### Programmatic SEO Foundation
- **State Pages**: `/usa/georgia`, `/usa/south-carolina`, `/usa/florida`
- **City Pages**: `/usa/georgia/tifton`, `/usa/georgia/savannah`, `/usa/south-carolina/charleston`, `/usa/florida/jacksonville`
- **Service+Location Pages**: `/services/drayage/savannah`, `/services/agricultural/georgia`
- **JSON-LD**: LocalBusiness schema with multi-location markup

### SEO Metadata Optimization
```typescript
// Recommended metadata structure
export const metadata: Metadata = {
  title: 'Southern Haulers | Container Drayage & Agricultural Hauling | GA, SC, FL',
  description: 'Southern Haulers: Premier container drayage, agricultural hauling, and warehousing across the Southeast. 300+ container capacity, TWIC-certified drivers, Savannah-Charleston-Jacksonville port coverage.',
  keywords: [
    'container drayage',
    'agricultural hauling',
    'port of savannah drayage',
    'charleston harbor drayage',
    'jaxport drayage',
    'georgia trucking',
    'south georgia carrier',
    'container storage',
    'transloading services',
    'reefer container transport'
  ],
  openGraph: {
    title: 'Southern Haulers | Container Drayage & Agricultural Hauling',
    description: '300+ container capacity. TWIC-certified. Savannah, Charleston, Jacksonville port coverage.',
    images: ['/og-southern-haulers.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Southern Haulers | Container Drayage & Agricultural Hauling',
    description: 'Premier drayage and agricultural hauling in the Southeast.',
  },
};
```

## Component Requirements

### Service Page Template
**Location**: `apps/web/app/services/[slug]/page.tsx` (dynamic route)

**Sections**:
1. Hero (service-specific headline, description, dual CTAs)
2. Key Benefits (3-6 benefit cards with icons)
3. Service Details (expanded description with bullet lists)
4. Service-Specific Features (tables, stats, coverage maps)
5. Related Services (3 service cards)
6. FAQ (service-specific questions)
7. CTA (quote + contact buttons)

**Reusable Components**:
- `ServiceHero` - Hero template with service icon, title, description
- `ServiceBenefitCard` - Benefit card with icon, title, description
- `ServiceDetailSection` - Markdown-friendly detail section
- `RelatedServices` - Grid of 3 related service cards
- `ServiceFAQ` - Accordion FAQ component

### JSON-LD Structured Data Component
**Location**: `apps/web/components/structured-data.tsx`

**Schema Types**:
- `Organization` - Southern Haulers company info
- `LocalBusiness` - Primary location (Tifton, GA)
- `Service` - Each service offering
- `FAQPage` - FAQ structured data
- `BreadcrumbList` - Navigation breadcrumbs

**Example**:
```typescript
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Southern Haulers",
  "alternateName": "Souther Haulers",
  "url": "https://southernhaulers.net",
  "logo": "https://southernhaulers.net/logo.png",
  "sameAs": [
    "https://www.facebook.com/southernhaulers",
    "https://www.linkedin.com/company/southern-haulers"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-XXX-XXX-XXXX",
    "contactType": "customer service",
    "availableLanguage": "en"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Tifton",
    "addressRegion": "GA",
    "postalCode": "XXXXX",
    "addressCountry": "US"
  }
};
```

## Quality Bars (from CLAUDE.md)

### Performance
- **LCP**: ≤2.5s (currently animated hero may impact)
- **CLS**: ≤0.1 (ensure animated components don't shift layout)
- **INP**: ≤200ms (interactive quote calculator, tracking demo)
- **API Latency**: p95 < 250ms (quote submission, tracking lookup)

### Accessibility
- **WCAG Level**: 2.1 AA
- **Focus Management**: Keyboard navigation through all interactive elements
- **Color Contrast**: Minimum 4.5:1 for body text, 3:1 for large text
- **Motion**: Respect `prefers-reduced-motion` for animations

### SEO
- **Meta Tags**: Title, description, OG, Twitter Card on all pages
- **Semantic HTML**: Proper heading hierarchy (h1 → h2 → h3)
- **Internal Linking**: Breadcrumbs, related services, footer sitemap
- **Structured Data**: JSON-LD on all service pages

### Conversion Optimization
- **Above-the-Fold CTA**: Request Quote button visible without scroll
- **Trust Signals**: Stats, certifications, testimonials early in page
- **Social Proof**: Customer testimonials with company names
- **Friction Reduction**: Simple quote form (max 5 fields on initial screen)

## Implementation Priority

### Phase 1: Core Service Pages (This Task)
1. ✅ Analyze current state and create requirements doc
2. Create `/services/agricultural` page
3. Create `/services/warehousing` page
4. Create `/services/refrigerated` page
5. Create `/about/safety` page
6. Enhance landing page with Harris Brokerage integration
7. Add JSON-LD structured data to all pages

### Phase 2: Programmatic SEO (Future)
1. Create state page template (`/usa/[state]/page.tsx`)
2. Create city page template (`/usa/[state]/[city]/page.tsx`)
3. Generate static params for GA, SC, FL states
4. Generate city pages for major cities (Tifton, Savannah, Charleston, Jacksonville, Atlanta, etc.)
5. Create dynamic sitemap generation (`/sitemap.xml`, `/sitemap-services.xml`, `/sitemap-locations.xml`)
6. OG image generation for location pages

### Phase 3: Advanced Features (Future)
1. Quote Calculator v2 with lane-based pricing
2. Real-time terminal status integration (eModal API)
3. Driver recruiting application integration
4. Customer portal login integration
5. Live chat / AI assistant

## Success Metrics

### Traffic
- **Organic Search**: Target 10,000+ monthly organic sessions within 6 months
- **Direct Traffic**: Target 2,000+ monthly direct sessions (brand searches)
- **Referral Traffic**: Target 500+ monthly referrals (Harris Brokerage, industry sites)

### Engagement
- **Bounce Rate**: Target <50% (industry average ~60%)
- **Pages/Session**: Target >2.5 pages
- **Session Duration**: Target >2 minutes
- **Quote Form Starts**: Target 5% of sessions
- **Quote Form Completions**: Target 50% of starts (2.5% overall conversion)

### Conversions
- **Quote Requests**: Target 100+ qualified quotes/month
- **Phone Calls**: Target 50+ inbound calls/month
- **Driver Applications**: Target 20+ applications/month

## Technical Stack

**Framework**: Next.js 14 (App Router)
**Styling**: Tailwind CSS + Radix UI + shadcn
**Language**: TypeScript (strict mode)
**Package Manager**: npm (monorepo workspace)
**Linting**: ESLint + Prettier
**Testing**: Vitest (unit) + Playwright (E2E)
**Analytics**: Google Analytics 4 + PostHog (optional)
**SEO**: Next.js metadata API + JSON-LD + sitemaps

## Acceptance Criteria

### Functional
- [ ] All 4 service page links resolve to proper pages
- [ ] All service pages follow consistent template structure
- [ ] All pages have proper metadata (title, description, OG)
- [ ] All pages have JSON-LD structured data
- [ ] Harris Brokerage integration section added to landing page
- [ ] All internal links are valid (no 404s)

### Non-Functional
- [ ] LCP < 2.5s on 3G connection
- [ ] CLS < 0.1 across all pages
- [ ] WCAG 2.1 AA compliance verified via Lighthouse
- [ ] All images have proper alt text
- [ ] Keyboard navigation works across all interactive elements
- [ ] Dark mode support works correctly
- [ ] Mobile responsive on 320px+ screens

### SEO
- [ ] Google Search Console indexed all pages
- [ ] Lighthouse SEO score >90 on all pages
- [ ] Structured data validates in Google Rich Results Test
- [ ] Sitemap generated and submitted to Google
- [ ] robots.txt configured correctly

---

**Built with ❤️ by the GROWSZ team**
**Southern Haulers: Premier drayage & agricultural hauling in the Southeast**
