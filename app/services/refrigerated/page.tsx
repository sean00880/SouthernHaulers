import { Metadata } from 'next'
import { Layout } from "@/components/layout"
import { ServicesSidebar } from "@/components/services-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Snowflake, Thermometer, Shield, BarChart3 } from "lucide-react"

export const metadata: Metadata = {
  title: 'Refrigerated Transport & Cold Chain Solutions | Southern Haulers',
  description: 'Professional temperature-controlled transportation services ensuring product integrity. Advanced cold chain solutions with real-time monitoring and HACCP compliance.',
  keywords: [
    'refrigerated transport Georgia',
    'cold chain logistics',
    'temperature controlled shipping',
    'reefer transport',
    'cold storage transport',
    'pharmaceutical transport',
    'food grade transportation',
    'temperature monitoring',
    'HACCP compliant transport',
    'cold chain integrity',
    'perishable goods transport',
    'frozen transport Georgia'
  ],
  openGraph: {
    title: 'Refrigerated Transport & Cold Chain Solutions | Southern Haulers',
    description: 'Professional temperature-controlled transportation services ensuring product integrity. Advanced cold chain solutions with real-time monitoring and HACCP compliance.',
    images: [
      {
        url: '/refrigerated-transport.jpg',
        width: 1200,
        height: 630,
        alt: 'Southern Haulers Refrigerated Transport'
      }
    ]
  }
}

export default function RefrigeratedPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
        <ServicesSidebar className="hidden md:block" />
        <main className="space-y-12">
          {/* Hero Section */}
          <div className="relative h-[300px] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1595246140625-573b715d11dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
              alt="Refrigerated transport truck"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex items-center justify-center text-center text-white p-6">
              <div>
                <h1 className="text-4xl font-bold mb-4">Refrigerated Transport</h1>
                <p className="text-lg max-w-2xl">
                  Temperature-controlled logistics solutions ensuring product integrity throughout the supply chain.
                </p>
              </div>
            </div>
          </div>

          {/* Cold Chain Solutions */}
          <section id="cold-chain" className="scroll-mt-16">
            <h2 className="text-3xl font-bold mb-8">Cold Chain Solutions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <Thermometer className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Temperature Control</h3>
                  <p className="text-muted-foreground">
                    Precise temperature management systems with continuous monitoring and real-time adjustments for optimal product conditions.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <Shield className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Quality Assurance</h3>
                  <p className="text-muted-foreground">
                    HACCP-compliant processes and comprehensive quality control measures ensuring product safety and integrity.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Equipment & Technology */}
          <section id="equipment" className="scroll-mt-16 bg-muted rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Advanced Reefer Technology</h2>
                <p className="text-muted-foreground mb-6">
                  Our fleet features state-of-the-art refrigerated units equipped with advanced monitoring and control systems.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Multi-temperature zones</li>
                  <li>• Remote temperature control</li>
                  <li>• Backup power systems</li>
                  <li>• Air flow management</li>
                </ul>
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1580674285054-bed31e145f59?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Refrigerated equipment"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </section>

          {/* Industry Solutions */}
          <section id="compliance" className="scroll-mt-16">
            <h2 className="text-3xl font-bold mb-8">Industry Solutions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold">Food & Beverage</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Fresh produce transport</li>
                    <li>• Frozen food logistics</li>
                    <li>• Dairy product handling</li>
                    <li>• Temperature monitoring</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold">Pharmaceutical</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• GDP compliance</li>
                    <li>• Clinical trial logistics</li>
                    <li>• Validated shipping</li>
                    <li>• Chain of custody</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold">Chemical</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Temperature-sensitive materials</li>
                    <li>• Hazmat certified transport</li>
                    <li>• Safety protocols</li>
                    <li>• Regulatory compliance</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-muted rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Need Temperature-Controlled Transport?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Contact our cold chain experts to discuss your temperature-sensitive shipping needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
                <Link href="/contact">Request Quote</Link>
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