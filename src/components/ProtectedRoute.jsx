import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ 
  children, 
  requireAuth = true, 
  redirectTo = '/auth',
  fallbackComponent = null 
}) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    const LoadingComponent = fallbackComponent || (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#FAF3E0] to-[#F5E6D3]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#A0522D] border-t-transparent mx-auto mb-4"></div>
          <p className="text-[#A0522D] text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
    return LoadingComponent;
  }

  // Route requires authentication but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return (
      <Navigate 
        to={redirectTo} 
        state={{ from: location, message: 'Please sign in to access this page.' }} 
        replace 
      />
    );
  }

  // Route should not be accessible to authenticated users (like login/signup pages)
  if (!requireAuth && isAuthenticated) {
    // Get the intended destination from location state, or default to /map
    const from = location.state?.from?.pathname || '/map';
    return <Navigate to={from} replace />;
  }

  // User has appropriate access, render the component
  return children;
};

export default ProtectedRoute;