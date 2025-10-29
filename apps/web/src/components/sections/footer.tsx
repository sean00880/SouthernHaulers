'use client';

import Link from 'next/link';
import { Facebook, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Logo } from '@/components/logo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: 'Container Drayage', href: '/services/drayage' },
      { name: 'Port Drayage', href: '/services/port-drayage' },
      { name: 'Agricultural Hauling', href: '/services/agricultural' },
      { name: 'Warehousing', href: '/services/warehousing' },
      { name: 'Refrigerated Transport', href: '/services/refrigerated' },
    ],
    company: [
      { name: 'About Us', href: '/about/safety' },
      { name: 'Safety', href: '/about/safety' },
      { name: 'Locations', href: '/locations' },
      { name: 'Ports We Serve', href: '/ports' },
    ],
    support: [
      { name: 'Get a Quote', href: '/quote' },
      { name: 'Track Shipment', href: '/track' },
      { name: 'Contact Us', href: '/contact' },
    ],
  };

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Logo />
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-sm">
              Premier container drayage and agricultural hauling services across the Southeast. Strategic hub with 300+ container capacity and real-time GPS tracking.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>South Georgia Hub</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <a href="tel:+1-555-012-3456" className="hover:text-foreground">
                  +1-555-012-3456
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a href="mailto:dispatch@southernhaulers.net" className="hover:text-foreground">
                  dispatch@southernhaulers.net
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Southern Haulers. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/southernhaulers"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/southern-haulers"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
