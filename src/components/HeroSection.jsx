"use client";
import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Black Glass Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(120deg, rgba(20,20,20,0.5) 60%, rgba(255, 193, 7, 0.06)), url('https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&fit=crop')`,
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />
      {/* Glassmorphism Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-stone-900/60 via-transparent to-amber-900/30 backdrop-blur-md" />

      {/* Floating Sparkles */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-20 left-1/4 animate-pulse">
          <Sparkles size={32} className="text-amber-400 opacity-80" />
        </div>
        <div className="absolute bottom-32 right-1/4 animate-pulse">
          <Sparkles size={28} className="text-rose-300 opacity-70" />
        </div>
        <div className="absolute top-1/2 left-3/4 animate-pulse">
          <Sparkles size={24} className="text-amber-300 opacity-60" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
         
          <h1 className="text-6xl sm:text-7xl lg:text-7xl font-serif font-light text-white mb-8 leading-tight drop-shadow-lg">
            <span className="block">Design Your</span>
            <span className="block text-amber-400 font-bold tracking-tight animate-gradient bg-gradient-to-r from-amber-400 via-rose-400 to-amber-600 bg-clip-text text-transparent">
              Fashion Future
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed font-light drop-shadow">
            Transform your passion into a profession with world-class fashion education, study abroad opportunities, and personalized career guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="group bg-gradient-to-r from-amber-600 to-rose-500 hover:from-amber-700 hover:to-rose-600 text-white px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center space-x-3 shadow-lg">
              <span>Start Your Journey</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform duration-200" size={22} />
            </button>
            {/* <button className="border-2 border-white/80 text-white hover:bg-white hover:text-gray-900 px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm shadow-lg">
              Watch Our Story
            </button> */}
          </div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-30">
        <div className="w-7 h-12 border-2 border-white/70 rounded-full flex justify-center items-start bg-black/30 backdrop-blur-md">
          <div className="w-1 h-4 bg-white/90 rounded-full mt-2 animate-pulse" />
        </div>
      </div> */}
    </section>
  );
};

export default HeroSection;