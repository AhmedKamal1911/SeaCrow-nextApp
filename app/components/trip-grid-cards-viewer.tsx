import { getTripsSectionData } from "@/lib/queries/getTripsSectionData";
import TripCardGrid from "./trip-card-grid";
import ErrorViewer from "@/components/common/error-viewer";

export default async function TripGridCardsViewer() {
  const tripsSectionData = await getTripsSectionData("all");

  return tripsSectionData ? (
    <TripCardGrid data={tripsSectionData.data} />
  ) : (
    <ErrorViewer className="h-[20vh]" />
  );
}
