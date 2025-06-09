import React from 'react';
import { MapPin, Users, Globe, Calendar, Star, Play, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Modern Hero Section Component
 * Clean design inspired by travel and discovery themes
 */
export default function HeroSection({ countryData, theme = 'blue' }) {
  const {
    name,
    fullName,
    nickname,
    capital,
    population,
    independence,
    flagColors = ['#4A90E2'],
    keyFacts = []
  } = countryData || {};

  // Theme configurations matching global styles
  const themes = {
    blue: {
      gradient: 'from-[#FAF3E0] via-[#F5E6D3] to-[#E8D5B7]',
      accent: 'text-[#A0522D]',
      cardBg: 'bg-white/90',
      buttonPrimary: 'bg-[#A0522D] hover:bg-[#8B4513]',
      buttonSecondary: 'border-[#A0522D] text-[#A0522D] hover:bg-[#FAF3E0]'
    },
    green: {
      gradient: 'from-[#FAF3E0] via-[#F5E6D3] to-[#E8D5B7]',
      accent: 'text-[#A0522D]',
      cardBg: 'bg-white/90',
      buttonPrimary: 'bg-[#A0522D] hover:bg-[#8B4513]',
      buttonSecondary: 'border-[#A0522D] text-[#A0522D] hover:bg-[#FAF3E0]'
    },
    orange: {
      gradient: 'from-[#FAF3E0] via-[#F5E6D3] to-[#E8D5B7]',
      accent: 'text-[#A0522D]',
      cardBg: 'bg-white/90',
      buttonPrimary: 'bg-[#A0522D] hover:bg-[#8B4513]',
      buttonSecondary: 'border-[#A0522D] text-[#A0522D] hover:bg-[#FAF3E0]'
    }
  };

  const currentTheme = themes[theme] || themes.blue;

  return (
    <section className={`relative min-h-screen bg-gradient-to-br ${currentTheme.gradient} overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/20 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-white/15 rounded-full blur-lg"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-white/20 rounded-full blur-xl"></div>
      </div>



      {/* Main Content */}
      <div className="relative container mx-auto px-6 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-200px)]">
          
          {/* Left Column - Content */}
          <div className="text-[#222] space-y-8">
            {/* Country Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#A0522D]/20 backdrop-blur-sm rounded-full text-sm font-medium text-[#A0522D]">
              <MapPin size={16} />
              <span>Africa</span>
            </div>

            {/* Country Name */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight text-[#A0522D]">
                {name}
              </h1>
              {nickname && (
                <p className="text-xl md:text-2xl text-[#222]/80 font-light">
                  {nickname}
                </p>
              )}
              {fullName && (
                <p className="text-lg text-[#222]/70">
                  {fullName}
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-lg md:text-xl text-[#222]/80 max-w-2xl leading-relaxed">
              Discover the rich heritage, vibrant culture, and breathtaking landscapes of {name}. 
              A land where ancient traditions meet modern aspirations.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {capital && (
                <div className={`${currentTheme.cardBg} backdrop-blur-sm rounded-xl p-4 text-center`}>
                  <Globe className={`w-6 h-6 ${currentTheme.accent} mx-auto mb-2`} />
                  <p className="text-sm text-gray-600 font-medium">{capital}</p>
                  <p className="text-xs text-gray-500">Capital</p>
                </div>
              )}
              {population && (
                <div className={`${currentTheme.cardBg} backdrop-blur-sm rounded-xl p-4 text-center`}>
                  <Users className={`w-6 h-6 ${currentTheme.accent} mx-auto mb-2`} />
                  <p className="text-sm text-gray-600 font-medium">{population}</p>
                  <p className="text-xs text-gray-500">Population</p>
                </div>
              )}
              {independence && (
                <div className={`${currentTheme.cardBg} backdrop-blur-sm rounded-xl p-4 text-center`}>
                  <Calendar className={`w-6 h-6 ${currentTheme.accent} mx-auto mb-2`} />
                  <p className="text-sm text-gray-600 font-medium">{independence}</p>
                  <p className="text-xs text-gray-500">Independence</p>
                </div>
              )}
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className={`flex items-center justify-center gap-2 px-8 py-4 ${currentTheme.buttonPrimary} text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg`}>
                <Play size={20} />
                Explore Culture
              </button>
              <button className={`flex items-center justify-center gap-2 px-8 py-4 bg-white backdrop-blur-sm border-2 ${currentTheme.buttonSecondary} rounded-xl font-semibold transition-all duration-300 hover:scale-105`}>
                <Download size={20} />
                Travel Guide
              </button>
            </div>
          </div>

          {/* Right Column - Visual Elements */}
          <div className="relative">
            {/* Main Visual Card */}
            <div className="relative bg-white/80 backdrop-blur-lg rounded-3xl p-8 border border-[#A0522D]/20 shadow-lg">
              {/* Flag Colors Display */}
              {flagColors && flagColors.length > 0 && (
                <div className="flex gap-2 mb-6">
                  {flagColors.map((color, index) => (
                    <div 
                      key={index}
                      className="w-12 h-8 rounded-lg shadow-md"
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>
              )}

              {/* Key Facts */}
              {keyFacts && keyFacts.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-[#A0522D] mb-4">Did You Know?</h3>
                  <div className="space-y-3">
                    {keyFacts.slice(0, 3).map((fact, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Star className="w-5 h-5 text-[#A0522D] mt-0.5 flex-shrink-0" />
                        <p className="text-[#222]/80 text-sm leading-relaxed">{fact}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-6 -left-6 bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-[#A0522D]/20 shadow-lg">
              <div className="w-12 h-12 bg-[#A0522D]/10 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-[#A0522D]" />
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-[#A0522D]/20 shadow-lg">
              <div className="w-12 h-12 bg-[#A0522D]/10 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-[#A0522D]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-[#A0522D]/70">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-sm">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-[#A0522D]/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#A0522D]/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}