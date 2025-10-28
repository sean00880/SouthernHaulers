// Driver domain models
import { z } from 'zod';

// ============================================================================
// Driver Schema
// ============================================================================

export const DriverSchema = z.object({
  id: z.string().uuid(),
  org_id: z.string().uuid(),

  // Personal info
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email().optional(),
  phone: z.string(),
  date_of_birth: z.string().date().optional(),

  // Address
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().length(2).optional(),
  zip: z.string().optional(),

  // Employment
  status: z.enum([
    'active',
    'inactive',
    'suspended',
    'pending_onboarding',
    'terminated',
  ]),
  hire_date: z.string().date().optional(),
  termination_date: z.string().date().optional(),
  employment_type: z.enum(['employee', 'independent_contractor']),

  // License
  cdl_number: z.string().optional(),
  cdl_state: z.string().length(2).optional(),
  cdl_class: z.enum(['A', 'B', 'C']).optional(),
  cdl_expiry: z.string().date().optional(),
  cdl_endorsements: z.array(z.string()).optional(), // H, N, P, S, T, X

  // Medical certification
  medical_card_expiry: z.string().date().optional(),

  // TWIC (Transportation Worker Identification Credential)
  twic_number: z.string().optional(),
  twic_expiry: z.string().date().optional(),
  twic_status: z.enum(['valid', 'expired', 'pending', 'not_required']).optional(),

  // Clearinghouse (FMCSA Drug & Alcohol)
  clearinghouse_consent_date: z.string().date().optional(),
  clearinghouse_status: z.enum([
    'compliant',
    'non_compliant',
    'pending',
  ]).optional(),

  // Leasing (49 CFR Part 376 - Truth-in-Leasing)
  leasing_agreement_signed: z.boolean().default(false),
  leasing_agreement_date: z.string().date().optional(),
  leasing_agreement_url: z.string().url().optional(),

  // Performance tracking
  total_shipments: z.number().default(0),
  on_time_percentage: z.number().default(100),
  rating: z.number().min(0).max(5).default(5),

  // Current assignment
  current_shipment_id: z.string().uuid().optional(),
  current_vehicle_id: z.string().uuid().optional(),

  // Availability
  is_available: z.boolean().default(true),
  next_available_date: z.string().datetime().optional(),

  // ETA tracking
  current_location: z
    .object({
      lat: z.number(),
      lng: z.number(),
      timestamp: z.string().datetime(),
    })
    .optional(),
  eta_variance_minutes: z.number().default(0), // Positive = late, negative = early

  // Metadata
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  created_by: z.string().uuid(),
});

export type Driver = z.infer<typeof DriverSchema>;

// ============================================================================
// Driver Onboarding Checklist
// ============================================================================

export const OnboardingChecklistSchema = z.object({
  driver_id: z.string().uuid(),

  // Identity verification
  identity_verified: z.boolean().default(false),
  identity_verified_date: z.string().datetime().optional(),

  // Documents
  cdl_uploaded: z.boolean().default(false),
  medical_card_uploaded: z.boolean().default(false),
  twic_uploaded: z.boolean().default(false),
  social_security_card_uploaded: z.boolean().default(false),

  // Clearinghouse
  clearinghouse_consent_obtained: z.boolean().default(false),
  clearinghouse_query_completed: z.boolean().default(false),

  // Leasing (for independent contractors)
  leasing_agreement_signed: z.boolean().default(false),
  lease_terms_acknowledged: z.boolean().default(false),

  // Banking (for settlements)
  direct_deposit_setup: z.boolean().default(false),
  w9_or_w2_completed: z.boolean().default(false),

  // Insurance
  coi_uploaded: z.boolean().default(false), // Certificate of Insurance

  // Training
  orientation_completed: z.boolean().default(false),
  safety_training_completed: z.boolean().default(false),

  // Final approval
  background_check_completed: z.boolean().default(false),
  approved_by: z.string().uuid().optional(),
  approved_at: z.string().datetime().optional(),

  // Overall status
  is_complete: z.boolean().default(false),
  completed_at: z.string().datetime().optional(),
});

export type OnboardingChecklist = z.infer<typeof OnboardingChecklistSchema>;

// ============================================================================
// Vehicle Schema
// ============================================================================

export const VehicleSchema = z.object({
  id: z.string().uuid(),
  org_id: z.string().uuid(),

  // Vehicle info
  vehicle_number: z.string(),
  type: z.enum(['tractor', 'straight_truck', 'chassis']),
  make: z.string().optional(),
  model: z.string().optional(),
  year: z.number().optional(),
  vin: z.string().optional(),
  license_plate: z.string().optional(),
  license_state: z.string().length(2).optional(),

  // Status
  status: z.enum(['active', 'maintenance', 'inactive', 'retired']),

  // Assignment
  assigned_driver_id: z.string().uuid().optional(),
  current_location: z
    .object({
      lat: z.number(),
      lng: z.number(),
      timestamp: z.string().datetime(),
    })
    .optional(),

  // Maintenance
  last_inspection_date: z.string().date().optional(),
  next_inspection_date: z.string().date().optional(),
  odometer: z.number().optional(),

  // Metadata
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type Vehicle = z.infer<typeof VehicleSchema>;
