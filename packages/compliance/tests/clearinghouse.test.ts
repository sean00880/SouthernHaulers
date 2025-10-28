/**
 * FMCSA Clearinghouse Compliance Tests (49 CFR Part 382)
 *
 * Critical P0 tests for Clearinghouse compliance.
 * These tests MUST pass before any driver can be assigned to a shipment.
 */

import { describe, it, expect } from 'vitest';
import {
  createMockDriver,
  createMockDriverWithViolation,
  createMockShipment,
  validateClearinghouseCompliance,
  validateDriverAssignment,
} from '@southernhaulers/test-utils';

describe('FMCSA Clearinghouse Compliance (49 CFR Part 382)', () => {
  describe('P0: Driver Assignment Validation', () => {
    it('should block driver assignment if Clearinghouse query pending', () => {
      const driver = createMockDriver({ clearinghouse_status: 'pending' });
      const shipment = createMockShipment();
      const route = { estimated_drive_time: 2 };

      const result = validateDriverAssignment(driver, shipment, route);

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Clearinghouse query must be completed before assignment');
    });

    it('should block driver assignment if Clearinghouse violation unresolved', () => {
      const driver = createMockDriverWithViolation();
      const shipment = createMockShipment();
      const route = { estimated_drive_time: 2 };

      const result = validateDriverAssignment(driver, shipment, route);

      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual(
        expect.stringContaining('unresolved Clearinghouse violation')
      );
    });

    it('should allow driver assignment if Clearinghouse status is clear', () => {
      const driver = createMockDriver({ clearinghouse_status: 'clear' });
      const validation = validateClearinghouseCompliance(driver);

      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should require annual Clearinghouse query', () => {
      const oneYearAgo = new Date();
      oneYearAgo.setDate(oneYearAgo.getDate() - 366); // 366 days ago

      const driver = createMockDriver({
        clearinghouse_last_query: oneYearAgo.toISOString(),
      });

      const validation = validateClearinghouseCompliance(driver);

      expect(validation.valid).toBe(false);
      expect(validation.errors).toContainEqual(
        expect.stringContaining('Annual Clearinghouse query is overdue')
      );
    });

    it('should pass if Clearinghouse query is within 365 days', () => {
      const recentDate = new Date();
      recentDate.setDate(recentDate.getDate() - 30); // 30 days ago

      const driver = createMockDriver({
        clearinghouse_status: 'clear',
        clearinghouse_last_query: recentDate.toISOString(),
      });

      const validation = validateClearinghouseCompliance(driver);

      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });
  });

  describe('P0: Violation Resolution', () => {
    it('should block driver with unresolved violation', () => {
      const driver = createMockDriver({
        clearinghouse_status: 'violation',
        clearinghouse_resolved: false,
        status: 'suspended',
      });

      const validation = validateClearinghouseCompliance(driver);

      expect(validation.valid).toBe(false);
      expect(driver.status).toBe('suspended');
    });

    it('should allow driver with resolved violation', () => {
      const driver = createMockDriver({
        clearinghouse_status: 'violation',
        clearinghouse_resolved: true,
        status: 'active',
      });

      const validation = validateClearinghouseCompliance(driver);

      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });
  });
});
