// Compliance domain models
import { z } from 'zod';

// ============================================================================
// Compliance Alert Schema
// ============================================================================

export const ComplianceAlertSchema = z.object({
  id: z.string().uuid(),
  org_id: z.string().uuid(),

  // Target
  entity_type: z.enum(['driver', 'vehicle', 'organization']),
  entity_id: z.string().uuid(),
  entity_name: z.string(),

  // Alert details
  alert_type: z.enum([
    'twic_expiring',
    'twic_expired',
    'cdl_expiring',
    'cdl_expired',
    'medical_card_expiring',
    'medical_card_expired',
    'clearinghouse_consent_expired',
    'clearinghouse_violation',
    'leasing_agreement_missing',
    'leasing_agreement_expired',
    'vehicle_inspection_overdue',
    'insurance_expiring',
    'insurance_expired',
  ]),

  severity: z.enum(['low', 'medium', 'high', 'critical']),
  status: z.enum(['active', 'resolved', 'dismissed']),

  // Description
  message: z.string(),
  action_required: z.string(),
  deadline: z.string().datetime().optional(),

  // Resolution
  resolved_by: z.string().uuid().optional(),
  resolved_at: z.string().datetime().optional(),
  resolution_notes: z.string().optional(),

  // Metadata
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type ComplianceAlert = z.infer<typeof ComplianceAlertSchema>;

// ============================================================================
// Clearinghouse Query Record
// ============================================================================

export const ClearinghouseQuerySchema = z.object({
  id: z.string().uuid(),
  org_id: z.string().uuid(),
  driver_id: z.string().uuid(),

  // Query details
  query_type: z.enum([
    'pre_employment',
    'annual',
    'reasonable_suspicion',
    'random',
  ]),
  query_date: z.string().datetime(),
  query_reference: z.string(),

  // Results
  has_violations: z.boolean(),
  violation_details: z.string().optional(),

  // Consent
  consent_obtained: z.boolean(),
  consent_date: z.string().datetime(),
  consent_expiry: z.string().datetime(),

  // Metadata
  created_at: z.string().datetime(),
  created_by: z.string().uuid(),
});

export type ClearinghouseQuery = z.infer<typeof ClearinghouseQuerySchema>;

// ============================================================================
// TWIC Verification Record
// ============================================================================

export const TWICVerificationSchema = z.object({
  id: z.string().uuid(),
  org_id: z.string().uuid(),
  driver_id: z.string().uuid(),

  // TWIC details
  twic_number: z.string(),
  issue_date: z.string().date(),
  expiry_date: z.string().date(),
  status: z.enum(['valid', 'expired', 'suspended', 'revoked']),

  // Verification
  verified: z.boolean(),
  verified_date: z.string().datetime().optional(),
  verified_by: z.string().uuid().optional(),
  verification_method: z.enum(['visual', 'electronic', 'tsa_portal']).optional(),

  // Document
  document_url: z.string().url().optional(),

  // Metadata
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type TWICVerification = z.infer<typeof TWICVerificationSchema>;

// ============================================================================
// Leasing Agreement (49 CFR Part 376)
// ============================================================================

export const LeasingAgreementSchema = z.object({
  id: z.string().uuid(),
  org_id: z.string().uuid(),
  driver_id: z.string().uuid(),
  vehicle_id: z.string().uuid().optional(),

  // Agreement details
  agreement_number: z.string(),
  agreement_type: z.enum(['trip_lease', 'term_lease']),
  effective_date: z.string().date(),
  expiry_date: z.string().date().optional(),

  // Terms (49 CFR 376.12 requirements)
  compensation_terms: z.string(),
  insurance_terms: z.string(),
  maintenance_responsibility: z.string(),
  fuel_responsibility: z.string(),

  // Required disclosures (Truth-in-Leasing)
  disclosure_signed: z.boolean(),
  disclosure_date: z.string().date().optional(),

  // Signatures
  carrier_signature: z.boolean(),
  carrier_signed_by: z.string().uuid().optional(),
  carrier_signed_at: z.string().datetime().optional(),

  lessor_signature: z.boolean(),
  lessor_signed_at: z.string().datetime().optional(),

  // Documents
  agreement_url: z.string().url().optional(),
  disclosure_url: z.string().url().optional(),

  // Status
  status: z.enum(['draft', 'active', 'expired', 'terminated']),
  termination_date: z.string().date().optional(),
  termination_reason: z.string().optional(),

  // Metadata
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  created_by: z.string().uuid(),
});

export type LeasingAgreement = z.infer<typeof LeasingAgreementSchema>;
