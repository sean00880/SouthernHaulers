import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TableOfContents } from "@/components/table-of-contents"
import Image from "next/image"
import Link from "next/link"
import { Truck, Ship, BarChart3, Container } from "lucide-react"

export default function ContainersPage() {
  const features = [
    {
      title: "Transport Solutions",
      image: "/services/containers-transport.jpg",
      items: [
        {
          icon: Truck,
          title: "Drayage Services",
          description: "Efficient port-to-destination container transportation with real-time tracking and scheduling."
        },
        {
          icon: Ship,
          title: "Port Operations",
          description: "Seamless coordination with port authorities and shipping lines for smooth container handling."
        }
      ]
    },
    {
      title: "Key Features",
      image: "/services/containers-features.jpg",
      items: [
        {
          icon: BarChart3,
          title: "Container Tracking",
          features: [
            "Real-time location updates",
            "Status monitoring",
            "Delivery estimates"
          ]
        },
        {
          icon: Container,
          title: "Container Types",
          features: [
            "Standard containers",
            "High-cube containers",
            "Special equipment"
          ]
        }
      ]
    }
  ]

  const sections = [
    {
      title: "Transport Solutions",
      items: [
        {
          title: "Drayage Services",
          description: "Efficient port-to-destination container transportation with real-time tracking and scheduling."
        },
        {
          title: "Port Operations",
          description: "Seamless coordination with port authorities and shipping lines for smooth container handling."
        }
      ]
    },
    {
      title: "Key Features",
      items: [
        {
          title: "Container Tracking",
          features: [
            "Real-time location updates",
            "Status monitoring",
            "Delivery estimates"
          ]
        },
        {
          title: "Container Types",
          features: [
            "Standard containers",
            "High-cube containers",
            "Special equipment"
          ]
        }
      ]
    }
  ]

  return (
    <div>
      <TableOfContents sections={sections} />
      <div className="relative h-[400px] rounded-lg overflow-hidden mb-16">
        <Image
          src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2000"
          alt="Container terminal operations"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-3xl px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Container Services
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Comprehensive container handling and transportation solutions ensuring efficient movement of your cargo.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-24">
        {features.map((section, sectionIndex) => (
          <section key={sectionIndex} id={section.title.toLowerCase().replace(" ", "-")} className="relative">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div className={`relative h-[300px] rounded-lg overflow-hidden ${sectionIndex % 2 === 1 ? 'md:order-last' : ''}`}>
                <Image
          src={
            section.title === "Transport Solutions"
              ? "https://images.unsplash.com/photo-1577791465291-47b1c61074f5?q=80&w=2000"
              : "https://images.unsplash.com/photo-1569063386798-345908ef9a62?q=80&w=2000"
          }
                  alt={section.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-8">{section.title}</h2>
                <div className="grid gap-8">
                  {section.items.map((item, itemIndex) => (
                    <Card key={itemIndex} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <item.icon className="h-12 w-12 text-primary mb-4" />
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        {'description' in item ? (
                          <p className="text-muted-foreground">{item.description}</p>
                        ) : (
                          <ul className="space-y-2">
                            {item.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-center gap-2 text-muted-foreground">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <div className="mt-16 bg-muted rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Ship Your Containers?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Contact us today to learn more about our container services and how we can optimize your shipping operations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
            <Link href="/forms?tab=hauling">Request a Quote</Link>
          </Button>
          <Button variant="outline" asChild size="lg" className="text-white border-white bg-primary/80 hover:bg-white hover:text-primary focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all">
            <Link href="/services">Back to Services</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
