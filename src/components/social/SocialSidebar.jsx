import React from 'react';
import { Home, Users, Music, Image, MapPin, ShoppingBag, UtensilsCrossed, BookOpen, Video, Heart, TrendingUp } from 'lucide-react';

const SocialSidebar = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    { id: 'feed', label: 'Feed', icon: Home },
    { id: 'blog', label: 'Blog & Videos', icon: Video },
    { id: 'music', label: 'Music', icon: Music },
    { id: 'gallery', label: 'Art Gallery', icon: Image },
    { id: 'tourism', label: 'Tourism', icon: MapPin },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
    { id: 'food', label: 'Food & Dining', icon: UtensilsCrossed },
    { id: 'community', label: 'Community', icon: Users },
  ];

  const quickStats = [
    { label: 'Posts', value: '1.2K' },
    { label: 'Following', value: '892' },
    { label: 'Followers', value: '2.1K' },
  ];

  return (
    <div className="space-y-4">
      {/* Navigation Menu */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-left ${
                  activeSection === item.id
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Stats */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Your Stats</h3>
        <div className="grid grid-cols-3 gap-3">
          {quickStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-lg font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ubuntu Philosophy Card */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-100 p-4">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Heart className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-gray-900">Ubuntu Philosophy</span>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed mb-2">"I am because we are"</p>
        <p className="text-xs text-gray-600">Connecting African communities worldwide through shared values and culture.</p>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
        <div className="space-y-2">
          <button className="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">View Analytics</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
            <Users className="w-4 h-4" />
            <span className="text-sm">Find Friends</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialSidebar;