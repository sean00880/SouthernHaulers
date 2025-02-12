import { Metadata } from 'next'
import { defaultMetadata } from './metadata'

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Southern Haulers | Top Rated South Georgia Carrier',
  description: 'Southern Haulers is the leading transportation provider in South Georgia, offering comprehensive logistics solutions including agricultural transport, warehousing, and refrigerated services.',
  keywords: [
    ...defaultMetadata.keywords as string[],
    'Georgia logistics',
    'agricultural transportation',
    'South Georgia trucking',
    'temperature controlled transport',
    'warehouse distribution',
    'intermodal services',
    'port drayage Georgia'
  ]
}