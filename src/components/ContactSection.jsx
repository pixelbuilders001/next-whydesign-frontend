"use client";
import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { createLead } from "@/lib/authService";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      areaOfInterest: formData.subject,
      message: formData.message,
    };

    try {
      setLoading(true);
      const response = await createLead(payload);

      if (response.success) {
        console.log("✅ Contact submitted successfully:", response.data);
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });

        // Auto-reset "Thank You" button after 3 seconds
        setTimeout(() => setIsSubmitted(false), 3000);
      } else {
        console.error("❌ Submission failed:", response.message);
        alert("Failed to submit. Please try again!");
      }
    } catch (err) {
      console.error("❌ Unexpected error:", err);
      alert("Something went wrong. Please try again later!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section 
      id="contact" 
      className="py-24 bg-gradient-to-b from-white to-stone-50/50"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 id="contact-heading" className="text-5xl lg:text-6xl font-serif font-light text-gray-900 mb-8 leading-tight">
            Get in Touch
            <span className="text-amber-600 block font-normal">With Our Experts</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Ready to take the next step? Our team is here to guide you through your fashion education journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* LEFT SIDE: CONTACT INFO & MAP */}
          <div className="space-y-10">
            <div className="bg-gradient-to-br from-stone-50 to-rose-50/50 rounded-3xl p-10 border border-white/50 shadow-lg">
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h3>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-5">
                  <div className="bg-amber-600 rounded-2xl p-4 shadow-lg" aria-hidden="true">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 text-lg">Phone</h4>
                    <p className="text-gray-600 font-light">+91-9421095929</p>
                    <p className="text-gray-600 font-light">+91-7007894388</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-5">
                  <div className="bg-amber-600 rounded-2xl p-4 shadow-lg" aria-hidden="true">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 text-lg">Email</h4>
                    <p className="text-gray-600 font-light">info@whydesigners.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-5">
                  <div className="bg-amber-600 rounded-2xl p-4 shadow-lg" aria-hidden="true">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 text-lg">Location</h4>
                    <p className="text-gray-600 font-light">coming soon.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-5">
                  <div className="bg-amber-600 rounded-2xl p-4 shadow-lg" aria-hidden="true">
                    <Clock className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 text-lg">Business Hours</h4>
                    <p className="text-gray-600 font-light">Mon - Fri: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600 font-light">Sat - Sun: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-stone-100 to-stone-200 rounded-3xl h-72 flex items-center justify-center shadow-lg border border-stone-200">
              <div className="text-center">
                <div className="bg-amber-100 rounded-2xl p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center" aria-hidden="true">
                  <MapPin className="text-amber-600" size={28} />
                </div>
                <p className="text-gray-700 font-medium text-lg">Interactive Map</p>
                <p className="text-gray-500 text-sm font-light">Location: coming soon</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: CONTACT FORM */}
          <div className="bg-white rounded-3xl shadow-2xl p-10 border border-stone-100">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h3>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-3">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-stone-50/50"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-stone-50/50"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-3">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-stone-50/50"
                    placeholder="+91 1234567890"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-3">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-5 py-4 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-stone-50/50"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="course-inquiry">Course Inquiry</option>
                    <option value="study-abroad">Study Abroad</option>
                    <option value="portfolio-review">Portfolio Review</option>
                    <option value="career-guidance">Career Guidance</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-3">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-5 py-4 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 resize-none bg-stone-50/50"
                  placeholder="Tell us about your fashion goals and how we can help..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading || isSubmitted}
                aria-label={isSubmitted ? "Message sent successfully" : loading ? "Submitting message" : "Send message"}
                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-5 rounded-2xl font-medium text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-3 disabled:opacity-75 focus:outline-none focus:ring-4 focus:ring-amber-300 focus:ring-opacity-50"
              >
                {isSubmitted ? (
                  <span>Thank You!</span>
                ) : loading ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={20} aria-hidden="true" />
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

export default ContactSection;