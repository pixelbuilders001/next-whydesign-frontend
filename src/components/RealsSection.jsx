"use client";
import React, { useState, useRef, useEffect } from 'react';
import { PlayCircle } from 'lucide-react';

const reels = [
  {
    id: 1,
    title: 'Fashion Show Highlights',
    thumb: 'https://images.pexels.com/photos/1707828/pexels-photo-1707828.jpeg',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    id: 2,
    title: 'Student Life at NIFT',
    thumb: 'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    id: 3,
    title: 'Global Fashion Trends',
    thumb: 'https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    id: 4,
    title: 'Design Workshop Moments',
    thumb: 'https://images.pexels.com/photos/936120/pexels-photo-936120.jpeg',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
  {
    id: 5,
    title: 'Certification Success Stories',
    thumb: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
  },
];

const ReelsSection = () => {
  const [activeReel, setActiveReel] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (activeReel !== null && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [activeReel]);

  return (
    <section className="py-16 bg-gradient-to-b from-stone-50 to-rose-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl lg:text-6xl font-serif font-light text-gray-900 mb-4 leading-tight">
            Trending Reels
            <span className="text-amber-600 block font-normal text-3xl mt-2">
              Quick Glimpses of Campus & Fashion
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
            Explore our latest reels and short videos from campus, events, and student life.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {reels.map((reel) => (
            <div
              key={reel.id}
              className="group relative rounded-2xl overflow-hidden shadow-xl bg-white transition-transform duration-300 hover:-translate-y-2 hover:shadow-amber-200/40"
            >
              {activeReel === reel.id ? (
                <video
                  key={reel.id}
                  ref={videoRef}
                  src={reel.video}
                  controls
                  autoPlay
                  className="w-full h-64 object-cover rounded-2xl"
                  onEnded={() => setActiveReel(null)}
                />
              ) : (
                <>
                  <img
                    src={reel.thumb}
                    alt={reel.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
                    <span className="text-white text-lg font-semibold drop-shadow-lg">{reel.title}</span>
                    <button
                      className="bg-amber-600 rounded-full p-2 shadow-lg hover:bg-rose-500 transition-colors"
                      onClick={() => setActiveReel(reel.id)}
                    >
                      <PlayCircle size={28} className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReelsSection;