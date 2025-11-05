"use client";
import React, { useState, useEffect } from "react";
import { MapPin, Star } from "lucide-react";
import Image from "next/image";
import { universities } from "../../data/universities.js";
import FormModal from "./FormModal.jsx";

const ImageLoader = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
      )}
      {!error ? (
        <Image
          src={src}
          alt={alt}
          width={400}
          height={400}
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      ) : (
        <div className="flex h-full items-center justify-center bg-gray-100 text-gray-500 text-sm">
          Image unavailable
        </div>
      )}
    </div>
  );
};

const StudyAbroadSection = () => {
  const [activeTab, setActiveTab] = useState("fta");
  const [selectedCountry, setSelectedCountry] = useState("France");
  const [animate, setAnimate] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ title: "", description: "" });

  const tabs = [
    { key: "fta", label: "NIFT" },
    { key: "studyAbroad", label: "Study Fashion Abroad" },
    { key: "certification", label: "Certification Courses" },
  ];

  const countries = [
    { name: "France", flag: "🇫🇷" },
    { name: "Italy", flag: "🇮🇹" },
    { name: "UK", flag: "🇬🇧" },
    { name: "USA", flag: "🇺🇸" },
  ];

  useEffect(() => {
    setAnimate(false);
    const t = setTimeout(() => setAnimate(true), 80);
    return () => clearTimeout(t);
  }, [activeTab]);

  const filteredUniversities = universities.filter(
    (u) => u.country === selectedCountry
  );

  // ✅ NIFT & Certification Data with Description
  const niftPhotos = [
    {
      src: "https://images.pexels.com/photos/794064/pexels-photo-794064.jpeg",
      title: "Mentorship Sessions",
      desc: "Get one-on-one mentoring from top industry experts and NIFT alumni.",
    },
    {
      src: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg",
      title: "Hands-on Workshops",
      desc: "Participate in hands-on fashion design and textile workshops.",
    },
    {
      src: "https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg",
      title: "Student Projects",
      desc: "Work on real-world projects that prepare you for fashion careers.",
    },
  ];

  const certificationPhotos = [
    {
      src: "https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg",
      title: "Fashion Styling",
      desc: "Master styling techniques and develop your unique creative voice.",
    },
    {
      src: "https://images.pexels.com/photos/794064/pexels-photo-794064.jpeg",
      title: "Design Thinking",
      desc: "Learn the essentials of fashion innovation and design process.",
    },
    {
      src: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg",
      title: "Fashion Business",
      desc: "Understand branding, marketing, and the business side of fashion.",
    },
  ];

  const openModal = (title, description) => {
    setModalData({ title, description });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="pt-20 pb-16 bg-gradient-to-b from-rose-50 via-stone-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="flex justify-center mb-8 md:mb-12">
         <div className="flex flex-wrap bg-white rounded-full shadow-md px-2 py-2 gap-2 w-full max-w-3xl">
           {tabs.map((tab) => (
             <button
               key={tab.key}
               onClick={() => setActiveTab(tab.key)}
               className={`flex-1 min-w-[90px] rounded-full px-3 py-2 text-xs sm:text-sm md:text-base font-medium transition-all duration-300 ${
                 activeTab === tab.key
                   ? "bg-gradient-to-r from-rose-500 to-amber-400 text-white shadow-md scale-105"
                   : "bg-transparent text-gray-600 hover:bg-amber-50"
               }`}
             >
               {tab.label}
             </button>
           ))}
         </div>
       </div>


        {/* Tab Content */}
        <div
          className={`transition-all duration-700 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          {/* --- NIFT --- */}
          {activeTab === "fta" && (
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-gray-900 mb-4">
                Fashion Talent Accelerator
              </h2>
              <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-10">
                Fast-track your fashion journey with mentorship, projects, and
                industry exposure.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {niftPhotos.map((photo, i) => (
                  <div
                    key={i}
                    className="rounded-3xl bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-2"
                  >
                    <ImageLoader src={photo.src} alt={photo.title} className="h-52 sm:h-56" />
                    <div className="p-5">
                      <h3 className="text-gray-800 font-semibold text-lg sm:text-xl mb-2">
                        {photo.title}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base mb-3">
                        {photo.desc}
                      </p>
                      <button 
                        className="text-amber-600 font-medium text-sm hover:underline"
                        onClick={() => openModal(photo.title, photo.desc)}
                      >
                        Learn More →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- Study Abroad --- */}
          {activeTab === "studyAbroad" && (
            <>
              <div className="text-center mb-10">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-gray-900 mb-4">
                  Study Fashion{" "}
                  <span className="text-amber-600 font-normal">Abroad</span>
                </h2>
                <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
                  Explore global fashion education at leading universities.
                </p>
              </div>

              {/* Country Filter */}
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {countries.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedCountry(c.name)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm sm:text-base font-medium transition-all ${
                      selectedCountry === c.name
                        ? "bg-gradient-to-r from-amber-500 to-rose-400 text-white shadow-md"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-amber-50"
                    }`}
                  >
                    <span className="text-lg sm:text-xl">{c.flag}</span>
                    {c.name}
                  </button>
                ))}
              </div>

              {/* University Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredUniversities.map((uni, idx) => (
                  <article
                    key={idx}
                    className="bg-white rounded-3xl shadow-sm hover:shadow-lg border border-stone-100 transition-all duration-500 overflow-hidden hover:-translate-y-2"
                  >
                    <div className="relative h-52 sm:h-56">
                      <ImageLoader src={uni.image} alt={uni.name} className="h-full" />
                      <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm shadow-md">
                        {uni.ranking}
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center text-gray-500 text-xs sm:text-sm mb-1">
                        <MapPin size={14} className="mr-1" />
                        {uni.location}
                      </div>
                      <h3 className="text-gray-800 font-semibold text-base sm:text-lg mb-2">
                        {uni.name}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base mb-3 line-clamp-2">
                        {uni.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Star size={16} className="text-amber-400 fill-current mr-1" />
                          <span className="text-gray-700 text-sm">{uni.rating}</span>
                        </div>
                        <button 
                          className="text-amber-600 font-medium text-sm hover:underline"
                          onClick={() => openModal(uni.name, uni.description)}
                        >
                          Learn More →
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}

          {/* --- Certification --- */}
          {activeTab === "certification" && (
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-gray-900 mb-4">
                Certification Courses
              </h2>
              <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-10">
                Short-term skill boosters in design, styling & business.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {certificationPhotos.map((photo, i) => (
                  <div
                    key={i}
                    className="rounded-3xl bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-2"
                  >
                    <ImageLoader src={photo.src} alt={photo.title} className="h-52 sm:h-56" />
                    <div className="p-5">
                      <h3 className="text-gray-800 font-semibold text-lg sm:text-xl mb-2">
                        {photo.title}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base mb-3">
                        {photo.desc}
                      </p>
                      <button 
                        className="text-amber-600 font-medium text-sm hover:underline"
                        onClick={() => openModal(photo.title, photo.desc)}
                      >
                        Learn More →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Form Modal */}
      <FormModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        title={modalData.title} 
        description={modalData.description} 
      />
    </section>
  );
};

export default StudyAbroadSection;
