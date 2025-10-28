'use client';

import { useState } from 'react';
import { Calculator, MapPin, Package, ArrowRight, CheckCircle2 } from 'lucide-react';

interface QuoteEstimate {
  baseRate: number;
  distance: number;
  estimatedTime: string;
  fuelSurcharge: number;
  total: number;
}

const ports = [
  { id: 'savannah', name: 'Port of Savannah, GA', baseDistance: 120 },
  { id: 'charleston', name: 'Charleston Harbor, SC', baseDistance: 180 },
  { id: 'jaxport', name: 'JAXPORT, FL', baseDistance: 150 }
];

const containerTypes = [
  { id: '20ft', name: '20ft Standard', baseRate: 350 },
  { id: '40ft', name: '40ft Standard', baseRate: 450 },
  { id: '40ft-hc', name: '40ft High Cube', baseRate: 475 },
  { id: 'reefer', name: 'Refrigerated', baseRate: 650 }
];

export function QuoteCalculator() {
  const [selectedPort, setSelectedPort] = useState(ports[0].id);
  const [selectedContainer, setSelectedContainer] = useState(containerTypes[0].id);
  const [zipCode, setZipCode] = useState('');
  const [estimate, setEstimate] = useState<QuoteEstimate | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateQuote = () => {
    setIsCalculating(true);

    // Simulate calculation delay
    setTimeout(() => {
      const port = ports.find(p => p.id === selectedPort)!;
      const container = containerTypes.find(c => c.id === selectedContainer)!;

      // Simple distance calculation (in real app, use actual geocoding)
      const distance = port.baseDistance + Math.random() * 50;
      const baseRate = container.baseRate;
      const distanceCharge = Math.round((distance / 100) * 75);
      const fuelSurcharge = Math.round((baseRate + distanceCharge) * 0.15);
      const total = baseRate + distanceCharge + fuelSurcharge;

      const estimatedHours = Math.ceil(distance / 45);
      const estimatedTime = estimatedHours < 24
        ? `${estimatedHours} hours`
        : `${Math.ceil(estimatedHours / 24)} days`;

      setEstimate({
        baseRate: baseRate + distanceCharge,
        distance: Math.round(distance),
        estimatedTime,
        fuelSurcharge,
        total
      });

      setIsCalculating(false);
    }, 800);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="rounded-2xl border bg-card overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 p-6 border-b">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Calculator className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Instant Quote Calculator</h3>
              <p className="text-sm text-muted-foreground">Get estimated pricing in seconds</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Port Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Select Port
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {ports.map((port) => (
                <button
                  key={port.id}
                  onClick={() => setSelectedPort(port.id)}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    selectedPort === port.id
                      ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="font-medium text-sm">{port.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    ~{port.baseDistance} miles
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Container Type */}
          <div className="space-y-3">
            <label className="text-sm font-medium flex items-center gap-2">
              <Package className="h-4 w-4 text-primary" />
              Container Type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {containerTypes.map((container) => (
                <button
                  key={container.id}
                  onClick={() => setSelectedContainer(container.id)}
                  className={`p-4 rounded-lg border text-center transition-all ${
                    selectedContainer === container.id
                      ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="font-medium text-sm">{container.name}</div>
                  <div className="text-xs text-primary mt-1">
                    Base: ${container.baseRate}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Delivery ZIP */}
          <div className="space-y-3">
            <label htmlFor="zipCode" className="text-sm font-medium">
              Delivery ZIP Code
            </label>
            <input
              id="zipCode"
              type="text"
              placeholder="Enter delivery ZIP code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
              className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              maxLength={5}
            />
          </div>

          {/* Calculate Button */}
          <button
            onClick={calculateQuote}
            disabled={zipCode.length !== 5 || isCalculating}
            className="w-full inline-flex items-center justify-center rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8"
          >
            {isCalculating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2"></div>
                Calculating...
              </>
            ) : (
              <>
                Calculate Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </button>

          {/* Estimate Results */}
          {estimate && (
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-6 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-2 text-primary font-semibold">
                <CheckCircle2 className="h-5 w-5" />
                <span>Estimated Quote</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Distance</div>
                  <div className="text-lg font-semibold">{estimate.distance} miles</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Transit Time</div>
                  <div className="text-lg font-semibold">{estimate.estimatedTime}</div>
                </div>
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Base Rate + Distance</span>
                  <span className="font-medium">${estimate.baseRate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Fuel Surcharge (15%)</span>
                  <span className="font-medium">${estimate.fuelSurcharge}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Estimated Total</span>
                  <span className="text-primary">${estimate.total}</span>
                </div>
              </div>

              <div className="text-xs text-muted-foreground pt-2 border-t">
                * This is an estimate only. Final pricing may vary based on accessorial charges, detention, TMF, per-diem, and other factors. Request a detailed quote for accurate pricing.
              </div>

              <button className="w-full inline-flex items-center justify-center rounded-lg border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors h-10 px-4 text-sm font-medium">
                Request Detailed Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
