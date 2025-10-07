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
      emailOrPhone: email,
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

export async function userProfileUpdate(profilePicture, firstName, gender) {
  try {
    // Get the current user token for authentication
    const token = tokenStorage.getAccessToken();

    // Create JSON data instead of FormData
    const profileData = {
      firstName: firstName || undefined,
      gender: gender || undefined,
      // Note: profilePicture would need a separate endpoint for file upload
      // as JSON APIs typically don't handle file uploads directly
    };

    // Remove undefined fields
    Object.keys(profileData).forEach(key => {
      if (profileData[key] === undefined) {
        delete profileData[key];
      }
    });

    const response = await axios.post(API_ENDPOINTS.USER.REGISTER, profileData, {
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
    console.log("Profile update error:", error);

    return {
      success: false,
      statusCode: error.response?.status || null,
      message: error.response?.data?.message || error.message,
    };
  }
}


export async function resetPassword(email,password, otp) {
 try {
 const response = await axios.post(API_ENDPOINTS.USER.RESET_PASSWORD, {
  email,  // valid email format
  password, //, min 6 chars
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