// Common types used across domains
import { z } from 'zod';

// ============================================================================
// Enums and Constants
// ============================================================================

export const ContainerType = z.enum(['20ft', '40ft', '40ft-HC', '45ft']);
export type ContainerType = z.infer<typeof ContainerType>;

export const CargoType = z.enum([
  'agriculture',
  'general',
  'refrigerated',
  'hazmat',
  'bulk',
]);
export type CargoType = z.infer<typeof CargoType>;

export const ShipmentStatus = z.enum([
  'draft',
  'pending',
  'assigned',
  'in_transit',
  'at_terminal',
  'delivered',
  'completed',
  'cancelled',
]);
export type ShipmentStatus = z.infer<typeof ShipmentStatus>;

export const DealStatus = z.enum([
  'draft',
  'quoted',
  'approved',
  'converted',
  'lost',
]);
export type DealStatus = z.infer<typeof DealStatus>;

export const ApprovalStatus = z.enum(['pending', 'approved', 'rejected']);
export type ApprovalStatus = z.infer<typeof ApprovalStatus>;

export const AccessorialType = z.enum([
  'tmf', // Terminal Handling Fee
  'per_diem', // Container per diem
  'chassis_split', // Chassis split fee
  'detention', // Detention fee
  'wait_time', // Wait time fee
  'fuel_surcharge', // Fuel surcharge
  'tolls', // Road tolls
  'lumper', // Lumper fee
  'storage', // Storage fee
  'scale', // Scale ticket
]);
export type AccessorialType = z.infer<typeof AccessorialType>;

// ============================================================================
// Location Types
// ============================================================================

export const LocationSchema = z.object({
  name: z.string().optional(),
  address: z.string(),
  city: z.string(),
  state: z.string().length(2), // Two-letter state code
  zip: z.string(),
  terminal_id: z.string().uuid().optional(),
  coordinates: z
    .object({
      lat: z.number(),
      lng: z.number(),
    })
    .optional(),
});
export type Location = z.infer<typeof LocationSchema>;

// ============================================================================
// Contact Types
// ============================================================================

export const ContactSchema = z.object({
  name: z.string(),
  email: z.string().email().optional(),
  phone: z.string(),
  role: z.string().optional(),
});
export type Contact = z.infer<typeof ContactSchema>;

// ============================================================================
// Accessorial Types
// ============================================================================

export const AccessorialSchema = z.object({
  type: AccessorialType,
  description: z.string().optional(),
  amount: z.number(),
  quantity: z.number().default(1),
  // For per_diem specifically
  days: z.number().optional(),
  rate: z.number().optional(),
});
export type Accessorial = z.infer<typeof AccessorialSchema>;

// ============================================================================
// Document Types
// ============================================================================

export const DocumentType = z.enum([
  'pod', // Proof of Delivery
  'bol', // Bill of Lading
  'delivery_order', // DO
  'tir', // Trip Interchange Receipt
  'scale_ticket',
  'invoice',
  'photo',
  'other',
]);
export type DocumentType = z.infer<typeof DocumentType>;

export const DocumentSchema = z.object({
  id: z.string().uuid(),
  type: DocumentType,
  file_url: z.string().url(),
  file_name: z.string(),
  uploaded_at: z.string().datetime(),
  uploaded_by: z.string().uuid(),
  shipment_id: z.string().uuid().optional(),
  notes: z.string().optional(),
});
export type Document = z.infer<typeof DocumentSchema>;

// ============================================================================
// Utility Types
// ============================================================================

export type Timestamps = {
  created_at: string;
  updated_at: string;
};

export type WithOrg<T> = T & {
  org_id: string;
};

export type WithUser<T> = T & {
  created_by: string;
  updated_by?: string;
};

// ============================================================================
// Feature Flag Types
// ============================================================================

export const AuthorityConfig = z.object({
  loads_status_invoices: z.enum(['portpro', 'southernhaulers']),
  quotes_pricing: z.enum(['portpro', 'southernhaulers']),
  drivers_assets: z.enum(['portpro', 'southernhaulers']),
});
export type AuthorityConfig = z.infer<typeof AuthorityConfig>;
