
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, message' },
        { status: 400 }
      );
    }

    // Insert contact form submission
    const { data, error } = await supabaseAdmin
      .from('contact_submissions')
      .insert({
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        subject: body.subject || 'General Inquiry',
        message: body.message,
        source: 'website_contact_form',
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to submit contact form' },
        { status: 500 }
      );
    }

    // TODO: Send notification email
    // TODO: Send auto-reply to customer

    return NextResponse.json({
      success: true,
      message: 'Thank you for contacting us. We will respond within 24 hours.',
      submissionId: data.id,
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
