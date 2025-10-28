# PortPro Integration Research
**Date**: 2025-10-23
**Sources**: Perplexity MCP research
**Status**: Ready for implementation

## Executive Summary

PortPro uses simple **API token authentication** (3-hour expiry) with bearer token pattern. No public OAuth2/JWT or webhook documentation available. Will implement feature-flagged integration with robust error handling and token rotation.

## Authentication & Token Management

### API Token Authentication
- **Method**: Bearer token in Authorization header
- **Expiry**: 3 hours
- **Generation**: Manual via Port application interface
- **Format**: `Authorization: Bearer <token>`

### Limitations
- ❌ No OAuth2 support documented
- ❌ No JWT support documented
- ❌ No refresh token mechanism documented
- ❌ Manual token regeneration required every 3 hours
- ❌ No webhook events publicly documented

### Implementation Strategy
```typescript
// Token rotation strategy
interface PortProTokenConfig {
  token: string;
  expiresAt: Date; // 3 hours from generation
  autoRotate: boolean; // Future: implement auto-rotation
}

// Recommended: Store tokens in secure key management (e.g., Supabase vault)
// Monitor expiry and alert ops 30min before expiration
```

## API Endpoints (Documented)

### Loads Management
```typescript
// List loads with date range
GET /loads?from={ISO8601}&to={ISO8601}
Response: Load[]

// Get single load
GET /loads/{id}
Response: Load

// Example Load schema (inferred, verify with actual API)
interface Load {
  id: string;
  status: 'pending' | 'in_transit' | 'delivered' | 'cancelled';
  pickupLocation: Location;
  deliveryLocation: Location;
  container?: Container;
  driver?: Driver;
  timestamps: {
    created: string;
    updated: string;
    pickup?: string;
    delivery?: string;
  };
}
```

### Missing Documented Endpoints
Based on typical TMS functionality, these likely exist but need verification:
- `POST /loads` - Create load
- `PATCH /loads/{id}` - Update load
- `GET /drivers` - List drivers
- `GET /vehicles` - List vehicles
- `GET /invoices` - List invoices
- `POST /status-updates` - Update shipment status

### Webhook Events (Not Documented)
If webhooks exist, likely events include:
- `load.created`
- `load.updated`
- `load.status_changed`
- `driver.assigned`
- `invoice.created`
- `invoice.paid`

**Action Required**: Contact PortPro support for:
1. Complete API documentation
2. Webhook event catalog
3. Signature verification method
4. Rate limits and quotas
5. Sandbox/test environment access

## Integration Architecture

### Phase 1: Basic Integration (Feature-Flagged)
```typescript
// Feature flag
const PORTPRO_ENABLED = process.env.FEATURE_PORTPRO_ENABLED === 'true';

// Integration service
class PortProIntegrationService {
  // Sync loads from PortPro → Southern Haulers DB
  async syncLoads(since: Date): Promise<SyncResult>;

  // Push updates from SH → PortPro
  async pushStatusUpdate(shipmentId: string, status: Status): Promise<void>;

  // Health check
  async healthCheck(): Promise<{ ok: boolean; latency: number }>;
}
```

### Phase 2: Bidirectional Sync
- Event-driven architecture with queues (Redis/BullMQ)
- Idempotency keys for all mutations
- Conflict resolution strategy (SH as source of truth for UI, PortPro as system of record initially)
- Dead letter queue for failed syncs

### Phase 3: Authority Swap
- Per-organization flag: `org.portpro.authority` = 'loads' | 'drivers' | 'invoices'
- Mapper pattern for domain model translation
- Contract tests to ensure mapper invariants

## TMF/PierPass Fee Calculation

### 2024 Rates (Effective Sept 1, 2024)
- **TEU (20-foot)**: $37.71
- **FEU (40-foot)**: $75.42
- **Exemptions**: Empty containers, Alameda Corridor moves, transshipment cargo
- **No time-of-day discount** (PierPass 2.0 eliminated off-peak incentives)

### Implementation
```typescript
interface TMFCalculator {
  calculateTMF(container: Container): {
    amount: number;
    exempt: boolean;
    exemptionReason?: string;
  };
}

// Example
const tmf = calculateTMF({
  size: 'FEU',
  empty: false,
  alamedaCorridor: false,
  transshipment: false
});
// Result: { amount: 75.42, exempt: false }
```

