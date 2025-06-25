import React, { useState } from 'react';
import { MapPin, Calendar, Users, Star, Clock, Camera, Plane, Heart, Filter } from 'lucide-react';

const Tourism = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 2,
    destination: null
  });
  
  const [destinations] = useState([
    {
      id: 1,
      name: 'Serengeti National Park',
      location: 'Tanzania',
      category: 'wildlife',
      price: 450,
      duration: '3 days',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600',
      description: 'Experience the Great Migration and witness millions of wildebeest crossing the plains.',
      rating: 4.9,
      reviews: 1247,
      highlights: ['Great Migration', 'Big Five Safari', 'Hot Air Balloon', 'Maasai Culture'],
      included: ['Accommodation', 'Meals', 'Game Drives', 'Professional Guide'],
      bestTime: 'June - October',
      difficulty: 'Easy',
      maxGuests: 12,
      available: true
    },
    {
      id: 2,
      name: 'Victoria Falls',
      location: 'Zambia/Zimbabwe',
      category: 'adventure',
      price: 320,
      duration: '2 days',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600',
      description: 'Marvel at one of the Seven Natural Wonders of the World with thrilling activities.',
      rating: 4.8,
      reviews: 892,
      highlights: ['Helicopter Flight', 'Bungee Jumping', 'White Water Rafting', 'Sunset Cruise'],
      included: ['Hotel Stay', 'Breakfast', 'Activity Transfers', 'Safety Equipment'],
      bestTime: 'April - October',
      difficulty: 'Moderate',
      maxGuests: 8,
      available: true
    },
    {
      id: 3,
      name: 'Pyramids of Giza',
      location: 'Egypt',
      category: 'cultural',
      price: 280,
      duration: '1 day',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600',
      description: 'Explore the ancient wonders of Egypt and uncover the mysteries of the pharaohs.',
      rating: 4.7,
      reviews: 2156,
      highlights: ['Great Pyramid', 'Sphinx', 'Camel Ride', 'Egyptian Museum'],
      included: ['Entry Tickets', 'Expert Guide', 'Lunch', 'Transportation'],
      bestTime: 'October - April',
      difficulty: 'Easy',
      maxGuests: 20,
      available: true
    },
    {
      id: 4,
      name: 'Table Mountain',
      location: 'South Africa',
      category: 'adventure',
      price: 180,
      duration: '1 day',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600',
      description: 'Ascend Cape Town\'s iconic flat-topped mountain for breathtaking panoramic views.',
      rating: 4.6,
      reviews: 1534,
      highlights: ['Cable Car Ride', 'City Views', 'Hiking Trails', 'Sunset Photography'],
      included: ['Cable Car Ticket', 'Guide', 'Photography Tips', 'Light Refreshments'],
      bestTime: 'October - March',
      difficulty: 'Easy to Moderate',
      maxGuests: 15,
      available: true
    },
    {
      id: 5,
      name: 'Sahara Desert Experience',
      location: 'Morocco',
      category: 'adventure',
      price: 520,
      duration: '4 days',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600',
      description: 'Journey into the heart of the Sahara for an unforgettable desert adventure.',
      rating: 4.8,
      reviews: 743,
      highlights: ['Camel Trekking', 'Desert Camp', 'Stargazing', 'Berber Culture'],
      included: ['Desert Camp', 'All Meals', 'Camel Trek', 'Cultural Activities'],
      bestTime: 'October - April',
      difficulty: 'Moderate',
      maxGuests: 10,
      available: false
    },
    {
      id: 6,
      name: 'Bwindi Impenetrable Forest',
      location: 'Uganda',
      category: 'wildlife',
      price: 680,
      duration: '3 days',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600',
      description: 'Track mountain gorillas in their natural habitat in this UNESCO World Heritage site.',
      rating: 4.9,
      reviews: 456,
      highlights: ['Gorilla Trekking', 'Bird Watching', 'Nature Walks', 'Local Communities'],
      included: ['Gorilla Permit', 'Accommodation', 'Meals', 'Expert Tracker'],
      bestTime: 'June - September',
      difficulty: 'Challenging',
      maxGuests: 8,
      available: true
    }
  ]);

  const categories = [
    { id: 'all', name: 'All Destinations', count: destinations.length },
    { id: 'wildlife', name: 'Wildlife Safari', count: destinations.filter(d => d.category === 'wildlife').length },
    { id: 'adventure', name: 'Adventure', count: destinations.filter(d => d.category === 'adventure').length },
    { id: 'cultural', name: 'Cultural Sites', count: destinations.filter(d => d.category === 'cultural').length }
  ];

  const filteredDestinations = destinations.filter(destination => 
    selectedCategory === 'all' || destination.category === selectedCategory
  );

  const handleBooking = (destination) => {
    setBookingData({ ...bookingData, destination });
    setShowBookingModal(true);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    console.log('Booking submitted:', bookingData);
    setShowBookingModal(false);
    // Handle booking logic here
  };

  return (
    <div className="h-full bg-gradient-to-br from-[#FAF3E0] via-[#F5E6D3] to-[#E8D5B7] p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#A0522D] to-[#D2691E] rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Plane className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">African Tourism</h2>
            <p className="text-orange-100">Discover and book amazing African destinations</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-2xl font-bold">{destinations.length}</div>
            <div className="text-orange-100 text-sm">Destinations</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{new Set(destinations.map(d => d.location)).size}</div>
            <div className="text-orange-100 text-sm">Countries</div>
          </div>
          <div>
            <div className="text-2xl font-bold">4.8</div>
            <div className="text-orange-100 text-sm">Avg Rating</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-6">
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

          {/* Quick Booking */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Search</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0522D] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0522D] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0522D] focus:border-transparent">
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3-4 Guests</option>
                  <option>5+ Guests</option>
                </select>
              </div>
              <button className="w-full px-4 py-2 bg-[#A0522D] text-white rounded-lg hover:bg-[#8B4513] transition-colors">
                Search
              </button>
            </div>
          </div>

          {/* Popular Destination */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Most Popular</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=60"
                  alt="Serengeti"
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">Serengeti</h4>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-400" fill="currentColor" />
                    <span className="text-xs text-gray-600">4.9 (1.2k)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDestinations.map((destination) => (
              <div key={destination.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                <div className="relative">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {!destination.available && (
                    <div className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                      Fully Booked
                    </div>
                  )}
                  
                  <div className="absolute top-3 right-3">
                    <button className="p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all">
                      <Heart className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  
                  <div className="absolute bottom-3 left-3 flex items-center space-x-2">
                    <div className="px-2 py-1 bg-black bg-opacity-50 text-white text-xs rounded-full flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{destination.duration}</span>
                    </div>
                    <div className="px-2 py-1 bg-black bg-opacity-50 text-white text-xs rounded-full flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>Max {destination.maxGuests}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-gray-900 text-lg">{destination.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                      <span className="text-sm font-medium">{destination.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{destination.location}</span>
                    <span className="mx-2">•</span>
                    <span>{destination.reviews} reviews</span>
                  </div>
                  
                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">{destination.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {destination.highlights.slice(0, 3).map((highlight, index) => (
                      <span key={index} className="px-2 py-1 bg-orange-50 text-[#A0522D] text-xs rounded-full">
                        {highlight}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-[#A0522D]">${destination.price}</span>
                      <span className="text-sm text-gray-500 ml-1">per person</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedDestination(destination)}
                        className="px-4 py-2 border border-[#A0522D] text-[#A0522D] rounded-lg hover:bg-orange-50 transition-colors"
                      >
                        Details
                      </button>
                      {destination.available ? (
                        <button
                          onClick={() => handleBooking(destination)}
                          className="px-4 py-2 bg-[#A0522D] text-white rounded-lg hover:bg-[#8B4513] transition-colors"
                        >
                          Book Now
                        </button>
                      ) : (
                        <button
                          disabled
                          className="px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
                        >
                          Unavailable
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Destination Detail Modal */}
      {selectedDestination && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedDestination.image}
                alt={selectedDestination.name}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => setSelectedDestination(null)}
                className="absolute top-4 right-4 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
              >
                ×
              </button>
            </div>
            
            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedDestination.name}</h2>
                  <div className="flex items-center text-gray-500 mb-4">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span className="text-lg">{selectedDestination.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-2">
                    <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                    <span className="text-xl font-bold">{selectedDestination.rating}</span>
                  </div>
                  <p className="text-gray-600">{selectedDestination.reviews} reviews</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed text-lg">{selectedDestination.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Highlights</h3>
                  <div className="space-y-2">
                    {selectedDestination.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Camera className="w-4 h-4 text-[#A0522D]" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">What's Included</h3>
                  <div className="space-y-2">
                    {selectedDestination.included.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-[#A0522D] rounded-full"></div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-4 bg-gray-50 rounded-xl">
                <div className="text-center">
                  <div className="font-bold text-gray-900">Duration</div>
                  <div className="text-[#A0522D]">{selectedDestination.duration}</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-gray-900">Best Time</div>
                  <div className="text-[#A0522D]">{selectedDestination.bestTime}</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-gray-900">Difficulty</div>
                  <div className="text-[#A0522D]">{selectedDestination.difficulty}</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-gray-900">Max Guests</div>
                  <div className="text-[#A0522D]">{selectedDestination.maxGuests}</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-6 border-t">
                <div>
                  <span className="text-3xl font-bold text-[#A0522D]">${selectedDestination.price}</span>
                  <span className="text-gray-500 ml-2">per person</span>
                </div>
                
                {selectedDestination.available ? (
                  <button
                    onClick={() => {
                      setSelectedDestination(null);
                      handleBooking(selectedDestination);
                    }}
                    className="px-8 py-3 bg-[#A0522D] text-white rounded-lg hover:bg-[#8B4513] transition-colors text-lg font-medium"
                  >
                    Book This Experience
                  </button>
                ) : (
                  <button
                    disabled
                    className="px-8 py-3 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed text-lg font-medium"
                  >
                    Currently Unavailable
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Book Your Trip</h3>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                  <input
                    type="text"
                    value={bookingData.destination?.name || ''}
                    disabled
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                    <input
                      type="date"
                      value={bookingData.checkIn}
                      onChange={(e) => setBookingData({...bookingData, checkIn: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0522D] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                    <input
                      type="date"
                      value={bookingData.checkOut}
                      onChange={(e) => setBookingData({...bookingData, checkOut: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0522D] focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
                  <select
                    value={bookingData.guests}
                    onChange={(e) => setBookingData({...bookingData, guests: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0522D] focus:border-transparent"
                  >
                    {[...Array(bookingData.destination?.maxGuests || 10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1} Guest{i > 0 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-medium">Total Cost:</span>
                    <span className="text-2xl font-bold text-[#A0522D]">
                      ${(bookingData.destination?.price || 0) * bookingData.guests}
                    </span>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowBookingModal(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-[#A0522D] text-white rounded-lg hover:bg-[#8B4513] transition-colors"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tourism;