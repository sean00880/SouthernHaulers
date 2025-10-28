
import { Metadata } from 'next';
import { PORTS } from '@/data/ports';
import { LocationsPortsSection } from '@/components/sections/locations-ports-section';
import { LOCATIONS } from '@/data/locations';
import { Ship } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ports We Serve | Southern Haulers',
  description: 'Direct container drayage service to Port of Savannah, Charleston Harbor, and JAXPORT with 2-4 hour turnaround times.',
  keywords: ['port drayage', 'port of savannah', 'charleston harbor', 'jaxport', 'container transport'],
  openGraph: {
    title: 'Ports We Serve | Southern Haulers',
    description: 'Direct container drayage service to three major Southeast ports.',
    type: 'website',
  },
};

export default function PortsPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-indigo-500/10 to-purple-500/10">
        <div className="container">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-background mb-6">
              <Ship className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Port Coverage</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Southeast Port Coverage
            </h1>
            <p className="text-xl text-muted-foreground">
              Direct service to three major Southeast ports handling 10M+ TEUs annually. Strategic hub location enables 2-4 hour turnaround times.
            </p>
          </div>
        </div>
      </section>

      {/* Ports Section */}
      <LocationsPortsSection ports={PORTS} locations={LOCATIONS} />
    </div>
  );
}
