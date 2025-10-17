"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { userProfileUpdate, getUserProfile } from "../lib/authService";

const CompleteProfileModal = ({ open, onClose, onProfileComplete, onSkip, initialData }) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  console.log("open", name);

  // Fetch and pre-populate user profile data when modal opens
  useEffect(() => {
    const fetchAndPopulateProfile = async () => {
      if (open && !initialData) {
        setIsLoadingProfile(true);
        try {
          const result = await getUserProfile();
         
          if (result.success && result.data.data) {
            const userData = result.data.data;
            console.log("open", result.data.data);
            // Pre-populate form fields
            if (userData.firstName) setName(userData.firstName);
            if (userData.lastName) setLastName(userData.lastName);
            if (userData.phoneNumber) setPhoneNumber(userData.phoneNumber);
            if (userData.dateOfBirth) {
              // Convert ISO date to "YYYY-MM-DD" format
              const formattedDate = new Date(userData.dateOfBirth).toISOString().split("T")[0];
              setDateOfBirth(formattedDate);
            }
            if (userData.gender) setGender(userData.gender);
            if (userData.address) setAddress(userData.address);
            if (userData.profilePicture) setProfilePicUrl(userData.profilePicture);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setMessage("Failed to load existing profile data");
        } finally {
          setIsLoadingProfile(false);
        }
      } else if (open && initialData) {
        // Use provided initial data
        if (initialData.firstName) setName(initialData.firstName);
        if (initialData.lastName) setLastName(initialData.lastName);
        if (initialData.phoneNumber) setPhoneNumber(initialData.phoneNumber);
        if (initialData.dateOfBirth) setDateOfBirth(initialData.dateOfBirth);
        if (initialData.gender) setGender(initialData.gender);
        if (initialData.address) setAddress(initialData.address);
        if (initialData.profilePicture) setProfilePicUrl(initialData.profilePicture);
      }
    };

    fetchAndPopulateProfile();
  }, [open, initialData]);

  const handleProfilePicChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      // Validate file size (5MB limit)
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setMessage("Profile picture must be less than 5MB");
        return;
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setMessage("Please select a valid image file (JPEG, PNG, GIF, WebP)");
        return;
      }

      setProfilePic(file);
      setMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setMessage("Please enter your first name");
      return;
    }

    if (!lastName.trim()) {
      setMessage("Please enter your last name");
      return;
    }

    if (!phoneNumber.trim()) {
      setMessage("Please enter your phone number");
      return;
    }

    if (!dateOfBirth) {
      setMessage("Please enter your date of birth");
      return;
    }

    if (!gender) {
      setMessage("Please select your gender");
      return;
    }

    // if (!address.trim()) {
    //   setMessage("Please enter your address");
    //   return;
    // }

    setIsLoading(true);
    setMessage("");

    try {
      const result = await userProfileUpdate(
        profilePic,
        name.trim(),
        lastName.trim(),
        phoneNumber.trim(),
        dateOfBirth,
        gender,
        address.trim()
      );

      if (result.success) {
        const profileData = {
          name: `${name.trim()} ${lastName.trim()}`,
          firstName: name.trim(),
          lastName: lastName.trim(),
          phoneNumber: phoneNumber.trim(),
          dateOfBirth,
          gender,
          address: address.trim(),
          profilePic: profilePicUrl,
        };

        onProfileComplete(profileData);
        // Reset fields
        setMessage("");
        setName("");
        setLastName("");
        setPhoneNumber("");
        setDateOfBirth("");
        setGender("");
        setAddress("");
        setProfilePic(null);
        setProfilePicUrl("");
        window.location.reload()
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
    setLastName("");
    setPhoneNumber("");
    setDateOfBirth("");
    setGender("");
    setAddress("");
    setProfilePic(null);
    setProfilePicUrl("");
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
          {/* <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {isLoadingProfile ? "Loading Profile..." : "Complete Your Profile"}
            </h2>
            <p className="text-sm text-gray-600">
              {isLoadingProfile 
                ? "Fetching your information..." 
                : "Please fill in your details to complete your profile"}
            </p>
          </div> */}

          {/* Loading indicator */}
          {isLoadingProfile && (
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
              <span className="ml-2 text-sm text-gray-600">Loading profile data...</span>
            </div>
          )}

          {!isLoadingProfile && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Profile Picture Upload */}
              <div className="flex flex-col items-center">
                <label className="cursor-pointer">
                  <div className="w-24 h-24 rounded-full bg-stone-200 flex items-center justify-center overflow-hidden">
                    {profilePic ? (
                      <img
                        src={URL.createObjectURL(profilePic)}
                        alt="Profile Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : profilePicUrl ? (
                      <img
                        src={profilePicUrl}
                        alt="Profile Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-500 text-sm">Upload</span>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    onChange={handleProfilePicChange}
                    className="hidden"
                  />
                </label>
                <p className="text-xs text-gray-500 mt-2">Click to upload profile picture</p>
              </div>

              {/* First Name */}
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="First Name"
                className="w-full px-3 py-2 border border-stone-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm text-gray-900"
              />

              {/* Last Name */}
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="w-full px-3 py-2 border border-stone-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm text-gray-900"
              />

              {/* Phone Number */}
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone Number"
                className="w-full px-3 py-2 border border-stone-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm text-gray-900"
              />

              {/* Date of Birth */}
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
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

              {/* Address */}
              {/* <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
                className="w-full px-3 py-2 border border-stone-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm text-gray-900"
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
          )}
        </div>
      </div>
    </div>
  );
};

export default CompleteProfileModal;