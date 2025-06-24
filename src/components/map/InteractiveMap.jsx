import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { X, ExternalLink, MapPin, Globe, Users } from "lucide-react";
import Countries from "../../data/countries";
import CountryDescriptions from "../../data/countryDescriptions";
import { MAP_CONFIG } from "../../utils/constants";

const { MODAL_WIDTH, MODAL_HEIGHT, MARGIN, VIEW_BOX } = MAP_CONFIG;

export default function InteractiveMap() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mapScale, setMapScale] = useState(1);
  const mapRef = useRef(null);
  const navigate = useNavigate();

  // Handle responsive scaling
  useEffect(() => {
    const handleResize = () => {
      if (mapRef.current) {
        const containerWidth = mapRef.current.offsetWidth;
        const containerHeight = mapRef.current.offsetHeight;
        
        // Responsive scaling based on screen size - more generous scaling
        let scale = 1;
        if (window.innerWidth < 480) {
          // Mobile phones - larger scale for better visibility
          scale = Math.min(containerWidth / 250, containerHeight / 180, 2.0);
        } else if (window.innerWidth < 768) {
          // Tablets - generous scaling
          scale = Math.min(containerWidth / 350, containerHeight / 220, 2.2);
        } else if (window.innerWidth < 1024) {
          // Small laptops
          scale = Math.min(containerWidth / 450, containerHeight / 280, 2.4);
        } else {
          // Desktop
          scale = Math.min(containerWidth / 550, containerHeight / 350, 2.6);
        }
        
        setMapScale(Math.max(1.0, scale)); // Increased minimum scale to 1.0
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCountryClick = (e, id, title) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const containerRect = mapRef.current?.getBoundingClientRect();
    
    if (!containerRect) return;
    
    // Calculate position relative to the map container
    let x = rect.left + rect.width / 2 - containerRect.left;
    let y = rect.top - containerRect.top;
    
    // Responsive modal positioning
    let modalWidth, modalHeight, safeMargin;
    
    if (window.innerWidth < 480) {
      // Mobile phones
      modalWidth = Math.min(window.innerWidth - 40, 260);
      modalHeight = 280;
      safeMargin = 10;
    } else if (window.innerWidth < 768) {
      // Tablets
      modalWidth = 300;
      modalHeight = 320;
      safeMargin = 15;
    } else {
      // Desktop
      modalWidth = 320;
      modalHeight = 350;
      safeMargin = 20;
    }
    
    // Keep modal within container bounds with better spacing
    if (x + modalWidth + safeMargin > containerRect.width) {
      x = containerRect.width - modalWidth - safeMargin;
    }
    if (x < safeMargin) {
      x = safeMargin;
    }
    
    // Position modal above the country if there's not enough space below
    if (y + modalHeight + safeMargin > containerRect.height) {
      y = Math.max(safeMargin, y - modalHeight - 30);
    } else {
      y = Math.min(y + 10, containerRect.height - modalHeight - safeMargin);
    }
    
    // Ensure modal doesn't go above container
    if (y < safeMargin) {
      y = safeMargin;
    }

    setModalPosition({ x, y });
    setSelectedCountry({ id, title });
  };

  const handleCountryHover = (id, title) => {
    setHoveredCountry({ id, title });
  };

  const handleCountryLeave = () => {
    setHoveredCountry(null);
  };

  const handleCloseModal = () => setSelectedCountry(null);

  const handleExploreCountry = async () => {
    if (selectedCountry) {
      setIsLoading(true);
      // Add a small delay for better UX
      setTimeout(() => {
        navigate(`/country/${selectedCountry.id}`);
      }, 300);
    }
  };

  const getCountryFill = (countryId) => {
    if (selectedCountry?.id === countryId) return '#8B4513';
    if (hoveredCountry?.id === countryId) return '#D2691E';
    return '#A0522D';
  };

  const getCountryOpacity = (countryId) => {
    if (selectedCountry?.id === countryId) return 1;
    if (hoveredCountry?.id === countryId) return 0.9;
    return 0.8;
  };

  return (
    <div 
      ref={mapRef}
      className="relative w-full h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] bg-gradient-to-br from-[#FAF3E0] to-[#F5E6D3] shadow-inner md:pt-14 "
      style={{ overflow: 'visible' }}
    >
      {/* Map Container */}
      <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-4 lg:p-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox={VIEW_BOX}
          className="w-full h-full max-w-full max-h-full transition-transform duration-300 ease-in-out"
          preserveAspectRatio="xMidYMid meet"
          style={{ 
            transform: `scale(${mapScale})`,
            filter: 'drop-shadow(0 4px 8px rgba(160, 82, 45, 0.1))',
            minWidth: window.innerWidth < 480 ? '350px' : '400px',
            minHeight: window.innerWidth < 480 ? '250px' : '300px'
          }}
        >
          {/* Background removed - was causing unwanted rectangle */}
          
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A0522D" />
              <stop offset="100%" stopColor="#D2691E" />
            </linearGradient>
            <filter id="countryGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/> 
              </feMerge>
            </filter>
          </defs>

          {Countries.map((country) => (
            <g key={country.id}>
              <path
                id={country.id}
                title={country.title}
                d={country.d}
                onClick={(e) => handleCountryClick(e, country.id, country.title)}
                onMouseEnter={() => handleCountryHover(country.id, country.title)}
                onMouseLeave={handleCountryLeave}
                className="cursor-pointer transition-all duration-300 ease-in-out"
                style={{
                  fill: getCountryFill(country.id),
                  opacity: getCountryOpacity(country.id),
                  stroke: '#8B4513',
                  strokeWidth: hoveredCountry?.id === country.id ? '1.5' : '0.5',
                  filter: selectedCountry?.id === country.id ? 'url(#countryGlow)' : 'none'
                }}
              />
            </g>
          ))}
        </svg>

        {/* Hover Tooltip */}
        {hoveredCountry && !selectedCountry && (
          <div className="absolute pointer-events-none z-10 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg border border-[#A0522D]/20 transform -translate-x-1/2 -translate-y-full">
            <p className="text-sm font-medium text-[#8B4513] whitespace-nowrap">
              {hoveredCountry.title}
            </p>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/95"></div>
          </div>
        )}
      </div>

      {/* Enhanced Modal */}
      {selectedCountry && (
        <>
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm z-20 transition-opacity duration-300"
            onClick={handleCloseModal}
          />
          
          {/* Modal */}
          <div
            className="absolute z-30 bg-white/95 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl border border-[#A0522D]/20 overflow-hidden transform transition-all duration-300 ease-out"
            style={{
              left: modalPosition.x,
              top: modalPosition.y,
              width: window.innerWidth < 480 ? `${Math.min(window.innerWidth - 40, 260)}px` : 
                     window.innerWidth < 768 ? '300px' : '320px',
              maxWidth: 'calc(100vw - 20px)',
              maxHeight: 'calc(100vh - 40px)',
              zIndex: 1000
            }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#A0522D] to-[#D2691E] p-3 sm:p-4 text-white relative">
              <button
                onClick={handleCloseModal}
                className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200"
                aria-label="Close modal"
              >
                <X className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
              
              <div className="flex items-center gap-2 sm:gap-3 pr-6 sm:pr-8">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold">
                    {selectedCountry.title}
                  </h2>
                  <p className="text-xs sm:text-sm opacity-90">
                    {selectedCountry.id.toUpperCase()}
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
              <div className="flex items-start gap-2 sm:gap-3">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-[#A0522D] mt-0.5 flex-shrink-0" />
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  {CountryDescriptions[selectedCountry.id] || "Discover the rich culture, history, and natural beauty of this amazing African nation."}
                </p>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-2 sm:gap-4 py-2 px-2 sm:px-3 bg-[#FAF3E0] rounded-lg">
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4 text-[#8B4513]" />
                  <span className="text-xs text-[#8B4513] font-medium">Rich Heritage</span>
                </div>
                <div className="w-1 h-1 bg-[#A0522D] rounded-full" />
                <div className="flex items-center gap-1">
                  <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-[#8B4513]" />
                  <span className="text-xs text-[#8B4513] font-medium">Unique Culture</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handleExploreCountry}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#A0522D] to-[#D2691E] text-white px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium hover:shadow-lg hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="text-sm sm:text-base">Loading...</span>
                  </>
                ) : (
                  <>
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-sm sm:text-base">Explore {selectedCountry.title}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
