# Southern Haulers TMS - Testing Strategy

> **Version**: 1.0
> **Last Updated**: 2024-01-23
> **Status**: Production-Ready Testing Framework

## Overview

This document outlines the comprehensive testing strategy for Southern Haulers TMS, a multi-app monorepo built with Next.js 14, Turborepo, and Supabase. Our testing approach ensures compliance with DOT regulations (49 CFR Parts 376, 382, 395), validates business logic, and maintains code quality through automated quality gates.

## Testing Philosophy

**Quality Gates First**: Every application must pass all quality gates before deployment.

**Compliance-Critical**: DOT/FMCSA compliance requirements are P0 and must have automated validation.

**Fast Feedback**: Tests run in parallel, use smart caching, and only test affected workspaces.

**Layered Testing**: Unit → Integration → E2E → Compliance → Performance

---

## Research Citations

Based on authoritative research (January 2024):

### Next.js 14 Testing Best Practices
- **Vitest** for fast unit/integration tests of client and synchronous server components
- **Playwright** for E2E testing: user interactions, async flows, webhooks, PWA features
- App Router considerations: test server and client components independently, then validate integration
- Source: Next.js official documentation, Playwright docs

### DOT Compliance Testing Requirements
- **FMCSA Clearinghouse**: Pre-employment and annual queries (49 CFR Part 382)
- **Hours of Service**: Enforcement of 49 CFR Part 395 limits in dispatch
- **Truth-in-Leasing**: Document tracking per 49 CFR Part 376
- **TMS Quality Gates**: Validated Clearinghouse status, active CDL/medical cards, clean drug/alcohol testing
- Source: FMCSA regulations, DOT compliance guidelines

### Monorepo Testing Strategy (Turborepo)
- **Isolated Test Suites**: Each app maintains its own tests
- **Selective Testing**: Only test affected projects (dependency graph analysis)
- **Parallelization**: Turborepo's parallel task execution with caching
- **Quality Gates in CI/CD**: Lint → Test → Build → Coverage
- Source: Turborepo documentation, monorepo testing patterns

---

## Quality Gates

All applications must pass these gates before deployment:

### P0 Gates (Blocking)
1. **lint_pass** - ESLint + TypeScript strict checks
2. **unit_pass** - Unit tests ≥80% coverage
3. **integration_pass** - API routes + webhooks validated
4. **e2e_critical** - Critical user flows (login, quote, shipment, invoice)
5. **compliance_valid** - DOT/FMCSA validation tests pass
6. **build_success** - Production build completes without errors

### P1 Gates (Non-blocking, warn only)
7. **e2e_full** - Complete E2E test suite
8. **perf_targets** - LCP <2.5s, CLS <0.1, INP <200ms
9. **a11y_wcag** - WCAG 2.1 AA compliance
10. **security_scan** - Dependency vulnerabilities check

---

## Testing Layers

### Layer 1: Unit Tests (Vitest)

**Tools**: Vitest + React Testing Library

**Scope**: Individual functions, components, utilities

**Location**: Co-located with source files (`*.test.ts`, `*.test.tsx`)

**Coverage Target**: ≥80%

**Examples**:
- Quote calculation logic (base rate + accessorials)
- Status badge color mapping
- Date/time formatting utilities
- Validation schemas (Zod)

**Configuration**:
```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['**/*.config.*', '**/dist/**', '**/.next/**'],
      threshold: {
        lines: 80,
        functions: 80,
        branches: 75,
        statements: 80,
      },
    },
  },
});
```

---

### Layer 2: Integration Tests (Vitest + MSW)

**Tools**: Vitest + MSW (Mock Service Worker) + Supertest

**Scope**: API routes, webhooks, database queries, auth flows

**Location**: `apps/*/tests/integration/`

**Examples**:
- Meta Lead Ads webhook handler (verification + payload processing)
- Twilio SMS webhook (inbound message handling)
- Supabase RLS policies (row-level security validation)
- Quote → Shipment conversion flow
- Invoice generation from shipment data

**Mock Strategy**:
- MSW for external API mocks (Meta Graph API, Twilio)
- Supabase local instance for database tests
- Mock authentication context for protected routes

