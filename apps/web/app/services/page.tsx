
import { Metadata } from 'next';
import { SERVICES } from '@/data/services';
import { ServicesSectionEnhanced } from '@/components/sections/services-section-enhanced';
import { ArrowRight, Ship } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Services | Southern Haulers - Container Drayage & Agricultural Hauling',
  description: 'Comprehensive drayage, agricultural hauling, warehousing, and specialized transportation services across the Southeast.',
  keywords: ['container drayage', 'agricultural hauling', 'warehousing', 'transloading', 'port drayage'],
  openGraph: {
    title: 'Our Services | Southern Haulers',
    description: 'Comprehensive drayage, agricultural hauling, warehousing, and specialized transportation services.',
    type: 'website',
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-indigo-500/10 to-purple-500/10">
        <div className="container">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-background mb-6">
              <Ship className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Our Services</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Comprehensive Logistics Solutions
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              From port to door, we handle every aspect of your supply chain with expertise, technology, and care.
            </p>
            <Button asChild size="lg">
              <a href="/quote">
                Get a Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSectionEnhanced services={SERVICES} />
    </div>
  );
}
