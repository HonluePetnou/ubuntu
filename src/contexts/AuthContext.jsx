import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../firebase/config';
import useAuthPreferences from '../hooks/useAuthPreferences';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const authPrefs = useAuthPreferences();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        // Fetch user profile from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserProfile(userDoc.data());
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async (email, password, additionalData = {}) => {
    try {
      // Set user preferences for signup flow
      authPrefs.setLastAttemptedEmail(email);
      authPrefs.setPreferredAuthFlow('signup');
      authPrefs.setPreferredLoginMethod('email');
      
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update display name if provided
      if (additionalData.firstName && additionalData.lastName) {
        await updateProfile(user, {
          displayName: `${additionalData.firstName} ${additionalData.lastName}`
        });
      }

      // Save additional user data to Firestore
      const userData = {
        email: user.email,
        displayName: user.displayName,
        createdAt: new Date().toISOString(),
        ...additionalData
      };

      await setDoc(doc(db, 'users', user.uid), userData);
      setUserProfile(userData);
      
      // Mark onboarding as completed for new users
      authPrefs.completeOnboarding();
      
      return user;
    } catch (error) {
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      // Store email for smart redirect logic and set preferred auth flow
      authPrefs.setLastAttemptedEmail(email);
      authPrefs.setPreferredAuthFlow('login');
      authPrefs.setPreferredLoginMethod('email');
      
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      // Clear any stored data but keep user preferences for better UX
      authPrefs.clearLastAttemptedEmail();
      authPrefs.clearIntendedDestination();
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      // Set preferred login method
      authPrefs.setPreferredLoginMethod('google');
      authPrefs.setPreferredAuthFlow('login');
      
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Check if user document exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (!userDoc.exists()) {
        // Create user document if it doesn't exist
        const userData = {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          createdAt: new Date().toISOString(),
          provider: 'google'
        };
        
        await setDoc(doc(db, 'users', user.uid), userData);
        setUserProfile(userData);
      }
      
      // Add email to known emails
      addKnownEmail(user.email);
      
      return result;
    } catch (error) {
      throw error;
    }
  };

  const checkUserExists = async (email) => {
    try {
      // This is a simple check using localStorage
      // In a real app, you'd make an API call to check if user exists
      const knownEmails = JSON.parse(localStorage.getItem('knownEmails') || '[]');
      return knownEmails.includes(email);
    } catch (error) {
      console.error('Error checking user existence:', error);
      return false;
    }
  };

  const addKnownEmail = (email) => {
    try {
      const knownEmails = JSON.parse(localStorage.getItem('knownEmails') || '[]');
      if (!knownEmails.includes(email)) {
        knownEmails.push(email);
        localStorage.setItem('knownEmails', JSON.stringify(knownEmails));
      }
    } catch (error) {
      console.error('Error adding known email:', error);
    }
  };

  // Track signup form completion
  const markSignupFormCompleted = (email) => {
    try {
      const completedSignups = JSON.parse(localStorage.getItem('completedSignups') || '[]');
      if (!completedSignups.includes(email)) {
        completedSignups.push(email);
        localStorage.setItem('completedSignups', JSON.stringify(completedSignups));
        // Set a flag to show login suggestion
        localStorage.setItem('suggestLogin', 'true');
        localStorage.setItem('suggestLoginEmail', email);
      }
    } catch (error) {
      console.error('Error marking signup completion:', error);
    }
  };

  const shouldSuggestLogin = () => {
    try {
      return localStorage.getItem('suggestLogin') === 'true';
    } catch (error) {
      return false;
    }
  };

  const getSuggestedLoginEmail = () => {
    try {
      return localStorage.getItem('suggestLoginEmail') || '';
    } catch (error) {
      return '';
    }
  };

  const clearLoginSuggestion = () => {
    try {
      localStorage.removeItem('suggestLogin');
      localStorage.removeItem('suggestLoginEmail');
    } catch (error) {
      console.error('Error clearing login suggestion:', error);
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    isAuthenticated: !!user,
    signup,
    login,
    logout,
    resetPassword,
    signInWithGoogle,
    checkUserExists,
    addKnownEmail,
    markSignupFormCompleted,
    shouldSuggestLogin,
    getSuggestedLoginEmail,
    clearLoginSuggestion
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};