import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Search, Filter, Users, Star, ArrowRight, Globe } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CountryDetails from '../data/countryDetails';

/**
 * Dance Page Component
 * Displays all traditional dances from all countries with filtering and search
 */
export default function DancePage() {
  const { countryCode } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('All');

  // Get country data if we're on a country-specific route
  const currentCountryData = countryCode ? CountryDetails[countryCode.toUpperCase()] : null;
  const isCountrySpecific = !!countryCode;

  // Set initial country filter based on route
  useEffect(() => {
    if (isCountrySpecific && currentCountryData) {
      setSelectedCountry(currentCountryData.name);
    }
  }, [countryCode, currentCountryData, isCountrySpecific]);

  // Extract all dances from all countries
  const allDances = useMemo(() => {
    const dances = [];
    Object.entries(CountryDetails).forEach(([countryCode, countryData]) => {
      if (countryData.culture?.dances) {
        countryData.culture.dances.forEach(dance => {
          dances.push({
            name: dance,
            type: 'Traditional Dance',
            category: 'Cultural Dance',
            countryCode,
            countryName: countryData.name,
            countryPath: countryCode.toLowerCase(),
            description: `Traditional ${dance.toLowerCase()} dance from ${countryData.name}, representing the rich cultural heritage and rhythmic traditions of the region.`,
            origin: countryData.name,
            culturalSignificance: 'High'
          });
        });
      }
    });
    return dances;
  }, []);

  // Get unique categories and countries for filters
  const categories = useMemo(() => {
    const cats = new Set(allDances.map(dance => dance.category));
    return ['All', ...Array.from(cats)];
  }, [allDances]);

  const countries = useMemo(() => {
    const countryNames = new Set(allDances.map(dance => dance.countryName));
    return ['All', ...Array.from(countryNames)];
  }, [allDances]);

  // Filter dances based on search and filters
  const filteredDances = useMemo(() => {
    return allDances.filter(dance => {
      const matchesSearch = dance.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           dance.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           dance.countryName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || dance.category === selectedCategory;
      const matchesCountry = selectedCountry === 'All' || dance.countryName === selectedCountry;
      
      return matchesSearch && matchesCategory && matchesCountry;
    });
  }, [allDances, searchTerm, selectedCategory, selectedCountry]);

  // Get category color
  const getCategoryColor = (category) => {
    const colors = {
      'Cultural Dance': 'bg-blue-100 text-blue-800',
      'Traditional Dance': 'bg-green-100 text-green-800',
      'Ceremonial Dance': 'bg-purple-100 text-purple-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF3E0] via-white to-[#F5E6D3]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#A0522D] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#D2691E] rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-[#A0522D] mr-3" />
              <span className="text-sm font-semibold text-[#A0522D] uppercase tracking-wider">African Traditional Dances</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#A0522D] to-[#D2691E] bg-clip-text text-transparent mb-6 leading-tight">
              {isCountrySpecific && currentCountryData ? `${currentCountryData.name} Dances` : 'All Traditional Dances'}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {isCountrySpecific && currentCountryData 
                ? `Discover the traditional dances and rhythmic heritage of ${currentCountryData.name}` 
                : 'Explore the vibrant world of African traditional dances and cultural expressions'
              }
            </p>
            <div className="text-lg text-[#A0522D] font-semibold">
              {filteredDances.length} traditional dances found
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A0522D] w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search traditional dances..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-[#A0522D]/20 rounded-full focus:outline-none focus:ring-2 focus:ring-[#A0522D]/30 focus:border-[#A0522D] bg-white"
                />
              </div>
            </div>
            
            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-[#A0522D]" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-[#A0522D]/20 rounded-full focus:outline-none focus:ring-2 focus:ring-[#A0522D]/30 focus:border-[#A0522D]"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              {!isCountrySpecific && (
                <div className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-[#A0522D]" />
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="px-4 py-2 border border-[#A0522D]/20 rounded-full focus:outline-none focus:ring-2 focus:ring-[#A0522D]/30 focus:border-[#A0522D]"
                  >
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Dances Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          {filteredDances.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-[#A0522D]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-[#A0522D]/50" />
              </div>
              <h3 className="text-2xl font-bold text-[#A0522D] mb-4">No dances found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search terms or filters</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  if (!isCountrySpecific) {
                    setSelectedCountry('All');
                  }
                }}
                className="bg-[#A0522D] text-white px-6 py-3 rounded-full hover:bg-[#D2691E] transition-colors duration-300"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDances.map((dance, index) => (
                <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-[#E8D5B7]">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(dance.category)}`}>
                            {dance.category}
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#A0522D]/10 text-[#A0522D]">
                            {dance.type}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-[#A0522D] mb-2 group-hover:text-[#D2691E] transition-colors">
                          {dance.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {dance.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-[#E8D5B7]">
                      <div className="flex items-center text-sm text-gray-500">
                        <Globe className="w-4 h-4 mr-1" />
                        <span>{dance.countryName}</span>
                      </div>
                      <Link
                        to={`/country/${dance.countryPath}`}
                        className="flex items-center text-[#A0522D] hover:text-[#D2691E] transition-colors text-sm font-medium"
                      >
                        Explore
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}