---
title: "Weston on the real screen"
date: 2026-07-25
author: "Tuna Kılıç"
description: "How Tunix went from a framebuffer terminal to a full Wayland desktop running on a native DRM driver."
---

Tunix now runs Weston, the reference Wayland compositor on its own DRM
driver, with the GL renderer, working keyboard and mouse, and
weston-terminal rendering JetBrains Mono on the real display.

![Weston on Tunix](/blog/weston-on-real-drm1.png)

## The road there

Getting a Wayland desktop on a from-scratch kernel is mostly about
discovering, one crash at a time, which Linux interfaces real software
quietly depends on. The plan was deliberately ordered so each step ran on
top of the previous one:

1. **Shared memory** — `memfd_create` and real `MAP_SHARED` semantics, which
   immediately uncovered a `mprotect`/COW interaction bug in the VM layer.
2. **libwayland** — needed `libffi`, and it turned out the real missing
   syscall was `flock`.
3. **Weston headless** — exposed `seteuid`, `fallocate`, and `mremap`.
4. **A simpledrm-style `/dev/dri/card0`** — modesetting, dumb buffers,
   page-flip events, and console arbitration.
5. **The real thing** — Weston's DRM backend on that device.

## The bugs worth remembering

Two failures stood out. The first: Weston's DRM backend passes ioctl request
numbers around as `unsigned long`, and on the way through the syscall path
the constant was **sign-extended** the kernel compared against a value with
32 high bits set and rejected every DRM ioctl. The fix was one mask; finding
it took a day.

The second was nastier. Weston forked a child, and the child scribbled over
the parent's pages. The COW machinery marked pages with `PAGE_SHARED`
semantics where it should not have  a fork bug that only manifested once a
real compositor exercised shared mappings and copy-on-write in the same
address space.

## PRIME was not optional

The GL renderer refused to work without PRIME buffer export Mesa hands
buffers between contexts as dmabuf file descriptors even when everything is
in software. So Tunix got `DRM_IOCTL_PRIME_HANDLE_TO_FD` and friends, and
the GL renderer came up.

The result is a from-scratch kernel presenting a desktop that speaks the
same protocols as desktop Linux. Next stop: hardware-accelerated GL through
virtio-gpu and virgl.
