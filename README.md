# Tunix Website

The [tunix](https://github.com/tunixos/tunix) project website

## Writing a blog post

Blog posts are plain Markdown files in [`blogs/`](blogs/). To publish one,
open a pull request that adds a file:

```
website/blogs/my-post-title.md
```

The filename (without `.md`) becomes the URL slug: `/blog/my-post-title/`.

Each post starts with YAML frontmatter:

```markdown
---
title: "My Post Title"
date: 2026-07-22
author: "Your Name"
description: "One sentence shown in the post list and in search results."
---

Your Markdown content here. Code blocks, lists, images, and links all work.
```

Guidelines:

- Use a lowercase, hyphenated filename (`tcp-retransmit-timer.md`).
- `date` is `YYYY-MM-DD`; posts are sorted newest-first.
- Keep images small; put them in `public/blog/` and reference them as
  `/blog/your-image.png`.
- Posts should relate to Tunix or low-level systems development.
