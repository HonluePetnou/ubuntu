import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import CountryPage from './pages/CountryPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/map" element={<HomePage />} />
        <Route path="/country/:countryCode" element={<CountryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
