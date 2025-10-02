import React from 'react';
import { Calendar as CalendarIcon, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function CalendarSection() {
  // Get current date for reference
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  // Month names for display
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  // Get the first day of the month and the number of days
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
  
  // Create array of days for the calendar
  const calendarDays = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }
  
  // Fill remaining cells to make complete rows (6 weeks max = 42 days)
  while (calendarDays.length < 42) {
    calendarDays.push(null);
  }

  // Mock events data with proper date objects for comparison
  const events = [
    { date: new Date(2024, 7, 15), event: "Barangay-level First Aid Training", location: "Brgy. Hall" },
    { date: new Date(2024, 8, 5), event: "Municipal-wide Earthquake Drill", location: "Town Plaza" },
    { date: new Date(2025, 8, 28), event: "Flood Awareness Seminar", location: "Municipal Auditorium" },
    { date: new Date(2025, 9, 10), event: "Fire Safety Training", location: "Central Fire Station" },
    { date: new Date(2025, 10, 5), event: "Disaster Preparedness Workshop", location: "Municipal Hall" }
  ];

  // Helper function to get event status
  const getEventStatus = (eventDate: Date): 'past' | 'present' | 'upcoming' => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDay = new Date(eventDate);
    eventDay.setHours(0, 0, 0, 0);
    
    if (eventDay < today) {
      return 'past';
    } else if (eventDay > today) {
      return 'upcoming';
    } else {
      return 'present';
    }
  };

  // Helper function to get status color classes
  const getStatusColorClasses = (status: 'past' | 'present' | 'upcoming'): string => {
    switch (status) {
      case 'past':
        return 'bg-gray-100 border-l-4 border-gray-400';
      case 'present':
        return 'bg-yellow-50 border-l-4 border-yellow-500';
      case 'upcoming':
        return 'bg-blue-50 border-l-4 border-blue-500';
      default:
        return 'bg-white';
    }
  };

  // Helper function to get status text
  const getStatusText = (status: 'past' | 'present' | 'upcoming'): string => {
    switch (status) {
      case 'past':
        return 'Past';
      case 'present':
        return 'Today';
      case 'upcoming':
        return 'Upcoming';
      default:
        return '';
    }
  };

  // Format date for display
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section id="calendar" className="bg-blue-950">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-yellow-500 text-2xl font-bold flex items-center justify-center gap-2">
            <CalendarIcon className="inline-block h-6 w-6 mr-2" /> Calendar of Activities
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Activities Table - takes 2/3 width on large screens */}
          <div className="lg:col-span-2 flex flex-col h-full">
            <div className="bg-white rounded-xl shadow-md border-2 border-yellow-500 overflow-hidden flex flex-col h-full" style={{ minHeight: '500px' }}>
              <div className="overflow-x-auto flex-1">
                <table className="min-w-full divide-y divide-gray-200 h-full">
                  <thead className="bg-blue-950">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-yellow-500 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-yellow-500 uppercase tracking-wider"
                      >
                        Event
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-yellow-500 uppercase tracking-wider"
                      >
                        Location
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-yellow-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {events.map((event, index) => {
                      const status = getEventStatus(event.date);
                      const statusColorClasses = getStatusColorClasses(status);
                      let statusIcon = null;
                      if (status === 'past') statusIcon = <Clock className="h-4 w-4 mr-1 text-gray-400" />;
                      if (status === 'present') statusIcon = <CheckCircle className="h-4 w-4 mr-1 text-yellow-500" />;
                      if (status === 'upcoming') statusIcon = <AlertCircle className="h-4 w-4 mr-1 text-blue-500" />;
                      return (
                        <tr 
                          key={index} 
                          className={`hover:bg-gray-50 transition-colors duration-200 ${statusColorClasses}`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {formatDate(event.date)}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 flex items-center gap-2">
                              {statusIcon}
                              {event.event}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{event.location}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              status === 'past' 
                                ? 'bg-gray-100 text-gray-800' 
                                : status === 'present' 
                                  ? 'bg-yellow-100 text-yellow-800' 
                                  : 'bg-blue-100 text-blue-800'
                            }`}>
                              {statusIcon}
                              {getStatusText(status)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* Current Month Calendar - takes 1/3 width on large screens */}
          <div className="lg:col-span-1 flex flex-col h-full">
            <div className="bg-white rounded-xl shadow-md border-2 border-yellow-500 overflow-hidden flex flex-col h-full" style={{ minHeight: '500px' }}>
              <div className="bg-blue-950 p-4 text-center">
                <h3 className="text-yellow-500 font-bold text-lg flex items-center justify-center gap-2">
                  <CalendarIcon className="inline-block h-5 w-5 mr-1" />
                  {monthNames[currentMonth]} {currentYear}
                </h3>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-center">
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="text-center text-xs font-bold text-gray-600 py-2">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, index) => {
                    const isToday = day === now.getDate() && 
                                   currentMonth === now.getMonth() && 
                                   currentYear === now.getFullYear();
                    // Check if there are events on this day
                    const hasEvents = events.some(event => {
                      const eventDate = new Date(event.date);
                      return eventDate.getDate() === day && 
                             eventDate.getMonth() === currentMonth && 
                             eventDate.getFullYear() === currentYear;
                    });
                    const hasPastEvents = events.some(event => {
                      const eventDate = new Date(event.date);
                      return eventDate.getDate() === day && 
                             eventDate.getMonth() === currentMonth && 
                             eventDate.getFullYear() === currentYear &&
                             getEventStatus(event.date) === 'past';
                    });
                    const hasPresentEvents = events.some(event => {
                      const eventDate = new Date(event.date);
                      return eventDate.getDate() === day && 
                             eventDate.getMonth() === currentMonth && 
                             eventDate.getFullYear() === currentYear &&
                             getEventStatus(event.date) === 'present';
                    });
                    const hasUpcomingEvents = events.some(event => {
                      const eventDate = new Date(event.date);
                      return eventDate.getDate() === day && 
                             eventDate.getMonth() === currentMonth && 
                             eventDate.getFullYear() === currentYear &&
                             getEventStatus(event.date) === 'upcoming';
                    });
                    let dayClasses = "h-10 flex items-center justify-center text-sm font-medium rounded-full ";
                    let dayIcon = null;
                    if (day) {
                      if (isToday) {
                        dayClasses += "bg-yellow-500 text-white ";
                        dayIcon = <CheckCircle className="h-4 w-4 text-white mr-1" />;
                      } else if (hasPresentEvents) {
                        dayClasses += "bg-yellow-200 text-yellow-800 ";
                        dayIcon = <CheckCircle className="h-4 w-4 text-yellow-500 mr-1" />;
                      } else if (hasUpcomingEvents) {
                        dayClasses += "bg-blue-200 text-blue-800 ";
                        dayIcon = <AlertCircle className="h-4 w-4 text-blue-500 mr-1" />;
                      } else if (hasPastEvents) {
                        dayClasses += "bg-gray-200 text-gray-600 ";
                        dayIcon = <Clock className="h-4 w-4 text-gray-400 mr-1" />;
                      } else {
                        dayClasses += "text-gray-800 hover:bg-gray-100 ";
                      }
                    } else {
                      dayClasses += "text-gray-300 ";
                    }
                    return (
                      <div key={index} className={dayClasses}>
                        {dayIcon}
                        {day || ''}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
