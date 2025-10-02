"use client"

import type React from "react"

import { useState } from "react"
import { Mail, User, Shield, MessageSquare, Paperclip, Send, CheckCircle, Plus, LogOut } from "lucide-react"

export default function MessagePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  })
  const [referenceNumber, setReferenceNumber] = useState("")
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleLogin = (provider: string) => {
    setIsLoading(true)
    // Simulate login
    setTimeout(() => {
      setIsLoggedIn(true)
      setUserName(provider === "google" ? "John Doe" : "Jane Smith")
      setUserEmail(provider === "google" ? "john.doe@gmail.com" : "jane.smith@facebook.com")
      setIsLoading(false)
    }, 1500)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserName("")
    setUserEmail("")
    setShowSuccess(false)
    setFormData({ subject: "", message: "" })
    setSubmitMessage(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSubmitMessage(null)

    try {
      const response = await fetch("/api/contact-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: formData.subject,
          message: formData.message,
          user_name: userName,
          user_email: userEmail,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setReferenceNumber(result.reference_number)
        setShowSuccess(true)
        setFormData({ subject: "", message: "" })
      } else {
        setSubmitMessage({
          type: "error",
          text: result.error || "Failed to submit message. Please try again.",
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

  const handleNewMessage = () => {
    setShowSuccess(false)
    setFormData({ subject: "", message: "" })
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
              <Mail className="text-yellow-500 w-8 h-8" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-blue-950 mb-6">Leave a Message</h1>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions, feedback, or concerns? Send us a message and we'll get back to you as soon as possible.
            Login with your social account to start the conversation.
          </p>
        </div>

        {!showSuccess ? (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Message Form Section */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-950 to-blue-800 p-6 text-white">
                  <h2 className="text-2xl font-bold mb-2">Send Us a Message</h2>
                  <p>{isLoggedIn ? "Compose your message" : "Login to start your conversation"}</p>
                </div>

                <div className="p-6 md:p-8">
                  {!isLoggedIn ? (
                    /* Login Section */
                    <div>
                      <h3 className="text-xl font-bold text-blue-950 mb-6 text-center">Login to Continue</h3>

                      <div className="space-y-4">
                        <button
                          onClick={() => handleLogin("google")}
                          disabled={isLoading}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium flex items-center justify-center transition-colors duration-200 disabled:opacity-50"
                        >
                          {isLoading ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                          ) : (
                            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                              <path
                                fill="currentColor"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                              />
                              <path
                                fill="currentColor"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                              />
                              <path
                                fill="currentColor"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                              />
                              <path
                                fill="currentColor"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                              />
                            </svg>
                          )}
                          <span>Continue with Google</span>
                        </button>

                        <button
                          onClick={() => handleLogin("facebook")}
                          disabled={isLoading}
                          className="w-full bg-blue-800 hover:bg-blue-900 text-white py-3 rounded-lg font-medium flex items-center justify-center transition-colors duration-200 disabled:opacity-50"
                        >
                          {isLoading ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                          ) : (
                            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                          )}
                          <span>Continue with Facebook</span>
                        </button>
                      </div>

                      <div className="mt-6 text-center">
                        <p className="text-gray-600 text-sm">
                          By logging in, you agree to our{" "}
                          <a href="#" className="text-blue-950 hover:underline">
                            Privacy Policy
                          </a>
                        </p>
                      </div>
                    </div>
                  ) : (
                    /* Message Form */
                    <div>
                      <div className="flex items-center mb-6 p-4 bg-blue-50 rounded-lg">
                        <div className="w-12 h-12 bg-blue-950 rounded-full flex items-center justify-center mr-3">
                          <User className="text-yellow-500 w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-blue-950">{userName}</p>
                          <p className="text-sm text-gray-600">{userEmail}</p>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="text-gray-500 hover:text-red-500 transition-colors duration-200"
                          title="Logout"
                        >
                          <LogOut className="w-5 h-5" />
                        </button>
                      </div>

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

                      <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                            <MessageSquare className="inline w-4 h-4 mr-2 text-blue-950" />
                            Subject <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="subject"
                            name="subject"
                            required
                            value={formData.subject}
                            onChange={(e) => handleInputChange("subject", e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-950 focus:outline-none transition-colors duration-200"
                            placeholder="Enter subject"
                          />
                        </div>

                        <div className="mb-6">
                          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                            <Mail className="inline w-4 h-4 mr-2 text-blue-950" />
                            Your Message <span className="text-red-500">*</span>
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            rows={5}
                            required
                            value={formData.message}
                            onChange={(e) => handleInputChange("message", e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-950 focus:outline-none transition-colors duration-200"
                            placeholder="Type your message here..."
                          />
                        </div>

                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Paperclip className="inline w-4 h-4 mr-2 text-blue-950" />
                            Attach Files (Optional)
                          </label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-950 transition-colors duration-200">
                            <Paperclip className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-600 mb-2">Drag & drop files here</p>
                            <p className="text-gray-500 text-sm mb-3">or</p>
                            <button
                              type="button"
                              className="bg-blue-950 hover:bg-blue-800 text-yellow-500 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                            >
                              Browse Files
                            </button>
                            <input
                              type="file"
                              id="attachments"
                              name="attachments"
                              multiple
                              accept="image/*,.pdf,.doc,.docx"
                              className="hidden"
                            />
                            <p className="text-xs text-gray-500 mt-3">Supports JPG, PNG, PDF, DOC up to 10MB</p>
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
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2" />
                              Send Message
                            </>
                          )}
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </div>

              {/* Message Preview Section */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-400 p-6 text-blue-950">
                  <h2 className="text-2xl font-bold mb-2">Message Preview</h2>
                  <p>See how your message will appear</p>
                </div>

                <div className="p-6 md:p-8">
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-blue-950 mb-4">Conversation History</h3>

                    <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                      {/* Admin Message */}
                      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-950">
                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-blue-950 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            <Shield className="text-yellow-500 w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                              <p className="font-medium text-blue-950">MDRRMO Support</p>
                              <span className="text-xs text-gray-500">2 hours ago</span>
                            </div>
                            <p className="text-gray-700 text-sm">
                              Thank you for your inquiry. We've received your message and our team will respond within
                              24 hours.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* User Message */}
                      <div className="bg-gray-100 p-4 rounded-lg border-l-4 border-yellow-500">
                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            <User className="text-white w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                              <p className="font-medium text-gray-900">You</p>
                              <span className="text-xs text-gray-500">Just now</span>
                            </div>
                            <p className="text-gray-700 text-sm">
                              Hello, I have a question about the emergency procedures for flooding in our area.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Admin Message */}
                      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-950">
                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-blue-950 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            <Shield className="text-yellow-500 w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                              <p className="font-medium text-blue-950">MDRRMO Support</p>
                              <span className="text-xs text-gray-500">1 day ago</span>
                            </div>
                            <p className="text-gray-700 text-sm">
                              For flood emergencies, please follow these steps: 1) Move to higher ground immediately, 2)
                              Avoid walking or driving through floodwaters, 3) Contact emergency services if needed.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-950 to-blue-800 rounded-2xl p-6 text-white">
                    <h3 className="text-lg font-bold mb-3">Need Immediate Help?</h3>
                    <p className="text-blue-100 mb-4">
                      For urgent matters, please contact our emergency hotline directly.
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
                        <Shield className="text-blue-950 w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold">Emergency Hotline</p>
                        <p className="text-yellow-200">911 / (052) 234-5678</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Success Message */
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-green-500 w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-blue-950 mb-4">Message Sent Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your message. We've received it and will respond as soon as possible.
            </p>
            <p className="text-gray-600 mb-8">
              Reference Number: <span className="font-bold text-blue-950">{referenceNumber}</span>
            </p>
            <button
              onClick={handleNewMessage}
              className="bg-blue-950 hover:bg-blue-800 text-yellow-500 px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center mx-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              Send Another Message
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
