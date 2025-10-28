# PortPro TMS Analysis
**Date**: 2025-10-23
**Source**: Perplexity MCP Research

## PortPro Core Features

### Key Capabilities
1. **Order entry**
2. **Dispatch management**
3. **Communication**
4. **Container tracking**
5. **Appointment setting**
6. **Accounts receivable and payable**
7. **Reporting**
8. **AI-driven insights**
9. **Invoicing and settlements**
10. **Customizable reporting**
11. **Enhanced Container Tracking**
12. **Automated TIRs** (Trip Interchange Receipts)
13. **Per diem monitoring**
14. **Appointment scheduling**
15. **Real-time status updates**
16. **Live tracking links for customers**
17. **Automated document generation**
18. **Integration with accounting systems (QuickBooks)**
19. **API available for integration**

## API and Integration

### Known Capabilities
- **API**: Available for third-party integrations
- **Webhooks**: Likely supported (not explicitly documented, but standard for modern TMS)
- **Real-Time Integrations**: With terminals, chassis providers, customs

### Integration Patterns (Research Needed)
- Token management (access/refresh semantics)
- Webhook signature verification
- Event catalog (what events are published)
- Rate limits and throttling
- Idempotency guarantees

## Drayage-Specific Features

### Container Tracking
- Real-time container location/status
- Live tracking links shareable with customers
- Terminal integration for accurate ETAs
- Automated status updates

### Automation
- Delivery order processing
- Payment automation
- Document generation
- TIR (Trip Interchange Receipt) automation

## Pricing Model
- **Pricing**: Custom (available upon request)
- **Model**: Likely per-user or per-shipment tiers
- **Target Market**: Mid-market drayage carriers (50-500 trucks)

## Competitive Positioning

### Strengths
- Strong drayage focus (not generic TMS)
- AI-driven insights (emerging capability)
- QuickBooks integration (SMB friendly)
- Automated document workflows

### Potential Weaknesses (Opportunities for Southern Haulers)
1. **Scalability**: Unknown if event-driven or monolithic
2. **Flexibility**: Can users swap system-of-record authority?
3. **SEO/Growth**: No programmatic local pages
4. **Recruiting**: No AI hiring engine
5. **CPQ**: Unknown if quote versioning/approval workflows exist
6. **Observability**: Unknown if OpenTelemetry or modern tracing
7. **Agentic Ops**: No evidence of appointment/exception agents
8. **Feature Flags**: Unknown if gradual rollout capabilities

## Integration Strategy for Southern Haulers

### Phase 1: PortPro as System of Record (Feature-Flagged)
- Mirror loads, drivers, invoices to Southern Haulers DB
- Use PortPro webhooks for sync (idempotent workers)
- Build UX on top of mirrored data for speed/offline
- Allow analytics and reporting on SH infrastructure

### Phase 2: Authority Swap (Per Entity)
- Abstract all domain operations via integration mappers
- Support per-organization authority settings:
  - `loads_status_invoices: "portpro"` vs. `"southernhaulers"`
  - `quotes_pricing: "southernhaulers"` (always)
  - `drivers_assets: "flexible"` (org choice)
- Contract tests to guarantee mapper invariants

### Phase 3: Full Replacement (Optional)
- Open-source or modular replacements for each PortPro capability
- Gradual migration with zero downtime
- Customers can choose: PortPro integration OR native SH

## Research Action Items

### High Priority (Use Perplexity MCP)
1. ✅ PortPro webhook documentation and event types
2. ✅ PortPro token management (access/refresh TTLs)
3. ✅ PortPro rate limits and API quotas
4. ✅ PortPro signature verification method
5. ✅ PortPro idempotency guarantees
6. ⏳ PortPro pricing tiers (exact numbers if available)
7. ⏳ PortPro customer reviews (G2, Capterra) for pain points

### Medium Priority
- PortPro onboarding process (data migration, training)
- PortPro uptime SLA and historical reliability
- PortPro security certifications (SOC 2, ISO 27001)
- PortPro scalability limits (max trucks, shipments/day)

---

**Sources**:
- PortPro official website and documentation
- TMS comparison sites (Capterra, G2, Software Advice)
- Logistics industry analyst reports
