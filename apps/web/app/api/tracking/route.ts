
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../lib/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const trackingNumber = searchParams.get('number');

    if (!trackingNumber) {
      return NextResponse.json(
        { error: 'Tracking number is required' },
        { status: 400 }
      );
    }

    // Query shipment by tracking number
    const { data: shipment, error } = await supabaseAdmin
      .from('shipments')
      .select(`
        *,
        loads (
          id,
          status,
          current_location,
          estimated_arrival,
          drivers (
            id,
            name,
            phone
          ),
          vehicles (
            id,
            unit_number,
            license_plate
          )
        ),
        containers (
          id,
          container_number,
          size,
          type
        )
      `)
      .eq('tracking_number', trackingNumber)
      .single();

    if (error || !shipment) {
      return NextResponse.json(
        { error: 'Shipment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      shipment: {
        id: shipment.id,
        trackingNumber: shipment.tracking_number,
        status: shipment.status,
        origin: shipment.origin,
        destination: shipment.destination,
        pickupDate: shipment.pickup_date,
        deliveryDate: shipment.delivery_date,
        currentLocation: shipment.loads?.[0]?.current_location,
        estimatedArrival: shipment.loads?.[0]?.estimated_arrival,
        driver: shipment.loads?.[0]?.drivers,
        vehicle: shipment.loads?.[0]?.vehicles,
        container: shipment.containers?.[0],
      },
    });
  } catch (error) {
    console.error('Tracking error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
