import { Metadata } from 'next'
import { Layout } from "@/components/layout"
import { ServicesSidebar } from "@/components/services-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Box, ClipboardCheck, BarChart3, Warehouse } from "lucide-react"

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
  ],
  openGraph: {
    title: 'Warehouse Solutions & Distribution Services | Southern Haulers',
    description: 'State-of-the-art warehousing facilities with advanced inventory management, climate-controlled storage, and comprehensive distribution solutions in South Georgia.',
    images: [
      {
        url: '/warehouse-solutions.jpg',
        width: 1200,
        height: 630,
        alt: 'Southern Haulers Warehouse Solutions'
      }
    ]
  }
}

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
          <section id="storage" className="scroll-mt-16">
            <h2 className="text-3xl font-bold mb-8">Storage Solutions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <Box className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Flexible Storage Options</h3>
                  <p className="text-muted-foreground">
                    From small parcels to bulk storage, our facilities accommodate various storage needs with customizable space solutions.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <ClipboardCheck className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Inventory Management</h3>
                  <p className="text-muted-foreground">
                    Real-time tracking and advanced inventory management systems ensure accurate stock levels and efficient operations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Features List */}
          <section id="inventory" className="scroll-mt-16">
            <h2 className="text-3xl font-bold mb-8">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <BarChart3 className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Analytics & Reporting</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Real-time inventory tracking</li>
                  <li>• Custom reporting solutions</li>
                  <li>• Performance analytics</li>
                </ul>
              </div>
              <div className="space-y-4">
                <Warehouse className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Facility Features</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Climate-controlled storage</li>
                  <li>• 24/7 security monitoring</li>
                  <li>• Modern handling equipment</li>
                </ul>
              </div>
              <div className="space-y-4">
                <Box className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Value-Added Services</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Cross-docking</li>
                  <li>• Pick and pack</li>
                  <li>• Kitting and assembly</li>
                </ul>
              </div>
            </div>
          </section>

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