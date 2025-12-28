---
title: "What 5,000 Hours of Mastering Tekken Taught Me About AI Research"
date: 2024-11-15
description: "Autophenomenological analysis exploring parallels between competitive gaming mastery and pattern recognition in ML research. Examining whether the obsessive optimization that makes someone elite at fighting games relates to what makes someone effective at research."
medium_url: "https://medium.com/@tahaymerghani/a-machine-learning-researcher-spent-close-to-5-000-hours-on-tekken-and-reached-top-0-5-a42c96877214"
tags: ["AI", "Research", "Gaming"]
draft: false
---

* * *

### A Machine Learning Researcher Spent Close to 5,000 Hours on Tekken and Reached Top 0.5%: An Auto-phenomenological Account

* * *

_Fighting games deserve chess-level intellectual analysis. Here’s what that looks like from inside._

!

machine learning researcher and an elite Tekken player

* * *

![promotion to top 0.5–1% of players in Tekken God rank with Nina Williams](https://cdn-images-1.medium.com/max/800/1*hQLtgjSwxxqcxdz3-8YKGQ.jpeg)

A few months ago, I wrote a piece called “[Why I Still Lose at Tekken — Even After 4,000 Hours](https://medium.com/@tahaymerghani/why-i-still-lose-at-tekken-even-after-4-000-hours-15a6562b38b3)” where I tried to explain the game to a non-gaming friend. That article was personal and confessional — an attempt to articulate why someone could invest thousands of hours into something and still feel they hadn’t mastered it.

This piece is different. It’s intended to be more rigorous, more formally grounded. I’m writing it for game designers, researchers, and anyone who suspects that competitive video games might be more intellectually rich than they’re given credit for.

My credentials: I hold an MS in Computer Science from Georgia Tech, where I conducted NLP research and published at venues like NeurIPS and NAACL. I’ve spent the last several years thinking about how humans acquire complex skills — and I’ve spent close to 5,000 hours testing those ideas on myself in Tekken 8, reaching Tekken God rank in Season 2 (top ~0.5% of active players), with secondary characters at Tekken King and Tekken Emperor. At one point, I held the #1 global position for ranked wins — a measure not of peak skill, but of sustained competitive consistency at elite ranks.

![The number 1 with ranked wins with Nina Williams globally](https://cdn-images-1.medium.com/max/800/1*mz2oUM2Nz4zlqXuticAxgg.jpeg)

This is an autophenomenological account: first-person data from inside a complex competitive system, framed by the theoretical tools I’ve acquired as a researcher. My hope is that it’s useful to people building games, studying expertise, or simply curious about what high-level competition actually feels like.

* * *

### Why Fighting Games?

Chess has received centuries of intellectual attention. We have opening theory, endgame tablebases, rating systems with deep statistical foundations, and decades of cognitive science research on expertise. Go got its “AlphaGo moment” and suddenly the world understood it as a profound intellectual challenge.

Fighting games have received almost none of this treatment.

This isn’t because they’re simpler. It’s because they’re illegible to the frameworks we typically use to analyze games. They combine real-time execution, incomplete information, psychological manipulation, and motor skill in ways that resist clean formalization.

Tekken, specifically, is a useful object of study because:

1.  **The franchise is 30 years old** — long enough to have developed deep competitive traditions and generational knowledge transfer
2.  **The skill ceiling is extraordinarily high** — professional players demonstrate capabilities that seem almost superhuman to newcomers
3.  **The community has developed sophisticated folk theory** — frame data, punishment tables, matchup charts — that constitutes a kind of informal science
4.  **It resists AI dominance in a revealing way** — unlike chess or Go, you can’t simply “solve” Tekken with compute

That last point deserves elaboration. In practice mode, you can set the CPU opponent to automatically block all attacks. The computer can read your inputs and counter everything perfectly. This isn’t interesting. It tells us nothing about what makes Tekken hard for humans, because it ignores the psychomotor demands, the adaptation, the _reading_ of another human mind. An aimbot in an FPS isn’t playing the same game as a professional player. Similarly, a frame-perfect input-reading bot isn’t playing Tekken — it’s playing a different, degenerate version of it.

* * *

### The Structure of the Game: A Formal Sketch

Let me attempt to characterize Tekken the way we might characterize chess — not exhaustively, but with enough precision to reveal its complexity.

### Information Structure

**Chess** is a game of perfect information. Both players see the complete game state at all times. Outcomes are deterministic.

**Tekken** operates under imperfect information with asymmetric knowledge layers:

*   **Observable state**: 3D position, health bars, rage status, wall proximity, round timer
*   **Hidden state**: Opponent’s mental model, their read on _your_ habits, their execution capacity under pressure, their character-specific knowledge
*   **Partially observable**: Input buffer (some moves telegraph, some don’t), conditioning history within the match

This makes Tekken structurally closer to **poker** than to chess. You’re not just calculating optimal moves; you’re modeling the opponent’s model of you.

### Temporal Structure

**Chess** is discrete and turn-based. You can think as long as you want (within time controls).

**Tekken** runs at 60 frames per second. Decisions happen in ~16.67 millisecond windows. But it’s not purely simultaneous — **frame advantage creates pseudo-turns**. When I’m +5 on block, I have temporal priority: my fastest moves will resolve before my opponent’s fastest moves. This creates a dynamic rhythm of advantage and disadvantage that structures the entire interaction.

Human reaction time (~15–20 frames, or 250–333ms) creates a crucial boundary. Moves faster than this threshold are **unreactable** — they force prediction rather than reaction. This is where the “mind game” lives. The unreactable mixup is Tekken’s fundamental unit of psychological warfare.

### Game-Theoretic Structure

**Chess**, in theory, is solved from any position — there exists an optimal move, even if we can’t always compute it.

**Tekken** is saturated with mixed-strategy Nash equilibria. Consider **okizeme** (the situation when your opponent is getting up from the ground):

*   Attacker options: mid attack, low attack, throw, wait and punish
*   Defender options: block standing, block crouching, tech roll, stay grounded

No pure strategy dominates. Optimal play requires _randomization_ — choosing options with frequencies proportional to their expected value against an adapting opponent. The same structure appears in neutral (the spacing game), in pressure sequences, in wake-up situations.

This means **there is no deterministic “best play”** at many decision points. Only probability distributions that maximize EV against an opponent who is simultaneously adjusting their own distributions based on observed patterns.

### Caillois Classification

Roger Caillois, in _Man, Play and Games_ (1958), proposed a taxonomy of play along four dimensions: **agon**(competition), **alea** (chance), **mimicry** (simulation/roleplay), and **ilinx** (vertigo/disorientation). Games also exist on a spectrum from **paidia** (free, improvisational) to **ludus** (rule-bound, structured).

Tekken is:

*   **Agon-dominant**: Pure skill-based competition with no random elements in core mechanics
*   **Near-zero alea**: Unlike card games, there’s no shuffle, no dice — variance comes from human inconsistency, not system randomness
*   **Mild mimicry**: You embody a character, but it’s thin compared to RPGs
*   **Ilinx present**: The vertigo of tournament pressure, the disorientation of tilt, the panic of being overwhelmed

On the paidia-ludus spectrum: **extremely ludus**. Dense rule systems, precise frame data, optimal punishment tables. This is not freeform play.

* * *

### Skill Decomposition: The Five Axes

When I try to break down what makes someone good at Tekken, I find myself identifying five distinct (and largely orthogonal) dimensions:

### 1\. Knowledge

You need to know what every character is capable of — what’s fast, what’s safe, what’s punishable, and what’s worth the risk. Tekken doesn’t give you much room for ignorance. If you don’t know a matchup, you’ll be punished for it — fast.

With 30+ characters, each with 80–150 moves, and complex interactions between them, the knowledge burden is immense. Professional players spend hundreds of hours in the lab just memorizing punishment tables.

### 2\. Execution

It’s not enough to know what you _should_ do — you have to do it, reliably, under pressure. That means clean input, perfect timing, and zero hesitation. In high-level matches, even small execution errors can cost you the round.

Some characters have notoriously difficult execution requirements. Playing Nina (my main) at a high level requires consistent **iWS1** (instant while standing 1) — a technique with a 1–2 frame input window. Miss it, and you get a weaker move. Hit it, and you get one of the best pokes in the game.

### 3\. Reactions

You often have a third of a second — or less — to respond. Tekken demands that you see, recognize, and act almost instantly. Some of that can be trained. But a lot of it? Some players just have faster wiring.

This is where I hit my wall. I can read the situation, know the punish, even plan for it — but still get clipped because I didn’t react in time. The gap between perception and action is real and, for some things, irreducible.

### 4\. Adaptation

Tekken is psychological warfare. You’re not just playing the character — you’re playing the _player_. You learn their habits, condition them to expect one thing, and hit them with something else.

But when they start doing that to you — when _you_ become predictable — it all falls apart. That’s when they stop reacting and start punishing.

Friends who’ve never reached my rank beat me consistently, not because they’re better overall — but because they’ve figured _me_ out.

### 5\. Mental Game

Tilt resistance, patience discipline, risk calibration under pressure. The ability to stay calm when you’re down 0–2 in a set. The discipline to not mash when you’re frustrated.

This dimension interacts with all the others. When your mental game collapses, your execution gets worse, your adaptation slows down, and you start making knowledge errors you wouldn’t make in a calm state.

* * *

### Legacy vs. Newcomer: Two Paths to Mastery

One of the most interesting dynamics in modern Tekken is the divergence between **legacy players** (those who’ve played since earlier titles, particularly pre-Tekken 7) and **newcomers** (those who entered with Tekken 7 or 8).

Frame data wasn’t publicly accessible until Tekken 7. Before that, knowledge was **tacit** — passed down through play, feel, and community wisdom. Players developed intuition for spacing and timing without being able to articulate exactly why something worked.

Newcomers, by contrast, have access to comprehensive frame data from day one. They learn through **notation** (1 is left punch, 3 is left kick) and explicit punishment tables. They can look up that a move is -15 on block and know exactly what to do about it.

This creates a fascinating split shown in this table below:

!

I know God of Destruction players (top 0.15%) who can’t tell you their character’s frame data as precisely as I can. They don’t need to — they’ve internalized it through thousands of hours of play. Their knowledge is embodied, not propositional.

But I’ve also seen newcomers with a fraction of my hours punish things I didn’t even know were punishable, because they studied the spreadsheets.

This maps onto a real debate in expertise research: **explicit instruction vs. implicit learning** (see Reber, 1989; Sun et al., 2005). Chess went through a similar transformation — modern players trained on engines play differently than pre-computer masters. Tekken is undergoing the same shift, and we don’t yet know where it leads. Can pure intuition reach the absolute top, or does the integration of explicit frame knowledge become necessary at the highest levels? The jury is still out.

* * *

### The Ceiling: What It Feels Like From Inside

Despite the frustration, I’ve hit decent ranks. In Season 1, I made it to Tekken Emperor — top ~2% at the time. In Season 2, I reached Tekken God with Nina — top ~0.5% of the active playerbase. I have secondary characters at Tekken King (Zafina) and Tekken Emperor (Anna).

But even with those ranks, I never feel like I truly _excel_. There’s a gap between what I know I should do and what I can consistently pull off under pressure.

That’s the hardest kind of limitation to live with — the **visible kind**. In chess, if you see the winning move, you can make it. In Tekken, you can see the correct play, understand it intellectually, and still fail the execution. Perception and action are decoupled, and the gap is experienced as a kind of embodied frustration that doesn’t exist in pure strategy games.

This is, I think, what makes fighting games uniquely demanding. They require **integration** across cognitive, perceptual, and motor systems in real-time. Weakness in any single dimension creates a ceiling that knowledge alone cannot break through.

* * *

### What’s Missing: An Academic Gap

The academic study of competitive video games — particularly fighting games — lags far behind their actual complexity.

Todd Harper’s _The Culture of Digital Fighting Games_ (2013) is the main scholarly monograph on fighting games, but it focuses primarily on community culture rather than the game-theoretic or cognitive structure of the competition itself.

Esports research has grown rapidly — Reitman et al. (2020) reviewed work spanning business, sports science, cognitive science, informatics, law, media studies, and sociology — but fighting games remain under-theorized relative to team-based esports like League of Legends or Counter-Strike.

What we don’t have:

*   Formal equilibrium analysis of fighting game situations at the level of rigor applied to poker
*   Psychomotor skill decomposition with empirical measurements (reaction time distributions, execution consistency under cognitive load)
*   Information-theoretic analysis of what makes certain mixups “good”
*   Comparative frameworks across fighting game sub-genres (2D vs. 3D, tag vs. 1v1)
*   Learning curve topology with empirical skill acquisition data

The FGC has developed sophisticated **folk theory** — Core-A Gaming’s YouTube analyses, David Sirlin’s _Playing to Win_ — but it hasn’t been formalized with the rigor that academia demands. This is a genuine gap, and one I hope researchers will begin to fill.

* * *

### Looking Forward: A Note for Designers and Researchers

I’ve spent years in other competitive games — Overwatch, Apex Legends. The way you win and lose in those games is different. The psychology is different. The chaos, the decision-making, the pacing — it’s a different beast entirely.

But Tekken has something rare: a **30-year evolutionary history** of competitive refinement. The game has been shaped by generations of players who pushed against its limits and forced it to evolve. That’s an extraordinary natural experiment in game design.

For designers: the dimensions I’ve outlined — knowledge, execution, reaction, adaptation, mental game — are dials you can tune. Some games maximize reaction demands (FPS). Some maximize knowledge (card games). Fighting games, at their best, demand integration across all dimensions simultaneously. That’s what makes them feel unique — and uniquely punishing.

For researchers: this is a rich domain that deserves serious attention. The fighting game community has accumulated decades of informal knowledge about skill, learning, and competition. That knowledge is waiting to be systematized, tested, and extended.

And for players: if you’ve ever felt that fighting games were more than “just video games” — you’re right. They are.

* * *

_Taha Y Merghani (moji249) is a computational linguist and NLP researcher. He reached Tekken God in Tekken 8 Season 2, and has spent close to 5,000 hours studying what that means._

* * *

**References**

Caillois, R. (1958/2001). _Man, Play and Games_. University of Illinois Press.

Harper, T. (2013). _The Culture of Digital Fighting Games: Performance and Practice_. Routledge.

Reber, A. S. (1989). Implicit learning and tacit knowledge. _Journal of Experimental Psychology: General_, 118(3), 219–235.

Reitman, J. G., Anderson-Coto, M. J., Wu, M., Lee, J. S., & Steinkuehler, C. (2020). Esports research: A literature review. _Games and Culture_, 15(5), 498–528.

Sirlin, D. (2005). _Playing to Win: Becoming the Champion_. Lulu.

Sun, R., Slusarz, P., & Terry, C. (2005). The interaction of the explicit and the implicit in skill learning: A dual-process approach. _Psychological Review_, 112(1), 159–192.
