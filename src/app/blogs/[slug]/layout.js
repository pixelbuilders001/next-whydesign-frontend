import { getBlogById } from '@/lib/authService';

export async function generateMetadata({ params }) {
  const { slug } = params;
  
  try {
    const response = await getBlogById(slug);
    
    if (response.success && response.data) {
      const blog = response.data;
      
      return {
        title: `${blog.title} - Why Designers`,
        description: blog.content?.replace(/<[^>]*>/g, '').substring(0, 160) + '...' || `Read ${blog.title} on Why Designers`,
        keywords: blog.tags?.join(', ') || 'fashion blog, design education, study abroad',
        authors: [{ name: blog.authorId?.fullName || 'Why Designers' }],
        openGraph: {
          title: blog.title,
          description: blog.content?.replace(/<[^>]*>/g, '').substring(0, 160) + '...' || `Read ${blog.title} on Why Designers`,
          type: 'article',
          publishedTime: blog.publishedAt || blog.createdAt,
          authors: [blog.authorId?.fullName || 'Why Designers'],
          images: [
            {
              url: blog.featuredImage,
              width: 1200,
              height: 630,
              alt: blog.title,
            },
          ],
        },
        twitter: {
          card: 'summary_large_image',
          title: blog.title,
          description: blog.content?.replace(/<[^>]*>/g, '').substring(0, 160) + '...' || `Read ${blog.title} on Why Designers`,
          images: [blog.featuredImage],
        },
        robots: {
          index: true,
          follow: true,
        },
      };
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
  }
  
  // Fallback metadata
  return {
    title: 'Blog Post - Why Designers',
    description: 'Read this blog post on Why Designers',
  };
}

export default function BlogLayout({ children }) {
  return children;
}