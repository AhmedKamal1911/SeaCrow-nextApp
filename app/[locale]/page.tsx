import { Suspense } from "react";
import { getHeroSectionData } from "@/lib/queries/getHeroSectionData";
import { getIntroSectionData } from "@/lib/queries/getIntroSectionData";
import { getWhyChooseUsData } from "@/lib/queries/getWhyChooseUsData";
import HeroSection from "./components/sections/hero-section";
import IntroSection from "./components/sections/intro-section";
import AboutUsSection from "./components/sections/about-us-section";
import SpecialOffersSection from "./components/sections/special-offers-section";

import SpecialTripsViewer from "./components/speical-trips-viewer";
import WhyChooseUsSection from "./components/sections/why-choose-us-section";
import TripsSection from "./components/sections/trips-section";
import TripGridCardsViewer from "./components/trip-grid-cards-viewer";
import { Locale } from "@/i18n/routing";
import { locales } from "@/lib/data";
import getHomePageData from "@/lib/queries/getHomePageData";
import GridSkeletonLoader from "@/components/common/grid-skeleton-loader";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  const response = await getHomePageData({ locale });

  return {
    title: response.SEO.title,
    description: response.SEO.description,
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  // setRequestLocale(locale);

  const [heroSectionData, introSectionData, whyChooseUsData] =
    await Promise.all([
      getHeroSectionData(locale),
      getIntroSectionData(locale),
      getWhyChooseUsData(locale),
    ]);
  console.log("home page rendered page");
  return (
    <main>
      <HeroSection data={heroSectionData} />
      <IntroSection data={introSectionData} />
      <AboutUsSection />
      <SpecialOffersSection>
        <Suspense fallback={<GridSkeletonLoader />}>
          <SpecialTripsViewer />
        </Suspense>
      </SpecialOffersSection>
      <WhyChooseUsSection data={whyChooseUsData} />

      <TripsSection>
        <Suspense fallback={<GridSkeletonLoader />}>
          <TripGridCardsViewer />
        </Suspense>
      </TripsSection>
    </main>
  );
}
