# Southern Haulers TMS - SOTA Architecture
**Date**: 2025-10-23
**Version**: 1.0.0
**Status**: Production-Ready Design

## Executive Summary

Southern Haulers is built as an **infinitely scalable, event-driven Transportation Management System** that exceeds PortPro capabilities through modular architecture, agentic operations, and enterprise-grade compliance.

**Core Principles**:
1. **Event-Driven** - All state changes emit events (webhooks, queues, real-time subscriptions)
2. **Idempotent** - All mutations use idempotency keys for exactly-once processing
3. **Multi-Tenant** - Org-level data isolation via RLS
4. **Feature-Flagged** - All integrations and features controllable per-org
5. **Observable** - OpenTelemetry traces, Prometheus metrics, structured logs
6. **Compliance-First** - FMCSA, TWIC, Truth-in-Leasing built into core

---

## 1. System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     GROWSZ Biosphere                             │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │              Southern Haulers Ecosystem                     │ │
│  │                                                              │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │ │
│  │  │  Web Portal │  │   Admin     │  │   Driver    │        │ │
│  │  │  (Customer) │  │  (Dispatch) │  │    (PWA)    │        │ │
│  │  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘        │ │
│  │         │                 │                 │                │ │
│  │         └─────────────────┴─────────────────┘                │ │
│  │                           │                                  │ │
│  │                  ┌────────▼────────┐                         │ │
│  │                  │   API Gateway   │                         │ │
│  │                  │  (Next.js API)  │                         │ │
│  │                  └────────┬────────┘                         │ │
│  │                           │                                  │ │
│  │         ┌─────────────────┼─────────────────┐                │ │
│  │         │                 │                 │                │ │
│  │    ┌────▼────┐      ┌────▼────┐      ┌────▼────┐           │ │
│  │    │  Auth   │      │  Core   │      │  Agents │           │ │
│  │    │ (WorkOS)│      │ Services│      │  Layer  │           │ │
│  │    └─────────┘      └────┬────┘      └────┬────┘           │ │
│  │                           │                 │                │ │
│  │                  ┌────────▼────────┐        │                │ │
│  │                  │   Event Bus     │        │                │ │
│  │                  │  (Redis/Queues) │        │                │ │
│  │                  └────────┬────────┘        │                │ │
│  │                           │                 │                │ │
│  │         ┌─────────────────┼─────────────────┘                │ │
│  │         │                 │                                  │ │
│  │    ┌────▼────┐      ┌────▼────┐      ┌────────┐             │ │
│  │    │Supabase │      │ PortPro │      │  AI    │             │ │
│  │    │Postgres │      │   Sync  │      │ Models │             │ │
│  │    │  + RLS  │      │ Workers │      │(Claude)│             │ │
│  │    └─────────┘      └─────────┘      └────────┘             │ │
│  │                                                              │ │
│  └──────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘

