import React from 'react';
import { Star } from 'lucide-react';

/**
 * Cultural Identity Section Component
 * Displays cultural information about a country with key facts sidebar
 */
export default function CulturalIdentitySection({ countryData, theme = 'blue' }) {
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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div className="text-center lg:text-left">
              <h2 className={`text-4xl md:text-5xl font-bold ${currentTheme.accent} mb-4`}>
                Cultural Identity
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0">
                Discover the rich tapestry of {name} heritage spanning {languages.length > 0 ? `over ${languages.length}` : 'numerous'} ethnic groups
              </p>
            </div>

            {/* Cultural Description */}
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed text-justify">
                {generateCulturalDescription()}
              </p>
            </div>

            {/* More History Button */}
            <div className="pt-4">
              <button className={`${currentTheme.button} text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg`}>
                More history
              </button>
            </div>
          </div>

          {/* Did You Know Sidebar - Right Side */}
          <div className="lg:col-span-1">
            <div className={`${currentTheme.cardBg} rounded-3xl p-8 border-l-4 border-[#00D4AA] shadow-lg`}>
              <h3 className="text-2xl font-bold text-[#00D4AA] mb-6 text-center">
                Did You Know?
              </h3>
              
              <div className="space-y-4">
                {/* Language Diversity Fact */}
                {languageFact && (
                  <div className={`${currentTheme.cardBg} rounded-xl p-4 border ${currentTheme.border}`}>
                    <h4 className={`font-bold ${currentTheme.accent} mb-2`}>
                      Language Diversity:
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {languageFact}
                    </p>
                  </div>
                )}

                {/* Key Facts */}
                {keyFacts.slice(0, 3).map((fact, index) => (
                  <div key={index} className={`${currentTheme.cardBg} rounded-xl p-4 border ${currentTheme.border}`}>
                    <h4 className={`font-bold ${currentTheme.accent} mb-2`}>
                      {fact.includes('language') ? 'Language Diversity:' : 
                       fact.includes('economy') || fact.includes('populous') ? 'Economic Power:' :
                       fact.includes('Nollywood') || fact.includes('cinema') ? 'Cultural Influence:' :
                       fact.includes('independence') ? 'Historical Significance:' :
                       fact.includes('cocoa') || fact.includes('producer') ? 'Agricultural Heritage:' :
                       'Cultural Heritage:'}
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {fact}
                    </p>
                  </div>
                ))}

                {/* Additional facts if we have more than 3 */}
                {keyFacts.length > 3 && (
                  <div className="text-center pt-2">
                    <button className="text-[#00D4AA] text-sm font-medium hover:underline">
                      View more facts →
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}