import { Metadata } from 'next'
import { Layout } from "@/components/layout"
import { ServicesSidebar } from "@/components/services-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Snowflake, Thermometer, Shield, BarChart3 } from "lucide-react"
import { LucideIcon } from 'lucide-react'

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
  ]
}

interface ServiceSection {
  icon: LucideIcon
  title: string
  description: string
}

interface IndustrySection {
  title: string
  features: string[]
}

interface MonitoringSection {
  icon: LucideIcon
  title: string
  features: string[]
}

const coldChainSolutions: ServiceSection[] = [
  {
    icon: Thermometer,
    title: 'Temperature Control',
    description: 'Precise temperature management systems with continuous monitoring and real-time adjustments for optimal product conditions.'
  },
  {
    icon: Shield,
    title: 'Quality Assurance',
    description: 'HACCP-compliant processes and comprehensive quality control measures ensuring product safety and integrity.'
  }
]

const industrySolutions: IndustrySection[] = [
  {
    title: 'Food & Beverage',
    features: [
      'Fresh produce transport',
      'Frozen food logistics',
      'Dairy product handling',
      'Temperature monitoring'
    ]
  },
  {
    title: 'Pharmaceutical',
    features: [
      'GDP compliance',
      'Clinical trial logistics',
      'Validated shipping',
      'Chain of custody'
    ]
  },
  {
    title: 'Chemical',
    features: [
      'Temperature-sensitive materials',
      'Hazmat certified transport',
      'Safety protocols',
      'Regulatory compliance'
    ]
  }
]

const monitoringSections: MonitoringSection[] = [
  {
    icon: Thermometer,
    title: 'Temperature Control',
    features: [
      '24/7 temperature monitoring',
      'Automated alerts',
      'Historical data logging'
    ]
  },
  {
    icon: BarChart3,
    title: 'Performance Analytics',
    features: [
      'Route optimization',
      'Energy efficiency',
      'Performance reporting'
    ]
  },
  {
    icon: Shield,
    title: 'Quality Assurance',
    features: [
      'Compliance monitoring',
      'Quality certifications',
      'Audit support'
    ]
  }
]

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
              {coldChainSolutions.map((solution, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <solution.icon className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-2">{solution.title}</h3>
                    <p className="text-muted-foreground">{solution.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Industry Solutions */}
          <section id="compliance" className="scroll-mt-16">
            <h2 className="text-3xl font-bold mb-8">Industry Solutions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {industrySolutions.map((industry, index) => (
                <Card key={index}>
                  <CardContent className="p-6 space-y-4">
                    <h3 className="text-xl font-bold">{industry.title}</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      {industry.features.map((feature, idx) => (
                        <li key={idx}>• {feature}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Monitoring Section */}
          <section id="monitoring" className="scroll-mt-16">
            <h2 className="text-3xl font-bold mb-8">Real-Time Monitoring</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {monitoringSections.map((section, index) => (
                <div key={index} className="space-y-4">
                  <section.icon className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-bold">{section.title}</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    {section.features.map((feature, idx) => (
                      <li key={idx}>• {feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
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