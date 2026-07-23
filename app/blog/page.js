import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";

export const metadata = {
  title: "Blog — Tunix",
  description: "Development notes and deep dives from the Tunix project.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <>
      <h1>Blog</h1>
      <p>
        Want to write a post? Open a pull request adding a Markdown file to{" "}
        <a href="https://github.com/tunixos/website/tree/main/blogs">
          website/blogs
        </a>
        .
      </p>
      <ul>
        {posts.map((p) => (
          <li key={p.slug}>
            {formatDate(p.date)} —{" "}
            <Link href={`/blog/${p.slug}/`}>{p.title}</Link>
            {p.description ? <> — {p.description}</> : null}
          </li>
        ))}
      </ul>
    </>
  );
}
