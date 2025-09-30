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
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/useAuth";

import logo from "../../public/logo.png";
import AuthModal from "./AuthModal";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuAnimating, setIsMenuAnimating] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authType, setAuthType] = useState("login");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: session, status } = useSession();
  const { isAuthenticated: customAuthenticated, user: customUser, logout: customLogout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Handle scroll effect - only on home page
  useEffect(() => {
    if (pathname === "/") {
      const handleScroll = () => setIsScrolled(window.scrollY > 50);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setIsScrolled(true); // Always show solid background on other pages
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

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Study Abroad", href: "#study-abroad" },
    { name: "Book Counselling", href: "#booking" },
    { name: "Videos", href: "#videos" },
    { name: "Contact", href: "#contact" },
  ];

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
              <button className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-primary-600 to-secondary-500 hover:from-primary-700 hover:to-secondary-600 text-white rounded-full font-semibold text-sm shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <Phone size={16} />
                <span>Call Us</span>
              </button>
              <button className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-accent-500 to-primary-400 hover:from-accent-600 hover:to-primary-500 text-white rounded-full font-semibold text-sm shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <MessageCircle size={16} />
                <span>WhatsApp</span>
              </button>

              {/* Auth / Profile */}
               {(status === "authenticated" && session) || customAuthenticated ? (
                 <div className="relative dropdown-container">
                   <button
                     onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                     className="flex items-center space-x-2 p-1 rounded-full transition-all duration-200 hover:bg-white/10"
                   >
                     {status === "authenticated" && session ? (
                       // Google OAuth profile picture (keep existing code)
                       <Image
                         src={session.user.image || "/logo.png"}
                         alt="Profile"
                         width={32}
                         height={32}
                         className="rounded-full"
                       />
                     ) : (
                       // Custom auth person icon
                       <div className={`p-1.5 rounded-full ${isScrolled ? "bg-primary-100 text-primary-600" : "bg-white/20 text-white"}`}>
                         <User size={18} />
                       </div>
                     )}
                     <ChevronDown
                       size={16}
                       className={`transition-transform ${
                         isDropdownOpen ? "rotate-180" : ""
                       } ${isScrolled ? "text-gray-700" : "text-white"}`}
                     />
                   </button>
                   {isDropdownOpen && (
                     <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                       {status === "authenticated" && session ? (
                         // Google OAuth dropdown (keep existing code)
                         <>
                           <div className="px-4 py-2 border-b border-gray-200">
                             <p className="text-sm font-medium text-gray-900">
                               {session.user.name}
                             </p>
                             <p className="text-xs text-gray-500">
                               {session.user.email}
                             </p>
                           </div>
                           <button
                             onClick={() => signOut({ callbackUrl: "/" })}
                             className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                           >
                             <LogOut size={16} />
                             <span>Logout</span>
                           </button>
                         </>
                       ) : (
                         // Custom auth dropdown
                         <>
                           <div className="px-4 py-2 border-b border-gray-200">
                             <p className="text-sm font-medium text-gray-900">
                               {customUser?.name || customUser?.email || "User"}
                             </p>
                             <p className="text-xs text-gray-500">
                               {customUser?.email || "Authenticated"}
                             </p>
                           </div>
                           <button
                             onClick={customLogout}
                             className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                           >
                             <LogOut size={16} />
                             <span>Logout</span>
                           </button>
                         </>
                       )}
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
                       : "text-white/90 hover:text-primary-300 hover:bg-white/10"
                   }`}
                 >
                   Login
                 </button>
               )}
            </div>

            {/* Mobile menu button */}
            <button
              className={`lg:hidden p-2 transition-colors duration-200 px-6 ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
              onClick={() => (isMenuOpen ? closeMenu() : openMenu())}
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div
          className={`fixed inset-0 z-[9999] transition-all duration-300 ease-in-out ${
            isMenuAnimating ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          {/* Overlay */}
          <div className="absolute inset-0" onClick={closeMenu}></div>

          {/* Sliding Menu */}
          <div
            className={`absolute top-0 left-0 h-full w-80 max-w-full shadow-2xl border-r border-stone-200 px-6 py-6 flex flex-col gap-4 overflow-y-auto transition-transform duration-300 ease-in-out bg-gradient-to-b from-white to-stone-50 ${
              isMenuAnimating ? "translate-x-0" : "-translate-x-full"
            }`}
            style={{ zIndex: 10 }}
          >
            {/* Logo + Close Button */}
         {/* Logo / User Info + Close Button */}
<div className="flex items-center justify-between mb-4">
  {((status === 'authenticated' && session) || customAuthenticated) ? (
    <div className="flex items-center space-x-3">
      {status === 'authenticated' && session ? (
        // Google OAuth profile (keep existing code)
        <Image
          src={session.user.image || '/logo.png'}
          alt="Profile"
          width={50}
          height={50}
          className="rounded-full border-2 border-amber-400"
        />
      ) : (
        // Custom auth person icon
        <div className="p-2 bg-primary-100 rounded-full border-2 border-primary-300">
          <User size={24} className="text-primary-600" />
        </div>
      )}
      <div className="flex flex-col">
        <p className="text-sm font-semibold text-gray-800">
          {status === 'authenticated' && session ? session.user.name : (customUser?.name || customUser?.email || "User")}
        </p>
        <p className="text-xs text-gray-500">
          {status === 'authenticated' && session ? session.user.email : (customUser?.email || "Authenticated")}
        </p>
      </div>
    </div>
  ) : (
    <Link href="/">
      <Image
        src={logo}
        alt="Logo"
        width={50}
        height={50}
        className="border rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
      />
    </Link>
  )}

  <button
    className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg text-gray-700 hover:text-amber-600 hover:bg-white transition-all duration-200"
    onClick={closeMenu}
  >
    <X size={24} />
  </button>
</div>


            {/* Navigation */}
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-lg font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200 px-4 py-3 rounded-xl border border-transparent hover:border-primary-200"
                  onClick={closeMenu}
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Mobile CTA Buttons */}
            <div className="mt-4 flex flex-col gap-3">
              <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-primary-500 text-primary-500 rounded-md font-medium text-base hover:bg-primary-50 hover:scale-105 transition-all duration-200">
                <Phone size={16} />
                <span>Call Us</span>
              </button>

              <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-accent-500 text-accent-500 rounded-md font-medium text-base hover:bg-accent-50 hover:scale-105 transition-all duration-200">
                <MessageCircle size={16} />
                <span>WhatsApp</span>
              </button>

              {((status === "authenticated" && session) || customAuthenticated) ? (
                <button
                  onClick={() => {
                    if (status === "authenticated" && session) {
                      signOut({ callbackUrl: "/" });
                    } else {
                      customLogout();
                    }
                    closeMenu();
                  }}
                  className="w-full py-3 border border-secondary-500 text-secondary-500 rounded-md font-medium text-base hover:bg-secondary-50 transition-all duration-200"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    setAuthType("login");
                    setAuthOpen(true);
                    closeMenu();
                  }}
                  className="w-full py-3 border bg-gray-400 text-white rounded-md font-medium text-base hover:bg-amber-50 transition-all duration-200"
                >
                  Login
                </button>
              )}
            </div>
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
