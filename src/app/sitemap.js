// src/app/sitemap.js
import { getBlogsList } from "@/lib/authService";

export default async function sitemap() {
  const baseUrl = 'https://whydesigners.com';
  
  const blogsResponse = await getBlogsList(1, 100, 'createdAt', 'desc');
  const blogPosts = blogsResponse.success ? blogsResponse.data.data : [];
  
  const staticPages = [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/about-us`, lastModified: new Date() },
    { url: `${baseUrl}/blogs`, lastModified: new Date() },
    { url: `${baseUrl}/faq`, lastModified: new Date() },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date() },
    { url: `${baseUrl}/terms-of-service`, lastModified: new Date() },
  ];
  
  const blogPages = blogPosts.map(post => ({
    url: `${baseUrl}/blogs/${post.id}`,
    lastModified: new Date(post.updatedAt || post.createdAt),
  }));

  return [...staticPages, ...blogPages];
}
