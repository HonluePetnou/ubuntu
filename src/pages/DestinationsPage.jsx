import React, { useState, useMemo, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Search, Filter, MapPin, Clock, Users, Star, ArrowRight, Globe } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CountryDetails from '../data/countryDetails';

/**
 * Destinations Page Component
 * Displays all tourist destinations from all countries with filtering and search
 */
export default function DestinationsPage() {
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

  // Extract all destinations from all countries
  const allDestinations = useMemo(() => {
    const destinations = [];
    Object.entries(CountryDetails).forEach(([countryCode, countryData]) => {
      if (countryData.tourism?.destinations) {
        countryData.tourism.destinations.forEach(destination => {
          destinations.push({
            ...destination,
            countryCode,
            countryName: countryData.name,
            countryPath: countryCode.toLowerCase()
          });
        });
      }
    });
    return destinations;
  }, []);

  // Get unique categories and countries for filters
  const categories = useMemo(() => {
    const cats = new Set(allDestinations.map(dest => dest.category));
    return ['All', ...Array.from(cats)];
  }, [allDestinations]);

  const countries = useMemo(() => {
    const countryNames = new Set(allDestinations.map(dest => dest.countryName));
    return ['All', ...Array.from(countryNames)];
  }, [allDestinations]);

  // Filter destinations based on search and filters
  const filteredDestinations = useMemo(() => {
    return allDestinations.filter(destination => {
      const matchesSearch = destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           destination.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           destination.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || destination.category === selectedCategory;
      const matchesCountry = selectedCountry === 'All' || destination.countryName === selectedCountry;
      
      return matchesSearch && matchesCategory && matchesCountry;
    });
  }, [allDestinations, searchTerm, selectedCategory, selectedCountry]);

  // Get category color
  const getCategoryColor = (category) => {
    const colors = {
      'Water falling': 'bg-blue-100 text-blue-800',
      'Randonnée': 'bg-green-100 text-green-800',
      'Forest': 'bg-emerald-100 text-emerald-800',
      'Kingdom': 'bg-purple-100 text-purple-800',
      'Exotic': 'bg-orange-100 text-orange-800',
      'Water': 'bg-cyan-100 text-cyan-800',
      'Beach': 'bg-yellow-100 text-yellow-800'
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
              <Globe className="w-8 h-8 text-[#A0522D] mr-3" />
              <span className="text-sm font-semibold text-[#A0522D] uppercase tracking-wider">Discover Africa</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#A0522D] to-[#D2691E] bg-clip-text text-transparent mb-6 leading-tight">
              {isCountrySpecific && currentCountryData ? `${currentCountryData.name} Destinations` : 'All Destinations'}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {isCountrySpecific && currentCountryData 
                ? `Discover the best tourist destinations in ${currentCountryData.name}` 
                : 'Explore amazing destinations across Africa - from waterfalls to kingdoms, forests to beaches'
              }
            </p>
            <div className="text-lg text-[#A0522D] font-semibold">
              {filteredDestinations.length} destinations found
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-[#A0522D]/20 rounded-full focus:outline-none focus:ring-2 focus:ring-[#A0522D]/30 focus:border-[#A0522D]"
              />
            </div>
            
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
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

      {/* Destinations Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          {filteredDestinations.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-[#A0522D]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-[#A0522D]/50" />
              </div>
              <h3 className="text-2xl font-bold text-[#A0522D] mb-4">No destinations found</h3>
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredDestinations.map((destination, index) => (
                <div key={index} className="group bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg border border-[#A0522D]/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  {/* Destination Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#A0522D] mb-2 group-hover:text-[#D2691E] transition-colors duration-300">
                          {destination.name}
                        </h3>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{destination.location}, {destination.countryName}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-semibold text-gray-700">{destination.rating}</span>
                      </div>
                    </div>
                    
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(destination.category)}`}>
                      {destination.category}
                    </span>
                  </div>
                  
                  {/* Destination Details */}
                  <div className="px-6 pb-4">
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      {destination.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{destination.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{destination.groupSize}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <div className="px-6 pb-6">
                    <Link
                      to={`/country/${destination.countryPath}`}
                      className="w-full bg-gradient-to-r from-[#A0522D] to-[#D2691E] text-white py-3 px-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 group"
                    >
                      <span>Explore {destination.countryName}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-[#A0522D] to-[#D2691E] text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Explore Africa?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover the beauty, culture, and adventure that awaits you across the African continent
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/"
              className="bg-white text-[#A0522D] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              Back to Home
            </Link>
            <Link 
              to="/country/cameroon"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#A0522D] transition-all duration-300"
            >
              Start with Cameroon
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}