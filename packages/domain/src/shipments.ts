// Shipment domain models
import { z } from 'zod';
import {
  ShipmentStatus,
  ContainerType,
  CargoType,
  LocationSchema,
  ContactSchema,
  AccessorialSchema,
  DocumentSchema,
} from './types';

// ============================================================================
// Shipment Schema
// ============================================================================

export const ShipmentSchema = z.object({
  id: z.string().uuid(),
  org_id: z.string().uuid(),

  // Reference numbers
  shipment_number: z.string(),
  customer_reference: z.string().optional(),
  portpro_load_id: z.string().optional(), // External system reference

  // Customer
  customer_id: z.string().uuid(),
  customer_name: z.string(),

  // Status
  status: ShipmentStatus,

  // Container details
  container_number: z.string().optional(),
  container_type: ContainerType,
  cargo_type: CargoType,
  weight: z.number().optional(),
  seal_number: z.string().optional(),

  // Locations
  origin: LocationSchema,
  destination: LocationSchema,

  // Dates and times
  pickup_date: z.string().datetime().optional(),
  delivery_date: z.string().datetime().optional(),
  appointment_date: z.string().datetime().optional(),
  last_free_day: z.string().datetime().optional(), // For TMF calculation
  container_available_date: z.string().datetime().optional(), // For per diem

  // Assignment
  driver_id: z.string().uuid().optional(),
  driver_name: z.string().optional(),
  vehicle_id: z.string().uuid().optional(),
  chassis_number: z.string().optional(),

  // Contacts
  pickup_contact: ContactSchema.optional(),
  delivery_contact: ContactSchema.optional(),

  // Pricing
  base_rate: z.number(),
  accessorials: z.array(AccessorialSchema).default([]),
  total_amount: z.number(),

  // Documents
  documents: z.array(DocumentSchema).default([]),

  // Notes and special instructions
  notes: z.string().optional(),
  special_instructions: z.string().optional(),

  // Metadata
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  created_by: z.string().uuid(),
  updated_by: z.string().uuid().optional(),
});

export type Shipment = z.infer<typeof ShipmentSchema>;

// ============================================================================
// Shipment Status Event
// ============================================================================

export const ShipmentStatusEventSchema = z.object({
  id: z.string().uuid(),
  shipment_id: z.string().uuid(),
  status: ShipmentStatus,
  timestamp: z.string().datetime(),
  location: LocationSchema.optional(),
  notes: z.string().optional(),
  created_by: z.string().uuid(),
});

export type ShipmentStatusEvent = z.infer<typeof ShipmentStatusEventSchema>;

// ============================================================================
// Create Shipment Input
// ============================================================================

export const CreateShipmentInputSchema = ShipmentSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  shipment_number: true, // Auto-generated
  documents: true,
}).partial({
  status: true, // Defaults to 'draft'
  accessorials: true,
});

export type CreateShipmentInput = z.infer<typeof CreateShipmentInputSchema>;

// ============================================================================
// Update Shipment Input
// ============================================================================

export const UpdateShipmentInputSchema = ShipmentSchema.omit({
  id: true,
  org_id: true,
  created_at: true,
  updated_at: true,
  created_by: true,
  shipment_number: true,
}).partial();

export type UpdateShipmentInput = z.infer<typeof UpdateShipmentInputSchema>;
