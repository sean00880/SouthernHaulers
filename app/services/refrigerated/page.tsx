import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Thermometer, Truck, Shield, Snowflake } from "lucide-react"

export default function RefrigeratedPage() {
  const features = [
    {
      title: "Temperature Control",
      items: [
        {
          icon: Thermometer,
          title: "Multi-Temperature Zones",
          description: "Advanced temperature control systems allowing multiple temperature zones in a single shipment."
        },
        {
          icon: Shield,
          title: "Quality Assurance",
          description: "Continuous monitoring and documentation ensuring product integrity throughout transit."
        }
      ]
    },
    {
      title: "Key Features",
      items: [
        {
          icon: Snowflake,
          title: "Cold Chain Solutions",
          features: [
            "Temperature monitoring",
            "Real-time alerts",
            "Compliance reporting"
          ]
        },
        {
          icon: Truck,
          title: "Transport Options",
          features: [
            "Local delivery",
            "Long-haul transport",
            "Cross-border shipping"
          ]
        }
      ]
    }
  ]

  return (
    <>
      <div className="text-center mb-12 bg-muted rounded-lg p-12">
        <h1 className="text-4xl font-bold mb-4">Refrigerated Transport</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Temperature-controlled logistics ensuring product integrity throughout the supply chain.
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
        <h2 className="text-2xl font-bold mb-4">Need Temperature-Controlled Shipping?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Contact us today to learn more about our refrigerated transport solutions and how we can protect your temperature-sensitive cargo.
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