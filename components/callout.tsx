import { Alert, AlertDescription } from "@/components/ui/alert";

interface CalloutProps {
  icon?: string;
  children?: React.ReactNode;
  type?: "default" | "warning" | "danger";
}

export function Callout({ children, icon, type = "default", ...props }: CalloutProps) {
  return (
    <Alert
      variant={type === "danger" ? "destructive" : "default"}
      className="my-8 border-l-4 border-l-ink bg-card/70 p-5 data-[type=danger]:border-l-editorial-red data-[type=warning]:border-l-editorial-red data-[type=warning]:bg-muted/80"
      data-type={type}
      {...props}
    >
      {icon && <span className="text-2xl">{icon}</span>}
      <AlertDescription className="text-sm leading-7 text-neutral-700">
        {children}
      </AlertDescription>
    </Alert>
  );
}
