import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function Careers() {
  return (
    <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Driver Opportunities</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
            <p className="text-muted-foreground mb-6">
              We're looking for experienced drivers to join our growing team. We offer competitive pay, comprehensive
              benefits, and modern equipment.
            </p>
            <div className="space-y-6">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-bold mb-2">Requirements</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Valid Class A CDL</li>
                  <li>Clean driving record</li>
                  <li>2+ years of experience</li>
                  <li>DOT medical certification</li>
                </ul>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-bold mb-2">Benefits</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Competitive pay</li>
                  <li>Health insurance</li>
                  <li>401(k) with company match</li>
                  <li>Paid time off</li>
                  <li>Modern equipment</li>
                </ul>
              </div>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Driver Application</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input id="experience" type="number" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Additional Information</Label>
                  <Textarea id="message" />
                </div>
                <Button type="submit" className="w-full">
                  Submit Application
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
  )
}
