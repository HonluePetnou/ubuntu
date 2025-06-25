 import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Your Firebase configuration
// These values come from environment variables for security
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBkDXzmK6p0iSdt93X7yQ-FGRy5LAWOFzw",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "ubuntu-df469.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ubuntu-df469",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "ubuntu-df469.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "679842770869",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:679842770869:web:820a1b2ba4d44f0e4d33fc",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-N0SXY6CLQZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);

// Initialize Firebase Analytics and get a reference to the service
export const analytics = getAnalytics(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app;