"use client";
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import logo from "../../public/logo.png";

const ModernLoader = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onFinish(), 800);
          return 100;
        }
        return prev + 1.5;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-stone-50 via-rose-50/20 to-amber-50/10 backdrop-blur-sm">
      {/* Elegant Main Loader */}
      <div className="text-center px-8">
        {/* Premium Brand Logo */}
        <div className="mb-2">
          <div className="relative inline-block">
            <div className="w-20 h-20 mx-auto mb-4 relative">
              <Image
                src={logo}
                alt="WhyDesigners Logo"
                width={80}
                height={80}
                className="object-contain filter drop-shadow-lg"
              />
            </div>
            {/* <div className="w-16 h-0.5 bg-gradient-to-r from-amber-600 to-rose-500 rounded-full opacity-80 mx-auto"></div> */}
          </div>
        </div>

        {/* Premium Progress Bar */}
        <div className="w-96 max-w-sm mx-auto">
          <div className="relative h-1 bg-gray-200/60 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-amber-600 via-amber-500 to-rose-500 rounded-full transition-all duration-500 ease-out shadow-sm"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
            </div>
          </div>
          
          {/* Progress Percentage */}
          <div className="mt-4 text-lg text-gray-600 font-medium">
            {Math.round(progress)}%
          </div>
          
          {/* Minimal Progress Text */}
          <div className="mt-2 text-sm text-gray-500 font-light tracking-wider">
            {progress < 100 ? 'Loading...' : 'Ready'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernLoader;