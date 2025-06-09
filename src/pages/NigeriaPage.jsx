import React from 'react';
import CountryTemplate from '../templates/CountryTemplate';
import CountryDetails from '../data/countryDetails';
import { Users, Zap, Film, Music } from 'lucide-react';

/**
 * Page spécifique pour le Nigeria utilisant le template
 * Montre comment personnaliser le template pour chaque pays
 */
export default function NigeriaPage() {
  // Données spécifiques au Nigeria
  const nigeriaData = CountryDetails.NG;
  
  // Sections personnalisées pour le Nigeria (focus sur l'économie et Nollywood)
  const sectionsToShow = [
    'hero',
    'overview'
  ];
  
  // Composants personnalisés spécifiques au Nigeria
  const customSections = [
    NigeriaEconomySection,
    NollywoodSection,
    NigeriaStatesSection
  ];
  
  // Configuration du thème Nigeria
  const theme = {
    primaryColor: '#008751', // Vert du drapeau
    secondaryColor: '#FFFFFF', // Blanc du drapeau
    accentColor: '#008751'
  };
  
  return (
    <CountryTemplate
      countryData={nigeriaData}
      sections={sectionsToShow}
      customSections={customSections}
      theme={theme}
    />
  );
}

// Section économie du Nigeria
function NigeriaEconomySection({ countryData, sectionIndex }) {
  const economicFacts = [
    {
      icon: Zap,
      title: "Plus Grande Économie",
      description: "Première économie d'Afrique avec un PIB de plus de 400 milliards USD",
      color: "green"
    },
    {
      icon: Users,
      title: "Population Active",
      description: "Plus de 100 millions de personnes en âge de travailler",
      color: "blue"
    },
    {
      icon: Zap,
      title: "Secteur Pétrolier",
      description: "Premier producteur de pétrole en Afrique",
      color: "yellow"
    },
    {
      icon: Users,
      title: "Fintech Leader",
      description: "Hub technologique avec des licornes comme Flutterwave",
      color: "purple"
    }
  ];
  
  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Géant Économique de l'Afrique</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-blue-600 mx-auto"></div>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
            Le Nigeria est la locomotive économique du continent africain, 
            avec une économie diversifiée et un potentiel de croissance exceptionnel.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {economicFacts.map((fact, index) => {
            const IconComponent = fact.icon;
            const colorClasses = {
              green: 'bg-green-100 text-green-600',
              blue: 'bg-blue-100 text-blue-600',
              yellow: 'bg-yellow-100 text-yellow-600',
              purple: 'bg-purple-100 text-purple-600'
            };
            
            return (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className={`w-16 h-16 ${colorClasses[fact.color]} rounded-full flex items-center justify-center mb-4 mx-auto`}>
                  <IconComponent className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-center mb-3">{fact.title}</h3>
                <p className="text-gray-600 text-center text-sm">{fact.description}</p>
              </div>
            );
          })}
        </div>
        
        <div className="mt-12 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Vision 2030</h3>
            <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto">
              Le Nigeria ambitionne de devenir l'une des 20 premières économies mondiales d'ici 2030, 
              en s'appuyant sur la diversification économique, l'innovation technologique et 
              le développement du capital humain.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Section Nollywood
function NollywoodSection({ countryData, sectionIndex }) {
  const nollywoodFacts = [
    "2ème industrie cinématographique mondiale en volume",
    "Plus de 2000 films produits par an",
    "Emploie plus de 1 million de personnes",
    "Rayonnement dans toute l'Afrique et la diaspora"
  ];
  
  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Nollywood - Hollywood Africain</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto"></div>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
            L'industrie cinématographique nigériane, Nollywood, est devenue un phénomène culturel 
            qui influence toute l'Afrique et au-delà.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <Film className="w-16 h-16 text-purple-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-center mb-6">Impact de Nollywood</h3>
              <ul className="space-y-4">
                {nollywoodFacts.map((fact, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <Music className="w-12 h-12 text-green-600 mb-4" />
              <h4 className="text-xl font-bold mb-3">Afrobeats</h4>
              <p className="text-gray-600">
                Le Nigeria est aussi le berceau des Afrobeats, avec des artistes comme 
                Burna Boy, Wizkid et Davido qui conquièrent les charts internationaux.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <h4 className="text-xl font-bold mb-3">Soft Power</h4>
              <p className="text-gray-600">
                À travers Nollywood et la musique, le Nigeria exporte sa culture 
                et renforce son influence culturelle sur le continent et dans le monde.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Section États du Nigeria
function NigeriaStatesSection({ countryData, sectionIndex }) {
  const majorStates = [
    { name: "Lagos", description: "Centre économique", population: "15M+" },
    { name: "Kano", description: "Hub commercial du Nord", population: "4M+" },
    { name: "Abuja (FCT)", description: "Capitale fédérale", population: "3M+" },
    { name: "Rivers", description: "Centre pétrolier", population: "7M+" },
    { name: "Oyo", description: "Patrimoine historique", population: "7M+" },
    { name: "Kaduna", description: "Centre industriel", population: "8M+" }
  ];
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">36 États + FCT</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-white mx-auto"></div>
          <p className="text-lg text-gray-600 mt-4">
            Le Nigeria est organisé en 36 États plus le Territoire de la Capitale Fédérale (FCT).
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {majorStates.map((state, index) => (
            <div key={state.name} className="bg-gradient-to-br from-green-50 to-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">{state.name}</h3>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {state.population}
                </span>
              </div>
              <p className="text-gray-600">{state.description}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-green-100 to-white rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Fédéralisme Nigérian</h3>
          <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto">
            Le système fédéral du Nigeria permet à chaque État de développer ses propres 
            politiques tout en maintenant l'unité nationale. Cette diversité administrative 
            reflète la richesse culturelle et géographique du pays.
          </p>
        </div>
      </div>
    </section>
  );
}