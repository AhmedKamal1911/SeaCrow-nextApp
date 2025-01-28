"use client";
// import useQueryWithLocale from "@/hooks/useQueryWithLocale";
// import { useTranslation } from "react-i18next";

import SectionHeader from "@/components/common/section-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import InViewContextProvider from "@/providers/in-view-provider";
import useSectionInView from "@/hooks/use-section-view";
import { ReactNode } from "react";

const TripsSection = ({ children }: { children: ReactNode }) => {
  // const { t } = useTranslation("global");
  const { ref, inView } = useSectionInView();

  return (
    <InViewContextProvider isInview={inView}>
      <section ref={ref} className="py-20">
        <div className="container h-full">
          <SectionHeader
            // subTitle={t("homePage.tripsSection.subTitle")}
            // introText={t("homePage.tripsSection.introText")}
            subTitle={"fasfasf"}
            introText={"dfghbgfh"}
          />
          <Button asChild variant="primary">
            <Link href="/trips" className="py-6 block !my-7">
              {/* {t("homePage.tripsSection.tripsButtonLabel")} */}
              tests
            </Link>
          </Button>

          {children}
        </div>
      </section>
    </InViewContextProvider>
  );
};

export default TripsSection;
