---
title: "The Most Useful Mistakes I Made in LLM Research"
date: 2025-12-05
description: "Lessons learned from failed experiments, misguided assumptions, and productive errors in large language model research."
tags: ["AI","Research","LLM"]
draft: false
---

* * *

### The Most Useful Mistakes I Made in LLM Research

This is a companion to my earlier piece on surviving grad school. This one is about the work itself.

I’ve written elsewhere about the personal cost of my master’s program at Georgia Tech. That piece was about survival. This one is about what I was actually trying to build, and what happened to those ideas since.

My research sat at a specific intersection: how do we make NLP systems work when language varies across dialects, social groups, and geography? This wasn’t an abstract problem then, and it isn’t now. Standard NLP models are trained predominantly on edited, formal text. When you apply them to social media, to regional dialects, to the way people actually write and speak, performance drops. Sometimes dramatically.

I worked on three projects during my time in research, each approaching this problem from a different angle. Here’s what I learned, and where the field has gone since.

* * *

### 1\. Arabic Speech Recognition: When Spelling Doesn’t Map to Sound

My first AI research experience was at MIT’s Computer Science and Artificial Intelligence Laboratory in 2015, working on automatic speech recognition (ASR) for Egyptian Arabic.

Arabic presents a cluster of challenges that don’t exist in English ASR. The standard written form omits most vowels. Diacritical marks that indicate pronunciation are typically left out. This means the same written word can map to multiple pronunciations depending on context. Add to that Arabic’s rich morphology (words are built from roots with extensive prefixes and suffixes) and the significant differences between Modern Standard Arabic and regional dialects like Egyptian, and you have a genuinely hard problem.

The research question was straightforward: **does adding diacritics back into the pronunciation dictionary improve ASR performance?**

We worked with a 10-hour corpus of Egyptian Arabic broadcast speech from Al-Jazeera. I built three pronunciation lexicons using MADAMIRA (a morphological analysis tool) and Kaldi, then trained GMM-HMM acoustic models, deep neural networks, and sequence-discriminative DNNs on each.

The surprising result: **the CODA grapheme lexicon slightly outperformed the diacritized version**. On our best acoustic model, the CODA lexicon achieved 55.6% word error rate versus 56.1% for the diacritized lexicon.

In a small, hard dataset like this, that kind of result can still be informative. The question wasn’t whether we could reach state of the art performance. It was whether a seemingly helpful representation actually helped.

Why would _adding_ information make things worse? The likely explanation is that automatic diacritization introduces its own errors, and those errors propagate through the system. A cleaner, standardized representation, even without explicit vowel information, gave the acoustic model a more consistent signal to learn from.

The broader lesson: **more information isn’t always better. Cleaner information often is.**

### What Happened Since

The ASR landscape has transformed. OpenAI’s Whisper, trained on 680,000 hours of multilingual speech, can now handle Arabic dialects with reasonable zero-shot performance on standard benchmarks. But here’s what’s striking: recent benchmarking studies show that Whisper still struggles significantly with unseen dialects. A 2023 study found that while Whisper achieves near-human performance on standard Arabic (around 4% WER on FLEURS), it deteriorates dramatically on dialects like Algerian, Yemeni, and Emirati that weren’t well-represented in training.

The core tension we identified in 2015, the gap between Modern Standard Arabic and dialectal speech, remains unsolved at scale. Projects like Casablanca (EMNLP 2024), a community-driven effort to collect multidialectal Arabic speech data, are still actively working on this. The problem has been partially addressed by massive data and compute, but the long tail of Arabic dialects remains underserved.

My MIT mentors, Tuka Al Hanai and Michael Price, noted in their recommendation letter that I had proposed morpheme-based lexical modeling as future work. That direction, decomposing words into meaningful subunits, is now standard in modern tokenization schemes. The instinct **was** right, even if I didn’t have the resources to pursue it then.

* * *

### 2\. Part-of-Speech Tagging: When Your Social Network Predicts Your Errors

My main project at Georgia Tech, published at the NAACL 2018 Workshop on Stylistic Variation, asked a different question: **is the difficulty of processing someone’s text related to who they’re connected to?**

Part-of-speech tagging, labeling each word as noun, verb, adjective, etc., is a fundamental NLP task. State-of-the-art taggers achieve 97%+ accuracy on newswire text. On Twitter, that drops to around 90%. The reason is stylistic variation: non-standard spelling, novel word formations, code-switching, and the full diversity of how people actually write when they’re not being edited.

But here’s what’s less obvious: that variation isn’t random. It’s structured by social networks. People who interact tend to write similarly. Linguists call this _homophily_. Birds of a feather flock together, and they also tweet together.

We tested this hypothesis directly. Using the OCT27 Twitter dataset with POS annotations, we extracted the social networks of the tweet authors, who follows whom, who mentions whom, who retweets whom. Then we asked: **if a POS tagger makes errors on user A’s tweets, is it more likely to make errors on user B’s tweets when A and B are connected?**

The answer is yes. We measured this using assortativity, the correlation of errors across network edges. Across both mention and retweet networks, tagger errors were significantly more correlated on the real networks than on randomly rewired baselines.

This has a practical implication: **training data composition matters**. When we split training and test sets based on network structure, training on one cluster of the social graph, testing on another, accuracy dropped about 2% compared to random splits. If your training data comes from one subcommunity and your test data from another, you’ll underperform.

We also tried to fix this by building social awareness into the model itself. We implemented a mixture-of-experts architecture where each expert tagger was weighted by the author’s position in the social network. The idea was that socially proximate authors would use similar expert weightings.

It didn’t work. Despite the strong homophily signal in our analysis, the mixture-of-experts model didn’t outperform a standard tagger. About 50% of authors couldn’t be found in the network, we only had one tweet per author, and the dataset was small. The signal was real, but we couldn’t exploit it with the data we had.

That’s research. Sometimes you demonstrate a phenomenon clearly but can’t yet build a system that leverages it.

### What Happened Since

The LLM era has changed the landscape in complicated ways. Large language models, trained on massive web corpora, implicitly encode some stylistic variation. They’ve seen enough Twitter, Reddit, and informal text to handle non-standard inputs better than earlier models. But they’ve also introduced new problems.

Recent work on the “sociolinguistic foundations of language modeling” (Frontiers in AI, 2024) argues that many LLM failures stem from a mismatch between the language varieties models are trained on and the varieties they’re deployed on. The training data skews toward edited, formal, English-dominant sources. The core insight from our 2018 paper, that stylistic variation is structured and that structure matters, is now being rediscovered in the context of LLM bias and robustness.

The field has also shifted focus. Questions about social network structure and NLP performance now feel less urgent than questions about alignment, security, and the behavior of increasingly capable models. But the underlying problem persists: language technology serves some communities better than others, and the communities with less representation in training data get worse service. Whether we’re talking about POS tagging accuracy or LLM hallucination rates, the dynamic is similar.

* * *

### 3\. Mining Dialectal Words: Kernel Methods Meet Sociolinguistics

My third project, presented at the Black in AI workshop at NeurIPS 2018, approached language variation from a geographic angle: **can we automatically discover which words are associated with specific locations?**

Traditional dialectology relies on expert intuition to identify candidate variables, words or pronunciations that might vary by region. But social media gives us massive geotagged corpora. Can we mine them systematically?

I used the Hilbert-Schmidt Independence Criterion (HSIC), a kernel-based nonparametric independence test introduced to computational linguistics by Dong Nguyen and Jacob Eisenstein. The intuition: if word usage and geography are independent, then knowing where a tweet was posted tells you nothing about whether it contains a particular word. HSIC measures the discrepancy between the joint distribution and the product of marginals, using kernel functions to handle both variables.

I applied this to a corpus of 650,000 geotagged French tweets from Lyon, France. For each of the ~5,000 candidate words appearing in at least 100 tweets, I computed the HSIC value and associated p-value via permutation testing.

The top-ranked words weren’t random. They included tennis terminology (_atp_, _federer_, _open_, because Lyon hosted a major tournament in 2017), horse racing vocabulary (_quinte_, _turf_), tech industry terms (_iot_, _data_, because Lyon is a tech hub), and Arabic loanwords (_ibn_, _wesh_, reflecting immigrant communities).

