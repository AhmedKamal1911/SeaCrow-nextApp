import ErrorViewer from "@/components/common/error-viewer";
import RelatedTripsContainer from "./related-trips-container";
import getRelatedTripsData from "@/lib/queries/getRelatedTripsData";
import { Locale } from "@/i18n/routing";
import { getLocale } from "next-intl/server";
export default async function RelatedTripsViewer({
  tripType,
  tripSlug,
}: {
  tripType: string;
  tripSlug: string;
}) {
  const locale = await getLocale();
  await new Promise((resolve) => {
    setTimeout(() => resolve("test"), 10000);
  });
  const relatedTrips = await getRelatedTripsData({
    typeName: tripType,
    slug: tripSlug,
    locale: locale as Locale,
  });

  return relatedTrips ? (
    <RelatedTripsContainer relatedTrips={relatedTrips} />
  ) : (
    <ErrorViewer />
  );
}
