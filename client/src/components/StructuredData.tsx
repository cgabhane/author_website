import { useEffect } from 'react';

interface StructuredDataProps {
  type: 'person' | 'article' | 'book' | 'organization';
  data: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  useEffect(() => {
    const scriptId = `structured-data-${type}`;
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    let structuredData;

    switch (type) {
      case 'person':
        structuredData = {
          "@context": "https://schema.org",
          "@type": "Person",
          "name": data.name || "Chetan Gabhane",
          "url": "https://chetangabhane.in",
          "image": "https://chetangabhane.in/profile.jpg",
          "sameAs": [
            "https://www.linkedin.com/in/chetangabhane",
            "https://chetangabhane.substack.com",
            data.twitter || "https://twitter.com/chetangabhane"
          ],
          "jobTitle": "Cloud & AI Evangelist",
          "worksFor": {
            "@type": "Organization",
            "name": "Independent Consultant"
          },
          "description": "Cloud & AI Evangelist, Author, and Strategic Advisor helping enterprises with cloud transformation and AI innovation.",
          "knowsAbout": [
            "Cloud Strategy",
            "AI Operations",
            "Cloud Migration",
            "VMware to Cloud Transition",
            "Enterprise Architecture",
            "Strategic Consulting"
          ]
        };
        break;

      case 'article':
        structuredData = {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": data.title,
          "description": data.description,
          "author": {
            "@type": "Person",
            "name": "Chetan Gabhane",
            "url": "https://chetangabhane.in"
          },
          "publisher": {
            "@type": "Person",
            "name": "Chetan Gabhane"
          },
          "datePublished": data.publishedTime,
          "dateModified": data.modifiedTime || data.publishedTime,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": data.url
          },
          "image": data.image || "https://chetangabhane.in/og-image.jpg"
        };
        break;

      case 'book':
        structuredData = {
          "@context": "https://schema.org",
          "@type": "Book",
          "name": data.title,
          "description": data.description,
          "author": {
            "@type": "Person",
            "name": "Chetan Gabhane",
            "url": "https://chetangabhane.in"
          },
          "image": data.coverImage,
          "url": data.buyUrl,
          "bookFormat": "https://schema.org/Paperback",
          "inLanguage": "en"
        };
        break;

      case 'organization':
        structuredData = {
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": "Chetan Gabhane Consulting",
          "description": "Strategic consulting for cloud transformation and AI innovation",
          "url": "https://chetangabhane.in",
          "founder": {
            "@type": "Person",
            "name": "Chetan Gabhane"
          },
          "areaServed": "Global",
          "serviceType": [
            "Cloud Strategy Consulting",
            "AI Innovation Advisory",
            "Enterprise Architecture",
            "Cloud Migration Planning"
          ]
        };
        break;
    }

    script.textContent = JSON.stringify(structuredData);

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [type, data]);

  return null;
}
