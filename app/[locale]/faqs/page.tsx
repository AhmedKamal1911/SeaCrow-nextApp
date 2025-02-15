import QuestionsList from "@/components/common/questions-list";
import SectionHeader from "@/components/common/section-header";
import getFaqPageData from "@/lib/queries/getFaqPageData";

import { getLocale, getTranslations } from "next-intl/server";
import FaqForm from "./components/faq-form";
import { Locale } from "@/i18n/routing";
import { locales } from "@/lib/data";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  const faqPageData = await getFaqPageData({ locale });

  return {
    title: faqPageData.SEO.title,
    description: faqPageData.SEO.description,
  };
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
