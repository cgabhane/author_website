import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Books from "@/components/Books";
import SpeakingMedia from "@/components/SpeakingMedia";
import Insights from "@/components/Insights";
import Newsletter from "@/components/Newsletter";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import profileImage from '@assets/profile_1759318487930.jpg';
import book1Cover from '@assets/book1_1759315863433.jpg';
import book2Cover from '@assets/book2_1759315940962.jpg';
import { useQuery } from "@tanstack/react-query";
import type { Insight } from "@shared/schema";

export default function Home() {
  const books = [
    {
      id: "terraform",
      title: "Reverse Engineering with Terraform",
      description: "A practical guide to automation, integration, and scalability with Terraform.",
      coverImage: book1Cover,
      buyUrl: "https://www.amazon.in/Reverse-Engineering-Terraform-Introduction-Infrastructure/dp/B0CKSDNNNX"
    },
    {
      id: "vmware",
      title: "Navigating VMware Turmoil",
      description: "Strategic insights for enterprises transitioning from VMware to cloud alternatives.",
      coverImage: book2Cover,
      buyUrl: "#"
    }
  ];

  // Fallback mock insights (used if API fails)
  const mockInsights: Insight[] = [
    { 
      id: "1", 
      title: "Why Most Cloud Migrations Fail – and How to Fix It",
      url: "https://www.linkedin.com/in/chetangabhane",
      category: "Cloud Strategy"
    },
    { 
      id: "2", 
      title: "The Rise of AI Agents in Cloud Operations",
      url: "https://www.linkedin.com/in/chetangabhane",
      category: "AI Operations"
    },
    { 
      id: "3", 
      title: "Sovereign Cloud: Balancing Compliance and Innovation",
      url: "https://www.linkedin.com/in/chetangabhane",
      category: "Compliance"
    }
  ];

  // Fetch insights from Substack RSS via API
  const { data: insights, isLoading } = useQuery<Insight[]>({
    queryKey: ["/api/insights"],
    staleTime: 60 * 60 * 1000, // Consider data fresh for 1 hour
  });

  // Use fetched insights or fallback to mock data
  const displayInsights = insights || mockInsights;

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Chetan Gabhane – Cloud & AI Evangelist | Author | Strategic Advisor"
        description="Cloud & AI Evangelist helping enterprises navigate cloud transformation and AI innovation. Author of books on cloud strategy, VMware transitions, and AI operations. Book strategic consultations."
        keywords="cloud strategy consultant, AI evangelist, cloud migration expert, VMware to cloud, enterprise cloud architect, cloud transformation author, AI operations, strategic advisor"
      />
      <StructuredData 
        type="person" 
        data={{ 
          name: "Chetan Gabhane",
          twitter: "https://twitter.com/chetangabhane"
        }} 
      />
      <StructuredData type="organization" data={{}} />
      <Navigation />
      <Hero profileImage={profileImage} />
      <About />
      <Books books={books} />
      <SpeakingMedia />
      <Insights insights={displayInsights} isLoading={isLoading} />
      <Newsletter />
      <Contact />
      <Footer />
    </div>
  );
}
