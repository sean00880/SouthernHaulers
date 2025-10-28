/**
 * Locations Registry
 * 
 * Service areas, cities, and regions covered by Southern Haulers.
 * Includes primary service locations and coverage zones.
 */

export interface Location {
  id: string;
  name: string;
  displayName: string;
  city: string;
  state: string;
  stateCode: string;
  region: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  type: 'hub' | 'service-area' | 'city' | 'region';
  population?: number;
  description?: string;
  servicesAvailable: string[];
  distanceFromHub?: {
    miles: number;
    hours: number;
  };
  majorIndustries?: string[];
}

export interface ServiceRegion {
  id: string;
  name: string;
  description: string;
  states: string[];
  coverage: 'primary' | 'secondary' | 'extended';
  locations: string[]; // Location IDs
}

export const LOCATIONS: Location[] = [
  // Hub Location
  {
    id: 'south-georgia-hub',
    name: 'South Georgia Hub',
    displayName: 'South Georgia Hub',
    city: 'Valdosta',
    state: 'Georgia',
    stateCode: 'GA',
    region: 'Southeast',
    coordinates: {
      lat: 30.8327,
      lng: -83.2785,
    },
    type: 'hub',
    population: 56000,
    description: 'Strategic hub location enabling 2-4 hour turnaround to all three major Southeast ports',
    servicesAvailable: [
      'container-drayage',
      'agricultural-hauling',
      'warehousing',
      'transloading',
      'refrigerated-transport',
      'container-storage',
    ],
    majorIndustries: [
      'Agriculture',
      'Logistics',
      'Manufacturing',
    ],
  },

  // Georgia Cities
  {
    id: 'atlanta-ga',
    name: 'Atlanta',
    displayName: 'Atlanta, GA',
    city: 'Atlanta',
    state: 'Georgia',
    stateCode: 'GA',
    region: 'Southeast',
    coordinates: {
      lat: 33.7490,
      lng: -84.3880,
    },
    type: 'city',
    population: 5900000,
    description: 'Major metropolitan hub and logistics center in the Southeast',
    servicesAvailable: [
      'container-drayage',
      'agricultural-hauling',
      'warehousing',
      'refrigerated-transport',
    ],
    distanceFromHub: {
      miles: 220,
      hours: 3.5,
    },
    majorIndustries: [
      'Distribution',
      'Manufacturing',
      'Retail',
      'Food & Beverage',
    ],
  },
  {
    id: 'savannah-ga',
    name: 'Savannah',
    displayName: 'Savannah, GA',
    city: 'Savannah',
    state: 'Georgia',
    stateCode: 'GA',
    region: 'Southeast',
    coordinates: {
      lat: 32.0809,
      lng: -81.0912,
    },
    type: 'city',
    population: 390000,
    description: 'Port city with largest single-terminal container facility in North America',
    servicesAvailable: [
      'container-drayage',
      'port-services',
      'warehousing',
      'transloading',
      'refrigerated-transport',
    ],
    distanceFromHub: {
      miles: 180,
      hours: 3,
    },
    majorIndustries: [
      'Port Operations',
      'Logistics',
      'Manufacturing',
      'Tourism',
    ],
  },
  {
    id: 'macon-ga',
    name: 'Macon',
    displayName: 'Macon, GA',
    city: 'Macon',
    state: 'Georgia',
    stateCode: 'GA',
    region: 'Southeast',
    coordinates: {
      lat: 32.8407,
      lng: -83.6324,
    },
    type: 'city',
    population: 153000,
    description: 'Central Georgia distribution and manufacturing center',
    servicesAvailable: [
      'container-drayage',
      'agricultural-hauling',
      'warehousing',
    ],
    distanceFromHub: {
      miles: 110,
      hours: 1.5,
    },
    majorIndustries: [
      'Manufacturing',
      'Distribution',
      'Agriculture',
    ],
  },
  {
    id: 'columbus-ga',
    name: 'Columbus',
    displayName: 'Columbus, GA',
    city: 'Columbus',
    state: 'Georgia',
    stateCode: 'GA',
    region: 'Southeast',
    coordinates: {
      lat: 32.4609,
      lng: -84.9877,
    },
    type: 'city',
    population: 195000,
    description: 'Major manufacturing and military hub in western Georgia',
    servicesAvailable: [
      'container-drayage',
      'agricultural-hauling',
      'warehousing',
      'refrigerated-transport',
    ],
    distanceFromHub: {
      miles: 85,
      hours: 1.5,
    },
    majorIndustries: [
      'Manufacturing',
      'Military',
      'Retail',
    ],
  },
  {
    id: 'albany-ga',
    name: 'Albany',
    displayName: 'Albany, GA',
    city: 'Albany',
    state: 'Georgia',
    stateCode: 'GA',
    region: 'Southeast',
    coordinates: {
      lat: 31.5785,
      lng: -84.1557,
    },
    type: 'city',
    population: 75000,
    description: 'Agricultural center with strong peanut and pecan industries',
    servicesAvailable: [
      'agricultural-hauling',
      'container-drayage',
      'warehousing',
    ],
    distanceFromHub: {
      miles: 45,
      hours: 0.75,
    },
    majorIndustries: [
      'Agriculture',
      'Food Processing',
      'Distribution',
    ],
  },

  // South Carolina Cities
  {
    id: 'charleston-sc',
    name: 'Charleston',
    displayName: 'Charleston, SC',
    city: 'Charleston',
    state: 'South Carolina',
    stateCode: 'SC',
    region: 'Southeast',
    coordinates: {
      lat: 32.7765,
      lng: -79.9311,
    },
    type: 'city',
    population: 800000,
    description: 'Historic port city with major container operations',
    servicesAvailable: [
      'container-drayage',
      'port-services',
      'warehousing',
      'refrigerated-transport',
    ],
    distanceFromHub: {
      miles: 220,
      hours: 3.5,
    },
    majorIndustries: [
      'Port Operations',
      'Logistics',
      'Manufacturing',
      'Tourism',
      'Aerospace',
    ],
  },
  {
    id: 'columbia-sc',
    name: 'Columbia',
    displayName: 'Columbia, SC',
    city: 'Columbia',
    state: 'South Carolina',
    stateCode: 'SC',
    region: 'Southeast',
    coordinates: {
      lat: 34.0007,
      lng: -81.0348,
    },
    type: 'city',
    population: 850000,
    description: 'State capital and major distribution center',
    servicesAvailable: [
      'container-drayage',
      'agricultural-hauling',
      'warehousing',
    ],
    distanceFromHub: {
      miles: 200,
      hours: 3,
    },
    majorIndustries: [
      'Government',
      'Distribution',
      'Manufacturing',
      'Education',
    ],
  },
  {
    id: 'greenville-sc',
    name: 'Greenville',
    displayName: 'Greenville, SC',
    city: 'Greenville',
    state: 'South Carolina',
    stateCode: 'SC',
    region: 'Southeast',
    coordinates: {
      lat: 34.8526,
      lng: -82.3940,
    },
    type: 'city',
    population: 950000,
    description: 'Major manufacturing hub with BMW operations',
    servicesAvailable: [
      'container-drayage',
      'warehousing',
      'refrigerated-transport',
    ],
    distanceFromHub: {
      miles: 280,
      hours: 4,
    },
    majorIndustries: [
      'Manufacturing',
      'Automotive',
      'Technology',
    ],
  },

  // Florida Cities
  {
    id: 'jacksonville-fl',
    name: 'Jacksonville',
    displayName: 'Jacksonville, FL',
    city: 'Jacksonville',
    state: 'Florida',
    stateCode: 'FL',
    region: 'Southeast',
    coordinates: {
      lat: 30.3322,
      lng: -81.6557,
    },
    type: 'city',
    population: 1600000,
    description: 'Major port city and logistics hub in Northeast Florida',
    servicesAvailable: [
      'container-drayage',
      'port-services',
      'warehousing',
      'refrigerated-transport',
    ],
    distanceFromHub: {
      miles: 290,
      hours: 4,
    },
    majorIndustries: [
      'Port Operations',
      'Logistics',
      'Financial Services',
      'Healthcare',
    ],
  },
  {
    id: 'tallahassee-fl',
    name: 'Tallahassee',
    displayName: 'Tallahassee, FL',
    city: 'Tallahassee',
    state: 'Florida',
    stateCode: 'FL',
    region: 'Southeast',
    coordinates: {
      lat: 30.4383,
      lng: -84.2807,
    },
    type: 'city',
    population: 380000,
    description: 'State capital with strong agricultural connections',
    servicesAvailable: [
      'container-drayage',
      'agricultural-hauling',
      'warehousing',
    ],
    distanceFromHub: {
      miles: 70,
      hours: 1,
    },
    majorIndustries: [
      'Government',
      'Education',
      'Agriculture',
    ],
  },
  {
    id: 'orlando-fl',
    name: 'Orlando',
    displayName: 'Orlando, FL',
    city: 'Orlando',
    state: 'Florida',
    stateCode: 'FL',
    region: 'Southeast',
    coordinates: {
      lat: 28.5383,
      lng: -81.3792,
    },
    type: 'city',
    population: 2600000,
    description: 'Major tourism and distribution center in Central Florida',
    servicesAvailable: [
      'container-drayage',
      'warehousing',
      'refrigerated-transport',
    ],
    distanceFromHub: {
      miles: 350,
      hours: 5,
    },
    majorIndustries: [
      'Tourism',
      'Distribution',
      'Technology',
      'Food & Beverage',
    ],
  },
  {
    id: 'tampa-fl',
    name: 'Tampa',
    displayName: 'Tampa, FL',
    city: 'Tampa',
    state: 'Florida',
    stateCode: 'FL',
    region: 'Southeast',
    coordinates: {
      lat: 27.9506,
      lng: -82.4572,
    },
    type: 'city',
    population: 3200000,
    description: 'Major port city and business center on Florida\'s Gulf Coast',
    servicesAvailable: [
      'container-drayage',
      'warehousing',
      'refrigerated-transport',
    ],
    distanceFromHub: {
      miles: 420,
      hours: 6,
    },
    majorIndustries: [
      'Port Operations',
      'Financial Services',
      'Healthcare',
      'Tourism',
    ],
  },

  // North Carolina Cities (Extended Coverage)
  {
    id: 'charlotte-nc',
    name: 'Charlotte',
    displayName: 'Charlotte, NC',
    city: 'Charlotte',
    state: 'North Carolina',
    stateCode: 'NC',
    region: 'Southeast',
    coordinates: {
      lat: 35.2271,
      lng: -80.8431,
    },
    type: 'city',
    population: 2700000,
    description: 'Major financial center and distribution hub',
    servicesAvailable: [
      'container-drayage',
      'warehousing',
    ],
    distanceFromHub: {
      miles: 400,
      hours: 6,
    },
    majorIndustries: [
      'Financial Services',
      'Distribution',
      'Manufacturing',
      'Technology',
    ],
  },

  // Alabama Cities (Extended Coverage)
  {
    id: 'mobile-al',
    name: 'Mobile',
    displayName: 'Mobile, AL',
    city: 'Mobile',
    state: 'Alabama',
    stateCode: 'AL',
    region: 'Southeast',
    coordinates: {
      lat: 30.6954,
      lng: -88.0399,
    },
    type: 'city',
    population: 430000,
    description: 'Gulf Coast port city with strong maritime industry',
    servicesAvailable: [
      'container-drayage',
      'agricultural-hauling',
    ],
    distanceFromHub: {
      miles: 280,
      hours: 4,
    },
    majorIndustries: [
      'Port Operations',
      'Shipbuilding',
      'Aerospace',
    ],
  },
];

