// Token storage utility for managing authentication tokens
const TOKEN_KEYS = {
  ACCESS_TOKEN: 'auth_access_token',
  REFRESH_TOKEN: 'auth_refresh_token',
  USER_DATA: 'auth_user_data',
  TOKEN_EXPIRY: 'auth_token_expiry',
  PROFILE_COMPLETED: 'auth_profile_completed',
};

// Storage type enum
export const StorageType = {
  LOCAL: 'localStorage',
  SESSION: 'sessionStorage',
  MEMORY: 'memory',
};

// In-memory storage fallback
const memoryStorage = new Map();

class TokenStorage {
  constructor(storageType = StorageType.LOCAL) {
    this.storageType = storageType;
    this.storage = this.getStorage();
  }

  getStorage() {
    if (typeof window === 'undefined') {
      return memoryStorage;
    }

    switch (this.storageType) {
      case StorageType.LOCAL:
        return window.localStorage;
      case StorageType.SESSION:
        return window.sessionStorage;
      case StorageType.MEMORY:
      default:
        return memoryStorage;
    }
  }

  // Store tokens securely
  setTokens(accessToken, refreshToken, userData = null) {
    try {
      console.log("setTokens called with:", {
        accessToken: accessToken ? "present" : "undefined",
        refreshToken: refreshToken ? "present" : "undefined",
        userData: userData
      });

      // Validate tokens exist
      if (!accessToken || !refreshToken) {
        console.error("Missing tokens:", { accessToken: !!accessToken, refreshToken: !!refreshToken });
        return false;
      }

      // Decode token to get expiry time
      const tokenPayload = this.decodeToken(accessToken);
      const expiryTime = tokenPayload?.exp ? tokenPayload.exp * 1000 : null; // Convert to milliseconds

      // Store tokens
      this.storage.setItem(TOKEN_KEYS.ACCESS_TOKEN, accessToken);
      this.storage.setItem(TOKEN_KEYS.REFRESH_TOKEN, refreshToken);

      if (expiryTime) {
        this.storage.setItem(TOKEN_KEYS.TOKEN_EXPIRY, expiryTime.toString());
      }

      if (userData) {
        this.storage.setItem(TOKEN_KEYS.USER_DATA, JSON.stringify(userData));
      }

      console.log("Tokens stored successfully");
      return true;
    } catch (error) {
      console.error('Error storing tokens:', error);
      return false;
    }
  }

  // Get access token
  getAccessToken() {
    return this.storage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
  }

  // Get refresh token
  getRefreshToken() {
    return this.storage.getItem(TOKEN_KEYS.REFRESH_TOKEN);
  }

  // Get user data
  getUserData() {
    try {
      const userData = this.storage.getItem(TOKEN_KEYS.USER_DATA);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }

  // Get token expiry time
  getTokenExpiry() {
    const expiry = this.storage.getItem(TOKEN_KEYS.TOKEN_EXPIRY);
    return expiry ? parseInt(expiry) : null;
  }

  // Check if token is expired
  isTokenExpired() {
    const expiry = this.getTokenExpiry();
    if (!expiry) return true;

    const now = Date.now();
    // Add 5 minute buffer before actual expiry
    return now >= (expiry - 5 * 60 * 1000);
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = this.getAccessToken();
    return token && !this.isTokenExpired();
  }

  // Set profile completion status
  setProfileCompleted(completed = true) {
    try {
      this.storage.setItem(TOKEN_KEYS.PROFILE_COMPLETED, completed.toString());
      return true;
    } catch (error) {
      // console.error('Error setting profile completion status:', error);
      return false;
    }
  }

  // Get profile completion status
  getProfileCompleted() {
    try {
      const completed = this.storage.getItem(TOKEN_KEYS.PROFILE_COMPLETED);
      return completed === 'true';
    } catch (error) {
      console.error('Error getting profile completion status:', error);
      return false;
    }
  }

  // Decode JWT token
  decodeToken(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  // Clear all stored tokens and data
  clearTokens() {
    try {
      Object.entries(TOKEN_KEYS).forEach(([name, key]) => {
        if (name !== 'PROFILE_COMPLETED') {
          this.storage.removeItem(key);
        }
      });
      return true;
    } catch (error) {
      console.error('Error clearing tokens:', error);
      return false;
    }
  }

  // Refresh token by making API call
  async refreshToken() {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/user/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${refreshToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const data = await response.json();

      if (data.success && data.data) {
        const { accessToken, refreshToken: newRefreshToken } = data.data;
        this.setTokens(accessToken, newRefreshToken);
        return { accessToken, refreshToken: newRefreshToken };
      } else {
        throw new Error('Invalid refresh response');
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      this.clearTokens();
      throw error;
    }
  }
}

// Create and export singleton instance
export const tokenStorage = new TokenStorage(StorageType.LOCAL);

// Export class for custom instances if needed
export { TokenStorage };

// Utility function to debug stored tokens
export const debugStoredTokens = () => {
  if (typeof window === 'undefined') {
    console.log("debugStoredTokens: Not in browser environment");
    return;
  }

  console.log("=== TOKEN STORAGE DEBUG ===");
  console.log("Access Token:", localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN) ? "Present" : "Not found");
  console.log("Refresh Token:", localStorage.getItem(TOKEN_KEYS.REFRESH_TOKEN) ? "Present" : "Not found");
  console.log("User Data:", localStorage.getItem(TOKEN_KEYS.USER_DATA) ? "Present" : "Not found");
  console.log("Token Expiry:", localStorage.getItem(TOKEN_KEYS.TOKEN_EXPIRY) || "Not set");
  console.log("Profile Completed:", localStorage.getItem(TOKEN_KEYS.PROFILE_COMPLETED) || "Not set");

  try {
    const userData = localStorage.getItem(TOKEN_KEYS.USER_DATA);
    if (userData) {
      console.log("User Data Content:", JSON.parse(userData));
    }
  } catch (error) {
    console.error("Error parsing user data:", error);
  }

  console.log("=========================");
};