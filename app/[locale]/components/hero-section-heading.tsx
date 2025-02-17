"use client";
import clsx from "clsx";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
export default function HeroSectionHeading({
  children,
}: {
  children: ReactNode;
}) {
  const langCode = useLocale();
  return (
    <motion.h2
      variants={{
        hidden: { opacity: 0, y: -75, scale: 0.8 },
        visible: { opacity: 1, y: 0, scale: 1 },
      }}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.8, delay: 0.2 }}
      className={clsx(
        {
          "text-[36px] min-[376px]:text-[45px]": langCode === "ru",
          "text-5xl": langCode !== "ru",
        },
        "text-white sm:text-[90px] lg:text-9xl m-auto w-[1100px] max-w-full font-bold !leading-[1.3]"
      )}
    >
      {children}
    </motion.h2>
  );
}
