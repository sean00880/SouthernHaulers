/**
 * Statistics Registry
 * 
 * Company statistics, metrics, and performance indicators.
 * Includes operational stats, growth metrics, and achievements.
 */

export interface Stat {
  id: string;
  label: string;
  value: string | number;
  unit?: string;
  description?: string;
  category: 'operational' | 'customer' | 'growth' | 'infrastructure';
  icon?: string;
  trend?: {
    direction: 'up' | 'down' | 'stable';
    value: string;
    period: string;
  };
  featured?: boolean;
}

export interface Milestone {
  id: string;
  year: number;
  title: string;
  description: string;
  category: 'founding' | 'expansion' | 'achievement' | 'partnership';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string; // ISO date
  metric?: {
    label: string;
    value: string;
  };
}

export const STATS: Stat[] = [
  // Operational Stats
  {
    id: 'container-capacity',
    label: 'Container Storage Capacity',
    value: '300+',
    unit: 'containers',
    description: 'On-site container storage positions for empty and loaded containers',
    category: 'infrastructure',
    icon: 'Archive',
    featured: true,
  },
  {
    id: 'annual-moves',
    label: 'Annual Container Moves',
    value: '15,000+',
    unit: 'per year',
    description: 'Total container movements handled annually across all ports',
    category: 'operational',
    icon: 'TrendingUp',
    trend: {
      direction: 'up',
      value: '22%',
      period: 'YoY',
    },
    featured: true,
  },
  {
    id: 'ports-served',
    label: 'Southeast Ports Served',
    value: 3,
    unit: 'ports',
    description: 'Direct service to Savannah, Charleston, and Jacksonville',
    category: 'operational',
    icon: 'Ship',
    featured: true,
  },
  {
    id: 'terminals-covered',
    label: 'Terminal Coverage',
    value: 10,
    unit: 'terminals',
    description: 'All major terminals across three Southeast ports',
    category: 'operational',
    icon: 'Building',
  },
  {
    id: 'fleet-size',
    label: 'Fleet Size',
    value: '75+',
    unit: 'tractors',
    description: 'Company-owned and lease-operated equipment',
    category: 'infrastructure',
    icon: 'Truck',
  },
  {
    id: 'chassis-pool',
    label: 'Chassis Pool',
    value: '150+',
    unit: 'chassis',
    description: 'Dedicated chassis fleet for 20ft, 40ft, and specialized containers',
    category: 'infrastructure',
    icon: 'Package',
  },
  {
    id: 'warehouse-space',
    label: 'Warehouse Capacity',
    value: '50,000',
    unit: 'sq ft',
    description: 'Indoor transloading and storage space',
    category: 'infrastructure',
    icon: 'Warehouse',
  },
  {
    id: 'reefer-plugs',
    label: 'Reefer Power Hookups',
    value: 24,
    unit: 'plugs',
    description: 'Electrical hookups for refrigerated containers',
    category: 'infrastructure',
    icon: 'Zap',
  },

  // Customer Stats
  {
    id: 'on-time-delivery',
    label: 'On-Time Delivery Rate',
    value: '98.5%',
    description: 'Containers delivered within scheduled window',
    category: 'customer',
    icon: 'Clock',
    trend: {
      direction: 'up',
      value: '3.2%',
      period: 'vs last year',
    },
    featured: true,
  },
  {
    id: 'customer-satisfaction',
    label: 'Customer Satisfaction',
    value: '4.9',
    unit: 'out of 5',
    description: 'Average customer rating across all services',
    category: 'customer',
    icon: 'Star',
    trend: {
      direction: 'stable',
      value: '4.9',
      period: 'consistent',
    },
  },
  {
    id: 'response-time',
    label: 'Average Quote Response',
    value: '2.5',
    unit: 'hours',
    description: 'Average time to provide detailed quote',
    category: 'customer',
    icon: 'Clock',
  },
  {
    id: 'repeat-customers',
    label: 'Customer Retention Rate',
    value: '94%',
    description: 'Customers who continue using our services year-over-year',
    category: 'customer',
    icon: 'Users',
    trend: {
      direction: 'up',
      value: '6%',
      period: 'YoY',
    },
  },

  // Growth Stats
  {
    id: 'years-experience',
    label: 'Years in Business',
    value: 15,
    unit: 'years',
    description: 'Serving Southeast logistics since 2010',
    category: 'growth',
    icon: 'Award',
  },
  {
    id: 'agricultural-loads',
    label: 'Agricultural Loads',
    value: '8,000+',
    unit: 'per year',
    description: 'Annual agricultural hauling capacity',
    category: 'operational',
    icon: 'Wheat',
  },
  {
    id: 'transload-operations',
    label: 'Transload Operations',
    value: '2,500+',
    unit: 'per year',
    description: 'Annual container destuff/stuff operations',
    category: 'operational',
    icon: 'Package',
  },
  {
    id: 'service-cities',
    label: 'Service Cities',
    value: '50+',
    unit: 'cities',
    description: 'Across Georgia, South Carolina, and Florida',
    category: 'operational',
    icon: 'MapPin',
  },
  {
    id: 'states-covered',
    label: 'States Covered',
    value: 3,
    unit: 'primary states',
    description: 'GA, SC, FL with extended coverage to AL, NC, TN',
    category: 'operational',
    icon: 'Map',
  },
  {
    id: 'twic-drivers',
    label: 'TWIC Certified Drivers',
    value: '100%',
    description: 'All drivers maintain current TWIC certification',
    category: 'operational',
    icon: 'BadgeCheck',
  },
  {
    id: 'safety-rating',
    label: 'DOT Safety Rating',
    value: 'Satisfactory',
    description: 'FMCSA safety rating',
    category: 'operational',
    icon: 'Shield',
  },
];

