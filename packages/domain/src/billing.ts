// Billing domain models
import { z } from 'zod';
import { AccessorialSchema } from './types';

// ============================================================================
// Invoice Schema
// ============================================================================

export const InvoiceSchema = z.object({
  id: z.string().uuid(),
  org_id: z.string().uuid(),

  // Reference
  invoice_number: z.string(),
  shipment_id: z.string().uuid(),
  customer_id: z.string().uuid(),

  // Status
  status: z.enum([
    'draft',
    'pending',
    'sent',
    'paid',
    'overdue',
    'cancelled',
  ]),

  // Amounts
  subtotal: z.number(),
  accessorials_total: z.number(),
  tax_amount: z.number().default(0),
  total_amount: z.number(),

  // Line items
  line_items: z.array(
    z.object({
      description: z.string(),
      quantity: z.number().default(1),
      unit_price: z.number(),
      amount: z.number(),
    })
  ),
  accessorials: z.array(AccessorialSchema).default([]),

  // Dates
  invoice_date: z.string().date(),
  due_date: z.string().date(),
  paid_date: z.string().date().optional(),

  // Payment tracking
  paid_amount: z.number().default(0),
  balance_due: z.number(),

  // Payment method
  payment_method: z.enum([
    'check',
    'ach',
    'wire',
    'credit_card',
    'other',
  ]).optional(),
  payment_reference: z.string().optional(),

  // Notes
  notes: z.string().optional(),
  terms: z.string().default('Net 30'),

  // Integration
  portpro_invoice_id: z.string().optional(),
  quickbooks_invoice_id: z.string().optional(),

  // Metadata
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  created_by: z.string().uuid(),
});

export type Invoice = z.infer<typeof InvoiceSchema>;

// ============================================================================
// Driver Settlement Schema
// ============================================================================

export const DriverSettlementSchema = z.object({
  id: z.string().uuid(),
  org_id: z.string().uuid(),

  // Driver
  driver_id: z.string().uuid(),
  driver_name: z.string(),

  // Period
  period_start: z.string().date(),
  period_end: z.string().date(),

  // Status
  status: z.enum(['draft', 'pending', 'approved', 'paid', 'cancelled']),

  // Earnings
  shipments: z.array(
    z.object({
      shipment_id: z.string().uuid(),
      shipment_number: z.string(),
      gross_revenue: z.number(),
      driver_pay: z.number(),
      pay_type: z.enum(['percentage', 'flat_rate', 'per_mile']),
      pay_rate: z.number(),
    })
  ),

  // Totals
  total_gross_revenue: z.number(),
  total_driver_pay: z.number(),
  deductions: z.array(
    z.object({
      description: z.string(),
      amount: z.number(),
    })
  ).default([]),
  total_deductions: z.number(),
  net_pay: z.number(),

  // Payment
  payment_method: z.enum(['direct_deposit', 'check', 'other']),
  payment_date: z.string().date().optional(),
  payment_reference: z.string().optional(),

  // Notes
  notes: z.string().optional(),

  // Metadata
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  created_by: z.string().uuid(),
  approved_by: z.string().uuid().optional(),
  approved_at: z.string().datetime().optional(),
});

export type DriverSettlement = z.infer<typeof DriverSettlementSchema>;
