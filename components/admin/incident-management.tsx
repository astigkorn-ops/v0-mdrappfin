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
import { Search, AlertTriangle, Eye, Trash2, Shield } from "lucide-react"
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa"

interface IncidentReport {
  id: number
  reporter_name: string
  contact_number: string
  barangay: string
  specific_location: string
  incident_type: string
  incident_description: string
  urgency_level: string
  status: string
  created_at: string
}

export default function IncidentManagement() {
  const [incidents, setIncidents] = useState<IncidentReport[]>([])
  const [currentIncidents, setCurrentIncidents] = useState<IncidentReport[]>([])
  const [selectedIncident, setSelectedIncident] = useState<IncidentReport | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [urgencyFilter, setUrgencyFilter] = useState("all")
  const [sortField, setSortField] = useState<keyof IncidentReport>("created_at")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchIncidents()
  }, [])

  useEffect(() => {
    handleFilterAndSort()
  }, [searchTerm, statusFilter, urgencyFilter, sortField, sortDirection, incidents])

  const fetchIncidents = async () => {
    try {
      const { data, error } = await supabase
        .from("incident_reports")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      setIncidents(data || [])
    } catch (error) {
      console.error("Error fetching incident reports:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFilterAndSort = () => {
    const filtered = incidents.filter((incident) => {
      const matchesSearch =
        incident.reporter_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        incident.incident_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        incident.incident_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        incident.barangay.toLowerCase().includes(searchTerm.toLowerCase()) ||
        incident.specific_location.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || incident.status === statusFilter
      const matchesUrgency = urgencyFilter === "all" || incident.urgency_level === urgencyFilter

      return matchesSearch && matchesStatus && matchesUrgency
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

    setCurrentIncidents(filtered)
    setCurrentPage(1)
  }

  const handleSort = (field: keyof IncidentReport) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const SortIcon = ({ field }: { field: keyof IncidentReport }) => {
    if (sortField !== field) {
      return <FaSort className="ml-1" />
    }
    return sortDirection === "asc" ? (
      <FaSortUp className="text-primary ml-1" />
    ) : (
      <FaSortDown className="text-primary ml-1" />
    )
  }

  const viewIncident = (incident: IncidentReport) => {
    setSelectedIncident(incident)
    setShowViewModal(true)
  }

  const updateIncidentStatus = async (id: number, status: string) => {
    try {
      const { error } = await supabase.from("incident_reports").update({ status }).eq("id", id)
      if (error) throw error
      fetchIncidents()
    } catch (error) {
      console.error("Error updating incident status:", error)
    }
  }

  const deleteIncident = (id: number) => {
    setDeleteId(id)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    if (!deleteId) return

    try {
      const { error } = await supabase.from("incident_reports").delete().eq("id", deleteId)

      if (error) throw error

      alert("Incident report deleted successfully!")
      fetchIncidents()
    } catch (error) {
      console.error("Error deleting incident report:", error)
      alert("Error deleting incident report. Please try again.")
    } finally {
      setShowDeleteModal(false)
      setDeleteId(null)
    }
  }

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedIncidents = currentIncidents.slice(startIndex, endIndex)
  const totalPages = Math.ceil(currentIncidents.length / itemsPerPage)

  if (isLoading) {
    return (
      <main className="flex-1 overflow-y-auto p-6">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading incident reports...</p>
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
            <Shield className="text-accent h-8 w-8" />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">Incident Report Management</h1>
        <p className="text-muted-foreground">View and manage incident reports from residents</p>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader className="bg-gradient-to-r from-accent to-accent/80">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-primary">Incident Reports</CardTitle>
              <CardDescription className="text-primary/80">Manage all incident reports</CardDescription>
            </div>
            <div className="mt-3 md:mt-0">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search incidents..."
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
                <SelectItem value="investigating">Investigating</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by urgency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Urgency</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="LOW">Low</SelectItem>
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
                    onClick={() => handleSort("reporter_name")}
                  >
                    <div className="flex items-center">
                      Reporter
                      <SortIcon field="reporter_name" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50 select-none"
                    onClick={() => handleSort("incident_type")}
                  >
                    <div className="flex items-center">
                      Type
                      <SortIcon field="incident_type" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50 select-none"
                    onClick={() => handleSort("urgency_level")}
                  >
                    <div className="flex items-center">
                      Urgency
                      <SortIcon field="urgency_level" />
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
                {paginatedIncidents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="text-muted-foreground">
                        <Shield className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>No incident reports found</p>
                        {(searchTerm || statusFilter !== "all" || urgencyFilter !== "all") && (
                          <p className="text-sm mt-1">Try adjusting your search or filters</p>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedIncidents.map((incident) => (
                    <TableRow key={incident.id}>
                      <TableCell>
                        <div className="font-medium">{incident.reporter_name}</div>
                        <div className="text-sm text-muted-foreground">{incident.contact_number}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{incident.incident_type}</div>
                        <div className="text-sm text-muted-foreground">{incident.barangay}</div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            incident.urgency_level === "HIGH"
                              ? "destructive"
                              : incident.urgency_level === "MEDIUM"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {incident.urgency_level}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            incident.status === "resolved"
                              ? "default"
                              : incident.status === "investigating"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(incident.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => viewIncident(incident)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => deleteIncident(incident.id)}>
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
              Showing {Math.min(startIndex + 1, currentIncidents.length)} to{" "}
              {Math.min(endIndex, currentIncidents.length)} of {currentIncidents.length} incidents
              {currentIncidents.length !== incidents.length && (
                <span className="ml-1">(filtered from {incidents.length} total)</span>
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

      {/* View Incident Modal */}
      <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Incident Report Details</DialogTitle>
          </DialogHeader>
          {selectedIncident && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Reporter Name</Label>
                  <p className="text-sm text-muted-foreground">{selectedIncident.reporter_name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Contact Number</Label>
                  <p className="text-sm text-muted-foreground">{selectedIncident.contact_number}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Barangay</Label>
                  <p className="text-sm text-muted-foreground">{selectedIncident.barangay}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Specific Location</Label>
                  <p className="text-sm text-muted-foreground">{selectedIncident.specific_location}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Incident Type</Label>
                  <p className="text-sm text-muted-foreground">{selectedIncident.incident_type}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Urgency Level</Label>
                  <Badge
                    variant={
                      selectedIncident.urgency_level === "HIGH"
                        ? "destructive"
                        : selectedIncident.urgency_level === "MEDIUM"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {selectedIncident.urgency_level}
                  </Badge>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Incident Description</Label>
                <Textarea
                  value={selectedIncident.incident_description}
                  readOnly
                  className="min-h-[120px] resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Select
                    value={selectedIncident.status}
                    onValueChange={(value) => {
                      updateIncidentStatus(selectedIncident.id, value)
                      setSelectedIncident({ ...selectedIncident, status: value })
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="investigating">Investigating</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium">Date Reported</Label>
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedIncident.created_at).toLocaleString()}
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
            <DialogTitle className="text-center">Delete Incident Report</DialogTitle>
            <DialogDescription className="text-center">
              Are you sure you want to delete this incident report? This action cannot be undone.
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
