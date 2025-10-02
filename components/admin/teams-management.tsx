"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Team {
  id: string
  name: string
  description: string
  leader: string
  members: string[]
  status: "active" | "inactive"
  specialization: string
}

const mockTeams: Team[] = [
  {
    id: "1",
    name: "Emergency Response Team Alpha",
    description: "Primary emergency response unit for immediate disaster response",
    leader: "Juan Dela Cruz",
    members: ["Maria Santos", "Pedro Garcia", "Ana Lopez", "Carlos Rivera"],
    status: "active",
    specialization: "Emergency Response",
  },
  {
    id: "2",
    name: "Search and Rescue Team",
    description: "Specialized team for search and rescue operations",
    leader: "Maria Santos",
    members: ["Pedro Garcia", "Ana Lopez", "Miguel Torres"],
    status: "active",
    specialization: "Search & Rescue",
  },
]

export default function TeamsManagement() {
  const [teams, setTeams] = useState<Team[]>(mockTeams)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTeams = teams.filter(
    (team) =>
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.leader.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-blue-950">Team Assignments</h1>
          <p className="text-gray-600">Manage emergency response teams and assignments</p>
        </div>
        <Button className="bg-blue-950 hover:bg-blue-800 text-yellow-500">
          <i className="fas fa-plus mr-2"></i>
          Create Team
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search teams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTeams.map((team) => (
          <Card key={team.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg text-blue-950">{team.name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{team.description}</p>
                </div>
                <Badge variant={team.status === "active" ? "default" : "destructive"}>{team.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Specialization</span>
                <Badge variant="secondary">{team.specialization}</Badge>
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <i className="fas fa-user-tie mr-2 text-blue-950"></i>
                  <span className="text-sm font-medium text-gray-700">Team Leader</span>
                </div>
                <p className="text-sm text-blue-950 font-medium ml-6">{team.leader}</p>
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <i className="fas fa-users mr-2 text-blue-950"></i>
                  <span className="text-sm font-medium text-gray-700">Members ({team.members.length})</span>
                </div>
                <div className="ml-6 space-y-1">
                  {team.members.slice(0, 3).map((member, index) => (
                    <p key={index} className="text-sm text-gray-600">
                      {member}
                    </p>
                  ))}
                  {team.members.length > 3 && <p className="text-sm text-gray-500">+{team.members.length - 3} more</p>}
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <i className="fas fa-edit mr-1"></i>
                  Edit Team
                </Button>
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <i className="fas fa-users mr-1"></i>
                  Manage Members
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTeams.length === 0 && (
        <div className="text-center py-12">
          <i className="fas fa-user-check text-gray-400 text-4xl mb-4"></i>
          <p className="text-gray-500">No teams found matching your search.</p>
        </div>
      )}
    </div>
  )
}
