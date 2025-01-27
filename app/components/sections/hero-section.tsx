// Import Swiper styles

// import { useLanguage } from "@/contexts/LanguageProvider";

import { motion } from "framer-motion";
import Link from "next/link";

import clsx from "clsx";
import HeroSlider from "../hero-slider";
import { ImageType } from "@/lib/types/shared";

type HeroButton = {
  id: number;
  text: string;
  url: string;
  isExternal: boolean;
};

export type HeroSectionData = {
  id: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  heading: string;
  locale: string;
  heroButton: HeroButton;
  heroImages: {
    data: ImageType[];
  };
};

type Props = {
  data: HeroSectionData;
};
const HeroSection = ({ data }: Props) => {
  // const { selectedLanguage } = useLanguage();

  const heroButton = data.heroButton;
  const heroImagesList = data.heroImages.data;
  const heroHeading = data.heading ?? "Get the trip of your dreams";

  return (
    <section className="h-screen relative">
      <HeroSlider heroImagesList={heroImagesList} />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 px-4 text-center w-full select-none">
        <div className="flex flex-col gap-3 ">
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: -75, scale: 0.8 },
              visible: { opacity: 1, y: 0, scale: 1 },
            }}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.2 }}
            // className={clsx(
            //   {
            //     "text-[36px] min-[376px]:text-[45px]":
            //       selectedLanguage.languageName === "ru",
            //     "text-5xl": selectedLanguage.languageName !== "ru",
            //   },
            //   "text-white sm:text-[90px] lg:text-9xl m-auto w-[1100px] max-w-full font-bold !leading-[1.3]"
            // )}
          >
            {heroHeading}
          </motion.h1>

          <Link
            href={heroButton?.url}
            className="p-3 text-xl bg-[#03030356] w-fit m-auto text-white rounded-sm hover:shadow-lighter transition-all"
          >
            {heroButton?.text ?? "Discover tours"}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
