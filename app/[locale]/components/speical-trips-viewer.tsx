import TripsSlider from "./trips-slider";
import ErrorViewer from "@/components/common/error-viewer";
import { getSpeicalOffersData } from "@/lib/queries/getSpeicalOffersData";

export default async function SpecialTripsViewer() {
  const specialOffersData = await getSpeicalOffersData();

  return specialOffersData ? (
    <TripsSlider
      tripsList={specialOffersData.data}
      className="h-[300px] sm:h-[400px]"
    />
  ) : (
    <ErrorViewer className="h-[20vh]" />
  );
}