### Demurrage & Per Diem
- **Demurrage**: Terminal charges for not picking up container within free time
- **Per Diem (Detention)**: Carrier charges for late return of empty equipment
- **Calculation**: Varies by terminal/carrier; must query tariffs
- **Best Practice**: Track free days, alert 24h before charges accrue

## Compliance Integration

### FMCSA Clearinghouse
- Digital consent workflows for driver drug/alcohol queries
- 3-year automatic retention in Clearinghouse system
- API integration likely available (research needed)

### 49 CFR 376 (Truth-in-Leasing)
- Written lease agreements required
- 15-day payment settlement window
- Equipment receipts at lease start/end
- Digital signature capture with e-sign providers (DocuSign, Adobe Sign)
- Immutable audit logs in Supabase

### TWIC Tracking
- Store TWIC expiration dates
- Alert 90 days before expiry
- Block port job assignments for expired/missing TWIC

## Observability Requirements

### Metrics
- `portpro.api.requests.total` (counter)
- `portpro.api.latency` (histogram)
- `portpro.api.errors.total` (counter by error type)
- `portpro.sync.lag_seconds` (gauge)
- `portpro.token.expiry_seconds` (gauge)

### Alerts
- Token expiring <30 min
- Sync lag >5 minutes
- Error rate >1% over 5min window
- API latency p95 >500ms

### Logs (Structured JSON)
```json
{
  "service": "portpro-integration",
  "action": "sync_loads",
  "status": "success",
  "duration_ms": 234,
  "loads_synced": 42,
  "timestamp": "2025-10-23T12:00:00Z",
  "trace_id": "abc123"
}
```

## Testing Strategy

### Unit Tests
- Token expiry detection
- TMF calculation with all scenarios
- Mapper correctness (PortPro Load → SH Shipment)

### Integration Tests
- Mock PortPro API with MSW or similar
- Test error scenarios (401, 429, 500, timeouts)
- Idempotency verification

### Contract Tests
- Pact or similar for API contract validation
- Ensures PortPro API changes don't break integration

### E2E Tests
- Create load in PortPro → verify sync to SH
- Update status in SH → verify push to PortPro
- Simulate webhook delivery (when available)

## Security Considerations

1. **Never expose tokens client-side**
2. **Store tokens in Supabase vault or environment secrets**
3. **Use HTTPS for all API calls** (enforce TLS 1.3+)
4. **Implement rate limiting** on our side to avoid throttling
5. **Log access patterns** for audit compliance
6. **Rotate tokens proactively** before expiry (if automation possible)

## Implementation Checklist

- [ ] Contact PortPro for complete API docs & webhook specs
- [ ] Implement PortProClient with typed endpoints
- [ ] Add token rotation monitoring
- [ ] Build sync worker with Redis queue
- [ ] Implement TMF calculator
- [ ] Create mapper layer (PortPro ↔ SH domain models)
- [ ] Add feature flag: `FEATURE_PORTPRO_ENABLED`
- [ ] Write unit + integration tests
- [ ] Set up observability (metrics, logs, traces)
- [ ] Create runbook for ops (token rotation, sync failures, etc.)
- [ ] Deploy to staging with real PortPro sandbox
- [ ] Validate sync accuracy over 7 days
- [ ] Go live with monitoring

## Sources
- Perplexity MCP research (2025-10-23)
- PortPro public API references: limited public documentation available[1]
- PierPass TMF rates: https://www.pierpass.org (Sept 2024 update)
- FMCSA Clearinghouse: https://clearinghouse.fmcsa.dot.gov
- 49 CFR 376 Truth-in-Leasing: https://www.ecfr.gov

## Next Steps
1. **Immediate**: Reach out to PortPro support for developer docs
2. **Week 1**: Implement basic read-only sync (PortPro → SH)
3. **Week 2**: Add bidirectional sync with conflict resolution
4. **Week 3**: Implement webhooks (if available) or polling fallback
5. **Week 4**: Authority swap capability per organization

---
**Status**: Research complete ✅ | Ready for implementation 🚀
