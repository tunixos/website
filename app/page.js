import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts().slice(0, 5);

  return (
    <>
      <h1>Tunix</h1>
      <p>
        Tunix is a small Unix-like operating system for x86_64, built from
        scratch: a custom bootloader, a custom kernel, a full GNU userland,
        and a Wayland desktop.
      </p>
      <p>
        <img
          src="/screenshot.png"
          alt="Tunix running Weston with weston-terminal"
        />
      </p>

      <h2>Features</h2>
      <ul>
        <li>
          Custom kernel and bootloader: VFS, ext2, devfs, procfs, signals,
          epoll, ptys, preemptive scheduler
        </li>
        <li>
          Linux x86_64 syscall ABI — musl-built binaries run without a
          translation layer
        </li>
        <li>Persistent ext2 root filesystem (Linux-mountable)</li>
        <li>
          TCP/IP networking: ARP, IPv4, ICMP, UDP, TCP, raw and netlink
          sockets — enough for <code>git clone https://...</code>
        </li>
        <li>
          Wayland desktop: Weston on a native DRM driver with GL rendering,
          keyboard and mouse
        </li>
        <li>
          Self-hosting: gcc, binutils, and make run inside Tunix
        </li>
      </ul>

      <h2>Ported software</h2>
      <p>
        bash, coreutils, gcc, binutils, make, git, curl, nano, grep, sed,
        gawk, findutils, tar, gzip, htop, iproute2, lua, tinycc, ncurses,
        weston, wayland, mesa, libdrm, freetype, fontconfig, cairo, musl,
        mbedtls
      </p>

      <h2>Try it</h2>
      <pre>{`git clone https://github.com/tunixos/tunix
cd tunix
git submodule update --init --recursive
make all   # build the disk image
make run   # boot it in QEMU`}</pre>

      <h2>Blog</h2>
      <ul>
        {posts.map((p) => (
          <li key={p.slug}>
            {formatDate(p.date)} —{" "}
            <Link href={`/blog/${p.slug}/`}>{p.title}</Link>
          </li>
        ))}
      </ul>
      <p>
        <Link href="/blog/">All posts</Link>
      </p>
    </>
  );
}
