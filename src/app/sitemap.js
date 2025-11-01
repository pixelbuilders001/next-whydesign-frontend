// src/app/sitemap.js (or src/app/sitemap/route.js)

import { getBlogsList } from "@/lib/authService";


export async function GET() {
  const baseUrl = 'https://whydesigners.com';
  
  // Get blog posts
  const blogsResponse = await getBlogsList(1, 100, 'createdAt', 'desc');
  const blogPosts = blogsResponse.success ? blogsResponse.data.data : [];
  
  const staticPages = [
    { url: `${baseUrl}/`, lastmod: new Date().toISOString(), changefreq: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/about-us`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blogs`, lastmod: new Date().toISOString(), changefreq: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/faq`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/privacy-policy`, lastmod: new Date().toISOString(), changefreq: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms-of-service`, lastmod: new Date().toISOString(), changefreq: 'yearly', priority: 0.3 },
  ];
  
  const blogPages = blogPosts.map(post => ({
    url: `${baseUrl}/blogs/${post.id}`,
    lastmod: new Date(post.updatedAt || post.createdAt).toISOString(),
    changefreq: 'monthly',
    priority: 0.6,
  }));
  
  const allPages = [...staticPages, ...blogPages];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages.map(page => `
    <url>
      <loc>${page.url}</loc>
      <lastmod>${page.lastmod}</lastmod>
      <changefreq>${page.changefreq}</changefreq>
      <priority>${page.priority}</priority>
    </url>
  `).join('')}
</urlset>`;
  
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate',
    },
  });
}
