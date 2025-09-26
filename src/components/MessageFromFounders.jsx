import React from 'react';

const founders = [
  {
    name: 'John Doe',
    title: 'Co-Founder & CEO',
    message: 'At Why Designs, we believe in empowering the next generation of fashion designers. Our journey started with a simple idea: to make quality fashion education accessible to everyone, everywhere.',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', // Replace with actual image
  },
  {
    name: 'Jane Smith',
    title: 'Co-Founder & Creative Director',
    message: 'Fashion is not just about clothes; it\'s about storytelling and self-expression. We\'re committed to nurturing creativity and innovation in every aspiring designer we work with.',
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop', // Replace with actual image
  },
];

const MessageFromFounders = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-serif font-light text-gray-900 mb-4">
            Message from Our Founders
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear directly from the visionaries behind Why Designs
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {founders.map((founder, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="mb-6">
                <img
                  src={founder.image}
                  alt={founder.name}
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
    </section>
  );
};

export default MessageFromFounders;