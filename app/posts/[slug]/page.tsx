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
    <article className="mx-auto w-full min-w-0 max-w-[760px] px-1 sm:px-0">
      <Link
        href="/#articles"
        className="mb-8 inline-flex font-sans text-xs uppercase tracking-[0.18em] text-neutral-500 transition-colors hover:text-ink"
      >
        &larr; Back to Home
      </Link>

      <header className="mb-12 border-b border-neutral-200 pb-8">
        <h1 className="mb-5 text-balance font-serif text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl">
          {post.title}
        </h1>

        <p className="mb-5 max-w-2xl text-pretty break-words text-lg leading-8 text-neutral-600">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap items-center gap-2 font-sans text-xs uppercase tracking-[0.14em] text-neutral-500">
          <time dateTime={post.date}>
            {format(parseISO(post.date), "LLLL d, yyyy")}
          </time>
          <span>&middot;</span>
          <span>{post.readTime} min read</span>
        </div>
      </header>

      <Mdx code={post.mdx} />

      <div className="mt-16 border-t border-neutral-200 pt-7">
        <Link
          href="/#articles"
          className="font-sans text-xs uppercase tracking-[0.18em] text-neutral-500 transition-colors hover:text-ink"
        >
          Read more from home page &rarr;
        </Link>
      </div>
    </article>
  );
}
