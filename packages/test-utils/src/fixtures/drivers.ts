/**
 * Driver Test Fixtures
 *
 * Factory functions for creating mock driver data with compliance fields.
 */

import { faker } from '@faker-js/faker';

export type DriverStatus = 'active' | 'inactive' | 'suspended';
export type ClearinghouseStatus = 'clear' | 'pending' | 'violation';

export interface MockDriver {
  id: string;
  name: string;
  email: string;
  phone: string;
  cdl_number: string;
  cdl_state: string;
  cdl_expiry: string;
  medical_card_expiry: string;
  status: DriverStatus;

  // Compliance fields
  clearinghouse_status: ClearinghouseStatus;
  clearinghouse_last_query: string;
  clearinghouse_resolved?: boolean;
  twic_number?: string;
  twic_expiry?: string;

  // HOS tracking
  hos_driving_hours_today: number;
  hos_on_duty_hours_today: number;
  last_off_duty: string;

  // Leasing
  lease_agreement_signed: boolean;
  lease_agreement_date?: string;

  created_at: string;
  updated_at: string;
}

/**
 * Create a mock driver with realistic compliance data
 */
export const createMockDriver = (overrides: Partial<MockDriver> = {}): MockDriver => {
  const createdAt = faker.date.past();
  const cdlExpiry = faker.date.future({ years: 2 });
  const medicalExpiry = faker.date.future({ years: 1 });
  const twicExpiry = faker.date.future({ years: 3 });
  const lastOffDuty = faker.date.recent();

  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number('+1 (###) ###-####'),
    cdl_number: faker.string.alphanumeric(10).toUpperCase(),
    cdl_state: faker.location.state({ abbreviated: true }),
    cdl_expiry: cdlExpiry.toISOString(),
    medical_card_expiry: medicalExpiry.toISOString(),
    status: 'active',

    // Compliance
    clearinghouse_status: 'clear',
    clearinghouse_last_query: faker.date.recent().toISOString(),
    clearinghouse_resolved: true,
    twic_number: faker.string.alphanumeric(9).toUpperCase(),
    twic_expiry: twicExpiry.toISOString(),

    // HOS
    hos_driving_hours_today: faker.number.float({ min: 0, max: 11, precision: 0.25 }),
    hos_on_duty_hours_today: faker.number.float({ min: 0, max: 14, precision: 0.25 }),
    last_off_duty: lastOffDuty.toISOString(),

    // Leasing
    lease_agreement_signed: true,
    lease_agreement_date: faker.date.past().toISOString(),

    created_at: createdAt.toISOString(),
    updated_at: createdAt.toISOString(),
    ...overrides,
  };
};

/**
 * Create a driver with Clearinghouse violation
 */
export const createMockDriverWithViolation = (overrides: Partial<MockDriver> = {}): MockDriver => {
  return createMockDriver({
    clearinghouse_status: 'violation',
    clearinghouse_resolved: false,
    status: 'suspended',
    ...overrides,
  });
};

/**
 * Create a driver with expired TWIC
 */
export const createMockDriverWithExpiredTwic = (overrides: Partial<MockDriver> = {}): MockDriver => {
  return createMockDriver({
    twic_expiry: faker.date.past().toISOString(),
    ...overrides,
  });
};

/**
 * Create a driver at HOS limit
 */
export const createMockDriverAtHosLimit = (overrides: Partial<MockDriver> = {}): MockDriver => {
  return createMockDriver({
    hos_driving_hours_today: 10.75, // Near 11-hour limit
    hos_on_duty_hours_today: 13.5,  // Near 14-hour limit
    ...overrides,
  });
};

/**
 * Create multiple mock drivers
 */
export const createMockDrivers = (count: number, overrides: Partial<MockDriver> = {}): MockDriver[] => {
  return Array.from({ length: count }, () => createMockDriver(overrides));
};
