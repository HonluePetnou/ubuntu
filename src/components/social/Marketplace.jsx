import React, { useState } from 'react';
import { ShoppingCart, Heart, Star, Filter, Search, Package, Truck, Shield, Eye } from 'lucide-react';

const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  
  const [products] = useState([
    {
      id: 1,
      name: 'African Mythology: Gods and Legends',
      seller: 'Kwame Books',
      category: 'books',
      price: 24.99,
      originalPrice: 29.99,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
      description: 'A comprehensive collection of African mythological stories and legends from across the continent.',
      rating: 4.8,
      reviews: 156,
      inStock: true,
      stockCount: 23,
      shipping: 'Free shipping',
      seller_rating: 4.9,
      seller_location: 'Ghana',
      tags: ['mythology', 'culture', 'stories', 'legends'],
      specifications: {
        'Pages': '320',
        'Language': 'English',
        'Publisher': 'African Heritage Press',
        'ISBN': '978-0123456789'
      }
    },
    {
      id: 2,
      name: 'Handwoven Kente Cloth Scarf',
      seller: 'Adinkra Crafts',
      category: 'art',
      price: 89.99,
      originalPrice: 120.00,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
      description: 'Authentic handwoven Kente cloth scarf featuring traditional Ghanaian patterns and colors.',
      rating: 4.9,
      reviews: 89,
      inStock: true,
      stockCount: 12,
      shipping: '$5.99 shipping',
      seller_rating: 4.8,
      seller_location: 'Ghana',
      tags: ['kente', 'handwoven', 'traditional', 'scarf'],
      specifications: {
        'Material': '100% Cotton',
        'Size': '72" x 12"',
        'Care': 'Hand wash only',
        'Origin': 'Kumasi, Ghana'
      }
    },
    {
      id: 3,
      name: 'Baobab Seed Jewelry Set',
      seller: 'Nature\'s Craft',
      category: 'art',
      price: 45.50,
      originalPrice: 55.00,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
      description: 'Beautiful jewelry set made from authentic baobab seeds, featuring necklace and earrings.',
      rating: 4.7,
      reviews: 234,
      inStock: true,
      stockCount: 18,
      shipping: 'Free shipping',
      seller_rating: 4.6,
      seller_location: 'Kenya',
      tags: ['jewelry', 'baobab', 'natural', 'handmade'],
      specifications: {
        'Material': 'Baobab Seeds, Silver Wire',
        'Necklace Length': '18 inches',
        'Earring Type': 'Drop earrings',
        'Hypoallergenic': 'Yes'
      }
    },
    {
      id: 4,
      name: 'Contemporary African Art Book',
      seller: 'Art Africa Publishers',
      category: 'books',
      price: 39.99,
      originalPrice: 49.99,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
      description: 'Explore the vibrant world of contemporary African art through this beautifully illustrated book.',
      rating: 4.6,
      reviews: 78,
      inStock: true,
      stockCount: 31,
      shipping: 'Free shipping',
      seller_rating: 4.7,
      seller_location: 'South Africa',
      tags: ['art', 'contemporary', 'coffee table', 'illustrated'],
      specifications: {
        'Pages': '256',
        'Format': 'Hardcover',
        'Dimensions': '11" x 9"',
        'Weight': '3.2 lbs'
      }
    },
    {
      id: 5,
      name: 'Wooden African Mask',
      seller: 'Heritage Crafts',
      category: 'art',
      price: 125.00,
      originalPrice: 150.00,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
      description: 'Authentic wooden mask carved by skilled artisans, representing traditional African spiritual beliefs.',
      rating: 4.9,
      reviews: 45,
      inStock: false,
      stockCount: 0,
      shipping: '$12.99 shipping',
      seller_rating: 4.9,
      seller_location: 'Nigeria',
      tags: ['mask', 'wooden', 'traditional', 'spiritual'],
      specifications: {
        'Material': 'Mahogany Wood',
        'Height': '14 inches',
        'Width': '8 inches',
        'Finish': 'Natural oil finish'
      }
    },
    {
      id: 6,
      name: 'African Cookbook Collection',
      seller: 'Taste of Africa',
      category: 'books',
      price: 32.99,
      originalPrice: 39.99,
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
      description: 'A collection of traditional and modern African recipes from across the continent.',
      rating: 4.5,
      reviews: 167,
      inStock: true,
      stockCount: 28,
      shipping: 'Free shipping',
      seller_rating: 4.8,
      seller_location: 'Morocco',
      tags: ['cookbook', 'recipes', 'traditional', 'modern'],
      specifications: {
        'Pages': '280',
        'Recipes': '150+',
        'Format': 'Paperback',
        'Language': 'English'
      }
    }
  ]);

  const categories = [
    { id: 'all', name: 'All Products', count: products.length },
    { id: 'art', name: 'Art & Crafts', count: products.filter(p => p.category === 'art').length },
    { id: 'books', name: 'Books', count: products.filter(p => p.category === 'books').length }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  return (
    <div className="h-full bg-gradient-to-br from-[#FAF3E0] via-[#F5E6D3] to-[#E8D5B7] p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#A0522D] to-[#D2691E] rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Package className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">African Marketplace</h2>
              <p className="text-orange-100">Discover authentic African art, books, and crafts</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowCart(true)}
            className="relative p-3 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all"
          >
            <ShoppingCart className="w-6 h-6" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-2xl font-bold">{products.length}</div>
            <div className="text-orange-100 text-sm">Products</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{new Set(products.map(p => p.seller)).size}</div>
            <div className="text-orange-100 text-sm">Sellers</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{new Set(products.map(p => p.seller_location)).size}</div>
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
                placeholder="Search products..."
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

          {/* Trust & Safety */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Trust & Safety</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-700">Verified Sellers</span>
              </div>
              <div className="flex items-center space-x-3">
                <Truck className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-gray-700">Secure Shipping</span>
              </div>
              <div className="flex items-center space-x-3">
                <Heart className="w-5 h-5 text-red-500" />
                <span className="text-sm text-gray-700">Buyer Protection</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Products Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {!product.inStock && (
                    <div className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                      Out of Stock
                    </div>
                  )}
                  
                  {product.originalPrice > product.price && (
                    <div className="absolute top-3 right-3 px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                      Sale
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="px-4 py-2 bg-white text-gray-900 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-gray-900 text-lg line-clamp-2">{product.name}</h3>
                    <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                      <Heart className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-2">by {product.seller}</p>
                  
                  <div className="flex items-center space-x-1 mb-3">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 ${
                            i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                          }`} 
                          fill="currentColor" 
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">({product.reviews})</span>
                  </div>
                  
                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">{product.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-[#A0522D]">${product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">{product.shipping}</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="flex-1 px-4 py-2 border border-[#A0522D] text-[#A0522D] rounded-lg hover:bg-orange-50 transition-colors text-sm"
                    >
                      View Details
                    </button>
                    {product.inStock ? (
                      <button
                        onClick={() => addToCart(product)}
                        className="flex-1 px-4 py-2 bg-[#A0522D] text-white rounded-lg hover:bg-[#8B4513] transition-colors text-sm flex items-center justify-center space-x-1"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </button>
                    ) : (
                      <button
                        disabled
                        className="flex-1 px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed text-sm"
                      >
                        Out of Stock
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-96 lg:h-full object-cover"
                />
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
                >
                  ×
                </button>
              </div>
              
              <div className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h2>
                <p className="text-lg text-gray-600 mb-4">by {selectedProduct.seller}</p>
                
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${
                          i < Math.floor(selectedProduct.rating) ? 'text-yellow-400' : 'text-gray-300'
                        }`} 
                        fill="currentColor" 
                      />
                    ))}
                  </div>
                  <span className="text-lg font-medium">{selectedProduct.rating}</span>
                  <span className="text-gray-600">({selectedProduct.reviews} reviews)</span>
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed">{selectedProduct.description}</p>
                
                <div className="space-y-3 mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Specifications</h3>
                  {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-600">{key}:</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl font-bold text-[#A0522D]">${selectedProduct.price}</span>
                      {selectedProduct.originalPrice > selectedProduct.price && (
                        <span className="text-xl text-gray-500 line-through">${selectedProduct.originalPrice}</span>
                      )}
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm text-gray-600">{selectedProduct.shipping}</div>
                      {selectedProduct.inStock ? (
                        <div className="text-sm text-green-600">{selectedProduct.stockCount} in stock</div>
                      ) : (
                        <div className="text-sm text-red-600">Out of stock</div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <Heart className="w-5 h-5 text-gray-600" />
                    </button>
                    {selectedProduct.inStock ? (
                      <button
                        onClick={() => {
                          addToCart(selectedProduct);
                          setSelectedProduct(null);
                        }}
                        className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-[#A0522D] text-white rounded-lg hover:bg-[#8B4513] transition-colors"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        <span>Add to Cart</span>
                      </button>
                    ) : (
                      <button
                        disabled
                        className="flex-1 px-6 py-3 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
                      >
                        Out of Stock
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shopping Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Shopping Cart</h3>
                <button
                  onClick={() => setShowCart(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  ×
                </button>
              </div>
              
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">by {item.seller}</p>
                        <p className="text-lg font-bold text-[#A0522D]">${item.price}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xl font-bold">Total: ${getTotalPrice()}</span>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => setShowCart(false)}
                          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Continue Shopping
                        </button>
                        <button className="px-6 py-2 bg-[#A0522D] text-white rounded-lg hover:bg-[#8B4513] transition-colors">
                          Checkout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;