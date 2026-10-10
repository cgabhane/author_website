// Published AI-readiness guides. Content lives in client/public/ai-readiness/<slug>.md
// so the server can prerender the same file for crawlers (see server/static.ts PAGES).
export interface AiReadinessGuide {
  slug: string;
  role: string;
  roleFamily: string;
  title: string;
  description: string;
  weeks: number;
}

export const aiReadinessGuides: AiReadinessGuide[] = [
  {
    slug: "pricing-manager",
    role: "Pricing Manager",
    roleFamily: "finance_commercial",
    title: "AI Readiness for Pricing Managers: An 8-Week Field Plan",
    description:
      "For experienced pricing managers: where AI genuinely helps in price waterfalls, scenario modelling, negotiation prep and leadership memos, and where it will quietly mislead you.",
    weeks: 8,
  },
  {
    slug: "software-developer",
    role: "Senior Software Developer (C, C++, Python)",
    roleFamily: "engineering",
    title: "AI Readiness for Senior C, C++ and Python Developers: An 8-Week Engineering Plan",
    description:
      "An honest plan for experienced developers: agentic coding done properly, neural networks from first principles, shipping LLM features with evals, and local inference in C/C++.",
    weeks: 8,
  },
];
