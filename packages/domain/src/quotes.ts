// Quote CRM / CPQ domain models
import { z } from 'zod';
import {
  DealStatus,
  ApprovalStatus,
  LocationSchema,
  ContainerType,
  CargoType,
  AccessorialSchema,
} from './types';

// ============================================================================
// Deal (Quote Pipeline)
// ============================================================================

export const DealSchema = z.object({
  id: z.string().uuid(),
  org_id: z.string().uuid(),

  // Customer
  customer_id: z.string().uuid().optional(),
  customer_name: z.string(),
  customer_email: z.string().email().optional(),
  customer_phone: z.string().optional(),

  // Pipeline
  status: DealStatus,
  pipeline_stage: z.enum([
    'discovery',
    'qualification',
    'proposal',
    'negotiation',
    'closed_won',
    'closed_lost',
  ]),

  // Win/loss tracking
  probability: z.number().min(0).max(100), // 0-100%
  expected_close_date: z.string().datetime().optional(),
  actual_close_date: z.string().datetime().optional(),
  lost_reason: z.string().optional(),

  // Value
  estimated_value: z.number(),
  actual_value: z.number().optional(),

  // Source
  lead_source: z.enum([
    'website',
    'referral',
    'cold_call',
    'email',
    'meta_ads',
    'organic_search',
    'other',
  ]).optional(),

  // Metadata
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  created_by: z.string().uuid(),
  updated_by: z.string().uuid().optional(),
});

export type Deal = z.infer<typeof DealSchema>;

// ============================================================================
// Quote (Versioned Pricing)
// ============================================================================

export const QuoteSchema = z.object({
  id: z.string().uuid(),
  deal_id: z.string().uuid(),
  org_id: z.string().uuid(),
  version: z.number().int().positive(),

  // Shipment details
  origin: LocationSchema,
  destination: LocationSchema,
  container_type: ContainerType,
  cargo_type: CargoType,
  estimated_weight: z.number().optional(),

  // Service level
  service_type: z.enum(['standard', 'expedited', 'white_glove']).default('standard'),

  // Dates
  requested_pickup_date: z.string().datetime().optional(),
  requested_delivery_date: z.string().datetime().optional(),

  // Pricing
  base_rate: z.number(),
  accessorials: z.array(AccessorialSchema).default([]),
  total: z.number(),

  // Validity
  valid_until: z.string().datetime(),

  // Approval workflow
  approval_status: ApprovalStatus,
  requires_approval: z.boolean().default(false),
  approval_threshold: z.number().optional(), // Auto-approve under this amount
  approved_by: z.string().uuid().optional(),
  approved_at: z.string().datetime().optional(),
  rejection_reason: z.string().optional(),

  // Notes
  notes: z.string().optional(),
  terms_and_conditions: z.string().optional(),

  // Metadata
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  created_by: z.string().uuid(),
});

export type Quote = z.infer<typeof QuoteSchema>;

// ============================================================================
// Create Quote Input
// ============================================================================

export const CreateQuoteInputSchema = QuoteSchema.omit({
  id: true,
  version: true,
  created_at: true,
  updated_at: true,
  approval_status: true,
}).partial({
  approval_threshold: true,
  requires_approval: true,
  accessorials: true,
});

export type CreateQuoteInput = z.infer<typeof CreateQuoteInputSchema>;

// ============================================================================
// Quote Approval Request
// ============================================================================

export const QuoteApprovalRequestSchema = z.object({
  quote_id: z.string().uuid(),
  requester_id: z.string().uuid(),
  justification: z.string().optional(),
});

export type QuoteApprovalRequest = z.infer<typeof QuoteApprovalRequestSchema>;

// ============================================================================
// Convert Quote to Shipment
// ============================================================================

export const ConvertQuoteToShipmentInputSchema = z.object({
  quote_id: z.string().uuid(),
  converted_by: z.string().uuid(),

  // Optional overrides
  pickup_date: z.string().datetime().optional(),
  delivery_date: z.string().datetime().optional(),
  special_instructions: z.string().optional(),
});

export type ConvertQuoteToShipmentInput = z.infer<typeof ConvertQuoteToShipmentInputSchema>;
