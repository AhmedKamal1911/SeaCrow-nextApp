import { TripDetails } from "@/lib/types/trips";
import TourOverviewDetails from "./tour-overview-details";
import TripDetailsBox from "./trip-details-box";
import { getTranslations } from "next-intl/server";

type Props = {
  tripData: TripDetails;
};
export default async function TripInfoContainer({ tripData }: Props) {
  const t = await getTranslations();
  return (
    <div className="border divide-y-2 " id="info">
      <TripDetailsBox
        tour={tripData?.name}
        tourFrom={tripData?.tourFrom}
        departureTime={tripData?.departureTime}
        departureTimeSystem={tripData?.departureTime}
        returnTime={tripData?.returnTime}
        returnTimeSystem={tripData?.returnTime}
        tripDays={tripData?.tripDays}
        maxGuests={tripData?.maxGuests}
      />
      <TourOverviewDetails
        rulesList={tripData?.highlights}
        label={t("tripInfo.tripOverviewDetails.highlightsText")}
      />
      <TourOverviewDetails
        rulesList={tripData?.includedServices}
        label={t("tripInfo.tripOverviewDetails.includedServicesText")}
      />
      <TourOverviewDetails
        rulesList={tripData?.notIncluded}
        label={t("tripInfo.tripOverviewDetails.notIncludedText")}
        status="cross"
      />
      <TourOverviewDetails
        rulesList={tripData?.dontForget}
        label={t("tripInfo.tripOverviewDetails.dontForgetText")}
        status="info"
      />
    </div>
  );
}
