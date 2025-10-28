/**
 * Ports and Terminal Registry
 * 
 * Comprehensive data about ports and terminals served by Southern Haulers.
 * Includes TEU capacity, terminal information, and operational details.
 */

export interface Terminal {
  id: string;
  name: string;
  code: string;
  location: string;
  operator?: string;
  description?: string;
  features?: string[];
}

export interface Port {
  id: string;
  name: string;
  displayName: string;
  code: string;
  city: string;
  state: string;
  stateCode: string;
  region: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  annualTeuCapacity: number;
  annualTeuHandling: number;
  rank: number;
  description: string;
  terminals: Terminal[];
  features: string[];
  operationalHours?: string;
  averageWaitTime?: string;
  congestionLevel?: 'low' | 'medium' | 'high';
  distanceFromHub?: {
    miles: number;
    hours: number;
  };
  website?: string;
}

export const PORTS: Port[] = [
  {
    id: 'savannah',
    name: 'Port of Savannah',
    displayName: 'Port of Savannah, GA',
    code: 'SAV',
    city: 'Savannah',
    state: 'Georgia',
    stateCode: 'GA',
    region: 'Southeast',
    coordinates: {
      lat: 32.1314,
      lng: -81.1428,
    },
    annualTeuCapacity: 6000000,
    annualTeuHandling: 5900000,
    rank: 3,
    description: 'The largest single-terminal container facility in North America, handling 5.9M+ TEUs annually with state-of-the-art infrastructure.',
    terminals: [
      {
        id: 'garden-city',
        name: 'Garden City Terminal',
        code: 'GCT',
        location: 'Garden City, GA',
        operator: 'Georgia Ports Authority',
        description: 'Largest single-terminal container facility in North America spanning 1,345 acres',
        features: [
          '9,693 feet of continuous berthing',
          '36 high-speed ship-to-shore cranes',
          'On-dock rail with CSX and Norfolk Southern',
          'Real-time eModal appointment system',
        ],
      },
      {
        id: 'ocean-terminal',
        name: 'Ocean Terminal',
        code: 'OCT',
        location: 'Savannah, GA',
        operator: 'Georgia Ports Authority',
        description: 'Multi-purpose terminal for container, breakbulk, and RoRo cargo',
        features: [
          'Container operations',
          'Breakbulk handling',
          'RoRo capabilities',
          'Direct highway access',
        ],
      },
    ],
    features: [
      'FMCSA compliant operations',
      'TWIC certified access required',
      'Real-time GPS tracking',
      '24/7 gate operations',
      'eModal automated scheduling',
      'On-dock rail connectivity',
    ],
    operationalHours: '24/7',
    averageWaitTime: '25 minutes',
    congestionLevel: 'low',
    distanceFromHub: {
      miles: 180,
      hours: 3,
    },
    website: 'https://gaports.com',
  },
  {
    id: 'charleston',
    name: 'Charleston Harbor',
    displayName: 'Charleston Harbor, SC',
    code: 'CHS',
    city: 'Charleston',
    state: 'South Carolina',
    stateCode: 'SC',
    region: 'Southeast',
    coordinates: {
      lat: 32.7765,
      lng: -79.9311,
    },
    annualTeuCapacity: 1500000,
    annualTeuHandling: 2900000,
    rank: 6,
    description: 'A major East Coast port with 2.9M+ TEUs annually, featuring deepwater berths for post-Panamax vessels.',
    terminals: [
      {
        id: 'wando-welch',
        name: 'Wando Welch Terminal',
        code: 'WWT',
        location: 'Mount Pleasant, SC',
        operator: 'South Carolina Ports Authority',
        description: 'Modern container terminal with advanced technology and deep-water access',
        features: [
          'Deep-water berths (52 feet)',
          'Ship-to-shore cranes',
          'On-terminal rail',
          'Near-dock warehousing',
        ],
      },
      {
        id: 'columbus-street',
        name: 'Columbus Street Terminal',
        code: 'CST',
        location: 'Charleston, SC',
        operator: 'South Carolina Ports Authority',
        description: 'Multi-purpose terminal for containers, breakbulk, and RoRo operations',
        features: [
          'Container operations',
          'Breakbulk capabilities',
          'RoRo facilities',
          'Downtown location',
        ],
      },
      {
        id: 'north-charleston',
        name: 'North Charleston Terminal',
        code: 'NCT',
        location: 'North Charleston, SC',
        operator: 'South Carolina Ports Authority',
        description: 'Inland terminal for container storage and transloading',
        features: [
          'Container depot',
          'Transloading services',
          'Chassis storage',
          'Direct rail access',
        ],
      },
    ],
    features: [
      'Deep-water access (52 feet)',
      'Post-Panamax capable',
      'TWIC certified access',
      'Advanced cargo tracking',
      'Multiple terminal options',
      'Intermodal connectivity',
    ],
    operationalHours: '24/7',
    averageWaitTime: '42 minutes',
    congestionLevel: 'medium',
    distanceFromHub: {
      miles: 220,
      hours: 3.5,
    },
    website: 'https://scspa.com',
  },
  {
    id: 'jacksonville',
    name: 'JAXPORT',
    displayName: 'JAXPORT, FL',
    code: 'JAX',
    city: 'Jacksonville',
    state: 'Florida',
    stateCode: 'FL',
    region: 'Southeast',
    coordinates: {
      lat: 30.3322,
      lng: -81.6557,
    },
    annualTeuCapacity: 800000,
    annualTeuHandling: 1500000,
    rank: 14,
    description: 'Florida\'s largest container port handling 1.5M+ TEUs annually with strategic access to Southeast markets.',
    terminals: [
      {
        id: 'blount-island',
        name: 'Blount Island Marine Terminal',
        code: 'BIMT',
        location: 'Jacksonville, FL',
        operator: 'JAXPORT',
        description: 'Multi-purpose terminal for containers, vehicles, and breakbulk cargo',
        features: [
          'Container operations',
          'Auto processing',
          'Breakbulk handling',
          'On-dock rail',
        ],
      },
      {
        id: 'talleyrand',
        name: 'Talleyrand Docks and Terminals',
        code: 'TDT',
        location: 'Jacksonville, FL',
        operator: 'JAXPORT',
        description: 'Container and cargo terminal near downtown Jacksonville',
        features: [
          'Container terminal',
          'Near-city location',
          'Highway access',
          'General cargo',
        ],
      },
      {
        id: 'dames-point',
        name: 'Dames Point Marine Terminal',
        code: 'DPMT',
        location: 'Jacksonville, FL',
        operator: 'JAXPORT',
        description: 'Multi-purpose terminal for containers and breakbulk',
        features: [
          'Container operations',
          'Breakbulk handling',
          'Modern facilities',
          'Strategic location',
        ],
      },
    ],
    features: [
      'I-95 corridor access',
      'Multiple terminal options',
      'TWIC certified operations',
      'Automotive specialization',
      'Rail connectivity',
      'Strategic Florida gateway',
    ],
    operationalHours: '24/7',
    averageWaitTime: '18 minutes',
    congestionLevel: 'low',
    distanceFromHub: {
      miles: 290,
      hours: 4,
    },
    website: 'https://jaxport.com',
  },
  {
    id: 'nashville-rail',
    name: 'Nashville Rail Terminal',
    displayName: 'Nashville Rail Terminal, TN',
    code: 'NSH',
    city: 'Nashville',
    state: 'Tennessee',
    stateCode: 'TN',
    region: 'Southeast',
    coordinates: {
      lat: 36.1627,
      lng: -86.7816,
    },
    annualTeuCapacity: 0,
    annualTeuHandling: 0,
    rank: 0,
    description: 'Strategic inland rail terminal serving Middle Tennessee with direct intermodal connections.',
    terminals: [
      {
        id: 'nashville-intermodal',
        name: 'Nashville Intermodal Terminal',
        code: 'NIT',
        location: 'Nashville, TN',
        operator: 'CSX Transportation',
        description: 'Major intermodal rail facility connecting Southeast ports to Middle Tennessee',
        features: [
          'Intermodal container handling',
          'Direct rail connectivity',
          'Container storage',
          'Transloading services',
        ],
      },
    ],
    features: [
      'Intermodal rail services',
      'Container drayage',
      'Strategic inland location',
      'Multiple carrier access',
    ],
    operationalHours: '24/7',
    averageWaitTime: '15 minutes',
    congestionLevel: 'low',
    distanceFromHub: {
      miles: 320,
      hours: 5,
    },
  },
  {
    id: 'memphis-rail',
    name: 'Memphis Rail Terminal',
    displayName: 'Memphis Rail Terminal, TN',
    code: 'MEM',
    city: 'Memphis',
    state: 'Tennessee',
    stateCode: 'TN',
    region: 'Southeast',
    coordinates: {
      lat: 35.1495,
      lng: -90.0490,
    },
    annualTeuCapacity: 0,
    annualTeuHandling: 0,
    rank: 0,
    description: 'Major Mississippi River port and rail hub with extensive intermodal capabilities.',
    terminals: [
      {
        id: 'memphis-intermodal',
        name: 'Memphis Intermodal Terminal',
        code: 'MIT',
        location: 'Memphis, TN',
        operator: 'BNSF Railway / Norfolk Southern',
        description: 'Leading intermodal facility in the Mid-South region',
        features: [
          'Dual carrier access (BNSF/NS)',
          'Container handling',
          'Chassis pool',
          'Strategic Mississippi River location',
        ],
      },
    ],
    features: [
      'Multi-carrier rail access',
      'River port proximity',
      'Container drayage',
      'Distribution center hub',
    ],
    operationalHours: '24/7',
    averageWaitTime: '20 minutes',
    congestionLevel: 'low',
    distanceFromHub: {
      miles: 410,
      hours: 6,
    },
  },
  {
    id: 'huntsville-rail',
    name: 'Huntsville Rail Terminal',
    displayName: 'Huntsville Rail Terminal, AL',
    code: 'HSV',
    city: 'Huntsville',
    state: 'Alabama',
    stateCode: 'AL',
    region: 'Southeast',
    coordinates: {
      lat: 34.7304,
      lng: -86.5861,
    },
    annualTeuCapacity: 0,
    annualTeuHandling: 0,
    rank: 0,
    description: 'Growing rail terminal serving North Alabama\'s aerospace and defense industries.',
    terminals: [
      {
        id: 'huntsville-intermodal',
        name: 'Huntsville Intermodal Center',
        code: 'HIC',
        location: 'Huntsville, AL',
        operator: 'Norfolk Southern',
        description: 'Modern intermodal facility supporting Huntsville\'s industrial growth',
        features: [
          'Intermodal container services',
          'Aerospace cargo handling',
          'Defense contractor support',
          'Direct rail access',
        ],
      },
    ],
    features: [
      'Aerospace industry focus',
      'Intermodal services',
      'Container drayage',
      'Growing market',
    ],
    operationalHours: 'Mon-Fri 7AM-7PM',
    averageWaitTime: '10 minutes',
    congestionLevel: 'low',
    distanceFromHub: {
      miles: 350,
      hours: 5.5,
    },
  },
  {
    id: 'mobile-port',
    name: 'Port of Mobile',
    displayName: 'Port of Mobile, AL',
    code: 'MOB',
    city: 'Mobile',
    state: 'Alabama',
    stateCode: 'AL',
    region: 'Southeast',
    coordinates: {
      lat: 30.6954,
      lng: -88.0399,
    },
    annualTeuCapacity: 500000,
    annualTeuHandling: 350000,
    rank: 45,
    description: 'Alabama\'s only saltwater port with growing container operations and strategic Gulf Coast location.',
    terminals: [
      {
        id: 'mobile-apm',
        name: 'APM Terminals Mobile',
        code: 'APM',
        location: 'Mobile, AL',
        operator: 'APM Terminals',
        description: 'Modern container terminal at the Port of Mobile',
        features: [
          'Container operations',
          'Gulf Coast gateway',
          'On-dock rail',
          'Expanding capacity',
        ],
      },
    ],
    features: [
      'Gulf Coast location',
      'Growing container volume',
      'Intermodal connectivity',
      'Strategic alternative to crowded East Coast ports',
    ],
    operationalHours: '24/7',
    averageWaitTime: '12 minutes',
    congestionLevel: 'low',
    distanceFromHub: {
      miles: 275,
      hours: 4.5,
    },
    website: 'https://www.alshipyard.com',
  },
  {
    id: 'arp-rail',
    name: 'ARP Rail Terminal',
    displayName: 'ARP Rail Terminal, GA',
    code: 'ARP',
    city: 'Crandall',
    state: 'Georgia',
    stateCode: 'GA',
    region: 'Southeast',
    coordinates: {
      lat: 34.8800,
      lng: -84.7600,
    },
    annualTeuCapacity: 0,
    annualTeuHandling: 0,
    rank: 0,
    description: 'North Georgia intermodal facility serving the Chattanooga and North Georgia markets.',
    terminals: [
      {
        id: 'arp-intermodal',
        name: 'Appalachian Regional Port',
        code: 'ARP',
        location: 'Crandall, GA',
        operator: 'Georgia Ports Authority',
        description: 'Inland intermodal port connecting North Georgia to Savannah',
        features: [
          'Direct connection to Port of Savannah',
          'Container storage',
          'Transloading',
          'Reduced congestion alternative',
        ],
      },
    ],
    features: [
      'GPA operated inland port',
      'Savannah connection',
      'Container drayage',
      'North Georgia coverage',
    ],
    operationalHours: 'Mon-Fri 6AM-6PM',
    averageWaitTime: '8 minutes',
    congestionLevel: 'low',
    distanceFromHub: {
      miles: 280,
      hours: 4.5,
    },
  },
  {
    id: 'atlanta-rail',
    name: 'Atlanta Rail Terminal',
    displayName: 'Atlanta Rail Terminal, GA',
    code: 'ATL',
    city: 'Atlanta',
    state: 'Georgia',
    stateCode: 'GA',
    region: 'Southeast',
    coordinates: {
      lat: 33.7490,
      lng: -84.3880,
    },
    annualTeuCapacity: 0,
    annualTeuHandling: 0,
    rank: 0,
    description: 'Major Southeast intermodal hub serving the Atlanta metropolitan area with extensive rail connectivity.',
    terminals: [
      {
        id: 'atlanta-intermodal',
        name: 'Norfolk Southern Atlanta Terminal',
        code: 'NSA',
        location: 'Atlanta, GA',
        operator: 'Norfolk Southern',
        description: 'Premier intermodal facility serving the Southeast\'s largest metro area',
        features: [
          'High-volume container handling',
          'Multiple carrier access',
          'Metro Atlanta coverage',
          'State-of-the-art infrastructure',
        ],
      },
    ],
    features: [
      'Largest metro market in Southeast',
      'Multi-carrier rail access',
      'Container drayage',
      'Distribution hub',
    ],
    operationalHours: '24/7',
    averageWaitTime: '22 minutes',
    congestionLevel: 'medium',
    distanceFromHub: {
      miles: 220,
      hours: 3.5,
    },
  },
];

/**
 * Get port by ID
 */
export function getPortById(id: string): Port | undefined {
  return PORTS.find(port => port.id === id);
}

/**
 * Get port by code
 */
export function getPortByCode(code: string): Port | undefined {
  return PORTS.find(port => port.code === code);
}

/**
 * Get all terminals across all ports
 */
export function getAllTerminals(): Terminal[] {
  return PORTS.flatMap(port => port.terminals);
}

/**
 * Get terminal by ID
 */
export function getTerminalById(terminalId: string): Terminal | undefined {
  return getAllTerminals().find(terminal => terminal.id === terminalId);
}

/**
 * Get ports by state
 */
export function getPortsByState(stateCode: string): Port[] {
  return PORTS.filter(port => port.stateCode === stateCode);
}

/**
 * Get total TEU capacity across all ports
 */
export function getTotalTeuCapacity(): number {
  return PORTS.reduce((total, port) => total + port.annualTeuCapacity, 0);
}

/**
 * Get ports sorted by TEU handling volume
 */
export function getPortsByVolume(): Port[] {
  return [...PORTS].sort((a, b) => b.annualTeuHandling - a.annualTeuHandling);
}
