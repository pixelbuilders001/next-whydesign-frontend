"use client";
import React, { useState, useRef, useEffect } from "react";
import { PlayCircle, Volume2, VolumeX } from "lucide-react";

const reels = [
  { id: 1, title: "Fashion Show Highlights", thumb: "https://images.pexels.com/photos/1707828/pexels-photo-1707828.jpeg", video: "https://www.pexels.com/download/video/8516411/" },
  { id: 2, title: "Student Life at NIFT", thumb: "https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: 3, title: "Global Fashion Trends", thumb: "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: 4, title: "Design Workshop Moments", thumb: "https://images.pexels.com/photos/936120/pexels-photo-936120.jpeg", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { id: 5, title: "Certification Success Stories", thumb: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg", video: "https://www.w3schools.com/html/mov_bbb.mp4" },
];

const ReelsSection = () => {
  const [activeReel, setActiveReel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [muted, setMuted] = useState(true);
  const [loading, setLoading] = useState(false);
  const videoRefs = useRef([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (!isModalOpen) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
            setActiveReel(video.dataset.id);
          } else {
            video.pause();
            video.currentTime = 0;
          }
        });
      },
      { threshold: 0.75 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [isModalOpen]);

  const openModal = (reelId) => {
    setActiveReel(reelId);
    setIsModalOpen(true);
    setLoading(true); // start loader

    // Scroll to clicked reel
    setTimeout(() => {
      if (scrollContainerRef.current) {
        const index = reels.findIndex((r) => r.id === reelId);
        const reelElement = scrollContainerRef.current.children[index];
        if (reelElement) {
          reelElement.scrollIntoView({ behavior: "auto" });
        }
      }
    }, 50);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveReel(null);
    setMuted(true);
    setLoading(false);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-stone-50 to-rose-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
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

        {/* Thumbnails */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {reels.map((reel) => (
            <div
              key={reel.id}
              className="group relative rounded-2xl overflow-hidden shadow-xl bg-white transition-transform duration-300 hover:-translate-y-2 hover:shadow-amber-200/40 cursor-pointer"
              onClick={() => openModal(reel.id)}
            >
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
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(reel.id);
                  }}
                >
                  <PlayCircle size={28} className="text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto">
          {/* Blurred background */}
          <div
            className="absolute inset-0 bg-white/20 backdrop-blur-sm"
            onClick={closeModal}
          ></div>

          {/* Loader */}
          {loading && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-white/30 backdrop-blur-sm">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-amber-500 border-solid"></div>
                <p className="mt-4 text-white text-lg font-semibold drop-shadow-lg">Loading Reels...</p>
              </div>
            </div>
          )}

          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-white z-40 bg-black/20 rounded-full p-2 hover:bg-rose-500 transition-colors"
            onClick={closeModal}
          >
            ✕
          </button>

          {/* Mute toggle */}
          <button
            className="absolute bottom-16 right-4 text-white z-40 bg-black/20 rounded-full p-2 hover:bg-rose-500 transition-colors flex items-center justify-center"
            onClick={() => setMuted(!muted)}
          >
            {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>

          {/* Video container */}
          <div
            ref={scrollContainerRef}
            className="h-[70vh] w-[90%] sm:h-[75vh] sm:w-[70%] md:h-[80vh] md:w-[50vw] lg:w-[40vw] 
                       overflow-y-scroll snap-y snap-mandatory rounded-2xl mx-auto relative z-20"
          >
            {reels.map((reel, i) => (
              <div
                key={reel.id}
                className="h-[70vh] sm:h-[75vh] md:h-[80vh] w-full flex flex-col justify-end snap-start relative"
              >
                <video
                  ref={(el) => (videoRefs.current[i] = el)}
                  data-id={reel.id}
                  src={reel.video}
                  className="h-full w-full object-cover rounded-2xl"
                  loop
                  muted={muted}
                  playsInline
                  autoPlay
                  onLoadedData={() => setLoading(false)} // hide loader
                />
                {/* Title overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white drop-shadow-lg">
                  <h3 className="text-xl sm:text-2xl md:text-2xl font-semibold">{reel.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default ReelsSection;
