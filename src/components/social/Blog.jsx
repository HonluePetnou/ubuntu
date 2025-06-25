import React, { useState } from 'react';
import { Play, Clock, Eye, ThumbsUp, MessageSquare, Share, BookOpen, Video, Filter } from 'lucide-react';

const Blog = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [content] = useState([
    {
      id: 1,
      type: 'video',
      title: 'The Rich History of Ancient Mali Empire',
      description: 'Discover the golden age of the Mali Empire and its legendary ruler Mansa Musa, once the richest man in history.',
      thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600',
      duration: '12:45',
      views: '45.2K',
      likes: '1.2K',
      comments: 89,
      author: {
        name: 'African Heritage TV',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        subscribers: '125K'
      },
      publishedAt: '3 days ago',
      category: 'History'
    },
    {
      id: 2,
      type: 'article',
      title: 'Traditional African Cuisine: A Journey Through Flavors',
      description: 'Explore the diverse culinary traditions across Africa, from Moroccan tagines to Ethiopian injera, and discover the stories behind each dish.',
      thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600',
      readTime: '8 min read',
      views: '12.8K',
      likes: '456',
      comments: 34,
      author: {
        name: 'Amina Hassan',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        followers: '8.5K'
      },
      publishedAt: '1 week ago',
      category: 'Culture'
    },
    {
      id: 3,
      type: 'video',
      title: 'Modern African Art: Breaking Boundaries',
      description: 'Meet contemporary African artists who are reshaping the global art scene with their innovative techniques and powerful messages.',
      thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600',
      duration: '18:32',
      views: '28.7K',
      likes: '892',
      comments: 67,
      author: {
        name: 'Art Africa Channel',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        subscribers: '89K'
      },
      publishedAt: '5 days ago',
      category: 'Art'
    },
    {
      id: 4,
      type: 'article',
      title: 'Ubuntu Philosophy in Modern Leadership',
      description: 'How the African philosophy of Ubuntu is influencing modern leadership practices and creating more inclusive workplaces worldwide.',
      thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600',
      readTime: '6 min read',
      views: '9.3K',
      likes: '234',
      comments: 19,
      author: {
        name: 'Dr. Kofi Mensah',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        followers: '15.2K'
      },
      publishedAt: '2 weeks ago',
      category: 'Philosophy'
    }
  ]);

  const filters = ['all', 'video', 'article'];
  const categories = ['All', 'History', 'Culture', 'Art', 'Philosophy', 'Music', 'Travel'];

  const filteredContent = content.filter(item => 
    activeFilter === 'all' || item.type === activeFilter
  );

  return (
    <div className="h-full bg-gradient-to-br from-[#FAF3E0] via-[#F5E6D3] to-[#E8D5B7] p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Blog & Videos</h2>
            <p className="text-gray-600">Discover African stories, culture, and heritage</p>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-[#A0522D] to-[#D2691E] text-white rounded-xl font-medium hover:from-[#8B4513] hover:to-[#CD853F] transition-all duration-200">
            Create Content
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <div className="flex space-x-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                  activeFilter === filter
                    ? 'bg-[#A0522D] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className="px-3 py-1 bg-orange-50 text-[#A0522D] rounded-full text-sm font-medium hover:bg-orange-100 transition-colors"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredContent.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-200 group">
            {/* Thumbnail */}
            <div className="relative">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-200" />
              
              {/* Content Type Badge */}
              <div className="absolute top-4 left-4">
                <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${
                  item.type === 'video'
                    ? 'bg-red-600 text-white'
                    : 'bg-blue-600 text-white'
                }`}>
                  {item.type === 'video' ? <Video className="w-3 h-3" /> : <BookOpen className="w-3 h-3" />}
                  <span className="capitalize">{item.type}</span>
                </span>
              </div>
              
              {/* Duration/Read Time */}
              <div className="absolute bottom-4 right-4">
                <span className="bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs font-medium">
                  {item.type === 'video' ? item.duration : item.readTime}
                </span>
              </div>
              
              {/* Play Button for Videos */}
              {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-200 group-hover:scale-110">
                    <Play className="w-8 h-8 text-[#A0522D] ml-1" fill="currentColor" />
                  </button>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Category */}
              <span className="inline-block px-2 py-1 bg-orange-50 text-[#A0522D] rounded text-xs font-medium mb-3">
                {item.category}
              </span>
              
              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#A0522D] transition-colors">
                {item.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {item.description}
              </p>
              
              {/* Author */}
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src={item.author.avatar}
                  alt={item.author.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.author.name}</p>
                  <p className="text-xs text-gray-500">
                    {item.type === 'video' ? `${item.author.subscribers} subscribers` : `${item.author.followers} followers`}
                  </p>
                </div>
              </div>
              
              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{item.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{item.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>{item.comments}</span>
                  </div>
                </div>
                <span>{item.publishedAt}</span>
              </div>
            </div>
            
            {/* Actions */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button className="flex items-center space-x-1 px-3 py-1 text-gray-600 hover:text-[#A0522D] transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm">Like</span>
                  </button>
                  <button className="flex items-center space-x-1 px-3 py-1 text-gray-600 hover:text-[#A0522D] transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-sm">Comment</span>
                  </button>
                </div>
                <button className="flex items-center space-x-1 px-3 py-1 text-gray-600 hover:text-[#A0522D] transition-colors">
                  <Share className="w-4 h-4" />
                  <span className="text-sm">Share</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <button className="px-8 py-3 bg-white border-2 border-[#A0522D] text-[#A0522D] rounded-xl font-medium hover:bg-[#A0522D] hover:text-white transition-all duration-200">
          Load More Content
        </button>
      </div>
    </div>
  );
};

export default Blog;