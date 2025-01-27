import { Autoplay, Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Trip } from "@/lib/types/trips";
import { sliderBreakPoints } from "@/lib/data";
import TripCard from "@/components/common/trip-card";

// import required modules
type Props = {
  className?: string;
  tripsList?: Trip[];
  isReversed?: boolean;
  delay?: number;
  speed?: number;
  direction?: "vertical" | "horizontal";
  isAutoPlay?: boolean;
  isPaginated?: boolean;
  loop?: boolean;
  breakPoints?: typeof sliderBreakPoints;
  inView: boolean;
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
  inView,
}: Props) {
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
        {tripsList?.map((trip, i) => (
          <SwiperSlide key={trip.id}>
            <TripCard inView={inView} i={i} trip={trip} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
