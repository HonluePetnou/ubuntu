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

      // Create comprehensive user document in Firestore
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || `${additionalData.firstName || ''} ${additionalData.lastName || ''}`.trim(),
        firstName: additionalData.firstName || '',
        lastName: additionalData.lastName || '',
        phone: additionalData.phone || '',
        country: additionalData.country || '',
        photoURL: user.photoURL || '',
        provider: 'email',
        emailVerified: user.emailVerified,
        isActive: true,
        lastLoginAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        preferences: {
          language: 'en',
          notifications: true,
          theme: 'light'
        },
        profile: {
          bio: '',
          interests: [],
          favoriteCountries: []
        }
      };

      await setDoc(doc(db, 'users', user.uid), userData);
      setUserProfile(userData);
      
      // Add email to known emails
      addKnownEmail(email);
      
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
      const user = result.user;
      
      // Check if user document exists and validate information
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        
        // Validate user information
        if (userData.email !== user.email) {
          throw new Error('User information mismatch. Please contact support.');
        }
        
        if (!userData.isActive) {
          throw new Error('Account is deactivated. Please contact support.');
        }
        
        // Update last login timestamp
        const updatedUserData = {
          ...userData,
          lastLoginAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          emailVerified: user.emailVerified
        };
        
        await updateDoc(doc(db, 'users', user.uid), {
          lastLoginAt: updatedUserData.lastLoginAt,
          updatedAt: updatedUserData.updatedAt,
          emailVerified: updatedUserData.emailVerified
        });
        
        setUserProfile(updatedUserData);
      } else {
        // If user document doesn't exist, create it (for existing Firebase Auth users)
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || '',
          firstName: '',
          lastName: '',
          phone: '',
          country: '',
          photoURL: user.photoURL || '',
          provider: 'email',
          emailVerified: user.emailVerified,
          isActive: true,
          lastLoginAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          preferences: {
            language: 'en',
            notifications: true,
            theme: 'light'
          },
          profile: {
            bio: '',
            interests: [],
            favoriteCountries: []
          }
        };
        
        await setDoc(doc(db, 'users', user.uid), userData);
        setUserProfile(userData);
      }
      
      // Add email to known emails
      addKnownEmail(email);
      
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
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        
        // Validate user information
        if (userData.email !== user.email) {
          throw new Error('User information mismatch. Please contact support.');
        }
        
        if (!userData.isActive) {
          throw new Error('Account is deactivated. Please contact support.');
        }
        
        // Update last login timestamp and Google profile info
        const updatedUserData = {
          ...userData,
          displayName: user.displayName || userData.displayName,
          photoURL: user.photoURL || userData.photoURL,
          emailVerified: user.emailVerified,
          lastLoginAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        await updateDoc(doc(db, 'users', user.uid), {
          displayName: updatedUserData.displayName,
          photoURL: updatedUserData.photoURL,
          emailVerified: updatedUserData.emailVerified,
          lastLoginAt: updatedUserData.lastLoginAt,
          updatedAt: updatedUserData.updatedAt
        });
        
        setUserProfile(updatedUserData);
      } else {
        // Create comprehensive user document for new Google users
        const nameParts = user.displayName ? user.displayName.split(' ') : ['', ''];
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || '',
          firstName: nameParts[0] || '',
          lastName: nameParts.slice(1).join(' ') || '',
          phone: '',
          country: '',
          photoURL: user.photoURL || '',
          provider: 'google',
          emailVerified: user.emailVerified,
          isActive: true,
          lastLoginAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          preferences: {
            language: 'en',
            notifications: true,
            theme: 'light'
          },
          profile: {
            bio: '',
            interests: [],
            favoriteCountries: []
          }
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

  const validateUserInformation = async (userId) => {
    try {
      if (!userId) return { isValid: false, message: 'User ID is required' };
      
      const userDoc = await getDoc(doc(db, 'users', userId));
      
      if (!userDoc.exists()) {
        return { isValid: false, message: 'User document not found' };
      }
      
      const userData = userDoc.data();
      
      // Check if user is active
      if (!userData.isActive) {
        return { isValid: false, message: 'Account is deactivated' };
      }
      
      // Check if required fields are present
      if (!userData.email) {
        return { isValid: false, message: 'Email is missing from user profile' };
      }
      
      return { isValid: true, userData };
    } catch (error) {
      console.error('Error validating user information:', error);
      return { isValid: false, message: 'Error validating user information' };
    }
  };

  const updateUserProfile = async (userId, updates) => {
    try {
      if (!userId) throw new Error('User ID is required');
      
      const updateData = {
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      await updateDoc(doc(db, 'users', userId), updateData);
      
      // Update local user profile state
      if (userProfile && userProfile.uid === userId) {
        setUserProfile(prev => ({ ...prev, ...updateData }));
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };

  const getUserProfile = async (userId) => {
    try {
      if (!userId) throw new Error('User ID is required');
      
      const userDoc = await getDoc(doc(db, 'users', userId));
      
      if (!userDoc.exists()) {
        throw new Error('User not found');
      }
      
      return userDoc.data();
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
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
    clearLoginSuggestion,
    validateUserInformation,
    updateUserProfile,
    getUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};