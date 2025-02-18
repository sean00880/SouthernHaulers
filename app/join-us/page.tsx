"use client"

import { DriverApplicationForm } from "@/components/forms/driver-application-form"

export default function JoinUs() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Join Our Team</h1>
      <p className="text-xl text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
        Start your career with South Georgia's premier transportation partner
      </p>
      <div className="max-w-3xl mx-auto">
        <DriverApplicationForm />
      </div>
    </div>
  )
}
