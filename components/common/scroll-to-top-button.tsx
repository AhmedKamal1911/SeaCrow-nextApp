"use client";

import { useLanguage } from "@/contexts/LanguageProvider";
import { useScroll, motion, useMotionValueEvent } from "framer-motion";
import { MoveUp } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ScrollToTopButton() {
  const { t } = useTranslation("global");
  const { isRTL } = useLanguage();
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  // Subscribing to the scrollYProgress value and updating local state
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgress(latest * 100); // Convert to percentage
    setIsVisible(latest > 0.1); // Show button after scrolling 10% of the page
  });

  // Function to handle scrolling to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.div
      onClick={scrollToTop}
      style={{
        background: `conic-gradient(#bfa888 ${progress}%, #dfdfdf ${progress}%)`,
      }}
      initial={{ x: 100, opacity: 0, zIndex: 999 }} // Hidden by default
      animate={{
        opacity: isVisible ? 1 : 0, // Animate opacity based on visibility
        zIndex: isVisible ? 999 : -9999,
        x: isVisible ? 0 : 100, // Slide up when visible, down when hidden
      }}
      transition={{
        duration: 0.2, // Duration of the animation
        ease: "easeInOut", // Easing function
      }}
      className={`fixed cursor-pointer  end-2 select-none overflow-hidden p-1 bottom-4 h-[150px] w-[40px] min-[376px]:h-[160px] min-[376px]:w-[50px] rounded-t-3xl rounded-b-3xl`}
    >
      <div className="flex flex-col justify-center items-center  gap-8 min-[376px]:gap-8 h-full bg-white rounded-t-3xl rounded-b-3xl">
        <MoveUp className="h-5 w-5 min-[376px]:h-6 min-[376px]:w-6" />
        <span
          className={`${
            isRTL ? "rotate-90" : "-rotate-90"
          } text-[17px] min-[376px]:text-xl text-nowrap`}
        >
          {t("global.toTopButtonLabel")}
        </span>
      </div>
    </motion.div>
  );
}
