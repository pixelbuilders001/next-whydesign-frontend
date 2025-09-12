"use client";
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '../../data/testimonials';


const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-24 bg-gradient-to-br from-rose-50/30 via-stone-50 to-amber-50/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-serif font-light text-gray-900 mb-8 leading-tight">
            Success Stories from
            <span className="text-amber-600 block font-normal">Our Students</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Hear from fashion professionals who transformed their careers with our guidance.
          </p>
        </div>

        <div className="relative">
          {/* Main Testimonial Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 lg:p-16 mx-auto max-w-5xl border border-white/50">
            <div className="text-center mb-10">
              <div className="bg-amber-100 rounded-full p-4 w-20 h-20 mx-auto mb-8 flex items-center justify-center">
                <Quote className="text-amber-600" size={32} />
              </div>
              <blockquote className="text-2xl lg:text-3xl text-gray-700 font-light leading-relaxed mb-10 max-w-4xl mx-auto">
                "{currentTestimonial.quote}"
              </blockquote>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8">
              <div className="relative">
                <img
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-amber-200 shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 bg-amber-600 rounded-full p-2">
                  <div className="w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
              
              <div className="text-center sm:text-left">
                <h4 className="text-xl font-bold text-gray-900 mb-1">{currentTestimonial.name}</h4>
                <p className="text-gray-600 mb-1 font-medium">{currentTestimonial.role}</p>
                <p className="text-amber-600 font-medium">{currentTestimonial.company}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center mt-12 space-x-6">
            <button
              onClick={prevTestimonial}
              className="p-4 bg-white border border-stone-200 rounded-full hover:bg-amber-50 hover:border-amber-300 hover:shadow-lg transition-all duration-200 transform hover:scale-110"
            >
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            
            <div className="flex space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-amber-600 scale-125' 
                      : 'bg-stone-300 hover:bg-amber-300'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="p-4 bg-white border border-stone-200 rounded-full hover:bg-amber-50 hover:border-amber-300 hover:shadow-lg transition-all duration-200 transform hover:scale-110"
            >
              <ChevronRight size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Smaller Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/50 hover:bg-white/80 transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-3 border-amber-200 mr-4 shadow-md"
                />
                <div>
                  <h5 className="font-bold text-gray-900">{testimonial.name}</h5>
                  <p className="text-gray-600 text-sm font-light">{testimonial.role}</p>
                  <p className="text-amber-600 text-sm font-medium">{testimonial.company}</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed font-light">
                "{testimonial.quote.substring(0, 150)}..."
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;