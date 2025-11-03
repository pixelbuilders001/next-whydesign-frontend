"use client";
import React, { useState, useRef, useEffect } from "react";
import { Play, ArrowLeft, ArrowRight, X, Mail } from "lucide-react";
import { videos } from "../../data/videos";
import { getVideos, trackVideosViews } from "@/lib/authService";
import FormModal from "./FormModal";
import Image from "next/image";
import PosterWithFormModal from "./PosterWithFormModal";

const VideoSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [posterLoading, setPosterLoading] = useState(false);
  const videoRef = useRef(null);
  const [openModalContactModal, setOpenContactModal] = useState(false);

  const [videos, setVideos] = useState([]);
  const [apiLoading, setApiLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  // Calculate visible videos based on current index and screen size
  const getVideosPerPage = () => {
    if (typeof window === 'undefined') return 3;
    
    const width = window.innerWidth;
    if (width < 768) return 1; // Mobile: 1 card
    if (width < 1024) return 2; // Tablet: 2 cards
    return 3; // Desktop: 3 cards
  };

  const [videosPerPage, setVideosPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setVideosPerPage(getVideosPerPage());
      // Reset to first page when screen size changes
      setCurrentIndex(0);
    };

    // Set initial value
    setVideosPerPage(getVideosPerPage());

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.ceil(videos.length / videosPerPage);
  const startIndex = currentIndex * videosPerPage;
  const visibleVideos = videos.slice(startIndex, startIndex + videosPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const openModal = async (video) => {
    setActiveVideo(video);
    setIsModalOpen(true);
    setLoading(true);

    try {
      await trackVideosViews(video.id);
      console.log(`✅ Video view tracked for video: ${video.title}`);
      setVideos(prevVideos => 
        prevVideos.map(v => 
          v.id === video.id ? { ...v, viewCount: v.viewCount + 1 } : v
        )
      );
    } catch (error) {
      console.error('❌ Failed to track video view:', error);
    }
    
    if (!video.posterUrl) {
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch(() => setLoading(false));
        }
      }, 100);
    } else {
      setLoading(false);
    }
  };

  const openPosterModal = (video) => {
    setActiveVideo(video);
    setIsPosterModalOpen(true);
    setPosterLoading(true);
  };

  const closeModal = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsModalOpen(false);
    setActiveVideo(null);
    setLoading(false);
  };

  const closePosterModal = () => {
    setIsPosterModalOpen(false);
    setActiveVideo(null);
    setPosterLoading(false);
  };

  const handleVideoLoad = () => {
    setLoading(false);
  };

  const handlePosterLoad = () => {
    setPosterLoading(false);
  };

  const handlePosterError = () => {
    setPosterLoading(false);
    console.error('Failed to load poster image');
  };

  const handleContactNow = () => {
    setOpenContactModal(true)
    closePosterModal();
  };

  const handleWatchVideo = () => {
    if (activeVideo) {
      closePosterModal();
      openModal(activeVideo);
    }
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
      aria-labelledby="videos-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-20">
          <h2 id="videos-heading" className="text-5xl lg:text-6xl font-serif font-light text-gray-900 mb-8 leading-tight">
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
          {/* Show loading state */}
          {apiLoading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-amber-500 border-solid"></div>
            </div>
          )}

          {/* Show error state */}
          {error && !apiLoading && (
            <div className="text-center py-20">
              <p className="text-red-500 text-lg mb-4">Error: {error}</p>
              <button 
                onClick={() => fetchVideos()} 
                className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Show videos when loaded */}
          {!apiLoading && !error && (
            <>
              {/* Mobile View - Single Card with Horizontal Scroll */}
              <div className="block md:hidden">
                <div className="relative py-1">
                  <div className="overflow-hidden">
                    <div 
                      className="flex transition-transform duration-300 ease-in-out"
                      style={{ 
                        transform: `translateX(-${currentIndex * 100}%)` 
                      }}
                    >
                      {videos.map((video, index) => (
                        <div 
                          key={video.id}
                          className="w-full flex-shrink-0 px-2"
                        >
                          <article
                            className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-stone-100 cursor-pointer"
                          >
                            <div 
                              onClick={() => openModal(video)} 
                              className="relative overflow-hidden"
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  openModal(video);
                                }
                              }}
                              aria-label={`Watch video: ${video.title} - ${video.description}`}
                            >
                              <Image
                                width={400}
                                height={600}
                                src={video.thumbnailUrl}
                                alt={`Thumbnail for video: ${video.title}`}
                                className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" aria-hidden="true" />

                              {/* Play Button */}
                              <div className="absolute inset-0 flex items-center justify-center">
                                <button 
                                  className="bg-white/95 hover:bg-white text-gray-900 rounded-full p-5 transform group-hover:scale-110 transition-all duration-300 shadow-xl backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-amber-300 focus:ring-opacity-50"
                                  aria-label={`Play video: ${video.title}`}
                                >
                                  <Play className="ml-1" size={28} fill="currentColor" aria-hidden="true" />
                                </button>
                              </div>

                              {/* Duration Badge */}
                              <div className="absolute bottom-4 right-4 bg-black/80 text-white px-3 py-1.5 rounded-full text-sm font-medium">
                                {video.duration}
                              </div>
                            </div>

                            <div className="p-6">
                              <div className="flex items-center gap-2 justify-between mb-3">
                                <span className="inline-block bg-amber-100 text-amber-800 px-3 py-1.5 rounded-full text-xs font-medium">
                                  {video.category}
                                </span>

                                {video.tags && video.tags.length > 0 && (
                                  <div className="flex items-center gap-1">
                                    {video.tags.slice(0, 2).map((tag, tagIndex) => (
                                      <span
                                        key={tagIndex}
                                        className="inline-block bg-stone-100 text-stone-700 px-2 py-1 rounded-full text-xs font-light border border-stone-200"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                    {video.tags.length > 2 && (
                                      <span className="text-xs text-stone-500 font-light">
                                        +{video.tags.length - 2}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                          
                              <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-amber-700 transition-colors duration-300">
                                {video.title}
                              </h3>
                              <p className="text-gray-600 text-sm line-clamp-3 font-light leading-relaxed mb-4">
                                {video.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-stone-500 text-sm font-light">
                                  {video.viewCount} views
                                </span>
                                <button
                                  onClick={() => openPosterModal(video)}
                                  aria-label={`View details for ${video.title}`}
                                  className="text-amber-600 text-sm font-medium group-hover:translate-x-1 transform transition-transform duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-opacity-50 rounded"
                                >
                                  View details →
                                </button>
                              </div>
                            </div>
                          </article>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop/Tablet View - Grid Layout */}
              <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {visibleVideos.map((video, index) => (
                  <article
                    key={video.id}
                    className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-stone-100 cursor-pointer"
                  >
                    <div 
                      onClick={() => openModal(video)} 
                      className="relative overflow-hidden"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          openModal(video);
                        }
                      }}
                      aria-label={`Watch video: ${video.title} - ${video.description}`}
                    >
                      <Image
                        width={400}
                        height={600}
                        src={video.thumbnailUrl}
                        alt={`Thumbnail for video: ${video.title}`}
                        className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" aria-hidden="true" />

                      {/* Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button 
                          className="bg-white/95 hover:bg-white text-gray-900 rounded-full p-5 transform group-hover:scale-110 transition-all duration-300 shadow-xl backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-amber-300 focus:ring-opacity-50"
                          aria-label={`Play video: ${video.title}`}
                        >
                          <Play className="ml-1" size={28} fill="currentColor" aria-hidden="true" />
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
                        <button
                          onClick={() => openPosterModal(video)}
                          aria-label={`View details for ${video.title}`}
                          className="text-amber-600 text-sm font-medium group-hover:translate-x-1 transform transition-transform duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-opacity-50 rounded"
                        >
                          View details →
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Navigation - Only show if there are more videos than current view */}
              {videos.length > videosPerPage && (
                <div className="flex items-center justify-center space-x-6 mt-8">
                  <button
                    onClick={prevSlide}
                    disabled={currentIndex === 0}
                    aria-label="Previous videos"
                    className={`p-4 bg-white border border-stone-200 rounded-full transition-all duration-200 transform focus:outline-none focus:ring-4 focus:ring-amber-300 focus:ring-opacity-50 ${
                      currentIndex === 0 
                        ? "opacity-50 cursor-not-allowed" 
                        : "hover:bg-amber-50 hover:border-amber-300 hover:shadow-lg hover:scale-110"
                    }`}
                  >
                    <ArrowLeft size={20} className="text-gray-600" aria-hidden="true" />
                  </button>

                  <div className="flex space-x-3" aria-label="Video pagination">
                    {Array.from({ length: totalSlides }).map(
                      (_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentIndex(index)}
                          aria-label={`Go to page ${index + 1}`}
                          aria-current={index === currentIndex ? 'page' : undefined}
                          className={`w-3 h-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
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
                    disabled={currentIndex === totalSlides - 1}
                    aria-label="Next videos"
                    className={`p-4 bg-white border border-stone-200 rounded-full transition-all duration-200 transform focus:outline-none focus:ring-4 focus:ring-amber-300 focus:ring-opacity-50 ${
                      currentIndex === totalSlides - 1
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-amber-50 hover:border-amber-300 hover:shadow-lg hover:scale-110"
                    }`}
                  >
                    <ArrowRight size={20} className="text-gray-600" aria-hidden="true" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Video Modal */}
      {isModalOpen && activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
            aria-hidden="true"
          />

          {/* Loader */}
          {loading && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-white/30 backdrop-blur-sm">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-amber-500 border-solid" aria-hidden="true"></div>
                <p className="mt-4 text-white text-lg font-semibold drop-shadow-lg">Loading Video...</p>
              </div>
            </div>
          )}

          {/* Close button */}
          <button
            onClick={closeModal}
            aria-label="Close video modal"
            className="absolute top-6 right-6 bg-white/80 hover:bg-white text-gray-900 rounded-full p-2 shadow-lg z-10 focus:outline-none focus:ring-4 focus:ring-amber-300 focus:ring-opacity-50"
          >
            <X size={22} aria-hidden="true" />
          </button>

          {/* Video player with poster and CTA */}
          <div className="relative z-20 w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] rounded-2xl overflow-hidden shadow-2xl bg-white">
            {/* Video player */}
            <div>
              <video
                ref={videoRef}
                src={activeVideo.videoUrl}
                controls
                autoPlay
                className="w-full h-auto rounded-t-2xl"
                onLoadedData={handleVideoLoad}
                aria-label={`Video: ${activeVideo.title}`}
              />
            </div>

            {/* Video info and CTA */}
            <div className="p-4 bg-white">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {activeVideo.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {activeVideo.description}
                </p>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                <span>{activeVideo.viewCount} views</span>
                <span aria-hidden="true">•</span>
                <span>{activeVideo.duration}</span>
                {activeVideo.category && (
                  <>
                    <span aria-hidden="true">•</span>
                    <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs">
                      {activeVideo.category}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Poster Modal */}
      {isPosterModalOpen && activeVideo && activeVideo.posterUrl && (
        <PosterWithFormModal
          isOpen={isPosterModalOpen}
          onClose={closePosterModal}
          posterUrl={activeVideo?.posterUrl}
          title={activeVideo?.title}
          description={activeVideo?.description}
          category={activeVideo?.category}
          duration={activeVideo?.duration}
        />
      )}
    </section>
  );
};

export default VideoSection;