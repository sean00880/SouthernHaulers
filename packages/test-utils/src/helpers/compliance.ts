/**
 * Compliance Test Helpers
 *
 * Utilities for testing DOT/FMCSA compliance requirements.
 */

import { MockDriver } from '../fixtures/drivers';
import { MockShipment } from '../fixtures/shipments';

/**
 * Validate FMCSA Clearinghouse requirements (49 CFR Part 382)
 */
export const validateClearinghouseCompliance = (driver: MockDriver): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Must have clearinghouse status
  if (!driver.clearinghouse_status) {
    errors.push('Clearinghouse status is required');
  }

  // Cannot assign if status is pending
  if (driver.clearinghouse_status === 'pending') {
    errors.push('Clearinghouse query must be completed before assignment');
  }

  // Cannot assign if violation is unresolved
  if (driver.clearinghouse_status === 'violation' && !driver.clearinghouse_resolved) {
    errors.push('Driver has unresolved Clearinghouse violation per 49 CFR Part 382');
  }

  // Query must be within last 365 days
  if (driver.clearinghouse_last_query) {
    const lastQuery = new Date(driver.clearinghouse_last_query);
    const daysSinceQuery = (Date.now() - lastQuery.getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceQuery > 365) {
      errors.push('Annual Clearinghouse query is overdue');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Validate Hours of Service requirements (49 CFR Part 395)
 */
export const validateHosCompliance = (
  driver: MockDriver,
  route: { estimated_drive_time: number }
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // 11-hour driving limit
  if (driver.hos_driving_hours_today + route.estimated_drive_time > 11) {
    errors.push('Assignment would exceed 11-hour driving limit per 49 CFR Part 395');
  }

  // 14-hour on-duty limit
  if (driver.hos_on_duty_hours_today + route.estimated_drive_time > 14) {
    errors.push('Assignment would exceed 14-hour on-duty limit per 49 CFR Part 395');
  }

  // 10-hour off-duty requirement
  if (driver.last_off_duty) {
    const lastOffDuty = new Date(driver.last_off_duty);
    const hoursSinceOffDuty = (Date.now() - lastOffDuty.getTime()) / (1000 * 60 * 60);
    if (hoursSinceOffDuty < 10) {
      const hoursRemaining = 10 - hoursSinceOffDuty;
      errors.push(
        `Driver must complete ${hoursRemaining.toFixed(1)} more hours of off-duty time per 49 CFR Part 395`
      );
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Validate Truth-in-Leasing requirements (49 CFR Part 376)
 */
export const validateLeasingCompliance = (driver: MockDriver): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Lease agreement must be signed
  if (!driver.lease_agreement_signed) {
    errors.push('Lease agreement must be signed per 49 CFR Part 376 before first dispatch');
  }

  // Lease agreement date must be present if signed
  if (driver.lease_agreement_signed && !driver.lease_agreement_date) {
    errors.push('Lease agreement date is required for compliance tracking');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Validate TWIC requirements
 */
export const validateTwicCompliance = (driver: MockDriver, shipment: MockShipment): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Check if shipment requires TWIC
  if (!shipment.requires_twic) {
    return { valid: true, errors: [] };
  }

  // TWIC number must be present
  if (!driver.twic_number) {
    errors.push('Valid TWIC required for port access');
  }

  // TWIC must not be expired
  if (driver.twic_expiry) {
    const expiryDate = new Date(driver.twic_expiry);
    if (expiryDate < new Date()) {
      errors.push('TWIC credential has expired');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Validate CDL requirements
 */
export const validateCdlCompliance = (driver: MockDriver): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // CDL must not be expired
  if (driver.cdl_expiry) {
    const expiryDate = new Date(driver.cdl_expiry);
    if (expiryDate < new Date()) {
      errors.push('CDL license has expired');
    }
  }

  // Medical card must not be expired
  if (driver.medical_card_expiry) {
    const expiryDate = new Date(driver.medical_card_expiry);
    if (expiryDate < new Date()) {
      errors.push('DOT medical card has expired per 49 CFR Part 391');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Run all compliance checks for driver assignment
 */
export const validateDriverAssignment = (
  driver: MockDriver,
  shipment: MockShipment,
  route: { estimated_drive_time: number }
): { valid: boolean; errors: string[] } => {
  const clearinghouse = validateClearinghouseCompliance(driver);
  const hos = validateHosCompliance(driver, route);
  const leasing = validateLeasingCompliance(driver);
  const twic = validateTwicCompliance(driver, shipment);
  const cdl = validateCdlCompliance(driver);

  const allErrors = [
    ...clearinghouse.errors,
    ...hos.errors,
    ...leasing.errors,
    ...twic.errors,
    ...cdl.errors,
  ];

  return {
    valid: allErrors.length === 0,
    errors: allErrors,
  };
};
