"use client";
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-white to-stone-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-serif font-light text-gray-900 mb-8 leading-tight">
            Get in Touch
            <span className="text-amber-600 block font-normal">With Our Experts</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Ready to take the next step? Our team is here to guide you through 
            your fashion education journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-10">
            <div className="bg-gradient-to-br from-stone-50 to-rose-50/50 rounded-3xl p-10 border border-white/50 shadow-lg">
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h3>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-5">
                  <div className="bg-amber-600 rounded-2xl p-4 shadow-lg">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 text-lg">Phone</h4>
                    <p className="text-gray-600 font-light">+1 (555) 123-4567</p>
                    <p className="text-gray-600 font-light">+1 (555) 765-4321</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-5">
                  <div className="bg-amber-600 rounded-2xl p-4 shadow-lg">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 text-lg">Email</h4>
                    <p className="text-gray-600 font-light">info@whydesigners.com</p>
                    <p className="text-gray-600 font-light">admissions@whydesigners.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-5">
                  <div className="bg-amber-600 rounded-2xl p-4 shadow-lg">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2 text-lg">Location</h4>
                    <p className="text-gray-600 font-light">123 Fashion District</p>
                    <p className="text-gray-600 font-light">New York, NY 10001</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-5">
                  <div className="bg-amber-600 rounded-2xl p-4 shadow-lg">
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

            {/* Map */}
            <div className="bg-gradient-to-br from-stone-100 to-stone-200 rounded-3xl h-72 flex items-center justify-center shadow-lg border border-stone-200">
              <div className="text-center">
                <div className="bg-amber-100 rounded-2xl p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <MapPin className="text-amber-600" size={28} />
                </div>
                <p className="text-gray-700 font-medium text-lg">Interactive Map</p>
                <p className="text-gray-500 text-sm font-light">Location: Fashion District, NYC</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-10 border border-stone-100">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-8">
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
                    className="w-full px-5 py-4 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-stone-50/50"
                    placeholder="Your name"
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
                    className="w-full px-5 py-4 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-stone-50/50"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Subject
                </label>
                <select
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Message
                </label>
                <textarea
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
                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-5 rounded-2xl font-medium text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-3"
              >
                <span>Send Message</span>
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;