"use client"

import { PreparednessSidebar } from "@/components/preparedness-sidebar"
import { useState } from "react"
import { Check, Printer, RotateCcw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"

const goBagCategories = [
  {
    id: "water-food",
    title: "Water & Food",
    items: [
      "Water (1 gallon per person per day for 3 days)",
      "Non-perishable food (3-day supply)",
      "Manual can opener",
      "Paper plates, cups, and utensils",
      "Water purification tablets",
      "Energy bars or dried fruits",
    ],
  },
  {
    id: "first-aid",
    title: "First Aid & Medical",
    items: [
      "First aid kit",
      "Prescription medications (7-day supply)",
      "Over-the-counter medications",
      "Medical supplies (bandages, antiseptic)",
      "Thermometer",
      "Medical alert tags or bracelets",
    ],
  },
  {
    id: "tools-supplies",
    title: "Tools & Supplies",
    items: [
      "Flashlight with extra batteries",
      "Battery-powered or hand crank radio",
      "Cell phone chargers (portable battery pack)",
      "Multi-tool or Swiss Army knife",
      "Duct tape and plastic sheeting",
      "Matches in waterproof container",
    ],
  },
  {
    id: "clothing-shelter",
    title: "Clothing & Shelter",
    items: [
      "Change of clothes for each person",
      "Sturdy shoes for each person",
      "Rain gear and warm clothing",
      "Blankets or sleeping bags",
      "Emergency shelter (tent or tarp)",
      "Work gloves",
    ],
  },
  {
    id: "documents",
    title: "Important Documents",
    items: [
      "Copies of identification documents",
      "Insurance policies and bank records",
      "Emergency contact information",
      "Medical information and prescriptions",
      "Cash and credit cards",
      "Maps of local area",
    ],
  },
  {
    id: "personal-items",
    title: "Personal & Hygiene Items",
    items: [
      "Personal hygiene items",
      "Feminine supplies",
      "Diapers and baby supplies (if needed)",
      "Pet supplies (if applicable)",
      "Entertainment items for children",
      "Whistle for signaling help",
    ],
  },
]

export default function GoBagPage() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())

  const totalItems = goBagCategories.reduce((sum, category) => sum + category.items.length, 0)
  const checkedCount = checkedItems.size
  const progress = (checkedCount / totalItems) * 100

  const toggleItem = (categoryId: string, itemIndex: number) => {
    const itemKey = `${categoryId}-${itemIndex}`
    const newCheckedItems = new Set(checkedItems)

    if (newCheckedItems.has(itemKey)) {
      newCheckedItems.delete(itemKey)
    } else {
      newCheckedItems.add(itemKey)
    }

    setCheckedItems(newCheckedItems)
  }

  const resetChecklist = () => {
    setCheckedItems(new Set())
  }

  const printChecklist = () => {
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
                <h1 className="text-3xl font-bold text-gray-900">Emergency Go-Bag Checklist</h1>
                <div className="flex gap-2">
                  <Button onClick={resetChecklist} variant="outline" size="sm">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                  <Button onClick={printChecklist} variant="outline" size="sm">
                    <Printer className="h-4 w-4 mr-2" />
                    Print
                  </Button>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-lg text-gray-600">
                    Your emergency go-bag should contain supplies to last at least 72 hours.
                  </p>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-mdrrmo-primary">
                      {checkedCount}/{totalItems}
                    </p>
                    <p className="text-sm text-gray-600">items completed</p>
                  </div>
                </div>

                <Progress value={progress} className="h-3 mb-4" />

                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                  <p className="text-yellow-800 text-sm">
                    <strong>Remember:</strong> Check and rotate perishable items every 6 months. Store your go-bag in an
                    easily accessible location.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {goBagCategories.map((category) => (
                  <Card key={category.id} className="h-fit">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center justify-between">
                        <span>{category.title}</span>
                        <span className="text-sm font-normal text-gray-500">
                          {category.items.filter((_, index) => checkedItems.has(`${category.id}-${index}`)).length}/
                          {category.items.length}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        {category.items.map((item, index) => {
                          const itemKey = `${category.id}-${index}`
                          const isChecked = checkedItems.has(itemKey)

                          return (
                            <div key={index} className="flex items-start space-x-3">
                              <Checkbox
                                id={itemKey}
                                checked={isChecked}
                                onCheckedChange={() => toggleItem(category.id, index)}
                                className="mt-0.5"
                              />
                              <label
                                htmlFor={itemKey}
                                className={`text-sm cursor-pointer flex-1 ${
                                  isChecked ? "line-through text-gray-500" : "text-gray-700"
                                }`}
                              >
                                {item}
                              </label>
                              {isChecked && <Check className="h-4 w-4 text-green-600 mt-0.5" />}
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8 bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-4">Go-Bag Tips</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-700">
                  <div>
                    <h4 className="font-semibold mb-2">Storage</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Use a waterproof container or bag</li>
                      <li>• Keep it in an easily accessible location</li>
                      <li>• Consider having go-bags for home, work, and car</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Maintenance</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Check expiration dates every 6 months</li>
                      <li>• Test batteries and replace as needed</li>
                      <li>• Update documents and contact information</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
