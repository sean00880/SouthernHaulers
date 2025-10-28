
import { Metadata } from 'next';
import { Header } from '@/components/sections/header';
import { HeroSection } from '@/components/sections/hero-section';
import { ServicesSectionEnhanced } from '@/components/sections/services-section-enhanced';
import { LocationsPortsSection } from '@/components/sections/locations-ports-section';
import { FeaturesBentoSection } from '@/components/sections/features-bento-section';
import { CalculatorSectionEnhanced } from '@/components/sections/calculator-section-enhanced';
import { StatsSection } from '@/components/sections/stats-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { FAQSection } from '@/components/sections/faq-section';
import { CTASection } from '@/components/sections/cta-section';
import { Footer } from '@/components/sections/footer';

import { SERVICES } from '@/data/services';
import { PORTS } from '@/data/ports';
import { LOCATIONS, getAllCities } from '@/data/locations';
import { FEATURES } from '@/data/features';
import { STATS, getFeaturedStats } from '@/data/stats';
import { TESTIMONIALS, getFeaturedTestimonials } from '@/data/testimonials';
import { FAQS, getFeaturedFaqs } from '@/data/faqs';

export const metadata: Metadata = {
  title: 'Southern Haulers - Premier Container Drayage & Agricultural Hauling',
  description: 'Strategic Southeast hub with 300+ container capacity, real-time GPS tracking, and direct service to Savannah, Charleston, and Jacksonville ports. TWIC certified, 98.5% on-time delivery.',
  alternates: {
    canonical: 'https://www.southernhaulers.net',
  },
};

export default function HomePage() {
  // Get data
  const featuredServices = SERVICES.filter(s => 
    ['container-drayage', 'agricultural-hauling', 'warehousing', 'refrigerated-transport'].includes(s.id)
  );
  const cities = getAllCities().slice(0, 9);
  const featuredStats = getFeaturedStats();
  const featuredTestimonials = getFeaturedTestimonials();
  const featuredFaqs = getFeaturedFaqs();

  return (
    <>
      {/* Header Navigation */}
      <Header />

      <main className="min-h-screen">
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Southern Haulers',
              url: 'https://www.southernhaulers.net',
              logo: 'https://www.movinout.com/trucking-jobs/storage/logos/medium/147042671361413.jpg',
              description: 'Premier container drayage and agricultural hauling services across the Southeast',
              address: {
                '@type': 'PostalAddress',
                addressRegion: 'GA',
                addressCountry: 'US',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+1-555-012-3456',
                contactType: 'customer service',
                areaServed: ['GA', 'SC', 'FL'],
                availableLanguage: 'en',
              },
              sameAs: [
                'https://www.facebook.com/southernhaulers',
                'https://www.linkedin.com/company/southern-haulers',
              ],
            }),
          }}
        />

        {/* Hero Section - 100vh */}
        <HeroSection />

        {/* Services Section with Alternating Splits */}
        <ServicesSectionEnhanced services={featuredServices} />

        {/* Stats Section */}
        <StatsSection stats={featuredStats.length > 0 ? featuredStats : STATS} />

        {/* Locations & Ports Section */}
        <LocationsPortsSection ports={PORTS} locations={cities} />

        {/* Features Bento Grid Section */}
        <FeaturesBentoSection features={FEATURES} />

        {/* Enhanced Calculator Section */}
        <CalculatorSectionEnhanced />

        {/* Testimonials Section */}
        <TestimonialsSection testimonials={featuredTestimonials.length > 0 ? featuredTestimonials : TESTIMONIALS} />

        {/* FAQ Section */}
        <FAQSection faqs={featuredFaqs.length > 0 ? featuredFaqs : FAQS} />

        {/* Final CTA Section */}
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
