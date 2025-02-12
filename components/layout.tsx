import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import type React from "react"

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-12 w-12">
              <Image
                src="/southernhaulers.avif"
                alt="Southern Haulers Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-bold text-xl hidden sm:inline">Southern Haulers</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary">
              Home
            </Link>
            <Link href="/services" className="text-sm font-medium hover:text-primary">
              Services
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary">
              About
            </Link>
            <Link href="/careers" className="text-sm font-medium hover:text-primary">
              Careers
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/careers">Driver Application</Link>
            </Button>
            <Button asChild>
              <Link href="/contact">Request Quote</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t py-8 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="relative h-10 w-10">
                  <Image
                    src="/southernhaulers.avif"
                    alt="Southern Haulers Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="font-bold">Southern Haulers</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                A top rated South Georgia carrier specializing in agricultural transport.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/services" className="hover:text-primary">Services</Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-primary">About Us</Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-primary">Careers</Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary">Contact</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Services</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/services/warehouse" className="hover:text-primary">
                    Warehouse Solutions
                  </Link>
                </li>
                <li>
                  <Link href="/services/containers" className="hover:text-primary">
                    Container Services
                  </Link>
                </li>
                <li>
                  <Link href="/services/refrigerated" className="hover:text-primary">
                    Refrigerated Transport
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li>1234 Trucking Lane</li>
                <li>South Georgia, GA 30000</li>
                <li>Phone: (555) 123-4567</li>
                <li>Email: info@southernhaulers.com</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Southern Haulers. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
