"use client";

import { useAuth as useAuthContext } from './AuthContext';

/**
 * Custom hook for accessing authentication state and functions
 * This is a convenience wrapper around the AuthContext
 */
export const useAuth = () => {
  const auth = useAuthContext();

  return {
    // Authentication state
    isAuthenticated: auth.isAuthenticated,
    user: auth.user,
    isLoading: auth.isLoading,
    accessToken: auth.accessToken,
    // showProfileModal: auth.showProfileModal,

    // Authentication actions
    login: auth.login,
    logout: auth.logout,
    refreshAuth: auth.refreshAuth,
    updateUser: auth.updateUser,
    getUserProfile: auth.getUserProfile,

    handleProfileComplete: auth.handleProfileComplete,
    handleProfileSkip: auth.handleProfileSkip,
    setShowProfileModal: auth.setShowProfileModal,  // ✅ Added


    // Utility functions
    shouldRefreshToken: auth.shouldRefreshToken,
  };
};

export default useAuth;