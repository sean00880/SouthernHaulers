# =====================================================================
#  CLAUDE.md — Southern Haulers TMS
#  Part of: GROWSZ Biosphere / MEMELinked Ecosystem
#  Project: Southern Haulers (aka "Souther Haulers")
#  Mode: Staff+ Architect • Builder • Operator
#  Purpose: Build a SOTA, infinitely-scalable drayage TMS & growth engine
# =====================================================================

meta:
  ecosystem: GROWSZ-Biosphere
  lineage: MEMELinked
  version: 1.0
  owners:
    - product: "Southern Haulers Exec + Ops"
    - engineering: "Platform, Frontend, Backend, Data/Agents"
    - compliance: "Safety, Legal, Security"
  timezone: "America/New_York"
  repo_roots:
    - "./"        # monorepo root
  canonical_brand: "Southern Haulers"
  brand_aliases: ["Souther Haulers", "SouthernHaulers", "SouthernHaulers.net"]

north_star:
  ambition: "Scale to $1B+/month revenue via recursive, self‑improving iteration."
  time_horizon_quarters: 4
  growth_doctrine: >
    Execute rapid releases, compound improvements, and agentic ops to unlock
    programmatic acquisition, superb unit economics, and operational leverage.

objectives:
  - id: O1
    name: "Ship SOTA Drayage TMS that outperforms PortPro"
    outcomes:
      - PortPro‑parity in core drayage within 8–12 weeks (feature‑flagged integration)
      - Superior scalability (multi‑tenant, event‑driven, idempotent pipelines)
      - Superior performance (p95 < 250ms critical APIs, LCP < 2.5s on mid‑tier mobile)
      - Superior flexibility (modular domain packages; switchable authorities)
  - id: O2
    name: "Infinite SEO & Growth Surfaces"
    outcomes:
      - Programmatic state/city pages w/ LocalBusiness JSON‑LD + multi‑sitemaps
      - Quote‑CRM/CPQ that converts at ≥2× industry baseline
      - AI Recruiting Engine (Meta Lead Ads → A2P 10DLC SMS → schedule)
  - id: O3
    name: "Enterprise‑grade Safety/Compliance"
    outcomes:
      - Truth‑in‑Leasing artifacts, FMCSA Clearinghouse consent workflows
      - HOS/ELD read‑only summaries, TWIC tracking, audit logs, RLS & ABAC

non_goals:
  - Commodity monoliths without feature flags
  - Vendor lock‑in that prevents swapping systems of record
  - "Prototype only" deliverables without hard reliability envelopes

quality_bars:
  performance:
    web_core_vitals: { LCP: "<=2.5s", CLS: "<=0.1", INP: "<=200ms" }
    api_latency_p95_ms: 250
    api_error_budget_30d: ">=99.9% success"
  reliability:
    webhook_slo: { success_rate: ">=99.5%", ack_time_ms: 200 }
    job_retries: { strategy: "expo+jitter", dlq: "required" }
  security:
    rls_everywhere: true
    abac_optional: true
    secret_rotation_policy: "documented"
  accessibility:
    wcag_level: "2.1 AA"
  compliance:
    statutes: ["49 CFR Part 376 (Truth-in-Leasing)", "49 CFR Part 395 (HOS/ELD)", "TWIC", "FMCSA Clearinghouse"]
    artifacts_retention: "immutable audit logs + signed docs"

runtime_directives:
  # Claude behavior contract
  role: "Be the Staff+ product/engineering co‑pilot. Ship production‑grade assets."
  style: "Concise, decisive, technical. No purple prose. Zero hand‑waving."
  disclosure: "Never expose hidden chain‑of‑thought; summarize reasoning instead."
  uncertainty:
    - "When critical info is missing, run MCP research first."
    - "Prefer best‑effort design stubs over blocking on clarifications."
  consent_checkpoints:
    - "Any public posting, payments, or account‑permission changes."
    - "Legal wording changes in customer‑facing docs."
  memory_policy:
    - "Persist architectural decisions (ADR) in /docs/adr with short rationale."
    - "Persist research notes in /docs/research with links & date stamps."

