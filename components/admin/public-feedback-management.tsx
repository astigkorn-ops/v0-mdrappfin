"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { MessageSquare, Search, CreditCard as Edit, Trash2, Eye, Tag, ThumbsUp, ThumbsDown, Lightbulb } from "lucide-react"

interface Feedback {
  id: string
  name: string
  email: string
  subject: string
  message: string
  category: "complaint" | "suggestion" | "compliment" | "inquiry"
  sentiment: "positive" | "negative" | "neutral"
  status: "new" | "reviewed" | "responded" | "closed"
  tags: string[]
  priority: "low" | "medium" | "high"
  createdDate: string
  respondedDate?: string
  assignedTo?: string
}

const mockFeedback: Feedback[] = [
  {
    id: "1",
    name: "Juan Dela Cruz",
    email: "juan@email.com",
    subject: "Suggestion for Emergency Evacuation Routes",
    message: "I would like to suggest adding more evacuation route signs in our barangay to help residents during emergencies.",
    category: "suggestion",
    sentiment: "positive",
    status: "new",
    tags: ["evacuation", "signage", "barangay"],
    priority: "medium",
    createdDate: "2024-01-15"
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria@email.com", 
    subject: "Complaint about Response Time",
    message: "The response time during the last flood incident was too slow. We need faster emergency response.",
    category: "complaint",
    sentiment: "negative",
    status: "reviewed",
    tags: ["response-time", "flood", "emergency"],
    priority: "high",
    createdDate: "2024-01-14",
    respondedDate: "2024-01-15",
    assignedTo: "Response Coordinator"
  }
]

export default function PublicFeedbackManagement() {
  const [feedback, setFeedback] = useState<Feedback[]>(mockFeedback)
  const [selectedFeedback, setSelectedFeedback] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sentimentFilter, setSentimentFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  const filteredFeedback = feedback.filter(item => {
    const matchesSearch = item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
    const matchesSentiment = sentimentFilter === "all" || item.sentiment === sentimentFilter
    
    return matchesSearch && matchesStatus && matchesCategory && matchesSentiment
  })

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive": return <ThumbsUp className="h-4 w-4 text-green-600" />
      case "negative": return <ThumbsDown className="h-4 w-4 text-red-600" />
      case "neutral": return <MessageSquare className="h-4 w-4 text-gray-600" />
      default: return <MessageSquare className="h-4 w-4 text-gray-600" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "suggestion": return <Lightbulb className="h-4 w-4 text-yellow-600" />
      case "complaint": return <ThumbsDown className="h-4 w-4 text-red-600" />
      case "compliment": return <ThumbsUp className="h-4 w-4 text-green-600" />
      case "inquiry": return <MessageSquare className="h-4 w-4 text-blue-600" />
      default: return <MessageSquare className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-blue-100 text-blue-800"
      case "reviewed": return "bg-yellow-100 text-yellow-800"
      case "responded": return "bg-green-100 text-green-800"
      case "closed": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800"
      case "medium": return "bg-yellow-100 text-yellow-800"
      case "low": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const totalPages = Math.ceil(filteredFeedback.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedFeedback = filteredFeedback.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-950">Public Feedback Management</h1>
          <p className="text-gray-600">Manage and respond to citizen feedback and suggestions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Tag className="mr-2 h-4 w-4" />
            Manage Tags
          </Button>
          <Button className="bg-blue-950 hover:bg-blue-800 text-yellow-500">
            Export Data
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">New Feedback</p>
                <p className="text-2xl font-bold text-blue-950">
                  {feedback.filter(f => f.status === "new").length}
                </p>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Positive</p>
                <p className="text-2xl font-bold text-green-600">
                  {feedback.filter(f => f.sentiment === "positive").length}
                </p>
              </div>
              <ThumbsUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Negative</p>
                <p className="text-2xl font-bold text-red-600">
                  {feedback.filter(f => f.sentiment === "negative").length}
                </p>
              </div>
              <ThumbsDown className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Suggestions</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {feedback.filter(f => f.category === "suggestion").length}
                </p>
              </div>
              <Lightbulb className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search feedback..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="reviewed">Reviewed</SelectItem>
                <SelectItem value="responded">Responded</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="complaint">Complaint</SelectItem>
                <SelectItem value="suggestion">Suggestion</SelectItem>
                <SelectItem value="compliment">Compliment</SelectItem>
                <SelectItem value="inquiry">Inquiry</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sentimentFilter} onValueChange={setSentimentFilter}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Sentiment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sentiment</SelectItem>
                <SelectItem value="positive">Positive</SelectItem>
                <SelectItem value="negative">Negative</SelectItem>
                <SelectItem value="neutral">Neutral</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Feedback Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Public Feedback
          </CardTitle>
          <CardDescription>
            Citizen feedback, suggestions, and complaints
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
                  <TableHead>Feedback</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Sentiment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedFeedback.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-blue-950">{item.subject}</div>
                        <div className="text-sm text-gray-600">From: {item.name}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{item.message}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {getCategoryIcon(item.category)}
                        <span className="ml-2 capitalize">{item.category}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {getSentimentIcon(item.sentiment)}
                        <span className="ml-2 capitalize">{item.sentiment}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(item.priority)}>
                        {item.priority}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {new Date(item.createdDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
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
