'use client';

import { Package, Truck, Wheat, Leaf, Ship, ArrowRight } from 'lucide-react';

const services = [
  {
    id: 'bulk-transport',
    title: 'Bulk Transport',
    description:
      'Specialized bulk transportation for agricultural commodities. Our fleet is equipped with hopper bottoms, walk-in floors, and specialized trailers for efficient loading and unloading.',
    icon: Truck,
    features: ['Hopper Bottoms', 'Walk-in Floors', 'High Capacity', 'Commodity Expertise'],
    link: '/services/bulk-transport',
  },
  {
    id: 'container-drayage',
    title: 'Container Drayage',
    description:
      'Port-to-door and door-to-port container transport serving all major Southeast terminals. Live GPS tracking, automated appointment scheduling, and real-time container status updates.',
    icon: Package,
    features: ['8 Terminal Coverage', 'Real-time Tracking', 'LFD Monitoring', 'TWIC Certified'],
    link: '/services/drayage',
  },
  {
    id: 'flatbed',
    title: 'Flatbed',
    description:
      'Heavy-duty flatbed services for oversized and specialized cargo. Experienced drivers and specialized equipment for secure transportation of agricultural and industrial equipment.',
    icon: Ship,
    features: ['Oversized Loads', 'Secure Strapping', 'Heavy Equipment', 'Farm Machinery'],
    link: '/services/flatbed',
  },
  {
    id: 'otrd-trucking',
    title: 'Over the Road (Dryvan) Trucking',
    description:
      'Full-service dry van trucking for long-haul and regional freight. Modern fleet with real-time visibility and professional drivers for reliable on-time delivery.',
    icon: Truck,
    features: ['Regional & Long-haul', '53\' Dry Vans', 'Dedicated Lanes', 'Real-time Updates'],
    link: '/services/dryvan',
  },
  {
    id: 'agricultural-bulk',
    title: 'Agricultural (in Bulk)',
    description:
      'Specialized bulk agricultural hauling for the Southeast farming industry. Expertise in handling peanuts, cotton seed, pecans, feed, and fertilizer with specialized equipment.',
    icon: Wheat,
    features: ['Cotton Seed', 'Peanuts', 'Hopper Bottoms', 'Walk-in Floors'],
    link: '/services/agricultural',
    highlight: true,
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="border-t container py-24">
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Comprehensive Transportation Solutions
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
          Specialized drayage, agricultural hauling, and over-the-road trucking services across the Southeastern United States.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.id}
              className={`group rounded-lg border bg-card p-6 space-y-4 transition-all card-depth ${
                service.highlight ? 'border-primary/50' : ''
              }`}
            >
              {/* Icon and Title */}
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center transition-all group-hover:bg-primary/20">
                  <Icon className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
                </div>
                {service.highlight && (
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">
                    Featured
                  </span>
                )}
              </div>

              {/* Title and Description */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-2">
                {service.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-2 py-1 text-xs font-medium rounded-md bg-muted text-muted-foreground"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Learn More Link */}
              <a
                href={service.link}
                className="inline-flex items-center gap-1 text-sm text-primary hover:underline font-medium mt-4 group-hover:gap-2 transition-all"
              >
                Learn more <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          );
        })}
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <div className="inline-flex flex-col sm:flex-row gap-4">
          <a
            href="/quote"
            className="inline-flex items-center justify-center rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 button-depth h-11 px-8"
          >
            Request Service Quote
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
          <a
            href="/services"
            className="inline-flex items-center justify-center rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
          >
            View All Services
          </a>
        </div>
      </div>
    </section>
  );
}
