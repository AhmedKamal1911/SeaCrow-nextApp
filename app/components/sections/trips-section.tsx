import useQueryWithLocale from "@/hooks/useQueryWithLocale";
import { useTranslation } from "react-i18next";
import useSectionInView from "@/hooks/useSectionInView";
import SectionHeader from "@/components/common/section-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import TripCard from "@/components/common/trip-card";
import { Trip } from "@/lib/types/trips";
type Props = {
  data: Trip[];
};
const TripsSection = ({ data }: Props) => {
  const { t } = useTranslation("global");
  const { ref, inView } = useSectionInView();

  // const {
  //   data: tripsData,
  //   isFetching,
  //   error,
  // } = useQueryWithLocale({
  //   queryKey: ["tripsSection"], // Object form for query key
  //   queryFn: fetchTrips, // Function to fetch data
  // });

  return (
    <section ref={ref} className="py-20">
      <div className="container h-full">
        <SectionHeader
          subTitle={t("homePage.tripsSection.subTitle")}
          introText={t("homePage.tripsSection.introText")}
        />
        <Button asChild variant="primary">
          <Link href="/trips" className="py-6 block !my-7">
            {t("homePage.tripsSection.tripsButtonLabel")}
          </Link>
        </Button>
        {/* <Loading
          isFetching={isFetching}
          error={error}
          loadingElementClassName="h-[30vh]"
          errorElementClassName="h-[20vh]"
        > */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5 relative z-10">
          {data.map((trip, i) => (
            <div key={trip.id} className="h-[300px] sm:h-[400px]">
              <TripCard inView={inView} i={i} trip={trip} />
            </div>
          ))}
        </div>
        {/* </Loading> */}
      </div>
    </section>
  );
};

export default TripsSection;
