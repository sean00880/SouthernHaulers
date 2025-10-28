/**
 * Features Registry
 * 
 * Company features, capabilities, and competitive advantages.
 * Includes technology features, operational capabilities, and certifications.
 */

export interface Feature {
  id: string;
  name: string;
  shortName: string;
  category: 'technology' | 'operational' | 'compliance' | 'customer-service';
  description: string;
  details: string[];
  benefits: string[];
  icon?: string;
  highlighted?: boolean;
}

export interface Certification {
  id: string;
  name: string;
  shortName: string;
  issuer: string;
  description: string;
  validityPeriod?: string;
  verificationUrl?: string;
  icon?: string;
}

export interface Capability {
  id: string;
  name: string;
  description: string;
  metrics?: {
    label: string;
    value: string | number;
    unit?: string;
  }[];
}

export const FEATURES: Feature[] = [
  // Technology Features
  {
    id: 'real-time-tracking',
    name: 'Real-Time GPS Tracking',
    shortName: 'GPS Tracking',
    category: 'technology',
    description: 'Live container location updates every 15 minutes with customer portal access',
    details: [
      'GPS updates every 15 minutes',
      'Real-time location mapping',
      'ETA calculations',
      'Geofencing alerts',
      'Historical route playback',
      'Multi-shipment dashboard view',
    ],
    benefits: [
      'Complete shipment visibility',
      'Proactive exception management',
      'Improved planning and receiving',
      'Reduced customer service inquiries',
      'Enhanced supply chain transparency',
    ],
    icon: 'MapPin',
    highlighted: true,
  },
  {
    id: 'automated-scheduling',
    name: 'Automated Terminal Scheduling',
    shortName: 'eModal Integration',
    category: 'technology',
    description: 'Seamless eModal integration for automatic terminal appointments',
    details: [
      'eModal API integration',
      'Automatic appointment booking',
      'Terminal availability checking',
      'Appointment confirmation tracking',
      'Reschedule automation',
      'Multi-terminal support',
    ],
    benefits: [
      'Faster port turnaround',
      'Reduced gate delays',
      'Optimized driver scheduling',
      'Lower per-diem charges',
      'Improved operational efficiency',
    ],
    icon: 'Calendar',
    highlighted: true,
  },
  {
    id: 'customer-portal',
    name: 'Customer Portal',
    shortName: 'Web Portal',
    category: 'technology',
    description: 'Self-service portal for quotes, tracking, and document access',
    details: [
      'Online quote requests',
      'Shipment tracking',
      'Document repository',
      'Invoice access',
      'Service history',
      'Automated notifications',
      'Mobile responsive design',
    ],
    benefits: [
      '24/7 self-service access',
      'Reduced phone inquiries',
      'Faster quote turnaround',
      'Easy document retrieval',
      'Historical data access',
    ],
    icon: 'Globe',
  },
  {
    id: 'automated-notifications',
    name: 'Automated Status Notifications',
    shortName: 'Notifications',
    category: 'technology',
    description: 'Email and SMS alerts for shipment milestones and exceptions',
    details: [
      'Configurable alert types',
      'Email notifications',
      'SMS text alerts',
      'Milestone tracking',
      'Exception alerts',
      'Delivery confirmations',
      'Custom recipient lists',
    ],
    benefits: [
      'Proactive communication',
      'Exception management',
      'Reduced reactive inquiries',
      'Improved receiving preparation',
      'Enhanced customer experience',
    ],
    icon: 'Bell',
  },

  // Operational Features
  {
    id: 'container-storage',
    name: '300+ Container Storage Capacity',
    shortName: 'Storage',
    category: 'operational',
    description: 'Secure on-site storage for empty and loaded containers',
    details: [
      '300+ container positions',
      'Empty container storage',
      'Loaded container storage',
      'Reefer power hookups',
      'Secure fenced yard',
      '24/7 video surveillance',
      'Daily and long-term rates',
    ],
    benefits: [
      'Avoid port per-diem charges',
      'Flexible delivery scheduling',
      'Reduce demurrage fees',
      'Strategic inventory staging',
      'Cost-effective storage solution',
    ],
    icon: 'Archive',
    highlighted: true,
  },
  {
    id: 'transloading-facility',
    name: 'On-Site Transloading',
    shortName: 'Transload',
    category: 'operational',
    description: 'Container destuffing, consolidation, and value-added services',
    details: [
      'Indoor transloading bays',
      'Container destuffing/stuffing',
      'Cross-dock operations',
      'Consolidation services',
      'Repalletization',
      'Quality inspection',
      'Sorting and segregation',
    ],
    benefits: [
      'Convert FCL to LTL',
      'Reduce transportation costs',
      'Flexible distribution options',
      'Value-added services',
      'Single-source solution',
    ],
    icon: 'Package',
    highlighted: true,
  },
  {
    id: 'dual-transaction',
    name: 'Dual Transaction Operations',
    shortName: 'Dual Moves',
    category: 'operational',
    description: 'Simultaneous container pickup and delivery to maximize efficiency',
    details: [
      'Load-in and load-out same trip',
      'Reduced empty miles',
      'Lower carbon emissions',
      'Cost-effective operations',
      'Optimized driver utilization',
    ],
    benefits: [
      'Lower transportation costs',
      'Reduced environmental impact',
      'Faster turnaround times',
      'Improved efficiency',
      'Competitive pricing',
    ],
    icon: 'RefreshCw',
  },
  {
    id: 'multi-port-coverage',
    name: 'Three-Port Southeast Coverage',
    shortName: 'Multi-Port',
    category: 'operational',
    description: 'Direct service to Savannah, Charleston, and Jacksonville ports',
    details: [
      'Port of Savannah (5.9M TEU)',
      'Charleston Harbor (2.9M TEU)',
      'JAXPORT (1.5M TEU)',
      '2-4 hour turnaround to all ports',
      'All terminals within each port',
      'Strategic hub location',
    ],
    benefits: [
      'Routing flexibility',
      'Reduced transit times',
      'Port congestion alternatives',
      'Comprehensive Southeast coverage',
      'Single carrier solution',
    ],
    icon: 'Ship',
    highlighted: true,
  },

  // Compliance Features
  {
    id: 'twic-certified',
    name: 'TWIC Certified Drivers',
    shortName: 'TWIC',
    category: 'compliance',
    description: 'All drivers maintain Transportation Worker Identification Credentials',
    details: [
      'TSA background checks',
      'Port access credentials',
      '100% driver certification',
      'Regular renewal process',
      'Secure port operations',
    ],
    benefits: [
      'Unrestricted port access',
      'Enhanced security',
      'Faster gate processing',
      'Regulatory compliance',
      'Professional driver corps',
    ],
    icon: 'UserCheck',
    highlighted: true,
  },
  {
    id: 'fmcsa-compliant',
    name: 'FMCSA Compliance',
    shortName: 'FMCSA',
    category: 'compliance',
    description: 'Federal Motor Carrier Safety Administration certified operations',
    details: [
      'DOT compliance',
      'Safety rating',
      'Regular audits',
      'Driver qualification files',
      'Hours of service compliance',
      'Vehicle maintenance programs',
    ],
    benefits: [
      'Safety-first operations',
      'Regulatory compliance',
      'Reduced liability',
      'Professional standards',
      'Reliable service',
    ],
    icon: 'Shield',
  },
  {
    id: 'truth-in-leasing',
    name: 'Truth-in-Leasing Compliant',
    shortName: 'TIL Compliant',
    category: 'compliance',
    description: '49 CFR Part 376 compliant lease agreements with owner-operators',
    details: [
      'Written lease agreements',
      'Transparent compensation',
      'Legal compliance',
      'Driver protection',
      'Clear terms and conditions',
    ],
    benefits: [
      'Ethical business practices',
      'Driver satisfaction',
      'Regulatory compliance',
      'Professional relationships',
      'Stable carrier network',
    ],
    icon: 'FileCheck',
  },
  {
    id: 'fully-insured',
    name: 'Comprehensive Insurance',
    shortName: 'Insured',
    category: 'compliance',
    description: 'Full cargo and liability insurance coverage',
    details: [
      '$1M+ cargo insurance',
      '$2M+ liability coverage',
      'Container damage protection',
      'Reefer breakdown coverage',
      'Workers compensation',
      'Certificate of insurance available',
    ],
    benefits: [
      'Financial protection',
      'Risk mitigation',
      'Peace of mind',
      'Customer confidence',
      'Professional operations',
    ],
    icon: 'Shield',
  },

  // Customer Service Features
  {
    id: '24-7-dispatch',
    name: '24/7 Dispatch & Support',
    shortName: '24/7 Support',
    category: 'customer-service',
    description: 'Round-the-clock dispatch and customer service availability',
    details: [
      '24-hour dispatch center',
      'Weekend operations',
      'Holiday coverage',
      'Emergency support',
      'Direct driver communication',
      'Multi-channel support (phone, email, portal)',
    ],
    benefits: [
      'Immediate response',
      'After-hours support',
      'Emergency handling',
      'Flexible operations',
      'Enhanced customer service',
    ],
    icon: 'Clock',
    highlighted: true,
  },
  {
    id: 'dedicated-account-management',
    name: 'Dedicated Account Management',
    shortName: 'Account Manager',
    category: 'customer-service',
    description: 'Personal account manager for enterprise customers',
    details: [
      'Single point of contact',
      'Proactive communication',
      'Custom solutions',
      'Performance reporting',
      'Strategic planning',
      'Issue resolution',
    ],
    benefits: [
      'Personalized service',
      'Strategic partnership',
      'Streamlined communication',
      'Continuous improvement',
      'Enhanced relationship',
    ],
    icon: 'Users',
  },
  {
    id: 'same-day-quotes',
    name: 'Same-Day Quote Response',
    shortName: 'Fast Quotes',
    category: 'customer-service',
    description: 'Quick quote turnaround within 2-4 hours',
    details: [
      '2-4 hour response time',
      'Online quote calculator',
      'Transparent pricing',
      'Custom rate programs',
      'Volume discounts',
    ],
    benefits: [
      'Fast decision making',
      'Competitive pricing',
      'Budget planning',
      'Transparent costs',
      'Efficient procurement',
    ],
    icon: 'DollarSign',
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'fmcsa',
    name: 'FMCSA Compliance',
    shortName: 'FMCSA',
    issuer: 'Federal Motor Carrier Safety Administration',
    description: 'Certified motor carrier with satisfactory safety rating and full DOT compliance',
    icon: 'Shield',
  },
  {
    id: 'twic',
    name: 'TWIC Certification',
    shortName: 'TWIC',
    issuer: 'Transportation Security Administration',
    description: 'Transportation Worker Identification Credential for all drivers enabling secure port access',
    validityPeriod: '5 years',
    icon: 'BadgeCheck',
  },
  {
    id: 'truth-in-leasing',
    name: 'Truth-in-Leasing Compliance',
    shortName: 'TIL',
    issuer: 'Federal Motor Carrier Safety Administration',
    description: 'Compliance with 49 CFR Part 376 for lease agreements with owner-operators',
    icon: 'FileText',
  },
  {
    id: 'hazmat',
    name: 'Hazmat Endorsement',
    shortName: 'Hazmat',
    issuer: 'Department of Transportation',
    description: 'DOT hazardous materials transportation certification for qualified drivers',
    validityPeriod: '2 years',
    icon: 'AlertTriangle',
  },
  {
    id: 'c-tpat',
    name: 'C-TPAT Certified',
    shortName: 'C-TPAT',
    issuer: 'U.S. Customs and Border Protection',
    description: 'Customs-Trade Partnership Against Terrorism voluntary supply chain security program',
    icon: 'Lock',
  },
  {
    id: 'usda',
    name: 'USDA Approved',
    shortName: 'USDA',
    issuer: 'United States Department of Agriculture',
    description: 'Approved carrier for agricultural products and perishable goods',
    icon: 'Wheat',
  },
  {
    id: 'iso-9001',
    name: 'ISO 9001 Quality Management',
    shortName: 'ISO 9001',
    issuer: 'International Organization for Standardization',
    description: 'Quality management system certification for consistent service delivery',
    icon: 'Award',
  },
];

