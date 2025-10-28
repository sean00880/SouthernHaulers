import './globals.css';
import type { Metadata } from 'next';
import { ThemeToggle } from '../components/theme-toggle';
import { Truck } from 'lucide-react';

export const metadata: Metadata = {
  title: {
    default: 'Southern Haulers - Container Drayage & Agricultural Hauling | GA, SC, FL',
    template: '%s | Southern Haulers',
  },
  description: 'Southern Haulers provides expert container drayage and intermodal transport for Port of Savannah, Charleston, and JAXPORT. 300+ container storage, 99% on-time delivery, real-time tracking. Serving Georgia, South Carolina, and Florida.',
  keywords: [
    'port drayage',
    'container drayage',
    'drayage services',
    'intermodal trucking',
    'agricultural hauling',
    'port of savannah drayage',
    'charleston port drayage',
    'jaxport drayage',
    'container transport',
    'warehousing services',
  ],
  authors: [{ name: 'Southern Haulers' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://southern-haulers.com',
    title: 'Southern Haulers - Premier Drayage & Agricultural Hauling',
    description: 'Container drayage to GA, SC, FL ports with real-time tracking and 24/7 support.',
    siteName: 'Southern Haulers',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Southern Haulers - Premier Drayage Services',
    description: 'Container drayage to GA, SC, FL ports with real-time tracking.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-6">
              <a href="/" className="flex items-center space-x-2">
                <Truck className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                  Southern Haulers
                </span>
              </a>
              <nav className="hidden md:flex items-center gap-6 text-sm">
                <a href="/#services" className="text-muted-foreground hover:text-foreground transition-colors">Services</a>
                <a href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
                <a href="/drivers" className="text-muted-foreground hover:text-foreground transition-colors">Drivers</a>
                <a href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
              </nav>
            </div>
            <nav className="flex items-center gap-2">
              <a href="/track" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:inline-block">
                Track Shipment
              </a>
              <ThemeToggle />
              <a href="/quote" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4">
                Get Quote
              </a>
            </nav>
          </div>
        </header>
        <main>
          {children}
        </main>
        <footer className="border-t bg-background">
          <div className="container py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 mb-4">
                  <Truck className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">Southern Haulers</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Premier container drayage and agricultural hauling services across the Southeastern United States.
                </p>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p className="font-semibold text-foreground mt-4">24/7 Dispatch</p>
                  <p>(555) 123-4567</p>
                  <p>dispatch@southern-haulers.com</p>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Services</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="/services/port-drayage" className="hover:text-foreground transition-colors">Port Drayage</a></li>
                  <li><a href="/services/container-transport" className="hover:text-foreground transition-colors">Container Transport</a></li>
                  <li><a href="/services/intermodal" className="hover:text-foreground transition-colors">Intermodal Trucking</a></li>
                  <li><a href="/services/agricultural" className="hover:text-foreground transition-colors">Agricultural Hauling</a></li>
                  <li><a href="/services/warehousing" className="hover:text-foreground transition-colors">Warehousing</a></li>
                  <li><a href="/services/refrigerated" className="hover:text-foreground transition-colors">Refrigerated Transport</a></li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Company</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="/about" className="hover:text-foreground transition-colors">About Us</a></li>
                  <li><a href="/about/safety" className="hover:text-foreground transition-colors">Safety & Compliance</a></li>
                  <li><a href="/drivers" className="hover:text-foreground transition-colors">Become a Driver</a></li>
                  <li><a href="/contact" className="hover:text-foreground transition-colors">Contact</a></li>
                  <li><a href="/locations" className="hover:text-foreground transition-colors">Locations</a></li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Resources</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="/quote" className="hover:text-foreground transition-colors">Request Quote</a></li>
                  <li><a href="/track" className="hover:text-foreground transition-colors">Track Shipment</a></li>
                  <li><a href="/blog" className="hover:text-foreground transition-colors">Blog</a></li>
                  <li><a href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                  <li><a href="/terms" className="hover:text-foreground transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                <p>© {new Date().getFullYear()} Southern Haulers. All rights reserved.</p>
                <div className="flex items-center gap-4">
                  <span>FMCSA Compliant</span>
                  <span>•</span>
                  <span>TWIC Certified</span>
                  <span>•</span>
                  <span>Fully Insured</span>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}