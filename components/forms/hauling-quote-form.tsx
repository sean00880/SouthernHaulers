"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useState } from "react"

export function HaulingQuoteForm() {
  const [date, setDate] = useState<Date>()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div>
        <h2 className="text-2xl font-bold mb-4">Hauling Quote Request</h2>
        <p className="text-muted-foreground mb-6">
          Please provide details about your hauling needs. The more information you can share,
          the more accurate our quote will be.
        </p>
        <div className="space-y-6">
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-bold mb-2">Our Services Include</h3>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Agricultural transport</li>
              <li>Container drayage</li>
              <li>Refrigerated shipping</li>
              <li>Warehouse distribution</li>
              <li>Cross-docking services</li>
            </ul>
          </div>
        </div>
      </div>
      <div>
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
            <Label htmlFor="companyName">Company Name</Label>
            <Input id="companyName" />
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
            <Label>Service Type</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="agricultural">Agricultural Transport</SelectItem>
                <SelectItem value="containers">Container Services</SelectItem>
                <SelectItem value="refrigerated">Refrigerated Transport</SelectItem>
                <SelectItem value="warehouse">Warehouse Distribution</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Frequency</Label>
            <RadioGroup defaultValue="one-time" className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="one-time" id="one-time" />
                <Label htmlFor="one-time">One-time</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="recurring" id="recurring" />
                <Label htmlFor="recurring">Recurring</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label>Preferred Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label htmlFor="origin">Origin Location</Label>
            <Input id="origin" required placeholder="City, State or Address" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="destination">Destination</Label>
            <Input id="destination" required placeholder="City, State or Address" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cargoDetails">Cargo Details</Label>
            <Textarea 
              id="cargoDetails" 
              placeholder="Please describe your cargo including type, weight, dimensions, and any special handling requirements"
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="additionalInfo">Additional Information</Label>
            <Textarea 
              id="additionalInfo" 
              placeholder="Any other details that would help us provide an accurate quote"
            />
          </div>
          <Button type="submit" className="w-full">
            Request Quote
          </Button>
        </form>
      </div>
    </div>
  )
}
