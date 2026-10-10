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
    title: "AI Readiness for Pricing Managers: An 8-Week Practical Plan",
    description:
      "A beginner-friendly 8-week plan for pricing managers to use AI safely for margin analysis, scenario modelling and management reporting, with exercises and checked sources.",
    weeks: 8,
  },
  {
    slug: "software-developer",
    role: "Software Developer (C, C++, Python)",
    roleFamily: "engineering",
    title: "AI Readiness for Experienced Software Developers (C, C++, Python): An 8-Week Plan",
    description:
      "A practical 8-week plan for experienced C, C++ and Python developers to get AI-ready: AI pair programming, neural networks from scratch, building with LLM APIs, and local inference in C/C++.",
    weeks: 8,
  },
];
