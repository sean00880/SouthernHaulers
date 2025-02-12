import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Truck, Ship, BarChart3, Container } from "lucide-react"

export default function ContainersPage() {
  const features = [
    {
      title: "Transport Solutions",
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

  return (
    <>
      <div className="text-center mb-12 bg-muted rounded-lg p-12">
        <h1 className="text-4xl font-bold mb-4">Container Services</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Comprehensive container handling and transportation solutions ensuring efficient movement of your cargo.
        </p>
      </div>

      <div className="space-y-16">
        {features.map((section, sectionIndex) => (
          <section key={sectionIndex}>
            <h2 className="text-3xl font-bold mb-8">{section.title}</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {section.items.map((item, itemIndex) => (
                <Card key={itemIndex}>
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
          </section>
        ))}
      </div>

      <div className="mt-12 bg-muted rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Ship Your Containers?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Contact us today to learn more about our container services and how we can optimize your shipping operations.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
            <Link href="/contact">Request a Quote</Link>
          </Button>
          <Button variant="outline" asChild size="lg" className="text-white border-white bg-primary/80 hover:bg-white hover:text-primary focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all">
            <Link href="/services">Back to Services</Link>
          </Button>
        </div>
      </div>
    </>
  )
}