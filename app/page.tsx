"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Layout } from "@/components/layout"
import { Card, CardContent } from "@/components/ui/card"
import { Counter } from "@/components/counter"
import { TestimonialCarousel } from "@/components/testimonial-carousel"
import { ServiceMap } from "@/components/service-map"
import Link from "next/link"
import Image from "next/image"
import { useParallax } from "@/hooks/use-parallax"
import { Warehouse, Container, Snowflake, Users, CheckCircle, Clock, Shield, Trophy } from "lucide-react"

export default function Home() {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const parallaxOffset = useParallax()
  return (
    <Layout>
      {/* Hero Section with Background Image */}
      <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/50" />
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-900 animate-pulse" />
        )}
        <Image
          src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
          alt="Trucks on highway"
          fill
          style={{
            objectFit: 'cover',
            transform: `translate3d(0, ${parallaxOffset}px, 0) scale(1.1)`,
            transition: 'transform 0.1s linear'
          }}
          className={`transition-opacity duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsImageLoaded(true)}
          priority
        />
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            A TOP RATED SOUTH GEORGIA CARRIER
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-8">
            At Southern Haulers, we stand as the foremost carrier in the southeastern United States, focusing on
            agricultural transport. Our expertise lies in hauling bulk loads, container drayage, as well as warehouse
            and transloading services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              asChild 
              className="bg-white text-black hover:bg-white/90 focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all"
            >
              <Link href="/careers">Become a Driver</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              asChild 
              className="text-white border-white bg-primary/80 hover:bg-white hover:text-primary focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all"
            >
              <Link href="/contact">Request A Quote</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="h-8 w-8 mx-auto mb-4">
                  <Warehouse className="h-full w-full text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-3xl font-bold mb-2">
                  <Counter end={500} suffix="K+" delay={0.2} />
                </div>
                <p className="text-muted-foreground">Square Feet of Storage</p>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="h-8 w-8 mx-auto mb-4">
                  <Container className="h-full w-full text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-3xl font-bold mb-2">
                  <Counter end={50} suffix="K+" delay={0.4} />
                </div>
                <p className="text-muted-foreground">Containers Handled Annually</p>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="h-8 w-8 mx-auto mb-4">
                  <Users className="h-full w-full text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-3xl font-bold mb-2">
                  <Counter end={1000} suffix="+" delay={0.6} />
                </div>
                <p className="text-muted-foreground">Satisfied Clients</p>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="h-8 w-8 mx-auto mb-4">
                  <Snowflake className="h-full w-full text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-3xl font-bold mb-2">
                  <Counter end={100} suffix="+" delay={0.8} />
                </div>
                <p className="text-muted-foreground">Reefer Units</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section with Images */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What We Do</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Warehouse Solutions",
                description: "State-of-the-art warehousing facilities with advanced inventory management and distribution capabilities.",
                icon: Warehouse,
                href: "/services/warehouse",
                image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
              },
              {
                title: "Container Services",
                description: "Comprehensive container handling, drayage, and intermodal transportation solutions.",
                icon: Container,
                href: "/services/containers",
                image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
              },
              {
                title: "Refrigerated Transport",
                description: "Temperature-controlled logistics ensuring product integrity throughout the supply chain.",
                icon: Snowflake,
                href: "/services/refrigerated",
                image: "https://images.unsplash.com/photo-1595246140625-573b715d11dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
              },
            ].map((service, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <Link href={service.href}>
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                  </div>
                  <CardContent className="p-6">
                    <div className="h-12 w-12 mb-4">
                      <service.icon className="h-full w-full text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section with Background Image */}
      <section className="py-24 bg-muted relative overflow-hidden">
        <div className="absolute inset-0 bg-black/60" />
        <div className="parallax-container">
          <Image 
            src="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Truck on highway"
            fill
            style={{ objectFit: "cover" }}
            className="absolute inset-0 mix-blend-overlay"
            onLoad={() => setIsImageLoaded(true)}
          />
          {!isImageLoaded && (
            <div className="absolute inset-0 bg-gray-900 animate-pulse" />
          )}
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Why Choose Southern Haulers?</h2>
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
              <Card key={index} className="group bg-white/90 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 mx-auto mb-4">
                    <feature.icon className="h-full w-full text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area Map */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Service Area</h2>
          <ServiceMap />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
          <TestimonialCarousel />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div
          className="absolute inset-0 bg-fixed bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1519003722824-194d4455a60c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-black/75" />
        </div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Join the countless businesses that trust Southern Haulers for their transportation needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-white text-black hover:bg-white/90">
              <Link href="/contact">Get a Quote</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-white border-white bg-primary/80 hover:bg-white hover:text-primary focus:ring-2 focus:ring-white focus:ring-offset-2 transition-all">
              <Link href="/careers">Join Our Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  )
}