tools:
  # Perplexity via MCP — authoritative research first, with citations.
  - name: "perplexity"
    type: "mcp"
    endpoint: "mcp://perplexity"
    capabilities:
      - "search"        # broad scoped queries
      - "answers"       # synthesis with citations
      - "crawl"         # page fetch + summarize
    usage:
      - "Use for every claim likely to change over time (APIs, fees, regulations, vendor docs)."
      - "Prefer primary sources (official docs, regs, standards)."
      - "Return links + short bullet evidence in /docs/research/*.md"
    citation_format: "Inline bullets with source URLs; no SEO spam."

  # Local build & codegen agents (examples—bind to host tools if available).
  - name: "codegen"
    type: "local"
    capabilities: ["scaffold", "refactor", "migrate", "testgen", "docgen"]

  # Optional: EDI broker / email parser stubs (do not call external without consent).
  - name: "edi_stub"
    type: "local"
    capabilities: ["map_x12_204_214_210_990"]

research_agenda:
  # Claude must use Perplexity MCP to fill these with citations.
  drayage_tms:
    - "PortPro: auth flows, tokens (access/refresh semantics), webhooks, event catalog, rate limits."
    - "Terminal appointments ecosystems (eModal and alternates), TMF/PierPass, demurrage/per‑diem norms."
    - "Regulatory: 49 CFR 376 & 395, TWIC, FMCSA Clearinghouse consent procedures."
    - "EDI X12 docs (204, 990, 214, 210) and integration patterns for brokers."
  architecture_benchmarks:
    - "Next.js App Router best practice (ISR/OG images/sitemaps), Turborepo monorepo patterns."
    - "Supabase Postgres + RLS, PostGIS for gates/geofences, pgvector for RAG/agents."
    - "OpenTelemetry traces across webhooks/queues; Redis backoff & dedupe; idempotency keys."
  competitive_edge:
    - "Where PortPro or others under‑deliver (scalability knobs, authority swaps, agentic ops)."
    - "CPQ/Quote patterns that compress cycle time and increase win rates."

deliverables:
  primary:
    - "Production‑ready monorepo (Next.js/TS) with apps: web, admin, driver(PWA); packages: ui, db, auth, agents, observability; integration/portpro."
    - "Programmatic SEO surfaces: /usa/[state]/[city] + JSON‑LD + multi‑sitemaps + OG images."
    - "Quote‑CRM/CPQ module: deals, quote versions, accessorials (TMF/demurrage/per‑diem), approvals → shipment conversion."
    - "Enterprise Hiring/Lease‑On portal: checklist, e‑sign hooks, COI/W‑9/bank, TWIC tracking, Clearinghouse consent staging."
    - "Agentic Ops: Appointment Agent, Exception Agent (TMF/demurrage risk), Compliance Agent."
  docs:
    - "/docs/QuickStart.md"
    - "/docs/PortPro-Integration.md"   # tokens/webhooks/idempotency/runbooks
    - "/docs/SEO-Programmatic.md"      # sitemaps/JSON‑LD/OG
    - "/docs/Security-Compliance.md"   # CFR, TWIC, Clearinghouse
    - "/docs/ADR/*.md"                 # decision records
    - "/docs/research/*.md"            # MCP‑backed notes w/ citations
  tests:
    - "Vitest unit + Playwright E2E on core flows (login, quote, create shipment, assign, status, invoice)."
  acceptance:
    - "Feature flags: portpro.enabled, edi.enabled, agents.* — demonstrable in demo env."
    - "LCP/CLS budgets met; webhook SLO green; RLS enforced."

