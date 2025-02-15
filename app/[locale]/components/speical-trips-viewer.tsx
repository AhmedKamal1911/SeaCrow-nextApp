import TripsSlider from "./trips-slider";
import ErrorViewer from "@/components/common/error-viewer";
import { Locale } from "@/i18n/routing";
import { getSpeicalOffersData } from "@/lib/queries/getSpeicalOffersData";

import { getLocale, getTranslations } from "next-intl/server";

export default async function SpecialTripsViewer() {
  const locale = await getLocale();
  const t = await getTranslations();
  await new Promise((resolve) => {
    setTimeout(() => resolve("test"), 20000);
  });
  const specialOffersData = await getSpeicalOffersData(locale as Locale);
  const specialTripsListLength = specialOffersData.data.length;

  return specialTripsListLength >= 1 ? (
    <TripsSlider
      tripsList={specialOffersData.data}
      className="h-[300px] sm:h-[400px]"
    />
  ) : specialTripsListLength === 0 ? (
    <ErrorViewer
      className="h-[20vh]"
      errorText={t("global.errors.noTripsError")}
    />
  ) : (
    <ErrorViewer className="h-[20vh]" />
  );
}
