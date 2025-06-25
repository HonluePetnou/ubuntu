# Ubuntu Social - African Cultural Social Media Platform

Ubuntu Social is a Facebook-like social media platform focused on African culture, heritage, and community connections. Users can share their cultural experiences, connect with others across the African continent, and celebrate the rich diversity of African traditions.

## 🚀 Features

- **Social Feed**: Share posts, photos, and cultural experiences
- **Authentication**: Firebase-powered login with email/password and Google sign-in
- **Real-time Interactions**: Like, comment, and share posts
- **Cultural Focus**: Dedicated to African heritage and cultural exchange
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠 Tech Stack

- **Frontend**: React 19, Tailwind CSS
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ubuntu
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Setup**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password and Google providers)
   - Enable Firestore Database
   - Enable Storage
   - Copy your Firebase config

4. **Configure Firebase**
   - Update `src/firebase/config.js` with your Firebase configuration:
   ```javascript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "your-app-id"
   };
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 🏗 Project Structure

```
src/
├── components/
│   ├── auth/
│   │   └── LoginForm.jsx          # Authentication form
│   └── social/
│       └── SocialFeed.jsx         # Main social media feed
├── contexts/
│   └── AuthContext.jsx            # Authentication context
├── firebase/
│   └── config.js                  # Firebase configuration
├── pages/
│   └── SocialPage.jsx             # Main application page
├── App.jsx                        # Root component
└── main.jsx                       # Entry point
```

## 🔥 Firebase Configuration

### Authentication Setup
1. Go to Firebase Console → Authentication → Sign-in method
2. Enable Email/Password provider
3. Enable Google provider (optional)
4. Configure authorized domains

### Firestore Database Setup
1. Go to Firebase Console → Firestore Database
2. Create database in test mode (or production with proper rules)
3. Set up security rules as needed

### Storage Setup
1. Go to Firebase Console → Storage
2. Set up storage bucket
3. Configure security rules for file uploads

## 🎨 Key Components

### AuthContext
Manages user authentication state and provides login/logout functionality.

### LoginForm
Modal component for user registration and login with email/password and Google sign-in options.

### SocialFeed
Main feed component displaying posts with like, comment, and share functionality.

### SocialPage
Main application page that shows either the login interface or social feed based on authentication status.

## 🌍 Cultural Focus

This platform is specifically designed to celebrate African culture:
- Posts encourage sharing of cultural experiences
- Location tagging for African countries and cities
- Hashtags for cultural events and traditions
- Community building around African heritage

## 🚀 Getting Started

1. **For New Users**: Click "Join Ubuntu" to create an account
2. **For Existing Users**: Sign in with your credentials
3. **Share Content**: Create posts about your cultural experiences
4. **Engage**: Like, comment, and share posts from the community
5. **Connect**: Follow other users and build your cultural network

## 📱 Responsive Design

The platform is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🔒 Security

- Firebase Authentication for secure user management
- Protected routes for authenticated users only
- Secure file uploads through Firebase Storage
- Input validation and sanitization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the repository or contact the development team.

---

**Ubuntu Social** - Connecting African Culture, One Post at a Time 🌍
