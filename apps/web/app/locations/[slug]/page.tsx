
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LOCATIONS, getLocationById } from '@/data/locations';
import { MapPin, Phone, Building2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export async function generateStaticParams() {
  return LOCATIONS.map((location) => ({
    slug: location.id,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const location = getLocationById(params.slug);
  
  if (!location) {
    return {
      title: 'Location Not Found | Southern Haulers',
    };
  }

  return {
    title: `${location.displayName} | Southern Haulers`,
    description: location.description || `Container drayage and hauling services in ${location.city}, ${location.state}`,
    keywords: [location.city, location.state, 'container drayage', 'logistics', 'southern haulers'],
    openGraph: {
      title: `${location.displayName} | Southern Haulers`,
      description: location.description || `Container drayage and hauling services in ${location.city}, ${location.state}`,
      type: 'website',
    },
  };
}

export default function LocationPage({ params }: { params: { slug: string } }) {
  const location = getLocationById(params.slug);

  if (!location) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-indigo-500/10 to-purple-500/10">
        <div className="container">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-background mb-6">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{location.type}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              {location.displayName}
            </h1>
            {location.description && (
              <p className="text-xl text-muted-foreground mb-8">
                {location.description}
              </p>
            )}
            <div className="flex gap-4">
              <Button asChild size="lg">
                <a href="/quote">
                  Get a Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Location Details</h2>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">City</div>
                    <div className="font-semibold">{location.city}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">State</div>
                    <div className="font-semibold">{location.state} ({location.stateCode})</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Region</div>
                    <div className="font-semibold">{location.region}</div>
                  </div>
                  {location.population && (
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Metro Population</div>
                      <div className="font-semibold">{location.population.toLocaleString()}+</div>
                    </div>
                  )}
                </div>
              </div>

              {location.distanceFromHub && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold">From Our Hub</h2>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Distance</div>
                      <div className="font-semibold">{location.distanceFromHub.miles} miles</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Transit Time</div>
                      <div className="font-semibold">{location.distanceFromHub.hours} hours</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Services Available */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Available Services</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {location.servicesAvailable.map((serviceId, idx) => (
                  <div key={idx} className="p-4 rounded-lg border bg-card flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-primary" />
                    <span className="font-medium">{serviceId.replace(/-/g, ' ')}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Major Industries */}
            {location.majorIndustries && location.majorIndustries.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold mb-6">Major Industries</h2>
                <div className="flex flex-wrap gap-3">
                  {location.majorIndustries.map((industry, idx) => (
                    <div key={idx} className="px-4 py-2 rounded-full border bg-card">
                      {industry}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl bg-gradient-to-br from-primary to-indigo-600 text-white rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Need Service in {location.city}?</h2>
            <p className="text-xl mb-8 text-white/90">
              Contact us today to discuss your logistics needs in the {location.city} area.
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
