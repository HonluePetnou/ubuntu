import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Palette, Music, Users } from 'lucide-react';

const ArtsSection = ({ countryData, theme = 'blue', themeOverrides = {} }) => {
  const [activeTab, setActiveTab] = useState('art');
  const navigate = useNavigate();

  const handleViewAllArts = () => {
    const countryCode = countryData?.countryCode;
    if (countryCode) {
      navigate(`/country/${countryCode.toLowerCase()}/arts`);
    }
  };

  const handleViewAllDances = () => {
    const countryCode = countryData?.countryCode;
    if (countryCode) {
      navigate(`/country/${countryCode.toLowerCase()}/dance`);
    }
  };

  const handleViewAllMusic = () => {
    const countryCode = countryData?.countryCode;
    if (countryCode) {
      navigate(`/country/${countryCode.toLowerCase()}/music`);
    }
  };

  // Theme configurations matching site's design system
  const themes = {
    blue: {
      primary: 'bg-[#A0522D]',
      secondary: 'bg-[#FAF3E0]',
      accent: 'text-[#A0522D]',
      border: 'border-[#E8D5B7]',
      hover: 'hover:bg-[#F5E6D3]'
    },
    green: {
      primary: 'bg-[#A0522D]',
      secondary: 'bg-[#FAF3E0]',
      accent: 'text-[#A0522D]',
      border: 'border-[#E8D5B7]',
      hover: 'hover:bg-[#F5E6D3]'
    },
    orange: {
      primary: 'bg-[#A0522D]',
      secondary: 'bg-[#FAF3E0]',
      accent: 'text-[#A0522D]',
      border: 'border-[#E8D5B7]',
      hover: 'hover:bg-[#F5E6D3]'
    }
  };

  // Apply theme overrides
  const currentTheme = {
    ...themes[theme],
    ...themeOverrides
  };

  const tabs = [
    { id: 'art', label: 'Art & Crafts', icon: Palette },
    { id: 'dance', label: 'Dance', icon: Users },
    { id: 'music', label: 'Music', icon: Music }
  ];

  const renderArtContent = () => {
    const arts = countryData?.arts;
    if (!arts) return <div className="text-gray-500 text-center py-8">No art information available</div>;

    return (
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h3 className={`text-xl font-semibold mb-4 ${currentTheme.accent} flex items-center`}>
              <Palette className="w-6 h-6 mr-2" />
              Traditional Crafts
            </h3>
            <div className="grid gap-3">
              {arts.crafts?.map((craft, index) => (
                <div key={index} className={`group p-4 rounded-lg ${currentTheme.secondary} ${currentTheme.border} border ${currentTheme.hover} transition-all duration-300 hover:shadow-md cursor-pointer`}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${currentTheme.primary} group-hover:scale-110 transition-transform`}></div>
                    <span className="font-medium group-hover:text-gray-800 transition-colors">{craft}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className={`text-xl font-semibold mb-4 ${currentTheme.accent}`}>Traditional Materials</h3>
            <div className="flex flex-wrap gap-2">
              {arts.materials?.map((material, index) => (
                <span key={index} className={`px-4 py-2 rounded-full text-sm ${currentTheme.secondary} ${currentTheme.accent} border ${currentTheme.border} hover:shadow-sm transition-shadow cursor-pointer`}>
                  {material}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className={`text-xl font-semibold mb-4 ${currentTheme.accent}`}>Art Styles</h3>
            <div className="space-y-3">
              {arts.styles?.map((style, index) => (
                <div key={index} className={`group p-4 rounded-lg border ${currentTheme.border} ${currentTheme.hover} transition-all duration-300 hover:shadow-md cursor-pointer bg-white`}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg ${currentTheme.primary} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                      <Palette className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium group-hover:text-gray-800 transition-colors">{style}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDanceContent = () => {
    const dances = countryData?.culture?.dances;
    if (!dances || dances.length === 0) return <div className="text-gray-500 text-center py-8">No dance information available</div>;

    return (
      <div className="space-y-8">
        <div className="text-center">
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the rhythmic movements and cultural expressions that have been passed down through generations in {countryData?.name}.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dances.map((dance, index) => (
            <div key={index} className={`group p-6 rounded-xl border ${currentTheme.border} ${currentTheme.hover} transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white cursor-pointer`}>
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-12 h-12 rounded-full ${currentTheme.primary} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold group-hover:text-gray-800 transition-colors">{dance}</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Traditional dance form representing the rich cultural heritage of {countryData?.name}
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className={`text-xs font-medium ${currentTheme.accent} uppercase tracking-wide`}>
                  Cultural Heritage
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMusicContent = () => {
    const music = countryData?.culture?.music;
    const instruments = countryData?.culture?.instruments;
    
    if (!music && !instruments) return <div className="text-gray-500 text-center py-8">No music information available</div>;

    return (
      <div className="space-y-8">
        <div className="text-center">
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the melodic traditions and rhythmic heritage that define the musical landscape of {countryData?.name}.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {music && music.length > 0 && (
            <div className="space-y-6">
              <h3 className={`text-xl font-semibold ${currentTheme.accent} flex items-center`}>
                <Music className="w-6 h-6 mr-2" />
                Musical Genres
              </h3>
              <div className="space-y-4">
                {music.map((genre, index) => (
                  <div key={index} className={`group p-5 rounded-lg ${currentTheme.secondary} border ${currentTheme.border} ${currentTheme.hover} transition-all duration-300 hover:shadow-lg cursor-pointer`}>
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full ${currentTheme.primary} flex items-center justify-center group-hover:scale-110 transition-transform shadow-md`}>
                        <Music className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg group-hover:text-gray-800 transition-colors">{genre}</h4>
                        <p className="text-sm text-gray-600 mt-1">Traditional musical style of {countryData?.name}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {instruments && instruments.length > 0 && (
            <div className="space-y-6">
              <h3 className={`text-xl font-semibold ${currentTheme.accent}`}>Traditional Instruments</h3>
              <div className="grid grid-cols-2 gap-4">
                {instruments.map((instrument, index) => (
                  <div key={index} className={`group p-4 text-center rounded-lg border ${currentTheme.border} ${currentTheme.hover} transition-all duration-300 hover:shadow-md hover:-translate-y-1 bg-white cursor-pointer`}>
                    <div className={`w-10 h-10 rounded-full ${currentTheme.primary} mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}>
                      <Music className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-medium group-hover:text-gray-800 transition-colors block">{instrument}</span>
                    <span className={`text-xs ${currentTheme.accent} mt-1 block opacity-75`}>Traditional</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'art':
        return renderArtContent();
      case 'dance':
        return renderDanceContent();
      case 'music':
        return renderMusicContent();
      default:
        return renderArtContent();
    }
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-[#FAF3E0] via-[#F5E6D3] to-[#E8D5B7]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#A0522D] mb-4">
            Cultural Arts of {countryData?.name}
          </h2>
          <div className={`w-24 h-1 ${currentTheme.primary} mx-auto mb-6`}></div>
          <p className="text-lg text-[#8B4513] max-w-3xl mx-auto">
            Discover the rich artistic heritage, traditional dances, and musical traditions that define the cultural identity of {countryData?.name}.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className={`flex rounded-lg border ${currentTheme.border} overflow-hidden`}>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 flex items-center space-x-2 transition-colors ${
                    activeTab === tab.id
                      ? `${currentTheme.primary} text-white`
                      : `bg-white ${currentTheme.accent} ${currentTheme.hover}`
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="min-h-[400px]">
          {renderContent()}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          {activeTab === 'art' && (
            <Link
              to="/auth"
              className={`px-8 py-3 ${currentTheme.primary} text-white rounded-lg hover:opacity-90 transition-opacity font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200`}
            >
              View All Arts & Crafts
            </Link>
          )}
          {activeTab === 'dance' && (
            <Link
              to="/signup"
              className={`px-8 py-3 ${currentTheme.primary} text-white rounded-lg hover:opacity-90 transition-opacity font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200`}
            >
              View All Dances
            </Link>
          )}
          {activeTab === 'music' && (
            <Link
              to="/signup"
              className={`px-8 py-3 ${currentTheme.primary} text-white rounded-lg hover:opacity-90 transition-opacity font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200`}
            >
              View All Music
            </Link>
          )}
        </div>

      </div>
    </section>
  );
};

export default ArtsSection;