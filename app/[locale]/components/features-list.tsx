import { getStrapiMediaURL } from "@/lib/utils";
import Image from "next/image";

import { twMerge } from "tailwind-merge";

import { useTranslations } from "next-intl";
import { FeaturesBoxType } from "@/lib/validations/intro-section-schema";
import { Link } from "@/i18n/routing";

// Adjust text alignment
type Props = {
  className?: string;
  features: FeaturesBoxType[];
};
export default function FeaturesList({ className, features }: Props) {
  return (
    <div
      style={{
        counterReset: "feature-counter",
      }}
      className={twMerge(
        `relative  sm:before:absolute sm:ps-10 overflow-hidden sm:before:w-[1px] sm:before:inset-0 sm:before:h-full sm:before:bg-lightGray`,
        className
      )}
    >
      {features.map((feature, idx) => (
        <FeatureListItem key={idx} feature={feature} />
      ))}
    </div>
  );
}

function FeatureListItem({ feature }: { feature: FeaturesBoxType }) {
  const t = useTranslations();
  return (
    <div
      className={`relative counter-increment group before:duration-500 before:text-6xl before:text-lightGray before:content-[counter(feature-counter,decimal-leading-zero)] hover:before:text-black py-8 flex flex-col sm:flex-row items-center gap-10 sm:gap-5 [&:not(:last-child)]:after:absolute [&:not(:last-child)]:after:bottom-0 [&:not(:last-child)]:after:end-0 [&:not(:last-child)]:after:h-[1px] [&:not(:last-child)]:after:bg-lightGray [&:not(:last-child)]:after:w-[100vw]`}
    >
      {/* Dynamic number */}

      <div>
        <Image
          src={getStrapiMediaURL(feature.icon?.url) ?? ""}
          width={70}
          height={70}
          className="w-[70px] z-[-1] transition-transform duration-500 group-hover:scale-x-[-1]"
          alt=""
        />
      </div>
      <div className="relative flex md:flex-col flex-row gap-7 sm:gap-3 md:gap-0 items-center">
        <div className="z-50">
          <h5 className="text-xl">{feature.title}</h5>
          <Link
            className="text-[17px] text-main z-50 hover:text-black transition-colors duration-700 relative after:absolute after:-end-7 after:bottom-1/2 after:w-[0px] after:hover:w-[25px] after:transition-all after:duration-700 after:h-[2px] after:bg-black after:rounded-3xl before:absolute before:-end-7 before:bottom-1/2 before:w-[25px] before:h-[2px] before:bg-main before:rounded-3xl "
            href={feature.url}
          >
            {t("homePage.introSection.learnMoreTitle")}
          </Link>
        </div>

        <div className="md:absolute start-[calc(100%+70px)] md:start-[calc(100%+10px)] lg:start-[calc(100%+30px)] md:-top-2 w-[120px] h-[80px] ">
          <Image
            width={feature?.travelImg?.formats?.small.width}
            height={feature?.travelImg?.formats?.small.height}
            src={
              getStrapiMediaURL(
                feature?.travelImg?.formats?.small?.url || ""
              ) ?? ""
            }
            alt=""
            className="w-full h-full object-cover md:opacity-0 md:pointer-events-none transition-all duration-500 rotate-[20deg] group-hover:rotate-[16deg] md:group-hover:opacity-[1]"
          />
        </div>
      </div>
    </div>
  );
}
