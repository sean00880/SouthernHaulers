/**
 * Candidate Test Fixtures
 *
 * Factory functions for creating mock recruiting candidate data.
 */

import { faker } from '@faker-js/faker';

export type CandidateSource = 'meta_lead_ads' | 'direct' | 'referral';
export type CandidateStatus =
  | 'new'
  | 'contacted'
  | 'scheduled'
  | 'interviewed'
  | 'documents_pending'
  | 'approved'
  | 'rejected';

export interface MockCandidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: CandidateSource;
  status: CandidateStatus;
  compliance_score?: number;
  meta_lead_id?: string;
  meta_ad_id?: string;
  meta_form_id?: string;
  sms_opt_out: boolean;
  last_contact?: string;
  scheduled_interview?: string;
  metadata?: {
    cdl_experience?: string;
    preferred_routes?: string[];
    [key: string]: any;
  };
  created_at: string;
  updated_at: string;
}

/**
 * Create a mock candidate
 */
export const createMockCandidate = (overrides: Partial<MockCandidate> = {}): MockCandidate => {
  const createdAt = faker.date.recent();

  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number('+1 (###) ###-####'),
    source: faker.helpers.arrayElement(['meta_lead_ads', 'direct', 'referral'] as CandidateSource[]),
    status: 'new',
    compliance_score: faker.number.int({ min: 60, max: 100 }),
    sms_opt_out: false,
    metadata: {
      cdl_experience: faker.helpers.arrayElement(['0-2 years', '3-5 years', '5+ years']),
      preferred_routes: faker.helpers.arrayElements(['local', 'regional', 'long-haul'], { min: 1, max: 2 }),
    },
    created_at: createdAt.toISOString(),
    updated_at: createdAt.toISOString(),
    ...overrides,
  };
};

/**
 * Create a Meta Lead Ads candidate
 */
export const createMockMetaLeadCandidate = (overrides: Partial<MockCandidate> = {}): MockCandidate => {
  return createMockCandidate({
    source: 'meta_lead_ads',
    meta_lead_id: faker.string.alphanumeric(15),
    meta_ad_id: faker.string.alphanumeric(15),
    meta_form_id: faker.string.alphanumeric(15),
    ...overrides,
  });
};

/**
 * Create a candidate with scheduled interview
 */
export const createMockScheduledCandidate = (overrides: Partial<MockCandidate> = {}): MockCandidate => {
  return createMockCandidate({
    status: 'scheduled',
    scheduled_interview: faker.date.future().toISOString(),
    last_contact: faker.date.recent().toISOString(),
    ...overrides,
  });
};

/**
 * Create multiple mock candidates
 */
export const createMockCandidates = (count: number, overrides: Partial<MockCandidate> = {}): MockCandidate[] => {
  return Array.from({ length: count }, () => createMockCandidate(overrides));
};
