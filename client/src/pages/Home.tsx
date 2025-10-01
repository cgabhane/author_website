import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Books from "@/components/Books";
import Insights from "@/components/Insights";
import Newsletter from "@/components/Newsletter";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import profileImage from '@assets/generated_images/Professional_executive_headshot_portrait_0ce85843.png';
import book1Cover from '@assets/generated_images/Terraform_book_cover_design_cd903b98.png';
import book2Cover from '@assets/generated_images/VMware_strategy_book_cover_1194819c.png';

export default function Home() {
  const books = [
    {
      id: "terraform",
      title: "Reverse Engineering with Terraform",
      description: "A practical guide to automation, integration, and scalability with Terraform.",
      coverImage: book1Cover,
      buyUrl: "#"
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
