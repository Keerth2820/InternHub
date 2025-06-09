import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from '../firebase';

type AppUser = {
  uid: string;
  name: string;
  email: string;
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser && firebaseUser.displayName && firebaseUser.email) {
        const [name, role] = firebaseUser.displayName.split('_');
        const appUser: AppUser = {
          uid: firebaseUser.uid,
          name: name,
          email: firebaseUser.email,
          role: role as 'student' | 'company',
        };
        setUser(appUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signup = async (data: SignupData) => {
    // 1. Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
    const firebaseUser = userCredential.user;

    // 2. Update the Firebase profile. This is the source of truth for name/role.
    await updateProfile(firebaseUser, {
      displayName: `${data.name}_${data.role}`
    });

    // --- THIS IS THE CRUCIAL CHANGE ---
    // 3. Manually create and set the user object immediately after signup.
    // We will not wait for onAuthStateChanged. This forces an immediate state update.
    const appUser: AppUser = {
        uid: firebaseUser.uid,
        name: data.name,
        email: data.email,
        role: data.role,
    };
    setUser(appUser);

    // 4. Send data to your backend in the background. We don't need to wait for it.
    firebaseUser.getIdToken().then(token => {
        fetch('http://127.0.0.1:5000/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ name: data.name, email: data.email, role: data.role }),
        }).catch(err => console.error("Backend user creation failed:", err));
    });
  };

  const logout = async () => {
    await signOut(auth);
  };

  const value = { user, isLoading, login, signup, logout };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
