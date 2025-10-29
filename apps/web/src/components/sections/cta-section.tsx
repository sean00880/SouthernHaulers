
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '../ui/button';

export function CTASection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.primary-foreground/0.08)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.primary-foreground/0.08)_1px,transparent_1px)] bg-[size:30px_30px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent dark:from-black/20" />

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main CTA */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary-foreground mb-6">
            Ready to Transform Your Logistics?
          </h2>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-12 max-w-2xl mx-auto">
            Join hundreds of satisfied customers who trust Southern Haulers for container drayage and agricultural hauling across the Southeast.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button asChild size="lg" className="h-14 px-8 text-base bg-primary-foreground text-primary hover:bg-primary-foreground/90">
              <a href="/quote">
                Get Instant Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-14 px-8 text-base border-primary-foreground/80 text-primary-foreground hover:bg-primary-foreground/15 hover:border-primary-foreground">
              <a href="/track">
                Track Container
              </a>
            </Button>
          </div>

          {/* Contact Options */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-12">
            <div className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-xl p-6 text-primary-foreground hover:bg-primary-foreground/15 transition-all">
              <Phone className="h-8 w-8 mx-auto mb-4" />
              <div className="font-semibold mb-2">24/7 Dispatch</div>
              <a href="tel:+1-555-0123" className="opacity-90 hover:opacity-100 transition-opacity text-sm md:text-base">
                (555) 012-3456
              </a>
            </div>

            <div className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-xl p-6 text-primary-foreground hover:bg-primary-foreground/15 transition-all">
              <Mail className="h-8 w-8 mx-auto mb-4" />
              <div className="font-semibold mb-2">Email Us</div>
              <a href="mailto:dispatch@southernhaulers.com" className="opacity-90 hover:opacity-100 transition-opacity text-sm md:text-base break-all">
                dispatch@southernhaulers.com
              </a>
            </div>

            <div className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-xl p-6 text-primary-foreground hover:bg-primary-foreground/15 transition-all">
              <MapPin className="h-8 w-8 mx-auto mb-4" />
              <div className="font-semibold mb-2">Location</div>
              <div className="opacity-90 text-sm md:text-base">
                South Georgia Hub
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-primary-foreground/90 text-xs md:text-sm">
            <div className="flex items-center gap-1">
              <span className="text-primary-foreground">✓</span> Same-day quotes
            </div>
            <div className="flex items-center gap-1">
              <span className="text-primary-foreground">✓</span> 98.5% on-time delivery
            </div>
            <div className="flex items-center gap-1">
              <span className="text-primary-foreground">✓</span> 300+ container capacity
            </div>
            <div className="flex items-center gap-1">
              <span className="text-primary-foreground">✓</span> TWIC certified
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
