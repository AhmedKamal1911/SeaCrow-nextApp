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
import { Fragment, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import TripCard from "@/components/common/trip-card";
import { useInView } from "react-intersection-observer";

import { useInfiniteQuery } from "@tanstack/react-query";
import ErrorViewer from "@/components/common/error-viewer";
import { LoaderCircle } from "lucide-react";
import { tripsTypes } from "@/lib/data";
import { getAllTrips } from "@/lib/queries/getAllTrips";

export default function TripsPageView() {
  const t = useTranslations();
  const { ref, inView } = useSectionInView<HTMLDivElement>();
  const { ref: interSectedElement, inView: isInterSectedElementInView } =
    useInView({
      /* Optional options */
      threshold: 0,
    });

  const [tripType, setTripType] = useState("all");
  const { data, status, error, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["trips", tripType], // Object form for query key
      queryFn: ({ pageParam }) =>
        getAllTrips({ pageParam, typeName: tripType }),
      initialPageParam: 1,

      getNextPageParam: ({ meta }) => {
        const totalPages = meta.pagination.pageCount as number;
        const nextPage = (meta?.pagination?.page ?? 1) + 1;

        return nextPage > totalPages ? undefined : nextPage;
      },
      staleTime: 5000,
      refetchOnWindowFocus: false,
    });

  const onTripValueChange = (value: string) => {
    setTripType(value);
  };

  useEffect(() => {
    if (!isInterSectedElementInView) return;
    fetchNextPage();
  }, [fetchNextPage, isInterSectedElementInView]);
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
        {status === "pending" ? (
          <Loading />
        ) : status === "error" ? (
          <ErrorViewer errorText={error.message} />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5 relative z-10">
              <AnimatePresence>
                {data?.pages.map((page, i) => (
                  <Fragment key={`page_${i}`}>
                    {page.data.length >= 1 ? (
                      page.data?.map((trip, i) => (
                        <div key={trip.id} className="h-[300px] sm:h-[400px] ">
                          <TripCard inView={inView} i={i} trip={trip} />
                        </div>
                      ))
                    ) : (
                      <ErrorViewer
                        errorText={t("global.errors.noTripsError")}
                      />
                    )}
                  </Fragment>
                ))}
              </AnimatePresence>
            </div>

            <div ref={interSectedElement} aria-hidden />
          </>
        )}

        {isFetchingNextPage && (
          <div className="bg-[#000000] w-fit mx-auto mt-3 rounded-xl p-1">
            <LoaderCircle className=" text-main size-10 animate-spin transition-[rotate] duration-1000" />
          </div>
        )}
      </div>
    </div>
  );
}
