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
  Video, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Play, 
  Calendar,
  Tag,
  Eye,
  Upload
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface VideoItem {
  id: number
  title: string
  description: string
  video_url: string
  thumbnail_url: string
  category: string
  tags: string
  duration: string
  views: number
  status: string
  uploaded_by: string
  created_at: string
  updated_at: string
}

const categories = ["Training", "Events", "Tutorials", "Interviews", "Documentaries", "Public Service", "Other"]
const statusOptions = ["draft", "published", "archived"]

export default function VideoManagement() {
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video_url: "",
    thumbnail_url: "",
    category: "",
    tags: "",
    duration: "",
    status: "draft",
  })

  // Fix: Destructure toast from useToast
  const { toast } = useToast();

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("videos")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      setVideos(data || [])
    } catch (error) {
      console.error("Error fetching videos:", error)
      toast({
        title: "Error",
        description: "Failed to fetch videos",
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
      const filePath = `thumbnails/${fileName}`

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

    if (!formData.title || !formData.video_url) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    try {
      const videoData = {
        ...formData,
        views: selectedVideo ? selectedVideo.views : 0,
        uploaded_by: "00000000-0000-0000-0000-000000000000", // Replace with actual user ID
      }

      if (selectedVideo) {
        // Update existing video
        const { error } = await supabase.from("videos").update(videoData).eq("id", selectedVideo.id)

        if (error) throw error

        toast({
          title: "Success",
          description: "Video updated successfully",
        })
        setIsEditDialogOpen(false)
      } else {
        // Create new video
        const { error } = await supabase.from("videos").insert([videoData])

        if (error) throw error

        toast({
          title: "Success",
          description: "Video uploaded successfully",
        })
        setIsCreateDialogOpen(false)
      }

      resetForm()
      fetchVideos()
    } catch (error) {
      console.error("Error saving video:", error)
      toast({
        title: "Error",
        description: "Failed to save video",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (video: VideoItem) => {
    setSelectedVideo(video)
    setFormData({
      title: video.title,
      description: video.description,
      video_url: video.video_url,
      thumbnail_url: video.thumbnail_url,
      category: video.category,
      tags: video.tags,
      duration: video.duration,
      status: video.status,
    })
    setThumbnailPreview(video.thumbnail_url)
    setIsEditDialogOpen(true)
  }

  const handleView = (video: VideoItem) => {
    setSelectedVideo(video)
    setIsViewDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase.from("videos").delete().eq("id", id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Video deleted successfully",
      })
      fetchVideos()
    } catch (error) {
      console.error("Error deleting video:", error)
      toast({
        title: "Error",
        description: "Failed to delete video",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      video_url: "",
      thumbnail_url: "",
      category: "",
      tags: "",
      duration: "",
      status: "draft",
    })
    setThumbnailPreview(null)
    setSelectedVideo(null)
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

  const filteredVideos = videos.filter((video) => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.tags.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || video.category === categoryFilter
    const matchesStatus = statusFilter === "all" || video.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  const totalPages = Math.ceil(filteredVideos.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedVideos = filteredVideos.slice(startIndex, startIndex + itemsPerPage)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatDuration = (duration: string) => {
    if (!duration) return "00:00"
    return duration
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

  const VideoForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Video Title *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter video title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Enter video description"
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            placeholder="HH:MM:SS"
          />
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
      </div>

      <div className="space-y-2">
        <Label htmlFor="video_url">Video URL *</Label>
        <Input
          id="video_url"
          value={formData.video_url}
          onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
          placeholder="Enter video URL (YouTube, Vimeo, etc.)"
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
          {selectedVideo ? "Update Video" : "Upload Video"}
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
            <p className="text-gray-600">Loading videos...</p>
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
            <Video className="text-yellow-500 text-2xl" size={32} />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-blue-950 mb-2">Video Management</h1>
        <p className="text-gray-600">Upload, manage, and organize your video content</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-blue-950">Video Library</CardTitle>
              <CardDescription>Manage your organization's video content</CardDescription>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-950 hover:bg-blue-900 text-yellow-500">
                  <Plus className="mr-2 h-4 w-4" />
                  Upload Video
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Upload New Video</DialogTitle>
                  <DialogDescription>Fill in the details to upload a new video.</DialogDescription>
                </DialogHeader>
                <VideoForm />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search videos..."
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
                  <TableHead>Video</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedVideos.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="text-gray-500">
                        <Video className="mx-auto h-12 w-12 mb-4 opacity-50" />
                        <p>No videos found</p>
                        <p className="text-sm">Upload your first video to get started</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedVideos.map((video) => (
                    <TableRow key={video.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="relative">
                            {video.thumbnail_url ? (
                              <img
                                src={video.thumbnail_url}
                                alt={video.title}
                                className="w-16 h-16 object-cover rounded-md"
                              />
                            ) : (
                              <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                                <Video className="text-gray-500" size={24} />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black bg-opacity-30 rounded-md flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                              <Play className="text-white" size={16} />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-blue-950">{video.title}</div>
                            <div className="text-sm text-gray-600 truncate max-w-xs">{video.description}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {video.category}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <span className="mr-1 h-3 w-3"><i className="fas fa-lock" /></span>
                          {formatDuration(video.duration)}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(video.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Eye className="mr-1 h-3 w-3" />
                          {video.views}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="mr-1 h-3 w-3" />
                          {formatDate(video.created_at)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleView(video)}
                            className="hover:bg-blue-50"
                          >
                            <Eye className="h-4 w-4 text-blue-950" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleEdit(video)}
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
                                <AlertDialogTitle>Delete Video</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{video.title}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(video.id)}
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
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredVideos.length)} of{" "}
                {filteredVideos.length} videos
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
            <DialogTitle>Edit Video</DialogTitle>
            <DialogDescription>Update the video details below.</DialogDescription>
          </DialogHeader>
          <VideoForm />
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedVideo?.title}</DialogTitle>
            <DialogDescription>{selectedVideo?.description}</DialogDescription>
          </DialogHeader>
          {selectedVideo && (
            <div className="space-y-4">
              {selectedVideo.video_url ? (
                <div className="relative pt-[56.25%]">
                  <iframe
                    src={selectedVideo.video_url.replace("watch?v=", "embed/")}
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                  <Video className="text-gray-500" size={48} />
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Tag className="mr-2 h-4 w-4" />
                  <span>Category: {selectedVideo.category || "Uncategorized"}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2 h-4 w-4"><i className="fas fa-lock" /></span>
                  <span>Duration: {formatDuration(selectedVideo.duration)}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Eye className="mr-2 h-4 w-4" />
                  <span>Views: {selectedVideo.views}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Uploaded: {formatDate(selectedVideo.created_at)}</span>
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2 h-4 w-4">#</span>
                    <span>Tags: {selectedVideo.tags || "None"}</span>
                  </div>
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
