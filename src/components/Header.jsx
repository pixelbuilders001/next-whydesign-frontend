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
  Home,
  Users,
  Calendar,
  Video,
  FileText,
  Contact,
  Layout,
  Palette,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/useAuth";
import { motion, AnimatePresence } from "framer-motion";

import logo from "../../public/logo3c.png";
import logo2 from "../../public/logo3.png";
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
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

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
  };

  const closeMenu = () => {
    setIsMenuAnimating(false);
    setIsMenuOpen(false);
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
      if (!event.target.closest(".services-dropdown-container"))
        setIsServicesDropdownOpen(false); // Add this line
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
    { name: "Home", href: "/", icon: Home },
    { name: "About Us", href: "/about-us", icon: Users },
    { name: "Book Counselling", href: "#booking", icon: Calendar },
    { name: "Videos", href: "#videos", icon: Video },
    { name: "Blogs", href: "/blogs", icon: FileText },
    { name: "Contact", href: "#contact", icon: Contact },
    // { name: "Services", href: "/services/website-design", icon: Contact, isNew: true }
  ];

  const servicesItems = [
    {
      name: "Website Design",
      href: "/services/website-design",
      icon: Layout,
      description: "Custom website design and development"
    },
    {
      name: "Logo Design",
      href: "/services/logo-design",
      icon: Palette,
      description: "Professional logo design services"
    },
  ];

  const quickActions = [
    { name: "My Profile", icon: User, href: "/profile" },
    { name: "Notifications", icon: Bell, href: "/notifications" },
    { name: "Saved Items", icon: Heart, href: "/saved" },
    { name: "Payment Methods", icon: CreditCard, href: "/payments" },
  ];

  const supportItems = [
    { name: "Privacy Policy", icon: Shield, href: "/privacy-policy" },
    { name: "Terms & Conditions", icon: Shield, href: "/terms-conditions" },
  ];

  const handleCall = () => {
    window.open("tel:+917007894388", "_self");
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Hi! I'd like to know more about your services."
    );
    window.open(`https://wa.me/7007894388?text=${message}`, "_blank");
  };

  const getUserName = () => {
    if (status === "authenticated" && session) {
      return session.user.name;
    } else if (userProfile?.data?.firstName && userProfile?.data?.lastName) {
      return `${userProfile.data.firstName} ${userProfile.data.lastName}`;
    } else if (customUser?.firstName && customUser?.lastName) {
      return `${customUser.firstName} ${customUser.lastName}`;
    }
    return customUser?.name || customUser?.email || "User";
  };

  const getUserEmail = () => {
    if (status === "authenticated" && session) {
      return session.user.email;
    }
    return customUser?.email || userProfile?.data?.email || "Authenticated";
  };

  const getUserImage = () => {
    if (status === "authenticated" && session) {
      return session.user.image || "/logo.png";
    } else if (customAuthenticated && userProfile?.data?.profilePicture) {
      return userProfile.data.profilePicture;
    }
    return "/logo3.png";
  };

  const getUserAltText = () => {
    const name = getUserName();
    return name === "User" ? "User profile picture" : `Profile picture of ${name}`;
  };

  return (
    <>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? "bg-stone-50/95 backdrop-blur-md shadow-lg border-b border-stone-200/50"
          : "bg-transparent"
          }`}
      >
        <div className="sm:px-6 lg:px-16 mx-auto">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" aria-label="Why Designers Home">
                <Image
                  src={isScrolled ? logo2 : logo}
                  alt="Why `Designers - Fashion Education Platform"
                  width={45}
                  height={45}
                  className="ml-4 border rounded-full lg:ml-0 cursor-pointer hover:opacity-80 transition-opacity"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center justify-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-label={`Navigate to ${item.name}`}
                  className={`font-medium text-sm transition-colors duration-200 ${isScrolled
                    ? "text-gray-700 hover:text-primary-600"
                    : "text-white/90 hover:text-primary-300"
                    }`}
                >
                  {item.name}
                </Link>
              ))}

              {/* Services Dropdown */}
              <div className="relative services-dropdown-container">
                <button
                  onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                  onMouseEnter={() => setIsServicesDropdownOpen(true)}
                  className={`flex items-center space-x-1 font-medium text-sm transition-colors duration-200 ${isScrolled
                    ? "text-gray-700 hover:text-primary-600"
                    : "text-white/90 hover:text-primary-300"
                    }`}
                >
                  <span>Services</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${isServicesDropdownOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {/* Services Dropdown Menu */}
                {isServicesDropdownOpen && (
                  <div
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100/50 backdrop-blur-xl z-50 overflow-hidden"
                    onMouseLeave={() => setIsServicesDropdownOpen(false)}
                  >
                    <div className="p-2">
                      {servicesItems.map((service, index) => (
                        <Link
                          key={service.name}
                          href={service.href}
                          onClick={() => setIsServicesDropdownOpen(false)}
                          className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 transition-all duration-200 group"
                        >
                          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
                            <service.icon size={18} className="text-primary-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 group-hover:text-primary-700">
                              {service.name}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              {service.description}
                            </p>
                          </div>
                          <ChevronRight
                            size={16}
                            className="text-gray-400 group-hover:text-primary-600 transition-colors"
                          />
                        </Link>
                      ))}
                    </div>

                    {/* View All Services Link */}
                    {/* <div className="border-t border-gray-100 p-3 bg-gray-50/50">
                      <Link
                        href="/services"
                        onClick={() => setIsServicesDropdownOpen(false)}
                        className="block text-center text-primary-600 font-medium text-sm hover:text-primary-700 transition-colors py-2"
                      >
                        View All Services
                      </Link>
                    </div> */}
                  </div>
                )}
              </div>
            </nav>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <button
                onClick={handleCall}
                aria-label="Call us now"
                className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-primary-600 to-secondary-500 hover:from-primary-700 hover:to-secondary-600 text-white rounded-full font-semibold text-xs shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                <Phone size={16} />
                <span>Call Us</span>
              </button>
              <button
                onClick={handleWhatsApp}
                aria-label="Contact us on WhatsApp"
                className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-accent-500 to-primary-400 hover:from-accent-600 hover:to-primary-500 text-white rounded-full font-semibold text-xs shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                <MessageCircle size={16} />
                <span>WhatsApp</span>
              </button>

              {/* Auth / Profile */}
              {(status === "authenticated" && session) || customAuthenticated ? (
                <div className="relative dropdown-container">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    aria-expanded={isDropdownOpen}
                    aria-label="User menu"
                    className="flex items-center space-x-2 p-1 rounded-full transition-all duration-200 hover:bg-white/10"
                  >
                    <Image
                      src={getUserImage()}
                      alt={getUserAltText()}
                      width={35}
                      height={35}
                      className="rounded-full"
                    />
                    <ChevronDown
                      size={18}
                      className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""
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
                            <Image
                              src={getUserImage()}
                              alt={getUserAltText()}
                              fill
                              className="object-cover rounded-full"
                            />
                          </div>

                          {/* User Info */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-semibold text-lg truncate">
                              {getUserName()}
                            </h3>
                            <p className="text-white/80 text-sm truncate">
                              {getUserEmail()}
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
                              aria-label="Complete your profile"
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
                          aria-label="Sign out of your account"
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
                  aria-label="Login or sign up"
                  className={`p-2.5 rounded-full transition-all duration-200 ${isScrolled
                    ? "text-gray-700 hover:text-primary-600 hover:bg-primary-50"
                    : "text-white hover:text-primary-300 hover:bg-white/20"
                    }`}
                >
                  <User size={20} />
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden mr-4">
              <button
                onClick={isMenuOpen ? closeMenu : openMenu}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className={`p-2 rounded-lg transition-all duration-200 ${isScrolled
                  ? "text-gray-700 hover:text-primary-600 hover:bg-primary-50"
                  : "text-white hover:text-primary-300 hover:bg-white/20"
                  }`}
              >
                {isMenuOpen ? null : <Menu size={34} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Mobile Menu - Left Side Slide In */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-[9999] flex">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeMenu}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="relative h-full w-[85%] max-w-[300px] bg-white/95 backdrop-blur-2xl shadow-2xl flex flex-col border-r border-white/20 overflow-hidden rounded-r-3xl"
            >
              {/* Top Banner / Header */}
              <div className="relative overflow-hidden pt-6 pb-4 px-6">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 -z-10" />
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/5 rounded-full blur-xl" />

                <div className="flex items-center justify-end mb-4">
                  <button
                    onClick={closeMenu}
                    className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors backdrop-blur-md border border-white/10"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* User Status */}
                {(status === "authenticated" && session) || customAuthenticated ? (
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-white/30 shadow-xl">
                        <Image
                          src={getUserImage()}
                          alt={getUserAltText()}
                          fill
                          className="object-cover rounded-full"
                        />
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-white rounded-full shadow-lg" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-bold text-base leading-tight truncate">
                        {getUserName()}
                      </h3>
                      <p className="text-white/80 text-[10px] font-medium truncate mt-0.5">
                        {getUserEmail()}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <h3 className="text-white font-bold text-lg leading-tight">
                      Explore Premium<br />Design Education
                    </h3>
                    <button
                      onClick={() => {
                        setAuthType("login");
                        setAuthOpen(true);
                        closeMenu();
                      }}
                      className="bg-white text-primary-600 px-5 py-2 rounded-xl font-bold text-xs shadow-xl active:scale-95 transition-all w-fit hover:bg-primary-50"
                    >
                      Sign In to Begin
                    </button>
                  </div>
                )}
              </div>

              {/* Scrollable Navigation */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden py-6 px-4 space-y-8 custom-scrollbar">
                {/* Main Navigation */}
                <div className="space-y-4">
                  <h4 className="px-4 text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                    Main Menu
                  </h4>
                  <div className="space-y-1">
                    {navItems.map((item, i) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          onClick={closeMenu}
                          className="group flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 hover:bg-primary-50"
                        >
                          <div className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl group-hover:bg-white group-hover:shadow-md transition-all">
                            <item.icon size={20} className="text-gray-500 group-hover:text-primary-600" />
                          </div>
                          <span className="font-semibold text-gray-700 group-hover:text-primary-700">
                            {item.name}
                          </span>
                          <ChevronRight
                            size={16}
                            className="ml-auto text-gray-300 group-hover:text-primary-400 transform group-hover:translate-x-1 transition-all"
                          />
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Services Section */}
                <div className="space-y-4">
                  <h4 className="px-4 text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                    Professional Services
                  </h4>
                  <div className="space-y-1">
                    {servicesItems.map((service, i) => (
                      <motion.div
                        key={service.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                      >
                        <Link
                          href={service.href}
                          onClick={closeMenu}
                          className="group flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 hover:bg-secondary-50"
                        >
                          <div className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl group-hover:bg-white group-hover:shadow-md transition-all">
                            <service.icon size={20} className="text-gray-500 group-hover:text-secondary-600" />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="font-semibold text-gray-700 group-hover:text-secondary-700">
                              {service.name}
                            </p>
                            <p className="text-[11px] text-gray-500 truncate group-hover:text-gray-600">
                              {service.description}
                            </p>
                          </div>
                          <ChevronRight
                            size={16}
                            className="text-gray-300 group-hover:text-secondary-400 transform group-hover:translate-x-1 transition-all"
                          />
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Sign Out Item (Inside List) */}
                {((status === "authenticated" && session) || customAuthenticated) && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <button
                      onClick={() => {
                        if (status === "authenticated" && session) signOut({ callbackUrl: "/" });
                        else customLogout();
                        closeMenu();
                      }}
                      className="group flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 hover:bg-red-50 w-full"
                    >
                      <div className="w-10 h-10 flex items-center justify-center bg-red-50 rounded-xl group-hover:bg-white group-hover:shadow-md transition-all">
                        <LogOut size={20} className="text-red-500" />
                      </div>
                      <span className="font-semibold text-red-600 text-left">Sign Out</span>
                      <ChevronRight
                        size={16}
                        className="ml-auto text-red-200 group-hover:text-red-400 transform group-hover:translate-x-1 transition-all"
                      />
                    </button>
                  </motion.div>
                )}
              </div>

              {/* Bottom Actions Footer */}
              <div className="mt-auto p-4 bg-gray-50 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      handleCall();
                      closeMenu();
                    }}
                    className="flex flex-col items-center justify-center gap-2 h-16 px-3 rounded-2xl bg-white border border-gray-100 shadow-sm active:scale-95 transition-all hover:bg-amber-50 group"
                  >
                    <div className="w-7 h-7 flex items-center justify-center bg-amber-100/50 rounded-full group-hover:bg-amber-100 transition-colors">
                      <Phone size={14} className="text-amber-600" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wider">Call Us</span>
                  </button>

                  <button
                    onClick={() => {
                      handleWhatsApp();
                      closeMenu();
                    }}
                    className="flex flex-col items-center justify-center gap-2 h-16 px-3 rounded-2xl bg-white border border-gray-100 shadow-sm active:scale-95 transition-all hover:bg-green-50 group"
                  >
                    <div className="w-7 h-7 flex items-center justify-center bg-green-100/50 rounded-full group-hover:bg-green-100 transition-colors">
                      <MessageCircle size={14} className="text-green-600" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wider">WhatsApp</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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