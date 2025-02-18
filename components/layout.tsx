"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"
import type React from "react"
import { Menu, X, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/#services", scroll: false },
  { name: "Join Us", href: "/join-us" },
  { name: "Contact", href: "/request-quote" },
]

export function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-12 w-12">
              <Image
                src="/southernhaulers.avif"
                alt="Southern Haulers Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-bold text-xl hidden sm:inline">Southern Haulers</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium hover:text-primary transition-colors"
                scroll={item.scroll}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-primary text-white hover:bg-primary/90">
                    Request
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/request-quote">Request a Quote</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-4 py-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium hover:text-primary transition-colors"
                      onClick={() => {
                        setIsOpen(false)
                        if (item.scroll === false) {
                          document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
                        }
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="h-px bg-border my-4" />
                  <div className="space-y-2">
                    <Button asChild className="w-full font-medium">
                      <Link href="/request-quote" onClick={() => setIsOpen(false)}>
                        Request a Quote
                      </Link>
                    </Button>
                    <Button variant="outline" asChild className="w-full font-medium">
                      <Link href="/join-us" onClick={() => setIsOpen(false)}>
                        Join Our Team
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t py-16 bg-muted">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="relative h-10 w-10">
                  <Image
                    src="/southernhaulers.avif"
                    alt="Southern Haulers Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="font-bold text-xl">Southern Haulers</h3>
              </div>
              <p className="text-muted-foreground">
                A top rated South Georgia carrier specializing in agricultural transport,
                container services, and refrigerated logistics.
              </p>
            </div>
            
            <div className="grid gap-8">
              <div>
                <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                <ul className="space-y-3">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
                <ul className="space-y-3">
                  <li>
                    <Link 
                      href="/request-quote"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      Request a Quote
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/join-us"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      Join Our Team
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            
            
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>1234 Trucking Lane</li>
                <li>South Georgia, GA 30000</li>
                <li>
                  <a 
                    href="tel:+15551234567" 
                    className="hover:text-primary transition-colors"
                  >
                    (555) 123-4567
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:info@southernhaulers.com"
                    className="hover:text-primary transition-colors"
                  >
                    info@southernhaulers.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t text-center text-muted-foreground">
            <p>© {new Date().getFullYear()} Southern Haulers. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
