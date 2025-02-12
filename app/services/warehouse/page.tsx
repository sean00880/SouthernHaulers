import { Metadata } from 'next'
import { Layout } from "@/components/layout"
import { ServicesSidebar } from "@/components/services-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Box, ClipboardCheck, BarChart3, Warehouse } from "lucide-react"
import { LucideIcon } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Warehouse Solutions & Distribution Services | Southern Haulers',
  description: 'State-of-the-art warehousing facilities with advanced inventory management, climate-controlled storage, and comprehensive distribution solutions in South Georgia.',
  keywords: [
    'warehouse solutions Georgia',
    'distribution services',
    'climate controlled storage',
    'inventory management',
    'cross-docking services',
    'warehouse management system',
    'South Georgia warehousing',
    'logistics storage',
    'supply chain solutions',
    'warehouse distribution',
    'real-time inventory tracking',
    'value-added warehousing'
  ]
}

interface FeatureWithDescription {
  icon: LucideIcon
  title: string
  description: string
}

interface FeatureWithList {
  icon: LucideIcon
  title: string
  features: string[]
}

interface FeatureSection {
  id: string
  title: string
  items: FeatureWithDescription[] | FeatureWithList[]
}

const features: FeatureSection[] = [
  {
    id: 'storage',
    title: 'Storage Solutions',
    items: [
      {
        icon: Box,
        title: 'Flexible Storage Options',
        description: 'From small parcels to bulk storage, our facilities accommodate various storage needs with customizable space solutions.'
      },
      {
        icon: ClipboardCheck,
        title: 'Inventory Management',
        description: 'Real-time tracking and advanced inventory management systems ensure accurate stock levels and efficient operations.'
      }
    ] as FeatureWithDescription[]
  },
  {
    id: 'inventory',
    title: 'Key Features',
    items: [
      {
        icon: BarChart3,
        title: 'Analytics & Reporting',
        features: [
          'Real-time inventory tracking',
          'Custom reporting solutions',
          'Performance analytics'
        ]
      },
      {
        icon: Warehouse,
        title: 'Facility Features',
        features: [
          'Climate-controlled storage',
          '24/7 security monitoring',
          'Modern handling equipment'
        ]
      },
      {
        icon: Box,
        title: 'Value-Added Services',
        features: [
          'Cross-docking',
          'Pick and pack',
          'Kitting and assembly'
        ]
      }
    ] as FeatureWithList[]
  }
]

export default function WarehousePage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
        <ServicesSidebar className="hidden md:block" />
        <main className="space-y-12">
          {/* Hero Section */}
          <div className="relative h-[300px] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
              alt="Modern warehouse interior"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex items-center justify-center text-center text-white p-6">
              <div>
                <h1 className="text-4xl font-bold mb-4">Warehouse Solutions</h1>
                <p className="text-lg max-w-2xl">
                  State-of-the-art warehousing facilities with advanced inventory management and distribution capabilities.
                </p>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          {features.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-16">
              <h2 className="text-3xl font-bold mb-8">{section.title}</h2>
              {section.items[0] && 'description' in section.items[0] ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(section.items as FeatureWithDescription[]).map((item, idx) => (
                    <Card key={idx}>
                      <CardContent className="p-6">
                        <item.icon className="h-12 w-12 text-primary mb-4" />
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {(section.items as FeatureWithList[]).map((item, idx) => (
                    <div key={idx} className="space-y-4">
                      <item.icon className="h-8 w-8 text-primary" />
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        {item.features.map((feature, featureIdx) => (
                          <li key={featureIdx}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}

          {/* CTA Section */}
          <section className="bg-muted rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Optimize Your Storage?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Contact us today to learn more about our warehouse solutions and how we can help streamline your operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
                <Link href="/contact">Request a Quote</Link>
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