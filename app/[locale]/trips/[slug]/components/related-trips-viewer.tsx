import ErrorViewer from "@/components/common/error-viewer";
import RelatedTripsContainer from "./related-trips-container";
import getRelatedTripsData from "@/lib/queries/getRelatedTripsData";

export default async function RelatedTripsViewer({
  tripType,
  tripSlug,
}: {
  tripType: string;
  tripSlug: string;
}) {
  const relatedTrips = await getRelatedTripsData(tripType, tripSlug);

  return relatedTrips ? (
    <RelatedTripsContainer relatedTrips={relatedTrips} />
  ) : (
    <ErrorViewer />
  );
}
