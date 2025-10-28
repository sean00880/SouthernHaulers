import { Metadata } from 'next';
import { ArrowRight, Package, MapPin, Clock, CheckCircle2, Ship, Building2, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Container Drayage Services | Southern Haulers',
  description: 'Port-to-door and door-to-port container transport serving Savannah, Charleston, and Jacksonville. Real-time tracking and automated appointment scheduling.',
};

export default function DrayagePage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative border-b">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="container relative">
          <div className="flex flex-col items-center justify-center space-y-8 py-24 md:py-32 text-center">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
              <Package className="mr-2 h-4 w-4 text-primary" />
              <span className="font-medium">Container Drayage Solutions</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl">
              Seamless{' '}
              <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                Port-to-Door
              </span>
              {' '}Container Transport
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Efficient drayage services connecting major Southeast ports to your facility. Serving Savannah, Charleston, and Jacksonville with 300+ container capacity and real-time tracking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/quote"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
              >
                Get Drayage Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a
                href="/track"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
              >
                Track Container
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="container py-24">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Why Choose Southern Haulers Drayage?
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Professional container transport with technology-enabled operations and exceptional reliability.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card p-6 space-y-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Ship className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Multi-Port Coverage</h3>
            <p className="text-muted-foreground">
              Direct service to Port of Savannah, Charleston Harbor, and JAXPORT. Strategic positioning for fast turnaround times.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 space-y-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Automated Appointment Scheduling</h3>
            <p className="text-muted-foreground">
              Integrated eModal terminal appointments and real-time slot availability. Minimize free time and avoid demurrage charges.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 space-y-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Live GPS Tracking</h3>
            <p className="text-muted-foreground">
              Real-time container location tracking with automated status updates. Complete visibility from gate-out to delivery.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 space-y-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">On-Site Transloading</h3>
            <p className="text-muted-foreground">
              300+ container storage capacity with transloading capabilities. Consolidate shipments and reduce per-unit costs.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 space-y-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">TWIC Certified Drivers</h3>
            <p className="text-muted-foreground">
              All drivers maintain TWIC credentials and are FMCSA compliant. Fully insured and bonded for port operations.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 space-y-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Scalable Capacity</h3>
            <p className="text-muted-foreground">
              Lease-on driver network provides flexible capacity during peak seasons. Handle volume surges without delays.
            </p>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="border-t bg-muted/50">
        <div className="container py-24">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Comprehensive Drayage Services
              </h2>
              <p className="text-lg text-muted-foreground">
                Full-service container transport from port to your facility, with specialized handling for import, export, and transload operations.
              </p>
            </div>

            <div className="space-y-8">
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold">Port-to-Door Import Drayage</h3>
                <p className="text-muted-foreground">
                  Pickup containers from terminal gates and deliver directly to your warehouse or distribution center. Full load and LTL consolidation options available.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Terminal gate pickup with pre-cleared customs documentation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Chassis provisioning and empty return handling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Last-mile delivery to final destination with POD capture</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-semibold">Door-to-Port Export Drayage</h3>
                <p className="text-muted-foreground">
                  Pickup loaded containers from your facility and deliver to port terminals for vessel loading. Timely delivery to meet cut-off schedules.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Empty container delivery for loading at your facility</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Loaded container pickup with seal verification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Terminal delivery ahead of vessel cut-off with confirmation</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-semibold">Container Transloading</h3>
                <p className="text-muted-foreground">
                  Cross-dock and transload services at our 300+ container storage facility. Reduce dwell time and avoid per-diem charges.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Container devanning and palletization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>LTL consolidation for cost-effective distribution</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Short-term and long-term container storage options</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Port Coverage */}
      <section className="container py-24">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Southeast Port Coverage
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Direct drayage service to the three busiest container ports in the Southeastern United States.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-6 space-y-4">
            <h3 className="text-2xl font-semibold">Port of Savannah</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><strong className="text-foreground">Location:</strong> Savannah, Georgia</p>
              <p><strong className="text-foreground">Annual TEUs:</strong> 5.9 million (2023)</p>
              <p><strong className="text-foreground">Terminals:</strong> Garden City Terminal, Ocean Terminal</p>
              <p><strong className="text-foreground">Coverage:</strong> Direct service to South Georgia facilities</p>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-6 space-y-4">
            <h3 className="text-2xl font-semibold">Charleston Harbor</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><strong className="text-foreground">Location:</strong> Charleston, South Carolina</p>
              <p><strong className="text-foreground">Annual TEUs:</strong> 2.9 million (2023)</p>
              <p><strong className="text-foreground">Terminals:</strong> Wando Welch Terminal, Columbus Street Terminal</p>
              <p><strong className="text-foreground">Coverage:</strong> South Carolina and upstate Georgia</p>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-6 space-y-4">
            <h3 className="text-2xl font-semibold">JAXPORT</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p><strong className="text-foreground">Location:</strong> Jacksonville, Florida</p>
              <p><strong className="text-foreground">Annual TEUs:</strong> 1.5 million (2023)</p>
              <p><strong className="text-foreground">Terminals:</strong> Blount Island Terminal, Dames Point Terminal</p>
              <p><strong className="text-foreground">Coverage:</strong> North Florida and South Georgia</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-muted/50">
        <div className="container py-24">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Streamline Your Drayage?
            </h2>
            <p className="text-lg text-muted-foreground">
              Get a same-day quote for port-to-door or door-to-port container transport across the Southeast.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/quote"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
              >
                Get Drayage Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
