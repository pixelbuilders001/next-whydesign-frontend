import React from 'react';
import { GraduationCap, Globe, Briefcase, PenTool } from 'lucide-react';

const WhatWeDoSection = () => {
  const services = [
    {
      icon: GraduationCap,
      title: 'Fashion Courses',
      description: 'Comprehensive fashion design programs from beginner to advanced levels, taught by industry professionals with real-world experience.',
      features: ['Pattern Making', 'Fashion Illustration', 'Textile Design', 'Fashion Business']
    },
    {
      icon: Globe,
      title: 'Study Abroad Guidance',
      description: 'Expert assistance for studying fashion at prestigious international universities and design schools worldwide.',
      features: ['University Selection', 'Application Support', 'Visa Assistance', 'Scholarship Guidance']
    },
    {
      icon: PenTool,
      title: 'Portfolio Creation',
      description: 'Professional portfolio development services to showcase your creativity and secure your dream opportunities in fashion.',
      features: ['Portfolio Review', 'Photo Styling', 'Digital Presentation', 'Industry Standards']
    },
    {
      icon: Briefcase,
      title: 'Career Support',
      description: 'Ongoing career guidance and placement assistance to help you thrive and grow in the competitive fashion industry.',
      features: ['Job Placement', 'Interview Prep', 'Industry Networking', 'Career Coaching']
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-serif font-light text-gray-900 mb-8 leading-tight">
            What We Do
            <span className="text-amber-600 block font-normal">Best for You</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Comprehensive fashion education and career services designed to elevate 
            your creative journey and professional success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="group bg-gradient-to-br from-stone-50 to-rose-50/50 rounded-3xl p-10 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-white/50"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl">
                    <IconComponent className="text-white" size={32} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-200 rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-amber-700 transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-8 leading-relaxed font-light">
                  {service.description}
                </p>

                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-amber-600 rounded-full mr-4 flex-shrink-0" />
                      <span className="font-light">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="mt-8 text-amber-600 hover:text-amber-700 font-medium transition-all duration-200 group-hover:translate-x-1 transform">
                  Learn More →
                </button>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 rounded-3xl p-12 lg:p-16 text-white shadow-2xl">
            <h3 className="text-3xl lg:text-4xl font-serif font-light mb-6 leading-tight">
              Ready to Start Your Fashion Career?
            </h3>
            <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto font-light leading-relaxed">
              Join thousands of successful fashion designers who started their journey with us.
            </p>
            <button className="bg-white text-amber-700 px-10 py-5 rounded-full font-medium text-lg hover:bg-stone-50 transition-all duration-300 transform hover:scale-105 shadow-xl">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;