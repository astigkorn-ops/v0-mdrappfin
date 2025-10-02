import React from 'react';
import { Cloud, FileText, Home, Heart, Phone } from 'lucide-react';

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
      title: 'Situational Reports',
      icon: FileText,
      href: '/reports',
      color: 'bg-green-500'
    },
    {
      id: 3,
      title: 'Evacuation Center',
      icon: Home,
      href: '/evacuation',
      color: 'bg-orange-500'
    },
    {
      id: 4,
      title: 'Relief Operations',
      icon: Heart,
      href: '/relief',
      color: 'bg-red-500'
    },
    {
      id: 5,
      title: 'Contact Us',
      icon: Phone,
      href: '/contact',
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="w-full bg-white shadow-lg overflow-hidden" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="h-40 md:h-52 flex items-center">
        <div className="grid grid-cols-5 gap-1 w-full h-full">
          {quickLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <a
                key={link.id}
                href={link.href}
                className="flex flex-col items-center justify-center p-2 md:p-4 hover:bg-gray-50 transition-all duration-300 group"
              >
                <div className={`${link.color} w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="text-white" size={24} />
                </div>
                <h3 className="text-xs md:text-sm font-semibold text-center text-gray-800 group-hover:text-blue-950 transition-colors duration-200">
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
