import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  updateDoc, 
  deleteDoc,
  orderBy,
  limit,
  startAfter
} from 'firebase/firestore';
import { db } from '../firebase/config';
import bcrypt from 'bcryptjs';

// User collection reference
const USERS_COLLECTION = 'users';
const USER_CREDENTIALS_COLLECTION = 'userCredentials';
const USER_SESSIONS_COLLECTION = 'userSessions';

/**
 * User Database Schema:
 * 
 * users/{userId} {
 *   email: string,
 *   displayName: string,
 *   firstName: string,
 *   lastName: string,
 *   photoURL: string,
 *   provider: 'email' | 'google' | 'facebook',
 *   isEmailVerified: boolean,
 *   createdAt: string (ISO),
 *   updatedAt: string (ISO),
 *   lastLoginAt: string (ISO),
 *   profile: {
 *     bio: string,
 *     country: string,
 *     preferences: object,
 *     interests: array
 *   },
 *   settings: {
 *     notifications: boolean,
 *     privacy: object,
 *     theme: string
 *   },
 *   status: 'active' | 'suspended' | 'deleted'
 * }
 * 
 * userCredentials/{userId} {
 *   email: string,
 *   passwordHash: string,
 *   salt: string,
 *   lastPasswordChange: string (ISO),
 *   failedLoginAttempts: number,
 *   lockedUntil: string (ISO) | null,
 *   securityQuestions: array,
 *   twoFactorEnabled: boolean,
 *   backupCodes: array
 * }
 * 
 * userSessions/{sessionId} {
 *   userId: string,
 *   deviceInfo: object,
 *   ipAddress: string,
 *   userAgent: string,
 *   createdAt: string (ISO),
 *   lastActivity: string (ISO),
 *   isActive: boolean
 * }
 */

