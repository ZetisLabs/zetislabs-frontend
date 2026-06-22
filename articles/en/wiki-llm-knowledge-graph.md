---
title: "The AI-maintained wiki: how to work with LLMs without losing the thread"
excerpt: "Andrej Karpathy revived a simple idea: let an LLM build and maintain your knowledge base, a wiki of linked markdown notes. Here is the method, how it actually differs from a classic RAG, and how I use it every day at ZetisLabs."
category: "AI & Automation"
author:
  name: "Lucien Fernandez"
  avatar: "LF"
date: "2026-06-10"
readTime: "7 min"
featured: false
---

# The AI-maintained wiki: how to work with LLMs without losing the thread

A while ago, I published a LinkedIn post about the way I work with language models. The trigger: a [gist by Andrej Karpathy](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) describing a dead-simple pattern, **letting an LLM build and maintain a personal wiki**, a collection of linked markdown notes. This article walks through the method, what it really changes, and how I use it daily.

One thing up front: I'm not theorizing. This site, our internal notes, our marketing knowledge base, all of it runs on this method. The example I give below isn't a slide-deck diagram, it's my actual workflow.

## What is an AI-maintained wiki?

[Andrej Karpathy](https://en.wikipedia.org/wiki/Andrej_Karpathy), OpenAI co-founder, former director of AI at Tesla, and the person who popularized the phrase "vibe coding," describes a **three-layer** architecture in his "LLM Wiki" gist:

1. **Raw sources** (never edited): the articles, papers, and notes that you, the human, choose to ingest.
2. **The wiki** (maintained by the AI): markdown notes (summaries, entity pages, concept pages) connected by internal links.
3. **The schema** (a configuration file, e.g. `CLAUDE.md`): the rules telling the AI how to structure and maintain the wiki.

Three operations keep the system running:

| Operation  | What the AI does                                                                                     |
| ---------- | ---------------------------------------------------------------------------------------------------- |
| **Ingest** | Read a new source, extract the key ideas, create/update the relevant notes, and **rewire the links** |
| **Query**  | Answer a question by searching _the wiki_ (not the raw sources) and citing its own notes             |
| **Lint**   | Surface contradictions, orphan notes, broken links, and stale claims                                 |

The idea behind the fancy term "[knowledge graph](https://en.wikipedia.org/wiki/Knowledge_graph)" is an old one: it's the good old _second brain_, the network of linked notes that note-taking enthusiasts have known for years.

## Why is it different now?

Because the method's main friction is finally gone.

Everyone who has built a second brain by hand has hit the **same wall**: keeping the connections between ideas current and coherent. Every new note forces you to re-read the old ones, rewire the links, and fix what contradicts. It's tedious archivist work, and that's exactly where most systems die.

When you work with an LLM, it no longer just **writes** your notes: it also **creates and maintains the links**. The maintenance chore, the very thing that used to kill the method, moves to the machine. Knowledge **compounds over time** instead of being rebuilt on every question.

## If the AI writes my notes, am I still learning?

It's a fair objection, and the answer is: yes, _if_ you don't stop at the writing.

A note written by the AI and never re-read teaches you nothing. But the right usage is different: you **read** the notes, you **ask questions**, you raise your doubts, and the AI updates the notes based on your feedback. Through these back-and-forths you end up with a **deeply personalized** knowledge base, and more importantly you've done the intellectual work of testing it against your own understanding.

The game-changer over time: as the project moves forward, **the AI knows what you've mastered**, the why behind the how, without you having to remind it in every conversation. If you code, you list once the technologies and conventions you want to use, and the AI reuses them. You keep the knowledge of your project _instead of re-explaining it on a loop_.

## Wiki or RAG: what's the concrete difference?

If you know the space a little, you'll tell me this is just [RAG](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) (retrieval-augmented generation). Not quite, and the nuance is the whole point of the method.

- **RAG** retrieves, on every query, the **chunks of raw documents closest** to your question (by semantic similarity) and injects them into the context. There's no structured memory: you start from the fragments every time.
- **A wiki / knowledge graph** starts from knowledge that's **already compiled and linked**. The AI doesn't just grab the nearest passage: it can **follow the explicit links** between notes and pull in the whole relevant neighborhood of an idea.

The difference in one sentence: RAG retrieves fragments, the wiki **draws on a network of meaning that's already been built**.

There's an honest limit: beyond a certain number of notes, the AI can get lost. But for a solution that's **fast to set up and free of complexity**, I don't know anything better. And to push further, you combine the two: a **GraphRAG** uses RAG to absorb a large volume of notes _and_ the knowledge graph to link them, the best of both worlds.

## How do you read and edit your wiki easily?

The wiki is just a folder of markdown files: you can open it with anything. The most comfortable setup is to put an [Obsidian](https://obsidian.md/) vault on top. You read and edit your notes like a linked website, and the [Web Clipper](https://obsidian.md/clipper) lets you capture a source in one click to ingest later.

My concrete workflow, to make it tangible:

1. I create **one wiki per project**, in a GitHub repo.
2. I link it as a **Git submodule** to the project's repo: the knowledge lives next to the code.
3. I also clone it into an **Obsidian vault**: I have most of my notes accessible everywhere, in a few commands.

I've published a repo that explains the whole method and provides _skills_ to simplify the housekeeping (ingest, lint…): **[github.com/lucienfer/wikis](https://github.com/lucienfer/wikis)**.

## In short

- **The pattern** (Karpathy): an LLM builds and maintains a wiki of linked markdown notes, in three layers (raw sources / wiki / schema) and three operations (ingest, query, lint).
- **What changes**: the historic friction of the _second brain_, keeping the links current, moves to the machine. Knowledge compounds instead of being rebuilt.
- **You still learn**, provided you read the notes and challenge the AI. As a bonus you get a personalized knowledge base and an AI that knows your project.
- **Wiki ≠ RAG**: RAG retrieves fragments, the wiki follows a network of links that's already built; GraphRAG combines the two.
- **Tools**: markdown + GitHub (submodule) + Obsidian on top to read/edit.

Using AI well today means not losing the thread. This method is cheap to set up, and it sharpens both your learning and your hands-on practice.

---

At **ZetisLabs**, this is exactly the kind of system we build for companies: AI tools that rely on **your** corpus (your documents, your notes, your vocabulary) rather than the web, paid once, and that you own. If you want to see what a wiki or an assistant tailored to your knowledge could save you, [book a 30-minute call](https://calendly.com/lucien-zetislabs/30min). It's a conversation, not a sales pitch.

## Sources

- Andrej Karpathy, _LLM Wiki_: [gist.github.com/karpathy](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) (the three-layer pattern and the ingest/query/lint operations)
- _Andrej Karpathy_: [Wikipedia](https://en.wikipedia.org/wiki/Andrej_Karpathy)
- _Knowledge graph_: [Wikipedia](https://en.wikipedia.org/wiki/Knowledge_graph)
- _Retrieval-augmented generation (RAG)_: [Wikipedia](https://en.wikipedia.org/wiki/Retrieval-augmented_generation)
- Obsidian: [obsidian.md](https://obsidian.md/) · Web Clipper: [obsidian.md/clipper](https://obsidian.md/clipper)
- The method's repo (skills included): [github.com/lucienfer/wikis](https://github.com/lucienfer/wikis)
