"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { signIn } from "next-auth/react";
import { registerUser, loginUser, resendOTP } from "@/lib/authService";
import { useAuth } from "@/lib/useAuth";
import OTPModal from "./OTPModal";
import CompleteProfileModal from "./CompleteProfileModal";
import ForgetPasswordModal from "./ForgetPasswordModal";
import PasswordResetModal from "./PasswordResetModal";
import { useToast } from "./Toast";

const AuthModal = ({ open, type, onClose, setAuthType }) => {
  const { addToast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [signupEmail, setSignupEmail] = useState("");
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(true);
  const [loading,setLoading]=useState(false);

  const [showCompleteProfileModal, setShowCompleteProfileModal] = useState(false);


  // Forget Password States
  const [showForgetPasswordModal, setShowForgetPasswordModal] = useState(false);
  const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);
  const [forgetPasswordEmail, setForgetPasswordEmail] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [confirmResetPassword, setConfirmResetPassword] = useState("");
  const [forgetPasswordMessage, setForgetPasswordMessage] = useState("");
  const [messageExist, setMessageExist] = useState("");
  console.log("the message---",message)

  // Use the authentication context
  const { register: contextRegister, login: contextLogin, isLoading: authLoading } = useAuth();
  const handleSuccess = () => {
    addToast('Login successfully!', 'success');
  };

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setMessageExist("❌ Passwords do not match!");
      return;
    }
    try {
      setLoading(true);
      const result = await contextRegister(email, password);
      if (result.success) {
        setLoading(false);
        setSignupEmail(email);
        setShowOTPModal(true);
        setIsAuthModalVisible(false);
        setMessage("");
        setMessageExist("");
      } else {
        setLoading(false);
        if (result.statusCode === 409) {
        //        setSignupEmail(email);
        // setShowOTPModal(true);
        //   try {
        //     setLoading(true);
        //     const verifyRes = await resendOTP(email);
        //     if (verifyRes.success) {
        //       setLoading(false);
        //       setSignupEmail(email);
        //       setShowOTPModal(true);
        //       setIsAuthModalVisible(false);
        //       setMessage("⚠️ Please verify your email with the OTP sent.");
        //     } else {
        //       setLoading(false);
        //       setMessage("❌ Verification failed. Try again.");
        //     }
        //   } catch {
        //     setLoading(false);
        //     setMessage("❌ Error while verifying email.");
        //   }
          setMessageExist("❌ User already exists with this email. Please login.");
        } else {
          setLoading(false);
          setMessageExist("❌ " + result.message);
        }
      }
    } catch (err) {
      setMessageExist("❌ " + err.message);
    }
  };

  // const handleLogin = async () => {
  //   try {
  //     setLoading(true);
  //     const result = await contextLogin(email, password);
  //     console.log("the result---",result.user)
  //     if (result.success && result.user.isEmailVerified) {
  //       console.log("the result---",result)
  //       // setMessage("✅ Logged in successfully!");

  //       // Check if user has already completed profile
  //     const profileCompleted = localStorage.getItem("profileCompleted");
  //     if (!profileCompleted) {
  //       setLoading(false);
  //       // Show Complete Profile modal — do NOT close AuthModal yet
  //       setShowCompleteProfileModal(true);
  //     } else {
  //       // Close only if profile already done
  //       setTimeout(() => {
  //         setLoading(false);
  //         onClose();
  //         setEmail("");
  //         setPassword("");
  //         setMessage("");
  //         setMessageExist("");
  //       }, 1500);
  //     }
  //     }
  //    else if(result.success && !result.user.isEmailVerified){

  //       console.log("the result---",result.user.isEmailVerified)
  //       setLoading(false);
  //      try{
  //       const verifyRes = await resendOTP(email);
  //       if (verifyRes.success) {
  //         setLoading(false);
  //         setSignupEmail(email);
  //         setShowOTPModal(true);
  //         setIsAuthModalVisible(false);
  //         setMessage("⚠️ Please verify your email with the OTP sent.");
  //       } else {
  //         setMessage("❌ Verification failed. Try again.");
  //       }
  //      }catch{

  //       setMessage("❌ Error while verifying email.");
  //      }
        
  //     }
  //     else if(!result.success){
  //       console.log("the result---",result)
  //       setLoading(false);
  //       setMessage("❌ " + result.message);
  //     }
      
      
  //     // else {
  //     //   setLoading(false);
  //     //   if (result.message.includes("verify") || result.message.includes("401")) {
  //     //     try {
  //     //       const verifyRes = await resendOTP(email);
  //     //       if (verifyRes.success) {

  //     //         setSignupEmail(email);
  //     //         setShowOTPModal(true);
  //     //         setIsAuthModalVisible(false);
  //     //         setMessage("⚠️ Please verify your email with the OTP sent.");
  //     //       } else {
  //     //         setMessage("❌ Verification failed. Try again.");
  //     //       }
  //     //     } catch {
  //     //       setMessage("❌ Error while verifying email.");
  //     //     }
  //     //   } else {
  //     //     setMessage("❌ " + result.message);
  //     //   }
  //     // }
  //   } catch (err) {
  //     console.log("error",err)
  //     setMessage("❌ " + err.message);
  //   }
  // };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const result = await contextLogin(email, password);
      console.log("the result---", result);
  
      // If login succeeded and email is verified
      if (result?.success && result.user?.isEmailVerified === true) {
        console.log("Login success & email verified:", result);
        setLoading(false);
        handleSuccess();
  
        const profileCompleted = localStorage.getItem("profileCompleted");
  
        if (!profileCompleted) {
          // Show profile modal (do not close auth modal yet)
          setShowCompleteProfileModal(true);
        } else {
          // Close and clear the form after a short delay for UX
          setTimeout(() => {
            onClose();
            setEmail("");
            setPassword("");
            setMessage("");
            setMessageExist("");
          }, 1500);
        }
  
        return { success: true }; // optional return for callers
      }
  
      // If login succeeded but email is NOT verified -> trigger OTP flow
      else if (result?.success && result.user?.isEmailVerified === false) {
        console.log("Login success but email NOT verified, sending OTP...", result);
        try {
          const verifyRes = await resendOTP(email);
          setLoading(false);
  
          if (verifyRes?.success) {
            setSignupEmail(email);
            setShowOTPModal(true);
            setIsAuthModalVisible(false);
            // setMessage("⚠️ Please verify your email with the OTP sent.");
          } else {
            // resendOTP returned a failure
            setMessage("❌ Verification failed. Try again.");
          }
        } catch (err) {
          console.error("resendOTP error:", err);
          setLoading(false);
          setMessage("❌ Error while verifying email. Try again.");
        }
  
        return { success: false, message: "Email not verified" };
      }
  
      // Any other failure (login unsuccessful or unexpected response)
      else {
        console.log("Login failed or unexpected response:", result);
        setLoading(false);
        setMessage("❌ " + (result?.message || "Login failed"));
        return { success: false, message: result?.message || "Login failed" };
      }
    } catch (err) {
      console.log("error", err);
      setLoading(false);
      setMessage("❌ " + (err?.message || "Login failed"));
      return { success: false, message: err?.message || "Login error" };
    }
  };
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "signup") handleSignup();
    else handleLogin();
  };

  const handleOTPVerificationSuccess = () => {
    // setMessage("✅ Registration and email verification successful!");
    setShowOTPModal(false);
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setSignupEmail("");
    setIsAuthModalVisible(false);
    setAuthType("login")

    // Note: Profile modal will be handled by AuthContext after login
  };

  const handleOTPModalClose = () => {
    setShowOTPModal(false);
    setIsAuthModalVisible(true);
  };

  // Forget Password Handler - now handled by ForgetPasswordModal component

  // Password reset now handled internally by PasswordResetModal component


  if (!open) return null;

  return (
    <>
      {/* AUTH MODAL */}
      {isAuthModalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 min-h-screen overflow-y-auto">
          <div className="relative w-full max-w-sm p-0">
            <div className="absolute inset-0 rounded-2xl bg-white opacity-95"></div>
            <div className="relative bg-gradient-to-b from-stone-50 to-rose-50/40 rounded-2xl shadow-lg p-6">
              {/* Close button */}
              <button
                className="absolute top-3 right-3 text-stone-400 hover:text-amber-600 transition-colors"
                onClick={()=>{onClose();
                  setMessageExist("");
                  setMessage("");
                  setEmail("");
                  setPassword("");
                  setConfirmPassword("");
                  }}
              >
                <X size={24} />
              </button>

              {/* Heading */}
              <h2 className="text-2xl font-serif font-light text-gray-900 mb-4 text-center">
                {type === "login" ? "Welcome Back" : "Create Account"}
                <span className="block text-amber-700 font-normal text-base mt-1">
                  {type === "login" ? "Login to continue" : "Sign up to get started"}
                </span>
              </h2>

              {/* Form */}
              <form className="space-y-3" onSubmit={handleSubmit}>
                {/* {type === "signup" && (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-3 py-2 border border-stone-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm text-gray-900"
                    required
                  />
                )} */}

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full px-3 py-2 border border-stone-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm text-gray-900"
                  required
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm text-gray-900"
                  required
                />

                {type === "signup" && (
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm text-gray-900"
                    required
                  />
                )}

                {messageExist && (
                  <p className="text-center text-xs font-medium text-red-600">
                    {messageExist}
                  </p>
                )}
{message && (
                  <p className="text-center text-xs font-medium text-red-600">
                    {message}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="cursor-pointer w-full py-2 rounded-lg font-semibold shadow transition-all text-sm bg-gradient-to-r from-amber-500 to-rose-400 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Please wait..." : (type === "login" ? "Login" : "Signup")}
                </button>

                {/* Switch login/signup */}
                {type === "login" && setAuthType && (
                  <div className="text-center mt-2 text-gray-700 text-xs">
                    Don&apos;t have an account?{" "}
                    <button
                      type="button"
                      className="cursor-pointer text-amber-700 font-semibold hover:underline"
                      onClick={() => {setAuthType("signup");
                        setMessageExist("");
                        setMessage("");
                        setEmail("");
                        setPassword("");
                        setConfirmPassword("");
                      }}
                    >
                      Register now
                    </button>
                  </div>
                )}
                {type === "signup" && setAuthType && (
                  <div className="text-center mt-2 text-gray-700 text-xs">
                    Already have an account?{" "}
                    <button
                      type="button"
                      className="cursor-pointer text-amber-700 font-semibold hover:underline"
                      onClick={() => {setAuthType("login");

                        setMessageExist("");
                        setMessage("");
                        setEmail("");
                        setPassword("");
                        setConfirmPassword("");
                      }}
                    >
                      Login
                    </button>
                  </div>
                )}

                {/* Forget Password Link */}
                {type === "login" && (
                  <div className="text-center mt-2">
                    <button
                      type="button"
                      className="cursor-pointer text-amber-700 font-semibold hover:underline text-xs"
                      onClick={() => {
                        setShowForgetPasswordModal(true);
                        setIsAuthModalVisible(false);
                        setMessageExist("");
                        setMessage("");
                        setEmail("");
                        setPassword("");
                        setConfirmPassword("");
                      }}
                    >
                      Forget password ?
                    </button>
                  </div>
                )}

                {/* Google Signin */}
                {/* <div className="text-center mt-3">
                  <button
                    type="button"
                    onClick={() => {
                      // Note: Profile modal will be handled by AuthContext after social login
                      signIn("google", { callbackUrl: "/" });
                    }}
                    className="cursor-pointer w-full py-2 rounded-lg border border-stone-300 shadow-sm flex items-center justify-center gap-2 hover:bg-stone-100 transition text-sm"
                  >
                    <img
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      alt="Google logo"
                      className="w-5 h-5"
                    />
                    Continue with Google
                  </button>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      )}

      {/* OTP Modal */}
        {/* <CompleteProfileModal
        open={showOTPModal}
        onClose={handleOTPModalClose}
        onProfileComplete={handleOTPVerificationSuccess}
        onSkip={handleOTPVerificationSuccess}
      
      /> */}
      <CompleteProfileModal
  open={showCompleteProfileModal}
  onClose={() => {setShowCompleteProfileModal(false);onClose();}}
  onProfileComplete={() => {
    setShowCompleteProfileModal(false);
    localStorage.setItem("profileCompleted", "true");
    onClose(); 

  }}
  onSkip={() => {
    setShowCompleteProfileModal(false);
    localStorage.setItem("profileCompleted", "true");
    onClose(); 
  }}
/>
  <OTPModal
        open={showOTPModal}
        onClose={handleOTPModalClose}
        closeAuthModal={onClose}
        email={signupEmail}
        onVerificationSuccess={handleOTPVerificationSuccess}
      />
      <ForgetPasswordModal
        open={showForgetPasswordModal}
        onClose={() => {
          setShowForgetPasswordModal(false);
          setIsAuthModalVisible(true);
          setForgetPasswordMessage("");
        }}
        email={forgetPasswordEmail}
        setEmail={setForgetPasswordEmail}
        message={forgetPasswordMessage}
        onPasswordResetModalOpen={(email) => {
          setShowForgetPasswordModal(false);
          setShowPasswordResetModal(true);
          setIsAuthModalVisible(false);
          setForgetPasswordMessage("");
        }}
      />

      <PasswordResetModal
        open={showPasswordResetModal}
        onClose={() => {
          setShowPasswordResetModal(false);
          setIsAuthModalVisible(true);
          setForgetPasswordMessage("");
        }}
        password={resetPassword}
        setPassword={setResetPassword}
        confirmPassword={confirmResetPassword}
        setConfirmPassword={setConfirmResetPassword}
        message={forgetPasswordMessage}
        email={forgetPasswordEmail}
      />

    </>
  );
};

export default AuthModal;
