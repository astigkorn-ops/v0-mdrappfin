"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  Phone,
  User,
  FileText,
  Filter
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface IncidentReport {
  id: string
  reporter_name: string
  contact_number: string
  barangay: string
  specific_location: string
  incident_type: string
  incident_description: string
  urgency_level: "LOW" | "MEDIUM" | "HIGH"
  status: "pending" | "in-progress" | "resolved" | "closed"
  created_at: string
  updated_at: string
}

const mockIncidents: IncidentReport[] = [
  {
    id: "1",
    reporter_name: "Juan Dela Cruz",
    contact_number: "(052) 123-4567",
    barangay: "Barangay 1",
    specific_location: "Near Municipal Hall",
    incident_type: "Fire",
    incident_description: "House fire reported near the municipal hall. Visible flames and smoke.",
    urgency_level: "HIGH",
    status: "in-progress",
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-15T11:00:00Z"
  },
  {
    id: "2",
    reporter_name: "Maria Santos",
    contact_number: "(052) 234-5678",
    barangay: "Barangay 2",
    specific_location: "Main Road",
    incident_type: "Flood",
    incident_description: "Minor flooding on main road due to heavy rains.",
    urgency_level: "MEDIUM",
    status: "pending",
    created_at: "2024-01-15T09:15:00Z",
    updated_at: "2024-01-15T09:15:00Z"
  },
  {
    id: "3",
    reporter_name: "Pedro Garcia",
    contact_number: "(052) 345-6789",
    barangay: "Agol",
    specific_location: "Bridge Area",
    incident_type: "Landslide",
    incident_description: "Small landslide blocking access to bridge area.",
    urgency_level: "HIGH",
    status: "resolved",
    created_at: "2024-01-14T15:45:00Z",
    updated_at: "2024-01-14T17:30:00Z"
  }
]

export default function IncidentReportsManagement() {
  const [incidents, setIncidents] = useState<IncidentReport[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterType, setFilterType] = useState("all")
  const [showAddForm, setShowAddForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedIncident, setSelectedIncident] = useState<IncidentReport | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<IncidentReport | null>(null)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    reporter_name: "",
    contact_number: "",
    barangay: "",
    specific_location: "",
    incident_type: "Fire",
    incident_description: "",
    urgency_level: "HIGH" as "LOW" | "MEDIUM" | "HIGH",
    status: "pending" as "pending" | "in-progress" | "resolved" | "closed"
  })

  // Initialize with mock data
  useEffect(() => {
    setIncidents(mockIncidents)
    setLoading(false)
  }, [])

  const filteredIncidents = incidents.filter(
    (incident) =>
      (incident.reporter_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.incident_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.barangay.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.specific_location.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === "all" || incident.status === filterStatus) &&
      (filterType === "all" || incident.incident_type === filterType)
  )

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleAddIncident = () => {
    setSelectedIncident(null)
    setFormData({
      reporter_name: "",
      contact_number: "",
      barangay: "",
      specific_location: "",
      incident_type: "Fire",
      incident_description: "",
      urgency_level: "HIGH",
      status: "pending"
    })
    setShowAddForm(true)
  }

  const handleEditIncident = (incident: IncidentReport) => {
    setSelectedIncident(incident)
    setFormData({
      reporter_name: incident.reporter_name,
      contact_number: incident.contact_number,
      barangay: incident.barangay,
      specific_location: incident.specific_location,
      incident_type: incident.incident_type,
      incident_description: incident.incident_description,
      urgency_level: incident.urgency_level,
      status: incident.status
    })
    setShowEditForm(true)
  }

  const handleDeleteIncident = (incident: IncidentReport) => {
    setDeleteTarget(incident)
    setShowDeleteDialog(true)
  }

  const confirmDelete = () => {
    if (deleteTarget) {
      setIncidents(incidents.filter(i => i.id !== deleteTarget.id))
      toast({
        title: "Success",
        description: "Incident report deleted successfully",
      })
      setShowDeleteDialog(false)
      setDeleteTarget(null)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.reporter_name || !formData.contact_number || !formData.incident_description) {
      toast({
        title: "Validation Error",
        description: "Reporter name, contact number, and description are required",
        variant: "destructive",
      })
      return
    }

    const now = new Date().toISOString()
    
    if (selectedIncident) {
      // Update existing incident
      setIncidents(incidents.map(i => 
        i.id === selectedIncident.id 
          ? { ...i, ...formData, updated_at: now }
          : i
      ))
      toast({
        title: "Success",
        description: "Incident report updated successfully",
      })
      setShowEditForm(false)
    } else {
      // Add new incident
      const newIncident: IncidentReport = {
        id: Date.now().toString(),
        ...formData,
        created_at: now,
        updated_at: now
      }
      setIncidents([newIncident, ...incidents])
      toast({
        title: "Success",
        description: "New incident report added successfully",
      })
      setShowAddForm(false)
    }
    
    setFormData({
      reporter_name: "",
      contact_number: "",
      barangay: "",
      specific_location: "",
      incident_type: "Fire",
      incident_description: "",
      urgency_level: "HIGH",
      status: "pending"
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "in-progress": return "bg-blue-100 text-blue-800"
      case "resolved": return "bg-green-100 text-green-800"
      case "closed": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "LOW": return "bg-green-100 text-green-800"
      case "MEDIUM": return "bg-yellow-100 text-yellow-800"
      case "HIGH": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-950 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading incident reports...</p>
          </div>
        </div>
      </div>
    )
  }

  const IncidentForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="reporter_name">Reporter Name *</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="reporter_name"
              value={formData.reporter_name}
              onChange={(e) => handleInputChange("reporter_name", e.target.value)}
              placeholder="Enter reporter name"
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact_number">Contact Number *</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="contact_number"
              value={formData.contact_number}
              onChange={(e) => handleInputChange("contact_number", e.target.value)}
              placeholder="Enter contact number"
              className="pl-10"
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="barangay">Barangay</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Select value={formData.barangay} onValueChange={(value) => handleInputChange("barangay", value)}>
            <SelectTrigger className="pl-10">
              <SelectValue placeholder="Select Barangay" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Barangay 1">Barangay 1</SelectItem>
              <SelectItem value="Barangay 2">Barangay 2</SelectItem>
              <SelectItem value="Agol">Agol</SelectItem>
              <SelectItem value="Alabangpuro">Alabangpuro</SelectItem>
              <SelectItem value="Basicao Coastal">Basicao Coastal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="specific_location">Specific Location</Label>
        <Input
          id="specific_location"
          value={formData.specific_location}
          onChange={(e) => handleInputChange("specific_location", e.target.value)}
          placeholder="Enter specific location or landmark"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="incident_type">Incident Type</Label>
          <Select value={formData.incident_type} onValueChange={(value) => handleInputChange("incident_type", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Incident Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Fire">Fire</SelectItem>
              <SelectItem value="Flood">Flood</SelectItem>
              <SelectItem value="Landslide">Landslide</SelectItem>
              <SelectItem value="Vehicular Accident">Vehicular Accident</SelectItem>
              <SelectItem value="Medical Emergency">Medical Emergency</SelectItem>
              <SelectItem value="Others">Others</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="urgency_level">Urgency Level</Label>
          <Select value={formData.urgency_level} onValueChange={(value) => handleInputChange("urgency_level", value as "LOW" | "MEDIUM" | "HIGH")}>
            <SelectTrigger>
              <SelectValue placeholder="Select Urgency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="LOW">LOW</SelectItem>
              <SelectItem value="MEDIUM">MEDIUM</SelectItem>
              <SelectItem value="HIGH">HIGH</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value as "pending" | "in-progress" | "resolved" | "closed")}>
          <SelectTrigger>
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="incident_description">Incident Description *</Label>
        <div className="relative">
          <FileText className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
          <Textarea
            id="incident_description"
            value={formData.incident_description}
            onChange={(e) => handleInputChange("incident_description", e.target.value)}
            placeholder="Provide detailed description of the incident"
            className="pl-10"
            rows={4}
            required
          />
        </div>
      </div>

      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setShowAddForm(false)
            setShowEditForm(false)
          }}
        >
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-950 hover:bg-blue-800 text-yellow-500">
          {selectedIncident ? "Update Report" : "Add Report"}
        </Button>
      </DialogFooter>
    </form>
  )

  return (
    <div className="min-h-screen bg-white font-sans p-4 md:p-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-blue-950 flex items-center gap-2">
                <AlertTriangle className="text-yellow-500" />
                Incident Reports Management
              </h1>
              <p className="text-gray-600">Manage and track emergency incident reports</p>
            </div>
            <Button onClick={handleAddIncident} className="bg-blue-950 hover:bg-blue-800 text-yellow-500">
              <Plus className="mr-2 h-4 w-4" />
              Add New Report
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Fire">Fire</SelectItem>
                  <SelectItem value="Flood">Flood</SelectItem>
                  <SelectItem value="Landslide">Landslide</SelectItem>
                  <SelectItem value="Vehicular Accident">Vehicular Accident</SelectItem>
                  <SelectItem value="Medical Emergency">Medical Emergency</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Incident Reports Grid */}
        {filteredIncidents.length === 0 ? (
          <div className="text-center py-12">
            <AlertTriangle className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Incident Reports Found</h3>
            <p className="text-gray-500 mb-6">Get started by adding a new incident report.</p>
            <Button 
              onClick={handleAddIncident}
              className="bg-blue-950 hover:bg-blue-800 text-yellow-500"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add First Report
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredIncidents.map((incident) => (
              <Card key={incident.id} className="hover:shadow-lg transition-shadow border border-gray-200">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg text-blue-950 flex items-center gap-2">
                        <AlertTriangle className="text-yellow-500 h-5 w-5" />
                        {incident.incident_type}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        Reported by {incident.reporter_name}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge className={getUrgencyColor(incident.urgency_level)}>
                        {incident.urgency_level} Urgency
                      </Badge>
                      <Badge className={getStatusColor(incident.status)}>
                        {incident.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-600">
                      <Phone className="mr-2 h-4 w-4" />
                      <span>{incident.contact_number}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="mr-2 h-4 w-4" />
                      <span>{incident.barangay} - {incident.specific_location || "N/A"}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="mr-2 h-4 w-4" />
                      <span>{formatDate(incident.created_at)}</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm text-gray-700">{incident.incident_description}</p>
                  </div>
                  
                  <div className="flex space-x-2 pt-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 bg-transparent hover:bg-blue-50 border-blue-950 text-blue-950"
                      onClick={() => handleEditIncident(incident)}
                    >
                      <Edit className="mr-1 h-4 w-4" />
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent border-red-600"
                      onClick={() => handleDeleteIncident(incident)}
                    >
                      <Trash2 className="mr-1 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Add Incident Dialog */}
        <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Incident Report</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new incident report.
              </DialogDescription>
            </DialogHeader>
            <IncidentForm />
          </DialogContent>
        </Dialog>

        {/* Edit Incident Dialog */}
        <Dialog open={showEditForm} onOpenChange={setShowEditForm}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Incident Report</DialogTitle>
              <DialogDescription>
                Update the incident report details below.
              </DialogDescription>
            </DialogHeader>
            <IncidentForm />
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Incident Report</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this incident report? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
