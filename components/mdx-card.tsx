import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  href?: string;
  disabled?: boolean;
}

export function MdxCard({ href, className, children, disabled, ...props }: CardProps) {
  return (
    <Card
      className={cn(
        "group relative bg-card/70 transition-all hover:-translate-y-0.5 hover:shadow-md",
        disabled && "cursor-not-allowed opacity-60",
        className
      )}
      {...props}
    >
      <CardContent className="flex flex-col gap-2 p-6 [&>h3]:mt-0! [&>h4]:mt-0! [&>p]:text-neutral-600">
        {children}
      </CardContent>
      {href && (
        <Link href={disabled ? "#" : href} className="absolute inset-0">
          <span className="sr-only">View</span>
        </Link>
      )}
    </Card>
  );
}
