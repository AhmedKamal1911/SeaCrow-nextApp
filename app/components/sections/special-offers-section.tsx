import useQueryWithLocale from "@/hooks/useQueryWithLocale";

import { fetchSpecialTrips } from "@/services/trips/queries";
import { useTranslation } from "react-i18next";
import useSectionInView from "@/hooks/useSectionInView";
import { Trip } from "@/lib/types/trips";
import SectionHeader from "@/components/common/section-header";
import TripsSlider from "../trips-slider";
import { Suspense } from "react";
type Props = {
  data: Trip[];
};
const SpecialOffersSection = ({ data }: Props) => {
  const { t } = useTranslation("global");
  const { ref, inView } = useSectionInView();

  return (
    <section ref={ref} className="py-10">
      <div className="container">
        <SectionHeader
          subTitle={t("homePage.specialOffersSection.subTitle")}
          introText={t("homePage.specialOffersSection.introText")}
        />
        <div className="mt-10">
          <Loading
            isFetching={isFetching}
            error={error}
            loadingElementClassName="h-[20vh]"
            errorElementClassName="h-[20vh] "
          >
            <Suspense fallback={}>
              <TripsSlider
                className="h-[300px] sm:h-[400px]"
                tripsList={data}
                inView={inView}
              />
            </Suspense>
          </Loading>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffersSection;
