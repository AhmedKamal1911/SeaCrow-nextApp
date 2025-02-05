import getTripTypes from "@/lib/queries/getTripTypes";
import TripsPageView from "./components/trips-page-view";

export default async function Trips() {
  const tripTypes = await getTripTypes();

  return (
    <>
      <TripsPageView tripsTypes={tripTypes} />
    </>
  );
}
