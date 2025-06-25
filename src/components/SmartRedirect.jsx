import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SmartRedirect = () => {
  const { isAuthenticated, user, checkUserExists } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirect = async () => {
      if (isAuthenticated && user) {
        // User is logged in, redirect to main app
        navigate('/map', { replace: true });
        return;
      }

      // User is not authenticated, determine best auth route
      const lastEmail = localStorage.getItem('lastAttemptedEmail');
      const hasVisited = localStorage.getItem('hasVisited');
      
      if (lastEmail) {
        // Check if this email has been used before
        const userExists = await checkUserExists(lastEmail);
        
        if (userExists) {
          // Suggest login for returning users
          navigate('/login', { 
            replace: true,
            state: { 
              suggestedEmail: lastEmail,
              message: 'Welcome back! Please sign in to continue.' 
            }
          });
        } else {
          // Email attempted but user doesn't exist, suggest signup
          navigate('/signup', { 
            replace: true,
            state: { 
              suggestedEmail: lastEmail,
              message: 'Create your account to explore African culture.' 
            }
          });
        }
      } else {
        // First-time visitor, show signup
        localStorage.setItem('hasVisited', 'true');
        navigate('/signup', { 
          replace: true,
          state: { 
            message: 'Join us to explore the rich cultures of Africa!' 
          }
        });
      }
    };

    handleRedirect();
  }, [isAuthenticated, user, navigate, checkUserExists]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#FAF3E0] to-[#F5E6D3]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#A0522D] border-t-transparent mx-auto mb-4"></div>
        <p className="text-[#A0522D] text-lg font-medium">Preparing your cultural journey...</p>
      </div>
    </div>
  );
};

export default SmartRedirect;