// AI Readiness Navigator content. Every resource was opened and checked on the
// date in `lastVerifiedAt`; time and cost are stated only where the provider says so.

export type Stage = "understand" | "apply" | "verify" | "go_deeper";
export type Access = "free" | "free_sign_in" | "paid" | "paid_certificate";

export interface Resource {
  id: string;
  title: string;
  provider: string;
  url: string;
  stage: Stage;
  why: string;
  time?: string;
  access: Access;
  lastVerifiedAt: string;
}

export interface Journey {
  slug: string;
  role: string;
  headline: string;
  promise: string;
  useCases: string[];
  firstAction: {
    title: string;
    minutes: string;
    steps: string[];
    prompt: string;
    download?: { label: string; href: string };
    answerKey?: string[];
  };
  verify: string[];
  evidence: string;
  nextTask: { title: string; steps: string[]; answerKey?: string[] };
  resourceIds: string[];
  deeper: { label: string; href: string; note: string }[];
  lastReviewedAt: string;
}

const CHECKED = "2026-10-10";

export const resources: Record<string, Resource> = {
  "ai-fluency": {
    id: "ai-fluency",
    title: "AI Fluency: Framework & Foundations",
    provider: "Anthropic Academy",
    url: "https://anthropic.skilljar.com/ai-fluency-framework-foundations",
    stage: "understand",
    why: "A practical course on working with AI well: what to hand over, how to describe it, and how to judge the answer.",
    access: "free_sign_in",
    lastVerifiedAt: CHECKED,
  },
  "copilot-prompts": {
    id: "copilot-prompts",
    title: "Get started writing prompts",
    provider: "Microsoft Support",
    url: "https://support.microsoft.com/en-us/microsoft-365-copilot/get-started-writing-prompts-in-microsoft-365-copilot",
    stage: "apply",
    why: "A simple four-part recipe for asking AI clearly: your goal, the context, the source, and what you expect back.",
    access: "free",
    lastVerifiedAt: CHECKED,
  },
  "copilot-best-practices": {
    id: "copilot-best-practices",
    title: "Best practices for using GitHub Copilot",
    provider: "GitHub Docs",
    url: "https://docs.github.com/en/copilot/get-started/best-practices",
    stage: "apply",
    why: "What AI coding assistants are good and bad at, how to give them context, and how to check their code. Useful whichever assistant you use.",
    access: "free",
    lastVerifiedAt: CHECKED,
  },
  "claude-code-best-practices": {
    id: "claude-code-best-practices",
    title: "Best practices for Claude Code",
    provider: "Anthropic",
    url: "https://code.claude.com/docs/en/best-practices",
    stage: "apply",
    why: "How to work with an AI agent on a real codebase: plan first, keep changes small, and let tests prove the result.",
    access: "free",
    lastVerifiedAt: CHECKED,
  },
  "jagged-frontier": {
    id: "jagged-frontier",
    title: "Centaurs and Cyborgs on the Jagged Frontier",
    provider: "Ethan Mollick, One Useful Thing",
    url: "https://www.oneusefulthing.org/p/centaurs-and-cyborgs-on-the-jagged",
    stage: "verify",
    why: "A study of 758 consultants: AI made them faster and better on some tasks and less accurate on others. The reason you always check.",
    access: "free",
    lastVerifiedAt: CHECKED,
  },
  "excel-what-if": {
    id: "excel-what-if",
    title: "Introduction to What-If Analysis",
    provider: "Microsoft Support",
    url: "https://support.microsoft.com/en-us/excel/introduction-to-what-if-analysis",
    stage: "verify",
    why: "Scenarios, Goal Seek and Data Tables: where your numbers should actually be calculated and tested.",
    access: "free",
    lastVerifiedAt: CHECKED,
  },
  "owasp-llm": {
    id: "owasp-llm",
    title: "OWASP Top 10 for LLM Applications",
    provider: "OWASP",
    url: "https://genai.owasp.org/llm-top-10/",
    stage: "go_deeper",
    why: "The security checklist to read before you build anything that uses AI inside your own software.",
    access: "free",
    lastVerifiedAt: CHECKED,
  },
  "elements-of-ai": {
    id: "elements-of-ai",
    title: "Elements of AI",
    provider: "University of Helsinki and MinnaLearn",
    url: "https://www.elementsofai.com/",
    stage: "go_deeper",
    why: "A free, self-paced introduction to what AI is and is not. No programming or complicated maths.",
    access: "free",
    lastVerifiedAt: CHECKED,
  },
  "google-ai-essentials": {
    id: "google-ai-essentials",
    title: "Google AI Essentials",
    provider: "Google (on Coursera)",
    url: "https://grow.google/ai-essentials/",
    stage: "go_deeper",
    why: "A structured beginner course on using AI tools at work, with a certificate. No experience needed.",
    time: "Under 5 hours",
    access: "paid",
    lastVerifiedAt: CHECKED,
  },
  "ai-for-everyone": {
    id: "ai-for-everyone",
    title: "AI for Everyone",
    provider: "DeepLearning.AI (Andrew Ng)",
    url: "https://www.deeplearning.ai/courses/ai-for-everyone",
    stage: "go_deeper",
    why: "A non-technical course on what AI can and cannot do, and how organisations use it.",
    time: "About 7 hours",
    access: "paid_certificate",
    lastVerifiedAt: CHECKED,
  },
};

