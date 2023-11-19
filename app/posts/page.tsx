import Link from "next/link";
import { compareDesc, format, parseISO } from "date-fns";
import { allPosts, Post } from "contentlayer/generated";

function PostCard(post: Post) {
    return (
        <div className="mb-8">
            <h2 className="text-xl">
                <Link href={post.url} className="text-blue-700 hover:text-blue-900" legacyBehavior>{post.title}</Link>
            </h2>
            <time dateTime={post.date} className="block mb-2 text-xs text-gray-600">
                {format(parseISO(post.date), "LLLL d, yyyy")}
            </time>
            <div className="text-sm">
                {post.excerpt}
            </div>
        </div>
    );
}

export default function Home() {
    const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
    if (posts.length === 0) { return <div>No posts found.</div>; }
    return (
        <div className="max-w-xl py-8 mx-auto">
            {posts.map((post, idx) => (<PostCard key={idx} {...post} />))}
        </div>
    );
}
