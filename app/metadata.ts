import { Metadata } from 'next'

const defaultKeywords = [
  'Southern Haulers',
  'trucking company',
  'logistics services',
  'South Georgia carrier',
  'freight transportation',
  'warehouse solutions',
  'container services',
  'refrigerated transport',
  'agricultural transport',
  'bulk transport',
  'drayage services',
  'cold chain logistics',
  'Southeast US transportation'
]

export const defaultMetadata: Metadata = {
  metadataBase: new URL('https://southernhaulers.net'),
  title: {
    default: 'Southern Haulers | Top Rated South Georgia Carrier',
    template: '%s | Southern Haulers'
  },
  description: 'Southern Haulers is the foremost carrier in the southeastern United States, specializing in agricultural transport, bulk loads, container drayage, and warehouse services.',
  keywords: defaultKeywords,
  authors: [{ name: 'Southern Haulers' }],
  creator: 'Southern Haulers',
  publisher: 'Southern Haulers',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://southernhaulers.net',
    siteName: 'Southern Haulers',
    title: 'Southern Haulers | Top Rated South Georgia Carrier',
    description: 'Southern Haulers is the foremost carrier in the southeastern United States, specializing in agricultural transport, bulk loads, container drayage, and warehouse services.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Southern Haulers - Leading Transportation Solutions'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Southern Haulers | Top Rated South Georgia Carrier',
    description: 'Southern Haulers is the foremost carrier in the southeastern United States, specializing in agricultural transport, bulk loads, container drayage, and warehouse services.',
    images: ['/og-image.jpg']
  }
}

export const getMetadata = (
  title: string,
  description: string,
  additionalKeywords: string[] = []
): Metadata => ({
  ...defaultMetadata,
  title,
  description,
  keywords: [...defaultKeywords, ...additionalKeywords],
  openGraph: {
    ...defaultMetadata.openGraph,
    title,
    description
  },
  twitter: {
    ...defaultMetadata.twitter,
    title,
    description
  }
})