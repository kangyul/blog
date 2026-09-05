---
name: publish
description: Validate, build, commit, and push blog posts to deploy blog.yulkang.com via Vercel
disable-model-invocation: true
argument-hint: "[optional commit message]"
allowed-tools: Bash(git *) Bash(pnpm *) Bash(curl *) Read
---

Publish pending blog changes to production.

## Context

Posts are authored in Obsidian. The vault symlinks into this repo:

```
~/Dev/knowledge-base/blog  ->  src/content/posts/
```

So saving in Obsidian lands the file here immediately, but nothing reaches the
site until it is pushed. Vercel builds from GitHub `main` and deploys on push.

## Current state

Working tree:
!`git status --short`

Unpushed commits:
!`git log origin/main..HEAD --oneline || true`

## Steps

### 1. Identify what is being published

List the posts in `src/content/posts/` that are new or modified above. If
nothing is pending in the working tree and nothing is unpushed, say so and stop.

### 2. Validate frontmatter — do this before building

Read each new or modified post and check its frontmatter. The content collection
schema (`src/content.config.ts`) enforces these, and a violation fails
`astro check`, which aborts the whole Vercel deploy:

- `title` — required, string
- `pubDatetime` — required, must parse as a date
- `description` — required, string (used in meta tags and RSS)
- `tags` — optional, defaults to `["others"]`
- `draft` — optional; **if `true`, the post will not appear on the site**
- `modDatetime` — set this when meaningfully editing an already-published post,
  since sort order uses `modDatetime ?? pubDatetime`

Report problems and stop rather than guessing. Two cases deserve an explicit
heads-up before continuing:

- `draft: true` — publishing is legitimate (it stays hidden), but confirm that
  is what the user wants.
- `pubDatetime` in the future — the post stays hidden until that time AND
  requires a later rebuild to appear, because the site is statically generated.
  It will not surface on its own.

### 3. Build locally

```bash
pnpm build
```

This runs `astro check && astro build && pagefind --site dist`. Takes 1-2
minutes. It catches schema and type errors here instead of failing the
deploy. If it fails, report the error and stop — do not push a broken build.

### 4. Commit and push

Stage only the intended files (posts, plus any source changes the user asked
for). Write a commit message describing the post being published; use
$ARGUMENTS as the message if provided.

Push to `main` — that is the branch Vercel deploys.

### 5. Confirm the deploy

Poll the live site in the background until the change appears, then report the
result:

```bash
for i in $(seq 1 20); do
  curl -s --max-time 10 "https://blog.yulkang.com/?cb=$RANDOM" | grep -q "<SOME MARKER>" && { echo DEPLOYED; exit 0; }
  sleep 15
done
echo "NOT YET — check the Vercel dashboard"
```

Use a marker from the actual change: the post title for a new post, or the RSS
feed (`/rss.xml`) which lists every published post. Run it with
`run_in_background: true` so the user is not blocked.

If it has not appeared after a few minutes, the build likely failed on Vercel —
point the user at the Vercel dashboard rather than retrying blindly.
