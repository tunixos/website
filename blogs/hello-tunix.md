---
title: "Hello, Tunix"
date: 2026-07-22
author: "Tuna Kılıç"
description: "What Tunix is, why it exists, and where the project stands today."
---

Tunix is a small Unix-like operating system for x86_64, built from scratch:
a custom bootloader, a custom kernel, and a userland assembled from ported
free software. This site is the new home for development notes and progress
reports.

## Why build another OS?

Because reading about how an operating system works is not the same as
building one. Every subsystem in Tunix — the VFS, the ext2 driver, the
scheduler, the TCP stack, the DRM driver — exists because something above it
needed it, and each one taught a lesson that no textbook chapter could.

The guiding constraint is simple: **stay small enough to read**. The kernel
is on the order of twenty thousand lines of C. You can sit down with it in
an afternoon.

## Where things stand

Today Tunix boots from its own bootloader into a kernel with:

- A persistent ext2 root filesystem that Linux can mount too
- The Linux x86_64 syscall ABI, so musl-built binaries just run
- A TCP/IP stack good enough for `git clone https://...`
- A Wayland desktop: Weston on a native DRM driver, with GL rendering,
  keyboard and mouse input, and a real terminal emulator

And the userland is not a toy: bash, GNU coreutils, gcc, binutils, make,
git, nano, htop, lua, and more, all built against musl. Tunix is
self-hosting — it can compile programs for itself, on itself.

## What's next

The current focus is the graphics stack: the virtio-gpu driver already does
2D KMS against a real virtual GPU, and the next milestone is the virgl 3D
path for actual GPU-accelerated OpenGL.

If any of this sounds interesting, the code is on
[GitHub](https://github.com/tunixos/website) — and this blog accepts posts by
pull request.
