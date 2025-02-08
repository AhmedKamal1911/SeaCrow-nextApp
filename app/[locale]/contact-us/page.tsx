import SectionHeader from "@/components/common/section-header";

import { getTranslations } from "next-intl/server";
import Image from "next/image";
import ContactForm from "./components/contact-form";
export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }, { locale: "ru" }];
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
