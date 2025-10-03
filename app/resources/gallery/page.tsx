"use client"

import { useState } from "react"
import { 
  Download, 
  X, 
  ImageIcon, 
  Trees, 
  Waves, 
  Building, 
  Sun,
  ChevronLeft,
  ChevronRight,
  Grid,
  Calendar,
  Tag,
  Search,
  Filter
} from "lucide-react"

interface Photo {
  id: number
  title: string
  category: string
  date: string
  url: string
}

interface Album {
  id: number
  name: string
  description: string
  icon: string
  count: number
  coverImage: string
  photos: number[]
}

const albums: Album[] = [
  {
    id: 1,
    name: "DRRM Activities",
    description: "Training sessions and workshops",
    icon: "trees",
    count: 4,
    coverImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    photos: [1, 3, 6, 7],
  },
  {
    id: 2,
    name: "Emergency Response",
    description: "Real emergency operations",
    icon: "waves",
    count: 2,
    coverImage: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&h=600&fit=crop",
    photos: [2, 8],
  },
  {
    id: 3,
    name: "Community Events",
    description: "Public awareness campaigns",
    icon: "building",
    count: 1,
    coverImage: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop",
    photos: [4],
  },
  {
    id: 4,
    name: "Disaster Documentation",
    description: "Historical disaster events",
    icon: "sun",
    count: 1,
    coverImage: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop",
    photos: [5],
  },
]

const photos: Photo[] = [
  {
    id: 1,
    title: "Earthquake Drill Training",
    category: "Training",
    date: "2024-01-15",
    url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
  },
  {
    id: 2,
    title: "Flood Response Team",
    category: "Emergency",
    date: "2024-01-20",
    url: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&h=600&fit=crop",
  },
  {
    id: 3,
    title: "Fire Safety Workshop",
    category: "Training",
    date: "2024-01-25",
    url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
  },
  {
    id: 4,
    title: "Community Awareness Event",
    category: "Event",
    date: "2024-02-01",
    url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop",
  },
  {
    id: 5,
    title: "Typhoon Aftermath",
    category: "Documentation",
    date: "2024-02-05",
    url: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop",
  },
  {
    id: 6,
    title: "First Aid Training",
    category: "Training",
    date: "2024-02-10",
    url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
  },
  {
    id: 7,
    title: "Rescue Equipment Demo",
    category: "Training",
    date: "2024-02-15",
    url: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=600&fit=crop",
  },
  {
    id: 8,
    title: "Emergency Evacuation",
    category: "Emergency",
    date: "2024-02-20",
    url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
  },
]

