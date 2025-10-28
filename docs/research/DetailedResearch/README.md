# Southern Haulers TMS - Detailed Research Package

**Prepared for**: Southern Haulers Executive Team
**Date**: October 2025
**Version**: 1.0
**Confidential**: For Internal Use Only

---

## Executive Summary

This research package provides comprehensive documentation for the Southern Haulers Transportation Management System (TMS), designed specifically for drayage operations with an initial focus on **Savannah, Georgia** and the Garden City Terminal (GCT).

The system delivers **PortPro feature parity** while enabling superior capabilities through:
- **Agentic Operations**: AI-powered automation for appointments, exceptions, pricing, and compliance
- **Hybrid Architecture**: Mirror third-party TMS data or operate as standalone system of record
- **Savannah-First Design**: Optimized for PIN-based gate workflows, RFID requirements, and GCT operating norms
- **Compliance-First**: Built-in regulatory tracking (49 CFR 376, 395, TWIC, FMCSA Clearinghouse)

### Key Differentiators

| Feature | Industry Standard (PortPro) | Southern Haulers TMS |
|---------|----------------------------|----------------------|
| **Gate Operations** | Appointment-only | PIN-based + Appointments (hybrid) |
| **AI Automation** | None | 4 autonomous agents |
| **Cost Savings** | Unknown | 30% TMF/demurrage reduction (projected) |
| **Compliance** | Manual tracking | Automated monitoring + alerts |
| **SEO** | Generic | 5,000+ programmatic location pages |
| **Authority** | Vendor lock-in | Flexible per-entity system of record |

---

## Document Index

This package contains 10 detailed research documents plus supporting materials:

### Core Requirements
1. **[Requirements & Introduction - Savannah, GA](01_Requirements_Introduction_Savannah_GA.md)**
   - Savannah-first operating model
   - Garden City Terminal (GCT) specifics
   - PIN-based vs. appointment-based workflows
   - Turn time KPIs and benchmarks

2. **[PortPro Feature Parity and Superiority](02_PortPro_Feature_Parity_and_Superiority.md)**
   - Complete PortPro API surface analysis
   - Hybrid vs. full-custom strategy
   - Integration architecture (webhooks, tokens, signatures)
   - Authority swap mechanisms

### Operations & Compliance
3. **[Terminal Appointments, TMF, and PierPass](03_Terminal_Appointments_TMF_PierPass.md)**
   - eModal and CargoSmart integration strategies
   - TMF (Terminal Handling Fee) risk management
   - Per diem tracking and optimization
   - Cut-off management and gate hour variations

4. **[Compliance Framework](04_Compliance_Framework.md)**
   - 49 CFR Part 376 (Truth-in-Leasing)
   - 49 CFR Part 395 (HOS/ELD)
   - TWIC (Transportation Worker Identification Credential)
   - FMCSA Clearinghouse consent workflows

### Technical Architecture
5. **[Architecture Principles](05_Architecture_Principles.md)**
   - Event-driven design patterns
   - Idempotent webhook processing
   - Multi-tenant SaaS architecture
   - Observability and SLOs
   - Row-Level Security (RLS) and ABAC

### Growth & Marketing
6. **[SEO - Programmatic, Savannah-First](06_SEO_Programmatic_Savannah_First.md)**
   - Launch strategy: `/usa/ga/savannah`
   - Scalable expansion to 5,000+ pages
   - LocalBusiness JSON-LD structured data
   - Multi-sitemap strategy

7. **[Recruiting Engine & Compliance](07_Recruiting_Engine_Compliance.md)**
   - Meta Lead Ads integration
   - A2P 10DLC SMS workflows
   - EEOC-compliant messaging
   - Onboarding checklist automation

### Business Logic
8. **[Quote CRM / CPQ](08_Quote_CRM_CPQ.md)**
   - Deal pipeline management
   - Approval workflows and thresholds
   - Accessorial pricing (TMF, per diem, fuel surcharge)
   - Quote versioning and conversion

9. **[Agentic Operations](09_Agentic_Ops.md)**
   - Appointment Agent (scheduling optimization)
   - Exception Agent (TMF/demurrage risk detection)
   - Compliance Agent (TWIC/Clearinghouse monitoring)
   - Pricing Agent (CPQ assistance)

### Roadmap
10. **[Implementation Roadmap](10_Implementation_Roadmap.md)**
    - Phase 1: Savannah launch (Weeks 1-6)
    - Phase 2: PortPro integration (Weeks 7-8)
    - Phase 3: Agentic operations (Weeks 9-10)
    - Phase 4: National expansion (Weeks 11+)

---

## Supporting Materials

### Visual Projections
**Location**: `assets/`

Five key charts illustrating business impact:

1. **TMF/Demurrage Savings (Year 1)** - `tmf_demurrage_savings.png`
   - Quarterly savings projection from Exception Agent
   - Estimated 30% reduction in fees
   - Based on industry averages and Savannah volume

2. **Quote Conversion Uplift** - `quote_conversion.png`
   - Baseline: 15% (industry standard)
   - With CPQ: 22%
   - With Agents: 30% (2× baseline)

3. **Recruiting Funnel** - `recruiting_funnel.png`
   - Meta Lead Ads → SMS opt-in → Scheduled → Hired
   - Projected 10% opt-in rate
   - Faster time-to-hire vs. traditional methods

4. **GCT Turn Times** - `turn_times.png`
   - Current: 35 min (single) / 53 min (dual)
   - Target: ≤30 min / ≤45 min
   - KPI tracking dashboard

