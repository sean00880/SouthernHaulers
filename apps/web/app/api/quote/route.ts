
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['companyName', 'contactName', 'email', 'phone', 'pickupAddress', 'deliveryAddress'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Insert quote request into database
    const { data, error } = await supabaseAdmin
      .from('quotes')
      .insert({
        company_name: body.companyName,
        contact_name: body.contactName,
        email: body.email,
        phone: body.phone,
        pickup_address: body.pickupAddress,
        pickup_city: body.pickupCity,
        pickup_state: body.pickupState,
        pickup_zip: body.pickupZip,
        delivery_address: body.deliveryAddress,
        delivery_city: body.deliveryCity,
        delivery_state: body.deliveryState,
        delivery_zip: body.deliveryZip,
        container_type: body.containerType,
        cargo_type: body.cargoType,
        pickup_date: body.pickupDate,
        notes: body.notes,
        status: 'pending',
        source: 'website',
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to submit quote request' },
        { status: 500 }
      );
    }

    // TODO: Send notification email to dispatch team
    // TODO: Send confirmation email to customer

    return NextResponse.json({
      success: true,
      message: 'Quote request submitted successfully',
      quoteId: data.id,
    });
  } catch (error) {
    console.error('Quote submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
