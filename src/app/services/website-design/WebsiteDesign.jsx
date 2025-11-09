"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getTeams, createLead } from "@/lib/authService";
import {
  Code,
  Palette,
  Smartphone,
  Zap,
  CheckCircle,
  ArrowRight,
  Send,
  Star,
  ExternalLink,
  Play,
  Pause,
  Users,
  Briefcase,
} from "lucide-react";
import Head from "next/head";

const dummyTeamMembers = [
  {
    _id: "1",
    name: "Rajeev Sharma",
    designation: "Lead Frontend Developer & Founder",
    description:
      "Expert in React, Next.js, and modern web technologies with 8+ years of experience.",
    image:
      "https://ui-avatars.com/api/?name=Rajesh+Kumar&background=f59e0b&color=fff&size=200",
  },
  {
    _id: "2",
    name: "Aman Kumar Sharma",
    designation: "Senior Software Engineer",
    description:
      "Creative designer specializing in user-centered design and beautiful interfaces.",
    image:
      "https://ui-avatars.com/api/?name=Priya+Sharma&background=ec4899&color=fff&size=200",
  },
  {
    _id: "3",
    name: "Anuj Kumar Sharma",
    designation: "Senior Software Engineer",
    description:
      "Full-stack developer with expertise in Node.js, databases, and API development.",
    image:
      "https://ui-avatars.com/api/?name=Amit+Patel&background=f59e0b&color=fff&size=200",
  },
];

