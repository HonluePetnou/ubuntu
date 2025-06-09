import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import CountryPage from './pages/CountryPage';
import CameroonPage from './pages/CameroonPage';
import NigeriaPage from './pages/NigeriaPage';
import GhanaPage from './pages/GhanaPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/map" element={<HomePage />} />
        <Route path="/country/:countryCode" element={<CountryPage />} />
        <Route path="/cameroon" element={<CameroonPage />} />
        <Route path="/nigeria" element={<NigeriaPage />} />
        <Route path="/ghana" element={<GhanaPage />} />
      </Routes>
    </Router>
  );
}

export default App;
