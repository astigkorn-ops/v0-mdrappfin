"use client"

import { useState } from "react"
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
import { Phone, Plus, Search, CreditCard as Edit, Trash2, Shield, Hospital, Flame, Car, Building, TriangleAlert as AlertTriangle } from "lucide-react"

interface Hotline {
  id: string
  agency: string
  contactPerson: string
  phoneNumber: string
  alternateNumber?: string
  type: "emergency" | "medical" | "fire" | "police" | "rescue" | "utility" | "government"
  description: string
  availability: string
  isPrimary: boolean
  status: "active" | "inactive" | "maintenance"
  createdBy: string
  createdDate: string
  lastModified: string
}

const mockHotlines: Hotline[] = [
  {
    id: "1",
    agency: "MDRRMO Emergency Response",
    contactPerson: "Juan Dela Cruz",
    phoneNumber: "911",
    alternateNumber: "(052) 234-5678",
    type: "emergency",
    description: "Primary emergency response hotline for all disasters",
    availability: "24/7",
    isPrimary: true,
    status: "active",
    createdBy: "Admin User",
    createdDate: "2024-01-01",
    lastModified: "2024-01-15T10:30:00Z"
  },
  {
    id: "2",
    agency: "Municipal Health Office",
    contactPerson: "Dr. Maria Santos",
    phoneNumber: "(052) 345-6789",
    type: "medical",
    description: "Medical emergencies and health-related concerns",
    availability: "24/7",
    isPrimary: false,
    status: "active",
    createdBy: "Health Coordinator",
    createdDate: "2024-01-01",
    lastModified: "2024-01-10T14:20:00Z"
  },
  {
    id: "3",
    agency: "Bureau of Fire Protection",
    contactPerson: "Fire Chief Pedro Garcia",
    phoneNumber: "116",
    alternateNumber: "(052) 567-8901",
    type: "fire",
    description: "Fire emergencies and rescue operations",
    availability: "24/7",
    isPrimary: true,
    status: "active",
    createdBy: "Fire Department",
    createdDate: "2024-01-01",
    lastModified: "2024-01-08T09:15:00Z"
  }
]

export default function HotlineManagement() {
  const [hotlines, setHotlines] = useState<Hotline[]>(mockHotlines)
  const [selectedHotlines, setSelectedHotlines] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingHotline, setEditingHotline] = useState<Hotline | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  const [formData, setFormData] = useState({
    agency: "",
    contactPerson: "",
    phoneNumber: "",
    alternateNumber: "",
    type: "emergency",
    description: "",
    availability: "24/7",
    isPrimary: false,
    status: "active"
  })

  const filteredHotlines = hotlines.filter(hotline => {
    const matchesSearch = hotline.agency.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hotline.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hotline.phoneNumber.includes(searchTerm)
    const matchesType = typeFilter === "all" || hotline.type === typeFilter
    const matchesStatus = statusFilter === "all" || hotline.status === statusFilter
    
    return matchesSearch && matchesType && matchesStatus
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "emergency": return <Shield className="h-4 w-4 text-red-600" />
      case "medical": return <Hospital className="h-4 w-4 text-green-600" />
      case "fire": return <Flame className="h-4 w-4 text-orange-600" />
      case "police": return <Shield className="h-4 w-4 text-blue-600" />
      case "rescue": return <Car className="h-4 w-4 text-purple-600" />
      case "utility": return <Building className="h-4 w-4 text-gray-600" />
      case "government": return <Building className="h-4 w-4 text-blue-600" />
      default: return <Phone className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800"
      case "inactive": return "bg-gray-100 text-gray-800"
      case "maintenance": return "bg-yellow-100 text-yellow-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const totalPages = Math.ceil(filteredHotlines.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedHotlines = filteredHotlines.slice(startIndex, startIndex + itemsPerPage)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingHotline) {
      // Update existing hotline
      setHotlines(prev => prev.map(hotline => 
        hotline.id === editingHotline.id 
          ? { 
              ...hotline, 
              ...formData,
              lastModified: new Date().toISOString()
            }
          : hotline
      ))
    } else {
      // Create new hotline
      const newHotline: Hotline = {
        id: Date.now().toString(),
        ...formData,
        createdBy: "Current User",
        createdDate: new Date().toISOString().split('T')[0],
        lastModified: new Date().toISOString()
      }
      setHotlines(prev => [newHotline, ...prev])
    }

    resetForm()
    setIsCreateDialogOpen(false)
    setEditingHotline(null)
  }

  const resetForm = () => {
    setFormData({
      agency: "",
      contactPerson: "",
      phoneNumber: "",
      alternateNumber: "",
      type: "emergency",
      description: "",
      availability: "24/7",
      isPrimary: false,
      status: "active"
    })
  }

  const handleEdit = (hotline: Hotline) => {
    setEditingHotline(hotline)
    setFormData({
      agency: hotline.agency,
      contactPerson: hotline.contactPerson,
      phoneNumber: hotline.phoneNumber,
      alternateNumber: hotline.alternateNumber || "",
      type: hotline.type,
      description: hotline.description,
      availability: hotline.availability,
      isPrimary: hotline.isPrimary,
      status: hotline.status
    })
    setIsCreateDialogOpen(true)
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-950">Hotline Numbers Management</h1>
          <p className="text-gray-600">Manage emergency contact numbers and hotlines</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-950 hover:bg-blue-800 text-yellow-500">
              <Plus className="mr-2 h-4 w-4" />
              Add Hotline
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingHotline ? "Edit Hotline" : "Add New Hotline"}</DialogTitle>
              <DialogDescription>
                {editingHotline ? "Update hotline details" : "Add a new emergency contact number"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="agency">Agency/Service *</Label>
                  <Input
                    id="agency"
                    value={formData.agency}
                    onChange={(e) => setFormData({...formData, agency: e.target.value})}
                    placeholder="Enter agency name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input
                    id="contactPerson"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                    placeholder="Enter contact person name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <Input
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                    placeholder="Enter phone number"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alternateNumber">Alternate Number</Label>
                  <Input
                    id="alternateNumber"
                    value={formData.alternateNumber}
                    onChange={(e) => setFormData({...formData, alternateNumber: e.target.value})}
                    placeholder="Enter alternate number"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe the service"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="emergency">Emergency</SelectItem>
                      <SelectItem value="medical">Medical</SelectItem>
                      <SelectItem value="fire">Fire</SelectItem>
                      <SelectItem value="police">Police</SelectItem>
                      <SelectItem value="rescue">Rescue</SelectItem>
                      <SelectItem value="utility">Utility</SelectItem>
                      <SelectItem value="government">Government</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="availability">Availability</Label>
                  <Input
                    id="availability"
                    value={formData.availability}
                    onChange={(e) => setFormData({...formData, availability: e.target.value})}
                    placeholder="e.g., 24/7, 8AM-5PM"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isPrimary"
                  checked={formData.isPrimary}
                  onCheckedChange={(checked) => setFormData({...formData, isPrimary: checked as boolean})}
                />
                <Label htmlFor="isPrimary">Primary hotline for this service type</Label>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => {
                  resetForm()
                  setIsCreateDialogOpen(false)
                  setEditingHotline(null)
                }}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-950 hover:bg-blue-800 text-yellow-500">
                  {editingHotline ? "Update" : "Create"} Hotline
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search hotlines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
                <SelectItem value="medical">Medical</SelectItem>
                <SelectItem value="fire">Fire</SelectItem>
                <SelectItem value="police">Police</SelectItem>
                <SelectItem value="rescue">Rescue</SelectItem>
                <SelectItem value="utility">Utility</SelectItem>
                <SelectItem value="government">Government</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Hotlines Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Emergency Hotlines
          </CardTitle>
          <CardDescription>
            Manage emergency contact numbers and service hotlines
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox />
                  </TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedHotlines.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      <div className="text-gray-500">
                        <Phone className="mx-auto h-12 w-12 mb-4 opacity-50" />
                        <p>No hotlines found</p>
                        <p className="text-sm">Add your first emergency hotline to get started</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedHotlines.map((hotline) => (
                    <TableRow key={hotline.id}>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-start">
                          <div className="mr-3 mt-1">
                            {getTypeIcon(hotline.type)}
                          </div>
                          <div>
                            <div className="font-medium text-blue-950 flex items-center gap-2">
                              {hotline.agency}
                              {hotline.isPrimary && (
                                <Badge variant="outline" className="text-xs">PRIMARY</Badge>
                              )}
                            </div>
                            <div className="text-sm text-gray-600 truncate max-w-xs">{hotline.description}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">{hotline.contactPerson}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-blue-950">{hotline.phoneNumber}</div>
                          {hotline.alternateNumber && (
                            <div className="text-sm text-gray-600">{hotline.alternateNumber}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {getTypeIcon(hotline.type)}
                          <span className="ml-2 capitalize">{hotline.type}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {hotline.availability}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(hotline.status)}>
                          {hotline.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(hotline)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
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
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredHotlines.length)} of {filteredHotlines.length} hotlines
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
