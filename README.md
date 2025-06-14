# Cebu Tourist App

A React Native/Expo application for exploring Cebu's attractions, local delicacies, and travel experiences.

## 📁 Project Structure

```
TouristApp/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── common/          # Common components (Logo, etc.)
│   │   ├── modals/          # Modal components (RatingModal, etc.)
│   │   └── forms/           # Form-related components
│   │
│   ├── screens/             # Application screens
│   │   ├── auth/           # Authentication screens (Login, Signup, Landing)
│   │   ├── main/           # Main app screens (Home, Search, AttractionDetails)
│   │   ├── profile/        # Profile-related screens (Profile, EditProfile, Reviews, etc.)
│   │   └── settings/       # Settings screens (Settings, Language, Help)
│   │
│   ├── navigation/         # Navigation configuration
│   │   ├── AppNavigator.js    # Main app navigator
│   │   ├── AuthNavigator.js   # Authentication flow navigator
│   │   └── MainNavigator.js   # Bottom tab navigator
│   │
│   ├── services/           # External services and APIs
│   │   ├── firebase/       # Firebase configuration and services
│   │   ├── api/           # API service calls
│   │   └── storage/       # Local storage services
│   │
│   ├── utils/             # Utility functions and helpers
│   │   └── imageMap.js    # Image asset mapping
│   │
│   ├── styles/            # Styling and theming
│   │   ├── colors.js      # Color palette
│   │   └── globalStyles.js # Global styles
│   │
│   ├── hooks/             # Custom React hooks
│   └── contexts/          # React Context providers
│
├── assets/                # Static assets
│   └── images/           # Image assets
│
├── docs/                 # Documentation
│   └── ACCESSIBILITY_GUIDE.md
│
├── __tests__/            # Test files
│   ├── components/
│   ├── screens/
│   └── utils/
│
├── App.js               # Root component
├── index.js             # Entry point
└── package.json         # Dependencies and scripts
```

## 🚀 Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Use Expo Go app or run on simulator:
   - Scan QR code with Expo Go (mobile)
   - Press 'i' for iOS simulator
   - Press 'a' for Android emulator

## 🏗️ Architecture Benefits

- **Scalability**: Easy to add new features without cluttering
- **Maintainability**: Related files are grouped together
- **Collaboration**: Team members can easily find and work on specific parts
- **Testing**: Clear separation makes testing easier
- **Reusability**: Components and utilities are organized for reuse

## 📱 Features

- User authentication (Login/Signup)
- Browse Cebu attractions and destinations
- Search functionality
- User profiles and reviews
- Travel history
- Favorite spots
- Multi-language support
- Accessibility features

## 🛠️ Tech Stack

- React Native with Expo
- Firebase (Authentication, Firestore, Storage)
- React Navigation
- Formik & Yup (Form handling)
- Expo LinearGradient
- Expo ImagePicker

## 📝 Notes

- Firebase configuration is located in `src/services/firebase/`
- All screen components now import Firebase from the services directory
- Image assets are managed through `src/utils/imageMap.js`
- Global styling constants are available in `src/styles/` 