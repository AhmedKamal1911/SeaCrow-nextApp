import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type Props = {
  numberOfCards?: number;
  className?: string;
};
export default function SkeletonLoaderCard({
  numberOfCards = 3,
  className,
}: Props) {
  return (
    <div className={cn("relative w-full flex flex-col gap-5", className)}>
      {Array.from({ length: numberOfCards }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-[200px] sm:h-[350px] lg:h-[260px] bg-[#b1b1b1] z-10 rounded-sm"
        />
      ))}
    </div>
  );
}
