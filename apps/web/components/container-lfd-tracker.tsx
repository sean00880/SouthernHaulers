'use client';

import { useState } from 'react';
import { Search, MapPin, Calendar, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

interface ContainerStatus {
  containerNumber: string;
  port: string;
  status: 'available' | 'on-hold' | 'out-for-delivery' | 'delivered';
  lfd: string;
  arrivalDate: string;
  location: string;
  daysUntilLFD: number;
}

const ports = [
  { id: 'savannah-garden-city', name: 'Port of Savannah - Garden City Terminal' },
  { id: 'savannah-ocean', name: 'Port of Savannah - Ocean Terminal' },
  { id: 'nashville-rail', name: 'Nashville Rail Terminal' },
  { id: 'memphis-rail', name: 'Memphis Rail Terminal' },
  { id: 'huntsville-rail', name: 'Huntsville, Alabama Rail Terminal' },
  { id: 'mobile-arp-rail', name: 'Mobile, Alabama ARP Rail Terminal' },
  { id: 'crandall-rail', name: 'Crandall, Georgia Rail Terminal' },
  { id: 'atlanta-rail', name: 'Atlanta Rail Terminal' },
];

export function ContainerLFDTracker() {
  const [containerNumber, setContainerNumber] = useState('');
  const [selectedPort, setSelectedPort] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [containerStatus, setContainerStatus] = useState<ContainerStatus | null>(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setError('');
    
    if (!containerNumber.trim()) {
      setError('Please enter a container number');
      return;
    }
    
    if (!selectedPort) {
      setError('Please select a port');
      return;
    }

    setIsSearching(true);

    // Simulate API call
    setTimeout(() => {
      // Mock data - in production, this would call a real API
      const mockStatus: ContainerStatus = {
        containerNumber: containerNumber.toUpperCase(),
        port: ports.find(p => p.id === selectedPort)?.name || '',
        status: 'available',
        lfd: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        arrivalDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        location: 'Terminal Storage Yard',
        daysUntilLFD: 4,
      };

      setContainerStatus(mockStatus);
      setIsSearching(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'text-green-500';
      case 'on-hold':
        return 'text-red-500';
      case 'out-for-delivery':
        return 'text-blue-500';
      case 'delivered':
        return 'text-gray-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <CheckCircle2 className="h-5 w-5" />;
      case 'on-hold':
        return <AlertTriangle className="h-5 w-5" />;
      case 'out-for-delivery':
        return <Clock className="h-5 w-5" />;
      case 'delivered':
        return <CheckCircle2 className="h-5 w-5" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  const getLFDWarning = (days: number) => {
    if (days <= 1) {
      return { color: 'text-red-600 dark:text-red-400', message: 'URGENT: Last Free Day approaching!', icon: <AlertTriangle className="h-5 w-5" /> };
    } else if (days <= 3) {
      return { color: 'text-orange-600 dark:text-orange-400', message: 'WARNING: Last Free Day in ' + days + ' days', icon: <AlertTriangle className="h-5 w-5" /> };
    }
    return { color: 'text-green-600 dark:text-green-400', message: days + ' days until Last Free Day', icon: <CheckCircle2 className="h-5 w-5" /> };
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="rounded-2xl border bg-card card-depth overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 p-6 border-b">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Container LFD Tracker</h3>
              <p className="text-sm text-muted-foreground">
                Track container status and Last Free Day (LFD) to avoid demurrage charges
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Container Number Input */}
          <div className="space-y-3">
            <label htmlFor="containerNumber" className="text-sm font-medium flex items-center gap-2">
              <Search className="h-4 w-4 text-primary" />
              Container Number
            </label>
            <input
              id="containerNumber"
              type="text"
              placeholder="Enter container number (e.g., ABCD1234567)"
              value={containerNumber}
              onChange={(e) => setContainerNumber(e.target.value.toUpperCase())}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background input-depth focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              maxLength={11}
            />
          </div>

          {/* Port Selection */}
          <div className="space-y-3">
            <label htmlFor="port" className="text-sm font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Port of Delivery/Arrival
            </label>
            <select
              id="port"
              value={selectedPort}
              onChange={(e) => setSelectedPort(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background input-depth focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="">Select a port...</option>
              {ports.map((port) => (
                <option key={port.id} value={port.id}>
                  {port.name}
                </option>
              ))}
            </select>
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20 p-4 text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Search Button */}
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="w-full inline-flex items-center justify-center rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 button-depth h-12 px-8"
          >
            {isSearching ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2"></div>
                Searching...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Track Container
              </>
            )}
          </button>

          {/* Container Status Results */}
          {containerStatus && (
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-6 space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <div className="text-sm text-muted-foreground">Container Number</div>
                  <div className="text-2xl font-bold">{containerStatus.containerNumber}</div>
                </div>
                <div className={`flex items-center gap-2 ${getStatusColor(containerStatus.status)}`}>
                  {getStatusIcon(containerStatus.status)}
                  <span className="font-semibold capitalize">
                    {containerStatus.status.replace('-', ' ')}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    Port Location
                  </div>
                  <div className="font-medium">{containerStatus.port}</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    Current Location
                  </div>
                  <div className="font-medium">{containerStatus.location}</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Arrival Date
                  </div>
                  <div className="font-medium">{new Date(containerStatus.arrivalDate).toLocaleDateString()}</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Last Free Day (LFD)
                  </div>
                  <div className="font-medium">{new Date(containerStatus.lfd).toLocaleDateString()}</div>
                </div>
              </div>

              {/* LFD Warning */}
              <div className={`rounded-lg border p-4 flex items-center gap-3 ${
                containerStatus.daysUntilLFD <= 1
                  ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20'
                  : containerStatus.daysUntilLFD <= 3
                  ? 'border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20'
                  : 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20'
              }`}>
                <div className={getLFDWarning(containerStatus.daysUntilLFD).color}>
                  {getLFDWarning(containerStatus.daysUntilLFD).icon}
                </div>
                <div>
                  <div className={`font-semibold ${getLFDWarning(containerStatus.daysUntilLFD).color}`}>
                    {getLFDWarning(containerStatus.daysUntilLFD).message}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Schedule pickup to avoid demurrage and detention charges
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                <button className="flex-1 inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 text-sm font-medium button-depth">
                  Schedule Pickup
                </button>
                <button className="flex-1 inline-flex items-center justify-center rounded-lg border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors h-10 px-4 text-sm font-medium">
                  Request Drayage Quote
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-6 p-4 rounded-lg bg-muted/50 border text-sm text-muted-foreground">
        <p className="font-semibold text-foreground mb-2">About Last Free Day (LFD):</p>
        <p>
          The Last Free Day is the final day you can retrieve your container from the terminal without 
          incurring demurrage charges. After the LFD, daily storage fees begin to accrue. Use this tracker 
          to monitor your containers and schedule timely pickups to minimize costs.
        </p>
      </div>
    </div>
  );
}
