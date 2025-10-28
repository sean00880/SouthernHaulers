import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
// TODO: Import Supabase client
// import { createClient } from '@supabase/supabase-js';
// TODO: Import SMS bot for A2P 10DLC workflow
// import { sendWelcomeSMS } from '@/lib/sms-bot';

// Meta Lead Ads webhook payload schema
const MetaLeadSchema = z.object({
  entry: z.array(
    z.object({
      id: z.string(),
      time: z.number(),
      changes: z.array(
        z.object({
          field: z.literal('leadgen'),
          value: z.object({
            leadgen_id: z.string(),
            ad_id: z.string(),
            form_id: z.string(),
            page_id: z.string(),
            created_time: z.number(),
          }),
        })
      ),
    })
  ),
  object: z.literal('page'),
});

const VerificationSchema = z.object({
  'hub.mode': z.literal('subscribe'),
  'hub.verify_token': z.string(),
  'hub.challenge': z.string(),
});

/**
 * GET handler for Meta webhook verification
 * Meta sends a verification request when setting up the webhook
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const params = Object.fromEntries(searchParams.entries());

    // Validate verification request
    const verification = VerificationSchema.parse(params);

    // TODO: Replace with actual verify token from environment
    const VERIFY_TOKEN = process.env.META_WEBHOOK_VERIFY_TOKEN || 'your_verify_token_here';

    if (verification['hub.verify_token'] === VERIFY_TOKEN) {
      // Return challenge to complete verification
      return new NextResponse(verification['hub.challenge'], {
        status: 200,
        headers: { 'Content-Type': 'text/plain' },
      });
    }

    return NextResponse.json(
      { error: 'Invalid verification token' },
      { status: 403 }
    );
  } catch (error) {
    console.error('Webhook verification error:', error);
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 400 }
    );
  }
}

/**
 * POST handler for Meta Lead Ads webhook events
 * Receives lead data and triggers SMS bot workflow
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate webhook payload
    const webhook = MetaLeadSchema.parse(body);

    // Process each lead
    for (const entry of webhook.entry) {
      for (const change of entry.changes) {
        if (change.field !== 'leadgen') continue;

        const leadgenId = change.value.leadgen_id;
        console.log('Processing lead:', leadgenId);

        // TODO: Fetch full lead data from Meta Graph API
        // const leadData = await fetchLeadData(leadgenId, change.value.page_id);

        // Mock lead data for demonstration
        const leadData = {
          id: leadgenId,
          created_time: new Date(change.value.created_time * 1000).toISOString(),
          field_data: [
            { name: 'full_name', values: ['John Doe'] },
            { name: 'email', values: ['john.doe@example.com'] },
            { name: 'phone_number', values: ['+15551234567'] },
            { name: 'cdl_experience', values: ['3 years'] },
          ],
        };

        // Extract lead information
        const fullName = leadData.field_data.find((f) => f.name === 'full_name')?.values[0];
        const email = leadData.field_data.find((f) => f.name === 'email')?.values[0];
        const phone = leadData.field_data.find((f) => f.name === 'phone_number')?.values[0];
        const experience = leadData.field_data.find((f) => f.name === 'cdl_experience')?.values[0];

        if (!fullName || !email || !phone) {
          console.error('Missing required lead data');
          continue;
        }

        // TODO: Store candidate in Supabase
        // const { data: candidate, error: dbError } = await supabase
        //   .from('candidates')
        //   .insert({
        //     name: fullName,
        //     email,
        //     phone,
        //     source: 'meta_lead_ads',
        //     status: 'new',
        //     meta_lead_id: leadgenId,
        //     meta_ad_id: change.value.ad_id,
        //     meta_form_id: change.value.form_id,
        //     metadata: {
        //       cdl_experience: experience,
        //       lead_data: leadData,
        //     },
        //     created_at: leadData.created_time,
        //   })
        //   .select()
        //   .single();

        // Mock candidate ID
        const candidateId = `candidate_${Date.now()}`;

        // TODO: Trigger A2P 10DLC SMS bot workflow
        // await sendWelcomeSMS({
        //   candidateId,
        //   name: fullName,
        //   phone,
        // });

        console.log('Lead processed successfully:', {
          candidateId,
          name: fullName,
          email,
          phone,
        });

        // TODO: Trigger Compliance Agent for initial screening
        // await initiateComplianceCheck(candidateId);
      }
    }

    // Return 200 to acknowledge receipt (Meta requires fast response)
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Webhook processing error:', error);

    // Still return 200 to prevent Meta from retrying
    // Log error for manual review
    return NextResponse.json(
      { success: false, error: 'Processing failed' },
      { status: 200 }
    );
  }
}

/**
 * Helper function to fetch full lead data from Meta Graph API
 * TODO: Implement actual Meta Graph API call
 */
async function fetchLeadData(leadgenId: string, pageId: string) {
  const accessToken = process.env.META_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error('META_ACCESS_TOKEN not configured');
  }

  const response = await fetch(
    `https://graph.facebook.com/v18.0/${leadgenId}?access_token=${accessToken}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Meta API error: ${response.statusText}`);
  }

  return response.json();
}
