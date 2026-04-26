import Link from "next/link";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  href?: string;
  disabled?: boolean;
}

export function MdxCard({ href, className, children, disabled, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "group relative rounded-sm border border-neutral-200 bg-white/70 p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md",
        disabled && "cursor-not-allowed opacity-60",
        className
      )}
      {...props}
    >
      <div className="space-y-2 [&>h3]:mt-0! [&>h4]:mt-0! [&>p]:text-neutral-600">
        {children}
      </div>
      {href && (
        <Link href={disabled ? "#" : href} className="absolute inset-0">
          <span className="sr-only">View</span>
        </Link>
      )}
    </div>
  );
}
