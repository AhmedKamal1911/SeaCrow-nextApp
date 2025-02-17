"use client";
// import useQueryWithLocale from "@/hooks/useQueryWithLocale";

import useSectionInView from "@/hooks/use-section-view";
import { ReactNode } from "react";
import InViewContextProvider from "@/providers/in-view-provider";
import SectionHeader from "@/components/common/section-header";
import { useTranslations } from "next-intl";
type Props = {
  children: ReactNode;
};
const SpecialOffersSection = ({ children }: Props) => {
  const t = useTranslations();
  const { ref, inView } = useSectionInView<HTMLElement>();

  return (
    <InViewContextProvider isInview={inView}>
      <section ref={ref} className="py-10">
        <div className="container">
          <SectionHeader
            subTitle={t("homePage.specialOffersSection.subTitle")}
            introText={t("homePage.specialOffersSection.introText")}
          />

          <div className="mt-10">{children}</div>
        </div>
      </section>
    </InViewContextProvider>
  );
};

export default SpecialOffersSection;
