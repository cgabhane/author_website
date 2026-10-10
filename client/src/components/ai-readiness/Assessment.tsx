import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Link2, Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import JourneyView from "@/components/ai-readiness/JourneyView";
import { buildResult, questions, type Answers } from "@/lib/aiReadiness/assessment";
import { track } from "@/lib/posthog";
import { copyText } from "@/lib/clipboard";

export default function Assessment() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const question = questions[step];
  const selected = question ? answers[question.id] : undefined;

  useEffect(() => {
    headingRef.current?.focus();
  }, [step, done]);

  const choose = (value: string) => {
    if (step === 0 && Object.keys(answers).length === 0) track("ai_readiness_assessment_started");
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  };

  const next = () => {
    if (!selected) return;
    track("ai_readiness_question_answered", { question: question.id, answer: selected });
    if (step < questions.length - 1) {
      setStep(step + 1);
      return;
    }
    const result = buildResult(answers);
    track("ai_readiness_assessment_completed", {
      role: answers.role ?? "",
      current_use: answers.current_use ?? "",
      goal: answers.goal ?? "",
      time_budget: answers.time_budget ?? "",
      starting_point: result.startingPoint,
      journey: result.journey.slug,
    });
    setDone(true);
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
    setDone(false);
  };

  if (done) {
    const result = buildResult(answers);
    const shareUrl = `https://chetangabhane.in/ai-readiness/roles/${result.journey.slug}`;
    const copyLink = async () => {
      if (!(await copyText(shareUrl))) return;
      setCopied(true);
      track("ai_readiness_journey_shared", { journey: result.journey.slug, source: "result" });
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="space-y-10">
        <div className="space-y-4">
          <p className="text-sm font-medium uppercase tracking-wide text-primary">Your starting point</p>
          <h2 ref={headingRef} tabIndex={-1} className="font-serif text-3xl md:text-4xl font-bold text-foreground outline-none">
            {result.startingLabel}
          </h2>
          <p className="text-lg text-foreground">{result.startingDescription}</p>
          {result.roleNote && <p className="rounded-md bg-muted/60 p-4 text-foreground">{result.roleNote}</p>}
          <ul className="space-y-2 text-foreground">
            <li><span className="font-semibold">Your focus:</span> {result.focus}</li>
            <li><span className="font-semibold">Your pace:</span> {result.pace}</li>
          </ul>
          <div>
            <p className="font-semibold text-foreground mb-2">Where AI can help in your work:</p>
            <ul className="list-disc pl-5 space-y-1 text-foreground">
              {result.journey.useCases.map((u) => (
                <li key={u}>{u}</li>
              ))}
            </ul>
          </div>
        </div>

        <JourneyView journey={result.journey} resources={result.resources} skippedIntro={result.skippedIntro} />

        <div className="flex flex-wrap gap-3 border-t pt-6">
          <Button onClick={copyLink} data-testid="button-share-journey">
            {copied ? <Check className="h-4 w-4 mr-2" /> : <Link2 className="h-4 w-4 mr-2" />}
            {copied ? "Link copied" : "Copy link to this path"}
          </Button>
          <Button variant="outline" onClick={restart} data-testid="button-restart">
            <RotateCcw className="h-4 w-4 mr-2" />
            Start again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground" aria-live="polite">
          Question {step + 1} of {questions.length}
        </p>
        <Progress value={((step + 1) / questions.length) * 100} aria-hidden="true" />
      </div>
      <fieldset className="space-y-4">
        <legend>
          <h2 ref={headingRef} tabIndex={-1} className="font-serif text-2xl md:text-3xl font-semibold text-foreground outline-none">
            {question.prompt}
          </h2>
        </legend>
        <RadioGroup value={selected ?? ""} onValueChange={choose} className="grid gap-3 sm:grid-cols-2">
          {question.choices.map((choice) => (
            <Label
              key={choice.id}
              htmlFor={`${question.id}-${choice.id}`}
              className={`flex cursor-pointer items-center gap-3 rounded-md border p-4 text-base font-normal leading-snug transition-colors hover:border-primary ${
                selected === choice.id ? "border-primary bg-primary/5" : ""
              }`}
            >
              <RadioGroupItem value={choice.id} id={`${question.id}-${choice.id}`} />
              {choice.label}
            </Label>
          ))}
        </RadioGroup>
      </fieldset>
      <div className="flex items-center justify-between gap-3">
        <Button variant="ghost" onClick={() => setStep(step - 1)} disabled={step === 0} data-testid="button-back">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button onClick={next} disabled={!selected} data-testid="button-continue">
          {step === questions.length - 1 ? "See my path" : "Continue"}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
