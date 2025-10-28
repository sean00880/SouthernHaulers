/**
 * Testimonials Registry
 * 
 * Customer testimonials, reviews, and case studies.
 * Includes ratings, detailed feedback, and success stories.
 */

export interface Testimonial {
  id: string;
  author: {
    name: string;
    title: string;
    company: string;
    industry?: string;
    location?: string;
  };
  rating: number; // 1-5 stars
  quote: string;
  fullText?: string;
  services: string[]; // Service IDs
  metrics?: {
    label: string;
    value: string;
    improvement?: string;
  }[];
  date: string; // ISO date
  featured: boolean;
  verified: boolean;
  imageUrl?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  client: {
    name: string;
    industry: string;
    size: string;
    location: string;
  };
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
    description: string;
  }[];
  services: string[]; // Service IDs
  testimonial?: string;
  testimonialAuthor?: {
    name: string;
    title: string;
  };
  duration: string;
  date: string; // ISO date
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'testimonial-1',
    author: {
      name: 'Michael Chen',
      title: 'Logistics Manager',
      company: 'Southeast Distribution Co.',
      industry: 'Retail Distribution',
      location: 'Atlanta, GA',
    },
    rating: 5,
    quote: 'Southern Haulers helped us reduce drayage costs by 23% while improving on-time delivery to 98%. Their real-time tracking and proactive communication are game-changers.',
    fullText: 'We were struggling with inconsistent drayage service and high per-diem charges from our previous carrier. Southern Haulers not only reduced our costs by 23% but also improved our on-time delivery rate to 98%. Their real-time tracking system gives us complete visibility, and their 24/7 dispatch team is incredibly responsive. The 300+ container storage capacity has been a lifesaver during peak seasons, helping us avoid thousands in demurrage charges.',
    services: ['container-drayage', 'warehousing'],
    metrics: [
      {
        label: 'Cost Reduction',
        value: '23%',
        improvement: 'decreased',
      },
      {
        label: 'On-Time Delivery',
        value: '98%',
        improvement: 'increased',
      },
      {
        label: 'Demurrage Savings',
        value: '$45K/year',
        improvement: 'saved',
      },
    ],
    date: '2024-09-15',
    featured: true,
    verified: true,
  },
  {
    id: 'testimonial-2',
    author: {
      name: 'Sarah Thompson',
      title: 'Operations Director',
      company: 'Pecan Grove Processors',
      industry: 'Agricultural Processing',
      location: 'Albany, GA',
    },
    rating: 5,
    quote: 'We\'ve relied on Southern Haulers for agricultural hauling for over 3 years. Their expertise in handling peanuts and pecans is unmatched, and they scale seamlessly during harvest season.',
    fullText: 'As an agricultural processor, we need carriers who understand the unique requirements of handling peanuts and pecans. Southern Haulers has been our go-to partner for over 3 years. Their equipment is specifically designed for agricultural products, their drivers are trained in proper handling, and they provide the surge capacity we need during harvest season. The flexibility and reliability they offer have made them an integral part of our supply chain.',
    services: ['agricultural-hauling', 'warehousing'],
    metrics: [
      {
        label: 'Years Partnership',
        value: '3+',
      },
      {
        label: 'Seasonal Scaling',
        value: '400%',
        improvement: 'capacity increase',
      },
      {
        label: 'Crop Damage Rate',
        value: '<0.1%',
        improvement: 'maintained',
      },
    ],
    date: '2024-08-22',
    featured: true,
    verified: true,
  },
  {
    id: 'testimonial-3',
    author: {
      name: 'James Rodriguez',
      title: 'VP of Supply Chain',
      company: 'Import Solutions Inc.',
      industry: 'Import/Export',
      location: 'Savannah, GA',
    },
    rating: 5,
    quote: 'The 300+ container storage capacity at Southern Haulers has saved us thousands in per-diem charges. Their strategic location and multi-port coverage give us the flexibility we need.',
    fullText: 'Managing container flow from multiple ports was a constant challenge until we partnered with Southern Haulers. Their 300+ container storage capacity allows us to pull containers from the port before per-diem charges accumulate, and their strategic South Georgia location gives us equal access to Savannah, Charleston, and Jacksonville. The transloading services have been invaluable for consolidating shipments and reducing our overall transportation costs. This is truly a one-stop logistics solution.',
    services: ['container-drayage', 'warehousing', 'transloading'],
    metrics: [
      {
        label: 'Per-Diem Savings',
        value: '$78K/year',
        improvement: 'saved',
      },
      {
        label: 'Container Turns',
        value: '2.5x faster',
        improvement: 'increased',
      },
      {
        label: 'Ports Accessed',
        value: '3',
      },
    ],
    date: '2024-10-05',
    featured: true,
    verified: true,
  },
  {
    id: 'testimonial-4',
    author: {
      name: 'Emily Patterson',
      title: 'Procurement Manager',
      company: 'Fresh Harvest Foods',
      industry: 'Food & Beverage',
      location: 'Jacksonville, FL',
    },
    rating: 5,
    quote: 'Their refrigerated container service is exceptional. Temperature monitoring and documentation give us peace of mind for our perishable imports.',
    fullText: 'We import temperature-sensitive products from South America and Asia, and Southern Haulers\' refrigerated drayage service has been outstanding. Their genset-equipped tractors maintain proper temperatures, and the continuous monitoring with detailed logs provides the documentation we need for USDA compliance. We\'ve never had a temperature deviation incident, and their expedited service ensures our products reach distribution centers quickly.',
    services: ['refrigerated-transport', 'expedited-drayage'],
    metrics: [
      {
        label: 'Temperature Incidents',
        value: '0',
        improvement: 'zero incidents',
      },
      {
        label: 'Average Transit Time',
        value: '3.2 hours',
        improvement: '40% faster',
      },
    ],
    date: '2024-07-18',
    featured: false,
    verified: true,
  },
  {
    id: 'testimonial-5',
    author: {
      name: 'David Martinez',
      title: 'Logistics Coordinator',
      company: 'Carolina Manufacturing',
      industry: 'Manufacturing',
      location: 'Charleston, SC',
    },
    rating: 5,
    quote: 'Same-day quotes, competitive pricing, and excellent customer service. Southern Haulers makes drayage logistics simple and stress-free.',
    fullText: 'We were looking for a drayage provider who could offer competitive rates without sacrificing service quality. Southern Haulers exceeded our expectations on both fronts. Their quote response time is incredibly fast (usually same day), pricing is transparent and competitive, and the customer service team is always available to help with special requests. The online portal makes it easy to track shipments and access documentation. Highly recommended!',
    services: ['container-drayage', 'intermodal-drayage'],
    metrics: [
      {
        label: 'Quote Response Time',
        value: '<4 hours',
      },
      {
        label: 'Cost Savings',
        value: '18%',
        improvement: 'reduced',
      },
    ],
    date: '2024-09-30',
    featured: false,
    verified: true,
  },
  {
    id: 'testimonial-6',
    author: {
      name: 'Robert Wilson',
      title: 'Supply Chain Manager',
      company: 'Southeast Imports LLC',
      industry: 'Import/Export',
      location: 'Macon, GA',
    },
    rating: 4,
    quote: 'Reliable service with great communication. The transloading facility has been a valuable addition to our supply chain strategy.',
    fullText: 'We started using Southern Haulers for basic drayage and quickly expanded to utilizing their transloading services. The ability to destuff containers at their facility and consolidate shipments has reduced our LTL costs significantly. Communication is excellent, with automated notifications keeping us informed every step of the way. Very satisfied with the partnership.',
    services: ['container-drayage', 'transloading'],
    metrics: [
      {
        label: 'LTL Cost Reduction',
        value: '32%',
        improvement: 'decreased',
      },
    ],
    date: '2024-06-12',
    featured: false,
    verified: true,
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-study-1',
    title: 'Reducing Per-Diem Charges by $120K Annually',
    subtitle: 'How strategic container storage transformed supply chain costs',
    client: {
      name: 'National Retailer',
      industry: 'Retail Distribution',
      size: '500+ employees',
      location: 'Atlanta, GA',
    },
    challenge: 'A major retail distributor was incurring excessive per-diem and demurrage charges due to limited receiving capacity at their facility. Containers would sit at the port for 5-7 days, accumulating daily charges of $100-200 per container. With 200+ containers per month, annual costs exceeded $240K.',
    solution: 'Southern Haulers implemented a container staging program using their 300+ container storage capacity. Containers are pulled from the port within 24 hours to avoid per-diem charges, stored at Southern Haulers\' facility, and delivered to the client\'s warehouse on their preferred schedule. The transloading option allowed for consolidation of multiple containers into fewer truckload shipments.',
    results: [
      {
        metric: 'Per-Diem & Demurrage Savings',
        value: '$120,000/year',
        description: 'Eliminated 80% of port storage charges',
      },
      {
        metric: 'Container Turn Time',
        value: '85% faster',
        description: 'From 6.5 days average to 1 day',
      },
      {
        metric: 'Receiving Efficiency',
        value: '40% improvement',
        description: 'Scheduled deliveries reduced dock congestion',
      },
      {
        metric: 'Transportation Costs',
        value: '15% reduction',
        description: 'Through consolidation and optimized routing',
      },
    ],
    services: ['container-drayage', 'warehousing', 'transloading'],
    testimonial: 'Southern Haulers\' container storage program was a game-changer for our operation. We went from constant fire-drills managing per-diem charges to a smooth, predictable flow of containers. The ROI was immediate and substantial.',
    testimonialAuthor: {
      name: 'Jennifer Adams',
      title: 'Director of Logistics',
    },
    duration: '12 months',
    date: '2024-01-15',
  },
  {
    id: 'case-study-2',
    title: 'Scaling Agricultural Hauling During Peak Season',
    subtitle: 'Flexible capacity meets harvest surge demands',
    client: {
      name: 'Regional Peanut Co-op',
      industry: 'Agricultural Processing',
      size: '200+ members',
      location: 'South Georgia',
    },
    challenge: 'A peanut processing cooperative needed to scale hauling capacity by 300% during the 10-week harvest season. Their existing carrier network couldn\'t provide the surge capacity, resulting in delayed pickups, farm storage issues, and missed processing windows.',
    solution: 'Southern Haulers developed a dedicated harvest season program with pre-committed equipment, flexible scheduling, and 24/7 dispatch to handle peak volume. Specialized agricultural equipment and trained drivers ensured proper handling of peanuts. GPS tracking provided real-time visibility to coordinate farm pickups and processing facility deliveries.',
    results: [
      {
        metric: 'Capacity Scaling',
        value: '350%',
        description: 'From 50 to 225 daily loads during peak',
      },
      {
        metric: 'Harvest Season On-Time',
        value: '99.2%',
        description: 'Virtually eliminated delayed pickups',
      },
      {
        metric: 'Crop Damage Rate',
        value: '<0.05%',
        description: 'Industry-leading handling performance',
      },
      {
        metric: 'Processing Efficiency',
        value: '25% increase',
        description: 'Consistent supply enabled optimal plant utilization',
      },
    ],
    services: ['agricultural-hauling', 'warehousing'],
    testimonial: 'Having a partner who understands agriculture and can scale with us during harvest is critical. Southern Haulers delivered beyond our expectations, handling record volumes without missing a beat.',
    testimonialAuthor: {
      name: 'Thomas Greene',
      title: 'General Manager',
    },
    duration: '3 harvest seasons',
    date: '2024-03-20',
  },
];

