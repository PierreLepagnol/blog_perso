import ExportedImage from "next-image-export-optimizer";
import Link from "next/link";

export function Header() {
  return (
    <header className="pt-8 pb-4">
      <div className="border-t-4 border-ink" />
      <div className="py-6 text-center">
        <Link href="/" className="inline-flex items-center gap-3">
          <ExportedImage
            width={25}
            height={200}
            src="/LogoPierre.png"
            alt="Logo"
            unoptimized
          />
          <span className="font-serif text-4xl sm:text-5xl font-black tracking-tighter">
            Pierre Lepagnol
          </span>
        </Link>
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-neutral-500 mt-2">
          PhD Student &middot; Computer Science &middot; Data Scientist
        </p>
      </div>
      <div className="border-t border-ink" />
    </header>
  );
}
