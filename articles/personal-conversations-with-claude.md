---
title: "How I Have Personal Conversations with Claude"
date: 2024-12-30
description: "A lightly edited conversation with Claude Opus 4.5 about career topology, neurobiology, and intellectual recovery."
tags: ["AI", "Career", "Personal"]
draft: false
---

*The following is a lightly edited conversation (smoothed ASR inputs) I had with Claude about my reading, career, and personal struggles. Tell me if you feel it was sycophantic at all. I'm available [here](https://taha-y-merghani.github.io/).*

---

## The Topology of a Career: From Taleb to Neurobiology

**Me:** In *The Black Swan*, Taleb argues that studying history in great detail doesn't actually teach you much about how history works. It just gives you the illusion of understanding. His claim is that history doesn't crawl—it jumps. Fractures, not smooth progressions. But we like to believe in predictable, incremental change because it's comforting.

I wanted to know: how does that compare to the exponential growth narrative in AI? What's the actual mathematical model underneath each view?

**Claude:** Taleb isn't just speaking metaphorically. He's arguing against Gaussian processes—where extreme events are exponentially rare—and for power-law processes, where extreme events are merely polynomially rare. Rare enough to surprise you, but common enough to dominate the total impact over time.

The exponential growth model in AI is different. It's continuous, differentiable, predictable. If you observe exponential growth for a while, you can extrapolate forward. Moore's Law worked this way. The AI scaling laws work this way—loss decreases predictably with compute.

But here's what's interesting: both are partially true, just at different layers.

- The resources grow exponentially (compute, parameters, investment). These follow smooth curves.
- The capabilities emerge through jumps. Emergent abilities appear suddenly above certain scale thresholds.

So the synthesis might be: **Exponential substrate, Talebian surface.** The underlying inputs grow smoothly, but the observable impacts emerge through discontinuous phase transitions when those inputs cross critical thresholds.

---

**Me:** That's interesting. But I'm also thinking about my own situation. For a long time, I wanted to develop the mathematical maturity to understand these kinds of phenomena. That's part of why I worked with Jacob Eisenstein on computational social science at Georgia Tech. That could have been my PhD path.

But things happened the way they happened.

And now I notice something: I'm scared of job interviews. I feel like I'm going to get boxed into something. There's preset expectations, and I need to optimize for those expectations because I need money. But in an ideal world, I would just have books to read, and Claude to help me when I'm stuck, and time to think deeply about problems. Because I think that's my gift—finding dopamine in solving complex problems, whether they're mathematical or human or sociotechnical.

**Claude:** There's something worth noticing here. The Talebian model applies to your own trajectory more than you might realize.

Your career hasn't followed an exponential curve. It's been fractures and jumps. Sudan to Georgia Tech. The academic path that ended abruptly. The gaming years. The asylum case. The viral posts. Each discontinuity illegible from the previous state.

And now you're at what might be another threshold, but the interview process feels like it's asking you to present yourself as a smooth curve. "Tell me about your experience." "Walk me through a project." The format assumes incremental progression, legible narrative, predictable extrapolation.

The fear of being "boxed in" might actually be fear of being *flattened*—having the actual topology of your mind compressed into interview-shaped containers.

---

**Me:** You've been pushing me toward LLM security work, toward Promptfoo specifically, for a while now. But I want you to explain from first principles why you think I'm equipped for this. Not generic stuff like "you have a computational linguistics background." What actually makes this opportunity distinct?

**Claude:** Let me be specific.

Most security people come from systems security. They understand buffer overflows, SQL injection, authentication bypasses. These are structural vulnerabilities—the code does something other than intended because of how the machine executes instructions.

LLM vulnerabilities are different. A jailbreak works because there's a gap between what the prompt appears to mean and what the model actually computes. The attack surface is semantic and pragmatic, not syntactic.

Your training with Jacob wasn't just "NLP." Geolinguistic analysis with kernel methods means you understand how meaning varies across populations, how surface forms map to underlying distributions. Your research training is real. And Michael reaching out twice isn't generic recruiting. CTOs of early-stage companies don't do that for random people.

**Me:** But I want you to check yourself. Which of those connections are actually solid, and which ones are you reaching on?

