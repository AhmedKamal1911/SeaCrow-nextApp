"use client";
import TripCard from "@/components/common/trip-card";
import { TripData } from "@/lib/types/trips";

import { useInView } from "@/providers/in-view-provider";
import { useTranslations } from "next-intl";

export default function RelatedTripsContainer({
  relatedTrips,
}: {
  relatedTrips: TripData[];
}) {
  const t = useTranslations();
  const { isInview } = useInView();

  return relatedTrips.length >= 1 ? (
    relatedTrips.map((trip, i) => (
      <div key={trip.id} className="max-[300px]:h-[300px] h-[350px] ">
        <TripCard i={i} inView={isInview} trip={trip} />
      </div>
    ))
  ) : (
    <span className="font-bold text-center text-red-800">
      {t("tripInfo.emptyRelatedTripsText")}
    </span>
  );
}
