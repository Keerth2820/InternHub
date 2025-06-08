import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
// This file must exist and export your initialized Firebase auth object
import { auth } from '../firebase';

// This is the user object for OUR application
type AppUser = {
  uid: string;
  name: string | null;
  email: string | null;
  role: 'student' | 'company';
};

type SignupData = {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'company';
};

type AuthContextType = {
  user: AppUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start true to check auth status on load

  // This listener is the core of Firebase auth persistence.
  // It runs once when the app loads and tells you if a user is already logged in.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is logged in.
        // In the future, you will fetch the user's role from your Flask backend here.
        // For now, we'll just assume a role.
        const appUser: AppUser = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || firebaseUser.email,
          email: firebaseUser.email,
          role: 'student', // TODO: Fetch role from your backend API
        };
        setUser(appUser);
      } else {
        // User is signed out.
        setUser(null);
      }
      // Finished checking, so we can stop the loading state.
      setIsLoading(false);
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // The onAuthStateChanged listener above will automatically update the user state.
    } catch (error) {
      console.error("Login failed:", error);
      throw error; // Re-throw the error so the Login page can display it
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: SignupData) => {
    setIsLoading(true);
    try {
      // Step 1: Create the user in Firebase's authentication system
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const firebaseUser = userCredential.user;

      // Step 2: Get the ID token to securely prove to our backend who this user is
      const token = await firebaseUser.getIdToken();

      // Step 3: Call our Flask backend to create a corresponding user profile in our own database
      const response = await fetch('http://127.0.0.1:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // This token is the "proof"
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          role: data.role,
        }),
      });

      if (!response.ok) {
        // If the backend fails, we should handle it
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create user profile on server.');
      }
      
      console.log("User successfully created on Firebase and in our backend DB.");
      // The onAuthStateChanged listener will handle setting the new user state.
    
    } catch (error) {
      console.error("Signup failed:", error);
      throw error; // Re-throw so the Signup page can display the error
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      // The onAuthStateChanged listener will set the user state to null automatically.
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const value = { user, isLoading, login, signup, logout };

  return (
    <AuthContext.Provider value={value}>
      {/* Don't render the app until we know if the user is logged in or not */}
      {!isLoading && children}
    </AuthContext.Provider>
  );
};