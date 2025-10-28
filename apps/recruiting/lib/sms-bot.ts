/**
 * A2P 10DLC SMS Bot Workflow
 *
 * Compliance Requirements:
 * - A2P 10DLC registration with carrier
 * - TCPA consent (obtained via Meta Lead Form)
 * - EEOC compliance in all communications
 * - Opt-out handling (STOP keyword)
 * - Message rate limits
 */

import twilio from 'twilio';

// TODO: Configure Twilio client with A2P 10DLC phone number
// const twilioClient = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// const A2P_PHONE_NUMBER = process.env.TWILIO_A2P_PHONE_NUMBER;

interface SendWelcomeSMSParams {
  candidateId: string;
  name: string;
  phone: string;
}

interface SendScheduleLinkParams {
  candidateId: string;
  name: string;
  phone: string;
  scheduleUrl: string;
}

/**
 * Send welcome SMS to new candidate
 * Triggered immediately after Meta Lead Ads webhook
 */
export async function sendWelcomeSMS({
  candidateId,
  name,
  phone,
}: SendWelcomeSMSParams): Promise<void> {
  const message = `Hi ${name}! 👋

Thank you for your interest in joining Southern Haulers as a driver.

We're excited to learn more about you!

Here's what happens next:
1️⃣ Reply YES to continue
2️⃣ We'll send you a link to schedule a quick call
3️⃣ Start your onboarding process

Reply STOP to opt out anytime.`;

  try {
    // TODO: Uncomment when Twilio is configured
    // const result = await twilioClient.messages.create({
    //   body: message,
    //   from: A2P_PHONE_NUMBER,
    //   to: phone,
    // });

    // TODO: Log SMS event in database
    // await logSMSEvent({
    //   candidateId,
    //   phone,
    //   direction: 'outbound',
    //   message,
    //   status: 'sent',
    //   twilioMessageSid: result.sid,
    // });

    console.log('Welcome SMS sent:', {
      candidateId,
      phone,
      // messageSid: result.sid,
    });
  } catch (error) {
    console.error('Failed to send welcome SMS:', error);
    throw error;
  }
}

/**
 * Send scheduling link after candidate confirms interest
 * Triggered by SMS reply webhook (YES response)
 */
export async function sendScheduleLink({
  candidateId,
  name,
  phone,
  scheduleUrl,
}: SendScheduleLinkParams): Promise<void> {
  const message = `Great to hear from you, ${name}! 🎉

Here's your personalized scheduling link:
${scheduleUrl}

Choose a time that works best for you. We typically have slots available same-day or next-day.

Our hiring team will call you at the scheduled time. The call usually takes 15-20 minutes.

Questions? Just reply to this message.

Reply STOP to opt out.`;

  try {
    // TODO: Uncomment when Twilio is configured
    // const result = await twilioClient.messages.create({
    //   body: message,
    //   from: A2P_PHONE_NUMBER,
    //   to: phone,
    // });

    // TODO: Log SMS event
    // await logSMSEvent({
    //   candidateId,
    //   phone,
    //   direction: 'outbound',
    //   message,
    //   status: 'sent',
    //   twilioMessageSid: result.sid,
    // });

    console.log('Schedule link SMS sent:', {
      candidateId,
      phone,
      scheduleUrl,
    });
  } catch (error) {
    console.error('Failed to send schedule link SMS:', error);
    throw error;
  }
}

/**
 * Handle inbound SMS from candidate
 * Triggered by Twilio webhook
 */