**Example Test**:
```typescript
// apps/recruiting/tests/integration/meta-webhook.test.ts
describe('Meta Lead Ads Webhook', () => {
  it('should verify webhook with correct token', async () => {
    const response = await request(app)
      .get('/api/webhooks/meta')
      .query({
        'hub.mode': 'subscribe',
        'hub.verify_token': VERIFY_TOKEN,
        'hub.challenge': 'test_challenge',
      });

    expect(response.status).toBe(200);
    expect(response.text).toBe('test_challenge');
  });

  it('should process lead and trigger SMS bot', async () => {
    const payload = createMockMetaLeadPayload();
    const response = await request(app)
      .post('/api/webhooks/meta')
      .send(payload);

    expect(response.status).toBe(200);
    // Verify candidate created in DB
    // Verify SMS sent via Twilio mock
  });
});
```

---

### Layer 3: E2E Tests (Playwright)

**Tools**: Playwright

**Scope**: Complete user flows across all pages

**Location**: `apps/*/tests/e2e/`

**Browsers**: Chromium (primary), Firefox, WebKit (Safari)

**Critical Flows (P0)**:
1. **Web App**:
   - User login → View shipments → Track shipment → Download invoice
   - Submit quote request → Receive quote

2. **Admin App**:
   - Login → Create shipment → Assign driver → Update status → Generate invoice
   - Exception handling → Escalation workflow

3. **Driver PWA**:
   - Login → View assigned shipments → Capture document (POD/BOL) → Update status
   - Offline mode → Background sync when online

4. **Recruiting App**:
   - Meta Lead Ads webhook → SMS bot response → Schedule interview
   - View onboarding checklist → Upload documents → Mark as approved

**Example Test**:
```typescript
// apps/admin/tests/e2e/shipment-flow.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Shipment Creation Flow', () => {
  test('should create shipment and assign driver', async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.fill('[name="email"]', 'admin@southernhaulers.net');
    await page.fill('[name="password"]', 'test-password');
    await page.click('button[type="submit"]');

    // Navigate to shipments
    await expect(page).toHaveURL('/dashboard');
    await page.click('text=Create Shipment');

    // Fill shipment form
    await page.fill('[name="origin"]', 'Charleston, SC');
    await page.fill('[name="destination"]', 'Savannah, GA');
    await page.fill('[name="container_number"]', 'CONT123456');
    await page.click('button:has-text("Create")');

    // Verify shipment created
    await expect(page.locator('text=CONT123456')).toBeVisible();

    // Assign driver
    await page.click('text=Assign Driver');
    await page.selectOption('[name="driver_id"]', { label: 'John Doe' });
    await page.click('button:has-text("Assign")');

    // Verify driver assigned
    await expect(page.locator('text=John Doe')).toBeVisible();
  });
});
```

**PWA-Specific Tests**:
```typescript
// apps/driver/tests/e2e/offline.spec.ts
test('should cache pages for offline access', async ({ page, context }) => {
  // Install service worker
  await page.goto('/login');
  await page.waitForLoadState('networkidle');

  // Simulate offline
  await context.setOffline(true);

  // Navigate to cached pages
  await page.goto('/dashboard');
  await expect(page.locator('h1')).toContainText('Dashboard');

  // Capture document while offline
  await page.goto('/capture');
  await page.setInputFiles('input[type="file"]', 'test-document.jpg');

  // Verify stored in IndexedDB for later sync
  const pendingDocs = await page.evaluate(() => {
    return indexedDB.databases().then(dbs => dbs.length);
  });
  expect(pendingDocs).toBeGreaterThan(0);
});
```

---

### Layer 4: Compliance Tests

**Tools**: Vitest + Custom validators

**Scope**: DOT/FMCSA regulatory requirements

**Location**: `packages/compliance/tests/`

**P0 Compliance Checks**:

#### 1. FMCSA Clearinghouse (49 CFR Part 382)
```typescript
describe('Clearinghouse Compliance', () => {
  it('should block driver assignment if Clearinghouse query pending', async () => {
    const driver = await createMockDriver({ clearinghouse_status: 'pending' });
    const shipment = await createMockShipment();

    await expect(assignDriverToShipment(shipment.id, driver.id))
      .rejects.toThrow('Clearinghouse query must be completed');
  });

  it('should prevent dispatch if Clearinghouse violation unresolved', async () => {
    const driver = await createMockDriver({
      clearinghouse_status: 'violation',
      clearinghouse_resolved: false
    });

    await expect(dispatchShipment(driver.id))
      .rejects.toThrow('Driver has unresolved Clearinghouse violation');
  });
});
```

