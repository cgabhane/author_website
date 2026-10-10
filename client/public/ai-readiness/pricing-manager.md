---
title: "AI Readiness for Pricing Managers: An 8-Week Practical Plan"
slug: pricing-manager
seo_title: "AI for Pricing Managers: An 8-Week Practical Plan | Chetan Gabhane"
seo_description: "A beginner-friendly 8-week plan for pricing managers to use AI safely for margin analysis, scenario modelling and management reporting, with exercises and checked sources."
canonical_url: "https://chetangabhane.in/ai-readiness/pricing-manager"
author: Chetan Gabhane
status: published
visibility: public_role_page
depth: deep
weeks: 8
created_at: 2026-10-10
last_source_check_at: 2026-10-10
---

# AI Readiness for Pricing Managers: An 8-Week Practical Plan

**Outcome:** in eight weeks, at about 3 hours a week, you will be able to use an AI assistant to speed up pricing analysis, while proving every number with a spreadsheet and presenting a recommendation your management can trust.

## Who this is for

- Pricing managers and analysts who are new to AI tools.
- You already work with prices, discounts, costs and volumes in spreadsheets.
- You do **not** need to code.

**Assumptions:** this guide does not know your industry, your company's AI policy or which tools you are allowed to use. Where those matter, it tells you to check. Adapt the examples to your context.

## Start here: three rules

1. **AI suggests, the spreadsheet decides.** Language models explain, summarise and propose ideas well. They are not a reliable calculator. Every number goes through a deterministic tool like Excel.
2. **Synthetic or approved data only.** Never paste customer prices, contracts, unpublished pricing strategy or employer data into a tool your company has not approved.
3. **You own the decision.** AI can draft the memo. A human makes the pricing call.

## Where AI helps a pricing manager

| Task | What AI is good for | What must stay with you and your spreadsheet |
|---|---|---|
| Margin reviews | Spotting patterns worth checking, drafting hypotheses | Calculating margin, discount and contribution |
| Price-volume-mix analysis | Explaining what each effect means in plain language | The decomposition itself |
| Scenario modelling | Suggesting scenarios and questions to ask stakeholders | Elasticity assumptions and the model's arithmetic |
| Management reporting | First drafts of memos, slide outlines, executive summaries | Final numbers, confidence and recommendation |
| Learning | Explaining a concept you half-remember | Checking it against a trusted textbook |

## Skills map

| Skill | Week | Evidence you have it |
|---|---|---|
| Safe AI use and verification | 1–2 | You can name what AI gets wrong and how you would check it |
| Structured prompting | 1–2 | A personal prompt library of 5+ tested prompts |
| Margin and contribution analysis | 3–4 | A workbook whose totals reconcile to the source data |
| Price-volume-mix thinking | 3–4 | You can explain why revenue rose while contribution fell |
| Scenario and sensitivity modelling | 5–6 | Baseline, upside and downside scenarios with an assumptions log |
| Executive communication | 7–8 | A one-page brief a manager can act on |

---

## Weeks 1–2: AI fundamentals, safe use and choosing tasks

**Goal:** know what AI can and cannot do, and pick three low-risk tasks to practise on.

### Exercise 1.1: Learn a prompt structure (45 min)

- **Objective:** write prompts that give useful, checkable answers.
- **Steps:** Microsoft suggests a prompt can carry a **goal, context, source and expectations** [S10]. Add one more line of your own: **how you will verify the answer**. Write 5 prompts for pricing tasks using that pattern and save them.
- **Example prompt:** *"Goal: explain the difference between gross margin and contribution margin. Context: I am a pricing manager refreshing basics. Expectations: under 200 words, one numeric example. Verification: show the formula so I can check it in Excel."*
- **Deliverable:** a prompt library (a simple document is fine).
- **Validation:** each prompt produces an answer you could check against a source or a spreadsheet.

### Exercise 1.2: Catch the AI out (45 min)

- **Objective:** see verification failures first-hand.
- **Steps:** paste the small synthetic table from Exercise 3.1 into an approved AI assistant. Ask it to calculate total revenue and contribution for each quarter. Then calculate the same in Excel.
- **Deliverable:** a note of every place the AI's answer and Excel's answer differ.
- **Validation:** you can explain why you would never put an AI-calculated number in front of management unchecked.

### Exercise 1.3: Task inventory and risk checklist (60 min)

- **Objective:** choose where to start.
- **Steps:** list 10 recurring tasks from a typical month. Mark each one for *data sensitivity* (low/medium/high) and *checkability* (easy/hard). Pick three tasks that are low sensitivity and easy to check.
- **Deliverable:** a one-page AI opportunity map with 3 candidate tasks, and a risk checklist: customer data, contract terms, unpublished prices, competitor intelligence, personal data.
- **Further reading:** NIST's AI Risk Management Framework is a voluntary framework for thinking about AI risk [S1], and its Generative AI Profile is a companion resource for generative AI [S2]. You do not need to read them cover to cover; skim the overview for vocabulary.
- **Safety note:** if your company has an AI usage policy, read it now. It overrides this guide.

