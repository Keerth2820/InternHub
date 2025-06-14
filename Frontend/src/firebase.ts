import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2eLjcQRpO_OGdd_nBn74uAVcOnEb0RkA",
  authDomain: "internhub-b9d59.firebaseapp.com",
  projectId: "internhub-b9d59",
  storageBucket: "internhub-b9d59.firebasestorage.app",
  messagingSenderId: "880402567178",
  appId: "1:880402567178:web:60fac3c100aa56bcea8ff3",
  measurementId: "G-WP8CMPEJ46"
}

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