#### 2. Hours of Service (49 CFR Part 395)
```typescript
describe('HOS Compliance', () => {
  it('should enforce 11-hour driving limit', async () => {
    const driver = await createMockDriver({
      hos_driving_hours_today: 10.5
    });
    const route = { estimated_drive_time: 1.5 }; // hours

    await expect(assignRoute(driver.id, route))
      .rejects.toThrow('Assignment would exceed 11-hour driving limit');
  });

  it('should require 10-hour off-duty break', async () => {
    const driver = await createMockDriver({
      last_off_duty: new Date(Date.now() - 9 * 60 * 60 * 1000) // 9 hours ago
    });

    await expect(dispatchShipment(driver.id))
      .rejects.toThrow('Driver must complete 10-hour off-duty period');
  });
});
```

#### 3. Truth-in-Leasing (49 CFR Part 376)
```typescript
describe('Truth-in-Leasing Compliance', () => {
  it('should require signed lease agreement before first dispatch', async () => {
    const driver = await createMockDriver({
      lease_agreement_signed: false
    });

    await expect(dispatchShipment(driver.id))
      .rejects.toThrow('Lease agreement must be signed per 49 CFR Part 376');
  });

  it('should retain lease artifacts for required period', async () => {
    const leaseAgreement = await createMockLease({
      signed_at: new Date('2021-01-01')
    });

    // Retention period: 3 years
    const canDelete = await checkRetentionPolicy(leaseAgreement.id);
    expect(canDelete).toBe(false);
  });
});
```

#### 4. TWIC Validation
```typescript
describe('TWIC Compliance', () => {
  it('should block port assignments if TWIC expired', async () => {
    const driver = await createMockDriver({
      twic_expiry: new Date('2023-12-31')
    });
    const shipment = await createMockShipment({
      requires_twic: true
    });

    await expect(assignDriverToShipment(shipment.id, driver.id))
      .rejects.toThrow('Valid TWIC required for port access');
  });
});
```

---

### Layer 5: Performance Tests

**Tools**: Lighthouse CI + Playwright

**Scope**: Web Vitals, API latency, bundle size

**Targets**:
- **LCP** (Largest Contentful Paint): ≤2.5s
- **CLS** (Cumulative Layout Shift): ≤0.1
- **INP** (Interaction to Next Paint): ≤200ms
- **API p95 latency**: ≤250ms
- **Bundle size**: ≤500KB (initial load)

**Example**:
```typescript
// tests/performance/web-vitals.spec.ts
test('should meet Core Web Vitals targets', async ({ page }) => {
  await page.goto('/dashboard');

  const metrics = await page.evaluate(() => {
    return new Promise((resolve) => {
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lcp = entries.find(e => e.entryType === 'largest-contentful-paint');
        resolve({ lcp: lcp?.renderTime });
      }).observe({ entryTypes: ['largest-contentful-paint'] });
    });
  });

  expect(metrics.lcp).toBeLessThan(2500); // 2.5s
});
```

---

## Turborepo Test Configuration

**Root `turbo.json`**:
```json
{
  "pipeline": {
    "lint": {
      "outputs": [],
      "cache": true
    },
    "test:unit": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"],
      "cache": true
    },
    "test:integration": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"],
      "cache": true
    },
    "test:e2e": {
      "dependsOn": ["build"],
      "outputs": [],
      "cache": false
    },
    "test:compliance": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"],
      "cache": true
    }
  }
}
```

**Run tests for affected apps only**:
```bash
# Run all tests in affected workspaces
turbo run test:unit --filter=[HEAD^1]

# Run specific test layer
turbo run test:e2e --filter=@southernhaulers/admin

# Run all quality gates in parallel
turbo run lint test:unit test:integration test:compliance --parallel
```

---

## CI/CD Quality Gates

**GitHub Actions Workflow** (`.github/workflows/quality-gates.yml`):

```yaml
name: Quality Gates

on:
  pull_request:
  push:
    branches: [main, develop]

jobs:
  quality-gates:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      # P0 Gates (blocking)
      - name: Lint
        run: turbo run lint

      - name: Unit Tests
        run: turbo run test:unit

      - name: Integration Tests
        run: turbo run test:integration

      - name: Compliance Tests
        run: turbo run test:compliance

      - name: E2E Critical Flows
        run: turbo run test:e2e:critical

      - name: Build
        run: turbo run build

      # P1 Gates (non-blocking)
      - name: E2E Full Suite
        run: turbo run test:e2e
        continue-on-error: true

      - name: Performance Tests
        run: turbo run test:perf
        continue-on-error: true

      - name: Upload Coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
```

---

## Shared Test Utilities

Create a shared `packages/test-utils` for DRY test setup:

