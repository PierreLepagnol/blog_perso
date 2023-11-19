import React from 'react';
import { IoLogoHtml5, IoLogoCss3, IoLogoSass, IoLogoJavascript, IoLogoReact, IoLogoMarkdown, IoTerminalOutline, IoLogoPython, IoLogoLinkedin } from 'react-icons/io5';


type CodeHeadProps = {
  name: string;
  lang: string;
}

export default function CodeHead({ name, lang }: CodeHeadProps) {
  const outputLanguageString = (value: string) => {
    switch (value) {
      case "python": {
        return { name: "Python", icon: <IoLogoPython /> };
      }
      case "html": {
        return { name: "HTML", icon: <IoLogoHtml5 /> };
      }
      case "css": {
        return { name: "CSS", icon: <IoLogoCss3 /> };
      }
      case "scss": {
        return { name: "Sass", icon: <IoLogoSass /> };
      }
      case "js": {
        return { name: "JavaScript", icon: <IoLogoJavascript /> };
      }
      case "jsx": {
        return { name: "JSX", icon: <IoLogoReact /> };
      }
      case "md": {
        return { name: "Markdown", icon: <IoLogoMarkdown /> };
      }
      case "mdx": {
        return { name: "MDX", icon: <IoLogoMarkdown /> };
      }
      case "console": {
        return { name: "console", icon: <IoTerminalOutline /> };
      }
      default:
        break;
    }
  };
  const langData = outputLanguageString(lang);
  const iconColor = getIconColor(lang); // Function to determine icon color based on language

  return (
    <div className="p-4 font-mono text-sm mt-8 leading-4 text-white/60 bg-editor-bg rounded-t-lg flex items-center w-full">
      <div className="hidden sm:flex items-center mr-3">
        <span className="w-2.5 h-2.5 bg-editor-red rounded-full mr-1.5 block"></span>
        <span className="w-2.5 h-2.5 bg-editor-yellow rounded-full mr-1.5 block"></span>
        <span className="w-2.5 h-2.5 bg-editor-green rounded-full mr-1.5 block"></span>
      </div>

      <div className="flex justify-between flex-grow">
        {name && <span>{name}</span>}
        <div className="flex items-center">
          <div className={`text-${iconColor} mr-1`}>
            {langData?.icon}
          </div>
          <span>{langData?.name}</span>
        </div>
      </div>
    </div>
  );
}

function getIconColor(lang: string) {
  switch (lang) {
    case "html": return "red-600";
    case "css": return "blue-600";
    default: return "gray-500";
  }
}
