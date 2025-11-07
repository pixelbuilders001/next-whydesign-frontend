"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getTeams, createLead } from '@/lib/authService';
import { Sparkles, Palette, Layers, Target, CheckCircle, ArrowRight, Send } from 'lucide-react';
import Head from 'next/head';

const features = [
  {
    icon: Sparkles,
    title: 'Unique & Creative',
    description: 'Original logo designs that stand out and capture the essence of your brand identity.',
  },
  {
    icon: Palette,
    title: 'Color Psychology',
    description: 'Strategic use of colors that evoke the right emotions and connect with your target audience.',
  },
  {
    icon: Layers,
    title: 'Versatile Designs',
    description: 'Logos that work perfectly across all mediums - print, digital, merchandise, and more.',
  },
  {
    icon: Target,
    title: 'Brand Focused',
    description: 'Designs aligned with your brand values, mission, and target market for maximum impact.',
  },
];

const process = [
  {
    step: '01',
    title: 'Discovery',
    description: 'We dive deep into your brand, values, target audience, and competitive landscape.',
  },
  {
    step: '02',
    title: 'Concept Development',
    description: 'Our designers create multiple unique concepts based on your brand strategy.',
  },
  {
    step: '03',
    title: 'Refinement',
    description: 'We refine your chosen concept with your feedback to achieve perfection.',
  },
  {
    step: '04',
    title: 'Final Delivery',
    description: 'You receive all file formats, brand guidelines, and full ownership rights.',
  },
];

const packages = [
  {
    name: 'Starter',
    price: '₹9,999',
    features: [
      '3 Initial Concepts',
      '2 Revision Rounds',
      'Basic File Formats',
      'Social Media Kit',
      '7 Days Delivery',
    ],
  },
  {
    name: 'Professional',
    price: '₹19,999',
    popular: true,
    features: [
      '5 Initial Concepts',
      'Unlimited Revisions',
      'All File Formats',
      'Brand Style Guide',
      'Social Media Kit',
      'Business Card Design',
      '5 Days Delivery',
    ],
  },
  {
    name: 'Enterprise',
    price: '₹39,999',
    features: [
      '10 Initial Concepts',
      'Unlimited Revisions',
      'All File Formats',
      'Complete Brand Identity',
      'Social Media Kit',
      'Stationery Design',
      'Brand Guidelines',
      '3 Days Delivery',
    ],
  },
];

const deliverables = [
  'Vector files (AI, EPS, SVG)',
  'High-resolution PNG & JPG',
  'Black & White versions',
  'Color variations',
  'Social media formats',
  'Favicon for website',
  'Brand style guide',
  'Full commercial rights',
];

export default function LogoDesignPage() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    areaOfInterest: "logo-design",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);



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
      setFormLoading(true);
      const response = await createLead(payload);

      if (response.success) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          areaOfInterest: "logo-design",
        });
        setTimeout(() => {
          setIsSubmitted(false);
          setIsModalOpen(false);
        }, 3000);
      } else {
        alert("Submission failed. Please try again!");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again!");
    } finally {
      setFormLoading(false);
    }
  };

