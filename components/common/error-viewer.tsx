import { cn } from "@/lib/utils";

export default function ErrorViewer({
  errorText = "Failed to fetch due to Network Error",
  className,
}: {
  errorText?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "h-[40vh] flex flex-col justify-center items-center",
        className
      )}
    >
      <span className="font-bold text-4xl font-mainFont sm:text-5xl text-center error-stroke text-red-600 block">
        {errorText}
      </span>
    </div>
  );
}
