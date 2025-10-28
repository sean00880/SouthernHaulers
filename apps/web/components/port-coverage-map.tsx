'use client';

import { useState } from 'react';
import { MapPin, Ship, CheckCircle2 } from 'lucide-react';

interface Port {
  id: string;
  name: string;
  city: string;
  state: string;
  teus: string;
  terminals: string[];
  coordinates: { x: number; y: number };
}

const ports: Port[] = [
  {
    id: 'savannah',
    name: 'Port of Savannah',
    city: 'Savannah',
    state: 'Georgia',
    teus: '5.9M TEUs/year',
    terminals: ['Garden City Terminal', 'Ocean Terminal'],
    coordinates: { x: 60, y: 45 }
  },
  {
    id: 'charleston',
    name: 'Charleston Harbor',
    city: 'Charleston',
    state: 'South Carolina',
    teus: '2.9M TEUs/year',
    terminals: ['Wando Welch Terminal', 'Columbus Street Terminal'],
    coordinates: { x: 65, y: 35 }
  },
  {
    id: 'jacksonville',
    name: 'JAXPORT',
    city: 'Jacksonville',
    state: 'Florida',
    teus: '1.5M TEUs/year',
    terminals: ['Blount Island Terminal', 'Dames Point Terminal'],
    coordinates: { x: 55, y: 60 }
  }
];

export function PortCoverageMap() {
  const [selectedPort, setSelectedPort] = useState<Port | null>(null);
  const [hoveredPort, setHoveredPort] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Map */}
        <div className="relative aspect-[4/3] bg-gradient-to-br from-blue-950/20 to-blue-900/10 rounded-2xl border border-primary/20 p-8">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Southeast US outline (simplified) */}
            <path
              d="M20,20 L80,20 L80,80 L60,85 L40,83 L20,75 Z"
              fill="hsl(var(--card))"
              stroke="hsl(var(--border))"
              strokeWidth="0.5"
              opacity="0.3"
            />

            {/* Connection lines */}
            {ports.map((port, idx) => (
              <g key={`lines-${port.id}`}>
                {ports.slice(idx + 1).map((targetPort) => (
                  <line
                    key={`${port.id}-${targetPort.id}`}
                    x1={port.coordinates.x}
                    y1={port.coordinates.y}
                    x2={targetPort.coordinates.x}
                    y2={targetPort.coordinates.y}
                    stroke="hsl(var(--primary))"
                    strokeWidth="0.3"
                    strokeDasharray="2,2"
                    opacity="0.3"
                  />
                ))}
              </g>
            ))}

            {/* Port markers */}
            {ports.map((port) => {
              const isSelected = selectedPort?.id === port.id;
              const isHovered = hoveredPort === port.id;

              return (
                <g
                  key={port.id}
                  className="cursor-pointer transition-all"
                  onClick={() => setSelectedPort(port)}
                  onMouseEnter={() => setHoveredPort(port.id)}
                  onMouseLeave={() => setHoveredPort(null)}
                >
                  {/* Pulse animation ring */}
                  {(isSelected || isHovered) && (
                    <circle
                      cx={port.coordinates.x}
                      cy={port.coordinates.y}
                      r="8"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="0.5"
                      opacity="0.5"
                      className="animate-ping"
                    />
                  )}

                  {/* Port dot */}
                  <circle
                    cx={port.coordinates.x}
                    cy={port.coordinates.y}
                    r={isSelected || isHovered ? "3" : "2.5"}
                    fill="hsl(var(--primary))"
                    className="transition-all"
                  />

                  {/* Port label */}
                  <text
                    x={port.coordinates.x}
                    y={port.coordinates.y - 5}
                    textAnchor="middle"
                    className="text-[3px] fill-current"
                    opacity={isSelected || isHovered ? "1" : "0.7"}
                  >
                    {port.city}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-card/80 backdrop-blur-sm border border-border rounded-lg p-3 text-xs">
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span>Direct Service Ports</span>
            </div>
          </div>
        </div>

        {/* Port Details */}
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">Southeast Port Coverage</h3>
            <p className="text-muted-foreground">
              Direct drayage service to the three busiest container ports in the Southeast
            </p>
          </div>

          <div className="space-y-3">
            {ports.map((port) => (
              <button
                key={port.id}
                onClick={() => setSelectedPort(port)}
                onMouseEnter={() => setHoveredPort(port.id)}
                onMouseLeave={() => setHoveredPort(null)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  selectedPort?.id === port.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50 hover:bg-accent'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Ship className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{port.name}</h4>
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {port.city}, {port.state}
                    </p>
                    <p className="text-xs text-primary mt-1">{port.teus}</p>
                  </div>
                </div>

                {selectedPort?.id === port.id && (
                  <div className="mt-3 pt-3 border-t space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Terminals:</p>
                    {port.terminals.map((terminal) => (
                      <p key={terminal} className="text-xs text-muted-foreground pl-2">
                        • {terminal}
                      </p>
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium mb-1">South Georgia Hub</p>
                <p className="text-muted-foreground">
                  Strategic location enables 2-4 hour turnaround to all three ports
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
