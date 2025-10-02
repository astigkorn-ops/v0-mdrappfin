"use client"

import { PreparednessSidebar } from "@/components/preparedness-sidebar"
import { useState } from "react"
import { FileText, Video, ImageIcon, Download, Search, Filter } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const materials = [
  {
    id: 1,
    title: "Earthquake Preparedness Guide",
    description: "Comprehensive guide on earthquake safety and preparedness measures",
    type: "PDF",
    topic: "Earthquake",
    size: "2.5 MB",
    downloads: 1250,
    icon: FileText,
  },
  {
    id: 2,
    title: "Typhoon Safety Video",
    description: "Educational video on typhoon preparation and safety protocols",
    type: "Video",
    topic: "Typhoon",
    size: "45 MB",
    downloads: 890,
    icon: Video,
  },
  {
    id: 3,
    title: "Fire Safety Poster",
    description: "Infographic poster showing fire prevention and evacuation procedures",
    type: "Image",
    topic: "Fire",
    size: "1.2 MB",
    downloads: 2100,
    icon: ImageIcon,
  },
  {
    id: 4,
    title: "Flood Response Manual",
    description: "Step-by-step manual for flood preparedness and response",
    type: "PDF",
    topic: "Flood",
    size: "3.8 MB",
    downloads: 1680,
    icon: FileText,
  },
  {
    id: 5,
    title: "Family Emergency Plan Template",
    description: "Printable template for creating family emergency plans",
    type: "PDF",
    topic: "General",
    size: "800 KB",
    downloads: 3200,
    icon: FileText,
  },
  {
    id: 6,
    title: "Landslide Awareness Brochure",
    description: "Educational brochure about landslide risks and prevention",
    type: "PDF",
    topic: "Landslide",
    size: "1.5 MB",
    downloads: 750,
    icon: FileText,
  },
  {
    id: 7,
    title: "Emergency Kit Checklist",
    description: "Visual checklist for emergency preparedness supplies",
    type: "Image",
    topic: "General",
    size: "900 KB",
    downloads: 2800,
    icon: ImageIcon,
  },
  {
    id: 8,
    title: "First Aid Training Video",
    description: "Basic first aid techniques for emergency situations",
    type: "Video",
    topic: "Medical",
    size: "38 MB",
    downloads: 1450,
    icon: Video,
  },
]

const topics = ["All", "Earthquake", "Typhoon", "Fire", "Flood", "Landslide", "General", "Medical"]
const types = ["All", "PDF", "Video", "Image"]

export default function IECMaterialsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTopic, setSelectedTopic] = useState("All")
  const [selectedType, setSelectedType] = useState("All")

  const filteredMaterials = materials.filter((material) => {
    const matchesSearch =
      material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTopic = selectedTopic === "All" || material.topic === selectedTopic
    const matchesType = selectedType === "All" || material.type === selectedType

    return matchesSearch && matchesTopic && matchesType
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case "PDF":
        return "bg-red-100 text-red-800"
      case "Video":
        return "bg-blue-100 text-blue-800"
      case "Image":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTopicColor = (topic: string) => {
    switch (topic) {
      case "Earthquake":
        return "bg-orange-100 text-orange-800"
      case "Typhoon":
        return "bg-blue-100 text-blue-800"
      case "Fire":
        return "bg-red-100 text-red-800"
      case "Flood":
        return "bg-cyan-100 text-cyan-800"
      case "Landslide":
        return "bg-yellow-100 text-yellow-800"
      case "Medical":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <PreparednessSidebar />

          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">IEC Materials</h1>

              <div className="mb-8">
                <p className="text-lg text-gray-600 mb-6">
                  Download educational materials, guides, and resources to help you and your community prepare for
                  disasters and emergencies.
                </p>

                {/* Search and Filter Controls */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search materials..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Filter by topic" />
                    </SelectTrigger>
                    <SelectContent>
                      {topics.map((topic) => (
                        <SelectItem key={topic} value={topic}>
                          {topic}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      {types.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="text-sm text-gray-600">
                  Showing {filteredMaterials.length} of {materials.length} materials
                </div>
              </div>

              {/* Materials Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMaterials.map((material) => {
                  const Icon = material.icon
                  return (
                    <Card key={material.id} className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between mb-3">
                          <Icon className="h-8 w-8 text-mdrrmo-primary" />
                          <div className="flex gap-2">
                            <Badge className={getTypeColor(material.type)}>{material.type}</Badge>
                            <Badge className={getTopicColor(material.topic)}>{material.topic}</Badge>
                          </div>
                        </div>
                        <CardTitle className="text-lg leading-tight">{material.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-gray-600 mb-4 text-pretty">{material.description}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                          <span>Size: {material.size}</span>
                          <span>{material.downloads.toLocaleString()} downloads</span>
                        </div>
                        <Button className="w-full" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {filteredMaterials.length === 0 && (
                <div className="text-center py-12">
                  <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No materials found</h3>
                  <p className="text-gray-500">Try adjusting your search terms or filters</p>
                </div>
              )}

              <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Need More Information?</h3>
                <p className="text-blue-700 mb-4">
                  Can't find what you're looking for? Contact our office for additional materials or to request specific
                  educational resources for your community or organization.
                </p>
                <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100 bg-transparent">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
