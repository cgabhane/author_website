import { journeys, resources, type Journey, type Resource } from "./data";

export interface Choice {
  id: string;
  label: string;
}

export interface Question {
  id: "role" | "current_use" | "goal" | "time_budget";
  prompt: string;
  choices: Choice[];
}

export const questions: Question[] = [
  {
    id: "role",
    prompt: "What kind of work do you do?",
    choices: [
      { id: "developer", label: "Developer / Software engineer" },
      { id: "devops_cloud", label: "DevOps / Cloud / Platform engineer" },
      { id: "solution_architect", label: "Solution architect" },
      { id: "pricing_finance", label: "Pricing / Finance / Commercial analysis" },
      { id: "presales", label: "Presales / Sales engineering" },
      { id: "product_project", label: "Product / Project management" },
      { id: "data_analytics", label: "Data / Analytics" },
      { id: "sales_marketing", label: "Sales / Marketing / Customer success" },
      { id: "hr_operations", label: "HR / People / Operations" },
      { id: "student", label: "Student / Career switcher" },
      { id: "other", label: "Something else" },
    ],
  },
  {
    id: "current_use",
    prompt: "Which sounds most like you today?",
    choices: [
      { id: "not_started", label: "I haven't really tried AI tools yet" },
      { id: "occasional", label: "I use AI now and then for questions or writing" },
      { id: "regular", label: "I use AI regularly in my everyday work" },
      { id: "workflow", label: "I use AI in a few repeatable work tasks" },
      { id: "builder", label: "I build or integrate AI into products" },
    ],
  },
  {
    id: "goal",
    prompt: "What would make learning AI worth it for you?",
    choices: [
      { id: "understand", label: "Understand AI and where it helps in my job" },
      { id: "save_time", label: "Save time on repetitive work" },
      { id: "improve_quality", label: "Improve the quality of my work or decisions" },
      { id: "career_growth", label: "Prepare for a new role or promotion" },
      { id: "build_solutions", label: "Build or design AI-powered solutions" },
      { id: "team_adoption", label: "Help my team use AI responsibly" },
    ],
  },
  {
    id: "time_budget",
    prompt: "How much time feels realistic this week?",
    choices: [
      { id: "daily_10_15", label: "10 to 15 minutes a day" },
      { id: "daily_30", label: "About 30 minutes a day" },
      { id: "daily_60", label: "Around an hour a day" },
      { id: "weekly_60", label: "Just one focused hour this week" },
      { id: "flexible", label: "It varies, keep it flexible" },
    ],
  },
];

export type Answers = Partial<Record<Question["id"], string>>;

const roleToJourney: Record<string, string> = {
  developer: "developer",
  pricing_finance: "pricing-finance",
};

// Roles without a dedicated journey yet: they get the general journey, with
// examples and a first-task material suggestion from their own work.
const roleExamples: Record<string, { name: string; useCases: string[]; material: string }> = {
  devops_cloud: {
    name: "DevOps and cloud engineers",
    useCases: [
      "Summarising an incident timeline from your notes",
      "Drafting a runbook or troubleshooting checklist",
      "Explaining a configuration or infrastructure plan before review",
    ],
    material:
      "Pick a short runbook section or incident summary you wrote. Remove hostnames, IP addresses and customer names first.",
  },
  solution_architect: {
    name: "solution architects",
    useCases: [
      "Turning a requirement into discovery questions",
      "Comparing two options against criteria you set",
      "Drafting an architecture decision record",
    ],
    material:
      "Pick a short design note or requirement summary you wrote, with client names and confidential details removed.",
  },
  presales: {
    name: "presales professionals",
    useCases: [
      "Turning an RFP excerpt into a requirements checklist",
      "Listing clarification questions before a customer workshop",
      "Outlining a first draft of a proposal section",
    ],
    material:
      "Pick a short, non-confidential proposal paragraph or workshop agenda you wrote, with customer details removed.",
  },
};

const startingPoints = {
  start_here: {
    label: "Start with the basics",
    description: "You'll get a short, plain-English introduction and one safe first task.",
  },
  build_confidence: {
    label: "Build confidence",
    description: "You've tried AI. Next: use it on real work and learn to check what it gives you.",
  },
  make_it_a_habit: {
    label: "Make it a habit",
    description: "You already use AI. Focus on repeatable tasks and on checking the quality of what it gives you.",
  },
  go_technical: {
    label: "Go technical",
    description: "You want to build with AI. Do the first task, then head straight to the Go deeper section.",
  },
} as const;

const goalFocus: Record<string, string> = {
  understand: "Focus on understanding what AI is good and bad at in your work. The first task shows you both.",
  save_time: "Pick one task you repeat every week and use the first task's approach on it next time.",
  improve_quality: "Use AI as a second pair of eyes: ask it what is missing or weak, then judge its answer yourself.",
  career_growth: "Keep a short record of what you tried and what improved. That evidence is worth more than a certificate.",
  build_solutions: "Do the first task to see the failure modes for yourself, then go to the Go deeper section.",
  team_adoption: "Try the first task yourself, then run it with two colleagues and agree simple team rules together.",
};

const pace: Record<string, string> = {
  daily_10_15: "Do the first task today, then one resource or practice task each day this week.",
  daily_30: "Do the first task today, then one resource per session. You could finish the starting path in a few days.",
  daily_60: "Do the first task and the first resource today. Finish the starting path this week, then look at Go deeper.",
  weekly_60: "Use your hour for the first task and one resource. That is enough to see where AI helps you.",
  flexible: "Start with the first task whenever you can. Each step stands on its own.",
};

export interface Result {
  journey: Journey;
  startingPoint: keyof typeof startingPoints;
  startingLabel: string;
  startingDescription: string;
  focus: string;
  pace: string;
  resources: Resource[];
  skippedIntro: boolean;
  roleNote?: string;
}

export function buildResult(answers: Answers): Result {
  const role = answers.role ?? "other";
  const use = answers.current_use ?? "occasional";
  const goal = answers.goal ?? "understand";
  const time = answers.time_budget ?? "flexible";

  const examples = roleExamples[role];
  const base = journeys[roleToJourney[role] ?? "general"];
  const journey: Journey = examples
    ? {
        ...base,
        useCases: examples.useCases,
        firstAction: { ...base.firstAction, steps: [examples.material, ...base.firstAction.steps.slice(1)] },
      }
    : base;

  let startingPoint: Result["startingPoint"] = "build_confidence";
  if (use === "builder" || goal === "build_solutions") startingPoint = "go_technical";
  else if (use === "not_started") startingPoint = "start_here";
  else if (use === "regular" || use === "workflow") startingPoint = "make_it_a_habit";

  const all = journey.resourceIds.map((id) => resources[id]);
  // Experienced users skip the introduction, but never end up with fewer than three resources.
  const withoutIntro = all.filter((r) => r.stage !== "understand");
  const skipIntro =
    (startingPoint === "make_it_a_habit" || startingPoint === "go_technical") && withoutIntro.length >= 3;
  const shown = skipIntro ? withoutIntro : all;

  const roleNote = examples
    ? `A dedicated path for ${examples.name} is coming soon. Until then, this general path uses examples from your kind of work.`
    : undefined;

  return {
    journey,
    startingPoint,
    startingLabel: startingPoints[startingPoint].label,
    startingDescription: startingPoints[startingPoint].description,
    focus: goalFocus[goal],
    pace: pace[time],
    resources: shown,
    skippedIntro: skipIntro,
    roleNote,
  };
}
