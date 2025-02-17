"use client";

import { getStrapiMediaURL } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
type Props = {
  imgSrc: string;
  type: string;
  title: string;
};
export default function TripBanner({ imgSrc, type, title }: Props) {
  const t = useTranslations();
  return (
    <div className="h-[300px] relative after:inset-0 after:bg-[#0c0c0c81] after:absolute">
      <div className=" h-full">
        <Image
          src={getStrapiMediaURL(imgSrc) ?? ""}
          alt="trip banner"
          fill
          className="object-cover object-[0%,55%]"
        />
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-40 text-center w-full xl:w-[40%] px-2">
        <span className="text-4xl text-main mb-5 block">
          {t(`tripInfo.types.${type}`)}
        </span>
        <span className="text-4xl lg:text-6xl text-white !leading-[1.4] block">
          {title}
        </span>
      </div>
    </div>
  );
}
