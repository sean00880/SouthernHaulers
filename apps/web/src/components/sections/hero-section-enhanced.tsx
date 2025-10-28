
'use client';

import { useState } from 'react';
import { ArrowRight, Package, CheckCircle2, Truck } from 'lucide-react';
import { Button } from '../ui/button';

export function HeroSectionEnhanced() {
  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden pt-16">
      {/* Animated Background with Google Colors */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient with Google colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-[hsl(217,89%,61%)]/5 to-[hsl(142,66%,48%)]/5 dark:from-background dark:via-[hsl(217,89%,61%)]/10 dark:to-[hsl(142,66%,48%)]/10" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Radial Gradient for Depth */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/80" />
        
        {/* Animated gradient orbs - Google colors */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[hsl(217,89%,61%)]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[hsl(142,66%,48%)]/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Truck SVG Overlay */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full opacity-5 dark:opacity-10 pointer-events-none">
        <svg viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Semi-truck illustration */}
          <g opacity="0.4">
            {/* Trailer */}
            <rect x="50" y="150" width="400" height="180" rx="8" fill="currentColor" className="text-primary" />
            <rect x="60" y="160" width="380" height="160" rx="4" fill="currentColor" className="text-background" />
            
            {/* Cab */}
            <path d="M450 150 L550 150 L580 200 L580 330 L450 330 Z" fill="currentColor" className="text-primary" />
            <rect x="480" y="180" width="70" height="50" rx="4" fill="currentColor" className="text-background" />
            
            {/* Wheels */}
            <circle cx="120" cy="330" r="30" fill="currentColor" className="text-foreground" />
            <circle cx="120" cy="330" r="15" fill="currentColor" className="text-background" />
            <circle cx="380" cy="330" r="30" fill="currentColor" className="text-foreground" />
            <circle cx="380" cy="330" r="15" fill="currentColor" className="text-background" />
            <circle cx="520" cy="330" r="30" fill="currentColor" className="text-foreground" />
            <circle cx="520" cy="330" r="15" fill="currentColor" className="text-background" />
            
            {/* Details */}
            <line x1="100" y1="200" x2="400" y2="200" stroke="currentColor" strokeWidth="2" className="text-primary/30" />
            <line x1="100" y1="250" x2="400" y2="250" stroke="currentColor" strokeWidth="2" className="text-primary/30" />
          </g>
        </svg>
      </div>

      {/* Content */}
      <div className="container relative z-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-card/50 backdrop-blur-sm mb-8 animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            <Package className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Premier Southeast Drayage & Agricultural Hauling</span>
          </div>

          {/* Main Headline with Google colors accent */}
          <h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="block">Container Drayage</span>
            <span className="block mt-2">
              <span className="bg-gradient-to-r from-[hsl(217,89%,61%)] via-[hsl(4,90%,58%)] to-[hsl(142,66%,48%)] bg-clip-text text-transparent">
                Made Simple
              </span>
            </span>
          </h1>

          {/* Subheadline */}
          <p 
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            Strategic Southeast hub with <span className="font-semibold text-foreground">300+ container capacity</span>, 
            real-time GPS tracking, and direct service to <span className="font-semibold text-foreground">9 major ports and terminals</span>.
          </p>

          {/* Key Features Grid */}
          <div 
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            <div className="flex items-center gap-3 p-4 rounded-xl bg-card/50 backdrop-blur-sm border">
              <div className="h-10 w-10 rounded-lg bg-[hsl(217,89%,61%)]/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="h-5 w-5 text-[hsl(217,89%,61%)]" />
              </div>
              <div>
                <div className="font-semibold">98.5% On-Time</div>
                <div className="text-sm text-muted-foreground">Delivery Rate</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 rounded-xl bg-card/50 backdrop-blur-sm border">
              <div className="h-10 w-10 rounded-lg bg-[hsl(4,90%,58%)]/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="h-5 w-5 text-[hsl(4,90%,58%)]" />
              </div>
              <div>
                <div className="font-semibold">24/7 Dispatch</div>
                <div className="text-sm text-muted-foreground">Always Available</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 rounded-xl bg-card/50 backdrop-blur-sm border">
              <div className="h-10 w-10 rounded-lg bg-[hsl(142,66%,48%)]/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="h-5 w-5 text-[hsl(142,66%,48%)]" />
              </div>
              <div>
                <div className="font-semibold">TWIC Certified</div>
                <div className="text-sm text-muted-foreground">Port Access</div>
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
