import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, MousePointer, Globe, MapPin, Star, Clock, Users } from 'lucide-react';
import InteractiveMap from '../components/map/InteractiveMap';

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleBackToLanding = () => {
    navigate('/');
  };

  const handleViewDestinations = () => {
    navigate('/destinations');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF3E0] via-[#F5E6D3] to-[#E8D5B7] flex flex-col">
      {/* Map Container - Full Focus */}
      <div
        className={`flex-1 m-2 mb-4 transform transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="h-full bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/30">
          <div className="relative p-3 bg-gradient-to-r from-[#A0522D] to-[#D2691E] text-white text-center">
            <button
              onClick={handleBackToLanding}
              className="absolute top-5 flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full transform hover:scale-105 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5 text-[#000]" />
              <span className="font-medium text-gray-700">Home</span>
            </button>

            <h2 className="text-xl md:text-2xl font-bold mb-2">
              Explore African Countries
            </h2>
            <p className="text-sm md:text-base opacity-90">
              Click on any country to discover its unique heritage, traditions,
              and cultural treasures
            </p>
          </div>

          <div className="h-full">
            <InteractiveMap />
          </div>

          {/* Simplified Legend */}
          <div className="mx-14 mb-6">
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors duration-200">
                <MousePointer className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">
                  Click to Preview
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full hover:bg-green-100 transition-colors duration-200">
                <Globe className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-gray-700">
                  Explore Country
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full hover:bg-amber-100 transition-colors duration-200">
                <Eye className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-medium text-gray-700">
                  Hover for Label
                </span>
              </div>
              <button
                onClick={handleViewDestinations}
                className="flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full hover:bg-purple-100 transition-colors duration-200 hover:scale-105 transform"
              >
                <MapPin className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-gray-700">
                  View All Destinations
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Top Destinations Section */}
      <div className="mx-4 mb-6">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/30">
          <div className="bg-gradient-to-r from-[#A0522D] to-[#D2691E] text-white p-6">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
              Top African Destinations
            </h2>
            <p className="text-center opacity-90">
              Discover the most spectacular places across our featured countries
            </p>
          </div>
          
          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Cameroon - Mount Cameroon */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Cameroon
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">4.9</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Mount Cameroon</h3>
                <p className="text-gray-600 text-sm mb-4">
                  West Africa's highest peak with challenging hiking trails and breathtaking views
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>2-3 days</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>5-20 people</span>
                  </div>
                </div>
                <button 
                  onClick={() => navigate('/country/cameroon')}
                  className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-medium"
                >
                  Explore Cameroon
                </button>
              </div>

              {/* Nigeria - Obudu Mountain Resort */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Nigeria
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">4.9</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Obudu Mountain Resort</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Mountain resort with cable car and stunning views of the Cross River landscape
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>2-4 days</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>2-12 people</span>
                  </div>
                </div>
                <button 
                  onClick={() => navigate('/country/nigeria')}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
                >
                  Explore Nigeria
                </button>
              </div>

              {/* Ghana - Mole National Park */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Ghana
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">4.8</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Mole National Park</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Ghana's largest wildlife refuge with elephants, antelopes and diverse ecosystems
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>2-3 days</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>4-12 people</span>
                  </div>
                </div>
                <button 
                  onClick={() => navigate('/country/ghana')}
                  className="mt-4 w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition-colors duration-200 text-sm font-medium"
                >
                  Explore Ghana
                </button>
              </div>
            </div>
            
            <div className="text-center mt-6">
              <button
                onClick={handleViewDestinations}
                className="bg-gradient-to-r from-[#A0522D] to-[#D2691E] text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 font-medium"
              >
                View All Destinations
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Footer */}
      <div className="text-center py-4 px-4">
        <div className="flex justify-center gap-6 text-sm text-gray-600">
          <span className="font-medium">54 Countries</span>
          <span>•</span>
          <span className="font-medium">2000+ Languages</span>
          <span>•</span>
          <span className="font-medium">Rich Cultural Heritage</span>
        </div>
      </div>
    </div>
  );
}