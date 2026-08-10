---
title: "Starting over, in public"
pubDatetime: 2026-08-10T09:00:00+09:00
description: "Why I'm keeping notes on learning graphics where other people can read them."
tags:
  - meta
draft: false
---

I've been studying computer graphics full time — the math, the C++, the way a
triangle actually becomes pixels. Most of what I learn goes into an Obsidian
vault that nobody reads, including, eventually, me.

So this blog is an experiment: when a note gets clear enough to explain, it moves
here.

## How this works

Posts live as plain Markdown inside my vault. I write them the same way I write
everything else, and a symlink puts them straight into this site's repo. No
export step, no copy-paste, no separate CMS.

```bash
~/Dev/knowledge-base/blog/   ->   ~/Dev/blog/src/content/posts/
```

Anything with `draft: true` in its frontmatter stays private until I flip it.

## What's coming

The current thread is MapLibre Native — a real, production vector map renderer.
Reading it has been the fastest way to see how the concepts fit together at a
scale no tutorial reaches.
