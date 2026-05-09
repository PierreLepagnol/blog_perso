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
  bash: { name: "Bash", icon: <IoTerminalOutline /> },
  sh: { name: "Shell", icon: <IoTerminalOutline /> },
  console: { name: "console", icon: <IoTerminalOutline /> },
};

export default function CodeHead({ name, lang }: { name: string; lang: string }) {
  const langData = LANGS[lang];

  return (
    <div className="mdx-code-head mt-8 flex w-full items-center gap-3 rounded-t-md border border-neutral-700/60 border-b border-b-neutral-800 bg-editor-bg px-4 py-2.5 font-mono text-[0.78rem] text-neutral-300 shadow-sm">
      <div className="hidden sm:flex items-center gap-1.5">
        <span className="block size-2.5 rounded-full bg-editor-red" />
        <span className="block size-2.5 rounded-full bg-editor-yellow" />
        <span className="block size-2.5 rounded-full bg-editor-green" />
      </div>
      <div className="flex grow items-center justify-between">
        {name && <span className="truncate">{name}</span>}
        {langData && (
          <div className="flex items-center gap-1.5 text-neutral-500">
            <span className="text-sm">{langData.icon}</span>
            <span className="text-[0.65rem] uppercase tracking-[0.18em]">{langData.name}</span>
          </div>
        )}
      </div>
    </div>
  );
}
