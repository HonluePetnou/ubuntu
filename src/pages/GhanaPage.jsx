import React from 'react';
import CountryTemplate from '../templates/CountryTemplate';
import CountryDetails from '../data/countryDetails';
import { Crown, Zap, Leaf, Users, Star, Heart, Globe } from 'lucide-react';

/**
 * Page spécifique pour le Ghana utilisant le template
 * Met l'accent sur l'histoire, la démocratie et l'or
 */
export default function GhanaPage() {
  // Données spécifiques au Ghana
  const ghanaData = CountryDetails.GH;
  
  // Sections à afficher pour le Ghana
  const sectionsToShow = [
    'hero',
    'overview'
  ];
  
  // Composants personnalisés spécifiques au Ghana
  const customSections = [
    GhanaHeritageSection,
    GhanaDemocracySection,
    GhanaRegionsSection
  ];
  
  // Configuration du thème Ghana (couleurs du drapeau)
  const theme = {
    primaryColor: '#FFD700', // Or/Jaune du drapeau
    secondaryColor: '#DC143C', // Rouge du drapeau
    accentColor: '#006B3C' // Vert du drapeau
  };
  
  return (
    <CountryTemplate
      countryData={ghanaData}
      sections={sectionsToShow}
      customSections={customSections}
      theme={theme}
    />
  );
}

// Section patrimoine et histoire du Ghana
function GhanaHeritageSection({ countryData, sectionIndex }) {
  const heritageHighlights = [
    {
      icon: Crown,
      title: "Empire Ashanti",
      description: "Riche héritage royal avec le Trône d'Or, symbole de l'unité nationale",
      color: "yellow"
    },
    {
      icon: Star,
      title: "Première Indépendance",
      description: "Premier pays d'Afrique subsaharienne à obtenir l'indépendance en 1957",
      color: "red"
    },
    {
      icon: Zap,
      title: "Côte de l'Or",
      description: "Historiquement connue pour ses mines d'or, toujours importantes aujourd'hui",
      color: "yellow"
    },
    {
      icon: Heart,
      title: "Hospitalité Ghanéenne",
      description: "Culture d'accueil légendaire - 'Akwaaba' (Bienvenue)",
      color: "green"
    }
  ];
  
  return (
    <section className="py-16 bg-gradient-to-br from-yellow-50 to-red-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Patrimoine et Histoire</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-red-500 mx-auto"></div>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
            Le Ghana, berceau de civilisations anciennes et pionnier de l'indépendance africaine, 
            possède un patrimoine culturel et historique exceptionnel.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {heritageHighlights.map((highlight, index) => {
            const IconComponent = highlight.icon;
            const colorClasses = {
              yellow: 'bg-yellow-100 text-yellow-600',
              red: 'bg-red-100 text-red-600',
              green: 'bg-green-100 text-green-600'
            };
            
            return (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className={`w-16 h-16 ${colorClasses[highlight.color]} rounded-full flex items-center justify-center mb-4 mx-auto`}>
                  <IconComponent className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-center mb-3">{highlight.title}</h3>
                <p className="text-gray-600 text-center text-sm">{highlight.description}</p>
              </div>
            );
          })}
        </div>
        
        <div className="mt-12 bg-gradient-to-r from-yellow-100 via-red-100 to-green-100 rounded-xl p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Kwame Nkrumah</h3>
            <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto">
              Premier président du Ghana et figure emblématique du panafricanisme, 
              Kwame Nkrumah a inspiré tout un continent dans sa lutte pour l'indépendance 
              et l'unité africaine. Sa vision continue d'influencer l'Afrique moderne.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Section démocratie ghanéenne
function GhanaDemocracySection({ countryData, sectionIndex }) {
  const democraticAchievements = [
    "8 élections présidentielles pacifiques depuis 1992",
    "Alternance politique respectée entre NPP et NDC",
    "Presse libre et société civile active",
    "Modèle de stabilité démocratique en Afrique de l'Ouest"
  ];
  
  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Démocratie Exemplaire</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-blue-600 mx-auto"></div>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
            Le Ghana est reconnu comme l'une des démocraties les plus stables d'Afrique, 
            avec des institutions solides et une culture démocratique bien ancrée.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <Globe className="w-16 h-16 text-green-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-center mb-6">Réalisations Démocratiques</h3>
              <ul className="space-y-4">
                {democraticAchievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span className="text-gray-700">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <Users className="w-12 h-12 text-yellow-600 mb-4" />
              <h4 className="text-xl font-bold mb-3">Participation Citoyenne</h4>
              <p className="text-gray-600">
                Taux de participation électorale élevé et engagement citoyen fort, 
                témoignant de la maturité démocratique du pays.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <Star className="w-12 h-12 text-red-600 mb-4" />
              <h4 className="text-xl font-bold mb-3">Reconnaissance Internationale</h4>
              <p className="text-gray-600">
                Le Ghana est souvent cité en exemple par les organisations internationales 
                pour sa gouvernance démocratique et ses institutions transparentes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Section régions du Ghana
function GhanaRegionsSection({ countryData, sectionIndex }) {
  const regions = [
    { name: "Greater Accra", description: "Région capitale", specialty: "Commerce & Administration" },
    { name: "Ashanti", description: "Région de l'or", specialty: "Mines & Culture Royale" },
    { name: "Western", description: "Côte atlantique", specialty: "Pétrole & Cacao" },
    { name: "Northern", description: "Savane", specialty: "Agriculture & Élevage" },
    { name: "Eastern", description: "Montagnes", specialty: "Cacao & Tourisme" },
    { name: "Central", description: "Côte historique", specialty: "Pêche & Patrimoine" }
  ];
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">16 Régions Diverses</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-green-600 mx-auto"></div>
          <p className="text-lg text-gray-600 mt-4">
            Le Ghana est divisé en 16 régions, chacune avec ses spécificités géographiques et culturelles.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {regions.map((region, index) => (
            <div key={region.name} className="bg-gradient-to-br from-yellow-50 to-green-50 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">{region.name}</h3>
                <Leaf className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-gray-600 mb-2">{region.description}</p>
              <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium inline-block">
                {region.specialty}
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-yellow-100 via-red-100 to-green-100 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Unité dans la Diversité</h3>
          <p className="text-gray-700 leading-relaxed max-w-4xl mx-auto">
            Malgré la diversité ethnique et linguistique (plus de 80 langues), 
            le Ghana maintient une unité nationale remarquable, symbolisée par 
            la devise "Unity, Work, Progress" et l'usage de l'anglais comme langue officielle.
          </p>
        </div>
      </div>
    </section>
  );
}