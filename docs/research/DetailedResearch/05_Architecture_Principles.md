# Architecture Principles & Why This Wins

**Principles:** Modular domains, event‑driven ingest, idempotent workers, observability‑first, multi‑tenant isolation, privacy‑by‑design, human‑in‑the‑loop agents.

**Data:** Postgres with RLS; PostGIS for geo‑fencing & ETAs; pgvector for semantic search/matching; Redis for queues/caches.

**Web:** App Router with server actions, ISR sitemaps, JSON‑LD for LocalBusiness; edge‑optimized.

**Why Best‑of‑Both‑Worlds:** Keeps vendor interoperability (hybrid mode) but allows full replacement when ROI and readiness align; meets enterprise compliance while unlocking agentic automation.

---
## References
1. https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
2. https://supabase.com/docs/guides/database/extensions/postgis
3. https://supabase.com/docs/guides/database/extensions/pgvector
