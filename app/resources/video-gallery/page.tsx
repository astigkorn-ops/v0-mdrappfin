"use client"

import { useState } from "react"
import { 
  Download, 
  X, 
  Play, 
  Clock, 
  Calendar, 
  Tag, 
  Search, 
  Filter,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

interface Video {
  id: number
  title: string
  category: string
  date: string
  duration: string
  thumbnail: string
  url: string
}

interface Album {
  id: number
  name: string
  description: string
  count: number
  coverImage: string
  videos: number[]
}

const albums: Album[] = [
  {
    id: 1,
    name: "DRRM Training Sessions",
    description: "Community training and workshops",
    count: 3,
    coverImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    videos: [1, 3, 6],
  },
  {
    id: 2,
    name: "Emergency Response",
    description: "Real emergency response operations",
    count: 2,
    coverImage: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop",
    videos: [2, 8],
  },
  {
    id: 3,
    name: "Community Events",
    description: "Public awareness campaigns",
    count: 2,
    coverImage: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop",
    videos: [4, 7],
  },
  {
    id: 4,
    name: "Disaster Documentation",
    description: "Historical disaster events",
    count: 1,
    coverImage: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop",
    videos: [5],
  },
]

const videos: Video[] = [
  {
    id: 1,
    title: "Earthquake Drill Training",
    category: "Training",
    date: "2024-01-15",
    duration: "3:45",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForestCamping.mp4",
  },
  {
    id: 2,
    title: "Flood Response Operation",
    category: "Emergency",
    date: "2024-01-20",
    duration: "2:30",
    thumbnail: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
  },
  {
    id: 3,
    title: "Fire Safety Workshop",
    category: "Training",
    date: "2024-01-25",
    duration: "4:12",
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
  },
  {
    id: 4,
    title: "Community Awareness Campaign",
    category: "Event",
    date: "2024-02-01",
    duration: "1:58",
    thumbnail: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    id: 5,
    title: "Typhoon Aftermath Documentation",
    category: "Documentation",
    date: "2024-02-05",
    duration: "5:20",
    thumbnail: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
  {
    id: 6,
    title: "First Aid Training",
    category: "Training",
    date: "2024-02-10",
    duration: "3:33",
    thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  },
  {
    id: 7,
    title: "Disaster Preparedness Fair",
    category: "Event",
    date: "2024-02-15",
    duration: "2:45",
    thumbnail: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300&fit=crop",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  },
  {
    id: 8,
    title: "Rescue Operation Training",
    category: "Emergency",
    date: "2024-02-20",
    duration: "4:07",
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
  },
]

export default function VideoGallery() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [currentAlbumId, setCurrentAlbumId] = useState<number | null>(null)
  const [currentVideos, setCurrentVideos] = useState(videos)
  const [modalOpen, setModalOpen] = useState(false)
  const [galleryTitle, setGalleryTitle] = useState("DRRM Captured Events")
  const [galleryDescription, setGalleryDescription] = useState("A curated collection of events & activities")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Get unique categories for filter
  const categories = ["all", ...Array.from(new Set(videos.map(video => video.category)))]

  const selectAlbum = (albumId: number | null) => {
    setCurrentAlbumId(albumId)

    if (albumId === null) {
      setCurrentVideos(videos)
      setGalleryTitle("DRRM Captured Events")
      setGalleryDescription("A curated collection of events & activities")
    } else {
      const album = albums.find((a) => a.id === albumId)
      if (album) {
        setCurrentVideos(videos.filter((video) => album.videos.includes(video.id)))
        setGalleryTitle(album.name)
        setGalleryDescription(album.description)
      }
    }
  }

  const openModal = (index: number) => {
    setCurrentVideoIndex(index)
    setModalOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setModalOpen(false)
    document.body.style.overflow = "auto"
  }

  const downloadVideo = () => {
    const video = currentVideos[currentVideoIndex]
    const a = document.createElement("a")
    a.href = video.url
    a.download = `${video.title.replace(/\s+/g, "_")}.mp4`
    a.target = "_blank"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const navigateVideo = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentVideoIndex((prev) => (prev + 1) % currentVideos.length)
    } else {
      setCurrentVideoIndex((prev) => (prev - 1 + currentVideos.length) % currentVideos.length)
    }
  }

  // Filter videos based on search and category
  const filteredVideos = currentVideos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         video.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || video.category === selectedCategory
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

      <div className="relative z-10">
        {/* Main Gallery */}
        <div className="p-4 md:p-8">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-4xl font-bold text-blue-950 mb-2">{galleryTitle}</h1>
            <p className="text-blue-950/70 text-sm md:text-base">{galleryDescription}</p>
          </div>

          {/* Album Navigation */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => selectAlbum(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                currentAlbumId === null
                  ? 'bg-yellow-500 text-blue-950 shadow-md'
                  : 'bg-blue-950/10 text-blue-950 hover:bg-blue-950/20'
              }`}
            >
              All Videos
            </button>
            {albums.map((album) => (
              <button
                key={album.id}
                onClick={() => selectAlbum(album.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  currentAlbumId === album.id
                    ? 'bg-yellow-500 text-blue-950 shadow-md'
                    : 'bg-blue-950/10 text-blue-950 hover:bg-blue-950/20'
                }`}
              >
                {album.name}
              </button>
            ))}
          </div>

          {/* Search and Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-950/40 w-5 h-5" />
              <input
                type="text"
                placeholder="Search videos..."
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

          {filteredVideos.length === 0 ? (
            <div className="text-center py-12">
              <Play className="w-16 h-16 text-blue-950/20 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-blue-950 mb-2">No Videos Found</h3>
              <p className="text-blue-950/70">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredVideos.map((video, index) => {
                const originalIndex = currentVideos.findIndex(v => v.id === video.id);
                return (
                  <div
                    key={video.id}
                    onClick={() => openModal(originalIndex)}
                    className="bg-white rounded-xl shadow-sm overflow-hidden border border-blue-950/10 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group"
                  >
                    <div className="aspect-video overflow-hidden relative">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
                          <Play className="w-8 h-8 text-blue-950 ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-blue-950 mb-1 text-sm md:text-base truncate">{video.title}</h3>
                      <div className="flex items-center justify-between text-xs">
                        <span className="inline-flex items-center text-blue-950/60">
                          <Tag className="w-3 h-3 mr-1" />
                          {video.category}
                        </span>
                        <span className="inline-flex items-center text-blue-950/60">
                          <Calendar className="w-3 h-3 mr-1" />
                          {video.date}
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

      {/* Full Screen Video Modal */}
      {modalOpen && filteredVideos.length > 0 && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-6xl max-h-full">
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-yellow-500 transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="relative">
              <video
                className="max-w-full max-h-[80vh] rounded-lg shadow-2xl mx-auto"
                controls
                autoPlay
                src={currentVideos[currentVideoIndex]?.url}
              >
                Your browser does not support the video tag.
              </video>
              
              {/* Navigation Arrows */}
              <button
                onClick={() => navigateVideo('prev')}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => navigateVideo('next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Video Info and Actions */}
            <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-black/70 text-white p-4 rounded-lg">
              <div className="min-w-0">
                <h3 className="font-semibold text-yellow-500 truncate">{currentVideos[currentVideoIndex]?.title}</h3>
                <div className="flex flex-wrap items-center gap-3 text-sm text-yellow-200 mt-1">
                  <span className="inline-flex items-center">
                    <Tag className="w-3 h-3 mr-1" />
                    {currentVideos[currentVideoIndex]?.category}
                  </span>
                  <span className="inline-flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {currentVideos[currentVideoIndex]?.date}
                  </span>
                  <span className="inline-flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {currentVideos[currentVideoIndex]?.duration}
                  </span>
                </div>
              </div>
              <button
                onClick={downloadVideo}
                className="bg-yellow-500 hover:bg-yellow-600 text-blue-950 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all whitespace-nowrap"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>

            {/* Video Counter */}
            <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
              {currentVideoIndex + 1} / {currentVideos.length}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
