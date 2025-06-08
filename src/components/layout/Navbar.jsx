import { ChevronDown, Menu, X, Leaf } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [cultureOpen, setCultureOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      <div className="text-2xl font-bold text-[#A0522D] flex items-center space-x-2">
        <Leaf size={28} />
        <span className="tracking-wide">Ubuntu</span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-8 font-medium text-[#222]">
        <a
          href="#"
          className="hover:text-[#A0522D] border-b-2 border-transparent hover:border-[#A0522D] pb-1"
        >
          Home
        </a>

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
            <div className="absolute top-10 left-0 bg-white border border-gray-200 shadow-lg rounded-md w-52 py-2 space-y-1 z-50">
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                History & Origins
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Ethnies & Languages
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Arts & Music
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Gastronomy
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Beliefs
              </a>
            </div>
          )}
        </div>

        <a
          href="#"
          className="hover:text-[#A0522D] border-b-2 border-transparent hover:border-[#A0522D] pb-1"
        >
          Event
        </a>
        <a
          href="#"
          className="hover:text-[#A0522D] border-b-2 border-transparent hover:border-[#A0522D] pb-1"
        >
          Blog
        </a>
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
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-[#276749] flex items-center space-x-2">
              <Leaf size={28} />
              <span>Ubuntu</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#276749]"
            >
              <X size={28} />
            </button>
          </div>

          <a
            href="#"
            className="text-lg font-medium text-[#222] hover:text-[#A0522D]"
          >
            Home
          </a>

          <div className="flex flex-col space-y-2">
            <button
              onClick={() => setCultureOpen(!cultureOpen)}
              className="flex items-center text-lg font-medium text-[#222] hover:text-[#A0522D]"
            >
              Culture <ChevronDown size={18} className="ml-1" />
            </button>
            {cultureOpen && (
              <div className="flex flex-col pl-4 space-y-2">
                <a href="#" className="text-[#222] hover:text-[#A0522D]">
                  History & Origins
                </a>
                <a href="#" className="text-[#222] hover:text-[#A0522D]">
                  Ethnies & Languages
                </a>
                <a href="#" className="text-[#222] hover:text-[#A0522D]">
                  Arts & Music
                </a>
                <a href="#" className="text-[#222] hover:text-[#A0522D]">
                  Gastronomy
                </a>
                <a href="#" className="text-[#222] hover:text-[#A0522D]">
                  Beliefs
                </a>
              </div>
            )}
          </div>

          <a
            href="#"
            className="text-lg font-medium text-[#222] hover:text-[#A0522D]"
          >
            Event
          </a>
          <a
            href="#"
            className="text-lg font-medium text-[#222] hover:text-[#A0522D]"
          >
            Blog
          </a>

          <div className="pt-4 border-t border-gray-300 flex items-center space-x-4">
            <span className="text-sm font-semibold text-[#222]">ENG</span>
            <button className="bg-[#276749] text-white px-4 py-2 rounded-lg hover:bg-[#22543D] transition duration-200">
              Community
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}