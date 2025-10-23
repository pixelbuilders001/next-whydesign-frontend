"use client";
import React, { useState } from "react";
import { X, Send, CheckCircle } from "lucide-react";
import { createLead } from "@/lib/authService";

const FormModal = ({ isOpen, onClose, title, description }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    areaOfInterest: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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

        // Auto-reset "Thank You" button after 3 seconds
        setTimeout(() => setIsSubmitted(false), 3000);
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-3xl w-full max-w-md p-8 relative shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-500 hover:text-gray-800 transition"
        >
          <X size={24} />
        </button>

        {/* Modal Header */}
        {title && <h2 className="text-2xl font-bold text-gray-900 mb-3">{title}</h2>}
        {description && <p className="text-gray-600 mb-6">{description}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-stone-50/50"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-stone-50/50"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-stone-50/50"
              placeholder="+91 1234567890"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Area of Interest</label>
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
            className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-6 py-4 rounded-2xl font-medium text-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-75"
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
  );
};

export default FormModal;
