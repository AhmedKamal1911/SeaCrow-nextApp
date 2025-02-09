import { getTripsSectionData } from "@/lib/queries/getTripsSectionData";
import TripCardGrid from "./trip-card-grid";
import ErrorViewer from "@/components/common/error-viewer";
import { getLocale } from "next-intl/server";
import { Locale } from "@/i18n/routing";

export default async function TripGridCardsViewer() {
  console.log("TripGridCardsViewer Component rendered ");
  const locale = await getLocale();
  const tripsSectionData = await getTripsSectionData(locale as Locale);
  const tripsToShow = tripsSectionData.data;
  return tripsToShow.length >= 1 ? (
    <TripCardGrid data={tripsToShow} />
  ) : (
    <ErrorViewer className="h-[20vh]" />
  );
}
