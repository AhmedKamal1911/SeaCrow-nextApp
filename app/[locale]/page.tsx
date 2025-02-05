import { Suspense } from "react";
import { getHeroSectionData } from "@/lib/queries/getHeroSectionData";
import { getIntroSectionData } from "@/lib/queries/getIntroSectionData";
import { getWhyChooseUsData } from "@/lib/queries/getWhyChooseUsData";
import HeroSection from "./components/sections/hero-section";
import IntroSection from "./components/sections/intro-section";
import AboutUsSection from "./components/sections/about-us-section";
import SpecialOffersSection from "./components/sections/special-offers-section";
import Loading from "@/components/common/loading";
import SpecialTripsViewer from "./components/speical-trips-viewer";
import WhyChooseUsSection from "./components/sections/why-choose-us-section";
import TripsSection from "./components/sections/trips-section";
import TripGridCardsViewer from "./components/trip-grid-cards-viewer";

export default async function Home() {
  const heroSectionData = await getHeroSectionData();
  const introSectionData = await getIntroSectionData();
  const whyChooseUsData = await getWhyChooseUsData();

  return (
    <main>
      <HeroSection data={heroSectionData} />
      <IntroSection data={introSectionData} />
      <AboutUsSection />
      <SpecialOffersSection>
        <Suspense fallback={<Loading className="h-[30vh]" />}>
          <SpecialTripsViewer />
        </Suspense>
      </SpecialOffersSection>
      <WhyChooseUsSection data={whyChooseUsData} />

      <TripsSection>
        <Suspense fallback={<Loading className="h-[30vh]" />}>
          <TripGridCardsViewer />
        </Suspense>
      </TripsSection>
    </main>
  );
}
