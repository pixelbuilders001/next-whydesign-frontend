"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { tokenStorage } from './tokenStorage';

// Create the authentication context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = tokenStorage.getAccessToken();
        const userData = tokenStorage.getUserData();

        if (token && tokenStorage.isAuthenticated()) {
          setAccessToken(token);
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          // Clear any invalid tokens
          tokenStorage.clearTokens();
          setAccessToken(null);
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        tokenStorage.clearTokens();
        setAccessToken(null);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = useCallback(async (email, password) => {
    try {
      setIsLoading(true);

      // Import here to avoid circular dependency
      const { loginUser } = await import('./authService');

      const result = await loginUser(email, password);
      console.log("Login result:", result);

      if (result.success && result.data) {
        console.log("Processing login success, data keys:", Object.keys(result.data));

        // Handle different response structures
        let tokenData = null;
        if (result.data.data?.accessToken && result.data.data?.refreshToken) {
          tokenData = result.data.data;
        } else if (result.data.accessToken && result.data.refreshToken) {
          tokenData = result.data;
        }

        if (tokenData) {
          const { accessToken, refreshToken, user: userData } = tokenData;
          console.log("Token data extracted:", {
            hasAccessToken: !!accessToken,
            hasRefreshToken: !!refreshToken,
            hasUserData: !!userData
          });

          // Store tokens
          const stored = tokenStorage.setTokens(accessToken, refreshToken, userData);
          console.log("Tokens stored:", stored);

          // Update state
          setAccessToken(accessToken);
          setUser(userData);
          setIsAuthenticated(true);

          return {
            success: true,
            user: userData,
            message: result.message || 'Login successful'
          };
        } else {
          console.error("No token data found in response");
          return {
            success: false,
            message: 'No authentication tokens received'
          };
        }
      } else {
        console.error("Login failed:", result);
        return {
          success: false,
          message: result.message || 'Login failed'
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.message || 'Login failed'
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    try {
      setIsLoading(true);

      // Clear tokens and state locally (no API call needed)
      tokenStorage.clearTokens();
      setAccessToken(null);
      setUser(null);
      setIsAuthenticated(false);

      return {
        success: true,
        message: 'Logged out successfully'
      };
    } catch (error) {
      console.error('Logout error:', error);
      return {
        success: false,
        message: error.message || 'Logout failed'
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Refresh token function
  const refreshAuth = useCallback(async () => {
    try {
      const newTokens = await tokenStorage.refreshToken();
      setAccessToken(newTokens.accessToken);

      // Update user data if provided in refresh response
      const userData = tokenStorage.getUserData();
      setUser(userData);

      return {
        success: true,
        accessToken: newTokens.accessToken
      };
    } catch (error) {
      console.error('Token refresh error:', error);
      // If refresh fails, logout the user
      await logout();
      return {
        success: false,
        message: 'Session expired. Please login again.'
      };
    }
  }, [logout]);

  // Update user data
  const updateUser = useCallback((userData) => {
    setUser(userData);
    tokenStorage.setTokens(accessToken, tokenStorage.getRefreshToken(), userData);
  }, [accessToken]);

  // Check if token needs refresh
  const shouldRefreshToken = useCallback(() => {
    if (!accessToken) return false;

    try {
      const tokenPayload = tokenStorage.decodeToken(accessToken);
      if (!tokenPayload?.exp) return false;

      const now = Math.floor(Date.now() / 1000);
      const timeUntilExpiry = tokenPayload.exp - now;

      // Refresh if token expires in less than 5 minutes
      return timeUntilExpiry < 300;
    } catch (error) {
      console.error('Error checking token expiry:', error);
      return false;
    }
  }, [accessToken]);

  // Auto-refresh token when needed
  useEffect(() => {
    if (!isAuthenticated || !accessToken) return;

    const checkAndRefreshToken = async () => {
      if (shouldRefreshToken()) {
        await refreshAuth();
      }
    };

    // Check every minute
    const interval = setInterval(checkAndRefreshToken, 60000);

    return () => clearInterval(interval);
  }, [isAuthenticated, accessToken, shouldRefreshToken, refreshAuth]);

  // Context value
  const value = {
    // State
    isAuthenticated,
    user,
    isLoading,
    accessToken,

    // Actions
    login,
    logout,
    refreshAuth,
    updateUser,

    // Utilities
    shouldRefreshToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;