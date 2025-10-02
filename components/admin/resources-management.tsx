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
import { FolderOpen, Plus, Search, CreditCard as Edit, Trash2, Download, Upload, FileText, File, Image, Calendar } from "lucide-react"

interface Resource {
  id: string
  title: string
  description: string
  fileName: string
  fileType: "pdf" | "doc" | "docx" | "xls" | "xlsx" | "ppt" | "pptx" | "txt" | "image"
  fileSize: string
  category: "forms" | "guidelines" | "reports" | "policies" | "procedures" | "maps" | "training"
  downloadCount: number
  status: "active" | "archived" | "hidden"
  uploadedBy: string
  uploadedDate: string
  lastModified: string
  tags: string[]
}

const mockResources: Resource[] = [
  {
    id: "1",
    title: "Emergency Response Manual 2024",
    description: "Comprehensive guide for emergency response procedures",
    fileName: "emergency-response-manual-2024.pdf",
    fileType: "pdf",
    fileSize: "2.5 MB",
    category: "guidelines",
    downloadCount: 156,
    status: "active",
    uploadedBy: "Admin User",
    uploadedDate: "2024-01-10",
    lastModified: "2024-01-15T10:30:00Z",
    tags: ["emergency", "manual", "procedures"]
  },
  {
    id: "2",
    title: "Incident Report Form",
    description: "Standard form for reporting emergency incidents",
    fileName: "incident-report-form.pdf",
    fileType: "pdf",
    fileSize: "450 KB",
    category: "forms",
    downloadCount: 89,
    status: "active",
    uploadedBy: "Forms Manager",
    uploadedDate: "2024-01-05",
    lastModified: "2024-01-12T14:20:00Z",
    tags: ["form", "incident", "reporting"]
  }
]

export default function ResourcesManagement() {
  const [resources, setResources] = useState<Resource[]>(mockResources)
  const [selectedResources, setSelectedResources] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [fileTypeFilter, setFileTypeFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingResource, setEditingResource] = useState<Resource | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "guidelines",
    status: "active",
    tags: ""
  })

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.fileName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || resource.category === categoryFilter
    const matchesStatus = statusFilter === "all" || resource.status === statusFilter
    const matchesFileType = fileTypeFilter === "all" || resource.fileType === fileTypeFilter
    
    return matchesSearch && matchesCategory && matchesStatus && matchesFileType
  })

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "pdf": return <FileText className="h-4 w-4 text-red-600" />
      case "doc":
      case "docx": return <File className="h-4 w-4 text-blue-600" />
      case "xls":
      case "xlsx": return <File className="h-4 w-4 text-green-600" />
      case "ppt":
      case "pptx": return <File className="h-4 w-4 text-orange-600" />
      case "image": return <Image className="h-4 w-4 text-purple-600" />
      default: return <File className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800"
      case "archived": return "bg-yellow-100 text-yellow-800"
      case "hidden": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "forms": return "bg-blue-100 text-blue-800"
      case "guidelines": return "bg-green-100 text-green-800"
      case "reports": return "bg-purple-100 text-purple-800"
      case "policies": return "bg-red-100 text-red-800"
      case "procedures": return "bg-yellow-100 text-yellow-800"
      case "maps": return "bg-cyan-100 text-cyan-800"
      case "training": return "bg-orange-100 text-orange-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const totalPages = Math.ceil(filteredResources.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedResources = filteredResources.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-950">Resources Management</h1>
          <p className="text-gray-600">Upload and manage documents, forms, and resources</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-950 hover:bg-blue-800 text-yellow-500">
              <Upload className="mr-2 h-4 w-4" />
              Upload Resource
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingResource ? "Edit Resource" : "Upload New Resource"}</DialogTitle>
              <DialogDescription>
                {editingResource ? "Update resource details" : "Upload a new document or resource"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Enter resource title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe the resource"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="forms">Forms</SelectItem>
                      <SelectItem value="guidelines">Guidelines</SelectItem>
                      <SelectItem value="reports">Reports</SelectItem>
                      <SelectItem value="policies">Policies</SelectItem>
                      <SelectItem value="procedures">Procedures</SelectItem>
                      <SelectItem value="maps">Maps</SelectItem>
                      <SelectItem value="training">Training</SelectItem>
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
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                      <SelectItem value="hidden">Hidden</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">Upload File *</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-2">Drag & drop files here or click to browse</p>
                  <p className="text-sm text-gray-500">Supports PDF, DOC, XLS, PPT, TXT, and images up to 10MB</p>
                  <Input type="file" className="hidden" />
                  <Button variant="outline" className="mt-4">
                    Choose File
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  placeholder="Enter tags separated by commas"
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => {
                setIsCreateDialogOpen(false)
                setEditingResource(null)
              }}>
                Cancel
              </Button>
              <Button className="bg-blue-950 hover:bg-blue-800 text-yellow-500">
                {editingResource ? "Update" : "Upload"} Resource
              </Button>
            </DialogFooter>
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
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="forms">Forms</SelectItem>
                <SelectItem value="guidelines">Guidelines</SelectItem>
                <SelectItem value="reports">Reports</SelectItem>
                <SelectItem value="policies">Policies</SelectItem>
                <SelectItem value="procedures">Procedures</SelectItem>
                <SelectItem value="maps">Maps</SelectItem>
                <SelectItem value="training">Training</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
                <SelectItem value="hidden">Hidden</SelectItem>
              </SelectContent>
            </Select>
            <Select value={fileTypeFilter} onValueChange={setFileTypeFilter}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="File Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="doc">Word</SelectItem>
                <SelectItem value="xls">Excel</SelectItem>
                <SelectItem value="ppt">PowerPoint</SelectItem>
                <SelectItem value="image">Images</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Resources Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5" />
            Document Resources
          </CardTitle>
          <CardDescription>
            Manage documents, forms, and downloadable resources
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
                  <TableHead>Resource</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>File Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Downloads</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedResources.map((resource) => (
                  <TableRow key={resource.id}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-start">
                        <div className="mr-3 mt-1">
                          {getFileIcon(resource.fileType)}
                        </div>
                        <div>
                          <div className="font-medium text-blue-950">{resource.title}</div>
                          <div className="text-sm text-gray-600 truncate max-w-xs">{resource.description}</div>
                          <div className="text-xs text-gray-500">{resource.fileName}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getCategoryColor(resource.category)}>
                        {resource.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-mono uppercase">{resource.fileType}</span>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {resource.fileSize}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Download className="mr-1 h-3 w-3" />
                        {resource.downloadCount}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(resource.status)}>
                        {resource.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="mr-1 h-3 w-3" />
                        {new Date(resource.uploadedDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
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
