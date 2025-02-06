import { TripDetails } from "@/lib/types/trips";
import TripPriceDetail from "./trip-price-detail";
import { getTranslations } from "next-intl/server";

type Props = {
  tripData: TripDetails;
};
export default async function PriceDetailsContainer({ tripData }: Props) {
  const t = await getTranslations();
  return (
    <div className="flex  items-center justify-center flex-wrap gap-5">
      <TripPriceDetail
        price={tripData?.adultPrice}
        age={t("tripInfo.priceForAdultText")}
      />
      <TripPriceDetail
        price={tripData?.childPrice}
        age={t("tripInfo.priceForChildText")}
      />
      <TripPriceDetail price={"0"} age={t("tripInfo.priceForBabyText")} />
    </div>
  );
}
