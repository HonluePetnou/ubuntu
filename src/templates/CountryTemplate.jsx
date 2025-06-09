import React from 'react';
import Navbar from '../components/layout/Navbar';
import HeroSection from '../components/HeroSection';
import CulturalIdentitySection from '../components/CulturalIdentitySection';
import ArtsSection from '../components/ArtsSection';
import FoodSection from '../components/FoodSection';
import EventsSection from '../components/EventsSection';
import TourismSection from '../components/TourismSection';
import NewsSection from '../components/NewsSection';

const CountryTemplate = ({ countryData, theme }) => {
  return (
    <div className="min-h-screen bg-[#FAF3E0]">
      <Navbar />
      <HeroSection countryData={countryData} theme={theme} />
      <CulturalIdentitySection countryData={countryData} theme={theme} />
      <TourismSection countryData={countryData} theme={theme} />
      <ArtsSection countryData={countryData} theme={theme} />
      <FoodSection countryData={countryData} theme={theme} />
      <EventsSection countryData={countryData} theme={theme} />
      <NewsSection countryData={countryData} theme={theme} />
    </div>
  );
};

export default CountryTemplate;