import React from "react";
import {
  IoLogoHtml5, IoLogoCss3, IoLogoSass, IoLogoJavascript,
  IoLogoReact, IoLogoMarkdown, IoTerminalOutline, IoLogoPython,
} from "react-icons/io5";

const LANGS: Record<string, { name: string; icon: React.ReactNode }> = {
  python: { name: "Python", icon: <IoLogoPython /> },
  html: { name: "HTML", icon: <IoLogoHtml5 /> },
  css: { name: "CSS", icon: <IoLogoCss3 /> },
  scss: { name: "Sass", icon: <IoLogoSass /> },
  js: { name: "JavaScript", icon: <IoLogoJavascript /> },
  jsx: { name: "JSX", icon: <IoLogoReact /> },
  md: { name: "Markdown", icon: <IoLogoMarkdown /> },
  mdx: { name: "MDX", icon: <IoLogoMarkdown /> },
  console: { name: "console", icon: <IoTerminalOutline /> },
};

export default function CodeHead({ name, lang }: { name: string; lang: string }) {
  const langData = LANGS[lang];

  return (
    <div className="p-3 font-mono text-xs mt-8 text-neutral-400 bg-ink border border-ink border-b-0 flex items-center w-full">
      <div className="hidden sm:flex items-center mr-3 gap-1.5">
        <span className="w-2.5 h-2.5 bg-editor-red block" />
        <span className="w-2.5 h-2.5 bg-editor-yellow block" />
        <span className="w-2.5 h-2.5 bg-editor-green block" />
      </div>
      <div className="flex justify-between grow">
        {name && <span>{name}</span>}
        {langData && (
          <div className="flex items-center gap-1 text-neutral-500">
            {langData.icon}
            <span className="uppercase tracking-widest text-[10px]">{langData.name}</span>
          </div>
        )}
      </div>
    </div>
  );
}
