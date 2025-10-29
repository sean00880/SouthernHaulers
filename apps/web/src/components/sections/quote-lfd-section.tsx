
'use client';

import { useState } from 'react';
import { Calculator, MapPin, Package, Search, Loader2, ArrowRight, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { PORTS } from '@/data/ports';

// South Georgia Hubs and Dropyards
const HUBS_DROPYARDS = [
  { value: 'valdosta', label: 'Valdosta Hub', miles: 0 },
  { value: 'tifton', label: 'Tifton Dropyard', miles: 35 },
  { value: 'albany', label: 'Albany Dropyard', miles: 65 },
  { value: 'douglas', label: 'Douglas Dropyard', miles: 45 },
  { value: 'waycross', label: 'Waycross Dropyard', miles: 55 },
];

// Container types
const CONTAINER_TYPES = [
  { value: '20ft-standard', label: '20ft Standard Container' },
  { value: '40ft-standard', label: '40ft Standard Container' },
  { value: '40ft-high-cube', label: '40ft High Cube Container' },
];

// Container options
const CONTAINER_OPTIONS = [
  { value: 'dry', label: 'Dry Container' },
  { value: 'refrigerated', label: 'Refrigerated Container (Reefer)' },
];

export function QuoteLFDSection() {
  // Quote form state
  const [quoteData, setQuoteData] = useState({
    hubDropyard: '',
    port: '',
    containerType: '',
    containerOption: '',
  });
  const [isCalculating, setIsCalculating] = useState(false);
  const [quote, setQuote] = useState<number | null>(null);

  // LFD Tracker state
  const [containerNumber, setContainerNumber] = useState('');
  const [lfdPort, setLfdPort] = useState('');
  const [isTracking, setIsTracking] = useState(false);

  const handleCalculateQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    setQuote(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Calculate quote based on distance
    const hub = HUBS_DROPYARDS.find(h => h.value === quoteData.hubDropyard);
    const port = PORTS.find(p => p.id === quoteData.port);
    
    if (hub && port && port.distanceFromHub) {
      const totalDistance = hub.miles + port.distanceFromHub.miles;
      const baseRate = 2.25; // $2.25 per mile
      const roundTripMultiplier = 2;
      const calculatedQuote = totalDistance * baseRate * roundTripMultiplier;
      
      // Add premium for refrigerated
      const finalQuote = quoteData.containerOption === 'refrigerated' 
        ? calculatedQuote * 1.25 
        : calculatedQuote;
      
      setQuote(Math.round(finalQuote));
    }
    
    setIsCalculating(false);
  };

  const handleTrackContainer = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTracking(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    window.location.href = `/track?container=${containerNumber}&port=${lfdPort}`;
  };

  const isQuoteFormValid = quoteData.hubDropyard && quoteData.port && 
                           quoteData.containerType && quoteData.containerOption;
  const isLfdFormValid = containerNumber && lfdPort;

  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="container w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-background mb-6">
            <Calculator className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Instant Pricing & Tracking</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
            Get Your Quote & Track Containers
          </h2>
          <p className="text-xl text-muted-foreground">
            Calculate pricing instantly or track your container's Last Free Day
          </p>
        </div>

        {/* Tabs for Quote Calculator and LFD Tracker */}
        <Tabs defaultValue="quote" className="w-full max-w-5xl mx-auto">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="quote">Get Quote</TabsTrigger>
            <TabsTrigger value="lfd">Track LFD</TabsTrigger>
          </TabsList>

          {/* Quote Calculator Tab */}
          <TabsContent value="quote">
            <div className="bg-card border rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8 md:p-10">
                <form onSubmit={handleCalculateQuote} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Hub/Dropyard Selection */}
                    <div className="space-y-2">
                      <Label htmlFor="hub-dropyard" className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        South Georgia Hub/Dropyard
                      </Label>
                      <Select 
                        value={quoteData.hubDropyard}
                        onValueChange={(value) => setQuoteData({...quoteData, hubDropyard: value})}
                      >
                        <SelectTrigger id="hub-dropyard" className="h-12">
                          <SelectValue placeholder="Select your hub or dropyard" />
                        </SelectTrigger>
                        <SelectContent>
                          {HUBS_DROPYARDS.map((hub) => (
                            <SelectItem key={hub.value} value={hub.value}>
                              {hub.label} {hub.miles > 0 && `(${hub.miles} mi from hub)`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Port Selection */}
                    <div className="space-y-2">
                      <Label htmlFor="port" className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-secondary" />
                        Port/Terminal
                      </Label>
                      <Select 
                        value={quoteData.port}
                        onValueChange={(value) => setQuoteData({...quoteData, port: value})}
                      >
                        <SelectTrigger id="port" className="h-12">
                          <SelectValue placeholder="Select destination port" />
                        </SelectTrigger>
                        <SelectContent>
                          {PORTS.map((port) => (
                            <SelectItem key={port.id} value={port.id}>
                              {port.displayName} ({port.distanceFromHub?.miles} mi)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Container Type */}
                    <div className="space-y-2">
                      <Label htmlFor="container-type" className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-primary" />
                        Container Type
                      </Label>
                      <Select 
                        value={quoteData.containerType}
                        onValueChange={(value) => setQuoteData({...quoteData, containerType: value})}
                      >
                        <SelectTrigger id="container-type" className="h-12">
                          <SelectValue placeholder="Select container size" />
                        </SelectTrigger>
                        <SelectContent>
                          {CONTAINER_TYPES.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Container Option */}
                    <div className="space-y-2">
                      <Label htmlFor="container-option" className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-secondary" />
                        Container Option
                      </Label>
                      <Select 
                        value={quoteData.containerOption}
                        onValueChange={(value) => setQuoteData({...quoteData, containerOption: value})}
                      >
                        <SelectTrigger id="container-option" className="h-12">
                          <SelectValue placeholder="Select container option" />
                        </SelectTrigger>
                        <SelectContent>
                          {CONTAINER_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Calculate Button */}
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full h-14 text-base bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                    disabled={!isQuoteFormValid || isCalculating}
                  >
                    {isCalculating ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Calculating...
                      </>
                    ) : (
                      <>
                        <Calculator className="mr-2 h-5 w-5" />
                        Calculate Quote
                      </>
                    )}
                  </Button>
                </form>

                {/* Quote Result */}
                {quote !== null && (
                  <div className="mt-8 p-6 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border border-primary/20 rounded-xl animate-fade-in-up">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Estimated Round-Trip Quote</div>
                        <div className="text-4xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                          ${quote.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Based on $2.25/mile × 2 (round trip) {quoteData.containerOption === 'refrigerated' && '+ 25% reefer premium'}
                        </div>
                      </div>
                      <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                        <TrendingUp className="h-8 w-8 text-primary" />
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4">
                      This is an estimated quote. Final pricing may vary based on specific requirements and current conditions.
                    </p>

                    <Button asChild className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                      <a href={`/quote?hub=${quoteData.hubDropyard}&port=${quoteData.port}&container=${quoteData.containerType}`}>
                        Get Official Quote
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                )}
              </div>

              {/* Additional Info */}
              <div className="bg-muted/50 px-8 py-6 border-t">
                <div className="grid md:grid-cols-3 gap-6 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Transparent Pricing</div>
                      <div className="text-muted-foreground">$2.25/mile standard rate</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 h-5 w-5 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <div className="h-2 w-2 rounded-full bg-secondary" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Round-Trip Included</div>
                      <div className="text-muted-foreground">All quotes include return trip</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Same-Day Response</div>
                      <div className="text-muted-foreground">Get quotes within 2-4 hours</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Container LFD Tracker Tab */}
          <TabsContent value="lfd">
            <div className="bg-card border rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8 md:p-10">
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold mb-2">Track Container Last Free Day</h3>
                  <p className="text-muted-foreground">
                    Enter your container number and port to check the Last Free Day (LFD) status
                  </p>
                </div>

                <form onSubmit={handleTrackContainer} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Container Number */}
                    <div className="space-y-2">
                      <Label htmlFor="container-number" className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-primary" />
                        Container Number
                      </Label>
                      <Input
                        id="container-number"
                        type="text"
                        placeholder="e.g., MSCU1234567"
                        value={containerNumber}
                        onChange={(e) => setContainerNumber(e.target.value.toUpperCase())}
                        className="h-12 text-base"
                        maxLength={11}
                      />
                      <p className="text-xs text-muted-foreground">
                        Enter 11-character container number (4 letters + 7 digits)
                      </p>
                    </div>

                    {/* Port of Delivery/Arrival */}
                    <div className="space-y-2">
                      <Label htmlFor="lfd-port" className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-secondary" />
                        Port of Delivery/Arrival
                      </Label>
                      <Select 
                        value={lfdPort}
                        onValueChange={setLfdPort}
                      >
                        <SelectTrigger id="lfd-port" className="h-12">
                          <SelectValue placeholder="Select port" />
                        </SelectTrigger>
                        <SelectContent>
                          {PORTS.map((port) => (
                            <SelectItem key={port.id} value={port.id}>
                              {port.displayName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Track Button */}
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full h-14 text-base bg-gradient-to-r from-secondary to-primary hover:opacity-90"
                    disabled={!isLfdFormValid || isTracking}
                  >
                    {isTracking ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Tracking...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-5 w-5" />
                        Track Container
                      </>
                    )}
                  </Button>
                </form>

                {/* Info Section */}
                <div className="mt-8 p-6 bg-muted/50 rounded-xl border">
                  <h4 className="font-semibold mb-3">What is Last Free Day (LFD)?</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    The Last Free Day is the final day you can pick up your container from the port without 
                    incurring per diem or demurrage charges. Tracking LFD helps you avoid costly fees.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="font-semibold text-primary mb-1">Real-Time Updates</div>
                      <div className="text-muted-foreground">Track status changes instantly</div>
                    </div>
                    <div>
                      <div className="font-semibold text-secondary mb-1">SMS Alerts</div>
                      <div className="text-muted-foreground">Get notified of critical dates</div>
                    </div>
                    <div>
                      <div className="font-semibold text-[hsl(4,90%,58%)] mb-1">Avoid Fees</div>
                      <div className="text-muted-foreground">Stay ahead of demurrage</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Need help or have special requirements?{' '}
            <a href="/contact" className="text-primary hover:underline font-semibold">
              Contact our 24/7 dispatch team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
