import React from 'react';
import Image from 'next/image';

import founder1 from '../../public/founder.png';
import founder2 from '../../public/founder2.png';

const founders = [
  {
    name: 'Piyush Katiyar',
    title: 'Co-Founder & CEO',
    message: 'At Why Designs, we believe in empowering the next generation of fashion designers. Our journey started with a simple idea: to make quality fashion education accessible to everyone, everywhere.',
    image: founder1,
  },

];

const teamMembers = [
  {
    name: 'Sarah Johnson',
    title: 'Head of Design',
    message: 'Working at Why Designs has been an incredible journey. I love helping our students discover their creative potential and turn their fashion dreams into reality.',
    image: founder2,
  },
  {
    name: 'Michael Chen',
    title: 'Lead Instructor',
    message: 'Our innovative curriculum and hands-on approach ensure that every student graduates with real-world skills and industry connections.',
    image: founder1,
  },
  {
    name: 'Emily Rodriguez',
    title: 'Student Success Manager',
    message: 'I am passionate about supporting our students throughout their learning journey and celebrating their growth and achievements.',
    image: founder2,
  },
];

const MessageFromFounders = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Founders Section */}
        <div className="mb-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-light text-gray-900 mb-4">
            Messages from Our Founders
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hear directly from the visionaries who founded Why Designs and the dedicated team members who bring our mission to life
          </p>
        </div>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-12">
            {founders.map((founder, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="mb-6">
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    width={100}
                    height={100}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-primary-200"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{founder.name}</h3>
                <p className="text-primary-600 font-medium mb-4">{founder.title}</p>
                <p className="text-gray-700 leading-relaxed">{founder.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Members Section */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-serif font-light text-gray-900 mb-4">
              From Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated professionals who make our vision a reality
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-full mx-auto object-cover border-3 border-primary-200"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-3 text-sm">{member.title}</p>
                <p className="text-gray-700 leading-relaxed text-sm">{member.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessageFromFounders;