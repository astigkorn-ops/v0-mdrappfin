"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Alert {
  id: string
  title: string
  message: string
  type: "emergency" | "warning" | "info"
  priority: "high" | "medium" | "low"
  status: "active" | "inactive" | "expired"
  createdAt: string
  expiresAt: string
  affectedAreas: string[]
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    title: "Typhoon Warning Signal #2",
    message:
      "Typhoon approaching Pio Duran area. Residents are advised to prepare for strong winds and heavy rainfall.",
    type: "emergency",
    priority: "high",
    status: "active",
    createdAt: "2024-01-15T08:00:00Z",
    expiresAt: "2024-01-16T18:00:00Z",
    affectedAreas: ["Pio Duran", "Surrounding Municipalities"],
  },
  {
    id: "2",
    title: "Flash Flood Advisory",
    message: "Heavy rainfall may cause flash floods in low-lying areas. Exercise caution when traveling.",
    type: "warning",
    priority: "medium",
    status: "active",
    createdAt: "2024-01-15T10:30:00Z",
    expiresAt: "2024-01-15T20:00:00Z",
    affectedAreas: ["Barangay Centro", "Barangay Poblacion"],
  },
]

export default function AlertsManagement() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts)
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)

  const filteredAlerts = alerts.filter(
    (alert) =>
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getTypeColor = (type: string) => {
    switch (type) {
      case "emergency":
        return "bg-red-100 text-red-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "info":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
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
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "expired":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-blue-950">Emergency Alerts</h1>
          <p className="text-gray-600">Manage emergency alerts and notifications</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="bg-red-600 hover:bg-red-700 text-white">
          <i className="fas fa-exclamation-triangle mr-2"></i>
          Create Alert
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search alerts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredAlerts.map((alert) => (
          <Card key={alert.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg text-blue-950 flex items-center gap-2">
                    <i className="fas fa-exclamation-triangle text-red-500"></i>
                    {alert.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-2">{alert.message}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Badge className={getStatusColor(alert.status)}>{alert.status}</Badge>
                  <Badge className={getTypeColor(alert.type)}>{alert.type}</Badge>
                  <Badge className={getPriorityColor(alert.priority)}>{alert.priority} priority</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center mb-1">
                    <i className="fas fa-clock mr-2 text-blue-950"></i>
                    <span className="text-sm font-medium text-gray-700">Created</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-6">{new Date(alert.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <div className="flex items-center mb-1">
                    <i className="fas fa-hourglass-end mr-2 text-blue-950"></i>
                    <span className="text-sm font-medium text-gray-700">Expires</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-6">{new Date(alert.expiresAt).toLocaleString()}</p>
                </div>
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <i className="fas fa-map-marker-alt mr-2 text-blue-950"></i>
                  <span className="text-sm font-medium text-gray-700">Affected Areas</span>
                </div>
                <div className="ml-6 flex flex-wrap gap-2">
                  {alert.affectedAreas.map((area, index) => (
                    <Badge key={index} variant="outline">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <i className="fas fa-edit mr-1"></i>
                  Edit Alert
                </Button>
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <i className="fas fa-broadcast-tower mr-1"></i>
                  Broadcast
                </Button>
                <Button size="sm" variant="outline" className="flex-1 text-red-600 hover:text-red-700 bg-transparent">
                  <i className="fas fa-times mr-1"></i>
                  Deactivate
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="text-center py-12">
          <i className="fas fa-exclamation-triangle text-gray-400 text-4xl mb-4"></i>
          <p className="text-gray-500">No alerts found matching your search.</p>
        </div>
      )}
    </div>
  )
}
