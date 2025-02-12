"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel"
import { Quote } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

const testimonials = [
  {
    quote:
      "Southern Haulers has consistently delivered our agricultural products on time and with great care. Their service is unmatched in the industry.",
    author: "John D.",
    position: "Farm Operations Manager",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "We've been working with Southern Haulers for over 5 years. Their reliability and professional approach make them our go-to transportation partner.",
    author: "Sarah M.",
    position: "Logistics Director",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  },
  {
    quote:
      "The team at Southern Haulers goes above and beyond. Their warehouse solutions have streamlined our entire supply chain.",
    author: "Michael R.",
    position: "Supply Chain Manager",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
  },
]

export function TestimonialCarousel() {
  const [isMounted, setIsMounted] = useState(false)
  const [api, setApi] = useState<CarouselApi>()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!api) return

    const interval = setInterval(() => {
      api.scrollNext()
    }, 5000)

    return () => clearInterval(interval)
  }, [api])

  if (!isMounted) return null

  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-5xl mx-auto"
    >
      <CarouselContent>
        {testimonials.map((testimonial, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <Card className="h-full group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Quote className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">{testimonial.quote}</p>
                <div className="mt-auto">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.author}
                    width={50}
                    height={50}
                    className="rounded-full border-2 border-primary/10"
                  />
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex" />
      <CarouselNext className="hidden sm:flex" />
    </Carousel>
  )
}
