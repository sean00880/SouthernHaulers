import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { handleInboundSMS } from '@/lib/sms-bot';

/**
 * Twilio SMS Webhook Handler
 *
 * Receives inbound SMS messages from candidates and routes them
 * through the A2P 10DLC SMS bot workflow.
 *
 * Webhook URL: https://yourapp.com/api/webhooks/sms
 * Method: POST
 * Content-Type: application/x-www-form-urlencoded
 */

// Twilio webhook payload schema
const TwilioSMSSchema = z.object({
  MessageSid: z.string(),
  From: z.string(),
  To: z.string(),
  Body: z.string(),
  NumMedia: z.string().optional(),
  AccountSid: z.string(),
});

/**
 * POST handler for Twilio SMS webhook
 */
export async function POST(request: NextRequest) {
  try {
    // Parse form data (Twilio sends application/x-www-form-urlencoded)
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());

    // Validate Twilio signature for security
    // TODO: Implement signature verification
    // const twilioSignature = request.headers.get('x-twilio-signature');
    // if (!verifyTwilioSignature(twilioSignature, data)) {
    //   return NextResponse.json({ error: 'Invalid signature' }, { status: 403 });
    // }

    // Validate payload
    const payload = TwilioSMSSchema.parse(data);

    console.log('Inbound SMS received:', {
      from: payload.From,
      to: payload.To,
      body: payload.Body,
      messageSid: payload.MessageSid,
    });

    // TODO: Log inbound SMS event
    // await logSMSEvent({
    //   phone: payload.From,
    //   direction: 'inbound',
    //   message: payload.Body,
    //   status: 'received',
    //   twilioMessageSid: payload.MessageSid,
    // });

    // Process message through SMS bot
    const { reply } = await handleInboundSMS({
      from: payload.From,
      body: payload.Body,
      messageSid: payload.MessageSid,
    });

    // Return TwiML response (Twilio's XML format)
    if (reply) {
      const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>${escapeXml(reply)}</Message>
</Response>`;

      return new NextResponse(twiml, {
        status: 200,
        headers: {
          'Content-Type': 'text/xml',
        },
      });
    }

    // Empty response if no reply needed
    const emptyTwiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response></Response>`;

    return new NextResponse(emptyTwiml, {
      status: 200,
      headers: {
        'Content-Type': 'text/xml',
      },
    });
  } catch (error) {
    console.error('SMS webhook error:', error);

    // Return empty TwiML to prevent Twilio retries
    const errorTwiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response></Response>`;

    return new NextResponse(errorTwiml, {
      status: 200,
      headers: {
        'Content-Type': 'text/xml',
      },
    });
  }
}

/**
 * GET handler for webhook health check
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'SMS webhook is running',
  });
}

/**
 * Escape XML special characters for TwiML
 */
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Verify Twilio signature for webhook security
 * TODO: Implement actual signature verification
 */
function verifyTwilioSignature(
  signature: string | null,
  payload: Record<string, any>
): boolean {
  if (!signature) return false;

  const authToken = process.env.TWILIO_AUTH_TOKEN;
  if (!authToken) {
    console.warn('TWILIO_AUTH_TOKEN not configured - skipping signature verification');
    return true; // Allow in development
  }

  // TODO: Implement HMAC-SHA1 signature verification
  // const crypto = require('crypto');
  // const webhookUrl = process.env.TWILIO_WEBHOOK_URL;
  // const params = Object.keys(payload)
  //   .sort()
  //   .map((key) => `${key}${payload[key]}`)
  //   .join('');
  // const data = webhookUrl + params;
  // const hmac = crypto.createHmac('sha1', authToken);
  // const expectedSignature = hmac.update(Buffer.from(data, 'utf-8')).digest('base64');
  // return signature === expectedSignature;

  return true;
}
