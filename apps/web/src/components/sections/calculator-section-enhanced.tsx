
'use client';

import { useState } from 'react';
import { Calculator, MapPin, Package, Weight, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export function CalculatorSectionEnhanced() {
  const [formData, setFormData] = useState({
    pickupLocation: '',
    deliveryLocation: '',
    containerType: '',
    weight: '',
  });
  const [isCalculating, setIsCalculating] = useState(false);
  const [quote, setQuote] = useState<number | null>(null);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    setQuote(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Calculate mock quote
    const baseRate = formData.containerType === '20ft' ? 350 : 
                     formData.containerType === '40ft' ? 450 : 
                     formData.containerType === '40ft-hc' ? 475 : 650;
    
    const mockQuote = baseRate + Math.floor(Math.random() * 100);
    setQuote(mockQuote);
    setIsCalculating(false);
  };

  const isFormValid = formData.pickupLocation && formData.deliveryLocation && 
                      formData.containerType && formData.weight;

  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-background mb-6">
              <Calculator className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Instant Pricing</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Get Your Quote in Seconds
            </h2>
            <p className="text-xl text-muted-foreground">
              Enter your shipment details for instant pricing. No account required.
            </p>
          </div>

          {/* Calculator Card */}
          <div className="bg-card border rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-10">
              <form onSubmit={handleCalculate} className="space-y-6">
                {/* Pickup Location */}
                <div className="space-y-2">
                  <Label htmlFor="pickup" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    Pickup Location
                  </Label>
                  <Select 
                    value={formData.pickupLocation}
                    onValueChange={(value) => setFormData({...formData, pickupLocation: value})}
                  >
                    <SelectTrigger id="pickup" className="h-12">
                      <SelectValue placeholder="Select pickup port or location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="savannah">Port of Savannah, GA</SelectItem>
                      <SelectItem value="charleston">Charleston Harbor, SC</SelectItem>
                      <SelectItem value="jacksonville">JAXPORT, FL</SelectItem>
                      <SelectItem value="atlanta">Atlanta, GA</SelectItem>
                      <SelectItem value="macon">Macon, GA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Delivery Location */}
                <div className="space-y-2">
                  <Label htmlFor="delivery" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    Delivery Location
                  </Label>
                  <Input
                    id="delivery"
                    type="text"
                    placeholder="Enter delivery city or ZIP code"
                    value={formData.deliveryLocation}
                    onChange={(e) => setFormData({...formData, deliveryLocation: e.target.value})}
                    className="h-12"
                  />
                </div>

                {/* Container Type */}
                <div className="space-y-2">
                  <Label htmlFor="container" className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-primary" />
                    Container Type
                  </Label>
                  <Select 
                    value={formData.containerType}
                    onValueChange={(value) => setFormData({...formData, containerType: value})}
                  >
                    <SelectTrigger id="container" className="h-12">
                      <SelectValue placeholder="Select container size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="20ft">20ft Standard Container</SelectItem>
                      <SelectItem value="40ft">40ft Standard Container</SelectItem>
                      <SelectItem value="40ft-hc">40ft High Cube Container</SelectItem>
                      <SelectItem value="reefer">Refrigerated Container (Reefer)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Weight */}
                <div className="space-y-2">
                  <Label htmlFor="weight" className="flex items-center gap-2">
                    <Weight className="h-4 w-4 text-primary" />
                    Approximate Weight
                  </Label>
                  <Select 
                    value={formData.weight}
                    onValueChange={(value) => setFormData({...formData, weight: value})}
                  >
                    <SelectTrigger id="weight" className="h-12">
                      <SelectValue placeholder="Select weight range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Under 20,000 lbs</SelectItem>
                      <SelectItem value="medium">20,000 - 35,000 lbs</SelectItem>
                      <SelectItem value="heavy">35,000 - 44,000 lbs</SelectItem>
                      <SelectItem value="overweight">Over 44,000 lbs (Overweight)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Calculate Button */}
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full h-14 text-base"
                  disabled={!isFormValid || isCalculating}
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
                <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-xl animate-fade-in-up">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Estimated Quote</div>
                      <div className="text-4xl font-bold text-primary">${quote}</div>
                    </div>
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Calculator className="h-8 w-8 text-primary" />
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    This is an estimated quote. Final pricing may vary based on specific requirements and current conditions.
                  </p>

                  <Button asChild className="w-full">
                    <a href={`/quote?pickup=${formData.pickupLocation}&delivery=${formData.deliveryLocation}&container=${formData.containerType}`}>
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
                    <div className="text-muted-foreground">No hidden fees or surprises</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Volume Discounts</div>
                    <div className="text-muted-foreground">Save more with regular shipments</div>
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

          {/* Call to Action */}
          <div className="text-center mt-8">
            <p className="text-muted-foreground">
              Need help or have special requirements?{' '}
              <a href="/contact" className="text-primary hover:underline font-semibold">
                Contact our 24/7 dispatch team
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