export const SERVICE_REGIONS: ServiceRegion[] = [
  {
    id: 'primary-southeast',
    name: 'Primary Southeast Coverage',
    description: 'Core service area with daily operations and full service capabilities',
    states: ['GA', 'SC', 'FL'],
    coverage: 'primary',
    locations: [
      'south-georgia-hub',
      'atlanta-ga',
      'savannah-ga',
      'macon-ga',
      'columbus-ga',
      'albany-ga',
      'charleston-sc',
      'columbia-sc',
      'jacksonville-fl',
      'tallahassee-fl',
    ],
  },
  {
    id: 'secondary-southeast',
    name: 'Secondary Southeast Coverage',
    description: 'Regular service with scheduled routes and established partnerships',
    states: ['SC', 'FL'],
    coverage: 'secondary',
    locations: [
      'greenville-sc',
      'orlando-fl',
      'tampa-fl',
    ],
  },
  {
    id: 'extended-coverage',
    name: 'Extended Coverage Area',
    description: 'Available for special arrangements and volume commitments',
    states: ['NC', 'AL', 'TN'],
    coverage: 'extended',
    locations: [
      'charlotte-nc',
      'mobile-al',
    ],
  },
];

/**
 * Get location by ID
 */
export function getLocationById(id: string): Location | undefined {
  return LOCATIONS.find(location => location.id === id);
}

