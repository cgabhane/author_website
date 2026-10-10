# AI Readiness Navigator: resource verification record

**Last checked:** 10 October 2026 (links re-checked 14:15 UTC). Source of truth for the data in `client/src/lib/aiReadiness/data.ts`.
**Rule:** a duration or cost is shown on the site only when the provider's own page states it. Otherwise the card shows no duration.

| Resource (id) | URL | HTTP | Access shown on site | Evidence for access | Duration shown | Evidence for duration | Used in |
|---|---|---|---|---|---|---|---|
| AI Fluency: Framework & Foundations (`ai-fluency`) | https://anthropic.skilljar.com/ai-fluency-framework-foundations | 200 | Free, sign-up needed | Course page button reads "Register \| FREE" | none | Page does not state a duration | Developer, Pricing & Finance, General (Understand) |
| Get started writing prompts (`copilot-prompts`) | https://support.microsoft.com/en-us/microsoft-365-copilot/get-started-writing-prompts-in-microsoft-365-copilot | 200 | Free | Public support article | none | Not stated | Pricing & Finance, General (Apply) |
| Best practices for using GitHub Copilot (`copilot-best-practices`) | https://docs.github.com/en/copilot/get-started/best-practices | 200 | Free | Public documentation | none | Not stated | Developer (Apply) |
| Best practices for Claude Code (`claude-code-best-practices`) | https://code.claude.com/docs/en/best-practices | 200 | Free | Public documentation (the older anthropic.com/engineering URL redirects here) | none | Not stated | Developer (Apply) |
| Introduction to What-If Analysis (`excel-what-if`) | https://support.microsoft.com/en-us/excel/introduction-to-what-if-analysis | 200 | Free | Public support article | none | Not stated | Pricing & Finance (Check) |
| Centaurs and Cyborgs on the Jagged Frontier (`jagged-frontier`) | https://www.oneusefulthing.org/p/centaurs-and-cyborgs-on-the-jagged | 200 | Free | Public article by Ethan Mollick, co-author of the study | none | Not stated | All paths (Check) |
| OWASP Top 10 for LLM Applications (`owasp-llm`) | https://genai.owasp.org/llm-top-10/ | 200 | Free | Public project page | none | Not stated | Developer (Go deeper) |
| Intro to Large Language Models, Andrej Karpathy (Go deeper link) | https://www.youtube.com/watch?v=zjkBMFhNj_g | 200 | Free | Public YouTube video | "one-hour" | Video title: "[1hr Talk] Intro to Large Language Models" | Developer (Go deeper) |
| Elements of AI (`elements-of-ai`) | https://www.elementsofai.com/ | 200 | Free | Site describes both courses as free; Part 1 needs no programming | none | Site says "at your own pace", no duration | General (Go deeper) |
| Google AI Essentials (`google-ai-essentials`) | https://grow.google/ai-essentials/ | 200 | Paid (free trial available) | US/Canada: $49 USD per month after a 7-day free trial; may be lower elsewhere | Under 5 hours | Page states "<5 hours to complete" | Pricing & Finance, General (Go deeper) |
| AI for Everyone (`ai-for-everyone`) | https://www.deeplearning.ai/courses/ai-for-everyone | 200 | Certificate is paid; check access | FAQ: "$49 for 180 days of certificate eligibility". Free viewing not stated, so the site says "check access" | About 7 hours | Page states 6 hours 54 minutes | General (Go deeper) |

## Not used, and why

| Candidate | Reason |
|---|---|
| Microsoft Learn "Introduction to generative AI and agents" | Prerequisites assume AI and machine-learning familiarity; too technical for the starting path |
| Karpathy talk as a starting resource | Moved to Go deeper on owner review: too technical as a first step for beginners |
| Coursera listings for AI for Everyone / Google AI Essentials | Same courses; linked to the providers' own pages instead |
