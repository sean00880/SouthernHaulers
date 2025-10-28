/**
 * FAQs Registry
 * 
 * Frequently Asked Questions organized by category.
 * Includes questions about services, pricing, operations, and compliance.
 */

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'services' | 'pricing' | 'operations' | 'compliance' | 'technology' | 'general';
  relatedServices?: string[]; // Service IDs
  relatedFaqs?: string[]; // FAQ IDs
  featured?: boolean;
}

export interface FAQCategory {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

export const FAQ_CATEGORIES: FAQCategory[] = [
  {
    id: 'services',
    name: 'Services',
    description: 'Questions about our drayage, agricultural hauling, and warehousing services',
    icon: 'Package',
  },
  {
    id: 'pricing',
    name: 'Pricing & Quotes',
    description: 'Information about rates, quotes, and billing',
    icon: 'DollarSign',
  },
  {
    id: 'operations',
    name: 'Operations',
    description: 'How we handle shipments, tracking, and delivery',
    icon: 'Truck',
  },
  {
    id: 'compliance',
    name: 'Compliance & Safety',
    description: 'Certifications, insurance, and safety standards',
    icon: 'Shield',
  },
  {
    id: 'technology',
    name: 'Technology',
    description: 'Tracking systems, customer portal, and automation',
    icon: 'Monitor',
  },
  {
    id: 'general',
    name: 'General',
    description: 'Company information and getting started',
    icon: 'Info',
  },
];

export const FAQS: FAQ[] = [
  // Services FAQs
  {
    id: 'ports-served',
    question: 'Which ports do you serve?',
    answer: 'We provide direct drayage service to three major Southeast ports: Port of Savannah (GA) handling 5.9M+ TEUs annually, Charleston Harbor (SC) with 2.9M+ TEUs, and JAXPORT (FL) with 1.5M+ TEUs. Our strategic South Georgia hub location enables fast 2-4 hour turnaround times to all three ports.',
    category: 'services',
    relatedServices: ['container-drayage', 'port-drayage'],
    featured: true,
  },
  {
    id: 'container-tracking',
    question: 'How do I track my container?',
    answer: 'All containers are tracked via live GPS with updates every 15 minutes. You can access real-time location updates, ETA calculations, and shipment history through our customer portal at any time. We also send automated status notifications via email and SMS for major milestones like gate out, in transit, and delivered.',
    category: 'technology',
    relatedServices: ['container-drayage'],
    relatedFaqs: ['customer-portal', 'notifications'],
    featured: true,
  },
  {
    id: 'storage-capacity',
    question: 'What is your container storage capacity?',
    answer: 'Our facility can store 300+ containers with both short-term (daily) and long-term storage options available. We offer storage for both empty and loaded containers, with 24 refrigerated container power hookups for temperature-controlled cargo. This helps you avoid costly port per-diem and demurrage charges by pulling containers from the terminal quickly.',
    category: 'services',
    relatedServices: ['warehousing'],
    featured: true,
  },
  {
    id: 'twic-certification',
    question: 'Are your drivers TWIC certified?',
    answer: 'Yes, 100% of our drivers maintain current TWIC (Transportation Worker Identification Credential) certifications required for secure port access. All drivers undergo TSA background checks and maintain proper credentials. We also maintain FMCSA compliance and Truth-in-Leasing documentation for all lease-on operators.',
    category: 'compliance',
    featured: true,
  },
  {
    id: 'quote-time',
    question: 'How quickly can you provide a quote?',
    answer: 'We provide same-day quotes for drayage and agricultural hauling services. Submit your request online through our quote calculator or call our 24/7 dispatch center, and we will respond within 2-4 hours with competitive rates and available capacity. For complex or high-volume requests, we can schedule a call to discuss custom solutions.',
    category: 'pricing',
    featured: true,
  },
  {
    id: 'refrigerated-containers',
    question: 'Do you handle refrigerated containers?',
    answer: 'Yes, we provide specialized temperature-controlled drayage for refrigerated containers (reefers). Our genset-equipped tractors maintain proper temperatures throughout transit, with continuous monitoring and compliance documentation. We have 24 reefer power hookups at our facility for extended storage with temperature control, perfect for perishable agricultural products.',
    category: 'services',
    relatedServices: ['refrigerated-transport'],
    featured: true,
  },

  // Pricing FAQs
  {
    id: 'drayage-pricing',
    question: 'What are your drayage rates?',
    answer: 'Our base drayage rates start at $350 for a 20ft standard container, $450 for a 40ft standard, $475 for a 40ft high cube, and $650 for refrigerated containers. Final pricing depends on factors like distance, origin/destination, special handling requirements, and volume commitments. We offer volume discounts and custom rate programs for regular shippers. Contact us for a detailed quote specific to your needs.',
    category: 'pricing',
    relatedServices: ['container-drayage'],
    relatedFaqs: ['quote-time', 'additional-fees'],
  },
  {
    id: 'additional-fees',
    question: 'Are there additional fees beyond the base rate?',
    answer: 'Additional fees may apply for special circumstances including: overweight containers, after-hours pickups ($75), chassis splits ($50 when return location differs from pickup), congestion surcharges during peak periods, and waiting time beyond the free time allowance. All fees are clearly outlined in your quote, and we maintain transparent pricing with no hidden charges.',
    category: 'pricing',
    relatedFaqs: ['drayage-pricing'],
  },
  {
    id: 'volume-discounts',
    question: 'Do you offer volume discounts?',
    answer: 'Yes, we offer competitive volume discount programs for regular shippers. Discounts are based on monthly container volume, service commitment duration, and route consistency. We also provide dedicated account management for high-volume customers with customized rate programs, priority equipment allocation, and enhanced service levels. Contact our sales team to discuss volume pricing options.',
    category: 'pricing',
    relatedFaqs: ['drayage-pricing'],
  },
  {
    id: 'payment-terms',
    question: 'What payment terms do you offer?',
    answer: 'We offer flexible payment terms based on creditworthiness and volume. New customers typically start with prepayment or credit card for the first few shipments. Established customers with approved credit can receive Net 15 or Net 30 terms. We accept credit cards, ACH transfers, and wire payments. All invoices and receipts are available through our customer portal.',
    category: 'pricing',
  },

  // Operations FAQs
  {
    id: 'service-area',
    question: 'What geographic areas do you serve?',
    answer: 'Our primary service area covers Georgia, South Carolina, and Florida with daily operations and full service capabilities. We provide regular service to major cities including Atlanta, Savannah, Charleston, Jacksonville, Macon, Columbia, and Orlando. Extended coverage is available for Alabama, North Carolina, and Tennessee for special arrangements and volume commitments. Our South Georgia hub provides strategic access to all three major Southeast ports.',
    category: 'operations',
    relatedFaqs: ['ports-served'],
  },
  {
    id: 'delivery-time',
    question: 'What are typical delivery timeframes?',
    answer: 'Delivery timeframes depend on distance and origin/destination: Port to South Georgia hub locations are typically same-day or next-day. Atlanta area deliveries are 1-2 days from gate out. Charleston and Jacksonville deliveries are 1-2 days. Expedited same-day service is available for time-sensitive shipments with priority scheduling and dedicated equipment.',
    category: 'operations',
    relatedServices: ['container-drayage', 'expedited-drayage'],
  },
  {
    id: 'appointment-scheduling',
    question: 'How does terminal appointment scheduling work?',
    answer: 'We use automated eModal integration for seamless terminal appointment booking. Our system checks terminal availability, books appointments automatically, and receives confirmation tracking. You don\'t need to manage terminal appointments – we handle everything. For terminals without eModal, our dispatch team coordinates appointments directly. You receive notifications for all major milestones including appointment confirmation, gate out, and delivery.',
    category: 'operations',
    relatedServices: ['container-drayage'],
    relatedFaqs: ['container-tracking'],
  },
  {
    id: 'after-hours',
    question: 'Do you offer after-hours and weekend service?',
    answer: 'Yes, we operate 24/7 with round-the-clock dispatch and customer service. Weekend and after-hours pickups and deliveries are available for an additional fee. Our 24/7 operations are particularly valuable for time-sensitive shipments, port congestion management, and coordinating with vessel schedules. Emergency support is always available through our dispatch center.',
    category: 'operations',
    relatedServices: ['expedited-drayage'],
  },
  {
    id: 'hazmat-capability',
    question: 'Can you transport hazardous materials?',
    answer: 'Yes, we have DOT hazmat-certified drivers and equipment for transporting dangerous goods. Our hazmat services include proper placarding, documentation support, emergency response plans, and 24/7 emergency hotline. We maintain full EPA compliance and follow all DOT regulations. Hazmat certifications are maintained for all eligible drivers, and we can handle most hazmat classes. Contact us with your specific commodity details for capability confirmation.',
    category: 'operations',
    relatedServices: ['hazmat-transport'],
  },
  {
    id: 'equipment-types',
    question: 'What types of equipment do you have?',
    answer: 'Our fleet includes 75+ tractors (day cab and genset-equipped for reefers), 150+ chassis (20ft, 40ft, and tri-axle for heavy containers), agricultural trailers (hoppers, flatbeds, end-dumps, walking floors, bulk pneumatic tankers), and specialized equipment for various cargo types. All equipment is regularly maintained and DOT compliant. We also have access to additional capacity through our partner network for surge periods.',
    category: 'operations',
  },

  // Compliance FAQs
  {
    id: 'insurance-coverage',
    question: 'What insurance coverage do you carry?',
    answer: 'We maintain comprehensive insurance coverage including $1M+ cargo insurance, $2M+ general liability, container damage protection, reefer breakdown coverage, and workers compensation. Certificates of insurance are available upon request for your records. Our insurance policies protect both your cargo and our operations, providing peace of mind for every shipment.',
    category: 'compliance',
  },
  {
    id: 'certifications',
    question: 'What certifications and compliance standards do you maintain?',
    answer: 'We maintain multiple certifications: FMCSA compliance with satisfactory safety rating, TWIC certification for all drivers, Truth-in-Leasing compliance (49 CFR Part 376), C-TPAT certification for supply chain security, USDA approval for agricultural products, DOT hazmat endorsements, and ISO 9001 quality management. All certifications are kept current, and we undergo regular audits to ensure continued compliance.',
    category: 'compliance',
    relatedFaqs: ['twic-certification', 'insurance-coverage'],
  },
  {
    id: 'safety-record',
    question: 'What is your safety record?',
    answer: 'We maintain an excellent safety record with a Satisfactory DOT safety rating. Our comprehensive safety program includes regular driver training, pre-trip inspections, vehicle maintenance schedules, hours of service compliance, and incident reporting procedures. We received the FMCSA Safety Excellence Award in 2023 for our outstanding safety performance. Safety is our top priority in every aspect of our operations.',
    category: 'compliance',
  },

  // Technology FAQs
  {
    id: 'customer-portal',
    question: 'How do I access the customer portal?',
    answer: 'Once you become a customer, we\'ll provide login credentials for our web-based customer portal. The portal is mobile-responsive and accessible 24/7 from any device. Through the portal, you can request quotes, track shipments in real-time, access documentation (bills of lading, invoices, proof of delivery), view service history, and configure notification preferences. No special software is required – just a web browser.',
    category: 'technology',
    relatedFaqs: ['container-tracking', 'notifications'],
  },
  {
    id: 'notifications',
    question: 'What types of notifications do you send?',
    answer: 'We send automated notifications for all major shipment milestones via email and/or SMS based on your preferences. Notification types include: appointment confirmation, gate out from port/terminal, in transit updates, delivery confirmation with proof of delivery, exception alerts (delays, equipment issues), and storage reminders. You can customize which notifications you receive and add multiple recipients for your organization.',
    category: 'technology',
    relatedServices: ['container-drayage'],
  },
  {
    id: 'tracking-frequency',
    question: 'How often is tracking information updated?',
    answer: 'GPS tracking updates are provided every 15 minutes during transit. Each update includes precise location coordinates, timestamp, current status, and estimated time of arrival. You can view the current location on a map in the customer portal or through tracking links. Historical route data is also available so you can see the complete journey of your shipment.',
    category: 'technology',
    relatedFaqs: ['container-tracking'],
  },
  {
    id: 'api-integration',
    question: 'Do you offer API integration for automated systems?',
    answer: 'Yes, we offer API integration for high-volume customers who want to connect our tracking and quoting systems to their TMS or ERP platforms. Our API provides access to real-time tracking data, quote requests, shipment booking, document retrieval, and status notifications. API documentation and developer support are available. Contact our technology team to discuss integration requirements and capabilities.',
    category: 'technology',
  },

  // General FAQs
  {
    id: 'getting-started',
    question: 'How do I get started with Southern Haulers?',
    answer: 'Getting started is easy: 1) Request a quote online or call our dispatch center with your shipment details, 2) Receive a competitive quote within 2-4 hours, 3) Accept the quote and provide shipment documentation, 4) We handle terminal appointments and scheduling, 5) Track your shipment in real-time through our portal. For regular shipping needs, we\'ll set up a customer account with portal access and dedicated account management.',
    category: 'general',
    relatedFaqs: ['quote-time', 'customer-portal'],
  },
  {
    id: 'minimum-volume',
    question: 'Is there a minimum volume requirement?',
    answer: 'No, we work with shippers of all sizes – from one-time single container moves to high-volume regular shipping programs. While volume customers receive additional benefits like dedicated account management and volume discounts, we provide the same high-quality service to all customers regardless of size. Even if you ship occasionally, you\'ll receive professional service, real-time tracking, and responsive customer support.',
    category: 'general',
  },
  {
    id: 'documentation-required',
    question: 'What documentation do you need for a shipment?',
    answer: 'Required documentation varies by shipment type but typically includes: container number, booking number, bill of lading, terminal information, delivery address, and any special instructions. For hazmat shipments, we need SDS sheets and placarding information. For customs shipments, appropriate customs documentation. Our team will guide you through the documentation requirements when you book, and you can upload documents through our customer portal.',
    category: 'general',
  },
  {
    id: 'harris-brokerage',
    question: 'What is the relationship with Harris Brokerage?',
    answer: 'Southern Haulers is the asset-based carrier with our own fleet, container storage, and Southeast operations. Harris Brokerage is our sister company providing 3PL freight brokerage services with a nationwide carrier network. This integrated model means we can handle your Southeast drayage with our own equipment while coordinating out-of-region lanes through Harris Brokerage – giving you single-source logistics across the entire country.',
    category: 'general',
  },
  {
    id: 'seasonal-capacity',
    question: 'Can you handle seasonal volume surges?',
    answer: 'Yes, we specialize in scaling capacity for seasonal demand, particularly for agricultural harvest seasons. We maintain relationships with qualified owner-operators and partner carriers to provide surge capacity while maintaining service quality. For planned seasonal increases, we recommend advance scheduling to secure dedicated equipment. Our 300+ container storage capacity also helps buffer volume fluctuations.',
    category: 'general',
    relatedServices: ['agricultural-hauling', 'warehousing'],
  },
];

/**
 * Get FAQ by ID
 */
export function getFaqById(id: string): FAQ | undefined {
  return FAQS.find(faq => faq.id === id);
}

/**
 * Get FAQs by category
 */
export function getFaqsByCategory(category: FAQ['category']): FAQ[] {
  return FAQS.filter(faq => faq.category === category);
}

/**
 * Get featured FAQs
 */
export function getFeaturedFaqs(): FAQ[] {
  return FAQS.filter(faq => faq.featured);
}

/**
 * Get FAQs by service
 */
export function getFaqsByService(serviceId: string): FAQ[] {
  return FAQS.filter(faq => faq.relatedServices?.includes(serviceId));
}

/**
 * Get related FAQs
 */
export function getRelatedFaqs(faqId: string): FAQ[] {
  const faq = getFaqById(faqId);
  if (!faq?.relatedFaqs) return [];
  return faq.relatedFaqs
    .map(id => getFaqById(id))
    .filter(Boolean) as FAQ[];
}

/**
 * Search FAQs
 */
export function searchFaqs(query: string): FAQ[] {
  const lowerQuery = query.toLowerCase();
  return FAQS.filter(faq =>
    faq.question.toLowerCase().includes(lowerQuery) ||
    faq.answer.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get category by ID
 */
export function getCategoryById(id: string): FAQCategory | undefined {
  return FAQ_CATEGORIES.find(cat => cat.id === id);
}

/**
 * Get all categories with FAQ counts
 */
export function getCategoriesWithCounts(): (FAQCategory & { count: number })[] {
  return FAQ_CATEGORIES.map(category => ({
    ...category,
    count: getFaqsByCategory(category.id as FAQ['category']).length,
  }));
}
