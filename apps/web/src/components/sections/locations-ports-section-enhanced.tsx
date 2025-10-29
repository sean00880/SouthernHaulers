
'use client';

import { useState } from 'react';
import { MapPin, Ship, Train, Building2, Phone, Mail, ArrowRight, Filter } from 'lucide-react';
import { Port } from '@/data/ports';
import { Location } from '@/data/locations';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface LocationsPortsSectionEnhancedProps {
  ports: Port[];
  locations: Location[];
}

export function LocationsPortsSectionEnhanced({ ports, locations }: LocationsPortsSectionEnhancedProps) {
  const [selectedState, setSelectedState] = useState<string>('all');
  
  // Separate ocean ports and rail terminals
  const oceanPorts = ports.filter(p => ['savannah', 'charleston', 'jacksonville', 'mobile-port'].includes(p.id));
  const railTerminals = ports.filter(p => !['savannah', 'charleston', 'jacksonville', 'mobile-port'].includes(p.id));
  
  const states = ['all', 'GA', 'SC', 'FL', 'AL', 'TN'];
  
  const filteredLocations = selectedState === 'all' 
    ? locations.filter(loc => loc.type === 'city').slice(0, 6)
    : locations.filter(loc => loc.stateCode === selectedState && loc.type === 'city');

  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="container w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-background mb-6">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Service Coverage</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
            Southeast Port & Location Coverage
          </h2>
          <p className="text-xl text-muted-foreground">
            Strategic hub location providing 2-4 hour access to major Southeast ports and cities.
          </p>
        </div>

        {/* Tabs for Ports and Locations */}
        <Tabs defaultValue="ports" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12">
            <TabsTrigger value="ports">Ocean Ports</TabsTrigger>
            <TabsTrigger value="rail">Rail Terminals</TabsTrigger>
            <TabsTrigger value="locations">Service Areas</TabsTrigger>
          </TabsList>

          {/* Ocean Ports Tab */}
          <TabsContent value="ports" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {oceanPorts.map((port, index) => (
                <div
                  key={port.id}
                  className="group relative bg-card border rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Rank Badge - Only for ranked ports */}
                  {port.rank > 0 && (
                    <div className="absolute -top-3 -right-3 h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold shadow-lg">
                      #{port.rank}
                    </div>
                  )}

                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-4">
                    <Ship className="h-7 w-7" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-2">{port.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {port.city}, {port.stateCode}
                  </p>

                  {/* Stats */}
                  <div className="space-y-2 mb-6">
                    {port.annualTeuHandling > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Annual TEUs:</span>
                        <span className="font-semibold">{(port.annualTeuHandling / 1000000).toFixed(1)}M+</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Distance:</span>
                      <span className="font-semibold">{port.distanceFromHub?.miles} miles</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Avg Wait:</span>
                      <span className="font-semibold">{port.averageWaitTime}</span>
                    </div>
                  </div>

                  {/* Terminals Count */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 pb-4 border-b">
                    <Building2 className="h-4 w-4" />
                    <span>{port.terminals.length} terminals served</span>
                  </div>

                  {/* CTA */}
                  <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
                    <a href={`/ports/${port.id}`} className="flex items-center justify-center">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              ))}
            </div>

            {/* Port Features */}
            <div className="grid md:grid-cols-4 gap-6 mt-12 p-8 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 rounded-2xl border border-primary/20">
              <div className="text-center">
                <div className="text-3xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">10M+</div>
                <div className="text-sm text-muted-foreground">Combined TEU Capacity</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">10+</div>
                <div className="text-sm text-muted-foreground">Terminals Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">2-4hr</div>
                <div className="text-sm text-muted-foreground">Turnaround Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Port Operations</div>
              </div>
            </div>
          </TabsContent>

          {/* Rail Terminals Tab */}
          <TabsContent value="rail" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {railTerminals.map((terminal) => (
                <div
                  key={terminal.id}
                  className="group relative bg-card border rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-secondary/10 text-secondary mb-4">
                    <Train className="h-7 w-7" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-2">{terminal.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {terminal.city}, {terminal.stateCode}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {terminal.description}
                  </p>

                  {/* Stats */}
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Distance:</span>
                      <span className="font-semibold">{terminal.distanceFromHub?.miles} miles</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Avg Wait:</span>
                      <span className="font-semibold">{terminal.averageWaitTime}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Hours:</span>
                      <span className="font-semibold text-xs">{terminal.operationalHours}</span>
                    </div>
                  </div>

                  {/* Terminals Count */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 pb-4 border-b">
                    <Building2 className="h-4 w-4" />
                    <span>{terminal.terminals.length} facility</span>
                  </div>

                  {/* CTA */}
                  <Button asChild variant="outline" className="w-full group-hover:bg-secondary group-hover:text-secondary-foreground group-hover:border-secondary transition-colors">
                    <a href={`/ports/${terminal.id}`} className="flex items-center justify-center">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              ))}
            </div>

            {/* Rail Terminal Features */}
            <div className="grid md:grid-cols-4 gap-6 mt-12 p-8 bg-gradient-to-r from-secondary/5 via-primary/5 to-secondary/5 rounded-2xl border border-secondary/20">
              <div className="text-center">
                <div className="text-3xl font-semibold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent mb-2">5</div>
                <div className="text-sm text-muted-foreground">Rail Terminals</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-semibold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent mb-2">4</div>
                <div className="text-sm text-muted-foreground">States Covered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-semibold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Intermodal Access</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-semibold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent mb-2">15min</div>
                <div className="text-sm text-muted-foreground">Avg Wait Time</div>
              </div>
            </div>
          </TabsContent>

          {/* Locations Tab */}
          <TabsContent value="locations" className="space-y-8">
            {/* State Filter */}
            <div className="flex justify-center gap-3 mb-8 flex-wrap">
              {states.map((state) => (
                <Button
                  key={state}
                  variant={selectedState === state ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedState(state)}
                >
                  {state === 'all' ? 'All States' : state}
                </Button>
              ))}
            </div>

            {/* Locations Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLocations.map((location) => (
                <div
                  key={location.id}
                  className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  {/* Location Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{location.city}</h3>
                      <p className="text-sm text-muted-foreground">{location.state}</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                  </div>

                  {/* Stats */}
                  {location.population && (
                    <div className="text-sm text-muted-foreground mb-3">
                      Metro population: {(location.population / 1000).toFixed(0)}K+
                    </div>
                  )}

                  {location.distanceFromHub && (
                    <div className="flex items-center gap-4 text-sm mb-4 pb-4 border-b">
                      <div>
                        <span className="text-muted-foreground">Distance: </span>
                        <span className="font-semibold">{location.distanceFromHub.miles} mi</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Time: </span>
                        <span className="font-semibold">{location.distanceFromHub.hours}h</span>
                      </div>
                    </div>
                  )}

                  {/* Services Count */}
                  <div className="text-sm text-muted-foreground mb-4">
                    {location.servicesAvailable.length} services available
                  </div>

                  {/* CTA */}
                  <Button asChild variant="ghost" size="sm" className="w-full">
                    <a href={`/locations/${location.id}`}>
                      View Location Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-8">
              <Button asChild size="lg" variant="outline">
                <a href="/locations">
                  View All Locations
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
