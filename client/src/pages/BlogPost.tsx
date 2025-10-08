import { useRoute, Link } from "wouter";
import Navigation from "@/components/Navigation";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function BlogPost() {
  const [, params] = useRoute("/blog/:id");
  const postId = params?.id || "cloud-migrations";

  const blogContent = {
    "cloud-migrations": {
      title: "Why Most Cloud Migrations Fail – and How to Fix It",
      date: "September 2025",
      publishedTime: "2025-09-15T10:00:00Z",
      author: "Chetan Gabhane",
      description: "Cloud adoption continues to accelerate, but many enterprises still find their migration initiatives stalling or failing outright. Learn the five most common reasons migrations fail and practical steps to avoid them.",
      content: (
        <>
          <p>
            Cloud adoption continues to accelerate, but many enterprises still find their migration
            initiatives stalling or failing outright. Based on my experience leading transformation
            programs, here are the five most common reasons migrations fail – and practical steps
            to avoid them:
          </p>

          <h3 className="font-serif text-2xl font-semibold text-primary mt-8 mb-4">
            1. Lack of Executive Alignment
          </h3>
          <p>
            Without clear sponsorship and buy-in across CXO stakeholders, cloud initiatives lose
            direction and accountability.
          </p>

          <h3 className="font-serif text-2xl font-semibold text-primary mt-8 mb-4">
            2. Incomplete Discovery
          </h3>
          <p>
            Enterprises often underestimate the complexity of existing workloads. A thorough
            discovery process is non-negotiable.
          </p>

          <h3 className="font-serif text-2xl font-semibold text-primary mt-8 mb-4">
            3. Misaligned Timelines
          </h3>
          <p>
            Unrealistic expectations can lead to rushed decisions, increased costs, and technical debt.
          </p>

          <h3 className="font-serif text-2xl font-semibold text-primary mt-8 mb-4">
            4. Insufficient Change Management
          </h3>
          <p>
            Cloud is as much about people and processes as technology. Training, culture, and workflows
            must evolve in parallel.
          </p>

          <h3 className="font-serif text-2xl font-semibold text-primary mt-8 mb-4">
            5. Neglecting Security & Compliance
          </h3>
          <p>
            Security should not be a bolt-on – it must be designed into the landing zone and migration
            strategy from day one.
          </p>

          <blockquote className="my-8 pl-6 border-l-4 border-primary bg-muted/30 py-4 pr-6 italic text-lg">
            "Cloud migration is not a project. It's a journey of organizational change, requiring
            clarity, patience, and foresight."
          </blockquote>

          <p>
            By addressing these areas, enterprises can transform migration from a high-risk challenge
            into a strategic advantage.
          </p>
        </>
      )
    }
  };

  const post = blogContent[postId as keyof typeof blogContent] || blogContent["cloud-migrations"];

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={`${post.title} | Chetan Gabhane`}
        description={post.description || post.title}
        article={true}
        publishedTime={post.publishedTime}
        canonicalUrl={`https://chetangabhane.in/blog/${postId}`}
      />
      <StructuredData 
        type="article" 
        data={{
          title: post.title,
          description: post.description || post.title,
          publishedTime: post.publishedTime,
          url: `https://chetangabhane.in/blog/${postId}`
        }}
      />
      <Navigation />
      <PageHeader 
        title={post.title}
        subtitle={`${post.date} • By ${post.author}`}
      />
      <article className="py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <div className="prose prose-lg max-w-none space-y-6 text-foreground">
            {post.content}
          </div>
          <div className="mt-12">
            <Link href="/blog">
              <Button variant="secondary" data-testid="button-back-to-blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
}
