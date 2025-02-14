"use client"

import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { useParallax } from "@/hooks/use-parallax"
import { useState } from "react"
import { Heart, Target, Users, Truck, Award, HandshakeIcon, BarChart, ShieldCheck } from "lucide-react"

export default function About() {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const parallaxOffset = useParallax()

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-900 animate-pulse" />
        )}
        <Image
          src="https://images.unsplash.com/photo-1586864387789-628af9feed72?q=80&w=1920"
          alt="Fleet of trucks in a logistics yard"
          fill
          style={{
            objectFit: "cover",
            transform: `translate3d(0, ${parallaxOffset}px, 0) scale(1.1)`,
            transition: "transform 0.1s linear"
          }}
          className={`transition-opacity duration-500 ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setIsImageLoaded(true)}
          priority
        />
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Our Story
          </h1>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed font-light">
            Building trust through excellence in transportation since 1995
          </p>
        </div>
      </section>

      {/* Company Overview Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  Southern Haulers has been a cornerstone of transportation excellence in South Georgia
                  for over two decades. What started as a small family-owned operation has grown into
                  one of the region's most trusted logistics partners.
                </p>
                <p>
                  Our commitment to quality service, safety, and customer satisfaction has earned us
                  a reputation as the go-to transportation provider for businesses across the
                  southeastern United States.
                </p>
                <p>
                  Today, we operate a modern fleet of vehicles, state-of-the-art warehousing
                  facilities, and employ over 200 dedicated professionals who share our vision of
                  excellence in logistics.
                </p>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1920"
                alt="Modern logistics warehouse facility"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Our Core Values</h2>
          <p className="text-xl text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Safety First",
                description: "Prioritizing the well-being of our team and cargo",
                icon: ShieldCheck,
              },
              {
                title: "Customer Focus",
                description: "Dedicated to exceeding client expectations",
                icon: Heart,
              },
              {
                title: "Excellence",
                description: "Striving for the highest standards in all operations",
                icon: Award,
              },
              {
                title: "Integrity",
                description: "Building trust through honest business practices",
                icon: HandshakeIcon,
              },
            ].map((value, index) => (
              <Card key={index} className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="h-12 w-12 mx-auto mb-4">
                    <value.icon className="h-full w-full text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50" />
        <Image
          src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=1920"
          alt="Truck driving on highway at sunset"
          fill
          style={{ objectFit: "cover" }}
          className="absolute inset-0"
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl mb-8 leading-relaxed">
              To provide innovative and reliable transportation solutions that empower businesses
              to thrive, while maintaining the highest standards of safety, service, and
              environmental responsibility.
            </p>
            <Button
              size="lg"
              asChild
              className="bg-white text-black hover:bg-white/90"
            >
              <Link href="/contact">Partner With Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Our Leadership</h2>
          <p className="text-xl text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Meet the team driving our success
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "John Smith",
                title: "Chief Executive Officer",
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1920",
              },
              {
                name: "Sarah Johnson",
                title: "Operations Director",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1920",
              },
              {
                name: "Michael Brown",
                title: "Fleet Manager",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1920",
              },
            ].map((member, index) => (
              <Card key={index} className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className="relative h-64 w-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-muted-foreground">{member.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience the Difference?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the growing family of businesses that trust Southern Haulers for their
            transportation needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">Get Started Today</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/services">Explore Our Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  )
}
