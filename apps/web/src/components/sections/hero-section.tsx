
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight, Search, Package, MapPin, Clock, CheckCircle2, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface HeroSectionProps {
  variant?: 'default' | 'minimal';
}

export function HeroSection({ variant = 'default' }: HeroSectionProps) {
  const [containerNumber, setContainerNumber] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTrackContainer = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    window.location.href = `/track?container=${containerNumber}`;
  };

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with Parallax Effect */}
      <div 
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-indigo-600/20 to-purple-600/20 dark:from-blue-900/40 dark:via-indigo-900/40 dark:to-purple-900/40 z-10" />
        
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-blue-50/30 to-indigo-50/30 dark:from-background dark:via-blue-950/30 dark:to-indigo-950/30 animate-gradient" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Radial Gradient for Depth */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/80" />
      </div>

      {/* Content */}
      <div className="container relative z-20">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-card/50 backdrop-blur-sm mb-8 animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            <Package className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Premier Southeast Drayage & Agricultural Hauling</span>
          </div>

          {/* Main Headline */}
          <h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            Container <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">Drayage</span>
            <br />
            Made Simple
          </h1>

          {/* Subheadline */}
          <p 
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            Strategic Southeast hub with <span className="font-semibold text-foreground">300+ container capacity</span>, real-time GPS tracking, and direct service to Savannah, Charleston, and Jacksonville ports.
          </p>

          {/* Live Container Tracking */}
          <div 
            className="bg-card/80 backdrop-blur-sm border rounded-2xl p-6 md:p-8 mb-8 shadow-xl animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Live Container Tracking</h3>
                <p className="text-sm text-muted-foreground">Track your shipment in real-time</p>
              </div>
            </div>

            <form onSubmit={handleTrackContainer} className="flex gap-3">
              <Input
                type="text"
                placeholder="Enter container number (e.g., MSCU1234567)"
                value={containerNumber}
                onChange={(e) => setContainerNumber(e.target.value)}
                className="flex-1 h-12 text-base"
              />
              <Button 
                type="submit" 
                size="lg"
                disabled={isSearching || !containerNumber}
                className="min-w-[140px]"
              >
                {isSearching ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Tracking...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Track Now
                  </>
                )}
              </Button>
            </form>

            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Updates every 15 min</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>SMS & Email alerts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>ETA calculations</span>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div 
            className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in-up"
            style={{ animationDelay: '0.5s' }}
          >
            <Button size="lg" asChild className="text-base h-12 px-8">
              <a href="/quote">
                Get Instant Quote
                <ArrowRight className="ml-2 h-5 w-5" />
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
            className="flex flex-wrap items-center gap-6 animate-fade-in-up"
            style={{ animationDelay: '0.6s' }}
          >
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Same-day quotes</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span className="text-muted-foreground">98.5% on-time delivery</span>
            </div>
            <div className="h-4 w-px bg-border" />
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span className="text-muted-foreground">TWIC certified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce cursor-pointer group"
        aria-label="Scroll to content"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Scroll to explore</span>
          <ChevronDown className="h-6 w-6 text-muted-foreground group-hover:text-foreground transition-colors" />
        </div>
      </button>
    </section>
  );
}
