/**
 * Southern Haulers Test Utilities
 *
 * Shared testing utilities for all applications in the monorepo.
 */

// Mocks
export {
  createMockSupabaseClient,
  createMockSession,
  createMockUser,
  type MockSupabaseClient,
} from './mocks/supabase';

export {
  createMockTwilioClient,
  createMockTwilioWebhook,
  mockValidateTwilioSignature,
  type MockTwilioClient,
} from './mocks/twilio';

// Fixtures
export {
  createMockShipment,
  createMockShipments,
  createMockShipmentWithStatus,
  type MockShipment,
  type ShipmentStatus,
} from './fixtures/shipments';

export {
  createMockDriver,
  createMockDrivers,
  createMockDriverWithViolation,
  createMockDriverWithExpiredTwic,
  createMockDriverAtHosLimit,
  type MockDriver,
  type DriverStatus,
  type ClearinghouseStatus,
} from './fixtures/drivers';

export {
  createMockCandidate,
  createMockCandidates,
  createMockMetaLeadCandidate,
  createMockScheduledCandidate,
  type MockCandidate,
  type CandidateSource,
  type CandidateStatus,
} from './fixtures/candidates';

// Compliance Helpers
export {
  validateClearinghouseCompliance,
  validateHosCompliance,
  validateLeasingCompliance,
  validateTwicCompliance,
  validateCdlCompliance,
  validateDriverAssignment,
} from './helpers/compliance';
