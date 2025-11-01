"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { PlayCircle, Volume2, VolumeX, Heart, MessageCircle, Share, Bookmark } from "lucide-react";
import { getReels, trackReelsViews, trackReelsLikes, trackReelsUnlikes } from "@/lib/authService";
import Image from "next/image";

const ReelsSection = () => {
  const [activeReel, setActiveReel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [muted, setMuted] = useState(true);
  const [loading, setLoading] = useState(false);
  const [reels, setReels] = useState([]);
  const [apiLoading, setApiLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });
  
  const trackedReelsRef = useRef(new Set());
  const videoRefs = useRef([]);
  const scrollContainerRef = useRef(null);
  const observerRef = useRef(null);

  // Fetch reels from API
  const fetchReels = async (page = 1, limit = 10) => {
    try {
      setApiLoading(true);
      setError(null);
      
      const response = await getReels(page, limit);
      
      if (response.success) {
        setReels(response.data.reels || []);
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

  // Track reel view
  const trackView = useCallback(async (reelId) => {
    if (trackedReelsRef.current.has(reelId)) return;

    try {
      const response = await trackReelsViews(reelId);
      if (response.success) {
        trackedReelsRef.current.add(reelId);
        setReels(prev => prev.map(reel => 
          reel.id === reelId 
            ? { ...reel, viewCount: (reel.viewCount || 0) + 1 }
            : reel
        ));
      }
    } catch (error) {
      console.error('Error tracking reel view:', error);
    }
  }, []);

  // Track Like API
  const trackLike = useCallback(async (reelId) => {
    try {
      console.log("🚀 Calling trackReelsLikes API for:", reelId);
      const response = await trackReelsLikes(reelId);
      if (response.success) {
        console.log(`✅ Like tracked successfully for reel: ${reelId}`);
        setReels(prev => prev.map(reel => 
          reel.id === reelId 
            ? { ...reel, likeCount: (reel.likeCount || 0) + 1, isLiked: true }
            : reel
        ));
      } else {
        console.warn(`⚠️ Failed to track like for reel: ${reelId}`, response.message);
      }
    } catch (error) {
      console.error('❌ Error tracking reel like:', error);
    }
  }, []);

  // Track Unlike API
  const trackUnlike = useCallback(async (reelId) => {
    try {
      console.log("🚀 Calling trackReelsUnlikes API for:", reelId);
      const response = await trackReelsUnlikes(reelId);
      if (response.success) {
        console.log(`✅ Unlike tracked successfully for reel: ${reelId}`);
        setReels(prev => prev.map(reel => 
          reel.id === reelId 
            ? { ...reel, likeCount: Math.max(0, (reel.likeCount || 1) - 1), isLiked: false }
            : reel
        ));
      } else {
        console.warn(`⚠️ Failed to track unlike for reel: ${reelId}`, response.message);
      }
    } catch (error) {
      console.error('❌ Error tracking reel unlike:', error);
    }
  }, []);

  // Handle toggle
  const handleLikeToggle = useCallback(async (reelId, isCurrentlyLiked) => {
    if (isCurrentlyLiked) {
      await trackUnlike(reelId);
    } else {
      await trackLike(reelId);
    }
  }, [trackLike, trackUnlike]);

  useEffect(() => {
    fetchReels();
  }, []);

  // Intersection observer for autoplay
  useEffect(() => {
    if (!isModalOpen || reels.length === 0) return;

    if (observerRef.current) observerRef.current.disconnect();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target;
        const reelId = video.dataset.id;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
          setActiveReel(reelId);
        } else {
          video.pause();
          video.currentTime = 0;
        }
      });
    }, {
      root: scrollContainerRef.current,
      threshold: 0.8
    });

    observerRef.current = observer;

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [isModalOpen, reels]);

  const openModal = async (reelId) => {
    setActiveReel(reelId);
    setIsModalOpen(true);
    setLoading(true);

    if (reelId && !trackedReelsRef.current.has(reelId)) {
      await trackView(reelId);
    }

    setTimeout(() => {
      if (scrollContainerRef.current) {
        const index = reels.findIndex((r) => r.id === reelId);
        const reelElement = scrollContainerRef.current.children[index];
        if (reelElement) {
          reelElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    }, 100);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveReel(null);
    setMuted(true);
    setLoading(false);
    videoRefs.current.forEach(v => { if (v) { v.pause(); v.currentTime = 0; } });
    if (observerRef.current) observerRef.current.disconnect();
  };

  const loadMoreReels = async () => {
    if (pagination.page < pagination.totalPages) {
      try {
        const response = await getReels(pagination.page + 1, pagination.limit);
        if (response.success) {
          setReels(prev => [...prev, ...(response.data.reels || [])]);
          setPagination({
            ...pagination,
            page: response.data?.meta?.page || pagination.page + 1,
            total: response.data?.meta?.total || 0,
            totalPages: response.data?.meta?.totalPages || 0
          });
        }
      } catch (err) {
        console.error('Error loading more reels:', err);
      }
    }
  };

  // Cleanup tracked sets
  useEffect(() => {
    return () => {
      trackedReelsRef.current.clear();
    };
  }, []);

  // Loading state
  if (apiLoading && reels.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-b from-stone-50 to-rose-50/30">
        <div className="flex justify-center items-center py-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600" aria-label="Loading reels"></div>
        </div>
      </section>
    );
  }

  // Error state
  if (error && reels.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-b from-stone-50 to-rose-50/30 text-center">
        <p className="text-red-600 text-lg mb-4">{error}</p>
        <button
          onClick={() => fetchReels()}
          className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors focus:outline-none focus:ring-4 focus:ring-amber-300 focus:ring-opacity-50"
        >
          Try Again
        </button>
      </section>
    );
  }

  return (
    <section 
      className="py-16 bg-gradient-to-b from-stone-50 to-rose-50/30"
      aria-labelledby="reels-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 id="reels-heading" className="text-5xl lg:text-6xl font-serif font-light text-gray-900 mb-4">
            Trending Reels
            <span className="text-amber-600 block font-normal text-3xl mt-2">
              Quick Glimpses of Campus & Fashion
            </span>
          </h2>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {reels.map((reel) => (
            <article
              key={reel.id}
              className="group relative rounded-2xl overflow-hidden shadow-xl bg-white transition-transform hover:-translate-y-2 hover:shadow-amber-200/40 cursor-pointer"
              role="button"
              tabIndex={0}
              onClick={() => openModal(reel.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openModal(reel.id);
                }
              }}
              aria-label={`Watch reel: ${reel.title}`}
            >
              <Image
                src={reel.thumbnailUrl}
                alt={`Thumbnail for reel: ${reel.title}`}
                width={400}
                height={256}
                className="object-cover group-hover:scale-105 transition-transform duration-300 rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" aria-hidden="true" />

              <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
                <span className="text-white text-lg font-semibold drop-shadow-lg line-clamp-1">
                  {reel.title}
                </span>
                <button
                  className="bg-amber-600 rounded-full p-2 shadow-lg hover:bg-rose-500 transition-colors focus:outline-none focus:ring-4 focus:ring-amber-300 focus:ring-opacity-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(reel.id);
                  }}
                  aria-label={`Play reel: ${reel.title}`}
                >
                  <PlayCircle size={28} className="text-white" aria-hidden="true" />
                </button>
              </div>

              {/* View count */}
              {reel.viewCount > 0 && (
                <div className="absolute top-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                  👁️ {reel.viewCount.toLocaleString()} views
                </div>
              )}

              {/* Like count */}
              {reel.likeCount > 0 && (
                <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <Heart size={12} fill="currentColor" className={reel.isLiked ? "text-red-500" : "text-white"} aria-hidden="true" />
                  {reel.likeCount.toLocaleString()}
                </div>
              )}
            </article>
          ))}
        </div>

        {/* Load More */}
        {pagination.page < pagination.totalPages && (
          <div className="text-center mt-12">
            <button
              onClick={loadMoreReels}
              disabled={apiLoading}
              aria-label={apiLoading ? "Loading more reels" : "Load more reels"}
              className="bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 focus:outline-none focus:ring-4 focus:ring-amber-300 focus:ring-opacity-50"
            >
              {apiLoading ? 'Loading...' : 'Load More Reels'}
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-white/20 backdrop-blur-sm" 
            onClick={closeModal}
            aria-hidden="true"
          ></div>

          <button
            className="absolute top-4 right-4 text-white z-40 bg-black/20 rounded-full p-2 hover:bg-rose-500 focus:outline-none focus:ring-4 focus:ring-amber-300 focus:ring-opacity-50"
            onClick={closeModal}
            aria-label="Close reels modal"
          >
            ✕
          </button>

          <button
            className="absolute bottom-16 right-4 text-white z-40 bg-black/20 rounded-full p-2 hover:bg-rose-500 focus:outline-none focus:ring-4 focus:ring-amber-300 focus:ring-opacity-50"
            onClick={() => setMuted(!muted)}
            aria-label={muted ? "Unmute video" : "Mute video"}
          >
            {muted ? <VolumeX size={24} aria-hidden="true" /> : <Volume2 size={24} aria-hidden="true" />}
          </button>

          <div
            ref={scrollContainerRef}
            className="h-[70vh] w-[90%] sm:h-[75vh] sm:w-[70%] md:h-[80vh] md:w-[50vw] lg:w-[40vw]
                       overflow-y-scroll snap-y snap-mandatory rounded-2xl mx-auto relative z-20 scrollbar-hide"
            role="region"
            aria-label="Reels gallery"
          >
            {reels.map((reel, i) => (
              <div key={reel.id} className="h-[70vh] flex flex-col justify-end snap-start relative">
                <video
                  ref={(el) => (videoRefs.current[i] = el)}
                  data-id={reel.id}
                  src={reel.videoUrl}
                  className="h-full w-full object-cover rounded-2xl"
                  loop
                  muted={muted}
                  playsInline
                  autoPlay
                  onLoadedData={() => setLoading(false)}
                  aria-label={`Video: ${reel.title}`}
                />

                <div className="absolute bottom-4 left-4 right-16 text-white drop-shadow-lg">
                  <h3 className="text-xl font-semibold">{reel.title}</h3>
                </div>

                {/* Action Buttons */}
                <div className="absolute right-4 bottom-20 flex flex-col items-center gap-6">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLikeToggle(reel.id, reel.isLiked);
                    }}
                    aria-label={reel.isLiked ? `Unlike ${reel.title}` : `Like ${reel.title}`}
                    className="flex flex-col items-center text-white hover:scale-110 transition-transform focus:outline-none focus:ring-4 focus:ring-amber-300 focus:ring-opacity-50 rounded-full p-2"
                  >
                    <Heart
                      size={28}
                      fill={reel.isLiked ? "currentColor" : "none"}
                      className={reel.isLiked ? "text-red-500" : "text-white"}
                      aria-hidden="true"
                    />
                    <span className="text-xs mt-1">{reel.likeCount?.toLocaleString() || 0}</span>
                  </button>
                  
                  <div className="flex flex-col items-center text-white">
                    <span aria-hidden="true">👁️</span>
                    <span className="text-xs">{reel.viewCount?.toLocaleString() || 0}</span>
                  </div>
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