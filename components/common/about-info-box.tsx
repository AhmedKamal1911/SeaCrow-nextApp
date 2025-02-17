import { cn } from "@/lib/utils";

import Image from "next/image";
import { aboutInfoListType } from "@/lib/types/shared";

import { useTranslations } from "next-intl";
import NumberCounter from "@/app/[locale]/components/number-counter";

type Props = {
  className?: string;
  aboutInfoList: aboutInfoListType;
};

export default function AboutInfoBox({ aboutInfoList, className }: Props) {
  const t = useTranslations();
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-10 bg-[#f1f1f1] p-6 xl:p-10 rounded-lg shadow-md",
        className
      )}
    >
      {aboutInfoList.map((info, i) => (
        <div
          key={info.id}
          className="flex w-full flex-col xl:flex-row gap-4 items-center flex-1"
        >
          <div className="border-2 shrink-0  max-[330px]:size-[85px] xl:size-[100px] rounded-full overflow-hidden  p-3  border-gray-600 hover:scale-105 hover:rotate-12 transition-all duration-300">
            <Image
              width={128}
              height={128}
              src={info.img}
              alt=""
              className="!w-full !h-full"
            />
          </div>
          <div className="flex flex-col">
            <span className="self-center flex items-center">
              <NumberCounter to={info.count} />

              <span className="text-main text-6xl">+</span>
            </span>
            <span className="text-xl">
              {t(`homePage.whyChooseUsSection.achievementsSection.${i}`)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
