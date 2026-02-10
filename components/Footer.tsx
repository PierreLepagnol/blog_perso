export function Footer() {
  return (
    <footer className="border-t border-ink mt-16 py-6 flex flex-col sm:flex-row justify-between items-center gap-2">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
        &copy; {new Date().getFullYear()} Pierre Lepagnol
      </span>
      <div className="flex gap-4 font-sans text-xs text-neutral-500">
        <a href="https://github.com/PierreLepagnol" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/pierre-lepagnol" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://twitter.com/LepagnolPierre" target="_blank" rel="noopener noreferrer">Twitter</a>
      </div>
    </footer>
  );
}
