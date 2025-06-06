import { Globe, MapPin, Users } from 'lucide-react';

export default function CameroonHero() {
  return (
    <div className="relative min-h-[70vh] bg-gradient-to-b from-green-700 via-red-600 to-yellow-500 overflow-hidden">
      {/* Overlay pattern */}
      <div className="absolute inset-0 bg-[url('/african-pattern.svg')] opacity-10"></div>
      
      {/* Content container */}
      <div className="relative container mx-auto px-4 py-16 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Text content */}
        <div className="flex-1 text-white text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
            <MapPin className="text-yellow-400" />
            <span className="text-lg">Afrique Centrale</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Cameroun
            <span className="block text-2xl md:text-3xl text-yellow-400 mt-2">
              L'Afrique en Miniature
            </span>
          </h1>
          
          <p className="text-lg md:text-xl mb-8 text-gray-100">
            Découvrez un pays aux mille facettes, où traditions ancestrales et modernité
            se mêlent dans une symphonie culturelle unique.
          </p>
          
          {/* Quick facts */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <Globe className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-sm">Yaoundé<br/>Capitale</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <Users className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-sm">+250 Ethnies<br/>Diversité</p>
            </div>
            <div className="hidden md:block bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <Globe className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-sm">Français & Anglais<br/>Langues officielles</p>
            </div>
          </div>
          
          <button className="bg-yellow-400 text-green-900 px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-colors duration-300">
            Explorer le Cameroun
          </button>
        </div>
        
        {/* Image/Map section */}
        <div className="flex-1 relative">
          <div className="aspect-square max-w-[500px] mx-auto bg-white/10 rounded-full p-8 backdrop-blur-sm">
            <img 
              src="/cameroon-map.svg" 
              alt="Carte du Cameroun"
              className="w-full h-full object-contain"
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