const resetForm = () => {
  setFormData({
    name: "",
    email: "",
    phone: "",
    areaOfInterest: "logo-design",
  });
};

  return (
    <>
    <Head>
  <title>Professional Logo Design Services | Custom Brand Identity | Whydesigners</title>
  <meta name="description" content="Get stunning custom logo designs that capture your brand's essence. Professional logo design services with unlimited revisions, fast turnaround, and multiple file formats." />
  <meta name="keywords" content="logo design, custom logo, brand identity, logo designer, business logo, company logo, professional logo design, logo creation, brand logo" />
  <meta name="author" content="Whydesigners" />
  <meta name="robots" content="index, follow" />
  
  {/* Open Graph */}
  <meta property="og:title" content="Professional Logo Design Services | Custom Brand Identity | Whydesigners" />
  <meta property="og:description" content="Get stunning custom logo designs that capture your brand's essence. Professional logo design services with unlimited revisions and fast turnaround." />
  <meta property="og:url" content="https://whydesigners.com/services/logo-design" />
  <meta property="og:site_name" content="Whydesigners" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://whydesigners.com/og-logo-design.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Whydesigners - Professional Logo Design Services" />
  <meta property="og:locale" content="en_US" />
  
  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Professional Logo Design Services | Custom Brand Identity | Whydesigners" />
  <meta name="twitter:description" content="Get stunning custom logo designs that capture your brand's essence. Professional logo design services." />
  <meta name="twitter:image" content="https://whydesigners.com/og-logo-design.jpg" />
  <meta name="twitter:creator" content="@whydesigners" />
  
  {/* Canonical */}
  <link rel="canonical" href="https://whydesigners.com/services/logo-design" />
  

</Head>
<div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
      <Header />
      
      <main className="pt-10">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-amber-50 via-rose-50 to-white">
  {/* Background Elements */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-rose-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
    <div className="absolute top-40 left-1/2 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
  </div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      {/* Left Content */}
      <div className="text-left space-y-8">
    
       

        {/* Main Heading */}
        <div className="space-y-6">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
            <span className="font-serif font-light block">Professional</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-rose-500 block">
              Logo Design
            </span>
            <span className="font-serif font-light block">Services</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
            Create a lasting impression with a custom logo that perfectly captures 
            your brand's identity, values, and vision. Stand out from the competition 
            with designs that tell your unique story.
          </p>
        </div>

        {/* Key Features */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
          {[
            { icon: '🎨', text: '100% Custom Designs' },
            { icon: '⚡', text: 'Fast Turnaround' },
            { icon: '🔄', text: 'Unlimited Revisions' },
            { icon: '📱', text: 'Multi-Format Files' }
          ].map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="text-2xl">{feature.icon}</span>
              <span className="text-gray-700 font-medium">{feature.text}</span>
            </div>
          ))}
        </div> */}

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="group relative bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Get Your Logo Designed
              <svg 
                className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          
          <Link 
            href="#services"
            className="group bg-white text-gray-900 px-8 py-4 rounded-full font-medium text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg border border-gray-200 hover:shadow-xl flex items-center justify-center gap-2"
          >
            <span>View Services</span>
            <svg 
              className="w-5 h-5 group-hover:scale-110 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
        </div>

      </div>

      {/* Right Content - Creative Logo Process */}
      <div className="relative">
        {/* Main Process Visualization */}
        <div className="relative">
          {/* Central Logo Creation Animation */}
          <div className="relative w-80 h-80 mx-auto">
            {/* Outer Ring - Design Process */}
            <div className="absolute inset-0 border-2 border-amber-200 rounded-full animate-spin-slow">
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-amber-500 rounded-full"></div>
              <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 w-4 h-4 bg-rose-500 rounded-full"></div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-amber-400 rounded-full"></div>
              <div className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-4 h-4 bg-rose-400 rounded-full"></div>
            </div>

            {/* Middle Ring - Concepts */}
            <div className="absolute inset-8 border border-amber-100 rounded-full animate-spin-slow-reverse">
              {[1, 2, 3, 4].map((item) => (
                <div 
                  key={item}
                  className={`absolute w-6 h-6 bg-gradient-to-br from-amber-400 to-rose-500 rounded-lg transform -translate-x-1/2 -translate-y-1/2 ${
                    item === 1 ? 'top-0 left-1/2' :
                    item === 2 ? 'top-1/2 right-0' :
                    item === 3 ? 'bottom-0 left-1/2' :
                    'top-1/2 left-0'
                  }`}
                ></div>
              ))}
            </div>

            {/* Central Logo Preview */}
            <div className="absolute inset-16 bg-white rounded-2xl shadow-2xl border border-amber-100 flex items-center justify-center">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-500 to-rose-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">WD</span>
                </div>
                <div className="space-y-1">
                  <div className="w-20 h-2 bg-gradient-to-r from-amber-400 to-rose-400 rounded-full mx-auto"></div>
                  <div className="w-16 h-2 bg-gradient-to-r from-amber-300 to-rose-300 rounded-full mx-auto"></div>
                </div>
              </div>
            </div>

            {/* Floating Design Elements */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-xl shadow-lg border border-amber-100 flex items-center justify-center">
              <span className="text-2xl">🎨</span>
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-white rounded-xl shadow-lg border border-rose-100 flex items-center justify-center">
              <span className="text-2xl">💡</span>
            </div>
            <div className="absolute -top-4 -left-4 w-10 h-10 bg-white rounded-lg shadow-lg border border-amber-100 flex items-center justify-center">
              <span className="text-lg">✨</span>
            </div>
            <div className="absolute -bottom-4 -right-4 w-10 h-10 bg-white rounded-lg shadow-lg border border-rose-100 flex items-center justify-center">
              <span className="text-lg">⚡</span>
            </div>
          </div>

          {/* Process Steps */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { step: '1', title: 'Consult', icon: '💬' },
              { step: '2', title: 'Design', icon: '🎨' },
              { step: '3', title: 'Deliver', icon: '🚀' }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-rose-500 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold">{item.step}</span>
                </div>
                <div className="text-sm font-medium text-gray-700">{item.title}</div>
                {/* <div className="text-lg">{item.icon}</div> */}
              </div>
            ))}
          </div>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 bg-amber-200 rounded-2xl opacity-50 blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-20 h-20 bg-rose-200 rounded-2xl opacity-50 blur-xl"></div>
        </div>
      </div>
    </div>

  </div>

  {/* Animation Styles */}
  <style jsx>{`
    @keyframes blob {
      0% {
        transform: translate(0px, 0px) scale(1);
      }
      33% {
        transform: translate(30px, -50px) scale(1.1);
      }
      66% {
        transform: translate(-20px, 20px) scale(0.9);
      }
      100% {
        transform: translate(0px, 0px) scale(1);
      }
    }
    @keyframes spin-slow {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    @keyframes spin-slow-reverse {
      from {
        transform: rotate(360deg);
      }
      to {
        transform: rotate(0deg);
      }
    }
    .animate-blob {
      animation: blob 7s infinite;
    }
    .animate-spin-slow {
      animation: spin-slow 20s linear infinite;
    }
    .animate-spin-slow-reverse {
      animation: spin-slow-reverse 15s linear infinite;
    }
    .animation-delay-2000 {
      animation-delay: 2s;
    }
    .animation-delay-4000 {
      animation-delay: 4s;
    }
  `}</style>
