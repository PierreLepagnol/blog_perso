import PostListItem from 'components/post-list-item';
import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({
    weight: ['400', '500', '700'],
    display: 'swap',
    subsets: ['latin'],
});

export default function NotFound() {
    const sortedPosts = allPosts.sort((a, b) =>
        compareDesc(new Date(a.date), new Date(b.date)),
    );

    return (
        <html lang="en" className={dmSans.className}>
            <head>
                <title>Not Found</title>
            </head>
            <body className="antialiased bg-main">
                <div className="max-w-[1440px] mx-auto">
                    <div className="space-y-12">
                        {sortedPosts.slice(0, 3).map((post) => (
                            <PostListItem post={post} key={post._id} />
                        ))}
                    </div>
                </div>
            </body>
        </html>
    );
}