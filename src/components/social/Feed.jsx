import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Camera, Video, Smile } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Feed = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: {
        name: 'Amara Okafor',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
        location: 'Lagos, Nigeria'
      },
      content: 'Just visited the beautiful Olumo Rock in Abeokuta! The view from the top is absolutely breathtaking. African heritage at its finest! 🏔️✨',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600',
      timestamp: '2 hours ago',
      likes: 124,
      comments: 18,
      shares: 7,
      liked: false
    },
    {
      id: 2,
      author: {
        name: 'Kwame Asante',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        location: 'Accra, Ghana'
      },
      content: 'Traditional Kente weaving workshop today! Learning from the masters. The intricate patterns tell stories of our ancestors. 🧵👑',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600',
      timestamp: '4 hours ago',
      likes: 89,
      comments: 12,
      shares: 5,
      liked: true
    },
    {
      id: 3,
      author: {
        name: 'Fatima Al-Rashid',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        location: 'Cairo, Egypt'
      },
      content: 'Sunset over the Nile never gets old. Every evening brings a new masterpiece painted across the sky. 🌅',
      timestamp: '6 hours ago',
      likes: 156,
      comments: 23,
      shares: 12,
      liked: false
    }
  ]);
  const [newPost, setNewPost] = useState('');

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        author: {
          name: user?.displayName || user?.email || 'Anonymous',
          avatar: user?.photoURL || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
          location: 'Location'
        },
        content: newPost,
        timestamp: 'Just now',
        likes: 0,
        comments: 0,
        shares: 0,
        liked: false
      };
      setPosts([post, ...posts]);
      setNewPost('');
    }
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            likes: post.liked ? post.likes - 1 : post.likes + 1,
            liked: !post.liked
          }
        : post
    ));
  };

  return (
    <div className="space-y-6">
      {/* Create Post */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-start space-x-4">
          <img
            src={user?.photoURL || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'}
            alt="Your avatar"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's happening in your community?"
              className="w-full p-4 bg-gray-50 border-0 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              rows="3"
            />
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors">
                  <Camera className="w-5 h-5" />
                  <span className="text-sm font-medium">Photo</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors">
                  <Video className="w-5 h-5" />
                  <span className="text-sm font-medium">Video</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors">
                  <Smile className="w-5 h-5" />
                  <span className="text-sm font-medium">Feeling</span>
                </button>
              </div>
              
              <button
                onClick={handleCreatePost}
                disabled={!newPost.trim()}
                className="px-6 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Feed */}
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
          {/* Post Header */}
          <div className="p-6 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>{post.timestamp}</span>
                    <span>•</span>
                    <span>{post.author.location}</span>
                  </div>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <MoreHorizontal className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Post Content */}
          <div className="px-6 pb-4">
            <p className="text-gray-800 leading-relaxed">{post.content}</p>
          </div>

          {/* Post Image */}
          {post.image && (
            <div className="px-6 pb-4">
              <img
                src={post.image}
                alt="Post content"
                className="w-full h-80 object-cover rounded-2xl"
              />
            </div>
          )}

          {/* Post Stats */}
          <div className="px-6 py-3">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-6">
                <span className="hover:underline cursor-pointer">{post.likes} likes</span>
                <span className="hover:underline cursor-pointer">{post.comments} comments</span>
                <span className="hover:underline cursor-pointer">{post.shares} shares</span>
              </div>
            </div>
          </div>

          {/* Post Actions */}
          <div className="px-6 py-3 border-t border-gray-100">
            <div className="flex items-center justify-around">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-200 ${
                  post.liked
                    ? 'text-red-600 bg-red-50 hover:bg-red-100'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Heart className={`w-5 h-5 ${post.liked ? 'fill-current' : ''}`} />
                <span className="font-medium">Like</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all duration-200">
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium">Comment</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all duration-200">
                <Share2 className="w-5 h-5" />
                <span className="font-medium">Share</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;