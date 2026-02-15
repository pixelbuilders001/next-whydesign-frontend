"use client";
import React, { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import FormModal from "./FormModal";
import { getBanners } from "@/lib/authService";
import Image from "next/image";

const HeroSection = () => {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [banners, setBanners] = useState({});

  console.log("banners", banners);

  const getBannersData = async () => {
    const response = await getBanners();
    if (response.success) {
      setBanners(response.data);
    }
  };

  useEffect(() => {
    getBannersData();
  }, []);

  useEffect(() => {
    setIsVisible(true);

    const video = videoRef.current;
    if (video) {
      const handleLoadedData = () => setIsVideoLoaded(true);
      video.addEventListener("loadeddata", handleLoadedData);

      // Intersection Observer for performance
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              video.play();
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(video);

      return () => {
        video.removeEventListener("loadeddata", handleLoadedData);
        observer.disconnect();
      };
    }
  }, []);

  const getTitleLines = () => {
    if (banners?.title) {
      const words = banners?.title.trim().split(" ");
      if (words.length >= 2) {
        return {
          firstLine: words.slice(0, 2).join(" "),
          secondLine: words.slice(2).join(" "),
        };
      } else {
        return {
          firstLine: banners?.title,
          secondLine: "",
        };
      }
    }
    return {
      firstLine: "Design Your",
      secondLine: "Fashion Future",
    };
  };

  const getDescription = () => {
    return (
      banners?.description ||
      "Transform your passion into a profession with world-class fashion education and personalized career guidance."
    );
  };

  const getImageAltText = () => {
    return banners?.title
      ? `Hero banner: ${banners?.title}`
      : "Fashion design education and career guidance";
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        {banners?.id && (
          <Image
            fill
            src={banners?.imageUrl}
            alt={getImageAltText()}
            className="w-full h-full object-cover"
            fetchPriority="high" // NEW: ensures browser fetches ASAP
            placeholder="blur"   // optional: add blurDataURL for LCP boost
            blurDataURL="/tiny-placeholder.jpg" // a 10px low-quality version
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          />
        )}
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" aria-hidden="true" />
      </div>

      {/* Content */}
      <div
        className={`relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
      >
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-light text-white mb-8 leading-tight drop-shadow-2xl">
          {getTitleLines().firstLine}
          <span className="block bg-gradient-to-r from-amber-400 via-rose-400 to-purple-400 bg-clip-text text-transparent font-bold">
            {getTitleLines().secondLine}
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed font-light drop-shadow-lg">
          {getDescription()}
        </p>

        <button
          onClick={() => setOpenModal(true)}
          aria-label="Start your fashion journey - Open consultation form"
          className="group bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center space-x-3 shadow-lg mx-auto focus:outline-none focus:ring-4 focus:ring-amber-300 focus:ring-opacity-50"
        >
          <span>Start Your Journey</span>
          <ArrowRight
            className="group-hover:translate-x-1 transition-transform duration-200"
            size={22}
            aria-hidden="true"
          />
        </button>
      </div>

      <FormModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        title="Start Your Fashion Journey"
        description="Fill out this form and our experts will guide you."
      />
    </section>
  );
};

export default HeroSection;