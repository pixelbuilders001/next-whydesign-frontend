"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { resendOTP } from "@/lib/authService";

const ForgetPasswordModal = ({
  open,
  onClose,
  onSubmit,
  email,
  setEmail,
  message,
  onPasswordResetModalOpen
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [localMessage, setLocalMessage] = useState("");

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setLocalMessage("❌ Please enter your email address");
      return;
    }

    setIsLoading(true);
    setLocalMessage("");

    try {
      const result = await resendOTP(email);
      if (result.success) {
        setLocalMessage("✅ OTP sent to your email!");
        setTimeout(() => {
          onPasswordResetModalOpen(email);
        }, 1500);
      } else {
        setLocalMessage("❌ " + result.message);
      }
    } catch (err) {
      setLocalMessage("❌ " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 min-h-screen overflow-y-auto">
      <div className="relative w-full max-w-sm p-0">
        <div className="absolute inset-0 rounded-2xl bg-white opacity-95"></div>
        <div className="relative bg-gradient-to-b from-stone-50 to-rose-50/40 rounded-2xl shadow-lg p-6">
          {/* Close button */}
          <button
            className="absolute top-3 right-3 text-stone-400 hover:text-amber-600 transition-colors"
            onClick={onClose}
          >
            <X size={24} />
          </button>

          {/* Heading */}
          <h2 className="text-2xl font-serif font-light text-gray-900 mb-4 text-center">
            Forgot Password
            <span className="block text-amber-700 font-normal text-base mt-1">
              Enter your email to reset password
            </span>
          </h2>

          {/* Form */}
          <form className="space-y-3" onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-stone-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm text-gray-900"
              required
              disabled={isLoading}
            />

            {(message || localMessage) && (
              <p className={`text-center text-xs font-medium ${
                (message || localMessage).includes("✅") ? "text-green-600" : "text-red-600"
              }`}>
                {message || localMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer w-full py-2 rounded-lg font-semibold shadow transition-all text-sm bg-gradient-to-r from-amber-500 to-rose-400 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Sending..." : "Send Reset OTP"}
            </button>

            <div className="text-center mt-2">
              <button
                type="button"
                className="cursor-pointer text-amber-700 font-semibold hover:underline text-xs"
                onClick={onClose}
              >
                Back to Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordModal;