"use client";
import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MessageFromFounders from '@/components/MessageFromFounders';
import { createLead } from '@/lib/authService';
import { Send } from 'lucide-react';

// src/app/about-us/page.js
 const metadata = {
  title: "About Why Designers - Fashion Education & Study Abroad",
  description: "Learn about Why Designers' mission to democratize fashion education, our story, and our commitment to excellence in creative learning.",
  keywords: "fashion education, design school, about why designers, fashion courses, study abroad fashion",
  openGraph: {
    title: "About Why Designers - Fashion Education & Study Abroad",
    description: "Learn about Why Designers' mission to democratize fashion education, our story, and our commitment to excellence in creative learning.",
    images: [
      {
        url: '/about-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Why Designers About Us',
      },
    ],
  },
};

export default function AboutUsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
      <Header />
      <main className="pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-0">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              <span className="font-serif font-light">About</span>
              <span className="text-amber-600 ml-2">Us</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn more about Why Designs, our mission, and our team
            </p>
          </div>
        </div>

        {/* Company Story Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Founded with a passion for democratizing fashion education, Why Designs emerged from the recognition that creative talent exists everywhere, but access to quality design education remains limited.
                </p>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Our founders, experienced professionals in both fashion and education, identified a gap in the market: aspiring designers needed more than just theoretical knowledge—they needed practical skills, industry insights, and mentorship to succeed.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Today, Why Designs stands as a beacon for creative education, offering comprehensive programs that blend traditional design principles with modern digital tools and sustainable practices.
                </p>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl p-8">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Innovation</h3>
                        <p className="text-sm text-gray-600">Cutting-edge curriculum</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Community</h3>
                        <p className="text-sm text-gray-600">Supportive learning environment</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission and Values Section */}
        <section className="py-16 bg-gradient-to-br from-amber-50 to-stone-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-amber-50 rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  To democratize fashion education by providing accessible, high-quality design programs that equip students with the skills, knowledge, and confidence to succeed in the creative industry.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  We believe that creativity should not be limited by geography, background, or financial constraints. Our mission is to break down these barriers and create opportunities for talented individuals worldwide.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Values</h2>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Creativity</h3>
                      <p className="text-gray-600">Encouraging original thinking and artistic expression</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Accessibility</h3>
                      <p className="text-gray-600">Making quality education available to all</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Innovation</h3>
                      <p className="text-gray-600">Embracing new technologies and teaching methods</p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Sustainability</h3>
                      <p className="text-gray-600">Promoting eco-conscious design practices</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Message from Founders Component */}
        <MessageFromFounders />

        {/* Call to Action Section */}
        <section className="py-16 bg-amber-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Your Design Journey?
            </h2>
            <p className="text-amber-100 mb-8 text-lg">
              Join thousands of students who have discovered their creative potential with Why Designs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
           
              <button
                onClick={() => setIsModalOpen(true)}
                className=" items-center px-8 py-3 border border-white text-white font-medium rounded-lg hover:bg-white hover:text-amber-600 transition-colors"
              >
                Get in Touch
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-2">
             <div></div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Get in Touch</h2>
                  <p className="text-gray-600">
                    Get personalized guidance from industry experts.
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
                        placeholder="(+91) 123-4567"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Area of Interest
                      </label>
                      <select
                        name="areaOfInterest"
                        value={formData.areaOfInterest}
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
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-5 rounded-2xl font-medium text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-3"
                  >
                   {isSubmitted ? (
                  <span>Thank You!</span>
                ) : loading ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <span>Get Free Consultation</span>
                    <Send size={20} aria-hidden="true" />
                  </>
                )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}