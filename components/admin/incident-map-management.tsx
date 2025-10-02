"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin, Plus, Search, CreditCard as Edit, Trash2, Eye, Filter, MoveHorizontal as MoreHorizontal, TriangleAlert as AlertTriangle } from "lucide-react"

interface Incident {
  id: string
  title: string
  description: string
  location: string
  latitude: number
  longitude: number
  severity: "low" | "medium" | "high" | "critical"
  status: "reported" | "investigating" | "resolved" | "closed"
  reportedDate: string
  createdBy: string
  lastModified: string
  modifiedBy: string
}

const mockIncidents: Incident[] = [
  {
    id: "1",
    title: "Flood in Barangay Centro",
    description: "Heavy flooding reported in residential area",
    location: "Barangay Centro, Block 5",
    latitude: 13.0293,
    longitude: 123.445,
    severity: "high",
    status: "investigating",
    reportedDate: "2024-01-15",
    createdBy: "Admin User",
    lastModified: "2024-01-15T10:30:00Z",
    modifiedBy: "Admin User"
  },
  {
    id: "2", 
    title: "Road Accident on Highway",
    description: "Vehicle collision blocking traffic",
    location: "National Highway KM 15",
    latitude: 13.0350,
    longitude: 123.450,
    severity: "medium",
    status: "resolved",
    reportedDate: "2024-01-14",
    createdBy: "Field Officer",
    lastModified: "2024-01-14T16:45:00Z",
    modifiedBy: "Response Team"
  }
]

export default function IncidentMapManagement() {
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents)
  const [selectedIncidents, setSelectedIncidents] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingIncident, setEditingIncident] = useState<Incident | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    latitude: "",
    longitude: "",
    severity: "medium",
    status: "reported"
  })

  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || incident.status === statusFilter
    const matchesSeverity = severityFilter === "all" || incident.severity === severityFilter
    
    return matchesSearch && matchesStatus && matchesSeverity
  })

  const totalPages = Math.ceil(filteredIncidents.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedIncidents = filteredIncidents.slice(startIndex, startIndex + itemsPerPage)

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIncidents(paginatedIncidents.map(incident => incident.id))
    } else {
      setSelectedIncidents([])
    }
  }

  const handleSelectIncident = (incidentId: string, checked: boolean) => {
    if (checked) {
      setSelectedIncidents(prev => [...prev, incidentId])
    } else {
      setSelectedIncidents(prev => prev.filter(id => id !== incidentId))
    }
  }

  const handleBulkAction = (action: string) => {
    console.log(`Bulk ${action} for incidents:`, selectedIncidents)
    // Implement bulk actions
    setSelectedIncidents([])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingIncident) {
      // Update existing incident
      setIncidents(prev => prev.map(incident => 
        incident.id === editingIncident.id 
          ? { 
              ...incident, 
              ...formData,
              latitude: parseFloat(formData.latitude),
              longitude: parseFloat(formData.longitude),
              lastModified: new Date().toISOString(),
              modifiedBy: "Current User"
            }
          : incident
      ))
    } else {
      // Create new incident
      const newIncident: Incident = {
        id: Date.now().toString(),
        ...formData,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        reportedDate: new Date().toISOString().split('T')[0],
        createdBy: "Current User",
        lastModified: new Date().toISOString(),
        modifiedBy: "Current User"
      }
      setIncidents(prev => [newIncident, ...prev])
    }

    resetForm()
    setIsCreateDialogOpen(false)
    setEditingIncident(null)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      location: "",
      latitude: "",
      longitude: "",
      severity: "medium",
      status: "reported"
    })
  }

  const handleEdit = (incident: Incident) => {
    setEditingIncident(incident)
    setFormData({
      title: incident.title,
      description: incident.description,
      location: incident.location,
      latitude: incident.latitude.toString(),
      longitude: incident.longitude.toString(),
      severity: incident.severity,
      status: incident.status
    })
    setIsCreateDialogOpen(true)
  }

  const handleDelete = (incidentId: string) => {
    setIncidents(prev => prev.filter(incident => incident.id !== incidentId))
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-100 text-red-800"
      case "high": return "bg-orange-100 text-orange-800"
      case "medium": return "bg-yellow-100 text-yellow-800"
      case "low": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "reported": return "bg-blue-100 text-blue-800"
      case "investigating": return "bg-yellow-100 text-yellow-800"
      case "resolved": return "bg-green-100 text-green-800"
      case "closed": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-950">Incident Map Management</h1>
          <p className="text-gray-600">Manage incidents with location mapping and tracking</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-950 hover:bg-blue-800 text-yellow-500">
              <Plus className="mr-2 h-4 w-4" />
              Add Incident
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingIncident ? "Edit Incident" : "Add New Incident"}</DialogTitle>
              <DialogDescription>
                {editingIncident ? "Update incident details" : "Create a new incident report with location mapping"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Enter incident title"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="Enter location"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe the incident"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input
                    id="latitude"
                    type="number"
                    step="any"
                    value={formData.latitude}
                    onChange={(e) => setFormData({...formData, latitude: e.target.value})}
                    placeholder="13.0293"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input
                    id="longitude"
                    type="number"
                    step="any"
                    value={formData.longitude}
                    onChange={(e) => setFormData({...formData, longitude: e.target.value})}
                    placeholder="123.445"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="severity">Severity</Label>
                  <Select value={formData.severity} onValueChange={(value) => setFormData({...formData, severity: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="reported">Reported</SelectItem>
                      <SelectItem value="investigating">Investigating</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => {
                  resetForm()
                  setIsCreateDialogOpen(false)
                  setEditingIncident(null)
                }}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-950 hover:bg-blue-800 text-yellow-500">
                  {editingIncident ? "Update" : "Create"} Incident
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search incidents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="reported">Reported</SelectItem>
                <SelectItem value="investigating">Investigating</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedIncidents.length > 0 && (
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {selectedIncidents.length} incident(s) selected
              </span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handleBulkAction("archive")}>
                  Archive Selected
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction("resolve")}>
                  Mark as Resolved
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleBulkAction("delete")}>
                  Delete Selected
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Incidents Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Incident Reports
          </CardTitle>
          <CardDescription>
            Manage and track all incident reports with location mapping
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedIncidents.length === paginatedIncidents.length && paginatedIncidents.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Incident</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedIncidents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="text-gray-500">
                        <AlertTriangle className="mx-auto h-12 w-12 mb-4 opacity-50" />
                        <p>No incidents found</p>
                        <p className="text-sm">Create your first incident report to get started</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedIncidents.map((incident) => (
                    <TableRow key={incident.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedIncidents.includes(incident.id)}
                          onCheckedChange={(checked) => handleSelectIncident(incident.id, checked as boolean)}
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-blue-950">{incident.title}</div>
                          <div className="text-sm text-gray-600 truncate max-w-xs">{incident.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="mr-1 h-3 w-3" />
                          {incident.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getSeverityColor(incident.severity)}>
                          {incident.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(incident.status)}>
                          {incident.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {new Date(incident.reportedDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(incident)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(incident.id)}>
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredIncidents.length)} of {filteredIncidents.length} incidents
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
