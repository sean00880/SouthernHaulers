'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type ShipmentStatus = 'assigned' | 'in_transit' | 'at_terminal' | 'delivered';

export default function ShipmentDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [status, setStatus] = useState<ShipmentStatus>('in_transit');
  const [showStatusModal, setShowStatusModal] = useState(false);

  // Mock shipment data
  const shipment = {
    id: params.id,
    shipment_number: 'SH-2025-048',
    container_number: 'TCLU1234567',
    origin: 'Port of Savannah, GA',
    destination: 'Atlanta Distribution Center, GA',
    pickup_date: '2025-10-23T08:00:00Z',
    delivery_date: '2025-10-23T16:00:00Z',
    appointment_date: '2025-10-23T14:00:00Z',
    status,
  };

  const handleStatusUpdate = async (newStatus: ShipmentStatus) => {
    setStatus(newStatus);
    setShowStatusModal(false);

    // TODO: API call to update status
    // await fetch(`/api/shipments/${params.id}/status`, {
    //   method: 'PATCH',
    //   body: JSON.stringify({ status: newStatus }),
    // });
  };

  const statusOptions: { value: ShipmentStatus; label: string; icon: string }[] = [
    { value: 'assigned', label: 'Assigned', icon: '📋' },
    { value: 'in_transit', label: 'In Transit', icon: '🚚' },
    { value: 'at_terminal', label: 'At Terminal', icon: '🏭' },
    { value: 'delivered', label: 'Delivered', icon: '✅' },
  ];

  return (
    <div className="min-h-screen pb-20 bg-gray-950">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <button onClick={() => router.back()} className="p-2 -ml-2 hover:bg-gray-800 rounded-lg transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-bold">{shipment.shipment_number}</h1>
          <div className="w-10" />
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Container Info */}
        <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-800/50">
          <p className="text-sm text-gray-400 mb-2">Container Number</p>
          <p className="text-2xl font-bold font-mono">{shipment.container_number}</p>
        </div>

        {/* Current Status */}
        <div className="p-4 rounded-lg bg-gray-900 border border-gray-800">
          <p className="text-sm text-gray-400 mb-3">Current Status</p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium capitalize">{status.replace('_', ' ')}</span>
            <button
              onClick={() => setShowStatusModal(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-medium transition-colors"
            >
              Update Status
            </button>
          </div>
        </div>

        {/* Route Details */}
        <div className="p-4 rounded-lg bg-gray-900 border border-gray-800">
          <h2 className="font-semibold mb-4 text-gray-300">Route Details</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-400">Pickup Location</p>
                <p className="font-medium mb-1">{shipment.origin}</p>
                <p className="text-sm text-gray-500">
                  {new Date(shipment.pickup_date).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="ml-6 h-12 w-0.5 bg-gray-700"></div>

            <div className="flex items-start gap-3">
              <div className="w-3 h-3 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-400">Delivery Location</p>
                <p className="font-medium mb-1">{shipment.destination}</p>
                <p className="text-sm text-gray-500">
                  {new Date(shipment.delivery_date).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => router.push('/capture')}
            className="p-4 rounded-lg bg-gray-900 border border-gray-800 hover:border-indigo-600 transition-all flex flex-col items-center gap-2"
          >
            <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            </svg>
            <span className="text-sm font-medium">Capture Docs</span>
          </button>

          <button className="p-4 rounded-lg bg-gray-900 border border-gray-800 hover:border-indigo-600 transition-all flex flex-col items-center gap-2">
            <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <span className="text-sm font-medium">Navigation</span>
          </button>

          <button className="p-4 rounded-lg bg-gray-900 border border-gray-800 hover:border-indigo-600 transition-all flex flex-col items-center gap-2">
            <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-sm font-medium">Call Support</span>
          </button>

          <button className="p-4 rounded-lg bg-gray-900 border border-gray-800 hover:border-indigo-600 transition-all flex flex-col items-center gap-2">
            <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium">Report Issue</span>
          </button>
        </div>
      </div>

      {/* Status Update Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black/70 flex items-end z-50 animate-fade-in">
          <div className="w-full bg-gray-900 rounded-t-2xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Update Status</h2>
              <button onClick={() => setShowStatusModal(false)} className="p-2 hover:bg-gray-800 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-2">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleStatusUpdate(option.value)}
                  className={`w-full p-4 rounded-lg text-left transition-all ${
                    status === option.value
                      ? 'bg-indigo-600 border-2 border-indigo-400'
                      : 'bg-gray-800 border-2 border-transparent hover:border-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{option.icon}</span>
                    <div>
                      <p className="font-medium">{option.label}</p>
                      {status === option.value && (
                        <p className="text-xs text-gray-400">Current status</p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
