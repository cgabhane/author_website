import { Link } from "wouter";
import { ArrowRight, CalendarDays } from "lucide-react";
import Navigation from "@/components/Navigation";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Card, CardContent } from "@/components/ui/card";
import { aiReadinessGuides } from "@/lib/aiReadinessGuides";

export default function AiReadiness() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="AI Readiness by Role – Practical Plans for Professionals | Chetan Gabhane"
        description="Free, practical AI-readiness plans for working professionals, organised by role. Exercises, worked examples and checked sources, with no sign-up required."
        canonicalUrl="https://chetangabhane.in/ai-readiness"
      />
      <Navigation />
      <PageHeader title="AI Readiness by Role" subtitle="Practical plans for using AI in the work you already do" />

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6 space-y-10">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Each guide is a step-by-step plan for one role: where AI genuinely helps, where it must
            not be trusted, exercises with worked answers, and resources whose links have been checked.
            No sign-up is needed to read them.
          </p>

          <div className="space-y-6">
            {aiReadinessGuides.map((guide) => (
              <Link key={guide.slug} href={`/ai-readiness/${guide.slug}`}>
                <Card className="hover-elevate cursor-pointer" data-testid={`card-guide-${guide.slug}`}>
                  <CardContent className="p-8 space-y-3">
                    <p className="text-sm font-medium text-primary">{guide.role}</p>
                    <h2 className="font-serif text-2xl font-semibold text-foreground">{guide.title}</h2>
                    <p className="text-muted-foreground">{guide.description}</p>
                    <div className="flex items-center justify-between pt-2 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-2">
                        <CalendarDays className="h-4 w-4" />
                        {guide.weeks} weeks
                      </span>
                      <span className="inline-flex items-center gap-1 text-primary font-medium">
                        Read the plan <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <p className="text-sm text-muted-foreground">
            More roles are being added. Want a guide for your role?{" "}
            <a href="/#contact" className="text-primary underline underline-offset-4">Get in touch</a>.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
