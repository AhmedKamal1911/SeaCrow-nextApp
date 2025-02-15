import AboutInfoBox from "@/components/common/about-info-box";
import SectionHeader from "@/components/common/section-header";
import { aboutInfoList, iconMap, locales } from "@/lib/data";
import { getWhyChooseUsData } from "@/lib/queries/getWhyChooseUsData";

import Image from "next/image";

import OurServiceBox from "./components/our-service-box";
import { getLocale, getTranslations } from "next-intl/server";
import { Locale } from "@/i18n/routing";

import getAboutusPageData from "@/lib/queries/getAboutusPageData";
import { getStrapiMediaURL } from "@/lib/utils";
export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  const response = await getAboutusPageData({ locale });
  const openGraph = response.SEO.openGraph;

  return {
    title: response.SEO.title,
    description: response.SEO.description,
    metadatabase: new URL(process.env.NEXT_PUBLIC_BASE_URL as string),
    openGraph: {
      title: openGraph.title,
      description: openGraph.description,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}${openGraph.url}`,
      siteName: openGraph.siteName,
      images: openGraph.images.data.map((image) => ({
        url: getStrapiMediaURL(image.url),
        height: image.height,
        width: image.width,
        alt: image.name,
      })),
      locale: locale,
    },
  };
}

export default async function AboutUs() {
  const t = await getTranslations();
  const locale = await getLocale();
  const whyChooseUsData = await getWhyChooseUsData(locale as Locale);
  const services = whyChooseUsData.services.slice(0, 4);

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
