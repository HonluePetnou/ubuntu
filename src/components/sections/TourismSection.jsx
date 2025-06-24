import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, Clock, Users } from 'lucide-react';

const TourismSection = ({ countryData, theme }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const navigate = useNavigate();

  const handleViewAllDestinations = () => {
    // Navigate to country-specific destinations if countryData has a code
    const countryCode = countryData?.code || countryData?.countryCode;
    if (countryCode) {
      navigate(`/country/${countryCode.toLowerCase()}/destinations`);
    }
  };

  // Get tourism data from countryData
  const tourismData = countryData?.tourism;
  const destinations = tourismData?.destinations || [];
  const imageMap = tourismData?.imageMap || {};
  const countryCode = countryData?.code || countryData?.countryCode;

  // Helper function to get image path for destinations
  const getDestinationImage = (destinationName) => {
    const imageFilename = imageMap[destinationName];
    if (imageFilename && countryCode) {
      const encodedFilename = encodeURIComponent(imageFilename);
      return `/images/places/${countryCode.toLowerCase()}/${encodedFilename}`;
    }
    return '/api/placeholder/300/200'; // Fallback
  };

  // Extract unique categories from destinations
  const tourismCategories = ['All', ...new Set(destinations.map(dest => dest.category))];

  const filteredDestinations = activeFilter === 'All' 
    ? destinations 
    : destinations.filter(dest => dest.category === activeFilter);

  return (
    <section className="py-16 px-4 bg-[#FAF3E0]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#222] mb-4">
            Our top Destination
          </h2>
          <div className="w-24 h-1 bg-[#A0522D] mx-auto mb-8"></div>
          
          {/* Filter Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {tourismCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === category
                    ? 'bg-[#A0522D] text-white shadow-lg'
                    : 'bg-white text-[#222] hover:bg-[#A0522D]/10 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
            
            {/* Explore Button */}
            <button className="px-6 py-2 bg-[#D2691E] text-white rounded-full font-medium hover:bg-[#A0522D] transition-colors duration-300 shadow-lg">
              Explore
            </button>
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination, index) => (
            <div
              key={destination.name || index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={getDestinationImage(destination.name)}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/api/placeholder/300/200';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-300/30 to-blue-500/30"></div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium text-[#222]">{destination.rating}</span>
                </div>
                
                {/* Overlay content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-xl font-bold mb-2">{destination.name}</h3>
                    <div className="flex items-center justify-center gap-1 text-white/90">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{destination.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-[#A0522D]">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{destination.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#A0522D]">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{destination.groupSize}</span>
                  </div>
                </div>
                
                <p className="text-[#222]/70 text-sm mb-4">
                  {destination.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="inline-block bg-[#A0522D]/10 text-[#A0522D] px-3 py-1 rounded-full text-xs font-medium">
                    {destination.category}
                  </span>
                  <button className="text-[#A0522D] hover:text-[#8B4513] font-medium text-sm transition-colors duration-300">
                    Learn More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <button 
            onClick={handleViewAllDestinations}
            className="bg-[#A0522D] text-white px-8 py-3 rounded-full font-medium hover:bg-[#8B4513] transition-colors duration-300 shadow-lg"
          >
            View All Destinations
          </button>
        </div>
      </div>
    </section>
  );
};

export default TourismSection;