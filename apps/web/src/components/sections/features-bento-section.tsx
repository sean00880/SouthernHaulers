
'use client';

import { Feature } from '@/data/features';
import { Clock, MapPin, Shield, Zap, Package, RefreshCw, Users, Award } from 'lucide-react';

interface FeaturesBentoSectionProps {
  features: Feature[];
}

export function FeaturesBentoSection({ features }: FeaturesBentoSectionProps) {
  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'MapPin':
        return MapPin;
      case 'Clock':
        return Clock;
      case 'Shield':
        return Shield;
      case 'Package':
        return Package;
      case 'Zap':
        return Zap;
      case 'RefreshCw':
        return RefreshCw;
      case 'Users':
        return Users;
      case 'Award':
        return Award;
      default:
        return Package;
    }
  };

  // Select highlighted features for bento grid
  const highlightedFeatures = features.filter(f => f.highlighted).slice(0, 6);
  
  return (
    <section className="min-h-screen flex items-center py-24 md:py-32">
      <div className="container w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-primary/5 mb-6">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Why Choose Us</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Advanced Features & Capabilities
          </h2>
          <p className="text-xl text-muted-foreground">
            State-of-the-art technology and operational excellence powering your supply chain.
          </p>
        </div>

        {/* Bento Grid - Asymmetric Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Large Feature Card - Top Left */}
          {highlightedFeatures[0] && (
            <div className="lg:col-span-2 lg:row-span-2 group relative bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 border rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6 group-hover:scale-110 transition-transform">
                  {(() => {
                    const Icon = getIcon(highlightedFeatures[0].icon);
                    return <Icon className="h-8 w-8" />;
                  })()}
                </div>

                {/* Content */}
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  {highlightedFeatures[0].name}
                </h3>
                <p className="text-muted-foreground mb-6 text-lg">
                  {highlightedFeatures[0].description}
                </p>

                {/* Details List */}
                <ul className="space-y-3">
                  {highlightedFeatures[0].details.slice(0, 4).map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <div className="mt-0.5 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      </div>
                      <span className="text-muted-foreground">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Medium Feature Cards */}
          {highlightedFeatures.slice(1, 3).map((feature, index) => {
            const Icon = getIcon(feature.icon);
            return (
              <div
                key={feature.id}
                className="group bg-card border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="h-6 w-6" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3">{feature.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {feature.description}
                </p>

                {/* Benefits */}
                <div className="space-y-2">
                  {feature.benefits.slice(0, 2).map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <div className="mt-1 h-1 w-1 rounded-full bg-primary flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Small Feature Cards */}
          {highlightedFeatures.slice(3, 6).map((feature) => {
            const Icon = getIcon(feature.icon);
            return (
              <div
                key={feature.id}
                className="group bg-card border rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="h-6 w-6" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold mb-2">{feature.shortName}</h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Stats Bar */}
        <div className="grid md:grid-cols-4 gap-6 mt-12 p-8 bg-muted/30 rounded-2xl border">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">100%</div>
            <div className="text-sm text-muted-foreground">TWIC Certified</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Dispatch Support</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">15 min</div>
            <div className="text-sm text-muted-foreground">GPS Updates</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">98.5%</div>
            <div className="text-sm text-muted-foreground">On-Time Delivery</div>
          </div>
        </div>
      </div>
    </section>
  );
}
