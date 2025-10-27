import { API_ENDPOINTS, makeAPICall } from './api';
import { tokenStorage } from './tokenStorage';

import axios from "axios";

export async function registerUser(email, password) {
  try {
    const response = await axios.post(API_ENDPOINTS.USER.REGISTER, {
      email,
      password,
    });

    return {
      success: true,
      statusCode: response.status,
      data: response.data,
    };
  } catch (error) {
    console.log("testtest--", error);

    return {
      success: false,
      statusCode: error.response?.status || null, // <-- here’s the code (e.g., 409)
      message: error.response?.data?.message || error.message,
    };
  }
}


export async function verifyOTP(email, otp) {
 try {
   return await makeAPICall(API_ENDPOINTS.USER.VERIFY_EMAIL, {
     method: "POST",
     body: JSON.stringify({ email, otp }),
   });
 } catch (error) {
   throw new Error("Verification failed");
 }
}


export async function loginUser(email, password) {
  try {
    const response = await axios.post(API_ENDPOINTS.USER.LOGIN, {
      email: email,
      password,
    });

    const result = {
      success: true,
      statusCode: response.status,
      data: response.data,
    };

    // Store tokens if available in the response
    // Handle different possible response structures
    let tokenData = null;

    if (response.data?.data?.accessToken && response.data?.data?.refreshToken) {
      // Structure: { data: { accessToken, refreshToken, user } }
      tokenData = response.data.data;
    } else if (response.data?.accessToken && response.data?.refreshToken) {
      // Structure: { accessToken, refreshToken, user }
      tokenData = response.data;
    }

    if (tokenData) {
      const { accessToken, refreshToken, user } = tokenData;
      console.log("Storing tokens:", { accessToken: accessToken ? "present" : "missing", refreshToken: refreshToken ? "present" : "missing" });
      tokenStorage.setTokens(accessToken, refreshToken, user);
    } else {
      console.warn("No tokens found in response:", response.data);
    }

    return result;
  } catch (error) {
    console.log("Login error:", error);

    return {
      success: false,
      statusCode: error.response?.status || null,
      message: error.response?.data?.message || error.message,
    };
  }
}

export async function resendOTP(email) {
 try {
 const response = await axios.post(API_ENDPOINTS.USER.RESEND_EMAIL_OTP, {
   email
   
    });

    return {
      success: true,
      statusCode: response.status,
      data: response.data,
    };
 }  catch (error) {
    console.log("testtest--", error);

    return {
      success: false,
      statusCode: error.response?.status || null, // <-- here’s the code (e.g., 409)
      message: error.response?.data?.message || error.message,
    };
  }
}

export async function userProfileUpdate(profilePicture, firstName, lastName, phoneNumber, dateOfBirth, gender, address) {
  try {
    // Get the current user token for authentication
    const token = tokenStorage.getAccessToken();

    if (!token) {
      throw new Error('No authentication token available');
    }

    // Create FormData for file upload
    const formData = new FormData();

    // Add profile picture if provided
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    // Add other profile data as strings
    if (firstName) {
      formData.append('firstName', firstName);
    }

    if (lastName) {
      formData.append('lastName', lastName);
    }

    if (phoneNumber) {
      formData.append('phoneNumber', phoneNumber);
    }

    if (dateOfBirth) {
      formData.append('dateOfBirth', dateOfBirth);
    }

    if (gender) {
      formData.append('gender', gender);
    }

    if (address) {
      formData.append('address', address);
    }

    console.log("Full API request:", {
      method: 'PUT',
      url: API_ENDPOINTS.USER.UPDATE_PROFILE,
      headers: {
        'Authorization': `Bearer ${token}`,
        // Don't set Content-Type for FormData - browser will set it with boundary
      },
      body: 'FormData with profile fields'
    });

    const response = await axios.put(API_ENDPOINTS.USER.UPDATE_PROFILE, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        // Don't set Content-Type - axios will set it automatically for FormData
      },
      timeout: 30000, // 30 seconds for file upload
    });

    console.log("Full API response:", {
      status: response.status,
      data: response.data,
      headers: response.headers
    });

    return {
      success: true,
      statusCode: response.status,
      data: response.data,
    };
  } catch (error) {
    console.log("Profile update error:", error);

    return {
      success: false,
      statusCode: error.response?.status || null,
      message: error.response?.data?.message || error.message,
    };
  }
}


