---
title: "AI Readiness for Pricing Managers: An 8-Week Field Plan"
slug: pricing-manager
seo_title: "AI for Pricing Managers: An 8-Week Field Plan for Experienced Pricing Professionals | Chetan Gabhane"
seo_description: "A practical 8-week plan for experienced pricing managers: where AI genuinely helps in price waterfalls, scenario modelling, negotiation prep and leadership memos, and where it will quietly mislead you."
canonical_url: "https://chetangabhane.in/ai-readiness/pricing-manager"
author: Chetan Gabhane
status: published
visibility: public_role_page
depth: deep
weeks: 8
created_at: 2026-10-10
last_source_check_at: 2026-10-10
---

# AI Readiness for Pricing Managers: An 8-Week Field Plan

You do not need another AI course. You have spent years learning how price, volume, cost and customer behaviour really interact, and no language model knows your market the way you do.

What you need is a precise answer to two questions:

1. **Where does AI genuinely make a pricing professional faster and sharper?**
2. **Where will it confidently produce something wrong, in a way that only shows up when the CFO asks a follow-up question?**

That second question is not theoretical. In a field experiment with 758 BCG consultants, people using AI on tasks *inside* its capabilities completed 12.2% more tasks, 25.1% faster, with about 40% higher quality. On a task just *outside* those capabilities, the people using AI got the answer right noticeably less often: roughly 60–70% of the time, against 84% for those working without it [S0]. The researchers called this boundary the **jagged frontier**, because it is uneven and hard to see.

This plan is about mapping that frontier for pricing work, using your own expertise as the judge.

**Time:** about 3 hours a week for 8 weeks. **Tools:** Excel plus whichever AI assistant your company has approved. **Assumption:** you know pricing better than any AI. This plan never teaches you pricing; it teaches you what AI does to it.

---

## Do this today: the 30-minute trap test

Before you read anything else, find out how your AI assistant behaves on a pricing question.

1. Open an approved AI assistant and paste this **synthetic** data (or [download it as a CSV](/ai-readiness/pricing-manager-data.csv)):

| period | product | list price | realised price | units | variable cost / unit |
|---|---|---|---|---|---|
| Q1 | A | 100 | 92 | 1,000 | 60 |
| Q1 | B | 250 | 230 | 300 | 170 |
| Q1 | C | 40 | 38 | 2,000 | 22 |
| Q2 | A | 100 | 88 | 1,150 | 61 |
| Q2 | B | 260 | 240 | 260 | 172 |
| Q2 | C | 40 | 37 | 2,100 | 23 |

2. Ask it one question, exactly as a busy executive would: *"How did Q2 go compared with Q1?"*
3. Score the answer against the facts below, which were calculated in a spreadsheet:

| | Q1 | Q2 | Change |
|---|---|---|---|
| Revenue | 237,000 | 241,300 | **+4,300** |
| Contribution | 82,000 | 78,130 | **−3,870** |
| Contribution margin | 34.6% | 32.4% | −2.2 pts |
| Weighted discount off list | 7.1% | 9.5% | +2.4 pts |

**Did it lead with "revenue grew"?** Many assistants will, because the question did not ask about margin. Revenue did grow. The business still made less money, because product A's discount deepened from 8% to 12% while its unit cost rose.

Keep a note of what happened. You have just seen the jagged frontier in your own field, and every exercise below builds on it.

---

## What to ignore (so you can save your time)

- **"AI pricing engines will replace pricing managers."** The interesting work, deciding what the business should do and convincing people, is exactly where AI is weakest.
- **Buying a tool before you have a use case.** Start with the assistant you already have. Buy only when a workflow is proven.
- **Long lists of "magic prompts".** Clear context and a clear question beat any trick.
- **Learning to build machine-learning models.** Useful for data scientists; not needed to be an AI-ready pricing leader.
- **Certificates as proof.** Your evidence is better work, delivered faster. Track it.

---

## Your pricing week, mapped against the frontier

| Usually inside the frontier (use freely, check lightly) | On the edge (useful, verify carefully) | Outside it (keep human and deterministic) |
|---|---|---|
| Drafting price-increase letters and sales FAQs | Writing Excel formulas for a price waterfall | Calculating final numbers |
| Summarising public competitor announcements | Spotting patterns in discount data | Choosing an elasticity value |
| Structuring a pricing memo for leadership | Clustering win/loss notes into themes | The final pricing decision |
| Role-playing a tough procurement negotiation | Explaining a price-volume-mix result | Anything involving confidential deal data in an unapproved tool |
| Turning analysis into plain language for sales | Suggesting hypotheses for margin erosion | Anything that could look like coordinating prices with competitors: involve legal |

