/**
 * Services Registry
 * 
 * Comprehensive data about all services offered by Southern Haulers.
 * Includes service types, pricing, features, and detailed descriptions.
 */

export interface ServicePricing {
  baseRate?: number;
  unit: string;
  currency: string;
  rateType: 'per-container' | 'per-mile' | 'per-hour' | 'per-ton' | 'custom';
  minimumCharge?: number;
  additionalFees?: {
    name: string;
    amount?: number;
    description: string;
  }[];
}

export interface Service {
  id: string;
  name: string;
  shortName: string;
  category: 'drayage' | 'agricultural' | 'warehousing' | 'specialized';
  description: string;
  longDescription: string;
  features: string[];
  benefits: string[];
  pricing?: ServicePricing;
  equipmentTypes?: string[];
  certifications?: string[];
  availability: 'all-locations' | 'select-locations' | 'custom';
  icon?: string;
  imageUrl?: string;
  slug: string;
}

export const SERVICES: Service[] = [
  // Drayage Services
  {
    id: 'container-drayage',
    name: 'Container Drayage',
    shortName: 'Drayage',
    category: 'drayage',
    slug: 'drayage',
    description: 'Port-to-door container transport with live tracking and automated scheduling',
    longDescription: 'Our container drayage service provides seamless transportation of shipping containers from Southeast ports (Savannah, Charleston, Jacksonville) to your facility. We offer real-time GPS tracking, automated terminal scheduling via eModal, and TWIC-certified drivers to ensure secure, efficient delivery.',
    features: [
      'Direct service to 3 major Southeast ports',
      'Real-time GPS tracking every 15 minutes',
      'Automated eModal terminal scheduling',
      'TWIC-certified drivers',
      'Same-day and next-day service available',
      '20ft, 40ft, and 40ft high-cube containers',
      'Hazmat certified capabilities',
      'Per-diem charge mitigation',
    ],
    benefits: [
      'Reduce per-diem and demurrage charges',
      'Faster port turnaround times',
      'Complete shipment visibility',
      'Dedicated account management',
      'Flexible scheduling options',
      '24/7 dispatch support',
    ],
    pricing: {
      baseRate: 350,
      unit: 'per container',
      currency: 'USD',
      rateType: 'per-container',
      additionalFees: [
        {
          name: 'Overweight surcharge',
          description: 'Additional fee for containers exceeding standard weight limits',
        },
        {
          name: 'After-hours pickup',
          amount: 75,
          description: 'Weekend or after-hours terminal pickup',
        },
        {
          name: 'Chassis split',
          amount: 50,
          description: 'When chassis return location differs from pickup',
        },
      ],
    },
    equipmentTypes: [
      '20ft chassis',
      '40ft chassis',
      '40ft tri-axle chassis',
      'Genset capable tractors',
    ],
    certifications: [
      'FMCSA compliant',
      'TWIC certified',
      'Hazmat endorsed',
      'C-TPAT certified',
    ],
    availability: 'all-locations',
    icon: 'Ship',
  },
  {
    id: 'port-drayage',
    name: 'Port Drayage',
    shortName: 'Port Service',
    category: 'drayage',
    slug: 'port-drayage',
    description: 'Specialized port-to-warehouse transportation with terminal expertise',
    longDescription: 'Expert port drayage services connecting major Southeast ports to inland facilities. Our experienced team handles all terminal interactions, documentation, and scheduling to streamline your supply chain.',
    features: [
      'Port of Savannah (5.9M TEU/year)',
      'Charleston Harbor (2.9M TEU/year)',
      'JAXPORT (1.5M TEU/year)',
      'Terminal appointment coordination',
      'Container pre-pull services',
      'Street turn coordination',
      'Empty container repositioning',
    ],
    benefits: [
      'Minimize port congestion delays',
      'Reduce terminal dwell time',
      'Optimize container flow',
      'Lower transportation costs',
      'Improve supply chain velocity',
    ],
    equipmentTypes: [
      'Day cab tractors',
      'Company-owned chassis fleet',
      'Tri-axle chassis for heavy containers',
    ],
    certifications: [
      'TWIC certified',
      'Port authority approved',
      'Terminal-specific credentials',
    ],
    availability: 'select-locations',
    icon: 'Anchor',
  },
  {
    id: 'intermodal-drayage',
    name: 'Intermodal Drayage',
    shortName: 'Intermodal',
    category: 'drayage',
    slug: 'intermodal',
    description: 'Seamless container movement between rail, port, and warehouse facilities',
    longDescription: 'Complete intermodal transportation solutions connecting ports, rail ramps, and distribution centers. We coordinate across multiple carriers and modes to optimize your supply chain efficiency.',
    features: [
      'Port to rail ramp transfers',
      'Rail ramp to warehouse delivery',
      'Cross-dock operations',
      'Dual transactions (load in/load out)',
      'Inter-carrier coordination',
      'Multiple mode integration',
    ],
    benefits: [
      'Reduced transportation costs',
      'Lower carbon footprint',
      'Extended geographic reach',
      'Flexible routing options',
      'Equipment optimization',
    ],
    equipmentTypes: [
      'Intermodal chassis',
      'Rail-certified tractors',
      'Doubles-qualified equipment',
    ],
    certifications: [
      'FMCSA compliant',
      'Rail carrier approved',
      'DOT certified',
    ],
    availability: 'all-locations',
    icon: 'Train',
  },

  // Agricultural Hauling Services
  {
    id: 'agricultural-hauling',
    name: 'Agricultural Hauling',
    shortName: 'Ag Transport',
    category: 'agricultural',
    slug: 'agricultural',
    description: 'Specialized bulk transport for peanuts, pecans, cotton, feed, and fertilizer',
    longDescription: 'Dedicated agricultural hauling services for Southeast farming operations. We specialize in bulk commodities with equipment designed for agricultural products, ensuring product integrity and efficient delivery.',
    features: [
      'Peanut and pecan hauling',
      'Cotton module transport',
      'Feed and fertilizer delivery',
      'Grain hauling',
      'Bulk seed transport',
      'Seasonal surge capacity',
      'Farm-to-processor routes',
      'Regional coverage across GA, SC, FL',
    ],
    benefits: [
      'Industry-specific expertise',
      'Equipment designed for ag products',
      'Flexible scheduling for harvest',
      'Reduce crop spoilage',
      'Competitive bulk rates',
      'Direct farm pickup',
    ],
    pricing: {
      unit: 'per ton or per load',
      currency: 'USD',
      rateType: 'per-ton',
    },
    equipmentTypes: [
      'Hopper trailers',
      'Flatbed trailers',
      'End-dump trailers',
      'Walking floor trailers',
      'Bulk pneumatic tankers',
    ],
    certifications: [
      'USDA approved',
      'Organic certified handlers',
      'Food safety certified',
    ],
    availability: 'all-locations',
    icon: 'Wheat',
  },

  // Warehousing Services
  {
    id: 'warehousing',
    name: 'Warehousing & Transloading',
    shortName: 'Warehousing',
    category: 'warehousing',
    slug: 'warehousing',
    description: '300+ container storage with cross-docking and distribution capabilities',
    longDescription: 'Comprehensive warehousing and transloading services with 300+ container capacity. Our facility provides short-term and long-term storage, cross-docking, and value-added services to optimize your supply chain.',
    features: [
      '300+ container storage capacity',
      'Short-term daily storage',
      'Long-term storage programs',
      'Container transloading',
      'Cross-dock operations',
      'Container destuffing/stuffing',
      'Palletization services',
      'Secure fenced facility',
      'Video surveillance',
      'Inventory management systems',
    ],
    benefits: [
      'Avoid port per-diem charges',
      'Reduce demurrage fees',
      'Flexible storage duration',
      'Consolidation opportunities',
      'Value-added services available',
      'Strategic location for distribution',
    ],
    pricing: {
      unit: 'per container per day',
      currency: 'USD',
      rateType: 'custom',
      additionalFees: [
        {
          name: 'Transloading',
          description: 'Per container destuff or stuff operation',
        },
        {
          name: 'Palletization',
          description: 'Per pallet handling and wrapping',
        },
        {
          name: 'Storage',
          description: 'Daily rate decreases with volume and duration',
        },
      ],
    },
    equipmentTypes: [
      'Empty container storage',
      'Loaded container storage',
      'Covered dock space',
      'Outdoor container yard',
    ],
    certifications: [
      'Secure facility',
      'Insurance coverage',
      'Bonded warehouse option',
    ],
    availability: 'select-locations',
    icon: 'Warehouse',
  },
  {
    id: 'transloading',
    name: 'Container Transloading',
    shortName: 'Transload',
    category: 'warehousing',
    slug: 'transloading',
    description: 'Efficient container-to-truck transfer and consolidation services',
    longDescription: 'Professional transloading services to transfer cargo between containers and trucks or consolidate multiple shipments. Reduce costs and improve efficiency with our on-site transloading capabilities.',
    features: [
      'Container destuffing',
      'Container stuffing',
      'Consolidation services',
      'Deconsolidation services',
      'Repalletization',
      'Sorting and segregation',
      'Quality inspection',
      'Secure indoor operations',
    ],
    benefits: [
      'Convert full container to LTL',
      'Consolidate multiple shipments',
      'Reduce overall transportation costs',
      'Faster delivery to final destination',
      'Flexible distribution options',
    ],
    equipmentTypes: [
      'Forklifts (3K-10K capacity)',
      'Pallet jacks',
      'Loading docks',
      'Container handling equipment',
    ],
    availability: 'select-locations',
    icon: 'Package',
  },

  // Specialized Services
  {
    id: 'refrigerated-transport',
    name: 'Refrigerated Container Transport',
    shortName: 'Reefer',
    category: 'specialized',
    slug: 'refrigerated',
    description: 'Temperature-controlled container drayage with continuous monitoring',
    longDescription: 'Specialized refrigerated container transport for temperature-sensitive cargo. Our genset-equipped tractors and monitoring systems ensure your perishable products maintain proper temperature throughout transit.',
    features: [
      'Temperature-controlled drayage',
      'Continuous temperature monitoring',
      'Genset-equipped tractors',
      'Pre-trip inspections (PTI)',
      'USDA cold storage certified',
      'Temperature logs and documentation',
      'Emergency response protocols',
      'Reefer container storage',
    ],
    benefits: [
      'Maintain product integrity',
      'Reduce spoilage risk',
      'Compliance documentation',
      'Peace of mind for perishables',
      'Insurance for temperature deviation',
    ],
    pricing: {
      baseRate: 650,
      unit: 'per container',
      currency: 'USD',
      rateType: 'per-container',
      additionalFees: [
        {
          name: 'Fuel surcharge',
          description: 'Additional fuel for refrigeration unit',
        },
        {
          name: 'Extended monitoring',
          description: 'For multi-day storage with power',
        },
      ],
    },
    equipmentTypes: [
      'Genset-capable tractors',
      'Backup gensets',
      'Temperature monitoring systems',
      'Reefer chassis',
    ],
    certifications: [
      'USDA certified',
      'Food safety trained',
      'Cold chain certified',
    ],
    availability: 'all-locations',
    icon: 'Thermometer',
  },
  {
    id: 'expedited-drayage',
    name: 'Expedited Drayage',
    shortName: 'Expedited',
    category: 'specialized',
    slug: 'expedited',
    description: 'Time-sensitive container transport with priority scheduling',
    longDescription: 'Rush delivery service for urgent shipments requiring same-day or next-day delivery. Priority terminal appointments and dedicated equipment ensure your time-critical cargo arrives on schedule.',
    features: [
      'Same-day delivery available',
      'Priority terminal appointments',
      'Dedicated equipment',
      'After-hours operations',
      'Weekend service',
      'Real-time status updates',
      'Direct communication with driver',
    ],
    benefits: [
      'Meet critical deadlines',
      'Minimize production downtime',
      'Priority customer service',
      'Flexible pickup/delivery windows',
      'Guaranteed service levels',
    ],
    equipmentTypes: [
      'Dedicated fleet',
      'On-call equipment',
    ],
    availability: 'all-locations',
    icon: 'Zap',
  },
  {
    id: 'hazmat-transport',
    name: 'Hazardous Materials Transport',
    shortName: 'Hazmat',
    category: 'specialized',
    slug: 'hazmat',
    description: 'Certified dangerous goods transportation with full compliance',
    longDescription: 'Fully compliant hazardous materials transportation services. Our hazmat-certified drivers and equipment meet all DOT and EPA requirements for safe transport of dangerous goods.',
    features: [
      'DOT hazmat certified drivers',
      'EPA compliance',
      'Proper placarding',
      'Emergency response plans',
      'Specialized equipment',
      'Documentation support',
      '24/7 emergency hotline',
    ],
    benefits: [
      'Full regulatory compliance',
      'Reduced liability',
      'Expert handling',
      'Safety-first operations',
      'Proper documentation',
    ],
    certifications: [
      'DOT Hazmat certified',
      'EPA approved',
      'Emergency response trained',
    ],
    availability: 'select-locations',
    icon: 'AlertTriangle',
  },
];

/**
 * Get service by ID
 */
export function getServiceById(id: string): Service | undefined {
  return SERVICES.find(service => service.id === id);
}

/**
 * Get service by slug
 */
export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find(service => service.slug === slug);
}

/**
 * Get services by category
 */
export function getServicesByCategory(category: Service['category']): Service[] {
  return SERVICES.filter(service => service.category === category);
}

/**
 * Get all service categories
 */
export function getServiceCategories(): Service['category'][] {
  return Array.from(new Set(SERVICES.map(service => service.category)));
}

/**
 * Check if service is available at location
 */
export function isServiceAvailableAt(serviceId: string, locationId: string): boolean {
  const service = getServiceById(serviceId);
  if (!service) return false;
  
  // This would integrate with locations registry
  return service.availability === 'all-locations';
}

/**
 * Get services with pricing information
 */
export function getServicesWithPricing(): Service[] {
  return SERVICES.filter(service => service.pricing !== undefined);
}
