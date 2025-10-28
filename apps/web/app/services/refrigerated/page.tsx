import { Metadata } from 'next';
import { ArrowRight, Thermometer, CheckCircle2, Container, TrendingDown, Bell, FileCheck, Shield, Clock, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Refrigerated Transport Services | Southern Haulers',
  description: 'Temperature-controlled drayage for refrigerated containers. Perishable agricultural products with continuous monitoring, FSMA compliance, and cold chain documentation.',
};

export default function RefrigeratedPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative border-b">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="container relative">
          <div className="flex flex-col items-center justify-center space-y-8 py-24 md:py-32 text-center">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
              <Thermometer className="mr-2 h-4 w-4 text-primary" />
              <span className="font-medium">Refrigerated Transport Solutions</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl">
              Temperature-Controlled{' '}
              <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                Cold Chain
              </span>
              {' '}Drayage & Transport
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Refrigerated container drayage with continuous temperature monitoring, FSMA compliance, and cold chain documentation. Specialized handling for perishable agricultural products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/quote"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
              >
                Get Reefer Quote
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
            Why Choose Southern Haulers for Refrigerated Transport?
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Cold chain expertise with agricultural perishables experience and comprehensive temperature monitoring.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card p-6 space-y-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Thermometer className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Continuous Temperature Monitoring</h3>
            <p className="text-muted-foreground">
              Real-time temperature tracking with automated alerts for excursions. GPS-enabled temperature loggers on all refrigerated loads.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 space-y-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Container className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Reefer Container Drayage</h3>
            <p className="text-muted-foreground">
              Port-to-door and door-to-port refrigerated container transport. Genset-equipped chassis for extended cold chain holds.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 space-y-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileCheck className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">FSMA Compliance</h3>
            <p className="text-muted-foreground">
              Food Safety Modernization Act compliant transport with documented sanitation and temperature controls for perishable agricultural products.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 space-y-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Bell className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Temperature Excursion Alerts</h3>
            <p className="text-muted-foreground">
              Automated notifications for temperature deviations. Immediate response protocols to protect perishable cargo integrity.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 space-y-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Cold Chain Documentation</h3>
            <p className="text-muted-foreground">
              Complete temperature logs, pre-trip inspections, and sanitation certificates. Audit-ready documentation for regulatory compliance.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6 space-y-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Time-Sensitive Priority</h3>
            <p className="text-muted-foreground">
              Expedited handling for perishables. Pre-cleared terminal appointments and fast-track delivery to minimize cold chain dwell time.
            </p>
          </div>
        </div>
      </section>

      {/* Temperature Ranges */}
      <section className="border-t bg-muted/50">
        <div className="container py-24">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Temperature-Controlled Capabilities
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              Refrigerated and frozen transport across the full cold chain spectrum.
            </p>
          </div>
          <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border-2 border-primary bg-card p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Thermometer className="h-8 w-8 text-primary" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-semibold">Chilled</h3>
                <div className="text-4xl font-bold text-primary">34-40°F</div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Fresh produce</p>
                  <p>Dairy products</p>
                  <p>Fresh meats</p>
                  <p>Cut flowers</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border-2 border-blue-500 bg-card p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto">
                <TrendingDown className="h-8 w-8 text-blue-500" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-semibold">Frozen</h3>
                <div className="text-4xl font-bold text-blue-500">-10 to 0°F</div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Frozen vegetables</p>
                  <p>Frozen meats</p>
                  <p>Ice cream</p>
                  <p>Frozen seafood</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg border-2 border-cyan-500 bg-card p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center mx-auto">
                <AlertTriangle className="h-8 w-8 text-cyan-500" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-semibold">Deep Frozen</h3>
                <div className="text-4xl font-bold text-cyan-500">-20°F+</div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Pharmaceuticals</p>
                  <p>Biomedical</p>
                  <p>Long-term frozen</p>
                  <p>Specialty products</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="container py-24">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              Comprehensive Refrigerated Transport Services
            </h2>
            <p className="text-lg text-muted-foreground">
              End-to-end cold chain management for perishable agricultural products and temperature-sensitive freight.
            </p>
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <h3 className="text-2xl font-semibold">Refrigerated Container Drayage</h3>
              <p className="text-muted-foreground">
                Port-to-door and door-to-port reefer container transport with continuous power and temperature monitoring from origin to destination.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Genset-equipped chassis for reefer container power</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Pre-trip container inspection (PTI) verification before pickup</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>GPS-enabled temperature monitoring throughout transport</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Fuel surcharge transparency for genset diesel consumption</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-semibold">Cold Chain Storage & Transloading</h3>
              <p className="text-muted-foreground">
                Refrigerated container storage with genset power hookups. Transloading from reefer containers to refrigerated trucks for regional distribution.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Genset power provisioning during container storage</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Cold room devanning to maintain unbroken cold chain</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Palletization and stretch-wrapping in temperature-controlled environment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Direct loading to refrigerated LTL or FTL carriers</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-semibold">Agricultural Perishables Expertise</h3>
              <p className="text-muted-foreground">
                Specialized handling for Southeast agricultural perishables including produce, pecans, seafood, and poultry products.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Fresh produce transport (berries, vegetables, melons)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Pecan transport with controlled atmosphere for shelf life extension</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Seafood and poultry transport with strict temperature control</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Dairy product transport with validated cold chain procedures</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-semibold">Temperature Monitoring & Documentation</h3>
              <p className="text-muted-foreground">
                Real-time temperature tracking with comprehensive documentation for FSMA compliance and customer quality assurance programs.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>GPS-enabled temperature data loggers on all loads</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Automated email/SMS alerts for temperature excursions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Downloadable temperature reports with timestamp and geolocation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Pre-trip and post-trip inspection documentation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FSMA Compliance */}
      <section className="border-t bg-muted/50">
        <div className="container py-24">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                FSMA Compliance & Food Safety
              </h2>
              <p className="text-lg text-muted-foreground">
                Full compliance with FDA Food Safety Modernization Act requirements for temperature-controlled transport of perishable foods.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border bg-card p-6 space-y-3">
                <div className="flex items-start gap-3">
                  <FileCheck className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div className="space-y-2">
                    <h3 className="font-semibold">Sanitary Transportation Rule</h3>
                    <p className="text-sm text-muted-foreground">
                      Documented sanitation procedures, temperature controls, and vehicle maintenance records in compliance with 21 CFR Part 1.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border bg-card p-6 space-y-3">
                <div className="flex items-start gap-3">
                  <Shield className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div className="space-y-2">
                    <h3 className="font-semibold">Preventive Controls</h3>
                    <p className="text-sm text-muted-foreground">
                      Hazard analysis and risk-based preventive controls for cold chain integrity, cross-contamination prevention, and allergen management.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border bg-card p-6 space-y-3">
                <div className="flex items-start gap-3">
                  <Thermometer className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div className="space-y-2">
                    <h3 className="font-semibold">Temperature Control Plan</h3>
                    <p className="text-sm text-muted-foreground">
                      Written procedures for temperature monitoring, excursion response, and corrective actions. Calibrated monitoring equipment with certificates.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border bg-card p-6 space-y-3">
                <div className="flex items-start gap-3">
                  <FileCheck className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div className="space-y-2">
                    <h3 className="font-semibold">Traceability & Records</h3>
                    <p className="text-sm text-muted-foreground">
                      Complete shipment records, BOLs with temperature requirements, and chain of custody documentation for regulatory audits and recalls.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment & Technology */}
      <section className="container py-24">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Cold Chain Technology
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Advanced equipment and monitoring technology to ensure unbroken cold chain integrity.
          </p>
        </div>
        <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
          <div className="rounded-lg border bg-card p-6 space-y-4">
            <h3 className="text-xl font-semibold">Genset-Equipped Chassis</h3>
            <p className="text-muted-foreground">
              Dedicated chassis with integrated generators to power refrigerated containers during transport and storage.
            </p>
            <div className="text-sm text-muted-foreground space-y-1">
              <p><strong className="text-foreground">Power:</strong> Continuous refrigeration power during drayage</p>
              <p><strong className="text-foreground">Fuel:</strong> Diesel genset with monitored consumption</p>
              <p><strong className="text-foreground">Capacity:</strong> 20ft and 40ft reefer containers</p>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-6 space-y-4">
            <h3 className="text-xl font-semibold">GPS Temperature Loggers</h3>
            <p className="text-muted-foreground">
              Real-time GPS-enabled temperature data loggers with cloud-based monitoring and automated alert notifications.
            </p>
            <div className="text-sm text-muted-foreground space-y-1">
              <p><strong className="text-foreground">Monitoring:</strong> Real-time temperature and geolocation</p>
              <p><strong className="text-foreground">Alerts:</strong> Automated SMS/email for excursions</p>
              <p><strong className="text-foreground">Reports:</strong> Downloadable logs with timestamp data</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-muted/50">
        <div className="container py-24">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Protect Your Perishable Cargo?
            </h2>
            <p className="text-lg text-muted-foreground">
              Get a same-day quote for temperature-controlled drayage and transport. FSMA compliant with continuous cold chain monitoring.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/quote"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
              >
                Get Reefer Quote
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
              <Thermometer className="h-4 w-4" />
              <span>FSMA compliant</span>
              <span>•</span>
              <span>Continuous monitoring</span>
              <span>•</span>
              <span>Cold chain integrity</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
