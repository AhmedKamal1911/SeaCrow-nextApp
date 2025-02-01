import { Trip } from "@/lib/types/trips";
import TourPlanBox from "./tour-plan-box";
import TripOverview from "./trip-overview";
import { getTranslations } from "next-intl/server";

type Props = {
  tripData: Trip;
};
export default async function TourPlanInfoContainer({ tripData }: Props) {
  const t = await getTranslations();
  return (
    <div id="tour-plan">
      <TripOverview title={t("tripInfo.tourPlanIntroText")} />
      <div
        className="border rounded-md overflow-hidden"
        style={{
          counterReset: "feature-counter",
        }}
      >
        {tripData?.tourPlan?.map(({ name, id }) => (
          <TourPlanBox key={id} plan={name} />
        ))}
      </div>
    </div>
  );
}