export const CAPABILITIES: Capability[] = [
  {
    id: 'fleet-size',
    name: 'Fleet Capacity',
    description: 'Company-owned and lease-operated equipment',
    metrics: [
      { label: 'Tractors', value: '75+', unit: 'units' },
      { label: 'Chassis', value: '150+', unit: 'units' },
      { label: 'Trailers', value: '100+', unit: 'units' },
    ],
  },
  {
    id: 'storage-capacity',
    name: 'Storage Capacity',
    description: 'Container and cargo storage facilities',
    metrics: [
      { label: 'Container Positions', value: 300, unit: 'TEU' },
      { label: 'Warehouse Space', value: '50,000', unit: 'sq ft' },
      { label: 'Reefer Plugs', value: 24, unit: 'units' },
    ],
  },
  {
    id: 'throughput',
    name: 'Annual Throughput',
    description: 'Container and cargo volume handled annually',
    metrics: [
      { label: 'Container Moves', value: '15,000+', unit: 'per year' },
      { label: 'Agricultural Loads', value: '8,000+', unit: 'per year' },
      { label: 'Transload Operations', value: '2,500+', unit: 'per year' },
    ],
  },
  {
    id: 'service-area',
    name: 'Service Coverage',
    description: 'Geographic coverage and service locations',
    metrics: [
      { label: 'Primary States', value: 3, unit: 'states' },
      { label: 'Ports Served', value: 3, unit: 'ports' },
      { label: 'Terminals', value: 10, unit: 'terminals' },
      { label: 'Service Cities', value: '50+', unit: 'cities' },
    ],
  },
];

/**
 * Get feature by ID
 */
export function getFeatureById(id: string): Feature | undefined {
  return FEATURES.find(feature => feature.id === id);
}

/**
 * Get features by category
 */
export function getFeaturesByCategory(category: Feature['category']): Feature[] {
  return FEATURES.filter(feature => feature.category === category);
}

/**
 * Get highlighted features
 */
export function getHighlightedFeatures(): Feature[] {
  return FEATURES.filter(feature => feature.highlighted);
}

/**
 * Get certification by ID
 */
export function getCertificationById(id: string): Certification | undefined {
  return CERTIFICATIONS.find(cert => cert.id === id);
}

/**
 * Get capability by ID
 */
export function getCapabilityById(id: string): Capability | undefined {
  return CAPABILITIES.find(cap => cap.id === id);
}

/**
 * Get all feature categories
 */
export function getFeatureCategories(): Feature['category'][] {
  return Array.from(new Set(FEATURES.map(feature => feature.category)));
}
