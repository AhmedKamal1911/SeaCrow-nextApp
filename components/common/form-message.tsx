import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function FormMessage({
  className,
  children,
  id,
}: {
  className?: string;
  children: ReactNode;
  id: string;
}) {
  if (!children) return null;
  return (
    <p
      id={id}
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
    >
      {children}
    </p>
  );
}
