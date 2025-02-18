"use client";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { sliderBreakPoints } from "@/lib/data";
import TripCard from "@/components/common/trip-card";
import { useInView } from "@/providers/in-view-provider";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { TripData } from "@/lib/types/trips";

// import required modules
type Props = {
  className?: string;
  tripsList: TripData[];
  isReversed?: boolean;
  delay?: number;
  speed?: number;
  direction?: "vertical" | "horizontal";
  isAutoPlay?: boolean;
  isPaginated?: boolean;
  loop?: boolean;
  breakPoints?: typeof sliderBreakPoints;
};
export default function TripsSlider({
  className,
  tripsList,
  isReversed = false,
  delay = 3000,
  speed = 1000,
  direction = "horizontal",
  isAutoPlay = true,
  isPaginated = false,
  loop = true,
  breakPoints = sliderBreakPoints,
}: Props) {
  const { isInview } = useInView();
  return (
    <div id="tripsSlider" className={className}>
      <Swiper
        breakpoints={breakPoints}
        direction={direction}
        {...(isAutoPlay && {
          autoplay: {
            delay: delay,
            disableOnInteraction: false,
            reverseDirection: isReversed,
          },
        })}
        loop={loop}
        {...(isPaginated && {
          pagination: {
            clickable: true,
          },
        })}
        speed={speed}
        modules={[Pagination, Autoplay]}
        className="mySwiper h-full w-full"
      >
        {tripsList.map((trip, i) => (
          <SwiperSlide key={trip.id}>
            <TripCard inView={isInview} i={i} trip={trip} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
