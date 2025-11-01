// "use client";
// import React, { useState, useRef, useEffect, useCallback } from "react";
// import { PlayCircle, Volume2, VolumeX } from "lucide-react";
// import { getReels, trackReelsViews } from '../lib/authService'; // Adjust import path as needed
// import Image from "next/image";

// const ReelsSection = () => {
//   const [activeReel, setActiveReel] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [muted, setMuted] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [reels, setReels] = useState([]);
//   const [apiLoading, setApiLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 10,
//     total: 0,
//     totalPages: 0
//   });
//   const [trackedReels, setTrackedReels] = useState(new Set());
//   const videoRefs = useRef([]);
//   const scrollContainerRef = useRef(null);
//   const observerRef = useRef(null);

//   // Fetch reels from API
//   const fetchReels = async (page = 1, limit = 10) => {
//     try {
//       setApiLoading(true);
//       setError(null);
      
//       const response = await getReels(page, limit);
      
//       if (response.success) {
//         setReels(response.data || []);
//         setPagination(prev => ({
//           ...prev,
//           page: response.data?.meta?.page || page,
//           limit: response.data?.meta?.limit || limit,
//           total: response.data?.meta?.total || 0,
//           totalPages: response.data?.meta?.totalPages || 0
//         }));
//       } else {
//         setError(response.message || 'Failed to fetch reels');
//       }
//     } catch (err) {
//       setError('An error occurred while fetching reels');
//       console.error('Error fetching reels:', err);
//     } finally {
//       setApiLoading(false);
//     }
//   };

//   // Track reel view - SIMPLIFIED VERSION
//   const trackView = useCallback(async (reelId) => {
//     console.log("🎯 Attempting to track view for reel:", reelId);
    
//     // Check if we've already tracked this reel view in current session
//     if (trackedReels.has(reelId)) {
//       console.log("📝 Reel already tracked, skipping:", reelId);
//       return;
//     }

//     try {
//       console.log("🚀 Calling trackReelsViews API for:", reelId);
//       const response = await trackReelsViews(reelId);
//       if (response.success) {
//         console.log(`✅ View tracked successfully for reel: ${reelId}`);
//         // Add to tracked reels set to avoid duplicate tracking
//         setTrackedReels(prev => new Set(prev).add(reelId));
        
//         // Update local view count for immediate UI feedback
//         setReels(prev => prev.map(reel => 
//           reel._id === reelId 
//             ? { ...reel, viewCount: (reel.viewCount || 0) + 1 }
//             : reel
//         ));
//       } else {
//         console.warn(`⚠️ Failed to track view for reel: ${reelId}`, response.message);
//       }
//     } catch (error) {
//       console.error('❌ Error tracking reel view:', error);
//     }
//   }, [trackedReels]);

//   useEffect(() => {
//     fetchReels();
//   }, []);

//   // Setup Intersection Observer when modal opens
//   useEffect(() => {
//     if (!isModalOpen || reels.length === 0) return;

//     console.log("🔍 Setting up Intersection Observer");

//     // Cleanup previous observer
//     if (observerRef.current) {
//       observerRef.current.disconnect();
//     }

//     const options = {
//       root: scrollContainerRef.current,
//       rootMargin: '0px',
//       threshold: 0.7 // Trigger when 70% of video is visible
//     };

//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach(entry => {
//         const video = entry.target;
//         const reelId = video.dataset.id;
        
//         console.log("👀 Intersection observed:", reelId, entry.isIntersecting);

//         if (entry.isIntersecting) {
//           // Play video when it comes into view
//           video.play().catch((e) => console.log("Video play error:", e));
//           setActiveReel(reelId);
          
//           // Track view when reel becomes visible
//           if (reelId) {
//             console.log("🎥 Reel became visible, tracking view:", reelId);
//             trackView(reelId);
//           }
//         } else {
//           // Pause video when it goes out of view
//           video.pause();
//         }
//       });
//     }, options);

//     observerRef.current = observer;

//     // Observe all video elements
//     videoRefs.current.forEach((video) => {
//       if (video) {
//         console.log("👁️ Observing video:", video.dataset.id);
//         observer.observe(video);
//       }
//     });

//     return () => {
//       console.log("🧹 Cleaning up Intersection Observer");
//       if (observerRef.current) {
//         observerRef.current.disconnect();
//       }
//     };
//   }, [isModalOpen, reels, trackView]);

//   // Track view when modal opens with a specific reel
//   const openModal = async (reelId) => {
//     console.log("🎬 Opening modal for reel:", reelId);
//     setActiveReel(reelId);
//     setIsModalOpen(true);
//     setLoading(true);

