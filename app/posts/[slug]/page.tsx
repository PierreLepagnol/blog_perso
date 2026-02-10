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
      {/* Header */}
      <header className="mb-8">
        <Link
          href="/posts"
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500 hover:text-ink mb-6 inline-block"
        >
          &larr; All Articles
        </Link>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter leading-[0.92] mb-4">
          {post.title}
        </h1>

        <div className="flex flex-wrap gap-4 font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-500 pb-4 border-b border-ink">
          <time dateTime={post.date}>
            {format(parseISO(post.date), "LLLL d, yyyy")}
          </time>
          <span>{post.readTime} min read</span>
        </div>
      </header>

      {/* Body */}
      <Mdx code={post.mdx} />

      {/* End */}
      <div className="border-t border-ink mt-12 pt-6">
        <Link
          href="/posts"
          className="font-sans text-xs uppercase tracking-[0.2em] font-semibold bg-ink text-newsprint px-5 py-2.5 border border-ink hover:bg-newsprint hover:text-ink transition-colors"
        >
          &larr; Back to Articles
        </Link>
      </div>
    </article>
  );
}
