import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import founder1 from '../../public/founder.png';
import founder2 from '../../public/founder2.png';
import { getTeams } from '@/lib/authService';

const founders = [
  {
    name: 'Piyush Katiyar',
    title: 'Co-Founder & CEO',
    message: 'At Why Designs, we believe in empowering the next generation of fashion designers. Our journey started with a simple idea: to make quality fashion education accessible to everyone, everywhere.',
    image: founder1,
  },
];

const MessageFromFounders = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("teamMembers", teamMembers);

  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true);
      try {
        const response = await getTeams(1, 3);
        if (response.success) {
          setTeamMembers(response.data.data.teams);
        }
      } catch (error) {
        setLoading(false);
        console.error('Error fetching teams:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, []);

  return (
    <section 
      className="py-16 bg-gradient-to-b from-white to-stone-50"
      aria-labelledby="founders-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Founders Section */}
        <div className="mb-16">
          <div className="text-center mb-16">
            <h2 id="founders-heading" className="text-4xl lg:text-5xl font-serif font-light text-gray-900 mb-4">
              Messages from Our Founders
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear directly from the visionaries who founded Why Designs and the dedicated team members who bring our mission to life
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-12">
            {founders.map((founder, index) => (
              <article 
                key={index} 
                className="bg-white rounded-2xl shadow-lg p-8 text-center"
                aria-labelledby={`founder-name-${index}`}
              >
                <div className="mb-6">
                  <Image
                    src={founder.image}
                    alt={`Portrait of ${founder.name}, ${founder.title}`}
                    width={100}
                    height={100}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-primary-200"
                  />
                </div>
                <h3 id={`founder-name-${index}`} className="text-2xl font-bold text-gray-900 mb-2">{founder.name}</h3>
                <p className="text-primary-600 font-medium mb-4">{founder.title}</p>
                <p className="text-gray-700 leading-relaxed">{founder.message}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Team Members Section */}
        <div aria-labelledby="team-heading">
          <div className="text-center mb-12">
            <h2 id="team-heading" className="text-4xl lg:text-5xl font-serif font-light text-gray-900 mb-4">
              From Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the dedicated professionals who make our vision a reality
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div 
                className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" 
                aria-label="Loading team members"
              />
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No team members available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <article 
                  key={index} 
                  className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
                  aria-labelledby={`team-member-${index}`}
                >
                  <div className="mb-4">
                    <Image
                      src={member.image}
                      alt={`Portrait of ${member.name}, ${member.designation}`}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-full mx-auto object-cover border-3 border-primary-200"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/fallback-avatar.png';
                      }}
                    />
                  </div>
                  <h3 id={`team-member-${index}`} className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-3 text-sm">{member.designation}</p>
                  <p className="text-gray-700 leading-relaxed text-sm">{member.description}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MessageFromFounders;