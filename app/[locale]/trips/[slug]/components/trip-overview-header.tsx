import { Clock, Map } from "lucide-react";
import TripDetailBox from "./trip-detail-box";
import PriceDetailsContainer from "./price-details-container";
import { Trip } from "@/lib/types/trips";
import { getTranslations } from "next-intl/server";

type Props = {
  tripData: Trip;
};
export default async function TripOverviewHeader({ tripData }: Props) {
  const t = await getTranslations();
  return (
    <div className="flex items-center flex-col gap-5 lg:gap-0 lg:flex-row justify-between mt-12">
      <div className="flex flex-wrap justify-center gap-5">
        <TripDetailBox
          detail={t(`tripInfo.tripTime.${tripData?.time}`)}
          icon={<Clock className="text-main size-7" />}
        />

        <TripDetailBox
          detail={`${t("tripInfo.toursFrom")} ${tripData?.tourFrom}`}
          icon={<Map className="text-main size-7" />}
        />
      </div>

      <PriceDetailsContainer tripData={tripData} />
    </div>
  );
}
