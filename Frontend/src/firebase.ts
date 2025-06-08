import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// --- IMPORTANT ---
// Replace this placeholder object with the REAL firebaseConfig object
// you copied from your Firebase project settings.
const firebaseConfig = {
  apiKey: "AIzaSyA2eLjcQRpO_OGdd_nBn74uAVcOnEb0RkA",
  authDomain: "internhub-b9d59.firebaseapp.com",
  projectId: "internhub-b9d59",
  storageBucket: "internhub-b9d59.firebasestorage.app",
  messagingSenderId: "880402567178",
  appId: "1:880402567178:web:60fac3c100aa56bcea8ff3",
  measurementId: "G-WP8CMPEJ46"
}

// Initialize Firebase with your configuration
const app = initializeApp(firebaseConfig);

// Get a reference to the Firebase authentication service
// The 'export' keyword makes this 'auth' object available to other files
export const auth = getAuth(app);
