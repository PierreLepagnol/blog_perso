import { format, parseISO } from "date-fns";
import { allPosts } from "content-collections";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/mdx_components";
import { TableOfContents } from "@/components/TableOfContents";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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

  const toc = post.toc ?? [];

  return (
    <div className="mx-auto w-full min-w-0 max-w-[1280px] px-4 sm:px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-14">
      <article className="min-w-0 lg:max-w-[860px] lg:justify-self-end">
        <Button asChild variant="ghost" className="mb-8 font-sans text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <Link href="/posts" className="no-underline hover:no-underline">
            <ArrowLeftIcon data-icon="inline-start" />
            Back to all articles
          </Link>
        </Button>

        <header className="mb-12 pb-8">
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
        <Separator className="-mt-12 mb-12" />

        {toc.length > 0 ? (
          <details className="mb-10 rounded-sm border-l-2 border-editorial-red pl-4 lg:hidden" open>
            <summary className="cursor-pointer font-sans text-[0.62rem] font-bold uppercase tracking-[0.24em] text-editorial-red">
              Au sommaire
            </summary>
            <div className="mt-4">
              <TableOfContents items={toc} />
            </div>
          </details>
        ) : null}

        <Mdx code={post.mdx} />

        <div className="mt-16 pt-7">
          <Separator className="-mt-7 mb-7" />
          <Button asChild variant="link" className="px-0 font-sans text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <Link href="/posts">
              Back to all articles
              <ArrowRightIcon data-icon="inline-end" />
            </Link>
          </Button>
        </div>
      </article>

      {toc.length > 0 ? (
        <aside className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-8 pt-1">
            <TableOfContents items={toc} />
          </div>
        </aside>
      ) : null}
    </div>
  );
}
