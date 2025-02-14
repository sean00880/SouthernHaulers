"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Warehouse, Container, Snowflake } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Services() {
  const services = [
    {
      title: "Warehouse Solutions",
      description: "State-of-the-art warehousing facilities with advanced inventory management and distribution capabilities.",
      icon: Warehouse,
      href: "/services/warehouse",
      image: "/services/warehouse.jpg",
      features: [
        "Climate-controlled storage",
        "Real-time inventory tracking",
        "Cross-docking capabilities",
        "Advanced security systems"
      ]
    },
    {
      title: "Container Services",
      description: "Comprehensive container handling and transportation solutions ensuring efficient movement of your cargo.",
      icon: Container,
      href: "/services/containers",
      image: "/services/containers.jpg",
      features: [
        "Port drayage services",
        "Intermodal solutions",
        "Container tracking",
        "Custom routing options"
      ]
    },
    {
      title: "Refrigerated Transport",
      description: "Temperature-controlled logistics ensuring product integrity throughout the supply chain.",
      icon: Snowflake,
      href: "/services/refrigerated",
      image: "/services/refrigerated.jpg",
      features: [
        "Multi-temperature zones",
        "Real-time monitoring",
        "HACCP compliance",
        "Cold chain integrity"
      ]
    }
  ]

  return (
    <div className="space-y-12">
      <div className="relative h-[400px] rounded-xl overflow-hidden">
        <Image
          src="/services-hero.jpg"
          alt="Comprehensive logistics and transportation services"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                Comprehensive Logistics Solutions
              </h1>
              <p className="text-xl text-white/90 leading-relaxed font-light">
                From warehousing to refrigerated transport, we provide end-to-end logistics services tailored to your needs.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8">
        {services.map((service, index) => (
          <Card key={index} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-72 lg:h-auto">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent lg:from-transparent" />
              </div>
              <div className="p-8 lg:p-10">
                <CardHeader className="p-0 mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <service.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl lg:text-3xl">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-muted-foreground text-lg mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button asChild size="lg" className="font-medium">
                    <Link href={service.href}>Learn More</Link>
                  </Button>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="bg-muted border-none">
        <CardContent className="p-8 lg:p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contact us today to learn how our comprehensive logistics solutions can benefit your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg" 
              className="text-lg py-6 px-8 font-medium"
            >
              <Link href="/contact">Request a Quote</Link>
            </Button>
            <Button 
              variant="outline" 
              asChild 
              size="lg" 
              className="text-lg py-6 px-8 font-medium"
            >
              <Link href="/careers">Join Our Team</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
