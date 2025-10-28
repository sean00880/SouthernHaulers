'use client';

import { useState } from 'react';

interface Shipment {
  id: string;
  shipment_number: string;
  status: 'pending' | 'assigned' | 'in_transit' | 'at_terminal' | 'delivered';
  origin: string;
  destination: string;
  container_type: string;
  pickup_date: string;
  driver_id?: string;
  driver_name?: string;
}

interface Driver {
  id: string;
  name: string;
  status: 'available' | 'on_load' | 'off_duty';
  current_location?: string;
  compliance_score: number;
}

export default function DispatchPage() {
  const [shipments, setShipments] = useState<Shipment[]>([
    {
      id: '1',
      shipment_number: 'SH-2025-050',
      status: 'pending',
      origin: 'Port of Savannah, GA',
      destination: 'Atlanta, GA',
      container_type: '40ft',
      pickup_date: '2025-10-24T08:00:00Z',
    },
    {
      id: '2',
      shipment_number: 'SH-2025-049',
      status: 'assigned',
      origin: 'Charleston, SC',
      destination: 'Charlotte, NC',
      container_type: '40ft-HC',
      pickup_date: '2025-10-24T10:00:00Z',
      driver_id: '1',
      driver_name: 'Mike Johnson',
    },
    {
      id: '3',
      shipment_number: 'SH-2025-048',
      status: 'in_transit',
      origin: 'Jacksonville, FL',
      destination: 'Savannah, GA',
      container_type: '20ft',
      pickup_date: '2025-10-23T14:00:00Z',
      driver_id: '2',
      driver_name: 'Sarah Williams',
    },
  ]);

  const [drivers, setDrivers] = useState<Driver[]>([
    {
      id: '1',
      name: 'Mike Johnson',
      status: 'on_load',
      current_location: 'Charleston, SC',
      compliance_score: 95,
    },
    {
      id: '2',
      name: 'Sarah Williams',
      status: 'on_load',
      current_location: 'I-95 N near Savannah',
      compliance_score: 100,
    },
    {
      id: '3',
      name: 'John Doe',
      status: 'available',
      current_location: 'Savannah, GA',
      compliance_score: 92,
    },
    {
      id: '4',
      name: 'Emily Brown',
      status: 'available',
      current_location: 'Atlanta, GA',
      compliance_score: 98,
    },
    {
      id: '5',
      name: 'David Martinez',
      status: 'off_duty',
      current_location: 'Charleston, SC',
      compliance_score: 85,
    },
  ]);

  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);

  const getStatusColor = (status: Shipment['status']) => {
    switch (status) {
      case 'delivered':
        return 'text-green-400 bg-green-900/30';
      case 'in_transit':
        return 'text-blue-400 bg-blue-900/30';
      case 'at_terminal':
        return 'text-yellow-400 bg-yellow-900/30';
      case 'assigned':
        return 'text-purple-400 bg-purple-900/30';
      case 'pending':
        return 'text-gray-400 bg-gray-900/30';
      default:
        return 'text-gray-400 bg-gray-900/30';
    }
  };

  const getDriverStatusColor = (status: Driver['status']) => {
    switch (status) {
      case 'available':
        return 'text-green-400 bg-green-900/30';
      case 'on_load':
        return 'text-blue-400 bg-blue-900/30';
      case 'off_duty':
        return 'text-gray-400 bg-gray-900/30';
      default:
        return 'text-gray-400 bg-gray-900/30';
    }
  };

  const handleAssignDriver = (driverId: string) => {
    if (!selectedShipment) return;

    const driver = drivers.find((d) => d.id === driverId);
    if (!driver) return;

    setShipments(
      shipments.map((s) =>
        s.id === selectedShipment.id
          ? { ...s, driver_id: driverId, driver_name: driver.name, status: 'assigned' }
          : s
      )
    );

    setDrivers(
      drivers.map((d) =>
        d.id === driverId ? { ...d, status: 'on_load' as const } : d
      )
    );

    setShowAssignModal(false);
    setSelectedShipment(null);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dispatch Board</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
            Filter
          </button>
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors">
            + New Shipment
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Shipments List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-4 rounded-lg bg-gray-900 border border-gray-800">
            <h2 className="text-lg font-semibold mb-4">Active Shipments</h2>
            <div className="space-y-3">
              {shipments.map((shipment) => (
                <div
                  key={shipment.id}
                  className="p-4 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-gray-600 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{shipment.shipment_number}</h3>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(shipment.status)}`}>
                          {shipment.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">
                        {shipment.origin} → {shipment.destination}
                      </p>
                      <div className="flex gap-4 text-xs text-gray-500">
                        <span>{shipment.container_type}</span>
                        <span>Pickup: {formatDate(shipment.pickup_date)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-700">
                    {shipment.driver_name ? (
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-medium">
                          {shipment.driver_name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{shipment.driver_name}</p>
                          <p className="text-xs text-gray-500">Assigned</p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No driver assigned</p>
                    )}

                    <button
                      onClick={() => {
                        setSelectedShipment(shipment);
                        setShowAssignModal(true);
                      }}
                      className="px-3 py-1.5 text-sm bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
                    >
                      {shipment.driver_name ? 'Reassign' : 'Assign Driver'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Drivers List */}
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-gray-900 border border-gray-800">
            <h2 className="text-lg font-semibold mb-4">Drivers</h2>
            <div className="space-y-3">
              {drivers.map((driver) => (
                <div
                  key={driver.id}
                  className="p-3 rounded-lg bg-gray-800/50 border border-gray-700"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-medium">
                      {driver.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{driver.name}</p>
                      <p className="text-xs text-gray-500">{driver.current_location}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                    <span className={`px-2 py-0.5 text-xs rounded-full ${getDriverStatusColor(driver.status)}`}>
                      {driver.status.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-400">
                      Compliance: {driver.compliance_score}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Assign Driver Modal */}
      {showAssignModal && selectedShipment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Assign Driver</h2>
            <p className="text-gray-400 mb-4">
              Select a driver for {selectedShipment.shipment_number}
            </p>

            <div className="space-y-2 mb-6">
              {drivers
                .filter((d) => d.status === 'available')
                .map((driver) => (
                  <button
                    key={driver.id}
                    onClick={() => handleAssignDriver(driver.id)}
                    className="w-full p-3 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-indigo-600 transition-all text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-medium">
                        {driver.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{driver.name}</p>
                        <p className="text-sm text-gray-400">{driver.current_location}</p>
                      </div>
                      <span className="text-xs text-green-400">
                        {driver.compliance_score}%
                      </span>
                    </div>
                  </button>
                ))}

              {drivers.filter((d) => d.status === 'available').length === 0 && (
                <p className="text-center py-4 text-gray-500">No available drivers</p>
              )}
            </div>

            <button
              onClick={() => {
                setShowAssignModal(false);
                setSelectedShipment(null);
              }}
              className="w-full py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
