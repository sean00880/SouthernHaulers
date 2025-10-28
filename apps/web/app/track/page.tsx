'use client';

import { useState } from 'react';
import { ContainerLFDTracker } from '../../components/container-lfd-tracker';

interface ShipmentStatus {
  id: string;
  shipment_number: string;
  status: string;
  container_number?: string;
  origin: string;
  destination: string;
  pickup_date?: string;
  delivery_date?: string;
  last_free_day?: string;
  driver_name?: string;
  current_location?: string;
  documents: Array<{
    id: string;
    type: string;
    filename: string;
    url: string;
  }>;
}

export default function TrackPage() {
  const [activeTab, setActiveTab] = useState<'shipment' | 'container'>('shipment');
  const [searchQuery, setSearchQuery] = useState('');
  const [shipment, setShipment] = useState<ShipmentStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setShipment(null);

    try {
      // TODO: Replace with actual API call to Supabase
      // const response = await fetch(`/api/shipments/track?q=${searchQuery}`);
      // const data = await response.json();

      // Mock data for demo
      if (searchQuery.toLowerCase().includes('demo')) {
        setShipment({
          id: 'demo-123',
          shipment_number: 'SH-2025-001',
          status: 'in_transit',
          container_number: 'TCLU1234567',
          origin: 'Port of Savannah, GA',
          destination: 'Atlanta Distribution Center, GA',
          pickup_date: '2025-10-22T08:00:00Z',
          delivery_date: '2025-10-23T14:00:00Z',
          last_free_day: '2025-10-25T23:59:59Z',
          driver_name: 'John Doe',
          current_location: 'I-16 W, near Macon, GA',
          documents: [
            { id: '1', type: 'BOL', filename: 'BOL_SH-2025-001.pdf', url: '#' },
            { id: '2', type: 'POD', filename: 'POD_SH-2025-001.pdf', url: '#' },
          ],
        });
      } else {
        setError('Shipment not found. Try "demo" for a sample.');
      }
    } catch (err) {
      setError('Error fetching shipment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
      case 'completed':
        return 'text-green-400 bg-green-900/30';
      case 'in_transit':
        return 'text-blue-400 bg-blue-900/30';
      case 'at_terminal':
        return 'text-yellow-400 bg-yellow-900/30';
      case 'pending':
      case 'assigned':
        return 'text-gray-400 bg-gray-900/30';
      case 'cancelled':
        return 'text-red-400 bg-red-900/30';
      default:
        return 'text-gray-400 bg-gray-900/30';
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Track Your Shipment</h1>

      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-lg border bg-card p-1 card-depth">
          <button
            onClick={() => setActiveTab('shipment')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'shipment'
                ? 'bg-primary text-primary-foreground button-depth'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Shipment Tracking
          </button>
          <button
            onClick={() => setActiveTab('container')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'container'
                ? 'bg-primary text-primary-foreground button-depth'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Container LFD Tracker
          </button>
        </div>
      </div>

      {activeTab === 'shipment' ? (
        <div>
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter shipment number, BOL, or container number..."
                className="flex-1 px-4 py-3 rounded-lg bg-gray-900 border border-gray-800 focus:border-indigo-500 focus:outline-none"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-700 rounded-lg font-medium transition-colors"
              >
                {loading ? 'Searching...' : 'Track'}
              </button>
            </div>
          </form>

          {error && (
            <div className="p-4 rounded-lg bg-red-900/30 border border-red-800 text-red-400 mb-8">
              {error}
            </div>
          )}

          {shipment && (
            <div className="space-y-6">
              {/* Status Header */}
              <div className="p-6 rounded-lg bg-gray-900 border border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold">{shipment.shipment_number}</h2>
                    <p className="text-gray-400">Container: {shipment.container_number || 'N/A'}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full font-medium ${getStatusColor(shipment.status)}`}>
                    {shipment.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>

                {shipment.current_location && (
                  <div className="p-4 rounded-lg bg-gray-800/50">
                    <p className="text-sm text-gray-400 mb-1">Current Location</p>
                    <p className="text-lg">{shipment.current_location}</p>
                  </div>
                )}
              </div>

              {/* Route Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-lg bg-gray-900 border border-gray-800">
                  <h3 className="text-lg font-semibold mb-4 text-indigo-400">Origin</h3>
                  <p className="mb-2">{shipment.origin}</p>
                  <p className="text-sm text-gray-400">
                    Pickup: {formatDate(shipment.pickup_date)}
                  </p>
                </div>

                <div className="p-6 rounded-lg bg-gray-900 border border-gray-800">
                  <h3 className="text-lg font-semibold mb-4 text-indigo-400">Destination</h3>
                  <p className="mb-2">{shipment.destination}</p>
                  <p className="text-sm text-gray-400">
                    Delivery: {formatDate(shipment.delivery_date)}
                  </p>
                </div>
              </div>

              {/* Driver & Important Dates */}
              <div className="p-6 rounded-lg bg-gray-900 border border-gray-800">
                <h3 className="text-lg font-semibold mb-4 text-indigo-400">Details</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Driver</p>
                    <p className="text-lg">{shipment.driver_name || 'Not assigned'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Last Free Day</p>
                    <p className="text-lg">{formatDate(shipment.last_free_day)}</p>
                  </div>
                </div>
              </div>

              {/* Documents */}
              {shipment.documents.length > 0 && (
                <div className="p-6 rounded-lg bg-gray-900 border border-gray-800">
                  <h3 className="text-lg font-semibold mb-4 text-indigo-400">Documents</h3>
                  <div className="space-y-2">
                    {shipment.documents.map((doc) => (
                      <a
                        key={doc.id}
                        href={doc.url}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          <div>
                            <p className="font-medium">{doc.type}</p>
                            <p className="text-sm text-gray-400">{doc.filename}</p>
                          </div>
                        </div>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <ContainerLFDTracker />
      )}
    </div>
  );
}
