/**
 * Master Data Registry
 * 
 * Central export point for all data registries used across the Southern Haulers application.
 * This file provides a single source of truth for all content and data.
 * 
 * @module data/registry
 */

// Re-export all types and data from individual registries
export * from './ports';
export * from './locations';
export * from './services';
export * from './features';
export * from './testimonials';
export * from './stats';
export * from './faqs';

// Import registries for combined exports
import { PORTS, Port, Terminal } from './ports';
import { LOCATIONS, SERVICE_REGIONS, Location, ServiceRegion } from './locations';
import { SERVICES, Service } from './services';
import { FEATURES, CERTIFICATIONS, CAPABILITIES, Feature, Certification, Capability } from './features';
import { TESTIMONIALS, CASE_STUDIES, Testimonial, CaseStudy } from './testimonials';
import { STATS, MILESTONES, ACHIEVEMENTS, Stat, Milestone, Achievement } from './stats';
import { FAQS, FAQ_CATEGORIES, FAQ, FAQCategory } from './faqs';

/**
 * Master Registry Object
 * Provides convenient access to all data registries in a single object
 */
export const Registry = {
  // Ports and Locations
  ports: PORTS,
  locations: LOCATIONS,
  serviceRegions: SERVICE_REGIONS,
  
  // Services and Features
  services: SERVICES,
  features: FEATURES,
  certifications: CERTIFICATIONS,
  capabilities: CAPABILITIES,
  
  // Social Proof
  testimonials: TESTIMONIALS,
  caseStudies: CASE_STUDIES,
  
  // Statistics and History
  stats: STATS,
  milestones: MILESTONES,
  achievements: ACHIEVEMENTS,
  
  // FAQs
  faqs: FAQS,
  faqCategories: FAQ_CATEGORIES,
} as const;

/**
 * Type Definitions
 * Consolidated type exports for easy importing
 */
export type {
  // Ports
  Port,
  Terminal,
  
  // Locations
  Location,
  ServiceRegion,
  
  // Services
  Service,
  
  // Features
  Feature,
  Certification,
  Capability,
  
  // Testimonials
  Testimonial,
  CaseStudy,
  
  // Stats
  Stat,
  Milestone,
  Achievement,
  
  // FAQs
  FAQ,
  FAQCategory,
};

/**
 * Registry Statistics
 * Provides counts and metadata about the registry contents
 */
export const RegistryStats = {
  ports: {
    total: PORTS.length,
    terminals: PORTS.reduce((sum, port) => sum + port.terminals.length, 0),
    totalTeuCapacity: PORTS.reduce((sum, port) => sum + port.annualTeuCapacity, 0),
  },
  locations: {
    total: LOCATIONS.length,
    hubs: LOCATIONS.filter(l => l.type === 'hub').length,
    cities: LOCATIONS.filter(l => l.type === 'city').length,
    serviceRegions: SERVICE_REGIONS.length,
  },
  services: {
    total: SERVICES.length,
    byCategory: {
      drayage: SERVICES.filter(s => s.category === 'drayage').length,
      agricultural: SERVICES.filter(s => s.category === 'agricultural').length,
      warehousing: SERVICES.filter(s => s.category === 'warehousing').length,
      specialized: SERVICES.filter(s => s.category === 'specialized').length,
    },
  },
  features: {
    total: FEATURES.length,
    highlighted: FEATURES.filter(f => f.highlighted).length,
    certifications: CERTIFICATIONS.length,
    capabilities: CAPABILITIES.length,
  },
  testimonials: {
    total: TESTIMONIALS.length,
    featured: TESTIMONIALS.filter(t => t.featured).length,
    verified: TESTIMONIALS.filter(t => t.verified).length,
    caseStudies: CASE_STUDIES.length,
    averageRating: TESTIMONIALS.reduce((sum, t) => sum + t.rating, 0) / TESTIMONIALS.length,
  },
  stats: {
    total: STATS.length,
    featured: STATS.filter(s => s.featured).length,
    milestones: MILESTONES.length,
    achievements: ACHIEVEMENTS.length,
  },
  faqs: {
    total: FAQS.length,
    featured: FAQS.filter(f => f.featured).length,
    categories: FAQ_CATEGORIES.length,
  },
} as const;

/**
 * Registry Utilities
 * Helper functions for working with the registry data
 */
