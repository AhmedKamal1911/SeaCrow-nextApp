import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  numberOfCards?: number;
};
export default function SkeletonLoaderCard({ numberOfCards = 3 }: Props) {
  return (
    <div className="relative w-full flex flex-col gap-5">
      {Array.from({ length: numberOfCards }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-[200px] sm:h-[350px] lg:h-[260px] bg-[#b1b1b1] z-10 rounded-sm"
        />
      ))}
    </div>
  );
}
