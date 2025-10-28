'use client';

import { useState, useEffect } from 'react';
import { Truck, MapPin, Clock, CheckCircle2, Package, Navigation } from 'lucide-react';

interface TrackingStatus {
  timestamp: string;
  status: string;
  location: string;
  description: string;
}

const demoStatuses: TrackingStatus[] = [
  {
    timestamp: '10:15 AM',
    status: 'Delivered',
    location: 'Warehouse - Atlanta, GA',
    description: 'Container successfully delivered and signed for'
  },
  {
    timestamp: '8:45 AM',
    status: 'In Transit',
    location: 'I-75 Near Macon, GA',
    description: 'Driver en route to delivery location'
  },
  {
    timestamp: '6:30 AM',
    status: 'Gate Out',
    location: 'Port of Savannah - Garden City Terminal',
    description: 'Container picked up from terminal'
  },
  {
    timestamp: '5:45 AM',
    status: 'Appointment Confirmed',
    location: 'Port of Savannah',
    description: 'Terminal appointment scheduled via eModal'
  }
];

export function TrackingDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % demoStatuses.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive]);

  const currentStatus = demoStatuses[currentStep];
  const completedSteps = demoStatuses.slice(currentStep + 1);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="rounded-2xl border bg-card overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-950/50 to-primary/20 p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Navigation className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Live Container Tracking</h3>
                <p className="text-sm text-muted-foreground">Real-time GPS updates every 15 minutes</p>
              </div>
            </div>
            <button
              onClick={() => setIsLive(!isLive)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isLive
                  ? 'bg-green-500/20 text-green-500 border border-green-500/50'
                  : 'bg-muted text-muted-foreground border border-border'
              }`}
            >
              {isLive ? '● LIVE DEMO' : 'PAUSED'}
            </button>
          </div>

          {/* Shipment Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-card/50 rounded-lg p-4">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Container #</div>
              <div className="font-mono font-medium">TCLU1234567</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Pickup</div>
              <div className="font-medium text-sm">Savannah, GA</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Delivery</div>
              <div className="font-medium text-sm">Atlanta, GA</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Driver</div>
              <div className="font-medium text-sm">John D.</div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Current Status Card */}
          <div className="rounded-lg border-2 border-primary bg-primary/5 p-6 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                {currentStep === 0 ? (
                  <CheckCircle2 className="h-7 w-7 text-primary" />
                ) : (
                  <Truck className="h-7 w-7 text-primary" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-primary uppercase tracking-wider">
                    Current Status
                  </span>
                  {isLive && (
                    <span className="flex items-center gap-1 text-xs text-green-500">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      Live
                    </span>
                  )}
                </div>
                <h4 className="text-2xl font-bold mb-2">{currentStatus.status}</h4>
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4" />
                  <span>{currentStatus.location}</span>
                </div>
                <p className="text-sm text-muted-foreground">{currentStatus.description}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-3">
                  <Clock className="h-4 w-4" />
                  <span>Updated: Today at {currentStatus.timestamp}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Shipment History</div>
            {completedSteps.map((status, idx) => (
              <div key={idx} className="flex gap-4 opacity-60">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full border-2 border-border bg-muted flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                  </div>
                  {idx < completedSteps.length - 1 && (
                    <div className="w-0.5 h-12 bg-border my-1"></div>
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <div className="font-semibold mb-1">{status.status}</div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <MapPin className="h-3 w-3" />
                    <span>{status.location}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{status.description}</p>
                  <div className="text-xs text-muted-foreground mt-2">
                    Today at {status.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 p-4 rounded-lg bg-muted border border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-primary" />
                <div className="text-sm">
                  <div className="font-medium">Track Your Shipment</div>
                  <div className="text-muted-foreground">Enter your container number or BOL</div>
                </div>
              </div>
              <a
                href="/track"
                className="inline-flex items-center justify-center rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 transition-colors"
              >
                Track Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
