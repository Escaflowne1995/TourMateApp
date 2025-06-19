import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZSM44g_4krJ8zbeQMlwQJF7VvcDa09vM",
  authDomain: "tourismapp-82791.firebaseapp.com",
  projectId: "tourismapp-82791",
  storageBucket: "tourismapp-82791.firebasestorage.app",
  messagingSenderId: "830491999664",
  appId: "1:830491999664:web:38ff52fa6fe313be01aa75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with AsyncStorage persistence
let auth;
try {
  // Check if AsyncStorage is available before using persistence
  if (AsyncStorage && getReactNativePersistence) {
    const persistence = getReactNativePersistence(AsyncStorage);
    if (persistence) {
      auth = initializeAuth(app, {
        persistence: persistence
      });
    } else {
      console.warn('React Native persistence not available, using default auth');
      auth = initializeAuth(app);
    }
  } else {
    console.warn('AsyncStorage not available, using default auth');
    auth = initializeAuth(app);
  }
} catch (error) {
  // If initializeAuth fails (e.g., already initialized), get the existing auth instance
  console.log('Auth already initialized or failed, using existing instance:', error.message);
  try {
    auth = getAuth(app);
  } catch (getAuthError) {
    console.error('Failed to get auth instance:', getAuthError.message);
    // Fallback to basic auth initialization
    auth = initializeAuth(app);
  }
}

export { auth };

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Storage and get a reference to the service
export const storage = getStorage(app);

export { app }; 