---

## Weeks 3–4: Margin and price-volume-mix analysis

**Goal:** use AI to *think* about margin data while the spreadsheet does the maths.

### Exercise 3.1: Build the workbook (90 min)

- **Objective:** a reproducible margin workbook.
- **Data:** use this synthetic dataset, or [download it as a CSV file](/ai-readiness/pricing-manager-data.csv).

| period | product | list price | realised price | units | variable cost / unit |
|---|---|---|---|---|---|
| Q1 | A | 100 | 92 | 1,000 | 60 |
| Q1 | B | 250 | 230 | 300 | 170 |
| Q1 | C | 40 | 38 | 2,000 | 22 |
| Q2 | A | 100 | 88 | 1,150 | 61 |
| Q2 | B | 260 | 240 | 260 | 172 |
| Q2 | C | 40 | 37 | 2,100 | 23 |

- **Steps:** in Excel, calculate for each row: revenue (realised price x units), discount % (1 − realised/list), contribution per unit (realised price − variable cost) and total contribution. Contribution margin is what is left from the selling price after variable costs [S3].
- **Check your answers:**

| | Q1 | Q2 | Change |
|---|---|---|---|
| Revenue | 237,000 | 241,300 | **+4,300** |
| Total contribution | 82,000 | 78,130 | **−3,870** |
| Contribution margin % | 34.6% | 32.4% | −2.2 pts |
| Weighted average discount | 7.1% | 9.5% | +2.4 pts |

- **Deliverable:** the workbook.
- **Validation:** your totals match the table above exactly.

### Exercise 3.2: Why did revenue rise but contribution fall? (60 min)

- **Objective:** explain a change, not just report it.
- **Steps:** split the revenue change into **price, volume and mix** effects. Price-volume-mix analysis separates a change in revenue into these components [S13]. In this guide's convention:
  - *Price effect* = change in realised price x current-period units, per product
  - *Volume effect* = change in total units x prior-period average price
  - *Mix effect* = the rest: the effect of selling a different blend of products
- **Check your answers:** price −4,100; volume +15,082; mix −6,682. Together they equal the +4,300 revenue change.
- **Then ask AI:** paste your results (not the raw data) and ask for three hypotheses that could explain them. Check each one against the data. For example, product A's discount went from 8% to 12% while its unit cost rose; does that support or contradict the AI's story?
- **Deliverable:** a findings list. For each finding: the evidence, the assumption and the caveat. Plus a log of which AI suggestions you **accepted, revised or rejected**, and why.
- **Validation:** every conclusion traces back to a number in your workbook.
- **Note:** PVM conventions differ between organisations. Use your finance team's convention if one exists.

---

## Weeks 5–6: Scenario modelling and decision support

**Goal:** build scenarios a reviewer can reproduce and challenge.

### Exercise 5.1: Baseline, upside, downside (90 min)

- **Objective:** see how assumptions drive outcomes.
- **Concept:** price elasticity of demand is the percentage change in quantity divided by the percentage change in price [S6]. You will rarely know it precisely, so treat it as an **assumption to vary**, never a fact.
- **Steps:** take product A in Q2 (price 88, 1,150 units, variable cost 61). Put the inputs in separate cells from the formulas. Model:

| Scenario | Price change | Assumed volume change | Contribution | vs. baseline |
|---|---|---|---|---|
| Baseline | 0% | 0% | 31,050 | — |
| Price up, demand holds fairly well | +5% | −7.5% | 33,402 | +2,352 |
| Price up, demand falls sharply | +5% | −15% | 30,694 | −356 |
| Deeper discount | −5% | +7.5% | 27,939 | −3,111 |

- **What this teaches:** the same +5% price move can help or hurt depending on one assumption. That assumption is what your management discussion should be about.
- **Tools:** Excel's Scenario Manager stores sets of input values you can switch between [S8]. Goal Seek finds the single input needed to hit a target, for example the price that keeps contribution flat [S9]. Data Tables show results across a range of values [S7].
- **Deliverable:** a scenario table, a sensitivity chart (contribution against assumed volume change) and an assumptions log.
- **Validation:** a colleague can change one input and get the same answer you did.

### Exercise 5.2: Break-even check (30 min)

