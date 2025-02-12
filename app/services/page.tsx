import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Warehouse, Container, Snowflake } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Services() {
  const services = [
    {
      title: "Warehouse Solutions",
      description: "State-of-the-art warehousing facilities with advanced inventory management and distribution capabilities.",
      icon: Warehouse,
      href: "/services/warehouse",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
      features: [
        "Climate-controlled storage",
        "Real-time inventory tracking",
        "Cross-docking capabilities",
        "Advanced security systems"
      ]
    },
    {
      title: "Container Services",
      description: "Comprehensive container handling and transportation solutions ensuring efficient movement of your cargo.",
      icon: Container,
      href: "/services/containers",
      image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
      features: [
        "Port drayage services",
        "Intermodal solutions",
        "Container tracking",
        "Custom routing options"
      ]
    },
    {
      title: "Refrigerated Transport",
      description: "Temperature-controlled logistics ensuring product integrity throughout the supply chain.",
      icon: Snowflake,
      href: "/services/refrigerated",
      image: "https://images.unsplash.com/photo-1595246140625-573b715d11dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
      features: [
        "Multi-temperature zones",
        "Real-time monitoring",
        "HACCP compliance",
        "Cold chain integrity"
      ]
    }
  ]

  return (
    <div>
      <div className="relative h-[400px] rounded-lg overflow-hidden mb-16">
        <Image
          src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
          alt="Logistics and transportation services"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-3xl px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Comprehensive Logistics Solutions
            </h1>
            <p className="text-xl text-white/90">
              From warehousing to refrigerated transport, we provide end-to-end logistics services tailored to your needs.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        {services.map((service, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 lg:p-8">
                <CardHeader className="p-0 mb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <service.icon className="h-8 w-8 text-primary" />
                    <CardTitle className="text-2xl">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button asChild>
                    <Link href={service.href}>Learn More</Link>
                  </Button>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-16 bg-muted rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Contact us today to learn how our comprehensive logistics solutions can benefit your business.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
            <Link href="/contact">Request a Quote</Link>
          </Button>
          <Button variant="outline" asChild size="lg" className="text-white border-white bg-primary/80 hover:bg-white hover:text-primary focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all">
            <Link href="/careers">Join Our Team</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
