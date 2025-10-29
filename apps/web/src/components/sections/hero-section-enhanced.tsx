
'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { ArrowRight, Package, CheckCircle2, Truck } from 'lucide-react';
import { Button } from '../ui/button';

export function HeroSectionEnhanced() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = currentTheme === 'dark';
  const truckSrc = isDark ? '/images/truckwireframe.png' : '/images/truckwireframe_light.png';

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden w-full">
      {/* Animated Background - Seamless gradient to next section */}
      <div className="absolute inset-0 z-0 w-full">
        {/* Base gradient fading to background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Radial Gradient for Depth - fades to transparent at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

        {/* Subtle animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Theme-aware Truck Wireframe Overlay */}
      {mounted && (
        <div className="absolute right-0 bottom-0 translate-y-1/4 lg:top-1/3 lg:bottom-auto lg:-translate-y-1/2 w-1/2 h-full opacity-[0.08] dark:opacity-[0.12] pointer-events-none">
          <Image
            src={truckSrc}
            alt=""
            fill
            className="object-contain object-right object-bottom lg:object-center"
            priority
          />
        </div>
      )}

      {/* Content */}
      <div className="w-full relative z-20">
        <div className="container max-w-4xl">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-card/50 backdrop-blur-sm mb-8 animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            <Package className="h-4 w-4 text-primary" />
            <span className="text-body-small font-extralight">Premier Southeast Drayage & Agricultural Hauling</span>
          </div>

          {/* Main Headline with shimmer effect */}
          <h1
            className="text-display font-extralight spacing-content animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="block">Container Drayage</span>
            <span className="block mt-2">
              <span className="relative inline-block">
                <span className="text-foreground">Made Simple</span>
                <span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/30 to-transparent bg-[length:200%_100%] animate-shimmer"
                  aria-hidden="true"
                  style={{
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 50%, transparent 100%)',
                    maskImage: 'linear-gradient(to right, transparent 0%, black 50%, transparent 100%)'
                  }}
                />
              </span>
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className="text-body-large text-muted-foreground spacing-content max-w-3xl animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            Strategic Southeast hub with <span className="font-extralight text-foreground">300+ container capacity</span>, 
            real-time GPS tracking, and direct service to <span className="font-extralight text-foreground">9 major ports and terminals</span>.
          </p>

          {/* Key Features Grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mb-6 md:mb-8 animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            <div className="flex items-center gap-2 md:gap-3 p-2.5 md:p-4 rounded-xl bg-card/50 backdrop-blur-sm border">
              <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg bg-[hsl(217,89%,61%)]/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-[hsl(217,89%,61%)]" />
              </div>
              <div>
                <div className="text-sm md:text-body font-extralight">98.5% On-Time</div>
                <div className="text-xs md:text-body-small text-muted-foreground">Delivery Rate</div>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-3 p-2.5 md:p-4 rounded-xl bg-card/50 backdrop-blur-sm border">
              <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg bg-[hsl(4,90%,58%)]/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-[hsl(4,90%,58%)]" />
              </div>
              <div>
                <div className="text-sm md:text-body font-extralight">24/7 Dispatch</div>
                <div className="text-xs md:text-body-small text-muted-foreground">Always Available</div>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-3 p-2.5 md:p-4 rounded-xl bg-card/50 backdrop-blur-sm border">
              <div className="h-8 w-8 md:h-10 md:w-10 rounded-lg bg-[hsl(142,66%,48%)]/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-[hsl(142,66%,48%)]" />
              </div>
              <div>
                <div className="text-sm md:text-body font-extralight">TWIC Certified</div>
                <div className="text-xs md:text-body-small text-muted-foreground">Port Access</div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div 
            className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in-up"
            style={{ animationDelay: '0.5s' }}
          >
            <Button size="lg" asChild className="text-base h-12 px-8 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              <a href="/quote">
                Get Instant Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base h-12 px-8">
              <a href="/track">
                Track Container
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base h-12 px-8">
              <a href="/contact">
                Contact 24/7 Dispatch
              </a>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div 
            className="flex flex-wrap items-center gap-6 text-sm animate-fade-in-up"
            style={{ animationDelay: '0.6s' }}
          >
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Same-day quotes</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-secondary" />
              <span className="text-muted-foreground">Real-time GPS tracking</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[hsl(4,90%,58%)]" />
              <span className="text-muted-foreground">FMCSA compliant</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
