import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  numberOfCards?: number;
  className?: string;
};
export default function GridSkeletonLoader({ numberOfCards = 4 }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 xl:gap-10 justify-center ">
      {Array.from({ length: numberOfCards }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-[200px] sm:h-[350px] lg:h-[260px] bg-[#b1b1b1] z-10 rounded-sm max-sm:hidden max-sm:last:block"
        />
      ))}
    </div>
  );
}
