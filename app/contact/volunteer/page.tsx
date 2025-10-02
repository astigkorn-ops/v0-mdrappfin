"use client"

import type React from "react"

import { useState } from "react"
import {
  Heart,
  Target,
  GraduationCap,
  Users,
  Briefcase as Certificate,
  Shirt,
  Medal,
  CheckCircle,
  Search,
  Hospital,
  CalendarSearch as ChalkboardTeacher,
  Laptop,
  Plus,
} from "lucide-react"

export default function VolunteerPage() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [showSuccess, setShowSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    address: "",
    availability: "",
    motivation: "",
  })
  const [referenceNumber, setReferenceNumber] = useState("")
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const skills = [
    { id: "first-aid", name: "First Aid", icon: Hospital, color: "text-red-500" },
    { id: "cpr", name: "CPR", icon: Heart, color: "text-red-500" },
    { id: "search-rescue", name: "Search & Rescue", icon: Search, color: "text-blue-500" },
    { id: "teaching", name: "Teaching", icon: ChalkboardTeacher, color: "text-green-500" },
    { id: "driving", name: "Driving", icon: Users, color: "text-purple-500" },
    { id: "communication", name: "Communication", icon: Users, color: "text-yellow-500" },
    { id: "computer", name: "Computer Skills", icon: Laptop, color: "text-blue-500" },
    { id: "other", name: "Other", icon: Plus, color: "text-gray-500" },
  ]

  const toggleSkill = (skillId: string) => {
    setSelectedSkills((prev) => (prev.includes(skillId) ? prev.filter((id) => id !== skillId) : [...prev, skillId]))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSubmitMessage(null)

    // Validate that at least one skill is selected
    if (selectedSkills.length === 0) {
      setSubmitMessage({
        type: "error",
        text: "Please select at least one skill or expertise area.",
      })
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/volunteer-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          age: formData.age,
          address: formData.address,
          skills: selectedSkills,
          availability: formData.availability,
          motivation: formData.motivation,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setReferenceNumber(result.reference_number)
        setShowSuccess(true)
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          age: "",
          address: "",
          availability: "",
          motivation: "",
        })
        setSelectedSkills([])
      } else {
        setSubmitMessage({
          type: "error",
          text: result.error || "Failed to submit application. Please try again.",
        })
      }
    } catch (error) {
      setSubmitMessage({
        type: "error",
        text: "Network error. Please check your connection and try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewApplication = () => {
    setShowSuccess(false)
    setSelectedSkills([])
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      age: "",
      address: "",
      availability: "",
      motivation: "",
    })
    setSubmitMessage(null)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-blue-950 rounded-full flex items-center justify-center animate-bounce">
              <Heart className="text-yellow-500 w-8 h-8" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-950 mb-6">Become a Volunteer</h1>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our community of dedicated volunteers and help make Pio Duran a safer, more resilient place for
            everyone. Your skills and time can save lives and build stronger communities.
          </p>
        </div>

        {!showSuccess ? (
          <>
            {/* Hero Section */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
              <div className="bg-gradient-to-r from-blue-950 to-blue-800 p-8 text-white text-center">
                <h2 className="text-3xl font-bold mb-4">Why Volunteer with MDRRMO?</h2>
                <p className="text-xl max-w-3xl mx-auto">
                  Be part of something bigger. Make a real difference in your community while gaining valuable skills
                  and experiences.
                </p>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-blue-50 rounded-xl">
                    <div className="w-16 h-16 bg-blue-950 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="text-yellow-500 w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-blue-950 mb-2">Make an Impact</h3>
                    <p className="text-gray-600">
                      Directly contribute to saving lives and protecting your community during emergencies.
                    </p>
                  </div>

                  <div className="text-center p-6 bg-yellow-50 rounded-xl">
                    <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <GraduationCap className="text-blue-950 w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-blue-950 mb-2">Gain Skills</h3>
                    <p className="text-gray-600">
                      Receive professional training in disaster response, first aid, and emergency management.
                    </p>
                  </div>

                  <div className="text-center p-6 bg-green-50 rounded-xl">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="text-white w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-blue-950 mb-2">Build Community</h3>
                    <p className="text-gray-600">
                      Connect with like-minded individuals who share your passion for community service.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Volunteer Benefits */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-blue-950 text-center mb-4">Volunteer Benefits</h2>
              <div className="w-24 h-1 bg-yellow-500 mx-auto mb-12"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-transparent hover:border-yellow-500 hover:transform hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Certificate className="text-blue-950 w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-blue-950 mb-2">Certification</h3>
                  <p className="text-gray-600 text-sm">
                    Official certificates for completed training programs and volunteer hours.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-transparent hover:border-yellow-500 hover:transform hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                    <Shirt className="text-yellow-600 w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-blue-950 mb-2">Uniform & Equipment</h3>
                  <p className="text-gray-600 text-sm">
                    Professional uniform and safety equipment provided for all volunteers.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-transparent hover:border-yellow-500 hover:transform hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Medal className="text-green-600 w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-blue-950 mb-2">Recognition</h3>
                  <p className="text-gray-600 text-sm">
                    Annual awards and recognition for outstanding volunteer contributions.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-transparent hover:border-yellow-500 hover:transform hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <Heart className="text-red-600 w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-blue-950 mb-2">Personal Satisfaction</h3>
                  <p className="text-gray-600 text-sm">
                    The rewarding feeling of making a positive difference in people's lives.
                  </p>
                </div>
              </div>
            </div>

            {/* Volunteer Registration Form */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-950 to-blue-800 p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Register as a Volunteer</h2>
                <p>Join our volunteer community today</p>
              </div>

              <div className="p-6 md:p-8">
                {submitMessage && (
                  <div
                    className={`mb-6 p-4 rounded-md ${
                      submitMessage.type === "success"
                        ? "bg-green-50 border border-green-200 text-green-800"
                        : "bg-red-50 border border-red-200 text-red-800"
                    }`}
                    role="alert"
                  >
                    <div className="flex">
                      <i
                        className={`${
                          submitMessage.type === "success" ? "fas fa-check-circle" : "fas fa-exclamation-circle"
                        } mr-2 mt-0.5`}
                        aria-hidden="true"
                      ></i>
                      <p className="text-sm">{submitMessage.text}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-950 focus:outline-none transition-colors duration-200"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-950 focus:outline-none transition-colors duration-200"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-950 focus:outline-none transition-colors duration-200"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div>
                      <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                        Age <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        min="18"
                        max="80"
                        required
                        value={formData.age}
                        onChange={(e) => handleInputChange("age", e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-950 focus:outline-none transition-colors duration-200"
                        placeholder="Enter your age"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                      Complete Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      rows={3}
                      required
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-950 focus:outline-none transition-colors duration-200"
                      placeholder="Enter your complete address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Skills & Expertise <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {skills.map((skill) => {
                        const IconComponent = skill.icon
                        const isSelected = selectedSkills.includes(skill.id)
                        return (
                          <div
                            key={skill.id}
                            onClick={() => toggleSkill(skill.id)}
                            className={`p-3 rounded-lg cursor-pointer border-2 text-center transition-all duration-200 ${
                              isSelected ? "border-blue-950 bg-blue-50" : "border-gray-200 hover:border-blue-950"
                            }`}
                          >
                            <IconComponent className={`${skill.color} w-6 h-6 mx-auto mb-2`} />
                            <div className="text-sm font-medium">{skill.name}</div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-2">
                      Availability <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="availability"
                      name="availability"
                      required
                      value={formData.availability}
                      onChange={(e) => handleInputChange("availability", e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-950 focus:outline-none transition-colors duration-200"
                    >
                      <option value="">Select your availability</option>
                      <option value="weekdays">Weekdays (9 AM - 5 PM)</option>
                      <option value="weekends">Weekends</option>
                      <option value="evenings">Evenings (5 PM - 9 PM)</option>
                      <option value="anytime">Anytime</option>
                      <option value="on-call">On-call during emergencies</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-2">
                      Why do you want to volunteer? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="motivation"
                      name="motivation"
                      rows={4}
                      required
                      value={formData.motivation}
                      onChange={(e) => handleInputChange("motivation", e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-950 focus:outline-none transition-colors duration-200"
                      placeholder="Tell us what motivates you to volunteer with MDRRMO"
                    />
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5 mt-1">
                      <input
                        id="agreement"
                        name="agreement"
                        type="checkbox"
                        required
                        className="h-4 w-4 text-blue-950 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3">
                      <label htmlFor="agreement" className="font-medium text-gray-700">
                        I agree to participate in required training sessions and emergency responses when called upon.
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-950 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Submitting Application...
                      </>
                    ) : (
                      <>
                        <Heart className="w-4 h-4 mr-2" />
                        Submit Volunteer Application
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </>
        ) : (
          /* Success Message */
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-green-500 w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-blue-950 mb-4">Application Submitted Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your interest in volunteering with MDRRMO. We've received your application and will contact
              you soon.
            </p>
            <p className="text-gray-600 mb-8">
              Reference Number: <span className="font-bold text-blue-950">{referenceNumber}</span>
            </p>
            <button
              onClick={handleNewApplication}
              className="bg-blue-950 hover:bg-blue-800 text-yellow-500 px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center mx-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              Submit Another Application
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
