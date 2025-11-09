"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { tokenStorage } from './tokenStorage';
import CompleteProfileModal from '../components/CompleteProfileModal';

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
  const [showProfileModal, setShowProfileModal] = useState(false);

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

          // Check if profile needs to be completed (only for first-time users)
          const profileCompleted = tokenStorage.getProfileCompleted();
          if (!profileCompleted) {
            // setShowProfileModal(true);
          }
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
        console.log("Login successful, checking stored tokens...");
        
        // Debug: Log the actual response data structure
        console.log("Response data keys:", Object.keys(result.data));
        if (result.data.data) {
          console.log("Response data.data keys:", Object.keys(result.data.data));
        }

        // Get stored authentication data (tokens are already stored by authService)
        const storedToken = tokenStorage.getAccessToken();
        const storedUser = tokenStorage.getUserData();
        console.log("Login successful, checking stored tokens...",storedUser);

        if (storedToken && storedUser) {
          console.log("Tokens and user data found in storage");

          // Update state with stored data
          setAccessToken(storedToken);
          setUser(storedUser);
          setIsAuthenticated(true);

          // Check if profile is completed, show modal if not
          const profileCompleted = tokenStorage.getProfileCompleted();
          const shouldShowProfileModal = !profileCompleted;

          if (shouldShowProfileModal) {
            // setShowProfileModal(true);
          }
// console.log("shouldShowProfileModal",storedUser)
          return {
            success: true,
            user: storedUser,
            message: result.data.message || result.message || 'Login successful',
            showProfileModal: shouldShowProfileModal
          };
        } else {
          console.error("Authentication data not found in storage after login");
          console.log("Debug info:", {
            storedToken: storedToken ? "present" : "not found",
            storedUser: storedUser ? "present" : "not found",
            tokenStorageType: typeof window !== 'undefined' ? 'localStorage' : 'memory'
          });

          // Debug: Check if we can write to storage at all
          try {
            const testKey = 'test_storage_' + Date.now();
            tokenStorage.storage.setItem(testKey, 'test');
            const testValue = tokenStorage.storage.getItem(testKey);
            tokenStorage.storage.removeItem(testKey);
            console.log("Storage test:", testValue === 'test' ? 'PASSED' : 'FAILED');
          } catch (storageError) {
            console.error("Storage test failed:", storageError);
          }

          // Fallback: Try to store tokens manually if authService failed
          console.log("Attempting manual token storage fallback...");
          if (result.data.token && result.data.refreshToken && result.data.user) {
            const manualStorage = tokenStorage.setTokens(result.data.token, result.data.refreshToken, result.data.user);
            if (manualStorage) {
              console.log("Manual token storage successful");
              setAccessToken(result.data.token);
              setUser(result.data.user);
              setIsAuthenticated(true);

              const profileCompleted = tokenStorage.getProfileCompleted();
              const shouldShowProfileModal = !profileCompleted;

              if (shouldShowProfileModal) {
                // setShowProfileModal(true);
              }

              return {
                success: true,
                user: result.data.user,
                message: result.data.message || result.message || 'Login successful',
                showProfileModal: shouldShowProfileModal
              };
            }
          }

          // Fallback 2: Try nested structure (result.data.data.token)
          console.log("Attempting nested structure fallback...");
          if (result.data.data?.token && result.data.data?.refreshToken && result.data.data?.user) {
            const manualStorage = tokenStorage.setTokens(result.data.data.token, result.data.data.refreshToken, result.data.data.user);
            if (manualStorage) {
              console.log("Nested structure manual token storage successful");
              setAccessToken(result.data.data.token);
              setUser(result.data.data.user);
              setIsAuthenticated(true);

              const profileCompleted = tokenStorage.getProfileCompleted();
              const shouldShowProfileModal = !profileCompleted;

              if (shouldShowProfileModal) {
                // setShowProfileModal(true);
              }

              return {
                success: true,
                user: result.data.data.user,
                message: result.data.data.message || result.data.message || result.message || 'Login successful',
                showProfileModal: shouldShowProfileModal
              };
            }
          }

          // Clear any partial data
          tokenStorage.clearTokens();

          return {
            success: false,
            message: 'Login failed - unable to store authentication data'
          };
        }
      } else {
        console.error("Login failed:", result);
        return {
          success: false,
          message: result.data?.message || result.message || 'Login failed'
        };
      }
    } catch (error) {
      console.error("Login error:", error);
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

  // Handle profile completion
  const handleProfileComplete = useCallback((profileData) => {
    // console.log('Profile completed with data:', profileData);

    // // Mark profile as completed to prevent showing again
    // tokenStorage.setProfileCompleted(true);
    // setShowProfileModal(false);

    // // Update user data with profile information if user is available
    // if (user) {
    //   const updatedUser = { ...user, ...profileData };
    //   setUser(updatedUser);
    //   tokenStorage.setTokens(accessToken, tokenStorage.getRefreshToken(), updatedUser);
    // }

    // console.log('Profile completion saved successfully');
  }, [user, accessToken]);

  // Handle profile skip
  const handleProfileSkip = useCallback(() => {
    console.log('Profile completion skipped');

    // Mark profile as completed (skipped) to prevent showing again
    tokenStorage.setProfileCompleted(true);
    setShowProfileModal(false);

    console.log('Profile completion skipped - will not show again');
  }, []);

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

// Get user profile data from API
const getUserProfile = useCallback(async () => {
  try {
    const { getUserProfile } = await import('./authService');
    const result = await getUserProfile();
    console.log("getUserProfile result", result);
    
    if (result.success && result.data) {
      // Update stored user data
      setUser(result.data);
      tokenStorage.setTokens(accessToken, tokenStorage.getRefreshToken(), result.data);
      
      return { success: true, user: result.data };
    }
    return { success: false, message: result.message };
  } catch (error) {
    return { success: false, message: error.message };
  }
}, [accessToken]);



  // Context value
  const value = {
    // State
    isAuthenticated,
    getUserProfile,
    user,
    isLoading,
    accessToken,

    // Actions
    login,
    logout,
    refreshAuth,
    updateUser,

    // Profile modal functions
    // handleProfileComplete,
    handleProfileSkip,
    setShowProfileModal,

    // Utilities
    shouldRefreshToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}

      {/* Profile Completion Modal */}
      <CompleteProfileModal
        open={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        // onProfileComplete={handleProfileComplete}
        onSkip={handleProfileSkip}
      />
    </AuthContext.Provider>
  );
};

export default AuthContext;