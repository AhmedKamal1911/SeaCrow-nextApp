import { getTripsSectionData } from "@/lib/queries/getTripsSectionData";
import TripCardGrid from "./trip-card-grid";
import ErrorViewer from "@/components/common/error-viewer";

export default async function TripGridCardsViewer() {
  const tripsSectionData = await getTripsSectionData({ typeName: "all" });
  const tripsToShow =
    tripsSectionData.data.length > 4
      ? tripsSectionData.data.slice(0, 4)
      : tripsSectionData.data;
  return tripsToShow.length >= 1 ? (
    <TripCardGrid data={tripsToShow} />
  ) : (
    <ErrorViewer className="h-[20vh]" />
  );
}
