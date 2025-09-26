"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { signIn } from "next-auth/react";
import { registerUser } from "@/lib/authService";

const AuthModal = ({ open, type, onClose, setAuthType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (type === "signup" && password !== confirmPassword) {
      setMessage("❌ Passwords do not match!");
      return;
    }

    try {
      if (type === "signup") {
        await registerUser(email, password);
        setMessage("✅ Registration successful!");
      } else {
        // login flow (you can replace with signIn or custom logic)
        await signIn("credentials", { email, password, redirect: false });
        setMessage("✅ Logged in successfully!");
      }
    } catch (err) {
      setMessage("❌ " + err.message);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 min-h-screen overflow-y-auto">
      <div className="relative w-full max-w-md p-0">
        <div className="absolute inset-0 rounded-3xl bg-white opacity-95"></div>
        <div className="relative bg-gradient-to-b from-stone-50 to-rose-50/40 rounded-3xl shadow-2xl p-8">
          <button
            className="absolute top-4 right-4 text-stone-400 hover:text-amber-600 transition-colors"
            onClick={onClose}
          >
            <X size={28} />
          </button>
          <h2 className="text-3xl font-serif font-light text-gray-900 mb-6 text-center">
            {type === "login" ? "Welcome Back" : "Create Account"}
            <span className="block text-amber-700 font-normal text-xl mt-2">
              {type === "login"
                ? "Login to continue"
                : "Sign up to get started"}
            </span>
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-3 border border-stone-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 text-lg text-gray-900"
              required
            />

            {/* Password */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-stone-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 text-lg text-gray-900"
              required
            />

            {/* Confirm Password only for signup */}
            {type === "signup" && (
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-stone-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 text-lg text-gray-900"
                required
              />
            )}

            {/* Error or success message */}
            {message && (
              <p className="text-center text-sm font-medium text-red-600">
                {message}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold shadow-lg transition-all text-lg bg-gradient-to-r from-amber-500 to-rose-400 text-white shadow-md"
            >
              {type === "login" ? "Login" : "Signup"}
            </button>

            {/* Switch between login/signup */}
            {type === "login" && setAuthType && (
              <div className="text-center mt-4 text-gray-700 text-base">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  className="text-amber-700 font-semibold hover:underline"
                  onClick={() => setAuthType("signup")}
                >
                  Register now for free
                </button>
              </div>
            )}
            {type === "signup" && setAuthType && (
              <div className="text-center mt-4 text-gray-700 text-base">
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-amber-700 font-semibold hover:underline"
                  onClick={() => setAuthType("login")}
                >
                  Login
                </button>
              </div>
            )}

            {/* Google Signin */}
            <div className="text-center mt-6">
              <button
                type="button"
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="w-full py-3 rounded-xl border border-stone-300 shadow-sm flex items-center justify-center gap-2 hover:bg-stone-100 transition"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google logo"
                  className="w-6 h-6"
                />
                Continue with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
