import * as React from "react";
import Image from "next/image";
import { MDXContent } from "@content-collections/mdx/react";

import { cn } from "@/lib/utils";
import { Callout } from "@/components/callout";
import { MdxCard } from "@/components/mdx-card";
import CodeHead from "@/components/code-head";

type Props = { className?: string; [key: string]: any };

const components = {
  CodeHead,
  h1: ({ className, ...props }: Props) => (
    <h1 className={cn("mt-2 scroll-m-20 text-4xl font-black tracking-tighter", className)} {...props} />
  ),
  h2: ({ className, ...props }: Props) => (
    <h2 className={cn("mt-12 scroll-m-20 border-b-2 border-ink pb-2 text-2xl font-bold first:mt-0", className)} {...props} />
  ),
  h3: ({ className, ...props }: Props) => (
    <h3 className={cn("mt-8 scroll-m-20 text-xl font-bold", className)} {...props} />
  ),
  h4: ({ className, ...props }: Props) => (
    <h4 className={cn("mt-8 scroll-m-20 text-lg font-bold", className)} {...props} />
  ),
  h5: ({ className, ...props }: Props) => (
    <h5 className={cn("mt-8 scroll-m-20 font-sans text-base font-semibold uppercase tracking-widest", className)} {...props} />
  ),
  h6: ({ className, ...props }: Props) => (
    <h6 className={cn("mt-8 scroll-m-20 font-sans text-sm font-semibold uppercase tracking-widest text-neutral-600", className)} {...props} />
  ),
  a: ({ className, ...props }: Props) => (
    <a className={cn("underline underline-offset-4 decoration-2 decoration-editorial-red/50 hover:decoration-editorial-red", className)} {...props} />
  ),
  p: ({ className, ...props }: Props) => (
    <p className={cn("leading-7 not-first:mt-6 text-neutral-700", className)} {...props} />
  ),
  ul: ({ className, ...props }: Props) => (
    <ul className={cn("my-6 ml-6 list-disc text-neutral-700", className)} {...props} />
  ),
  ol: ({ className, ...props }: Props) => (
    <ol className={cn("my-6 ml-6 list-decimal text-neutral-700", className)} {...props} />
  ),
  li: ({ className, ...props }: Props) => (
    <li className={cn("mt-2 leading-7", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: Props) => (
    <blockquote className={cn("mt-6 border-l-4 border-ink pl-6 italic text-lg text-neutral-600", className)} {...props} />
  ),
  img: ({ className, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn("border border-ink grayscale hover:grayscale-0 transition-all", className)} alt={alt} {...props} />
  ),
  hr: ({ ...props }) => <hr className="my-8 border-t-2 border-ink" {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn("w-full border-collapse border border-ink text-sm", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className={cn("border-b border-ink even:bg-neutral-100", className)} {...props} />
  ),
  th: ({ className, ...props }: Props) => (
    <th className={cn("border border-ink px-4 py-2 text-left font-sans text-xs uppercase tracking-widest font-bold bg-ink text-newsprint", className)} {...props} />
  ),
  td: ({ className, ...props }: Props) => (
    <td className={cn("border border-ink px-4 py-2 text-left", className)} {...props} />
  ),
  pre: ({ className, ...props }: Props) => (
    <pre className={cn("mb-4 overflow-x-auto border border-ink border-t-0 bg-editor-bg text-sm", className)} {...props} />
  ),
  code: ({ className, ...props }: Props) => (
    <code className={cn("px-1 py-0.5 font-mono text-sm bg-neutral-100 border border-muted", className)} {...props} />
  ),
  Image,
  Callout,
  Card: MdxCard,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  return (
    <div className="mdx">
      <MDXContent code={code} components={components} />
    </div>
  );
}
