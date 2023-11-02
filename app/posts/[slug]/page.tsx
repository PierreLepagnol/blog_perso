// app/posts/[slug]/page.tsx
import { format, parseISO } from 'date-fns'
import { allPosts } from 'contentlayer/generated'
import { Mdx } from '@/components/mdx_components'

export const generateStaticParams = async () => allPosts.map((post) => ({ slug: post.slugAsParams }))

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
    const post = allPosts.find((post) => post.slugAsParams === params.slug)
    if (!post) throw new Error(`Post not found for slug: ${params.slug}`)
    return { title: post.title }
}

const PostLayout = ({ params }: { params: { slug: string } }) => {
    const post = allPosts.find((post) => post.slugAsParams === params.slug)
    if (!post) throw new Error(`Post not found for slug: ${params.slug}`)
    return (
        <article className="mx-auto max-w-xl py-8">
            <div className="mb-8 text-center">
                <time dateTime={post.date} className="mb-1 text-xs text-gray-600">
                    {format(parseISO(post.date), 'LLLL d, yyyy')}
                </time>
                <h1 className="text-3xl font-bold">{post.title}</h1>
            </div>
            <Mdx code={post.body.code} />
        </article>
    )
}

export default PostLayout