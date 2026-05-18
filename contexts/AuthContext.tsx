'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '@/lib/api';
import Cookies from 'js-cookie';

interface User {
  id: string;
  email: string;
  role: string;
  isEmailVerified: boolean;
  hasProfile?: boolean;
  profileComplete?: boolean;
  profileApproved?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(false);

  // Check if user is logged in on mount (only once)
  useEffect(() => {
    if (!checkingAuth) {
      checkAuth();
    }
  }, []);

  const checkAuth = async () => {
    // Prevent multiple simultaneous checks
    if (checkingAuth) {
      console.log('⏸️ [FRONTEND] Auth check already in progress, skipping...');
      return;
    }

    setCheckingAuth(true);
    
    try {
      console.log('🔍 [FRONTEND] Checking authentication...');
      
      // Check localStorage first (backup storage)
      const storedToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const cookieToken = Cookies.get('token');
      
      console.log('🔍 [FRONTEND] Token check:', {
        hasStoredToken: !!storedToken,
        hasCookieToken: !!cookieToken,
        storedTokenLength: storedToken?.length || 0
      });

      // Only make API call if we have a token
      if (!storedToken && !cookieToken) {
        console.log('⚠️ [FRONTEND] No token found, skipping auth check');
        setUser(null);
        setLoading(false);
        setCheckingAuth(false);
        return;
      }

      // Try to get user info (token will be sent via Authorization header)
      const response = await api.get('/auth/me');
      
      console.log('✅ [FRONTEND] Auth check response:', response.data.success);
      
      if (response.data.success) {
        console.log('✅ [FRONTEND] User authenticated:', response.data.user.email);
        setUser(response.data.user);
      }
    } catch (error: any) {
      console.error('❌ [FRONTEND] Auth check failed:', error.response?.status, error.message);
      
      // Only clear tokens if it's a 401 (unauthorized), not if it's a network error
      if (error.response?.status === 401) {
        // Clear any stored tokens
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
        }
        Cookies.remove('token');
        setUser(null);
      }
    } finally {
      setLoading(false);
      setCheckingAuth(false);
      console.log('🔍 [FRONTEND] Auth check complete');
    }
  };

  const login = async (email: string, password: string): Promise<User> => {
    console.log('🔐 [FRONTEND] Attempting login for:', email);
    
    try {
      const response = await api.post('/auth/login', { email, password });
      
      if (response.data.success && response.data.token) {
        console.log('✅ [FRONTEND] Login successful');
        
        // Token is set as HTTP-only cookie by backend (automatic)
        // Also store token in localStorage as backup (from response body)
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', response.data.token);
          console.log('💾 [FRONTEND] Token stored in localStorage, length:', response.data.token.length);
        }
        
        setUser(response.data.user);
        console.log('✅ [FRONTEND] User state updated:', response.data.user.email);
        return response.data.user;
      } else {
        throw new Error('Login failed: No token received');
      }
    } catch (error: any) {
      console.error('❌ [FRONTEND] Login error:', error.response?.data || error.message);
      throw error;
    }
  };

  const register = async (email: string, password: string) => {
    console.log('🔐 [FRONTEND] Attempting registration for:', email);
    
    try {
      const response = await api.post('/auth/register', { email, password });
      
      if (response.data.success && response.data.token) {
        console.log('✅ [FRONTEND] Registration successful');
        
        // Token is set as HTTP-only cookie by backend (automatic)
        // Also store token in localStorage as backup (from response body)
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', response.data.token);
          console.log('💾 [FRONTEND] Token stored in localStorage, length:', response.data.token.length);
        }
        
        setUser(response.data.user);
        console.log('✅ [FRONTEND] User state updated:', response.data.user.email);
      } else {
        throw new Error('Registration failed: No token received');
      }
    } catch (error: any) {
      console.error('❌ [FRONTEND] Registration error:', error.response?.data || error.message);
      throw error;
    }
  };

  const logout = async () => {
    console.log('🚪 [FRONTEND] Logging out...');
    
    try {
      await api.post('/auth/logout');
      console.log('✅ [FRONTEND] Logout API call successful');
    } catch (error) {
      console.error('❌ [FRONTEND] Logout error:', error);
    } finally {
      // Clear all tokens
      Cookies.remove('token');
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
      setUser(null);
      console.log('🧹 [FRONTEND] Tokens cleared, redirecting to login');
      
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
    }
  };

  const refreshUser = async () => {
    try {
      const response = await api.get('/auth/me');
      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Refresh user error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

