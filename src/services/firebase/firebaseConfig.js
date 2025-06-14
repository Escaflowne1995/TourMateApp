// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
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
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Storage and get a reference to the service
export const storage = getStorage(app);

export { app }; 