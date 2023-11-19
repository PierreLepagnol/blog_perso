import { format, parseISO } from "date-fns";
import { allPosts } from "contentlayer/generated";
import { Metadata } from "next";
import { Mdx } from "@/components/mdx_components";

interface IProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post._raw.flattenedPath }));
}

export function generateMetadata({ params: { slug } }: IProps): Metadata {
  const post = allPosts.find((post) => post._raw.flattenedPath === slug);

  if (!post) {
    return {};
  }

  const { excerpt, title, date } = post;

  const description = excerpt;

  const ogImage = {
    url: `${process.env.HOST}/blog/${slug}/og.png`,
  };

  return {
    title,
    description,
    openGraph: {
      type: "article",
      url: `${process.env.HOST}/blog/${slug}`,
      title,
      description,
      publishedTime: date,
      images: [ogImage],
    },
    twitter: {
      title,
      description,
      images: ogImage,
      card: "summary_large_image",
    },
  };
}
const PostLayout = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const post = allPosts.find((post) => post._raw.flattenedPath === slug);

  if (!post) {
    return <div>Aucun POST</div>; // or return <SomeComponent /> to render a specific component
  }

  // const Content =

  return (
    <article className="py-8 mx-auto max-w-xl">
      <div className="mb-8 text-center">
        <time dateTime={post.date} className="mb-1 text-xs text-gray-600">
          {format(parseISO(post.date), "LLLL d, yyyy")}
        </time>
        <h1>{post.title}</h1>
      </div>
      {Mdx(post.body)}
    </article>
  );
};
export default PostLayout;