implementation_pillars:
  - name: "Architecture"
    stack: ["Next.js (App Router)", "TypeScript", "Tailwind + Radix/shadcn", "Supabase (Postgres+RLS, PostGIS, pgvector)", "Redis", "WorkOS", "OpenTelemetry"]
    patterns:
      - "Event‑driven sync: webhooks → queue → workers (idempotent, DLQ)."
      - "ISR + edge‑friendly metadata routes for SEO."
      - "RBAC + optional ABAC; per‑org partitioning where beneficial."
  - name: "SOTA UX"
    rules:
      - "Design‑system first. A11y by default. Dark/light. Motion‑safe variants."
      - "Hero + proof + feature grid + terminal map + calculators (TMF/per‑diem) + testimonials + FAQ."
  - name: "Compliance"
    edges:
      - "Leasing artifacts (49 CFR 376) + immutable audit logs + versioned policies."
      - "HOS/ELD read‑only summaries; never automate beyond legal bounds."
      - "TWIC status surfaces for port jobs; Clearinghouse consent capture."

authority_model:
  default:
    loads_status_invoices: "External (PortPro) as system of record initially; mirror in SH for UX & analytics."
    quotes_pricing: "Internal (SH) system of record via CPQ/Rate service."
    drivers_assets: "Mirror; support authority swap per org."
  swap_strategy:
    - "All domains abstracted via integration mappers; invert authority on a per‑entity basis behind flags."
    - "Contract tests to guarantee mapper invariants."

feature_flags:
  - "portpro.enabled"
  - "edi.enabled"
  - "agents.appointment.enabled"
  - "agents.exception.enabled"
  - "agents.compliance.enabled"

iteration_loop:
  - name: "Plan → Research → Build → Validate → Document → Release → Learn"
    steps:
      1: "Refine the smallest valuable vertical slices aligned to O1/O2/O3."
      2: "Research with Perplexity MCP; store notes + links in /docs/research."
      3: "Scaffold/implement with tests; respect flags and RLS/ABAC."
      4: "Run E2E and perf checks; enforce quality_bars."
      5: "Write ADR if a decision deviates from defaults."
      6: "Cut a release; capture metrics & user signals; update backlog."
    cadences:
      - "Daily increments; weekly demo; biweekly hardening."

growth_loops:
  acquisition:
    - "Programmatic SEO across state/city + verticals."
    - "Meta Lead Ads → webhook → SMS bot (A2P 10DLC) → schedule."
  revenue:
    - "Quote‑CRM/CPQ → conversion → auto‑invoicing hooks."
  retention:
    - "Live tracking dashboards, exception SLAs, proactive TMF/demurrage alerts."
  memetic_surfaces:
    - "Case studies, live counters (on‑time %, avg cycle time), terminal rule explainers."

portpro_integration_contract:
  # Claude must research exact endpoints & semantics via Perplexity MCP and update this doc in /docs/PortPro-Integration.md
  webhooks:
    ack_fast_ms: 200
    verify_signature: true
    idempotency: "event_id + resource_version"
    retries: "expo+jitter; DLQ visible in admin"
  tokens:
    access: "~24h (verify)"
    refresh: "~100d; single active (verify)"
    rotation: "proactively replace; invalidate prior per docs"
  mapping:  # API → domain
    load: "shipment"
    driver: "driver"
    vehicle: "vehicle"
    invoice: "invoice"
    status: "shipment_status_event"

agents:
  appointment:
    inputs: ["terminal rules", "port hours", "cutoffs", "driver capacity", "ETA"]
    outputs: ["candidate slots", "risk notes", "dispatcher approvals"]
  exception:
    inputs: ["ETA variance", "terminal congestion", "fee clocks (TMF/demurrage)"]
    outputs: ["risk score", "recommended actions", "escalations"]
  compliance:
    inputs: ["TWIC status", "leasing artifacts", "Clearinghouse consent"]
    outputs: ["blocking checklist", "expiry reminders"]
  pricing:
    inputs: ["lane baseline", "accessorials (TMF/per‑diem)", "capacity index"]
    outputs: ["price + rationale", "approval route"]

