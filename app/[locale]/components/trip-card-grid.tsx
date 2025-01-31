"use client";
import TripCard from "@/components/common/trip-card";
import { Trip } from "@/lib/types/trips";

import { useInView } from "@/providers/in-view-provider";

type Props = {
  data: Trip[];
};
export default function TripCardGrid({ data }: Props) {
  const { isInview } = useInView();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5 relative z-10">
      {data.map((trip, i) => (
        <div key={trip.id} className="h-[300px] sm:h-[400px]">
          <TripCard inView={isInview} i={i} trip={trip} />
        </div>
      ))}
    </div>
  );
}
