import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { z } from "zod";

import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import GithubSlugger from "github-slugger";

import { katexMacros } from "./lib/math-vocabulary";

type TocEntry = { id: string; text: string; level: 2 | 3 };

function extractToc(markdown: string): TocEntry[] {
  const slugger = new GithubSlugger();
  const lines = markdown.split("\n");
  const entries: TocEntry[] = [];
  let inFence = false;
  for (const line of lines) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;
    const level = match[1].length as 2 | 3;
    const text = match[2].replace(/[*_`]/g, "").trim();
    entries.push({ id: slugger.slug(text), text, level });
  }
  return entries;
}

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
        rehypeAutolinkHeadings,
        [rehypeKatex, { macros: katexMacros }],
        [rehypePrettyCode, { theme: { dark: "github-dark" } }],
      ],
      remarkPlugins: [remarkGfm, remarkMath],
    });

    const wordsPerMinute = 200;
    const noOfWords = document.content.split(/\s/g).length;
    const readTime = Math.ceil(noOfWords / wordsPerMinute);
    const toc = extractToc(document.content);

    return {
      ...document,
      mdx,
      toc,
      url: `posts/${document._meta.path}`,
      readTime: String(readTime),
    };
  },
});

const projects = defineCollection({
  name: "projects",
  directory: "data",
  include: "projects.yml",
  parser: "yaml",
  schema: z.object({
    projects: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        url: z.string().optional(),
      }),
    ),
  }),
});

export default defineConfig({
  collections: [posts, projects],
});
