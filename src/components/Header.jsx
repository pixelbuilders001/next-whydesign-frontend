"use client";
import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageCircle, User } from 'lucide-react';
import Image from "next/image";

import logo from "../../public/logo.png"
import AuthModal from './AuthModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Study Abroad', href: '#study-abroad' },
    { name: 'Book Counselling', href: '#booking' },
    // { name: 'Courses', href: '#courses' },
    { name: 'Videos', href: '#videos' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-stone-50/95 backdrop-blur-md shadow-lg border-b border-stone-200/50' 
        : 'bg-transparent'
    }`}>
      <div className=" sm:px-6 lg:px-16 mx-auto">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
        src={logo} 
        alt="My Photo"
        width={50}
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
            className={`lg:hidden p-2 transition-colors duration-200 ${
              isScrolled ? 'text-gray-700' : 'text-white'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
   {isMenuOpen && (
  <div className="fixed inset-0 z-[999]">
    {/* Overlay */}
    <div
      className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      onClick={() => setIsMenuOpen(false)}
    />
    {/* Sliding Menu */}
    <div className="absolute top-0 left-0 h-full w-80 max-w-full bg-white/95 shadow-2xl border-r border-stone-200 px-6 py-8 flex flex-col gap-6 animate-in slide-in-from-left duration-300">
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-gray-700 hover:text-amber-600 transition-colors"
        onClick={() => setIsMenuOpen(false)}
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
            onClick={() => setIsMenuOpen(false)}
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
          onClick={() => { setAuthType('login'); setAuthOpen(true); setIsMenuOpen(false); }}
        >
          Login
        </button>
      </div>
    </div>
    {/* Mobile menu with slide-in animation */}
  </div>
)}
          <AuthModal
        open={authOpen}
        type={authType}
        onClose={() => setAuthOpen(false)}
          setAuthType={setAuthType}
      />
    </header>
  );
};

export default Header;