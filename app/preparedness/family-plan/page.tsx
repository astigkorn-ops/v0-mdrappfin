"use client"

import { PreparednessSidebar } from "@/components/preparedness-sidebar"
import { useState } from "react"
import { ChevronDown, ChevronRight, Users, MapPin, Phone, FileText, Printer } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const planSections = [
  {
    id: "contacts",
    title: "Emergency Contacts",
    icon: Phone,
    fields: [
      { name: "primaryContact", label: "Primary Emergency Contact", type: "text" },
      { name: "primaryPhone", label: "Primary Contact Phone", type: "tel" },
      { name: "secondaryContact", label: "Secondary Emergency Contact", type: "text" },
      { name: "secondaryPhone", label: "Secondary Contact Phone", type: "tel" },
      { name: "outOfTownContact", label: "Out-of-Town Contact", type: "text" },
      { name: "outOfTownPhone", label: "Out-of-Town Contact Phone", type: "tel" },
    ],
  },
  {
    id: "meetingPlaces",
    title: "Meeting Places",
    icon: MapPin,
    fields: [
      { name: "homeMeeting", label: "Near Home Meeting Place", type: "text" },
      { name: "homeAddress", label: "Address", type: "text" },
      { name: "neighborhoodMeeting", label: "Neighborhood Meeting Place", type: "text" },
      { name: "neighborhoodAddress", label: "Address", type: "text" },
      { name: "evacuationCenter", label: "Designated Evacuation Center", type: "text" },
      { name: "evacuationAddress", label: "Address", type: "text" },
    ],
  },
  {
    id: "familyInfo",
    title: "Family Information",
    icon: Users,
    fields: [
      { name: "familyMembers", label: "Family Members (Name, Age, Special Needs)", type: "textarea" },
      { name: "medicalInfo", label: "Medical Information & Medications", type: "textarea" },
      { name: "petInfo", label: "Pet Information", type: "textarea" },
    ],
  },
  {
    id: "importantDocs",
    title: "Important Documents",
    icon: FileText,
    fields: [
      { name: "documentLocation", label: "Location of Important Documents", type: "text" },
      { name: "insuranceInfo", label: "Insurance Information", type: "textarea" },
      { name: "bankInfo", label: "Bank Account Information", type: "textarea" },
    ],
  },
]

export default function FamilyPlanPage() {
  const [activeSection, setActiveSection] = useState<string>("contacts")
  const [formData, setFormData] = useState<Record<string, string>>({})

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const printPlan = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <PreparednessSidebar />

          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Family Emergency Plan</h1>
                <Button onClick={printPlan} variant="outline" className="flex items-center gap-2 bg-transparent">
                  <Printer className="h-4 w-4" />
                  Print Plan
                </Button>
              </div>

              <div className="mb-8">
                <p className="text-lg text-gray-600 mb-4">
                  Create a personalized emergency plan for your family. Fill out each section to ensure everyone knows
                  what to do and where to go during an emergency.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                  <p className="text-blue-800 text-sm">
                    <strong>Tip:</strong> Review and update your family emergency plan every six months or when family
                    circumstances change.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {planSections.map((section) => {
                  const Icon = section.icon
                  const isActive = activeSection === section.id

                  return (
                    <Card key={section.id} className="border-2">
                      <CardHeader
                        className="cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => setActiveSection(isActive ? "" : section.id)}
                      >
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Icon className="h-6 w-6 text-mdrrmo-primary" />
                            {section.title}
                          </div>
                          {isActive ? (
                            <ChevronDown className="h-5 w-5 text-gray-500" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-gray-500" />
                          )}
                        </CardTitle>
                      </CardHeader>

                      {isActive && (
                        <CardContent className="pt-0">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {section.fields.map((field) => (
                              <div key={field.name} className={field.type === "textarea" ? "md:col-span-2" : ""}>
                                <Label htmlFor={field.name} className="text-sm font-medium text-gray-700 mb-2 block">
                                  {field.label}
                                </Label>
                                {field.type === "textarea" ? (
                                  <Textarea
                                    id={field.name}
                                    value={formData[field.name] || ""}
                                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                                    className="w-full"
                                    rows={3}
                                  />
                                ) : (
                                  <Input
                                    id={field.name}
                                    type={field.type}
                                    value={formData[field.name] || ""}
                                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                                    className="w-full"
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  )
                })}
              </div>

              <div className="mt-8 bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-4">Next Steps</h3>
                <div className="space-y-2 text-green-700">
                  <p className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Share this plan with all family members and ensure everyone understands their role
                  </p>
                  <p className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Practice your emergency plan with regular family drills
                  </p>
                  <p className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Keep copies of this plan in your emergency kit, car, and workplace
                  </p>
                  <p className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Review and update your plan every six months
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
