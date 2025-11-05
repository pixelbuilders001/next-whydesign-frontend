"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getBlogsList } from '@/lib/authService';
import Image from "next/image";
import Head from 'next/head';


export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async (page = 1) => {
    try {
      setLoading(true);
      const response = await getBlogsList(page, 6, "createdAt", "desc");
      
      if (response.success) {
        setBlogs(response.data.data);
        setPagination({
          page: response.data.meta.page,
          limit: response.data.meta.limit,
          total: response.data.meta.total,
          totalPages: response.data.meta.totalPages
        });
      } else {
        setError(response.message || 'Failed to fetch blogs');
      }
    } catch (err) {
      setError('An error occurred while fetching blogs');
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchBlogs(newPage);
    }
  };

  // Transform API data to match your component structure
  const transformedBlogs = blogs.map(blog => ({
    id: blog.id,
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt,
    image: blog.featuredImage,
    date: blog.publishedAt,
    author: blog?.author?.name || 'Unknown Author',
    content: blog.content,
    readTime: blog.readTime
  }));

  if (loading) {
    return (
      <>
         <Head>
        <title>Blog - Fashion Design Insights & Education | Why Designers</title>
        <meta 
          name="description" 
          content="Explore our fashion design blog featuring industry insights, study abroad guidance, design education tips, and career advice for aspiring designers." 
        />
        <meta 
          name="keywords" 
          content="fashion design blog, design education, study abroad, fashion trends, design career, fashion tips, design inspiration" 
        />
        
        {/* Open Graph */}
        <meta property="og:title" content="Blog - Fashion Design Insights & Education | Why Designers" />
        <meta 
          property="og:description" 
          content="Explore our fashion design blog featuring industry insights, study abroad guidance, design education tips, and career advice for aspiring designers." 
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://whydesigners.com/blogs" />
        <meta property="og:image" content="https://whydesigners.com/og-blog-image.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog - Fashion Design Insights & Education | Why Designers" />
        <meta 
          name="twitter:description" 
          content="Explore our fashion design blog featuring industry insights, study abroad guidance, design education tips, and career advice for aspiring designers." 
        />
        <meta name="twitter:image" content="https://whydesigners.com/twitter-blog-image.jpg" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://whydesigners.com/blogs" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
        <Header />
        <main className="pt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="aspect-video bg-gray-200"></div>
                    <div className="p-6">
                      <div className="h-4 bg-gray-200 rounded mb-3"></div>
                      <div className="h-6 bg-gray-200 rounded mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
      </>
    
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
        <Header />
        <main className="pt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="bg-red-50 border border-red-200 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-red-800 mb-4">Error</h2>
                <p className="text-red-600">{error}</p>
                <button
                  onClick={() => fetchBlogs(1)}
                  className="mt-4 px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
      <Header />
      <main className="pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              <span className="font-serif font-light">Our</span>
              <span className="text-amber-600 ml-2">Blog</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Insights, trends, and inspiration from the world of fashion design
            </p>
          </div>

          {transformedBlogs.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-gray-600 mb-4">No blogs found</h3>
              <p className="text-gray-500">Check back later for new articles.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {transformedBlogs.map((blog) => (
                  <article
                    key={blog.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="aspect-video overflow-hidden">
                      <Image
                        width={400}
                        height={256}
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <span>{new Date(blog.date).toLocaleDateString()}</span>
                        <span className="mx-2">•</span>
                        <span>{blog.author}</span>
                        <span className="mx-2">•</span>
                        <span>{blog.readTime} min read</span>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        {blog.title}
                      </h2>
                      <div
  className="text-gray-600 mb-4 line-clamp-5"
  dangerouslySetInnerHTML={{ __html: blog.content }}
></div>
                      <Link
                        href={`/blogs/${blog.id}`}
                        className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium"
                      >
                        Read More
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4 mt-12">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className={`px-4 py-2 rounded-lg border ${
                      pagination.page === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                    }`}
                  >
                    Previous
                  </button>
                  
                  <div className="flex space-x-2">
                    {[...Array(pagination.totalPages)].map((_, index) => {
                      const pageNumber = index + 1;
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`px-3 py-2 rounded-lg ${
                            pagination.page === pageNumber
                              ? 'bg-amber-600 text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                    className={`px-4 py-2 rounded-lg border ${
                      pagination.page === pagination.totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}