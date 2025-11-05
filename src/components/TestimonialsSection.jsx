"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote, Instagram, Linkedin, Twitter, Facebook, Youtube } from "lucide-react";
import { getTestimonials } from "@/lib/authService";
import Image from "next/image";

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await getTestimonials(1, 10);
        const transformed = response.data.testimonials.map((t) => ({
          id:  t.id,
          name: t.name,
          role: t.designation,
          company: t.company,
          quote: t.message,
          image: t.profileImage,
          socialMedia: t.socialMedia,
        }));
        setTestimonials(transformed);
      } catch (err) {
        console.error(err);
        setError("Failed to load testimonials");
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length > 1) {
      const timer = setInterval(
        () => setCurrentIndex((prev) => (prev + 1) % testimonials.length),
        7000
      );
      return () => clearInterval(timer);
    }
  }, [testimonials]);

  const next = () =>
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  if (loading)
    return (
      <section className="py-24 flex justify-center items-center bg-gradient-to-br from-rose-50/30 via-stone-50 to-amber-50/30">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600" aria-label="Loading testimonials" />
      </section>
    );

  if (error || testimonials.length === 0)
    return (
      <section className="py-24 text-center bg-gradient-to-br from-rose-50/30 via-stone-50 to-amber-50/30">
        <p className="text-gray-600">No testimonials available at the moment.</p>
      </section>
    );

  const t = testimonials[currentIndex];

  const getSocialIcon = (platform) => {
    const icons = {
      instagram: Instagram,
      linkedin: Linkedin,
      twitter: Twitter,
      facebook: Facebook,
      youtube: Youtube
    };
    return icons[platform] || null;
  };

  return (
    <section 
      className="py-24 bg-gradient-to-br from-rose-50/30 via-stone-50 to-amber-50/30"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 id="testimonials-heading" className="text-4xl font-serif font-light text-gray-900 mb-6">
            What Our{" "}
            <span className="text-amber-600 font-normal">Students Say</span>
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Hear from fashion professionals who transformed their careers with our guidance.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="relative max-w-4xl mx-auto">
          <div 
            className="bg-white/90 backdrop-blur-sm border border-white/60 rounded-3xl shadow-lg p-10 sm:p-16 flex flex-col items-center text-center transition-all duration-300"
            role="region"
            aria-live="polite"
            aria-label={`Testimonial from ${t.name}, ${t.role} at ${t.company}`}
          >
            <div className="mb-6">
              <Quote className="text-amber-600 w-12 h-12 mx-auto opacity-80" aria-hidden="true" />
            </div>

            <div className="text-2xl text-gray-700 font-light italic leading-relaxed max-w-3xl mb-10 h-[180px] overflow-y-auto scrollbar-thin scrollbar-thumb-amber-200 scrollbar-track-transparent">
              “{t.quote}”
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 border-t border-stone-200 pt-6">
              <Image
                width={80}
                height={80}
                src={t.image || "/fallback-user.png"}
                alt={`Portrait of ${t.name}`}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/fallback-user.png";
                }}
                className="w-20 h-20 rounded-full object-cover border-4 border-amber-200 shadow-md"
              />
              <div className="text-center sm:text-left">
                <h4 className="text-xl font-semibold text-gray-900">
                  {t.name}
                </h4>
                <p className="text-gray-600">{t.role}</p>
                <p className="text-amber-600 font-medium">{t.company}</p>
             
                {t.socialMedia && (
                  <div className="flex justify-center sm:justify-start space-x-2 mt-1">
                    {Object.entries(t.socialMedia).map(([platform, url]) => {
                      if (!url) return null;

                      const Icon = getSocialIcon(platform);
                      if (!Icon) return null;

                      return (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit ${t.name}'s ${platform} profile`}
                          className="text-amber-600 hover:text-amber-700 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-opacity-50 rounded-full p-1"
                        >
                          <Icon className="w-5 h-5" aria-hidden="true" />
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center mt-10 space-x-6">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="p-4 bg-white border border-stone-200 rounded-full hover:bg-amber-50 hover:shadow-lg transition-all transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-amber-300 focus:ring-opacity-50"
            >
              <ChevronLeft className="text-gray-600" size={20} aria-hidden="true" />
            </button>
            <div className="flex space-x-3" aria-label="Testimonial navigation">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={i === currentIndex ? 'true' : 'false'}
                  className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    i === currentIndex
                      ? "bg-amber-600 scale-125"
                      : "bg-stone-300 hover:bg-amber-300"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="p-4 bg-white border border-stone-200 rounded-full hover:bg-amber-50 hover:shadow-lg transition-all transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-amber-300 focus:ring-opacity-50"
            >
              <ChevronRight className="text-gray-600" size={20} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Bottom grid preview */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {testimonials.slice(0, 3).map((item) => (
            <article
              key={item.id}
              className="bg-white/70 rounded-2xl p-8 border border-white/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center mb-5">
                <Image
                  width={56}
                  height={56}
                  src={item.image || "/fallback-user.png"}
                  alt={`Portrait of ${item.name}`}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/fallback-user.png";
                  }}
                  className="w-14 h-14 rounded-full object-cover border-2 border-amber-200 mr-4"
                />
                <div>
                  <h5 className="font-semibold text-gray-900">{item.name}</h5>
                  <p className="text-gray-600 text-sm">{item.role}</p>
                  <p className="text-amber-600 text-sm font-medium">
                    {item.company}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm">
                “{item.quote.substring(0, 140)}...”
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;