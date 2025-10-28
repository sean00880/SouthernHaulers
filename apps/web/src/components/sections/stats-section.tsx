
'use client';

import { useEffect, useRef, useState } from 'react';
import { Stat } from '@/data/stats';
import { TrendingUp, Package, Ship, MapPin, Clock } from 'lucide-react';

interface StatsSectionProps {
  stats: Stat[];
}

export function StatsSection({ stats }: StatsSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Featured stats for display
  const featuredStats = stats.filter(s => s.featured).slice(0, 4);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'TrendingUp':
        return TrendingUp;
      case 'Package':
      case 'Archive':
        return Package;
      case 'Ship':
        return Ship;
      case 'MapPin':
        return MapPin;
      case 'Clock':
        return Clock;
      default:
        return Package;
    }
  };

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-gradient-to-br from-primary/5 via-indigo-500/5 to-purple-500/5">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-background mb-6">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">By The Numbers</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Trusted by Southeast Shippers
          </h2>
          <p className="text-xl text-muted-foreground">
            Industry-leading performance backed by years of experience and thousands of successful shipments.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredStats.map((stat, index) => {
            const Icon = getIcon(stat.icon);
            return (
              <div
                key={stat.id}
                className="group relative bg-card border rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Icon */}
                <div className="relative mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                    <Icon className="h-7 w-7" />
                  </div>
                </div>

                {/* Counter */}
                <div className="relative mb-3">
                  {isVisible && (
                    <AnimatedCounter
                      value={stat.value.toString()}
                      className="text-5xl font-bold text-primary"
                    />
                  )}
                </div>

                {/* Label */}
                <div className="relative text-sm text-muted-foreground font-medium mb-2">
                  {stat.label}
                </div>

                {/* Description */}
                {stat.description && (
                  <p className="relative text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                )}

                {/* Trend Indicator */}
                {stat.trend && (
                  <div className={`relative mt-4 pt-4 border-t flex items-center gap-2 text-xs ${
                    stat.trend.direction === 'up' ? 'text-green-600 dark:text-green-400' :
                    stat.trend.direction === 'down' ? 'text-red-600 dark:text-red-400' :
                    'text-muted-foreground'
                  }`}>
                    <TrendingUp className={`h-3 w-3 ${
                      stat.trend.direction === 'down' ? 'rotate-180' : ''
                    }`} />
                    <span>{stat.trend.value} {stat.trend.period}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 p-8 bg-card border rounded-2xl text-center">
          <p className="text-lg text-muted-foreground mb-4">
            Join <span className="font-bold text-foreground">hundreds of satisfied customers</span> who trust Southern Haulers for their drayage and hauling needs.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            <div>
              <span className="text-2xl font-bold text-primary">15+</span>
              <span className="text-muted-foreground ml-2">Years Experience</span>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <span className="text-2xl font-bold text-primary">94%</span>
              <span className="text-muted-foreground ml-2">Customer Retention</span>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <span className="text-2xl font-bold text-primary">4.9/5</span>
              <span className="text-muted-foreground ml-2">Customer Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Animated Counter Component
function AnimatedCounter({ value, className }: { value: string; className?: string }) {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/\D/g, '')) || 0;
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [numericValue]);

  return (
    <div className={className}>
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}
