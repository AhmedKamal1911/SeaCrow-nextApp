import getTripTypes from "@/lib/queries/getTripTypes";
import TripsPageView from "./components/trips-page-view";
import { getTripsSectionData } from "@/lib/queries/getTripsSectionData";

export default async function Trips() {
  const tripTypes = await getTripTypes();
  const initialTripsList = await getTripsSectionData("all");
  // TODO: create pagination
  return (
    <>
      <TripsPageView
        initialTripsList={initialTripsList}
        tripsTypes={tripTypes}
      />
    </>
  );
}
