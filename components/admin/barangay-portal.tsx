import React, { useState, useEffect } from 'react';
import { Search, MapPin, Phone, User, Calendar, FileText, Users, Building, AlertTriangle, Send, X, Check, Map, Plus, Edit, Trash2, Save } from 'lucide-react';

export default function App() {
  const [barangays, setBarangays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBarangay, setSelectedBarangay] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingBarangay, setEditingBarangay] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    population: '',
    households: '',
    area: '',
    elevation: '',
    barangayCaptain: '',
    history: ''
  });

  // Mock data - in real app this would come from API
  const mockBarangays = [
    "Agol", "Alabangpuro", "Banawan", "Barangay I", "Barangay II", "Barangay III", 
    "Barangay IV", "Barangay V", "Basicao Coastal", "Basicao Interior", "Binodegahan", 
    "Buenavista", "Buyo", "Caratagan", "Cuyaoyao", "Flores", "La Medalla", "Lawinon", 
    "Macasitas", "Malapay", "Malidong", "Mamlad", "Marigondon", "Matanglad", 
    "Nablangbulod", "Oringon", "Palapas", "Panganiran", "Rawis", "Salvacion", 
    "Santo Cristo", "Sukip", "Tibabo"
  ];

  // Simulate fetching data from backend
  useEffect(() => {
    const fetchBarangays = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        // In real app: const response = await fetch('/api/barangays');
        // const data = await response.json();
        const mockData = mockBarangays.map((name, index) => ({
          id: index + 1,
          name: name,
          population: "2,450",
          households: "520",
          area: "15.6 km²",
          elevation: "12 meters",
          barangayCaptain: `Hon. Captain ${name.split(' ')[0]}`,
          history: `History of ${name} barangay...`
        }));
        setBarangays(mockData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load barangays');
        setLoading(false);
      }
    };

    fetchBarangays();
  }, []);

  const filteredBarangays = barangays.filter(barangay => 
    barangay.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission for create/update
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingBarangay) {
        // Update existing barangay
        await new Promise(resolve => setTimeout(resolve, 500));
        // In real app: await fetch(`/api/barangays/${editingBarangay.id}`, { method: 'PUT', ... });
        setBarangays(prev => 
          prev.map(barangay => 
            barangay.id === editingBarangay.id ? { ...formData, id: editingBarangay.id } : barangay
          )
        );
        setEditingBarangay(null);
      } else {
        // Create new barangay
        await new Promise(resolve => setTimeout(resolve, 500));
        // In real app: const response = await fetch('/api/barangays', { method: 'POST', ... });
        // const newBarangay = await response.json();
        const newId = Math.max(...barangays.map(b => b.id), 0) + 1;
        setBarangays(prev => [...prev, { ...formData, id: newId }]);
        setShowAddForm(false);
      }
      
      // Reset form
      setFormData({
        name: '',
        population: '',
        households: '',
        area: '',
        elevation: '',
        barangayCaptain: '',
        history: ''
      });
    } catch (err) {
      setError('Failed to save barangay');
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      // Confirm deletion
      if (!window.confirm('Are you sure you want to delete this barangay?')) {
        return;
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
      // In real app: await fetch(`/api/barangays/${id}`, { method: 'DELETE' });
      setBarangays(prev => prev.filter(barangay => barangay.id !== id));
    } catch (err) {
      setError('Failed to delete barangay');
    }
  };

  // Handle edit
  const handleEdit = (barangay) => {
    setEditingBarangay(barangay);
    setFormData({
      name: barangay.name,
      population: barangay.population,
      households: barangay.households,
      area: barangay.area,
      elevation: barangay.elevation,
      barangayCaptain: barangay.barangayCaptain,
      history: barangay.history
    });
  };

  // Handle cancel
  const handleCancel = () => {
    setEditingBarangay(null);
    setShowAddForm(false);
    setFormData({
      name: '',
      population: '',
      households: '',
      area: '',
      elevation: '',
      barangayCaptain: '',
      history: ''
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-950 mx-auto mb-4"></div>
          <p className="text-gray-600 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Loading barangays...
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
            <AlertTriangle className="text-red-600" size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Error Loading Barangays
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

  if (!selectedBarangay) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 font-sans">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-950 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              PIO DURAN BARANGAY PORTAL
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Access information and services for all 33 barangays in Pio Duran, Albay
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-blue-950">
              <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-blue-950 mb-4 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Select Your Barangay
                  </h2>
                  <p className="text-gray-600 mb-6 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Choose from the list of 33 barangays in Pio Duran to access barangay-specific information and services.
                  </p>
                </div>
                
                <div className="flex space-x-3">
                  <div className="relative">
                    <button
                      onClick={() => setShowSearch(!showSearch)}
                      className="bg-blue-950 hover:bg-blue-900 text-white font-semibold py-3 px-4 rounded-xl flex items-center transition-all duration-300 shadow-lg font-sans"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      <Search size={20} />
                    </button>
                    
                    {showSearch && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-10">
                        <div className="p-4 border-b border-gray-100">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                              type="text"
                              placeholder="Search barangay..."
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-transparent font-sans"
                              style={{ fontFamily: 'Poppins, sans-serif' }}
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-blue-950 hover:bg-blue-900 text-white font-semibold py-3 px-4 rounded-xl flex items-center transition-all duration-300 shadow-lg font-sans"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    <Edit size={20} />
                  </button>
                  
                  {isEditing && (
                    <button
                      onClick={() => {
                        setShowAddForm(true);
                        setEditingBarangay(null);
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-blue-950 font-semibold py-3 px-4 rounded-xl flex items-center transition-all duration-300 shadow-lg font-sans"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      <Plus size={20} />
                    </button>
                  )}
                </div>
              </div>
              
              {/* Add/Edit Form */}
              {(showAddForm || editingBarangay) && (
                <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-blue-950 mb-4 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {editingBarangay ? 'Edit Barangay' : 'Add New Barangay'}
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Barangay Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-transparent font-sans"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                        placeholder="Enter barangay name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Population
                      </label>
                      <input
                        type="text"
                        name="population"
                        value={formData.population}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-transparent font-sans"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                        placeholder="Enter population"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Households
                      </label>
                      <input
                        type="text"
                        name="households"
                        value={formData.households}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-transparent font-sans"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                        placeholder="Enter households"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Area
                      </label>
                      <input
                        type="text"
                        name="area"
                        value={formData.area}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-transparent font-sans"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                        placeholder="Enter area"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Elevation
                      </label>
                      <input
                        type="text"
                        name="elevation"
                        value={formData.elevation}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-transparent font-sans"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                        placeholder="Enter elevation"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Barangay Captain
                      </label>
                      <input
                        type="text"
                        name="barangayCaptain"
                        value={formData.barangayCaptain}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-transparent font-sans"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                        placeholder="Enter barangay captain"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        History
                      </label>
                      <textarea
                        name="history"
                        value={formData.history}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-transparent font-sans"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                        placeholder="Enter barangay history"
                      ></textarea>
                    </div>
                    
                    <div className="md:col-span-2 flex space-x-3 mt-4">
                      <button
                        type="submit"
                        className="flex items-center px-4 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900 transition font-sans"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        <Save size={18} className="mr-2" />
                        {editingBarangay ? 'Update Barangay' : 'Add Barangay'}
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
              
              <div className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto p-2">
                  {filteredBarangays.map((barangay) => (
                    <div
                      key={barangay.id}
                      className="relative text-left p-3 rounded-lg bg-gray-50 hover:bg-blue-50 hover:border-blue-200 border border-gray-200 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <MapPin className="text-blue-950 mr-2" size={16} />
                          <span className="text-gray-700 font-medium">{barangay.name}</span>
                        </div>
                        
                        {isEditing && (
                          <div className="flex space-x-1">
                            <button
                              onClick={() => handleEdit(barangay)}
                              className="p-1 bg-blue-950 text-white rounded hover:bg-blue-900 transition"
                            >
                              <Edit size={12} />
                            </button>
                            <button
                              onClick={() => handleDelete(barangay.id)}
                              className="p-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        )}
                      </div>
                      
                      <button
                        onClick={() => setSelectedBarangay(barangay)}
                        className="mt-2 w-full py-2 bg-blue-950 hover:bg-blue-900 text-white text-sm rounded-lg transition-colors font-sans"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-950">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <button 
                onClick={() => setSelectedBarangay(null)}
                className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X size={24} className="text-blue-950" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-blue-950 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {selectedBarangay.name.toUpperCase()}
                </h1>
                <p className="text-gray-600 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Barangay Portal - Pio Duran, Albay
                </p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-blue-950 hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg flex items-center transition-colors duration-300 shadow-md font-sans"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                <Edit size={18} className="mr-2" />
                Edit
              </button>
              
              {isEditing && (
                <button
                  onClick={() => handleEdit(selectedBarangay)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-blue-950 font-semibold py-2 px-4 rounded-lg flex items-center transition-colors duration-300 shadow-md font-sans"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  <Edit size={18} className="mr-2" />
                  Edit Details
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Google Map Section */}
        <section className="mb-12 bg-white rounded-2xl shadow-lg p-8 border-t-4 border-blue-950">
          <div className="flex items-center mb-6">
            <Map className="text-blue-950 mr-3" size={28} />
            <h2 className="text-3xl font-bold text-blue-950 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Location
            </h2>
          </div>
          <div className="bg-gray-200 rounded-xl h-96 flex items-center justify-center mb-6">
            <div className="text-center">
              <Map className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600 font-medium font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Google Maps Integration
              </p>
              <p className="text-gray-500 mt-2 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Interactive map showing {selectedBarangay.name} location in Pio Duran, Albay
              </p>
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-blue-950 font-medium font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Google Maps Search Format: <span className="font-bold">{selectedBarangay.name}, Pio Duran, Albay</span>
            </p>
          </div>
        </section>

        {/* History Section */}
        <section className="mb-12 bg-white rounded-2xl shadow-lg p-8 border-t-4 border-blue-950">
          <div className="flex items-center mb-6">
            <FileText className="text-blue-950 mr-3" size={28} />
            <h2 className="text-3xl font-bold text-blue-950 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Barangay History
            </h2>
          </div>
          <div className="prose max-w-none text-gray-700">
            <p className="mb-4 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
              {selectedBarangay.history || `${selectedBarangay.name} has a rich history dating back to the early Spanish colonial period. 
              Originally inhabited by the indigenous Bicolano people, the barangay was formally established 
              in the late 1800s as part of the municipality of Pio Duran.`}
            </p>
            <p className="mb-4 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
              The barangay played a significant role during the Philippine Revolution against Spain and 
              later during World War II. Its strategic location along the coast made it an important 
              trading point for local goods and agricultural products.
            </p>
            <p className="font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Today, {selectedBarangay.name} continues to thrive as a vibrant community with a strong emphasis 
              on agriculture, fishing, and small-scale industries. The barangay is known for its 
              cooperative spirit and active participation in local governance and disaster preparedness.
            </p>
          </div>
        </section>

        {/* Profile Section */}
        <section className="mb-12 bg-white rounded-2xl shadow-lg p-8 border-t-4 border-blue-950">
          <div className="flex items-center mb-6">
            <User className="text-blue-950 mr-3" size={28} />
            <h2 className="text-3xl font-bold text-blue-950 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Barangay Profile
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 text-center">
              <h3 className="text-lg font-bold text-blue-950 mb-2 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Population
              </h3>
              <p className="text-3xl font-bold text-blue-950 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {selectedBarangay.population}
              </p>
            </div>
            
            <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200 text-center">
              <h3 className="text-lg font-bold text-blue-950 mb-2 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Households
              </h3>
              <p className="text-3xl font-bold text-blue-950 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {selectedBarangay.households}
              </p>
            </div>
            
            <div className="bg-green-50 rounded-xl p-6 border border-green-200 text-center">
              <h3 className="text-lg font-bold text-blue-950 mb-2 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Area
              </h3>
              <p className="text-3xl font-bold text-blue-950 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {selectedBarangay.area}
              </p>
            </div>
            
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200 text-center">
              <h3 className="text-lg font-bold text-blue-950 mb-2 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Elevation
              </h3>
              <p className="text-3xl font-bold text-blue-950 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {selectedBarangay.elevation}
              </p>
            </div>
          </div>
        </section>

        {/* Barangay Captain Section */}
        <section className="mb-12 bg-white rounded-2xl shadow-lg p-8 border-t-4 border-blue-950">
          <div className="flex items-center mb-6">
            <Users className="text-blue-950 mr-3" size={28} />
            <h2 className="text-3xl font-bold text-blue-950 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Barangay Captain
            </h2>
          </div>
          <div className="flex items-center p-6 bg-gradient-to-r from-blue-950 to-blue-800 rounded-xl text-white">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mr-6">
              <User className="text-blue-950" size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-bold font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {selectedBarangay.barangayCaptain}
              </h3>
              <p className="text-blue-200 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Elected Barangay Captain
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Edit Form Modal */}
      {editingBarangay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-950 to-blue-900 text-white">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Edit Barangay Details
                </h3>
                <button 
                  onClick={handleCancel}
                  className="p-2 rounded-lg hover:bg-blue-800"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Barangay Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-transparent font-sans"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                    placeholder="Enter barangay name"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Population
                    </label>
                    <input
                      type="text"
                      name="population"
                      value={formData.population}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-transparent font-sans"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                      placeholder="Enter population"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Households
                    </label>
                    <input
                      type="text"
                      name="households"
                      value={formData.households}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-transparent font-sans"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                      placeholder="Enter households"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Area
                    </label>
                    <input
                      type="text"
                      name="area"
                      value={formData.area}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-transparent font-sans"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                      placeholder="Enter area"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Elevation
                    </label>
                    <input
                      type="text"
                      name="elevation"
                      value={formData.elevation}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-transparent font-sans"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                      placeholder="Enter elevation"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Barangay Captain
                  </label>
                  <input
                    type="text"
                    name="barangayCaptain"
                    value={formData.barangayCaptain}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-transparent font-sans"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                    placeholder="Enter barangay captain"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    History
                  </label>
                  <textarea
                    name="history"
                    value={formData.history}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-transparent font-sans"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                    placeholder="Enter barangay history"
                  ></textarea>
                </div>
                
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-sans"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-950 hover:bg-blue-900 text-white rounded-lg flex items-center transition-colors font-semibold font-sans"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    <Save className="mr-2" size={18} />
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