- **Steps:** assume product A carries 20,000 of fixed cost. Break-even units = fixed cost / contribution per unit [S4]. At Q2 prices that is 20,000 / 27 = about 741 units. Re-run it for each scenario. OpenStax has a full walkthrough of break-even sensitivity [S5].
- **Use AI for:** drafting the questions you would ask sales and finance before trusting the volume assumption.
- **Do not use AI for:** inventing an elasticity number or choosing the final price.
- **Deliverable:** a short decision memo: options, trade-offs, risks and data gaps.

---

## Weeks 7–8: Executive communication and capstone

**Goal:** present an evidence-backed recommendation.

### Capstone (about 6 hours across two weeks)

1. Use the synthetic dataset, or data your company has explicitly approved for this purpose.
2. Pick one question, for example: *"Should we reduce the discount on product A next quarter?"*
3. Build a baseline and at least two scenarios.
4. Check all arithmetic in Excel.
5. Use AI to draft a one-page executive brief, then edit it yourself.
6. The brief must state: recommendation, confidence level, limitations, alternative explanations, and **what evidence would change your mind.**

### Suggested scorecard

This rubric is illustrative, not an industry standard.

| Criterion | Weight |
|---|---|
| Numerical correctness | 30% |
| Traceability to data and assumptions | 20% |
| Scenario transparency | 15% |
| Business relevance | 15% |
| Clarity for management | 10% |
| Risk and limitation handling | 10% |

---

## How to know it is working

- You catch at least one AI error per week in Weeks 1–4 (this is a good sign).
- Your workbooks reconcile to the source every time.
- Your prompt library grows and your prompts get shorter.
- A manager can read your brief in two minutes and knows what you recommend and why.

## Risks and guardrails

- **Confidential data:** only approved tools, only approved data.
- **Hallucinated numbers:** every number is recalculated in a spreadsheet.
- **False confidence:** scenarios show ranges, not a single "right" answer.
- **Decision accountability:** AI never makes the final pricing decision.
- **No guarantees:** this plan builds skills. It does not promise promotion, savings or career outcomes.

## Resources

Last checked 10 October 2026.

| Resource | Why it is useful | What to do with it |
|---|---|---|
| [NIST AI Risk Management Framework](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10) [S1] | A shared vocabulary for AI risk | Skim the overview in Week 1 |
| [NIST Generative AI Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence) [S2] | Companion resource for generative AI | Optional, Week 2 |
| [Microsoft: writing prompts in Copilot](https://support.microsoft.com/en-us/microsoft-365-copilot/get-started-writing-prompts-in-microsoft-365-copilot) [S10] | Simple prompt structure | Use in Exercise 1.1 |
| [Anthropic: prompt engineering overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview) [S11] | Define success criteria before refining prompts | Optional, Week 2 |
| [Google: prompt design strategies](https://ai.google.dev/gemini-api/docs/prompting-strategies) [S12] | Another vendor's view of prompting | Optional |
| [OpenStax: contribution margin](https://openstax.org/books/principles-managerial-accounting/pages/3-1-explain-contribution-margin-and-calculate-contribution-margin-per-unit-contribution-margin-ratio-and-total-contribution-margin) [S3] | Free textbook refresher | Before Exercise 3.1 |
| [OpenStax: break-even point](https://openstax.org/books/principles-managerial-accounting/pages/3-2-calculate-a-break-even-point-in-units-and-dollars) [S4] | Break-even formulas | Exercise 5.2 |
| [OpenStax: break-even sensitivity](https://openstax.org/books/principles-managerial-accounting/pages/3-3-perform-break-even-sensitivity-analysis-for-a-single-product-under-changing-business-situations) [S5] | What-if practice | Exercise 5.2 |
| [OpenStax: price elasticity](https://openstax.org/books/principles-economics-2e/pages/5-1-price-elasticity-of-demand-and-price-elasticity-of-supply) [S6] | Elasticity and the midpoint method | Exercise 5.1 |
| [FTI Consulting: price volume mix analysis](https://www.fticonsulting.com/insights/white-papers/quantifiable-approach-price-volume-mix-analysis) [S13] | Worked PVM explanation (consultancy white paper) | Exercise 3.2 |
| [Microsoft: Introduction to What-If Analysis](https://support.microsoft.com/en-us/excel/introduction-to-what-if-analysis) [S7] | Scenarios, Goal Seek, Data Tables | Week 5 |
| [Microsoft: Scenario Manager](https://support.microsoft.com/en-us/excel/switch-between-various-sets-of-values-by-using-scenarios) [S8] | Step-by-step scenarios | Exercise 5.1 |
| [Microsoft: Goal Seek](https://support.microsoft.com/en-us/excel/use-goal-seek-to-find-the-result-you-want-by-adjusting-an-input-value) [S9] | Work backwards from a target | Exercise 5.1 |

---

*Written by Chetan Gabhane. Last updated 10 October 2026. Spotted an error or a broken link? [Contact me](https://chetangabhane.in/#contact).*
