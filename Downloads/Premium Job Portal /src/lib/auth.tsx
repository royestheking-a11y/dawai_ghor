
import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, User } from './db';

interface AuthContextType {
  user: User | null;
  login: (email: string, password?: string) => Promise<User | null>;
  signup: (userData: Omit<User, 'id' | 'createdAt'>) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize DB
    const mockDB = db; // ensure db is imported and active
    mockDB.init();
    
    // Check for session
    const storedUser = localStorage.getItem('session_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password?: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In a real app, db would be a server. Here we check the local "db".
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: User) => u.email === email);

    if (foundUser) {
      // Basic password check (if password was provided)
      if (password && foundUser.password !== password) {
         return null;
      }

      setUser(foundUser);
      localStorage.setItem('session_user', JSON.stringify(foundUser));
      return foundUser;
    }
    return null;
  };

  const signup = async (userData: Omit<User, 'id' | 'createdAt'>) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      // Check if user already exists
      const existingUser = db.getUserByEmail(userData.email);
      if (existingUser) {
        return false; // Email already taken
      }

      // Create user in DB but DO NOT log them in automatically
      db.createUser(userData);
      
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('session_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
