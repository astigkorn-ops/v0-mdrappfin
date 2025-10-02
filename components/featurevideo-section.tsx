"use client";
import React, { useState } from 'react';
import { Play, Clock, X } from 'lucide-react';

type Video = {
  id: number;
  title: string;
  thumbnail: string;
  duration: string;
  youtubeId: string;
  views: string;
};

const FeatureVideo = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const videos: Video[] = [
    {
      id: 1,
      title: "Emergency Preparedness Training 2024",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      duration: "12:35",
      youtubeId: "dQw4w9WgXcQ",
      views: "1.2K views"
    },
    {
      id: 2,
      title: "Flood Response Operations",
      thumbnail: "https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg",
      duration: "8:42",
      youtubeId: "jNQXAC9IVRw",
      views: "850 views"
    },
    {
      id: 3,
      title: "Earthquake Safety Guidelines",
      thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg",
      duration: "15:20",
      youtubeId: "9bZkp7q19f0",
      views: "2.1K views"
    },
    {
      id: 4,
      title: "Community Disaster Drills",
      thumbnail: "https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg",
      duration: "10:15",
      youtubeId: "kJQP7kiw5Fk",
      views: "1.5K views"
    },
    {
      id: 5,
      title: "Typhoon Preparedness Measures",
      thumbnail: "https://img.youtube.com/vi/CevxZvSJLk8/maxresdefault.jpg",
      duration: "18:30",
      youtubeId: "CevxZvSJLk8",
      views: "3.2K views"
    }
  ];

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="w-full bg-blue-950 py-8" style={{ fontFamily: 'Poppins, sans-serif', height: '400px' }}>
      <div className="max-w-7xl mx-auto px-4 h-full flex flex-col">
        <h2 className="text-2xl font-bold text-yellow-500 mb-6 text-center">Featured Videos</h2>
        
        <div className="flex-1 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-4 md:space-x-6 pb-4">
            {videos.map((video) => (
              <div 
                key={video.id}
                className="flex-shrink-0 w-64 md:w-72 cursor-pointer group"
                onClick={() => handleVideoClick(video)}
              >
                <div className="relative rounded-lg overflow-hidden">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-20 transition-all">
                    <div className="w-12 h-12 bg-yellow-500 bg-opacity-90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="text-blue-950 ml-1" size={20} />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded flex items-center">
                    <Clock size={12} className="mr-1" />
                    {video.duration}
                  </div>
                </div>
                <div className="mt-3">
                  <h3 className="text-white font-medium text-sm line-clamp-2 group-hover:text-yellow-500 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-blue-300 text-xs mt-1">{video.views}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-6 flex justify-center">
          <button 
            className="bg-yellow-500 hover:bg-yellow-400 text-blue-950 font-semibold py-3 px-8 rounded-lg transition-colors flex items-center"
            onClick={() => window.location.href = '/resources/video-gallery'}
          >
            More Videos
          </button>
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-full overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold text-blue-950">{selectedVideo.title}</h3>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}`}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={selectedVideo.title}
              ></iframe>
            </div>
            <div className="p-4">
              <p className="text-gray-600 text-sm">{selectedVideo.views} • {selectedVideo.duration}</p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default FeatureVideo;
