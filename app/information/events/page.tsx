"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"

export default function EventsPage() {
  const [currentMonth, setCurrentMonth] = useState("October 2023")

  const events = [
    {
      id: 1,
      title: "Annual Disaster Preparedness Seminar",
      date: "Oct 25, 2023",
      time: "9:00 AM - 4:00 PM",
      location: "Municipal Hall, Pio Duran",
      category: "Training & Seminars",
      description:
        "Join us for our annual seminar covering earthquake preparedness, flood response protocols, and community emergency planning strategies.",
    },
    {
      id: 2,
      title: "Fire Safety Training for Schools",
      date: "Nov 5, 2023",
      time: "8:00 AM - 12:00 PM",
      location: "Pio Duran Central School",
      category: "Training & Seminars",
      description:
        "Comprehensive fire safety training program for teachers and students including evacuation drills and fire extinguisher usage.",
    },
    {
      id: 3,
      title: "Community Flood Drill",
      date: "Nov 18, 2023",
      time: "7:00 AM - 10:00 AM",
      location: "Low-lying Areas, Pio Duran",
      category: "Community Drills",
      description:
        "Annual community-wide flood evacuation drill involving all barangays. Practice your evacuation routes and procedures.",
    },
    {
      id: 4,
      title: "First Aid Certification Course",
      date: "Dec 2, 2023",
      time: "9:00 AM - 5:00 PM",
      location: "MDRRMO Office, Pio Duran",
      category: "Training & Seminars",
      description:
        "Get certified in basic first aid and CPR. Learn life-saving techniques for emergency situations in your community.",
    },
    {
      id: 5,
      title: "Christmas Disaster Preparedness Drive",
      date: "Dec 15, 2023",
      time: "10:00 AM - 3:00 PM",
      location: "Public Market, Pio Duran",
      category: "Awareness Campaigns",
      description:
        "Holiday safety awareness campaign focusing on fire prevention and emergency preparedness during the festive season.",
    },
    {
      id: 6,
      title: "New Year Emergency Response Workshop",
      date: "Jan 10, 2024",
      time: "8:00 AM - 4:00 PM",
      location: "MDRRMO Training Center",
      category: "Training & Seminars",
      description:
        "Advanced emergency response workshop for barangay officials and volunteer responders. Covers new protocols and equipment.",
    },
  ]

  const upcomingEvents = events.slice(0, 3)

  const categories = [
    { name: "Training & Seminars", count: 12, icon: "fas fa-graduation-cap" },
    { name: "Community Drills", count: 8, icon: "fas fa-users" },
    { name: "Volunteer Activities", count: 5, icon: "fas fa-hands-helping" },
    { name: "Awareness Campaigns", count: 7, icon: "fas fa-bullhorn" },
    { name: "Recognition Events", count: 3, icon: "fas fa-trophy" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="bg-blue-950 text-white py-8 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Events & Activities</h1>
          <p className="text-xl text-blue-100">Upcoming programs and activities organized by MDRRMO Pio Duran</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            {/* Events Grid */}
            <div className="space-y-6">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center">
                    <div className="text-center text-white">
                      <i className="fas fa-calendar-alt text-4xl mb-2"></i>
                      <p className="font-semibold">{event.title}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="inline-block bg-blue-950 text-white px-3 py-1 rounded-full text-sm font-semibold mb-3">
                      {event.date}
                    </span>
                    <h3 className="text-xl font-bold text-blue-950 mb-3">{event.title}</h3>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <div className="space-y-2 mb-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <i className="far fa-clock text-blue-950 mr-2"></i>
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center">
                        <i className="fas fa-map-marker-alt text-blue-950 mr-2"></i>
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <button className="bg-blue-950 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/3">
            {/* Calendar Widget */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-blue-950 pb-2 border-b-2 border-yellow-500">{currentMonth}</h3>
                <div className="flex space-x-2">
                  <button className="text-blue-950 hover:text-blue-700">
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button className="text-blue-950 hover:text-blue-700">
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="bg-blue-950 text-white">
                    <th className="p-2 text-center text-sm">Sun</th>
                    <th className="p-2 text-center text-sm">Mon</th>
                    <th className="p-2 text-center text-sm">Tue</th>
                    <th className="p-2 text-center text-sm">Wed</th>
                    <th className="p-2 text-center text-sm">Thu</th>
                    <th className="p-2 text-center text-sm">Fri</th>
                    <th className="p-2 text-center text-sm">Sat</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 text-center text-gray-400 border">24</td>
                    <td className="p-2 text-center text-gray-400 border">25</td>
                    <td className="p-2 text-center text-gray-400 border">26</td>
                    <td className="p-2 text-center text-gray-400 border">27</td>
                    <td className="p-2 text-center text-gray-400 border">28</td>
                    <td className="p-2 text-center text-gray-400 border">29</td>
                    <td className="p-2 text-center text-gray-400 border">30</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-center border hover:bg-blue-50 cursor-pointer">1</td>
                    <td className="p-2 text-center border hover:bg-blue-50 cursor-pointer">2</td>
                    <td className="p-2 text-center border hover:bg-blue-50 cursor-pointer">3</td>
                    <td className="p-2 text-center border hover:bg-blue-50 cursor-pointer">4</td>
                    <td className="p-2 text-center border hover:bg-blue-50 cursor-pointer">5</td>
                    <td className="p-2 text-center border hover:bg-blue-50 cursor-pointer">6</td>
                    <td className="p-2 text-center border hover:bg-blue-50 cursor-pointer">7</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-center border hover:bg-blue-50 cursor-pointer">8</td>
                    <td className="p-2 text-center border hover:bg-blue-50 cursor-pointer">9</td>
                    <td className="p-2 text-center border hover:bg-blue-50 cursor-pointer">10</td>
                    <td className="p-2 text-center border hover:bg-blue-50 cursor-pointer">11</td>
                    <td className="p-2 text-center border hover:bg-blue-50 cursor-pointer">12</td>
                    <td className="p-2 text-center border hover:bg-blue-50 cursor-pointer">13</td>
                    <td className="p-2 text-center border hover:bg-blue-50 cursor-pointer">14</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-center border hover:bg-blue-50 cursor-pointer">15</td>
                    <td className="p-2 text-center border hover:bg-blue-50 cursor-pointer">16</td>
                    <td className="p-2 text-center border hover:bg-blue-50 cursor-pointer">17</td>
                    <td className="p-2 text-center border hover:bg-blue-50 cursor-pointer">18</td>
                    <td className="p-2 text-center border hover:bg-blue-50 cursor-pointer">19</td>
                    <td className="p-2 text-center border hover:bg-blue-50 cursor-pointer">20</td>
                    <td className="p-2 text-center border hover:bg-blue-50 cursor-pointer">21</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-center border hover:bg-blue-50 cursor-pointer">22</td>
                    <td className="p-2 text-center border hover:bg-blue-50 cursor-pointer">23</td>
                    <td className="p-2 text-center border hover:bg-blue-50 cursor-pointer">24</td>
                    <td className="p-2 text-center bg-blue-950 text-white font-bold border relative">
                      25
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-500 rounded-full"></div>
                    </td>
                    <td className="p-2 text-center border hover:bg-blue-50 cursor-pointer">26</td>
                    <td className="p-2 text-center border hover:bg-blue-50 cursor-pointer">27</td>
                    <td className="p-2 text-center border hover:bg-blue-50 cursor-pointer">28</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-center border hover:bg-blue-50 cursor-pointer">29</td>
                    <td className="p-2 text-center border hover:bg-blue-50 cursor-pointer">30</td>
                    <td className="p-2 text-center border hover:bg-blue-50 cursor-pointer">31</td>
                    <td className="p-2 text-center text-gray-400 border">1</td>
                    <td className="p-2 text-center text-gray-400 border">2</td>
                    <td className="p-2 text-center text-gray-400 border">3</td>
                    <td className="p-2 text-center text-gray-400 border">4</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Upcoming Events Widget */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-blue-950 mb-4 pb-2 border-b-2 border-yellow-500">
                Upcoming Events
              </h3>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="pb-4 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center mb-2">
                      <i className="far fa-calendar text-blue-950 mr-2"></i>
                      <strong className="text-sm">{event.date}</strong>
                    </div>
                    <h4 className="font-semibold text-blue-950 mb-1">{event.title}</h4>
                    <p className="text-sm text-gray-600">
                      {event.location}, {event.time.split(" - ")[0]}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories Widget */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-blue-950 mb-4 pb-2 border-b-2 border-yellow-500">
                Event Categories
              </h3>
              <div className="space-y-3">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-950 rounded-full flex items-center justify-center mr-3">
                        <i className={`${category.icon} text-white text-sm`}></i>
                      </div>
                      <a href="#" className="text-gray-700 hover:text-blue-950">
                        {category.name}
                      </a>
                    </div>
                    <span className="bg-yellow-500 text-blue-950 px-2 py-1 rounded-full text-sm font-semibold">
                      {category.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
