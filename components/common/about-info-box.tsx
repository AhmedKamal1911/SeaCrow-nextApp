import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import { animate } from "framer-motion";
import { useState, useEffect } from "react";

import { cn } from "@/lib/utils";

import useSectionInView from "@/hooks/useSectionInView";
import Image from "next/image";
import { aboutInfoListType } from "@/lib/types/shared";

type Props = {
  className?: string;
  aboutInfoList: aboutInfoListType;
};
type NumberCounter = {
  from?: number;
  to?: number;
  numberProps?: string;
};
export default function AboutInfoBox({ aboutInfoList, className }: Props) {
  const { t } = useTranslation("global");
  return (
    <div
      className={twMerge(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 bg-[#f1f1f1] p-10 rounded-lg shadow-md",
        className
      )}
    >
      {aboutInfoList.map((info, i) => (
        <div
          key={info.id}
          className="flex w-full flex-col md:flex-row gap-4 items-center "
        >
          <div className="border-2 rounded-full overflow-hidden w-fit p-3  border-gray-600 hover:scale-105 hover:rotate-12 transition-all duration-300">
            <Image src={info.img} alt="" className="w-[100px]" />
          </div>
          <div className="flex flex-col">
            <h3 className="self-center flex items-center">
              <NumberCounter to={info.count} />

              <span className="text-main text-6xl">+</span>
            </h3>
            <span className="text-xl">
              {t(`homePage.whyChooseUsSection.achievementsSection.${i}`)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function NumberCounter({ from = 0, to = 1000, numberProps }: NumberCounter) {
  const { ref, inView } = useSectionInView();
  const [currentValue, setCurrentValue] = useState(from);

  useEffect(() => {
    if (inView) {
      const start = Number(from);
      const end = Number(to);

      const controls = animate(start, end, {
        duration: 2,
        ease: "easeInOut",
        onUpdate(value) {
          setCurrentValue(Number(value.toFixed(0))); // Update the state instead of textContent
        },
      });

      return () => {
        controls.stop(); // Cleanup
      };
    }
  }, [from, to, inView]);

  return (
    <span ref={ref} className={cn("text-4xl", numberProps)}>
      {currentValue}
    </span>
  );
}
