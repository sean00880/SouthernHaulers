
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SERVICES, getServiceBySlug } from '@/data/services';
import { ArrowRight, CheckCircle2, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);
  
  if (!service) {
    return {
      title: 'Service Not Found | Southern Haulers',
    };
  }

  return {
    title: `${service.name} | Southern Haulers`,
    description: service.longDescription || service.description,
    keywords: [service.name, service.category, 'southern haulers', 'southeast logistics'],
    openGraph: {
      title: `${service.name} | Southern Haulers`,
      description: service.longDescription || service.description,
      type: 'website',
    },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-indigo-500/10 to-purple-500/10">
        <div className="container">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-background mb-6">
              <Package className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{service.category}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              {service.name}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {service.longDescription || service.description}
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg">
                <a href="/quote">
                  Get a Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="/contact">Contact Us</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold mb-8">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {service.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 rounded-lg border bg-card hover:shadow-md transition-shadow">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold mb-8">Benefits</h2>
            <div className="space-y-4">
              {service.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-4 p-6 rounded-xl bg-card border">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <div className="text-lg">{benefit}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Types */}
      {service.equipmentTypes && service.equipmentTypes.length > 0 && (
        <section className="py-20">
          <div className="container">
            <div className="max-w-4xl">
              <h2 className="text-3xl font-bold mb-8">Equipment</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {service.equipmentTypes.map((equipment, idx) => (
                  <div key={idx} className="p-4 rounded-lg border bg-card">
                    {equipment}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Pricing */}
      {service.pricing && (
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl">
              <h2 className="text-3xl font-bold mb-8">Pricing</h2>
              <div className="p-8 rounded-xl bg-card border">
                {service.pricing.baseRate && (
                  <div className="text-4xl font-bold text-primary mb-4">
                    ${service.pricing.baseRate}
                    <span className="text-lg text-muted-foreground ml-2">
                      {service.pricing.unit}
                    </span>
                  </div>
                )}
                {service.pricing.additionalFees && service.pricing.additionalFees.length > 0 && (
                  <div className="space-y-2 mt-6">
                    <h3 className="font-semibold mb-3">Additional Fees</h3>
                    {service.pricing.additionalFees.map((fee, idx) => (
                      <div key={idx} className="flex justify-between items-center py-2 border-b last:border-0">
                        <div>
                          <div className="font-medium">{fee.name}</div>
                          <div className="text-sm text-muted-foreground">{fee.description}</div>
                        </div>
                        {fee.amount && (
                          <div className="font-semibold">${fee.amount}</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl bg-gradient-to-br from-primary to-indigo-600 text-white rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 text-white/90">
              Contact us today for a customized quote for {service.name.toLowerCase()}.
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
