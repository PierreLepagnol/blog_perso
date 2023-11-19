import { defineDocumentType, makeSource } from "contentlayer/source-files";

import rehypeAutolinkHeadings, {
  type Options as AutolinkOptions,
} from "rehype-autolink-headings";
import rehypePrettyCode, {
  type Options as PrettyCodeOptions,
} from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import rehypeToc from "@jsdevtools/rehype-toc";
import rehypeCodeTitles from "rehype-code-titles";

// defining document type where we will defing our mdx document frontmatter structure
// (all these fields will be passed to static json with types that can be imported and used by next app)
export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    excerpt: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" }, required: true },
    cover: { type: "image", required: false },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `posts/${post._raw.flattenedPath}`,
    },
    readTime: {
      type: "string",
      resolve: (post) => {
        const wordsPerMinute = 200;
        const noOfWords = post.body.raw.split(/\s/g).length;
        const minutes = noOfWords / wordsPerMinute;
        const readTime = Math.ceil(minutes);
        return readTime;
      },
    },
  },
}));

export default makeSource({
  // folder in which we will store our content mdx files
  contentDirPath: "posts",
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeToc,
        {
          headings: ["h1", "h2", "h3"], // Only include <h1> and <h2> headings in the TOC
          cssClasses: {
            toc: "page-outline", // Change the CSS class for the TOC
            link: "page-link", // Change the CSS class for links in the TOC
          },
        },
      ],
      rehypeAutolinkHeadings,
      [
        /**
         * Enhances code blocks with syntax highlighting, line numbers,
         * titles, and allows highlighting specific lines and words
         */
        rehypePrettyCode,
        {
          theme: {
            // light: 'github-light',
            dark: "github-dark",
          },
        } satisfies Partial<PrettyCodeOptions>,
      ],
    ],
    remarkPlugins: [remarkGfm],
  },
});
