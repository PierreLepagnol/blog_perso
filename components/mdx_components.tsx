import * as React from "react";
import Image from "next/image";
import { MDXContent } from "@content-collections/mdx/react";

import { cn } from "@/lib/utils";
import { Callout } from "@/components/callout";
import { MdxCard } from "@/components/mdx-card";
import CodeHead from "@/components/code-head";
import {
  Table,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";

type Props = { className?: string; [key: string]: any };

const components = {
  CodeHead,
  h1: ({ className, ...props }: Props) => (
    <h1 className={cn("mt-3 scroll-m-20 text-balance text-4xl font-extrabold tracking-tight", className)} {...props} />
  ),
  h2: ({ className, ...props }: Props) => (
    <h2 className={cn("mt-14 scroll-m-20 text-balance border-b border-neutral-200 pb-3 text-3xl font-bold tracking-tight first:mt-0", className)} {...props} />
  ),
  h3: ({ className, ...props }: Props) => (
    <h3 className={cn("mt-10 scroll-m-20 text-balance text-2xl font-semibold tracking-tight", className)} {...props} />
  ),
  h4: ({ className, ...props }: Props) => (
    <h4 className={cn("mt-8 scroll-m-20 text-xl font-semibold tracking-tight", className)} {...props} />
  ),
  h5: ({ className, ...props }: Props) => (
    <h5 className={cn("mt-8 scroll-m-20 font-sans text-sm font-semibold uppercase tracking-[0.16em] text-neutral-600", className)} {...props} />
  ),
  h6: ({ className, ...props }: Props) => (
    <h6 className={cn("mt-8 scroll-m-20 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500", className)} {...props} />
  ),
  a: ({ className, ...props }: Props) => (
    <a className={cn("font-medium text-ink underline decoration-editorial-red/45 decoration-2 underline-offset-4 transition-colors hover:text-editorial-red hover:decoration-editorial-red", className)} {...props} />
  ),
  p: ({ className, children, ...props }: Props) => {
    const childArray = React.Children.toArray(children);
    const onlyChild = childArray.length === 1 ? childArray[0] : null;
    if (
      React.isValidElement(onlyChild) &&
      (onlyChild.type === "img" || onlyChild.type === components.img)
    ) {
      return <>{children}</>;
    }
    return (
      <p
        className={cn(
          "text-pretty break-words text-[1.06rem] leading-8 text-neutral-700 not-first:mt-6",
          className,
        )}
        {...props}
      >
        {children}
      </p>
    );
  },
  ul: ({ className, ...props }: Props) => (
    <ul className={cn("my-5 ml-6 list-disc marker:text-editorial-red text-neutral-700 [&>li+li]:mt-1", className)} {...props} />
  ),
  ol: ({ className, ...props }: Props) => (
    <ol className={cn("my-5 ml-6 list-decimal marker:font-sans marker:text-sm marker:font-semibold marker:text-editorial-red text-neutral-700 [&>li+li]:mt-1", className)} {...props} />
  ),
  li: ({ className, ...props }: Props) => (
    <li className={cn("break-words pl-2 text-[1.06rem] leading-7", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: Props) => (
    <blockquote className={cn("mdx-blockquote relative my-10 border-l-2 border-editorial-red pl-7 pr-2 font-serif text-[1.35rem] italic leading-[1.55] text-neutral-700", className)} {...props} />
  ),
  img: ({ className, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <figure className="my-10">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={cn("w-full rounded-sm", className)} alt={alt} {...props} />
      {alt ? (
        <figcaption className="mt-3 text-center font-sans text-xs uppercase tracking-[0.16em] text-neutral-500">
          {alt}
        </figcaption>
      ) : null}
    </figure>
  ),
  hr: ({ ...props }) => (
    <hr
      className="mdx-hr my-14 h-0 border-0 text-center"
      {...props}
    />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-8 w-full overflow-x-auto rounded-sm border border-neutral-200 bg-white shadow-sm">
      <Table className={cn("w-full border-collapse text-sm", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <TableRow className={cn("last:border-b-0 even:bg-neutral-100/70", className)} {...props} />
  ),
  th: ({ className, ...props }: Props) => (
    <TableHead className={cn("px-4 py-3 text-left font-sans text-xs font-semibold uppercase tracking-[0.14em] text-neutral-600", className)} {...props} />
  ),
  td: ({ className, ...props }: Props) => (
    <TableCell className={cn("px-4 py-3 text-left leading-7 text-neutral-700", className)} {...props} />
  ),
  pre: ({ className, ...props }: Props) => (
    <pre className={cn("overflow-x-auto rounded-md border border-neutral-700/60 bg-editor-bg px-5 py-4 text-sm leading-7 shadow-sm", className)} {...props} />
  ),
  code: ({ className, ...props }: Props) => {
    const isCodeBlock =
      (typeof className === "string" && className.includes("language-")) ||
      props["data-language"] ||
      props["data-theme"];

    if (isCodeBlock) {
      return <code className={className} {...props} />;
    }

    return (
      <code
        className={cn("rounded-[3px] bg-neutral-100 px-[0.4em] py-[0.15em] font-mono text-[0.88em] text-ink", className)}
        {...props}
      />
    );
  },
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
