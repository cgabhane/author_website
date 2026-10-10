import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, ClipboardList, Compass, ShieldCheck } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Assessment from "@/components/ai-readiness/Assessment";
import { journeyOrder, journeys } from "@/lib/aiReadiness/data";

const steps = [
  { icon: ClipboardList, title: "Tell us about your work", text: "Four quick questions: your role, how you use AI today, your goal and your time." },
  { icon: Compass, title: "Get a starting point", text: "One task to do today and a few hand-picked resources, in order." },
  { icon: ShieldCheck, title: "Practise and check", text: "Use AI on real work, check what it gives you, and go deeper when you are ready." },
];

export default function AiReadiness() {
  const scrollToStart = () => document.getElementById("start")?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    if (window.location.hash === "#start") scrollToStart();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="AI Readiness Navigator – Find Where to Start With AI in Your Job | Chetan Gabhane"
        description="Answer four quick questions and get a practical place to start with AI for your role: one task to do today, a few hand-picked free resources, and how to check the results."
        canonicalUrl="https://chetangabhane.in/ai-readiness"
      />
      <Navigation />

      <header className="bg-muted/30 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">AI Readiness Navigator</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
            Become AI-ready for the work you actually do
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            <strong className="text-foreground">AI readiness</strong> doesn't mean learning everything about AI. It means
            knowing where AI helps in your job, using it on real work, and checking what it gives you.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" onClick={scrollToStart} data-testid="button-find-path">
              Find my starting point
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">Free. About one minute. No sign-up, no coding required.</p>
        </div>
      </header>

      <section className="py-14">
        <div className="max-w-5xl mx-auto px-6 grid gap-6 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <div key={title} className="space-y-2">
              <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
              <p className="font-semibold text-foreground">{i + 1}. {title}</p>
              <p className="text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="start" className="pb-16 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6">
          <Card>
            <CardContent className="p-4 sm:p-6 md:p-10">
              <Assessment />
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-5xl mx-auto px-6 space-y-8">
          <div className="space-y-2">
            <h2 className="font-serif text-3xl font-semibold text-foreground">Or go straight to a path</h2>
            <p className="text-muted-foreground">Each path has one first task, a short checklist and a few resources.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {journeyOrder.map((slug) => {
              const j = journeys[slug];
              return (
                <Link key={slug} href={`/ai-readiness/roles/${slug}`}>
                  <Card className="h-full cursor-pointer hover-elevate" data-testid={`card-role-${slug}`}>
                    <CardContent className="p-6 space-y-3">
                      <p className="font-serif text-xl font-semibold text-foreground">{j.role}</p>
                      <p className="text-muted-foreground">{j.promise}</p>
                      <p className="text-sm text-foreground">
                        <span className="font-medium">Try first:</span> {j.firstAction.title}
                      </p>
                      <span className="inline-flex items-center gap-1 text-primary font-medium">
                        Explore this path <ArrowRight className="h-4 w-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
          <p className="text-sm text-muted-foreground">
            Paths for DevOps and cloud engineers, solution architects and presales are coming soon.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-3xl mx-auto px-6 space-y-3 text-sm text-muted-foreground">
          <h2 className="font-serif text-xl font-semibold text-foreground">How resources are chosen</h2>
          <p>
            Every resource is opened and checked before it is listed, and each card says who made it, whether it is free
            and, where the provider states it, how long it takes. Nothing here is sponsored. Want the full, in-depth plans?
            See the{" "}
            <Link href="/ai-readiness/pricing-manager"><span className="text-primary underline underline-offset-4">8-week plan for pricing managers</span></Link>{" "}
            and the{" "}
            <Link href="/ai-readiness/software-developer"><span className="text-primary underline underline-offset-4">advanced engineering plan</span></Link>.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
