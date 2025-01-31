import AboutInfoBox from "@/components/common/about-info-box";
import SectionHeader from "@/components/common/section-header";
import { aboutInfoList } from "@/lib/data";
import { getWhyChooseUsData } from "@/lib/queries/getWhyChooseUsData";

import Image from "next/image";
import { iconMap } from "../components/sections/why-choose-us-section";
import OurServiceBox from "./components/our-service-box";
import { getTranslations } from "next-intl/server";

export default async function AboutUs() {
  // useScrollToTop();
  const t = await getTranslations();
  const whyChooseUsData = await getWhyChooseUsData();
  const services = whyChooseUsData.services;

  return (
    <main className="min-h-screen py-36 overflow-hidden">
      <div className="container">
        <SectionHeader
          introText={t("aboutUsPage.introText")}
          className="mb-5 text-center"
        />

        <AboutInfoBox aboutInfoList={aboutInfoList} />

        <div className="flex flex-col items-center lg:flex-row mt-10 justify-center gap-10 mb-10">
          <div className="flex-1">
            <SectionHeader
              introText={t("aboutUsPage.companyInfo.introText")}
              desc={t("aboutUsPage.companyInfo.desc")}
              className="mb-6 max-w-[600px] space-y-2"
            />
            <SectionHeader
              subTitle={t("aboutUsPage.companyStory.introText")}
              desc={t("aboutUsPage.companyStory.desc")}
              subTitleClassName="text-black"
              introTextRevealClassName="p-0"
              className="max-w-[800px] space-y-0"
            />
          </div>
          <div className="flex-1 ">
            <Image
              src={"/images/egypt.jpg"}
              width={700}
              height={500}
              alt="pyramids"
              className="object-cover rounded-lg"
            />
          </div>
        </div>
        <div>
          <SectionHeader introText={t("aboutUsPage.secondaryIntroText")} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 xl:gap-10 bg-[#f1f1f1] p-2 md:p-5 xl:p-10 rounded-lg mt-5">
            {services.map((service) => {
              const IconComponent = iconMap[service.icon];
              return (
                <OurServiceBox
                  key={service.id}
                  IconComponent={IconComponent}
                  {...service}
                />
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
