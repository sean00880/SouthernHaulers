/**
 * Mock Twilio SDK for Testing
 *
 * Provides mocks for Twilio SMS, voice, and webhook functionality.
 */

export interface MockTwilioClient {
  messages: {
    create: jest.Mock;
    get: jest.Mock;
    list: jest.Mock;
  };
  calls: {
    create: jest.Mock;
    get: jest.Mock;
  };
}

/**
 * Create a mock Twilio client
 */
export const createMockTwilioClient = (): MockTwilioClient => ({
  messages: {
    create: jest.fn().mockResolvedValue({
      sid: 'SM' + Math.random().toString(36).substring(2, 15),
      from: '+15551234567',
      to: '+15559876543',
      body: 'Test message',
      status: 'sent',
      dateCreated: new Date(),
    }),
    get: jest.fn().mockResolvedValue({
      sid: 'SM123456',
      status: 'delivered',
    }),
    list: jest.fn().mockResolvedValue([]),
  },
  calls: {
    create: jest.fn().mockResolvedValue({
      sid: 'CA' + Math.random().toString(36).substring(2, 15),
      from: '+15551234567',
      to: '+15559876543',
      status: 'queued',
    }),
    get: jest.fn().mockResolvedValue({
      sid: 'CA123456',
      status: 'completed',
    }),
  },
});

/**
 * Create mock Twilio webhook payload
 */
export const createMockTwilioWebhook = (overrides = {}) => ({
  MessageSid: 'SM' + Math.random().toString(36).substring(2, 15),
  From: '+15559876543',
  To: '+15551234567',
  Body: 'YES',
  NumMedia: '0',
  AccountSid: 'AC' + Math.random().toString(36).substring(2, 15),
  ...overrides,
});

/**
 * Validate Twilio signature (mock implementation)
 */
export const mockValidateTwilioSignature = jest.fn().mockReturnValue(true);
