import Image from "next/image";
import { getStrapiMediaURL } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { aboutInfoList, iconMap } from "@/lib/data";
import clsx from "clsx";

import SectionHeader from "@/components/common/section-header";
import AboutInfoBox from "@/components/common/about-info-box";
import { useLocale, useTranslations } from "next-intl";
import { WhyChooseUsDataSchemaType } from "@/lib/validations/why-us-schema";

type Props = {
  data: WhyChooseUsDataSchemaType;
};
export default function WhyChooseUsSection({ data }: Props) {
  const langCode = useLocale();
  const isRTL = langCode === "ar";
  const t = useTranslations();

  const services = data?.services ?? [];
  const imagesList = data?.images.data ?? [];

  return (
    <section className="relative py-32 bg-light overflow-hidden">
      <div
        style={{
          backgroundImage: `url('/images/map-background.png')`,
        }}
        className="absolute inset-0 w-full bg-[55%] bg-no-repeat bg-cover"
      />

      <div
        style={{
          backgroundImage: `url('/images/waves-with-boat.png')`,
          rotate: isRTL ? "y 180deg" : undefined,
        }}
        className={`absolute animate-bouncing-left-right start-0 bottom-[-90px] md:bottom-0 h-[705px] w-[431px] bg-[50%] bg-no-repeat bg-cover `}
      />

      <div className="container">
        <AboutInfoBox
          aboutInfoList={aboutInfoList}
          className="bg-[#ffffff9c] gap-10 relative"
        />
        <div className="mt-16 relative">
          <div>
            <span
              data-text={t("homePage.whyChooseUsSection.heading")}
              className={clsx(
                {
                  "text-5xl sm:text-8xl xl:text-[120px]": langCode !== "ru",
                  "max-[350px]:text-[20px] text-[30px] sm:text-5xl lg:text-6xl xl:text-8xl":
                    langCode === "ru",
                },
                "stroke-fill block font-mainFont w-fit mx-auto whitespace-nowrap mb-5 text-center relative after:content-[attr(data-text)] after:absolute after:inset-0 after:w-0 after:z-[1] after:transition-all after:duration-500 hover:after:w-full after:overflow-hidden"
              )}
            >
              {t("homePage.whyChooseUsSection.heading")}
            </span>
            <div className="flex flex-col xl:flex-row lg:items-center">
              <div className="flex-1">
                <div className="relative hidden xl:block">
                  <div className="relative after:absolute after:inset-0 after:w-[398px] after:bg-[#9c775918]">
                    <Image
                      width={398}
                      height={713}
                      src={"/images/wavey-map.png"}
                      alt=""
                    />
                  </div>
                  <div className="absolute h-[400px] w-[400px] start-[200px] bottom-[150px] rounded-md overflow-hidden">
                    <Image
                      src={getStrapiMediaURL(imagesList[0]?.url) ?? ""}
                      alt={imagesList[0].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute w-[200px] h-[250px] start-[100px]  bottom-[80px] bg-white rounded-md">
                    <Image
                      src={getStrapiMediaURL(imagesList[1]?.url) ?? ""}
                      alt={imagesList[0].name}
                      fill
                      className="object-cover rounded-md p-2"
                    />
                  </div>
                </div>
              </div>
              <div className="flex-1 w-full">
                <SectionHeader
                  subTitle={t("homePage.whyChooseUsSection.subTitle")}
                  subTitleClassName={"text-2xl sm:text-6xl"}
                  subTitleRevealClassName="mx-auto"
                  className="mb-8 text-center"
                />
                <Accordion type="single" collapsible>
                  {services.map(({ name, desc, id, icon }) => {
                    const IconComponent = iconMap[icon];

                    return (
                      <AccordionItem
                        value={`item-${id}`}
                        key={id}
                        className="mb-1 border-none shadow"
                      >
                        <AccordionTrigger className="border-0 p-5 bg-white transition-all data-[state=open]:bg-main data-[state=open]:text-white text-[19px]">
                          <IconComponent />
                          {name}
                        </AccordionTrigger>
                        <AccordionContent className="p-5 bg-white text-[18px] leading-7 text-grayDesc">
                          {desc}
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
