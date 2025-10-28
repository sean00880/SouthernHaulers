
import { Metadata } from 'next';
import { LOCATIONS, getAllCities } from '@/data/locations';
import { LocationsPortsSection } from '@/components/sections/locations-ports-section';
import { PORTS } from '@/data/ports';
import { MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Service Locations | Southern Haulers',
  description: 'We serve major cities across Georgia, South Carolina, and Florida with comprehensive drayage and hauling services.',
  keywords: ['service locations', 'coverage area', 'southeast logistics', 'drayage services'],
  openGraph: {
    title: 'Service Locations | Southern Haulers',
    description: 'We serve major cities across Georgia, South Carolina, and Florida.',
    type: 'website',
  },
};

export default function LocationsPage() {
  const cities = getAllCities();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-indigo-500/10 to-purple-500/10">
        <div className="container">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-background mb-6">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Service Coverage</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Southeast Service Locations
            </h1>
            <p className="text-xl text-muted-foreground">
              Strategic hub location providing comprehensive coverage across Georgia, South Carolina, and Florida.
            </p>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <LocationsPortsSection ports={PORTS} locations={cities} />
    </div>
  );
}
