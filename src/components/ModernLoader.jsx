"use client";
import React, { useEffect, useState } from 'react';
import { Sparkles, Heart, Star } from 'lucide-react';

const ModernLoader = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState(0);

  const loadingTexts = [
    "Preparing your fashion journey...",
    "Loading amazing opportunities...",
    "Connecting to global design schools...",
    "Almost ready to inspire you..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onFinish(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const textInterval = setInterval(() => {
      setCurrentText(prev => (prev + 1) % loadingTexts.length);
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-stone-50 via-rose-50/30 to-amber-50/20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 animate-float">
          <Sparkles className="w-8 h-8 text-amber-400 opacity-60" />
        </div>
        <div className="absolute top-32 right-32 animate-float-delayed">
          <Heart className="w-6 h-6 text-rose-400 opacity-50" />
        </div>
        <div className="absolute bottom-20 left-32 animate-float">
          <Star className="w-7 h-7 text-amber-500 opacity-70" />
        </div>
        <div className="absolute bottom-32 right-20 animate-float-delayed">
          <Sparkles className="w-5 h-5 text-rose-500 opacity-60" />
        </div>
      </div>

      {/* Main loader */}
      <div className="relative z-10 text-center">
        {/* Logo/Brand */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-light text-gray-900 mb-2">
            why<span className="text-amber-600 font-bold">designers</span>
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-600 to-rose-500 mx-auto rounded-full"></div>
        </div>

        {/* Progress bar */}
        <div className="w-80 max-w-sm mx-auto mb-6">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-600 to-rose-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-600 mt-2 font-medium">
            {progress}%
          </div>
        </div>

        {/* Loading text */}
        <div className="text-lg text-gray-700 font-medium mb-8 min-h-[2rem]">
          {loadingTexts[currentText]}
        </div>

        {/* Animated fashion elements */}
        <div className="flex justify-center items-center space-x-4 mb-8">
          <div className="w-3 h-3 bg-amber-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-rose-600 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
        </div>

        {/* Inspirational quote */}
        <div className="text-sm text-gray-500 italic max-w-xs mx-auto">
          "Design is not just what it looks like and feels like. Design is how it works."
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-5deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ModernLoader;