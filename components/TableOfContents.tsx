"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type TocEntry = { id: string; text: string; level: 2 | 3 };

export function TableOfContents({ items }: { items: TocEntry[] }) {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (items.length === 0) return;
    const headings = items
      .map((it) => document.getElementById(it.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  let h2Index = 0;
  const numbered = items.map((it) => {
    if (it.level === 2) h2Index += 1;
    return { ...it, h2Index };
  });

  return (
    <nav aria-label="Table of contents" className="font-sans">
      <p className="mb-4 font-sans text-[0.62rem] font-bold uppercase tracking-[0.24em] text-editorial-red">
        Au sommaire
      </p>
      <ol className="border-l-2 border-editorial-red pl-5">
        {numbered.map((it, i) => {
          const isActive = activeId === it.id;
          if (it.level === 2) {
            return (
              <li
                key={it.id}
                className={cn(
                  "grid grid-cols-[auto_1fr] items-baseline gap-x-3 py-2 leading-snug",
                  i > 0 && "border-t border-dotted border-neutral-200",
                )}
              >
                <span className="font-serif text-base italic font-semibold text-editorial-red">
                  {String(it.h2Index).padStart(2, "0")}
                </span>
                <a
                  href={`#${it.id}`}
                  className={cn(
                    "text-[0.72rem] uppercase tracking-[0.14em] transition-colors hover:text-editorial-red",
                    isActive ? "text-editorial-red" : "text-neutral-700",
                  )}
                >
                  {it.text}
                </a>
              </li>
            );
          }
          return (
            <li key={it.id} className="pl-[1.7rem]">
              <a
                href={`#${it.id}`}
                className={cn(
                  "relative block py-1 pl-4 text-[0.64rem] uppercase tracking-[0.16em] transition-colors hover:text-editorial-red before:absolute before:left-0 before:top-[0.7rem] before:h-px before:w-2 before:bg-neutral-400",
                  isActive ? "text-editorial-red" : "text-neutral-500",
                )}
              >
                {it.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
