import { Metadata } from 'next'
import { ThemeProvider } from "@/components/theme-provider"
import { Layout } from "@/components/layout"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL('https://southernhaulers.net'),
  title: {
    default: 'Southern Haulers | Top Rated South Georgia Carrier',
    template: '%s | Southern Haulers'
  },
  description: 'Southern Haulers is the leading transportation provider in South Georgia, offering comprehensive logistics solutions including agricultural transport, warehousing, and refrigerated services.',
  keywords: [
    'Southern Haulers',
    'Georgia logistics',
    'agricultural transportation',
    'South Georgia trucking',
    'temperature controlled transport',
    'warehouse distribution',
    'intermodal services',
    'port drayage Georgia',
    'freight transportation',
    'cold chain logistics',
    'bulk transport',
    'container services'
  ],
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
    description: 'Southern Haulers is the leading transportation provider in South Georgia, offering comprehensive logistics solutions including agricultural transport, warehousing, and refrigerated services.',
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
    description: 'Southern Haulers is the leading transportation provider in South Georgia, offering comprehensive logistics solutions including agricultural transport, warehousing, and refrigerated services.',
    images: ['/og-image.jpg']
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  )
}
