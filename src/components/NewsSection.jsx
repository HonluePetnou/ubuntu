import React from 'react';
import { Calendar, User, ArrowRight, Clock, Tag, Globe, Heart, Star, Newspaper } from 'lucide-react';

const NewsSection = ({ countryData, theme = 'blue', themeOverrides = {} }) => {
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

  const currentTheme = {
    ...themes[theme],
    ...themeOverrides
  };

  // Cultural news data - adapted for cultural website
  const getNewsArticles = () => {
    const countryName = countryData?.name || 'Our Country';
    return [
      {
        id: 1,
        title: `Celebrating ${countryName}'s Rich Cultural Heritage Through Art`,
        excerpt: `Discover how traditional artisans are preserving ancient crafts while embracing modern techniques to create stunning contemporary pieces that tell the story of our cultural identity.`,
        author: 'Cultural Heritage Team',
        date: '2024-01-15',
        category: 'Heritage',
        readTime: '6 min read',
        image: '/api/placeholder/400/250',
        featured: true,
        icon: 'Star'
      },
      {
        id: 2,
        title: `Traditional Music Festival Brings Communities Together`,
        excerpt: `Annual celebration showcases diverse musical traditions, featuring local artists and international performers in a vibrant cultural exchange.`,
        author: 'Festival Correspondent',
        date: '2024-01-12',
        category: 'Events',
        readTime: '4 min read',
        image: '/api/placeholder/400/250',
        featured: false,
        icon: 'Heart'
      },
      {
        id: 3,
        title: `Culinary Traditions: From Ancient Recipes to Modern Tables`,
        excerpt: `Explore how traditional cooking methods and indigenous ingredients continue to influence contemporary cuisine and bring families together.`,
        author: 'Food Culture Writer',
        date: '2024-01-10',
        category: 'Gastronomy',
        readTime: '5 min read',
        image: '/api/placeholder/400/250',
        featured: false,
        icon: 'Globe'
      },
      {
        id: 4,
        title: `Youth Preserving Cultural Languages Through Digital Innovation`,
        excerpt: `Young innovators are using technology to document, teach, and preserve indigenous languages for future generations.`,
        author: 'Language Preservation Society',
        date: '2024-01-08',
        category: 'Language',
        readTime: '7 min read',
        image: '/api/placeholder/400/250',
        featured: false,
        icon: 'Newspaper'
      }
    ];
  };

  const newsArticles = getNewsArticles();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      Heritage: 'bg-amber-100 text-amber-800 border-amber-200',
      Events: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      Gastronomy: 'bg-orange-100 text-orange-800 border-orange-200',
      Language: 'bg-purple-100 text-purple-800 border-purple-200',
      Arts: 'bg-rose-100 text-rose-800 border-rose-200',
      default: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[category] || colors.default;
  };

  const getIconComponent = (iconName) => {
    const icons = {
      Star: Star,
      Heart: Heart,
      Globe: Globe,
      Newspaper: Newspaper,
      Calendar: Calendar
    };
    return icons[iconName] || Calendar;
  };

  if (!newsArticles || newsArticles.length === 0) {
    return (
      <section className="py-16 px-4 bg-gradient-to-br from-[#FAF3E0] via-[#F5E6D3] to-[#E8D5B7]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#A0522D] mb-4">
            Our Latest News
          </h2>
          <p className="text-gray-500">No news articles available at the moment</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-[#FAF3E0] via-[#F5E6D3] to-[#E8D5B7]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#A0522D] rounded-full mb-6">
            <Newspaper className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-5xl font-bold text-[#A0522D] mb-6 tracking-tight">
            Cultural Stories
          </h2>
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-1 bg-[#A0522D] rounded-full"></div>
            <div className="w-3 h-3 bg-[#A0522D] rounded-full mx-4"></div>
            <div className="w-12 h-1 bg-[#A0522D] rounded-full"></div>
          </div>
          <p className="text-xl text-[#8B4513] max-w-3xl mx-auto leading-relaxed">
            Discover the vibrant tapestry of {countryData?.name || 'our nation\'s'} cultural heritage through compelling stories, 
            traditional celebrations, and the voices that shape our identity.
          </p>
        </div>

        {/* News Layout - Sidebar Style */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Featured Article */}
          <div className="lg:col-span-2">
            {newsArticles.slice(0, 1).map((article) => (
              <div key={article.id} className={`group ${currentTheme.hover} transition-all duration-300 hover:shadow-xl bg-white rounded-xl overflow-hidden border ${currentTheme.border} cursor-pointer h-full`}>
                {/* Large Article Image */}
                <div className="relative overflow-hidden h-64 lg:h-80">
                  <div className="w-full h-full bg-gradient-to-br from-[#A0522D] via-[#8B4513] to-[#654321] flex items-center justify-center relative">
                    {/* Cultural Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="w-full h-full" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3Ccircle cx='50' cy='50' r='2'/%3E%3Ccircle cx='10' cy='50' r='2'/%3E%3Ccircle cx='50' cy='10' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '60px 60px'
                      }}></div>
                    </div>
                    <div className="text-white text-center relative z-10">
                      <div className="w-24 h-24 mx-auto mb-4 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white border-opacity-30">
                        {React.createElement(getIconComponent(article.icon), { className: "w-12 h-12" })}
                      </div>
                      <p className="text-xl font-semibold opacity-95">Featured Story</p>
                      <p className="text-sm opacity-75 mt-1">Cultural Heritage</p>
                    </div>
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-6 left-6">
                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border backdrop-blur-sm bg-white bg-opacity-90 ${getCategoryColor(article.category)}`}>
                      <Tag className="w-4 h-4 mr-2" />
                      {article.category}
                    </span>
                  </div>
                  
                  {/* Featured Badge */}
                  <div className="absolute top-6 right-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </span>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-8">
                  {/* Article Title */}
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors leading-tight">
                    {article.title}
                  </h3>

                  {/* Article Excerpt */}
                  <p className="text-gray-600 text-base leading-relaxed mb-6">
                    {article.excerpt}
                  </p>

                  {/* Article Meta */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(article.date)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    {/* Read More Link */}
                    <button className={`inline-flex items-center space-x-2 ${currentTheme.accent} hover:underline font-medium transition-colors`}>
                      <span>Learn More</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar with smaller articles */}
          <div className="space-y-6">
            {newsArticles.slice(1, 4).map((article, index) => (
              <div key={article.id} className={`group ${currentTheme.hover} transition-all duration-300 hover:shadow-lg bg-white rounded-lg overflow-hidden border ${currentTheme.border} cursor-pointer`}>
                {/* Small Article Image */}
                <div className="relative overflow-hidden h-32">
                  <div className={`w-full h-full bg-gradient-to-br ${index === 0 ? 'from-emerald-500 to-teal-600' : index === 1 ? 'from-orange-500 to-red-600' : 'from-purple-500 to-indigo-600'} flex items-center justify-center relative`}>
                    {/* Mini Cultural Pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="w-full h-full" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '40px 40px'
                      }}></div>
                    </div>
                    <div className="text-white text-center relative z-10">
                      <div className="w-14 h-14 mx-auto mb-2 bg-white bg-opacity-25 rounded-full flex items-center justify-center backdrop-blur-sm">
                        {React.createElement(getIconComponent(article.icon), { className: "w-7 h-7" })}
                      </div>
                      <p className="text-xs font-medium opacity-90">Story {index + 2}</p>
                    </div>
                  </div>
                  
                  {/* Mini Category Badge */}
                  <div className="absolute top-2 left-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border backdrop-blur-sm bg-white bg-opacity-90 ${getCategoryColor(article.category)}`}>
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-4">
                  {/* Article Title */}
                  <h4 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors line-clamp-2">
                    {article.title}
                  </h4>

                  {/* Article Excerpt */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">
                    {article.excerpt}
                  </p>

                  {/* Article Meta */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-3">
                      <span>{article.author}</span>
                      <span>•</span>
                      <span>{formatDate(article.date)}</span>
                    </div>
                    <button className={`${currentTheme.accent} hover:underline font-medium transition-colors`}>
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* View All Stories Button */}
            <div className="pt-4">
              <button className={`w-full inline-flex items-center justify-center space-x-2 px-6 py-3 ${currentTheme.primary} text-white rounded-lg hover:opacity-90 transition-opacity font-medium shadow-md`}>
                <span>View All Stories</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* View All News Button */}
        <div className="text-center mt-12">
          <button className={`inline-flex items-center space-x-2 px-8 py-3 ${currentTheme.primary} text-white rounded-lg hover:opacity-90 transition-opacity font-medium shadow-lg`}>
            <span>View All News</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Cultural Insights Statistics */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-[#A0522D] mb-4">Cultural Insights</h3>
            <p className="text-lg text-[#8B4513] max-w-2xl mx-auto">
              Connecting communities through shared stories and cultural understanding
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className={`group text-center p-8 rounded-2xl ${currentTheme.secondary} border-2 ${currentTheme.border} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#A0522D] to-[#8B4513] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Newspaper className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-2xl font-bold mb-3 ${currentTheme.accent}`}>Latest Stories</h3>
              <p className="text-gray-600 text-lg">{newsArticles.length} cultural articles</p>
              <p className="text-sm text-gray-500 mt-2">Updated weekly</p>
            </div>
            
            <div className={`group text-center p-8 rounded-2xl ${currentTheme.secondary} border-2 ${currentTheme.border} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-2xl font-bold mb-3 ${currentTheme.accent}`}>Community Voices</h3>
              <p className="text-gray-600 text-lg">Local storytellers & historians</p>
              <p className="text-sm text-gray-500 mt-2">Preserving heritage</p>
            </div>
            
            <div className={`group text-center p-8 rounded-2xl ${currentTheme.secondary} border-2 ${currentTheme.border} hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-2xl font-bold mb-3 ${currentTheme.accent}`}>Cultural Topics</h3>
              <p className="text-gray-600 text-lg">Heritage, Arts, Traditions & More</p>
              <p className="text-sm text-gray-500 mt-2">Diverse perspectives</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;