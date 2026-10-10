# Source verification report: AI Readiness for Experienced Software Developers

**Status:** DRAFT for owner review. The page is not published.
**Checked on:** 10 October 2026
**Method:** each URL fetched directly (HTTP status, final URL, page title). Where the guide attaches a specific claim, the page content was read to confirm it. Levels are defined in `../pricing-manager/sources.md`.

## Accepted sources

| ID | Source | HTTP | Level | Claim used in the guide |
|---|---|---|---|---|
| S1 | [Karpathy: Intro to Large Language Models](https://www.youtube.com/watch?v=zjkBMFhNj_g) | 200 | title_verified | Recommended one-hour overview (no specific claim) |
| S2 | [GitHub Copilot docs](https://docs.github.com/en/copilot) | 200 | title_verified | Example AI coding assistant |
| S3 | [Claude Code docs](https://code.claude.com/docs/en/overview) | 200 | title_verified | Example AI coding assistant |
| S4 | [Anthropic: Prompt engineering overview](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview) | 200 | content_verified | Define success criteria and tests before prompt tuning |
| S5 | [Neural Networks: Zero to Hero (YouTube)](https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ) | 200 | content_verified (via repo + search) | Series progresses micrograd, makemore, GPT |
| S6 | [karpathy/nn-zero-to-hero](https://github.com/karpathy/nn-zero-to-hero) | 200 | content_verified (via search excerpt of README) | Lecture 1 assumes basic Python and high-school calculus |
| S7 | [3Blue1Brown: Neural networks](https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi) | 200 | title_verified | Visual intuition (no specific claim) |
| S8 | [fast.ai Practical Deep Learning](https://course.fast.ai/) | 200 | content_verified | Free; about a year of coding experience is enough |
| S9 | [Coursera ML Specialization](https://www.coursera.org/specializations/machine-learning-introduction) | 200 | content_verified (via search) | Three courses, Andrew Ng, Python. **Price not confirmed** |
| S10 | [Coursera Deep Learning Specialization](https://www.coursera.org/specializations/deep-learning) | 200 | content_verified | Five courses, intermediate; FAQ says it cannot be taken free; financial aid available |
| S11 | [Karpathy: Let's build GPT](https://www.youtube.com/watch?v=kCc8FmEb1nY) | 200 | title_verified | Transformers in code |
| S12 | [Attention Is All You Need (arXiv)](https://arxiv.org/abs/1706.03762) | 200 | title_verified | Original transformer paper |
| S13 | [anthropics/courses](https://github.com/anthropics/courses) | 200 | title_verified | Free educational notebooks. **Exact course list not checked line by line** |
| S14 | [Hugging Face LLM course](https://huggingface.co/learn/llm-course) (redirects to chapter 1) | 200 | content_verified | Free, no ads; needs good Python; best after an intro DL course |
| S15 | [Anthropic: Building Effective AI Agents](https://www.anthropic.com/engineering/building-effective-agents) | 200 | content_verified | Workflows vs agents; start simple, use APIs directly first |
| S16 | [OWASP Top 10 for LLM Applications](https://genai.owasp.org/llm-top-10/) | 200 | content_verified | 2025 list includes Prompt Injection (LLM01) and Improper Output Handling (LLM05) |
| S17 | [llama.cpp](https://github.com/ggml-org/llama.cpp) | 200 | content_verified | Plain C/C++ without dependencies; 1.5-bit to 8-bit integer quantization |
| S18 | [ONNX Runtime C++](https://onnxruntime.ai/docs/get-started/with-cpp.html) | 200 | title_verified | Run models from C++ |
| S19 | [PyTorch C++ frontend](https://docs.pytorch.org/cppdocs/frontend.html) | 200 | content_verified | C++17 library for settings where Python is impractical (low latency, multithreaded servers) |
| S20 | [Udemy: LLM Engineering (Ed Donner)](https://www.udemy.com/course/llm-engineering-master-ai-and-large-language-models/) | 403 (bot protection) | search_verified | Course exists under this URL per search results; [companion repo](https://github.com/ed-donner/llm_engineering) returns 200. **Price, rating and current title not machine-checked** |
| S21 | [DeepLearning.AI: ChatGPT Prompt Engineering for Developers](https://www.deeplearning.ai/short-courses/chatgpt-prompt-eng/) (redirects to /courses/chatgpt-prompt-eng) | 200 | title_verified | About 1.5 hours per search; **current free access not confirmed** |
| S22 | [Google ML Crash Course](https://developers.google.com/machine-learning/crash-course) | 200 | content_verified | Topics include neural networks, embeddings and an intro to LLMs. Page states no price |
| S23 | [MIT 6.S191](https://introtodeeplearning.com/) | 200 | title_verified | University course (reference) |
| S24 | [Dive into Deep Learning](https://d2l.ai/) | 200 | title_verified | Free online textbook (reference) |

## Rejected or not included

| Source | Reason |
|---|---|
| Udemy "LangChain – Develop AI Agents" (Eden Marco) | Exact course URL could not be confirmed; course has been retitled. Omitted rather than guess a link |
| Low-review Udemy agent courses (2–7 ratings) | Too few reviews to recommend |
| Third-party "best AI courses 2026" listicles | Not primary sources |

## Known gaps (for owner review)

1. **Udemy and Coursera prices are not stated** in the guide; it says "Paid" and tells readers to check.
2. **S13 course list** was not checked notebook by notebook.
3. **Time estimates** per exercise are the author's estimates, not from the sources.
4. **The owner's own materials:** none were added. Chetan's books (Terraform, VMware transition) are not AI-specific; add them later if a relevant one exists.
