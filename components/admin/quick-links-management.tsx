import React, { useState, useEffect } from 'react';
import { Cloud, FileText, Home, Heart, Phone, AlertTriangle, Map, Plus, Edit, Trash2, Save, X, AlertCircle } from 'lucide-react';

type QuickLink = {
  id: number;
  title: string;
  icon: string;
  href: string;
  color: string;
};

export default function QuickLinksManagement() {
  const [quickLinks, setQuickLinks] = useState<QuickLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingLink, setEditingLink] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    icon: 'Cloud',
    href: '',
    color: 'bg-blue-500'
  });

  // Icon options
  const iconOptions = {
    Cloud: Cloud,
    AlertTriangle: AlertTriangle,
    Map: Map,
    FileText: FileText,
    Home: Home,
    Heart: Heart,
    Phone: Phone
  };

  // Color options
  const colorOptions = [
    'bg-blue-500',
    'bg-yellow-500',
    'bg-red-500',
    'bg-green-500',
    'bg-orange-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500'
  ];

  // Simulate fetching data from backend
  useEffect(() => {
    const fetchQuickLinks = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        // In real app: const response = await fetch('/api/quick-links');
        // const data = await response.json();
        const mockData = [
          {
            id: 1,
            title: 'Weather Monitoring',
            icon: 'Cloud',
            href: '/weather',
            color: 'bg-blue-500'
          },
          {
            id: 2,
            title: 'Early Warning',
            icon: 'AlertTriangle',
            href: '/early-warning',
            color: 'bg-yellow-500'
          },
          {
            id: 3,
            title: 'Hazard Map',
            icon: 'Map',
            href: '/hazard-map',
            color: 'bg-red-500'
          },
          {
            id: 4,
            title: 'Situational Reports',
            icon: 'FileText',
            href: '/reports',
            color: 'bg-green-500'
          },
          {
            id: 5,
            title: 'Evacuation Center',
            icon: 'Home',
            href: '/evacuation',
            color: 'bg-orange-500'
          },
          {
            id: 6,
            title: 'Relief Operations',
            icon: 'Heart',
            href: '/relief',
            color: 'bg-red-500'
          },
          {
            id: 7,
            title: 'Contact Us',
            icon: 'Phone',
            href: '/contact',
            color: 'bg-purple-500'
          }
        ];
        setQuickLinks(mockData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load quick links');
        setLoading(false);
      }
    };

    fetchQuickLinks();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission for create/update
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      if (editingLink) {
        // Update existing link
        await new Promise(resolve => setTimeout(resolve, 500));
        // In real app: await fetch(`/api/quick-links/${editingLink.id}`, { method: 'PUT', ... });
        setQuickLinks(prev => 
          prev.map(link => 
            link.id === editingLink.id ? { ...formData, id: editingLink.id } : link
          )
        );
        setEditingLink(null);
      } else {
        // Create new link
        await new Promise(resolve => setTimeout(resolve, 500));
        // In real app: const response = await fetch('/api/quick-links', { method: 'POST', ... });
        // const newLink = await response.json();
        const newId = Math.max(...quickLinks.map(l => l.id), 0) + 1;
        setQuickLinks(prev => [...prev, { ...formData, id: newId }]);
        setShowAddForm(false);
      }
      
      // Reset form
      setFormData({
        title: '',
        icon: 'Cloud',
        href: '',
        color: 'bg-blue-500'
      });
    } catch (err) {
      setError('Failed to save quick link');
    }
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    try {
      // Confirm deletion
      if (!window.confirm('Are you sure you want to delete this quick link?')) {
        return;
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
      // In real app: await fetch(`/api/quick-links/${id}`, { method: 'DELETE' });
      setQuickLinks(prev => prev.filter(link => link.id !== id));
    } catch (err) {
      setError('Failed to delete quick link');
    }
  };

  // Handle edit
  const handleEdit = (link: QuickLink) => {
    setEditingLink(link);
    setFormData({
      title: link.title,
      icon: link.icon,
      href: link.href,
      color: link.color
    });
  };

  // Handle cancel
  const handleCancel = () => {
    setEditingLink(null);
    setShowAddForm(false);
    setFormData({
      title: '',
      icon: 'Cloud',
      href: '',
      color: 'bg-blue-500'
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-950 mx-auto mb-4"></div>
          <p className="text-gray-600 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Loading quick links...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center p-6 max-w-md">
          <div className="bg-red-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="text-red-600" size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Error Loading Quick Links
          </h3>
          <p className="text-gray-600 font-sans mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900 transition font-sans"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center mb-2">
                <div className="bg-yellow-500 p-2 rounded-lg mr-3">
                  <Home className="text-blue-950" size={24} />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-blue-950" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Quick Links Management
                </h1>
              </div>
              <p className="text-gray-600 font-sans ml-12" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Manage and customize your quick navigation links
              </p>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center px-4 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900 transition font-sans"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {isEditing ? (
                  <>
                    <X size={18} className="mr-2" />
                    Cancel Editing
                  </>
                ) : (
                  <>
                    <Edit size={18} className="mr-2" />
                    Edit Links
                  </>
                )}
              </button>
              
              {isEditing && (
                <button
                  onClick={() => {
                    setShowAddForm(true);
                    setEditingLink(null);
                  }}
                  className="flex items-center px-4 py-2 bg-yellow-500 text-blue-950 rounded-lg hover:bg-yellow-600 transition font-sans"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  <Plus size={18} className="mr-2" />
                  Add Link
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Quick Links Preview */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Current Quick Links
          </h2>
          <div className="w-full bg-white shadow-xl overflow-hidden border-x-4 border-y-4 border-t-blue-950 border-b-yellow-500 rounded-lg">
            <div className="py-6">
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 md:gap-4 w-full">
                {quickLinks.map((link) => {
                  const IconComponent = iconOptions[link.icon];
                  return (
                    <div
                      key={link.id}
                      className="flex flex-col items-center justify-center p-3 md:p-4 hover:bg-gray-50 transition-all duration-300 group rounded-lg mx-2 relative"
                    >
                      <div className={`${link.color} w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                        {IconComponent && <IconComponent className="text-white" size={24} />}
                      </div>
                      <h3 className="text-xs md:text-sm font-semibold text-center text-gray-800 group-hover:text-blue-950 transition-colors duration-200 leading-tight">
                        {link.title}
                      </h3>
                      
                      {isEditing && (
                        <div className="absolute top-1 right-1 flex space-x-1">
                          <button
                            onClick={() => handleEdit(link)}
                            className="p-1 bg-blue-950 text-white rounded hover:bg-blue-900 transition"
                          >
                            <Edit size={12} />
                          </button>
                          <button
                            onClick={() => handleDelete(link.id)}
                            className="p-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Add/Edit Form */}
        {(showAddForm || editingLink) && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {editingLink ? 'Edit Quick Link' : 'Add New Quick Link'}
            </h2>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Link Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-blue-950 font-sans"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                    placeholder="Enter link title"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Link URL
                  </label>
                  <input
                    type="text"
                    name="href"
                    value={formData.href}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-blue-950 font-sans"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                    placeholder="/example-page"
                  />
                </div>
              </div>
              
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Icon
                  </label>
                  <select
                    name="icon"
                    value={formData.icon}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-blue-950 font-sans"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {Object.keys(iconOptions).map(iconName => (
                      <option key={iconName} value={iconName}>{iconName}</option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Background Color
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {colorOptions.map(color => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setFormData(prev => ({...prev, color}))}
                        className={`w-8 h-8 rounded-full ${color} ${
                          formData.color === color 
                            ? 'ring-2 ring-blue-950 ring-offset-2' 
                            : ''
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2 flex space-x-3 mt-4">
                <button
                  type="submit"
                  className="flex items-center px-4 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900 transition font-sans"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  <Save size={18} className="mr-2" />
                  {editingLink ? 'Update Link' : 'Add Link'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex items-center px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition font-sans"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  <X size={18} className="mr-2" />
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-bold text-blue-950 mb-2 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Total Links
            </h3>
            <p className="text-3xl font-bold text-blue-950 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {quickLinks.length}
            </p>
          </div>
          
          <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
            <h3 className="text-lg font-bold text-blue-950 mb-2 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Active Editing
            </h3>
            <p className="text-3xl font-bold text-blue-950 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {isEditing ? 'ON' : 'OFF'}
            </p>
          </div>
          
          <div className="bg-green-50 rounded-xl p-6 border border-green-200">
            <h3 className="text-lg font-bold text-blue-950 mb-2 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Last Updated
            </h3>
            <p className="text-lg font-bold text-blue-950 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Just now
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-bold text-blue-950 mb-3 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
            How to Use Quick Links Management
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <li>Click "Edit Links" to enable editing mode</li>
            <li>Use the edit icon on each link to modify its properties</li>
            <li>Use the trash icon to remove unwanted links</li>
            <li>Click "Add Link" to create new quick links</li>
            <li>All changes are saved automatically</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
