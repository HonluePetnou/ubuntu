import React from 'react';
import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ChevronDown, Menu, X, Leaf } from "lucide-react";

export default function Navbar() {
  const [cultureOpen, setCultureOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();
  

  
  // Extract country code from URL
  const getCurrentCountry = () => {
    const path = location.pathname;
    const countryMatch = path.match(/\/country\/([a-z]{2})/);
    return countryMatch ? countryMatch[1] : 'cm'; // Default to Cameroon
  };
  
  const currentCountry = getCurrentCountry();
  
  // Generate country-specific links
  const getCountryLink = (section) => {
    return `/country/${currentCountry}/${section}`;
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest("#cultureMenu") && !e.target.closest("#mobileMenu")) {
        setCultureOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-[#FAF3E0] shadow-sm fixed w-full z-1000">
      {/* Logo */}
       <Link to={`/country/${currentCountry}`}>
         <div className="text-2xl font-bold text-[#A0522D] flex items-center space-x-2">
           <Leaf size={28} />
           <span className="tracking-wide">Ubuntu</span>
         </div>
       </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-8 font-medium text-[#222]">
        <Link
          to={`/country/${currentCountry}`}
          className="hover:text-[#A0522D] border-b-2 border-transparent hover:border-[#A0522D] pb-1"
        >
          Home
        </Link>

        <div className="relative" id="cultureMenu">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCultureOpen(!cultureOpen);
            }}
            className="flex items-center hover:text-[#A0522D] pb-1 border-b-2 border-transparent hover:border-[#A0522D]"
          >
            Culture <ChevronDown size={18} className="ml-1" />
          </button>

          {cultureOpen && (
            <div className="absolute top-10 left-0 bg-[#FAF3E0] border border-gray-200 shadow-lg rounded-md w-52 py-2 space-y-1 z-50">
              <Link to={getCountryLink('history')} className="block px-4 py-2 hover:bg-gray-100">
                History & Origins
              </Link>
              <Link to={getCountryLink('arts')} className="block px-4 py-2 hover:bg-gray-100">
                Arts & Craft
              </Link>
              <Link to={getCountryLink('music')} className="block px-4 py-2 hover:bg-gray-100">
                Music
              </Link>
              <Link to={getCountryLink('dance')} className="block px-4 py-2 hover:bg-gray-100">
                Dance
              </Link>
              <Link to={getCountryLink('food')} className="block px-4 py-2 hover:bg-gray-100">
                Food & Gastronomy
              </Link>
              <Link to={getCountryLink('news')} className="block px-4 py-2 hover:bg-gray-100">
                News
              </Link>
            </div>
          )}
        </div>

        <Link
          to={getCountryLink('events')}
          className="hover:text-[#A0522D] border-b-2 border-transparent hover:border-[#A0522D] pb-1"
        >
          Events
        </Link>
        
        <Link
          to={getCountryLink('destinations')}
          className="hover:text-[#A0522D] border-b-2 border-transparent hover:border-[#A0522D] pb-1"
        >
          Destinations
        </Link>
      </div>

      {/* Actions */}
      <div className="hidden md:flex items-center space-x-4">
        <span className="text-sm font-semibold text-[#222]">ENG</span>
        <button className="bg-[#A0522D] text-white px-4 py-2 rounded-lg hover:bg-[#22543D] transition duration-200">
          Join Community
        </button>
      </div>

      {/* Mobile Burger */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="md:hidden text-[#276749]"
      >
        <Menu size={28} />
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          id="mobileMenu"
          className="md:hidden fixed top-0 right-0 w-64 h-full bg-[#FAF3E0] shadow-lg z-50 flex flex-col p-6 space-y-6"
        >
          <div className="flex justify-end">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#276749]"
            >
              <X size={28} />
            </button>
          </div>

          <Link
            to={`/country/${currentCountry}`}
            className="text-lg font-medium text-[#222] hover:text-[#A0522D]"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>

          <div className="flex flex-col space-y-2">
            <button
              onClick={() => setCultureOpen(!cultureOpen)}
              className="flex items-center text-lg font-medium text-[#222] hover:text-[#A0522D]"
            >
              Culture <ChevronDown size={18} className="ml-1" />
            </button>
            {cultureOpen && (
              <div className="flex flex-col pl-4 space-y-2">
                <Link to={getCountryLink('history')} className="text-[#222] hover:text-[#A0522D]" onClick={() => setMobileMenuOpen(false)}>
                  History & Origins
                </Link>
                <Link to={getCountryLink('arts')} className="text-[#222] hover:text-[#A0522D]" onClick={() => setMobileMenuOpen(false)}>
                  Arts & Craft
                </Link>
                <Link to={getCountryLink('music')} className="text-[#222] hover:text-[#A0522D]" onClick={() => setMobileMenuOpen(false)}>
                  Music
                </Link>
                <Link to={getCountryLink('dance')} className="text-[#222] hover:text-[#A0522D]" onClick={() => setMobileMenuOpen(false)}>
                  Dance
                </Link>
                <Link to={getCountryLink('food')} className="text-[#222] hover:text-[#A0522D]" onClick={() => setMobileMenuOpen(false)}>
                  Food & Gastronomy
                </Link>
                <Link to={getCountryLink('news')} className="text-[#222] hover:text-[#A0522D]" onClick={() => setMobileMenuOpen(false)}>
                  News
                </Link>
              </div>
            )}
          </div>

          <Link
            to={getCountryLink('events')}
            className="text-lg font-medium text-[#222] hover:text-[#A0522D]"
            onClick={() => setMobileMenuOpen(false)}
          >
            Events
          </Link>
          <Link
            to={getCountryLink('destinations')}
            className="text-lg font-medium text-[#222] hover:text-[#A0522D]"
            onClick={() => setMobileMenuOpen(false)}
          >
            Destinations
          </Link>

          <div className="pt-4 border-t border-gray-300">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-semibold text-[#222]">ENG</span>
              <button className="bg-[#A0522D] text-white px-4 py-2 rounded-lg hover:bg-[#22543D] transition duration-200">
                Join Community
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}