"use client";
import Loading from "@/components/common/loading";
import SectionHeader from "@/components/common/section-header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSectionInView from "@/hooks/use-section-view";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import TripCard from "@/components/common/trip-card";

import { TripsResponse } from "@/lib/types/trips";
import { getTripsSectionData } from "@/lib/queries/getTripsSectionData";
import { useQuery } from "@tanstack/react-query";
import ErrorViewer from "@/components/common/error-viewer";
type Props = {
  tripsTypes: string[];
  initialTripsList: TripsResponse;
};
export default function TripsPageView({ tripsTypes, initialTripsList }: Props) {
  const t = useTranslations();
  const { ref, inView } = useSectionInView<HTMLDivElement>();
  const [tripType, setTripType] = useState("all");

  const { data, isFetching, error } = useQuery({
    queryKey: ["trips", tripType], // Object form for query key
    queryFn: () => getTripsSectionData(tripType), // Function to fetch data
    initialData: initialTripsList,
    refetchOnMount: false,
  });
  const allTrips = data.data;
  console.log("trips page", error?.message);

  const onTripValueChange = (value: string) => {
    setTripType(value);
  };

  // useScrollToTop();
  return (
    <div ref={ref} className="min-h-screen py-24">
      <div className="container">
        <div className="flex flex-col gap-5 md:gap-0 md:flex-row justify-between">
          <SectionHeader
            className="space-y-4"
            subTitle={t("tripsPage.subTitle")}
            introText={t("tripsPage.introText")}
          />
          <Select value={tripType} onValueChange={onTripValueChange}>
            <SelectTrigger className="w-[180px] text-[17px]">
              <SelectValue placeholder={t("tripsPage.selectTypeMenu.title")} />
            </SelectTrigger>
            <SelectContent className="bg-white z-[800]">
              {tripsTypes?.map((type, i) => (
                <SelectItem
                  ref={(ref) => {
                    if (!ref) return;
                    ref.ontouchstart = (e) => e.preventDefault();
                  }}
                  key={i}
                  value={type}
                  className="text-[17px] cursor-pointer hover:bg-[#ebeaea] transition-all "
                >
                  {t(`tripsPage.selectTypeMenu.types.${type}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {isFetching ? (
          <Loading />
        ) : error ? (
          <ErrorViewer />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5 relative z-10">
            <AnimatePresence>
              {allTrips?.map((trip, i) => (
                <div key={trip.id} className="h-[300px] sm:h-[400px] ">
                  <TripCard inView={inView} i={i} trip={trip} />
                </div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