export const RegistryUtils = {
  /**
   * Get all data for a specific service
   */
  getServiceData(serviceId: string) {
    const service = SERVICES.find(s => s.id === serviceId);
    if (!service) return null;
    
    return {
      service,
      testimonials: TESTIMONIALS.filter(t => t.services.includes(serviceId)),
      caseStudies: CASE_STUDIES.filter(cs => cs.services.includes(serviceId)),
      faqs: FAQS.filter(f => f.relatedServices?.includes(serviceId)),
    };
  },
  
  /**
   * Get all data for a specific location
   */
  getLocationData(locationId: string) {
    const location = LOCATIONS.find(l => l.id === locationId);
    if (!location) return null;
    
    return {
      location,
      services: SERVICES.filter(s => 
        s.availability === 'all-locations' || 
        (s.availability === 'select-locations' && location.servicesAvailable.includes(s.id))
      ),
    };
  },
  
  /**
   * Get all data for a specific port
   */
  getPortData(portId: string) {
    const port = PORTS.find(p => p.id === portId);
    if (!port) return null;
    
    return {
      port,
      relatedServices: SERVICES.filter(s => s.category === 'drayage'),
      faqs: FAQS.filter(f => f.category === 'operations' || f.category === 'services'),
    };
  },
  
  /**
   * Search across all text content
   */
  search(query: string) {
    const lowerQuery = query.toLowerCase();
    
    return {
      services: SERVICES.filter(s => 
        s.name.toLowerCase().includes(lowerQuery) ||
        s.description.toLowerCase().includes(lowerQuery)
      ),
      locations: LOCATIONS.filter(l =>
        l.name.toLowerCase().includes(lowerQuery) ||
        l.city.toLowerCase().includes(lowerQuery)
      ),
      ports: PORTS.filter(p =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.city.toLowerCase().includes(lowerQuery)
      ),
      faqs: FAQS.filter(f =>
        f.question.toLowerCase().includes(lowerQuery) ||
        f.answer.toLowerCase().includes(lowerQuery)
      ),
      testimonials: TESTIMONIALS.filter(t =>
        t.quote.toLowerCase().includes(lowerQuery) ||
        t.author.company.toLowerCase().includes(lowerQuery)
      ),
    };
  },
  
  /**
   * Get featured content for homepage
   */
  getFeaturedContent() {
    return {
      stats: STATS.filter(s => s.featured),
      features: FEATURES.filter(f => f.highlighted),
      testimonials: TESTIMONIALS.filter(t => t.featured),
      faqs: FAQS.filter(f => f.featured),
    };
  },
  
  /**
   * Validate data integrity
   */
  validateRegistry() {
    const errors: string[] = [];
    
    // Check for duplicate IDs
    const allIds = [
      ...PORTS.map(p => p.id),
      ...LOCATIONS.map(l => l.id),
      ...SERVICES.map(s => s.id),
      ...FEATURES.map(f => f.id),
      ...TESTIMONIALS.map(t => t.id),
      ...STATS.map(s => s.id),
      ...FAQS.map(f => f.id),
    ];
    
    const duplicateIds = allIds.filter((id, index) => allIds.indexOf(id) !== index);
    if (duplicateIds.length > 0) {
      errors.push(`Duplicate IDs found: ${duplicateIds.join(', ')}`);
    }
    
    // Check for broken service references in testimonials
    TESTIMONIALS.forEach(testimonial => {
      testimonial.services.forEach(serviceId => {
        if (!SERVICES.find(s => s.id === serviceId)) {
          errors.push(`Testimonial ${testimonial.id} references non-existent service: ${serviceId}`);
        }
      });
    });
    
    // Check for broken FAQ relationships
    FAQS.forEach(faq => {
      faq.relatedFaqs?.forEach(relatedId => {
        if (!FAQS.find(f => f.id === relatedId)) {
          errors.push(`FAQ ${faq.id} references non-existent FAQ: ${relatedId}`);
        }
      });
    });
    
    return {
      valid: errors.length === 0,
      errors,
    };
  },
};

/**
 * Quick Access Functions
 * Convenient shortcuts for common data access patterns
 */

// Ports
export { getPortById, getPortByCode, getAllTerminals, getTerminalById, getPortsByState } from './ports';

// Locations
export { getLocationById, getLocationsByState, getLocationsByType, getHubLocation, getAllCities } from './locations';

// Services
export { getServiceById, getServiceBySlug, getServicesByCategory } from './services';

// Features
export { getFeatureById, getFeaturesByCategory, getHighlightedFeatures, getCertificationById } from './features';

// Testimonials
export { getTestimonialById, getFeaturedTestimonials, getAverageRating, getCaseStudyById } from './testimonials';

// Stats
export { getStatById, getStatsByCategory, getFeaturedStats, getMilestonesSorted, getCompanyAge } from './stats';

// FAQs
export { getFaqById, getFaqsByCategory, getFeaturedFaqs, searchFaqs } from './faqs';

/**
 * Default Export
 * Export the Registry object as default for convenient importing
 */
export default Registry;
