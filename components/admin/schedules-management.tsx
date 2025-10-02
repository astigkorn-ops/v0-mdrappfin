"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Schedule {
  id: string
  title: string
  description: string
  date: string
  time: string
  duration: string
  assignedTeam: string
  type: "training" | "patrol" | "maintenance" | "meeting"
  status: "scheduled" | "in-progress" | "completed" | "cancelled"
}

const mockSchedules: Schedule[] = [
  {
    id: "1",
    title: "Emergency Response Training",
    description: "Monthly emergency response drill and training session",
    date: "2024-01-15",
    time: "09:00",
    duration: "4 hours",
    assignedTeam: "Emergency Response Team Alpha",
    type: "training",
    status: "scheduled",
  },
  {
    id: "2",
    title: "Equipment Maintenance Check",
    description: "Regular maintenance and inspection of emergency equipment",
    date: "2024-01-16",
    time: "14:00",
    duration: "2 hours",
    assignedTeam: "Maintenance Team",
    type: "maintenance",
    status: "scheduled",
  },
]

export default function SchedulesManagement() {
  const [schedules, setSchedules] = useState<Schedule[]>(mockSchedules)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("all")

  const filteredSchedules = schedules.filter((schedule) => {
    const matchesSearch =
      schedule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.assignedTeam.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || schedule.type === filterType
    return matchesSearch && matchesType
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case "training":
        return "bg-blue-100 text-blue-800"
      case "patrol":
        return "bg-green-100 text-green-800"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800"
      case "meeting":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-blue-950">Schedules Management</h1>
          <p className="text-gray-600">Manage team schedules and assignments</p>
        </div>
        <Button className="bg-blue-950 hover:bg-blue-800 text-yellow-500">
          <i className="fas fa-plus mr-2"></i>
          Add Schedule
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search schedules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Types</option>
          <option value="training">Training</option>
          <option value="patrol">Patrol</option>
          <option value="maintenance">Maintenance</option>
          <option value="meeting">Meeting</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSchedules.map((schedule) => (
          <Card key={schedule.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg text-blue-950">{schedule.title}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{schedule.description}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Badge className={getStatusColor(schedule.status)}>{schedule.status}</Badge>
                  <Badge className={getTypeColor(schedule.type)}>{schedule.type}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center mb-1">
                    <i className="fas fa-calendar mr-2 text-blue-950"></i>
                    <span className="text-sm font-medium text-gray-700">Date</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-6">{schedule.date}</p>
                </div>
                <div>
                  <div className="flex items-center mb-1">
                    <i className="fas fa-clock mr-2 text-blue-950"></i>
                    <span className="text-sm font-medium text-gray-700">Time</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-6">{schedule.time}</p>
                </div>
              </div>

              <div>
                <div className="flex items-center mb-1">
                  <i className="fas fa-hourglass-half mr-2 text-blue-950"></i>
                  <span className="text-sm font-medium text-gray-700">Duration</span>
                </div>
                <p className="text-sm text-gray-600 ml-6">{schedule.duration}</p>
              </div>

              <div>
                <div className="flex items-center mb-1">
                  <i className="fas fa-users mr-2 text-blue-950"></i>
                  <span className="text-sm font-medium text-gray-700">Assigned Team</span>
                </div>
                <p className="text-sm text-blue-950 font-medium ml-6">{schedule.assignedTeam}</p>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <i className="fas fa-edit mr-1"></i>
                  Edit
                </Button>
                <Button size="sm" variant="outline" className="flex-1 text-red-600 hover:text-red-700 bg-transparent">
                  <i className="fas fa-times mr-1"></i>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSchedules.length === 0 && (
        <div className="text-center py-12">
          <i className="fas fa-calendar-check text-gray-400 text-4xl mb-4"></i>
          <p className="text-gray-500">No schedules found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
