import ExportedImage from "next-image-export-optimizer";
import Link from "next/link";

export function Header() {
  return (
    <header className="overflow-hidden border-b border-neutral-200 py-4">
      <div className="min-w-0 text-center">
        <Link href="/" className="inline-flex max-w-full flex-wrap items-center justify-center gap-2 sm:gap-3">
          <ExportedImage
            width={25}
            height={200}
            src="/LogoPierre.webp"
            alt="Logo"
            className="h-auto w-4 shrink-0 md:w-5 lg:w-6"
            sizes="(max-width: 767px) 16px, (max-width: 1023px) 20px, 24px"
            unoptimized
          />
          <span className="text-balance break-words font-serif text-2xl font-extrabold tracking-wide sm:text-4xl">
            Pierre Lepagnol, PhD
          </span>
        </Link>
        <p className="mx-auto mt-3 max-w-full text-balance break-words font-sans text-[0.68rem] uppercase tracking-[0.16em] text-neutral-500 sm:text-xs sm:tracking-[0.2em]">
          Notes on NLP, ML and applied data science
        </p>
      </div>
    </header>
  );
}
