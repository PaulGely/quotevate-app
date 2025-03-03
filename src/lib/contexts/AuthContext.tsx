"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, SignUpData, AuthContextType } from '@/lib/types/auth';
import { AUTH_STORAGE_KEY, DEMO_CREDENTIALS } from '@/lib/constants/auth';
import { 
  createUser, 
  getUserByEmail, 
  loginUser, 
  updateUserProfile, 
  logoutUser 
} from '@/lib/firebase/firebaseUtils';

const defaultAuthContext: AuthContextType = {
  isAuthenticated: false,
  user: null,
  login: async () => false,
  signup: async () => false,
  logout: () => {},
  updateProfile: async () => false,
  isAdmin: () => false,
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          // Verify user still exists in database
          const dbUser = await getUserByEmail(userData.email);
          if (dbUser) {
            setUser(dbUser);
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem(AUTH_STORAGE_KEY);
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    };

    initializeAuth();
  }, []);

  const updateAuthState = (userData: User | null) => {
    setUser(userData);
    setIsAuthenticated(!!userData);
    if (userData) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // Handle demo admin login
      if (username === DEMO_CREDENTIALS.username && password === DEMO_CREDENTIALS.password) {
        const userData: User = {
          username: DEMO_CREDENTIALS.username,
          firstName: 'Admin',
          lastName: 'User',
          email: 'admin@quotevate.com',
          role: 'admin',
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
          isActive: true
        };
        updateAuthState(userData);
        return true;
      }

      // Handle regular user login
      const userData = await loginUser(username, password);
      updateAuthState(userData);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (data: SignUpData): Promise<boolean> => {
    try {
      const userData = await createUser(data);
      updateAuthState(userData);
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      if (error instanceof Error && error.message === 'User already exists') {
        throw new Error('auth/email-already-in-use');
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      updateAuthState(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const success = await updateUserProfile(user.email, data);
      if (success) {
        const updatedUser = await getUserByEmail(user.email);
        if (updatedUser) {
          updateAuthState(updatedUser);
        }
      }
      return success;
    } catch (error) {
      console.error('Error updating profile:', error);
      return false;
    }
  };

  const isAdmin = (): boolean => {
    return user?.role === 'admin';
  };

  const contextValue: AuthContextType = {
    isAuthenticated,
    user,
    login,
    signup,
    logout,
    updateProfile,
    isAdmin
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