// User Management Functions
export const createUserProfile = async (userId, userData) => {
  try {
    const userProfile = {
      email: userData.email,
      displayName: userData.displayName || '',
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      photoURL: userData.photoURL || '',
      provider: userData.provider || 'email',
      isEmailVerified: userData.isEmailVerified || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      profile: {
        bio: '',
        country: '',
        preferences: {},
        interests: []
      },
      settings: {
        notifications: true,
        privacy: {
          showEmail: false,
          showProfile: true
        },
        theme: 'light'
      },
      status: 'active'
    };

    await setDoc(doc(db, USERS_COLLECTION, userId), userProfile);
    return userProfile;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, USERS_COLLECTION, userId));
    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (userId, updates) => {
  try {
    const updateData = {
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    await updateDoc(doc(db, USERS_COLLECTION, userId), updateData);
    return updateData;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export const updateLastLogin = async (userId) => {
  try {
    await updateDoc(doc(db, USERS_COLLECTION, userId), {
      lastLoginAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating last login:', error);
    throw error;
  }
};

// Credential Management Functions
export const createUserCredentials = async (userId, email, password) => {
  try {
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);
    
    const credentials = {
      email: email.toLowerCase(),
      passwordHash,
      salt,
      lastPasswordChange: new Date().toISOString(),
      failedLoginAttempts: 0,
      lockedUntil: null,
      securityQuestions: [],
      twoFactorEnabled: false,
      backupCodes: []
    };

    await setDoc(doc(db, USER_CREDENTIALS_COLLECTION, userId), credentials);
    return true;
  } catch (error) {
    console.error('Error creating user credentials:', error);
    throw error;
  }
};

export const verifyUserCredentials = async (email, password) => {
  try {
    // First, find user by email
    const userQuery = query(
      collection(db, USERS_COLLECTION),
      where('email', '==', email.toLowerCase()),
      limit(1)
    );
    
    const userSnapshot = await getDocs(userQuery);
    
    if (userSnapshot.empty) {
      return { success: false, error: 'User not found' };
    }
    
    const userDoc = userSnapshot.docs[0];
    const userId = userDoc.id;
    const userData = userDoc.data();
    
    // Check if account is locked or suspended
    if (userData.status === 'suspended') {
      return { success: false, error: 'Account suspended' };
    }
    
    // Get user credentials
    const credentialsDoc = await getDoc(doc(db, USER_CREDENTIALS_COLLECTION, userId));
    
    if (!credentialsDoc.exists()) {
      return { success: false, error: 'Invalid credentials' };
    }
    
    const credentials = credentialsDoc.data();
    
    // Check if account is locked
    if (credentials.lockedUntil && new Date(credentials.lockedUntil) > new Date()) {
      return { success: false, error: 'Account temporarily locked' };
    }
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, credentials.passwordHash);
    
    if (!isPasswordValid) {
      // Increment failed login attempts
      const newFailedAttempts = credentials.failedLoginAttempts + 1;
      const updateData = { failedLoginAttempts: newFailedAttempts };
      
      // Lock account after 5 failed attempts for 30 minutes
      if (newFailedAttempts >= 5) {
        updateData.lockedUntil = new Date(Date.now() + 30 * 60 * 1000).toISOString();
      }
      
      await updateDoc(doc(db, USER_CREDENTIALS_COLLECTION, userId), updateData);
      return { success: false, error: 'Invalid credentials' };
    }
    
    // Reset failed login attempts on successful login
    if (credentials.failedLoginAttempts > 0) {
      await updateDoc(doc(db, USER_CREDENTIALS_COLLECTION, userId), {
        failedLoginAttempts: 0,
        lockedUntil: null
      });
    }
    
    // Update last login
    await updateLastLogin(userId);
    
    return { 
      success: true, 
      userId, 
      userData: {
        ...userData,
        lastLoginAt: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error('Error verifying credentials:', error);
    throw error;
  }
};

export const checkEmailExists = async (email) => {
  try {
    const userQuery = query(
      collection(db, USERS_COLLECTION),
      where('email', '==', email.toLowerCase()),
      limit(1)
    );
    
    const snapshot = await getDocs(userQuery);
    return !snapshot.empty;
  } catch (error) {
    console.error('Error checking email existence:', error);
    throw error;
  }
};

export const changePassword = async (userId, currentPassword, newPassword) => {
  try {
    const credentialsDoc = await getDoc(doc(db, USER_CREDENTIALS_COLLECTION, userId));
    
    if (!credentialsDoc.exists()) {
      return { success: false, error: 'User credentials not found' };
    }
    
    const credentials = credentialsDoc.data();
    
    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, credentials.passwordHash);
    
    if (!isCurrentPasswordValid) {
      return { success: false, error: 'Current password is incorrect' };
    }
    
    // Hash new password
    const salt = await bcrypt.genSalt(12);
    const newPasswordHash = await bcrypt.hash(newPassword, salt);
    
    // Update credentials
    await updateDoc(doc(db, USER_CREDENTIALS_COLLECTION, userId), {
      passwordHash: newPasswordHash,
      salt,
      lastPasswordChange: new Date().toISOString(),
      failedLoginAttempts: 0,
      lockedUntil: null
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
};

// Session Management Functions
export const createUserSession = async (userId, deviceInfo = {}) => {
  try {
    const sessionId = `session_${userId}_${Date.now()}`;
    const sessionData = {
      userId,
      deviceInfo: {
        browser: deviceInfo.browser || 'Unknown',
        os: deviceInfo.os || 'Unknown',
        device: deviceInfo.device || 'Unknown'
      },
      ipAddress: deviceInfo.ipAddress || 'Unknown',
      userAgent: deviceInfo.userAgent || navigator.userAgent,
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      isActive: true
    };
    
    await setDoc(doc(db, USER_SESSIONS_COLLECTION, sessionId), sessionData);
    return sessionId;
  } catch (error) {
    console.error('Error creating user session:', error);
    throw error;
  }
};

export const updateSessionActivity = async (sessionId) => {
  try {
    await updateDoc(doc(db, USER_SESSIONS_COLLECTION, sessionId), {
      lastActivity: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error updating session activity:', error);
    throw error;
  }
};

export const endUserSession = async (sessionId) => {
  try {
    await updateDoc(doc(db, USER_SESSIONS_COLLECTION, sessionId), {
      isActive: false,
      endedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error ending user session:', error);
    throw error;
  }
};

export const getUserSessions = async (userId) => {
  try {
    const sessionsQuery = query(
      collection(db, USER_SESSIONS_COLLECTION),
      where('userId', '==', userId),
      where('isActive', '==', true),
      orderBy('lastActivity', 'desc')
    );
    
    const snapshot = await getDocs(sessionsQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting user sessions:', error);
    throw error;
  }
};

// Admin Functions
export const getAllUsers = async (pageSize = 20, lastDoc = null) => {
  try {
    let userQuery = query(
      collection(db, USERS_COLLECTION),
      orderBy('createdAt', 'desc'),
      limit(pageSize)
    );
    
    if (lastDoc) {
      userQuery = query(
        collection(db, USERS_COLLECTION),
        orderBy('createdAt', 'desc'),
        startAfter(lastDoc),
        limit(pageSize)
      );
    }
    
    const snapshot = await getDocs(userQuery);
    return {
      users: snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })),
      lastDoc: snapshot.docs[snapshot.docs.length - 1]
    };
  } catch (error) {
    console.error('Error getting all users:', error);
    throw error;
  }
};

export const searchUsers = async (searchTerm) => {
  try {
    const userQuery = query(
      collection(db, USERS_COLLECTION),
      where('email', '>=', searchTerm.toLowerCase()),
      where('email', '<=', searchTerm.toLowerCase() + '\uf8ff'),
      limit(10)
    );
    
    const snapshot = await getDocs(userQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    // Soft delete - update status instead of actually deleting
    await updateDoc(doc(db, USERS_COLLECTION, userId), {
      status: 'deleted',
      updatedAt: new Date().toISOString()
    });
    
    // End all active sessions
    const sessions = await getUserSessions(userId);
    const sessionPromises = sessions.map(session => endUserSession(session.id));
    await Promise.all(sessionPromises);
    
    return true;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// Utility Functions
export const generateSecureToken = () => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15) +
         Date.now().toString(36);
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const sanitizeUserData = (userData) => {
  const sanitized = { ...userData };
  
  // Remove sensitive fields
  delete sanitized.passwordHash;
  delete sanitized.salt;
  delete sanitized.securityQuestions;
  delete sanitized.backupCodes;
  
  return sanitized;
};