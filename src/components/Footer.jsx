import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Courses', href: '#courses' },
    { name: 'Study Abroad', href: '#study-abroad' },
    { name: 'Success Stories', href: '#testimonials' },
    { name: 'Blog', href: '#blog' },
    { name: 'FAQ', href: '#faq' },
  ];

  const services = [
    { name: 'Fashion Design Courses', href: '#courses' },
    { name: 'Portfolio Development', href: '#portfolio' },
    { name: 'Career Counseling', href: '#career' },
    { name: 'University Admissions', href: '#admissions' },
    { name: 'Scholarship Guidance', href: '#scholarships' },
    { name: 'Industry Internships', href: '#internships' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-stone-900 to-amber-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-8">
            <div>
              <h3 className="text-4xl font-bold mb-6">
                <span className="font-serif font-light">why</span>
                <span className="text-amber-400 ml-1">designers</span>
              </h3>
              <p className="text-stone-300 leading-relaxed font-light text-lg">
                Empowering the next generation of fashion designers through 
                world-class education and personalized career guidance.
              </p>
            </div>
            
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="bg-white/10 hover:bg-amber-600 p-4 rounded-2xl transition-all duration-300 transform hover:scale-110 backdrop-blur-sm"
                  >
                    <IconComponent size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-8 text-amber-400">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-stone-300 hover:text-amber-400 transition-colors duration-200 hover:translate-x-1 transform inline-block font-light"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-bold mb-8 text-amber-400">Our Services</h4>
            <ul className="space-y-4">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href={service.href}
                    className="text-stone-300 hover:text-amber-400 transition-colors duration-200 hover:translate-x-1 transform inline-block font-light"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-8 text-amber-400">Contact Info</h4>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Phone className="text-amber-400 flex-shrink-0" size={20} />
                <span className="text-stone-300 font-light">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="text-amber-400 flex-shrink-0" size={20} />
                <span className="text-stone-300 font-light">info@whydesigners.com</span>
              </div>
              <div className="flex items-start space-x-4">
                <MapPin className="text-amber-400 flex-shrink-0 mt-1" size={20} />
                <span className="text-stone-300 font-light">
                  123 Fashion District<br />
                  New York, NY 10001
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-stone-700 mt-16 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <p className="text-stone-400 text-sm font-light">
              © 2025 why designers. All rights reserved.
            </p>
            <div className="flex space-x-8 text-sm">
              <a href="#" className="text-stone-400 hover:text-amber-400 transition-colors duration-200 font-light">
                Privacy Policy
              </a>
              <a href="#" className="text-stone-400 hover:text-amber-400 transition-colors duration-200 font-light">
                Terms of Service
              </a>
              <a href="#" className="text-stone-400 hover:text-amber-400 transition-colors duration-200 font-light">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;