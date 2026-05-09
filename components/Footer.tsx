import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="mt-16 py-4">
      <Separator className="mb-4" />
      <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <span className="font-sans text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Pierre Lepagnol
        </span>
        <div className="flex gap-2 font-sans text-xs text-muted-foreground">
          <Button asChild variant="link" size="sm" className="h-auto px-0 text-muted-foreground">
            <a
              href="https://github.com/PierreLepagnol"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </Button>
          <Button asChild variant="link" size="sm" className="h-auto px-0 text-muted-foreground">
            <a
              href="https://www.linkedin.com/in/pierre-lepagnol"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </Button>
          <Button asChild variant="link" size="sm" className="h-auto px-0 text-muted-foreground">
            <a
              href="https://twitter.com/LepagnolPierre"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </Button>
        </div>
      </div>
    </footer>
  );
}
