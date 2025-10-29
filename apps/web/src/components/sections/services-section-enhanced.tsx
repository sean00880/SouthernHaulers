
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Ship, Truck, Warehouse, Zap, Package } from 'lucide-react';
import { Service } from '@/data/services';
import { Button } from '../ui/button';

interface ServicesSectionProps {
  services: Service[];
}

export function ServicesSectionEnhanced({ services }: ServicesSectionProps) {
  const [activeService, setActiveService] = useState<string | null>(null);

  // Featured services for alternating layout
  const featuredServices = services.slice(0, 4);

  const getServiceIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Ship':
        return Ship;
      case 'Truck':
        return Truck;
      case 'Warehouse':
        return Warehouse;
      case 'Zap':
        return Zap;
      default:
        return Package;
    }
  };

  return (
    <section className="min-h-screen flex items-center py-24 md:py-32">
      <div className="container w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-primary/5 mb-6">
            <Ship className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Our Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Comprehensive Drayage & Logistics Solutions
          </h2>
          <p className="text-xl text-muted-foreground">
            From port to door, we handle every aspect of your container transport with precision and care.
          </p>
        </div>

        {/* Alternating Service Cards */}
        <div className="space-y-24">
          {featuredServices.map((service, index) => {
            const Icon = getServiceIcon(service.icon);
            const isReversed = index % 2 === 1;

            return (
              <div
                key={service.id}
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  isReversed ? 'md:grid-flow-dense' : ''
                }`}
              >
                {/* Content Side */}
                <div className={`space-y-6 ${isReversed ? 'md:col-start-2' : ''}`}>
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-8 w-8" />
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
                    {service.name}
                  </h3>

                  {/* Description */}
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {service.longDescription || service.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3">
                    {service.features.slice(0, 4).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="mt-1 flex-shrink-0">
                          <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                            <ArrowRight className="h-3 w-3 text-primary" />
                          </div>
                        </div>
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="pt-4">
                    <Button asChild size="lg">
                      <a href={`/services/${service.slug}`}>
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Image Side */}
                <div className={`relative ${isReversed ? 'md:col-start-1 md:row-start-1' : ''}`}>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border shadow-2xl">
                    {/* Service Images */}
                    <Image
                      src={
                        service.id === 'container-drayage' 
                          ? 'https://images.unsplash.com/photo-1678182451047-196f22a4143e?w=1200&q=80'
                          : service.id === 'agricultural-hauling'
                          ? 'https://images.pexels.com/photos/31226932/pexels-photo-31226932.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80'
                          : service.id === 'warehousing'
                          ? 'https://plus.unsplash.com/premium_photo-1681426728047-2164a00fe3dc?w=1200&q=80'
                          : 'https://images.pexels.com/photos/6563903/pexels-photo-6563903.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80'
                      }
                      alt={service.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-background/10 via-transparent to-background/10" />

                    {/* Overlay badge */}
                    <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-background/90 backdrop-blur-sm border shadow-lg">
                      <span className="text-sm font-semibold">{service.shortName}</span>
                    </div>
                  </div>

                  {/* Floating Stats */}
                  <div className="absolute -bottom-6 -right-6 bg-card border rounded-xl p-4 shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">24/7</div>
                        <div className="text-sm text-muted-foreground">Available</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Services CTA */}
        <div className="text-center mt-20">
          <Button asChild size="lg" variant="outline">
            <a href="/services">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
