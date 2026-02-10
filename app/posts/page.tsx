import Link from "next/link";
import { compareDesc, format, parseISO } from "date-fns";
import { allPosts } from "content-collections";

export default function PostsPage() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  if (posts.length === 0) {
    return (
      <p className="text-center text-neutral-500 py-16">No articles yet.</p>
    );
  }

  return (
    <div>
      <h1 className="font-serif text-4xl font-black tracking-tight mb-8">
        Articles
      </h1>

      <div className="divide-y divide-ink">
        {posts.map((post) => (
          <article key={post._meta.path} className="py-6">
            <Link href={post.url} className="group block">
              <div className="flex flex-wrap gap-2 mb-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-500">
                    {tag}
                  </span>
                ))}
              </div>

              <h2 className="font-serif text-xl lg:text-2xl font-bold tracking-tight mb-2 group-hover:text-editorial-red transition-colors">
                {post.title}
              </h2>

              <p className="font-body text-sm text-neutral-600 leading-relaxed mb-3">
                {post.excerpt}
              </p>

              <div className="flex gap-4 font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-500">
                <time dateTime={post.date}>
                  {format(parseISO(post.date), "LLLL d, yyyy")}
                </time>
                <span>{post.readTime} min read</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
