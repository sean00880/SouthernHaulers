'use client';

import { useState, useEffect } from 'react';
import { Calculator, MapPin, Package, ArrowRight, CheckCircle2, Thermometer, Truck } from 'lucide-react';

interface QuoteEstimate {
  distance: number;
  ratePerMile: number;
  roundTripMultiplier: number;
  total: number;
  estimatedTime: string;
}

const southGeorgiaHubs = [
  { id: 'albany', name: 'Albany, GA' },
  { id: 'valdosta', name: 'Valdosta, GA' },
  { id: 'tifton', name: 'Tifton, GA' },
  { id: 'moultrie', name: 'Moultrie, GA' },
  { id: 'thomasville', name: 'Thomasville, GA' },
  { id: 'bainbridge', name: 'Bainbridge, GA' },
];

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

const containerTypes = [
  { id: '20ft-standard', name: '20ft Standard' },
  { id: '40ft-standard', name: '40ft Standard' },
  { id: '40ft-hc', name: '40ft High Cube' }
];

const containerConditions = [
  { id: 'dry', name: 'Dry Container', icon: Package },
  { id: 'refrigerated', name: 'Refrigerated Container', icon: Thermometer }
];

export function QuoteCalculator() {
  const [selectedHub, setSelectedHub] = useState('');
  const [selectedPort, setSelectedPort] = useState('');
  const [selectedContainer, setSelectedContainer] = useState(containerTypes[0].id);
  const [selectedCondition, setSelectedCondition] = useState(containerConditions[0].id);
  const [distance, setDistance] = useState('');
  const [estimate, setEstimate] = useState<QuoteEstimate | null>(null);

  // Real-time calculation as user types
  useEffect(() => {
    if (distance && parseFloat(distance) > 0) {
      calculateQuote();
    } else {
      setEstimate(null);
    }
  }, [distance, selectedContainer, selectedCondition]);

  const calculateQuote = () => {
    const distanceNum = parseFloat(distance);
    if (isNaN(distanceNum) || distanceNum <= 0) {
      setEstimate(null);
      return;
    }

    const ratePerMile = 2.25;
    const roundTripMultiplier = 2;
    const total = ratePerMile * distanceNum * roundTripMultiplier;

    const estimatedHours = Math.ceil((distanceNum * 2) / 45); // Account for round trip
    const estimatedTime = estimatedHours < 24
      ? `${estimatedHours} hours`
      : `${Math.ceil(estimatedHours / 24)} days`;

    setEstimate({
      distance: distanceNum,
      ratePerMile,
      roundTripMultiplier,
      total: Math.round(total * 100) / 100,
      estimatedTime
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="rounded-2xl border bg-card card-depth overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 p-6 border-b">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Calculator className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Drayage Quote Calculator</h3>
              <p className="text-sm text-muted-foreground">
                Real-time pricing: $2.25/mile × 2 (round-trip)
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* South Georgia Hub Selection */}
          <div className="space-y-3">
            <label htmlFor="hub" className="text-sm font-medium flex items-center gap-2">
              <Truck className="h-4 w-4 text-primary" />
              South Georgia Hub & Dropyard
            </label>
            <select
              id="hub"
              value={selectedHub}
              onChange={(e) => setSelectedHub(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background input-depth focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="">Select a hub...</option>
              {southGeorgiaHubs.map((hub) => (
                <option key={hub.id} value={hub.id}>
                  {hub.name}
                </option>
              ))}
            </select>
          </div>

          {/* Port Selection */}
          <div className="space-y-3">
            <label htmlFor="port" className="text-sm font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Port / Terminal
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

          {/* Container Type */}
          <div className="space-y-3">
            <label className="text-sm font-medium flex items-center gap-2">
              <Package className="h-4 w-4 text-primary" />
              Container Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              {containerTypes.map((container) => (
                <button
                  key={container.id}
                  onClick={() => setSelectedContainer(container.id)}
                  className={`p-4 rounded-lg border text-center transition-all card-depth ${
                    selectedContainer === container.id
                      ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="font-medium text-sm">{container.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Container Condition */}
          <div className="space-y-3">
            <label className="text-sm font-medium flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-primary" />
              Container Condition
            </label>
            <div className="grid grid-cols-2 gap-3">
              {containerConditions.map((condition) => {
                const Icon = condition.icon;
                return (
                  <button
                    key={condition.id}
                    onClick={() => setSelectedCondition(condition.id)}
                    className={`p-4 rounded-lg border text-left transition-all card-depth ${
                      selectedCondition === condition.id
                        ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <Icon className="h-5 w-5 text-primary mb-2" />
                    <div className="font-medium text-sm">{condition.name}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Distance Input */}
          <div className="space-y-3">
            <label htmlFor="distance" className="text-sm font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Distance (miles)
            </label>
            <input
              id="distance"
              type="number"
              placeholder="Enter distance in miles"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background input-depth focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              min="0"
              step="0.1"
            />
            <p className="text-xs text-muted-foreground">
              Enter the one-way distance. The quote will automatically calculate round-trip pricing.
            </p>
          </div>

          {/* Estimate Results - Real-time */}
          {estimate && (
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-6 space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex items-center gap-2 text-primary font-semibold">
                <CheckCircle2 className="h-5 w-5" />
                <span>Estimated Quote (Real-time Calculation)</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">One-way Distance</div>
                  <div className="text-lg font-semibold">{estimate.distance} miles</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Round-trip Distance</div>
                  <div className="text-lg font-semibold">{estimate.distance * 2} miles</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Rate per Mile</div>
                  <div className="text-lg font-semibold">${estimate.ratePerMile}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Estimated Transit</div>
                  <div className="text-lg font-semibold">{estimate.estimatedTime}</div>
                </div>
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    ${estimate.ratePerMile} × {estimate.distance} miles × {estimate.roundTripMultiplier} (round-trip)
                  </span>
                  <span className="font-medium">
                    ${estimate.ratePerMile} × {estimate.distance * estimate.roundTripMultiplier}
                  </span>
                </div>
                <div className="flex justify-between text-2xl font-bold border-t pt-3">
                  <span>Total Estimate</span>
                  <span className="text-primary">${estimate.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="text-xs text-muted-foreground pt-2 border-t">
                * This is a base estimate for drayage services. Final pricing may vary based on accessorial charges, 
                detention, terminal fees, per-diem storage, chassis rental, and other factors. Contact us for a 
                detailed quote with all applicable charges.
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                <button className="flex-1 inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-4 text-sm font-medium button-depth">
                  Request Detailed Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
                <button className="flex-1 inline-flex items-center justify-center rounded-lg border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors h-11 px-4 text-sm font-medium">
                  Save Quote
                </button>
              </div>
            </div>
          )}

          {!estimate && distance && (
            <div className="rounded-lg border border-muted bg-muted/20 p-4 text-sm text-muted-foreground text-center">
              Enter a valid distance to see real-time pricing
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
