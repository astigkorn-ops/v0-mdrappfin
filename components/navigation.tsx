"use client"

import type React from "react"
import { useState, useCallback, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, MapPin, Menu, X, ChevronDown } from "lucide-react"

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const searchInputRef = useRef<HTMLInputElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const toggleSubmenu = useCallback((submenu: string) => {
    setOpenSubmenu((current) => (current === submenu ? null : submenu))
  }, [])

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement search functionality
    setSearchOpen(false)
    setSearchQuery("")
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent, action: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      action()
    }
  }, [])

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false)
        setOpenSubmenu(null)
        setSearchOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [])

  return (
    <nav
      className="bg-blue-950 border-b-4 border-yellow-500 shadow-lg relative sticky top-0 z-50"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 flex items-center space-x-3">
            <Image
              src="/images/design-mode/logome_h9snnx%281%29%281%29%281%29.webp" onError={e => e.currentTarget.src = '/images/design-mode/logome_h9snnx%281%29%281%29%281%29.webp'}
              alt="MDRRMO Pio Duran Official Logo"
              width={48}
              height={48}
              className="object-contain"
              priority
            />
            <div className="text-white">
              <div className="text-lg font-bold text-yellow-500">MDRRMO</div>
              <div className="text-xs font-medium text-center">PIO DURAN</div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2" role="menubar">
              <Link
                href="/"
                className="text-white hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-blue-950"
                role="menuitem"
              >
                Home
              </Link>

              {/* About Us Dropdown */}
              <div className="relative group" role="menuitem" aria-haspopup="true">
                <button
                  className="text-white hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-blue-950"
                  aria-expanded="false"
                  aria-label="About Us menu"
                >
                  About Us
                  <ChevronDown
                    className="ml-1 h-4 w-4 transform group-hover:rotate-180 transition-transform duration-200"
                    aria-hidden="true"
                  />
                </button>
                <div
                  className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                  role="menu"
                >
                  <div className="py-1">
                    <Link
                      href="/about/history"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      History
                    </Link>
                    <Link
                      href="/about/vision-mission"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      Vision & Mission
                    </Link>
                    <Link
                      href="/about/drrmc-council"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      The DRRM Council
                    </Link>
                    <Link
                      href="/about/mdrrmo-personnel"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      MDRRMO Personnel
                    </Link>
                    <Link
                      href="/about/legal-basis"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      Legal Basis
                    </Link>
                    <Link
                      href="/about/our-services"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      Our Services
                    </Link>
                  </div>
                </div>
              </div>

              {/* Information Dropdown */}
              <div className="relative group" role="menuitem" aria-haspopup="true">
                <button
                  className="text-white hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-blue-950"
                  aria-expanded="false"
                  aria-label="Information menu"
                >
                  Information
                  <ChevronDown
                    className="ml-1 h-4 w-4 transform group-hover:rotate-180 transition-transform duration-200"
                    aria-hidden="true"
                  />
                </button>
                <div
                  className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                  role="menu"
                >
                  <div className="py-1">
                    <Link
                      href="/information/announcements"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      Announcements
                    </Link>
                    <Link
                      href="/information/weather-updates"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      Weather Updates
                    </Link>
                    <Link
                      href="/information/news"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      News & Advisories
                    </Link>
                    <Link
                      href="/information/events"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      Events & Activities
                    </Link>
                    <Link
                      href="/information/faq"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      FAQ
                    </Link>
                  </div>
                </div>
              </div>

              <div className="relative group" role="menuitem" aria-haspopup="true">
                <button
                  className="text-white hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-blue-950"
                  aria-expanded="false"
                  aria-label="Resources menu"
                >
                  Resources
                  <ChevronDown
                    className="ml-1 h-4 w-4 transform group-hover:rotate-180 transition-transform duration-200"
                    aria-hidden="true"
                  />
                </button>
                <div
                  className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                  role="menu"
                >
                  <div className="py-1">
                    <Link
                      href="/resources/video-gallery"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      Video Gallery
                    </Link>
                    <Link
                      href="/resources/gallery"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      Photo Gallery
                    </Link>
                    <Link
                      href="/resources/public-documents"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      Public Documents
                    </Link>
                  </div>
                </div>
              </div>

              {/* Preparedness Dropdown */}
              <div className="relative group" role="menuitem" aria-haspopup="true">
                <button
                  className="text-white hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-blue-950"
                  aria-expanded="false"
                  aria-label="Preparedness menu"
                >
                  Preparedness
                  <ChevronDown
                    className="ml-1 h-4 w-4 transform group-hover:rotate-180 transition-transform duration-200"
                    aria-hidden="true"
                  />
                </button>
                <div
                  className="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                  role="menu"
                >
                  <div className="py-1">
                    <Link
                      href="/preparedness/emergency-procedures"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      Emergency Procedures
                    </Link>
                    <Link
                      href="/preparedness/evacuation"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      Evacuation Management
                    </Link>
                    <Link
                      href="/preparedness/hazard-maps"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      Hazard Maps
                    </Link>
                    <Link
                      href="/preparedness/early-warning-systems"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      Early Warning Systems
                    </Link>
                    <Link
                      href="/preparedness/community-training"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      Community Training
                    </Link>
                    <Link
                      href="/preparedness/our-plans"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      Our Plans
                    </Link>
                    <div className="border-t border-gray-200 my-1"></div>
                    <Link
                      href="/preparedness/go-bag"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      What's in your GO-BAG?
                    </Link>
                    <Link
                      href="/preparedness/family-plan"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      Family Emergency Plan
                    </Link>
                    <Link
                      href="/preparedness/ice-materials"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      IEC Materials
                    </Link>
                    <Link
                      href="/preparedness/training-and-drill"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      Training and Drill
                    </Link>
                  </div>
                </div>
              </div>

              {/* Contact Dropdown */}
              <div className="relative group" role="menuitem" aria-haspopup="true">
                <button
                  className="text-white hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-blue-950"
                  aria-expanded="false"
                  aria-label="Contact menu"
                >
                  Contact
                  <ChevronDown
                    className="ml-1 h-4 w-4 transform group-hover:rotate-180 transition-transform duration-200"
                    aria-hidden="true"
                  />
                </button>
                <div
                  className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                  role="menu"
                >
                  <div className="py-1">
                    <Link
                      href="/contact/hotline"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      Emergency Hotlines
                    </Link>
                    <Link
                      href="/contact/location"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      Our Location
                    </Link>
                    <Link
                      href="/contact/message"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      Leave a Message
                    </Link>
                    <Link
                      href="/contact/volunteer"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      Become a Volunteer
                    </Link>
                    <Link
                      href="/contact/report-incident"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                      role="menuitem"
                    >
                      Report an Incident
                    </Link>
                  </div>
                </div>
              </div>

              <Link
                href="/admin"
                className="text-white hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-blue-950"
                role="menuitem"
              >
                Admin
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Search Button - Desktop */}
            <div className="hidden md:block relative">
              {searchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center" role="search">
                  <label htmlFor="desktop-search" className="sr-only">
                    Search the website
                  </label>
                  <input
                    id="desktop-search"
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="bg-white text-blue-950 px-3 py-1 rounded-l-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 w-48"
                  />
                  <button
                    type="submit"
                    className="bg-yellow-500 hover:bg-yellow-600 text-blue-950 px-3 py-1 rounded-r-md transition-colors duration-200 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                    aria-label="Submit search"
                  >
                    <Search className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="ml-2 text-white hover:text-yellow-500 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-blue-950 rounded"
                    aria-label="Close search"
                  >
                    <X className="w-4 h-4" aria-hidden="true" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="text-white hover:text-yellow-500 p-2 rounded-md transition-colors duration-200 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-blue-950"
                  aria-label="Open search"
                >
                  <Search className="w-5 h-5" aria-hidden="true" />
                </button>
              )}
            </div>

            {/* Barangay Portal Button - Desktop */}
            <Link
              href="/barangay-portal"
              className="hidden md:flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-blue-950 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-blue-950"
            >
              <MapPin className="w-4 h-4" aria-hidden="true" />
              <span>Barangay Portal</span>
            </Link>

            {/* Mobile Icons */}
            <div className="md:hidden flex items-center space-x-2">
              {/* Search Icon - Mobile */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-white hover:text-yellow-500 focus:outline-none focus:text-yellow-500 transition-colors duration-200 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-blue-950"
                aria-label={searchOpen ? "Close search" : "Open search"}
              >
                <Search className="w-5 h-5" aria-hidden="true" />
              </button>

              {/* Barangay Portal Icon - Mobile */}
              <Link
                href="/barangay-portal"
                className="text-white hover:text-yellow-500 p-2 rounded-md transition-colors duration-200 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-blue-950"
                aria-label="Barangay Portal"
              >
                <MapPin className="w-5 h-5" aria-hidden="true" />
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white hover:text-yellow-500 focus:outline-none focus:text-yellow-500 transition-colors duration-200 p-1 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-blue-950 rounded"
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? "Close main menu" : "Open main menu"}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" aria-hidden="true" />
                ) : (
                  <Menu className="w-6 h-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {searchOpen && (
          <div className="md:hidden px-4 pb-4">
            <form onSubmit={handleSearch} className="flex" role="search">
              <label htmlFor="mobile-search" className="sr-only">
                Search the website
              </label>
              <input
                id="mobile-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="flex-1 bg-white text-blue-950 px-3 py-2 rounded-l-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-blue-950 px-4 py-2 rounded-r-md transition-colors duration-200 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                aria-label="Submit search"
              >
                <Search className="w-4 h-4" aria-hidden="true" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`mobile-menu md:hidden bg-blue-900 border-t border-yellow-500 ${mobileMenuOpen ? "block" : "hidden"}`}
        role="menu"
        aria-label="Mobile navigation menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/"
            className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 transition-colors duration-200 focus:bg-blue-800 focus:outline-none"
            role="menuitem"
          >
            Home
          </Link>

          {/* About Us Mobile */}
          <div className="space-y-1">
            <button
              onClick={() => toggleSubmenu("about")}
              onKeyDown={(e) => handleKeyDown(e, () => toggleSubmenu("about"))}
              className="w-full text-white flex justify-between items-center px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 transition-colors duration-200 focus:bg-blue-800 focus:outline-none"
              aria-expanded={openSubmenu === "about"}
              aria-label="About Us submenu"
            >
              About Us
              <ChevronDown
                className={`h-5 w-5 transition-transform duration-200 ${openSubmenu === "about" ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            <div
              className={`submenu bg-blue-800 rounded-md ml-4 ${openSubmenu === "about" ? "block" : "hidden"}`}
              role="menu"
            >
              <Link
                href="/about/history"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                History
              </Link>
              <Link
                href="/about/vision-mission"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                Vision & Mission
              </Link>
              <Link
                href="/about/drrmc-council"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                The DRRM Council
              </Link>
              <Link
                href="/about/mdrrmo-personnel"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                MDRRMO Personnel
              </Link>
              <Link
                href="/about/legal-basis"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                Legal Basis
              </Link>
              <Link
                href="/about/our-services"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                Our Services
              </Link>
            </div>
          </div>

          {/* Information Mobile Menu */}
          <div className="space-y-1">
            <button
              onClick={() => toggleSubmenu("information")}
              onKeyDown={(e) => handleKeyDown(e, () => toggleSubmenu("information"))}
              className="w-full text-white flex justify-between items-center px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 transition-colors duration-200 focus:bg-blue-800 focus:outline-none"
              aria-expanded={openSubmenu === "information"}
              aria-label="Information submenu"
            >
              Information
              <ChevronDown
                className={`h-5 w-5 transition-transform duration-200 ${openSubmenu === "information" ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            <div
              className={`submenu bg-blue-800 rounded-md ml-4 ${openSubmenu === "information" ? "block" : "hidden"}`}
              role="menu"
            >
              <Link
                href="/information/announcements"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                Announcements
              </Link>
              <Link
                href="/information/weather-updates"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                Weather Updates
              </Link>
              <Link
                href="/information/news"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                News & Advisories
              </Link>
              <Link
                href="/information/events"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                Events & Activities
              </Link>
              <Link
                href="/information/faq"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                FAQ
              </Link>
            </div>
          </div>

          <div className="space-y-1">
            <button
              onClick={() => toggleSubmenu("resources")}
              onKeyDown={(e) => handleKeyDown(e, () => toggleSubmenu("resources"))}
              className="w-full text-white flex justify-between items-center px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 transition-colors duration-200 focus:bg-blue-800 focus:outline-none"
              aria-expanded={openSubmenu === "resources"}
              aria-label="Resources submenu"
            >
              Resources
              <ChevronDown
                className={`h-5 w-5 transition-transform duration-200 ${openSubmenu === "resources" ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            <div
              className={`submenu bg-blue-800 rounded-md ml-4 ${openSubmenu === "resources" ? "block" : "hidden"}`}
              role="menu"
            >
              <Link
                href="/resources/video-gallery"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                Video Gallery
              </Link>
              <Link
                href="/resources/gallery"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                Photo Gallery
              </Link>
              <Link
                href="/resources/public-documents"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                Public Documents
              </Link>
            </div>
          </div>

          {/* Preparedness Mobile Menu */}
          <div className="space-y-1">
            <button
              onClick={() => toggleSubmenu("preparedness")}
              onKeyDown={(e) => handleKeyDown(e, () => toggleSubmenu("preparedness"))}
              className="w-full text-white flex justify-between items-center px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 transition-colors duration-200 focus:bg-blue-800 focus:outline-none"
              aria-expanded={openSubmenu === "preparedness"}
              aria-label="Preparedness submenu"
            >
              Preparedness
              <ChevronDown
                className={`h-5 w-5 transition-transform duration-200 ${openSubmenu === "preparedness" ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            <div
              className={`submenu bg-blue-800 rounded-md ml-4 ${openSubmenu === "preparedness" ? "block" : "hidden"}`}
              role="menu"
            >
              <Link
                href="/preparedness/emergency-procedures"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                Emergency Procedures
              </Link>
              <Link
                href="/preparedness/evacuation"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                Evacuation Management
              </Link>
              <Link
                href="/preparedness/hazard-maps"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                Hazard Maps
              </Link>
              <Link
                href="/preparedness/early-warning-systems"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                Early Warning Systems
              </Link>
              <Link
                href="/preparedness/community-training"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                Community Training
              </Link>
              <Link
                href="/preparedness/our-plans"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                Our Plans
              </Link>
              <div className="border-t border-blue-700 my-1"></div>
              <Link
                href="/preparedness/go-bag"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                What's in your GO-BAG?
              </Link>
              <Link
                href="/preparedness/family-plan"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                Family Emergency Plan
              </Link>
              <Link
                href="/preparedness/ice-materials"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                IEC Materials
              </Link>
              <Link
                href="/preparedness/training-and-drill"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                Training and Drill
              </Link>
            </div>
          </div>

          {/* Contact Mobile Menu */}
          <div className="space-y-1">
            <button
              onClick={() => toggleSubmenu("contact")}
              onKeyDown={(e) => handleKeyDown(e, () => toggleSubmenu("contact"))}
              className="w-full text-white flex justify-between items-center px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 transition-colors duration-200 focus:bg-blue-800 focus:outline-none"
              aria-expanded={openSubmenu === "contact"}
              aria-label="Contact submenu"
            >
              Contact
              <ChevronDown
                className={`h-5 w-5 transition-transform duration-200 ${openSubmenu === "contact" ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            <div
              className={`submenu bg-blue-800 rounded-md ml-4 ${openSubmenu === "contact" ? "block" : "hidden"}`}
              role="menu"
            >
              <Link
                href="/contact/hotline"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                Emergency Hotlines
              </Link>
              <Link
                href="/contact/location"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                Our Location
              </Link>
              <Link
                href="/contact/message"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                Leave a Message
              </Link>
              <Link
                href="/contact/volunteer"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                Become a Volunteer
              </Link>
              <Link
                href="/contact/report-incident"
                className="text-white block px-3 py-2 text-sm hover:bg-yellow-500 hover:text-blue-950 transition-colors duration-200 focus:bg-yellow-500 focus:text-blue-950 focus:outline-none"
                role="menuitem"
              >
                Report an Incident
              </Link>
            </div>
          </div>

          <Link
            href="/admin"
            className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 transition-colors duration-200 focus:bg-blue-800 focus:outline-none"
            role="menuitem"
          >
            Admin
          </Link>

          <Link
            href="/barangay-portal"
            className="text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 transition-colors duration-200 focus:bg-blue-800 focus:outline-none"
            role="menuitem"
          >
            Barangay Portal
          </Link>
        </div>
      </div>
    </nav>
  )
}