Treat this map as a starting hypothesis. Your job over eight weeks is to redraw it from your own evidence.

---

## Sprint 1 (Weeks 1–2): Quick wins and your operating rules

**The job:** win back time on the communication-heavy tasks that eat your week.

**Build:** a personal prompt library for five tasks you do every month. Suggestions: a price-increase letter to key accounts, an internal FAQ for sales on a new price list, a one-page competitor brief from public sources, a summary of a deal-review discussion, and an executive summary of a pricing analysis.

**Field notes from practice:**
- Give the model what you would give a new analyst: the audience, the purpose, the constraints and an example of what good looks like. Microsoft's guidance frames this as goal, context, source and expectations [S10].
- Ask it to **ask you three questions before it writes anything**. The quality jump is immediate.
- End every request with: *"What in this draft would a sceptical CFO challenge?"* It is the cheapest review you will ever get.
- Keep the best version of each prompt. In two weeks you will have a reusable asset your team will ask for.

**Checkpoint:** one recurring task that now takes half the time at the same quality. Time it; do not guess.

**The trap experienced people fall into:** fluency. A beautifully written letter with one wrong date or a misstated term is worse than a rough draft, because nobody re-reads polished text.

---

## Sprint 2 (Weeks 3–4): AI as your analyst's analyst

**The job:** go deeper on margin erosion and price leakage, faster, without delegating arithmetic to a language model.

**The working rule:** *AI writes the formula, Excel does the maths.* Ask the assistant to design the calculation, then you run it.

**Build:**
1. Using the synthetic dataset, ask the assistant to propose the Excel formulas and layout for a simple **price waterfall** (list price to realised price) and a **price-volume-mix** bridge. Build it in Excel.
2. Check your bridge. In this guide's convention (price effect at current volume) the answers are: price **−4,100**, volume **+15,082**, mix **−6,682**, totalling the +4,300 revenue change. Conventions differ between organisations; FTI Consulting's white paper explains one widely used approach [S13]. Use your finance team's convention if you have one.
3. Now ask the assistant for **three hypotheses** that explain the results, and test each one against the data. Then ask it to **argue against your preferred explanation**.

**Field notes from practice:**
- Paste results, not raw customer data. Aggregated, anonymised summaries are usually enough for the AI to help.
- Ask for the formula *and* a one-line explanation of each step. You will catch logic errors in the explanation that you would miss in the formula.
- Keep a log of AI suggestions you accepted, changed or rejected. After two weeks it tells you exactly where AI helps your analysis.

**Checkpoint:** a workbook that reconciles to the source data, and a findings list where every claim points to a number.

**The trap:** the persuasive story. AI is very good at narratives that fit the data loosely. Correlation, seasonality, mix shifts and data errors can all produce the same chart.

---

## Sprint 3 (Weeks 5–6): Scenarios and negotiation rehearsal

**The job:** prepare for pricing decisions and the conversations that follow them.

**Build, part one: a transparent scenario model.** Take product A in Q2 (price 88, 1,150 units, variable cost 61). Keep inputs separate from formulas and model a price change under different volume assumptions:

| Scenario | Price change | Assumed volume change | Contribution | vs. baseline |
|---|---|---|---|---|
| Baseline | 0% | 0% | 31,050 | — |
| Price up, demand holds fairly well | +5% | −7.5% | 33,402 | +2,352 |
| Price up, demand falls sharply | +5% | −15% | 30,694 | −356 |
| Deeper discount | −5% | +7.5% | 27,939 | −3,111 |

The same +5% move can help or hurt depending on one assumption. Elasticity (the percentage change in quantity for a percentage change in price [S6]) belongs in your model as a **range you test**, never a number an AI hands you. Excel's Scenario Manager stores and switches input sets [S8]; Goal Seek finds, for example, the volume loss at which a price rise stops paying off [S9].

**Build, part two: negotiation rehearsal.** Ask the assistant to play the head of procurement at a key account receiving a 5% increase. Tell it to be difficult: threaten to dual-source, quote a competitor, demand a phased increase. Run the conversation for ten minutes. Then ask it to **critique your answers** and suggest stronger ones.

**Field notes from practice:**
- Give the role-play real texture: the customer's situation, their likely pressures, what you can and cannot concede.
- Run it twice: once where you hold the line, once where you trade. Compare.
- Use the same technique for internal stakeholders: a sales director who wants a bigger discount budget is good practice too.

