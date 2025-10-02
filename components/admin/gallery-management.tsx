"use client"

import { useState, useEffect } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
  Images, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Upload, 
  Eye, 
  Calendar,
  Tag,
  Hash
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface GalleryImage {
  id: number
  title: string
  description: string
  image_url: string
  category: string
  tags: string
  uploaded_by: string
  created_at: string
  updated_at: string
}

const categories = ["Events", "Activities", "Training", "Community", "Disaster Response", "Meetings", "Other"]

export default function GalleryManagement() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(12)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    category: "",
    tags: "",
  })

  // Fix: Destructure toast from useToast
  const { toast } = useToast();

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.from("gallery_images").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setImages(data || [])
    } catch (error) {
      console.error("Error fetching images:", error)
      toast({
        title: "Error",
        description: "Failed to fetch gallery images",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `gallery/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('public')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('public')
        .getPublicUrl(filePath)

      return publicUrl
    } catch (error) {
      console.error("Error uploading image:", error)
      throw error
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.image_url) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    try {
      const imageData = {
        ...formData,
        uploaded_by: "00000000-0000-0000-0000-000000000000", // Replace with actual user ID
      }

      if (selectedImage) {
        // Update existing image
        const { error } = await supabase.from("gallery_images").update(imageData).eq("id", selectedImage.id)

        if (error) throw error

        toast({
          title: "Success",
          description: "Image updated successfully",
        })
        setIsEditDialogOpen(false)
      } else {
        // Create new image
        const { error } = await supabase.from("gallery_images").insert([imageData])

        if (error) throw error

        toast({
          title: "Success",
          description: "Image uploaded successfully",
        })
        setIsCreateDialogOpen(false)
      }

      resetForm()
      fetchImages()
    } catch (error) {
      console.error("Error saving image:", error)
      toast({
        title: "Error",
        description: "Failed to save image",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (image: GalleryImage) => {
    setSelectedImage(image)
    setFormData({
      title: image.title,
      description: image.description,
      image_url: image.image_url,
      category: image.category,
      tags: image.tags,
    })
    setPreviewUrl(image.image_url)
    setIsEditDialogOpen(true)
  }

  const handleView = (image: GalleryImage) => {
    setSelectedImage(image)
    setIsViewDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase.from("gallery_images").delete().eq("id", id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Image deleted successfully",
      })
      fetchImages()
    } catch (error) {
      console.error("Error deleting image:", error)
      toast({
        title: "Error",
        description: "Failed to delete image",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image_url: "",
      category: "",
      tags: "",
    })
    setPreviewUrl(null)
    setSelectedImage(null)
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const publicUrl = await handleImageUpload(file)
      setFormData({ ...formData, image_url: publicUrl })
      setPreviewUrl(publicUrl)
    } catch (error) {
      toast({
        title: "Upload Error",
        description: "Failed to upload image",
        variant: "destructive",
      })
    }
  }

  const filteredImages = images.filter((image) => {
    const matchesSearch =
      image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.tags.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || image.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const totalPages = Math.ceil(filteredImages.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedImages = filteredImages.slice(startIndex, startIndex + itemsPerPage)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const ImageForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Image Title *</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter image title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Enter image description"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950"
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
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
        <Label htmlFor="image_url">Image *</Label>
        <div className="flex items-center space-x-2">
          <Input
            id="image_url"
            value={formData.image_url}
            onChange={(e) => {
              setFormData({ ...formData, image_url: e.target.value })
              setPreviewUrl(e.target.value)
            }}
            placeholder="Enter image URL or upload below"
            required
          />
        </div>
        <div className="mt-2">
          <Label className="block mb-2">Upload Image</Label>
          <div className="flex items-center space-x-2">
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="image-upload"
            />
            <Label
              htmlFor="image-upload"
              className="flex items-center justify-center px-4 py-2 bg-blue-950 text-yellow-500 rounded-md cursor-pointer hover:bg-blue-900 transition-colors"
            >
              <Upload className="mr-2 h-4 w-4" />
              Choose File
            </Label>
            <span className="text-sm text-gray-500">
              {formData.image_url ? "Image selected" : "No file chosen"}
            </span>
          </div>
        </div>
        {previewUrl && (
          <div className="mt-4">
            <Label className="block mb-2">Preview</Label>
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-48 object-cover rounded-md border"
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
          {selectedImage ? "Update Image" : "Upload Image"}
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
            <p className="text-gray-600">Loading gallery...</p>
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
            <Images className="text-yellow-500 text-2xl" size={32} />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-blue-950 mb-2">Gallery Management</h1>
        <p className="text-gray-600">Upload, manage, and organize your gallery images</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-blue-950">Gallery Images</CardTitle>
              <CardDescription>Manage your organization's gallery images</CardDescription>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-950 hover:bg-blue-900 text-yellow-500">
                  <Plus className="mr-2 h-4 w-4" />
                  Upload Image
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Upload New Image</DialogTitle>
                  <DialogDescription>Fill in the details to upload a new image to the gallery.</DialogDescription>
                </DialogHeader>
                <ImageForm />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search images..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full sm:w-[180px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {paginatedImages.length === 0 ? (
            <div className="text-center py-12">
              <Images className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No images found</h3>
              <p className="text-gray-500 mb-6">Get started by uploading a new image.</p>
              <Button 
                onClick={() => setIsCreateDialogOpen(true)}
                className="bg-blue-950 hover:bg-blue-900 text-yellow-500"
              >
                <Plus className="mr-2 h-4 w-4" />
                Upload First Image
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
                {paginatedImages.map((image) => (
                  <div key={image.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                        src={image.image_url}
                        alt={image.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleView(image)}
                            className="bg-white text-blue-950 hover:bg-gray-100"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => handleEdit(image)}
                            className="bg-white text-blue-950 hover:bg-gray-100"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="secondary"
                                className="bg-white text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Image</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{image.title}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(image.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-blue-950 truncate">{image.title}</h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{image.description}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {image.category}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          {formatDate(image.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-gray-600">
                    Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredImages.length)} of{" "}
                    {filteredImages.length} images
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
            </>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Image</DialogTitle>
            <DialogDescription>Update the image details below.</DialogDescription>
          </DialogHeader>
          <ImageForm />
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedImage?.title}</DialogTitle>
            <DialogDescription>{selectedImage?.description}</DialogDescription>
          </DialogHeader>
          {selectedImage && (
            <div className="space-y-4">
              <img
                src={selectedImage.image_url}
                alt={selectedImage.title}
                className="w-full h-auto rounded-lg"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Tag className="mr-2 h-4 w-4" />
                  <span>Category: {selectedImage.category || "Uncategorized"}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Hash className="mr-2 h-4 w-4" />
                  <span>Tags: {selectedImage.tags || "None"}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Uploaded: {formatDate(selectedImage.created_at)}</span>
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
