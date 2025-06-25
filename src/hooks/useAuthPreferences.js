import { useState, useEffect } from 'react';

const useAuthPreferences = () => {
  const [preferences, setPreferences] = useState({
    lastAttemptedEmail: '',
    preferredAuthFlow: '', // 'login' or 'signup'
    preferredLoginMethod: '', // 'email' or 'google'
    intendedDestination: '',
    onboardingCompleted: false
  });

  useEffect(() => {
    // Load preferences from localStorage on mount
    const loadPreferences = () => {
      try {
        const stored = {
          lastAttemptedEmail: localStorage.getItem('lastAttemptedEmail') || '',
          preferredAuthFlow: localStorage.getItem('preferredAuthFlow') || '',
          preferredLoginMethod: localStorage.getItem('preferredLoginMethod') || '',
          intendedDestination: localStorage.getItem('intendedDestination') || '',
          onboardingCompleted: localStorage.getItem('onboardingCompleted') === 'true'
        };
        setPreferences(stored);
      } catch (error) {
        console.error('Error loading auth preferences:', error);
      }
    };

    loadPreferences();
  }, []);

  const setLastAttemptedEmail = (email) => {
    try {
      localStorage.setItem('lastAttemptedEmail', email);
      setPreferences(prev => ({ ...prev, lastAttemptedEmail: email }));
    } catch (error) {
      console.error('Error setting last attempted email:', error);
    }
  };

  const clearLastAttemptedEmail = () => {
    try {
      localStorage.removeItem('lastAttemptedEmail');
      setPreferences(prev => ({ ...prev, lastAttemptedEmail: '' }));
    } catch (error) {
      console.error('Error clearing last attempted email:', error);
    }
  };

  const setPreferredAuthFlow = (flow) => {
    try {
      localStorage.setItem('preferredAuthFlow', flow);
      setPreferences(prev => ({ ...prev, preferredAuthFlow: flow }));
    } catch (error) {
      console.error('Error setting preferred auth flow:', error);
    }
  };

  const setPreferredLoginMethod = (method) => {
    try {
      localStorage.setItem('preferredLoginMethod', method);
      setPreferences(prev => ({ ...prev, preferredLoginMethod: method }));
    } catch (error) {
      console.error('Error setting preferred login method:', error);
    }
  };

  const setIntendedDestination = (destination) => {
    try {
      localStorage.setItem('intendedDestination', destination);
      setPreferences(prev => ({ ...prev, intendedDestination: destination }));
    } catch (error) {
      console.error('Error setting intended destination:', error);
    }
  };

  const clearIntendedDestination = () => {
    try {
      localStorage.removeItem('intendedDestination');
      setPreferences(prev => ({ ...prev, intendedDestination: '' }));
    } catch (error) {
      console.error('Error clearing intended destination:', error);
    }
  };

  const completeOnboarding = () => {
    try {
      localStorage.setItem('onboardingCompleted', 'true');
      setPreferences(prev => ({ ...prev, onboardingCompleted: true }));
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  const resetOnboarding = () => {
    try {
      localStorage.removeItem('onboardingCompleted');
      setPreferences(prev => ({ ...prev, onboardingCompleted: false }));
    } catch (error) {
      console.error('Error resetting onboarding:', error);
    }
  };

  const clearAllPreferences = () => {
    try {
      const keys = [
        'lastAttemptedEmail',
        'preferredAuthFlow',
        'preferredLoginMethod',
        'intendedDestination',
        'onboardingCompleted'
      ];
      
      keys.forEach(key => localStorage.removeItem(key));
      
      setPreferences({
        lastAttemptedEmail: '',
        preferredAuthFlow: '',
        preferredLoginMethod: '',
        intendedDestination: '',
        onboardingCompleted: false
      });
    } catch (error) {
      console.error('Error clearing all preferences:', error);
    }
  };

  return {
    preferences,
    setLastAttemptedEmail,
    clearLastAttemptedEmail,
    setPreferredAuthFlow,
    setPreferredLoginMethod,
    setIntendedDestination,
    clearIntendedDestination,
    completeOnboarding,
    resetOnboarding,
    clearAllPreferences
  };
};

export default useAuthPreferences;