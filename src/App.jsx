import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import SmartRedirect from './components/SmartRedirect';
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
import UserProfile from './components/UserProfile';
import AdminDashboard from './components/AdminDashboard';
import SocialMediaApp from './social media/social';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public landing page */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Smart redirection route for auth */}
          <Route path="/auth" element={<SmartRedirect />} />
          
          {/* Auth pages - redirect to /map if already authenticated */}
          <Route 
            path="/login" 
            element={
              <ProtectedRoute requireAuth={false}>
                <LoginPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/signup" 
            element={
              <ProtectedRoute requireAuth={false}>
                <SignupPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Protected routes - require authentication */}
          <Route 
            path="/map" 
            element={
              <ProtectedRoute requireAuth={true} redirectTo="/auth">
                <HomePage />
              </ProtectedRoute>
            } 
          />
          
          {/* Dynamic country page - protected */}
          <Route 
            path="/country/:countryCode" 
            element={
              <ProtectedRoute requireAuth={true} redirectTo="/auth">
                <CountryPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Country-specific pages - protected */}
          <Route 
            path="/cameroon" 
            element={
              <ProtectedRoute requireAuth={true} redirectTo="/auth">
                <CameroonPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/nigeria" 
            element={
              <ProtectedRoute requireAuth={true} redirectTo="/auth">
                <NigeriaPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/ghana" 
            element={
              <ProtectedRoute requireAuth={true} redirectTo="/auth">
                <GhanaPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/egypt" 
            element={
              <ProtectedRoute requireAuth={true} redirectTo="/auth">
                <EgyptPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/kenya" 
            element={
              <ProtectedRoute requireAuth={true} redirectTo="/auth">
                <KenyaPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/south-africa" 
            element={
              <ProtectedRoute requireAuth={true} redirectTo="/auth">
                <SouthAfricaPage />
              </ProtectedRoute>
            } 
          />
          
          {/* User Profile - protected */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute requireAuth={true} redirectTo="/auth">
                <UserProfile />
              </ProtectedRoute>
            } 
          />
          
          {/* Admin Dashboard - protected */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requireAuth={true} redirectTo="/auth">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Social Media - protected */}
          <Route 
            path="/social" 
            element={
              <ProtectedRoute requireAuth={true} redirectTo="/auth">
                <SocialMediaApp />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
