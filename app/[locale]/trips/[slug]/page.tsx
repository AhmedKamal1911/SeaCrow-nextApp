import { getTranslations } from "next-intl/server";
import TripBanner from "./components/trip-banner";
import TripNavigation from "./components/trip-navigation";

import TripSlider from "./components/trip-slider";
import TripOverview from "./components/trip-overview";

import TripQuestionsBox from "./components/trip-questions-box";

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
import getTripQuestionsData from "@/lib/queries/getTripQuestionsData";
import { Locale, routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/trips?locale=en`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  return data.data.flatMap((trip) =>
    routing.locales.map((locale) => ({
      slug: trip.attributes.slug,
      locale,
    }))
  );
}

export async function generateMetadata({ params }: Props) {
  const { slug, locale } = await params;

  const response = await getTripData({ locale, slug });

  return {
    title: `Sea Crow - ${response.slug}`,
    description: response.name,
  };
}

type Props = {
  params: Promise<{ slug: string; locale: Locale }>;
};
// export const dynamic = "force-static";
export const revalidate = 3600; // 1 hour
export default async function Trip({ params }: Props) {
  console.log("trip page rendered page");
  const { slug, locale } = await params;
  const t = await getTranslations();

  const [tripData, questions] = await Promise.all([
    getTripData({ slug, locale: locale as Locale }),
    getTripQuestionsData({ locale: locale as Locale }),
  ]);
  if (tripData === undefined) notFound();
  const tripImagesList = tripData?.imgs?.data;
  // setRequestLocale(locale);
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
              <TripQuestionsBox questionsList={questions.clientQuestionsList} />
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
