import SectionHeader from "@/components/common/section-header";

import { getTranslations } from "next-intl/server";
import Image from "next/image";
import ContactForm from "./components/contact-form";

import { locales } from "@/lib/data";
import getContactusPageData from "@/lib/queries/getContactusPageData";
import { Locale } from "@/i18n/routing";
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

  const response = await getContactusPageData({ locale });
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
export default async function ContactUs() {
  const t = await getTranslations();

  return (
    <div className="relative min-h-screen py-36 ">
      <div
        style={{ backgroundImage: `url('/images/slide-1.jpg')` }}
        className="absolute inset-0 z-[-1] bg-cover blur-[5px]"
      />
      <div className="container">
        <div className="flex flex-col items-stretch lg:flex-row bg-white rounded-xl min-h-[934px]">
          <div className="flex-1">
            <Image
              priority
              src={"/images/slide-1.jpg"}
              alt=""
              width={500}
              height={500}
              className="w-full h-full object-[50%_center] lg:object-cover p-[5px] rounded-l-xl rounded-r-none "
            />
          </div>
          <div className="flex flex-col flex-1  p-2 md:p-5 lg:p-12">
            <SectionHeader
              className="mb-8"
              introText={t("contactUsPage.introText")}
              desc={t("contactUsPage.desc")}
            />
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
