"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { programmes } from "../../../../data/programmes.js";
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  BookOpen, 
  Mail,
  Star,
  Trophy,
  GraduationCap,
  Briefcase,
  Calendar,
  Users as UsersIcon,
  CheckCircle,
  ChevronRight,
  Building,
  Award,
  Globe,
  Heart,
  Lightbulb,
  Send
} from "lucide-react";
import { createLead } from "@/lib/authService";

const ProgrammeDetail = ({ params }) => {
  const { id } = params;
  const programmeId = parseInt(id);
  
  const programme = programmes.find(p => p.id === programmeId);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
      areaOfInterest: programme.name,
      message: `I'm interested in the ${programme.name} programme. ${formData.message}`,
    };

    try {
      setLoading(true);
      const response = await createLead(payload);

      if (response.success) {
        console.log("✅ Lead submitted successfully:", response.data);
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });

        // Auto-reset "Thank You" message after 3 seconds
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

  if (!programme) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Programme Not Found</h2>
        <p className="text-gray-600 mb-8">The programme you're looking for doesn't exist.</p>
        <Link 
          href="/" 
          className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-12 md:mt-3">
      {/* Back Button */}
      {/* <div className="mb-8">
        <Link 
          href="/" 
          className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium"
        >
          <ArrowLeft className="mr-2" size={20} />
          Back to Home
        </Link>
      </div> */}

      {/* Hero Section */}
      <div className="rounded-3xl overflow-hidden bg-white shadow-xl">
        <div className="relative h-96">
          <Image
            src={programme.image}
            alt={programme.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light mb-2">
              {programme.name}
            </h1>
            {programme.type === 'university' && (
              <div className="flex items-center gap-4 text-lg opacity-90">
                <span>{programme.country}</span>
                <span>•</span>
                <span>{programme.location}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap gap-4 mb-6">
            {programme.type === 'university' && (
              <>
                <div className="flex items-center text-gray-700 bg-amber-50 px-4 py-2 rounded-lg">
                  <MapPin size={18} className="mr-2 text-amber-600" />
                  <span>{programme.location}</span>
                </div>
                <div className="flex items-center text-gray-700 bg-amber-50 px-4 py-2 rounded-lg">
                  <Clock size={18} className="mr-2 text-amber-600" />
                  <span>{programme.duration}</span>
                </div>
                <div className="flex items-center text-gray-700 bg-amber-50 px-4 py-2 rounded-lg">
                  <DollarSign size={18} className="mr-2 text-amber-600" />
                  <span>{programme.fees}</span>
                </div>
                <div className="flex items-center text-gray-700 bg-amber-50 px-4 py-2 rounded-lg">
                  <Star size={18} className="mr-2 text-amber-600" />
                  <span>{programme.rating} ({programme.ranking})</span>
                </div>
              </>
            )}
            {programme.type !== 'university' && (
              <>
                <div className="flex items-center text-gray-700 bg-amber-50 px-4 py-2 rounded-lg">
                  <Clock size={18} className="mr-2 text-amber-600" />
                  <span>{programme.duration}</span>
                </div>
                <div className="flex items-center text-gray-700 bg-amber-50 px-4 py-2 rounded-lg">
                  <DollarSign size={18} className="mr-2 text-amber-600" />
                  <span>{programme.fees}</span>
                </div>
              </>
            )}
          </div>
          
          <div className="prose prose-lg max-w-none text-gray-700 mb-8">
            <p>{programme.description}</p>
          </div>

          {/* Programme Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="flex items-center p-3 bg-gradient-to-r from-rose-50 to-amber-50 rounded-lg border border-rose-100">
              <Trophy className="mr-3 text-rose-500" size={20} />
              <span className="text-sm font-medium text-gray-700">Top Ranked</span>
            </div>
            <div className="flex items-center p-3 bg-gradient-to-r from-rose-50 to-amber-50 rounded-lg border border-rose-100">
              <GraduationCap className="mr-3 text-rose-500" size={20} />
              <span className="text-sm font-medium text-gray-700">Industry Ready</span>
            </div>
            <div className="flex items-center p-3 bg-gradient-to-r from-rose-50 to-amber-50 rounded-lg border border-rose-100">
              <Briefcase className="mr-3 text-rose-500" size={20} />
              <span className="text-sm font-medium text-gray-700">Career Support</span>
            </div>
          </div>

          {programme.type === 'university' && (
            <div className="flex items-center text-amber-600 font-medium mb-6">
              <span className="mr-2">{programme.rating}</span>
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1">{programme.ranking}</span>
            </div>
          )}
        </div>
      </div>

      {/* Key Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Eligibility */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-amber-100">
          <div className="flex items-center mb-4">
            <UsersIcon size={24} className="mr-3 text-amber-600" />
            <h2 className="text-2xl font-bold text-gray-900">Eligibility Criteria</h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            {programme.eligibility}
          </p>
          {programme.type === 'university' && (
            <div className="mt-4 p-4 bg-rose-50 rounded-lg">
              <h3 className="font-semibold text-rose-800 mb-2">Additional Requirements</h3>
              <ul className="text-sm text-rose-700 space-y-1">
                <li className="flex items-start">
                  <CheckCircle size={16} className="mr-2 mt-0.5 flex-shrink-0 text-rose-500" />
                  <span>Portfolio submission for design programs</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="mr-2 mt-0.5 flex-shrink-0 text-rose-500" />
                  <span>Language proficiency test scores</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={16} className="mr-2 mt-0.5 flex-shrink-0 text-rose-500" />
                  <span>Letters of recommendation</span>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Contact */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-amber-100">
          <div className="flex items-center mb-4">
            <Mail size={24} className="mr-3 text-amber-600" />
            <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
          </div>
          <p className="text-gray-700 mb-4">
            {programme.contact}
          </p>
          <div className="space-y-3">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar size={16} className="mr-2 text-amber-500" />
              <span>Application Deadline: Rolling admissions</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Globe size={16} className="mr-2 text-amber-500" />
              <span>Website: Available upon request</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Heart size={16} className="mr-2 text-amber-500" />
              <span>Student Support: 24/7 available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-amber-100">
        <div className="flex items-center mb-6">
          <BookOpen size={24} className="mr-3 text-amber-600" />
          <h2 className="text-2xl font-bold text-gray-900">Curriculum Overview</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {programme.curriculum.map((item, index) => (
            <div 
              key={index} 
              className="flex items-start p-4 bg-gradient-to-r from-amber-50 to-rose-50 rounded-lg border border-amber-200 hover:border-amber-300 transition-colors"
            >
              <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-rose-500 rounded-full mt-2 mr-3 flex-shrink-0" />
              <span className="text-gray-700 font-medium">{item}</span>
            </div>
          ))}
        </div>
        {programme.type === 'university' && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
              <Award className="mr-2" size={18} />
              Special Features
            </h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Industry internships with leading fashion houses</li>
              <li>• International exchange programs available</li>
              <li>• Masterclasses by renowned fashion designers</li>
              <li>• Annual fashion showcase and portfolio presentation</li>
            </ul>
          </div>
        )}
      </div>

      {/* Additional Sections for Universities */}
      {programme.type === 'university' && (
        <>
          {/* Campus Facilities */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-amber-100">
            <div className="flex items-center mb-6">
              <Building size={24} className="mr-3 text-amber-600" />
              <h2 className="text-2xl font-bold text-gray-900">Campus Facilities</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-800 mb-2">Design Studios</h3>
                <p className="text-sm text-green-700">State-of-the-art workspaces with professional equipment</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">Library Resources</h3>
                <p className="text-sm text-blue-700">Extensive fashion archives, books, and digital resources</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-purple-800 mb-2">Tech Labs</h3>
                <p className="text-sm text-purple-700">CAD labs, 3D printing, and digital design tools</p>
              </div>
            </div>
          </div>

          {/* Career Prospects */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-amber-100">
            <div className="flex items-center mb-6">
              <Briefcase size={24} className="mr-3 text-amber-600" />
              <h2 className="text-2xl font-bold text-gray-900">Career Outcomes</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Popular Career Paths</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <ChevronRight size={16} className="mr-2 text-amber-500" />
                    <span>Fashion Designer</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight size={16} className="mr-2 text-amber-500" />
                    <span>Brand Manager</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight size={16} className="mr-2 text-amber-500" />
                    <span>Fashion Merchandiser</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight size={16} className="mr-2 text-amber-500" />
                    <span>Textile Designer</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Industry Partners</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <ChevronRight size={16} className="mr-2 text-amber-500" />
                    <span>Luxury fashion houses</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight size={16} className="mr-2 text-amber-500" />
                    <span>Fast fashion brands</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight size={16} className="mr-2 text-amber-500" />
                    <span>Sustainable fashion startups</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight size={16} className="mr-2 text-amber-500" />
                    <span>Fashion media companies</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Lead Form Section */}
      <div className="bg-gradient-to-br from-amber-50 via-rose-50 to-white rounded-3xl p-8 sm:p-12 shadow-xl border border-amber-200">
        <div className="text-center mb-10">
          <h2 className="text-4xl lg:text-5xl font-serif font-light text-gray-900 mb-4">
            Interested in this Programme?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Fill out the form below and our experts will get in touch with you to discuss your fashion education goals and provide detailed information about the {programme.name}.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-3">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-5 py-4 border border-amber-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-white/70"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-3">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-5 py-4 border border-amber-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-white/70"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-3">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-5 py-4 border border-amber-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 bg-white/70"
                placeholder="+91 1234567890"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-3">
                Additional Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-5 py-4 border border-amber-200 rounded-2xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 resize-none bg-white/70"
                placeholder="Tell us about your fashion goals, questions about the programme, or any specific requirements..."
              />
            </div>

            <button
              type="submit"
              disabled={loading || isSubmitted}
              aria-label={isSubmitted ? "Application submitted successfully" : loading ? "Submitting application" : "Submit Application"}
              className="w-full bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white px-8 py-5 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-3 disabled:opacity-75 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-amber-300 focus:ring-opacity-50"
            >
              {isSubmitted ? (
                <span className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Thank You! We'll contact you soon.</span>
                </span>
              ) : loading ? (
                <span className="flex items-center space-x-2">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Submitting...</span>
                </span>
              ) : (
                <>
                  <span>Get Program Details</span>
                  <Send size={20} aria-hidden="true" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Programme Type Badge */}
      {/* <div className="text-center py-8">
        <span className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-rose-400 text-white rounded-full font-semibold text-lg shadow-lg">
          {programme.type === 'university' ? (
            <>
              <GraduationCap className="mr-2" size={20} />
              University Program
            </>
          ) : programme.type === 'nift' ? (
            <>
              <Trophy className="mr-2" size={20} />
              NIFT Program
            </>
          ) : (
            <>
              <Award className="mr-2" size={20} />
              Certification Course
            </>
          )}
        </span>
      </div> */}
    </div>
  );
};

export default ProgrammeDetail;
