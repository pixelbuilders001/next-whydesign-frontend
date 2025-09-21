"use client";
import React, { useState, useEffect } from 'react';
import { MapPin, Star } from 'lucide-react';
import { universities } from '../../data/universities.js';

// Image Loader Component
const ImageLoader = ({ src, alt, className, onLoad }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Shimmer Loader - only show when loading */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer-wave"></div>
        </div>
      )}
      
      {/* Actual Image */}
      {!hasError && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
      
      {/* Error Fallback */}
      {hasError && (
        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="w-12 h-12 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
              <Star className="w-6 h-6" />
            </div>
            <p className="text-sm">Image unavailable</p>
          </div>
        </div>
      )}
    </div>
  );
};

const niftPhotos = [
  { src: 'https://images.pexels.com/photos/794064/pexels-photo-794064.jpeg', title: 'Mentorship Sessions' },
  { src: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', title: 'Hands-on Workshops' },
  { src: 'https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg', title: 'Student Projects' },
];

const certificationPhotos = [
  { src: 'https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg', title: 'Fashion Styling' },
  { src: 'https://images.pexels.com/photos/794064/pexels-photo-794064.jpeg', title: 'Design Thinking' },
  { src: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', title: 'Fashion Business' },
];

const tabList = [
  { key: 'fta', label: 'NIFT' },
  { key: 'studyAbroad', label: 'Study Fashion Abroad' },
  { key: 'certification', label: 'Certification Course' },
];

const StudyAbroadSection = () => {
  const [activeTab, setActiveTab] = useState('fta');
  const [selectedCountry, setSelectedCountry] = useState('France');
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    setAnimate(false);
    const timeout = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timeout);
  }, [activeTab]);

  const countries = [
    { name: 'France', flag: '🇫🇷' },
    { name: 'Italy', flag: '🇮🇹' },
    { name: 'UK', flag: '🇬🇧' },
    { name: 'USA', flag: '🇺🇸' },
  ];

  const filteredUniversities = universities.filter(uni => uni.country === selectedCountry);

  return (
    <section id="study-abroad" className="pt-24 pb-10 bg-gradient-to-b from-stone-50 to-rose-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Modern Tabs */}
     
<div className="flex justify-center mb-12">
  <div className="flex flex-wrap md:flex-nowrap bg-white rounded-full shadow-lg px-2 py-2 gap-2 w-full max-w-2xl">
    {tabList.map(tab => (
      <button
        key={tab.key}
        onClick={() => setActiveTab(tab.key)}
        className={`relative flex-1 min-w-[100px] px-2 py-2 rounded-full font-medium text-sm md:text-base transition-all duration-300
          focus:outline-none
          ${
            activeTab === tab.key
              ? 'bg-gradient-to-r from-amber-500 to-rose-400 text-white shadow-md scale-105'
              : 'bg-transparent text-gray-700 hover:bg-amber-50'
          }
        `}
        style={{ transition: 'all 0.3s cubic-bezier(.4,0,.2,1)' }}
      >
        {tab.label}
        {activeTab === tab.key && (
          <span className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-6 h-1 bg-rose-400 rounded-full"></span>
        )}
      </button>
    ))}
  </div>
</div>

{/* Tab Content */}
<div className={`transition-all duration-500 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {activeTab === 'fta' && (
            <div className="text-center mb-20">
              <h2 className="text-5xl lg:text-6xl font-serif font-light text-gray-900 mb-8 leading-tight">
                Fashion Talent Accelerator
                <span className="text-amber-600 block font-normal">Empowering Future Designers</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light mb-10">
                Join our FTA program to fast-track your fashion career with mentorship, hands-on projects, and industry exposure.
              </p>
              {/* NIFT Photo Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center">
                {niftPhotos.map((photo, idx) => (
                  <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
                    <ImageLoader
                      src={photo.src}
                      alt={photo.title}
                      className="w-full h-48"
                    />
                    <div className="p-4">
                      <h4 className="text-lg font-semibold text-gray-800">{photo.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'studyAbroad' && (
            <>
              <div className="text-center mb-20">
                <h2 className="text-5xl lg:text-6xl font-serif font-light text-gray-900 mb-8 leading-tight">
                  Study Fashion
                  <span className="text-amber-600 block font-normal">Around the World</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
                  Discover prestigious fashion schools and universities worldwide. 
                  Choose your destination and explore world-class education opportunities.
                </p>
              </div>
              {/* Country Selection */}
              <div className="flex flex-wrap justify-center gap-4 mb-16">
                {countries.map((country) => (
                  <button
                    key={country.name}
                    onClick={() => setSelectedCountry(country.name)}
                    className={`flex items-center space-x-4 px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 ${
                      selectedCountry === country.name
                        ? 'bg-amber-600 text-white shadow-xl'
                        : 'bg-white text-gray-700 hover:bg-amber-50 border border-stone-200 shadow-md'
                    }`}
                  >
                    <span className="text-3xl">{country.flag}</span>
                    <span className="font-medium text-lg">{country.name}</span>
                  </button>
                ))}
              </div>
              {/* Universities Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredUniversities.map((university, index) => (
                  <div
                    key={university.id}
                    className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-stone-100"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative overflow-hidden">
                      <div className="w-full h-56 overflow-hidden">
                        <ImageLoader
                          src={university.image}
                          alt={university.name}
                          className="w-full h-full group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <div className="absolute top-6 right-6 bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                        {university.ranking}
                      </div>
                    </div>
                    
                    <div className="p-8">
                      <div className="flex items-center mb-3">
                        <MapPin className="text-stone-500 mr-2" size={16} />
                        <span className="text-stone-500 text-sm font-medium">{university.location}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-amber-700 transition-colors duration-300">
                        {university.name}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed font-light">
                        {university.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="text-amber-500 fill-current mr-2" size={18} />
                          <span className="text-gray-700 font-medium">{university.rating}</span>
                        </div>
                        <button className="text-amber-600 hover:text-amber-700 font-medium transition-colors duration-200 group-hover:translate-x-1 transform">
                          Learn More →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'certification' && (
            <div className="text-center mb-20">
              <h2 className="text-5xl lg:text-6xl font-serif font-light text-gray-900 mb-8 leading-tight">
                Certification Courses
                <span className="text-amber-600 block font-normal">Boost Your Skills</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light mb-10">
                Explore our certification courses designed to enhance your expertise in fashion design, styling, and business.
              </p>
              {/* Certification Photo Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center">
                {certificationPhotos.map((photo, idx) => (
                  <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
                    <ImageLoader
                      src={photo.src}
                      alt={photo.title}
                      className="w-full h-48"
                    />
                    <div className="p-4">
                      <h4 className="text-lg font-semibold text-gray-800">{photo.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Custom Styles for Shimmer Animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }
        
        @keyframes shimmer-wave {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-shimmer {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200px 100%;
          animation: shimmer 1.5s infinite;
        }
        
        .animate-shimmer-wave {
          animation: shimmer-wave 2s infinite;
        }
      `}</style>
    </section>
  );
};

export default StudyAbroadSection;