import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, Users, MapPin, Compass, ArrowRight, Star, Heart, Eye, TrendingUp } from 'lucide-react';

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const featuredCountries = [
    { name: "Nigeria", culture: "Nollywood & Rich Traditions", flag: "🇳🇬" },
    { name: "Egypt", culture: "Ancient Pyramids & History", flag: "🇪🇬" },
    { name: "South Africa", culture: "Rainbow Nation Diversity", flag: "🇿🇦" },
    { name: "Morocco", culture: "Berber Heritage & Arts", flag: "🇲🇦" },
    { name: "Kenya", culture: "Safari & Maasai Culture", flag: "🇰🇪" }
  ];

  const stats = [
    { number: "54", label: "Countries" },
    { number: "2000+", label: "Languages" },
    { number: "3000+", label: "Ethnic Groups" },
    { number: "1.4B", label: "People" }
  ];

  const culturalHighlights = [
    {
      icon: "🎭",
      title: "Rich Traditions",
      description: "Discover ancient customs, rituals, and ceremonies that have been passed down through generations."
    },
    {
      icon: "🎨",
      title: "Vibrant Arts",
      description: "Explore diverse art forms from traditional sculptures to contemporary African cinema."
    },
    {
      icon: "🎵",
      title: "Musical Heritage",
      description: "Experience the rhythms that gave birth to jazz, blues, and countless musical genres."
    },
    {
      icon: "🍽️",
      title: "Culinary Diversity",
      description: "Taste the flavors of Africa through its rich and varied culinary traditions."
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredCountries.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleExploreMap = () => {
    navigate('/map');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF3E0] via-[#F5E6D3] to-[#E8D5B7] flex flex-col">
      {/* Hero Section */}
      <div className={`text-center py-12 px-4 transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-[#A0522D] via-[#8B4513] to-[#D2691E] bg-clip-text text-transparent mb-6 animate-pulse">
            Ubuntu Cultural Platform
          </h1>
          <div className="absolute -top-4 -right-4 text-6xl animate-bounce">🌍</div>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8">
            Discover the vibrant tapestry of African culture. From ancient traditions to modern innovations, 
            explore the continent that cradles humanity's heritage.
          </p>
          <button 
            onClick={handleExploreMap}
            className="bg-gradient-to-r from-[#A0522D] to-[#D2691E] text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-pulse flex items-center gap-3 mx-auto"
          >
            <Compass className="w-6 h-6" />
            🗺️ Explore Interactive Map
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Cultural Stats */}
      <div className="px-4 mb-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
            🌍 Africa by Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const icons = [Globe, Users, Heart, Star];
              const IconComponent = icons[index];
              const iconColors = ['text-blue-500', 'text-green-500', 'text-red-500', 'text-yellow-500'];
              return (
                <div key={index} className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-xl transform transition-all duration-500 hover:scale-110 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`} style={{ transitionDelay: `${index * 150}ms` }}>
                  <IconComponent className={`w-8 h-8 ${iconColors[index]} mx-auto mb-3`} />
                  <div className="text-3xl md:text-4xl font-bold text-[#A0522D] mb-2">{stat.number}</div>
                  <div className="text-base md:text-lg text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Cultural Highlights */}
      <div className="px-4 mb-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
            ✨ Cultural Treasures
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
              <Star className="w-10 h-10 text-yellow-500 mb-4" />
              <h3 className="text-2xl font-bold text-[#A0522D] mb-4">Diverse Traditions</h3>
              <p className="text-gray-700 leading-relaxed">
                From ancient rituals to modern celebrations, every culture brings unique traditions that have been passed down through generations.
              </p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
              <MapPin className="w-10 h-10 text-red-500 mb-4" />
              <h3 className="text-2xl font-bold text-[#A0522D] mb-4">Rich Heritage</h3>
              <p className="text-gray-700 leading-relaxed">
                Explore architectural marvels, artistic expressions, and historical landmarks that tell the story of human civilization.
              </p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
              <Heart className="w-10 h-10 text-pink-500 mb-4" />
              <h3 className="text-2xl font-bold text-[#A0522D] mb-4">Global Unity</h3>
              <p className="text-gray-700 leading-relaxed">
                Despite our differences, we share common values of love, family, and community that unite us as one human family.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Countries Carousel */}
      <div className="px-4 mb-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-8">
            🏛️ Featured Cultures
          </h2>
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
            <div className="text-center">
              <div className="text-6xl mb-4">{featuredCountries[currentSlide].flag}</div>
              <h3 className="text-2xl md:text-3xl font-bold text-[#A0522D] mb-2">
                {featuredCountries[currentSlide].name}
              </h3>
              <p className="text-lg text-gray-600 mb-6">{featuredCountries[currentSlide].culture}</p>
            </div>
            <div className="flex justify-center mt-6 space-x-3">
              {featuredCountries.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-[#A0522D] w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="px-4 mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-[#A0522D] to-[#D2691E] rounded-3xl p-8 text-white shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Explore?
            </h2>
            <p className="text-lg md:text-xl mb-6 opacity-90">
              Click on any country in our interactive map to dive deep into its unique cultural heritage.
            </p>
            <button 
              onClick={handleExploreMap}
              className="bg-white text-[#A0522D] px-8 py-4 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              🚀 Start Your Cultural Journey
            </button>
          </div>
        </div>
      </div>

      {/* Ubuntu Philosophy Footer */}
      <div className="text-center py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <blockquote className="text-xl md:text-2xl italic text-gray-700 mb-4">
            "Ubuntu: I am because we are. A philosophy that speaks to our interconnectedness."
          </blockquote>
          <p className="text-base text-gray-500">- African Philosophy</p>
        </div>
      </div>
    </div>
  );
}