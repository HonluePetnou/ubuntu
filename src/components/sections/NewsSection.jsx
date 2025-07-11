import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowRight, Clock, Tag, Globe, Heart, Star, Newspaper } from 'lucide-react';

const NewsSection = ({ countryData, theme = 'blue', themeOverrides = {} }) => {
  const navigate = useNavigate();

  const handleViewAllNews = () => {
    const countryCode = countryData?.countryCode;
    if (countryCode) {
      navigate(`/country/${countryCode.toLowerCase()}/news`);
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

  const currentTheme = {
    ...themes[theme],
    ...themeOverrides
  };

  // Helper function to get shared news image
  const getNewsImage = (articleId) => {
    const imageIndex = ((articleId - 1) % 4) + 1;
    return `/images/news/news${imageIndex}.jpg`;
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
        image: getNewsImage(1),
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
        image: getNewsImage(2),
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
        image: getNewsImage(3),
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
        image: getNewsImage(4),
        featured: false,
        icon: 'Newspaper'
      },
      {
        id: 5,
        title: `Contemporary African Art: Bridging Past and Present`,
        excerpt: `Exploring how modern African artists are reinterpreting traditional themes and techniques in contemporary works.`,
        author: 'Kwame Asante',
        date: '2024-01-05',
        category: 'Arts',
        readTime: '4 min read',
        image: getNewsImage(1),
        featured: false,
        icon: 'Star'
      },
      {
        id: 6,
        title: `Sacred Rituals and Modern Life: Finding Balance`,
        excerpt: `How urban communities are adapting ancient spiritual practices to fit contemporary lifestyles while maintaining their essence.`,
        author: 'Fatima Al-Zahra',
        date: '2024-01-03',
        category: 'Spirituality',
        readTime: '5 min read',
        image: getNewsImage(2),
        featured: false,
        icon: 'Heart'
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
      Spirituality: 'bg-indigo-100 text-indigo-800 border-indigo-200',
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
        <div className="flex items-center justify-between mb-16">
          <div>
            <h2 className="text-5xl font-bold text-gray-900 mb-2">
              Latest Stories
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#A0522D] to-[#8B4513] rounded-full"></div>
          </div>
          <button className="group text-gray-600 hover:text-[#A0522D] transition-all duration-300 border border-gray-300 hover:border-[#A0522D] rounded-xl px-6 py-3 text-sm font-medium hover:shadow-lg transform hover:-translate-y-0.5">
            <span className="flex items-center space-x-2">
              <span>Read more articles</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>

        {/* News Layout - Enhanced aesthetic design */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Main Featured Article */}
          <div>
            {newsArticles.slice(0, 1).map((article) => (
              <div key={article.id} className="group cursor-pointer">
                {/* Large Article Image */}
                <div className="relative overflow-hidden h-96 rounded-2xl mb-8 shadow-lg group-hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2">
                  <img 
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/api/placeholder/400/250';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  {/* Article overlay content */}
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm text-white`}>
                        {article.category}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2 line-clamp-2">{article.title}</h3>
                    <p className="text-white/90 text-sm line-clamp-2">{article.excerpt}</p>
                  </div>
                  
                  {/* Featured badge */}
                  <div className="absolute top-6 right-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </span>
                  </div>
                </div>

                {/* Article Content */}
                <div className="space-y-4">
                  {/* Category */}
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(article.category)}`}>
                      {article.category}
                    </span>
                    <div className="w-2 h-2 bg-[#A0522D] rounded-full"></div>
                  </div>
                  
                  {/* Article Title */}
                  <h3 className="text-3xl font-bold text-gray-900 leading-tight group-hover:text-[#A0522D] transition-colors duration-300">
                    {article.title}
                  </h3>

                  {/* Article Meta */}
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(article.date)}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                  
                  {/* Article Excerpt */}
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {article.excerpt}
                  </p>
                  
                  {/* Read More Button */}
                  <div className="pt-4">
                    <button className="inline-flex items-center space-x-2 text-[#A0522D] hover:text-[#8B4513] font-semibold transition-colors group">
                      <span>Read Full Story</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar with smaller articles */}
          <div className="space-y-8">
            {newsArticles.slice(1, 4).map((article, index) => (
              <div key={article.id} className="group cursor-pointer bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 hover:border-[#A0522D]/20">
                <div className="flex space-x-5">
                  {/* Small Article Image */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-xl overflow-hidden shadow-lg">
                      <img 
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/api/placeholder/80/80';
                        }}
                      />
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="flex-1 min-w-0 space-y-2">
                    {/* Category */}
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                      {article.category}
                    </span>
                    
                    {/* Article Title */}
                    <h4 className="text-lg font-bold text-gray-900 group-hover:text-[#A0522D] transition-colors line-clamp-2 leading-tight">
                      {article.title}
                    </h4>

                    {/* Article Meta */}
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>{article.author}</span>
                      </div>
                      <span>•</span>
                      <span>{formatDate(article.date)}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                    
                    {/* Article Excerpt */}
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* View All Button */}
            <div className="pt-4">
              <button 
                onClick={handleViewAllNews}
                className="w-full bg-gradient-to-r from-[#A0522D] to-[#8B4513] text-white rounded-xl py-4 px-6 font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
              >
                <span>View All Stories</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
};

export default NewsSection;