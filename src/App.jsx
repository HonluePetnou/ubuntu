import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import CountryPage from './pages/CountryPage';
import CameroonPage from './pages/CameroonPage';
import NigeriaPage from './pages/NigeriaPage';
import GhanaPage from './pages/GhanaPage';
import HistoryPage from './pages/HistoryPage';
import DestinationsPage from './pages/DestinationsPage';
import ArtsPage from './pages/ArtsPage';
import DancePage from './pages/DancePage';
import MusicPage from './pages/MusicPage';
import NewsPage from './pages/NewsPage';
import FoodPage from './pages/FoodPage';
import EventsPage from './pages/EventsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/map" element={<HomePage />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        {/* Global and Country-specific Arts, Dance, and Music routes */}
        <Route path="/arts" element={<ArtsPage />} />
        <Route path="/:countryCode/arts" element={<ArtsPage />} />
        <Route path="/dance" element={<DancePage />} />
        <Route path="/:countryCode/dance" element={<DancePage />} />
        <Route path="/music" element={<MusicPage />} />
        <Route path="/:countryCode/music" element={<MusicPage />} />
        
        {/* Global and Country-specific News, Food, and Events routes */}
        <Route path="/news" element={<NewsPage />} />
        <Route path="/:countryCode/news" element={<NewsPage />} />
        <Route path="/food" element={<FoodPage />} />
        <Route path="/:countryCode/food" element={<FoodPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/:countryCode/events" element={<EventsPage />} />
        <Route path="/country/:countryCode" element={<CountryPage />} />
        <Route path="/country/:countryCode/destinations" element={<DestinationsPage />} />
        <Route path="/country/:countryCode/arts" element={<ArtsPage />} />
        <Route path="/country/:countryCode/dance" element={<DancePage />} />
        <Route path="/country/:countryCode/music" element={<MusicPage />} />
        <Route path="/country/:countryCode/news" element={<NewsPage />} />
        <Route path="/country/:countryCode/food" element={<FoodPage />} />
        <Route path="/country/:countryCode/events" element={<EventsPage />} />
        <Route path="/country/:countryCode/history" element={<HistoryPage />} />
        <Route path="/cameroon" element={<CameroonPage />} />
        <Route path="/nigeria" element={<NigeriaPage />} />
        <Route path="/ghana" element={<GhanaPage />} />
      </Routes>
    </Router>
  );
}

export default App;
