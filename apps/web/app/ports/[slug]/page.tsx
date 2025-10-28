
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PORTS, getPortById } from '@/data/ports';
import { Ship, Building2, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export async function generateStaticParams() {
  return PORTS.map((port) => ({
    slug: port.id,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const port = getPortById(params.slug);
  
  if (!port) {
    return {
      title: 'Port Not Found | Southern Haulers',
    };
  }

  return {
    title: `${port.name} | Southern Haulers`,
    description: port.description,
    keywords: [port.name, port.city, 'port drayage', 'container transport', 'southern haulers'],
    openGraph: {
      title: `${port.name} | Southern Haulers`,
      description: port.description,
      type: 'website',
    },
  };
}

export default function PortPage({ params }: { params: { slug: string } }) {
  const port = getPortById(params.slug);

  if (!port) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-indigo-500/10 to-purple-500/10">
        <div className="container">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-background mb-6">
              <Ship className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Rank #{port.rank} US Port</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              {port.name}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {port.description}
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg">
                <a href="/quote">
                  Get Port Drayage Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Port Stats */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="p-6 rounded-xl border bg-card">
                <div className="text-3xl font-bold text-primary mb-2">
                  {(port.annualTeuHandling / 1000000).toFixed(1)}M+
                </div>
                <div className="text-sm text-muted-foreground">Annual TEUs</div>
              </div>
              <div className="p-6 rounded-xl border bg-card">
                <div className="text-3xl font-bold text-primary mb-2">
                  {port.distanceFromHub?.miles} mi
                </div>
                <div className="text-sm text-muted-foreground">From Our Hub</div>
              </div>
              <div className="p-6 rounded-xl border bg-card">
                <div className="text-3xl font-bold text-primary mb-2">
                  {port.averageWaitTime}
                </div>
                <div className="text-sm text-muted-foreground">Avg Wait Time</div>
              </div>
            </div>

            {/* Operational Details */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Operational Details</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 rounded-lg border bg-card">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold">Operating Hours</div>
                    <div className="text-sm text-muted-foreground">{port.operationalHours}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-lg border bg-card">
                  <Building2 className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold">Terminals</div>
                    <div className="text-sm text-muted-foreground">{port.terminals.length} terminals served</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Terminals */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Terminals We Serve</h2>
              <div className="space-y-6">
                {port.terminals.map((terminal) => (
                  <div key={terminal.id} className="p-6 rounded-xl border bg-card">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-1">{terminal.name}</h3>
                        <p className="text-muted-foreground">{terminal.location}</p>
                        {terminal.operator && (
                          <p className="text-sm text-muted-foreground mt-1">
                            Operated by {terminal.operator}
                          </p>
                        )}
                      </div>
                      <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {terminal.code}
                      </div>
                    </div>
                    {terminal.description && (
                      <p className="text-muted-foreground mb-4">{terminal.description}</p>
                    )}
                    {terminal.features && terminal.features.length > 0 && (
                      <div className="space-y-2">
                        {terminal.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Port Features</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {port.features.map((feature, idx) => (
                  <div key={idx} className="p-4 rounded-lg border bg-card">
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl bg-gradient-to-br from-primary to-indigo-600 text-white rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Need Drayage from {port.name}?</h2>
            <p className="text-xl mb-8 text-white/90">
              We provide direct service to all terminals at {port.name} with real-time tracking and same-day quotes.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                <a href="/quote">
                  Get a Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <a href="/contact">Contact Us</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
