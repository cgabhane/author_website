import { useEffect, useRef, useState } from "react";
import { useRoute, Link } from "wouter";
import { marked } from "marked";
import { ArrowLeft, Check, Link2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import NotFound from "@/pages/not-found";
import { aiReadinessGuides } from "@/lib/aiReadinessGuides";
import { track } from "@/lib/posthog";

function stripFrontmatter(markdown: string): string {
  return markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
}

export default function AiReadinessGuide() {
  const [, params] = useRoute("/ai-readiness/:slug");
  const guide = aiReadinessGuides.find((g) => g.slug === params?.slug);
  const [html, setHtml] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const [copied, setCopied] = useState(false);
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!guide) return;
    track("blueprint_viewed", { slug: guide.slug, role_family: guide.roleFamily });
    fetch(`/ai-readiness/${guide.slug}.md`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((md) => setHtml(marked.parse(stripFrontmatter(md), { async: false })))
      .catch(() => setFailed(true));
  }, [guide]);

  // Reading depth: fire once each at 50% and 90% of the article.
  useEffect(() => {
    if (!guide || !html) return;
    const fired = new Set<number>();
    const onScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const read = (window.scrollY + window.innerHeight - el.offsetTop) / el.offsetHeight;
      for (const depth of [50, 90]) {
        if (read * 100 >= depth && !fired.has(depth)) {
          fired.add(depth);
          track("blueprint_read_depth", { slug: guide.slug, depth });
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [guide, html]);

  if (!guide) return <NotFound />;

  const handleArticleClick = (event: React.MouseEvent<HTMLElement>) => {
    const link = (event.target as HTMLElement).closest("a");
    if (!link) return;
    const url = new URL(link.href, window.location.href);
    if (url.pathname.endsWith(".csv")) {
      track("blueprint_dataset_downloaded", { slug: guide.slug });
    } else if (url.host !== window.location.host) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      track("blueprint_resource_clicked", { slug: guide.slug, resource_domain: url.hostname });
    }
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(`https://chetangabhane.in/ai-readiness/${guide.slug}`);
    setCopied(true);
    track("blueprint_link_copied", { slug: guide.slug });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${guide.title} | Chetan Gabhane`}
        description={guide.description}
        canonicalUrl={`https://chetangabhane.in/ai-readiness/${guide.slug}`}
        article
      />
      <Navigation />

      <div className="max-w-3xl mx-auto px-6 pt-10 flex items-center justify-between gap-4">
        <Link href="/ai-readiness">
          <span className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
            <ArrowLeft className="h-4 w-4" />
            AI Readiness by Role
          </span>
        </Link>
        <Button variant="outline" size="sm" onClick={copyLink} data-testid="button-copy-link">
          {copied ? <Check className="h-4 w-4 mr-2" /> : <Link2 className="h-4 w-4 mr-2" />}
          {copied ? "Link copied" : "Copy link"}
        </Button>
      </div>

      <main className="max-w-3xl mx-auto px-6 py-10">
        {failed && (
          <p className="text-muted-foreground">
            This guide could not be loaded. Please refresh the page or try again later.
          </p>
        )}
        {!failed && !html && <p className="text-muted-foreground">Loading guide…</p>}
        {html && (
          <article
            ref={articleRef}
            onClick={handleArticleClick}
            className="prose md:prose-lg dark:prose-invert max-w-none prose-headings:font-serif prose-headings:text-foreground prose-a:text-primary [&_table]:block [&_table]:overflow-x-auto [&_table]:text-base"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
