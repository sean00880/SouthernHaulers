# Southern Haulers TMS - Architecture Diagrams

> **Last Updated**: 2025-10-24
> **Version**: 1.0
> **Purpose**: Visual architecture specifications for the Southern Haulers TMS platform

---

## Table of Contents

1. [System Architecture Overview](#1-system-architecture-overview)
2. [Monorepo Structure](#2-monorepo-structure)
3. [Event-Driven Integration Flow](#3-event-driven-integration-flow)
4. [PortPro Integration Architecture](#4-portpro-integration-architecture)
5. [Quote-to-Shipment Workflow](#5-quote-to-shipment-workflow)
6. [Agent Orchestration](#6-agent-orchestration)
7. [Compliance Workflows](#7-compliance-workflows)
8. [Domain Model](#8-domain-model)
9. [User Journeys](#9-user-journeys)
10. [Data Flow & Authority Model](#10-data-flow--authority-model)
11. [Observability & Monitoring](#11-observability--monitoring)
12. [Security & Access Control](#12-security--access-control)

---

## 1. System Architecture Overview

```mermaid
graph TB
    subgraph "Client Layer"
        WEB[Web Portal<br/>Next.js]
        ADMIN[Admin Dashboard<br/>Next.js]
        DRIVER[Driver PWA<br/>Offline-First]
        QUOTE[Quote CRM<br/>CPQ Module]
        RECRUIT[Recruiting Portal<br/>AI-Powered]
    end

    subgraph "API Gateway & Edge"
        EDGE[Edge Runtime<br/>Vercel/CloudFlare]
        AUTH[WorkOS Auth<br/>SSO/RBAC]
    end

    subgraph "Application Services"
        SHIPMENT[Shipment Service]
        PRICING[Pricing Engine]
        APPOINTMENT[Appointment Service]
        INVOICE[Invoice Service]
        DRIVER_MGMT[Driver Management]
        COMPLIANCE[Compliance Service]
    end

    subgraph "Agent Layer"
        APPT_AGENT[Appointment Agent<br/>Terminal Rules + ETA]
        EXCEPT_AGENT[Exception Agent<br/>TMF/Demurrage Risk]
        COMPLIANCE_AGENT[Compliance Agent<br/>TWIC/Clearinghouse]
        PRICING_AGENT[Pricing Agent<br/>Dynamic Rates]
    end

    subgraph "Integration Layer"
        PORTPRO[PortPro Integration<br/>Feature-Flagged]
        EDI[EDI Broker<br/>X12 204/214/210/990]
        SMS[A2P 10DLC SMS<br/>Recruiting]
        EMODAL[eModal/TMF<br/>Terminal Appointments]
    end

    subgraph "Data Layer"
        SUPABASE[(Supabase Postgres<br/>RLS + PostGIS + pgvector)]
        REDIS[(Redis<br/>Queue + Cache)]
        STORAGE[Object Storage<br/>Documents/POD/BOL]
    end

    subgraph "Observability"
        OTEL[OpenTelemetry<br/>Traces + Metrics]
        METRICS[Metrics Dashboard<br/>Webhook SLO, Queue Depth]
    end

    WEB --> EDGE
    ADMIN --> EDGE
    DRIVER --> EDGE
    QUOTE --> EDGE
    RECRUIT --> EDGE

    EDGE --> AUTH
    AUTH --> SHIPMENT
    AUTH --> PRICING
    AUTH --> APPOINTMENT
    AUTH --> INVOICE
    AUTH --> DRIVER_MGMT
    AUTH --> COMPLIANCE

    SHIPMENT --> APPT_AGENT
    SHIPMENT --> EXCEPT_AGENT
    PRICING --> PRICING_AGENT
    COMPLIANCE --> COMPLIANCE_AGENT

    SHIPMENT --> PORTPRO
    SHIPMENT --> EDI
    RECRUIT --> SMS
    APPOINTMENT --> EMODAL

    SHIPMENT --> SUPABASE
    PRICING --> SUPABASE
    APPOINTMENT --> SUPABASE
    INVOICE --> SUPABASE
    DRIVER_MGMT --> SUPABASE
    COMPLIANCE --> SUPABASE

    PORTPRO --> REDIS
    EDI --> REDIS

    SHIPMENT --> STORAGE
    DRIVER --> STORAGE

    SHIPMENT --> OTEL
    PORTPRO --> OTEL
    EDI --> OTEL
    OTEL --> METRICS
```

---

## 2. Monorepo Structure

```mermaid
graph LR
    subgraph "Southern Haulers Monorepo"
        subgraph "apps/"
            WEB_APP[web/<br/>Client Portal]
            ADMIN_APP[admin/<br/>Dispatch & Billing]
            DRIVER_APP[driver/<br/>PWA Offline]
            QUOTE_APP[quote-crm/<br/>CPQ System]
            RECRUIT_APP[recruiting/<br/>AI Hiring]
        end

        subgraph "packages/"
            UI[ui/<br/>Design System<br/>Radix + Tailwind]
            DB[db/<br/>Schema + Migrations<br/>Supabase Client]
            AUTH_PKG[auth/<br/>WorkOS + RBAC/ABAC]
            AGENTS[agents/<br/>Appointment, Exception<br/>Compliance, Pricing]
            OBS[observability/<br/>OpenTelemetry<br/>Logger + Tracer]
            UTILS[utils/<br/>Shared Types<br/>Validators]
        end

        subgraph "integration/"
            PORTPRO_INT[portpro/<br/>Webhooks + API Client<br/>Mappers + Tests]
            EDI_INT[edi/<br/>X12 Parser<br/>Broker Integration]
        end

        subgraph "docs/"
            QUICKSTART[QuickStart.md]
            PORTPRO_DOC[PortPro-Integration.md]
            SEO_DOC[SEO-Programmatic.md]
            SECURITY_DOC[Security-Compliance.md]
            ADR[adr/<br/>Decision Records]
            RESEARCH[research/<br/>MCP-backed Notes]
        end
    end

    WEB_APP --> UI
    WEB_APP --> DB
    WEB_APP --> AUTH_PKG
    ADMIN_APP --> UI
    ADMIN_APP --> DB
    ADMIN_APP --> AGENTS
    DRIVER_APP --> UI
    DRIVER_APP --> DB
    QUOTE_APP --> UI
    QUOTE_APP --> DB
    QUOTE_APP --> AGENTS
    RECRUIT_APP --> UI
    RECRUIT_APP --> DB

    ADMIN_APP --> PORTPRO_INT
    ADMIN_APP --> EDI_INT

    PORTPRO_INT --> OBS
    EDI_INT --> OBS
```

---

## 3. Event-Driven Integration Flow

```mermaid
sequenceDiagram
    participant PortPro as PortPro System
    participant Webhook as Webhook Endpoint
    participant Queue as Redis Queue
    participant Worker as Idempotent Worker
    participant DB as Supabase
    participant DLQ as Dead Letter Queue
    participant Admin as Admin Dashboard
    participant OTel as OpenTelemetry

    PortPro->>Webhook: POST /webhooks/portpro<br/>{event_id, type, data}
    activate Webhook

    Webhook->>Webhook: Verify Signature
    Webhook->>Webhook: Check Idempotency<br/>(event_id + version)

    alt Already Processed
        Webhook-->>PortPro: 200 OK (ACK < 200ms)
    else New Event
        Webhook->>Queue: Enqueue Event
        Webhook->>OTel: Emit Trace Span
        Webhook-->>PortPro: 200 OK (ACK < 200ms)
        deactivate Webhook

        Queue->>Worker: Dequeue Event
        activate Worker

        Worker->>Worker: Validate Schema

        alt Valid Event
            Worker->>Worker: Map PortPro → Domain<br/>(load → shipment)
            Worker->>DB: Upsert Shipment<br/>(Idempotent)
            Worker->>OTel: Emit Success Metric
            Worker->>Queue: ACK
        else Invalid/Failed
            Worker->>Worker: Retry with Expo Backoff
            alt Max Retries Exceeded
                Worker->>DLQ: Move to DLQ
                Worker->>OTel: Emit Error Metric
                Worker->>Admin: Alert Ops Team
            end
        end
        deactivate Worker
    end
```

---

## 4. PortPro Integration Architecture

```mermaid
graph TB
    subgraph "PortPro System of Record"
        PP_LOADS[Loads/Shipments]
        PP_STATUS[Status Updates]
        PP_INVOICES[Invoices]
        PP_DRIVERS[Drivers]
        PP_VEHICLES[Vehicles]
    end

    subgraph "Feature-Flagged Integration"
        FLAG{portpro.enabled?}
    end

    subgraph "Webhook Ingestion"
        WEBHOOK[Webhook Receiver<br/>Signature Verify<br/>ACK < 200ms]
        QUEUE[Redis Queue<br/>Idempotent Processing]
    end

    subgraph "Mapping Layer"
        LOAD_MAP[Load Mapper<br/>PortPro → Shipment]
        STATUS_MAP[Status Mapper<br/>Events → Timeline]
        INVOICE_MAP[Invoice Mapper<br/>PortPro → Billing]
        DRIVER_MAP[Driver Mapper<br/>Mirror + Enrich]
    end

    subgraph "Southern Haulers Domain"
        SH_SHIPMENT[Shipments<br/>Read Model]
        SH_STATUS[Status Events<br/>Audit Trail]
        SH_INVOICE[Invoices<br/>Billing Engine]
        SH_DRIVER[Drivers<br/>+ Compliance Data]
    end

    subgraph "Authority Swap Strategy"
        SWAP{Authority<br/>Config per Org}
        SH_SOURCE[SH as Source]
        PP_SOURCE[PortPro as Source]
    end

    subgraph "API Client"
        TOKEN_MGR[Token Manager<br/>Access + Refresh<br/>Proactive Rotation]
        API_CLIENT[PortPro REST Client<br/>Rate Limiting]
    end

    PP_LOADS -->|Webhook| WEBHOOK
    PP_STATUS -->|Webhook| WEBHOOK
    PP_INVOICES -->|Webhook| WEBHOOK
    PP_DRIVERS -->|Webhook| WEBHOOK

    WEBHOOK --> FLAG
    FLAG -->|Enabled| QUEUE
    FLAG -->|Disabled| SH_SOURCE

    QUEUE --> LOAD_MAP
    QUEUE --> STATUS_MAP
    QUEUE --> INVOICE_MAP
    QUEUE --> DRIVER_MAP

    LOAD_MAP --> SH_SHIPMENT
    STATUS_MAP --> SH_STATUS
    INVOICE_MAP --> SH_INVOICE
    DRIVER_MAP --> SH_DRIVER

    SH_SHIPMENT --> SWAP
    SWAP -->|PP Authority| PP_SOURCE
    SWAP -->|SH Authority| SH_SOURCE

    API_CLIENT --> TOKEN_MGR
    API_CLIENT --> PP_LOADS
    API_CLIENT --> PP_STATUS
```

---

## 5. Quote-to-Shipment Workflow

```mermaid
stateDiagram-v2
    [*] --> LeadCapture

    LeadCapture --> QuoteCreated: Customer inquiry

    state QuoteCreated {
        [*] --> DraftQuote
        DraftQuote --> CalculateBase: Add lane details
        CalculateBase --> AddAccessorials: Base rate locked
        AddAccessorials --> ReviewQuote: TMF, Per-diem, Demurrage
        ReviewQuote --> [*]
    }

    QuoteCreated --> PendingApproval: Submit for approval

    state PendingApproval {
        [*] --> ManagerReview
        ManagerReview --> PricingAgentCheck: Auto-check margins
        PricingAgentCheck --> Approved: Within bounds
        PricingAgentCheck --> Escalated: Out of bounds
        Escalated --> ExecutiveReview
        ExecutiveReview --> Approved
        ExecutiveReview --> Rejected
    }

    PendingApproval --> Approved: Manager approves
    PendingApproval --> Rejected: Declined

    Approved --> CustomerReview: Send quote
    CustomerReview --> Accepted: Customer accepts
    CustomerReview --> Negotiation: Customer counters
    Negotiation --> QuoteCreated: Update quote
    CustomerReview --> Lost: Customer declines

    Accepted --> ShipmentCreated: Convert to shipment

    state ShipmentCreated {
        [*] --> Unassigned
        Unassigned --> AppointmentAgent: Trigger agent
        AppointmentAgent --> SlotCandidates: Check terminal rules
        SlotCandidates --> DispatchReview: Recommend slots
        DispatchReview --> Assigned: Assign driver + slot
    }

    ShipmentCreated --> InTransit: Driver en route

    state InTransit {
        [*] --> PickupPending
        PickupPending --> ExceptionAgent: ETA variance check
        ExceptionAgent --> AtRisk: TMF/Demurrage risk
        AtRisk --> Escalate: Alert ops
        PickupPending --> PickedUp: POD captured
        PickedUp --> InTransitToDelivery
        InTransitToDelivery --> Delivered: BOL signed
    }

    InTransit --> Completed: Delivery confirmed

    Completed --> InvoiceGenerated: Auto-invoice
    InvoiceGenerated --> Paid: Payment received
    Paid --> [*]

    Rejected --> [*]
    Lost --> [*]
```

---

## 6. Agent Orchestration

```mermaid
graph TB
    subgraph "Trigger Events"
        E1[Shipment Created]
        E2[ETA Change]
        E3[Status Update]
        E4[Compliance Check Needed]
        E5[Quote Pricing Request]
    end

    subgraph "Agent Dispatcher"
        DISPATCH{Event Router}
    end

    subgraph "Appointment Agent"
        AA_INPUT[Inputs:<br/>Terminal Rules<br/>Port Hours<br/>Cutoffs<br/>Driver Capacity<br/>ETA]
        AA_PROCESS[Process:<br/>Parse terminal docs<br/>Check gate hours<br/>Validate constraints<br/>Rank candidates]
        AA_OUTPUT[Outputs:<br/>Candidate Slots<br/>Risk Notes<br/>Dispatcher Approval]
    end

    subgraph "Exception Agent"
        EA_INPUT[Inputs:<br/>ETA Variance<br/>Terminal Congestion<br/>Fee Clocks]
        EA_PROCESS[Process:<br/>Calculate risk score<br/>Estimate fees<br/>Identify mitigations]
        EA_OUTPUT[Outputs:<br/>Risk Score<br/>Recommended Actions<br/>Escalations]
    end

    subgraph "Compliance Agent"
        CA_INPUT[Inputs:<br/>TWIC Status<br/>Leasing Artifacts<br/>Clearinghouse Consent]
        CA_PROCESS[Process:<br/>Validate checklist<br/>Check expiry dates<br/>Verify signatures]
        CA_OUTPUT[Outputs:<br/>Blocking Issues<br/>Expiry Reminders<br/>Required Actions]
    end

    subgraph "Pricing Agent"
        PA_INPUT[Inputs:<br/>Lane Baseline<br/>Accessorials<br/>Capacity Index<br/>Market Rates]
        PA_PROCESS[Process:<br/>Fetch market data<br/>Apply modifiers<br/>Calculate margins<br/>Generate rationale]
        PA_OUTPUT[Outputs:<br/>Price + Rationale<br/>Approval Route<br/>Confidence Score]
    end

    subgraph "Action Layer"
        NOTIFY[Notify Dispatcher]
        UPDATE_DB[Update Database]
        LOG[Audit Log]
        ESCALATE[Escalation Queue]
    end

    E1 --> DISPATCH
    E2 --> DISPATCH
    E3 --> DISPATCH
    E4 --> DISPATCH
    E5 --> DISPATCH

    DISPATCH -->|appointment.enabled| AA_INPUT
    DISPATCH -->|exception.enabled| EA_INPUT
    DISPATCH -->|compliance.enabled| CA_INPUT
    DISPATCH -->|pricing.enabled| PA_INPUT

    AA_INPUT --> AA_PROCESS --> AA_OUTPUT
    EA_INPUT --> EA_PROCESS --> EA_OUTPUT
    CA_INPUT --> CA_PROCESS --> CA_OUTPUT
    PA_INPUT --> PA_PROCESS --> PA_OUTPUT

    AA_OUTPUT --> NOTIFY
    EA_OUTPUT --> NOTIFY
    CA_OUTPUT --> NOTIFY
    PA_OUTPUT --> NOTIFY

    AA_OUTPUT --> UPDATE_DB
    EA_OUTPUT --> UPDATE_DB
    CA_OUTPUT --> UPDATE_DB
    PA_OUTPUT --> UPDATE_DB

    AA_OUTPUT --> LOG
    EA_OUTPUT --> LOG
    CA_OUTPUT --> LOG
    PA_OUTPUT --> LOG

    EA_OUTPUT --> ESCALATE
    CA_OUTPUT --> ESCALATE
```

---

## 7. Compliance Workflows

### 7.1 Driver Lease-On Process (49 CFR Part 376)

```mermaid
sequenceDiagram
    participant Driver as Driver Applicant
    participant Portal as Recruiting Portal
    participant Compliance as Compliance Service
    participant Agent as Compliance Agent
    participant Storage as Document Storage
    participant Admin as Admin Review

    Driver->>Portal: Start Application
    Portal->>Compliance: Initiate Checklist

    loop Required Documents
        Compliance->>Driver: Request Document<br/>(COI, W-9, Bank Info, License)
        Driver->>Portal: Upload Document
        Portal->>Storage: Store with Version Hash
        Portal->>Compliance: Document Uploaded
    end

    Compliance->>Agent: Validate Checklist

    Agent->>Agent: Check:<br/>- TWIC Status<br/>- License Validity<br/>- Insurance Coverage<br/>- Clearinghouse Consent

    alt All Valid
        Agent->>Compliance: Checklist Complete
        Compliance->>Driver: Send Lease Agreement<br/>(Truth-in-Leasing)
        Driver->>Portal: E-Sign Agreement
        Portal->>Storage: Store Signed PDF<br/>(Immutable)
        Portal->>Compliance: Lease Executed
        Compliance->>Admin: Ready for Onboarding
    else Missing Items
        Agent->>Compliance: Blocking Issues
        Compliance->>Driver: Request Missing Items
    end

    loop Ongoing Monitoring
        Agent->>Agent: Check Expiry Dates<br/>(TWIC, Insurance, License)
        Agent->>Admin: Alert 30 Days Before Expiry
    end
```

### 7.2 FMCSA Clearinghouse Consent

```mermaid
stateDiagram-v2
    [*] --> ConsentNeeded

    ConsentNeeded --> ConsentRequested: Trigger consent flow

    state ConsentRequested {
        [*] --> SendConsent
        SendConsent --> DriverNotified: Email + SMS
        DriverNotified --> AwaitingSignature
    }

    ConsentRequested --> ConsentSigned: Driver signs
    ConsentRequested --> ConsentExpired: 7 days no response

    ConsentSigned --> ClearinghouseQuery: Submit to FMCSA

    state ClearinghouseQuery {
        [*] --> QueryPending
        QueryPending --> ResultReceived
        ResultReceived --> ParseResult
    }

    ClearinghouseQuery --> ClearResult: No violations
    ClearinghouseQuery --> ViolationFound: Violations present

    ClearResult --> Approved: Add to driver pool
    Approved --> [*]

    ViolationFound --> AdminReview: Requires review
    AdminReview --> Approved: Resolved
    AdminReview --> Rejected: Disqualified

    Rejected --> [*]
    ConsentExpired --> [*]
```

---

## 8. Domain Model

```mermaid
erDiagram
    ORGANIZATION ||--o{ USER : has
    ORGANIZATION ||--o{ SHIPMENT : owns
    ORGANIZATION ||--o{ DRIVER : employs
    ORGANIZATION ||--o{ VEHICLE : owns
    ORGANIZATION ||--o{ QUOTE : creates
    ORGANIZATION ||--o{ INVOICE : generates

    USER {
        uuid id PK
        uuid org_id FK
        string email
        string role
        jsonb permissions
        timestamp created_at
    }

    ORGANIZATION {
        uuid id PK
        string name
        string dot_number
        string mc_number
        jsonb authority_config
        jsonb feature_flags
        timestamp created_at
    }

    SHIPMENT {
        uuid id PK
        uuid org_id FK
        uuid quote_id FK
        string external_id
        string status
        jsonb origin
        jsonb destination
        timestamp pickup_date
        timestamp delivery_date
        jsonb accessorials
        decimal base_rate
        decimal total_amount
        timestamp created_at
    }

    SHIPMENT ||--o{ SHIPMENT_STATUS_EVENT : has
    SHIPMENT ||--|| DRIVER_ASSIGNMENT : assigned_to
    SHIPMENT ||--o{ DOCUMENT : has

    SHIPMENT_STATUS_EVENT {
        uuid id PK
        uuid shipment_id FK
        string status
        timestamp occurred_at
        jsonb metadata
        string source
    }

    DRIVER {
        uuid id PK
        uuid org_id FK
        string name
        string license_number
        string twic_number
        date twic_expiry
        jsonb clearinghouse_consent
        jsonb compliance_data
        timestamp created_at
    }

    DRIVER_ASSIGNMENT {
        uuid id PK
        uuid shipment_id FK
        uuid driver_id FK
        uuid vehicle_id FK
        timestamp assigned_at
        timestamp completed_at
    }

    DRIVER_ASSIGNMENT ||--|| DRIVER : assigns
    DRIVER_ASSIGNMENT ||--|| VEHICLE : uses

    VEHICLE {
        uuid id PK
        uuid org_id FK
        string vin
        string license_plate
        string type
        jsonb inspection_data
        timestamp created_at
    }

    QUOTE {
        uuid id PK
        uuid org_id FK
        uuid customer_id FK
        string status
        integer version
        jsonb lane_data
        decimal base_rate
        jsonb accessorials
        decimal total_amount
        string approval_status
        timestamp created_at
        timestamp approved_at
    }

    QUOTE ||--o{ QUOTE_VERSION : has_versions
    QUOTE ||--|| SHIPMENT : converts_to

    QUOTE_VERSION {
        uuid id PK
        uuid quote_id FK
        integer version
        jsonb pricing_data
        jsonb changes
        uuid created_by FK
        timestamp created_at
    }

    INVOICE {
        uuid id PK
        uuid org_id FK
        uuid shipment_id FK
        string invoice_number
        string status
        decimal subtotal
        decimal tax
        decimal total
        timestamp due_date
        timestamp paid_at
        timestamp created_at
    }

    INVOICE ||--|| SHIPMENT : bills_for

    DOCUMENT {
        uuid id PK
        uuid shipment_id FK
        string type
        string storage_path
        string version_hash
        jsonb metadata
        timestamp uploaded_at
    }

    TERMINAL_APPOINTMENT {
        uuid id PK
        uuid shipment_id FK
        string terminal_code
        timestamp slot_start
        timestamp slot_end
        string status
        jsonb constraints
        timestamp created_at
    }

    SHIPMENT ||--o{ TERMINAL_APPOINTMENT : has

    COMPLIANCE_ARTIFACT {
        uuid id PK
        uuid driver_id FK
        string artifact_type
        string storage_path
        string version_hash
        date expiry_date
        timestamp created_at
    }

    DRIVER ||--o{ COMPLIANCE_ARTIFACT : has

    AGENT_EXECUTION {
        uuid id PK
        string agent_type
        uuid entity_id
        jsonb inputs
        jsonb outputs
        string status
        timestamp started_at
        timestamp completed_at
    }
```

---

## 9. User Journeys

### 9.1 Customer Quote Request → Booking

```mermaid
journey
    title Customer Journey: Quote to Booking
    section Discovery
      Find SH via SEO: 5: Customer
      Land on city page: 5: Customer
      View terminal map: 4: Customer
      Read TMF calculator: 4: Customer
    section Quote Request
      Fill quote form: 3: Customer
      Submit inquiry: 4: Customer
      Receive quote: 5: Customer, Sales
    section Review
      Review pricing: 4: Customer
      Check timeline: 4: Customer
      Compare alternatives: 3: Customer
    section Decision
      Accept quote: 5: Customer, Sales
      Book shipment: 5: Customer, Sales, Dispatcher
    section Tracking
      Login to portal: 4: Customer
      View live status: 5: Customer
      Receive updates: 5: Customer, System
    section Completion
      Delivery confirmed: 5: Customer, Driver
      Receive invoice: 4: Customer, Billing
      Make payment: 4: Customer
```

### 9.2 Dispatcher Workflow

```mermaid
journey
    title Dispatcher Journey: Daily Operations
    section Morning
      Review dashboard: 5: Dispatcher
      Check pending shipments: 4: Dispatcher
      Review agent alerts: 4: Dispatcher, AI
    section Assignment
      View available drivers: 4: Dispatcher
      Check appointment slots: 5: Dispatcher, AI
      Assign driver + slot: 5: Dispatcher
    section Monitoring
      Track live shipments: 5: Dispatcher, System
      Handle exceptions: 3: Dispatcher, AI
      Resolve TMF risks: 4: Dispatcher, AI
    section Communication
      Update customers: 4: Dispatcher, Customer
      Coordinate with drivers: 4: Dispatcher, Driver
      Escalate issues: 3: Dispatcher, Manager
    section Closing
      Confirm deliveries: 5: Dispatcher, Driver
      Trigger invoices: 5: Dispatcher, System
      Review metrics: 4: Dispatcher
```

### 9.3 Driver Experience

```mermaid
journey
    title Driver Journey: Daily Route
    section Pre-Shift
      Login to PWA: 5: Driver
      Review assignments: 5: Driver, System
      Check terminal notes: 4: Driver, System
    section En Route to Pickup
      Navigate to terminal: 5: Driver, GPS
      Update ETA: 4: Driver, System
      Check-in at gate: 4: Driver
    section Pickup
      Show TWIC: 4: Driver, Terminal
      Load container: 3: Driver, Terminal
      Capture BOL photo: 4: Driver
    section In Transit
      Update status: 4: Driver, System
      Receive alerts: 4: Driver, AI
      Navigate to destination: 5: Driver, GPS
    section Delivery
      Arrive at consignee: 5: Driver
      Unload container: 3: Driver, Consignee
      Get POD signature: 5: Driver, Consignee
      Upload POD offline: 5: Driver
    section Post-Delivery
      Complete shipment: 5: Driver, System
      Review next assignment: 5: Driver, Dispatcher
```

---

## 10. Data Flow & Authority Model

```mermaid
graph TB
    subgraph "Data Sources"
        PORTPRO_SRC[PortPro API<br/>System of Record]
        SH_SRC[Southern Haulers<br/>Internal]
        EDI_SRC[EDI Broker<br/>X12 Messages]
        TERMINAL_SRC[Terminal APIs<br/>eModal, TMF]
    end

    subgraph "Authority Configuration"
        ORG_CONFIG{Organization<br/>Authority Config}
        FLAG_LOADS[Loads Authority:<br/>PortPro vs SH]
        FLAG_DRIVERS[Drivers Authority:<br/>PortPro vs SH]
        FLAG_INVOICES[Invoices Authority:<br/>PortPro vs SH]
    end

    subgraph "Mapping & Transformation"
        PP_MAPPER[PortPro Mapper<br/>Load → Shipment]
        EDI_MAPPER[EDI Mapper<br/>X12 → Domain]
        ENRICHER[Data Enricher<br/>Merge Sources]
    end

    subgraph "Southern Haulers Domain"
        SHIPMENT_DOMAIN[Shipments<br/>Unified Model]
        DRIVER_DOMAIN[Drivers<br/>+ Compliance]
        INVOICE_DOMAIN[Invoices<br/>+ Billing Rules]
    end

    subgraph "Read Models & Views"
        WEB_VIEW[Web Portal<br/>Customer View]
        ADMIN_VIEW[Admin Dashboard<br/>Ops View]
        DRIVER_VIEW[Driver PWA<br/>Mobile View]
        ANALYTICS[Analytics<br/>BI Dashboards]
    end

    subgraph "Write Paths"
        CREATE_SHIPMENT[Create Shipment]
        UPDATE_STATUS[Update Status]
        ASSIGN_DRIVER[Assign Driver]
    end

    PORTPRO_SRC --> PP_MAPPER
    EDI_SRC --> EDI_MAPPER
    SH_SRC --> ENRICHER

    PP_MAPPER --> ORG_CONFIG
    EDI_MAPPER --> ORG_CONFIG

    ORG_CONFIG --> FLAG_LOADS
    ORG_CONFIG --> FLAG_DRIVERS
    ORG_CONFIG --> FLAG_INVOICES

    FLAG_LOADS -->|PortPro Authority| PP_MAPPER
    FLAG_LOADS -->|SH Authority| SH_SRC

    PP_MAPPER --> ENRICHER
    EDI_MAPPER --> ENRICHER
    TERMINAL_SRC --> ENRICHER

    ENRICHER --> SHIPMENT_DOMAIN
    ENRICHER --> DRIVER_DOMAIN
    ENRICHER --> INVOICE_DOMAIN

    SHIPMENT_DOMAIN --> WEB_VIEW
    SHIPMENT_DOMAIN --> ADMIN_VIEW
    SHIPMENT_DOMAIN --> DRIVER_VIEW
    SHIPMENT_DOMAIN --> ANALYTICS

    DRIVER_DOMAIN --> ADMIN_VIEW
    DRIVER_DOMAIN --> DRIVER_VIEW

    INVOICE_DOMAIN --> WEB_VIEW
    INVOICE_DOMAIN --> ADMIN_VIEW

    CREATE_SHIPMENT --> SHIPMENT_DOMAIN
    UPDATE_STATUS --> SHIPMENT_DOMAIN
    ASSIGN_DRIVER --> SHIPMENT_DOMAIN

    CREATE_SHIPMENT -.->|If Enabled| PORTPRO_SRC
    UPDATE_STATUS -.->|If Enabled| PORTPRO_SRC
```

---

## 11. Observability & Monitoring

```mermaid
graph TB
    subgraph "Application Layer"
        WEB_METRICS[Web App<br/>Client Metrics]
        API_METRICS[API Services<br/>Server Metrics]
        WORKER_METRICS[Queue Workers<br/>Job Metrics]
        AGENT_METRICS[AI Agents<br/>Execution Metrics]
    end

    subgraph "OpenTelemetry Collection"
        OTEL_COLLECTOR[OTel Collector<br/>Traces + Metrics + Logs]
    end

    subgraph "Metrics Categories"
        PERF[Performance<br/>LCP, CLS, INP<br/>API p95 latency]
        RELIABILITY[Reliability<br/>Webhook SLO<br/>Queue Depth<br/>Error Rate]
        BUSINESS[Business<br/>Quote Conversion<br/>TMF Savings<br/>Driver Utilization]
        SECURITY[Security<br/>Failed Auth<br/>RLS Violations<br/>Token Rotation]
    end

    subgraph "Storage & Querying"
        TIMESERIES[(Time-Series DB<br/>Prometheus)]
        LOGS[(Log Storage<br/>Loki/CloudWatch)]
        TRACES[(Trace Storage<br/>Tempo/Jaeger)]
    end

    subgraph "Alerting & Dashboards"
        ALERTS[Alert Manager<br/>PagerDuty/Slack]
        DASH_OPS[Ops Dashboard<br/>Webhook + Queue Health]
        DASH_BUSINESS[Business Dashboard<br/>Revenue + Conversion]
        DASH_PERF[Performance Dashboard<br/>Core Web Vitals]
    end

    WEB_METRICS --> OTEL_COLLECTOR
    API_METRICS --> OTEL_COLLECTOR
    WORKER_METRICS --> OTEL_COLLECTOR
    AGENT_METRICS --> OTEL_COLLECTOR

    OTEL_COLLECTOR --> PERF
    OTEL_COLLECTOR --> RELIABILITY
    OTEL_COLLECTOR --> BUSINESS
    OTEL_COLLECTOR --> SECURITY

    PERF --> TIMESERIES
    RELIABILITY --> TIMESERIES
    BUSINESS --> TIMESERIES
    SECURITY --> LOGS

    OTEL_COLLECTOR --> LOGS
    OTEL_COLLECTOR --> TRACES

    TIMESERIES --> DASH_OPS
    TIMESERIES --> DASH_BUSINESS
    TIMESERIES --> DASH_PERF

    LOGS --> DASH_OPS
    TRACES --> DASH_OPS

    DASH_OPS --> ALERTS
    DASH_BUSINESS --> ALERTS
    DASH_PERF --> ALERTS

    style ALERTS fill:#ff6b6b
    style DASH_OPS fill:#4ecdc4
    style DASH_BUSINESS fill:#95e1d3
    style DASH_PERF fill:#f38181
```

---

## 12. Security & Access Control

### 12.1 Authentication & Authorization Flow

```mermaid
sequenceDiagram
    participant User as User/Client
    participant Edge as Edge Runtime
    participant WorkOS as WorkOS SSO
    participant AuthService as Auth Service
    participant DB as Supabase (RLS)
    participant Resource as Protected Resource

    User->>Edge: Request Resource
    Edge->>Edge: Check Session Cookie

    alt No Session
        Edge->>WorkOS: Redirect to SSO
        WorkOS->>User: Show Login
        User->>WorkOS: Authenticate
        WorkOS->>Edge: OAuth Callback + Code
        Edge->>WorkOS: Exchange Code for Tokens
        WorkOS-->>Edge: Access + Refresh Tokens
        Edge->>AuthService: Validate & Create Session
        AuthService->>DB: Query User + Org + Roles
        DB-->>AuthService: User Data + Permissions
        AuthService-->>Edge: Session Token
        Edge-->>User: Set Cookie + Redirect
    end

    User->>Edge: Request Resource (with Session)
    Edge->>AuthService: Validate Session
    AuthService->>AuthService: Decode JWT
    AuthService->>AuthService: Check RBAC Rules

    alt Authorized
        AuthService-->>Edge: Claims + Org Context
        Edge->>DB: Query with RLS Context
        Note over DB: RLS filters by org_id<br/>ABAC checks permissions
        DB-->>Edge: Filtered Data
        Edge-->>User: Response
    else Unauthorized
        AuthService-->>Edge: 403 Forbidden
        Edge-->>User: Access Denied
    end
```

### 12.2 Row-Level Security (RLS) Model

```mermaid
graph TB
    subgraph "Request Context"
        JWT[JWT Claims<br/>user_id, org_id, role]
    end

    subgraph "RLS Policies (Supabase)"
        POLICY_ORG[Organization Isolation<br/>WHERE org_id = current_org_id]
        POLICY_USER[User-Owned Data<br/>WHERE user_id = current_user_id]
        POLICY_ROLE[Role-Based Access<br/>WHERE role IN allowed_roles]
        POLICY_ABAC[Attribute-Based<br/>WHERE check_permission jsonb]
    end

    subgraph "Protected Tables"
        TBL_SHIPMENT[(shipments)]
        TBL_QUOTE[(quotes)]
        TBL_INVOICE[(invoices)]
        TBL_DRIVER[(drivers)]
        TBL_USER[(users)]
        TBL_COMPLIANCE[(compliance_artifacts)]
    end

    JWT --> POLICY_ORG
    JWT --> POLICY_USER
    JWT --> POLICY_ROLE
    JWT --> POLICY_ABAC

    POLICY_ORG --> TBL_SHIPMENT
    POLICY_ORG --> TBL_QUOTE
    POLICY_ORG --> TBL_INVOICE
    POLICY_ORG --> TBL_DRIVER

    POLICY_USER --> TBL_USER

    POLICY_ROLE --> TBL_COMPLIANCE

    POLICY_ABAC --> TBL_SHIPMENT
    POLICY_ABAC --> TBL_QUOTE

    style POLICY_ORG fill:#4ecdc4
    style POLICY_ABAC fill:#ff6b6b
```

### 12.3 Feature Flag & Authority Configuration

```mermaid
graph LR
    subgraph "Organization Config"
        ORG[Organization Record]
        FLAGS[feature_flags JSONB]
        AUTHORITY[authority_config JSONB]
    end

    subgraph "Feature Flags"
        FF_PORTPRO[portpro.enabled]
        FF_EDI[edi.enabled]
        FF_AGENTS[agents.*.enabled]
    end

    subgraph "Authority Config"
        AUTH_LOADS[loads: 'portpro' | 'sh']
        AUTH_DRIVERS[drivers: 'portpro' | 'sh']
        AUTH_INVOICES[invoices: 'portpro' | 'sh']
    end

    subgraph "Runtime Behavior"
        CHECK{Check Flag}
        ROUTE{Route by Authority}
        PP_INTEGRATION[PortPro Integration]
        SH_INTERNAL[SH Internal]
    end

    ORG --> FLAGS
    ORG --> AUTHORITY

    FLAGS --> FF_PORTPRO
    FLAGS --> FF_EDI
    FLAGS --> FF_AGENTS

    AUTHORITY --> AUTH_LOADS
    AUTHORITY --> AUTH_DRIVERS
    AUTHORITY --> AUTH_INVOICES

    FF_PORTPRO --> CHECK
    AUTH_LOADS --> ROUTE

    CHECK -->|Enabled| ROUTE
    CHECK -->|Disabled| SH_INTERNAL

    ROUTE -->|'portpro'| PP_INTEGRATION
    ROUTE -->|'sh'| SH_INTERNAL
```

---

## Diagram Summary

These diagrams cover:

1. **System Architecture Overview** - Complete tech stack and component interactions
2. **Monorepo Structure** - Apps, packages, integrations, docs organization
3. **Event-Driven Integration Flow** - Webhook → Queue → Worker pattern with idempotency
4. **PortPro Integration Architecture** - Feature-flagged sync with authority swap strategy
5. **Quote-to-Shipment Workflow** - Complete state machine from lead to payment
6. **Agent Orchestration** - AI agents for appointments, exceptions, compliance, pricing
7. **Compliance Workflows** - Driver lease-on and FMCSA Clearinghouse consent flows
8. **Domain Model** - Complete ERD with relationships and key fields
9. **User Journeys** - Customer, dispatcher, and driver experience maps
10. **Data Flow & Authority Model** - Multi-source data integration with configurable authority
11. **Observability & Monitoring** - OpenTelemetry-based metrics, traces, logs, and dashboards
12. **Security & Access Control** - WorkOS SSO, RLS policies, RBAC/ABAC, feature flags

---

**Next Steps:**
- Use these diagrams as architectural blueprints during implementation
- Update diagrams as new features/integrations are added
- Reference in ADRs (Architecture Decision Records)
- Share with stakeholders for alignment
