"use client";
import useSectionInView from "@/hooks/use-section-view";
import InViewContextProvider from "@/providers/in-view-provider";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export default function RelatedTripsWrapper({ children }: Props) {
  const t = useTranslations();
  const { ref, inView } = useSectionInView<HTMLDivElement>();
  return (
    <InViewContextProvider isInview={inView}>
      <div ref={ref} className="mt-10 flex flex-col gap-3 overflow-hidden">
        <span className="text-3xl text-main mb-10 block">
          {t("tripInfo.relatedTripsSubTitle")}
        </span>
        {children}
      </div>
    </InViewContextProvider>
  );
}
