'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Shipment {
  id: string;
  shipment_number: string;
  status: 'assigned' | 'in_transit' | 'at_terminal' | 'delivered';
  origin: string;
  destination: string;
  container_number?: string;
  pickup_date: string;
  delivery_date?: string;
  appointment_date?: string;
}

export default function DashboardPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    // Mock data for demo
    setTimeout(() => {
      setShipments([
        {
          id: '1',
          shipment_number: 'SH-2025-048',
          status: 'in_transit',
          origin: 'Port of Savannah, GA',
          destination: 'Atlanta Distribution Center, GA',
          container_number: 'TCLU1234567',
          pickup_date: '2025-10-23T08:00:00Z',
          delivery_date: '2025-10-23T16:00:00Z',
          appointment_date: '2025-10-23T14:00:00Z',
        },
        {
          id: '2',
          shipment_number: 'SH-2025-049',
          status: 'assigned',
          origin: 'Charleston, SC',
          destination: 'Charlotte, NC',
          container_number: 'MSCU7654321',
          pickup_date: '2025-10-24T09:00:00Z',
          appointment_date: '2025-10-24T11:00:00Z',
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const getStatusColor = (status: Shipment['status']) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-900/30 text-green-400 border-green-800';
      case 'in_transit':
        return 'bg-blue-900/30 text-blue-400 border-blue-800';
      case 'at_terminal':
        return 'bg-yellow-900/30 text-yellow-400 border-yellow-800';
      case 'assigned':
        return 'bg-purple-900/30 text-purple-400 border-purple-800';
      default:
        return 'bg-gray-900/30 text-gray-400 border-gray-800';
    }
  };

  const formatTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading shipments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">My Shipments</h1>
            <p className="text-sm text-gray-400">{shipments.length} active</p>
          </div>
          <button className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Shipments List */}
      <div className="p-4 space-y-3">
        {shipments.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-gray-400">No active shipments</p>
          </div>
        ) : (
          shipments.map((shipment) => (
            <Link key={shipment.id} href={`/shipment/${shipment.id}`}>
              <div className="p-4 rounded-xl bg-gray-900 border border-gray-800 active:bg-gray-800 transition-colors">
                {/* Status Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(shipment.status)}`}>
                    {shipment.status.replace('_', ' ').toUpperCase()}
                  </span>
                  <span className="text-sm text-gray-400">{shipment.shipment_number}</span>
                </div>

                {/* Container */}
                {shipment.container_number && (
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-1">Container</p>
                    <p className="font-mono text-lg font-semibold">{shipment.container_number}</p>
                  </div>
                )}

                {/* Route */}
                <div className="space-y-2 mb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-400 mt-1 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-400">Pickup</p>
                      <p className="text-sm">{shipment.origin}</p>
                      <p className="text-xs text-gray-500">{formatTime(shipment.pickup_date)}</p>
                    </div>
                  </div>
                  <div className="ml-6 h-8 w-0.5 bg-gray-700"></div>
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-400 mt-1 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-400">Delivery</p>
                      <p className="text-sm">{shipment.destination}</p>
                      {shipment.delivery_date && (
                        <p className="text-xs text-gray-500">{formatTime(shipment.delivery_date)}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {shipment.status === 'in_transit' && (
                  <div className="flex gap-2 pt-3 border-t border-gray-800">
                    <button className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-medium transition-colors">
                      Update Status
                    </button>
                    <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 bottom-nav">
        <div className="flex justify-around py-3">
          <button className="flex flex-col items-center gap-1 text-indigo-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs font-medium">Home</span>
          </button>

          <Link href="/capture" className="flex flex-col items-center gap-1 text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xs font-medium">Capture</span>
          </Link>

          <Link href="/profile" className="flex flex-col items-center gap-1 text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs font-medium">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
