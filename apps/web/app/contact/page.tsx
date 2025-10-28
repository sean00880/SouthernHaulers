
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { ContactForm } from '../../components/contact-form';

export const metadata = {
  title: 'Contact Us - Southern Haulers | Drayage & Agricultural Hauling',
  description: 'Get in touch with Southern Haulers for container drayage, agricultural hauling, and warehousing services. 24/7 dispatch available for Savannah, Charleston, and Jacksonville ports.',
  keywords: 'contact southern haulers, drayage quote, container transport inquiry, port drayage services',
};

export default function ContactPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative border-b bg-muted/30">
        <div className="container py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground">
              Have questions about our container drayage or agricultural hauling services? 
              We're here to help 24/7. Reach out to our dispatch team for immediate assistance.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="container py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">24/7 Dispatch</h3>
                    <p className="text-muted-foreground">(555) 123-4567</p>
                    <p className="text-sm text-muted-foreground">Available for urgent shipments</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">dispatch@southern-haulers.com</p>
                    <p className="text-sm text-muted-foreground">We respond within 2-4 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">South Georgia Hub</h3>
                    <p className="text-muted-foreground">
                      Strategic location for 2-4 hour turnaround<br />
                      to Savannah, Charleston, and Jacksonville
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Hours of Operation</h3>
                    <p className="text-muted-foreground">
                      24/7 Dispatch & Support<br />
                      Office: Monday-Friday, 8am-6pm EST
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="pt-8 border-t">
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <a href="/quote" className="text-primary hover:underline">Request a Quote</a>
                <a href="/track" className="text-primary hover:underline">Track Shipment</a>
                <a href="/services" className="text-primary hover:underline">Our Services</a>
                <a href="/drivers" className="text-primary hover:underline">Become a Driver</a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-lg border bg-card p-8">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="border-t bg-muted/30">
        <div className="container py-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Our Service Area</h2>
            <p className="text-muted-foreground">
              Serving Georgia, South Carolina, and Florida with strategic South Georgia hub location
            </p>
          </div>
          <div className="aspect-video w-full max-w-4xl mx-auto rounded-lg bg-muted flex items-center justify-center border">
            <p className="text-muted-foreground">Interactive service area map</p>
          </div>
        </div>
      </section>
    </div>
  );
}
