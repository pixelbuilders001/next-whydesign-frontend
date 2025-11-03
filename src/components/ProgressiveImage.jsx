"use client";
import { useState } from 'react';
import Image from 'next/image';

const ProgressiveImage = ({ src, alt, fallbackColor = "bg-gradient-to-br from-purple-900 via-pink-800 to-rose-900" }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div 
        className={`absolute inset-0 ${fallbackColor}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <>
      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700 to-transparent animate-shimmer" />
        </div>
      )}
      
      {/* Actual image */}
      <Image
        fill
        src={src}
        alt={alt}
        className={`object-cover transition-all duration-700 ${
          isLoaded 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-105'
        }`}
        priority
        quality={80}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        sizes="100vw"
      />
    </>
  );
};  

export default ProgressiveImage;
