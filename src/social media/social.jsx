import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const SocialMediaApp = () => {
  const { user, logout } = useAuth();
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'John Doe',
      content: 'Exploring the beautiful landscapes of Africa! 🌍',
      timestamp: '2 hours ago',
      likes: 15,
      comments: 3
    },
    {
      id: 2,
      author: 'Jane Smith',
      content: 'Just tried amazing Ethiopian cuisine. The flavors are incredible!',
      timestamp: '4 hours ago',
      likes: 23,
      comments: 7
    }
  ]);
  const [newPost, setNewPost] = useState('');

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        author: user?.email || 'Anonymous',
        content: newPost,
        timestamp: 'Just now',
        likes: 0,
        comments: 0
      };
      setPosts([post, ...posts]);
      setNewPost('');
    }
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12 max-w-2xl relative z-10">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 -z-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-amber-500 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-orange-400 rounded-full blur-2xl"></div>
        </div>
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xl">U</span>
            </div>
            <span className="ml-3 text-2xl font-bold text-gray-900">Ubuntu Social</span>
          </div>
          <p className="text-center text-gray-600 mb-6">Connect with the African community worldwide</p>
          <div className="flex items-center justify-between border-t border-gray-100 pt-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-white font-medium text-sm">{user?.email?.charAt(0).toUpperCase()}</span>
              </div>
              <span className="text-sm font-medium text-gray-700">{user?.email}</span>
            </div>
            <button 
              onClick={logout}
              className="px-4 py-2 text-sm font-medium text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Create Post */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <form onSubmit={handleCreatePost} className="space-y-4">
            <div>
              <label htmlFor="post-content" className="block text-sm font-medium text-gray-700 mb-2">
                Share your thoughts
              </label>
              <textarea
                id="post-content"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                rows="3"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!newPost.trim()}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-medium hover:from-orange-600 hover:to-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Share Post
              </button>
            </div>
          </form>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-200">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
                  {post.author.charAt(0).toUpperCase()}
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">{post.author}</h3>
                  <p className="text-sm text-gray-500">{post.timestamp}</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">{post.content}</p>
              
              <div className="flex items-center space-x-6 pt-4 border-t border-gray-100 text-gray-500">
                <button 
                  onClick={() => handleLike(post.id)}
                  className="flex items-center space-x-2 hover:text-blue-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>{post.likes}</span>
                </button>
                
                <button className="flex items-center space-x-2 hover:text-blue-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>{post.comments}</span>
                </button>
                
                <button className="flex items-center space-x-2 hover:text-blue-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  <span>Share</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SocialMediaApp;