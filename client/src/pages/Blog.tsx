import Navigation from "@/components/Navigation";
import PageHeader from "@/components/PageHeader";
import BlogCard from "@/components/BlogCard";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

export default function Blog() {
  const blogPosts = [
    {
      id: "cloud-migrations",
      title: "Why Most Cloud Migrations Fail – and How to Fix It",
      date: "September 2025",
      readTime: "5 min read",
      category: "Cloud Strategy",
      excerpt: "Most cloud migrations stumble not because of technology, but because of strategy and execution gaps. In this article, I share the five most common pitfalls enterprises face, and how to build a migration framework that ensures resilience and success..."
    },
    {
      id: "ai-agents",
      title: "The Rise of AI Agents in Cloud Operations",
      date: "August 2025",
      readTime: "6 min read",
      category: "AI Operations",
      excerpt: "AI agents are no longer experimental – they're becoming the backbone of enterprise IT operations. From anomaly detection to automated remediation, here's how agentic AI is transforming the way we think about observability and incident response..."
    },
    {
      id: "sovereign-cloud",
      title: "Sovereign Cloud: Balancing Compliance and Innovation",
      date: "July 2025",
      readTime: "4 min read",
      category: "Compliance",
      excerpt: "As enterprises expand across regions, sovereignty is no longer optional. The rise of data regulations in Europe and Asia is reshaping how businesses deploy and secure workloads in multi-cloud environments..."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Blog – Cloud & AI Insights | Chetan Gabhane"
        description="Thought leadership on cloud strategy, AI operations, VMware transitions, and enterprise architecture. Expert insights from cloud evangelist Chetan Gabhane."
        keywords="cloud migration blog, AI operations insights, VMware cloud transition, cloud strategy articles, enterprise architecture blog"
        canonicalUrl="https://chetangabhane.in/blog"
      />
      <Navigation />
      <PageHeader title="Blog" subtitle="Thought Leadership • Insights • Cloud & AI" />
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 space-y-12">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} {...post} />
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
