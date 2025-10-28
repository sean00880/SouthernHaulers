/**
 * Hours of Service (HOS) Compliance Tests (49 CFR Part 395)
 *
 * Critical P0 tests for HOS limits.
 */

import { describe, it, expect } from 'vitest';
import {
  createMockDriver,
  createMockDriverAtHosLimit,
  validateHosCompliance,
} from '@southernhaulers/test-utils';

describe('Hours of Service Compliance (49 CFR Part 395)', () => {
  describe('P0: 11-Hour Driving Limit', () => {
    it('should block assignment that exceeds 11-hour driving limit', () => {
      const driver = createMockDriver({ hos_driving_hours_today: 10.5 });
      const route = { estimated_drive_time: 1.5 };

      const result = validateHosCompliance(driver, route);

      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual(
        expect.stringContaining('11-hour driving limit')
      );
    });

    it('should allow assignment within 11-hour driving limit', () => {
      const driver = createMockDriver({ hos_driving_hours_today: 8.0 });
      const route = { estimated_drive_time: 2.5 };

      const result = validateHosCompliance(driver, route);

      expect(result.valid).toBe(true);
    });
  });

  describe('P0: 14-Hour On-Duty Limit', () => {
    it('should block assignment that exceeds 14-hour on-duty limit', () => {
      const driver = createMockDriver({ hos_on_duty_hours_today: 13.0 });
      const route = { estimated_drive_time: 2.0 };

      const result = validateHosCompliance(driver, route);

      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual(
        expect.stringContaining('14-hour on-duty limit')
      );
    });
  });

  describe('P0: 10-Hour Off-Duty Requirement', () => {
    it('should block dispatch if driver has not had 10-hour break', () => {
      const lastOffDuty = new Date();
      lastOffDuty.setHours(lastOffDuty.getHours() - 9); // 9 hours ago

      const driver = createMockDriver({
        last_off_duty: lastOffDuty.toISOString(),
        hos_driving_hours_today: 0,
        hos_on_duty_hours_today: 0,
      });
      const route = { estimated_drive_time: 1.0 };

      const result = validateHosCompliance(driver, route);

      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual(
        expect.stringContaining('10-hour off-duty')
      );
    });

    it('should allow dispatch after 10-hour break', () => {
      const lastOffDuty = new Date();
      lastOffDuty.setHours(lastOffDuty.getHours() - 11); // 11 hours ago

      const driver = createMockDriver({
        last_off_duty: lastOffDuty.toISOString(),
        hos_driving_hours_today: 0,
        hos_on_duty_hours_today: 0,
      });
      const route = { estimated_drive_time: 5.0 };

      const result = validateHosCompliance(driver, route);

      expect(result.valid).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle driver at exact 11-hour limit', () => {
      const driver = createMockDriver({ hos_driving_hours_today: 11.0 });
      const route = { estimated_drive_time: 0.1 };

      const result = validateHosCompliance(driver, route);

      expect(result.valid).toBe(false);
    });

    it('should allow driver at 10.99 hours with 0.01 hour route', () => {
      const driver = createMockDriver({ hos_driving_hours_today: 10.99 });
      const route = { estimated_drive_time: 0.01 };

      const result = validateHosCompliance(driver, route);

      expect(result.valid).toBe(true);
    });
  });
});
