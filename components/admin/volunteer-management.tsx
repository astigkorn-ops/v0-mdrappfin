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
import { Search, Users, Eye, Trash2, AlertTriangle } from "lucide-react"
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa"

interface VolunteerApplication {
  id: number
  full_name: string
  email: string
  phone: string
  age: number
  address: string
  skills: string
  availability: string
  motivation: string
  status: string
  created_at: string
}

export default function VolunteerManagement() {
  const [applications, setApplications] = useState<VolunteerApplication[]>([])
  const [currentApplications, setCurrentApplications] = useState<VolunteerApplication[]>([])
  const [selectedApplication, setSelectedApplication] = useState<VolunteerApplication | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortField, setSortField] = useState<keyof VolunteerApplication>("created_at")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchApplications()
  }, [])

  useEffect(() => {
    handleFilterAndSort()
  }, [searchTerm, statusFilter, sortField, sortDirection, applications])

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from("volunteer_applications")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      setApplications(data || [])
    } catch (error) {
      console.error("Error fetching volunteer applications:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFilterAndSort = () => {
    const filtered = applications.filter((application) => {
      const matchesSearch =
        application.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        application.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        application.skills.toLowerCase().includes(searchTerm.toLowerCase()) ||
        application.address.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || application.status === statusFilter

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

    setCurrentApplications(filtered)
    setCurrentPage(1)
  }

  const handleSort = (field: keyof VolunteerApplication) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const SortIcon = ({ field }: { field: keyof VolunteerApplication }) => {
    if (sortField !== field) {
      return <FaSort className="ml-1" />
    }
    return sortDirection === "asc" ? (
      <FaSortUp className="text-primary ml-1" />
    ) : (
      <FaSortDown className="text-primary ml-1" />
    )
  }

  const viewApplication = (application: VolunteerApplication) => {
    setSelectedApplication(application)
    setShowViewModal(true)
  }

  const updateApplicationStatus = async (id: number, status: string) => {
    try {
      const { error } = await supabase.from("volunteer_applications").update({ status }).eq("id", id)
      if (error) throw error
      fetchApplications()
    } catch (error) {
      console.error("Error updating application status:", error)
    }
  }

  const deleteApplication = (id: number) => {
    setDeleteId(id)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    if (!deleteId) return

    try {
      const { error } = await supabase.from("volunteer_applications").delete().eq("id", deleteId)

      if (error) throw error

      alert("Volunteer application deleted successfully!")
      fetchApplications()
    } catch (error) {
      console.error("Error deleting volunteer application:", error)
      alert("Error deleting volunteer application. Please try again.")
    } finally {
      setShowDeleteModal(false)
      setDeleteId(null)
    }
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedApplications = currentApplications.slice(startIndex, endIndex)
  const totalPages = Math.ceil(currentApplications.length / itemsPerPage)

  if (isLoading) {
    return (
      <main className="flex-1 overflow-y-auto p-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading volunteer applications...</p>
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
            <Users className="text-accent h-8 w-8" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">Volunteer Application Management</h1>
        <p className="text-muted-foreground">View and manage volunteer applications from residents</p>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader className="bg-gradient-to-r from-accent to-accent/80">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-primary">Volunteer Applications</CardTitle>
              <CardDescription className="text-primary/80">Manage all volunteer applications</CardDescription>
            </div>
            <div className="mt-3 md:mt-0">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search applications..."
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="active">Active</SelectItem>
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
                    onClick={() => handleSort("full_name")}
                  >
                    <div className="flex items-center">
                      Name
                      <SortIcon field="full_name" />
                    </div>
                  </TableHead>
                  <TableHead className="cursor-pointer hover:bg-muted/50 select-none" onClick={() => handleSort("age")}>
                    <div className="flex items-center">
                      Age
                      <SortIcon field="age" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50 select-none"
                    onClick={() => handleSort("skills")}
                  >
                    <div className="flex items-center">
                      Skills
                      <SortIcon field="skills" />
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
                {paginatedApplications.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="text-muted-foreground">
                        <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>No volunteer applications found</p>
                        {(searchTerm || statusFilter !== "all") && (
                          <p className="text-sm mt-1">Try adjusting your search or filters</p>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedApplications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell>
                        <div className="font-medium">{application.full_name}</div>
                        <div className="text-sm text-muted-foreground">{application.email}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{application.age}</div>
                        <div className="text-sm text-muted-foreground">{application.phone}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm line-clamp-2">{application.skills.substring(0, 50)}...</div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            application.status === "approved"
                              ? "default"
                              : application.status === "active"
                                ? "secondary"
                                : application.status === "rejected"
                                  ? "destructive"
                                  : "outline"
                          }
                        >
                          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(application.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => viewApplication(application)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => deleteApplication(application.id)}>
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
              Showing {Math.min(startIndex + 1, currentApplications.length)} to{" "}
              {Math.min(endIndex, currentApplications.length)} of {currentApplications.length} applications
              {currentApplications.length !== applications.length && (
                <span className="ml-1">(filtered from {applications.length} total)</span>
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

      {/* View Application Modal */}
      <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Volunteer Application Details</DialogTitle>
          </DialogHeader>
          {selectedApplication && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Full Name</Label>
                  <p className="text-sm text-muted-foreground">{selectedApplication.full_name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Age</Label>
                  <p className="text-sm text-muted-foreground">{selectedApplication.age}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <p className="text-sm text-muted-foreground">{selectedApplication.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Phone</Label>
                  <p className="text-sm text-muted-foreground">{selectedApplication.phone}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Address</Label>
                <p className="text-sm text-muted-foreground">{selectedApplication.address}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Skills</Label>
                <Textarea value={selectedApplication.skills} readOnly className="min-h-[80px] resize-none" />
              </div>
              <div>
                <Label className="text-sm font-medium">Availability</Label>
                <Textarea value={selectedApplication.availability} readOnly className="min-h-[80px] resize-none" />
              </div>
              <div>
                <Label className="text-sm font-medium">Motivation</Label>
                <Textarea value={selectedApplication.motivation} readOnly className="min-h-[100px] resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Select
                    value={selectedApplication.status}
                    onValueChange={(value) => {
                      updateApplicationStatus(selectedApplication.id, value)
                      setSelectedApplication({ ...selectedApplication, status: value })
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium">Date Applied</Label>
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedApplication.created_at).toLocaleString()}
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
            <DialogTitle className="text-center">Delete Volunteer Application</DialogTitle>
            <DialogDescription className="text-center">
              Are you sure you want to delete this volunteer application? This action cannot be undone.
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