/**
 * Get testimonial by ID
 */
export function getTestimonialById(id: string): Testimonial | undefined {
  return TESTIMONIALS.find(t => t.id === id);
}

/**
 * Get featured testimonials
 */
export function getFeaturedTestimonials(): Testimonial[] {
  return TESTIMONIALS.filter(t => t.featured);
}

/**
 * Get testimonials by service
 */
export function getTestimonialsByService(serviceId: string): Testimonial[] {
  return TESTIMONIALS.filter(t => t.services.includes(serviceId));
}

/**
 * Get testimonials by industry
 */
export function getTestimonialsByIndustry(industry: string): Testimonial[] {
  return TESTIMONIALS.filter(t => t.author.industry === industry);
}

/**
 * Get average rating
 */
export function getAverageRating(): number {
  if (TESTIMONIALS.length === 0) return 0;
  const sum = TESTIMONIALS.reduce((acc, t) => acc + t.rating, 0);
  return Number((sum / TESTIMONIALS.length).toFixed(1));
}

/**
 * Get case study by ID
 */
export function getCaseStudyById(id: string): CaseStudy | undefined {
  return CASE_STUDIES.find(cs => cs.id === id);
}

/**
 * Get case studies by service
 */
export function getCaseStudiesByService(serviceId: string): CaseStudy[] {
  return CASE_STUDIES.filter(cs => cs.services.includes(serviceId));
}

/**
 * Get recent testimonials
 */
export function getRecentTestimonials(limit: number = 5): Testimonial[] {
  return [...TESTIMONIALS]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}
