import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { RotateCcw } from "lucide-react";
import { ReactNode } from "react";

type Props = {
  isSubmitting: boolean;
  loadingText: string;
  children: ReactNode;
  className?: string;
};

export default function FormSubmitButton({
  isSubmitting,
  loadingText,
  children,
  className,
}: Props) {
  return (
    <Button
      className={cn("py-6 px-5", className)}
      variant="primary"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <span className="flex items-center gap-2 text-xl text-white">
          <RotateCcw className="h-5 w-5 animate-spin" />
          {loadingText}
        </span>
      ) : (
        children
      )}
    </Button>
  );
}
