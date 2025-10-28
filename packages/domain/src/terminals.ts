// Terminal domain models
import { z } from 'zod';

// ============================================================================
// Terminal Schema
// ============================================================================

export const TerminalSchema = z.object({
  id: z.string().uuid(),

  // Identity
  name: z.string(),
  code: z.string(), // e.g., "GASAV" for Port of Savannah
  type: z.enum(['port', 'rail', 'warehouse', 'distribution_center']),

  // Location
  address: z.string(),
  city: z.string(),
  state: z.string().length(2),
  zip: z.string(),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number(),
  }),

  // Contact
  phone: z.string().optional(),
  email: z.string().email().optional(),
  website: z.string().url().optional(),

  // Operating hours (JSON format: { "monday": { "open": "08:00", "close": "17:00" }, ... })
  operating_hours: z
    .record(
      z.object({
        open: z.string(), // HH:mm format
        close: z.string(),
        is_closed: z.boolean().default(false),
      })
    )
    .optional(),

  // Gate information
  gates: z
    .array(
      z.object({
        name: z.string(),
        type: z.enum(['inbound', 'outbound', 'both']),
        coordinates: z.object({
          lat: z.number(),
          lng: z.number(),
        }).optional(),
      })
    )
    .optional(),

  // Appointment requirements
  requires_appointment: z.boolean().default(true),
  appointment_booking_window_hours: z.number().default(24), // Minimum hours in advance
  appointment_booking_url: z.string().url().optional(),
  appointment_system: z.enum(['eModal', 'CargoSmart', 'manual', 'other']).optional(),

  // Rules and policies
  tmf_policy: z
    .object({
      last_free_day_calculation: z.string(), // Description of how LFD is calculated
      fee_amount: z.number(), // Per day fee
      grace_period_hours: z.number().optional(),
    })
    .optional(),

  per_diem_policy: z
    .object({
      free_days: z.number().default(5),
      daily_rate: z.number(),
    })
    .optional(),

  // Special requirements
  requires_twic: z.boolean().default(false),
  requires_rfid: z.boolean().default(false),
  hazmat_restricted: z.boolean().default(false),
  reefer_capable: z.boolean().default(false),

  // Congestion tracking
  typical_wait_time_minutes: z.number().optional(),
  current_congestion_level: z.enum(['low', 'medium', 'high', 'critical']).optional(),

  // Metadata
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type Terminal = z.infer<typeof TerminalSchema>;

// ============================================================================
// Terminal Appointment Schema
// ============================================================================

export const TerminalAppointmentSchema = z.object({
  id: z.string().uuid(),
  org_id: z.string().uuid(),
  terminal_id: z.string().uuid(),
  shipment_id: z.string().uuid(),

  // Appointment details
  appointment_type: z.enum(['pickup', 'dropoff']),
  appointment_date: z.string().datetime(),
  appointment_duration_minutes: z.number().default(120),

  // Confirmation
  confirmation_number: z.string().optional(),
  confirmed: z.boolean().default(false),
  confirmed_at: z.string().datetime().optional(),

  // Driver and equipment
  driver_id: z.string().uuid().optional(),
  driver_name: z.string().optional(),
  vehicle_number: z.string().optional(),
  chassis_number: z.string().optional(),
  container_number: z.string().optional(),

  // Status
  status: z.enum([
    'scheduled',
    'confirmed',
    'checked_in',
    'in_progress',
    'completed',
    'cancelled',
    'no_show',
  ]),

  // Check-in/out
  checked_in_at: z.string().datetime().optional(),
  checked_out_at: z.string().datetime().optional(),
  actual_wait_time_minutes: z.number().optional(),

  // Cancellation
  cancelled_at: z.string().datetime().optional(),
  cancellation_reason: z.string().optional(),

  // Notes
  notes: z.string().optional(),

  // Metadata
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  created_by: z.string().uuid(),
});

export type TerminalAppointment = z.infer<typeof TerminalAppointmentSchema>;
