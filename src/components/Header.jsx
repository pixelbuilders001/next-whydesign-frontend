"use client";
import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageCircle, User } from 'lucide-react';
import Image from "next/image";

import logo from "../../public/logo.png"
import AuthModal from './AuthModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuAnimating, setIsMenuAnimating] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
    const [authOpen, setAuthOpen] = useState(false);
  const [authType, setAuthType] = useState('login');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle menu opening with animation
  const openMenu = () => {
    setIsMenuOpen(true);
    setTimeout(() => setIsMenuAnimating(true), 10);
  };

  // Handle menu closing with animation
  const closeMenu = () => {
    setIsMenuAnimating(false);
    setTimeout(() => setIsMenuOpen(false), 300);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Study Abroad', href: '#study-abroad' },
    { name: 'Book Counselling', href: '#booking' },
    // { name: 'Courses', href: '#courses' },
    { name: 'Videos', href: '#videos' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-stone-50/95 backdrop-blur-md shadow-lg border-b border-stone-200/50'
          : 'bg-transparent'
      }`}>
        <div className="sm:px-6 lg:px-16 mx-auto">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Image
          src={logo}
          alt="My Photo"
          width={50}
          className='ml-4 border rounded-lg lg:ml-0 '
          height={50}
        />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden  lg:flex items-center justify-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`font-medium transition-colors duration-200 ${
                    isScrolled
                      ? 'text-gray-700 hover:text-amber-600'
                      : 'text-white/90 hover:text-amber-300'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
    <button className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-amber-600 to-rose-500 hover:from-amber-700 hover:to-rose-600 text-white rounded-full font-semibold text-sm shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
      <Phone size={16} />
      <span>Call Us</span>
    </button>
    <button className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-green-500 to-amber-400 hover:from-green-600 hover:to-amber-500 text-white rounded-full font-semibold text-sm shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
      <MessageCircle size={16} />
      <span>WhatsApp</span>
    </button>
   <button
     onClick={() => { setAuthType('login'); setAuthOpen(true); }}
     className={`p-2.5 rounded-full transition-all duration-200 ${
       isScrolled
         ? 'text-gray-700 hover:text-amber-600 hover:bg-amber-50'
         : 'text-white/90 hover:text-amber-300 hover:bg-white/10'
     }`}
   >
     Login
   </button>
  </div>

            {/* Mobile menu button */}
            <button
              className={`lg:hidden p-2 transition-colors duration-200 px-6 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
              onClick={() => isMenuOpen ? closeMenu() : openMenu()}
            >
            <Menu size={28} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation - Moved Outside Header */}
      {isMenuOpen && (
        <div
          className={`fixed inset-0 z-[9999] transition-all duration-300 ease-in-out ${
            isMenuAnimating ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          {/* Overlay */}
          <div
            className="absolute inset-0"
            onClick={closeMenu}
          />
          {/* Sliding Menu */}
          <div
            className={`absolute top-0 left-0 h-full w-80 max-w-full shadow-2xl border-r border-stone-200 px-6 py-8 flex flex-col gap-6 overflow-y-auto transition-transform duration-300 ease-in-out ${
              isMenuAnimating ? 'transform translate-x-0' : 'transform -translate-x-full'
            }`}
            style={{ backgroundColor: '#ffffff', zIndex: 10 }}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-700 hover:text-amber-600 transition-colors duration-200"
              onClick={closeMenu}
            >
              <X size={28} />
            </button>
            {/* Logo */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold font-serif text-amber-600">why<span className="text-gray-900">designers</span></h1>
            </div>
            {/* Navigation */}
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-lg font-medium text-gray-700 hover:text-amber-600 transition-colors duration-200 px-2 py-2 rounded-lg"
                  onClick={closeMenu}
                >
                  {item.name}
                </a>
              ))}
            </nav>
            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 mt-8">
              <button className="flex items-center justify-center space-x-2 px-5 py-3 bg-gradient-to-r from-amber-600 to-rose-500 hover:from-amber-700 hover:to-rose-600 text-white rounded-full font-semibold text-base shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <Phone size={18} />
                <span>Call Us</span>
              </button>
              <button className="flex items-center justify-center space-x-2 px-5 py-3 bg-gradient-to-r from-green-500 to-amber-400 hover:from-green-600 hover:to-amber-500 text-white rounded-full font-semibold text-base shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                <MessageCircle size={18} />
                <span>WhatsApp</span>
              </button>
              <button
                className="w-full py-3 rounded-full font-semibold shadow-lg bg-amber-50 text-amber-700 hover:bg-amber-100 transition-all text-base"
                onClick={() => { setAuthType('login'); setAuthOpen(true); closeMenu(); }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

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