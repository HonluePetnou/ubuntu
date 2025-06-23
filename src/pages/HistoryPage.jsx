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

  // Generate country-specific historical timeline
  const generateHistoricalTimeline = () => {
    const countryCode = (countryData?.name || 'CAMEROON').toUpperCase();
    
    const countryTimelines = {
      CAMEROON: [
        {
          period: "Ancient Kingdoms",
          timeframe: "Before 1000 CE",
          icon: Scroll,
          description: `Ancient Cameroon was home to diverse ethnic groups including the Sao civilization around Lake Chad, and the Tikar people who established powerful kingdoms. The region's strategic location made it a crossroads of African civilizations.`,
          highlights: [
            "Sao civilization around Lake Chad (6th century BCE)",
            "Tikar kingdoms and chiefdoms establishment",
            "Development of iron working and agriculture",
            "Trans-Saharan trade route connections"
          ]
        },
        {
          period: "Medieval Empires",
          timeframe: "1000 - 1500 CE",
          icon: Crown,
          description: `The medieval period saw the rise of the Kanem-Bornu Empire in the north and various Bantu kingdoms in the south. The Bamoun Kingdom emerged as a major power, developing its own writing system and sophisticated governance.`,
          highlights: [
            "Kanem-Bornu Empire expansion into northern regions",
            "Bamoun Kingdom establishment in western highlands",
            "Development of Bamoun script and architecture",
            "Islamic influence in northern regions"
          ]
        },
        {
          period: "Colonial Era",
          timeframe: "1884 - 1960",
          icon: MapPin,
          description: `German colonization began in 1884, followed by French and British mandates after WWI. This period saw the introduction of cash crops, infrastructure development, and the emergence of nationalist movements led by figures like Ruben Um Nyobé.`,
          highlights: [
            "German protectorate established (1884-1916)",
            "French and British League of Nations mandates",
            "Introduction of cocoa and coffee plantations",
            "Rise of independence movements (UPC formation)"
          ]
        },
        {
          period: "Independence & Modern Era",
          timeframe: "1960 - Present",
          icon: Star,
          description: `Cameroon gained independence in 1960 under Ahmadou Ahidjo, followed by reunification with British Southern Cameroons in 1961. Paul Biya has led the country since 1982, overseeing economic development and democratic transitions.`,
          highlights: [
            "Independence achieved on January 1, 1960",
            "Reunification with British Cameroons (1961)",
            "Ahmadou Ahidjo presidency (1960-1982)",
            "Paul Biya era and democratic reforms (1982-present)"
          ]
        }
      ],
      NIGERIA: [
        {
          period: "Ancient Civilizations",
          timeframe: "Before 1000 CE",
          icon: Scroll,
          description: `Nigeria is home to some of Africa's oldest civilizations, including the Nok culture (1000 BCE - 300 CE) known for terracotta sculptures, and early Igbo-Ukwu bronze works that demonstrate sophisticated metallurgy.`,
          highlights: [
            "Nok culture terracotta art (1000 BCE - 300 CE)",
            "Igbo-Ukwu bronze casting civilization (9th century)",
            "Early iron working and agriculture",
            "Development of complex societies"
          ]
        },
        {
          period: "Great Kingdoms",
          timeframe: "1000 - 1800 CE",
          icon: Crown,
          description: `The medieval period witnessed the rise of powerful kingdoms: the Benin Empire with its famous bronze plaques, the Oyo Empire of the Yoruba people, and the Sokoto Caliphate in the north, each contributing to Nigeria's rich cultural heritage.`,
          highlights: [
            "Benin Empire and bronze casting mastery",
            "Oyo Empire expansion and Yoruba culture",
            "Sokoto Caliphate and Islamic scholarship",
            "Trans-Saharan and Atlantic trade networks"
          ]
        },
        {
          period: "Colonial Period",
          timeframe: "1800 - 1960",
          icon: MapPin,
          description: `British colonial rule unified diverse ethnic groups into modern Nigeria. The period saw the amalgamation of Northern and Southern Nigeria in 1914, development of railways, and the emergence of nationalist leaders like Nnamdi Azikiwe and Obafemi Awolowo.`,
          highlights: [
            "British conquest and indirect rule system",
            "Amalgamation of North and South (1914)",
            "Development of railways and infrastructure",
            "Rise of nationalist movements and leaders"
          ]
        },
        {
          period: "Independence & Republic",
          timeframe: "1960 - Present",
          icon: Star,
          description: `Nigeria gained independence in 1960 and became a republic in 1963. Despite challenges including civil war (1967-1970), military coups, and regional tensions, Nigeria has emerged as Africa's largest economy and most populous nation.`,
          highlights: [
            "Independence achieved October 1, 1960",
            "Nigerian Civil War (1967-1970)",
            "Return to democracy (1999)",
            "Emergence as Africa's largest economy"
          ]
        }
      ],
      GHANA: [
        {
          period: "Ancient Gold Coast",
          timeframe: "Before 1000 CE",
          icon: Scroll,
          description: `Ancient Ghana region was inhabited by various ethnic groups who developed sophisticated societies. Archaeological evidence shows early iron working, agriculture, and the beginnings of gold mining that would later make the region famous.`,
          highlights: [
            "Early Akan settlements and gold mining",
            "Development of iron working technology",
            "Agricultural communities establishment",
            "Traditional religious and cultural practices"
          ]
        },
        {
          period: "Great Kingdoms",
          timeframe: "1000 - 1800 CE",
          icon: Crown,
          description: `The rise of powerful Akan kingdoms, particularly the Ashanti Empire, dominated this period. The Ashanti developed sophisticated political systems, military organization, and became wealthy through gold trade and craftsmanship.`,
          highlights: [
            "Ashanti Empire establishment and expansion",
            "Development of the Golden Stool tradition",
            "Sophisticated military and political systems",
            "Trans-Saharan and coastal trade networks"
          ]
        },
        {
          period: "Colonial Gold Coast",
          timeframe: "1800 - 1957",
          icon: MapPin,
          description: `British colonial rule transformed the Gold Coast through cocoa cultivation, education, and infrastructure. The period saw the rise of educated elites and nationalist movements led by figures like Kwame Nkrumah who would lead the independence struggle.`,
          highlights: [
            "British colonial administration establishment",
            "Introduction of cocoa farming",
            "Development of Western education",
            "Rise of independence movement under Nkrumah"
          ]
        },
        {
          period: "Independence Pioneer",
          timeframe: "1957 - Present",
          icon: Star,
          description: `Ghana became the first African country to gain independence in 1957 under Kwame Nkrumah. Despite political challenges and military coups, Ghana has emerged as a stable democracy and a leader in African development.`,
          highlights: [
            "First African independence (March 6, 1957)",
            "Kwame Nkrumah's Pan-African leadership",
            "Return to stable democracy (1992)",
            "Economic growth and democratic consolidation"
          ]
        }
      ]
    };

    // Return country-specific timeline or default to Cameroon
    return countryTimelines[countryCode] || countryTimelines.CAMEROON;
  };

  // Generate country-specific historical figures
  const generateHistoricalFigures = () => {
    const countryCode = (countryData?.name || 'CAMEROON').toUpperCase();
    
    const countryFigures = {
      CAMEROON: [
        {
          name: "Ahmadou Ahidjo",
          description: "First President of Cameroon who led the country to independence and reunification.",
          contribution: "Independence and national unity"
        },
        {
          name: "Ruben Um Nyobé",
          description: "Nationalist leader and founder of the UPC (Union of the Peoples of Cameroon).",
          contribution: "Independence movement leadership"
        },
        {
          name: "Sultan Njoya",
          description: "Bamoun King who created the Bamoun script and modernized his kingdom.",
          contribution: "Cultural innovation and literacy"
        },
        {
          name: "Mongo Beti",
          description: "Renowned writer and intellectual who chronicled colonial and post-colonial Africa.",
          contribution: "Literature and social criticism"
        }
      ],
      NIGERIA: [
        {
          name: "Nnamdi Azikiwe",
          description: "First President of Nigeria and leading figure in the independence movement.",
          contribution: "Pan-Africanism and independence"
        },
        {
          name: "Obafemi Awolowo",
          description: "Premier of Western Nigeria and advocate for free education and healthcare.",
          contribution: "Education and social development"
        },
        {
          name: "Queen Amina of Zaria",
          description: "16th-century warrior queen who expanded the Hausa kingdom of Zazzau.",
          contribution: "Military leadership and expansion"
        },
        {
          name: "Chinua Achebe",
          description: "World-renowned author of 'Things Fall Apart' and voice of African literature.",
          contribution: "Literature and cultural identity"
        }
      ],
      GHANA: [
        {
          name: "Kwame Nkrumah",
          description: "First President of Ghana and leading Pan-Africanist who achieved independence.",
          contribution: "Independence and Pan-Africanism"
        },
        {
          name: "Yaa Asantewaa",
          description: "Queen Mother of Ejisu who led the Ashanti resistance against British colonialism.",
          contribution: "Anti-colonial resistance"
        },
        {
          name: "J.B. Danquah",
          description: "Lawyer, politician, and scholar who played a key role in Ghana's independence.",
          contribution: "Legal scholarship and politics"
        },
        {
          name: "Kofi Annan",
          description: "Former UN Secretary-General and Nobel Peace Prize laureate from Ghana.",
          contribution: "International diplomacy and peace"
        }
      ]
    };

    // Return country-specific figures or default to Cameroon
    return countryFigures[countryCode] || countryFigures.CAMEROON;
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
              to={`/country/${countryPath}`}
              className="bg-white text-[#A0522D] px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              Back to Overview
            </Link>
            <Link 
              to={`/country/${countryPath}/culture`}
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