import ExportedImage from "next-image-export-optimizer";
import Link from "next/link";

export function Header() {
  return (
    <header className="py-4 border-b border-neutral-200">
      <div className="text-center">
        <Link href="/" className="inline-flex items-center gap-3">
          <ExportedImage
            width={25}
            height={200}
            src="/LogoPierre.png"
            alt="Logo"
            className="w-4 md:w-5 lg:w-6 h-auto"
            sizes="(max-width: 767px) 16px, (max-width: 1023px) 20px, 24px"
            unoptimized
          />
          <span className="font-serif text-3xl sm:text-4xl font-extrabold tracking-wide">
            Pierre Lepagnol
          </span>
        </Link>
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-neutral-500 mt-3">
          Notes on NLP, ML and applied data science
        </p>
      </div>
    </header>
  );
}
