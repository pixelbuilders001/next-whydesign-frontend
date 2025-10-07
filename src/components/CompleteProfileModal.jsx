"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { userProfileUpdate } from "../lib/authService";

const CompleteProfileModal = ({ open, onClose, onProfileComplete, onSkip }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleProfilePicChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePic(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setMessage("Please enter your name");
      return;
    }

    if (!gender) {
      setMessage("Please select your gender");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const result = await userProfileUpdate(profilePic, name.trim(), gender);

      if (result.success) {
        const profileData = {
          name,
          age,
          gender,
          profilePic,
        };

        onProfileComplete(profileData);
        // Reset fields
        setMessage("");
        setName("");
        setAge("");
        setGender("");
        setProfilePic(null);
      } else {
        setMessage(result.message || "Failed to update profile. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred while updating your profile. Please try again.");
      console.error("Profile update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    if (onSkip) onSkip();
    // Reset fields
    setMessage("");
    setName("");
    setAge("");
    setGender("");
    setProfilePic(null);
  };

  if (!open) return null;

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
            Complete Your Profile
            <span className="block text-amber-700 font-normal text-base mt-1">
              Fill in the details to personalize your experience
            </span>
          </h2>

          {/* Form */}
          <form className="space-y-3" onSubmit={handleSubmit}>
            {/* Profile Picture */}
            <div className="flex flex-col items-center">
              <label className="cursor-pointer">
                <div className="w-24 h-24 rounded-full bg-stone-200 flex items-center justify-center overflow-hidden">
                  {profilePic ? (
                    <img
                      src={URL.createObjectURL(profilePic)}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500 text-sm">Upload</span>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Name */}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full px-3 py-2 border border-stone-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm text-gray-900"
            />

            {/* Gender */}
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-3 py-2 border border-stone-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm text-gray-900"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            {/* Age */}
            {/* <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Age"
              className="w-full px-3 py-2 border border-stone-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm text-gray-900"
              min={1}
              max={120}
            /> */}

            {/* Error / Info Message */}
            {message && (
              <p className="text-center text-xs font-medium text-red-600">
                {message}
              </p>
            )}

            {/* Save Profile Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer w-full py-2 rounded-lg font-semibold shadow transition-all text-sm bg-gradient-to-r from-amber-500 to-rose-400 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Saving..." : "Save Profile"}
            </button>

            {/* Skip Button */}
            <button
              type="button"
              onClick={handleSkip}
              className="cursor-pointer w-full py-2 mt-2 rounded-lg font-semibold shadow transition-all text-sm border border-stone-300 bg-white text-gray-700 hover:bg-stone-100"
            >
              Skip
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfileModal;