</section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-serif font-light text-gray-900 mb-4">
                Why Choose Our Logo Design
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We create memorable logos that tell your brand's story and resonate with your audience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={index}
                    className="group bg-gradient-to-br from-stone-50 to-rose-50/50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-rose-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="text-white" size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Our Process Section */}
        <section className="py-20 bg-gradient-to-br from-amber-50 via-rose-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-serif font-light text-gray-900 mb-4">
                Our Design Process
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                A collaborative approach that ensures your logo perfectly represents your brand
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((item, index) => (
                <div
                  key={index}
                  className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="text-6xl font-bold text-amber-100 mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="text-amber-300" size={32} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Packages Section */}
        {/* <section id="packages" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-serif font-light text-gray-900 mb-4">
                Choose Your Package
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Flexible pricing options to suit businesses of all sizes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <div
                  key={index}
                  className={`relative rounded-3xl p-8 ${
                    pkg.popular
                      ? 'bg-gradient-to-br from-amber-500 to-rose-500 text-white shadow-2xl transform scale-105'
                      : 'bg-white border-2 border-gray-200 hover:border-amber-300'
                  } transition-all duration-300`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-white text-amber-600 px-4 py-1 rounded-full text-sm font-bold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <h3 className={`text-2xl font-bold mb-4 ${pkg.popular ? 'text-white' : 'text-gray-900'}`}>
                    {pkg.name}
                  </h3>
                  <div className="mb-6">
                    <span className={`text-4xl font-bold ${pkg.popular ? 'text-white' : 'text-gray-900'}`}>
                      {pkg.price}
                    </span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <CheckCircle 
                          className={`mr-3 flex-shrink-0 ${pkg.popular ? 'text-white' : 'text-amber-500'}`} 
                          size={20} 
                        />
                        <span className={pkg.popular ? 'text-white' : 'text-gray-600'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className={`w-full py-4 rounded-2xl font-medium text-lg transition-all duration-300 ${
                      pkg.popular
                        ? 'bg-white text-amber-600 hover:bg-gray-50'
                        : 'bg-gradient-to-r from-amber-500 to-rose-500 text-white hover:from-amber-600 hover:to-rose-600'
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Deliverables Section */}
        <section id="services" className="py-20 bg-gradient-to-br from-amber-50 via-rose-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-serif font-light text-gray-900 mb-4">
                What You'll Receive
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Complete logo package with all the files you need for any application
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {deliverables.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CheckCircle className="text-amber-500 mx-auto mb-3" size={32} />
                  <p className="text-gray-800 font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-serif font-light text-gray-900 mb-4">
                Meet Our Design Team
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Creative professionals passionate about bringing your brand vision to life
              </p>
            </div>

            { teamMembers.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No team members available at the moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                  <div
                    key={member._id || index}
                    className="bg-gradient-to-br from-stone-50 to-rose-50/50 rounded-3xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className="mb-6">
                      <Image
                        src={member.image}
                        alt={`${member.name}, ${member.designation}`}
                        width={120}
                        height={120}
                        className="w-30 h-30 rounded-full mx-auto object-cover border-4 border-amber-200"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/fallback-avatar.png';
                        }}
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-amber-600 font-medium mb-4">{member.designation}</p>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {member.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-amber-50 via-rose-50 to-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-amber-500 to-rose-500 rounded-3xl p-12 lg:p-16 text-white shadow-2xl text-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Ready to Create Your Perfect Logo?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Let's design a logo that makes your brand unforgettable. Start your project today!
              </p>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-white text-amber-600 px-10 py-5 rounded-full font-medium text-lg hover:bg-stone-50 transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Start Your Project
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Contact Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold text-gray-900">Get in Touch</h3>
                <button
                  onClick={() => {setIsModalOpen(false); resetForm();}}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
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

                <button
                  type="submit"
                  disabled={formLoading || isSubmitted}
                  className="w-full bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white px-8 py-5 rounded-2xl font-medium text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-3"
                >
                  {isSubmitted ? (
                    <span>Thank You!</span>
                  ) : formLoading ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Submit Request</span>
                      <Send size={20} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
    
    </>
  
  );
}