import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signup: (email: string, username: string, password: string, confirmPassword: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  // Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('smartstudy_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setAuthState({
          user: { ...user, createdAt: new Date(user.createdAt) },
          isAuthenticated: true,
          isLoading: false
        });
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('smartstudy_user');
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      // Simulate API call - in a real app, this would be an actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // For demo purposes, accept any email/password combination
      // In a real app, you'd validate against your backend
      if (!email || !password) {
        return { success: false, message: 'Email and password are required' };
      }

      // Create a mock user (in real app, this would come from your backend)
      const user: User = {
        id: Date.now().toString(),
        email: email.toLowerCase(),
        username: email.split('@')[0], // Use email prefix as username
        createdAt: new Date()
      };

      // Save user to localStorage
      localStorage.setItem('smartstudy_user', JSON.stringify(user));
      
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false
      });

      return { success: true, message: 'Login successful!' };
    } catch (error) {
      return { success: false, message: 'Login failed. Please try again.' };
    }
  };

  const signup = async (email: string, username: string, password: string, confirmPassword: string): Promise<{ success: boolean; message: string }> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Validation
      if (!email || !username || !password || !confirmPassword) {
        return { success: false, message: 'All fields are required' };
      }

      if (password !== confirmPassword) {
        return { success: false, message: 'Passwords do not match' };
      }

      if (password.length < 6) {
        return { success: false, message: 'Password must be at least 6 characters' };
      }

      if (username.length < 3) {
        return { success: false, message: 'Username must be at least 3 characters' };
      }

      // Check if user already exists (in real app, this would check your database)
      const existingUsers = JSON.parse(localStorage.getItem('smartstudy_users') || '[]');
      if (existingUsers.some((u: any) => u.email === email.toLowerCase())) {
        return { success: false, message: 'User with this email already exists' };
      }

      // Create new user
      const user: User = {
        id: Date.now().toString(),
        email: email.toLowerCase(),
        username: username.trim(),
        createdAt: new Date()
      };

      // Save user to users list and current user
      existingUsers.push(user);
      localStorage.setItem('smartstudy_users', JSON.stringify(existingUsers));
      localStorage.setItem('smartstudy_user', JSON.stringify(user));
      
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false
      });

      return { success: true, message: 'Account created successfully!' };
    } catch (error) {
      return { success: false, message: 'Signup failed. Please try again.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('smartstudy_user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  };

  const updateUser = (updates: Partial<User>) => {
    if (authState.user) {
      const updatedUser = { ...authState.user, ...updates };
      localStorage.setItem('smartstudy_user', JSON.stringify(updatedUser));
      setAuthState(prev => ({ ...prev, user: updatedUser }));
    }
  };

  const value: AuthContextType = {
    ...authState,
    login,
    signup,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
