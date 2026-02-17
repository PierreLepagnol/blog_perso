import { format, parseISO } from "date-fns";
import { allPosts } from "content-collections";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/mdx_components";
import Link from "next/link";

function getPost(slug: string) {
  return allPosts.find((post) => post._meta.path === slug);
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post._meta.path }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  return (
    <article className="max-w-2xl mx-auto">
      <Link
        href="/#articles"
        className="font-sans text-xs uppercase tracking-[0.2em] text-neutral-500 hover:text-ink mb-6 inline-block"
      >
        &larr; Back to Home
      </Link>

      <header className="mb-10 border-b border-neutral-200 pb-6">
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-4">
          {post.title}
        </h1>

        <div className="flex flex-wrap gap-2 font-sans text-xs uppercase tracking-[0.15em] text-neutral-500">
          <time dateTime={post.date}>
            {format(parseISO(post.date), "LLLL d, yyyy")}
          </time>
          <span>&middot;</span>
          <span>{post.readTime} min read</span>
        </div>
      </header>

      <Mdx code={post.mdx} />

      <div className="border-t border-neutral-200 mt-12 pt-6">
        <Link
          href="/#articles"
          className="font-sans text-xs uppercase tracking-[0.2em] text-neutral-500 hover:text-ink"
        >
          Read more from home page &rarr;
        </Link>
      </div>
    </article>
  );
}
