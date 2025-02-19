"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Counter } from "@/components/counter"
import { TestimonialCarousel } from "@/components/testimonial-carousel"
import { ServiceMap } from "@/components/service-map"
import Link from "next/link"
import Image from "next/image"
import { useParallax } from "@/hooks/use-parallax"
import { Warehouse, Container, Snowflake, Users, CheckCircle, Clock, Shield, Trophy, Linkedin, Instagram, Facebook } from "lucide-react"
import { PartnersMarquee } from "@/components/partners-marquee"
import { motion, useInView } from "framer-motion"

export default function Home() {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const parallaxOffset = useParallax()
  
  return (
    <div>
      {/* Hero Section with Image Background */}
      <section 
        className="relative min-h-[600px] h-[80vh] max-h-[800px] overflow-hidden"
        aria-label="Main hero section"
      >
        <div className="absolute inset-0">
          <Image
            src="/services/warehouse-hero.jpg"
            alt="Professional warehouse and transportation fleet"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 100vw"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
        </div>
        
        <div className="relative h-full">
          <div className="container mx-auto px-4 h-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full items-center gap-12">
              {/* Left Column - Content */}
              <div className="text-white">
                <motion.h1 
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  South Georgia's Premier
                  <span className="block mt-2">Transportation Partner</span>
                </motion.h1>
                
                <p className="text-lg sm:text-xl md:text-2xl max-w-2xl mb-8 leading-relaxed font-light">
                  Delivering excellence in agricultural transport, container drayage, and
                  warehouse solutions across the southeastern United States.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button 
                    size="lg" 
                    asChild 
                    className="bg-white text-black hover:bg-white/90 focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all text-lg py-6 px-8"
                  >
                    <Link href="/contact">Get a Quote</Link>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    asChild 
                    className="text-white border-white hover:bg-white hover:text-primary focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all text-lg py-6 px-8"
                  >
                    <Link href="/careers">Join Our Team</Link>
                  </Button>
                </div>
                {/* Social Icons */}
                <div className="flex gap-4">
                  <Link href="https://linkedin.com" target="_blank" className="text-white hover:text-primary transition-colors">
                    <Linkedin className="w-6 h-6" />
                  </Link>
                  <Link href="https://instagram.com" target="_blank" className="text-white hover:text-primary transition-colors">
                    <Instagram className="w-6 h-6" />
                  </Link>
                  <Link href="https://facebook.com" target="_blank" className="text-white hover:text-primary transition-colors">
                    <Facebook className="w-6 h-6" />
                  </Link>
                </div>
              </div>
              
              {/* Right Column - Empty for video focus */}
              <div></div>
            </div>
          </div>
          
          {/* Partners Marquee */}
          <div className="absolute bottom-0 left-0 right-0">
            <PartnersMarquee />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="h-12 w-12 mx-auto mb-4">
                  <Warehouse className="h-full w-full text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-4xl font-bold mb-2">
                  <Counter end={500} suffix="K+" delay={0.2} />
                </div>
                <p className="text-muted-foreground text-lg">Square Feet of Storage</p>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="h-12 w-12 mx-auto mb-4">
                  <Container className="h-full w-full text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-4xl font-bold mb-2">
                  <Counter end={50} suffix="K+" delay={0.4} />
                </div>
                <p className="text-muted-foreground text-lg">Containers Handled Annually</p>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="h-12 w-12 mx-auto mb-4">
                  <Users className="h-full w-full text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-4xl font-bold mb-2">
                  <Counter end={1000} suffix="+" delay={0.6} />
                </div>
                <p className="text-muted-foreground text-lg">Satisfied Clients</p>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="h-12 w-12 mx-auto mb-4">
                  <Snowflake className="h-full w-full text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-4xl font-bold mb-2">
                  <Counter end={100} suffix="+" delay={0.8} />
                </div>
                <p className="text-muted-foreground text-lg">Reefer Units</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section with Images */}
      <section id="services" className="py-24 scroll-mt-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">What We Do</h2>
          <p className="text-xl text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Comprehensive logistics solutions tailored to your specific needs
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Warehouse Solutions",
                description: "State-of-the-art warehousing facilities with advanced inventory management and distribution capabilities.",
                icon: Warehouse,
                href: "#services",
                image: "/services/warehouse-features.jpg",
              },
              {
                title: "Container Services",
                description: "Comprehensive container handling, drayage, and intermodal transportation solutions.",
                icon: Container,
                href: "#services",
                image: "/services/containers-features.jpg",
              },
              {
                title: "Refrigerated Transport",
                description: "Temperature-controlled logistics ensuring product integrity throughout the supply chain.",
                icon: Snowflake,
                href: "#services",
                image: "/services/refrigerated-features.jpg",
              },
            ].map((service, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <Link 
                  href={service.href} 
                  className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  scroll={false}
                >
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 group-hover:from-black/70 transition-colors duration-300" />
                  </div>
                  <CardContent className="p-8">
                    <div className="h-14 w-14 mb-4">
                      <service.icon className="h-full w-full text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                    <p className="text-muted-foreground text-lg">{service.description}</p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-muted relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50" />
        <Image 
          src="/services/warehouse-storage.jpg"
          alt="Professional trucking services"
          fill
          style={{ objectFit: "cover" }}
          className="absolute inset-0 mix-blend-overlay"
          onLoad={() => setIsImageLoaded(true)}
        />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">Why Choose Southern Haulers?</h2>
          <p className="text-xl text-white/90 text-center mb-12 max-w-2xl mx-auto">
            Experience the difference of working with a leader in transportation
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Quality Service",
                description: "Committed to excellence in every delivery",
                icon: CheckCircle,
              },
              {
                title: "Timely Delivery",
                description: "On-time, every time guarantee",
                icon: Clock,
              },
              {
                title: "Safety First",
                description: "Top-rated safety protocols and training",
                icon: Shield,
              },
              {
                title: "Experience",
                description: "Decades of industry expertise",
                icon: Trophy,
              },
            ].map((feature, index) => (
              <Card key={index} className="group bg-white/95 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="h-14 w-14 mx-auto mb-4">
                    <feature.icon className="h-full w-full text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-lg">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area Map */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Our Service Area</h2>
          <p className="text-xl text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Serving the southeastern United States with comprehensive logistics solutions
          </p>
          <ServiceMap />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">What Our Clients Say</h2>
          <p className="text-xl text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Trusted by businesses across the Southeast
          </p>
          <TestimonialCarousel />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50" />
        <Image
          src="/services/containers-transport.jpg"
          alt="Southern Haulers fleet"
          fill
          style={{ objectFit: "cover" }}
          className="absolute inset-0"
        />
        <div className="relative container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto font-light">
            Join the countless businesses that trust Southern Haulers for their transportation needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              asChild 
              className="bg-white text-black hover:bg-white/90 text-lg py-6 px-8"
            >
              <Link href="/contact">Get a Quote</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              asChild 
              className="text-white border-white hover:bg-white hover:text-primary text-lg py-6 px-8"
            >
              <Link href="/careers">Join Our Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
