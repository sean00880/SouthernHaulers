"use client"

import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Menu } from "lucide-react"
import Link from "next/link"

interface TableOfContentsProps {
  sections: {
    title: string
    items?: {
      title: string
      description?: string
      features?: string[]
    }[]
  }[]
}

export function TableOfContents({ sections }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Close sheet when screen size becomes large
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)")
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsOpen(false)
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  return (
    <div className="lg:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="fixed bg-black bottom-4 right-4 z-50 rounded-full shadow-lg">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle table of contents</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <nav className="relative">
            <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
            <ScrollArea className="h-[calc(100vh-8rem)]">
              <Accordion type="single" collapsible className="w-full">
                {sections.map((section, index) => (
                  <AccordionItem key={index} value={`section-${index}`}>
                    <AccordionTrigger className="text-left">
                      <Link
                        href={`#${section.title.toLowerCase().replace(" ", "-")}`}
                        onClick={() => setIsOpen(false)}
                        className="hover:underline"
                      >
                        {section.title}
                      </Link>
                    </AccordionTrigger>
                    {section.items && (
                      <AccordionContent>
                        <ul className="space-y-2 ml-4">
                          {section.items.map((item, itemIndex) => (
                            <li key={itemIndex}>
                              <Link
                                href={`#${section.title.toLowerCase().replace(" ", "-")}`}
                                onClick={() => setIsOpen(false)}
                                className="text-muted-foreground hover:text-primary hover:underline"
                              >
                                {item.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    )}
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollArea>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}
