import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CountryHero from '../components/country/CountryHero';
import Navbar from '../components/layout/Navbar';
import Button from '../components/ui/Button';

export default function CountryPage() {
  const { countryCode } = useParams();

  return (
    <div className="min-h-screen bg-[#FAF3E0]">
      <Navbar />
      <main>
        {/* Back to map button */}
        <div className="container mx-auto px-4 py-4">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to Map
            </Button>
          </Link>
        </div>
        
        {/* Country Hero Section */}
        <CountryHero countryCode={countryCode} />
        
        {/* Future sections can be added here */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Placeholder for future content sections */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">History & Heritage</h3>
              <p className="text-gray-600">Coming soon...</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Arts & Crafts</h3>
              <p className="text-gray-600">Coming soon...</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Music & Dance</h3>
              <p className="text-gray-600">Coming soon...</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Gastronomy</h3>
              <p className="text-gray-600">Coming soon...</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Languages</h3>
              <p className="text-gray-600">Coming soon...</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Traditions</h3>
              <p className="text-gray-600">Coming soon...</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}