**Structure**:
```
packages/test-utils/
├── src/
│   ├── mocks/
│   │   ├── supabase.ts       # Mock Supabase client
│   │   ├── auth.ts            # Mock auth context
│   │   ├── twilio.ts          # Mock Twilio SDK
│   │   └── meta.ts            # Mock Meta Graph API
│   ├── fixtures/
│   │   ├── shipments.ts       # Test data factories
│   │   ├── drivers.ts
│   │   ├── candidates.ts
│   │   └── quotes.ts
│   ├── helpers/
│   │   ├── database.ts        # DB test helpers
│   │   ├── api.ts             # API test helpers
│   │   └── compliance.ts      # Compliance validators
│   └── index.ts
└── package.json
```

**Example Mock**:
```typescript
// packages/test-utils/src/mocks/supabase.ts
export const createMockSupabaseClient = () => ({
  from: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  insert: jest.fn().mockReturnThis(),
  update: jest.fn().mockReturnThis(),
  delete: jest.fn().mockReturnThis(),
  eq: jest.fn().mockReturnThis(),
  single: jest.fn().mockResolvedValue({ data: null, error: null }),
  auth: {
    signInWithPassword: jest.fn(),
    signOut: jest.fn(),
    getSession: jest.fn(),
  },
});
```

---

## Test Data Management

**Factories** (using `@faker-js/faker`):

```typescript
// packages/test-utils/src/fixtures/shipments.ts
import { faker } from '@faker-js/faker';

export const createMockShipment = (overrides = {}) => ({
  id: faker.string.uuid(),
  shipment_number: `SH-${faker.number.int({ min: 100000, max: 999999 })}`,
  origin: faker.location.city(),
  destination: faker.location.city(),
  container_number: faker.string.alphanumeric(11).toUpperCase(),
  status: 'pending',
  created_at: faker.date.recent().toISOString(),
  ...overrides,
});

export const createMockDriver = (overrides = {}) => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  phone: faker.phone.number('+1 (###) ###-####'),
  cdl_number: faker.string.alphanumeric(10).toUpperCase(),
  clearinghouse_status: 'clear',
  twic_expiry: faker.date.future(),
  hos_driving_hours_today: faker.number.float({ min: 0, max: 11, precision: 0.1 }),
  lease_agreement_signed: true,
  ...overrides,
});
```

---

## Test Execution Strategy

### Local Development
```bash
# Run tests in watch mode
pnpm test:watch

# Run specific test file
pnpm test apps/web/app/dashboard/page.test.tsx

# Run E2E with UI (debugging)
pnpm test:e2e:ui
```

### Pre-commit Hook
```bash
# .husky/pre-commit
#!/bin/sh
pnpm turbo run lint test:unit --filter=[HEAD]
```

### Pull Request
- All P0 quality gates must pass
- Code coverage must not decrease
- No new Playwright test failures

### Production Deployment
- All quality gates (P0 + P1) must pass
- Manual approval for compliance-critical changes
- Smoke tests post-deployment

---

## Monitoring and Alerting

### Test Stability Metrics
- **Flake Rate**: Track E2E test flakiness (<5% target)
- **Test Duration**: Monitor for slowdowns (fail if >2x baseline)
- **Coverage Trends**: Alert if coverage drops below 80%

### Compliance Audit Logs
- All compliance test runs logged to audit table
- Failures trigger immediate Slack notifications
- Monthly compliance report generated

---

## Documentation Maintenance

- **Update this doc** when adding new quality gates
- **Document test patterns** in app-specific README files
- **Record failures** in `/docs/test-failures/` for retrospectives

---

## References

1. Next.js Testing Documentation: https://nextjs.org/docs/testing
2. Playwright Best Practices: https://playwright.dev/docs/best-practices
3. Vitest Configuration: https://vitest.dev/config/
4. Turborepo Caching: https://turbo.build/repo/docs/core-concepts/caching
5. FMCSA Regulations: https://www.fmcsa.dot.gov/regulations
6. 49 CFR Part 376: https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-376
7. 49 CFR Part 395: https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-395
8. WCAG 2.1 Guidelines: https://www.w3.org/WAI/WCAG21/quickref/

---

**Next Steps**:
1. Implement shared test-utils package
2. Add Vitest configuration to each app
3. Write critical E2E tests with Playwright
4. Set up CI/CD pipeline with quality gates
5. Create compliance test suite
6. Integrate with Codecov for coverage tracking

**Owned by**: Engineering Team
**Review Cycle**: Quarterly
**Last Review**: 2024-01-23
