import { tokenStorage } from './tokenStorage';

/**
 * API Interceptor utility for handling token refresh automatically
 * This wraps API calls and handles token refresh when needed
 */
export class APIInterceptor {
  constructor() {
    this.isRefreshing = false;
    this.failedQueue = [];
  }

  // Process failed requests queue
  processQueue(error, token = null) {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });

    this.failedQueue = [];
  }

  // Main API call wrapper
  async fetchWithAuth(url, options = {}) {
    const requestOptions = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    // Add authorization header if token exists
    const token = tokenStorage.getAccessToken();
    if (token) {
      requestOptions.headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      let response = await fetch(url, requestOptions);

      // If token is expired (401), try to refresh
      if (response.status === 401 && token) {
        if (!this.isRefreshing) {
          this.isRefreshing = true;

          try {
            // Attempt to refresh token
            const newTokens = await tokenStorage.refreshToken();

            // Update the request with new token
            requestOptions.headers['Authorization'] = `Bearer ${newTokens.accessToken}`;

            // Retry the original request
            response = await fetch(url, requestOptions);

            // Process any queued requests with the new token
            this.processQueue(null, newTokens.accessToken);

          } catch (refreshError) {
            // Refresh failed, logout user and reject all queued requests
            this.processQueue(refreshError, null);
            throw refreshError;
          } finally {
            this.isRefreshing = false;
          }
        } else {
          // If already refreshing, queue this request
          return new Promise((resolve, reject) => {
            this.failedQueue.push({ resolve, reject });
          }).then((newToken) => {
            requestOptions.headers['Authorization'] = `Bearer ${newToken}`;
            return fetch(url, requestOptions);
          }).catch(error => {
            throw error;
          });
        }
      }

      // Handle other error responses
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();

    } catch (error) {
      if (error.message.includes('Session expired') || error.message.includes('refresh')) {
        // Force logout on refresh failure
        tokenStorage.clearTokens();
        window.location.href = '/login'; // Redirect to login page
      }
      throw error;
    }
  }

  // GET request with auth
  async get(url, options = {}) {
    return this.fetchWithAuth(url, { ...options, method: 'GET' });
  }

  // POST request with auth
  async post(url, data = {}, options = {}) {
    return this.fetchWithAuth(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT request with auth
  async put(url, data = {}, options = {}) {
    return this.fetchWithAuth(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE request with auth
  async delete(url, options = {}) {
    return this.fetchWithAuth(url, { ...options, method: 'DELETE' });
  }

  // PATCH request with auth
  async patch(url, data = {}, options = {}) {
    return this.fetchWithAuth(url, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }
}

// Create and export singleton instance
export const apiInterceptor = new APIInterceptor();

// Export class for custom instances if needed
export { APIInterceptor };