import React, { useState } from 'react';
import { Heart, Eye, ShoppingCart, Filter, Search, Star, MapPin } from 'lucide-react';

const ArtGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArt, setSelectedArt] = useState(null);
  
  const [artworks] = useState([
    {
      id: 1,
      title: 'Sunset Over Kilimanjaro',
      artist: 'Amara Okafor',
      category: 'painting',
      price: 450,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      description: 'A breathtaking oil painting capturing the golden hour over Mount Kilimanjaro.',
      location: 'Tanzania',
      likes: 234,
      views: 1250,
      rating: 4.8,
      medium: 'Oil on Canvas',
      size: '24" x 36"',
      year: 2023,
      available: true
    },
    {
      id: 2,
      title: 'Maasai Warrior',
      artist: 'Kofi Asante',
      category: 'sculpture',
      price: 680,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      description: 'Hand-carved wooden sculpture representing the strength and pride of Maasai culture.',
      location: 'Kenya',
      likes: 189,
      views: 890,
      rating: 4.9,
      medium: 'Ebony Wood',
      size: '18" x 8" x 6"',
      year: 2023,
      available: true
    },
    {
      id: 3,
      title: 'Adinkra Symbols',
      artist: 'Fatima Al-Rashid',
      category: 'textile',
      price: 320,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      description: 'Traditional Ghanaian Adinkra symbols woven into contemporary textile art.',
      location: 'Ghana',
      likes: 156,
      views: 670,
      rating: 4.7,
      medium: 'Kente Cloth',
      size: '48" x 72"',
      year: 2023,
      available: true
    },
    {
      id: 4,
      title: 'Baobab Dreams',
      artist: 'Thabo Mthembu',
      category: 'photography',
      price: 280,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      description: 'Fine art photography capturing the mystical beauty of ancient baobab trees.',
      location: 'South Africa',
      likes: 298,
      views: 1450,
      rating: 4.6,
      medium: 'Digital Print',
      size: '20" x 30"',
      year: 2023,
      available: false
    },
    {
      id: 5,
      title: 'Yoruba Mask',
      artist: 'Adunni Ogundimu',
      category: 'sculpture',
      price: 520,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      description: 'Traditional Yoruba ceremonial mask crafted with authentic techniques.',
      location: 'Nigeria',
      likes: 167,
      views: 780,
      rating: 4.8,
      medium: 'Wood & Pigments',
      size: '12" x 8" x 6"',
      year: 2023,
      available: true
    },
    {
      id: 6,
      title: 'Sahara Winds',
      artist: 'Youssef Ben Ali',
      category: 'painting',
      price: 390,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      description: 'Abstract interpretation of the Sahara desert using warm earth tones.',
      location: 'Morocco',
      likes: 203,
      views: 920,
      rating: 4.5,
      medium: 'Acrylic on Canvas',
      size: '30" x 40"',
      year: 2023,
      available: true
    }
  ]);

  const categories = [
    { id: 'all', name: 'All Artworks', count: artworks.length },
    { id: 'painting', name: 'Paintings', count: artworks.filter(art => art.category === 'painting').length },
    { id: 'sculpture', name: 'Sculptures', count: artworks.filter(art => art.category === 'sculpture').length },
    { id: 'textile', name: 'Textiles', count: artworks.filter(art => art.category === 'textile').length },
    { id: 'photography', name: 'Photography', count: artworks.filter(art => art.category === 'photography').length }
  ];

  const filteredArtworks = artworks.filter(artwork => {
    const matchesCategory = selectedCategory === 'all' || artwork.category === selectedCategory;
    const matchesSearch = artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artwork.artist.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLike = (artworkId) => {
    // Handle like functionality
    console.log('Liked artwork:', artworkId);
  };

  const handleAddToCart = (artwork) => {
    // Handle add to cart functionality
    console.log('Added to cart:', artwork);
  };

  return (
    <div className="h-full bg-gradient-to-br from-[#FAF3E0] via-[#F5E6D3] to-[#E8D5B7] p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#A0522D] to-[#D2691E] rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Eye className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">African Art Gallery</h2>
            <p className="text-orange-100">Discover authentic African artworks</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-2xl font-bold">{artworks.length}</div>
            <div className="text-orange-100 text-sm">Artworks</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{new Set(artworks.map(art => art.artist)).size}</div>
            <div className="text-orange-100 text-sm">Artists</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{new Set(artworks.map(art => art.location)).size}</div>
            <div className="text-orange-100 text-sm">Countries</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Search */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Search</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search artworks or artists..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A0522D] focus:border-transparent"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Categories
            </h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                    selectedCategory === category.id
                      ? 'bg-orange-50 text-[#A0522D] font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>{category.name}</span>
                  <span className="text-sm text-gray-500">({category.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Featured Artist */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Featured Artist</h3>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-[#A0522D] to-[#D2691E] rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-xl">AO</span>
              </div>
              <h4 className="font-semibold text-gray-900">Amara Okafor</h4>
              <p className="text-sm text-gray-600 mb-3">Contemporary Artist from Tanzania</p>
              <div className="flex items-center justify-center space-x-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" />
                ))}
                <span className="text-sm text-gray-600 ml-1">(4.8)</span>
              </div>
              <button className="w-full px-4 py-2 bg-[#A0522D] text-white rounded-lg hover:bg-[#8B4513] transition-colors">
                View Profile
              </button>
            </div>
          </div>
        </div>

        {/* Main Gallery */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredArtworks.map((artwork) => (
              <div key={artwork.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                <div className="relative">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <button
                      onClick={() => setSelectedArt(artwork)}
                      className="px-4 py-2 bg-white text-gray-900 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100"
                    >
                      View Details
                    </button>
                  </div>
                  
                  {!artwork.available && (
                    <div className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                      Sold
                    </div>
                  )}
                  
                  <div className="absolute top-3 right-3 flex space-x-2">
                    <button
                      onClick={() => handleLike(artwork.id)}
                      className="p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
                    >
                      <Heart className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  
                  <div className="absolute bottom-3 left-3 flex items-center space-x-2 text-white text-sm">
                    <Eye className="w-4 h-4" />
                    <span>{artwork.views}</span>
                    <Heart className="w-4 h-4 ml-2" />
                    <span>{artwork.likes}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-gray-900 text-lg">{artwork.title}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                      <span className="text-sm text-gray-600">{artwork.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-2">by {artwork.artist}</p>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{artwork.location}</span>
                  </div>
                  
                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">{artwork.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-[#A0522D]">${artwork.price}</span>
                      <span className="text-sm text-gray-500 ml-1">USD</span>
                    </div>
                    
                    {artwork.available ? (
                      <button
                        onClick={() => handleAddToCart(artwork)}
                        className="flex items-center space-x-2 px-4 py-2 bg-[#A0522D] text-white rounded-lg hover:bg-[#8B4513] transition-colors"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </button>
                    ) : (
                      <button
                        disabled
                        className="px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
                      >
                        Sold Out
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Artwork Detail Modal */}
      {selectedArt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative">
                <img
                  src={selectedArt.image}
                  alt={selectedArt.title}
                  className="w-full h-96 lg:h-full object-cover"
                />
                <button
                  onClick={() => setSelectedArt(null)}
                  className="absolute top-4 right-4 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
                >
                  ×
                </button>
              </div>
              
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-3xl font-bold text-gray-900">{selectedArt.title}</h2>
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                    <span className="text-lg font-medium">{selectedArt.rating}</span>
                  </div>
                </div>
                
                <p className="text-xl text-gray-600 mb-2">by {selectedArt.artist}</p>
                
                <div className="flex items-center text-gray-500 mb-6">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{selectedArt.location}</span>
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed">{selectedArt.description}</p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Medium:</span>
                    <span className="font-medium">{selectedArt.medium}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Size:</span>
                    <span className="font-medium">{selectedArt.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Year:</span>
                    <span className="font-medium">{selectedArt.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Views:</span>
                    <span className="font-medium">{selectedArt.views.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-3xl font-bold text-[#A0522D]">${selectedArt.price}</span>
                      <span className="text-gray-500 ml-2">USD</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleLike(selectedArt.id)}
                        className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Heart className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  
                  {selectedArt.available ? (
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleAddToCart(selectedArt)}
                        className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-[#A0522D] text-white rounded-lg hover:bg-[#8B4513] transition-colors"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        <span>Add to Cart</span>
                      </button>
                      <button className="px-6 py-3 border border-[#A0522D] text-[#A0522D] rounded-lg hover:bg-orange-50 transition-colors">
                        Contact Artist
                      </button>
                    </div>
                  ) : (
                    <button
                      disabled
                      className="w-full px-6 py-3 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
                    >
                      This artwork has been sold
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtGallery;