"use client"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Textarea } from "@/components/ui/textarea"
import { Search, Mail, Eye, Trash2, AlertTriangle, MessageSquare } from "lucide-react"
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa"

interface ContactMessage {
  id: number
  subject: string
  message: string
  user_name: string
  user_email: string
  status: string
  created_at: string
}

export default function ContactManagement() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [currentMessages, setCurrentMessages] = useState<ContactMessage[]>([])
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortField, setSortField] = useState<keyof ContactMessage>("created_at")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchMessages()
  }, [])

  useEffect(() => {
    handleFilterAndSort()
  }, [searchTerm, statusFilter, sortField, sortDirection, messages])

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      setMessages(data || [])
    } catch (error) {
      console.error("Error fetching contact messages:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFilterAndSort = () => {
    const filtered = messages.filter((message) => {
      const matchesSearch =
        message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.user_email.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || message.status === statusFilter

      return matchesSearch && matchesStatus
    })

    filtered.sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]

      if (aValue === undefined && bValue === undefined) return 0
      if (aValue === undefined) return 1
      if (bValue === undefined) return -1

      if (sortDirection === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

    setCurrentMessages(filtered)
    setCurrentPage(1)
  }

  const handleSort = (field: keyof ContactMessage) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const SortIcon = ({ field }: { field: keyof ContactMessage }) => {
    if (sortField !== field) {
      return <FaSort className="ml-1" />
    }
    return sortDirection === "asc" ? (
      <FaSortUp className="text-primary ml-1" />
    ) : (
      <FaSortDown className="text-primary ml-1" />
    )
  }

  const viewMessage = (message: ContactMessage) => {
    setSelectedMessage(message)
    setShowViewModal(true)
    // Mark as read if it's new
    if (message.status === "new") {
      updateMessageStatus(message.id, "read")
    }
  }

  const updateMessageStatus = async (id: number, status: string) => {
    try {
      const { error } = await supabase.from("contact_messages").update({ status }).eq("id", id)
      if (error) throw error
      fetchMessages()
    } catch (error) {
      console.error("Error updating message status:", error)
    }
  }

  const deleteMessage = (id: number) => {
    setDeleteId(id)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    if (!deleteId) return

    try {
      const { error } = await supabase.from("contact_messages").delete().eq("id", deleteId)

      if (error) throw error

      alert("Contact message deleted successfully!")
      fetchMessages()
    } catch (error) {
      console.error("Error deleting contact message:", error)
      alert("Error deleting contact message. Please try again.")
    } finally {
      setShowDeleteModal(false)
      setDeleteId(null)
    }
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedMessages = currentMessages.slice(startIndex, endIndex)
  const totalPages = Math.ceil(currentMessages.length / itemsPerPage)

  if (isLoading) {
    return (
      <main className="flex-1 overflow-y-auto p-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading contact messages...</p>
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
            <MessageSquare className="text-accent h-8 w-8" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">Contact Message Management</h1>
        <p className="text-muted-foreground">View and manage contact messages from residents</p>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader className="bg-gradient-to-r from-accent to-accent/80">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-primary">Contact Messages</CardTitle>
              <CardDescription className="text-primary/80">Manage all contact messages</CardDescription>
            </div>
            <div className="mt-3 md:mt-0">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search messages..."
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
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
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
                    onClick={() => handleSort("user_name")}
                  >
                    <div className="flex items-center">
                      Name
                      <SortIcon field="user_name" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50 select-none"
                    onClick={() => handleSort("subject")}
                  >
                    <div className="flex items-center">
                      Subject
                      <SortIcon field="subject" />
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
                {paginatedMessages.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <div className="text-muted-foreground">
                        <Mail className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>No contact messages found</p>
                        {(searchTerm || statusFilter !== "all") && (
                          <p className="text-sm mt-1">Try adjusting your search or filters</p>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedMessages.map((message) => (
                    <TableRow key={message.id}>
                      <TableCell>
                        <div className="font-medium">{message.user_name}</div>
                        <div className="text-sm text-muted-foreground">{message.user_email}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{message.subject}</div>
                        <div className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {message.message.substring(0, 100)}...
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            message.status === "new"
                              ? "destructive"
                              : message.status === "read"
                                ? "secondary"
                                : "default"
                          }
                        >
                          {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(message.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => viewMessage(message)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => deleteMessage(message.id)}>
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
              Showing {Math.min(startIndex + 1, currentMessages.length)} to {Math.min(endIndex, currentMessages.length)}{" "}
              of {currentMessages.length} messages
              {currentMessages.length !== messages.length && (
                <span className="ml-1">(filtered from {messages.length} total)</span>
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

      {/* View Message Modal */}
      <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Contact Message Details</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Name</Label>
                  <p className="text-sm text-muted-foreground">{selectedMessage.user_name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <p className="text-sm text-muted-foreground">{selectedMessage.user_email}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Subject</Label>
                <p className="text-sm text-muted-foreground">{selectedMessage.subject}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Message</Label>
                <Textarea value={selectedMessage.message} readOnly className="min-h-[120px] resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Select
                    value={selectedMessage.status}
                    onValueChange={(value) => {
                      updateMessageStatus(selectedMessage.id, value)
                      setSelectedMessage({ ...selectedMessage, status: value })
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="read">Read</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium">Date Received</Label>
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedMessage.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowViewModal(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-destructive/10 mx-auto mb-4">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <DialogTitle className="text-center">Delete Contact Message</DialogTitle>
            <DialogDescription className="text-center">
              Are you sure you want to delete this contact message? This action cannot be undone.
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
