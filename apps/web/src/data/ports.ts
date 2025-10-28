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
