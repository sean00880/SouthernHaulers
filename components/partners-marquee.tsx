"use client"

import { Card } from "@/components/ui/card"
import Image from "next/image"
import { useEffect, useState } from "react"

const partners = [
  { name: "Partner 1", logo: "/placeholder-logo.svg" },
  { name: "Partner 2", logo: "/placeholder-logo.svg" },
  { name: "Partner 3", logo: "/placeholder-logo.svg" },
  { name: "Partner 4", logo: "/placeholder-logo.svg" },
  { name: "Partner 5", logo: "/placeholder-logo.svg" },
  { name: "Partner 6", logo: "/placeholder-logo.svg" },
]

export function PartnersMarquee() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <div className="relative flex overflow-x-hidden bg-white/80 backdrop-blur-sm py-4">
      <div className="animate-marquee whitespace-nowrap flex">
        {partners.map((partner, i) => (
          <Card key={i} className="mx-4 p-4 inline-flex items-center justify-center min-w-[200px]">
            <Image
              src={partner.logo}
              alt={partner.name}
              width={120}
              height={40}
              className="object-contain"
            />
          </Card>
        ))}
      </div>
      <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex">
        {partners.map((partner, i) => (
          <Card key={i} className="mx-4 p-4 inline-flex items-center justify-center min-w-[200px]">
            <Image
              src={partner.logo}
              alt={partner.name}
              width={120}
              height={40}
              className="object-contain"
            />
          </Card>
        ))}
      </div>
    </div>
  )
}