export default function WebsiteDesignPage() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    areaOfInterest: "website-design",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);


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
          areaOfInterest: "website-design",
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
      areaOfInterest: "website-design",
    });
  };

  const features = [
    {
      icon: Palette,
      title: "Modern UI/UX Design",
      description:
        "Beautiful, intuitive interfaces that engage users and enhance their experience with your brand.",
    },
    {
      icon: Smartphone,
      title: "Responsive Design",
      description:
        "Websites that look stunning and work perfectly on all devices - desktop, tablet, and mobile.",
    },
    {
      icon: Code,
      title: "Clean Code",
      description:
        "Well-structured, maintainable code following industry best practices and modern standards.",
    },
    {
      icon: Zap,
      title: "Fast Performance",
      description:
        "Optimized for speed and performance to provide the best user experience and SEO rankings.",
    },
  ];

  const process = [
    {
      step: "01",
      title: "Discovery & Planning",
      description:
        "We understand your business goals, target audience, and project requirements to create a solid foundation.",
    },
    {
      step: "02",
      title: "Design & Prototype",
      description:
        "Our designers create stunning mockups and interactive prototypes for your review and feedback.",
    },
    {
      step: "03",
      title: "Development",
      description:
        "Our developers bring the designs to life with clean, efficient code and modern technologies.",
    },
    {
      step: "04",
      title: "Testing & Launch",
      description:
        "Rigorous testing ensures everything works perfectly before we launch your website to the world.",
    },
  ];

  const technologies = [
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Tailwind CSS",
    "MongoDB",
    "PostgreSQL",
    "AWS",
    "Vercel",
    "Git",
  ];

  const portfolioItems = [
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "Web Development",
      image: "/services/01.png",
      description: "Modern e-commerce solution with seamless user experience",
      link: "https://bakery-sand.vercel.app/",
    },
    {
      id: 2,
      title: "Corporate Website",
      category: "Web Design",
      image: "/services/laundry.png",
      description: "Professional corporate identity with engaging content",
      link: "https://demo-laundry-five.vercel.app/",
    },
    {
      id: 3,
      title: "SaaS Dashboard",
      category: "UI/UX Design",
      image: "/services/spa.png",
      description: "Intuitive dashboard for complex data visualization",
      link: "https://salon-ashy.vercel.app/",
    },
    {
      id: 4,
      title: "Mobile App Interface",
      category: "App Design",
      image: "/services/gym.png",
      description: "User-friendly mobile interface for better engagement",
      link: "https://gym-navy-phi.vercel.app/",
    },
    {
      id: 5,
      title: "Portfolio Website",
      category: "Web Development",
      image: "/services/portfolio.png",
      description: "Creative portfolio showcasing amazing work",
      link: "https://v0-female-fashion-portfolio.vercel.app/",
    },
    {
      id: 6,
      title: "Booking System",
      category: "Web App",
      image: "/services/agency.png",
      description: "Streamlined booking experience for customers",
      link: "https://pixelbuilders.in/",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      company: "TechInnovate",
      text: "The team delivered beyond our expectations. Our website traffic increased by 200% after the redesign.",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      company: "Global Solutions",
      text: "Professional, creative, and extremely efficient. The entire process was smooth and transparent.",
      rating: 5,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      company: "StartUp Ventures",
      text: "They transformed our vision into reality. The website perfectly represents our brand identity.",
      rating: 5,
    },
  ];

  const stats = [
    { number: "150+", label: "Projects Completed" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "50+", label: "Team Members" },
    { number: "24/7", label: "Support Available" },
  ];

  return (
    <>
      <Head>
        <title>Website Design Services - Whydesigners</title>
        <meta
          name="description"
          content="Professional website design and development services. Modern, responsive websites that drive business growth."
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
        <Header />

        <main className="pt-10">
          {/* Hero Section */}
          {/* Hero Section */}
          <section className="relative py-20 lg:py-20 overflow-hidden bg-gradient-to-br from-amber-50 via-rose-50 to-white">
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
        <div className="space-y-4">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
            <span className="font-serif font-light block">
              Crafting Digital
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-rose-500 block">
              Experiences That
            </span>
            <span className="font-serif font-light block">
              Convert & Inspire
            </span>
          </h1>
          <p className="hidden lg:block text-md lg:text-xl text-gray-600 leading-relaxed max-w-2xl">
            We design and develop stunning, high-performance websites
            that don't just look beautiful - they drive real business
            results and create unforgettable user experiences.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="hidden lg:flex flex-col sm:flex-row gap-4 pt-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="group relative bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Start Your Project
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          <Link
            href="#portfolio"
            className="group bg-white text-gray-900 px-8 py-4 rounded-full font-medium text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg border border-gray-200 hover:shadow-xl flex items-center justify-center gap-2"
          >
            <span>View Our Work</span>
            <svg
              className="w-5 h-5 group-hover:scale-110 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Right Content - Visual Showcase */}
      <div className="relative">
        {/* Main Showcase Card */}
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-amber-100 transform rotate-1 hover:rotate-0 transition-transform duration-500">
          {/* Browser UI */}
          <div className="absolute top-0 left-0 right-0 bg-gray-100 px-4 py-2 flex items-center gap-2 z-20">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
            <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-gray-600 flex items-center gap-2">
              <span>🌐</span>
              <span className="truncate">your-website.com</span>
            </div>
          </div>

          {/* Website Preview */}
          <div className="aspect-video relative mt-10">
            <Image
              src="/services/01.png" // Replace with your actual website image
              alt="Website Design Preview"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              // onError={(e) => {
              //   e.currentTarget.onerror = null;
              //   e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDUwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI1MDAiIGhlaWdodD0iMzAwIiBmaWxsPSJ1cmwoI2dyYWRpZW50KSIvPgo8ZGVmcz4KPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudCIgeDE9IjAiIHkxPSIwIiB4Mj0iNTAwIiB5Mj0iMzAwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI0ZCNTk0QiIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNFQzQ4OTkiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8dGV4dCB4PSIyNTAiIHk9IjE1MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+V2Vic2l0ZSBQcmV2aWV3PC90ZXh0Pgo8L3N2Zz4K';
              // }}

              // onLoadingComplete={(e) => {
              //   // Image loaded successfully
              //   e.target.style.opacity = '1';
              // }}
              onError={(e) => {
                e.currentTarget.onerror = null;
                // Hide skeleton and show fallback
                e.target.style.opacity = '1';
              }}
              // style={{ opacity: 0, transition: 'opacity 0.5s ease-in-out' }}
            />
            
            {/* Overlay with CTA */}
            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
              <Link
                href="https://bakery-sand.vercel.app/" // Replace with your actual website URL
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-0 hover:opacity-100 transform hover:scale-105 transition-all duration-300 bg-white text-gray-900 px-6 py-3 rounded-full font-medium flex items-center gap-2 shadow-lg"
              >
                <span>Visit Live Site</span>
                <ExternalLink size={16} />
              </Link>
            </div>
          </div>

          {/* Browser Bottom Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-gray-100 px-4 py-2 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <span>🔒</span>
              <span>Secure connection</span>
            </div>
            <div className="flex items-center gap-2">
              <span>⚡</span>
              <span>Fast loading</span>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute -top-6 -left-4 bg-amber-500 text-white px-4 py-2 rounded-full shadow-lg transform -rotate-6 z-10">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Zap className="w-4 h-4" />
            Lightning Fast
          </div>
        </div>

        <div className="absolute -bottom-4 -right-4 bg-rose-500 text-white px-4 py-2 rounded-full shadow-lg transform rotate-6 z-10">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Smartphone className="w-4 h-4" />
            Mobile First
          </div>
        </div>

        {/* Interactive Elements */}
        <div className="absolute -top-2 -right-2 bg-white rounded-lg shadow-lg px-3 py-2 border border-amber-100">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-700">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            Live Preview
          </div>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 bg-amber-200 rounded-2xl opacity-50 blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-20 h-20 bg-rose-200 rounded-2xl opacity-50 blur-xl"></div>
        </div>

   
      </div>
      <div className=" lg:hidden flex flex-col sm:flex-row gap-4 pt-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="group relative bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Start Your Project
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>

          <Link
            href="#portfolio"
            className="group bg-white text-gray-900 px-8 py-4 rounded-full font-medium text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg border border-gray-200 hover:shadow-xl flex items-center justify-center gap-2"
          >
            <span>View Our Work</span>
            <svg
              className="w-5 h-5 group-hover:scale-110 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </Link>
        </div>
    </div>
  </div>

  {/* Add these styles for the blob animation */}
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
    .animate-blob {
      animation: blob 7s infinite;
    }
    .animation-delay-2000 {
      animation-delay: 2s;
    }
    .animation-delay-4000 {
      animation-delay: 4s;
    }
  `}</style>
</section>

          {/* Stats Section */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-serif font-light text-gray-900 mb-4">
                  Why Choose Our Services
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  We deliver exceptional websites that combine beautiful design
                  with powerful functionality
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

          {/* Portfolio Section */}
     {/* Portfolio Section */}
{/* Portfolio Section */}
<section id="portfolio" className="py-20 bg-gradient-to-br from-amber-50 via-rose-50 to-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-4xl lg:text-5xl font-serif font-light text-gray-900 mb-4">
        Our Recent Work
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Explore our latest projects and see how we've helped businesses succeed online
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {portfolioItems.map((item) => (
        <div
          key={item.id}
          className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
        >
          <div className="aspect-video bg-gradient-to-br from-amber-400 to-rose-500 relative overflow-hidden">
            {/* Blurred Background */}
            <div className="absolute inset-0">
              <Image
                src={item.image}
                alt={item.title}
                width={500}
                height={300}
                className="w-full h-full object-cover filter blur-sm scale-110 opacity-80"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            
            {/* Main Image with Hover Effect */}
            <div className="absolute inset-2 rounded-xl overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                width={500}
                height={300}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:filter group-hover:blur-0"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.style.display = 'none';
                }}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300" />
            </div>
            
            {/* Category Badge */}
            <div className="absolute top-4 right-4 z-10">
              <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                {item.category}
              </span>
            </div>
            
            {/* View Project Button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              <Link
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-gray-900 px-6 py-3 rounded-full font-medium flex items-center space-x-2 transform hover:scale-105 transition-transform duration-200 shadow-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <span>View Live Project</span>
                <ExternalLink size={16} />
              </Link>
            </div>
          </div>
          
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 mb-4">
              {item.description}
            </p>            
            <Link
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium transition-colors duration-200"
            >
              View Project Details
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

          {/* Our Process Section */}
          <section id="our-process" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-serif font-light text-gray-900 mb-4">
                  Our Development Process
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  A proven methodology that ensures your project's success from
                  start to finish
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

          {/* Technologies Section */}
          <section className="py-20 bg-gradient-to-br from-amber-50 via-rose-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-serif font-light text-gray-900 mb-4">
                  Technologies We Use
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  We work with cutting-edge technologies to build modern,
                  scalable websites
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                {technologies.map((tech, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-stone-50 to-rose-50/50 px-6 py-3 rounded-full text-gray-800 font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    {tech}
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
                  Meet Our Team
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Talented professionals dedicated to bringing your vision to
                  life
                </p>
              </div>

              { dummyTeamMembers.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">
                    No team members available at the moment.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {dummyTeamMembers.map((member, index) => (
                    <div
                      key={member._id || index}
                      className="group bg-white rounded-3xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                    >
                      <div className="relative mb-6">
                        <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-amber-500 to-rose-500 p-1">
                          <Image
                            src={member.image}
                            alt={`${member.name}, ${member.designation}`}
                            width={128}
                            height={128}
                            className="w-full h-full rounded-full object-cover border-4 border-white"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = "/fallback-avatar.png";
                            }}
                          />
                        </div>
                        <div className="absolute bottom-2 right-6 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {member.name}
                      </h3>
                      <p className="text-amber-600 font-medium mb-4">
                        {member.designation}
                      </p>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {member.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-20 bg-gradient-to-br from-amber-50 via-rose-50 to-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl lg:text-5xl font-serif font-light text-gray-900 mb-4">
                  Client Testimonials
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Don't just take our word for it - hear from our satisfied
                  clients
                </p>
              </div>

              <div className="relative">
                <div className="bg-white rounded-3xl p-8 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex space-x-1">
                      {[...Array(testimonials[activeTestimonial].rating)].map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-amber-400 text-amber-400"
                          />
                        )
                      )}
                    </div>
                    <button
                      onClick={() => setAutoPlay(!autoPlay)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {autoPlay ? <Pause size={20} /> : <Play size={20} />}
                    </button>
                  </div>

                  <blockquote className="text-2xl lg:text-3xl font-light text-gray-900 mb-6 leading-relaxed">
                    "{testimonials[activeTestimonial].text}"
                  </blockquote>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-gray-900 text-lg">
                        {testimonials[activeTestimonial].name}
                      </div>
                      <div className="text-gray-600">
                        {testimonials[activeTestimonial].company}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center space-x-3 mt-8">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setActiveTestimonial(index);
                        setAutoPlay(false);
                      }}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === activeTestimonial
                          ? "bg-amber-600 w-8"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-r from-amber-500 to-rose-500 rounded-3xl p-12 lg:p-16 text-white shadow-2xl text-center">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                  Ready to Build Your Dream Website?
                </h2>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Let's create something amazing together. Get in touch with us
                  today for a free consultation.
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-white text-amber-600 px-10 py-5 rounded-full font-medium text-lg hover:bg-stone-50 transition-all duration-300 transform hover:scale-105 shadow-xl"
                >
                  Get Free Consultation
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
                  <h3 className="text-3xl font-bold text-gray-900">
                    Get in Touch
                  </h3>
                  <button
                    onClick={() => {setIsModalOpen(false); resetForm();}}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
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
                    className="w-full bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white px-8 py-5 rounded-2xl font-medium text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitted ? (
                      <>
                        <CheckCircle size={20} />
                        <span>Thank You! We'll Contact You Soon</span>
                      </>
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
