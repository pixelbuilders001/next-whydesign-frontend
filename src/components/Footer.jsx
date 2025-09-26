import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';
import logo from '../../public/logo.png';

const Footer = () => {
  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Courses', href: '#courses' },
    { name: 'Study Abroad', href: '#study-abroad' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Blog', href: '/blogs' },
    // { name: 'FAQ', href: '#faq' },
  ];

  const services = [
     { name: 'Privacy Policy', href: '/privacy-policy' },
     { name: 'Terms of Service', href: '/terms-of-service' },
     { name: 'FAQ', href: '/faq' },

   ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-stone-900 to-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-8">
            <div>
              <div className="mb-0">
                <Image
                  src={logo}
                  alt="why designers"
                  width={80}
                  height={80}
                  className="border rounded-lg"
                />
              </div>
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
                    className="bg-white/10 hover:bg-primary-600 p-4 rounded-2xl transition-all duration-300 transform hover:scale-110 backdrop-blur-sm"
                  >
                    <IconComponent size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-8 text-primary-400">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-stone-300 hover:text-primary-400 transition-colors duration-200 hover:translate-x-1 transform inline-block font-light"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-bold mb-8 text-primary-400">Our Services</h4>
            <ul className="space-y-4">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href={service.href}
                    className="text-stone-300 hover:text-primary-400 transition-colors duration-200 hover:translate-x-1 transform inline-block font-light"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-8 text-primary-400">Contact Info</h4>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Phone className="text-primary-400 flex-shrink-0" size={20} />
                <span className="text-stone-300 font-light">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="text-primary-400 flex-shrink-0" size={20} />
                <span className="text-stone-300 font-light">info@whydesigners.com</span>
              </div>
              <div className="flex items-start space-x-4">
                <MapPin className="text-primary-400 flex-shrink-0 mt-1" size={20} />
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
          <div className="flex items-center justify-center">  
            <p className="text-stone-400 text-sm font-light">
              © 2025 why designers. All rights reserved.
            </p>
          
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;