import { Metadata } from 'next';
import { ArrowRight, Warehouse, Package, CheckCircle2, Container, Clock, DollarSign, TrendingDown, BarChart3, Shield, Boxes } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Warehousing & Transloading Services | Southern Haulers',
  description: '300+ container storage capacity with on-site transloading, cross-docking, and distribution. Short-term and long-term storage solutions to avoid per-diem and demurrage charges.',
};

export default function WarehousingPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative border-b">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="container relative">
          <div className="flex flex-col items-center justify-center space-y-8 py-24 md:py-32 text-center">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
              <Warehouse className="mr-2 h-4 w-4 text-primary" />
              <span className="font-medium">Warehousing & Transloading Solutions</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl">
              Strategic{' '}
              <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                Container Storage
              </span>
              {' '}& Transloading Services
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
              300+ container capacity with on-site transloading, cross-docking, and distribution. Avoid per-diem and demurrage charges with flexible short-term and long-term storage solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/quote"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
              >
                Get Storage Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a
                href="/track"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
              >
                Track Shipment
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="container py-24">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Why Choose Southern Haulers Warehousing?
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Strategic South Georgia location with comprehensive container handling and cost-saving storage solutions.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card p-6 space-y-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Container className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">300+ Container Capacity</h3>
            <p className="text-muted-foreground">
              Expansive container yard with 300+ grounded container storage. Secure, gated facility with 24/7 surveillance and access control.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 space-y-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Avoid Per-Diem Charges</h3>
            <p className="text-muted-foreground">
              Move containers out of port free time windows to our facility. Eliminate daily container rental fees while managing your supply chain.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 space-y-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingDown className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Reduce Demurrage Risk</h3>
            <p className="text-muted-foreground">
              Pull containers early from port terminals to avoid demurrage. Flexible devanning schedules aligned with your operational needs.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 space-y-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Boxes className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">On-Site Transloading</h3>
            <p className="text-muted-foreground">
              Container devanning, palletization, and cross-docking services. LTL consolidation for cost-effective regional distribution.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 space-y-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Flexible Storage Terms</h3>
            <p className="text-muted-foreground">
              Daily, weekly, or monthly storage options. No long-term contracts required. Scale up or down based on seasonal demand.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 space-y-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Inventory Visibility</h3>
            <p className="text-muted-foreground">
              Web-based portal for real-time container location and status. Automated notifications for arrivals, departures, and devanning completion.
            </p>
          </div>
        </div>
      </section>

      {/* Cost Savings Calculator */}
      <section className="border-t bg-muted/50">
        <div className="container py-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Per-Diem & Demurrage Cost Avoidance
              </h2>
              <p className="text-lg text-muted-foreground">
                Typical savings for importers using our strategic container storage vs. leaving containers at port terminals.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="rounded-lg border bg-card p-8 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold text-destructive">Port Terminal Storage</h3>
                  <p className="text-sm text-muted-foreground">Typical port costs after free time expires</p>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Container Demurrage (Day 6-10)</span>
                    <span className="font-mono font-semibold">$150/day</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Container Demurrage (Day 11+)</span>
                    <span className="font-mono font-semibold">$250/day</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Chassis Per-Diem (Day 4+)</span>
                    <span className="font-mono font-semibold">$35/day</span>
                  </div>
                  <div className="flex justify-between py-3 border-t-2 text-base">
                    <span className="font-semibold">10-Day Port Storage Cost</span>
                    <span className="font-mono font-bold text-destructive">$1,000+</span>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border-2 border-primary bg-card p-8 space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-2">
                    <TrendingDown className="h-4 w-4" />
                    <span>Cost Savings</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-primary">Southern Haulers Storage</h3>
                  <p className="text-sm text-muted-foreground">Competitive storage with flexible terms</p>
                </div>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Early Container Drayage</span>
                    <span className="font-mono font-semibold">$250 (one-time)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Container Storage (Day 1-30)</span>
                    <span className="font-mono font-semibold">$15/day</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Empty Return Drayage</span>
                    <span className="font-mono font-semibold">$150 (one-time)</span>
                  </div>
                  <div className="flex justify-between py-3 border-t-2 text-base">
                    <span className="font-semibold">10-Day Total Cost</span>
                    <span className="font-mono font-bold text-primary">$550</span>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Your Savings:</span>
                    <span className="text-2xl font-bold text-primary">$450+</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Per container over 10 days</p>
                </div>
              </div>
            </div>
            <div className="mt-8 p-6 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-sm text-muted-foreground text-center">
                <strong className="text-foreground">Peak Season Benefits:</strong> During port congestion, demurrage can exceed $500/day after Day 15. Our 300+ container capacity ensures you always have storage availability when you need it most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="container py-24">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Comprehensive Warehousing & Transloading Services
            </h2>
            <p className="text-lg text-muted-foreground">
              Full-service container handling from port pickup to final delivery, with flexible storage and transloading options.
            </p>
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold">Container Storage</h3>
              <p className="text-muted-foreground">
                Secure, gated container yard with 300+ ground storage capacity. Suitable for dry containers, refrigerated containers (with genset power), and specialized equipment.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Daily, weekly, and monthly storage rates available</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>20ft, 40ft, 40ft HC, and 45ft container storage</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>24/7 security surveillance and controlled gate access</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Genset power hookups for refrigerated containers</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-semibold">Container Devanning & Transloading</h3>
              <p className="text-muted-foreground">
                Professional container unloading and cargo handling services. Palletization, stretch-wrapping, and preparation for regional distribution.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Container devanning with forklift and material handling equipment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Palletization and stretch-wrapping for warehouse-ready freight</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Floor-loaded container to pallet conversion</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Quality checks, piece counts, and damage documentation</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-semibold">Cross-Docking & LTL Consolidation</h3>
              <p className="text-muted-foreground">
                Minimize dwell time with direct cross-dock operations. Consolidate LTL shipments for cost-effective regional distribution.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Same-day cross-dock from container to outbound truck</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>LTL consolidation for multi-destination shipments</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Appointment scheduling for outbound carrier pickups</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>BOL and shipping documentation preparation</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-semibold">Chassis & Equipment Management</h3>
              <p className="text-muted-foreground">
                Chassis provisioning, per-diem management, and empty container return coordination to minimize equipment costs.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Chassis pool management (DCLI, TRAC, Flexi-Van)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Street-turn coordination to minimize chassis per-diem</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Empty container return to nearest depot or terminal</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Demurrage tracking and early warning notifications</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Facility Features */}
      <section className="border-t bg-muted/50">
        <div className="container py-24">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Modern Warehouse Facility
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              Purpose-built container handling facility in South Georgia's agricultural and logistics hub.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border bg-card p-6 space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Container className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Container Yard</h3>
              <div className="text-sm text-muted-foreground space-y-2">
                <p><strong className="text-foreground">Capacity:</strong> 300+ grounded containers</p>
                <p><strong className="text-foreground">Surface:</strong> Paved and gravel staging areas</p>
                <p><strong className="text-foreground">Security:</strong> Gated facility with 24/7 surveillance</p>
                <p><strong className="text-foreground">Access:</strong> Extended hours for pickup/delivery</p>
              </div>
            </div>
            <div className="rounded-lg border bg-card p-6 space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Warehouse className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Covered Warehouse</h3>
              <div className="text-sm text-muted-foreground space-y-2">
                <p><strong className="text-foreground">Space:</strong> Climate-controlled warehouse space</p>
                <p><strong className="text-foreground">Loading:</strong> Dock-high and ground-level doors</p>
                <p><strong className="text-foreground">Equipment:</strong> Forklifts, pallet jacks, stretch-wrap</p>
                <p><strong className="text-foreground">Use Cases:</strong> Devanning, palletization, storage</p>
              </div>
            </div>
            <div className="rounded-lg border bg-card p-6 space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Strategic Location</h3>
              <div className="text-sm text-muted-foreground space-y-2">
                <p><strong className="text-foreground">Savannah Port:</strong> 180 miles (3 hours)</p>
                <p><strong className="text-foreground">Charleston Port:</strong> 250 miles (4 hours)</p>
                <p><strong className="text-foreground">Jacksonville Port:</strong> 200 miles (3.5 hours)</p>
                <p><strong className="text-foreground">Highways:</strong> I-75, US-82, US-319 access</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-24">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Ready to Reduce Your Container Storage Costs?
          </h2>
          <p className="text-lg text-muted-foreground">
            Get a same-day quote for container storage and transloading. Avoid per-diem and demurrage with our 300+ container capacity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/quote"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
            >
              Get Storage Quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
            >
              Contact Sales
            </a>
          </div>
          <div className="flex items-center justify-center gap-8 pt-4 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>300+ capacity</span>
            <span>•</span>
            <span>Flexible terms</span>
            <span>•</span>
            <span>Cost savings</span>
          </div>
        </div>
      </section>
    </div>
  );
}