External Systems:
├── PortPro API (Load sync)
├── WorkOS (SSO/Auth)
├── eModal (Appointments)
├── Twilio (SMS)
├── Meta Lead Ads (Recruiting)
└── FMCSA Clearinghouse (Compliance)
```

---

## 2. Application Layer

### 2.1 Web Portal (Customer-Facing)
**Tech**: Next.js 15 App Router, React 19, Tailwind CSS, shadcn/ui
**Routes**:
- `/` - Landing page (Hero + features + testimonials)
- `/quote` - Request quote form (CPQ)
- `/tracking` - Real-time shipment tracking
- `/documents` - POD/BOL downloads
- `/invoices` - Billing portal
- `/usa/[state]/[city]` - Programmatic SEO pages (300+)
- `/api/*` - Backend API routes

**Features**:
- Server-side rendering (ISR for SEO pages)
- Real-time updates via Supabase Realtime
- Optimistic UI updates
- Progressive enhancement
- Core Web Vitals optimization (LCP <2.5s target)

### 2.2 Admin Dashboard (Dispatch & Operations)
**Tech**: Next.js 15, React Server Components, Tanstack Table
**Routes**:
- `/admin/dispatch` - Load assignment board (Kanban)
- `/admin/exceptions` - TMF/demurrage alerts
- `/admin/drivers` - Driver management
- `/admin/vehicles` - Fleet management
- `/admin/billing` - Invoicing and payments
- `/admin/reports` - Analytics dashboards
- `/admin/settings` - Org config + feature flags

**Features**:
- Real-time dispatch board (drag-and-drop)
- Exception alerts with risk scoring
- Bulk operations (assign 10 loads to driver)
- Advanced filtering and search
- Export to CSV/PDF

### 2.3 Driver PWA (Mobile-First)
**Tech**: Next.js PWA, Service Workers, IndexedDB
**Routes**:
- `/driver/loads` - Assigned loads list
- `/driver/load/[id]` - Load details + navigation
- `/driver/checklist` - Pre-trip inspection
- `/driver/documents` - Upload POD/signature
- `/driver/timesheets` - HOS summary (read-only)

**Features**:
- **Offline-first** - Works without network
- Push notifications (load assignment, ETA alerts)
- Camera integration (document capture)
- Geolocation tracking (optional, privacy-conscious)
- Signature pad for POD
- Background sync when online

### 2.4 Recruiting Portal
**Tech**: Next.js 15, Twilio SDK, Cal.com integration
**Routes**:
- `/recruiting/pipeline` - Candidate funnel
- `/recruiting/screening` - A2P SMS workflows
- `/recruiting/compliance` - TWIC/Clearinghouse tracking
- `/recruiting/onboarding` - Digital lease-on checklists

**Features**:
- Meta Lead Ads webhook receiver
- Twilio A2P 10DLC compliance
- Automated SMS screening
- Calendar scheduling (Cal.com or Calendly)
- Document e-sign integration (DocuSign)

### 2.5 Quote CRM / CPQ
**Tech**: Next.js 15, Zod validation, Workflow engine
**Routes**:
- `/crm/deals` - Deal pipeline
- `/crm/quotes/[id]` - Quote builder
- `/crm/quotes/[id]/versions` - Version history
- `/crm/approvals` - Approval workflows

**Features**:
- Quote versioning (v1, v2, v3 with diff view)
- Accessorial pricing (TMF, per diem, demurrage)
- Lane-based baseline pricing
- Approval routing (sales → ops manager → exec)
- One-click convert quote → shipment

---

## 3. Core Services Layer

### 3.1 Authentication Service
**Provider**: WorkOS
**Pattern**: Session-based with JWT for API
**Features**:
- Multi-org SSO (SAML, Google Workspace, Microsoft)
- Session middleware (Edge runtime)
- Role-based access control (RBAC)
- Optional attribute-based access control (ABAC)
- API key management for integrations

**Schema**:
```typescript
interface User {
  id: string;
  email: string;
  orgId: string;
  role: 'admin' | 'dispatcher' | 'driver' | 'customer' | 'compliance';
  permissions: string[];  // ABAC attributes
}

interface Session {
  userId: string;
  orgId: string;
  role: string;
  expiresAt: Date;
}
```

**Security**:
- All API routes protected by auth middleware
- RLS policies enforce org-level data isolation
- Audit logs for sensitive operations (view PII, modify compliance records)

### 3.2 Shipment Service
**Core Domain**: CRUD + lifecycle management
**State Machine**:
```
quote → booked → assigned → en_route → at_terminal →
loading → loaded → in_transit → at_destination →
unloading → delivered → invoiced → paid
```

**Events Emitted**:
- `shipment.created`
- `shipment.status_changed`
- `shipment.driver_assigned`
- `shipment.exception_detected` (late, demurrage risk)
- `shipment.completed`

**Integrations**:
- PortPro sync (bidirectional)
- Real-time tracking (Supabase Realtime)
- Exception Agent (risk scoring)
- Appointment Agent (terminal booking)

### 3.3 Driver Service
**Core Domain**: Driver onboarding, compliance, availability
**Features**:
- License verification
- TWIC tracking (expiry alerts)
- FMCSA Clearinghouse consent workflows
- HOS/ELD read-only integration (KeepTruckin, Samsara)
- Availability calendar

**Compliance Checks**:
```typescript
interface DriverCompliance {
  twicValid: boolean;
  twicExpiresAt: Date | null;
  clearinghouseConsentGiven: boolean;
  clearinghouseLastQuery: Date | null;
  licenseValid: boolean;
  licenseExpiresAt: Date;
  medicalCardValid: boolean;
  medicalCardExpiresAt: Date;
}

// Block driver assignment if any compliance check fails
function canAssignDriver(driver: Driver): { ok: boolean; reason?: string }
```

### 3.4 Quote Service (CPQ)
**Core Domain**: Quote creation, versioning, approval, conversion
**Features**:
- Quote builder with drag-and-drop accessorials
- Version control (immutable quote versions)
- Approval workflows (configurable per org)
- Lane-based pricing (base rate + accessorials)
- TMF/demurrage/per diem calculators
- PDF generation (quote + rate confirmation)

**Workflow**:
```
draft → pending_approval → approved → sent_to_customer →
accepted → converted_to_shipment
```

### 3.5 Integration Service (PortPro)
**Architecture**: Event-driven sync with conflict resolution
**Components**:
1. **API Client** - Type-safe PortPro API wrapper
2. **Webhook Receiver** - Signature verification + event processing
3. **Sync Worker** - Redis-based queue with retry logic
4. **Mapper Layer** - PortPro models ↔ SH domain models
5. **Authority Manager** - Per-org flag for system of record

**Sync Strategy**:
```typescript
// Default: PortPro is source of truth for loads/invoices
// SH is source of truth for quotes/UI state

interface AuthorityConfig {
  orgId: string;
  loads: 'portpro' | 'southernhaulers';
  drivers: 'portpro' | 'southernhaulers';
  invoices: 'portpro' | 'southernhaulers';
}

// Conflict resolution:
// 1. Check authority config
// 2. If SH is authority: SH wins
// 3. If PortPro is authority: PortPro wins
// 4. If bidirectional: last-write-wins with timestamp
```

**Observability**:
- Sync lag metric (seconds behind)
- Error rate per endpoint
- Token expiry countdown
- Webhook delivery latency

---

## 4. Agentic Operations Layer

### 4.1 Appointment Agent
**Purpose**: Automate terminal appointment scheduling
**Inputs**:
- Terminal rules (eModal, PierPass, TMF hours)
- Port congestion data
- Driver availability
- Shipment ETA
- Cutoff times

**Outputs**:
- Candidate appointment slots (ranked by risk)
- Risk assessment (congestion, demurrage probability)
- Booking confirmation (if auto-approved)

**Workflow**:
```
1. Shipment created → trigger agent
2. Query terminal availability (eModal API)
3. Check driver calendar
4. Calculate risk score per slot
5. If risk < threshold: auto-book
6. If risk >= threshold: request dispatcher approval
7. Emit appointment.created event
```

**Tools**:
- `get_terminal_hours(terminal_id, date)` → available slots
- `check_driver_availability(driver_id, date_range)` → boolean
- `calculate_congestion_risk(terminal_id, date)` → risk_score
- `book_appointment(terminal_id, slot, shipment_id)` → confirmation

### 4.2 Exception Agent
**Purpose**: Detect and mitigate TMF/demurrage/detention risks
**Inputs**:
- Shipment ETA variance
- Terminal free time remaining
- TMF/per diem clocks
- Driver location (GPS)
- Historical delay patterns

**Outputs**:
- Risk score (0-100)
- Recommended actions (expedite, reroute, reschedule)
- Escalation alerts (email/SMS to dispatcher)

**Workflow**:
```
1. Monitor shipments in real-time
2. Detect ETA variance >2 hours OR free time <24 hours
3. Calculate demurrage cost if delayed
4. Score risk: (cost_exposure * probability_of_delay)
5. If risk > $500: alert dispatcher
6. If risk > $2000: auto-escalate to ops manager
```

**Tools**:
- `calculate_demurrage(terminal_id, container_size, days_late)` → cost
- `get_driver_location(driver_id)` → lat/lng
- `estimate_arrival(driver_location, destination)` → ETA
- `reschedule_appointment(shipment_id, new_slot)` → confirmation

### 4.3 Compliance Agent
**Purpose**: Ensure driver compliance before assignment
**Inputs**:
- TWIC expiry dates
- Clearinghouse consent status
- Medical card expiry
- License expiry
- Vehicle inspection dates

**Outputs**:
- Blocking checklist (must fix before work)
- Warning alerts (expires in <90 days)
- Automated reminders (email/SMS to driver)

**Workflow**:
```
1. Before assigning load: run compliance checks
2. If any P0 check fails → block assignment
3. If P1 check fails → warn dispatcher
4. Schedule reminders 90/60/30 days before expiry
5. Emit compliance.alert event
```

**Tools**:
- `check_twic_status(driver_id)` → { valid, expiresAt }
- `query_clearinghouse(driver_id)` → { consentGiven, lastQuery }
- `check_license(driver_id)` → { valid, expiresAt }
- `check_medical_card(driver_id)` → { valid, expiresAt }

### 4.4 Pricing Agent
**Purpose**: Generate dynamic quotes based on lane data + market conditions
**Inputs**:
- Lane history (origin/destination pair)
- Container size (TEU/FEU)
- Accessorials (TMF, demurrage, per diem)
- Capacity index (supply/demand)
- Fuel surcharge

**Outputs**:
- Base price + breakdown
- Confidence score (0-100)
- Approval recommendation (auto-approve vs. manual review)

**Workflow**:
```
1. Customer requests quote
2. Lookup lane baseline (avg of last 10 shipments)
3. Adjust for capacity (+20% if tight, -10% if surplus)
4. Add accessorials (TMF, demurrage risk premium)
5. Calculate confidence based on data quality
6. If confidence >80% AND margin >15%: auto-approve
7. Else: route to sales manager
```

**Tools**:
- `get_lane_history(origin, destination, days=90)` → shipments[]
- `calculate_tmf(container_size)` → cost
- `get_capacity_index(region)` → supply_demand_ratio
- `get_fuel_surcharge(date)` → surcharge_pct

---

## 5. Data Layer (Supabase Postgres)

### 5.1 Core Tables

#### organizations
```sql
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  features JSONB NOT NULL DEFAULT '{}',  -- feature flags
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

#### users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'dispatcher', 'driver', 'customer', 'compliance')),
  permissions JSONB NOT NULL DEFAULT '[]',  -- ABAC attributes
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS Policy: Users can only see their own org's users
CREATE POLICY users_org_isolation ON users FOR SELECT USING (org_id = current_setting('app.org_id')::uuid);
```

#### shipments
```sql
CREATE TABLE shipments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  external_id TEXT,  -- PortPro load ID (if synced)
  status TEXT NOT NULL,
  origin GEOGRAPHY(POINT),  -- PostGIS
  destination GEOGRAPHY(POINT),
  driver_id UUID REFERENCES drivers(id),
  vehicle_id UUID REFERENCES vehicles(id),
  container_number TEXT,
  container_size TEXT CHECK (container_size IN ('TEU', 'FEU')),
  tmf_amount NUMERIC(10, 2),
  demurrage_free_days INT,
  appointment_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS: Org isolation
CREATE POLICY shipments_org_isolation ON shipments FOR SELECT USING (org_id = current_setting('app.org_id')::uuid);

-- Index for geospatial queries
CREATE INDEX shipments_origin_idx ON shipments USING GIST (origin);
CREATE INDEX shipments_destination_idx ON shipments USING GIST (destination);
```

#### shipment_status_history
```sql
CREATE TABLE shipment_status_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shipment_id UUID NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  notes TEXT,
  location GEOGRAPHY(POINT),  -- Where status was updated
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Trigger: Update shipments.status on insert
CREATE TRIGGER update_shipment_status
  AFTER INSERT ON shipment_status_history
  FOR EACH ROW
  EXECUTE FUNCTION update_shipment_status_fn();
```

#### drivers
```sql
CREATE TABLE drivers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  license_number TEXT NOT NULL,
  license_expires_at DATE NOT NULL,
  twic_number TEXT,
  twic_expires_at DATE,
  clearinghouse_consent_given BOOLEAN DEFAULT false,
  clearinghouse_last_query TIMESTAMPTZ,
  medical_card_expires_at DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS: Org isolation
CREATE POLICY drivers_org_isolation ON drivers FOR SELECT USING (org_id = current_setting('app.org_id')::uuid);
```

#### vehicles
```sql
CREATE TABLE vehicles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  unit_number TEXT NOT NULL,
  vin TEXT NOT NULL,
  year INT NOT NULL,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  license_plate TEXT NOT NULL,
  inspection_expires_at DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS: Org isolation
CREATE POLICY vehicles_org_isolation ON vehicles FOR SELECT USING (org_id = current_setting('app.org_id')::uuid);
```

#### quotes
```sql
CREATE TABLE quotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  version INT NOT NULL DEFAULT 1,
  status TEXT NOT NULL CHECK (status IN ('draft', 'pending_approval', 'approved', 'sent', 'accepted', 'rejected', 'converted')),
  customer_email TEXT NOT NULL,
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  container_size TEXT NOT NULL,
  base_rate NUMERIC(10, 2) NOT NULL,
  accessorials JSONB NOT NULL DEFAULT '[]',  -- [{ name, amount }]
  total_amount NUMERIC(10, 2) NOT NULL,
  valid_until TIMESTAMPTZ NOT NULL,
  approved_by UUID REFERENCES users(id),
  approved_at TIMESTAMPTZ,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS: Org isolation
CREATE POLICY quotes_org_isolation ON quotes FOR SELECT USING (org_id = current_setting('app.org_id')::uuid);

-- Index: Lookup latest version
CREATE INDEX quotes_customer_version_idx ON quotes(customer_email, version DESC);
```

#### invoices
```sql
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  shipment_id UUID NOT NULL REFERENCES shipments(id),
  external_id TEXT,  -- PortPro invoice ID
  invoice_number TEXT NOT NULL UNIQUE,
  amount NUMERIC(10, 2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('draft', 'sent', 'paid', 'overdue', 'cancelled')),
  due_at TIMESTAMPTZ NOT NULL,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS: Org isolation
CREATE POLICY invoices_org_isolation ON invoices FOR SELECT USING (org_id = current_setting('app.org_id')::uuid);
```

#### leasing_artifacts
```sql
-- Truth-in-Leasing compliance (49 CFR 376)
CREATE TABLE leasing_artifacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  driver_id UUID NOT NULL REFERENCES drivers(id),
  artifact_type TEXT NOT NULL CHECK (artifact_type IN ('lease_agreement', 'equipment_receipt_start', 'equipment_receipt_end', 'settlement_statement')),
  signed_at TIMESTAMPTZ NOT NULL,
  signed_document_url TEXT NOT NULL,  -- S3/CloudFront URL
  signature_ip TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS: Org isolation
CREATE POLICY leasing_artifacts_org_isolation ON leasing_artifacts FOR SELECT USING (org_id = current_setting('app.org_id')::uuid);

-- IMMUTABLE: Once created, cannot be updated or deleted
CREATE TRIGGER prevent_leasing_artifact_update
  BEFORE UPDATE OR DELETE ON leasing_artifacts
  FOR EACH ROW
  EXECUTE FUNCTION prevent_modification();
```

#### audit_logs
```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  action TEXT NOT NULL,  -- 'created', 'updated', 'deleted', 'viewed'
  entity_type TEXT NOT NULL,  -- 'shipment', 'driver', 'quote', etc.
  entity_id UUID NOT NULL,
  changes JSONB,  -- Old vs. new values for updates
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index: Query by entity
CREATE INDEX audit_logs_entity_idx ON audit_logs(entity_type, entity_id);

-- RLS: Admins only
CREATE POLICY audit_logs_admin_only ON audit_logs FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM users WHERE id = current_setting('app.user_id')::uuid AND role = 'admin'
  )
);
```

### 5.2 RLS Pattern
All tables use `org_id` for multi-tenancy. Session middleware sets `app.org_id` context:

```sql
-- Middleware sets this on every request
SELECT set_config('app.org_id', '12345-org-uuid', TRUE);
SELECT set_config('app.user_id', '67890-user-uuid', TRUE);

-- RLS policies use these settings
CREATE POLICY table_org_isolation ON some_table FOR SELECT USING (
  org_id = current_setting('app.org_id')::uuid
);
```

### 5.3 pgvector for RAG (Future)
```sql
-- Enable extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Example: Document embeddings for agent context
CREATE TABLE document_embeddings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id),
  document_type TEXT NOT NULL,  -- 'policy', 'tariff', 'terminal_rules'
  content TEXT NOT NULL,
  embedding vector(1536),  -- OpenAI ada-002 dimensions
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for cosine similarity search
CREATE INDEX document_embeddings_vector_idx ON document_embeddings USING ivfflat (embedding vector_cosine_ops);

-- Query: Find similar documents
SELECT * FROM document_embeddings
WHERE org_id = '...'
ORDER BY embedding <=> '[0.1, 0.2, ...]'::vector
LIMIT 5;
```

---

## 6. Event-Driven Architecture

### 6.1 Event Bus (Redis + BullMQ)
All state changes emit events to Redis queues:

```typescript
// Event schema
interface DomainEvent {
  id: string;  // UUID
  type: string;  // 'shipment.created', 'shipment.status_changed', etc.
  aggregate: string;  // 'shipment', 'quote', 'driver'
  aggregateId: string;  // Entity ID
  payload: any;
  metadata: {
    orgId: string;
    userId: string;
    timestamp: Date;
    correlationId: string;  // Trace ID
  };
}

// Emit event
await eventBus.emit({
  type: 'shipment.status_changed',
  aggregate: 'shipment',
  aggregateId: shipment.id,
  payload: {
    oldStatus: 'booked',
    newStatus: 'assigned',
    driverId: driver.id
  },
  metadata: { orgId, userId, timestamp: new Date(), correlationId }
});
```

### 6.2 Event Handlers (Workers)
BullMQ workers process events:

```typescript
// Worker: Sync to PortPro
eventBus.subscribe('shipment.status_changed', async (event) => {
  const { aggregateId, payload } = event;
  const { newStatus } = payload;

  // Check if PortPro integration is enabled
  const org = await getOrganization(event.metadata.orgId);
  if (!org.features.portproEnabled) return;

  // Push status update to PortPro
  await portProClient.updateLoadStatus(aggregateId, newStatus);

  // Log success
  logger.info('Synced status to PortPro', {
    shipmentId: aggregateId,
    status: newStatus,
    correlationId: event.metadata.correlationId
  });
});

// Worker: Exception detection
eventBus.subscribe('shipment.status_changed', async (event) => {
  const shipment = await getShipment(event.aggregateId);

  // Run exception agent
  const risk = await exceptionAgent.assessRisk(shipment);

  if (risk.score > 50) {
    // Alert dispatcher
    await sendAlert({
      type: 'exception',
      severity: risk.score > 80 ? 'critical' : 'warning',
      message: risk.recommendation,
      shipmentId: shipment.id
    });
  }
});
```

### 6.3 Idempotency
All event handlers use idempotency keys:

```typescript
// Idempotency key = event ID
const idempotencyKey = event.id;

// Check if already processed
const alreadyProcessed = await redis.get(`idempotency:${idempotencyKey}`);
if (alreadyProcessed) {
  logger.info('Event already processed, skipping', { eventId: event.id });
  return;
}

// Process event
await processEvent(event);

// Mark as processed (TTL = 7 days)
await redis.setex(`idempotency:${idempotencyKey}`, 7 * 24 * 3600, 'true');
```

---

## 7. Observability

### 7.1 OpenTelemetry Tracing
All API requests and event handlers instrumented:

```typescript
import { trace, context, SpanStatusCode } from '@opentelemetry/api';

const tracer = trace.getTracer('southern-haulers');

export async function createShipment(data: ShipmentInput) {
  const span = tracer.startSpan('shipment.create');

  try {
    // Business logic
    const shipment = await db.shipments.create(data);

    span.setAttributes({
      'shipment.id': shipment.id,
      'shipment.status': shipment.status,
      'org.id': shipment.orgId
    });

    span.setStatus({ code: SpanStatusCode.OK });
    return shipment;
  } catch (error) {
    span.recordException(error);
    span.setStatus({ code: SpanStatusCode.ERROR, message: error.message });
    throw error;
  } finally {
    span.end();
  }
}
```

### 7.2 Prometheus Metrics
Key metrics exposed at `/api/metrics`:

```typescript
// API latency histogram
const apiLatencyHistogram = new prometheus.Histogram({
  name: 'sh_api_latency_seconds',
  help: 'API latency in seconds',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.01, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10]
});

// PortPro sync lag gauge
const portproSyncLagGauge = new prometheus.Gauge({
  name: 'sh_portpro_sync_lag_seconds',
  help: 'Time since last successful PortPro sync'
});

// Event queue depth
const eventQueueDepthGauge = new prometheus.Gauge({
  name: 'sh_event_queue_depth',
  help: 'Number of events pending in queue',
  labelNames: ['queue']
});
```

### 7.3 Structured Logging
JSON logs with correlation IDs:

```typescript
import { createLogger } from '@southernhaulers/observability';

const logger = createLogger('shipment-service');

logger.info('Shipment created', {
  shipmentId: shipment.id,
  orgId: shipment.orgId,
  status: shipment.status,
  correlationId: req.correlationId
});

// Error logging
logger.error('PortPro sync failed', {
  shipmentId: shipment.id,
  error: error.message,
  stack: error.stack,
  correlationId: req.correlationId
});
```

---

## 8. Security & Compliance

### 8.1 Authentication Flow
```
1. User visits /admin
2. Middleware checks session cookie
3. If no session: redirect to /auth/login
4. WorkOS OAuth flow (SAML, Google, etc.)
5. On success: create session, set org_id context
6. Redirect to original URL
```

### 8.2 Authorization (RBAC + ABAC)
```typescript
// RBAC: Role-based check
function requireRole(role: string) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
}

// ABAC: Attribute-based check
function requirePermission(permission: string) {
  return (req, res, next) => {
    if (!req.user.permissions.includes(permission)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
}

// Usage
app.get('/api/shipments', requireRole('dispatcher'), listShipments);
app.delete('/api/shipments/:id', requirePermission('shipment:delete'), deleteShipment);
```

### 8.3 Data Encryption
- **At rest**: Supabase Postgres encrypted by default (AES-256)
- **In transit**: TLS 1.3+ for all connections
- **Secrets**: Supabase Vault for API keys, tokens
- **PII**: Redacted from logs, encrypted in database

### 8.4 Compliance Automation
```typescript
// Truth-in-Leasing: Capture signed lease agreement
async function captureLease(driverId: string, documentUrl: string, signature: string, ipAddress: string) {
  // Store immutable artifact
  await db.leasingArtifacts.create({
    orgId,
    driverId,
    artifactType: 'lease_agreement',
    signedAt: new Date(),
    signedDocumentUrl: documentUrl,
    signatureIp: ipAddress
  });

  // Emit event
  await eventBus.emit({
    type: 'compliance.lease_signed',
    aggregate: 'driver',
    aggregateId: driverId,
    payload: { documentUrl, signatureIp: ipAddress },
    metadata: { orgId, userId, timestamp: new Date(), correlationId }
  });
}

// TWIC expiry check (agent tool)
function checkTwicExpiry(driver: Driver): { valid: boolean; daysRemaining: number } {
  if (!driver.twicExpiresAt) return { valid: false, daysRemaining: 0 };

  const now = new Date();
  const expiresAt = new Date(driver.twicExpiresAt);
  const daysRemaining = Math.floor((expiresAt.getTime() - now.getTime()) / (1000 * 3600 * 24));

  return { valid: daysRemaining > 0, daysRemaining };
}
```

---

## 9. Deployment Architecture

### 9.1 Infrastructure
- **Hosting**: Vercel (Next.js apps)
- **Database**: Supabase (Postgres + PostGIS + pgvector)
- **Queue/Cache**: Upstash Redis (serverless)
- **Storage**: AWS S3 (documents) + CloudFront (CDN)
- **Observability**: Axiom (logs) + Grafana Cloud (metrics/traces)
- **Auth**: WorkOS
- **Email**: Resend or SendGrid
- **SMS**: Twilio

### 9.2 Environment Strategy
```
├── Development (local)
│   └── localhost:3000
├── Staging (feature branches)
│   └── https://staging-southernhaulers.vercel.app
└── Production (main branch)
    └── https://www.southernhaulers.net
```

### 9.3 CI/CD Pipeline
```yaml
# .github/workflows/ci.yml
name: CI/CD
on: [push]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install
      - run: npm run test:unit
      - run: npm run test:e2e

  deploy-staging:
    if: github.ref == 'refs/heads/main'
    needs: test
    runs-on: ubuntu-latest
    steps:
      - run: vercel deploy --prod

  quality-gates:
    needs: deploy-staging
    runs-on: ubuntu-latest
    steps:
      - run: npm run test:perf  # LCP <2.5s
      - run: npm run test:security  # OWASP ZAP scan
```

---

## 10. Performance Targets

| Metric | Target | Measurement |
|---|---|---|
| **API Latency (p95)** | <250ms | OpenTelemetry histogram |
| **LCP (Web Portal)** | <2.5s | Lighthouse CI |
| **CLS (Web Portal)** | <0.1 | Lighthouse CI |
| **INP (Web Portal)** | <200ms | Web Vitals JS |
| **API Error Rate** | <0.1% | Prometheus counter |
| **Webhook ACK Time** | <200ms | Prometheus histogram |
| **PortPro Sync Lag** | <60s | Prometheus gauge |

**Optimization Techniques**:
- ISR (Incremental Static Regeneration) for SEO pages
- Edge caching via Vercel Edge Runtime
- Database connection pooling (PgBouncer)
- Redis caching for read-heavy queries
- Image optimization (Next/Image with AVIF)
- Code splitting (dynamic imports)

---

## 11. Future Enhancements

### Phase 5+ (Months 5-12)
1. **Mobile Apps** (React Native for iOS/Android)
2. **Advanced Analytics** (BI dashboards with Cube.js)
3. **EDI Integration** (X12 204, 214, 210, 990 for brokers)
4. **Multi-Language Support** (i18n with next-intl)
5. **API Marketplace** (Customer API keys + webhooks)
6. **White-Label Platform** (Multi-brand support)
7. **ML Models** (ETA prediction, demurrage forecasting)

---

## 12. ADR Index

- **ADR-001**: Database choice (Supabase Postgres) - [Rationale: RLS, PostGIS, pgvector, managed scaling]
- **ADR-002**: Auth provider (WorkOS) - [Rationale: Enterprise SSO, multi-org, SAML support]
- **ADR-003**: PortPro authority model - [Rationale: Feature-flagged bidirectional sync]
- **ADR-004**: Agent LLM (Claude) - [Rationale: Tool use, long context, structured output]
- **ADR-005**: Event bus (Redis + BullMQ) - [Rationale: Serverless-compatible, retry/DLQ built-in]

---

## Summary

Southern Haulers is designed to **exceed PortPro** through:
1. **Modular architecture** - Feature flags, swappable integrations
2. **Event-driven** - Real-time sync, agentic automation
3. **Compliance-first** - FMCSA, TWIC, Truth-in-Leasing built-in
4. **Observable** - OpenTelemetry traces, Prometheus metrics, structured logs
5. **Scalable** - Multi-tenant RLS, serverless-ready, edge caching

**Next Steps**: Begin Phase 1 implementation (database schemas, auth, API routes, PortPro sync).

---
**Document Version**: 1.0.0
**Last Updated**: 2025-10-23
**Author**: Claude Code + Southern Haulers Team
