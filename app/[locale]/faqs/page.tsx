import QuestionsList from "@/components/common/questions-list";
import SectionHeader from "@/components/common/section-header";
import getFaqPageData from "@/lib/queries/getFaqPageData";
// import useQueryWithLocale from "@/hooks/useQueryWithLocale";
// import useScrollToTop from "@/hooks/useScrollToTop";

import { getLocale, getTranslations } from "next-intl/server";
import FaqForm from "./components/faq-form";

export default async function Faqs() {
  const locale = await getLocale();

  const t = await getTranslations();
  const data = await getFaqPageData();
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
            <FaqForm locale={locale} />
          </div>
        </div>
      </div>
    </main>
  );
}