**Checkpoint:** a scenario model someone else can re-run by changing one cell, and one rehearsed negotiation with notes on what you would say differently.

**The trap:** an invented elasticity. If an AI gives you a precise number with no source, treat it as made up.

---

## Sprint 4 (Weeks 7–8): The leadership memo and teach-back

**The job:** turn analysis into a decision, then multiply your learning across the team.

**Capstone:** answer one question on synthetic or explicitly approved data, for example *"Should we reduce the discount on product A next quarter?"*

1. Build the baseline and at least two scenarios. Check every number in Excel.
2. Ask the AI to draft a one-page memo: recommendation, options, trade-offs, risks and data gaps.
3. Rewrite it in your own voice. The AI's draft is scaffolding, not the building.
4. Ask the AI to act as your CFO and attack the memo. Fix what survives the attack.
5. State your confidence level and **what evidence would change your recommendation.**

**Teach-back:** run a 30-minute session for your team. Show them the trap test, your prompt library and one before-and-after example. Teaching it is the fastest way to find the gaps in your own understanding, and it turns your eight weeks into a team capability.

**Suggested scorecard** (illustrative, not an industry standard):

| Criterion | Weight |
|---|---|
| Numbers correct and reconciled | 30% |
| Every claim traceable to data or a stated assumption | 20% |
| Scenarios transparent and reproducible | 15% |
| Commercial judgement and relevance | 15% |
| Clarity for leadership | 10% |
| Honest handling of risks and limits | 10% |

---

## Making it stick at work

- **Share your prompt library** with the pricing and sales-ops teams. Agree on which tasks it is approved for.
- **Write down your team's rules:** which tools, which data, who reviews what.
- **Measure something:** hours saved on a recurring task, turnaround time on deal reviews, or the number of memo revisions. Evidence wins budget; enthusiasm does not.
- **Revisit your frontier map every quarter.** The models improve, and some red cells will turn amber.

## Guardrails, briefly

Use only approved tools and approved data. Recalculate every number in a deterministic tool. Keep competitor-price discussions on the right side of competition law and involve legal when in doubt. The final pricing decision stays human. This plan builds skills; it does not promise savings, promotions or career outcomes.

## Resources

Last checked 10 October 2026. **If you only open three:** the jagged frontier write-up [S0], Microsoft's prompt guide [S10] and Excel's what-if tools [S7].

| Resource | Why it is on this list | When |
|---|---|---|
| [Centaurs and Cyborgs on the Jagged Frontier](https://www.oneusefulthing.org/p/centaurs-and-cyborgs-on-the-jagged) (Ethan Mollick, co-author of the BCG study) [S0] | The best evidence on where AI helps and hurts knowledge work | Week 1 |
| [Microsoft: Get started writing prompts in Copilot](https://support.microsoft.com/en-us/microsoft-365-copilot/get-started-writing-prompts-in-microsoft-365-copilot) [S10] | A simple, practical prompt structure | Week 1 |
| [Anthropic: Prompt engineering overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview) [S11] | Define what "good" looks like before you tune prompts | Week 2, optional |
| [FTI Consulting: A quantifiable approach to price volume mix analysis](https://www.fticonsulting.com/insights/white-papers/quantifiable-approach-price-volume-mix-analysis) [S13] | One clear PVM convention to compare yours against | Week 3 |
| [OpenStax: Price elasticity of demand](https://openstax.org/books/principles-economics-2e/pages/5-1-price-elasticity-of-demand-and-price-elasticity-of-supply) [S6] | A neutral reference for elasticity and the midpoint method | Week 5 |
| [Microsoft: Introduction to What-If Analysis](https://support.microsoft.com/en-us/excel/introduction-to-what-if-analysis) [S7] | Scenarios, Goal Seek and Data Tables in one place | Week 5 |
| [Microsoft: Scenario Manager](https://support.microsoft.com/en-us/excel/switch-between-various-sets-of-values-by-using-scenarios) [S8] | Step-by-step scenarios | Week 5 |
| [Microsoft: Goal Seek](https://support.microsoft.com/en-us/excel/use-goal-seek-to-find-the-result-you-want-by-adjusting-an-input-value) [S9] | Work backwards from a target | Week 5 |
| [NIST AI Risk Management Framework](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10) [S1] | Shared vocabulary for AI risk when you talk to IT, legal or audit | Optional |

---

*Written by Chetan Gabhane. Last updated 10 October 2026. Spotted an error or a broken link? [Contact me](https://chetangabhane.in/#contact).*
