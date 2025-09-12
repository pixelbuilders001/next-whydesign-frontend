import React from 'react';
import { Globe, GraduationCap } from 'lucide-react';

const programs = [
  {
    key: 'nift',
    title: 'NIFT',
    icon: <GraduationCap size={40} className="text-amber-600 drop-shadow-lg" />,
    desc: 'Kickstart your fashion career with NIFT. Experience mentorship, hands-on workshops, and real-world projects designed for future designers.',
    color: 'from-amber-50 via-rose-50 to-white',
    accent: 'border-amber-400',
  },
  {
    key: 'studyAbroad',
    title: 'Study Fashion Abroad',
    icon: <Globe size={40} className="text-blue-600 drop-shadow-lg" />,
    desc: 'Explore top fashion universities around the world. Get global exposure, diverse learning, and unlock international opportunities.',
    color: 'from-blue-50 via-rose-50 to-white',
    accent: 'border-blue-400',
  },
  {
    key: 'certification',
    title: 'Certification Courses',
    icon: <Globe size={40} className="text-green-600 drop-shadow-lg" />,
    desc: 'Upgrade your skills with industry-recognized certification courses in fashion styling, design thinking, and fashion business.',
    color: 'from-green-50 via-rose-50 to-white',
    accent: 'border-green-400',
  },
];

const ProgramBriefSection = () => (
  <section className="py-12 bg-gradient-to-b from-stone-50 to-rose-50/30">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title & Subtitle */}
      <div className="text-center mb-12">
        <h2 className="text-5xl lg:text-6xl font-serif font-light text-gray-900 mb-4 leading-tight">
          Your Fashion Journey
          <span className="text-amber-600 block font-normal text-3xl mt-2">
            Choose Your Path to Success
          </span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
          A quick overview of our flagship programs designed for aspiring fashion professionals.
        </p>
      </div>
      {/* Modern Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {programs.map((prog) => (
          <div
            key={prog.key}
            className={`relative bg-gradient-to-br ${prog.color} border-t-4 ${prog.accent} rounded-3xl shadow-2xl p-10 flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-amber-200/40 hover:shadow-2xl`}
          >
            {/* Accent Circle */}
            <div className="absolute -top-7 left-1/2 -translate-x-1/2">
              <div className="bg-white rounded-full shadow-lg p-4 border-2 border-rose-100">
                {prog.icon}
              </div>
            </div>
            <div className="pt-8" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3 font-serif">{prog.title}</h3>
            <p className="text-gray-700 text-base leading-relaxed mb-4">{prog.desc}</p>
            <span className={`inline-block mt-2 px-5 py-2 rounded-full bg-amber-50 text-amber-700 font-medium text-sm shadow-sm`}>
              Learn More
            </span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProgramBriefSection;