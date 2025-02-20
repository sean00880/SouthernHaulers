import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TableOfContents } from "@/components/table-of-contents"
import Image from "next/image"
import Link from "next/link"
import { Box, ClipboardCheck, BarChart3, Warehouse } from "lucide-react"

export default function WarehousePage() {
  const features = [
    {
      title: "Storage Solutions",
      image: "/services/warehouse-storage.jpg",
      items: [
        {
          icon: Box,
          title: "Flexible Storage Options",
          description: "From small parcels to bulk storage, our facilities accommodate various storage needs with customizable space solutions."
        },
        {
          icon: ClipboardCheck,
          title: "Inventory Management",
          description: "Real-time tracking and advanced inventory management systems ensure accurate stock levels and efficient operations."
        }
      ]
    },
    {
      title: "Key Features",
      image: "/services/warehouse-features.jpg",
      items: [
        {
          icon: BarChart3,
          title: "Analytics & Reporting",
          features: [
            "Real-time inventory tracking",
            "Custom reporting solutions",
            "Performance analytics"
          ]
        },
        {
          icon: Warehouse,
          title: "Facility Features",
          features: [
            "Climate-controlled storage",
            "24/7 security monitoring",
            "Modern handling equipment"
          ]
        }
      ]
    }
  ]

  const sections = [
    {
      title: "Storage Solutions",
      items: [
        {
          title: "Flexible Storage Options",
          description: "From small parcels to bulk storage, our facilities accommodate various storage needs with customizable space solutions."
        },
        {
          title: "Inventory Management",
          description: "Real-time tracking and advanced inventory management systems ensure accurate stock levels and efficient operations."
        }
      ]
    },
    {
      title: "Key Features",
      items: [
        {
          title: "Analytics & Reporting",
          features: [
            "Real-time inventory tracking",
            "Custom reporting solutions",
            "Performance analytics"
          ]
        },
        {
          title: "Facility Features",
          features: [
            "Climate-controlled storage",
            "24/7 security monitoring",
            "Modern handling equipment"
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
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000"
          alt="Modern warehouse facility"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-3xl px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Warehouse Solutions
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              State-of-the-art warehousing facilities with advanced inventory management and distribution capabilities.
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
            section.title === "Storage Solutions"
              ? "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2000"
              : "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2000"
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
        <h2 className="text-2xl font-bold mb-4">Ready to Optimize Your Storage?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Contact us today to learn more about our warehouse solutions and how we can help streamline your operations.
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
