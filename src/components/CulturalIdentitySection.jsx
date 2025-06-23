import React from 'react';
import { Star, Globe, Users, Heart, Sparkles } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

/**
 * Cultural Identity Section Component
 * Displays cultural information about a country with key facts sidebar
 */
export default function CulturalIdentitySection({ countryData, theme = 'blue' }) {
  const { countryCode } = useParams();
  const {
    name,
    nickname,
    population,
    languages = [],
    keyFacts = [],
    culture = {},
    arts = {},
    gastronomy = {}
  } = countryData || {};

  // Theme configurations matching global styles
  const themes = {
    blue: {
      accent: 'text-[#A0522D]',
      cardBg: 'bg-[#FAF3E0]',
      border: 'border-[#A0522D]/20',
      button: 'bg-[#A0522D] hover:bg-[#8B4513]'
    },
    green: {
      accent: 'text-[#A0522D]',
      cardBg: 'bg-[#FAF3E0]',
      border: 'border-[#A0522D]/20',
      button: 'bg-[#A0522D] hover:bg-[#8B4513]'
    },
    orange: {
      accent: 'text-[#A0522D]',
      cardBg: 'bg-[#FAF3E0]',
      border: 'border-[#A0522D]/20',
      button: 'bg-[#A0522D] hover:bg-[#8B4513]'
    }
  };

  const currentTheme = themes[theme] || themes.blue;

  // Generate cultural description based on available data
  const generateCulturalDescription = () => {
    const languageCount = languages.length;
    const hasMusic = culture.music && culture.music.length > 0;
    const hasCrafts = arts.crafts && arts.crafts.length > 0;
    const hasDishes = gastronomy.mainDishes && gastronomy.mainDishes.length > 0;

    let description = `${name} stands as Africa's most ${nickname ? nickname.toLowerCase().includes('giant') ? 'populous nation and cultural powerhouse' : 'culturally diverse nation' : 'vibrant cultural destination'}, home to ${population ? `over ${population.split(' ')[0]} million people` : 'millions of people'} and ${languageCount > 0 ? `${languageCount > 100 ? 'over ' + languageCount : languageCount} distinct` : 'numerous'} ethnic groups, each contributing to a vibrant national identity.`;

    if (languageCount > 0) {
      description += ` From the ${languages[0] || 'diverse'} ${languages.length > 1 ? `communities of the ${languages[1] ? languages[1].toLowerCase() : 'south'} to the ${languages[2] || languages[1] || 'northern'} ${languages.length > 2 ? 'emirates of the north' : 'regions'}` : 'speaking regions'}, and the ${languages[languages.length - 1] || 'local'} communities of the ${languages.length > 2 ? 'southeast' : 'interior'}, ${name}'s diversity is unparalleled.`;
    }

    description += ` This cultural richness manifests in countless ways - through the ${hasMusic ? `pulsating rhythms of ${culture.music[0] || 'traditional music'}` : 'vibrant musical traditions'} that ${name === 'Nigeria' ? 'captivated the world, the colourful narratives of Nollywood cinema' : 'have influenced global trends'}, ${hasCrafts ? `and the intricate patterns of ${arts.crafts[0] || 'traditional crafts'}` : 'and traditional artistic expressions'}.`;

    description += ` ${name} culture seamlessly blends ancient traditions with contemporary innovation, creating a dynamic society that influences global trends while honoring ancestral wisdom.`;

    return description;
  };

  // Generate language diversity fact
  const generateLanguageFact = () => {
    const count = languages.length;
    if (count === 0) return null;
    
    let factText;
    if (count > 100) {
      factText = `Over ${count} languages are spoken across ${name}, making it one of the world's most linguistically diverse countries.`;
    } else {
      factText = `${count} major languages are spoken across ${name}, reflecting its incredible cultural diversity.`;
    }
    
    return factText;
  };

  const languageFact = generateLanguageFact();

  return (
    <section className="py-20 bg-gradient-to-br from-[#FAF3E0] via-white to-[#F5E6D3] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#A0522D] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#D2691E] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-[#CD853F] rounded-full blur-2xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-3 gap-16">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-10">
            {/* Header */}
            <div className="text-center lg:text-left relative">
              <div className="flex items-center justify-center lg:justify-start mb-4">
                <Globe className="w-8 h-8 text-[#A0522D] mr-3" />
                <span className="text-sm font-semibold text-[#A0522D] uppercase tracking-wider">Heritage & Tradition</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#A0522D] to-[#D2691E] bg-clip-text text-transparent mb-6 leading-tight">
                Cultural Identity
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Discover the rich tapestry of <span className="font-semibold text-[#A0522D]">{name}</span> heritage spanning {languages.length > 0 ? `over ${languages.length}` : 'numerous'} ethnic groups
              </p>
              <div className="mt-6 flex items-center justify-center lg:justify-start space-x-4">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-[#A0522D]" />
                  <span className="text-sm text-gray-600">{population || 'Millions'} People</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-[#A0522D]" />
                  <span className="text-sm text-gray-600">{languages.length || 'Many'} Languages</span>
                </div>
              </div>
            </div>

            {/* Cultural Description */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-[#A0522D]/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#A0522D]/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <Sparkles className="w-6 h-6 text-[#A0522D] mr-3" />
                  <h3 className="text-2xl font-bold text-[#A0522D]">Our Story</h3>
                </div>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed text-justify text-lg">
                    {generateCulturalDescription()}
                  </p>
                </div>
              </div>
            </div>

            {/* More History Button */}
            <div className="pt-6">
              <Link 
                to={`/country/${countryCode ? countryCode.toLowerCase() : 'cameroon'}/history`}
                className="group relative bg-gradient-to-r from-[#A0522D] to-[#D2691E] text-white px-10 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl overflow-hidden inline-flex items-center"
              >
                <span className="relative z-10 flex items-center">
                  Explore More History
                  <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </Link>
            </div>
          </div>

          {/* Did You Know Sidebar - Right Side */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-[#A0522D]/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#A0522D] via-[#D2691E] to-[#CD853F]"></div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-[#A0522D]/10 to-transparent rounded-full"></div>
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#A0522D] to-[#D2691E] rounded-full mb-4 shadow-lg">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-[#A0522D] to-[#D2691E] bg-clip-text text-transparent">
                    Did You Know?
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">Fascinating facts about {name}</p>
                </div>
              
                <div className="space-y-5">
                  {/* Language Diversity Fact */}
                  {languageFact && (
                    <div className="group bg-gradient-to-br from-[#FAF3E0] to-white rounded-2xl p-5 border border-[#A0522D]/20 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#A0522D]/5 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
                      <div className="relative z-10">
                        <div className="flex items-center mb-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-[#A0522D] to-[#D2691E] rounded-full flex items-center justify-center mr-3">
                            <Globe className="w-4 h-4 text-white" />
                          </div>
                          <h4 className="font-bold text-[#A0522D] text-lg">
                            Language Diversity
                          </h4>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed pl-11">
                          {languageFact}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Key Facts */}
                  {keyFacts.slice(0, 3).map((fact, index) => {
                    const getFactIcon = (fact) => {
                      if (fact.includes('economy') || fact.includes('populous')) return Users;
                      if (fact.includes('Nollywood') || fact.includes('cinema')) return Star;
                      if (fact.includes('independence')) return Heart;
                      if (fact.includes('cocoa') || fact.includes('producer')) return Globe;
                      return Sparkles;
                    };
                    
                    const IconComponent = getFactIcon(fact);
                    
                    return (
                      <div key={index} className="group bg-gradient-to-br from-[#FAF3E0] to-white rounded-2xl p-5 border border-[#A0522D]/20 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#A0522D]/5 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
                        <div className="relative z-10">
                          <div className="flex items-center mb-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-[#A0522D] to-[#D2691E] rounded-full flex items-center justify-center mr-3">
                              <IconComponent className="w-4 h-4 text-white" />
                            </div>
                            <h4 className="font-bold text-[#A0522D] text-lg">
                              {fact.includes('language') ? 'Language Diversity' : 
                               fact.includes('economy') || fact.includes('populous') ? 'Economic Power' :
                               fact.includes('Nollywood') || fact.includes('cinema') ? 'Cultural Influence' :
                               fact.includes('independence') ? 'Historical Significance' :
                               fact.includes('cocoa') || fact.includes('producer') ? 'Agricultural Heritage' :
                               'Cultural Heritage'}
                            </h4>
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed pl-11">
                            {fact}
                          </p>
                        </div>
                      </div>
                    );
                  })}

                  {/* Additional facts if we have more than 3 */}
                  {keyFacts.length > 3 && (
                    <div className="text-center pt-4">
                      <button className="group inline-flex items-center text-[#A0522D] text-sm font-semibold hover:text-[#D2691E] transition-colors duration-300">
                        View more facts
                        <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}