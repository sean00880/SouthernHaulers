import { Metadata } from 'next'
import { Layout } from "@/components/layout"
import { ServicesSidebar } from "@/components/services-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Container, Truck, Route, BarChart3 } from "lucide-react"

export const metadata: Metadata = {
  title: 'Container & Drayage Services | Southern Haulers',
  description: 'Expert container handling and drayage services in South Georgia. Efficient port-to-door delivery, intermodal solutions, and real-time container tracking for your logistics needs.',
  keywords: [
    'container drayage Georgia',
    'port drayage services',
    'intermodal transportation',
    'container tracking',
    'port to door delivery',
    'container logistics',
    'South Georgia drayage',
    'container shipping',
    'port services Georgia',
    'container transportation',
    'EDI integration',
    'container monitoring'
  ],
  openGraph: {
    title: 'Container & Drayage Services | Southern Haulers',
    description: 'Expert container handling and drayage services in South Georgia. Efficient port-to-door delivery, intermodal solutions, and real-time container tracking for your logistics needs.',
    images: [
      {
        url: '/container-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Southern Haulers Container Services'
      }
    ]
  }
}

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
              <Card>
                <CardContent className="p-6">
                  <Container className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Port Drayage</h3>
                  <p className="text-muted-foreground">
                    Efficient container movement between ports and inland destinations with real-time tracking and status updates.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <Truck className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Intermodal Solutions</h3>
                  <p className="text-muted-foreground">
                    Seamless integration of rail and road transportation for optimal container movement across the Southeast.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Services Grid */}
          <section id="drayage" className="scroll-mt-16">
            <h2 className="text-3xl font-bold mb-8">Our Container Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <Route className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Transportation</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Port-to-door delivery</li>
                  <li>• Cross-border services</li>
                  <li>• Express delivery options</li>
                </ul>
              </div>
              <div className="space-y-4">
                <Container className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Container Types</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Standard containers</li>
                  <li>• High-cube containers</li>
                  <li>• Special equipment</li>
                </ul>
              </div>
              <div className="space-y-4">
                <BarChart3 className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Tracking & Visibility</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Real-time GPS tracking</li>
                  <li>• EDI integration</li>
                  <li>• Status notifications</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Technology Section */}
          <section id="tracking" className="scroll-mt-16 bg-muted rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Advanced Tracking Technology</h2>
                <p className="text-muted-foreground mb-6">
                  Our state-of-the-art tracking systems provide real-time visibility into your container movements, ensuring transparency and control throughout the supply chain.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Real-time location updates</li>
                  <li>• Automated status notifications</li>
                  <li>• Custom reporting capabilities</li>
                  <li>• Mobile app access</li>
                </ul>
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1586528116493-d2f45325d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Container tracking system"
                  fill
                  className="object-cover"
                />
              </div>
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