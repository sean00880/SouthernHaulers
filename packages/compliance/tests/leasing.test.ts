/**
 * Truth-in-Leasing Compliance Tests (49 CFR Part 376)
 *
 * Critical P0 tests for lease agreement compliance.
 */

import { describe, it, expect } from 'vitest';
import {
  createMockDriver,
  validateLeasingCompliance,
} from '@southernhaulers/test-utils';

describe('Truth-in-Leasing Compliance (49 CFR Part 376)', () => {
  describe('P0: Lease Agreement Requirement', () => {
    it('should require signed lease agreement before first dispatch', () => {
      const driver = createMockDriver({ lease_agreement_signed: false });

      const result = validateLeasingCompliance(driver);

      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual(
        expect.stringContaining('Lease agreement must be signed per 49 CFR Part 376')
      );
    });

    it('should allow dispatch with signed lease agreement', () => {
      const driver = createMockDriver({
        lease_agreement_signed: true,
        lease_agreement_date: new Date().toISOString(),
      });

      const result = validateLeasingCompliance(driver);

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should require lease agreement date if signed', () => {
      const driver = createMockDriver({
        lease_agreement_signed: true,
        lease_agreement_date: undefined,
      });

      const result = validateLeasingCompliance(driver);

      expect(result.valid).toBe(false);
      expect(result.errors).toContainEqual(
        expect.stringContaining('Lease agreement date is required')
      );
    });
  });
});
