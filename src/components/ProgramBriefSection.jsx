"use client";
import React from "react";
import { Globe, GraduationCap, BadgeCheck } from "lucide-react";

const programs = [
  {
    key: "nift",
    title: "NIFT",
    icon: <GraduationCap className="text-amber-600 drop-shadow-md" />,
    desc: "Kickstart your fashion career with NIFT. Experience mentorship, hands-on workshops, and real-world projects designed for future designers.",
    gradient: "from-amber-100/30 to-rose-50/40",
    ring: "ring-amber-400/60",
  },
  {
    key: "studyAbroad",
    title: "Study Fashion Abroad",
    icon: <Globe className="text-blue-600 drop-shadow-md" />,
    desc: "Explore top fashion universities worldwide. Gain global exposure, diverse learning, and unlock international opportunities.",
    gradient: "from-blue-100/30 to-rose-50/40",
    ring: "ring-blue-400/60",
  },
  {
    key: "certification",
    title: "Certification Courses",
    icon: <BadgeCheck className="text-green-600 drop-shadow-md" />,
    desc: "Upgrade your skills with industry-recognized certification courses in fashion styling, design thinking, and fashion business.",
    gradient: "from-green-100/30 to-rose-50/40",
    ring: "ring-green-400/60",
  },
];

const ProgramBriefSection = () => {
  return (
    <section className="relative py-12 md:py-20 bg-gradient-to-b from-white via-rose-50 to-stone-50 overflow-hidden">
      {/* floating blur shapes for background aesthetic */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-10 left-1/4 w-40 h-40 md:w-64 md:h-64 bg-amber-200/30 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-5 right-1/4 w-48 h-48 md:w-72 md:h-72 bg-pink-200/30 blur-3xl rounded-full animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        {/* Title */}
        <h2 className="text-5xl md:text-5xl lg:text-6xl font-serif text-gray-900 mb-3 md:mb-4 leading-tight">
          Your <span className="text-amber-600 font-light">Fashion Journey</span>
        </h2>
        <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto mb-8 md:mb-16 font-light px-2">
          Choose your path to success with our globally recognized programs.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 lg:gap-10">
          {programs.map((prog) => (
            <div
              key={prog.key}
              className={`group relative backdrop-blur-xl bg-gradient-to-br ${prog.gradient} rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 border border-white/40 ring-1 ${prog.ring} shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 md:hover:-translate-y-3 hover:scale-[1.02]`}
            >
              {/* Floating Icon */}
              <div className="absolute -top-6 md:-top-8 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-md p-3 md:p-4 ring-1 ring-rose-100 group-hover:ring-rose-200 transition-all">
                {React.cloneElement(prog.icon, { 
                  size: window.innerWidth < 768 ? 24 : 36 
                })}
              </div>

              <div className="pt-8 md:pt-10">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4 font-serif">
                  {prog.title}
                </h3>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4 md:mb-6 font-light">
                  {prog.desc}
                </p>

                <button className="relative inline-flex items-center justify-center gap-2 px-4 md:px-6 py-2 text-xs md:text-sm font-medium text-gray-900 border border-gray-200 rounded-full hover:bg-gray-100 transition-colors duration-300">
                  Learn More
                  <span className="text-amber-500 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramBriefSection;