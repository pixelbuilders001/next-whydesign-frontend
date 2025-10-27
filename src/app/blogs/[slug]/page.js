"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getBlogById } from "@/lib/authService";
import Image from "next/image";

export default function BlogPost() {
  const { slug } = useParams(); // dynamic param (actually your blog.id)
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await getBlogById(slug); // API call using id

        if (response.success && response.data) {
          setBlog(response.data);
          setError(null);
        } else {
          setError(response.message || "Failed to fetch blog");
          setBlog(null);
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("An error occurred while fetching the blog");
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchBlog();
  }, [slug]);

  // 🌀 Loading UI
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
        <Header />
        <main className="pt-10 flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
        </main>
        <Footer />
      </div>
    );
  }

  // ❌ Error / Not found
  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
        <Header />
        <main className="pt-10 text-center py-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Blog not found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link href="/blogs" className="text-amber-600 hover:text-amber-700">
            Go back to Blogs
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // 🧠 Transform API data for consistency
  const transformedBlog = {
    id: blog._id || blog.id,
    title: blog.title,
    image: blog.featuredImage,
    date: blog.publishedAt || blog.createdAt,
    author:
      blog.authorId?.fullName ||
      `${blog.authorId?.firstName || ""} ${blog.authorId?.lastName || ""}`.trim() ||
      "Unknown Author",
    content: blog.content,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
      <Header />
      <main className="pt-10">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Back Link */}
          <div className="mb-8">
            <Link
              href="/blogs"
              className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium"
            >
              <svg
                className="mr-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Blogs
            </Link>
          </div>

          {/* Hero Image */}
          {transformedBlog.image && (
            <div className="aspect-video overflow-hidden rounded-2xl mb-8">
                <Image
                        width={400}
                        height={256}
                        src={transformedBlog.image}
                        alt={transformedBlog.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
            </div>
          )}

          {/* Title & Meta */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {transformedBlog.title}
            </h1>
            <div className="flex items-center text-gray-600 mb-6">
              <span className="font-medium">{transformedBlog.author}</span>
              <span className="mx-2">•</span>
              <time dateTime={transformedBlog.date}>
                {new Date(transformedBlog.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </header>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900"
            dangerouslySetInnerHTML={{ __html: transformedBlog.content }}
          />
        </article>
      </main>
      <Footer />
    </div>
  );
}
