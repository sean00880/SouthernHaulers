
'use client';

import { useState } from 'react';
import { Testimonial } from '@/data/testimonials';
import { Star, Quote, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Use featured testimonials
  const featuredTestimonials = testimonials.filter(t => t.featured);
  const current = featuredTestimonials[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? featuredTestimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === featuredTestimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="min-h-screen flex items-center spacing-section bg-muted/30">
      <div className="container w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-background mb-6">
            <Star className="h-4 w-4 text-primary fill-primary" />
            <span className="text-body-small font-medium">Customer Success Stories</span>
          </div>
          <h2 className="text-heading-1 font-semibold spacing-content-sm">
            What Our Customers Say
          </h2>
          <p className="text-body-large text-muted-foreground">
            Don't just take our word for it. Hear from businesses who've transformed their logistics with Southern Haulers.
          </p>
        </div>

        {/* Carousel */}
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-card border rounded-2xl p-8 md:p-12 shadow-xl">
            {/* Quote Icon */}
            <div className="absolute top-8 right-8 opacity-10">
              <Quote className="h-24 w-24" />
            </div>

            {/* Content */}
            <div className="relative">
              {/* Rating */}
              <div className="flex items-center gap-1 mb-6">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-heading-2 font-semibold leading-relaxed mb-8">
                "{current.fullText || current.quote}"
              </blockquote>

              {/* Metrics */}
              {current.metrics && current.metrics.length > 0 && (
                <div className="grid grid-cols-3 gap-6 mb-8 pb-8 border-b">
                  {current.metrics.map((metric, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-heading-2 font-semibold text-primary mb-1">{metric.value}</div>
                      <div className="text-body-small text-muted-foreground">{metric.label}</div>
                      {metric.improvement && (
                        <div className="text-caption text-green-600 dark:text-green-400 mt-1">
                          {metric.improvement}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xl">
                  {current.author.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-body">{current.author.name}</div>
                  <div className="text-body-small text-muted-foreground">{current.author.title}</div>
                  <div className="text-body-small text-muted-foreground">{current.author.company}</div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-8 border-t">
              <div className="flex items-center gap-2">
                {featuredTestimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-muted-foreground/30'
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handlePrevious}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNext}
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* All Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {testimonials.filter(t => !t.featured).slice(0, 3).map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-body-small text-muted-foreground mb-4 line-clamp-4">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="pt-4 border-t">
                  <div className="font-semibold text-body-small">{testimonial.author.name}</div>
                  <div className="text-caption text-muted-foreground">{testimonial.author.title}</div>
                  <div className="text-caption text-muted-foreground">{testimonial.author.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