export default function PhotoGallery() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentAlbumId, setCurrentAlbumId] = useState<number | null>(null)
  const [currentPhotos, setCurrentPhotos] = useState(photos)
  const [modalOpen, setModalOpen] = useState(false)
  const [galleryTitle, setGalleryTitle] = useState("Document Gallery")
  const [galleryDescription, setGalleryDescription] = useState("A curated collection of events and activities")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Get unique categories for filter
  const categories = ["all", ...Array.from(new Set(photos.map(photo => photo.category)))]

  const selectAlbum = (albumId: number | null) => {
    setCurrentAlbumId(albumId)

    if (albumId === null) {
      setCurrentPhotos(photos)
      setGalleryTitle("Document Gallery")
      setGalleryDescription("A curated collection of events and activities")
    } else {
      const album = albums.find((a) => a.id === albumId)
      if (album) {
        setCurrentPhotos(photos.filter((photo) => album.photos.includes(photo.id)))
        setGalleryTitle(album.name)
        setGalleryDescription(album.description)
      }
    }
  }

  const openModal = (index: number) => {
    setCurrentImageIndex(index)
    setModalOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setModalOpen(false)
    document.body.style.overflow = "auto"
  }

  const downloadImage = () => {
    const photo = currentPhotos[currentImageIndex]
    const a = document.createElement("a")
    a.href = photo.url
    a.download = `${photo.title.replace(/\s+/g, "_")}.jpg`
    a.target = "_blank"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const navigateImage = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentImageIndex((prev) => (prev + 1) % currentPhotos.length)
    } else {
      setCurrentImageIndex((prev) => (prev - 1 + currentPhotos.length) % currentPhotos.length)
    }
  }

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "trees":
        return <Trees className="w-5 h-5 text-yellow-500" />
      case "waves":
        return <Waves className="w-5 h-5 text-yellow-500" />
      case "building":
        return <Building className="w-5 h-5 text-yellow-500" />
      case "sun":
        return <Sun className="w-5 h-5 text-yellow-500" />
      default:
        return <ImageIcon className="w-5 h-5 text-yellow-500" />
    }
  }

  // Filter photos based on search and category
  const filteredPhotos = currentPhotos.filter(photo => {
    const matchesSearch = photo.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         photo.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || photo.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-white font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #1e3a8a 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row h-screen">
        {/* Photo Albums Sidebar - Responsive */}
        <div className="lg:w-80 w-full lg:h-full h-auto bg-white shadow-xl border-r border-blue-950/10 overflow-y-auto">
          <div className="p-6 border-b border-blue-950/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-950 rounded-lg flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-blue-950">Photo Gallery</h2>
                <p className="text-blue-950/60 text-xs">DRRMO Collections</p>
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="space-y-3">
              {/* All Photos Album */}
              <div
                onClick={() => selectAlbum(null)}
                className={`bg-white rounded-xl p-4 cursor-pointer border transition-all hover:shadow-md ${
                  currentAlbumId === null ? 'border-yellow-500 shadow-md bg-yellow-500/5' : 'border-blue-950/10'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-950 to-blue-800 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Grid className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-blue-950 truncate">All Photos</h3>
                    <p className="text-sm text-blue-950/60">{photos.length} photos</p>
                  </div>
                </div>
              </div>

              {/* Individual Albums */}
              {albums.map((album) => (
                <div
                  key={album.id}
                  onClick={() => selectAlbum(album.id)}
                  className={`bg-white rounded-xl p-4 cursor-pointer border transition-all hover:shadow-md ${
                    currentAlbumId === album.id ? 'border-yellow-500 shadow-md bg-yellow-500/5' : 'border-blue-950/10'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={album.coverImage}
                        alt={album.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {getIcon(album.icon)}
                        <h3 className="font-semibold text-blue-950 truncate">{album.name}</h3>
                      </div>
                      <p className="text-sm text-blue-950/60">{album.count} photos</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Gallery */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-8">
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-4xl font-bold text-blue-950 mb-2">{galleryTitle}</h1>
              <p className="text-blue-950/70 text-sm md:text-base">{galleryDescription}</p>
            </div>

            {/* Search and Filter Controls */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-950/40 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search photos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-blue-950/20 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-950/40 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-blue-950/20 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none appearance-none bg-white transition-all"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {filteredPhotos.length === 0 ? (
              <div className="text-center py-12">
                <ImageIcon className="w-16 h-16 text-blue-950/20 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-blue-950 mb-2">No Photos Found</h3>
                <p className="text-blue-950/70">Try adjusting your search or filter criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filteredPhotos.map((photo, index) => {
                  const originalIndex = currentPhotos.findIndex(p => p.id === photo.id);
                  return (
                    <div
                      key={photo.id}
                      onClick={() => openModal(originalIndex)}
                      className="bg-white rounded-xl shadow-sm overflow-hidden border border-blue-950/10 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group"
                    >
                      <div className="aspect-square overflow-hidden relative">
                        <img
                          src={photo.url}
                          alt={photo.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                            <ImageIcon className="w-6 h-6 text-blue-950" />
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-blue-950 mb-1 text-sm md:text-base truncate">{photo.title}</h3>
                        <div className="flex items-center justify-between text-xs">
                          <span className="inline-flex items-center text-blue-950/60">
                            <Tag className="w-3 h-3 mr-1" />
                            {photo.category}
                          </span>
                          <span className="inline-flex items-center text-blue-950/60">
                            <Calendar className="w-3 h-3 mr-1" />
                            {photo.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Full Screen Modal */}
      {modalOpen && filteredPhotos.length > 0 && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-6xl max-h-full">
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-yellow-500 transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="relative">
              <img
                src={currentPhotos[currentImageIndex]?.url}
                alt={currentPhotos[currentImageIndex]?.title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl mx-auto"
              />
              
              {/* Navigation Arrows */}
              <button
                onClick={() => navigateImage('prev')}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => navigateImage('next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Image Info and Actions */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-black/70 text-white p-4 rounded-lg">
              <div className="min-w-0">
                <h3 className="font-semibold text-yellow-500 truncate">{currentPhotos[currentImageIndex]?.title}</h3>
                <div className="flex flex-wrap items-center gap-3 text-sm text-yellow-200 mt-1">
                  <span className="inline-flex items-center">
                    <Tag className="w-3 h-3 mr-1" />
                    {currentPhotos[currentImageIndex]?.category}
                  </span>
                  <span className="inline-flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {currentPhotos[currentImageIndex]?.date}
                  </span>
                </div>
              </div>
              <button
                onClick={downloadImage}
                className="bg-yellow-500 hover:bg-yellow-600 text-blue-950 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all whitespace-nowrap"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>

            {/* Image Counter */}
            <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {currentPhotos.length}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