export async function handleInboundSMS(params: {
  from: string;
  body: string;
  messageSid: string;
}): Promise<{ reply: string | null }> {
  const { from, body, messageSid } = params;

  // Normalize message body
  const normalizedBody = body.trim().toUpperCase();

  // TODO: Look up candidate by phone number
  // const { data: candidate } = await supabase
  //   .from('candidates')
  //   .select('*')
  //   .eq('phone', from)
  //   .single();

  // Mock candidate
  const candidate = {
    id: 'candidate_123',
    name: 'John Doe',
    status: 'new',
  };

  // Handle STOP keyword (required by TCPA)
  if (['STOP', 'STOPALL', 'UNSUBSCRIBE', 'CANCEL', 'END', 'QUIT'].includes(normalizedBody)) {
    // TODO: Mark candidate as opted out
    // await supabase
    //   .from('candidates')
    //   .update({ sms_opt_out: true, updated_at: new Date().toISOString() })
    //   .eq('phone', from);

    return {
      reply: 'You have been unsubscribed from Southern Haulers recruiting messages. Reply START to opt back in.',
    };
  }

  // Handle START keyword (opt back in)
  if (['START', 'UNSTOP', 'RESUME'].includes(normalizedBody)) {
    // TODO: Re-enable SMS for candidate
    // await supabase
    //   .from('candidates')
    //   .update({ sms_opt_out: false, updated_at: new Date().toISOString() })
    //   .eq('phone', from);

    return {
      reply: `Welcome back! You're now re-subscribed to Southern Haulers recruiting messages.`,
    };
  }

  // Handle YES response (send scheduling link)
  if (['YES', 'Y', 'INTERESTED', 'CONTINUE'].includes(normalizedBody)) {
    // TODO: Generate personalized scheduling URL
    const scheduleUrl = `https://southernhaulers.net/recruiting/schedule/${candidate.id}`;

    await sendScheduleLink({
      candidateId: candidate.id,
      name: candidate.name,
      phone: from,
      scheduleUrl,
    });

    // TODO: Update candidate status
    // await supabase
    //   .from('candidates')
    //   .update({ status: 'contacted', updated_at: new Date().toISOString() })
    //   .eq('id', candidate.id);

    return { reply: null }; // sendScheduleLink already sent the response
  }

  // Handle HELP keyword
  if (['HELP', 'INFO', 'SUPPORT'].includes(normalizedBody)) {
    return {
      reply: `Southern Haulers Recruiting

Reply YES to continue your application.
Reply STOP to opt out.

Need assistance? Call us at 1-800-XXX-XXXX`,
    };
  }

  // Default response for unrecognized message
  return {
    reply: `Thanks for your message! Reply YES to continue your driver application, or HELP for assistance.`,
  };
}

/**
 * Send reminder SMS if candidate hasn't responded
 * Triggered by scheduled job (e.g., 24 hours after welcome SMS)
 */
export async function sendFollowUpReminder({
  candidateId,
  name,
  phone,
}: SendWelcomeSMSParams): Promise<void> {
  const message = `Hi ${name},

Just checking in! We sent you a message about joining Southern Haulers.

If you're still interested, reply YES and we'll get you scheduled for a quick call.

Reply STOP to opt out.`;

  try {
    // TODO: Uncomment when Twilio is configured
    // const result = await twilioClient.messages.create({
    //   body: message,
    //   from: A2P_PHONE_NUMBER,
    //   to: phone,
    // });

    console.log('Follow-up SMS sent:', { candidateId, phone });
  } catch (error) {
    console.error('Failed to send follow-up SMS:', error);
    throw error;
  }
}

/**
 * Send appointment confirmation SMS
 * Triggered when candidate schedules an interview
 */
export async function sendAppointmentConfirmation({
  candidateId,
  name,
  phone,
  appointmentTime,
}: SendWelcomeSMSParams & { appointmentTime: string }): Promise<void> {
  const formattedTime = new Date(appointmentTime).toLocaleString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  });

  const message = `Confirmed! 🎉

${name}, your interview is scheduled for:
${formattedTime}

Our hiring team will call you at ${phone}.

What to expect:
✅ 15-20 minute phone call
✅ Questions about your driving experience
✅ Overview of benefits & pay
✅ Next steps in onboarding

Need to reschedule? Reply to this message.

Reply STOP to opt out.`;

  try {
    // TODO: Uncomment when Twilio is configured
    // const result = await twilioClient.messages.create({
    //   body: message,
    //   from: A2P_PHONE_NUMBER,
    //   to: phone,
    // });

    console.log('Appointment confirmation SMS sent:', {
      candidateId,
      phone,
      appointmentTime,
    });
  } catch (error) {
    console.error('Failed to send appointment confirmation:', error);
    throw error;
  }
}

/**
 * Log SMS event to database for compliance and tracking
 */
async function logSMSEvent(event: {
  candidateId: string;
  phone: string;
  direction: 'inbound' | 'outbound';
  message: string;
  status: string;
  twilioMessageSid?: string;
}): Promise<void> {
  // TODO: Store in Supabase
  // await supabase.from('sms_events').insert({
  //   candidate_id: event.candidateId,
  //   phone: event.phone,
  //   direction: event.direction,
  //   message: event.message,
  //   status: event.status,
  //   twilio_message_sid: event.twilioMessageSid,
  //   created_at: new Date().toISOString(),
  // });

  console.log('SMS event logged:', event);
}
