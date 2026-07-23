import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPost, formatDate } from "@/lib/posts";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Tunix Blog`,
    description: post.description,
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article>
      <p>
        <Link href="/blog/">← All posts</Link>
      </p>
      <h1>{post.title}</h1>
      <p>
        <em>
          {formatDate(post.date)} · {post.author}
        </em>
      </p>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}
