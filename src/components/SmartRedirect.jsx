import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SmartRedirect = ({ 
  defaultAuthRoute = '/signup',
  authenticatedRoute = '/map',
  showLoadingScreen = true,
  customLoadingComponent = null,
  redirectDelay = 500
}) => {
  const { 
    isAuthenticated, 
    user, 
    loading: authLoading, 
    checkUserExists,
    shouldSuggestLogin,
    getSuggestedLoginEmail,
    clearLoginSuggestion
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [redirecting, setRedirecting] = useState(false);
  const [redirectMessage, setRedirectMessage] = useState('Preparing your cultural journey...');

  useEffect(() => {
    const handleSmartRedirect = async () => {
      // Wait for auth to finish loading
      if (authLoading) return;

      setRedirecting(true);

      try {
        // Handle authenticated users
        if (isAuthenticated && user) {
          setRedirectMessage('Welcome back! Redirecting to your dashboard...');
          
          // Check if there's a intended destination from previous navigation
          const intendedDestination = location.state?.from?.pathname || 
                                    sessionStorage.getItem('intendedDestination') ||
                                    authenticatedRoute;
          
          // Clear stored destination
          sessionStorage.removeItem('intendedDestination');
          
          setTimeout(() => {
            navigate(intendedDestination, { replace: true });
          }, redirectDelay);
          return;
        }

        // Handle unauthenticated users with smart routing
        await handleUnauthenticatedRedirect();
        
      } catch (error) {
        console.error('Smart redirect error:', error);
        // Fallback to default route on error
        setTimeout(() => {
          navigate(defaultAuthRoute, { replace: true });
        }, redirectDelay);
      }
    };

    const handleUnauthenticatedRedirect = async () => {
      // Check for login suggestion from previous session
      if (shouldSuggestLogin()) {
        const suggestedEmail = getSuggestedLoginEmail();
        setRedirectMessage('Welcome back! Redirecting to sign in...');
        
        setTimeout(() => {
          navigate('/login', {
            replace: true,
            state: {
              suggestedEmail,
              message: 'Welcome back! Please sign in to continue.',
              returnTo: location.state?.from?.pathname
            }
          });
        }, redirectDelay);
        
        clearLoginSuggestion();
        return;
      }

      // Check for last attempted email
      const lastEmail = localStorage.getItem('lastAttemptedEmail');
      const userPreference = localStorage.getItem('preferredAuthFlow'); // 'login' or 'signup'
      const visitCount = parseInt(localStorage.getItem('visitCount') || '0');
      const lastVisit = localStorage.getItem('lastVisit');
      
      // Increment visit count
      localStorage.setItem('visitCount', (visitCount + 1).toString());
      localStorage.setItem('lastVisit', new Date().toISOString());

      if (lastEmail) {
        setRedirectMessage('Checking your account...');
        
        try {
          const userExists = await checkUserExists(lastEmail);
          
          if (userExists) {
            // User exists, suggest login
            setRedirectMessage('Account found! Redirecting to sign in...');
            
            setTimeout(() => {
              navigate('/login', {
                replace: true,
                state: {
                  suggestedEmail: lastEmail,
                  message: 'Welcome back! Please sign in to continue.',
                  returnTo: location.state?.from?.pathname
                }
              });
            }, redirectDelay);
          } else {
            // Email attempted but user doesn't exist
            setRedirectMessage('Setting up your account...');
            
            setTimeout(() => {
              navigate('/signup', {
                replace: true,
                state: {
                  suggestedEmail: lastEmail,
                  message: 'Complete your account setup to explore African culture.',
                  returnTo: location.state?.from?.pathname
                }
              });
            }, redirectDelay);
          }
        } catch (error) {
          console.error('Error checking user existence:', error);
          // Fallback to user preference or default
          handleFallbackRedirect(userPreference, lastEmail);
        }
      } else {
        // No previous email, use smart routing based on user behavior
        handleNewUserRedirect(visitCount, userPreference);
      }
    };

    const handleFallbackRedirect = (preference, email = null) => {
      const route = preference === 'login' ? '/login' : '/signup';
      const message = preference === 'login' 
        ? 'Welcome back! Please sign in to continue.'
        : 'Join us to explore the rich cultures of Africa!';
      
      setRedirectMessage(`Redirecting to ${preference === 'login' ? 'sign in' : 'sign up'}...`);
      
      setTimeout(() => {
        navigate(route, {
          replace: true,
          state: {
            suggestedEmail: email,
            message,
            returnTo: location.state?.from?.pathname
          }
        });
      }, redirectDelay);
    };

    const handleNewUserRedirect = (visitCount, preference) => {
      let route = defaultAuthRoute;
      let message = 'Join us to explore the rich cultures of Africa!';
      
      // Smart routing based on visit patterns
      if (visitCount > 3 && !preference) {
        // Frequent visitor without account, suggest login (they might have account)
        route = '/login';
        message = 'Welcome back! Sign in or create an account to continue.';
        setRedirectMessage('Welcome back! Redirecting...');
      } else if (preference === 'login') {
        route = '/login';
        message = 'Welcome back! Please sign in to continue.';
        setRedirectMessage('Redirecting to sign in...');
      } else {
        // Default to signup for new users
        setRedirectMessage('Welcome! Setting up your journey...');
      }
      
      setTimeout(() => {
        navigate(route, {
          replace: true,
          state: {
            message,
            isFirstVisit: visitCount === 1,
            returnTo: location.state?.from?.pathname
          }
        });
      }, redirectDelay);
    };

    handleSmartRedirect();
  }, [isAuthenticated, user, authLoading, navigate, location, authenticatedRoute, defaultAuthRoute, redirectDelay]);

  // Don't show loading screen if disabled
  if (!showLoadingScreen) {
    return null;
  }

  // Use custom loading component if provided
  if (customLoadingComponent) {
    return customLoadingComponent;
  }

  // Default loading screen
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#FAF3E0] to-[#F5E6D3]">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="relative mb-8">
          {/* Main spinner */}
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#A0522D] border-t-transparent mx-auto"></div>
          
          {/* Inner pulse effect */}
          <div className="absolute inset-0 rounded-full h-16 w-16 border-2 border-[#D2691E] opacity-30 animate-ping mx-auto"></div>
        </div>
        
        {/* Dynamic message */}
        <p className="text-[#A0522D] text-lg font-medium mb-2 transition-all duration-300">
          {redirectMessage}
        </p>
        
        {/* Progress indicator */}
        <div className="w-full bg-[#A0522D]/20 rounded-full h-1 mb-4">
          <div className="bg-[#A0522D] h-1 rounded-full animate-pulse" style={{width: redirecting ? '100%' : '30%', transition: 'width 2s ease-in-out'}}></div>
        </div>
        
        {/* Subtitle */}
        <p className="text-[#8B4513] text-sm opacity-75">
          Discovering the best experience for you...
        </p>
      </div>
    </div>
  );
};

export default SmartRedirect;