import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import { ArrowLeft, ArrowRight, Check, Link2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import JourneyView from "@/components/ai-readiness/JourneyView";
import NotFound from "@/pages/not-found";
import { journeys, resources } from "@/lib/aiReadiness/data";
import { track } from "@/lib/posthog";
import { copyText } from "@/lib/clipboard";

export default function AiReadinessRole() {
  const [, params] = useRoute("/ai-readiness/roles/:slug");
  const journey = params ? journeys[params.slug] : undefined;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (journey) track("ai_readiness_journey_viewed", { journey: journey.slug, source: "page" });
  }, [journey]);

  if (!journey) return <NotFound />;

  const url = `https://chetangabhane.in/ai-readiness/roles/${journey.slug}`;
  const copyLink = async () => {
    if (!(await copyText(url))) return;
    setCopied(true);
    track("ai_readiness_journey_shared", { journey: journey.slug, source: "page" });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${journey.headline} – Where to Start | Chetan Gabhane`}
        description={journey.promise}
        canonicalUrl={url}
      />
      <Navigation />

      <header className="bg-muted/30 py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-6 space-y-5">
          <div className="flex items-center justify-between gap-4">
            <Link href="/ai-readiness">
              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                <ArrowLeft className="h-4 w-4" />
                AI Readiness Navigator
              </span>
            </Link>
            <Button variant="outline" size="sm" onClick={copyLink} data-testid="button-copy-role-link">
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Link2 className="h-4 w-4 mr-2" />}
              {copied ? "Link copied" : "Copy link"}
            </Button>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">{journey.headline}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">{journey.promise}</p>
          <div>
            <p className="font-medium text-foreground mb-2">Where AI can help in this work:</p>
            <ul className="list-disc pl-5 space-y-1 text-foreground">
              {journey.useCases.map((u) => (
                <li key={u}>{u}</li>
              ))}
            </ul>
          </div>
          <Link href="/ai-readiness#start">
            <span className="inline-flex items-center gap-1 text-sm text-primary font-medium underline underline-offset-4 cursor-pointer">
              Not sure this fits? Take the one-minute questions <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <JourneyView journey={journey} resources={journey.resourceIds.map((id) => resources[id])} headingLevel={2} />
      </main>

      <Footer />
    </div>
  );
}
