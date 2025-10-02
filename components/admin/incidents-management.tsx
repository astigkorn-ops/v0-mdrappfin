"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Incident {
  id: string
  title: string
  description: string
  type: "fire" | "flood" | "accident" | "medical" | "other"
  severity: "low" | "medium" | "high" | "critical"
  status: "reported" | "responding" | "resolved" | "closed"
  location: string
  reportedBy: string
  reportedAt: string
  respondedAt?: string
  resolvedAt?: string
  assignedTeam?: string
}

const mockIncidents: Incident[] = [
  {
    id: "1",
    title: "House Fire in Barangay Centro",
    description: "Residential fire reported at Block 5, Lot 12. Fire department dispatched.",
    type: "fire",
    severity: "high",
    status: "responding",
    location: "Barangay Centro, Block 5, Lot 12",
    reportedBy: "Maria Santos",
    reportedAt: "2024-01-15T14:30:00Z",
    respondedAt: "2024-01-15T14:35:00Z",
    assignedTeam: "Emergency Response Team Alpha",
  },
  {
    id: "2",
    title: "Road Accident on National Highway",
    description: "Vehicle collision involving two motorcycles. Minor injuries reported.",
    type: "accident",
    severity: "medium",
    status: "resolved",
    location: "National Highway, KM 15",
    reportedBy: "Pedro Garcia",
    reportedAt: "2024-01-15T10:15:00Z",
    respondedAt: "2024-01-15T10:20:00Z",
    resolvedAt: "2024-01-15T11:30:00Z",
    assignedTeam: "Search and Rescue Team",
  },
]

export default function IncidentsManagement() {
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const filteredIncidents = incidents.filter((incident) => {
    const matchesSearch =
      incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || incident.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case "fire":
        return "bg-red-100 text-red-800"
      case "flood":
        return "bg-blue-100 text-blue-800"
      case "accident":
        return "bg-yellow-100 text-yellow-800"
      case "medical":
        return "bg-green-100 text-green-800"
      case "other":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "reported":
        return "bg-blue-100 text-blue-800"
      case "responding":
        return "bg-yellow-100 text-yellow-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      case "closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-blue-950">Reported Incidents</h1>
          <p className="text-gray-600">Track and manage emergency incidents</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700 text-white">
          <i className="fas fa-plus mr-2"></i>
          Report Incident
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search incidents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="reported">Reported</option>
          <option value="responding">Responding</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredIncidents.map((incident) => (
          <Card key={incident.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg text-blue-950 flex items-center gap-2">
                    <i className="fas fa-exclamation-circle text-red-500"></i>
                    {incident.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{incident.description}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Badge className={getStatusColor(incident.status)}>{incident.status}</Badge>
                  <Badge className={getTypeColor(incident.type)}>{incident.type}</Badge>
                  <Badge className={getSeverityColor(incident.severity)}>{incident.severity}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center mb-1">
                    <i className="fas fa-map-marker-alt mr-2 text-blue-950"></i>
                    <span className="text-sm font-medium text-gray-700">Location</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-6">{incident.location}</p>
                </div>
                <div>
                  <div className="flex items-center mb-1">
                    <i className="fas fa-user mr-2 text-blue-950"></i>
                    <span className="text-sm font-medium text-gray-700">Reported By</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-6">{incident.reportedBy}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="flex items-center mb-1">
                    <i className="fas fa-clock mr-2 text-blue-950"></i>
                    <span className="text-sm font-medium text-gray-700">Reported</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-6">{new Date(incident.reportedAt).toLocaleString()}</p>
                </div>
                {incident.respondedAt && (
                  <div>
                    <div className="flex items-center mb-1">
                      <i className="fas fa-play mr-2 text-blue-950"></i>
                      <span className="text-sm font-medium text-gray-700">Response Time</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-6">{new Date(incident.respondedAt).toLocaleString()}</p>
                  </div>
                )}
                {incident.resolvedAt && (
                  <div>
                    <div className="flex items-center mb-1">
                      <i className="fas fa-check mr-2 text-blue-950"></i>
                      <span className="text-sm font-medium text-gray-700">Resolved</span>
                    </div>
                    <p className="text-sm text-gray-600 ml-6">{new Date(incident.resolvedAt).toLocaleString()}</p>
                  </div>
                )}
              </div>

              {incident.assignedTeam && (
                <div>
                  <div className="flex items-center mb-1">
                    <i className="fas fa-users mr-2 text-blue-950"></i>
                    <span className="text-sm font-medium text-gray-700">Assigned Team</span>
                  </div>
                  <p className="text-sm text-blue-950 font-medium ml-6">{incident.assignedTeam}</p>
                </div>
              )}

              <div className="flex space-x-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <i className="fas fa-edit mr-1"></i>
                  Update
                </Button>
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <i className="fas fa-map mr-1"></i>
                  View on Map
                </Button>
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <i className="fas fa-users mr-1"></i>
                  Assign Team
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredIncidents.length === 0 && (
        <div className="text-center py-12">
          <i className="fas fa-file-medical text-gray-400 text-4xl mb-4"></i>
          <p className="text-gray-500">No incidents found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
