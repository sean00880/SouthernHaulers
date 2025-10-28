import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Southern Haulers',
  description: 'State-of-the-art drayage and logistics platform built with AI, real-time tracking and seamless integrations.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body>
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-6">
              <a href="/" className="flex items-center space-x-2">
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                  Southern Haulers
                </span>
              </a>
              <nav className="hidden md:flex items-center gap-6 text-sm">
                <a href="/#services" className="text-muted-foreground hover:text-foreground transition-colors">Services</a>
                <a href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</a>
                <a href="/drivers" className="text-muted-foreground hover:text-foreground transition-colors">Drivers</a>
              </nav>
            </div>
            <nav className="flex items-center gap-4">
              <a href="/track" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Track Shipment
              </a>
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
          <div className="container py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Southern Haulers</h3>
                <p className="text-sm text-muted-foreground">
                  Premier container drayage and agricultural hauling services across the Southeastern United States.
                </p>
              </div>
              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Services</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="/services/drayage" className="hover:text-foreground transition-colors">Container Drayage</a></li>
                  <li><a href="/services/agricultural" className="hover:text-foreground transition-colors">Agricultural Hauling</a></li>
                  <li><a href="/services/warehousing" className="hover:text-foreground transition-colors">Warehousing</a></li>
                  <li><a href="/services/refrigerated" className="hover:text-foreground transition-colors">Refrigerated</a></li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Company</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="/about" className="hover:text-foreground transition-colors">About Us</a></li>
                  <li><a href="/about/safety" className="hover:text-foreground transition-colors">Safety & Compliance</a></li>
                  <li><a href="/drivers" className="hover:text-foreground transition-colors">Become a Driver</a></li>
                  <li><a href="/contact" className="hover:text-foreground transition-colors">Contact</a></li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Legal</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="/privacy" className="hover:text-foreground transition-colors">Privacy</a></li>
                  <li><a href="/terms" className="hover:text-foreground transition-colors">Terms</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} Southern Haulers. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}