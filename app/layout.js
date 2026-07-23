import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Tunix — a small Unix-like operating system",
  description:
    "Tunix is a Unix-like operating system for x86_64 with a custom bootloader and kernel, a GNU userland, a TCP/IP stack, and a Wayland desktop.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/blog/">Blog</Link>
          <a href="https://github.com/tunixos/tunix/tree/main/docs">Docs</a>
          <a href="https://github.com/tunixos/tunix">GitHub</a>
        </nav>
        {children}
        <footer>
          <p>
            Tunix is free software. Source on{" "}
            <a href="https://github.com/tunixos/tunixos">GitHub</a>. Want to
            write a blog post? Open a pull request adding a Markdown file to{" "}
            <a href="https://github.com/tunixos/website/tree/main/blogs">
              website/blogs
            </a>
            .
          </p>
        </footer>
      </body>
    </html>
  );
}
