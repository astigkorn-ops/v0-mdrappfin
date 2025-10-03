"use client"

import { useState, useEffect } from "react"
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  MapPin, 
  Building,
  Users,
  Network,
  CheckCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface CouncilMember {
  id: number
  name: string
  position: string
  department: string
  role?: string
  subDepartment?: string
  image: string
  level: 'leadership' | 'viceChair' | 'cluster'
}

export default function DRRMCCouncilManagement() {
  const [members, setMembers] = useState<CouncilMember[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<CouncilMember | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    department: "",
    role: "",
    subDepartment: "",
    image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp",
    level: "leadership" as 'leadership' | 'viceChair' | 'cluster'
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [filterLevel, setFilterLevel] = useState("all")
  const { toast } = useToast()

  // Initialize with sample data
  useEffect(() => {
    const sampleMembers: CouncilMember[] = [
      {
        id: 1,
        name: "Hon. EVANGELINE C. ARANDIA",
        position: "CHAIRPERSON",
        department: "(Municipal Mayor)",
        image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp",
        level: "leadership"
      },
      {
        id: 2,
        name: "Hon. HENRY P. CALLOPE",
        position: "CO-CHAIRPERSON",
        department: "(Municipal Vice Mayor)",
        image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp",
        level: "leadership"
      },
      {
        id: 3,
        name: "Engr. Roberto Garcia",
        position: "VICE CHAIRPERSON",
        department: "DISASTER PREPAREDNESS",
        role: "(MLGOO)",
        image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp",
        level: "viceChair"
      },
      {
        id: 4,
        name: "Arch. Ana Reyes",
        position: "VICE CHAIRPERSON",
        department: "DISASTER PREVENTION AND MITIGATION",
        role: "(MPDO)",
        image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp",
        level: "viceChair"
      },
      {
        id: 5,
        name: "Mr. Jose Navarro",
        position: "EMERGENCY COMMUNICATION",
        department: "(MDRRMO - Lead)",
        image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp",
        level: "cluster"
      },
      {
        id: 6,
        name: "Mr. Ricardo Cruz",
        position: "TRANSPORTATION",
        department: "(MEO - Lead)",
        image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp",
        level: "cluster"
      }
    ]
    setMembers(sampleMembers)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.position) {
      toast({
        title: "Validation Error",
        description: "Name and Position are required fields",
        variant: "destructive",
      })
      return
    }

    if (editingMember) {
      // Update existing member
      setMembers(prev => prev.map(member => 
        member.id === editingMember.id 
          ? { ...member, ...formData, id: editingMember.id }
          : member
      ))
      toast({
        title: "Success",
        description: "Council member updated successfully",
      })
    } else {
      // Add new member
      const newMember: CouncilMember = {
        ...formData,
        id: Date.now()
      }
      setMembers(prev => [...prev, newMember])
      toast({
        title: "Success",
        description: "New council member added successfully",
      })
    }

    resetForm()
    setIsDialogOpen(false)
  }

  const handleEdit = (member: CouncilMember) => {
    setEditingMember(member)
    setFormData({
      name: member.name,
      position: member.position,
      department: member.department || "",
      role: member.role || "",
      subDepartment: member.subDepartment || "",
      image: member.image,
      level: member.level
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    setMembers(prev => prev.filter(member => member.id !== id))
    toast({
      title: "Success",
      description: "Council member deleted successfully",
    })
  }

  const resetForm = () => {
    setFormData({
      name: "",
      position: "",
      department: "",
      role: "",
      subDepartment: "",
      image: "https://res.cloudinary.com/dedcmctqk/image/upload/v1758628068/pioduran_seal_official_fhmwac.webp",
      level: "leadership"
    })
    setEditingMember(null)
  }

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = filterLevel === "all" || member.level === filterLevel
    return matchesSearch && matchesLevel
  })

  const getLevelLabel = (level: string) => {
    switch (level) {
      case "leadership": return "Leadership"
      case "viceChair": return "Vice Chairpersons"
      case "cluster": return "Cluster Members"
      default: return level
    }
  }

  return (
    <div className="min-h-screen bg-white font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="relative z-10">
       {/* Management Controls */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-blue-950">Council Members Management</h2>
              <p className="text-gray-600">Add, edit, and manage DRRMC council members</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              setIsDialogOpen(open)
              if (!open) resetForm()
            }}>
              <DialogTrigger asChild>
                <Button 
                  className="bg-blue-950 hover:bg-blue-800 text-yellow-500"
                  onClick={resetForm}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Member
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingMember ? "Edit Council Member" : "Add New Council Member"}</DialogTitle>
                  <DialogDescription>
                    {editingMember ? "Update the council member details below" : "Fill in the details for the new council member"}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter full name"
                        required
                      />
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
                  
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      placeholder="Enter department"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        placeholder="Enter role"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subDepartment">Sub Department</Label>
                      <Input
                        id="subDepartment"
                        name="subDepartment"
                        value={formData.subDepartment}
                        onChange={handleInputChange}
                        placeholder="Enter sub department"
                      />
                    </div>
                  </div>
                  
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
                    <Label htmlFor="level">Level</Label>
                    <select
                      id="level"
                      name="level"
                      value={formData.level}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950"
                    >
                      <option value="leadership">Leadership</option>
                      <option value="viceChair">Vice Chairpersons</option>
                      <option value="cluster">Cluster Members</option>
                    </select>
                  </div>
                  
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsDialogOpen(false)
                        resetForm()
                      }}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-blue-950 hover:bg-blue-800 text-yellow-500">
                      <Save className="mr-2 h-4 w-4" />
                      {editingMember ? "Update Member" : "Add Member"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Input
                placeholder="Search members..."
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
              <option value="viceChair">Vice Chairpersons</option>
              <option value="cluster">Cluster Members</option>
            </select>
          </div>

          {/* Members Grid */}
          {filteredMembers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-blue-950/20 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-blue-950 mb-2">No Members Found</h3>
              <p className="text-gray-600 mb-6">Get started by adding a new council member.</p>
              <Button 
                className="bg-blue-950 hover:bg-blue-800 text-yellow-500"
                onClick={() => {
                  resetForm()
                  setIsDialogOpen(true)
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add First Member
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers.map((member) => (
                <div key={member.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-950 to-yellow-500 flex items-center justify-center overflow-hidden">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(member)}
                        className="border-blue-950 text-blue-950 hover:bg-blue-50"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-600 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Council Member</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete {member.name}? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(member.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-bold text-blue-950 text-lg">{member.name}</h3>
                    <p className="font-semibold text-yellow-500">{member.position}</p>
                    {member.department && (
                      <p className="text-gray-700 text-sm">{member.department}</p>
                    )}
                    {member.role && (
                      <p className="text-gray-600 text-xs">{member.role}</p>
                    )}
                    {member.subDepartment && (
                      <p className="text-gray-600 text-xs">{member.subDepartment}</p>
                    )}
                    <div className="pt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {getLevelLabel(member.level)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Key Information Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mb-3">Management Guidelines</h2>
              <div className="w-16 h-1 bg-yellow-500 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-5 rounded-xl border-l-4 border-blue-950">
                <div className="text-blue-950 mb-3">
                  <Network className="w-8 h-8" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-blue-950 mb-2">Hierarchical Structure</h3>
                <p className="text-gray-700 text-sm">
                  Maintain the organizational hierarchy with clear levels: Leadership, Vice Chairpersons, and Cluster Members.
                </p>
              </div>

              <div className="bg-yellow-50 p-5 rounded-xl border-l-4 border-yellow-500">
                <div className="text-yellow-600 mb-3">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-blue-950 mb-2">Role Assignment</h3>
                <p className="text-gray-700 text-sm">
                  Assign appropriate roles and departments to ensure clear responsibilities and accountability.
                </p>
              </div>

              <div className="bg-blue-50 p-5 rounded-xl border-l-4 border-blue-950">
                <div className="text-blue-950 mb-3">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-blue-950 mb-2">Data Management</h3>
                <p className="text-gray-700 text-sm">
                  Keep member information up-to-date and accurate for effective emergency response coordination.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
