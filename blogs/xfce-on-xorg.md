---
title: "A real Xfce desktop"
date: "2026-07-27"
author: "Tuna Kılıç"
description: "Tunix now boots straight into a full Xfce desktop on its own Xorg server the port chain, and the kernel bugs it took to get there."
---

# A real Xfce desktop

Tunix now boots straight into a full Xfce desktop. Not a demo widget, not a single
window on a bare compositor the whole thing: **xfwm4** managing windows, the
**panel** with an applications menu, **xfdesktop** painting the backdrop,
**Thunar** for files, and a real **xfce4-terminal** you can actually type into.
And it runs on **Xorg**.

![Tunix running the Xfce desktop](/blog/xfce-on-xorg1.png)

Getting here was the same game as the Wayland work: discover the kernel's missing
pieces one crash at a time, then fill them in.

## The road there

1. **Xorg, VT-less.** The modesetting driver drives our simpledrm-style
   `/dev/dri/card0`, but there is no second virtual terminal to switch to so
   the server runs without one, the way a seatd session would.
2. **GTK 3 with the X11 backend.** Our GTK was Wayland-only. Rebuilding cairo
   with the xlib backend and GTK with `x11_backend=true` got it drawing on X;
   the atk-bridge dependency (which drags in AT-SPI over D-Bus) was patched
   optional so we didn't have to port accessibility first.
3. **The X client libraries.** xcb-util, startup-notification, libICE/libSM, and
   **libwnck-3** the plumbing the window manager and session management link
   against.
4. **xfwm4.** The window manager, running the XRender compositor with GLX off.
5. **D-Bus and the session.** libdbus plus a session bus, then garcon (the menu
   library), xfce4-panel, xfce4-session, xfdesktop, and xfsettingsd which
   quietly needed libxml2 for xkbregistry.
6. **The finishing touches.** VTE and xfce4-terminal, a Thunar file-manager
   daemon, and the genuine Xfce wallpaper.

## The bugs worth remembering

**Every X client refused to connect.** libxcb reads the X setup reply with
`recv()`, and our kernel only understood `recvmsg` on unix sockets; the mirror
gap on the send side later blocked GDBus. On top of that, Xorg binds an
*abstract* socket (`@/tmp/.X11-unix/X0`), which our path read as unnamed. Three
unix-socket kernel fixes later, the clients found the server.

**The terminal opened and closed a second later.** VTE turns on `TIOCPKT` packet
mode on its pty — which we didn't implement — so it never opened its terminal.
Once that worked, VTE's spawn called `close_range(…, CLOSE_RANGE_CLOEXEC)`, and
our kernel *closed* those descriptors instead of marking them close-on-exec,
shredding VTE's error-report pipe mid-spawn and making every launch look like an
instant exit.

**Ctrl+C tore the whole desktop down.** A VT-less Xorg never grabs the keyboard,
so the kernel console kept cooking the same keystrokes X was reading — and a
console Ctrl+C broadcast SIGINT at the entire session. The console now stays
silent whenever an input stack has the keyboard open.

## Next stop

Loading the entire filesystem into the heap on mount works today, but it won't
scale as the desktop grows lazy, on-demand file loading is the obvious next
step. After that: real GPU acceleration, and more of the apps that make a desktop
feel like a desktop. The tree is on [GitHub](https://github.com/tunixos/tunix) —
patches welcome.
