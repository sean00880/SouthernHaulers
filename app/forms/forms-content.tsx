"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { GeneralQuoteForm } from "@/components/forms/general-quote-form"
import { DriverApplicationForm } from "@/components/forms/driver-application-form"
import { HaulingQuoteForm } from "@/components/forms/hauling-quote-form"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect } from "react"

export default function FormsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const tab = searchParams.get("tab") || "quote"

  // Update URL when tab changes
  const handleTabChange = (value: string) => {
    router.push(`/forms?tab=${value}`)
  }

  // Set initial tab based on URL
  useEffect(() => {
    if (!searchParams.get("tab")) {
      router.push("/forms?tab=quote")
    }
  }, [router, searchParams])

  return (
    <Card className="p-6">
      <Tabs value={tab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="quote">Quote Request</TabsTrigger>
          <TabsTrigger value="driver">Driver Application</TabsTrigger>
          <TabsTrigger value="hauling">Hauling Quote</TabsTrigger>
        </TabsList>
        <TabsContent value="quote">
          <GeneralQuoteForm />
        </TabsContent>
        <TabsContent value="driver">
          <DriverApplicationForm />
        </TabsContent>
        <TabsContent value="hauling">
          <HaulingQuoteForm />
        </TabsContent>
      </Tabs>
    </Card>
  )
}
