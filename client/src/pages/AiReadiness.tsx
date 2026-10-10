import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, ClipboardList, Compass, HelpCircle, ShieldCheck } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Assessment from "@/components/ai-readiness/Assessment";
import { journeyOrder, journeys } from "@/lib/aiReadiness/data";
import { track } from "@/lib/posthog";

const steps = [
  { icon: Compass, title: "Pick your path", text: "Choose the path closest to your work. Not sure? Answer four quick questions instead." },
  { icon: ClipboardList, title: "Do one task today", text: "Each path starts with a 15-minute task and a prompt you can copy." },
  { icon: ShieldCheck, title: "Practise and check", text: "Use AI on real work, check what it gives you, and go deeper when you are ready." },
];

export default function AiReadiness() {
  const [assessmentOpen, setAssessmentOpen] = useState(false);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const openAssessment = (source: string) => {
    setAssessmentOpen(true);
    track("ai_readiness_assessment_opened", { source });
    setTimeout(() => scrollTo("start"), 50);
  };

  useEffect(() => {
    if (window.location.hash === "#start") openAssessment("link");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="AI Readiness Navigator – Find Where to Start With AI in Your Job | Chetan Gabhane"
        description="Pick your role, or answer four quick questions, and get a practical place to start with AI: one task to do today, a few hand-picked free resources, and how to check the results."
        canonicalUrl="https://chetangabhane.in/ai-readiness"
      />
      <Navigation />

      <header className="bg-muted/30 py-14 md:py-20">
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
            <Button size="lg" onClick={() => scrollTo("paths")} data-testid="button-explore-paths">
              Choose your path
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => openAssessment("hero")} data-testid="button-open-assessment">
              Not sure? Answer 4 quick questions
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">Free. No sign-up, no coding required.</p>
        </div>
      </header>

      <main>
      <section id="paths" className="py-14 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-6 space-y-8">
          <div className="space-y-2">
            <h2 className="font-serif text-3xl font-semibold text-foreground">Choose your path</h2>
            <p className="text-muted-foreground">Each path has one first task, a short checklist and a few hand-picked resources.</p>
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
            DevOps and cloud engineers, solution architects and presales: dedicated paths are coming soon. Until then, the
            "Any professional" path or the four questions below will give you examples from your kind of work.
          </p>
        </div>
      </section>

      <section id="start" className="pb-14 scroll-mt-20">
        <div className="max-w-3xl mx-auto px-6">
          <Card>
            <CardContent className="p-4 sm:p-6 md:p-10">
              {assessmentOpen ? (
                <Assessment />
              ) : (
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex gap-3">
                    <HelpCircle className="h-6 w-6 shrink-0 text-primary" aria-hidden="true" />
                    <div>
                      <h2 className="font-serif text-2xl font-semibold text-foreground">Not sure which path fits?</h2>
                      <p className="text-muted-foreground">
                        Optional: answer four quick questions (about a minute) and we'll suggest where to start and at what pace.
                      </p>
                    </div>
                  </div>
                  <Button onClick={() => openAssessment("card")} data-testid="button-start-assessment">
                    Start the questions
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-14 bg-muted/30">
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
      </main>

      <Footer />
    </div>
  );
}
