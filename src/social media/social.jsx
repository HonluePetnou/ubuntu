import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Search, Bell, MessageCircle, Settings, Plus, MoreHorizontal } from 'lucide-react';
import SocialSidebar from '../components/social/SocialSidebar';
import Feed from '../components/social/Feed';
import Blog from '../components/social/Blog';
import Music from '../components/social/Music';
import ArtGallery from '../components/social/ArtGallery';
import Tourism from '../components/social/Tourism';
import Marketplace from '../components/social/Marketplace';
import Food from '../components/social/Food';

const SocialMediaApp = () => {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('feed');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'feed':
        return <Feed />;
      case 'blog':
        return <Blog />;
      case 'music':
        return <Music />;
      case 'gallery':
        return <ArtGallery />;
      case 'tourism':
        return <Tourism />;
      case 'marketplace':
        return <Marketplace />;
      case 'food':
        return <Food />;
      default:
        return <Feed />;
    }
  };

  // Mock data for stories and contacts
  const stories = [
    { id: 1, name: 'Your Story', avatar: user?.photoURL || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150', isOwn: true },
    { id: 2, name: 'Amara', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150' },
    { id: 3, name: 'Kwame', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
    { id: 4, name: 'Fatima', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' },
    { id: 5, name: 'Kofi', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
  ];

  const contacts = [
    { id: 1, name: 'Amara Okafor', status: 'online', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150' },
    { id: 2, name: 'Kwame Asante', status: 'online', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
    { id: 3, name: 'Fatima Al-Rashid', status: 'away', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' },
    { id: 4, name: 'Kofi Mensah', status: 'offline', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
    { id: 5, name: 'Zara Ibrahim', status: 'online', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">U</span>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">Ubuntu Social</span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search Ubuntu Social"
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                <Bell className="w-6 h-6" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                <MessageCircle className="w-6 h-6" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors">
                <Settings className="w-6 h-6" />
              </button>
              <div className="flex items-center space-x-2">
                <img
                  src={user?.photoURL || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <button 
                  onClick={logout}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="col-span-3">
            <div className="sticky top-20 space-y-4">
              <SocialSidebar 
                activeSection={activeSection} 
                onSectionChange={setActiveSection} 
              />
            </div>
          </div>

          {/* Main Content */}
          <div className={activeSection === 'feed' ? 'col-span-6' : 'col-span-9'}>
            <div className="space-y-6">
              {/* Stories Section - Only show for Feed */}
              {activeSection === 'feed' && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
                  <div className="flex space-x-4 overflow-x-auto pb-2">
                    {stories.map((story) => (
                      <div key={story.id} className="flex-shrink-0 text-center">
                        <div className="relative">
                          <img
                            src={story.avatar}
                            alt={story.name}
                            className="w-16 h-16 rounded-full object-cover border-4 border-gradient-to-r from-pink-500 to-purple-500"
                          />
                          {story.isOwn && (
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                              <Plus className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mt-2 max-w-[64px] truncate">{story.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Main Feed Content */}
              {renderActiveSection()}
            </div>
          </div>

          {/* Right Sidebar - Only show for Feed */}
          {activeSection === 'feed' && (
            <div className="col-span-3">
              <div className="sticky top-24 space-y-4">
                {/* Contacts */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Contacts</h3>
                    <MoreHorizontal className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="space-y-3">
                    {contacts.map((contact) => (
                      <div key={contact.id} className="flex items-center space-x-3">
                        <div className="relative">
                          <img
                            src={contact.avatar}
                            alt={contact.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                            contact.status === 'online' ? 'bg-green-500' :
                            contact.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                          }`}></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{contact.name}</p>
                          <p className="text-xs text-gray-500 capitalize">{contact.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trending Topics */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
                  <h3 className="font-semibold text-gray-900 mb-4">Trending in Africa</h3>
                  <div className="space-y-3">
                    <div className="cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                      <p className="text-sm font-medium text-gray-900">#AfricanUnity</p>
                      <p className="text-xs text-gray-500">12.5K posts</p>
                    </div>
                    <div className="cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                      <p className="text-sm font-medium text-gray-900">#Ubuntu</p>
                      <p className="text-xs text-gray-500">8.2K posts</p>
                    </div>
                    <div className="cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                      <p className="text-sm font-medium text-gray-900">#AfricanCulture</p>
                      <p className="text-xs text-gray-500">15.7K posts</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaApp;