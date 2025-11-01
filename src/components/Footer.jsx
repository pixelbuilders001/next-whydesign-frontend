import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';
import logo from '../../public/logo.png';

const Footer = () => {
  const quickLinks = [
    { name: 'About Us', href: '/about-us' },
    { name: 'Blogs', href: '/blogs' },
  ];

  const services = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
    { name: 'FAQ', href: '/faq' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Follow us on Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/why.designers?igsh=MXYxOHRvcmRucHVicA==', label: 'Follow us on Instagram' },
    { icon: Twitter, href: '#', label: 'Follow us on Twitter' },
    { icon: Youtube, href: 'https://youtube.com/@whydesigner?si=y9R3hy0daxRCtlpa', label: 'Subscribe to our YouTube channel' },
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
                  alt="Why Designers - Fashion Education Platform"
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
                    target="_blank"
                    rel="noopener noreferrer"
                    href={social.href}
                    aria-label={social.label}
                    className="bg-white/10 hover:bg-primary-600 p-4 rounded-2xl transition-all duration-300 transform hover:scale-110 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-primary-300 focus:ring-opacity-50"
                  >
                    <IconComponent size={20} aria-hidden="true" />
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
                    className="text-stone-300 hover:text-primary-400 transition-colors duration-200 hover:translate-x-1 transform inline-block font-light focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-opacity-50 rounded px-2 py-1"
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
                    className="text-stone-300 hover:text-primary-400 transition-colors duration-200 hover:translate-x-1 transform inline-block font-light focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-opacity-50 rounded px-2 py-1"
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
                <Phone className="text-primary-400 flex-shrink-0" size={20} aria-hidden="true" />
                <span className="text-stone-300 font-light">+91 (756) 123-4567</span>
              </div>
              <div className="flex items-center space-x-4">
                <Mail className="text-primary-400 flex-shrink-0" size={20} aria-hidden="true" />
                <a 
                  href="mailto:info@whydesigners.com" 
                  className="text-stone-300 font-light hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-opacity-50 rounded px-1"
                >
                  info@whydesigners.com
                </a>
              </div>
              <div className="flex items-start space-x-4">
                <MapPin className="text-primary-400 flex-shrink-0 mt-1" size={20} aria-hidden="true" />
                <address className="text-stone-300 font-light not-italic">
                  CP, Fashion District<br />
                  New Delhi, India - 110001
                </address>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-stone-700 mt-16 pt-10">
          <div className="flex items-center justify-center">  
            <p className="text-stone-400 text-sm font-light">
              © 2025 Why Designers. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;