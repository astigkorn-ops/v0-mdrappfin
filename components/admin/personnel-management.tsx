"use client"

import { useState } from "react"
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
import { User, Mail, Phone, Building, Plus, Search, Edit, Trash2 } from "lucide-react"

interface Personnel {
  id: string
  name: string
  position: string
  department: string
  email: string
  phone: string
  status: "active" | "inactive"
  avatar?: string
}

const mockPersonnel: Personnel[] = [
  {
    id: "1",
    name: "Juan Dela Cruz",
    position: "MDRRMO Head",
    department: "Management",
    email: "juan.delacruz@pioduran.gov.ph",
    phone: "(052) 234-5678",
    status: "active",
  },
  {
    id: "2",
    name: "Maria Santos",
    position: "Emergency Response Coordinator",
    department: "Operations",
    email: "maria.santos@pioduran.gov.ph",
    phone: "(052) 234-5679",
    status: "active",
  },
]

export default function PersonnelManagement() {
  const [personnel, setPersonnel] = useState<Personnel[]>(mockPersonnel)
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedPersonnel, setSelectedPersonnel] = useState<Personnel | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Personnel | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    position: "",
    department: "",
    email: "",
    phone: "",
    status: "active" as "active" | "inactive",
  })

  const filteredPersonnel = personnel.filter(
    (person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddPersonnel = () => {
    setSelectedPersonnel(null)
    setFormData({
      name: "",
      position: "",
      department: "",
      email: "",
      phone: "",
      status: "active",
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
      setShowDeleteDialog(false)
      setDeleteTarget(null)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (selectedPersonnel) {
      // Update existing personnel
      setPersonnel(personnel.map(p => 
        p.id === selectedPersonnel.id 
          ? { ...p, ...formData }
          : p
      ))
      setShowEditForm(false)
    } else {
      // Add new personnel
      const newPersonnel: Personnel = {
        id: (personnel.length + 1).toString(),
        ...formData,
      }
      setPersonnel([...personnel, newPersonnel])
      setShowAddForm(false)
    }
    
    setFormData({
      name: "",
      position: "",
      department: "",
      email: "",
      phone: "",
      status: "active",
    })
  }

  const PersonnelForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name *</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
          value={formData.position}
          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
          placeholder="Enter position"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="department">Department *</Label>
        <div className="relative">
          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            id="department"
            value={formData.department}
            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            placeholder="Enter department"
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Enter email address"
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone *</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="Enter phone number"
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as "active" | "inactive" })}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-blue-950">Personnel Directory</h1>
          <p className="text-gray-600">Manage MDRRMO personnel and staff</p>
        </div>
        <Button onClick={handleAddPersonnel} className="bg-blue-950 hover:bg-blue-800 text-yellow-500">
          <Plus className="mr-2 h-4 w-4" />
          Add Personnel
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search personnel..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPersonnel.map((person) => (
          <Card key={person.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-blue-950 font-bold text-lg">
                    {person.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg text-blue-950 truncate">{person.name}</CardTitle>
                  <p className="text-sm text-gray-600 truncate">{person.position}</p>
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
                  <span>{person.phone}</span>
                </div>
              </div>
              <div className="flex space-x-2 pt-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1 bg-transparent hover:bg-blue-50"
                  onClick={() => handleEditPersonnel(person)}
                >
                  <Edit className="mr-1 h-4 w-4" />
                  Edit
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
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

      {filteredPersonnel.length === 0 && (
        <div className="text-center py-12">
          <User className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <p className="text-gray-500">No personnel found matching your search.</p>
        </div>
      )}

      {/* Add Personnel Dialog */}
      <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
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
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
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
  )
}
