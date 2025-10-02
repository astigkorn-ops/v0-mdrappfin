"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Search, Download, Eye, ChartBar as BarChart3, Users, Calendar } from "lucide-react"

interface Survey {
  id: string
  title: string
  description: string
  status: "active" | "closed" | "draft"
  responses: number
  createdDate: string
  endDate: string
  createdBy: string
}

interface SurveyResponse {
  id: string
  surveyId: string
  respondentName?: string
  respondentEmail?: string
  responses: Record<string, any>
  submittedDate: string
  ipAddress: string
}

const mockSurveys: Survey[] = [
  {
    id: "1",
    title: "Community Preparedness Assessment 2024",
    description: "Annual survey to assess community disaster preparedness levels",
    status: "active",
    responses: 234,
    createdDate: "2024-01-01",
    endDate: "2024-03-31",
    createdBy: "Admin User"
  },
  {
    id: "2",
    title: "Emergency Response Satisfaction Survey",
    description: "Feedback on recent emergency response effectiveness",
    status: "closed",
    responses: 89,
    createdDate: "2023-12-01",
    endDate: "2023-12-31",
    createdBy: "Response Coordinator"
  }
]

const mockResponses: SurveyResponse[] = [
  {
    id: "1",
    surveyId: "1",
    respondentName: "Juan Dela Cruz",
    respondentEmail: "juan@email.com",
    responses: {
      "preparedness_level": "Somewhat prepared",
      "emergency_kit": "Yes",
      "evacuation_plan": "No",
      "training_interest": "Very interested"
    },
    submittedDate: "2024-01-15T10:30:00Z",
    ipAddress: "192.168.1.1"
  }
]

export default function SurveyResponsesManagement() {
  const [surveys, setSurveys] = useState<Survey[]>(mockSurveys)
  const [responses, setResponses] = useState<SurveyResponse[]>(mockResponses)
  const [selectedSurvey, setSelectedSurvey] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  const filteredSurveys = surveys.filter(survey => {
    const matchesSearch = survey.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         survey.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || survey.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800"
      case "closed": return "bg-gray-100 text-gray-800"
      case "draft": return "bg-yellow-100 text-yellow-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const handleExportCSV = (surveyId: string) => {
    console.log(`Exporting CSV for survey: ${surveyId}`)
    // Implement CSV export functionality
  }

  const handleExportExcel = (surveyId: string) => {
    console.log(`Exporting Excel for survey: ${surveyId}`)
    // Implement Excel export functionality
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-950">Survey Responses Management</h1>
          <p className="text-gray-600">Manage surveys and analyze response data</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <BarChart3 className="mr-2 h-4 w-4" />
            View Analytics
          </Button>
          <Button className="bg-blue-950 hover:bg-blue-800 text-yellow-500">
            <FileText className="mr-2 h-4 w-4" />
            Create Survey
          </Button>
        </div>
      </div>

      {/* Survey Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Surveys</p>
                <p className="text-3xl font-bold text-blue-950">
                  {surveys.filter(s => s.status === "active").length}
                </p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Responses</p>
                <p className="text-3xl font-bold text-blue-950">
                  {surveys.reduce((sum, survey) => sum + survey.responses, 0)}
                </p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Response Rate</p>
                <p className="text-3xl font-bold text-blue-950">73%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-yellow-500" />
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
                placeholder="Search surveys..."
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Surveys Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Survey Management
          </CardTitle>
          <CardDescription>
            Manage surveys and export response data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Survey</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Responses</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSurveys.map((survey) => (
                  <TableRow key={survey.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-blue-950">{survey.title}</div>
                        <div className="text-sm text-gray-600 truncate max-w-xs">{survey.description}</div>
                        <div className="text-xs text-gray-500">Created by: {survey.createdBy}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(survey.status)}>
                        {survey.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="mr-1 h-3 w-3" />
                        {survey.responses}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {new Date(survey.createdDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {new Date(survey.endDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleExportCSV(survey.id)}>
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <BarChart3 className="h-4 w-4" />
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
