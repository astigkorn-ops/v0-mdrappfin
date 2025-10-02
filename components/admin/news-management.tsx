"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import PageEditor from "@/components/ui/TextEditor"
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
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Edit, Trash2, Save, X, AlertTriangle, Newspaper, Video, ImageIcon } from "lucide-react"
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa"

interface NewsArticle {
  id: number
  title: string
  content: string
  excerpt?: string
  category: string
  status: string
  media_type: string
  image_url?: string
  video_url?: string
  created_at: string
  updated_at: string
}

export default function NewsManagement() {
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([])
  const [currentArticles, setCurrentArticles] = useState<NewsArticle[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [mediaTypeFilter, setMediaTypeFilter] = useState("all")
  const [sortField, setSortField] = useState<keyof NewsArticle>("created_at")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [editorContent, setEditorContent] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    category: "",
    status: "draft",
    media_type: "text",
    image_url: "",
    video_url: "",
  })
  const supabase = createClient()

  useEffect(() => {
    fetchNewsArticles()
  }, [])

  useEffect(() => {
    handleFilterAndSort()
  }, [searchTerm, statusFilter, categoryFilter, mediaTypeFilter, sortField, sortDirection, newsArticles])

  const fetchNewsArticles = async () => {
    try {
      const { data, error } = await supabase.from("news_articles").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setNewsArticles(data || [])
    } catch (error) {
      console.error("Error fetching news articles:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFilterAndSort = () => {
    const filtered = newsArticles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (article.excerpt && article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesStatus = statusFilter === "all" || article.status === statusFilter
      const matchesCategory = categoryFilter === "all" || article.category === categoryFilter
      const matchesMediaType = mediaTypeFilter === "all" || article.media_type === mediaTypeFilter

      return matchesSearch && matchesStatus && matchesCategory && matchesMediaType
    })

    filtered.sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]

      if (sortDirection === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

    setCurrentArticles(filtered)
    setCurrentPage(1)
  }

  const handleSort = (field: keyof NewsArticle) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const SortIcon = ({ field }: { field: keyof NewsArticle }) => {
    if (sortField !== field) {
      return <FaSort className="ml-1" />
    }
    return sortDirection === "asc" ? (
      <FaSortUp className="text-primary ml-1" />
    ) : (
      <FaSortDown className="text-primary ml-1" />
    )
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const articleData = {
      ...formData,
      content: editorContent,
    }

    try {
      if (editingId) {
        const { error } = await supabase.from("news_articles").update(articleData).eq("id", editingId)
        if (error) throw error
        alert("News article updated successfully!")
      } else {
        const { error } = await supabase.from("news_articles").insert([articleData])
        if (error) throw error
        alert("News article created successfully!")
      }

      resetForm()
      fetchNewsArticles()
    } catch (error) {
      console.error("Error saving news article:", error)
      alert("Error saving news article. Please try again.")
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      category: "",
      status: "draft",
      media_type: "text",
      image_url: "",
      video_url: "",
    })
    setEditorContent("")
    setEditingId(null)
  }

  const editArticle = (article: NewsArticle) => {
    setFormData({
      title: article.title,
      excerpt: article.excerpt || "",
      category: article.category,
      status: article.status,
      media_type: article.media_type,
      image_url: article.image_url || "",
      video_url: article.video_url || "",
    })
    setEditorContent(article.content)
    setEditingId(article.id)
  }

  const deleteArticle = (id: number) => {
    setDeleteId(id)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    if (!deleteId) return

    try {
      const { error } = await supabase.from("news_articles").delete().eq("id", deleteId)

      if (error) throw error

      alert("News article deleted successfully!")
      fetchNewsArticles()
    } catch (error) {
      console.error("Error deleting news article:", error)
      alert("Error deleting news article. Please try again.")
    } finally {
      setShowDeleteModal(false)
      setDeleteId(null)
    }
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedArticles = currentArticles.slice(startIndex, endIndex)
  const totalPages = Math.ceil(currentArticles.length / itemsPerPage)

  if (isLoading) {
    return (
      <main className="flex-1 overflow-y-auto p-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading news articles...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 overflow-y-auto p-6">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <Newspaper className="text-accent h-8 w-8" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">News & Updates Management</h1>
        <p className="text-muted-foreground">Create, read, update, and delete news articles and updates</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Form */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
              <CardTitle>{editingId ? "Edit News Article" : "Create New Article"}</CardTitle>
              <CardDescription className="text-primary-foreground/80">Fill in the details below</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Title <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter article title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Brief summary of the article"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">
                    Category <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="breaking">Breaking News</SelectItem>
                      <SelectItem value="community">Community</SelectItem>
                      <SelectItem value="disaster">Disaster Response</SelectItem>
                      <SelectItem value="preparedness">Preparedness</SelectItem>
                      <SelectItem value="training">Training</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="media_type">
                    Media Type <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.media_type}
                    onValueChange={(value) => setFormData({ ...formData, media_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select media type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text Only</SelectItem>
                      <SelectItem value="image">With Image</SelectItem>
                      <SelectItem value="video">With Video</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.media_type === "image" && (
                  <div className="space-y-2">
                    <Label htmlFor="image_url">Image URL</Label>
                    <Input
                      id="image_url"
                      type="url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                )}

                {formData.media_type === "video" && (
                  <div className="space-y-2">
                    <Label htmlFor="video_url">Video URL</Label>
                    <Input
                      id="video_url"
                      type="url"
                      value={formData.video_url}
                      onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                      placeholder="https://youtube.com/watch?v=..."
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label>
                    Content <span className="text-destructive">*</span>
                  </Label>
                  <div className="border rounded-lg">
                    <PageEditor initialContent={editorContent} onChange={setEditorContent} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">
                    Status <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex space-x-3 pt-2">
                  <Button type="submit" className="flex-1">
                    <Save className="mr-2 h-4 w-4" />
                    {editingId ? "Update" : "Save"}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Table */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="bg-gradient-to-r from-accent to-accent/80">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle className="text-primary">News Articles</CardTitle>
                  <CardDescription className="text-primary/80">Manage all news articles</CardDescription>
                </div>
                <div className="mt-3 md:mt-0">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search articles..."
                      className="pl-10 w-full md:w-64"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="breaking">Breaking News</SelectItem>
                    <SelectItem value="community">Community</SelectItem>
                    <SelectItem value="disaster">Disaster Response</SelectItem>
                    <SelectItem value="preparedness">Preparedness</SelectItem>
                    <SelectItem value="training">Training</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={mediaTypeFilter} onValueChange={setMediaTypeFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by media" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Media Types</SelectItem>
                    <SelectItem value="text">Text Only</SelectItem>
                    <SelectItem value="image">With Image</SelectItem>
                    <SelectItem value="video">With Video</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                  <SelectTrigger className="w-full sm:w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 per page</SelectItem>
                    <SelectItem value="10">10 per page</SelectItem>
                    <SelectItem value="25">25 per page</SelectItem>
                    <SelectItem value="50">50 per page</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead
                        className="cursor-pointer hover:bg-muted/50 select-none"
                        onClick={() => handleSort("title")}
                      >
                        <div className="flex items-center">
                          Title
                          <SortIcon field="title" />
                        </div>
                      </TableHead>
                      <TableHead
                        className="cursor-pointer hover:bg-muted/50 select-none"
                        onClick={() => handleSort("category")}
                      >
                        <div className="flex items-center">
                          Category
                          <SortIcon field="category" />
                        </div>
                      </TableHead>
                      <TableHead
                        className="cursor-pointer hover:bg-muted/50 select-none"
                        onClick={() => handleSort("media_type")}
                      >
                        <div className="flex items-center">
                          Media
                          <SortIcon field="media_type" />
                        </div>
                      </TableHead>
                      <TableHead
                        className="cursor-pointer hover:bg-muted/50 select-none"
                        onClick={() => handleSort("status")}
                      >
                        <div className="flex items-center">
                          Status
                          <SortIcon field="status" />
                        </div>
                      </TableHead>
                      <TableHead
                        className="cursor-pointer hover:bg-muted/50 select-none"
                        onClick={() => handleSort("created_at")}
                      >
                        <div className="flex items-center">
                          Date
                          <SortIcon field="created_at" />
                        </div>
                      </TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedArticles.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          <div className="text-muted-foreground">
                            <Newspaper className="h-12 w-12 mx-auto mb-2 opacity-50" />
                            <p>No news articles found</p>
                            {(searchTerm ||
                              statusFilter !== "all" ||
                              categoryFilter !== "all" ||
                              mediaTypeFilter !== "all") && (
                              <p className="text-sm mt-1">Try adjusting your search or filters</p>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      paginatedArticles.map((article) => (
                        <TableRow key={article.id}>
                          <TableCell>
                            <div className="font-medium">{article.title}</div>
                            <div className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {article.excerpt || article.content.replace(/<[^>]*>/g, "").substring(0, 100)}...
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                article.category === "breaking"
                                  ? "destructive"
                                  : article.category === "disaster"
                                    ? "destructive"
                                    : article.category === "community"
                                      ? "default"
                                      : "secondary"
                              }
                            >
                              {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              {article.media_type === "image" && <ImageIcon className="h-4 w-4 text-blue-500" />}
                              {article.media_type === "video" && <Video className="h-4 w-4 text-red-500" />}
                              <span className="text-sm capitalize">{article.media_type}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                article.status === "published"
                                  ? "default"
                                  : article.status === "draft"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {new Date(article.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm" onClick={() => editArticle(article)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => deleteArticle(article.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-muted-foreground">
                  Showing {Math.min(startIndex + 1, currentArticles.length)} to{" "}
                  {Math.min(endIndex, currentArticles.length)} of {currentArticles.length} articles
                  {currentArticles.length !== newsArticles.length && (
                    <span className="ml-1">(filtered from {newsArticles.length} total)</span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
                    First
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground px-2">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={currentPage === totalPages}
                  >
                    Last
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-destructive/10 mx-auto mb-4">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <DialogTitle className="text-center">Delete News Article</DialogTitle>
            <DialogDescription className="text-center">
              Are you sure you want to delete this news article? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex space-x-3">
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