/**
 * Get locations by state
 */
export function getLocationsByState(stateCode: string): Location[] {
  return LOCATIONS.filter(location => location.stateCode === stateCode);
}

/**
 * Get locations by type
 */
export function getLocationsByType(type: Location['type']): Location[] {
  return LOCATIONS.filter(location => location.type === type);
}

/**
 * Get hub location
 */
export function getHubLocation(): Location | undefined {
  return LOCATIONS.find(location => location.type === 'hub');
}

/**
 * Get locations by region
 */
export function getLocationsByRegion(regionId: string): Location[] {
  const region = SERVICE_REGIONS.find(r => r.id === regionId);
  if (!region) return [];
  return LOCATIONS.filter(location => region.locations.includes(location.id));
}

/**
 * Get all cities
 */
export function getAllCities(): Location[] {
  return LOCATIONS.filter(location => location.type === 'city');
}

/**
 * Get service coverage for a state
 */
export function getStateCoverage(stateCode: string): ServiceRegion['coverage'] | undefined {
  const region = SERVICE_REGIONS.find(r => r.states.includes(stateCode));
  return region?.coverage;
}

/**
 * Check if location has specific service
 */
export function hasService(locationId: string, serviceId: string): boolean {
  const location = getLocationById(locationId);
  return location?.servicesAvailable.includes(serviceId) || false;
}