5. **SEO Traffic Growth** - `seo_growth.png`
   - First 9 months projection
   - Launch: Savannah (Month 1)
   - Expansion: GA ports (Months 2-3)
   - National: 5,000+ pages (Months 4-9)

### Executive PDF
**Location**: `SouthernHaulers_Report.pdf`

Non-technical summary for stakeholders, including:
- Executive overview
- Business case and ROI
- Competitive advantages
- Implementation timeline
- All charts embedded

---

## How to Use This Package

### For Executives
1. **Start with**: `SouthernHaulers_Report.pdf` (executive summary)
2. **Review charts**: `assets/*.png` (visual projections)
3. **Deep dive** (optional): Individual research documents

### For Operations Team
1. **Savannah specifics**: Document 01 (Requirements & Introduction)
2. **Compliance needs**: Document 04 (Compliance Framework)
3. **Day-to-day ops**: Document 03 (Terminals & TMF)

### For Technology Team
1. **Architecture**: Document 05 (Architecture Principles)
2. **PortPro integration**: Document 02 (Feature Parity)
3. **Implementation plan**: Document 10 (Roadmap)

### For Sales & Marketing
1. **SEO strategy**: Document 06 (Programmatic SEO)
2. **Recruiting**: Document 07 (Recruiting Engine)
3. **Quote process**: Document 08 (Quote CRM/CPQ)

---

## Key Terminology

### Savannah-Specific
- **GCT**: Garden City Terminal (Port of Savannah)
- **PIN**: Personal Identification Number for gate access (6-digit, expires after use)
- **RFID**: Radio-Frequency Identification tags required on tractors
- **Cut-offs**: Daily deadlines for container pickup (varies by terminal and day)

### Drayage Industry
- **TMF**: Terminal Handling Fee (charged after "last free day")
- **Per Diem**: Daily fee for container usage beyond free days
- **BOL**: Bill of Lading
- **POD**: Proof of Delivery
- **TIR**: Trip Interchange Receipt
- **Chassis Split**: Fee when chassis provider differs from container owner

### Compliance
- **Truth-in-Leasing**: 49 CFR Part 376 (independent contractor agreements)
- **HOS/ELD**: Hours of Service / Electronic Logging Device (49 CFR Part 395)
- **TWIC**: Transportation Worker Identification Credential (TSA)
- **Clearinghouse**: FMCSA Drug & Alcohol Clearinghouse

### Technical
- **RLS**: Row-Level Security (database-level tenant isolation)
- **ABAC**: Attribute-Based Access Control (fine-grained permissions)
- **DLQ**: Dead Letter Queue (failed event handling)
- **Idempotency**: Processing duplicate events safely
- **SLO**: Service Level Objective (e.g., 99.5% uptime)

---

## Research Methodology

This package synthesizes information from multiple authoritative sources:

### Primary Sources
- **Georgia Ports Authority**: Official GCT operating procedures, gate hours, RFID requirements
- **PortPro Developer Documentation**: API specifications, webhook signatures, token lifecycles
- **Federal Regulations**: 49 CFR (Code of Federal Regulations) Parts 376 and 395
- **TSA**: TWIC program guidelines and verification procedures
- **FMCSA**: Clearinghouse consent requirements and query protocols

### Industry Analysis
- **Supply Chain Trade Associations**: AJOT (American Journal of Transportation), JOC (Journal of Commerce)
- **Terminal Operating Systems**: eModal, CargoSmart, PierPass documentation
- **Logistics Industry Benchmarks**: Turn time standards, fee structures, best practices

### Technical Standards
- **W3C/IETF**: Web and API standards (OpenAPI, OAuth, JWT)
- **Cloud Native Computing Foundation**: Observability standards (OpenTelemetry)
- **Next.js Documentation**: SEO best practices, App Router capabilities
- **Supabase Documentation**: PostGIS, pgvector, RLS patterns

### Compliance & Legal
- **DOT FMCSA**: Hours of Service regulations, Clearinghouse requirements
- **EEOC**: Equal Employment Opportunity Commission (recruiting compliance)
- **TCPA**: Telephone Consumer Protection Act (A2P 10DLC SMS)
- **CCPA/GDPR**: Privacy regulations (data handling)

---

## Confidentiality Notice

This document and all associated materials contain proprietary information and trade secrets. Distribution is restricted to Southern Haulers authorized personnel and designated implementation partners. Unauthorized disclosure is prohibited.

---

## Document Maintenance

**Version History**:
- v1.0 (October 2025) - Initial research package

**Review Schedule**: Quarterly updates recommended to reflect:
- Evolving GCT operating procedures
- PortPro API changes
- Regulatory updates
- Industry benchmark shifts

**Contact**: For questions or clarifications regarding this research package, please contact the Southern Haulers Technology Team.

---

## Next Steps

1. **Executive Review**: Stakeholder approval of approach and timeline
2. **Preferences Capture**: Complete preferences checklist (see `PREFERENCES_CHECKLIST.md`)
3. **Kickoff Planning**: Schedule implementation kickoff meeting
4. **Contract Finalization**: Engage with PortPro for hybrid integration (if applicable)
5. **Phase 1 Launch**: Begin Savannah-focused development (Week 1)

---

**This research package is designed to be the definitive reference for the Southern Haulers TMS project. All implementation decisions should trace back to these foundational requirements and architectural principles.**
