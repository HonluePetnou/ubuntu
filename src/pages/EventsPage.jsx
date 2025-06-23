import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Search, Filter, Calendar, MapPin, Clock, Users, Globe, X, Tag } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import CountryDetails from '../data/countryDetails';

const EventsPage = () => {
  const { countryCode } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [isCountrySpecific, setIsCountrySpecific] = useState(false);
  const [currentCountryData, setCurrentCountryData] = useState(null);

  // Sample events data - in a real app, this would come from an API
  const allEvents = useMemo(() => {
    const events = [];
    Object.entries(CountryDetails).forEach(([code, country]) => {
      // Generate sample events for each country
      const countryEvents = [
        {
          title: `${country.name} Cultural Festival`,
          category: 'Cultural',
          description: `Annual celebration of ${country.name}'s rich cultural heritage featuring traditional music, dance, and arts.`,
          date: '2024-03-15',
          time: '10:00 AM - 8:00 PM',
          location: `${country.capital}, ${country.name}`,
          duration: '3 days',
          expectedAttendees: '5,000+',
          country: country.name,
          countryCode: code,
          isRecurring: true,
          isFree: true,
          tags: ['Traditional', 'Music', 'Dance', 'Arts']
        },
        {
          title: `Traditional ${country.name} Music Concert`,
          category: 'Music',
          description: `Experience the authentic sounds of ${country.name} with performances by renowned local musicians.`,
          date: '2024-04-20',
          time: '7:00 PM - 11:00 PM',
          location: `Cultural Center, ${country.capital}`,
          duration: '4 hours',
          expectedAttendees: '1,200',
          country: country.name,
          countryCode: code,
          isRecurring: false,
          isFree: false,
          tags: ['Music', 'Concert', 'Traditional']
        },
        {
          title: `${country.name} Food & Cuisine Festival`,
          category: 'Food',
          description: `Taste the authentic flavors of ${country.name} with traditional dishes prepared by local chefs.`,
          date: '2024-05-10',
          time: '12:00 PM - 10:00 PM',
          location: `Main Square, ${country.capital}`,
          duration: '2 days',
          expectedAttendees: '8,000+',
          country: country.name,
          countryCode: code,
          isRecurring: true,
          isFree: true,
          tags: ['Food', 'Cuisine', 'Traditional', 'Festival']
        },
        {
          title: `${country.name} Arts & Crafts Exhibition`,
          category: 'Arts',
          description: `Showcase of traditional and contemporary arts and crafts from talented ${country.name} artisans.`,
          date: '2024-06-05',
          time: '9:00 AM - 6:00 PM',
          location: `Art Gallery, ${country.capital}`,
          duration: '1 week',
          expectedAttendees: '2,500',
          country: country.name,
          countryCode: code,
          isRecurring: false,
          isFree: false,
          tags: ['Arts', 'Crafts', 'Exhibition', 'Traditional']
        },
        {
          title: `${country.name} Dance Performance`,
          category: 'Dance',
          description: `Traditional dance performances showcasing the rich movement heritage of ${country.name}.`,
          date: '2024-07-12',
          time: '6:00 PM - 9:00 PM',
          location: `Theater, ${country.capital}`,
          duration: '3 hours',
          expectedAttendees: '800',
          country: country.name,
          countryCode: code,
          isRecurring: false,
          isFree: false,
          tags: ['Dance', 'Performance', 'Traditional']
        }
      ];
      events.push(...countryEvents);
    });
    return events;
  }, []);

  // Get unique categories, countries, and months for filters
  const categories = useMemo(() => {
    const cats = new Set(allEvents.map(event => event.category));
    return ['All', ...Array.from(cats)];
  }, [allEvents]);

  const countries = useMemo(() => {
    const countryNames = new Set(allEvents.map(event => event.country));
    return ['All', ...Array.from(countryNames)];
  }, [allEvents]);

  const months = [
    'All', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Check if this is a country-specific route
  useEffect(() => {
    if (countryCode) {
      setIsCountrySpecific(true);
      const countryData = CountryDetails[countryCode.toUpperCase()];
      if (countryData) {
        setCurrentCountryData(countryData);
        setSelectedCountry(countryData.name);
      }
    }
  }, [countryCode]);

  // Filter events based on search and filters
  const filteredEvents = useMemo(() => {
    return allEvents.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === '' || selectedCategory === 'All' || event.category === selectedCategory;
      const matchesCountry = selectedCountry === '' || selectedCountry === 'All' || event.country === selectedCountry;
      
      let matchesMonth = true;
      if (selectedMonth && selectedMonth !== 'All') {
        const eventMonth = new Date(event.date).toLocaleString('default', { month: 'long' });
        matchesMonth = eventMonth === selectedMonth;
      }
      
      return matchesSearch && matchesCategory && matchesCountry && matchesMonth;
    });
  }, [allEvents, searchTerm, selectedCategory, selectedCountry, selectedMonth]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedMonth('');
    if (!isCountrySpecific) {
      setSelectedCountry('');
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Cultural':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Music':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Food':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Arts':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Dance':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 p-4 rounded-full">
              <Calendar className="w-12 h-12" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4">
            {isCountrySpecific && currentCountryData 
              ? `${currentCountryData.name} Events` 
              : 'West African Events'}
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-6">
            {isCountrySpecific && currentCountryData
              ? `Discover cultural events, festivals, and celebrations in ${currentCountryData.name}`
              : 'Discover cultural events, festivals, and celebrations across West Africa'}
          </p>
          <div className="text-lg opacity-80">
            {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} found
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events, locations, tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white min-w-[150px]"
              >
                {categories.map(category => (
                  <option key={category} value={category === 'All' ? '' : category}>{category}</option>
                ))}
              </select>
            </div>
            
            {/* Month Filter */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white min-w-[140px]"
              >
                {months.map(month => (
                  <option key={month} value={month === 'All' ? '' : month}>{month}</option>
                ))}
              </select>
            </div>
            
            {/* Country Filter - Hidden on country-specific routes */}
            {!isCountrySpecific && (
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white min-w-[200px]"
                >
                  {countries.map(country => (
                    <option key={country} value={country === 'All' ? '' : country}>{country}</option>
                  ))}
                </select>
              </div>
            )}
            
            {/* Clear Filters */}
            {(searchTerm || selectedCategory || selectedMonth || (!isCountrySpecific && selectedCountry)) && (
              <button
                onClick={clearFilters}
                className="px-4 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(event.category)}`}>
                      {event.category}
                    </span>
                    <div className="flex items-center space-x-2">
                      {event.isFree && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded font-medium">
                          Free
                        </span>
                      )}
                      {event.isRecurring && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded font-medium">
                          Recurring
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-purple-600 transition-colors mb-3">
                    {event.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {event.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{event.time} ({event.duration})</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{event.expectedAttendees} expected</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {event.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded flex items-center">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                      {event.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          +{event.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-500">{event.country}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-white rounded-xl shadow-lg p-12 max-w-md mx-auto">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No events found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search terms or filters</p>
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;