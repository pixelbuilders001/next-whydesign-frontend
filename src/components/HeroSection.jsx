"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroSection = () => {
  const imgRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY * 0.4; // parallax speed
          if (imgRef.current) {
            imgRef.current.style.transform = `translateY(${y}px) scale(1.1)`; // move + slight zoom
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Image */}
      <div className="absolute inset-0 overflow-hidden will-change-transform">
        <div
          ref={imgRef}
          className="w-full h-full will-change-transform transition-transform duration-75 ease-out"
        >
          <Image
            src="https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&fit=crop"
            alt="Fashion background"
            fill
            priority
        className="object-cover blur-sm"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      </div>

      {/* Sparkles */}
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
        <h1 className="text-6xl sm:text-7xl lg:text-7xl font-serif font-light text-white mb-8 leading-tight drop-shadow-lg">
          <span className="block">Design Your</span>
          <span className="block text-amber-400 font-bold tracking-tight animate-gradient bg-gradient-to-r from-amber-400 via-rose-400 to-amber-600 bg-clip-text text-transparent">
            Fashion Future
          </span>
        </h1>
        <p className="text-xl sm:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed font-light drop-shadow">
          Transform your passion into a profession with world-class fashion
          education, study abroad opportunities, and personalized career
          guidance.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="group bg-gradient-to-r from-amber-600 to-rose-500 hover:from-amber-700 hover:to-rose-600 text-white px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center space-x-3 shadow-lg">
            <span>Start Your Journey</span>
            <ArrowRight
              className="group-hover:translate-x-1 transition-transform duration-200"
              size={22}
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
