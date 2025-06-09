import React, { useState } from 'react';
import { MapPin, Star, Clock, Users } from 'lucide-react';

const TourismSection = ({ countryData, theme }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  // Sample tourism data - this would ideally come from your data files
  const tourismCategories = [
    'All', 'Camping tour', 'Forest', 'Randonnée', 'Water falling', 
    'Exotic', 'Water', 'Kingdom', 'Trip', 'Lorem', 'ipsum'
  ];

  // Sample destinations - you can expand this with real data
  const destinations = [
    {
      id: 1,
      name: 'Chute de la lobe',
      location: 'Dschang',
      category: 'Water falling',
      rating: 4.8,
      duration: '2-3 hours',
      groupSize: '2-15 people',
      image: '/api/placeholder/300/200',
      description: 'Beautiful waterfall with stunning natural scenery'
    },
    {
      id: 2,
      name: 'Mount Cameroon Trek',
      location: 'Buea',
      category: 'Randonnée',
      rating: 4.9,
      duration: '2-3 days',
      groupSize: '5-20 people',
      image: '/api/placeholder/300/200',
      description: 'Challenging hike to the highest peak in West Africa'
    },
    {
      id: 3,
      name: 'Waza National Park',
      location: 'Far North',
      category: 'Forest',
      rating: 4.7,
      duration: '1-2 days',
      groupSize: '4-12 people',
      image: '/api/placeholder/300/200',
      description: 'Wildlife safari in pristine natural habitat'
    },
    {
      id: 4,
      name: 'Kribi Beach Resort',
      location: 'Kribi',
      category: 'Water',
      rating: 4.6,
      duration: '3-7 days',
      groupSize: '2-8 people',
      image: '/api/placeholder/300/200',
      description: 'Relaxing beach destination with crystal clear waters'
    },
    {
      id: 5,
      name: 'Foumban Royal Palace',
      location: 'Foumban',
      category: 'Kingdom',
      rating: 4.5,
      duration: '3-4 hours',
      groupSize: '5-25 people',
      image: '/api/placeholder/300/200',
      description: 'Historic royal palace showcasing Bamoun culture'
    },
    {
      id: 6,
      name: 'Limbe Botanical Garden',
      location: 'Limbe',
      category: 'Exotic',
      rating: 4.4,
      duration: '2-3 hours',
      groupSize: '2-20 people',
      image: '/api/placeholder/300/200',
      description: 'Diverse collection of tropical plants and flowers'
    }
  ];

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
          {filteredDestinations.map((destination) => (
            <div
              key={destination.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              {/* Image */}
              <div className="relative h-48 bg-gradient-to-br from-blue-300 to-blue-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-300 to-blue-500 opacity-80"></div>
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
          <button className="bg-[#A0522D] text-white px-8 py-3 rounded-full font-medium hover:bg-[#8B4513] transition-colors duration-300 shadow-lg">
            View All Destinations
          </button>
        </div>
      </div>
    </section>
  );
};

export default TourismSection;