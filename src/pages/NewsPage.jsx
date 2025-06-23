import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Search, Filter, Newspaper, Calendar, User, Globe, X } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import CountryDetails from '../data/countryDetails';

const NewsPage = () => {
  const { countryCode } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isCountrySpecific, setIsCountrySpecific] = useState(false);
  const [currentCountryData, setCurrentCountryData] = useState(null);

  // Sample news data - in a real app, this would come from an API
  const allNews = useMemo(() => {
    const news = [];
    Object.entries(CountryDetails).forEach(([code, country]) => {
      // Generate sample news articles for each country
      const articles = [
        {
          title: `Cultural Heritage Preservation in ${country.name}`,
          category: 'Culture',
          excerpt: `Efforts to preserve traditional arts and cultural practices in ${country.name} continue to gain momentum with new initiatives.`,
          author: 'Cultural Reporter',
          date: '2024-01-15',
          readTime: '5 min read',
          country: country.name,
          countryCode: code
        },
        {
          title: `Traditional Festivals Celebrate ${country.name}'s Rich Heritage`,
          category: 'Events',
          excerpt: `Annual festivals showcase the vibrant traditions and customs that define ${country.name}'s cultural identity.`,
          author: 'Events Correspondent',
          date: '2024-01-10',
          readTime: '3 min read',
          country: country.name,
          countryCode: code
        },
        {
          title: `Culinary Traditions of ${country.name} Gain International Recognition`,
          category: 'Food',
          excerpt: `Traditional cuisine from ${country.name} is being celebrated worldwide for its unique flavors and cultural significance.`,
          author: 'Food Writer',
          date: '2024-01-08',
          readTime: '4 min read',
          country: country.name,
          countryCode: code
        }
      ];
      news.push(...articles);
    });
    return news;
  }, []);

  // Get unique categories and countries for filters
  const categories = useMemo(() => {
    const cats = new Set(allNews.map(article => article.category));
    return ['All', ...Array.from(cats)];
  }, [allNews]);

  const countries = useMemo(() => {
    const countryNames = new Set(allNews.map(article => article.country));
    return ['All', ...Array.from(countryNames)];
  }, [allNews]);

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

  // Filter news based on search and filters
  const filteredNews = useMemo(() => {
    return allNews.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           article.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === '' || selectedCategory === 'All' || article.category === selectedCategory;
      const matchesCountry = selectedCountry === '' || selectedCountry === 'All' || article.country === selectedCountry;
      return matchesSearch && matchesCategory && matchesCountry;
    });
  }, [allNews, searchTerm, selectedCategory, selectedCountry]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    if (!isCountrySpecific) {
      setSelectedCountry('');
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Culture':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Events':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Food':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 p-4 rounded-full">
              <Newspaper className="w-12 h-12" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4">
            {isCountrySpecific && currentCountryData 
              ? `${currentCountryData.name} News` 
              : 'All News'}
          </h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto mb-6">
            {isCountrySpecific && currentCountryData
              ? `Stay updated with the latest news and stories from ${currentCountryData.name}`
              : 'Stay informed with the latest news and stories from across West Africa'}
          </p>
          <div className="text-lg opacity-80">
            {filteredNews.length} {filteredNews.length === 1 ? 'article' : 'articles'} found
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search news articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-[150px]"
              >
                {categories.map(category => (
                  <option key={category} value={category === 'All' ? '' : category}>{category}</option>
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
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-[200px]"
                >
                  {countries.map(country => (
                    <option key={country} value={country === 'All' ? '' : country}>{country}</option>
                  ))}
                </select>
              </div>
            )}
            
            {/* Clear Filters */}
            {(searchTerm || selectedCategory || (!isCountrySpecific && selectedCountry)) && (
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

        {/* News Grid */}
        {filteredNews.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((article, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(article.category)}`}>
                      {article.category}
                    </span>
                    <div className="text-xs text-gray-500">
                      {article.readTime}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-600">{article.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-600">{article.date}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <span className="text-xs text-gray-500">{article.country}</span>
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
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No news found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search terms or filters</p>
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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

export default NewsPage;