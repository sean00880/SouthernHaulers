import { Layout } from "@/components/layout"
import { ServicesSidebar } from "@/components/services-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Container, Truck, Route, BarChart3 } from "lucide-react"
import { LucideIcon } from 'lucide-react'

interface ServiceSection {
  icon: LucideIcon
  title: string
  description: string
}

interface FeatureSection {
  icon: LucideIcon
  title: string
  features: string[]
}

const portOperations: ServiceSection[] = [
  {
    icon: Container,
    title: 'Port Drayage',
    description: 'Efficient container movement between ports and inland destinations with real-time tracking and status updates.'
  },
  {
    icon: Truck,
    title: 'Intermodal Solutions',
    description: 'Seamless integration of rail and road transportation for optimal container movement across the Southeast.'
  }
]

const services: FeatureSection[] = [
  {
    icon: Route,
    title: 'Transportation',
    features: [
      'Port-to-door delivery',
      'Cross-border services',
      'Express delivery options'
    ]
  },
  {
    icon: Container,
    title: 'Container Types',
    features: [
      'Standard containers',
      'High-cube containers',
      'Special equipment'
    ]
  },
  {
    icon: BarChart3,
    title: 'Tracking & Visibility',
    features: [
      'Real-time GPS tracking',
      'EDI integration',
      'Status notifications'
    ]
  }
]

export default function ContainersPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
        <ServicesSidebar className="hidden md:block" />
        <main className="space-y-12">
          {/* Hero Section */}
          <div className="relative h-[300px] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
              alt="Container terminal operations"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex items-center justify-center text-center text-white p-6">
              <div>
                <h1 className="text-4xl font-bold mb-4">Container Services</h1>
                <p className="text-lg max-w-2xl">
                  Comprehensive container handling and transportation solutions for efficient port-to-door delivery.
                </p>
              </div>
            </div>
          </div>

          {/* Port Operations Section */}
          <section id="port" className="scroll-mt-16">
            <h2 className="text-3xl font-bold mb-8">Port Operations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portOperations.map((operation, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <operation.icon className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-2">{operation.title}</h3>
                    <p className="text-muted-foreground">{operation.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Services Grid */}
          <section id="drayage" className="scroll-mt-16">
            <h2 className="text-3xl font-bold mb-8">Our Container Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div key={index} className="space-y-4">
                  <service.icon className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-bold">{service.title}</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    {service.features.map((feature, idx) => (
                      <li key={idx}>• {feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-muted rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Ship Your Containers?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get in touch with our container logistics experts to discuss your transportation needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
                <Link href="/contact">Get Started</Link>
              </Button>
              <Button variant="outline" asChild size="lg" className="text-white border-white bg-primary/80 hover:bg-white hover:text-primary focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all">
                <Link href="/careers">Join Our Team</Link>
              </Button>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  )
}