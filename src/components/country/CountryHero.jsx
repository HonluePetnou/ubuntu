import { Globe, MapPin, Users, Calendar } from 'lucide-react';
import CountryDetails from '../../data/countryDetails';
import Button from '../ui/Button';
import Card from '../ui/Card';

export default function CountryHero({ countryCode = 'CM' }) {
  const country = CountryDetails[countryCode];
  
  if (!country) {
    return <div>Pays non trouvé</div>;
  }

  const gradientColors = country.flagColors ? 
    `from-[${country.flagColors[0]}] via-[${country.flagColors[1]}] to-[${country.flagColors[2] || country.flagColors[1]}]` :
    'from-green-700 via-red-600 to-yellow-500';

  return (
    <div className={`relative min-h-[70vh] bg-gradient-to-b ${gradientColors} overflow-hidden`}>
      {/* Overlay pattern */}
      <div className="absolute inset-0 bg-[url('/african-pattern.svg')] opacity-10"></div>
      
      {/* Content container */}
      <div className="relative container mx-auto px-4 py-16 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Text content */}
        <div className="flex-1 text-white text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
            <MapPin className="text-yellow-400" />
            <span className="text-lg">Africa</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            {country.name}
            <span className="block text-2xl md:text-3xl text-yellow-400 mt-2">
              {country.nickname}
            </span>
          </h1>
          
          <p className="text-lg md:text-xl mb-8 text-gray-100">
            Découvrez {country.name}, un pays aux mille facettes, où traditions ancestrales et modernité
            se mêlent dans une symphonie culturelle unique.
          </p>
          
          {/* Quick facts */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            <Card variant="glass" className="text-center">
              <Globe className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-sm">{country.capital}<br/>Capitale</p>
            </Card>
            <Card variant="glass" className="text-center">
              <Users className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-sm">{country.population}<br/>Population</p>
            </Card>
            <Card variant="glass" className="hidden md:block text-center">
              <Calendar className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-sm">{country.independence}<br/>Indépendance</p>
            </Card>
          </div>
          
          <Button size="lg">
              Explore {country.name}
            </Button>
        </div>
        
        {/* Image/Map section */}
        <div className="flex-1 relative">
          <div className="aspect-square max-w-[500px] mx-auto bg-white/10 rounded-full p-8 backdrop-blur-sm">
            <img 
              src={`/${countryCode.toLowerCase()}-map.svg`} 
              alt={`Carte du ${country.name}`}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.src = '/african-pattern.svg';
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" fill="#FAF3E0"/>
        </svg>
      </div>
    </div>
  );
}