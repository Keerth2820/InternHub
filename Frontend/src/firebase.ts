// src/firebase.ts

// Import the functions you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // We only need the auth function for now

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2eLJcQRp0_0Gdd_nBn74uAvcOnEb0RkA",
  authDomain: "internhub-b9d59.firebaseapp.com",
  projectId: "internhub-b9d59",
  storageBucket: "internhub-b9d59.firebaseapp.com",
  messagingSenderId: "880402567178",
  appId: "1:880402567178:web:60fac3c100aa56bcea8ff3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the auth service so other files (like AuthContext) can use it
export const auth = getAuth(app);