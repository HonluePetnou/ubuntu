import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import CountryPage from './pages/CountryPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CameroonPage from './pages/CameroonPage';
import NigeriaPage from './pages/NigeriaPage';
import GhanaPage from './pages/GhanaPage';
import EgyptPage from './pages/EgyptPage';
import KenyaPage from './pages/KenyaPage';
import SouthAfricaPage from './pages/SouthAfricaPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/map" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Dynamic country page */}
        <Route path="/country/:countryCode" element={<CountryPage />} />
        
        {/* Country-specific pages */}
        <Route path="/cameroon" element={<CameroonPage />} />
        <Route path="/nigeria" element={<NigeriaPage />} />
        <Route path="/ghana" element={<GhanaPage />} />
        <Route path="/egypt" element={<EgyptPage />} />
        <Route path="/kenya" element={<KenyaPage />} />
        <Route path="/south-africa" element={<SouthAfricaPage />} />
      </Routes>
    </Router>
  );
}

export default App;
