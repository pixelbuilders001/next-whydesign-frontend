"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StudyAbroadSection from "@/components/StudyAbroadSection";
import ProgramBriefSection from "@/components/ProgramBriefSection";
import LeadFormSection from "@/components/LeadFormSection";
import BookingSection from "@/components/BookingSection";
import PDFDownloadSection from "@/components/PDFDownloadSection";
import VideoSection from "@/components/VideoSection";
import ReelsSection from "@/components/RealsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ModernLoader from "@/components/ModernLoader";
import PWAInstall from "@/components/PWAInstall";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem('hasVisited');

    if (!hasVisited) {
      // First visit - show loader
      localStorage.setItem('hasVisited', 'true');
    } else {
      // Returning visitor - skip loader
      setIsLoading(false);
    }
  }, []);

  const handleLoaderFinish = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <ModernLoader onFinish={handleLoaderFinish} />;
  }

  return (
    <div className="min-h-screen from-stone-50">
      <Header />
      <main>
        <HeroSection />
        <StudyAbroadSection />
       <ProgramBriefSection />
         <LeadFormSection />
        <BookingSection />
        <PDFDownloadSection />
        <VideoSection />
        <ReelsSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer /> 
      </main>
      
      {/* PWA Install Prompt */}
      <PWAInstall />
    </div>
  );
}
