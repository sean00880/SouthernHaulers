# Legacy SouthernHaulers.net Analysis
**Date**: 2025-10-23
**Source**: Chrome DevTools MCP Analysis
**URL**: https://www.southernhaulers.net

## Executive Summary

The legacy site is a **Wix-based marketing website** with significant performance issues, no TMS functionality, and basic content. Complete rebuild required to achieve SOTA TMS platform.

## Performance Metrics

**Critical Issues**:
- ⚠️ **Load Time**: 2.53s (Target: <2.5s, barely passing)
- ⚠️ **DOM Content Loaded**: 1.33s
- ⚠️ **First Contentful Paint**: 1.11s (Target: <1.8s for LCP equivalent)
- ⚠️ **Network Requests**: 130 requests (excessive)
- ⚠️ **Resource Count**: 107 resources loaded

**Performance Budget Violations**:
- Far exceeds target of <50 requests for initial page load
- Wix platform overhead adds significant bloat
- No code splitting or optimization visible

## Technical Stack (Legacy)

- **Platform**: Wix (proprietary, non-extendable)
- **Hosting**: Wix CDN (static.wixstatic.com, static.parastorage.com)
- **Fonts**: Google Fonts (Montserrat, Playfair Display, Avenir)
- **Media**: AVIF images (good), but not optimized
- **JavaScript**: Wix Thunderbolt framework (heavy, proprietary)

## Content Audit

**Navigation**:
- Home
- Request **Qoute** [typo - should be "Quote"]
- Values
- Driver Application
- Call Now

**Key Messaging**:
- "A TOP RATED SOUTH GEORGIA CARRIER"
- Focus on agricultural transport, bulk loads, container drayage
- Warehouse/transloading services
- 300+ loaded container storage capacity

**Service Areas**:
- **WAREHOUSE** [typo: "REFRIDGERATED" should be "REFRIGERATED"]
- **CONTAINERS**
- **REFRIDGERATED** [spelling error]

**Client Testimonial**:
- "Southern Haulers is our preferred carrier for drayage."

## Critical Gaps vs. SOTA TMS Requirements

### 1. **Zero TMS Functionality**
- ❌ No shipment tracking
- ❌ No quote/CPQ system
- ❌ No driver portal
- ❌ No client login
- ❌ No real-time status updates
- ❌ No document management (POD/BOL)
- ❌ No dispatch interface
- ❌ No billing/invoicing

### 2. **SEO Deficiencies**
- ❌ No programmatic state/city pages
- ❌ No JSON-LD structured data
- ❌ No dynamic sitemaps
- ❌ No blog/content marketing
- ❌ Limited local business signals

### 3. **No Growth Engine**
- ❌ No AI recruiting pipeline
- ❌ No lead capture beyond basic forms
- ❌ No A2P SMS automation
- ❌ No Meta Lead Ads integration
- ❌ No analytics/conversion tracking visible

### 4. **Mobile/PWA**
- ❌ Not a Progressive Web App
- ❌ No offline capabilities
- ❌ No push notifications
- ❌ No native-like driver experience

### 5. **Enterprise Features**
- ❌ No SSO/WorkOS integration
- ❌ No role-based access control
- ❌ No multi-tenant support
- ❌ No API for customer integrations
- ❌ No webhook infrastructure

### 6. **Compliance**
- ❌ No FMCSA Clearinghouse integration
- ❌ No Truth-in-Leasing document workflows
- ❌ No TWIC tracking
- ❌ No ELD/HOS visibility
- ❌ No audit logs

## Competitive Position

**Current State**: Basic marketing site with contact forms
**Market Position**: Far behind PortPro and modern TMS platforms
**Opportunity**: Complete greenfield rebuild with SOTA architecture

## Recommendations

### Phase 1: Foundation (Weeks 1-4)
1. ✅ Build Next.js 15 App Router monorepo
2. ✅ Implement Supabase auth + RLS
3. ✅ Create design system (Radix/shadcn)
4. ✅ Programmatic SEO infrastructure
5. ✅ Quote-CRM/CPQ module

### Phase 2: TMS Core (Weeks 5-8)
1. ✅ PortPro integration (feature-flagged)
2. ✅ Shipment lifecycle management
3. ✅ Driver PWA with offline
4. ✅ Admin dispatch interface
5. ✅ Real-time tracking

### Phase 3: Growth & Agentic Ops (Weeks 9-12)
1. ✅ AI Recruiting Engine
2. ✅ Appointment Agent
3. ✅ Exception Agent (TMF/demurrage)
4. ✅ Compliance Agent
5. ✅ Analytics dashboards

### Phase 4: Enterprise & Scale (Weeks 13-16)
1. ✅ WorkOS SSO
2. ✅ Multi-tenant architecture
3. ✅ API for customer integrations
4. ✅ Advanced observability
5. ✅ Performance optimization to <250ms p95

## Success Metrics

**Performance Targets**:
- LCP: ≤2.5s (currently ~1.1s FCP, need full LCP measurement)
- CLS: ≤0.1
- INP: ≤200ms
- API p95: ≤250ms
- Page Load: <2.0s (improve from 2.53s)
- Requests: <50 initial (reduce from 130)

**Business Targets**:
- Quote conversion: ≥2× industry baseline
- Driver application completion: ≥70%
- Customer NPS: ≥50
- System uptime: ≥99.9%

## Sources
- https://www.southernhaulers.net (legacy Wix site)
- Chrome DevTools MCP analysis (2025-10-23)
- 130 network requests captured
- Performance timing API measurements
