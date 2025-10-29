'use client';

import { useState, useEffect, useRef } from 'react';
import { Feature } from '@/data/features';
import {
  MapPin, Clock, Shield, Package, RefreshCw, Users,
  Globe, Bell, Calendar, FileCheck, DollarSign, UserCheck,
  Zap, CheckCircle2, TrendingUp, ArrowRight, Ship, Archive, ChevronRight
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

interface SolutionsTechnologySectionProps {
  features: Feature[];
}

export function SolutionsTechnologySection({ features }: SolutionsTechnologySectionProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const featureRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const getIcon = (iconName?: string) => {
    const icons: Record<string, any> = {
      MapPin, Clock, Shield, Package, RefreshCw, Users,
      Globe, Bell, Calendar, FileCheck, DollarSign, UserCheck,
      Ship, Archive
    };
    return icons[iconName || 'Package'] || Package;
  };

  // Categorize features
  const technologyFeatures = features.filter(f => f.category === 'technology');
  const operationalFeatures = features.filter(f => f.category === 'operational');
  const complianceFeatures = features.filter(f => f.category === 'compliance');
  const customerServiceFeatures = features.filter(f => f.category === 'customer-service');
  const highlightedFeatures = features.filter(f => f.highlighted);

  // Map features to their tabs
  const getTabForFeature = (featureId: string): string => {
    const feature = features.find(f => f.id === featureId);
    if (!feature) return 'overview';

    switch (feature.category) {
      case 'technology': return 'technology';
      case 'operational': return 'operations';
      case 'compliance': return 'compliance';
      case 'customer-service': return 'experience';
      default: return 'overview';
    }
  };

  // Navigate to specific feature
  const navigateToFeature = (featureId: string) => {
    const tab = getTabForFeature(featureId);
    setActiveTab(tab);

    // Scroll to feature after tab switch
    setTimeout(() => {
      const element = featureRefs.current[featureId];
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  // Carousel tracking
  useEffect(() => {
    if (!carouselApi) return;

    carouselApi.on('select', () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    });
  }, [carouselApi]);

  return (
    <section className="relative min-h-[200vh] py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <Badge variant="outline" className="mb-6 px-4 py-2">
            <Zap className="h-4 w-4 mr-2" />
            Enterprise Solutions
          </Badge>
          <h2 className="text-5xl md:text-6xl font-semibold tracking-tight mb-6 bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
            Solutions & Technology
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground">
            State-of-the-art platforms and operational excellence powering your supply chain success
          </p>
        </div>

        {/* Tabs Container */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tab Navigation */}
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-2 h-auto bg-muted/30 p-2 mb-12">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-sm md:text-base py-3">
              Overview
            </TabsTrigger>
            <TabsTrigger value="technology" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-sm md:text-base py-3">
              Technology
            </TabsTrigger>
            <TabsTrigger value="operations" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-sm md:text-base py-3">
              Operations
            </TabsTrigger>
            <TabsTrigger value="compliance" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-sm md:text-base py-3">
              Compliance
            </TabsTrigger>
            <TabsTrigger value="experience" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-sm md:text-base py-3">
              Customer Experience
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab - Enhanced with Carousel */}
          <TabsContent value="overview" className="mt-0 min-h-[150vh]">
            <OverviewContentEnhanced
              highlightedFeatures={highlightedFeatures}
              allFeatures={features}
              getIcon={getIcon}
              navigateToFeature={navigateToFeature}
              currentSlide={currentSlide}
              setCarouselApi={setCarouselApi}
            />
          </TabsContent>

          {/* Technology Solutions Tab */}
          <TabsContent value="technology" className="mt-0 min-h-[180vh]">
            <TechnologyContent
              features={technologyFeatures}
              getIcon={getIcon}
              featureRefs={featureRefs}
            />
          </TabsContent>

          {/* Operational Excellence Tab */}
          <TabsContent value="operations" className="mt-0 min-h-[180vh]">
            <OperationsContent
              features={operationalFeatures}
              getIcon={getIcon}
              featureRefs={featureRefs}
            />
          </TabsContent>

          {/* Compliance & Safety Tab */}
          <TabsContent value="compliance" className="mt-0 min-h-[180vh]">
            <ComplianceContent
              features={complianceFeatures}
              getIcon={getIcon}
              featureRefs={featureRefs}
            />
          </TabsContent>

          {/* Customer Experience Tab */}
          <TabsContent value="experience" className="mt-0 min-h-[180vh]">
            <CustomerExperienceContent
              features={customerServiceFeatures}
              getIcon={getIcon}
              featureRefs={featureRefs}
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

// Enhanced Overview Content with Carousel
function OverviewContentEnhanced({
  highlightedFeatures,
  allFeatures,
  getIcon,
  navigateToFeature,
  currentSlide,
  setCarouselApi
}: any) {
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <div className="space-y-20">
      {/* Hero Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard value="98.5%" label="On-Time Delivery" icon={TrendingUp} />
        <StatCard value="24/7" label="Dispatch Support" icon={Clock} />
        <StatCard value="300+" label="Container Capacity" icon={Archive} />
        <StatCard value="100%" label="TWIC Certified" icon={Shield} />
      </div>

      {/* Featured Capabilities - Two Column with Carousel */}
      <div>
        <h3 className="text-3xl font-semibold mb-8">Featured Capabilities</h3>
        <div className="grid md:grid-cols-[1.2fr_1fr] lg:grid-cols-[1.5fr_1fr] gap-6 lg:gap-8">
          {/* Left Column - Carousel */}
          <div className="relative min-w-0 pb-12">
            <Carousel
              plugins={[plugin.current]}
              className="w-full max-w-full"
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
              setApi={setCarouselApi}
            >
              <CarouselContent className="ml-0">
                {highlightedFeatures.map((feature: Feature) => (
                  <CarouselItem key={feature.id} className="pl-0">
                    <Card className="p-4 md:p-6 overflow-hidden">
                      <div className="w-full">
                        <InteractiveDemo feature={feature} compact />
                      </div>
                      <div className="mt-4 md:mt-6">
                        <Button
                          onClick={() => navigateToFeature(feature.id)}
                          className="w-full"
                        >
                          View {feature.shortName} Details
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {highlightedFeatures.map((_: any, index: number) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all ${
                      index === currentSlide ? 'w-8 bg-primary' : 'w-2 bg-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>
            </Carousel>
          </div>

          {/* Right Column - Feature List */}
          <div className="space-y-3 min-w-0">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
              All Features
            </h4>
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {highlightedFeatures.map((feature: Feature) => {
                const Icon = getIcon(feature.icon);
                return (
                  <button
                    key={feature.id}
                    onClick={() => navigateToFeature(feature.id)}
                    className="w-full text-left p-3 md:p-4 rounded-lg border hover:bg-muted/50 hover:border-primary/50 transition-all group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                        <Icon className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold mb-1 flex items-center justify-between gap-2">
                          <span className="truncate text-sm md:text-base">{feature.shortName}</span>
                          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* All Features by Category */}
      <div className="grid md:grid-cols-2 gap-12">
        <FeatureCategoryList
          title="Technology Solutions"
          features={allFeatures.filter((f: Feature) => f.category === 'technology')}
          getIcon={getIcon}
          navigateToFeature={navigateToFeature}
        />
        <FeatureCategoryList
          title="Operational Excellence"
          features={allFeatures.filter((f: Feature) => f.category === 'operational')}
          getIcon={getIcon}
          navigateToFeature={navigateToFeature}
        />
        <FeatureCategoryList
          title="Compliance & Safety"
          features={allFeatures.filter((f: Feature) => f.category === 'compliance')}
          getIcon={getIcon}
          navigateToFeature={navigateToFeature}
        />
        <FeatureCategoryList
          title="Customer Service"
          features={allFeatures.filter((f: Feature) => f.category === 'customer-service')}
          getIcon={getIcon}
          navigateToFeature={navigateToFeature}
        />
      </div>
    </div>
  );
}

// Technology Content with Refs
function TechnologyContent({ features, getIcon, featureRefs }: any) {
  return (
    <div className="space-y-16">
      {features.map((feature: Feature, index: number) => {
        const Icon = getIcon(feature.icon);
        const isEven = index % 2 === 0;

        return (
          <div
            key={feature.id}
            ref={(el) => { featureRefs.current[feature.id] = el; }}
            className={`grid md:grid-cols-2 gap-12 items-center ${!isEven ? 'md:flex-row-reverse' : ''}`}
          >
            {/* Text Column */}
            <div className={isEven ? '' : 'md:order-2'}>
              <Badge variant="outline" className="mb-4">
                <Icon className="h-3 w-3 mr-2" />
                {feature.category.toUpperCase()}
              </Badge>
              <h3 className="text-3xl md:text-4xl font-semibold mb-4">{feature.name}</h3>
              <p className="text-lg text-muted-foreground mb-6">{feature.description}</p>

              {/* Details */}
              <div className="space-y-3 mb-6">
                <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Key Features</h4>
                {feature.details.slice(0, 6).map((detail: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{detail}</span>
                  </div>
                ))}
              </div>

              {/* Benefits */}
              <div className="p-6 bg-primary/5 rounded-xl border">
                <h4 className="font-semibold mb-3">Benefits</h4>
                <ul className="space-y-2">
                  {feature.benefits.slice(0, 4).map((benefit: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <TrendingUp className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Interactive Demo Column */}
            <div className={isEven ? '' : 'md:order-1'}>
              <InteractiveDemo feature={feature} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Operations Content
function OperationsContent({ features, getIcon, featureRefs }: any) {
  return <TechnologyContent features={features} getIcon={getIcon} featureRefs={featureRefs} />;
}

// Compliance Content
function ComplianceContent({ features, getIcon, featureRefs }: any) {
  return <TechnologyContent features={features} getIcon={getIcon} featureRefs={featureRefs} />;
}

// Customer Experience Content
function CustomerExperienceContent({ features, getIcon, featureRefs }: any) {
  return <TechnologyContent features={features} getIcon={getIcon} featureRefs={featureRefs} />;
}

// Helper Components
function StatCard({ value, label, icon: Icon }: { value: string; label: string; icon: any }) {
  return (
    <Card className="p-6 text-center hover:shadow-lg transition-shadow">
      <Icon className="h-8 w-8 mx-auto mb-3 text-primary" />
      <div className="text-3xl md:text-4xl font-semibold text-primary mb-2">{value}</div>
      <div className="text-xs md:text-sm text-muted-foreground">{label}</div>
    </Card>
  );
}

function FeatureCategoryList({
  title,
  features,
  getIcon,
  navigateToFeature
}: {
  title: string;
  features: Feature[];
  getIcon: any;
  navigateToFeature: (id: string) => void;
}) {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-6">{title}</h3>
      <div className="space-y-4">
        {features.map(feature => {
          const Icon = getIcon(feature.icon);
          return (
            <button
              key={feature.id}
              onClick={() => navigateToFeature(feature.id)}
              className="w-full text-left flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors group"
            >
              <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1 group-hover:text-primary transition-colors">
                  {feature.shortName}
                </h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all mt-1" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function InteractiveDemo({ feature, compact = false }: { feature: Feature; compact?: boolean }) {
  // Create different interactive demos based on feature type
  if (feature.id === 'real-time-tracking') {
    return <GPSTrackingDemo compact={compact} />;
  } else if (feature.id === 'automated-scheduling') {
    return <TerminalSchedulingDemo compact={compact} />;
  } else if (feature.id === 'customer-portal') {
    return <CustomerPortalDemo compact={compact} />;
  } else if (feature.id === 'container-storage') {
    return <StorageFacilityDemo compact={compact} />;
  } else {
    return <GenericFeatureDemo feature={feature} compact={compact} />;
  }
}

// Interactive Demo Components
function GPSTrackingDemo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`relative ${compact ? 'aspect-video' : 'aspect-[4/3]'} w-full bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-blue-950/20 dark:via-background dark:to-green-950/20 rounded-2xl border shadow-2xl overflow-hidden`}>
      <div className="absolute inset-0">
        <div className="relative w-full h-full p-4 md:p-6">
          {/* Simplified Map Visualization */}
          <div className="absolute inset-4 md:inset-6 bg-background/80 backdrop-blur rounded-xl border shadow-inner overflow-hidden">
            {/* Map Points */}
            <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50" />
            <div className="absolute top-2/3 left-3/4 w-3 h-3 bg-blue-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50" />
            <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-primary rounded-full animate-pulse shadow-lg shadow-primary/50">
              <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
            </div>
            {/* Route Lines */}
            <svg className="absolute inset-0 w-full h-full">
              <path
                d="M 25% 25% Q 37.5% 37.5% 50% 50%"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
                className="text-muted-foreground/30"
              />
              <path
                d="M 50% 50% Q 62.5% 56.25% 75% 66%"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
                className="text-muted-foreground/30"
              />
            </svg>
          </div>
          {/* Info Card */}
          {!compact && (
            <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6 p-3 md:p-4 bg-card/95 backdrop-blur rounded-lg border shadow-xl">
              <div className="flex items-center gap-2 md:gap-3">
                <MapPin className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-muted-foreground truncate">Container #HLCU1234567</div>
                  <div className="text-sm font-semibold truncate">En Route to Savannah Port</div>
                  <div className="text-xs text-muted-foreground truncate">ETA: 2h 15m • Last update: 3 min ago</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TerminalSchedulingDemo({ compact = false }: { compact?: boolean }) {
  const appointments = [
    { port: 'Port of Savannah', terminal: 'Garden City Terminal', time: '08:30 AM', status: 'Confirmed' },
    { port: 'Charleston Harbor', terminal: 'Wando Welch Terminal', time: '02:15 PM', status: 'Scheduled' },
    { port: 'JAXPORT', terminal: 'Blount Island', time: '04:45 PM', status: 'Pending' },
  ];

  return (
    <div className={`relative ${compact ? 'aspect-video' : 'aspect-[4/3]'} w-full bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-purple-950/20 dark:via-background dark:to-blue-950/20 rounded-2xl border shadow-2xl overflow-hidden`}>
      <div className="absolute inset-0 p-4 md:p-6 overflow-auto">
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
            <Calendar className="h-5 w-5 md:h-6 md:w-6 text-primary flex-shrink-0" />
            <h4 className="text-base md:text-lg font-semibold">Terminal Appointments</h4>
          </div>
          {appointments.slice(0, compact ? 2 : 3).map((appt, idx) => (
            <div key={idx} className="p-3 md:p-4 bg-card rounded-lg border hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-xs md:text-sm mb-1 truncate">{appt.port}</div>
                  <div className="text-xs text-muted-foreground mb-2 truncate">{appt.terminal}</div>
                  <div className="text-xs font-mono text-primary">{appt.time}</div>
                </div>
                <Badge variant={appt.status === 'Confirmed' ? 'default' : 'outline'} className="text-xs flex-shrink-0">
                  {appt.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CustomerPortalDemo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`relative ${compact ? 'aspect-video' : 'aspect-[4/3]'} w-full bg-gradient-to-br from-teal-50 via-white to-cyan-50 dark:from-teal-950/20 dark:via-background dark:to-cyan-950/20 rounded-2xl border shadow-2xl overflow-hidden`}>
      <div className="absolute inset-0 p-4 md:p-6 overflow-auto">
        <div className="space-y-3 md:space-y-4">
          {/* Portal Header */}
          <div className="flex items-center justify-between pb-3 md:pb-4 border-b">
            <div className="flex items-center gap-2 md:gap-3">
              <Globe className="h-5 w-5 md:h-6 md:w-6 text-primary flex-shrink-0" />
              <h4 className="text-base md:text-lg font-semibold">Customer Portal</h4>
            </div>
            <Badge variant="outline" className="text-xs">Live Demo</Badge>
          </div>
          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2 md:gap-3">
            <Button variant="outline" className="justify-start" size={compact ? 'sm' : 'default'}>
              <DollarSign className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">Request Quote</span>
            </Button>
            <Button variant="outline" className="justify-start" size={compact ? 'sm' : 'default'}>
              <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">Track Shipment</span>
            </Button>
          </div>
          {/* Recent Activity */}
          {!compact && (
            <div className="space-y-2">
              <h5 className="text-xs font-semibold text-muted-foreground uppercase">Recent Activity</h5>
              {[
                'Quote #2024-1234 approved',
                'Shipment SH-5678 delivered',
                'Invoice #INV-9012 paid',
              ].map((activity, idx) => (
                <div key={idx} className="p-3 bg-muted/30 rounded-lg text-sm flex items-center justify-between gap-2">
                  <span className="truncate">{activity}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StorageFacilityDemo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`relative ${compact ? 'aspect-video' : 'aspect-[4/3]'} w-full bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-orange-950/20 dark:via-background dark:to-amber-950/20 rounded-2xl border shadow-2xl overflow-hidden`}>
      <div className="absolute inset-0 p-4 md:p-6 overflow-auto">
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center gap-2 md:gap-3">
            <Archive className="h-5 w-5 md:h-6 md:w-6 text-primary flex-shrink-0" />
            <h4 className="text-base md:text-lg font-semibold">Storage Capacity</h4>
          </div>
          {/* Capacity Visualization */}
          <div className="space-y-3 md:space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs md:text-sm font-medium">Container Positions</span>
                <span className="text-xs md:text-sm font-semibold text-primary">245 / 300</span>
              </div>
              <div className="h-3 md:h-4 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all" style={{ width: '82%' }} />
              </div>
            </div>
            {!compact && (
              <>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs md:text-sm font-medium">Reefer Plugs</span>
                    <span className="text-xs md:text-sm font-semibold text-primary">18 / 24</span>
                  </div>
                  <div className="h-3 md:h-4 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all" style={{ width: '75%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs md:text-sm font-medium">Warehouse Space</span>
                    <span className="text-xs md:text-sm font-semibold text-primary">32,500 / 50,000 sq ft</span>
                  </div>
                  <div className="h-3 md:h-4 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all" style={{ width: '65%' }} />
                  </div>
                </div>
              </>
            )}
          </div>
          {/* Stats */}
          {!compact && (
            <div className="grid grid-cols-2 gap-3 pt-3 md:pt-4 border-t">
              <div className="text-center">
                <div className="text-xl md:text-2xl font-semibold text-primary">24/7</div>
                <div className="text-xs text-muted-foreground">Security</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-semibold text-primary">$20/day</div>
                <div className="text-xs text-muted-foreground">Storage Rate</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function GenericFeatureDemo({ feature, compact = false }: { feature: Feature; compact?: boolean }) {
  const Icon = feature.icon === 'MapPin' ? MapPin :
               feature.icon === 'Clock' ? Clock :
               feature.icon === 'Shield' ? Shield :
               feature.icon === 'Package' ? Package : Package;

  return (
    <div className={`relative ${compact ? 'aspect-video' : 'aspect-[4/3]'} w-full bg-gradient-to-br from-muted/50 via-background to-muted/30 rounded-2xl border shadow-2xl overflow-hidden`}>
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="flex flex-col items-center justify-center space-y-4 md:space-y-6 max-h-full overflow-auto">
          <div className="p-4 md:p-6 rounded-2xl bg-primary/10 flex-shrink-0">
            <Icon className={`${compact ? 'h-12 w-12' : 'h-12 w-12 md:h-16 md:w-16'} text-primary`} />
          </div>
          <div className="text-center space-y-2 flex-shrink-0">
            <h4 className={`${compact ? 'text-base' : 'text-lg md:text-xl'} font-semibold`}>{feature.shortName}</h4>
            <p className="text-xs md:text-sm text-muted-foreground max-w-xs px-2">{feature.description}</p>
          </div>
          {!compact && (
            <div className="grid grid-cols-2 gap-3 md:gap-4 w-full max-w-sm flex-shrink-0">
              {feature.benefits.slice(0, 4).map((benefit, idx) => (
                <div key={idx} className="p-2 md:p-3 bg-card rounded-lg border text-center">
                  <div className="text-xs text-muted-foreground line-clamp-2">{benefit}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
