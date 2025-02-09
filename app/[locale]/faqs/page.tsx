import QuestionsList from "@/components/common/questions-list";
import SectionHeader from "@/components/common/section-header";
import getFaqPageData from "@/lib/queries/getFaqPageData";

import { getLocale, getTranslations } from "next-intl/server";
import FaqForm from "./components/faq-form";
import { Locale } from "@/i18n/routing";
export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }, { locale: "ru" }];
}
export default async function Faqs() {
  const t = await getTranslations();
  const locale = await getLocale();
  const data = await getFaqPageData({ locale: locale as Locale });
  const faqsList = data.faqsList;

  return (
    <main className="min-h-screen py-36 bg-light">
      <div className="container">
        <SectionHeader
          className="xl:w-[900px] mb-10"
          subTitle={t("faqsPage.subTitle")}
          introText={t("faqsPage.introText")}
          desc={t("faqsPage.desc")}
        />
        <div className="flex flex-col gap-20">
          <QuestionsList list={faqsList} />
          <div>
            <SectionHeader
              className="text-center mb-10"
              introText={t("faqsPage.formIntroText")}
              introTextRevealClassName="mx-auto"
            />
            <FaqForm />
          </div>
        </div>
      </div>
    </main>
  );
}
