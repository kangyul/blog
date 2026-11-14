---
title: 2026 November 13th
pubDatetime: 2026-11-13T00:00:00+09:00
description: Day one of learning metal-cpp and graphics, covering Metal's command chain and how a frame gets drawn
tags:
  - metal
  - graphics
  - cpp
draft: false
---

I'm learning metal-cpp & graphics. I've failed so many times learning it so I'd like to do it properly. I'm gonna study everyday for at least 30 mins. Hope I can be good at C++, graphics, and Metal graphics api!

What I learned for today: 
* Chain in Metal program
* How a frame gets drawn?

# Chain in Metal Program
* Device -> Command Queue -> Command Buffer -> Encoder -> Commit

# How a frame gets drawn?

1. **Get a command buffer.** This is a to-do list for the GPU.
2. **Start a render pass.** This clears the screen to the clear color, which is red here.
3. **End the pass.**
4. **Present.** Show the result on screen.
5. **Commit.** Send the to-do list to the GPU.