//     // Track view for the initially opened reel immediately
//     if (reelId) {
//       console.log("📱 Initial reel open, tracking view:", reelId);
//       await trackView(reelId);
//     }

//     // Scroll to clicked reel after a brief delay
//     setTimeout(() => {
//       if (scrollContainerRef.current) {
//         const index = reels.findIndex((r) => r._id === reelId);
//         console.log("🔍 Scrolling to reel index:", index);
//         const reelElement = scrollContainerRef.current.children[index];
//         if (reelElement) {
//           reelElement.scrollIntoView({ 
//             behavior: "smooth",
//             block: "center"
//           });
//         }
//       }
//     }, 100);
//   };

//   const closeModal = () => {
//     console.log("🗑️ Closing modal");
//     setIsModalOpen(false);
//     setActiveReel(null);
//     setMuted(true);
//     setLoading(false);
    
//     // Pause all videos when modal closes
//     videoRefs.current.forEach((video) => {
//       if (video) {
//         video.pause();
//         video.currentTime = 0;
//       }
//     });

//     // Cleanup observer
//     if (observerRef.current) {
//       observerRef.current.disconnect();
//       observerRef.current = null;
//     }
//   };

//   // Manual tracking for testing - track when video starts playing
//   const handleVideoPlay = (reelId) => {
//     console.log("▶️ Video play detected for reel:", reelId);
//     if (reelId && !trackedReels.has(reelId)) {
//       trackView(reelId);
//     }
//   };

//   const loadMoreReels = async () => {
//     if (pagination.page < pagination.totalPages) {
//       try {
//         const response = await getReels(pagination.page + 1, pagination.limit);
//         if (response.success) {
//           setReels(prev => [...prev, ...(response.data || [])]);
//           setPagination(prev => ({
//             ...prev,
//             page: response.data?.meta?.page || pagination.page + 1,
//             total: response.data?.meta?.total || 0,
//             totalPages: response.data?.meta?.totalPages || 0
//           }));
//         }
//       } catch (err) {
//         console.error('Error loading more reels:', err);
//       }
//     }
//   };

//   // Loading state
//   if (apiLoading && reels.length === 0) {
//     return (
//       <section className="py-16 bg-gradient-to-b from-stone-50 to-rose-50/30">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-5xl lg:text-6xl font-serif font-light text-gray-900 mb-4 leading-tight">
//               Trending Reels
//               <span className="text-amber-600 block font-normal text-3xl mt-2">
//                 Quick Glimpses of Campus & Fashion
//               </span>
//             </h2>
//           </div>
//           <div className="flex justify-center items-center py-12">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   // Error state
//   if (error && reels.length === 0) {
//     return (
//       <section className="py-16 bg-gradient-to-b from-stone-50 to-rose-50/30">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-5xl lg:text-6xl font-serif font-light text-gray-900 mb-4 leading-tight">
//               Trending Reels
//             </h2>
//           </div>
//           <div className="flex justify-center items-center py-12">
//             <div className="text-center">
//               <p className="text-red-600 text-lg mb-4">{error}</p>
//               <button
//                 onClick={() => fetchReels()}
//                 className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors"
//               >
//                 Try Again
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="py-16 bg-gradient-to-b from-stone-50 to-rose-50/30">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Heading */}
//         <div className="text-center mb-12">
//           <h2 className="text-5xl lg:text-6xl font-serif font-light text-gray-900 mb-4 leading-tight">
//             Trending Reels
//             <span className="text-amber-600 block font-normal text-3xl mt-2">
//               Quick Glimpses of Campus & Fashion
//             </span>
//           </h2>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
//             Explore our latest reels and short videos from campus, events, and student life.
//           </p>
//         </div>

//         {/* API Loading indicator */}
//         {apiLoading && (
//           <div className="flex justify-center mb-4">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
//           </div>
//         )}

//         {/* Thumbnails */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
//           {reels.map((reel) => (
//             <div
//               key={reel._id}
//               className="group relative rounded-2xl overflow-hidden shadow-xl bg-white transition-transform duration-300 hover:-translate-y-2 hover:shadow-amber-200/40 cursor-pointer"
//               onClick={() => openModal(reel._id)}
//             >
//               <Image
//                 width={400}
//                 height={600}
//                 src={reel.thumbnailUrl}
//                 alt={reel.title}
//                 className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
//               <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
//                 <span className="text-white text-lg font-semibold drop-shadow-lg line-clamp-1">
//                   {reel.title}
//                 </span>
//                 <button
//                   className="bg-amber-600 rounded-full p-2 shadow-lg hover:bg-rose-500 transition-colors"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     openModal(reel._id);
//                   }}
//                 >
//                   <PlayCircle size={28} className="text-white" />
//                 </button>
//               </div>
              
