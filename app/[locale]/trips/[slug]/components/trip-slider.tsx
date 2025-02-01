"use client";

import { ImageType } from "@/lib/types/trips";
import Image from "next/image";
import { useState } from "react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { getStrapiMediaURL } from "@/lib/utils";
export default function TripSlider({
  imagesList,
}: {
  imagesList: ImageType[];
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  console.log({ active: thumbsSwiper?.activeIndex });
  return (
    <div className="select-none bg-red-500">
      <div className=" aspect-[6/3.8]">
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          loop
          spaceBetween={10}
          navigation
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2 h-full"
          lazy={"true"}
        >
          {imagesList.map(({ url, id }) => (
            <SwiperSlide key={id} className="active:cursor-grab">
              <Image
                src={getStrapiMediaURL(url) ?? ""}
                className="h-full w-full object-cover "
                width={600}
                height={400}
                alt="trip image"
                loading="lazy"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="aspect-[4/0.8] mt-2">
        <Swiper
          onSwiper={setThumbsSwiper}
          loop
          spaceBetween={5}
          slidesPerView={3}
          breakpoints={{
            // when window width is >= 640px (Tailwind: sm)
            640: {
              slidesPerView: 3,
              spaceBetween: 5,
            },
          }}
          freeMode
          watchSlidesProgress
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper h-full"
        >
          {imagesList.map(({ url, id }) => (
            <SwiperSlide key={id} className="opacity-slide active:cursor-grab">
              <Image
                fill
                src={getStrapiMediaURL(url) ?? ""}
                alt="mini trip image"
                className="h-full object-cover w-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
