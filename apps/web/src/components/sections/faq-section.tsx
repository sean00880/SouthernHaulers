
'use client';

import { useState } from 'react';
import { FAQ, getFaqsByCategory } from '@/data/faqs';
import { ChevronDown, Search, HelpCircle } from 'lucide-react';
import { Input } from '../ui/input';

interface FAQSectionProps {
  faqs: FAQ[];
}

export function FAQSection({ faqs }: FAQSectionProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter FAQs based on search
  const filteredFaqs = searchQuery
    ? faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs.filter(f => f.featured);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="min-h-screen flex items-center spacing-section">
      <div className="container w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-primary/5 mb-6">
            <HelpCircle className="h-4 w-4 text-primary" />
            <span className="text-body-small font-medium">FAQ</span>
          </div>
          <h2 className="text-heading-1 font-semibold spacing-content-sm">
            Frequently Asked Questions
          </h2>
          <p className="text-body-large text-muted-foreground mb-8">
            Everything you need to know about our drayage and hauling services.
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12"
            />
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-card border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-semibold text-body pr-8">{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform ${
                        openId === faq.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {openId === faq.id && (
                    <div className="px-6 pb-5 text-body-small text-muted-foreground animate-fade-in-up">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-body text-muted-foreground">
                <p>No questions found matching your search.</p>
              </div>
            )}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <p className="text-body text-muted-foreground mb-4">
            Still have questions? We're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
            >
              Contact Support
            </a>
            <a
              href="tel:+1-555-0123"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
            >
              Call 24/7 Dispatch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
