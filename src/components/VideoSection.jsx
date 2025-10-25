"use client";
import React, { useState, useRef, useEffect } from "react";
import { Play, ArrowLeft, ArrowRight, X } from "lucide-react";
import { videos } from "../../data/videos";
import { getVideos } from "@/lib/authService";

const VideoSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const videoRef = useRef(null);

  const [activeReel, setActiveReel] = useState(null);
  const [muted, setMuted] = useState(true);
  const [videos, setVideos] = useState([]);
  const [apiLoading, setApiLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });
  
  // const trackedReelsRef = useRef(new Set());
  // const videoRefs = useRef([]);
  // const scrollContainerRef = useRef(null);
  // const observerRef = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(videos.length / 3));
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + Math.ceil(videos.length / 3)) % Math.ceil(videos.length / 3)
    );
  };

  const visibleVideos = videos.slice(
    currentIndex * 3,
    (currentIndex + 1) * 3
  );

  const openModal = (video) => {
    setActiveVideo(video);
    setIsModalOpen(true);
    setLoading(true); // Set loading to true when modal opens
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => setLoading(false)); // If play fails, hide loader
      }
    }, 100);
  };

  const closeModal = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsModalOpen(false);
    setActiveVideo(null);
    setLoading(false); // Reset loading state
  };

  const handleVideoLoad = () => {
    setLoading(false); // Hide loader when video is loaded
  };




  // Fetch reels from API
  const fetchVideos = async (page = 1, limit = 10) => {
    try {
      setApiLoading(true);
      setError(null);
      
      const response = await getVideos(page, limit);
      
      if (response.success) {
        setVideos(response.data.videos || []);
        setPagination({
          page: response.data?.meta?.page || page,
          limit: response.data?.meta?.limit || limit,
          total: response.data?.meta?.total || 0,
          totalPages: response.data?.meta?.totalPages || 0
        });
      } else {
        setError(response.message || 'Failed to fetch reels');
      }
    } catch (err) {
      setError('An error occurred while fetching reels');
      console.error('Error fetching reels:', err);
    } finally {
      setApiLoading(false);
    }
  };


  useEffect(() => {
    fetchVideos();
  }, []);


  return (
    <section
      id="videos"
      className="py-24 bg-gradient-to-b from-stone-50/30 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-serif font-light text-gray-900 mb-8 leading-tight">
            Master Fashion
            <span className="text-amber-600 block font-normal">
              Through Video
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            Learn from industry experts through our curated collection of fashion design tutorials,
            masterclasses, and behind-the-scenes content.
          </p>
        </div>

        {/* Video Cards */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {videos.map((video, index) => (
              <div
                key={video.id}
                className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-stone-100 cursor-pointer"
                onClick={() => openModal(video)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />

                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="bg-white/95 hover:bg-white text-gray-900 rounded-full p-5 transform group-hover:scale-110 transition-all duration-300 shadow-xl backdrop-blur-sm">
                      <Play className="ml-1" size={28} fill="currentColor" />
                    </button>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-4 right-4 bg-black/80 text-white px-3 py-1.5 rounded-full text-sm font-medium">
                    {video.duration}
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-2 justify-between">

                  <span className="inline-block bg-amber-100 text-amber-800 px-3 py-1.5 rounded-full text-xs font-medium mb-4">
                    {video.category}
                  </span>

                  {video.tags && video.tags.length > 0 && (
    <div className="flex items-center gap-1">
      {video.tags.slice(0, 3).map((tag, tagIndex) => (
        <span
          key={tagIndex}
          className="inline-block bg-stone-100 text-stone-700 px-2 py-1 rounded-full text-xs font-light border border-stone-200"
        >
          {tag}
        </span>
      ))}
      {video.tags.length > 3 && (
        <span className="text-xs text-stone-500 font-light">
          +{video.tags.length - 3}
        </span>
      )}
    </div>
  )}
                  </div>
              
        
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-amber-700 transition-colors duration-300">
                    {video.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 font-light leading-relaxed">
                    {video.description}
                  </p>
                  <div className="flex items-center justify-between mt-6">
                    <span className="text-stone-500 text-sm font-light">
                      {video.viewCount} views
                    </span>
                    <span className="text-amber-600 text-sm font-medium group-hover:translate-x-1 transform transition-transform duration-200">
                      Watch Now →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center space-x-6">
            <button
              onClick={prevSlide}
              className="p-4 bg-white border border-stone-200 rounded-full hover:bg-amber-50 hover:border-amber-300 hover:shadow-lg transition-all duration-200 transform hover:scale-110"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button>

            <div className="flex space-x-3">
              {Array.from({ length: Math.ceil(videos.length / 3) }).map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentIndex
                        ? "bg-amber-600 scale-125"
                        : "bg-stone-300 hover:bg-amber-300"
                    }`}
                  />
                )
              )}
            </div>

            <button
              onClick={nextSlide}
              className="p-4 bg-white border border-stone-200 rounded-full hover:bg-amber-50 hover:border-amber-300 hover:shadow-lg transition-all duration-200 transform hover:scale-110"
            >
              <ArrowRight size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Loader */}
          {loading && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-white/30 backdrop-blur-sm">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-amber-500 border-solid"></div>
                <p className="mt-4 text-white text-lg font-semibold drop-shadow-lg">Loading Video...</p>
              </div>
            </div>
          )}

          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 bg-white/80 hover:bg-white text-gray-900 rounded-full p-2 shadow-lg z-10"
          >
            <X size={22} />
          </button>

          {/* Video player */}
          <div className="relative z-20 w-[90% md:w-[60%] lg:w-[50%] rounded-2xl overflow-hidden shadow-2xl">
            <video
              ref={videoRef}
              src={activeVideo.videoUrl}
              controls
              autoPlay
              className="w-full h-auto rounded-2xl"
              onLoadedData={handleVideoLoad} // Hide loader when video loads
            />
            <div className="absolute bottom-4 left-4 text-white drop-shadow-lg">
              <h3 className="text-lg md:text-xl font-semibold">
                {activeVideo.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoSection;