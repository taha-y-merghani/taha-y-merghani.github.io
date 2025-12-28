---
title: "Cursor Fixed Everything… Until It Didn't"
date: 2025-07-01
description: "An honest look at AI coding assistants—the productivity gains, the limitations, and when human judgment still matters."
tags: ["AI","Tools","Productivity"]
draft: false
---

* * *

### Cursor Fixed Everything… Until It Didn’t

This is my [chatbot project on GitHub](https://github.com/taha-y-merghani/chatbot). It takes in audio, transcribes it with Whisper, then sends it to Ollama for a response — all running locally on a 2015 MacBook Pro.

I built it to get a feel for using LLMs offline. To see what works when you don’t have cloud access. The idea was simple. And I had an initial version last year.

But it had version mismatches. Insecure subprocess calls. No error handling. No input validation.

Today I opened it in Cursor (which marks my first time using this magic software) and felt like I had superpowers.

It flagged the NumPy version that was breaking PyTorch.  
 It rewrote the broken subprocess call into something clean and safe.  
 It suggested proper try/except blocks.  
 It caught the wrong model name.  
 It cleaned up the structure so I could actually reason about the code again.

Every bug it surfaced, it fixed. One by one. I even went to [Twitter](https://x.com/taha_moji/status/1940143377468592503) to say I was unbelievably excited about Cursor.

Then I ran the script.

I asked a basic question:  
 **“What are the human rights principles of the UN?”**

Whisper transcribed it cleanly. The prompt went through. Then… nothing.

Ollama hung. No response. No error.

I stared at the terminal for a full minute, waiting.

Turns out Mistral needed more than 30 seconds to respond — especially on my machine. It wasn’t a bug. It wasn’t a typo. Just a hardware bottleneck that Cursor had no way to see.

I raised the timeout to 5 minutes. Ran it again. It worked.

Cursor caught almost everything.  
 But it missed the last failure mode.  
 Because it assumed my machine was fast.

And it wasn’t.

That’s when it hit me:  
 No matter how good the tool is, it can’t see the system it’s running on.  
 It doesn’t know when you’re building inside limits.

So you still have to finish the job.

Tools matter. But they don’t know your constraints.  
 You do!

!

Cursor vs my 2015 Macbook Pro
