import { Suspense } from "react"
import FormsContent from "./forms-content"

export default function FormsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Request Forms</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <FormsContent />
      </Suspense>
    </div>
  )
}