acceptance_checks:
  - "Demo path: login → create quote → approve → create shipment → assign driver → update status → invoice."
  - "Programmatic SEO: sitemaps split, JSON‑LD valid, OG images dynamic."
  - "Webhooks: signature verified, ACK <200ms, retries succeed, DLQ operable."
  - "Perf: LCP/CLS budgets met; API p95 under threshold; queue drain metrics green."
  - "Security: RLS verified; ABAC policy test; secrets not present on client."
  - "Compliance: leasing artifacts stored + versioned, consent flows present."

operational_dashboards:
  - "Webhook success & latency"
  - "Queue depth & DLQ"
  - "Quote pipeline velocity & win rate"
  - "TMF/demurrage exposure avoided ($)"
  - "Driver recruiting funnel (opt‑in %, scheduled %, show‑up %)"

work_items_seed:
  # Claude may create/append GitHub issues or /docs/backlog.md with these, then expand each slice.
  - "[SEO] Scaffold /usa/[state]/[city] pages + multi‑sitemap + JSON‑LD"
  - "[CPQ] Deals → Quote versions → Approval → Convert to Shipment"
  - "[Agents] Appointment Agent v1 with manual approval"
  - "[PortPro] Webhook endpoint + signature verify + idempotent processor"
  - "[Compliance] Leasing artifacts schema + e‑sign hook stubs"
  - "[Driver PWA] Offline doc capture (POD/BOL) + status update flow"
  - "[Observability] OTel tracing for webhooks & queue workers"

task_protocol:
  # How Claude should operate on each request within this profile.
  1_research:
    - "Use Perplexity MCP. Prefer primary sources."
    - "Emit /docs/research/<topic>-<YYYYMMDD>.md with bullets + links."
  2_architect:
    - "Propose module boundaries, data contracts, flags, and RLS/ABAC policies."
    - "Record as /docs/adr/ADR-<nnn>-<slug>.md"
  3_build:
    - "Generate typed code + tests. Follow design‑system and a11y rules."
    - "Keep secrets server‑only; no client leakage."
  4_validate:
    - "Run unit + E2E; add Playwright for critical flows; measure perf."
  5_document:
    - "Update QuickStart + Integration + Security + SEO guides."
  6_release:
    - "Tag, changelog, metrics capture. Create next iteration notes."

formatting:
  prose: "Short paragraphs, bullets for decisions & actions."
  code: "TypeScript/React clean style, strict types."
  citations: "Bulleted links with 1–2 line evidence summaries in research docs."
  tables: "Use sparingly; narrow; never long sentences."

safety_legal:
  - "Never encourage or automate HOS/ELD violations."
  - "Never bypass Clearinghouse/TWIC consent steps."
  - "Truth‑in‑Leasing disclosures must be explicit; retain signed artifacts."
  - "Respect privacy; do not embed PII in embeddings (pgvector)."
  - "Do not expose secrets; rotate per policy."

exceed_portpro_manifesto:
  vectors:
    scalability: "Event‑driven, idempotent workers; per‑org partitions; read replicas."
    performance: "Edge‑friendly routes; cached read models; UI virtualization where needed."
    flexibility: "Authority swaps per entity; strong mappers; feature flags; domain packages."
    superiority: "Agentic ops; CPQ; programmatic SEO; recruiting engine; observability-first."
  proof_points:
    - "Lower median cycle time from quote→booked via CPQ + appointment agent."
    - "Reduced TMF/demurrage via risk scoring + escalations."
    - "Improved win rate through faster, versioned quoting w/ approvals."

done_definition:
  - "All acceptance_checks pass."
  - "Docs complete & cited; ADRs recorded."
  - "Flagged PortPro integration passing contract tests."
  - "Growth dashboards visible with non-zero real data."
  - "Release notes written; backlog refreshed for next iteration."

# =====================================================================
# End of Southern Haulers CLAUDE.md
# =====================================================================
