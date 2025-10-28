
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '../ui/button';

export function CTASection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-900 dark:to-indigo-950" />
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main CTA */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            Ready to Transform Your Logistics?
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
            Join hundreds of satisfied customers who trust Southern Haulers for container drayage and agricultural hauling across the Southeast.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button asChild size="lg" className="h-14 px-8 text-base bg-white text-blue-600 hover:bg-white/90">
              <a href="/quote">
                Get Instant Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-14 px-8 text-base border-white text-white hover:bg-white/10">
              <a href="/track">
                Track Container
              </a>
            </Button>
          </div>

          {/* Contact Options */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-white">
              <Phone className="h-8 w-8 mx-auto mb-4" />
              <div className="font-semibold mb-2">24/7 Dispatch</div>
              <a href="tel:+1-555-0123" className="text-white/90 hover:text-white transition-colors">
                (555) 012-3456
              </a>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-white">
              <Mail className="h-8 w-8 mx-auto mb-4" />
              <div className="font-semibold mb-2">Email Us</div>
              <a href="mailto:dispatch@southernhaulers.com" className="text-white/90 hover:text-white transition-colors">
                dispatch@southernhaulers.com
              </a>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-white">
              <MapPin className="h-8 w-8 mx-auto mb-4" />
              <div className="font-semibold mb-2">Location</div>
              <div className="text-white/90">
                South Georgia Hub
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-white/80 text-sm">
            <div>✓ Same-day quotes</div>
            <div>✓ 98.5% on-time delivery</div>
            <div>✓ 300+ container capacity</div>
            <div>✓ TWIC certified</div>
          </div>
        </div>
      </div>
    </section>
  );
}