The method surfaced words genuinely associated with Lyon. This demonstrates HSIC’s utility not just for confirming known dialectal variables, but for _discovering_ new ones, without predefined geographic bins or prior assumptions about what might vary.

### What Happened Since

HSIC has continued to see use in dialectology. A 2018 paper on “Dialectones” used our approach to detect dialectal boundaries in Mexican Spanish Twitter data, citing Nguyen and Eisenstein’s original work. The method has also been extended with faster approximations for large-scale testing and adaptations for clustered data.

But the broader question, how to systematically discover geolinguistic variation, has been somewhat overtaken by LLMs. When you can prompt a model to generate text “in the style of Lyon French” or “as a speaker from Northern England,” the discovery problem feels less pressing. Whether those generations are actually accurate is another question.

I’ve had conversations with researchers who think there’s still value in revisiting this approach with modern tools, using HSIC or similar methods to audit whether LLMs correctly capture geographic variation, rather than just to discover it. That feels like a worthwhile direction, though not one I’m actively pursuing.

* * *

### A Fourth Project: Story Generation (Briefly)

I also contributed to work on automated story generation in Mark Riedl’s lab, which eventually became an AAAI 2020 paper on “Story Realization.” The core idea was decomposing story generation into two steps: generating a sequence of abstract events, then translating those events into natural language sentences.

The event-to-sentence translation is harder than it sounds. A naive sequence-to-sequence model tends to ignore the input event and just generate grammatically correct but semantically unrelated text. The published system used an ensemble of five models, retrieve-and-edit, template filling, Monte Carlo beam search, finite state machine constrained decoding, and vanilla seq2seq, each optimized for different points on the tradeoff between preserving event semantics and generating interesting sentences.

My contribution focused on baseline seq2seq model training and early pipeline work. What stuck with me most was this: automatic evaluation of creative text is genuinely hard. BLEU and perplexity don’t capture whether a generated story is _good_. The team eventually ran human evaluations showing the ensemble outperformed the baseline on enjoyability and genre consistency. That’s the kind of evaluation that matters for generative systems, and it’s expensive.

* * *

### The Thread Connecting These Projects

Looking back, I see a consistent interest: **language varies, and that variation carries information**.

In Arabic ASR, the variation is between standard orthography and dialectal pronunciation. In Twitter POS tagging, the variation is between formal edited text and diverse social media styles. In geographic word mining, the variation is between local and global vocabulary. In story generation, the variation is between what an event means abstractly and how it might be expressed in natural language.

Standard NLP often treats this variation as noise to be overcome. I think it’s signal to be understood. The way someone writes tells you something about where they’re from, who they talk to, what communities they belong to.

* * *

### Where I Am Now

I left academia after graduating in 2019. The personal cost was too high, and I needed distance. I worked at a startup, dealt with health issues, worked briefly in industrial AI, and have spent the past couple of years recalibrating.

My interests have shifted in what would be another article. The problems that feel most urgent to me now are in AI alignment and security. Not how to make models handle dialectal variation, but how to make increasingly capable models behave safely and as intended. The NLP work I did was about understanding how language varies and why that matters for systems. The alignment work I’m drawn to now is about understanding how model behavior varies and why that matters for safety.

There’s a through-line. Both are about taking variation seriously rather than treating it as noise. Both are about who gets served by AI systems and who gets harmed. Both require thinking carefully about what “good performance” even means when the ground truth is contested or context-dependent.

I’m still working out the cleanest entry point into alignment and safety work, and I’m building toward it deliberately. But I wanted to write down what I actually worked on, and what I think it meant, before moving forward.

_I’ve written separately about what it cost me personally to do this work during grad school. If you’re interested in that side of the story, you can read it here:_ [_Grad School Gave Me the Degree — and a Trauma Response_](https://medium.com/@tahaymerghani/the-dark-side-of-academia-mental-health-mentorship-and-the-unspoken-struggles-of-an-nlp-c25adbd9a2e6)_._

_If any of this resonates, whether you’re working on similar problems or thinking about AI alignment and safety, I’d welcome the conversation:_ [_taha.y.merghani@gmail.com_](mailto:taha.y.merghani@gmail.com) _|_ [_LinkedIn_](https://linkedin.com/in/tahamerghani) _|_ [_GitHub_](https://github.com/taha-y-merghani)

!
