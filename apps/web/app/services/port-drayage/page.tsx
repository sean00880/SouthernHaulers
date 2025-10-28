import { ArrowRight, Package, MapPin, Clock, Shield, Truck, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export const metadata = {
  title: 'Port Drayage Services | Savannah, Charleston, Jacksonville',
  description: 'Professional container drayage services for Port of Savannah, Charleston Harbor, and JAXPORT. Fast port-to-door transport with real-time tracking, TWIC-certified drivers, and 24/7 dispatch.',
  keywords: 'port drayage, container drayage, drayage services, port of savannah drayage, charleston port drayage, jaxport drayage, intermodal drayage, port-to-door transport',
  openGraph: {
    title: 'Port Drayage Services - Southern Haulers',
    description: 'Expert container drayage for Southeast ports. Fast, reliable, 99% on-time delivery.',
  },
};

export default function PortDrayagePage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <div className="container relative py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
                <Package className="mr-2 h-4 w-4 text-primary" />
                <span className="font-medium">Core Service</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Port Drayage Services
              </h1>
              <p className="text-xl text-muted-foreground">
                Professional container drayage from Southeast ports to your facility. Fast, reliable, and fully trackable with 99% on-time delivery.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/quote"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
                >
                  Request Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
                >
                  Contact Dispatch
                </a>
              </div>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden border bg-muted">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                {/* Placeholder for hero image - Container port aerial view */}
                <span className="text-sm">Professional port drayage operations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ports Served */}
      <section className="border-t bg-muted/30">
        <div className="container py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Southeast Ports We Serve</h2>
            <p className="text-lg text-muted-foreground">Strategic coverage of three major ports</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border bg-card p-6 space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Port of Savannah</h3>
              <p className="text-muted-foreground">
                Savannah, Georgia
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>5.9M TEUs/year capacity</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Garden City Terminal access</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>2-4 hour turnaround</span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border bg-card p-6 space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Charleston Harbor</h3>
              <p className="text-muted-foreground">
                Charleston, South Carolina
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>2.9M TEUs/year capacity</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Wando Welch Terminal</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>2-4 hour turnaround</span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg border bg-card p-6 space-y-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">JAXPORT</h3>
              <p className="text-muted-foreground">
                Jacksonville, Florida
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>1.5M TEUs/year capacity</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Blount Island Terminal</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>2-4 hour turnaround</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What is Port Drayage */}
      <section className="container py-16">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">What is Port Drayage?</h2>
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <p className="text-lg text-muted-foreground mb-4">
              Port drayage is the short-distance transport of shipping containers from ocean ports to nearby warehouses, distribution centers, or rail yards. It's a critical link in the supply chain that moves your goods from international shipping to domestic distribution.
            </p>
            <p className="text-lg text-muted-foreground mb-4">
              At Southern Haulers, we specialize in efficient port-to-door container transport across Georgia, South Carolina, and Florida. Our strategic South Georgia hub location enables rapid 2-4 hour turnaround times to all three major Southeast ports.
            </p>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="border-t bg-muted/30">
        <div className="container py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Drayage Process</h2>
            <p className="text-lg text-muted-foreground">Streamlined container transport in four steps</p>
          </div>
          <div className="grid gap-8 md:grid-cols-4">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto text-2xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold">Container Release</h3>
              <p className="text-sm text-muted-foreground">
                Your container is released at the terminal. We receive notification and begin scheduling.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto text-2xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold">Automated Appointment</h3>
              <p className="text-sm text-muted-foreground">
                Terminal appointment auto-scheduled via eModal integration for optimal pickup time.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto text-2xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold">Pickup & Transit</h3>
              <p className="text-sm text-muted-foreground">
                TWIC-certified driver picks up container with live GPS tracking throughout transit.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto text-2xl font-bold">
                4
              </div>
              <h3 className="text-lg font-semibold">Delivery & POD</h3>
              <p className="text-sm text-muted-foreground">
                Container delivered to your facility with digital proof of delivery capture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Our Port Drayage Services</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">99% On-Time Delivery</h3>
              <p className="text-sm text-muted-foreground">
                Consistent, reliable service with industry-leading on-time performance.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Real-Time GPS Tracking</h3>
              <p className="text-sm text-muted-foreground">
                Monitor your container's location with live updates every 15 minutes.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">TWIC-Certified Drivers</h3>
              <p className="text-sm text-muted-foreground">
                All drivers maintain current Transportation Worker Identification Credentials.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Truck className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Modern Fleet</h3>
              <p className="text-sm text-muted-foreground">
                Well-maintained equipment suitable for 20ft, 40ft, and 40ft High Cube containers.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">24/7 Dispatch</h3>
              <p className="text-sm text-muted-foreground">
                Round-the-clock dispatch and customer support for urgent shipments.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">300+ Container Storage</h3>
              <p className="text-sm text-muted-foreground">
                On-site storage capacity to avoid per-diem and demurrage charges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-primary/5">
        <div className="container py-16">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold">Ready to Streamline Your Port Drayage?</h2>
            <p className="text-lg text-muted-foreground">
              Get a competitive quote for container transport from Savannah, Charleston, or Jacksonville.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/quote"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
              >
                Request Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
              >
                Contact Dispatch
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
