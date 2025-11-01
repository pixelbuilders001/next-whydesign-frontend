"use client";
import React, { useState, useEffect } from "react";
import { Download, Star, BookOpen, Users, Globe, GraduationCap } from "lucide-react";
import Image from "next/image";
import { getMaterials, trackMaterialDownload } from "@/lib/authService";

const PDFDownloadSection = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await getMaterials(1, 10);
        if (response.success) setMaterials(response.data);
        else setError(response.message || "Failed to fetch materials");
      } catch (err) {
        setError("An error occurred while fetching materials");
      } finally {
        setLoading(false);
      }
    };
    fetchMaterials();
  }, []);

  const handleDownload = async (materialType) => {
    console.log(materialType);
    const material =
      materials.find((m) =>
        m.category === materialType
      ) ;

    if (material?.fileUrl) {
      try {
        const response = await fetch(material.fileUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download =
          materialType === "career"
            ? "fashion-career-guide.pdf"
            : "fashion-study-abroad-guide.pdf";
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        await trackMaterialDownload(material.id);
      } catch (error) {
        console.error(error);
        window.open(material.fileUrl, "_blank");
      }
    }
  };

  const guides = [
    {
      id: "career_guide",
      title: "Fashion Career Guide",
      subtitle: "Your roadmap to success",
      description:
        "Master portfolio building, insider tips, and global fashion industry insights.",
      icon: GraduationCap,
      color: "from-amber-400 to-pink-500",
      image:
        "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      stats: {
        pages: "50 pages",
        rating: "4.9/5",
        downloads: "10,000+",
      },
    },
    {
      id: "study_abroad",
      title: "Study Abroad Guide",
      subtitle: "Global fashion education insights",
      description:
        "Discover top schools, scholarships, and visa guidance for your dream journey.",
      icon: Globe,
      color: "from-blue-400 to-indigo-500",
      image:
        "https://images.pexels.com/photos/7972563/pexels-photo-7972563.jpeg",
      stats: {
        pages: "65 pages",
        rating: "4.8/5",
        downloads: "8,500+",
      },
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-stone-100">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl font-serif font-light text-gray-900 mb-4">
            Fashion Knowledge
            <span className="text-amber-600 block font-normal text-3xl mt-2">
              Guides & Insights
            </span>
          </h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Download beautifully designed free PDFs to boost your career and study abroad plans.
          </p>
        </div>

        {error && (
          <p className="text-center text-red-500 bg-red-50 rounded-lg py-3 mb-6">
            {error}
          </p>
        )}

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {guides.map((guide) => {
            const Icon = guide.icon;
            return (
              <article
                key={guide.id}
                className="relative overflow-hidden rounded-3xl group bg-white/80 backdrop-blur-lg border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${guide.color} opacity-0 group-hover:opacity-10 transition-all duration-500 pointer-events-none`}
                  aria-hidden="true"
                />

                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={guide.image}
                    alt={`Cover image for ${guide.title} - ${guide.description}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" aria-hidden="true" />
                  <div className="absolute bottom-4 left-4 text-white flex items-center space-x-2">
                    <Icon size={22} className="opacity-90" aria-hidden="true" />
                    <h3 className="text-xl font-semibold">{guide.title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-5">
                  <p className="text-gray-600 font-light">{guide.description}</p>

                  <div className="flex items-center justify-between text-gray-500 text-sm mt-4">
                    <div className="flex items-center space-x-1">
                      <BookOpen size={16} aria-hidden="true" /> 
                      <span>{guide.stats.pages}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="text-amber-400 fill-current" size={16} aria-hidden="true" />
                      <span>{guide.stats.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users size={16} aria-hidden="true" /> 
                      <span>{guide.stats.downloads}</span>
                    </div>
                  </div>

                  {/* Button */}
                  <button
                    onClick={() => handleDownload(guide.id)}
                    aria-label={`Download ${guide.title} - ${guide.description}`}
                    className={`cursor-pointer group w-full mt-6 py-4 bg-gradient-to-r ${guide.color} text-white
                     rounded-2xl font-medium tracking-wide transition-all duration-300 hover:shadow-xl 
                     hover:scale-[1.02] flex items-center justify-center space-x-3 focus:outline-none focus:ring-4 focus:ring-amber-300 focus:ring-opacity-50`}
                  >
                    <Download
                      size={20}
                      className={`${
                        loading ? "animate-spin" : "group-hover:translate-y-1"
                      } transition-transform`}
                      aria-hidden="true"
                    />
                    <span>{loading ? "Preparing..." : "Download Free Guide"}</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom note */}
        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm">
            ✓ Instant access • ✓ No spam • ✓ Trusted by 15,000+ learners
          </p>
        </div>
      </div>
    </section>
  );
};

export default PDFDownloadSection;