"use client";

import SectionHeader from "@/components/common/section-header";
import { Button } from "@/components/ui/button";

import InViewContextProvider from "@/providers/in-view-provider";
import useSectionInView from "@/hooks/use-section-view";
import { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const TripsSection = ({ children }: { children: ReactNode }) => {
  const t = useTranslations();
  const { ref, inView } = useSectionInView();

  return (
    <InViewContextProvider isInview={inView}>
      <section ref={ref} className="py-20">
        <div className="container h-full">
          <SectionHeader
            subTitle={t("homePage.tripsSection.subTitle")}
            introText={t("homePage.tripsSection.introText")}
          />
          <Button asChild variant="primary">
            <Link href={"/trips"} className="py-6 block !my-7">
              {t("homePage.tripsSection.tripsButtonLabel")}
            </Link>
          </Button>

          {children}
        </div>
      </section>
    </InViewContextProvider>
  );
};

export default TripsSection;
