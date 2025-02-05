import { getTranslations } from "next-intl/server";
import TripBanner from "./components/trip-banner";
import TripNavigation from "./components/trip-navigation";

import TripSlider from "./components/trip-slider";
import TripOverview from "./components/trip-overview";

import TripQuestionsBox from "./components/trip-questions-box";
import getFaqPageData from "@/lib/queries/getFaqPageData";
import TripReviewBox from "./components/trip-review-box";

import { Suspense } from "react";
import Loading from "@/components/common/loading";
import SkeletonLoaderCard from "./components/skeleton-loader-card";
import getTripData from "@/lib/queries/getTripData";
import RelatedTripsViewer from "./components/related-trips-viewer";
import RelatedTripsWrapper from "./components/related-trips-wrapper";

import TripInfoContainer from "./components/trip-info-container";
import TourPlanInfoContainer from "./components/tour-plan-info-container";
import TripOverviewHeader from "./components/trip-overview-header";
import BookTripForm from "./components/book-trip-form";
type Props = {
  params: Promise<{ slug: string }>;
};
export default async function Trip({ params }: Props) {
  const { slug } = await params;
  console.log(slug);
  const t = await getTranslations();

  const tripData = await getTripData(slug);
  const faqData = await getFaqPageData();
  const questionsList = faqData.faqsList;
  const tripImagesList = tripData?.imgs?.data;
  console.log({ tripImagesList });
  const tripType = tripData.type;
  return (
    <div className="min-h-screen py-[72px] bg-light">
      <TripBanner
        imgSrc={tripData?.imgs.data[0]?.url}
        title={tripData?.name}
        type={tripData?.type}
      />

      <div className="container">
        <div className="flex flex-col lg:flex-row gap-5 mt-16">
          <div className="flex flex-col gap-12 lg:w-[70%]">
            <TripNavigation />

            <TripOverviewHeader tripData={tripData} />

            <TripSlider imagesList={tripImagesList} />

            <TripOverview desc={tripData?.desc} title={tripData?.name} />

            {/* Info Box */}
            <TripInfoContainer tripData={tripData} />
            {/* Tour PLAN BOX */}
            <TourPlanInfoContainer tripData={tripData} />
            {/* Questions BOX */}
            <div id="faq">
              <TripQuestionsBox questionsList={questionsList} />
            </div>
            <div id="reviews">
              <TripOverview title={t("tripInfo.clientReviews.introText")} />
              <TripReviewBox
                desc={t("tripInfo.clientReviews.desc")}
                buttonLabel={t("tripInfo.clientReviews.reviewButtonLabel")}
              />
            </div>
          </div>
          {/* Form AND RELATED TRIPS */}
          <div className="lg:w-[30%]">
            <BookTripForm tripSlug={tripData?.slug} />

            <RelatedTripsWrapper>
              <Suspense
                key={Math.random()}
                fallback={
                  <Loading
                    loadingElement={<SkeletonLoaderCard />}
                    className="h-[68vh] sm:h-[120vh] lg:h-[95vh]"
                  />
                }
              >
                <RelatedTripsViewer tripSlug={slug} tripType={tripType} />
              </Suspense>
            </RelatedTripsWrapper>
          </div>
        </div>
      </div>
    </div>
  );
}
