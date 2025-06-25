import React, { useState } from 'react';
import { MapPin, Star, Clock, Phone, Heart, Filter, Search, ChefHat, Utensils, Coffee } from 'lucide-react';

const Food = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showReservation, setShowReservation] = useState(false);
  const [reservationData, setReservationData] = useState({
    date: '',
    time: '',
    guests: 2,
    name: '',
    phone: '',
    specialRequests: ''
  });
  
  const [restaurants] = useState([
    {
      id: 1,
      name: 'Mama Africa Restaurant',
      cuisine: 'Traditional African',
      category: 'traditional',
      location: 'Lagos, Nigeria',
      rating: 4.8,
      reviews: 234,
      priceRange: '$$',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
      description: 'Authentic African cuisine with traditional recipes passed down through generations.',
      specialties: ['Jollof Rice', 'Suya', 'Egusi Soup', 'Plantain'],
      openHours: '11:00 AM - 10:00 PM',
      phone: '+234 123 456 7890',
      address: '123 Victoria Island, Lagos',
      features: ['Outdoor Seating', 'Live Music', 'Takeaway', 'Delivery'],
      menu: [
        { name: 'Jollof Rice with Chicken', price: 15.99, description: 'Spiced rice with tender chicken' },
        { name: 'Suya Platter', price: 12.50, description: 'Grilled spiced meat skewers' },
        { name: 'Egusi Soup', price: 18.00, description: 'Traditional melon seed soup' }
      ]
    },
    {
      id: 2,
      name: 'Ethiopian Highlands',
      cuisine: 'Ethiopian',
      category: 'traditional',
      location: 'Addis Ababa, Ethiopia',
      rating: 4.9,
      reviews: 189,
      priceRange: '$',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
      description: 'Experience the rich flavors of Ethiopian cuisine in an authentic setting.',
      specialties: ['Injera', 'Doro Wat', 'Kitfo', 'Coffee Ceremony'],
      openHours: '10:00 AM - 11:00 PM',
      phone: '+251 11 123 4567',
      address: 'Bole Road, Addis Ababa',
      features: ['Coffee Ceremony', 'Vegetarian Options', 'Cultural Shows'],
      menu: [
        { name: 'Doro Wat', price: 14.99, description: 'Spicy chicken stew with injera' },
        { name: 'Vegetarian Combo', price: 11.99, description: 'Assorted vegetarian dishes' },
        { name: 'Ethiopian Coffee', price: 4.50, description: 'Traditional coffee ceremony' }
      ]
    },
    {
      id: 3,
      name: 'Cape Town Fusion',
      cuisine: 'Modern African',
      category: 'modern',
      location: 'Cape Town, South Africa',
      rating: 4.7,
      reviews: 156,
      priceRange: '$$$',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
      description: 'Contemporary African cuisine with international influences and stunning views.',
      specialties: ['Bobotie', 'Braai', 'Boerewors', 'Malva Pudding'],
      openHours: '5:00 PM - 12:00 AM',
      phone: '+27 21 123 4567',
      address: 'V&A Waterfront, Cape Town',
      features: ['Ocean View', 'Wine Pairing', 'Fine Dining', 'Romantic Setting'],
      menu: [
        { name: 'Springbok Fillet', price: 28.99, description: 'Grilled springbok with African spices' },
        { name: 'Bobotie', price: 22.50, description: 'Traditional Cape Malay curry' },
        { name: 'Malva Pudding', price: 8.99, description: 'Sweet sponge cake with custard' }
      ]
    },
    {
      id: 4,
      name: 'Marrakech Nights',
      cuisine: 'Moroccan',
      category: 'traditional',
      location: 'Marrakech, Morocco',
      rating: 4.6,
      reviews: 278,
      priceRange: '$$',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
      description: 'Authentic Moroccan dining experience with traditional decor and live entertainment.',
      specialties: ['Tagine', 'Couscous', 'Pastilla', 'Mint Tea'],
      openHours: '6:00 PM - 1:00 AM',
      phone: '+212 524 123 456',
      address: 'Medina, Marrakech',
      features: ['Belly Dancing', 'Hookah', 'Traditional Decor', 'Rooftop Terrace'],
      menu: [
        { name: 'Lamb Tagine', price: 19.99, description: 'Slow-cooked lamb with vegetables' },
        { name: 'Chicken Pastilla', price: 16.50, description: 'Sweet and savory pastry' },
        { name: 'Moroccan Mint Tea', price: 3.99, description: 'Traditional sweet mint tea' }
      ]
    },
    {
      id: 5,
      name: 'Accra Street Food',
      cuisine: 'Ghanaian',
      category: 'street',
      location: 'Accra, Ghana',
      rating: 4.5,
      reviews: 312,
      priceRange: '$',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
      description: 'Authentic Ghanaian street food in a vibrant, casual atmosphere.',
      specialties: ['Kelewele', 'Banku', 'Waakye', 'Red Red'],
      openHours: '7:00 AM - 10:00 PM',
      phone: '+233 30 123 4567',
      address: 'Osu, Accra',
      features: ['Casual Dining', 'Quick Service', 'Local Atmosphere', 'Budget Friendly'],
      menu: [
        { name: 'Waakye', price: 6.99, description: 'Rice and beans with stew' },
        { name: 'Kelewele', price: 4.50, description: 'Spiced fried plantain' },
        { name: 'Banku with Tilapia', price: 9.99, description: 'Fermented corn dough with grilled fish' }
      ]
    },
    {
      id: 6,
      name: 'Nairobi Coffee House',
      cuisine: 'Coffee & Light Bites',
      category: 'cafe',
      location: 'Nairobi, Kenya',
      rating: 4.4,
      reviews: 145,
      priceRange: '$',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
      description: 'Premium Kenyan coffee and light meals in a modern, comfortable setting.',
      specialties: ['Kenyan Coffee', 'Mandazi', 'Samosas', 'Fresh Juices'],
      openHours: '6:00 AM - 9:00 PM',
      phone: '+254 20 123 4567',
      address: 'Westlands, Nairobi',
      features: ['WiFi', 'Study Space', 'Fresh Roasted Coffee', 'Healthy Options'],
      menu: [
        { name: 'Kenyan AA Coffee', price: 3.50, description: 'Premium single-origin coffee' },
        { name: 'Mandazi', price: 2.99, description: 'Traditional fried dough' },
        { name: 'Beef Samosas', price: 5.99, description: 'Crispy pastries with spiced beef' }
      ]
    }
  ]);

  const categories = [
    { id: 'all', name: 'All Restaurants', icon: Utensils },
    { id: 'traditional', name: 'Traditional', icon: ChefHat },
    { id: 'modern', name: 'Modern African', icon: Utensils },
    { id: 'street', name: 'Street Food', icon: Coffee },
    { id: 'cafe', name: 'Cafes', icon: Coffee }
  ];

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesCategory = selectedCategory === 'all' || restaurant.category === selectedCategory;
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.specialties.some(specialty => 
                           specialty.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    return matchesCategory && matchesSearch;
  });

  const handleReservation = (e) => {
    e.preventDefault();
    // Handle reservation logic here
    alert(`Reservation confirmed for ${reservationData.name} at ${selectedRestaurant.name}`);
    setShowReservation(false);
    setReservationData({
      date: '',
      time: '',
      guests: 2,
      name: '',
      phone: '',
      specialRequests: ''
    });
  };

  return (
    <div className="h-full bg-gradient-to-br from-[#FAF3E0] via-[#F5E6D3] to-[#E8D5B7] p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#A0522D] to-[#D2691E] rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Utensils className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">African Cuisine</h2>
            <p className="text-orange-100">Discover authentic flavors from across Africa</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-2xl font-bold">{restaurants.length}</div>
            <div className="text-orange-100 text-sm">Restaurants</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{new Set(restaurants.map(r => r.cuisine)).size}</div>
            <div className="text-orange-100 text-sm">Cuisines</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{new Set(restaurants.map(r => r.location.split(', ')[1])).size}</div>
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
                placeholder="Search restaurants..."
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
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center space-x-3 ${
                      selectedCategory === category.id
                        ? 'bg-orange-50 text-[#A0522D] font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Featured Dish */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Dish of the Day</h3>
            <div className="space-y-3">
              <img
                src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300"
                alt="Jollof Rice"
                className="w-full h-32 object-cover rounded-lg"
              />
              <div>
                <h4 className="font-medium text-gray-900">Jollof Rice</h4>
                <p className="text-sm text-gray-600">Traditional West African rice dish</p>
                <div className="flex items-center space-x-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-yellow-400" fill="currentColor" />
                  ))}
                  <span className="text-xs text-gray-600 ml-1">(4.9)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                <div className="relative">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 px-2 py-1 bg-black bg-opacity-70 text-white text-xs rounded-full">
                    {restaurant.priceRange}
                  </div>
                  <button className="absolute top-3 right-3 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-gray-900 text-lg">{restaurant.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                      <span className="text-sm font-medium">{restaurant.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-2">{restaurant.cuisine}</p>
                  
                  <div className="flex items-center space-x-1 mb-3">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{restaurant.location}</span>
                  </div>
                  
                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">{restaurant.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {restaurant.specialties.slice(0, 3).map((specialty, index) => (
                      <span key={index} className="px-2 py-1 bg-orange-50 text-[#A0522D] text-xs rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{restaurant.openHours}</span>
                    </div>
                    <span className="text-xs text-gray-500">({restaurant.reviews} reviews)</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedRestaurant(restaurant)}
                      className="flex-1 px-4 py-2 border border-[#A0522D] text-[#A0522D] rounded-lg hover:bg-orange-50 transition-colors text-sm"
                    >
                      View Menu
                    </button>
                    <button
                      onClick={() => {
                        setSelectedRestaurant(restaurant);
                        setShowReservation(true);
                      }}
                      className="flex-1 px-4 py-2 bg-[#A0522D] text-white rounded-lg hover:bg-[#8B4513] transition-colors text-sm"
                    >
                      Reserve
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Restaurant Detail Modal */}
      {selectedRestaurant && !showReservation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedRestaurant.image}
                alt={selectedRestaurant.name}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => setSelectedRestaurant(null)}
                className="absolute top-4 right-4 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
              >
                ×
              </button>
            </div>
            
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedRestaurant.name}</h2>
                  <p className="text-lg text-gray-600 mb-2">{selectedRestaurant.cuisine}</p>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                      <span className="font-medium">{selectedRestaurant.rating}</span>
                      <span className="text-gray-600">({selectedRestaurant.reviews} reviews)</span>
                    </div>
                    <span className="text-lg font-bold text-[#A0522D]">{selectedRestaurant.priceRange}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">About</h3>
                  <p className="text-gray-700 mb-6">{selectedRestaurant.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700">{selectedRestaurant.address}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700">{selectedRestaurant.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700">{selectedRestaurant.openHours}</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-900 mb-3">Features</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedRestaurant.features.map((feature, index) => (
                        <span key={index} className="px-3 py-1 bg-orange-50 text-[#A0522D] text-sm rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Menu Highlights</h3>
                  <div className="space-y-4">
                    {selectedRestaurant.menu.map((item, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <span className="font-bold text-[#A0522D]">${item.price}</span>
                        </div>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setShowReservation(true)}
                    className="w-full mt-6 px-6 py-3 bg-[#A0522D] text-white rounded-lg hover:bg-[#8B4513] transition-colors font-medium"
                  >
                    Make Reservation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reservation Modal */}
      {showReservation && selectedRestaurant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Make Reservation</h3>
                <button
                  onClick={() => {
                    setShowReservation(false);
                    setSelectedRestaurant(null);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  ×
                </button>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium text-gray-900">{selectedRestaurant.name}</h4>
                <p className="text-sm text-gray-600">{selectedRestaurant.location}</p>
              </div>
              
              <form onSubmit={handleReservation} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      value={reservationData.date}
                      onChange={(e) => setReservationData({...reservationData, date: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0522D] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <input
                      type="time"
                      value={reservationData.time}
                      onChange={(e) => setReservationData({...reservationData, time: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0522D] focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
                  <select
                    value={reservationData.guests}
                    onChange={(e) => setReservationData({...reservationData, guests: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0522D] focus:border-transparent"
                  >
                    {[1,2,3,4,5,6,7,8].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={reservationData.name}
                    onChange={(e) => setReservationData({...reservationData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0522D] focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={reservationData.phone}
                    onChange={(e) => setReservationData({...reservationData, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0522D] focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                  <textarea
                    value={reservationData.specialRequests}
                    onChange={(e) => setReservationData({...reservationData, specialRequests: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0522D] focus:border-transparent"
                    rows="3"
                    placeholder="Any dietary restrictions or special requests..."
                  />
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowReservation(false);
                      setSelectedRestaurant(null);
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-[#A0522D] text-white rounded-lg hover:bg-[#8B4513] transition-colors"
                  >
                    Confirm Reservation
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Food;