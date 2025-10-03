"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  User, 
  Mail, 
  Phone, 
  Building, 
  Plus, 
  Search, 
  Edit, 
  Trash2,
  MapPin,
  Shield
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface Personnel {
  id: string
  name: string
  position: string
  department: string
  email: string
  phone: string
  status: "active" | "inactive"
  level: 'leadership' | 'management' | 'core' | 'emergency'
  image: string
}

export default function PersonnelManagement() {
  const [personnel, setPersonnel] = useState<Personnel[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterLevel, setFilterLevel] = useState("all")
  const [showAddForm, setShowAddForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedPersonnel, setSelectedPersonnel] = useState<Personnel | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Personnel | null>(null)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    position: "",
    department: "",
    email: "",
    phone: "",
    status: "active" as "active" | "inactive",
    level: "core" as 'leadership' | 'management' | 'core' | 'emergency',
    image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp"
  })

  // Initialize with sample data
  useEffect(() => {
    const samplePersonnel: Personnel[] = [
      {
        id: "1",
        name: "HON. EVANGELINE C. ARANDIA",
        position: "Municipal Mayor",
        department: "Local Government",
        email: "mayor.arandia@pioduran.gov.ph",
        phone: "(052) 234-5678",
        status: "active",
        level: "leadership",
        image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp"
      },
      {
        id: "2",
        name: "NOEL F. ORDONA",
        position: "MDRRMO Head",
        department: "Disaster Management",
        email: "mdrrmo.head@pioduran.gov.ph",
        phone: "(052) 234-5679",
        status: "active",
        level: "management",
        image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp"
      },
      {
        id: "3",
        name: "JUAN DELA CRUZ",
        position: "Administration and Training",
        department: "MDRRMO",
        email: "admin.training@pioduran.gov.ph",
        phone: "(052) 234-5680",
        status: "active",
        level: "core",
        image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp"
      },
      {
        id: "4",
        name: "MARIA SANTOS",
        position: "Research and Planning",
        department: "MDRRMO",
        email: "research.planning@pioduran.gov.ph",
        phone: "(052) 234-5681",
        status: "active",
        level: "core",
        image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp"
      },
      {
        id: "5",
        name: "CARLOS REYES",
        position: "RESCUE OPERATOR",
        department: "Emergency Response",
        email: "rescue@pioduran.gov.ph",
        phone: "(052) 234-5682",
        status: "active",
        level: "emergency",
        image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp"
      }
    ]
    setPersonnel(samplePersonnel)
    setLoading(false)
  }, [])

  const filteredPersonnel = personnel.filter(
    (person) =>
      (person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.department.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterLevel === "all" || person.level === filterLevel)
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAddPersonnel = () => {
    setSelectedPersonnel(null)
    setFormData({
      name: "",
      position: "",
      department: "",
      email: "",
      phone: "",
      status: "active",
      level: "core",
      image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp"
    })
    setShowAddForm(true)
  }

  const handleEditPersonnel = (person: Personnel) => {
    setSelectedPersonnel(person)
    setFormData({
      name: person.name,
      position: person.position,
      department: person.department,
      email: person.email,
      phone: person.phone,
      status: person.status,
      level: person.level,
      image: person.image
    })
    setShowEditForm(true)
  }

  const handleDeletePersonnel = (person: Personnel) => {
    setDeleteTarget(person)
    setShowDeleteDialog(true)
  }

  const confirmDelete = () => {
    if (deleteTarget) {
      setPersonnel(personnel.filter(p => p.id !== deleteTarget.id))
      toast({
        title: "Success",
        description: "Personnel deleted successfully",
      })
      setShowDeleteDialog(false)
      setDeleteTarget(null)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.position || !formData.email) {
      toast({
        title: "Validation Error",
        description: "Name, Position, and Email are required fields",
        variant: "destructive",
      })
      return
    }

    if (selectedPersonnel) {
      // Update existing personnel
      setPersonnel(personnel.map(p => 
        p.id === selectedPersonnel.id 
          ? { ...p, ...formData }
          : p
      ))
      toast({
        title: "Success",
        description: "Personnel updated successfully",
      })
      setShowEditForm(false)
    } else {
      // Add new personnel
      const newPersonnel: Personnel = {
        id: Date.now().toString(),
        ...formData,
      }
      setPersonnel([...personnel, newPersonnel])
      toast({
        title: "Success",
        description: "New personnel added successfully",
      })
      setShowAddForm(false)
    }
    
    setFormData({
      name: "",
      position: "",
      department: "",
      email: "",
      phone: "",
      status: "active",
      level: "core",
      image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp"
    })
  }

  const getLevelLabel = (level: string) => {
    switch (level) {
      case "leadership": return "Leadership"
      case "management": return "Management"
      case "core": return "Core Staff"
      case "emergency": return "Emergency Response"
      default: return level
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "leadership": return "bg-blue-950 text-yellow-500"
      case "management": return "bg-yellow-500 text-blue-950"
      case "core": return "bg-blue-100 text-blue-950"
      case "emergency": return "bg-red-100 text-red-700"
      default: return "bg-gray-100 text-gray-900"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-950 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading personnel data...</p>
          </div>
        </div>
      </div>
    )
  }

  const PersonnelForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter full name"
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="position">Position *</Label>
          <Input
            id="position"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            placeholder="Enter position"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="department">Department *</Label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              placeholder="Enter department"
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="level">Level</Label>
          <select
            id="level"
            name="level"
            value={formData.level}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950"
          >
            <option value="leadership">Leadership</option>
            <option value="management">Management</option>
            <option value="core">Core Staff</option>
            <option value="emergency">Emergency Response</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email address"
              className="pl-10"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter phone number"
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="Enter image URL"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select 
            value={formData.status} 
            onValueChange={(value) => setFormData({ ...formData, status: value as "active" | "inactive" })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
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
          {selectedPersonnel ? "Update Personnel" : "Add Personnel"}
        </Button>
      </DialogFooter>
    </form>
  )

  return (
    <div className="min-h-screen bg-white font-sans p-4 md:p-8" style={{ fontFamily: 'Poppins, sans-serif' }}>

      <div className="relative z-10">
      

        {/* Management Controls */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-blue-950">Personnel Directory</h2>
              <p className="text-gray-600">Manage MDRRMO personnel and staff</p>
            </div>
            <Button onClick={handleAddPersonnel} className="bg-blue-950 hover:bg-blue-800 text-yellow-500">
              <Plus className="mr-2 h-4 w-4" />
              Add Personnel
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search personnel..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="w-full md:w-48 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950"
            >
              <option value="all">All Levels</option>
              <option value="leadership">Leadership</option>
              <option value="management">Management</option>
              <option value="core">Core Staff</option>
              <option value="emergency">Emergency Response</option>
            </select>
          </div>
        </div>

        {/* Personnel Grid */}
        {filteredPersonnel.length === 0 ? (
          <div className="text-center py-12">
            <User className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Personnel Found</h3>
            <p className="text-gray-500 mb-6">Get started by adding a new personnel member.</p>
            <Button 
              onClick={handleAddPersonnel}
              className="bg-blue-950 hover:bg-blue-800 text-yellow-500"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add First Personnel
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPersonnel.map((person) => (
              <Card key={person.id} className="hover:shadow-lg transition-shadow border border-gray-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-950 to-yellow-500 flex items-center justify-center overflow-hidden">
                      <Image
                        src={person.image}
                        alt={person.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg text-blue-950 truncate">{person.name}</CardTitle>
                      <p className="text-sm text-gray-600 truncate">{person.position}</p>
                      <Badge className={`mt-1 ${getLevelColor(person.level)}`}>
                        {getLevelLabel(person.level)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Department</span>
                    <Badge variant="secondary">{person.department}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Status</span>
                    <Badge variant={person.status === "active" ? "default" : "destructive"}>
                      {person.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="mr-2 w-4 h-4" />
                      <span className="truncate">{person.email}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="mr-2 w-4 h-4" />
                      <span>{person.phone || "N/A"}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2 pt-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 bg-transparent hover:bg-blue-50 border-blue-950 text-blue-950"
                      onClick={() => handleEditPersonnel(person)}
                    >
                      <Edit className="mr-1 h-4 w-4" />
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent border-red-600"
                      onClick={() => handleDeletePersonnel(person)}
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

        {/* Add Personnel Dialog */}
        <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Personnel</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new personnel to the directory.
              </DialogDescription>
            </DialogHeader>
            <PersonnelForm />
          </DialogContent>
        </Dialog>

        {/* Edit Personnel Dialog */}
        <Dialog open={showEditForm} onOpenChange={setShowEditForm}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Personnel</DialogTitle>
              <DialogDescription>
                Update the personnel details below.
              </DialogDescription>
            </DialogHeader>
            <PersonnelForm />
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Personnel</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete {deleteTarget?.name} from the personnel directory? 
                This action cannot be undone.
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
