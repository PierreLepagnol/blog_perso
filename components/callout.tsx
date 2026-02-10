import { cn } from "@/lib/utils";

interface CalloutProps {
  icon?: string;
  children?: React.ReactNode;
  type?: "default" | "warning" | "danger";
}

export function Callout({ children, icon, type = "default", ...props }: CalloutProps) {
  return (
    <div
      className={cn("my-6 flex items-start border border-ink border-l-4 p-4", {
        "border-l-editorial-red bg-editorial-red/5": type === "danger",
        "bg-neutral-100": type === "warning",
      })}
      {...props}
    >
      {icon && <span className="mr-4 text-2xl">{icon}</span>}
      <div className="text-sm text-neutral-700">{children}</div>
    </div>
  );
}
