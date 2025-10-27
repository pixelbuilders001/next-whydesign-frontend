"use client";
import React, { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { createLead } from "@/lib/authService"; // ✅ import your API function
import Image from "next/image";

const LeadFormSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
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

    // Map your formData to match API payload
    const payload = {
      fullName: formData.name,
      email: formData.email,
      phone: formData.phone,
      areaOfInterest: formData.interest,
    };

    try {
      setLoading(true);
      const response = await createLead(payload);

      if (response.success) {
        console.log("✅ Lead created successfully:", response.data);
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          interest: "",
        });
        setTimeout(() => setIsSubmitted(false), 3000);
      } else {
        console.error("❌ Lead creation failed:", response.message);
        alert("Failed to submit. Please try again!");
      }
    } catch (err) {
      console.error("❌ Unexpected error:", err);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-r from-stone-50 to-rose-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className="relative group order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <Image
                width={800}
                height={600}
                src="https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Fashion design student"
                className="w-full h-96 lg:h-[550px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-xl font-medium mb-2">
                  Join 10,000+ Fashion Designers
                </p>
                <p className="text-stone-200 font-light">
                  Start your creative journey today
                </p>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="space-y-10 order-1 lg:order-2 ">
            <div className="text-center">
              <h2 className="text-5xl lg:text-6xl font-serif font-light text-gray-900 mb-8 leading-tight">
                Ready to Begin Your
                <span className="text-amber-600 block font-normal">
                  Fashion Journey?
                </span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed font-light">
                Get personalized guidance from industry experts. Share your
                details and we'll create a custom roadmap for your fashion
                career.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-white text-black placeholder-gray-500"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-white text-black placeholder-gray-500"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-white text-black placeholder-gray-500"
                    placeholder="+91 1234567890"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Area of Interest
                  </label>
                  <select
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-white text-black appearance-none"
                    required
                  >
                    <option value="">Select your interest</option>
                    <option value="fashion-design">Fashion Design</option>
                    <option value="study-abroad">Study Abroad</option>
                    <option value="portfolio-review">Portfolio Review</option>
                    <option value="career-guidance">Career Guidance</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || isSubmitted}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-5 rounded-2xl font-medium text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-3 disabled:opacity-75"
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
                    <span>Get Free Consultation</span>
                    <Send size={20} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadFormSection;
