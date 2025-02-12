"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import Image from "next/image"

const serviceAreas = [
  { state: "GA", active: true, x: 50, y: 50 },
  { state: "FL", active: true, x: 60, y: 80 },
  { state: "SC", active: true, x: 70, y: 30 },
  { state: "AL", active: true, x: 20, y: 60 },
  { state: "TN", active: true, x: 30, y: 20 },
  { state: "NC", active: true, x: 80, y: 10 },
]

export function ServiceMap() {
  const [hoveredState, setHoveredState] = useState<string | null>(null)

  return (
    <Card className="p-6">
      <div className="aspect-video relative">
        <Image
          src="https://images.unsplash.com/photo-1572204292164-b35ba943fca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="Southeastern United States Map"
          fill
          style={{ objectFit: "cover" }}
          className="rounded-lg"
        />
        <div className="absolute inset-0">
          {serviceAreas.map((area) => (
            <div
              key={area.state}
              className={`absolute w-12 h-12 -ml-6 -mt-6 rounded-full flex items-center justify-center
                ${
                  hoveredState === area.state
                    ? "bg-primary text-primary-foreground"
                    : area.active
                      ? "bg-muted"
                      : "bg-muted/50"
                }`}
              style={{ left: `${area.x}%`, top: `${area.y}%` }}
              onMouseEnter={() => setHoveredState(area.state)}
              onMouseLeave={() => setHoveredState(null)}
            >
              <p className="font-bold">{area.state}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 text-center text-sm text-muted-foreground">Hover over a state to see more information</div>
    </Card>
  )
}

