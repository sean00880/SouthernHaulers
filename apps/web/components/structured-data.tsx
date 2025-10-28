import Script from 'next/script';

interface OrganizationSchemaProps {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  contactPoint?: {
    telephone: string;
    contactType: string;
    email?: string;
  };
  sameAs?: string[];
}

interface LocalBusinessSchemaProps extends OrganizationSchemaProps {
  priceRange?: string;
  openingHours?: string;
  geo?: {
    latitude: number;
    longitude: number;
  };
}

interface ServiceSchemaProps {
  name: string;
  description: string;
  provider: {
    name: string;
    url: string;
  };
  areaServed?: string[];
  serviceType?: string;
}

interface FAQSchemaProps {
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

interface BreadcrumbSchemaProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function OrganizationSchema({
  name,
  url,
  logo,
  description,
  address,
  contactPoint,
  sameAs,
}: OrganizationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    ...(logo && { logo }),
    ...(description && { description }),
    ...(address && {
      address: {
        '@type': 'PostalAddress',
        ...address,
      },
    }),
    ...(contactPoint && {
      contactPoint: {
        '@type': 'ContactPoint',
        ...contactPoint,
      },
    }),
    ...(sameAs && { sameAs }),
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessSchema({
  name,
  url,
  logo,
  description,
  address,
  contactPoint,
  sameAs,
  priceRange,
  openingHours,
  geo,
}: LocalBusinessSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    url,
    ...(logo && { logo }),
    ...(description && { description }),
    ...(address && {
      address: {
        '@type': 'PostalAddress',
        ...address,
      },
    }),
    ...(contactPoint && {
      contactPoint: {
        '@type': 'ContactPoint',
        ...contactPoint,
      },
    }),
    ...(sameAs && { sameAs }),
    ...(priceRange && { priceRange }),
    ...(openingHours && { openingHoursSpecification: openingHours }),
    ...(geo && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: geo.latitude,
        longitude: geo.longitude,
      },
    }),
  };

  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceSchema({
  name,
  description,
  provider,
  areaServed,
  serviceType,
}: ServiceSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      ...provider,
    },
    ...(areaServed && { areaServed }),
    ...(serviceType && { serviceType }),
  };

  return (
    <Script
      id="service-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema({ questions }: FAQSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Preset Southern Haulers schemas
export function SouthernHaulersOrganizationSchema() {
  return (
    <OrganizationSchema
      name="Southern Haulers"
      url="https://southernhaulers.net"
      logo="https://southernhaulers.net/logo.png"
      description="Premier container drayage, agricultural hauling, and warehousing services in the Southeastern United States. 300+ container capacity with TWIC-certified drivers."
      address={{
        streetAddress: '', // TODO: Add actual address
        addressLocality: 'Tifton',
        addressRegion: 'GA',
        postalCode: '', // TODO: Add postal code
        addressCountry: 'US',
      }}
      contactPoint={{
        telephone: '', // TODO: Add phone number
        contactType: 'customer service',
        email: '', // TODO: Add email
      }}
      sameAs={[
        // TODO: Add social media URLs
        // 'https://www.facebook.com/southernhaulers',
        // 'https://www.linkedin.com/company/southern-haulers',
      ]}
    />
  );
}

export function SouthernHaulersLocalBusinessSchema() {
  return (
    <LocalBusinessSchema
      name="Southern Haulers"
      url="https://southernhaulers.net"
      logo="https://southernhaulers.net/logo.png"
      description="Premier container drayage, agricultural hauling, and warehousing services in the Southeastern United States."
      address={{
        streetAddress: '', // TODO: Add actual address
        addressLocality: 'Tifton',
        addressRegion: 'GA',
        postalCode: '', // TODO: Add postal code
        addressCountry: 'US',
      }}
      contactPoint={{
        telephone: '', // TODO: Add phone number
        contactType: 'customer service',
      }}
      priceRange="$$"
      openingHours="Mo-Su 00:00-24:00" // 24/7 dispatch
      geo={{
        latitude: 31.4504, // Tifton, GA approximate
        longitude: -83.5085,
      }}
    />
  );
}

export function DrayageServiceSchema() {
  return (
    <ServiceSchema
      name="Container Drayage Services"
      description="Port-to-door and door-to-port container transport serving Savannah, Charleston, and Jacksonville. Real-time tracking with 300+ container storage capacity."
      provider={{
        name: 'Southern Haulers',
        url: 'https://southernhaulers.net',
      }}
      areaServed={['Georgia', 'South Carolina', 'Florida']}
      serviceType="Drayage"
    />
  );
}

export function AgriculturalServiceSchema() {
  return (
    <ServiceSchema
      name="Agricultural Hauling Services"
      description="Specialized bulk agricultural transport for peanuts, pecans, cotton, feed, and fertilizer across the Southeast."
      provider={{
        name: 'Southern Haulers',
        url: 'https://southernhaulers.net',
      }}
      areaServed={['Georgia', 'South Carolina', 'Florida', 'Alabama']}
      serviceType="Agricultural Transport"
    />
  );
}

export function WarehousingServiceSchema() {
  return (
    <ServiceSchema
      name="Warehousing & Transloading Services"
      description="300+ container storage capacity with on-site transloading, cross-docking, and distribution. Avoid per-diem and demurrage charges."
      provider={{
        name: 'Southern Haulers',
        url: 'https://southernhaulers.net',
      }}
      areaServed={['Georgia', 'South Carolina', 'Florida']}
      serviceType="Warehousing"
    />
  );
}

export function RefrigeratedServiceSchema() {
  return (
    <ServiceSchema
      name="Refrigerated Transport Services"
      description="Temperature-controlled drayage for refrigerated containers with continuous monitoring, FSMA compliance, and cold chain documentation."
      provider={{
        name: 'Southern Haulers',
        url: 'https://southernhaulers.net',
      }}
      areaServed={['Georgia', 'South Carolina', 'Florida']}
      serviceType="Refrigerated Transport"
    />
  );
}
