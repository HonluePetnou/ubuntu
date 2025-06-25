import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, MousePointer, Globe, MapPin, Compass, Navigation, Layers, Leaf } from 'lucide-react';
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
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF3E0] via-[#F5E6D3] to-[#E8D5B7] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23A0522D%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
      </div>

      {/* Header Navigation */}
      <header className="relative z-20 p-3 sm:p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-start gap-2 sm:gap-4">
            <button
              onClick={handleBackToLanding}
              className="flex items-center gap-1.5 sm:gap-2 bg-white/80 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl border border-[#A0522D]/20 hover:bg-white/90 transition-all duration-300 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#A0522D] group-hover:scale-110 transition-transform" />
              <span className="text-sm sm:text-base font-medium text-[#A0522D]">Back</span>
            </button>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={handleViewDestinations}
              className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[#A0522D] to-[#D2691E] px-4 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl text-white text-sm sm:text-base font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <Compass className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden xs:inline sm:inline">Destinations</span>
              <span className="xs:hidden sm:hidden">Dest</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Map Container */}
      <main className="relative z-10 px-3 sm:px-4 pb-3 sm:pb-4">
        <div className="max-w-7xl mx-auto">
          <div
            className={`transform transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            {/* Map Title */}
            <div className="text-center mb-4 sm:mb-6">
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-[#A0522D] via-[#8B4513] to-[#D2691E] bg-clip-text text-transparent leading-tight">
                Explore Africa
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto px-4 sm:px-0">
                Discover the rich cultural heritage and breathtaking landscapes of African nations
              </p>
            </div>

            {/* Map Container */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-[#A0522D]/20 shadow-2xl overflow-hidden">
              {/* Map Controls */}
              <div className="bg-gradient-to-r from-[#A0522D]/10 to-[#D2691E]/10 backdrop-blur-sm p-2 sm:p-4 border-b border-[#A0522D]/20">
                <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3">
                  <div className="flex items-center gap-1 sm:gap-2 px-2 py-1 sm:px-4 sm:py-2 bg-[#A0522D]/20 rounded-lg sm:rounded-xl border border-[#A0522D]/30 hover:bg-[#A0522D]/30 transition-all duration-200">
                    <MousePointer className="w-3 h-3 sm:w-4 sm:h-4 text-[#A0522D]" />
                    <span className="text-xs sm:text-sm font-medium text-[#8B4513]">Click</span>
                    <span className="hidden sm:inline text-xs sm:text-sm font-medium text-[#8B4513]">to Explore</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 px-2 py-1 sm:px-4 sm:py-2 bg-[#D2691E]/20 rounded-lg sm:rounded-xl border border-[#D2691E]/30 hover:bg-[#D2691E]/30 transition-all duration-200">
                    <Navigation className="w-3 h-3 sm:w-4 sm:h-4 text-[#D2691E]" />
                    <span className="text-xs sm:text-sm font-medium text-[#8B4513]">Navigate</span>
                    <span className="hidden md:inline text-xs sm:text-sm font-medium text-[#8B4513]">Interactive</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 px-2 py-1 sm:px-4 sm:py-2 bg-[#8B4513]/20 rounded-lg sm:rounded-xl border border-[#8B4513]/30 hover:bg-[#8B4513]/30 transition-all duration-200">
                    <Layers className="w-3 h-3 sm:w-4 sm:h-4 text-[#8B4513]" />
                    <span className="text-xs sm:text-sm font-medium text-[#8B4513]">Details</span>
                    <span className="hidden sm:inline text-xs sm:text-sm font-medium text-[#8B4513]">Rich</span>
                  </div>
                </div>
              </div>

              {/* Interactive Map */}
              <div className="relative h-[50vh] xs:h-[55vh] sm:h-[65vh] md:h-[70vh] lg:h-[75vh] min-h-[350px] xs:min-h-[400px] sm:min-h-[500px] lg:min-h-[650px] overflow-hidden">
                <InteractiveMap />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Stats */}
      <footer className="relative z-10 text-center py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 md:gap-8 text-[#8B4513] px-4">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Globe className="w-5 h-5 text-[#A0522D]" />
            <span className="text-base font-medium">54 African Nations</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-[#A0522D] rounded-full" />
          <div className="flex items-center gap-1.5 sm:gap-2">
            <MapPin className="w-5 h-5 text-[#D2691E]" />
            <span className="text-base font-medium">Rich Cultural Heritage</span>
          </div>
          <div className="hidden sm:block w-1 h-1 bg-[#A0522D] rounded-full" />
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Eye className="w-5 h-5 text-[#8B4513]" />
            <span className="text-base font-medium">Interactive Exploration</span>
          </div>
        </div>
      </footer>
    </div>
  );
}