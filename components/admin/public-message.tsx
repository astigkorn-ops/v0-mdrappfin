import React, { useState, useEffect } from 'react';
import { Mail, User, MessageSquare, Send, CheckCircle, Eye, Trash2, Search, Filter, Calendar, Clock, Reply, Archive, AlertCircle } from 'lucide-react';

export default function PublicMessage() {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isDeleting, setIsDeleting] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate fetching messages from backend
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        // In a real app, this would be:
        // const response = await fetch('/api/messages');
        // const data = await response.json();
        // setMessages(data);
        setMessages([]);
        setLoading(false);
      } catch (err) {
        setError('Failed to load messages');
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleDeleteMessage = async (id) => {
    setIsDeleting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      // In a real app:
      // await fetch(`/api/messages/${id}`, { method: 'DELETE' });
      setMessages(messages.filter(message => message.id !== id));
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage(null);
      }
    } catch (err) {
      setError('Failed to delete message');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      // In a real app:
      // await fetch(`/api/messages/${id}/read`, { method: 'PATCH' });
      setMessages(messages.map(message => 
        message.id === id ? { ...message, status: 'read' } : message
      ));
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage({ ...selectedMessage, status: 'read' });
      }
    } catch (err) {
      setError('Failed to mark as read');
    }
  };

  const handleReply = async () => {
    try {
      // Simulate sending reply
      await new Promise(resolve => setTimeout(resolve, 800));
      // In a real app:
      // await fetch(`/api/messages/${selectedMessage.id}/reply`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ message: replyMessage })
      // });
      alert(`Reply sent to ${selectedMessage.email}:\n\n${replyMessage}`);
      setReplyMessage('');
      setShowReplyForm(false);
    } catch (err) {
      setError('Failed to send reply');
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || message.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const unreadCount = messages.filter(msg => msg.status === 'unread').length;

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-950 mx-auto mb-4"></div>
          <p className="text-gray-600 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Loading messages...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center p-6 max-w-md">
          <div className="bg-red-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="text-red-600" size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Error Loading Messages
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
          <div className="flex items-center mb-2">
            <div className="bg-yellow-500 p-2 rounded-lg mr-3">
              <MessageSquare className="text-blue-950" size={24} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-blue-950" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Message Management
            </h1>
          </div>
          <p className="text-gray-600 font-sans ml-12" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Manage and respond to messages from your visitors
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Messages
                  </h2>
                  {unreadCount > 0 && (
                    <div className="bg-yellow-500 text-blue-950 text-xs font-bold px-2 py-1 rounded-full">
                      {unreadCount} unread
                    </div>
                  )}
                </div>
                
                {/* Search and Filter */}
                <div className="space-y-3">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="text-gray-400" size={18} />
                    </div>
                    <input
                      type="text"
                      placeholder="Search messages..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-blue-950 font-sans"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Filter className="text-gray-500" size={18} />
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="flex-1 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-blue-950 font-sans"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      <option value="all">All Messages</option>
                      <option value="unread">Unread</option>
                      <option value="read">Read</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Messages List */}
              <div className="max-h-[calc(100vh-250px)] overflow-y-auto">
                {filteredMessages.length === 0 ? (
                  <div className="p-6 text-center">
                    <MessageSquare className="mx-auto text-gray-400 mb-2" size={32} />
                    <p className="text-gray-500 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {messages.length === 0 
                        ? 'No messages received yet' 
                        : 'No messages match your search'}
                    </p>
                  </div>
                ) : (
                  filteredMessages.map((message) => (
                    <div
                      key={message.id}
                      onClick={() => setSelectedMessage(message)}
                      className={`p-4 border-b border-gray-100 cursor-pointer transition-all duration-200 hover:bg-blue-50 ${
                        selectedMessage?.id === message.id ? 'bg-blue-100 border-l-4 border-l-yellow-500' : ''
                      } ${message.status === 'unread' ? 'bg-blue-50/50' : ''}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center mb-1">
                            <h3 className="font-bold text-gray-900 truncate font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                              {message.name}
                            </h3>
                            {message.status === 'unread' && (
                              <span className="ml-2 bg-yellow-500 text-blue-950 text-xs font-bold px-2 py-0.5 rounded-full">
                                New
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 truncate font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            {message.email}
                          </p>
                          <p className="text-sm text-gray-500 mt-1 truncate font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            {message.message.substring(0, 60)}...
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center text-xs text-gray-400 mt-2">
                        <Calendar size={12} className="mr-1" />
                        <span className="mr-3">{message.date}</span>
                        <Clock size={12} className="mr-1" />
                        <span>{message.time}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          
          {/* Message Detail */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 h-full">
              {selectedMessage ? (
                <div className="h-full flex flex-col">
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-1 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {selectedMessage.name}
                        </h2>
                        <p className="text-gray-600 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {selectedMessage.email}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        {selectedMessage.status === 'unread' && (
                          <button
                            onClick={() => handleMarkAsRead(selectedMessage.id)}
                            className="px-3 py-1 bg-blue-950 text-white text-sm rounded-lg hover:bg-blue-900 transition font-sans"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                          >
                            Mark as Read
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteMessage(selectedMessage.id)}
                          disabled={isDeleting}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 p-6 overflow-y-auto">
                    <div className="mb-6">
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <Calendar size={16} className="mr-2" />
                        <span className="mr-4">{selectedMessage.date}</span>
                        <Clock size={16} className="mr-2" />
                        <span>{selectedMessage.time}</span>
                      </div>
                      
                      <div className="bg-gray-50 rounded-xl p-5 mb-6">
                        <h3 className="font-bold text-gray-800 mb-3 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          Message:
                        </h3>
                        <p className="text-gray-700 leading-relaxed font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {selectedMessage.message}
                        </p>
                      </div>
                    </div>
                    
                    {/* Reply Section */}
                    {!showReplyForm ? (
                      <button
                        onClick={() => setShowReplyForm(true)}
                        className="flex items-center px-4 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900 transition font-sans mb-6"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        <Reply size={18} className="mr-2" />
                        Reply to Message
                      </button>
                    ) : (
                      <div className="bg-blue-50 rounded-xl p-5 border border-blue-200 mb-6">
                        <h3 className="font-bold text-blue-950 mb-3 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          Reply to {selectedMessage.name}:
                        </h3>
                        <textarea
                          value={replyMessage}
                          onChange={(e) => setReplyMessage(e.target.value)}
                          rows={4}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 focus:border-blue-950 font-sans mb-3"
                          style={{ fontFamily: 'Poppins, sans-serif' }}
                          placeholder="Type your reply here..."
                        ></textarea>
                        <div className="flex space-x-3">
                          <button
                            onClick={handleReply}
                            className="px-4 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900 transition font-sans"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                          >
                            Send Reply
                          </button>
                          <button
                            onClick={() => {
                              setShowReplyForm(false);
                              setReplyMessage('');
                            }}
                            className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-sans"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                    
                    <div className="bg-gray-50 rounded-xl p-5">
                      <h3 className="font-bold text-gray-800 mb-3 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                        Message Actions:
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        <button className="px-4 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900 transition font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          Forward Message
                        </button>
                        <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          <Archive size={16} className="inline mr-1" />
                          Archive
                        </button>
                        <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          Mark as Spam
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center p-12">
                  <div className="text-center">
                    <div className="bg-blue-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                      <MessageSquare className="text-blue-950" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {messages.length === 0 ? 'No Messages Yet' : 'Select a Message'}
                    </h3>
                    <p className="text-gray-600 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {messages.length === 0 
                        ? 'Messages from your contact form will appear here' 
                        : 'Choose a message from the list to view details and take action'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
