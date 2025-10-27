// API Configuration and URL Management
// This file centralizes all API endpoints and configurations

// Base API Configuration
export const API_CONFIG = {
  // Base URLs for different environments
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  VERSION: 'v1',

  // Timeout configurations
  TIMEOUT: 10000, // 10 seconds

  // Retry configurations
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
};

// API Endpoints Builder
class APIEndpoints {
  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
    this.version = API_CONFIG.VERSION;
  }

  // Helper method to build full URLs
  buildUrl(path) {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${this.baseUrl}/${this.version}${cleanPath}`;
  }

  // User related endpoints
  get USER() {
    return {
      // Authentication endpoints
      LOGIN: this.buildUrl('/users/login'),
      REGISTER: this.buildUrl('/users/register'),
      VERIFY_EMAIL: this.buildUrl('/users/verify-email'),
      RESEND_EMAIL_OTP: this.buildUrl('/users/resend-otp'),
      
      LOGOUT: this.buildUrl('/auth/logout'),
      REFRESH_TOKEN: this.buildUrl('/users/refresh-token'),
      FORGOT_PASSWORD: this.buildUrl('/users/forgot-password'),
      RESET_PASSWORD: this.buildUrl('/users/reset-password'),

      // User profile endpoints
      GET_USER_PROFILE: this.buildUrl('/users/profile'),
      UPDATE_PROFILE: this.buildUrl('/users/profile/upload'),
      UPLOAD_AVATAR: this.buildUrl('/user/avatar'),



      // User specific data
      USER_BOOKINGS: (userId) => this.buildUrl(`/user/${userId}/bookings`),
      USER_HISTORY: (userId) => this.buildUrl(`/user/${userId}/history`),
    };
  }

  // Generic endpoints
  get COMMON() {
    return {
      HEALTH_CHECK: this.buildUrl('/health'),
      INFO: this.buildUrl('/info'),
      STATUS: this.buildUrl('/status'),
    };
  }

  // Add more endpoint categories as needed
  // Example: Add booking endpoints
  get BOOKING() {
    return {
      CREATE_BOOKING: this.buildUrl('/bookings'),
      GET_ALL: this.buildUrl('/bookings'),
      GET_BY_ID: (id) => this.buildUrl(`/bookings/${id}`),
      UPDATE: (id) => this.buildUrl(`/bookings/${id}`),
      DELETE: (id) => this.buildUrl(`/bookings/${id}`),
      CANCEL: (id) => this.buildUrl(`/bookings/${id}/cancel`),
    };
  }
  get BLOG() {
    return {
         // Blogs endpoints
         GET_BLOGS: this.buildUrl('/blogs'),
         GET_BLOG_BY_ID: (id) => this.buildUrl(`/blogs/${id}`),
    };
  }

  get COUNSELOR() {
    return {
      GET_COUNSELOR: this.buildUrl('/counselors'),
    };
  }
  get MATERIALS() {
    return {
      GET_MATERIALS: this.buildUrl('/materials'),
      COUNT_DOWNLOAD_MATERIAL: (id) => this.buildUrl(`/materials/${id}/download`),
    };
  }

    get REELS() {
    return {
      GET_REELS: this.buildUrl('/reels'),
            COUNT_REELS_VIEW: (id) => this.buildUrl(`/reels/${id}/view`),
                 COUNT_REELS_LIKE: (id) => this.buildUrl(`/reels/${id}/like`),
                      COUNT_REELS_UNLIKE: (id) => this.buildUrl(`/reels/${id}/unlike`),
    
    };
  }

  get VIDEO() {
    return {
      GET_VIDEO: this.buildUrl('/videos'),
            COUNT_VIDEO_VIEW: (id) => this.buildUrl(`/videos/${id}/view`),
                 COUNT_VIDEO_LIKE: (id) => this.buildUrl(`/videos/${id}/like`),
                      COUNT_VIDEO_UNLIKE: (id) => this.buildUrl(`/videos/${id}/unlike`),
    
    };
  }

     get TESTIMONIALS() {
    return {
      GET_TESTIMONIALS: this.buildUrl('/testimonials/approved'),
    
    };
  }

  // Example: Add content endpoints
  get CONTENT() {
    return {
      BLOGS: this.buildUrl('/content/blogs'),
      BLOG_BY_SLUG: (slug) => this.buildUrl(`/content/blogs/${slug}`),
      FAQ: this.buildUrl('/content/faq'),
      TESTIMONIALS: this.buildUrl('/content/testimonials'),
    };
  }

  get LEAD() {
    return {
      CREATE_LEAD: this.buildUrl('/leads'),
    };
  }

  get TEAMS() {
    return {
      GET_TEAMS: this.buildUrl('/team'),
    };
  }
  get BANNERS() {
    return {
      GET_BANNERS: this.buildUrl('/banners/published'),
    };
  }

}

// Create and export a single instance
export const API_ENDPOINTS = new APIEndpoints();

// Export commonly used endpoints for convenience
export const API_URLS = {
  // Authentication
  LOGIN: API_ENDPOINTS.USER.LOGIN,
  REGISTER: API_ENDPOINTS.USER.REGISTER,
  LOGOUT: API_ENDPOINTS.USER.LOGOUT,
  RESEND_EMAIL_OTP:API_ENDPOINTS.USER.RESEND_EMAIL_OTP,

  // User Profile
  USER_PROFILE: API_ENDPOINTS.USER.PROFILE,
  UPDATE_PROFILE: API_ENDPOINTS.USER.UPDATE_PROFILE,

  // Common
  HEALTH_CHECK: API_ENDPOINTS.COMMON.HEALTH_CHECK,

  // Bookings
  CREATE_BOOKING: API_ENDPOINTS.BOOKING.CREATE,
  GET_BOOKINGS: API_ENDPOINTS.BOOKING.GET_ALL,

  // Content
  GET_BLOGS: API_ENDPOINTS.CONTENT.BLOGS,
  GET_FAQ: API_ENDPOINTS.CONTENT.FAQ,
};

// Export configuration for use in API calls
export const API_SETTINGS = {
  ...API_CONFIG,
  endpoints: API_ENDPOINTS,
};

// Example usage function for making API calls
export const makeAPICall = async (url, options = {}) => {
  const config = {
    timeout: API_CONFIG.TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.timeout);

    const response = await fetch(url, {
      ...config,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('API call timed out');
    }
    throw error;
  }
};

// Export default for easy importing
export default API_ENDPOINTS;