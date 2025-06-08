import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, MousePointer, Globe } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF3E0] via-[#F5E6D3] to-[#E8D5B7] flex flex-col">
      {/* Header with Back Button */}
      <div className={`flex items-center justify-between p-4 transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        <button 
          onClick={handleBackToLanding}
          className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium text-gray-700">Back to Home</span>
        </button>
        
        <div className="text-center">
          <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-[#A0522D] via-[#8B4513] to-[#D2691E] bg-clip-text text-transparent">
            🗺️ Cultural Map Explorer
          </h1>
        </div>
        
        <div className="w-32"></div> {/* Spacer for centering */}
      </div>

      {/* Map Container - Full Focus */}
      <div className="flex-1 mx-4 mb-4">
        <div className="h-full bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/30">
          <div className="p-6 bg-gradient-to-r from-[#A0522D] to-[#D2691E] text-white text-center">
            <h2 className="text-xl md:text-2xl font-bold mb-2">Explore African Cultures</h2>
            <p className="text-sm md:text-base opacity-90">
              Click on any country to discover its unique heritage, traditions, and cultural treasures
            </p>
          </div>
          <div className="h-full">
            <InteractiveMap />
          </div>
        </div>
      </div>

      {/* Simplified Legend */}
      <div className="mx-4 mb-6">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
          <h3 className="text-lg font-bold text-gray-800 mb-4 text-center flex items-center justify-center gap-2">
            <Globe className="w-6 h-6 text-blue-600" />
            Map Guide
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors duration-200">
              <MousePointer className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Click to Preview</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full hover:bg-green-100 transition-colors duration-200">
              <Globe className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Explore Country</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full hover:bg-amber-100 transition-colors duration-200">
              <Eye className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-medium text-gray-700">Hover for Label</span>
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