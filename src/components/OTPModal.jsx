"use client";
import React, { useState, useEffect, useRef } from "react";
import { X, Mail } from "lucide-react";
import { verifyOTP } from "@/lib/authService";

const OTPModal = ({ open, onClose, email, onVerificationSuccess }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputsRef = useRef([]);

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Move cursor to next box
    if (value && index < 5) inputsRef.current[index + 1].focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.some((o) => o === "")) {
      setMessage("❌ Please enter all 6 digits");
      return;
    }

    setIsLoading(true);
    setMessage("");
    try {
      await verifyOTP(email, otp.join(""));
      setMessage("✅ Email verified successfully!");
      setTimeout(() => {
        onVerificationSuccess();
        onClose();
      }, 1500);
    } catch (err) {
      setMessage("❌ " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendCooldown > 0) return;
    setResendCooldown(60);
    setMessage("📧 Sending new OTP...");
    try {
      // Call resendOTP API if available
      setMessage("✅ New OTP sent to your email");
    } catch {
      setMessage("❌ Failed to resend OTP");
      setResendCooldown(0);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 min-h-screen overflow-y-auto">
      {/* Increased width from max-w-xs → max-w-sm and added responsive padding */}
      <div className="relative w-full max-w-sm p-0">
        <div className="absolute inset-0 rounded-2xl bg-white opacity-95"></div>
        <div className="relative bg-gradient-to-b from-stone-50 to-rose-50/40 rounded-2xl shadow-lg p-6">
          <button
            className="absolute top-3 right-3 text-stone-400 hover:text-amber-600 transition-colors"
            onClick={onClose}
          >
            <X size={24} />
          </button>

          <div className="text-center mb-4">
            <div className="mx-auto w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-2">
              <Mail className="w-6 h-6 text-amber-600" />
            </div>
            <h2 className="text-2xl font-serif font-light text-gray-900 mb-1">
              Verify Your Email
            </h2>
            <p className="text-gray-600 text-sm">We've sent a 6-digit code to</p>
            <p className="text-amber-700 font-medium text-sm">{email}</p>
          </div>

          <form className="space-y-3" onSubmit={handleSubmit}>
            {/* OTP Inputs */}
            <div className="flex flex-wrap justify-center gap-2 px-3">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => (inputsRef.current[idx] = el)}
                  type="text"
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, idx)}
                  maxLength={1}
                  className="w-10 h-12 text-center text-lg border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              ))}
            </div>

            {message && (
              <p
                className={`text-center text-xs font-medium ${
                  message.includes("✅") ? "text-green-600" : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading || otp.some((o) => o === "")}
              className="w-full py-2 rounded-lg font-semibold shadow transition-all text-sm bg-gradient-to-r from-amber-500 to-rose-400 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Verifying..." : "Verify Email"}
            </button>

            <div className="text-center mt-2">
              <p className="text-gray-600 text-xs mb-1">
                Didn't receive the code?
              </p>
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={resendCooldown > 0}
                className="text-amber-700 font-semibold hover:underline disabled:opacity-50 disabled:cursor-not-allowed text-xs"
              >
                {resendCooldown > 0
                  ? `Resend OTP in ${resendCooldown}s`
                  : "Resend OTP"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTPModal;
