import TripsSlider from "./trips-slider";
import ErrorViewer from "@/components/common/error-viewer";
import { Locale } from "@/i18n/routing";
import { getSpeicalOffersData } from "@/lib/queries/getSpeicalOffersData";
import { getLocale } from "next-intl/server";

export default async function SpecialTripsViewer() {
  const locale = await getLocale();

  const specialOffersData = await getSpeicalOffersData(locale as Locale);

  return specialOffersData.data.length >= 1 ? (
    <TripsSlider
      tripsList={specialOffersData.data}
      className="h-[300px] sm:h-[400px]"
    />
  ) : (
    <ErrorViewer className="h-[20vh]" />
  );
}
