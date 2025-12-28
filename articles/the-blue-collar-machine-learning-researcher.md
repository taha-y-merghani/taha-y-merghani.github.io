---
title: "The Blue Collar Machine Learning Researcher: The Human API in the Aisle"
date: 2025-12-22
description: "On working as a human API in retail while building ML expertise—what happens when your day job is in the physical world while your mind stays in the technical one."
tags: ["Career","AI","Personal"]
draft: false
---

* * *

### The Blue Collar Machine Learning Researcher: The Human API in the Aisle

**This piece reframes retail labor as an error-correction and provenance layer in a drifting cyber-physical system, and it decomposes the aisle into concrete autonomy failure modes that explain why automation needs environment redesign, not just smarter robots.**

![Looking fab on the way back from work at Walmart. I’m wearing a denim jacket and a black shirt. My name tag “Taha” with the Walmart logo is also shown.](https://cdn-images-1.medium.com/max/800/1*oNd3htUFCc11GydxLYK0GA.jpeg)

I [published](https://medium.com/@tahaymerghani/a-machine-learning-researcher-spent-close-to-5-000-hours-on-tekken-and-reached-top-0-5-a42c96877214) an analysis of how I spent 5,000 hours mastering _Tekken 8_, reaching the top 0.5% globally. It hit the #1 spot on r/ArtificialIntelligence and is currently exceeding 172k views.

My argument wasn’t “gaming is deep.” It was more specific than that.

At a high level, competitive Tekken is **bounded rationality under severe time constraints**. You’re solving a partially observed decision problem with a ~50ms action budget. You can’t brute-force search. You compress the space. You learn priors. You update them the moment you get punished.

I called the approach **autophenomenology**: you analyze a system by becoming one of its components and observing what the system forces the component to learn.

Today I’m applying that same lens to a different arena. I work as a Digital Personal Shopper at Walmart.

On paper, the job is locomotion. The app is the planner. I’m the actuator.

That abstraction is wrong.

The correct abstraction is: **The app is a brittle world model, and the human worker is a real-time error-correction layer that resolves drift between the model and the store.**

The value isn’t picking. It’s closing the map-territory gap. The digital system assumes a clean mapping:

*   Item → Location
*   Location → Availability
*   Route → Minimal Cost

The physical store violates those assumptions constantly. Shelves are stochastic. Inventory is delayed. Items migrate. Customers introduce noise. Staff interventions aren’t fully logged. The planogram is an _intent_, not a guarantee.

So what am I being paid for? Not to “walk.” I’m being paid to handle the **residuals the system can’t represent**. You can call it Sim-to-Real drift if you want. In plain English: the map lies, and I’m paid to deal with the lie.

### The Quiet Distinction: Inference-Time Lookup vs. Amortized Skill

Early in training, I had a returns cart full of random items. I treated the store like a database. _Scan item. Query aisle. Walk. Repeat._ It worked, but it was slow in the exact way **linear search** is slow. Lots of queries. Lots of context switching. Lots of wasted motion.

Then a veteran stocking employee walked by. She didn’t scan anything.

She looked at the cart, grabbed items in bursts, and sorted them into aisle clusters almost instantly. She wasn’t “remembering aisles.” **She had compiled the store.**

Sour cream isn’t near cream cheese. Different aisle entirely. She knew that without thinking. I would have wandered. Over thousands of hours, she built a **compressed internal model** that maps an item’s semantics to a location with near-zero latency.

When I rely on the app, I’m doing disk reads. When she relies on her brain, she’s operating from RAM.

That reveals a fragility in modern logistics: the store’s real ground truth is not the server. It lives in **tacit human models** trained against reality and updated daily through contact with drift. If you remove the human without replacing that adaptive layer, you don’t get automation. You get a system with a perfect plan for a world that doesn’t exist.

### The Aisle Has Its Own Frame Traps

In Tekken, a “frame trap” invites speed and punishes it. The aisle has the same structure.

Take the yogurt section. There are about 20 _Noosa_ SKUs that share almost everything visually. Same container shape. Same branding. Same palette. The discriminative signal is tiny: “Blueberry” vs “Mixed Berry.”

The shelf invites a fast reach. It punishes that speed with wrong-SKU errors.

This is not a willpower problem. It’s an **aliasing problem** under clutter, occlusion, and swapped items. So my solution isn’t “focus harder.” It’s **mode switching**.

I stop trusting vision and use the barcode scanner as a truth sensor. I treat the visual channel as noisy and confirm with an instrumented measurement. That’s not me being slow. That’s rational behavior in a high-noise observation regime.

### The Impedance Wall

Then you hit the part robotics people rarely feel in their gut until they’re in a store.

Stocking a soft package into a full shelf isn’t a geometry problem. It’s **force control** in a deformable, cluttered environment. You push hard enough to make space by deforming neighboring packaging, but not so hard you crush what’s adjacent.

*   A robot that stops at resistance fails.
*   A robot that pushes through damages inventory.

Humans do **variable impedance control** unconsciously because our bodies are built for it. The aisle is optimized for human manipulation, not robotic manipulation.

### The Viability Gap: History is a Latent Variable

The strongest argument against naive automation isn’t perception. It’s history.

Robots can get good at “what is this.” They’re much worse at “is this safe given what happened to it earlier,” because the relevant variable often isn’t visible.

Recently, I found a frozen item abandoned in a room-temperature returns bin. Visually, it was perfect. A vision system would label it “stock” and put it back.

I marked it as waste immediately. Why?

Because I inferred **latent history**: `Frozen Object` + `Ambient Location` + `Unknown Dwell Time` implies **Spoilage Risk**.

The inventory database doesn’t track “time spent melting.” The safety of the loop depends on a biological agent doing inference over untracked provenance. If you automate the loop without provenance tracking, you don’t just risk inefficiency. You risk silent safety failures that look correct to the model.

### The System Runs on Humans Patching Exceptions

Beyond individual items, the workflow depends on biological patching to handle cases the software can’t represent cleanly.

**Staging behaves like memory without addresses.** The system tells you to put the order _somewhere_, but not _where_. So you become the allocator. You scout floor space, grab a dolly, link them in real time so nothing deadlocks. Only then does the system learn where the rest of the order should go.

**Routes often zigzag stupidly.** The app will send you from Aisle 2 to Aisle 17 back to Aisle 3 like it is solving a different building. So you pre-sort into aisle clusters before you start walking. You patch the routing algorithm before execution.

**Rejected items pile into buffer carts.** They do not disappear. They just move into a physical heap and wait. Someone has to garbage-collect them later when the main thread is idle. That someone is always human.

### Conclusion

The irony is Walmart already knows how to automate.

In fulfillment centers, robots move standardized pods across engineered floors. It works because the environment was **built for machines**.

The store is a brownfield. It’s optimized for humans: browsing, touching, social navigation, messy shelves, constant perturbations. We’re trying to retrofit robotics into a space that fights them.

So the question isn’t whether we _can_ build a robot smart enough for the aisle. The question is why we’re trying to, when the fastest way to automate is usually not to build a smarter robot.

It’s to build a simpler room.

Until then, the human remains the only API that can handle the mess.
