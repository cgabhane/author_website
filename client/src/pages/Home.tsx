import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Books from "@/components/Books";
import Insights from "@/components/Insights";
import Newsletter from "@/components/Newsletter";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import profileImage from '@assets/profile_1759318487930.jpg';
import book1Cover from '@assets/book1_1759315863433.jpg';
import book2Cover from '@assets/book2_1759315940962.jpg';

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

  const insights = [
    { id: "1", title: "Why Most Cloud Migrations Fail – and How to Fix It" },
    { id: "2", title: "The Rise of AI Agents in Cloud Operations" },
    { id: "3", title: "Sovereign Cloud: Balancing Compliance and Innovation" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero profileImage={profileImage} />
      <About />
      <Books books={books} />
      <Insights insights={insights} />
      <Newsletter />
      <Contact />
      <Footer />
    </div>
  );
}
