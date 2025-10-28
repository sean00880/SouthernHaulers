import { Metadata } from 'next';
import { ArrowRight, Truck, Package, CheckCircle2, Wheat, TreeDeciduous, Flower2, Leaf, TrendingUp, Shield, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Agricultural Hauling Services | Southern Haulers',
  description: 'Specialized bulk agricultural transport for peanuts, pecans, cotton, feed, and fertilizer across the Southeast. Equipment and expertise for commodity handling.',
};

export default function AgriculturalPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative border-b">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="container relative">
          <div className="flex flex-col items-center justify-center space-y-8 py-24 md:py-32 text-center">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
              <Wheat className="mr-2 h-4 w-4 text-primary" />
              <span className="font-medium">Agricultural Hauling Solutions</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl">
              Specialized{' '}
              <span className="bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent">
                Agricultural Transport
              </span>
              {' '}Across the Southeast
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Bulk agricultural hauling for peanuts, pecans, cotton, feed, and fertilizer. Specialized equipment, commodity expertise, and seasonal capacity management across South Georgia and the Southeast.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/quote"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
              >
                Get Ag Hauling Quote
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
            Why Choose Southern Haulers for Agricultural Transport?
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Regional expertise in Southeast agricultural corridors with specialized equipment and commodity handling knowledge.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card p-6 space-y-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Wheat className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Commodity Expertise</h3>
            <p className="text-muted-foreground">
              Deep knowledge of peanuts, pecans, cotton, feed, and fertilizer handling requirements. USDA compliance and food-grade standards.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 space-y-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Truck className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Specialized Equipment</h3>
            <p className="text-muted-foreground">
              Hopper bottom trailers, dump trailers, curtain-side vans, and flatbeds. Equipment optimized for agricultural commodity transport.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 space-y-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Seasonal Capacity</h3>
            <p className="text-muted-foreground">
              Surge capacity management during harvest seasons. Flexible scheduling to meet peak demand for peanut and pecan seasons.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 space-y-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Farm-to-Facility Lanes</h3>
            <p className="text-muted-foreground">
              Direct pickup from farms, co-ops, and buying points. Delivery to processing facilities, storage elevators, and export terminals.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 space-y-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Food Safety Compliance</h3>
            <p className="text-muted-foreground">
              FSMA compliant transport with documented cleaning procedures. Food-grade trailers for edible commodities like peanuts and pecans.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 space-y-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Port Integration</h3>
            <p className="text-muted-foreground">
              Seamless farm-to-port transport for export commodities. Container stuffing and bulk loading for international shipments.
            </p>
          </div>
        </div>
      </section>

      {/* Commodities Served */}
      <section className="border-t bg-muted/50">
        <div className="container py-24">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Commodities We Haul
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              Specialized transport for the Southeast's primary agricultural commodities.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border bg-card p-6 space-y-4 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Wheat className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold">Peanuts</h3>
              <p className="text-sm text-muted-foreground">
                In-shell and shelled peanuts from farms to shelling plants, buying points, and export terminals. Peak season: September-November.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 space-y-4 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <TreeDeciduous className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold">Pecans</h3>
              <p className="text-sm text-muted-foreground">
                In-shell pecans from orchards to processing facilities. Temperature-controlled options available. Peak season: October-December.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 space-y-4 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Flower2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold">Cotton</h3>
              <p className="text-sm text-muted-foreground">
                Baled cotton from gins to warehouses and textile mills. Covered trailer options for weather protection. Peak season: October-January.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6 space-y-4 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold">Feed & Fertilizer</h3>
              <p className="text-sm text-muted-foreground">
                Bulk feed ingredients, finished feed, and agricultural fertilizers. Hopper bottom trailers for efficient unloading.
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
              Comprehensive Agricultural Hauling Services
            </h2>
            <p className="text-lg text-muted-foreground">
              End-to-end transport solutions for Southeast agricultural producers, co-ops, processors, and exporters.
            </p>
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold">Farm-to-Facility Transport</h3>
              <p className="text-muted-foreground">
                Direct pickup from farms, orchards, and buying points. Delivery to shelling plants, processing facilities, storage elevators, and co-op warehouses.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Scheduled pickup during harvest with flexible windows</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Weight tickets and documentation at origin and destination</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Clean, food-grade trailers for edible commodities</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-semibold">Facility-to-Port Export Transport</h3>
              <p className="text-muted-foreground">
                Agricultural commodity transport from processing facilities and warehouses to port terminals for containerized or bulk export.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Container stuffing and drayage to Port of Savannah and Charleston</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Bulk commodity delivery to port elevators and loading facilities</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Coordination with freight forwarders and steamship lines</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-semibold">Seasonal Surge Capacity</h3>
              <p className="text-muted-foreground">
                Flexible capacity management during peak harvest seasons with lease-on driver network and equipment partnerships.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Peanut harvest surge capacity (September-November)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Pecan harvest surge capacity (October-December)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Cotton harvest surge capacity (October-January)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Fleet */}
      <section className="border-t bg-muted/50">
        <div className="container py-24">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Specialized Agricultural Equipment
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              Purpose-built trailers and trucks for efficient agricultural commodity transport.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border bg-card p-6 space-y-4">
              <h3 className="text-xl font-semibold">Hopper Bottom Trailers</h3>
              <p className="text-muted-foreground">
                42-45 ft aluminum or steel hopper trailers for bulk peanuts, pecans, feed, and grain. Pneumatic unloading for fast discharge.
              </p>
              <div className="text-sm text-muted-foreground space-y-1">
                <p><strong className="text-foreground">Capacity:</strong> 25-28 tons</p>
                <p><strong className="text-foreground">Best For:</strong> Bulk nuts, feed, fertilizer</p>
              </div>
            </div>
            <div className="rounded-lg border bg-card p-6 space-y-4">
              <h3 className="text-xl font-semibold">Dump Trailers</h3>
              <p className="text-muted-foreground">
                End-dump and side-dump trailers for agricultural products requiring gravity unloading. Lined options for food-grade commodities.
              </p>
              <div className="text-sm text-muted-foreground space-y-1">
                <p><strong className="text-foreground">Capacity:</strong> 20-25 tons</p>
                <p><strong className="text-foreground">Best For:</strong> Cotton, raw materials</p>
              </div>
            </div>
            <div className="rounded-lg border bg-card p-6 space-y-4">
              <h3 className="text-xl font-semibold">Curtain-Side Vans</h3>
              <p className="text-muted-foreground">
                53 ft curtain-side dry vans for baled cotton, bagged product, and palletized commodities. Side-loading for efficient access.
              </p>
              <div className="text-sm text-muted-foreground space-y-1">
                <p><strong className="text-foreground">Capacity:</strong> 45,000 lbs</p>
                <p><strong className="text-foreground">Best For:</strong> Baled cotton, bagged products</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Geographic Coverage */}
      <section className="container py-24">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Southeast Agricultural Coverage
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Strategic positioning in South Georgia's agricultural hub with coverage across the Southeast.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="rounded-lg border bg-card p-8 space-y-6">
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Primary Coverage Areas</h3>
              <div className="grid md:grid-cols-2 gap-4 text-muted-foreground">
                <div>
                  <p className="font-medium text-foreground mb-2">South Georgia Hub</p>
                  <ul className="text-sm space-y-1">
                    <li>• Tifton (home base)</li>
                    <li>• Albany, Valdosta, Thomasville</li>
                    <li>• Fitzgerald, Moultrie, Bainbridge</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-2">Extended Coverage</p>
                  <ul className="text-sm space-y-1">
                    <li>• Savannah & Coastal Georgia</li>
                    <li>• Charleston & South Carolina</li>
                    <li>• Jacksonville & North Florida</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="border-t pt-6 space-y-3">
              <h3 className="text-xl font-semibold">Key Agricultural Lanes</h3>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>• <strong className="text-foreground">Farm → Shelling Plant:</strong> Peanut harvest transport to shelling facilities</p>
                <p>• <strong className="text-foreground">Facility → Port:</strong> Export commodities to Port of Savannah/Charleston</p>
                <p>• <strong className="text-foreground">Co-op → Distribution:</strong> Finished products to regional distributors</p>
                <p>• <strong className="text-foreground">Mill → Farm:</strong> Feed and fertilizer backhaul to agricultural operations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-muted/50">
        <div className="container py-24">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Ship Your Agricultural Commodities?
            </h2>
            <p className="text-lg text-muted-foreground">
              Get a same-day quote for bulk agricultural hauling across the Southeast. Seasonal surge capacity available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/quote"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
              >
                Get Ag Hauling Quote
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
              <span>Same-day quotes</span>
              <span>•</span>
              <span>Seasonal capacity</span>
              <span>•</span>
              <span>Food-grade trailers</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
