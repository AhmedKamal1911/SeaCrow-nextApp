import { getTripsSectionData } from "@/lib/queries/getTripsSectionData";
import TripCardGrid from "./trip-card-grid";
import ErrorViewer from "@/components/common/error-viewer";
import { getLocale, getTranslations } from "next-intl/server";
import { Locale } from "@/i18n/routing";
import { TripData } from "@/lib/types/trips";

export default async function TripGridCardsViewer() {
  const locale = await getLocale();
  const t = await getTranslations();
  // await new Promise((resolve) => {
  //   setTimeout(() => resolve("test"), 10000);
  // });
  const tripsSectionData = await getTripsSectionData(locale as Locale);
  const tripsToShow = tripsSectionData?.data as TripData[];
  return tripsToShow.length >= 1 ? (
    <TripCardGrid data={tripsToShow} />
  ) : tripsToShow.length === 0 ? (
    <ErrorViewer
      className="h-[20vh]"
      errorText={t("global.errors.noTripsError")}
    />
  ) : (
    <ErrorViewer className="h-[20vh]" />
  );
}