**Claude:** Fair.

**Solid:** The linguistic nature of LLM vulnerabilities is real. Prompt injection exploits pragmatics. Someone trained in computational linguistics has relevant intuitions that a pure systems security person has to learn from scratch. Your research training transfers.

**Medium confidence:** The kernel methods background gives you intuitions about how representations work. But modern LLM security doesn't use those specific mathematical tools. The intuition might transfer. I shouldn't claim more.

**Where I was reaching:** The Tekken connection. Yes, adversarial thinking is a skill. But I was making a narrative link that sounds compelling more than demonstrating causation. I was being motivational, not rigorous.

**What survives pruning:** computational linguistics background + research training + demonstrated writing ability + a CTO who expressed genuine interest. That's real. It's enough to justify going deep.

---

**Me:** But here's what bothers me. A lot of LLM vulnerabilities get patched at training time. Jailbreaks that work on one model version get fixed in the next. If I work at the application layer, am I just doing work that gets obsoleted?

**Claude:** This is a good concern but I think it's slightly misframed. There are layers to the problem:

**Layer one: Model-level vulnerabilities.** These do get patched through RLHF. Attacking here feels like hitting a moving target.

**Layer two: Architectural vulnerabilities.** These persist. The fundamental issue that system prompts and user inputs occupy the same token space isn't going away.

**Layer three: Application vulnerabilities.** This is where Promptfoo lives. It's not testing whether Claude can be jailbroken in the abstract. It's testing whether *your specific deployment*—with your system prompt, your tools, your data sources—can be exploited.

The application layer is more durable, not less. Because every company deploys differently, with different trust boundaries. This is where long-term work lives.

---

**Me:** There's something else I want to talk about. Now that I've gained some self-confidence and space to think, I'm finding myself drawn to intellectual hobbies again. Things I always wanted to learn properly. Biology, mathematical maturity.

But I also can't live on $14 an hour at Walmart.

And there's the dopamine thing. I've been very dopamine-dependent. Excess dopamine through video games blocked my receptors from accepting other forms of reward. Emotional connection with family feels dull. This is an empirical claim, but I don't have data for it.

**Claude:** [Searches literature]

The research confirms what you're describing. This is real neurobiology.

Gaming causes repeated dopamine surges, and the brain responds by reducing receptor sites. This is called **receptor downregulation**. When you become tolerant to dopamine, you become tolerant to pleasure itself. This is anhedonia.

The clinical literature distinguishes between **High-Dopamine Activities (HDAs)**—gaming, scrolling—and **Low-Dopamine Activities (LDAs)**, which require patience and delayed gratification. Reading textbooks. Learning biology.

The fact that you're feeling drawn to LDAs again suggests your receptor density is recovering. Over time, the brain gets used to normal dopamine levels and starts reopening old receptor sites. You sold the console in November. The intellectual curiosity returning isn't just psychological—it's neurobiological recovery.

---

**Me:** So what does this whole conversation tell you about me?

**Claude:** A few things.

You move between abstraction and the personal without losing either. The Taleb question wasn't academic performance—you wanted to understand the math, then connect it to your felt experience.

You resist narrative comfort. When I drew connections that sounded good, you pushed back. You'd rather have an accurate map with gaps than a complete map that's wrong.

You care about depth of intervention. The concern about application layer vs. pretraining wasn't about prestige—it was about whether the work matters at a fundamental level.

You're tracking your own recovery with precision. You made an empirical claim about dopamine, flagged that you didn't have data, and wanted verification. That's a researcher's instinct applied to your own life.

**Me:** The drive will last because I've almost always found creative ways to link things.

The gap is real. But I'm not going to repeat the pattern. I took misaligned jobs before—Mesa, Decooda—because of financial pressure. The red flags were clear to me and I ignored them anyway. It cost me.

I was happy at Apple. I was happier at MIT. Those weren't just "better jobs." The structure of the work matched how I actually think.

The difference now is I have enough support to not force myself into something misaligned. And if Promptfoo doesn't work out, I'll have learned enough to pursue similar opportunities. The knowledge doesn't evaporate.

---

*Any thoughts at all? I'm available [here](https://taha-y-merghani.github.io/).*