export const MILESTONES: Milestone[] = [
  {
    id: 'founding',
    year: 2010,
    title: 'Southern Haulers Founded',
    description: 'Company established in South Georgia to serve agricultural hauling market',
    category: 'founding',
  },
  {
    id: 'port-service',
    year: 2012,
    title: 'Port Drayage Services Launch',
    description: 'Expanded operations to include container drayage from Port of Savannah',
    category: 'expansion',
  },
  {
    id: 'multi-port',
    year: 2015,
    title: 'Multi-Port Coverage',
    description: 'Added Charleston and Jacksonville to service network',
    category: 'expansion',
  },
  {
    id: 'container-yard',
    year: 2017,
    title: 'Container Yard Opening',
    description: 'Opened 300+ container storage facility with transloading services',
    category: 'expansion',
  },
  {
    id: 'technology',
    year: 2019,
    title: 'Real-Time Tracking Launch',
    description: 'Implemented GPS tracking and customer portal for complete visibility',
    category: 'achievement',
  },
  {
    id: 'harris-partnership',
    year: 2021,
    title: 'Harris Brokerage Partnership',
    description: 'Strategic partnership for nationwide freight brokerage capabilities',
    category: 'partnership',
  },
  {
    id: 'c-tpat',
    year: 2022,
    title: 'C-TPAT Certification',
    description: 'Achieved Customs-Trade Partnership Against Terrorism certification',
    category: 'achievement',
  },
  {
    id: 'expansion',
    year: 2023,
    title: 'Fleet Expansion',
    description: 'Grew fleet to 75+ tractors and 150+ chassis',
    category: 'expansion',
  },
  {
    id: 'milestone-15k',
    year: 2024,
    title: '15,000 Container Moves',
    description: 'Reached milestone of 15,000+ annual container movements',
    category: 'achievement',
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'safety-award',
    title: 'FMCSA Safety Excellence Award',
    description: 'Recognized for outstanding safety record and driver training programs',
    date: '2023-06-15',
  },
  {
    id: 'growth-award',
    title: 'Fastest Growing Drayage Provider',
    description: 'Southeast Logistics Magazine - 22% year-over-year growth',
    date: '2024-03-20',
    metric: {
      label: 'Growth Rate',
      value: '22% YoY',
    },
  },
  {
    id: 'sustainability',
    title: 'Green Fleet Initiative',
    description: 'Reduced fleet emissions by 15% through dual-transaction operations and route optimization',
    date: '2024-01-10',
    metric: {
      label: 'Emissions Reduction',
      value: '15%',
    },
  },
  {
    id: 'customer-service',
    title: 'Customer Service Excellence',
    description: 'Achieved 98.5% on-time delivery rate and 4.9/5 customer satisfaction',
    date: '2024-09-01',
    metric: {
      label: 'On-Time Rate',
      value: '98.5%',
    },
  },
];

/**
 * Get stat by ID
 */
export function getStatById(id: string): Stat | undefined {
  return STATS.find(stat => stat.id === id);
}

/**
 * Get stats by category
 */
export function getStatsByCategory(category: Stat['category']): Stat[] {
  return STATS.filter(stat => stat.category === category);
}

/**
 * Get featured stats
 */
export function getFeaturedStats(): Stat[] {
  return STATS.filter(stat => stat.featured);
}

/**
 * Get milestone by year
 */
export function getMilestoneByYear(year: number): Milestone | undefined {
  return MILESTONES.find(milestone => milestone.year === year);
}

/**
 * Get milestones sorted by year
 */
export function getMilestonesSorted(): Milestone[] {
  return [...MILESTONES].sort((a, b) => a.year - b.year);
}

/**
 * Get recent achievements
 */
export function getRecentAchievements(limit: number = 5): Achievement[] {
  return [...ACHIEVEMENTS]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

/**
 * Get company age
 */
export function getCompanyAge(): number {
  const foundingYear = MILESTONES.find(m => m.category === 'founding')?.year || 2010;
  return new Date().getFullYear() - foundingYear;
}

/**
 * Get total milestones count
 */
export function getTotalMilestones(): number {
  return MILESTONES.length;
}
