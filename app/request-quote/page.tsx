"use client"

import { GeneralQuoteForm } from "@/components/forms/general-quote-form"

export default function RequestQuote() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Request a Quote</h1>
      <p className="text-xl text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
        Get started with Southern Haulers today
      </p>
      <div className="max-w-3xl mx-auto">
        <GeneralQuoteForm />
      </div>
    </div>
  )
}
