# Source verification report: AI Readiness for Pricing Managers

**Status:** DRAFT for owner review. Nothing here is published.
**Checked on:** 10 October 2026
**Method:** each URL fetched directly (HTTP status, final URL after redirects, page title). Where a specific claim is attached, the page content was read to confirm it supports the claim.

## Verification levels

| Level | Meaning |
|---|---|
| S0 | [Centaurs and Cyborgs on the Jagged Frontier](https://www.oneusefulthing.org/p/centaurs-and-cyborgs-on-the-jagged) (Ethan Mollick, co-author of the BCG/Harvard field experiment) | 200 | content_verified | 758 BCG consultants; inside the frontier 12.2% more tasks, 25.1% faster, ~40% higher quality; outside it, correct 60-70% with AI vs 84% without. Primary HBS/SSRN pages block automated access, so the co-author's write-up is cited. Working paper, not peer-reviewed at the time of the post |
| `content_verified` | Page opened, title matches, and the specific claim we use was confirmed in the page text |
| `title_verified` | Page opened and the title matches the topic; the detailed content was not checked line by line |
| `url_accessible_content_unverified` | URL opens but the content could not be read (e.g. compressed PDF); do not rely on it for specific claims |
| `rejected` | Broken, wrong, gated or not authoritative enough |

## Accepted sources

| ID | Source | Publisher | HTTP | Level | Claim it supports in the guide |
|---|---|---|---|---|---|
| S1 | [AI Risk Management Framework (AI RMF 1.0)](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10) | NIST | 200 | content_verified | A voluntary, non-sector-specific framework for managing AI risk; published 26 Jan 2023 |
| S2 | [AI RMF: Generative AI Profile (NIST AI 600-1)](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence) | NIST | 200 | content_verified (landing page) | A companion resource to AI RMF 1.0 for generative AI, voluntary use; published 26 Jul 2024. The PDF itself opened but its text could not be extracted, so the guide does **not** quote its risk list |
| S3 | [3.1 Contribution margin, CM per unit, CM ratio](https://openstax.org/books/principles-managerial-accounting/pages/3-1-explain-contribution-margin-and-calculate-contribution-margin-per-unit-contribution-margin-ratio-and-total-contribution-margin) | OpenStax (Rice University) | 200 | title_verified | Definitions of contribution margin and CM ratio (glossary wording confirmed via the chapter key-terms page) |
| S4 | [3.2 Break-even point in units and dollars](https://openstax.org/books/principles-managerial-accounting/pages/3-2-calculate-a-break-even-point-in-units-and-dollars) | OpenStax | 200 | title_verified | Break-even = fixed costs / CM per unit (units) or / CM ratio (dollars) |
| S5 | [3.3 Break-even sensitivity analysis](https://openstax.org/books/principles-managerial-accounting/pages/3-3-perform-break-even-sensitivity-analysis-for-a-single-product-under-changing-business-situations) | OpenStax | 200 | title_verified | Practising what-if changes to price, cost and volume |
| S6 | [5.1 Price elasticity of demand and supply](https://openstax.org/books/principles-economics-2e/pages/5-1-price-elasticity-of-demand-and-price-elasticity-of-supply) | OpenStax | 200 | content_verified | Elasticity = % change in quantity / % change in price; midpoint method |
| S7 | [Introduction to What-If Analysis](https://support.microsoft.com/en-us/excel/introduction-to-what-if-analysis) | Microsoft Support | 200 | content_verified | Excel has three what-if tools: Scenarios, Goal Seek, Data Tables |
| S8 | [Switch between sets of values by using scenarios](https://support.microsoft.com/en-us/excel/switch-between-various-sets-of-values-by-using-scenarios) | Microsoft Support | 200 | content_verified | Scenario Manager: Data > What-If Analysis > Scenario Manager > Add |
| S9 | [Use Goal Seek](https://support.microsoft.com/en-us/excel/use-goal-seek-to-find-the-result-you-want-by-adjusting-an-input-value) | Microsoft Support | 200 | content_verified | Goal Seek changes one input; use Solver for more than one |
| S10 | [Get started writing prompts in Microsoft Copilot](https://support.microsoft.com/en-us/microsoft-365-copilot/get-started-writing-prompts-in-microsoft-365-copilot) | Microsoft Support | 200 (redirected from the older "Learn about Copilot prompts" URL) | content_verified | A prompt can include goal, context, source and expectations; review and verify responses |
| S11 | [Prompt engineering overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview) | Anthropic | 200 | content_verified | Define success criteria and a way to test them before refining prompts |
| S12 | [Prompt design strategies](https://ai.google.dev/gemini-api/docs/prompting-strategies) | Google | 200 | title_verified | General prompting guidance (listed as optional reading only) |
| S13 | [A quantifiable approach to price volume mix analysis](https://www.fticonsulting.com/insights/white-papers/quantifiable-approach-price-volume-mix-analysis) | FTI Consulting | 200 | content_verified | Defines price, volume and mix effects. Consultancy white paper, not academic; page shows a newsletter sign-up prompt |

## Rejected sources

| Source | Reason |
|---|---|
| `openstax.org/books/principles-of-accounting-2e/pages/3-1-...` and `.../3-2-...` (the URLs in the original spec) | **404.** The content moved to the *Principles of Managerial Accounting* book; replaced by S3 and S4 |
| A university-subdomain page presenting "Revenue = Price x Volume x Mix" | Formula is wrong (PVM splits a *change* in revenue into effects) |
| Vendor PVM eBook | Gated behind a download form |
| Third-party 2026 "prompt engineering best practices" blogs | Not primary sources; contained statistics we could not verify |
| Third-party Excel tutorial sites | Microsoft's own pages cover the same steps (S7 to S9) |

## Known gaps (for owner review)

1. **No open-textbook source for price-volume-mix analysis was found.** S13 (a consultancy) is the best available; the guide labels it as such and the worked example is calculated in our own synthetic data, not taken from S13.
2. **PVM conventions differ.** S13 defines price effect against prior-period volume; our worked example uses current-period volume. Both reconcile to the total change. The guide states which convention it uses.
3. **S2's detailed risk list is not quoted** because the PDF text could not be read in this run.
4. **S3 to S5 and S12 are title-verified only.** Fine for "read this next" links; do not attach precise claims to them without a content check.
5. **All worked-example numbers** come from `synthetic-pricing-data.csv`, calculated by a script, not by an AI model.
