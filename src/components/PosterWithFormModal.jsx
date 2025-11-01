"use client";
import React, { useState } from "react";
import { X, Send, CheckCircle, Phone, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { createLead } from "@/lib/authService";

const FormModal = ({ 
  isOpen,
  onClose,
  posterUrl,
  title,
  description,
  category,
  duration,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    areaOfInterest: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      fullName: formData.name,
      email: formData.email,
      phone: formData.phone,
      areaOfInterest: formData.areaOfInterest,
    };

    try {
      setLoading(true);
      const response = await createLead(payload);

      if (response.success) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          areaOfInterest: "",
        });

        setTimeout(() => {
          setIsSubmitted(false);
          setShowForm(false);
          onClose();
        }, 3000);
      } else {
        alert("Submission failed. Please try again!");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleContactNow = () => {
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    onClose();
  };

  const handleBackToBanner = () => {
    setShowForm(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-4xl flex flex-col md:flex-row shadow-2xl relative overflow-hidden max-h-[90vh] md:max-h-[95vh]">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-1 right-1 z-30 bg-white/80 backdrop-blur-sm rounded-full p-1 text-gray-500 hover:text-gray-800 transition-all hover:scale-105"
        >
          <X size={24} />
        </button>

        {/* Mobile Back Button (shown only when form is open) */}
        {showForm && (
          <button
            onClick={handleBackToBanner}
            className="absolute top-4 left-4 z-30 bg-white/80 backdrop-blur-sm rounded-full p-1.5 text-gray-500 hover:text-gray-800 transition-all hover:scale-105 md:hidden"
          >
            <ArrowLeft size={24} />
          </button>
        )}

        {/* Poster Image - Full height on mobile */}
        <div className={`w-full md:w-2/5 lg:w-1/2 relative ${showForm ? 'hidden md:block' : 'block'} h-screen md:h-auto`}>
          <Image
            src={posterUrl || "/your-poster.jpg"}
            alt="Poster"
            fill
            className="object-cover"
            priority
          />
          
          {/* Mobile Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent md:hidden" />
          
          {/* Mobile Content */}
          <div className="absolute bottom-2 left-6 right-6 text-white md:hidden">
            {/* {title && <h2 className="text-2xl font-bold mb-2">{title}</h2>}
   
            {description && (
              <p className="text-sm mb-4 opacity-90 leading-relaxed">{description}</p>
            )} */}
            
            {/* Contact Now Button on Banner */}
            <button
              onClick={handleContactNow}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-6 py-2 rounded-2xl font-medium text-lg transition-all duration-300 flex items-center justify-center space-x-2 hover:shadow-lg active:scale-95 mt-2"
            >
              <Phone size={20} />
              <span>Contact Now</span>
            </button>
          </div>
        </div>

        {/* Form Section - Hidden on mobile until Contact Now is clicked */}
        <div className={`w-full md:w-3/5 lg:w-1/2 p-6 md:p-8 bg-white overflow-y-auto ${showForm ? 'block' : 'hidden md:block'}`}>
          {/* Desktop title */}
          {title && (
            <h2 className="hidden md:block text-2xl font-bold text-gray-900 mb-3">
              {title}
            </h2>
          )}
          {/* {description && (
            <p className="hidden md:block text-gray-600 mb-6">{description}</p>
          )} */}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-stone-50/50 placeholder:text-gray-400"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-stone-50/50 placeholder:text-gray-400"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-stone-50/50 placeholder:text-gray-400"
                placeholder="+91 1234567890"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Area of Interest
              </label>
              <select
                name="areaOfInterest"
                value={formData.areaOfInterest}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-stone-50/50"
                required
              >
                <option value="">Select your interest</option>
                <option value="fashion-design">Fashion Design</option>
                <option value="study-abroad">Study Abroad</option>
                <option value="portfolio-review">Portfolio Review</option>
                <option value="career-guidance">Career Guidance</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading || isSubmitted}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-6 py-4 rounded-2xl font-medium text-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-75 disabled:cursor-not-allowed hover:shadow-lg active:scale-95"
            >
              {isSubmitted ? (
                <>
                  <CheckCircle size={22} />
                  <span>Thank You!</span>
                </>
              ) : loading ? (
                <span>Submitting...</span>
              ) : (
                <>
                  <span>Submit</span>
                  <Send size={20} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormModal;