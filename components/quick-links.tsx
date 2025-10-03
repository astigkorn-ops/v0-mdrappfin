import React from 'react';
import { Cloud, FileText, Home, Heart, Phone, AlertTriangle, Map } from 'lucide-react';

const QuickLinks = () => {
  const quickLinks = [
    {
      id: 1,
      title: 'Weather Monitoring',
      icon: Cloud,
      href: '/weather',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'Early Warning',
      icon: AlertTriangle,
      href: '/early-warning',
      color: 'bg-yellow-500'
    },
    {
      id: 3,
      title: 'Hazard Map',
      icon: Map,
      href: '/hazard-map',
      color: 'bg-red-500'
    },
    {
      id: 4,
      title: 'Situational Reports',
      icon: FileText,
      href: '/reports',
      color: 'bg-green-500'
    },
    {
      id: 5,
      title: 'Evacuation Center',
      icon: Home,
      href: '/evacuation',
      color: 'bg-orange-500'
    },
    {
      id: 6,
      title: 'Relief Operations',
      icon: Heart,
      href: '/relief',
      color: 'bg-red-500'
    },
    {
      id: 7,
      title: 'Contact Us',
      icon: Phone,
      href: '/contact',
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="w-full bg-white shadow-xl overflow-hidden border-x-4 border-y-4 border-t-blue-950 border-b-yellow-500" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="py-6">
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 md:gap-4 w-full">
          {quickLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <a
                key={link.id}
                href={link.href}
                className="flex flex-col items-center justify-center p-3 md:p-4 hover:bg-gray-50 transition-all duration-300 group rounded-lg mx-2"
              >
                <div className={`${link.color} w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                  <IconComponent className="text-white" size={24} />
                </div>
                <h3 className="text-xs md:text-sm font-semibold text-center text-gray-800 group-hover:text-blue-950 transition-colors duration-200 leading-tight">
                  {link.title}
                </h3>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuickLinks;
