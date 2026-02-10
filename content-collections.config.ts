import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { z } from "zod";

import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import rehypeToc from "@jsdevtools/rehype-toc";

const posts = defineCollection({
  name: "posts",
  directory: "posts",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    excerpt: z.string(),
    tags: z.array(z.string()),
    cover: z.string().optional(),
    content: z.string(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeToc,
          {
            headings: ["h1", "h2", "h3"],
            cssClasses: {
              toc: "page-outline",
              link: "page-link",
            },
          },
        ],
        rehypeAutolinkHeadings,
        [rehypePrettyCode, { theme: { dark: "github-dark" } }],
      ],
      remarkPlugins: [remarkGfm],
    });

    const wordsPerMinute = 200;
    const noOfWords = document.content.split(/\s/g).length;
    const readTime = Math.ceil(noOfWords / wordsPerMinute);

    return {
      ...document,
      mdx,
      url: `posts/${document._meta.path}`,
      readTime: String(readTime),
    };
  },
});

export default defineConfig({
  collections: [posts],
});
