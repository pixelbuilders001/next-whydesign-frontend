"use client";

import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Phone,
  MessageCircle,
  LogOut,
  ChevronDown,
  User,
  Bell,
  Heart,
  CreditCard,
  HelpCircle,
  Shield,
  Star,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/useAuth";

import logo from "../../public/logo.png";
import AuthModal from "./AuthModal";
import CompleteProfileModal from "./CompleteProfileModal";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuAnimating, setIsMenuAnimating] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authType, setAuthType] = useState("login");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const { data: session, status } = useSession();
  const {
    isAuthenticated: customAuthenticated,
    user: customUser,
    logout: customLogout,
    getUserProfile,
    setShowProfileModal,
  } = useAuth();

  const router = useRouter();
  const pathname = usePathname();

  // Handle scroll effect - only on home page
  useEffect(() => {
    if (pathname === "/") {
      const handleScroll = () => setIsScrolled(window.scrollY > 50);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setIsScrolled(true);
    }
  }, [pathname]);

  // Menu open animation
  const openMenu = () => {
    setIsMenuOpen(true);
    setTimeout(() => setIsMenuAnimating(true), 10);
  };

  const closeMenu = () => {
    setIsMenuAnimating(false);
    setTimeout(() => setIsMenuOpen(false), 300);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container"))
        setIsDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Refresh page when session becomes authenticated
  useEffect(() => {
    if (status === "authenticated") router.refresh();
  }, [status, router]);

  // Fetch user profile data when authenticated
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (customAuthenticated && !session) {
        try {
          const result = await getUserProfile();
          if (result.success) {
            setUserProfile(result.user);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, [customAuthenticated, session, getUserProfile]);

  const navItems = [
    { name: "Home", href: "/", icon: "🏠" },
    { name: "About Us", href: "/about-us", icon: "👥" },
    // { name: "Study Abroad", href: "#study-abroad", icon: "🌎" },
    { name: "Book Counselling", href: "#booking", icon: "📅" },
    { name: "Videos", href: "#videos", icon: "🎥" },
    { name: "Contact", href: "#contact", icon: "📞" },
  ];

  const quickActions = [
    { name: "My Profile", icon: User, href: "/profile" },
    { name: "Notifications", icon: Bell, href: "/notifications" },
    { name: "Saved Items", icon: Heart, href: "/saved" },
    { name: "Payment Methods", icon: CreditCard, href: "/payments" },
  ];

  const supportItems = [
    // { name: "Help & Support", icon: HelpCircle },
    { name: "Privacy Policy", icon: Shield, href: "/privacy-policy" },

    { name: "Terms & Conditions", icon: Shield, href: "/terms-conditions" },
    // { name: "Rate Us", icon: Star },
  ];



  const handleCall = () => {
    window.open("tel:+917461824651", "_self");
  };
  
  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hi! I’d like to know more about your services.");
    window.open(`https://wa.me/7461824651?text=${message}`, "_blank");
  };
  return (
    <>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-stone-50/95 backdrop-blur-md shadow-lg border-b border-stone-200/50"
            : "bg-transparent"
        }`}
      >
        <div className="sm:px-6 lg:px-16 mx-auto">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <Image
                  src={logo}
                  alt="Logo"
                  width={50}
                  height={50}
                  className="ml-4 border rounded-lg lg:ml-0 cursor-pointer hover:opacity-80 transition-opacity"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center justify-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`font-medium transition-colors duration-200 ${
                    isScrolled
                      ? "text-gray-700 hover:text-primary-600"
                      : "text-white/90 hover:text-primary-300"
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <button   onClick={handleCall} className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-primary-600 to-secondary-500 hover:from-primary-700 hover:to-secondary-600 text-white rounded-full font-semibold text-sm shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <Phone size={16} />
                <span>Call Us</span>
              </button>
              <button   onClick={handleWhatsApp} className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-accent-500 to-primary-400 hover:from-accent-600 hover:to-primary-500 text-white rounded-full font-semibold text-sm shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <MessageCircle size={16} />
                <span>WhatsApp</span>
              </button>

              {/* Auth / Profile - PRESERVED DESKTOP DROPDOWN */}
              {(status === "authenticated" && session) ||
              customAuthenticated ? (
                <div className="relative dropdown-container">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-3 p-2 rounded-full transition-all duration-200 hover:bg-white/10"
                  >
                    {status === "authenticated" && session ? (
                      <Image
                        src={session.user.image || "/logo.png"}
                        alt="Profile"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    ) : customAuthenticated &&
                      userProfile?.data?.profilePicture ? (
                      <Image
                        src={userProfile.data.profilePicture}
                        alt="Profile"
                        fill
                        className="object-cover rounded-full"
                      />
                    ) : (
                      <div
                        className={`p-2.5 rounded-full ${
                          isScrolled
                            ? "bg-primary-100 text-primary-600"
                            : "bg-white/20 text-white"
                        }`}
                      >
                        <User size={20} />
                      </div>
                    )}
                    <ChevronDown
                      size={18}
                      className={`transition-transform ${
                        isDropdownOpen ? "rotate-180" : ""
                      } ${isScrolled ? "text-gray-700" : "text-white"}`}
                    />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-4 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100/50 backdrop-blur-xl z-50 overflow-hidden">
                      {/* Header */}
                      <div className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-500 p-6">
                        <div className="absolute inset-0 bg-black/10"></div>

                        <div className="relative flex items-center space-x-4">
                          {/* Profile Image */}
                          <div className="relative w-14 h-14 rounded-full overflow-hidden ring-4 ring-white/30 shadow-lg">
                            {status === "authenticated" && session ? (
                              <Image
                                src={session.user.image || "/logo.png"}
                                alt="Profile"
                                fill
                                className="object-cover rounded-full"
                              />
                            ) : customAuthenticated &&
                              userProfile?.data?.profilePicture ? (
                              <Image
                                src={userProfile.data.profilePicture}
                                alt="Profile"
                                fill
                                className="object-cover rounded-full"
                              />
                            ) : (
                              <div className="w-full h-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                <User size={24} className="text-white" />
                              </div>
                            )}
                          </div>

                          {/* User Info */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-semibold text-lg truncate">
                              {status === "authenticated" && session
                                ? session.user.name
                                : userProfile?.data?.firstName &&
                                  userProfile?.data?.lastName
                                ? `${userProfile.data.firstName} ${userProfile.data.lastName}`
                                : customUser?.firstName && customUser?.lastName
                                ? `${customUser.firstName} ${customUser.lastName}`
                                : customUser?.name ||
                                  customUser?.email ||
                                  "User"}
                            </h3>

                            <p className="text-white/80 text-sm truncate">
                              {status === "authenticated" && session
                                ? session.user.email
                                : customUser?.email ||
                                  userProfile?.data?.email ||
                                  "Authenticated"}
                            </p>

                            {userProfile?.data?.phoneNumber && (
                              <p className="text-white/70 text-xs mt-1 flex items-center">
                                <Phone size={12} className="mr-1" />
                                {userProfile.data.phoneNumber}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Profile Actions */}
                      <div className="p-4 space-y-2">
                        {status !== "authenticated" || !session ? (
                          <>
                            <button
                              onClick={() => {
                                setShowProfileModal(true);
                                setIsDropdownOpen(false);
                              }}
                              className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-primary-50 to-secondary-50 hover:from-primary-100 hover:to-secondary-100 rounded-xl transition-all duration-200 group"
                            >
                              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                                <User size={18} className="text-primary-600" />
                              </div>
                              <div className="flex-1 text-left">
                                <p className="font-medium text-gray-900">
                                  Complete Profile
                                </p>
                                <p className="text-sm text-gray-500">
                                  Add your details and preferences
                                </p>
                              </div>
                              <ChevronDown
                                size={16}
                                className="text-gray-400 rotate-[-90deg]"
                              />
                            </button>

                            <div className="border-t border-gray-100 my-3"></div>
                          </>
                        ) : null}

                        {/* Logout */}
                        <button
                          onClick={() => {
                            if (status === "authenticated" && session) {
                              signOut({ callbackUrl: "/" });
                            } else {
                              customLogout();
                            }
                            setIsDropdownOpen(false);
                          }}
                          className="w-full flex items-center space-x-3 p-3 bg-red-50 hover:bg-red-100 rounded-xl transition-all duration-200 group"
                        >
                          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                            <LogOut size={18} className="text-red-600" />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="font-medium text-gray-900">
                              Sign Out
                            </p>
                            <p className="text-sm text-gray-500">
                              End your session
                            </p>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => {
                    setAuthType("login");
                    setAuthOpen(true);
                  }}
                  className={`p-2.5 rounded-full transition-all duration-200 ${
                    isScrolled
                      ? "text-gray-700 hover:text-primary-600 hover:bg-primary-50"
                      : "text-white hover:text-primary-300 hover:bg-white/20"
                  }`}
                >
                  <User size={20} />
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden mr-2">
              <button
                onClick={isMenuOpen ? closeMenu : openMenu}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  isScrolled
                    ? "text-gray-700 hover:text-primary-600 hover:bg-primary-50"
                    : "text-white hover:text-primary-300 hover:bg-white/20"
                }`}
              >
                {isMenuOpen ? null : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Mobile Menu - Left Side Slide In */}
      {isMenuOpen && (
        <div
          className={`fixed inset-0 z-[9999] transition-all duration-300 ease-in-out ${
            isMenuAnimating ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          {/* Overlay */}
          <div className="absolute inset-0" onClick={closeMenu}></div>

          {/* Left Side Sliding Menu */}
          <div
            className={`absolute top-0 left-0 h-full w-85 max-w-full shadow-2xl border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out bg-white ${
              isMenuAnimating ? "translate-x-0" : "-translate-x-full"
            }`}
            style={{ zIndex: 10 }}
          >
            {/* Header Section */}
            <div className="bg-gradient-to-r from-primary-600 to-secondary-500 p-6 pb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-bold text-xl">Menu</h2>
                <button
                  onClick={closeMenu}
                  className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* User Profile Card */}
              {(status === "authenticated" && session) ||
              customAuthenticated ? (
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                  <div className="flex items-center space-x-3">
                    {/* Profile Image */}
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/30 shadow-lg">
                      {status === "authenticated" && session ? (
                        <Image
                          src={session.user.image || "/logo.png"}
                          alt="Profile"
                          fill
                          className="object-cover rounded-full"
                        />
                      ) : customAuthenticated &&
                        userProfile?.data?.profilePicture ? (
                        <Image
                          src={userProfile.data.profilePicture}
                          alt="Profile"
                          fill
                          className="object-cover rounded-full"
                        />
                      ) : (
                        <div className="w-full h-full bg-white/20 flex items-center justify-center">
                          <User size={24} className="text-white" />
                        </div>
                      )}
                    </div>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold text-lg truncate">
                        {status === "authenticated" && session
                          ? session.user.name
                          : userProfile?.data?.firstName &&
                            userProfile?.data?.lastName
                          ? `${userProfile.data.firstName} ${userProfile.data.lastName}`
                          : customUser?.firstName && customUser?.lastName
                          ? `${customUser.firstName} ${customUser.lastName}`
                          : customUser?.name || customUser?.email || "User"}
                      </h3>
                      <p className="text-white/80 text-sm truncate">
                        {status === "authenticated" && session
                          ? session.user.email
                          : customUser?.email ||
                            userProfile?.data?.email ||
                            "Authenticated"}
                      </p>
                      {userProfile?.data?.phoneNumber && (
                        <p className="text-white/70 text-xs mt-1 flex items-center">
                          <Phone size={12} className="mr-1" />
                          {userProfile.data.phoneNumber}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <button
                    onClick={() => {
                      setAuthType("login");
                      setAuthOpen(true);
                      closeMenu();
                    }}
                    className="bg-white text-primary-600 px-6 py-3 rounded-full font-semibold text-sm hover:bg-gray-50 transition-colors shadow-lg"
                  >
                    Login / Sign Up
                  </button>
                </div>
              )}
            </div>
    {/* Profile Actions */}
    <div className="p-4 space-y-2">
                        {status !== "authenticated" || !session ? (
                          <>
                            <button
                              onClick={() => {
                                setShowProfileModal(true);
                                closeMenu();
                              }}
                              className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-primary-50 to-secondary-50 hover:from-primary-100 hover:to-secondary-100 rounded-xl transition-all duration-200 group"
                            >
                              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                                <User size={18} className="text-primary-600" />
                              </div>
                              <div className="flex-1 text-left">
                                <p className="font-medium text-gray-900">Complete Profile</p>
                                <p className="text-sm text-gray-500">Add your details and preferences</p>
                              </div>
                              <ChevronDown size={16} className="text-gray-400 rotate-[-90deg]" />
                            </button>

                            <div className="border-t border-gray-100 my-3"></div>
                          </>
                        ) : null}
                      </div>
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pb-20">
              {/* Quick Actions */}
              {/* {((status === "authenticated" && session) ||
                customAuthenticated) && (
                <div className="p-4 border-b border-gray-100">
                  <div className="grid grid-cols-2 gap-3">
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        className="flex flex-col items-center p-3 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors group"
                      >
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center group-hover:bg-primary-200 transition-colors mb-2">
                          <action.icon size={18} className="text-primary-600" />
                        </div>
                        <span className="text-xs font-medium text-gray-700 text-center">
                          {action.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )} */}

              {/* Navigation Menu */}
              <div className="p-4">
                <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3 px-2">
                  Navigation
                </h3>
                <div className="space-y-1">
                  {navItems.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      onClick={closeMenu}
                      className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                    >
                      <span className="text-lg w-6 text-center">
                        {item.icon}
                      </span>
                      <span className="flex-1 font-medium text-gray-700">
                        {item.name}
                      </span>
                      <ChevronRight
                        size={16}
                        className="text-gray-400 group-hover:text-gray-600"
                      />
                    </a>
                  ))}
                </div>
              </div>

              {/* Support Section */}
              <div className="p-4 border-t border-gray-100">
                <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3 px-2">
                  Support
                </h3>
                <div className="space-y-1">
                  {supportItems.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group w-full text-left"
                    >
                      <item.icon size={18} className="text-gray-500" />
                      <span className="flex-1 font-medium text-gray-700">
                        {item.name}
                      </span>
                      <ChevronRight
                        size={16}
                        className="text-gray-400 group-hover:text-gray-600"
                      />
                    </a>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="mt-4 px-3.5 flex flex-col gap-3">
                <button   onClick={handleCall} className="flex items-center justify-center space-x-2 px-4 py-3 border border-amber-500 text-amber-500 rounded-md font-medium text-base hover:bg-amber-50 hover:scale-105 transition-all duration-200">
                  {" "}
                  <Phone size={16} /> <span>Call Us</span>{" "}
                </button>{" "}
                <button 
                onClick={handleWhatsApp}
                className="w-full flex items-center justify-center space-x-2 py-3.5 border border-green-500 text-green-500 rounded-md font-medium text-base hover:bg-green-50 hover:scale-105 transition-all duration-200">
                  {" "}
                  <MessageCircle size={16} /> <span>WhatsApp</span>{" "}
                </button>{" "}
             
              </div>

              {/* Logout Section */}
              {((status === "authenticated" && session) ||
                customAuthenticated) && (
                <div className="p-4 border-t border-gray-100">
                  <button
                    onClick={() => {
                      if (status === "authenticated" && session) {
                        signOut({ callbackUrl: "/" });
                      } else {
                        customLogout();
                      }
                      closeMenu();
                    }}
                    className="w-full flex items-center justify-center space-x-2 py-3.5 border border-red-500 text-red-500 rounded-xl font-semibold text-sm hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            {/* <div className="absolute bottom-0 left-0 right-0 bg-gray-50 border-t border-gray-200 p-4">
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  © 2024 Your Company. All rights reserved.
                </p>
                <p className="text-xs text-gray-400 mt-1">Version 1.0.0</p>
              </div>
            </div> */}
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        open={authOpen}
        type={authType}
        onClose={() => setAuthOpen(false)}
        setAuthType={setAuthType}
      />
    </>
  );
};

export default Header;