export const accessLabel: Record<Access, string> = {
  free: "Free",
  free_sign_in: "Free, sign-up needed",
  paid: "Paid (free trial available)",
  paid_certificate: "Certificate is paid; check access",
};

export const stageLabel: Record<Stage, string> = {
  understand: "Understand",
  apply: "Apply",
  verify: "Check",
  go_deeper: "Go deeper",
};

export const journeys: Record<string, Journey> = {
  developer: {
    slug: "developer",
    role: "Developer",
    headline: "AI readiness for developers",
    promise:
      "Use AI to understand code, write tests and debug faster, in whatever language you work in. No machine-learning degree needed.",
    useCases: [
      "Understanding an unfamiliar codebase or a confusing function",
      "Drafting test cases, including the edge cases you might miss",
      "Explaining an error and suggesting what to check first",
    ],
    firstAction: {
      title: "Ask AI to explain and test a piece of code you already know",
      minutes: "15 minutes",
      steps: [
        "Pick a short function you understand well, from a personal or open-source project. Any language works. Do not use your employer's code unless your company allows it.",
        "Paste the prompt below into an AI assistant, followed by the code.",
        "Compare its explanation with what the code really does. Run or write two of the tests it suggests.",
        "Write down one thing it got right and one thing it missed or got wrong.",
      ],
      prompt:
        "I'll paste a short piece of code below. Please:\n1. Explain in plain English what it does.\n2. List the assumptions it makes about its inputs.\n3. Suggest five test cases, including edge cases.\n4. Point out anything that looks like a bug.\nIf you're unsure about something, say so instead of guessing.\n\n[paste your code here]",
    },
    verify: [
      "Does the explanation match what the code actually does?",
      "Do the suggested tests run, and do they test something meaningful?",
      "Did it invent functions, libraries or options that do not exist?",
      "Have you thought about security and licensing before using any generated code?",
      "Would you approve this change if a colleague had written it?",
    ],
    evidence:
      "A small set of tests you reviewed and kept, or a code path you now understand and could explain to a colleague.",
    nextTask: {
      title: "Use AI on one real, small change",
      steps: [
        "Pick a small bug fix or feature in a project you are allowed to use AI on.",
        "Ask the assistant for a plan before any code, and correct the plan if you disagree.",
        "Have it write a failing test first, then the change. Keep the change small.",
        "Review the result as you would a colleague's pull request, and note where AI saved time and where it did not.",
      ],
    },
    resourceIds: ["ai-fluency", "copilot-best-practices", "claude-code-best-practices", "jagged-frontier"],
    deeper: [
      {
        label: "Intro to Large Language Models (Andrej Karpathy)",
        href: "https://www.youtube.com/watch?v=zjkBMFhNj_g",
        note: "A free one-hour talk on how these models work and why they get things wrong. Best once you have tried the first task.",
      },
      {
        label: "The 8-week advanced engineering plan",
        href: "/ai-readiness/software-developer",
        note: "Build a neural network from scratch, ship an AI feature with tests, run models locally. Examples use C, C++ and Python.",
      },
      {
        label: "OWASP Top 10 for LLM Applications",
        href: "https://genai.owasp.org/llm-top-10/",
        note: "Read this before building AI into your own software.",
      },
    ],
    lastReviewedAt: CHECKED,
  },
  "pricing-finance": {
    slug: "pricing-finance",
    role: "Pricing & Finance",
    headline: "AI readiness for pricing and finance professionals",
    promise:
      "Use AI to explore pricing questions, explain trends and draft management updates, while every number stays in your spreadsheet.",
    useCases: [
      "Finding questions worth investigating in a pricing or margin report",
      "Turning an analysis into a clear summary for leadership",
      "Drafting price-change letters and FAQs for the sales team",
    ],
    firstAction: {
      title: "The 15-minute trap test: does your AI miss the real story?",
      minutes: "15 minutes",
      steps: [
        "Download the small practice dataset below. The numbers are made up, so it is safe to use in any AI tool.",
        "Paste it into an AI assistant your company allows, and ask the first question in the prompt below.",
        "Then ask the second question and compare its numbers with the answer key.",
        "Note whether it led with \"revenue grew\" and missed that profit fell.",
      ],
      prompt:
        "Question 1: Here is a small sales table. How did Q2 go compared with Q1?\n\nQuestion 2: Now calculate total revenue (realised price x units) and total contribution ((realised price - variable cost) x units) for each quarter. Show your working.\n\n[paste the table here]",
      download: { label: "Download practice data (CSV)", href: "/ai-readiness/pricing-manager-data.csv" },
      answerKey: [
        "Revenue: 237,000 in Q1, 241,300 in Q2 (up 4,300)",
        "Contribution: 82,000 in Q1, 78,130 in Q2 (down 3,870)",
        "Why: product A's discount deepened from 8% to 12% while its unit cost rose",
      ],
    },
    verify: [
      "Do the totals match your spreadsheet? Recalculate anything important yourself.",
      "Are the assumptions and units stated, or did the AI fill gaps silently?",
      "Did it separate facts from its own suggestions?",
      "Was any customer, contract or confidential pricing data kept out of unapproved tools?",
      "Is a qualified person making the final pricing decision?",
    ],
    evidence:
      "A checked summary of a trend, or a better list of questions to investigate, with every number reconciled to the source.",
    nextTask: {
      title: "Let AI design the analysis, and let your spreadsheet do the maths",
      steps: [
        "Using the same practice data, ask AI to design (not calculate) a price-volume-mix bridge: the layout and the Excel formulas.",
        "Build it in Excel and compare your results with the answer key below.",
        "Ask AI for three possible explanations of the result, then check each one against the data.",
      ],
      answerKey: [
        "Price effect: -4,100 (price change x Q2 units)",
        "Volume effect: +15,082",
        "Mix effect: -6,682",
        "Together: +4,300, the total revenue change",
      ],
    },
    resourceIds: ["ai-fluency", "copilot-prompts", "excel-what-if", "jagged-frontier"],
    deeper: [
      {
        label: "The 8-week field plan for pricing managers",
        href: "/ai-readiness/pricing-manager",
        note: "Price leakage analysis, scenario modelling, negotiation rehearsal and a leadership memo.",
      },
      {
        label: "Google AI Essentials",
        href: "https://grow.google/ai-essentials/",
        note: "A structured paid course if you want a certificate.",
      },
    ],
    lastReviewedAt: CHECKED,
  },
  general: {
    slug: "general",
    role: "Any professional",
    headline: "AI readiness for any professional",
    promise:
      "Start with one safe, everyday task and learn to use AI thoughtfully. No coding, no jargon.",
    useCases: [
      "Making a draft email or document clearer",
      "Turning messy notes into a meeting agenda or summary",
      "Preparing questions before an important conversation",
    ],
    firstAction: {
      title: "Improve something you wrote, and check what AI changed",
      minutes: "15 minutes",
      steps: [
        "Pick a short, non-confidential piece of your own writing: an email, a post or a set of notes.",
        "Paste the prompt below into an AI assistant, followed by your text.",
        "Read its version carefully. Did it keep your meaning? Did it add anything that is not true?",
        "Keep the parts that helped, fix the rest, and note what worked.",
      ],
      prompt:
        "Here is a draft I wrote for [who it is for]. Please suggest a clearer version that keeps my meaning. Then list what you changed and why. If anything is unclear, ask me before guessing.\n\n[paste your text here]",
    },
    verify: [
      "Is the meaning still yours, or did it change the message?",
      "Did it add facts, names or numbers that are not true?",
      "Is the tone right for the person reading it?",
      "Did you keep personal and confidential information out of the tool?",
    ],
    evidence:
      "One piece of everyday work done faster or better, and a clear sense of where AI helped and where it did not.",
    nextTask: {
      title: "Turn one weekly task into a reusable prompt",
      steps: [
        "Pick a task you repeat every week, such as a status update or meeting summary.",
        "Write a prompt for it that includes who it is for, what good looks like and an example.",
        "Use it three times, and note the time it saved and what you still had to fix.",
      ],
    },
    resourceIds: ["ai-fluency", "copilot-prompts", "jagged-frontier"],
    deeper: [
      {
        label: "Elements of AI",
        href: "https://www.elementsofai.com/",
        note: "A free university course on what AI is, with no programming.",
      },
      {
        label: "Google AI Essentials",
        href: "https://grow.google/ai-essentials/",
        note: "A structured paid course if you want a certificate.",
      },
      {
        label: "AI for Everyone",
        href: "https://www.deeplearning.ai/courses/ai-for-everyone",
        note: "Andrew Ng's non-technical course; the certificate is paid.",
      },
    ],
    lastReviewedAt: CHECKED,
  },
};

export const journeyOrder = ["developer", "pricing-finance", "general"];
