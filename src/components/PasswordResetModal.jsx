"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { resetPassword } from "@/lib/authService";

const PasswordResetModal = ({
  open,
  onClose,
  onSubmit,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  message,
  email
}) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [localMessage, setLocalMessage] = useState("");

  if (!open) return null;

  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Move cursor to next box
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate OTP
    if (otp.some((o) => o === "")) {
      setLocalMessage("❌ Please enter all 4 digits of OTP");
      return;
    }

    // Validate passwords
    if (password !== confirmPassword) {
      setLocalMessage("❌ Passwords do not match!");
      return;
    }
    if (password.length < 6) {
      setLocalMessage("❌ Password must be at least 6 characters long!");
      return;
    }

    setIsLoading(true);
    setLocalMessage("");

    try {
      // Call resetPassword API which handles both OTP verification and password reset
      const result = await resetPassword(email, password, otp.join(""));

      if (result.success) {
        setLocalMessage("✅ Password reset successfully!");
        setTimeout(() => {
          onClose(); // Close modal and return to login
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
            Reset Password
            <span className="block text-amber-700 font-normal text-base mt-1">
              Enter OTP and your new password
            </span>
          </h2>

          {/* Form */}
          <form className="space-y-3" onSubmit={handleSubmit}>
            {/* OTP Input Section */}
            <div className="space-y-2">
              {/* <label className="block text-sm font-medium text-gray-700 text-center">
                Enter OTP sent to your email
              </label> */}
              <div className="flex justify-center gap-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, idx)}
                    maxLength={1}
                    className="w-12 h-12 text-center text-lg border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    disabled={isLoading}
                  />
                ))}
              </div>
            </div>

            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-stone-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm text-gray-900"
              required
              disabled={isLoading}
            />

            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              disabled={isLoading || otp.some((o) => o === "")}
              className="cursor-pointer w-full py-2 rounded-lg font-semibold shadow transition-all text-sm bg-gradient-to-r from-amber-500 to-rose-400 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
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

export default PasswordResetModal;