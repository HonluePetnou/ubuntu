import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Users, MapPin, Calendar, Leaf } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAF3E0] via-[#F5E6D3] to-[#E8D5B7] overflow-hidden">
      {/* Header */}
      <header className="relative z-10 px-6 py-4">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
             <div className="w-10 h-10 bg-gradient-to-r from-[#A0522D] to-[#D2691E] rounded-lg flex items-center justify-center">
               <Leaf className="w-6 h-6 text-white" />
             </div>
             <span className="text-2xl font-bold bg-gradient-to-r from-[#A0522D] to-[#D2691E] bg-clip-text text-transparent">
               Ubuntu Platform
             </span>
           </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-[#A0522D] transition-colors font-medium">
               Home
             </Link>
             <Link to="/destinations" className="text-gray-700 hover:text-[#A0522D] transition-colors font-medium">
               Destinations
             </Link>
             <Link to="/events" className="text-gray-700 hover:text-[#A0522D] transition-colors font-medium">
               Events
             </Link>
             <Link to="/arts" className="text-gray-700 hover:text-[#A0522D] transition-colors font-medium">
               Arts
             </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Hero Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                   <span className="bg-gradient-to-r from-[#A0522D] via-[#8B4513] to-[#D2691E] bg-clip-text text-transparent">
                     Discover
                   </span>
                   <br />
                   <span className="text-gray-800">African Culture</span>
                 </h1>
                 <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                   Explore the rich heritage, vibrant traditions, and diverse cultures 
                   of Africa through our interactive platform.
                 </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                   to="/map"
                   className="group px-8 py-4 bg-gradient-to-r from-[#A0522D] to-[#D2691E] text-white font-semibold rounded-xl hover:from-[#8B4513] hover:to-[#CD853F] transition-all duration-300 shadow-lg hover:shadow-xl text-center transform hover:scale-105 hover:-translate-y-1"
                 >
                   <span className="group-hover:tracking-wide transition-all duration-300">Explore Map</span>
                 </Link>
                 <Link 
                   to="/destinations"
                   className="group px-8 py-4 border-2 border-[#A0522D]/30 text-gray-700 font-semibold rounded-xl hover:border-[#A0522D] hover:text-[#A0522D] transition-all duration-300 text-center backdrop-blur-sm hover:bg-white/50 transform hover:scale-105 hover:-translate-y-1"
                 >
                   <span className="group-hover:tracking-wide transition-all duration-300">Learn More</span>
                 </Link>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                   <div className="text-3xl font-bold text-gray-800">54</div>
                   <div className="text-sm text-gray-600 font-medium">Countries</div>
                 </div>
                 <div className="text-center">
                   <div className="text-3xl font-bold text-gray-800">2000+</div>
                   <div className="text-sm text-gray-600 font-medium">Languages</div>
                 </div>
              </div>
            </div>

            {/* Right Column - Features & Philosophy */}
            <div className="space-y-8">
              {/* Platform Features Card */}
               <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/30">
                 <h3 className="text-2xl font-bold text-gray-800 mb-6">Platform Features</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center space-y-3">
                     <div className="w-12 h-12 bg-gradient-to-r from-[#A0522D] to-[#D2691E] rounded-xl flex items-center justify-center mx-auto">
                       <Globe className="w-6 h-6 text-white" />
                     </div>
                     <div>
                       <div className="font-semibold text-gray-800">54 Countries</div>
                       <div className="text-sm text-gray-600">Complete African coverage</div>
                     </div>
                   </div>
                   <div className="text-center space-y-3">
                     <div className="w-12 h-12 bg-gradient-to-r from-[#8B4513] to-[#CD853F] rounded-xl flex items-center justify-center mx-auto">
                       <Users className="w-6 h-6 text-white" />
                     </div>
                     <div>
                       <div className="font-semibold text-gray-800">Rich Cultures</div>
                       <div className="text-sm text-gray-600">Diverse traditions</div>
                     </div>
                   </div>
                   <div className="text-center space-y-3">
                     <div className="w-12 h-12 bg-gradient-to-r from-[#D2691E] to-[#DAA520] rounded-xl flex items-center justify-center mx-auto">
                       <MapPin className="w-6 h-6 text-white" />
                     </div>
                     <div>
                       <div className="font-semibold text-gray-800">Interactive Map</div>
                       <div className="text-sm text-gray-600">Explore visually</div>
                     </div>
                   </div>
                   <div className="text-center space-y-3">
                     <div className="w-12 h-12 bg-gradient-to-r from-[#CD853F] to-[#FCD116] rounded-xl flex items-center justify-center mx-auto">
                       <Calendar className="w-6 h-6 text-white" />
                     </div>
                     <div>
                       <div className="font-semibold text-gray-800">Cultural Events</div>
                       <div className="text-sm text-gray-600">Live experiences</div>
                     </div>
                   </div>
                </div>
              </div>

              {/* Ubuntu Philosophy Card */}
               <div className="bg-gradient-to-r from-[#A0522D] to-[#D2691E] rounded-3xl p-8 text-white shadow-2xl">
                 <div className="space-y-4">
                   <h3 className="text-2xl font-bold">Ubuntu Philosophy</h3>
                   <blockquote className="text-lg italic leading-relaxed">
                     "Ubuntu: I am because we are"
                   </blockquote>
                   <p className="text-orange-100 text-sm">
                     — African Philosophy of Interconnectedness
                   </p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600">
             <div className="mb-2 sm:mb-0">
               © 2024 Ubuntu Platform. All rights reserved.
             </div>
             <div className="flex items-center space-x-6">
               <Link to="/" className="hover:text-[#A0522D] transition-colors">
                 Privacy
               </Link>
               <Link to="/" className="hover:text-[#A0522D] transition-colors">
                 Terms
               </Link>
               <Link to="/" className="hover:text-[#A0522D] transition-colors">
                 Contact
               </Link>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;