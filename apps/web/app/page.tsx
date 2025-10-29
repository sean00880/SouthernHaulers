
import { Metadata } from 'next';
import { HeroSectionEnhanced } from '@/components/sections/hero-section-enhanced';
import { ServicesSectionEnhanced } from '@/components/sections/services-section-enhanced';
import { LocationsPortsSectionEnhanced } from '@/components/sections/locations-ports-section-enhanced';
import { SolutionsTechnologySection } from '@/components/sections/solutions-technology-section';
import { QuoteLFDSection } from '@/components/sections/quote-lfd-section';
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
      <main className="min-h-screen pt-16">
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

        {/* Hero Section - Enhanced with truck graphic */}
        <HeroSectionEnhanced />

        {/* Services Section with Alternating Splits */}
        <ServicesSectionEnhanced services={featuredServices} />

        {/* Stats Section */}
        <StatsSection stats={featuredStats.length > 0 ? featuredStats : STATS} />

        {/* Locations & Ports Section - Enhanced with all 9 locations */}
        <LocationsPortsSectionEnhanced ports={PORTS} locations={cities} />

        {/* Solutions & Technology Section - 200vh Tabbed Layout */}
        <SolutionsTechnologySection features={FEATURES} />

        {/* Quote Calculator & LFD Tracker Section */}
        <QuoteLFDSection />

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
