import { useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  BookOpen,
  Check,
  ClipboardCopy,
  Download,
  ExternalLink,
  ShieldCheck,
  Target,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { accessLabel, stageLabel, type Journey, type Resource } from "@/lib/aiReadiness/data";
import { track } from "@/lib/posthog";
import { copyText } from "@/lib/clipboard";

interface JourneyViewProps {
  journey: Journey;
  resources: Resource[];
  skippedIntro?: boolean;
  // h2 on a standalone path page (under its h1); h3 inside the assessment result (under its h2).
  headingLevel?: 2 | 3;
}

export default function JourneyView({ journey, resources, skippedIntro, headingLevel = 3 }: JourneyViewProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const SectionTitle = ({ icon: Icon, children }: { icon: typeof Target; children: React.ReactNode }) => (
    <Heading className="flex items-center gap-2 font-serif text-2xl font-semibold text-foreground">
      <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
      {children}
    </Heading>
  );
  const [copied, setCopied] = useState(false);
  const { firstAction } = journey;

  const copyPrompt = async () => {
    if (!(await copyText(firstAction.prompt))) return;
    setCopied(true);
    track("ai_readiness_prompt_copied", { journey: journey.slug });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-12">
      <section className="space-y-4" aria-labelledby={`first-action-${journey.slug}`}>
        <SectionTitle icon={Target}>
          <span id={`first-action-${journey.slug}`}>Your first task today</span>
        </SectionTitle>
        <Card className="border-primary/40">
          <CardContent className="p-4 sm:p-6 md:p-8 space-y-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-lg font-semibold text-foreground">{firstAction.title}</p>
              <span className="text-sm text-muted-foreground">Estimated time: {firstAction.minutes}</span>
            </div>
            <ol className="list-decimal pl-5 space-y-2 text-foreground">
              {firstAction.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            {firstAction.download && (
              <a
                href={firstAction.download.href}
                download
                onClick={() => track("ai_readiness_dataset_downloaded", { journey: journey.slug })}
                className="inline-flex items-center gap-2 text-primary font-medium underline underline-offset-4"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                {firstAction.download.label}
              </a>
            )}
            <div className="rounded-md bg-muted/60 p-3 sm:p-4">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <p className="text-sm font-medium text-foreground">Prompt to copy</p>
                <Button size="sm" variant="outline" onClick={copyPrompt} data-testid="button-copy-prompt">
                  {copied ? <Check className="h-4 w-4 mr-2" /> : <ClipboardCopy className="h-4 w-4 mr-2" />}
                  {copied ? "Copied" : "Copy prompt"}
                </Button>
              </div>
              <pre className="whitespace-pre-wrap text-sm text-foreground font-mono">{firstAction.prompt}</pre>
            </div>
            {firstAction.answerKey && (
              <details className="rounded-md border p-4">
                <summary className="cursor-pointer font-medium text-foreground">Check your answer</summary>
                <ul className="mt-3 list-disc pl-5 space-y-1 text-foreground">
                  {firstAction.answerKey.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </details>
            )}
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <SectionTitle icon={ShieldCheck}>How to check what AI gave you</SectionTitle>
        <ul className="space-y-2">
          {journey.verify.map((item) => (
            <li key={item} className="flex gap-3 text-foreground">
              <Check className="h-5 w-5 mt-0.5 shrink-0 text-primary" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <SectionTitle icon={BookOpen}>Hand-picked resources, in order</SectionTitle>
        {skippedIntro && (
          <p className="text-sm text-muted-foreground">
            You already use AI, so we've left out the beginner introduction.
          </p>
        )}
        <div className="space-y-4">
          {resources.map((resource, index) => (
            <Card key={resource.id}>
              <CardContent className="p-4 sm:p-6 space-y-2">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                  <span className="font-medium text-primary">
                    {index + 1}. {stageLabel[resource.stage]}
                  </span>
                  <span>{resource.provider}</span>
                  {resource.time && <span>{resource.time}</span>}
                  <span>{accessLabel[resource.access]}</span>
                </div>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    track("ai_readiness_resource_opened", {
                      journey: journey.slug,
                      resource_id: resource.id,
                      stage: resource.stage,
                    })
                  }
                  className="inline-flex items-center gap-2 text-lg font-semibold text-foreground hover:text-primary"
                >
                  {resource.title}
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
                <p className="text-muted-foreground">{resource.why}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <SectionTitle icon={TrendingUp}>What progress looks like</SectionTitle>
        <p className="text-foreground">{journey.evidence}</p>
      </section>

      <section className="space-y-4">
        <SectionTitle icon={ArrowRight}>Ready for more? Your next task</SectionTitle>
        <Card>
          <CardContent className="p-4 sm:p-6 space-y-4">
            <p className="text-lg font-semibold text-foreground">{journey.nextTask.title}</p>
            <ol className="list-decimal pl-5 space-y-2 text-foreground">
              {journey.nextTask.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            {journey.nextTask.answerKey && (
              <details className="rounded-md border p-4">
                <summary className="cursor-pointer font-medium text-foreground">Check your answer</summary>
                <ul className="mt-3 list-disc pl-5 space-y-1 text-foreground">
                  {journey.nextTask.answerKey.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </details>
            )}
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <Heading className="font-serif text-xl font-semibold text-foreground">Go deeper (optional)</Heading>
        <ul className="space-y-3">
          {journey.deeper.map((item) => {
            const external = item.href.startsWith("http");
            const label = (
              <span className="font-medium text-primary underline underline-offset-4">{item.label}</span>
            );
            return (
              <li key={item.href}>
                {external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track("ai_readiness_deeper_clicked", { journey: journey.slug, target: item.href })}
                  >
                    {label}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => track("ai_readiness_deeper_clicked", { journey: journey.slug, target: item.href })}
                  >
                    {label}
                  </Link>
                )}
                <p className="text-sm text-muted-foreground">{item.note}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="space-y-3">
        <Heading className="font-serif text-xl font-semibold text-foreground">Keep learning (optional)</Heading>
        <ul className="space-y-3">
          <li>
            <a
              href="https://quantumread.space/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("ai_readiness_quantumread_cta_clicked", { journey: journey.slug })}
              className="font-medium text-primary underline underline-offset-4"
            >
              QuantumRead
            </a>
            <p className="text-sm text-muted-foreground">
              If you want structured practice and to track your progress. Disclosure: QuantumRead is a learning app I
              built. It is entirely optional; everything on this page works without it.
            </p>
          </li>
          <li>
            <a
              href="https://chetangabhane.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("ai_readiness_substack_cta_clicked", { journey: journey.slug })}
              className="font-medium text-primary underline underline-offset-4"
            >
              Chetan's Substack
            </a>
            <p className="text-sm text-muted-foreground">Practical notes on AI at work, and new paths as they are added.</p>
          </li>
        </ul>
      </section>

      <p className="text-sm text-muted-foreground border-t pt-6">
        Follow your organisation's AI and data policies, practise with public or made-up data, and treat AI
        output as a draft until you have checked it. Resources last checked {journey.lastReviewedAt}.
      </p>
    </div>
  );
}
