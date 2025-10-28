/**
 * Shipment Test Fixtures
 *
 * Factory functions for creating mock shipment data.
 * Uses @faker-js/faker for realistic test data generation.
 */

import { faker } from '@faker-js/faker';

export type ShipmentStatus =
  | 'pending'
  | 'assigned'
  | 'in_transit'
  | 'at_terminal'
  | 'delivered'
  | 'exception';

export interface MockShipment {
  id: string;
  shipment_number: string;
  origin: string;
  origin_address?: string;
  destination: string;
  destination_address?: string;
  container_number?: string;
  status: ShipmentStatus;
  driver_id?: string;
  customer_id: string;
  rate: number;
  accessorials?: {
    tmf?: number;
    demurrage?: number;
    per_diem?: number;
    chassis?: number;
  };
  pickup_date: string;
  delivery_date?: string;
  appointment_date?: string;
  requires_twic?: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Create a mock shipment with realistic data
 */
export const createMockShipment = (overrides: Partial<MockShipment> = {}): MockShipment => {
  const pickupDate = faker.date.future();
  const createdAt = faker.date.recent();

  return {
    id: faker.string.uuid(),
    shipment_number: `SH-${faker.number.int({ min: 100000, max: 999999 })}`,
    origin: `${faker.location.city()}, ${faker.location.state({ abbreviated: true })}`,
    origin_address: faker.location.streetAddress(),
    destination: `${faker.location.city()}, ${faker.location.state({ abbreviated: true })}`,
    destination_address: faker.location.streetAddress(),
    container_number: faker.string.alphanumeric(11).toUpperCase(),
    status: 'pending',
    customer_id: faker.string.uuid(),
    rate: faker.number.float({ min: 300, max: 1500, precision: 0.01 }),
    accessorials: {
      tmf: faker.helpers.maybe(() => faker.number.float({ min: 50, max: 150, precision: 0.01 })),
      demurrage: faker.helpers.maybe(() => faker.number.float({ min: 100, max: 500, precision: 0.01 })),
      per_diem: faker.helpers.maybe(() => faker.number.float({ min: 25, max: 100, precision: 0.01 })),
    },
    pickup_date: pickupDate.toISOString(),
    requires_twic: faker.datatype.boolean(),
    created_at: createdAt.toISOString(),
    updated_at: createdAt.toISOString(),
    ...overrides,
  };
};

/**
 * Create multiple mock shipments
 */
export const createMockShipments = (count: number, overrides: Partial<MockShipment> = {}): MockShipment[] => {
  return Array.from({ length: count }, () => createMockShipment(overrides));
};

/**
 * Create a mock shipment with specific status
 */
export const createMockShipmentWithStatus = (status: ShipmentStatus, overrides: Partial<MockShipment> = {}): MockShipment => {
  return createMockShipment({ status, ...overrides });
};
