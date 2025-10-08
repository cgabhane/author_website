import { useEffect } from 'react';
import { useLocation } from 'wouter';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  article?: boolean;
  author?: string;
  publishedTime?: string;
  canonicalUrl?: string;
}

export default function SEO({
  title = "Chetan Gabhane – Cloud & AI Evangelist | Author | Strategic Advisor",
  description = "Cloud & AI Evangelist helping enterprises navigate cloud transformation and AI innovation. Author of books on cloud strategy, VMware transitions, and AI operations. Book strategic consultations.",
  keywords = "cloud strategy consultant, AI evangelist, cloud migration expert, VMware to cloud, enterprise cloud architect, cloud transformation author, AI operations, strategic advisor",
  image = "https://chetangabhane.in/og-image.jpg",
  article = false,
  author = "Chetan Gabhane",
  publishedTime,
  canonicalUrl,
}: SEOProps) {
  const [location] = useLocation();
  const baseUrl = "https://chetangabhane.in";
  const currentUrl = canonicalUrl || `${baseUrl}${location}`;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`) || 
                    document.querySelector(`meta[name="${property}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        if (property.startsWith('og:') || property.startsWith('article:')) {
          element.setAttribute('property', property);
        } else {
          element.setAttribute('name', property);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', author);

    // Open Graph tags
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', image);
    updateMetaTag('og:url', currentUrl);
    updateMetaTag('og:type', article ? 'article' : 'website');
    updateMetaTag('og:site_name', 'Chetan Gabhane');

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    updateMetaTag('twitter:creator', '@chetangabhane');

    // Article specific tags
    if (article && publishedTime) {
      updateMetaTag('article:published_time', publishedTime);
      updateMetaTag('article:author', author);
    }

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = currentUrl;

  }, [title, description, keywords, image, article, author, publishedTime, currentUrl]);

  return null;
}
