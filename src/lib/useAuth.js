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

    // Authentication actions
    login: auth.login,
    logout: auth.logout,
    refreshAuth: auth.refreshAuth,
    updateUser: auth.updateUser,

    // Utility functions
    shouldRefreshToken: auth.shouldRefreshToken,
  };
};

export default useAuth;