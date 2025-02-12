"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

const serviceRoutes = [
  {
    title: "Warehouse Solutions",
    href: "/services/warehouse",
    description: "State-of-the-art warehousing and distribution",
    sections: [
      { title: "Storage Solutions", href: "/services/warehouse#storage" },
      { title: "Inventory Management", href: "/services/warehouse#inventory" },
      { title: "Distribution Services", href: "/services/warehouse#distribution" },
      { title: "Value-Added Services", href: "/services/warehouse#value-added" },
    ],
  },
  {
    title: "Container Services",
    href: "/services/containers",
    description: "Comprehensive container and drayage solutions",
    sections: [
      { title: "Port Operations", href: "/services/containers#port" },
      { title: "Drayage Services", href: "/services/containers#drayage" },
      { title: "Intermodal Solutions", href: "/services/containers#intermodal" },
      { title: "Container Tracking", href: "/services/containers#tracking" },
    ],
  },
  {
    title: "Refrigerated Transport",
    href: "/services/refrigerated",
    description: "Temperature-controlled logistics solutions",
    sections: [
      { title: "Cold Chain Solutions", href: "/services/refrigerated#cold-chain" },
      { title: "Temperature Monitoring", href: "/services/refrigerated#monitoring" },
      { title: "Specialized Equipment", href: "/services/refrigerated#equipment" },
      { title: "Industry Compliance", href: "/services/refrigerated#compliance" },
    ],
  },
]

interface ServicesSidebarProps {
  className?: string
}

export function ServicesSidebar({ className }: ServicesSidebarProps) {
  const pathname = usePathname()

  return (
    <div className={className}>
      {/* Mobile View */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80">
          <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
            <div className="space-y-4">
              {serviceRoutes.map((route) => (
                <div key={route.href} className="space-y-3">
                  <Link href={route.href}>
                    <div className={cn(
                      "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                      pathname === route.href && "bg-accent"
                    )}>
                      <div className="text-sm font-medium leading-none">{route.title}</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {route.description}
                      </p>
                    </div>
                  </Link>
                  {route.sections?.map((section) => (
                    <Link
                      key={section.href}
                      href={section.href}
                      className={cn(
                        "block rounded-md px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground",
                        pathname + location.hash === section.href && "bg-accent"
                      )}
                    >
                      {section.title}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Desktop View */}
      <ScrollArea className="hidden md:block h-[calc(100vh-4rem)]">
        <div className="space-y-4 py-4">
          {serviceRoutes.map((route) => (
            <div key={route.href} className="space-y-3">
              <Link href={route.href}>
                <div className={cn(
                  "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                  pathname === route.href && "bg-accent"
                )}>
                  <div className="text-sm font-medium leading-none">{route.title}</div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {route.description}
                  </p>
                </div>
              </Link>
              {route.sections?.map((section) => (
                <Link
                  key={section.href}
                  href={section.href}
                  className={cn(
                    "block rounded-md px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground",
                    pathname + location.hash === section.href && "bg-accent"
                  )}
                >
                  {section.title}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}