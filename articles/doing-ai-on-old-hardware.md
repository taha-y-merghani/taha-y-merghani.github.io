---
title: "Doing AI on Old Hardware"
date: 2025-07-04
description: "Exploring how to run modern AI models on consumer-grade laptops—what works, what doesn't, and why accessibility matters."
tags: ["AI","Technical","Hardware"]
draft: false
---

* * *

### Doing AI with Old Hardware

In another [episode](https://medium.com/@tahaymerghani/cursor-fixed-everything-until-it-didnt-1e8c20a8f30b) of my efforts to be a modern AI engineer on a crusty 2015 MacBook Pro, bypassing the “it works on my machine” hurdles was (You’re absolutely right!) tough.

This is a reference to my app which is a very simple [chatbot](https://github.com/taha-y-merghani/chatbot) I wanted to deploy.

* * *

### 1 The Hardware Reality Check

I love that old MacBook. It still boots fast and the keyboard feels like home, but under the hood it’s silicon on a calorie-restricted diet. Pair that with a free-tier **t2.micro** in AWS — compute horsepower that fits in a lunchbox — and frustration comes for free.

First I reached for **OrbStack**, hoping for slick local containers for my Mac as Docker isn’t an option. The installer replied:

> Error: This software does not run on macOS versions older than Ventura.

My Mac can’t run Ventura, so shiny tooling was off the table. Time to wrestle with what I had.

* * *

### 2 Docker Meets a Vintage CPU

The first \`docker build\` . felt like watching paint dry in slow motion — 8,697 seconds of PyTorch wheels grinding through a single gig of RAM.

A simple \`pip install\` dragged like a commute in bad weather. By the end of hour two, I wasn’t just frustrated — I was convinced Docker was asking more of the hardware than it could ever give.

**Lesson #1:** containers are a luxury when your hardware is soon to belong in the vintage aisle.

* * *

### 3 Going Native, Staying Sane

I tossed the Dockerfile and went classic:

python -m venv venv  
source venv/bin/activate  
pip install whisper ollama fastapi uvicorn gradio

*   **Build time:** hours → minutes
*   **Overhead:** gone
*   **Portability:** lower, but acceptable for a one-box projec

* * *

### 4 Gradio Grows Up

Gradio’s dev server is perfect for demos, not for production on a diet CPU. I wrapped the UI inside FastAPI and launched with Uvicorn:

from fastapi import FastAPI  
import gradio as gr

def chat(audio):  
    # whisper → text → LLM → answer  
    ...

iface = gr.Interface(fn=chat, inputs="audio", outputs="text")  
app = FastAPI()  
app = gr.mount\_gradio\_app(app, iface, path="/")

uvicorn app:app \--host 0.0.0.0 --port 8000 \\  
  \--workers 1 --timeout-keep-alive 120

One worker, one request at a time — that’s victory on this box.

* * *

### 5 Keeping It All on the MacBook

After the EC2 detour, I shut the cloud tab and decided to live entirely on the crusty MacBook. No remote editors, no rsync, no tmux gymnastics — just local files and a single terminal window.

The key move was stripping Docker and wiring the Gradio interface into Uvicorn:

python -m venv venv  
source venv/bin/activate  
pip install whisper ollama fastapi uvicorn gradio  
uvicorn app:app --host 0.0.0.0 --port 8000

With the app now ASGI-compatible, I could iterate in place: edit code, restart Uvicorn, refresh the browser. The feedback loop shrank to seconds, not hours, and I never again waited on cloud latency or container layers.

* * *

### 6 Tuning for a Diet CPU

Even on the MacBook, resources are tight. I kept concurrency at 1, loaded the tiniest Whisper model, quantized the LLM, and raised client timeouts so a slow answer didn’t look like failure. No fancy dashboards — just plain-text logs that wouldn’t hog memory.

* * *

### 7 Takeaways You Can Steal

*   **1\. Skip containers on old hardware.** A bare virtualenv is faster.
*   **2\. Uvicorn + ASGI > dev servers.** Production speed without container overhead.
*   **3\. Stay local if remote adds drag.** One machine, zero latency.
*   **4\. Design for constraint.** Tiny hardware forces clarity — embrace it.

Old gear still ships solid work when you treat it with respect — and a little tough love. If all you’ve got is a crusty MacBook and a pocket-change VM, strip the bloat, keep the loop tight, and let the vintage silicon sing.

!

chatGPT conjure of the situation

**Acknowledgements**: [Tai Groot on twitter](https://x.com/warptux), Cursor, and chatGPT.
