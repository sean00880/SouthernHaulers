import Image from 'next/image';
import { ArrowRight, Truck, Package, Warehouse, Thermometer, MapPin, CheckCircle2, Clock, Shield, Award, FileCheck, UserCheck, TrendingUp, Ship, Building2 } from 'lucide-react';
import { AnimatedCounter } from '../components/animated-counter';
import { PortCoverageMap } from '../components/port-coverage-map';
import { QuoteCalculator } from '../components/quote-calculator';
import { TrackingDemo } from '../components/tracking-demo';
import { TerminalStatus } from '../components/terminal-status';
import { LogoCloud } from '../components/logo-cloud';
import { SouthernHaulersOrganizationSchema, SouthernHaulersLocalBusinessSchema, FAQSchema } from '../components/structured-data';

export default function HomePage() {
  return (
    <div className="w-full">
      {/* JSON-LD Structured Data */}
      <SouthernHaulersOrganizationSchema />
      <SouthernHaulersLocalBusinessSchema />
      <FAQSchema
        questions={[
          {
            question: 'Which ports do you serve?',
            answer: 'We provide direct drayage service to Port of Savannah (GA), Charleston Harbor (SC), and JAXPORT (FL). Our strategic South Georgia location enables fast turnaround times to all three major Southeast ports.',
          },
          {
            question: 'How do I track my container?',
            answer: 'All containers are tracked via live GPS. You can access real-time location updates through our customer portal or receive automated status notifications via email and SMS.',
          },
          {
            question: 'What is your container storage capacity?',
            answer: 'Our facility can store 300+ containers with on-site transloading capabilities. We offer both short-term (daily) and long-term storage solutions to help you avoid per-diem and demurrage charges.',
          },
          {
            question: 'Are your drivers TWIC certified?',
            answer: 'Yes, all of our drivers maintain current TWIC (Transportation Worker Identification Credential) certifications required for port access. We also maintain FMCSA compliance and Truth-in-Leasing documentation for all lease-on operators.',
          },
          {
            question: 'How quickly can you provide a quote?',
            answer: 'We provide same-day quotes for drayage and agricultural hauling. Submit your request online or call our 24/7 dispatch center, and we will respond within 2-4 hours with competitive rates and available capacity.',
          },
          {
            question: 'Do you handle refrigerated containers?',
            answer: 'Yes, we provide temperature-controlled drayage for refrigerated containers (reefers) with continuous monitoring and compliance documentation for perishable agricultural products.',
          },
        ]}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 hero-gradient dark:hero-gradient animate-gradient" />

        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-grid-white/[0.02] dark:bg-grid-white/[0.02] bg-[size:50px_50px]" />

        {/* Radial Gradient Overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />

        <div className="container relative">
          <div className="flex flex-col items-center justify-center space-y-8 py-24 md:py-32 text-center">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
              <Truck className="mr-2 h-4 w-4 text-primary" />
              <span className="font-medium">Southeastern Agricultural & Drayage Leader</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl">
              Premier{' '}
              <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                Container Drayage
              </span>
              {' '}& Agricultural Hauling Services
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Southern Haulers specializes in container drayage, bulk agricultural transport, and integrated warehousing
              across the Southeast. 300+ container capacity with on-site transloading.
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
                href="/track"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
              >
                Track Shipment
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>300+ Container Capacity</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>On-Site Transloading</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Real-Time Tracking</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Cloud */}
      <LogoCloud />

      {/* Stats Section */}
      <section className="border-y bg-muted/50">
        <div className="container py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <AnimatedCounter end={300} suffix="+" className="text-4xl font-bold text-primary" />
              <div className="text-sm text-muted-foreground">Container Capacity</div>
            </div>
            <div className="space-y-2">
              <AnimatedCounter end={99} suffix="%" className="text-4xl font-bold text-primary" />
              <div className="text-sm text-muted-foreground">On-Time Delivery</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Dispatch & Support</div>
            </div>
            <div className="space-y-2">
              <AnimatedCounter end={3} suffix=" Ports" className="text-4xl font-bold text-primary" />
              <div className="text-sm text-muted-foreground">GA, SC, FL Coverage</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container py-24">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            How Drayage Works
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Seamless container transport from port to your facility in four simple steps.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-4">
          <div className="relative space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Ship className="h-8 w-8 text-primary" />
            </div>
            <div className="text-center space-y-2">
              <div className="text-sm font-medium text-primary">Step 1</div>
              <h3 className="text-xl font-semibold">Container Arrives</h3>
              <p className="text-sm text-muted-foreground">
                Your container arrives at port terminal (Savannah, Charleston, or Jacksonville)
              </p>
            </div>
          </div>
          <div className="relative space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <FileCheck className="h-8 w-8 text-primary" />
            </div>
            <div className="text-center space-y-2">
              <div className="text-sm font-medium text-primary">Step 2</div>
              <h3 className="text-xl font-semibold">Automated Scheduling</h3>
              <p className="text-sm text-muted-foreground">
                Terminal appointment auto-scheduled via eModal integration
              </p>
            </div>
          </div>
          <div className="relative space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Truck className="h-8 w-8 text-primary" />
            </div>
            <div className="text-center space-y-2">
              <div className="text-sm font-medium text-primary">Step 3</div>
              <h3 className="text-xl font-semibold">Live Tracking</h3>
              <p className="text-sm text-muted-foreground">
                TWIC-certified driver picks up with real-time GPS tracking
              </p>
            </div>
          </div>
          <div className="relative space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
            <div className="text-center space-y-2">
              <div className="text-sm font-medium text-primary">Step 4</div>
              <h3 className="text-xl font-semibold">Delivery Complete</h3>
              <p className="text-sm text-muted-foreground">
                Container delivered to your facility with POD capture
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="border-t bg-muted/50">
        <div className="container py-16">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
              Certified & Compliant
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground">
              Fully licensed, insured, and compliant with all federal and state transportation regulations.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-4 text-center">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">FMCSA Compliant</h3>
              <p className="text-sm text-muted-foreground">Federal Motor Carrier Safety Administration certified</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                <UserCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">TWIC Certified</h3>
              <p className="text-sm text-muted-foreground">All drivers maintain Transportation Worker Identification Credentials</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                <FileCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Truth-in-Leasing</h3>
              <p className="text-sm text-muted-foreground">49 CFR Part 376 compliant lease agreements</p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Fully Insured</h3>
              <p className="text-sm text-muted-foreground">Comprehensive cargo and liability insurance coverage</p>
            </div>
          </div>
        </div>
      </section>

      {/* Port Coverage Map */}
      <section className="container py-24">
        <PortCoverageMap />
      </section>

      {/* Quote Calculator */}
      <section className="border-t bg-muted/50">
        <div className="container py-24">
          <QuoteCalculator />
        </div>
      </section>

      {/* Live Tracking Demo */}
      <section className="container py-24">
        <TrackingDemo />
      </section>

      {/* Terminal Status */}
      <section className="border-t bg-muted/50">
        <div className="container py-24">
          <TerminalStatus />
        </div>
      </section>

      {/* Harris Brokerage Integration */}
      <section className="border-t">
        <div className="container py-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <div className="inline-flex items-center rounded-full border border-primary/50 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <TrendingUp className="mr-2 h-4 w-4" />
                <span>Integrated 3PL Services</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Southern Haulers + Harris Brokerage
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
                Southern Haulers is the asset-based carrier arm of Harris Brokerage, a full-service 3PL providing nationwide transportation solutions.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-lg border-2 border-primary bg-card p-8 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Truck className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold">Southern Haulers</h3>
                </div>
                <p className="text-muted-foreground">
                  Asset-based trucking with physical trucks, drivers, and equipment. Specialized in container drayage, agricultural hauling, and warehousing across the Southeast.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Own fleet of trucks and drivers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>300+ container storage capacity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Southeast regional coverage</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border bg-card p-8 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold">Harris Brokerage</h3>
                </div>
                <p className="text-muted-foreground">
                  3PL freight brokerage with access to nationwide carrier network. Seamless tender and dispatch integration with Southern Haulers for comprehensive solutions.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Nationwide carrier network</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Out-of-region lane coverage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Full-service 3PL solutions</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-6 rounded-lg bg-primary/5 border border-primary/20 text-center">
              <p className="text-muted-foreground">
                <strong className="text-foreground">Seamless Integration:</strong> When your shipment requires out-of-footprint coverage, Harris Brokerage provides carrier access while maintaining the same quality service standards. One point of contact for regional and nationwide freight.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="border-t container py-24">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Comprehensive Transportation Solutions
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Specialized drayage, agricultural hauling, and warehousing services across the Southeastern United States.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="group rounded-lg border bg-card p-6 space-y-3 transition-all hover:shadow-lg hover:border-primary/50 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center transition-all group-hover:bg-primary/20">
              <Package className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
            </div>
            <h3 className="text-xl font-semibold">Container Drayage</h3>
            <p className="text-muted-foreground">
              Port-to-door and door-to-port container transport. Serving Savannah, Charleston, and Jacksonville with live tracking and automated appointment scheduling.
            </p>
            <a href="/services/drayage" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
              Learn more <ArrowRight className="h-3 w-3" />
            </a>
          </div>
          <div className="group rounded-lg border bg-card p-6 space-y-3 transition-all hover:shadow-lg hover:border-primary/50 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center transition-all group-hover:bg-primary/20">
              <Truck className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
            </div>
            <h3 className="text-xl font-semibold">Agricultural Hauling</h3>
            <p className="text-muted-foreground">
              Specialized bulk agricultural transport for peanuts, pecans, cotton, feed, and fertilizer. Equipment and expertise for commodity handling.
            </p>
            <a href="/services/agricultural" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
              Learn more <ArrowRight className="h-3 w-3" />
            </a>
          </div>
          <div className="group rounded-lg border bg-card p-6 space-y-3 transition-all hover:shadow-lg hover:border-primary/50 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center transition-all group-hover:bg-primary/20">
              <Warehouse className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
            </div>
            <h3 className="text-xl font-semibold">Warehousing & Transloading</h3>
            <p className="text-muted-foreground">
              300+ container storage capacity with on-site transloading, cross-docking, and distribution. Short-term and long-term storage solutions.
            </p>
            <a href="/services/warehousing" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
              Learn more <ArrowRight className="h-3 w-3" />
            </a>
          </div>
          <div className="group rounded-lg border bg-card p-6 space-y-3 transition-all hover:shadow-lg hover:border-primary/50 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center transition-all group-hover:bg-primary/20">
              <Thermometer className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
            </div>
            <h3 className="text-xl font-semibold">Refrigerated Transport</h3>
            <p className="text-muted-foreground">
              Temperature-controlled freight services for perishable agricultural products. Continuous monitoring and compliance documentation.
            </p>
            <a href="/services/refrigerated" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
              Learn more <ArrowRight className="h-3 w-3" />
            </a>
          </div>
          <div className="group rounded-lg border bg-card p-6 space-y-3 transition-all hover:shadow-lg hover:border-primary/50 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center transition-all group-hover:bg-primary/20">
              <MapPin className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
            </div>
            <h3 className="text-xl font-semibold">Real-Time Tracking</h3>
            <p className="text-muted-foreground">
              Live GPS tracking, automated status updates, and customer portal access. Complete shipment visibility from pickup to delivery.
            </p>
            <a href="/track" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
              Track shipment <ArrowRight className="h-3 w-3" />
            </a>
          </div>
          <div className="group rounded-lg border bg-card p-6 space-y-3 transition-all hover:shadow-lg hover:border-primary/50 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center transition-all group-hover:bg-primary/20">
              <Shield className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
            </div>
            <h3 className="text-xl font-semibold">Safety & Compliance</h3>
            <p className="text-muted-foreground">
              FMCSA compliant, TWIC certified drivers, Truth-in-Leasing documentation, and comprehensive insurance coverage for your peace of mind.
            </p>
            <a href="/about/safety" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
              Our commitment <ArrowRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container py-24">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Trusted by Southeast Shippers
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            See what our customers say about our container drayage and agricultural hauling services.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-6 space-y-4">
            <div className="flex items-center gap-1 text-primary">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                </svg>
              ))}
            </div>
            <p className="text-muted-foreground italic">
              "Southern Haulers reduced our drayage costs by 23% while improving on-time delivery. The real-time tracking gives us complete visibility into our container movements."
            </p>
            <div className="border-t pt-4">
              <p className="font-semibold">Michael Chen</p>
              <p className="text-sm text-muted-foreground">Logistics Manager, Southeast Imports LLC</p>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-6 space-y-4">
            <div className="flex items-center gap-1 text-primary">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                </svg>
              ))}
            </div>
            <p className="text-muted-foreground italic">
              "Their agricultural hauling expertise is unmatched. We've been shipping peanuts and pecans with them for 3 years without a single incident. Reliable and professional."
            </p>
            <div className="border-t pt-4">
              <p className="font-semibold">Sarah Thompson</p>
              <p className="text-sm text-muted-foreground">Operations Director, Georgia Ag Co-op</p>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-6 space-y-4">
            <div className="flex items-center gap-1 text-primary">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                </svg>
              ))}
            </div>
            <p className="text-muted-foreground italic">
              "The on-site transloading saved us thousands in per-diem charges. Their 300+ container capacity means we never worry about storage during peak season."
            </p>
            <div className="border-t pt-4">
              <p className="font-semibold">James Rodriguez</p>
              <p className="text-sm text-muted-foreground">Supply Chain VP, Charleston Manufacturing</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t bg-muted/50">
        <div className="container py-24">
          <div className="max-w-3xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground">
                Common questions about our drayage and agricultural hauling services.
              </p>
            </div>
            <div className="space-y-6">
              <div className="rounded-lg border bg-card p-6 space-y-3">
                <h3 className="text-lg font-semibold">Which ports do you serve?</h3>
                <p className="text-muted-foreground">
                  We provide direct drayage service to Port of Savannah (GA), Charleston Harbor (SC), and JAXPORT (FL). Our strategic South Georgia location enables fast turnaround times to all three major Southeast ports.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 space-y-3">
                <h3 className="text-lg font-semibold">How do I track my container?</h3>
                <p className="text-muted-foreground">
                  All containers are tracked via live GPS. You can access real-time location updates through our customer portal or receive automated status notifications via email and SMS.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 space-y-3">
                <h3 className="text-lg font-semibold">What is your container storage capacity?</h3>
                <p className="text-muted-foreground">
                  Our facility can store 300+ containers with on-site transloading capabilities. We offer both short-term (daily) and long-term storage solutions to help you avoid per-diem and demurrage charges.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 space-y-3">
                <h3 className="text-lg font-semibold">Are your drivers TWIC certified?</h3>
                <p className="text-muted-foreground">
                  Yes, all of our drivers maintain current TWIC (Transportation Worker Identification Credential) certifications required for port access. We also maintain FMCSA compliance and Truth-in-Leasing documentation for all lease-on operators.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 space-y-3">
                <h3 className="text-lg font-semibold">How quickly can you provide a quote?</h3>
                <p className="text-muted-foreground">
                  We provide same-day quotes for drayage and agricultural hauling. Submit your request online or call our 24/7 dispatch center, and we'll respond within 2-4 hours with competitive rates and available capacity.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 space-y-3">
                <h3 className="text-lg font-semibold">Do you handle refrigerated containers?</h3>
                <p className="text-muted-foreground">
                  Yes, we provide temperature-controlled drayage for refrigerated containers (reefers) with continuous monitoring and compliance documentation for perishable agricultural products.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t">
        <div className="container py-24">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Ship with Southern Haulers?
            </h2>
            <p className="text-lg text-muted-foreground">
              Get a quote today for container drayage, agricultural hauling, or warehousing services across the Southeast.
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
                href="/drivers"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
              >
                Become a Driver
              </a>
            </div>
            <div className="flex items-center justify-center gap-8 pt-4 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Same-day quotes</span>
              <span>•</span>
              <span>Competitive rates</span>
              <span>•</span>
              <span>24/7 dispatch</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}