import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/HeroSection";
import CulturalIdentitySection from "../components/CulturalIdentitySection";
import ArtsSection from "../components/ArtsSection";
import FoodSection from "../components/FoodSection";
import EventsSection from "../components/EventsSection";
import TourismSection from "../components/TourismSection";
import NewsSection from "../components/NewsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import Footer from "../components/layout/Footer";
import { useNavigate } from "react-router-dom";
import { Compass } from "lucide-react";

const CountryTemplate = ({ countryData, theme }) => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const handleExploreMap = () => {
    navigate("/map");
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`min-h-screen bg-[#FAF3E0] transform transition-all duration-1000 $${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      <Navbar />
      <button
        onClick={handleExploreMap}
        className="fixed bottom-5 right-5 z-1000 bg-gradient-to-r from-[#A0522D] to-[#D2691E] text-white px-5 py-4 rounded-full text-lg font-bold transform hover:scale-110 transition-all duration-300 animate-pulse flex items-center gap-2 mx-auto"
      >
        <Compass className="w-6 h-6" />
        Map
      </button>
      <HeroSection countryData={countryData} theme={theme} />
      <CulturalIdentitySection countryData={countryData} theme={theme} />
      <TourismSection countryData={countryData} theme={theme} />
      <ArtsSection countryData={countryData} theme={theme} />
      <FoodSection countryData={countryData} theme={theme} />
      <EventsSection countryData={countryData} theme={theme} />
      <NewsSection countryData={countryData} theme={theme} />
      <TestimonialsSection countryData={countryData} theme={theme} />
      <Footer />
    </div>
  );
};

export default CountryTemplate;