//               {/* View count badge */}
//               {reel.viewCount > 0 && (
//                 <div className="absolute top-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
//                   👁️ {reel.viewCount.toLocaleString()} views
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Load More Button */}
//         {pagination.page < pagination.totalPages && (
//           <div className="text-center mt-12">
//             <button
//               onClick={loadMoreReels}
//               disabled={apiLoading}
//               className="bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {apiLoading ? 'Loading...' : 'Load More Reels'}
//             </button>
//           </div>
//         )}

//         {/* Empty State */}
//         {reels.length === 0 && !apiLoading && (
//           <div className="text-center py-12">
//             <p className="text-gray-500 text-lg">No reels found.</p>
//           </div>
//         )}
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto">
//           {/* Blurred background */}
//           <div
//             className="absolute inset-0 bg-white/20 backdrop-blur-sm"
//             onClick={closeModal}
//           ></div>

//           {/* Loader */}
//           {loading && (
//             <div className="absolute inset-0 z-30 flex items-center justify-center bg-white/30 backdrop-blur-sm">
//               <div className="flex flex-col items-center">
//                 <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-amber-500 border-solid"></div>
//                 <p className="mt-4 text-white text-lg font-semibold drop-shadow-lg">Loading Reels...</p>
//               </div>
//             </div>
//           )}

//           {/* Close button */}
//           <button
//             className="absolute top-4 right-4 text-white z-40 bg-black/20 rounded-full p-2 hover:bg-rose-500 transition-colors"
//             onClick={closeModal}
//           >
//             ✕
//           </button>

//           {/* Mute toggle */}
//           <button
//             className="absolute bottom-16 right-4 text-white z-40 bg-black/20 rounded-full p-2 hover:bg-rose-500 transition-colors flex items-center justify-center"
//             onClick={() => setMuted(!muted)}
//           >
//             {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
//           </button>

//           {/* Video container */}
//           <div
//             ref={scrollContainerRef}
//             className="h-[70vh] w-[90%] sm:h-[75vh] sm:w-[70%] md:h-[80vh] md:w-[50vw] lg:w-[40vw] 
//                        overflow-y-scroll snap-y snap-mandatory rounded-2xl mx-auto relative z-20 scrollbar-hide"
//           >
//             {reels.map((reel, i) => (
//               <div
//                 key={reel._id}
//                 className="h-[70vh] sm:h-[75vh] md:h-[80vh] w-full flex flex-col justify-end snap-start relative"
//               >
//                 <video
//                   ref={(el) => {
//                     videoRefs.current[i] = el;
//                     console.log("📹 Video ref set for:", reel._id, "at index:", i);
//                   }}
//                   data-id={reel._id}
//                   src={reel.videoUrl}
//                   className="h-full w-full object-cover rounded-2xl"
//                   loop
//                   muted={muted}
//                   playsInline
//                   autoPlay
//                   onLoadedData={() => {
//                     console.log("✅ Video loaded:", reel._id);
//                     setLoading(false);
//                   }}
//                   onPlay={() => handleVideoPlay(reel._id)}
//                   onError={(e) => console.error("❌ Video error:", reel._id, e)}
//                 />
//                 {/* Title overlay */}
//                 <div className="absolute bottom-4 left-4 right-4 text-white drop-shadow-lg">
//                   <h3 className="text-xl sm:text-2xl md:text-2xl font-semibold">{reel.title}</h3>
//                   {reel.description && (
//                     <p className="text-sm mt-1 opacity-90">{reel.description}</p>
//                   )}
//                   {/* View count in modal */}
//                   <p className="text-xs mt-1 opacity-80">
//                     {((reel.viewCount || 0) + (trackedReels.has(reel._id) ? 1 : 0)).toLocaleString()} views
//                   </p>
//                 </div>
//               </div>
//             ))}
            
//             {/* Load more in modal */}
//             {pagination.page < pagination.totalPages && (
//               <div className="h-[70vh] sm:h-[75vh] md:h-[80vh] w-full flex items-center justify-center snap-start">
//                 <button
//                   onClick={loadMoreReels}
//                   disabled={apiLoading}
//                   className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50"
//                 >
//                   {apiLoading ? 'Loading...' : 'Load More Reels'}
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default ReelsSection;