export async function resetPassword(email, otp,password,confirmPassword) {
 try {
 const response = await axios.post(API_ENDPOINTS.USER.RESET_PASSWORD, {
  email,  // valid email format
  newPassword:password, //, min 6 chars
  confirmPassword:confirmPassword,
  otp
    });

    return {
      success: true,
      statusCode: response.status,
      data: response.data,
    };
 }  catch (error) {
    console.log("testtest--", error);

    return {
      success: false,
      statusCode: error.response?.status || null, // <-- here’s the code (e.g., 409)
      message: error.response?.data?.message || error.message,
    };
  }
}

export async function forgotPassword(email) {
  try {
  const response = await axios.post(API_ENDPOINTS.USER.FORGOT_PASSWORD, {
   email // valid email format
     });
 
     return {
       success: true,
       statusCode: response.status,
       data: response.data,
     };
  }  catch (error) {
     console.log("testtest--", error);
 
     return {
       success: false,
       statusCode: error.response?.status || null, // <-- here’s the code (e.g., 409)
       message: error.response?.data?.message || error.message,
     };
   }
 }

export async function getUserProfile() {
  try {
    console.log("🔄 authService: getUserProfile called");
    
    const token = tokenStorage.getAccessToken();
    if (!token) {
      throw new Error('No authentication token available');
    }

    const response = await axios.get(API_ENDPOINTS.USER.GET_USER_PROFILE, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return {
      success: true,
      statusCode: response.status,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      statusCode: error.response?.status || null,
      message: error.response?.data?.message || error.message,
    };
  }
}

export async function getBlogsList(page = 1, limit = 6, sortBy = "createdAt", order = "desc") {
  try {
    const url = `${API_ENDPOINTS.BLOG.GET_BLOGS}?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}&status=published&isActive=true`;

    const response = await axios.get(url);

    return {
      success: true,
      statusCode: response.status,
      data: response.data, // includes blogs + pagination info
    };
  } catch (error) {
    console.log("Get blogs list error:", error);

    return {
      success: false,
      statusCode: error.response?.status || null,
      message: error.response?.data?.message || error.message,
    };
  }
}

export async function getBlogById(blogId) {
  try {
    const response = await axios.get(API_ENDPOINTS.BLOG.GET_BLOG_BY_ID(blogId));
    return {
      success: true,
      statusCode: response.status,
      data: response.data.data,
    };
  } catch (error) {
    console.log("Get blog by ID error:", error);
    return {
      success: false,
      statusCode: error.response?.status || null,
      message: error.response?.data?.message || error.message,
    };
  }
}

export async function getCounselorList(page = 1, limit = 3, sortBy = "createdAt", order = "desc") {
  try {
    const url = `${API_ENDPOINTS.COUNSELOR.GET_COUNSELOR}?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}&isPublished=true&isActive=true`;

    const response = await axios.get(url);

    return {
      success: true,
      statusCode: response.status,
      data: response.data, // includes blogs + pagination info
    };
  } catch (error) {
    console.log("Get counselor list error:", error);

    return {
      success: false,
      statusCode: error.response?.status || null,
      message: error.response?.data?.message || error.message,
    };
  }
}


export async function bookCounselingSession({
  counselorId,
  guestName,
  guestEmail,
  guestPhone,
  bookingDate,
  bookingTime,
  duration,
  discussionTopic
}) {
  try {
    // Get token (if booking requires authentication)
    const token = tokenStorage.getAccessToken();

    const payload = {
      counselorId,
      guestName,
      guestEmail,
      guestPhone,
      bookingDate,
      bookingTime,
      duration,
      discussionTopic,
    };

    console.log("📅 Booking payload:", payload);

    const response = await axios.post(API_ENDPOINTS.BOOKING.CREATE_BOOKING, payload, {
      headers: token
        ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
        : { "Content-Type": "application/json" },
    });

    console.log("✅ Booking response:", response.data);

    return {
      success: true,
      statusCode: response.status,
      data: response.data,
    };
  } catch (error) {
    console.log("❌ Booking error:", error);

    return {
      success: false,
      statusCode: error.response?.status || null,
      message: error.response?.data?.message || error.message,
    };
  }
}

export async function getMaterials(page = 1, limit = 10) {
  try {
    console.log(`🔄 authService: getMaterials called with page=${page}, limit=${limit}`);

    const response = await axios.get(`${API_ENDPOINTS.MATERIALS.GET_MATERIALS}?page=${page}&limit=${limit}`);

    console.log("✅ Materials response:", response.data);

    return {
      success: true,
      statusCode: response.status,
      data: response.data.data, // materials array
    };
  } catch (error) {
    console.log("❌ Get materials error:", error);

    return {
      success: false,
      statusCode: error.response?.status || null,
      message: error.response?.data?.message || error.message,
    };
  }
}

export async function trackMaterialDownload(materialId) {
  try {
    console.log(`🔄 authService: trackMaterialDownload called for material ID: ${materialId}`);

    const response = await axios.get(API_ENDPOINTS.MATERIALS.COUNT_DOWNLOAD_MATERIAL(materialId));

    console.log("✅ Download tracked successfully:", response.data);

    return {
      success: true,
      statusCode: response.status,
      data: response.data,
    };
  } catch (error) {
    console.log("❌ Track download error:", error);

    return {
      success: false,
      statusCode: error.response?.status || null,
      message: error.response?.data?.message || error.message,
    };
  }
}


export async function getReels(page = 1, limit = 10) {
  try {
    console.log(`🔄 authService: getReels called with page=${page}, limit=${limit}`);

    const response = await axios.get(`${API_ENDPOINTS.REELS.GET_REELS}?page=${page}&limit=${limit}&isPublished=true&isActive=true`);

    console.log("✅ Reels response:", response.data);

    return {
      success: true,
      statusCode: response.status,
      data: response.data.data, // reels array
    };
  } catch (error) {
    console.log("❌ Get reels error:", error);

    return {
      success: false,
      statusCode: error.response?.status || null,
      message: error.response?.data?.message || error.message,
    };
  }
}

export async function getTestimonials(page = 1, limit = 10) {
  try {
    console.log(`🔄 authService: getTestimonials called with page=${page}, limit=${limit}`);

    const response = await axios.get(`${API_ENDPOINTS.TESTIMONIALS.GET_TESTIMONIALS}?page=${page}&limit=${limit}&isApproved=true&isActive=true`);

    console.log("✅ Testimonials response:", response.data);

    return {
      success: true,
      statusCode: response.status,
      data: response.data.data, // testimonials array
    };
  } catch (error) {
    console.log("❌ Get testimonials error:", error);

    return {
      success: false,
      statusCode: error.response?.status || null,
      message: error.response?.data?.message || error.message,
    };
  }
}

export async function trackReelsViews(Id) {
  try {
    console.log(`🔄 authService: trackMaterialDownload called for material ID: ${Id}`);

    const response = await axios.post(API_ENDPOINTS.REELS.COUNT_REELS_VIEW(Id));

    console.log("✅ Download tracked successfully:", response.data);

    return {
      success: true,
      statusCode: response.status,
      data: response.data,
    };
  } catch (error) {
    console.log("❌ Track download error:", error);

    return {
      success: false,
      statusCode: error.response?.status || null,
      message: error.response?.data?.message || error.message,
    };
  }
}
export async function trackReelsLikes(Id) {
  try {
    console.log(`🔄 authService: trackMaterialDownload called for material ID: ${Id}`);

    const response = await axios.post(API_ENDPOINTS.REELS.COUNT_REELS_LIKE(Id));

    console.log("✅ Download tracked successfully:", response.data);

    return {
      success: true,
      statusCode: response.status,
      data: response.data,
    };
  } catch (error) {
    console.log("❌ Track download error:", error);

    return {
      success: false,
      statusCode: error.response?.status || null,
      message: error.response?.data?.message || error.message,
    };
  }
}
export async function trackReelsUnlikes(Id) {
  try {
    console.log(`🔄 authService: trackMaterialDownload called for material ID: ${Id}`);

    const response = await axios.post(API_ENDPOINTS.REELS.COUNT_REELS_UNLIKE(Id));

    console.log("✅ Download tracked successfully:", response.data);

    return {
      success: true,
      statusCode: response.status,
      data: response.data,
    };
  } catch (error) {
    console.log("❌ Track download error:", error);

    return {
      success: false,
      statusCode: error.response?.status || null,
      message: error.response?.data?.message || error.message,
    };
  }
}

export async function createLead(leadData) {
  try {
    console.log(`🔄 authService: createLead called with data:`, leadData);

    const response = await axios.post(API_ENDPOINTS.LEAD.CREATE_LEAD, leadData);

    console.log("✅ Lead created successfully:", response.data);

    return {
      success: true,
      statusCode: response.status,
      data: response.data,
    };
  } catch (error) {
    console.log("❌ Lead creation error:", error);

    return {
      success: false,
      statusCode: error.response?.status || null,
      message: error.response?.data?.message || error.message,
    };
  }
}


export async function getVideos(page = 1, limit = 10) {
  try {
    console.log(`🔄 authService: getVideos called with page=${page}, limit=${limit}`);

    const response = await axios.get(`${API_ENDPOINTS.VIDEO.GET_VIDEO}?page=${page}&limit=${limit}&isPublished=true&isActive=true`);

    console.log("✅ Videos response:", response.data);

    return {
      success: true,
      statusCode: response.status,
      data: response.data.data, // reels array
    };
  } catch (error) {
    console.log("❌ Get reels error:", error);

    return {
      success: false,
      statusCode: error.response?.status || null,
      message: error.response?.data?.message || error.message,
    };
  }
}


export async function trackVideosViews(Id) {
  try {
    console.log(`🔄 authService: trackMaterialDownload called for material ID: ${Id}`);

    const response = await axios.post(API_ENDPOINTS.VIDEO.COUNT_VIDEO_VIEW(Id));

    console.log("✅ Download tracked successfully:", response.data);

    return {
      success: true,
      statusCode: response.status,
      data: response.data,
    };
  } catch (error) {
    console.log("❌ Track download error:", error);

    return {
      success: false,
      statusCode: error.response?.status || null,
      message: error.response?.data?.message || error.message,
    };
  }
}

export async function getTeams(page = 1, limit = 6, sortBy = "createdAt", order = "desc") {
  try {
    const url = `${API_ENDPOINTS.TEAMS.GET_TEAMS}?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}&status=published&isActive=true`;

    const response = await axios.get(url);

    return {
      success: true,
      statusCode: response.status,
      data: response.data, // includes blogs + pagination info
    };
  } catch (error) {
    console.log("Get teams list error:", error);

    return {
      success: false,
      statusCode: error.response?.status || null,
      message: error.response?.data?.message || error.message,
    };
  }
}

export async function getBanners(page = 1, limit = 10) {
  try {
    console.log(`🔄 authService: getBanners called with page=${page}, limit=${limit}`);

    const response = await axios.get(`${API_ENDPOINTS.BANNERS.GET_BANNERS}?page=${page}&limit=${limit}&isPublished=true&isActive=true`);

    console.log("✅ Banners response:", response.data);

    return {
      success: true,
      statusCode: response.status,
      data: response.data.data, // banners array
    };
  } catch (error) {
    console.log("❌ Get banners error:", error);

    return {
      success: false,
      statusCode: error.response?.status || null,
      message: error.response?.data?.message || error.message,
    };
  }
}