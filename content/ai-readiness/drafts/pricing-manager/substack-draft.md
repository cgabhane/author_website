---
status: draft (manual publish in Substack after owner review)
blueprint_link: https://chetangabhane.in/ai-readiness/pricing-manager  # live since 10 Oct 2026
source_ids: [S0, S6, S10, S13]
---

# Title options

1. **Revenue Went Up. Profit Went Down. Your AI Said "Great Quarter."**
2. The Jagged Frontier: Where AI Helps Pricing Managers, and Where It Quietly Misleads Them
3. AI Won't Replace Pricing Judgement. It Will Expose Who Doesn't Have It.

**Subtitle:** The real AI skill for experienced pricing professionals isn't prompting. It's knowing exactly where the tool stops being reliable.

**Excerpt (for social and email preview):** Ask an AI "how did Q2 go?" on a quarter where revenue rose and contribution fell, and there's a fair chance it leads with the good news. Research on 758 consultants shows why: AI makes experts better inside its frontier and worse just outside it. Here's how pricing managers can find that line.

---

# Article body

Picture a Monday morning review. A senior executive pastes last quarter's numbers into an AI assistant and asks a perfectly reasonable question: *"How did Q2 go compared with Q1?"*

The answer comes back fluent and upbeat. Revenue is up. Volume is up. A good quarter.

Except the business made less money. In the made-up example I use with pricing teams, revenue rises by 4,300 (about 2%) while contribution falls by 3,870 (about 5%), because one product's discount quietly deepened from 8% to 12% while its unit cost went up. Every number the AI quoted was true. The conclusion a reader would take away was wrong.

Nobody in that room would have made this mistake with a spreadsheet in front of them. The AI made it look like they didn't need one.

## The jagged frontier

The best evidence I know on this comes from a field experiment with 758 BCG consultants, run by researchers from Harvard, Wharton, MIT and elsewhere [S0].

On tasks that sat *inside* what the AI could do well, consultants using it completed 12.2% more tasks, 25.1% faster, with about 40% higher quality. Those are numbers any leadership team would sign off on.

Then they gave consultants a task deliberately chosen to sit just *outside* the AI's capabilities. Working without AI, consultants got it right 84% of the time. With AI, that fell to roughly 60–70%.

The researchers called the boundary the **jagged frontier**, because it doesn't follow intuition. Tasks that look hard can be easy for AI, and tasks that look easy can be exactly where it fails. Worse, you can't see the line from the output: the confident answer and the wrong answer look identical.

## Why pricing sits right on that frontier

Pricing work is unusual because it mixes three very different kinds of task in a single afternoon.

**The language work is mostly inside the frontier.** Drafting a price-increase letter, writing the sales FAQ for a new price list, summarising a competitor's public announcement, turning an analysis into five sentences a CFO will read. AI is genuinely good at this, and an experienced professional can check the output in seconds.

**The judgement work is firmly outside.** Which customers will accept an increase, what elasticity to assume, what the business should actually do. These depend on context no model has, and they're the decisions you're paid to own.

**The dangerous part is the middle.** Explaining a margin bridge. Spotting patterns in discount data. Suggesting why margin eroded. Here the AI is useful *and* occasionally, persuasively wrong. That's where experienced people get caught, precisely because the output sounds like something they'd have written themselves.

## Three habits of AI-ready pricing professionals

**1. AI writes the formula; the spreadsheet does the maths.** Ask the assistant to design your price-volume-mix bridge or price waterfall: the layout, the formulas, the logic. Then build it in Excel and let Excel calculate. You get the speed without delegating arithmetic to a system that was never built for it. (Bridge conventions differ between companies, so agree yours with finance; FTI Consulting has a clear write-up of one common approach [S13].)

**2. Make it play the sceptic.** End every draft request with: *"What in this would a sceptical CFO challenge?"* It's the cheapest review you'll ever get, and it catches the gaps you stopped seeing an hour ago.

**3. Rehearse the hard conversation.** Ask the assistant to play the head of procurement at your largest account, receiving a 5% increase, and tell it to be difficult. Ten minutes of rehearsal, then ask it to critique your answers. Few tools have ever made negotiation practice this cheap.

And one rule that's not a habit but a line in the sand: if an AI hands you a precise elasticity figure with no source, treat it as invented. Elasticity is the percentage change in volume for a percentage change in price [S6], and in your model it belongs as a range you test, not a number you were given.

## One thing to do this week

Take the 30-minute trap test. Paste a small synthetic dataset into your approved AI assistant (I've published one you can download), ask *"How did Q2 go?"*, and score the answer against the real figures.

If your assistant leads with "revenue grew", you've just seen the jagged frontier in your own field. If it catches the margin story, try a harder question. Either way, you'll have learned more about AI and pricing in half an hour than most courses teach in a day.

## The real risk isn't replacement

I don't think AI will replace experienced pricing managers. The work that matters most, deciding what the business should do and convincing people to do it, is exactly where these tools are weakest.

But AI will widen the gap between two kinds of pricing professional: those who know where its frontier sits in their work, and those who don't. The first group will get faster *and* sharper. The second will produce more, faster, and occasionally walk into the CFO's office with a beautifully written conclusion that the spreadsheet would never have supported.

## Want the full plan?

I've published a free, 8-week field plan for experienced pricing managers. It includes the trap test and dataset, a frontier map for pricing work, four two-week sprints built on real tasks (price leakage, scenarios, negotiation rehearsal, the leadership memo) and a teach-back session for your team:

**[AI Readiness for Pricing Managers: An 8-Week Field Plan](https://chetangabhane.in/ai-readiness/pricing-manager?utm_source=substack&utm_campaign=jagged-frontier)**

No sign-up needed. And if you work with engineers, there's a companion plan for senior C, C++ and Python developers at [chetangabhane.in/ai-readiness](https://chetangabhane.in/ai-readiness?utm_source=substack&utm_campaign=jagged-frontier).

## Further reading

- [S0] Ethan Mollick (co-author of the study), [Centaurs and Cyborgs on the Jagged Frontier](https://www.oneusefulthing.org/p/centaurs-and-cyborgs-on-the-jagged)
- [S10] Microsoft, [Get started writing prompts in Microsoft Copilot](https://support.microsoft.com/en-us/microsoft-365-copilot/get-started-writing-prompts-in-microsoft-365-copilot)
- [S13] FTI Consulting, [A Quantifiable Approach to Price Volume Mix Analysis](https://www.fticonsulting.com/insights/white-papers/quantifiable-approach-price-volume-mix-analysis)
- [S6] OpenStax, [Price Elasticity of Demand and Price Elasticity of Supply](https://openstax.org/books/principles-economics-2e/pages/5-1-price-elasticity-of-demand-and-price-elasticity-of-supply)

---

# Pre-publish checklist (for owner)

- [x] Guide page is live at the linked URL (verified 10 Oct 2026)
- [ ] Choose a title option
- [ ] Paste the excerpt into Substack's post description field
- [ ] Headings use Substack's heading styles; body paragraphs are normal text (not headings)
- [x] Guide links carry `utm_source=substack` so Substack readers show up separately on the PostHog dashboard
- [ ] Re-check the links still open
- [ ] Publish manually in Substack
