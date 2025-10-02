"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { GalleryHorizontal, Video } from 'lucide-react';

const GallerySection = () => {
  const [galleryImages, setGalleryImages] = useState(false);

  // Gallery items data
  const galleryItems = [
    { id: 1, title: "Community Event", category: "event" },
    { id: 2, title: "Training Session", category: "training" },
    { id: 3, title: "Disaster Prep", category: "prep" },
    { id: 4, title: "Volunteer Work", category: "volunteer" },
    { id: 5, title: "Emergency Drill", category: "drill" },
    { id: 6, title: "Community Outreach", category: "outreach" },
    { id: 7, title: "First Aid", category: "aid" },
    { id: 8, title: "Evacuation", category: "evacuation" },
    { id: 9, title: "Relief Distribution", category: "relief" },
    { id: 10, title: "Awareness Campaign", category: "campaign" }
  ];

  // Duplicate items for seamless looping
  const duplicatedItems = [...galleryItems, ...galleryItems, ...galleryItems];

  return (
    <div className="flex flex-col justify-center items-center bg-blue-950">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        body {
          font-family: 'Poppins', sans-serif;
          overflow-x: hidden;
        }
        
        .compact-scrolling-wrapper {
          animation: scroll 30s linear infinite;
          width: fit-content;
        }
        
        .compact-scrolling-wrapper:hover {
          animation-play-state: paused;
        }
        
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .compact-gallery-item {
          transition: all 0.3s ease;
        }
        
        .compact-gallery-item:hover {
          transform: scale(1.03);
          box-shadow: 0 8px 20px rgba(1, 33, 132, 0.25);
        }
        
        .compact-fade-overlay {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 60px;
          z-index: 10;
          pointer-events: none;
        }
        
        .compact-fade-left {
          left: 0;
          background: linear-gradient(to right, white, transparent);
        }
        
        .compact-fade-right {
          right: 0;
          background: linear-gradient(to left, white, transparent);
        }
      `}</style>

      {/* Compact Widget Container */}
      <div 
        className="w-full shadow-xl overflow-hidden"
        style={{ maxWidth: 'auto', height: '480px' }}
      >
        {/* Header Section */}
        <div className="flex flex-col">
          {/* Top yellow line */}
          <div className="h-2 w-full bg-yellow-500" />

          {/* Main content */}
        <div className="bg-white text-white p-6 flex flex-col items-center justify-center">
            <h1 className="section-title text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Activities & Events
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Photos from disaster preparedness activities
            </p>
          </div>
        </div>

        {/* Infinity Scrolling Gallery */}
        <div 
          className="relative bg-white p-4"
          style={{ height: '300px' }}
          onMouseEnter={() => setGalleryImages(true)}
          onMouseLeave={() => setGalleryImages(false)}
        >
          <div className="compact-fade-overlay compact-fade-left"></div>
          <div className="compact-fade-overlay compact-fade-right"></div>
          <div className={`compact-scrolling-wrapper flex space-x-4 h-full items-center ${galleryImages ? 'opacity-90' : 'opacity-100'} transition-opacity duration-300`}>
            {duplicatedItems.map((item, index) => (
              <div 
                key={`${item.id}-${index}`} 
                className="compact-gallery-item flex-shrink-0 w-48 h-70 rounded-lg overflow-hidden shadow-md"
              >
                <img 
                  src={`https://placehold.co/200x200/${index % 2 === 0 ? '012184/ffffff' : 'fcd530/012184'}?text=${encodeURIComponent(item.title)}`} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Section */}
  <div className="relative flex inset-0 bg-gray-200 py-2 px-6 flex justify-center items-center gap-6">
          <Link href="/resources/gallery" passHref>
            <button className="flex items-center gap-4 bg-[#012184] hover:bg-blue-900 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300 shadow-md text-sm">
              <GalleryHorizontal size={18} />
              Visit Gallery
            </button>
          </Link>
          <Link href="/resources/video-gallery" passHref>
            <button className="flex items-center gap-2 bg-[#fcd530] hover:bg-yellow-600 text-[#012184] font-medium py-2 px-6 rounded-lg transition-colors duration-300 shadow-md text-sm">
              <Video size={18} />
              Visit Videos
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GallerySection;
