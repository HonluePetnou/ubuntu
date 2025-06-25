# Firebase Setup Guide

This comprehensive guide will help you set up Firebase authentication, Firestore database, and Analytics for the Ubuntu project.

## Prerequisites

- A Google account
- Node.js and npm installed
- This project cloned and dependencies installed (`npm install`)
- Basic understanding of React and Firebase concepts

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name (e.g., "ubuntu-app")
4. **Enable Google Analytics** (recommended for tracking user engagement)
5. Select or create a Google Analytics account
6. Choose your Analytics location/region
7. Accept the terms and click "Create project"
8. Wait for project creation to complete

## Step 2: Set Up Authentication

1. In your Firebase project, go to **Authentication** in the left sidebar
2. Click on the **Sign-in method** tab
3. Enable **Email/Password** authentication:
   - Click on "Email/Password"
   - Toggle "Enable" to ON
   - Click "Save"

## Step 3: Set Up Firestore Database

1. Go to **Firestore Database** in the left sidebar
2. Click "Create database"
3. **For Development**: Choose "Start in test mode" (allows read/write access for 30 days)
4. **For Production**: Choose "Start in production mode" (requires security rules)
5. Select a location for your database (choose closest to your users)
6. Click "Done"

> **Note**: Test mode is perfect for development. You can update security rules later.

## Step 4: Firebase Analytics Setup (Optional)

1. In the Firebase console, go to **Analytics**
2. Click **Get started**
3. Follow the setup wizard to enable Google Analytics
4. Your `measurementId` will be automatically generated

## Step 5: Get Your Firebase Configuration

1. Go to **Project Settings** (gear icon in the left sidebar)
2. Scroll down to "Your apps" section
3. Click on the web icon (`</>`) to add a web app
4. Enter an app nickname (e.g., "ubuntu-web")
5. **Check** "Also set up Firebase Hosting" if you plan to deploy with Firebase
6. Click "Register app"
7. Copy the configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyBkDXzmK6p0iSdt93X7yQ-FGRy5LAWOFzw",
  authDomain: "ubuntu-df469.firebaseapp.com",
  projectId: "ubuntu-df469",
  storageBucket: "ubuntu-df469.firebasestorage.app",
  messagingSenderId: "679842770869",
  appId: "1:679842770869:web:820a1b2ba4d44f0e4d33fc",
  measurementId: "G-N0SXY6CLQZ" // Only if Analytics is enabled
};
```

> **Important**: The above credentials are examples from this project. Use your own Firebase project credentials.

## Step 6: Configure Your Local Environment

### Option 1: Use Environment Variables (Recommended for Production)

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open the `.env` file and replace the placeholder values with your actual Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your-actual-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

### Option 2: Use Default Configuration (Quick Start)

The project is pre-configured with working Firebase credentials. You can start development immediately without creating a `.env` file. The configuration in `src/firebase/config.js` includes fallback values that work out of the box.

> **Note**: For production deployment, always use your own Firebase project and environment variables.

## Step 7: Set Up Firestore Security Rules (Optional but Recommended)

1. Go to **Firestore Database** > **Rules**
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read and write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Add other collection rules as needed
  }
}
```

3. Click "Publish"

## Step 8: Test Your Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5173`
3. Test the authentication flow:
   - **Signup**: Navigate to `/signup` and create a new account
   - **Login**: Navigate to `/login` and sign in with your credentials
   - **Protected Routes**: Try accessing `/map` (should redirect to login if not authenticated)

4. Verify in Firebase Console:
   - **Authentication > Users**: Check if the user was created
   - **Firestore Database > Data**: Verify user profile data was stored
   - **Analytics > Events**: See real-time user activity (if Analytics enabled)

### Expected Behavior:
- ✅ Successful signup creates user in Authentication and Firestore
- ✅ Login redirects to intended page or `/map` by default
- ✅ Protected routes require authentication
- ✅ User data persists across browser sessions
- ✅ Analytics tracks page views and user interactions

## Step 9: Troubleshooting

### Common Issues:

1. **"Firebase: Error (auth/operation-not-allowed)"**
   - Make sure Email/Password authentication is enabled in Firebase Console

2. **"Firebase: Error (auth/invalid-api-key)"**
   - Check that your API key in `.env` is correct
   - Make sure you're using `VITE_` prefix for environment variables

3. **"Firebase: Error (auth/project-not-found)"**
   - Verify your project ID is correct in `.env`

4. **Environment variables not loading**
   - Restart your development server after changing `.env`
   - Make sure `.env` is in the project root directory
   - Ensure variable names start with `VITE_`

### Security Notes:

- Never commit your `.env` file to version control
- The `.env` file is already added to `.gitignore`
- For production deployment, set environment variables in your hosting platform
- Consider setting up Firebase App Check for additional security

## Features Implemented

### 🔐 Authentication
✅ **User Registration**: Multi-step signup with personal info, contact details, and security  
✅ **User Login**: Email/password authentication with remember me  
✅ **Password Reset**: Send password reset emails  
✅ **User Profile Management**: Update display names and profile info  
✅ **Smart Redirects**: Redirect users based on authentication state  

### 🗄️ Database Integration
✅ **User Profile Storage**: Store additional user data in Firestore  
✅ **Known Emails Tracking**: Track registered emails for validation  
✅ **Real-time Data**: Firestore real-time listeners for user data  

### 📊 Analytics & Monitoring
✅ **Firebase Analytics**: Track user engagement and app performance  
✅ **Custom Events**: Monitor signup, login, and navigation events  
✅ **User Journey Tracking**: Understand user behavior patterns  

### 🎨 User Experience
✅ **Form Validation**: Client-side validation with helpful error messages  
✅ **Loading States**: Visual feedback during authentication processes  
✅ **Error Handling**: Comprehensive Firebase error message handling  
✅ **Responsive Design**: Mobile-friendly authentication forms  
✅ **Progressive Enhancement**: Works with and without JavaScript  

### 🔒 Security
✅ **Environment Variables**: Secure credential management  
✅ **Protected Routes**: Route-level authentication guards  
✅ **Input Sanitization**: Prevent XSS and injection attacks  
✅ **Firestore Security Rules**: Database-level access control  

## Next Steps & Recommendations

### Immediate Enhancements
1. **Email Verification**: Implement email verification for new accounts
2. **Social Authentication**: Add Google, Facebook, or GitHub login options
3. **Profile Pictures**: Allow users to upload and manage profile images
4. **Account Settings**: Create a comprehensive user settings page

### Advanced Features
5. **Two-Factor Authentication**: Add 2FA for enhanced security
6. **Role-Based Access Control**: Implement user roles and permissions
7. **Audit Logging**: Track user actions for security and compliance
8. **Data Export**: Allow users to export their data (GDPR compliance)

### Performance & Monitoring
9. **Error Tracking**: Integrate Sentry or similar for error monitoring
10. **Performance Monitoring**: Use Firebase Performance Monitoring
11. **A/B Testing**: Implement Firebase Remote Config for feature flags
12. **Push Notifications**: Add Firebase Cloud Messaging for engagement

### Production Readiness
13. **Security Rules**: Implement comprehensive Firestore security rules
14. **Backup Strategy**: Set up automated database backups
15. **Monitoring Alerts**: Configure alerts for authentication failures
16. **Load Testing**: Test authentication flow under high load

- Set up password reset functionality
- Add social authentication (Google, Facebook, etc.)
- Implement user profile editing
- Add email verification
- Set up proper error logging

For more information, visit the [Firebase Documentation](https://firebase.google.com/docs).