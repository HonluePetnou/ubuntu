import React, { useState, useEffect } from 'react';
import Navbar from "../components/layout/Navbar";
import {
  HeroSection,
  CulturalIdentitySection,
  ArtsSection,
  FoodSection,
  EventsSection,
  TourismSection,
  NewsSection,
  TestimonialsSection
} from "../components/sections";
import Footer from "../components/layout/Footer";
import { useNavigate } from "react-router-dom";
import { Compass } from "lucide-react";
import CountryDetails from "../data/countryDetails";

const CountryTemplate = ({ countryData, countryCode, theme }) => {
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
      <TourismSection countryData={{...countryData, countryCode}} theme={theme} />
      <ArtsSection countryData={{...countryData, countryCode}} theme={theme} />
      <FoodSection countryData={{...countryData, countryCode}} theme={theme} />
      <EventsSection countryData={{...countryData, countryCode}} theme={theme} />
      <NewsSection countryData={{...countryData, countryCode}} theme={theme} />
      <TestimonialsSection countryData={countryData} theme={theme} />
      <Footer />
    </div>
  );
};

export default CountryTemplate;
