"use client";

import Image from "next/image";
import { getStrapiMediaURL } from "@/lib/utils";
import { ImageType } from "@/lib/types/shared";

import "swiper/css";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, EffectFade } from "swiper/modules";

type Props = { heroImagesList: ImageType[] };
function HeroSlider({ heroImagesList }: Props) {
  return (
    <div className="h-full">
      <Swiper
        className="select-none h-full "
        modules={[A11y, EffectFade, Autoplay]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        speed={1400}
        loop
        slidesPerView={1}
        effect="fade"
      >
        {heroImagesList.map(({ url, id }) => (
          <SwiperSlide
            key={id}
            className="w-full h-full swiper-slide-opacity before:absolute before:bg-[#0a0a0a49] before:inset-0 before:z-[5]"
          >
            <Image
              // height={800}
              // width={800}
              fill
              priority
              src={getStrapiMediaURL(url) ?? ""}
              loading="eager"
              className={` animate-smoothScale sm:object-center object-cover`}
              alt="hero"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HeroSlider;
