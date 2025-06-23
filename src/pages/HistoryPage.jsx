import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, Users, Crown, Scroll, Star, Calendar } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CountryDetails from '../data/countryDetails';

/**
 * Detailed History Page Component
 * Comprehensive historical information about a country
 */
export default function HistoryPage() {
  const { countryCode } = useParams();
  const countryPath = countryCode ? countryCode.toLowerCase() : 'cameroon';
  const countryData = CountryDetails[countryCode ? countryCode.toUpperCase() : 'CAMEROON'];

  const {
    name,
    fullName,
    independence,
    keyFacts = [],
    history = {},
    culture = {}
  } = countryData || {};

  // Generate comprehensive historical timeline
  const generateHistoricalTimeline = () => {
    const timeline = [
      {
        period: "Ancient Era",
        timeframe: "Before 1000 CE",
        icon: Scroll,
        description: `The ancient history of ${name} is rich with diverse civilizations and kingdoms that flourished across the region. Archaeological evidence suggests human habitation dating back thousands of years, with sophisticated societies developing complex trade networks, agricultural systems, and cultural practices.`,
        highlights: [
          "Early human settlements and agricultural development",
          "Formation of ancient kingdoms and chiefdoms",
          "Development of traditional crafts and metallurgy",
          "Establishment of trade routes across the region"
        ]
      },
      {
        period: "Medieval Kingdoms",
        timeframe: "1000 - 1500 CE",
        icon: Crown,
        description: `During the medieval period, ${name} witnessed the rise of powerful kingdoms and empires that shaped the political and cultural landscape. These kingdoms established sophisticated governance systems, promoted arts and learning, and facilitated extensive trade networks.`,
        highlights: [
          "Rise of major kingdoms and empires",
          "Development of complex political systems",
          "Flourishing of arts, crafts, and architecture",
          "Expansion of trade and cultural exchange"
        ]
      },
      {
        period: "Colonial Period",
        timeframe: "1500 - 1960",
        icon: MapPin,
        description: `The colonial era brought significant changes to ${name}, with European powers establishing control over the region. This period saw the introduction of new administrative systems, religions, and economic structures, while traditional societies adapted and resisted colonial rule.`,
        highlights: [
          "European exploration and colonization",
          "Introduction of Christianity and Western education",
          "Development of colonial administrative systems",
          "Emergence of nationalist movements"
        ]
      },
      {
        period: "Independence Era",
        timeframe: `${independence || '1960'} - Present`,
        icon: Star,
        description: `${name} gained independence in ${independence || '1960'}, marking the beginning of a new chapter in its history. The post-independence era has been characterized by nation-building efforts, political development, economic growth, and the preservation of cultural heritage while embracing modernity.`,
        highlights: [
          `Independence achieved in ${independence || '1960'}\`,
          "Formation of modern governmental institutions",
          "Economic development and modernization",
          "Cultural renaissance and preservation efforts"
        ]
      }
    ];

    return timeline;
  };

  // Generate historical figures section
  const generateHistoricalFigures = () => {
    return [
      {
        name: "Ancient Rulers",
        description: "Legendary kings and queens who established the foundations of civilization in the region.",
        contribution: "Political organization and cultural development"
      },
      {
        name: "Independence Leaders",
        description: "Visionary leaders who fought for and achieved independence from colonial rule.",
        contribution: "National liberation and political freedom"
      },
      {
        name: "Cultural Icons",
        description: "Artists, writers, and intellectuals who preserved and promoted cultural heritage.",
        contribution: "Cultural preservation and artistic expression"
      },
      {
        name: "Modern Pioneers",
        description: "Contemporary leaders who have shaped the nation's development and international standing.",
        contribution: "Modernization and global engagement"
      }
    ];
  };

  const timeline = generateHistoricalTimeline();
  const historicalFigures = generateHistoricalFigures();

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
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link 
              to={`/country/${countryPath}`}
              className="inline-flex items-center text-[#A0522D] hover:text-[#D2691E] transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to {name} Overview
            </Link>
          </div>

          {/* Page Header */}
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Clock className="w-8 h-8 text-[#A0522D] mr-3" />
              <span className="text-sm font-semibold text-[#A0522D] uppercase tracking-wider">Historical Journey</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#A0522D] to-[#D2691E] bg-clip-text text-transparent mb-6 leading-tight">
              History & Origins
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Explore the rich historical tapestry of <span className="font-semibold text-[#A0522D]">{name}</span>, 
              from ancient civilizations to modern nationhood
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-[#A0522D]" />
                <span>Independence: {independence || '1960'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-[#A0522D]" />
                <span>Millennia of Heritage</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Historical Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#A0522D] mb-4">Historical Timeline</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Journey through the major periods that shaped {name} into the nation it is today
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#A0522D] to-[#D2691E] rounded-full"></div>
            
            {timeline.map((period, index) => {
              const IconComponent = period.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div key={index} className={`relative flex items-center mb-16 ${isEven ? 'justify-start' : 'justify-end'}`}>
                  {/* Timeline Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-white rounded-full border-4 border-[#A0522D] flex items-center justify-center z-10 shadow-lg">
                    <IconComponent className="w-8 h-8 text-[#A0522D]" />
                  </div>
                  
                  {/* Content Card */}
                  <div className={`w-5/12 ${isEven ? 'mr-auto pr-16' : 'ml-auto pl-16'}`}>
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-[#A0522D]/20 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#A0522D]/5 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                      <div className="relative z-10">
                        <div className="mb-4">
                          <h3 className="text-2xl font-bold text-[#A0522D] mb-2">{period.period}</h3>
                          <span className="text-sm font-semibold text-[#D2691E] bg-[#FAF3E0] px-3 py-1 rounded-full">
                            {period.timeframe}
                          </span>
                        </div>
                        <p className="text-gray-700 leading-relaxed mb-6">
                          {period.description}
                        </p>
                        <div className="space-y-2">
                          <h4 className="font-semibold text-[#A0522D] mb-3">Key Highlights:</h4>
                          {period.highlights.map((highlight, idx) => (
                            <div key={idx} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-[#A0522D] rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-sm text-gray-600">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Historical Figures */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#A0522D] mb-4">Historical Figures</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Celebrating the remarkable individuals who shaped {name}'s destiny
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {historicalFigures.map((figure, index) => (
              <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#A0522D]/20 hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#A0522D]/5 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#A0522D] to-[#D2691E] rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#A0522D] mb-3 text-center">{figure.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{figure.description}</p>
                  <div className="border-t border-[#A0522D]/20 pt-3">
                    <span className="text-xs font-semibold text-[#D2691E] uppercase tracking-wider">
                      {figure.contribution}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Historical Facts */}
      {keyFacts.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#A0522D] mb-4">Historical Facts</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Fascinating historical insights about {name}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {keyFacts.map((fact, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-[#A0522D]/20 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#A0522D]/5 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
                  <div className="relative z-10">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#A0522D] to-[#D2691E] rounded-full flex items-center justify-center mr-3">
                        <Star className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-bold text-[#A0522D]">Historical Fact</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{fact}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-[#A0522D] to-[#D2691E] text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Explore More of {name}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover the vibrant culture, stunning landscapes, and warm hospitality that make {name} unique
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to={`/country/${countryCode ? countryCode.toLowerCase() : 'cameroon'}`}
              className="bg-white text-[#A0522D] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              Back to Overview
            </Link>
            <Link 
              to={`/country/${countryCode ? countryCode.toLowerCase() : 'cameroon'}/culture`}
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-[#A0522D] transition-all duration-300"
            >
              Explore Culture
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}