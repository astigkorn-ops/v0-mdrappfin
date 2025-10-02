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
import { Calendar, Plus, Search, CreditCard as Edit, Trash2, Eye, MapPin, Clock, Users } from "lucide-react"

interface Activity {
  id: string
  title: string
  description: string
  date: string
  time: string
  venue: string
  category: "training" | "drill" | "meeting" | "community" | "emergency"
  status: "planned" | "ongoing" | "completed" | "cancelled"
  maxParticipants?: number
  currentParticipants: number
  organizer: string
  createdBy: string
  createdDate: string
  lastModified: string
}

const mockActivities: Activity[] = [
  {
    id: "1",
    title: "Emergency Response Training",
    description: "Quarterly training for emergency response team members",
    date: "2024-02-15",
    time: "09:00",
    venue: "Municipal Hall Conference Room",
    category: "training",
    status: "planned",
    maxParticipants: 30,
    currentParticipants: 18,
    organizer: "Training Department",
    createdBy: "Admin User",
    createdDate: "2024-01-10",
    lastModified: "2024-01-15T10:30:00Z"
  },
  {
    id: "2",
    title: "Community Earthquake Drill",
    description: "Municipality-wide earthquake preparedness drill",
    date: "2024-02-20",
    time: "14:00",
    venue: "All Barangays",
    category: "drill",
    status: "planned",
    maxParticipants: 1000,
    currentParticipants: 456,
    organizer: "MDRRMO",
    createdBy: "Emergency Coordinator",
    createdDate: "2024-01-05",
    lastModified: "2024-01-14T16:45:00Z"
  }
]

export default function ActivitiesManagement() {
  const [activities, setActivities] = useState<Activity[]>(mockActivities)
  const [selectedActivities, setSelectedActivities] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    category: "training",
    status: "planned",
    maxParticipants: "",
    organizer: ""
  })

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.organizer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || activity.status === statusFilter
    const matchesCategory = categoryFilter === "all" || activity.category === categoryFilter
    
    return matchesSearch && matchesStatus && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planned": return "bg-blue-100 text-blue-800"
      case "ongoing": return "bg-yellow-100 text-yellow-800"
      case "completed": return "bg-green-100 text-green-800"
      case "cancelled": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "training": return "bg-blue-100 text-blue-800"
      case "drill": return "bg-orange-100 text-orange-800"
      case "meeting": return "bg-purple-100 text-purple-800"
      case "community": return "bg-green-100 text-green-800"
      case "emergency": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedActivities = filteredActivities.slice(startIndex, startIndex + itemsPerPage)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingActivity) {
      // Update existing activity
      setActivities(prev => prev.map(activity => 
        activity.id === editingActivity.id 
          ? { 
              ...activity, 
              ...formData,
              maxParticipants: formData.maxParticipants ? parseInt(formData.maxParticipants) : undefined,
              lastModified: new Date().toISOString()
            }
          : activity
      ))
    } else {
      // Create new activity
      const newActivity: Activity = {
        id: Date.now().toString(),
        ...formData,
        maxParticipants: formData.maxParticipants ? parseInt(formData.maxParticipants) : undefined,
        currentParticipants: 0,
        createdBy: "Current User",
        createdDate: new Date().toISOString().split('T')[0],
        lastModified: new Date().toISOString()
      }
      setActivities(prev => [newActivity, ...prev])
    }

    resetForm()
    setIsCreateDialogOpen(false)
    setEditingActivity(null)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      venue: "",
      category: "training",
      status: "planned",
      maxParticipants: "",
      organizer: ""
    })
  }

  const handleEdit = (activity: Activity) => {
    setEditingActivity(activity)
    setFormData({
      title: activity.title,
      description: activity.description,
      date: activity.date,
      time: activity.time,
      venue: activity.venue,
      category: activity.category,
      status: activity.status,
      maxParticipants: activity.maxParticipants?.toString() || "",
      organizer: activity.organizer
    })
    setIsCreateDialogOpen(true)
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-950">Activities Management</h1>
          <p className="text-gray-600">Manage events, trainings, and community activities</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-950 hover:bg-blue-800 text-yellow-500">
              <Plus className="mr-2 h-4 w-4" />
              Add Activity
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingActivity ? "Edit Activity" : "Add New Activity"}</DialogTitle>
              <DialogDescription>
                {editingActivity ? "Update activity details" : "Create a new activity or event"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Enter activity title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe the activity"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="venue">Venue *</Label>
                <Input
                  id="venue"
                  value={formData.venue}
                  onChange={(e) => setFormData({...formData, venue: e.target.value})}
                  placeholder="Enter venue location"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="training">Training</SelectItem>
                      <SelectItem value="drill">Drill</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="community">Community</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
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
                      <SelectItem value="planned">Planned</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxParticipants">Max Participants</Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    value={formData.maxParticipants}
                    onChange={(e) => setFormData({...formData, maxParticipants: e.target.value})}
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="organizer">Organizer</Label>
                <Input
                  id="organizer"
                  value={formData.organizer}
                  onChange={(e) => setFormData({...formData, organizer: e.target.value})}
                  placeholder="Enter organizer name"
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => {
                  resetForm()
                  setIsCreateDialogOpen(false)
                  setEditingActivity(null)
                }}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-950 hover:bg-blue-800 text-yellow-500">
                  {editingActivity ? "Update" : "Create"} Activity
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
                placeholder="Search activities..."
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
                <SelectItem value="planned">Planned</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="training">Training</SelectItem>
                <SelectItem value="drill">Drill</SelectItem>
                <SelectItem value="meeting">Meeting</SelectItem>
                <SelectItem value="community">Community</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Activities Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Activities & Events
          </CardTitle>
          <CardDescription>
            Manage all activities, events, and training sessions
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
                  <TableHead>Activity</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Venue</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Participants</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedActivities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-blue-950">{activity.title}</div>
                        <div className="text-sm text-gray-600 truncate max-w-xs">{activity.description}</div>
                        <div className="text-xs text-gray-500">Organizer: {activity.organizer}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        {new Date(activity.date).toLocaleDateString()}
                      </div>
                      {activity.time && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="mr-1 h-3 w-3" />
                          {activity.time}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-3 w-3" />
                        {activity.venue}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getCategoryColor(activity.category)}>
                        {activity.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(activity.status)}>
                        {activity.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="mr-1 h-3 w-3" />
                        {activity.currentParticipants}
                        {activity.maxParticipants && `/${activity.maxParticipants}`}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(activity)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
