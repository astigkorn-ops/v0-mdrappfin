"use client"

import { useState, useEffect } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { 
  MapPin, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Upload,
  Layers,
  Download
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface MapItem {
  id: number
  name: string
  description: string
  file_url: string
  thumbnail_url: string
  category: string
  tags: string
  location: string
  latitude: number
  longitude: number
  zoom_level: number
  status: string
  uploaded_by: string
  created_at: string
  updated_at: string
}

const categories = ["Evacuation Maps", "Hazard Maps", "Infrastructure Maps", "Transportation Maps", "Administrative Maps", "Other"]
const statusOptions = ["draft", "published", "archived"]

export default function MapsManagement() {
  const [maps, setMaps] = useState<MapItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedMap, setSelectedMap] = useState<MapItem | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    file_url: "",
    thumbnail_url: "",
    category: "",
    tags: "",
    location: "",
    latitude: "",
    longitude: "",
    zoom_level: "13",
    status: "draft",
  })

  useEffect(() => {
    fetchMaps()
  }, [])

  const fetchMaps = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.from("maps").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setMaps(data || [])
    } catch (error) {
      console.error("Error fetching maps:", error)
      toast({
        title: "Error",
        description: "Failed to fetch maps",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleThumbnailUpload = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `maps/thumbnails/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('public')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('public')
        .getPublicUrl(filePath)

      return publicUrl
    } catch (error) {
      console.error("Error uploading thumbnail:", error)
      throw error
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.file_url) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    try {
      const mapData = {
        ...formData,
        latitude: parseFloat(formData.latitude) || 0,
        longitude: parseFloat(formData.longitude) || 0,
        zoom_level: parseInt(formData.zoom_level) || 13,
        uploaded_by: "00000000-0000-0000-0000-000000000000", // Replace with actual user ID
      }

      if (selectedMap) {
        // Update existing map
        const { error } = await supabase.from("maps").update(mapData).eq("id", selectedMap.id)

        if (error) throw error

        toast({
          title: "Success",
          description: "Map updated successfully",
          variant: ""
        })
        setIsEditDialogOpen(false)
      } else {
        // Create new map
        const { error } = await supabase.from("maps").insert([mapData])

        if (error) throw error

        toast({
          title: "Success",
          description: "Map uploaded successfully",
          variant: ""
        })
        setIsCreateDialogOpen(false)
      }

      resetForm()
      fetchMaps()
    } catch (error) {
      console.error("Error saving map:", error)
      toast({
        title: "Error",
        description: "Failed to save map",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (map: MapItem) => {
    setSelectedMap(map)
    setFormData({
      name: map.name,
      description: map.description,
      file_url: map.file_url,
      thumbnail_url: map.thumbnail_url,
      category: map.category,
      tags: map.tags,
      location: map.location,
      latitude: map.latitude.toString(),
      longitude: map.longitude.toString(),
      zoom_level: map.zoom_level.toString(),
      status: map.status,
    })
    setThumbnailPreview(map.thumbnail_url)
    setIsEditDialogOpen(true)
  }

  const handleView = (map: MapItem) => {
    setSelectedMap(map)
    setIsViewDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase.from("maps").delete().eq("id", id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Map deleted successfully",
        variant: ""
      })
      fetchMaps()
    } catch (error) {
      console.error("Error deleting map:", error)
      toast({
        title: "Error",
        description: "Failed to delete map",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      file_url: "",
      thumbnail_url: "",
      category: "",
      tags: "",
      location: "",
      latitude: "",
      longitude: "",
      zoom_level: "13",
      status: "draft",
    })
    setThumbnailPreview(null)
    setSelectedMap(null)
  }

  const handleThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const publicUrl = await handleThumbnailUpload(file)
      setFormData({ ...formData, thumbnail_url: publicUrl })
      setThumbnailPreview(publicUrl)
    } catch (error) {
      toast({
        title: "Upload Error",
        description: "Failed to upload thumbnail",
        variant: "destructive",
      })
    }
  }

  const filteredMaps = maps.filter((map) => {
    const matchesSearch =
      map.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      map.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      map.tags.toLowerCase().includes(searchTerm.toLowerCase()) ||
      map.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || map.category === categoryFilter
    const matchesStatus = statusFilter === "all" || map.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  const totalPages = Math.ceil(filteredMaps.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedMaps = filteredMaps.slice(startIndex, startIndex + itemsPerPage)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      draft: "bg-gray-100 text-gray-800",
      published: "bg-green-100 text-green-800",
      archived: "bg-yellow-100 text-yellow-800",
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status] || "bg-gray-100 text-gray-800"}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const MapForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Map Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter map name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Enter map description"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((status) => (
                <SelectItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          placeholder="Enter location name"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="latitude">Latitude</Label>
          <Input
            id="latitude"
            type="number"
            step="any"
            value={formData.latitude}
            onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
            placeholder="Enter latitude"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="longitude">Longitude</Label>
          <Input
            id="longitude"
            type="number"
            step="any"
            value={formData.longitude}
            onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
            placeholder="Enter longitude"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="zoom_level">Zoom Level</Label>
          <Input
            id="zoom_level"
            type="number"
            min="1"
            max="18"
            value={formData.zoom_level}
            onChange={(e) => setFormData({ ...formData, zoom_level: e.target.value })}
            placeholder="Enter zoom level"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags</Label>
        <Input
          id="tags"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          placeholder="Enter tags (comma separated)"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="file_url">Map File URL *</Label>
        <Input
          id="file_url"
          value={formData.file_url}
          onChange={(e) => setFormData({ ...formData, file_url: e.target.value })}
          placeholder="Enter map file URL (PDF, image, or map service URL)"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="thumbnail_url">Thumbnail</Label>
        <div className="flex items-center space-x-2">
          <Input
            id="thumbnail_url"
            value={formData.thumbnail_url}
            onChange={(e) => {
              setFormData({ ...formData, thumbnail_url: e.target.value })
              setThumbnailPreview(e.target.value)
            }}
            placeholder="Enter thumbnail URL or upload below"
          />
        </div>
        <div className="mt-2">
          <Label className="block mb-2">Upload Thumbnail</Label>
          <div className="flex items-center space-x-2">
            <Input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="hidden"
              id="thumbnail-upload"
            />
            <Label
              htmlFor="thumbnail-upload"
              className="flex items-center justify-center px-4 py-2 bg-blue-950 text-yellow-500 rounded-md cursor-pointer hover:bg-blue-900 transition-colors"
            >
              <Upload className="mr-2 h-4 w-4" />
              Choose File
            </Label>
            <span className="text-sm text-gray-500">
              {formData.thumbnail_url ? "Thumbnail selected" : "No file chosen"}
            </span>
          </div>
        </div>
        {thumbnailPreview && (
          <div className="mt-4">
            <Label className="block mb-2">Preview</Label>
            <img
              src={thumbnailPreview}
              alt="Thumbnail preview"
              className="w-full h-32 object-cover rounded-md border"
            />
          </div>
        )}
      </div>

      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            resetForm()
            setIsCreateDialogOpen(false)
            setIsEditDialogOpen(false)
          }}
        >
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-950 hover:bg-blue-900 text-yellow-500">
          {selectedMap ? "Update Map" : "Upload Map"}
        </Button>
      </DialogFooter>
    </form>
  )

  if (loading) {
    return (
      <main className="flex-1 overflow-y-auto p-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-950 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading maps...</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 overflow-y-auto p-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-blue-950 rounded-full flex items-center justify-center">
            <MapPin className="text-yellow-500 text-2xl" size={32} />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-blue-950 mb-2">Maps Management</h1>
        <p className="text-gray-600">Upload, manage, and organize your map resources</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-blue-950">Map Library</CardTitle>
              <CardDescription>Manage your organization's map resources</CardDescription>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-950 hover:bg-blue-900 text-yellow-500">
                  <Plus className="mr-2 h-4 w-4" />
                  Upload Map
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Upload New Map</DialogTitle>
                  <DialogDescription>Fill in the details to upload a new map resource.</DialogDescription>
                </DialogHeader>
                <MapForm />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search maps..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {statusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Map</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedMaps.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="text-gray-500">
                        <MapPin className="mx-auto h-12 w-12 mb-4 opacity-50" />
                        <p>No maps found</p>
                        <p className="text-sm">Upload your first map to get started</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedMaps.map((map) => (
                    <TableRow key={map.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="relative">
                            {map.thumbnail_url ? (
                              <img
                                src={map.thumbnail_url}
                                alt={map.name}
                                className="w-16 h-16 object-cover rounded-md"
                              />
                            ) : (
                              <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                                <MapPin className="text-gray-500" size={24} />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black bg-opacity-30 rounded-md flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                              <Layers className="text-white" size={16} />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-blue-950">{map.name}</div>
                            <div className="text-sm text-gray-600 truncate max-w-xs">{map.description}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {map.category}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <MapPin className="mr-1 h-3 w-3" />
                          {map.location || "Not specified"}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(map.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          {formatDate(map.created_at)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleView(map)}
                            className="hover:bg-blue-50"
                          >
                            <Eye className="h-4 w-4 text-blue-950" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleEdit(map)}
                            className="hover:bg-blue-50"
                          >
                            <Edit className="h-4 w-4 text-blue-950" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="hover:bg-red-50">
                                <Trash2 className="h-4 w-4 text-red-600" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Map</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{map.name}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(map.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredMaps.length)} of{" "}
                {filteredMaps.length} maps
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="border-blue-950 text-blue-950 hover:bg-blue-50"
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="border-blue-950 text-blue-950 hover:bg-blue-50"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Map</DialogTitle>
            <DialogDescription>Update the map details below.</DialogDescription>
          </DialogHeader>
          <MapForm />
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedMap?.name}</DialogTitle>
            <DialogDescription>{selectedMap?.description}</DialogDescription>
          </DialogHeader>
          {selectedMap && (
            <div className="space-y-4">
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                {selectedMap.thumbnail_url ? (
                  <img
                    src={selectedMap.thumbnail_url}
                    alt={selectedMap.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <MapPin className="text-gray-500" size={48} />
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Layers className="mr-2 h-4 w-4" />
                  <span>Category: {selectedMap.category || "Uncategorized"}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>Location: {selectedMap.location || "Not specified"}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">📍</span>
                  <span>Coordinates: {selectedMap.latitude}, {selectedMap.longitude}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">🔍</span>
                  <span>Zoom Level: {selectedMap.zoom_level}</span>
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">#</span>
                    <span>Tags: {selectedMap.tags || "None"}</span>
                  </div>
                </div>
                <div className="md:col-span-2 flex gap-2">
                  <Button className="bg-blue-950 hover:bg-blue-900 text-yellow-500">
                    <Eye className="mr-2 h-4 w-4" />
                    View Map
                  </Button>
                  <Button variant="outline" className="border-blue-950 text-blue-950 hover:bg-blue-50">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              onClick={() => setIsViewDialogOpen(false)}
              className="bg-blue-950 hover:bg-blue-900 text-yellow-500"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
function toast(arg0: { title: string; description: string; variant: string }) {
  throw new Error("Function not implemented.")
}
