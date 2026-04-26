import { cn } from "@/lib/utils";

interface CalloutProps {
  icon?: string;
  children?: React.ReactNode;
  type?: "default" | "warning" | "danger";
}

export function Callout({ children, icon, type = "default", ...props }: CalloutProps) {
  return (
    <div
      className={cn("my-8 flex items-start rounded-sm border border-neutral-200 border-l-4 border-l-ink bg-white/70 p-5 shadow-sm", {
        "border-l-editorial-red bg-editorial-red/5": type === "danger",
        "border-l-editorial-red bg-neutral-100/80": type === "warning",
      })}
      {...props}
    >
      {icon && <span className="mr-4 text-2xl">{icon}</span>}
      <div className="text-sm leading-7 text-neutral-700">{children}</div>
    </div>
  );
}
